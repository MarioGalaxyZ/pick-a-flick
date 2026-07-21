#Requires -Version 5.1
<#
.SYNOPSIS
  Third OMDb/placeholder pass on Movie Titles (2):
  re-process needs_review (or blank normalized) rows with Titles 2.0 filled.
  Strips trailing tags (tv/educational/documentary/workout), tries OMDb, parks niche media.
  Writes to pass3.xlsx. Does not edit movieDatabase.
#>
$ErrorActionPreference = 'Stop'

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$InputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass2.xlsx'
$OutputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass3.xlsx'
$SheetName = 'Movie Titles (2)'
$ProgressJson = Join-Path $Root 'scripts\_tmp-titles2-pass3-progress.json'
$ReviewJson = Join-Path $Root 'scripts\_tmp-titles2-pass3-review.json'
$ReviewMd = Join-Path $Root 'scripts\_tmp-titles2-pass3-review.md'
$MainJs = Join-Path $Root 'app\main.js'
$EnvFile = Join-Path $Root '.env'
$ThrottleMs = 280

if (-not (Test-Path -LiteralPath $InputXlsx)) {
    throw "Input workbook not found: $InputXlsx"
}

if (Test-Path (Join-Path $PSScriptRoot 'load-env.ps1')) {
    . (Join-Path $PSScriptRoot 'load-env.ps1')
    if (Get-Command Import-DotEnv -ErrorAction SilentlyContinue) { Import-DotEnv $EnvFile }
} else {
    if (Test-Path $EnvFile) {
        foreach ($line in Get-Content $EnvFile) {
            if ($line -match '^\s*OMDB_API_KEY\s*=\s*(.+)\s*$') {
                if (-not $env:OMDB_API_KEY) { $env:OMDB_API_KEY = $Matches[1].Trim().Trim('"').Trim("'") }
            }
            if ($line -match '^\s*OMDB_API_KEY_FREE\s*=\s*(.+)\s*$') {
                if (-not $env:OMDB_API_KEY_FREE) { $env:OMDB_API_KEY_FREE = $Matches[1].Trim().Trim('"').Trim("'") }
            }
        }
    }
}

. (Join-Path $PSScriptRoot 'lib\omdb-api-key.ps1')
$script:OmdbKeys = Get-OmdbKeySession
$script:WheelCats = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'lib\wheel-category-keys.json') -Encoding UTF8 | ConvertFrom-Json

function Join-Note($a, $b) {
    $parts = @($a, $b) | Where-Object { $_ -and ([string]$_).Trim() -ne '' }
    return ($parts -join ' | ')
}

function Get-CatalogListings {
    $main = Get-Content -LiteralPath $MainJs -Raw
    $block = [regex]::Match($main, 'const movieDatabase = \{[\s\S]*?\n    \};')
    if (-not $block.Success) { throw 'movieDatabase block not found' }
    $set = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
    foreach ($m in [regex]::Matches($block.Value, '"((?:\\.|[^"\\])+)"')) {
        $listing = $m.Groups[1].Value -replace '\\"', '"'
        [void]$set.Add($listing)
    }
    return $set
}

function Test-IsInCatalog([string]$normalized, $catalog, [string]$omdbTitle, [string]$year) {
    if ($normalized -and $catalog.Contains($normalized)) { return $true }
    if ($omdbTitle -and $year) {
        $c = "$omdbTitle ($year)"
        if ($catalog.Contains($c)) { return $true }
        foreach ($item in $catalog) {
            if ([string]::Equals($item, $c, [StringComparison]::OrdinalIgnoreCase)) { return $true }
        }
    }
    return $false
}

function Split-UserTag([string]$b) {
    $t = ($b -replace '\s+', ' ').Trim()
    $tag = $null
    if ($t -match '(?i)^(.*?),\s*(tv|educational|documentary|workout|exercise)\s*$') {
        $t = $Matches[1].Trim()
        $tag = $Matches[2].ToLowerInvariant()
    }
    elseif ($t -match '(?i)^(.*?)\s+(tv|educational|documentary|workout|exercise)\s*$') {
        $t = $Matches[1].Trim()
        $tag = $Matches[2].ToLowerInvariant()
    }
    # Workout keyword wins over mis-tagged documentary
    if ($t -match '(?i)\b(Workout|Pilates|15 Minute Workout)\b') {
        $tag = 'workout'
    }
    if ($tag -eq 'exercise') { $tag = 'workout' }
    return [pscustomobject]@{ Text = $t; Tag = $tag }
}

function Clean-Titles2([string]$b) {
    $t = ($b -replace '\s+', ' ').Trim()
    $t = $t -replace '[–—―]', '-'
    $year = $null

    $t = $t -replace '\s+(G|PG-13|PG|R|NC-17|NR)\s*$', ''
    $t = $t -replace '\s+\((?:film|2007 film)\)\s*$', ''

    if ($t -match '^(.*?)\s*\((\d{4})\)\s*$') {
        $t = $Matches[1].Trim()
        $year = $Matches[2]
    }
    elseif ($t -match '^(.*?)\s*\(TV Movie\s+(\d{4})\)\s*$') {
        $t = $Matches[1].Trim()
        $year = $Matches[2]
    }
    elseif ($t -match '^(.*?\D)\s+(\d{4})\s*$') {
        $t = $Matches[1].Trim().TrimEnd(',').Trim()
        $year = $Matches[2]
    }
    elseif ($t -match '(?i)Video\s+(\d{4})\s*$') {
        $year = $Matches[1]
        $t = ($t -replace '(?i)\s*Video\s+\d{4}\s*$', '').Trim()
    }

    $t = $t -replace '\s+is a\s+.+$', ''
    $t = $t.Trim()
    return [pscustomobject]@{ SearchTitle = $t; Year = $year }
}

function Format-Norm([string]$title, [string]$year) {
    if ($year) { return "$title ($year)" }
    return $title
}

function Get-PlaceholderStatus([string]$tag) {
    switch ($tag) {
        'tv' { return 'placeholder_tv' }
        'educational' { return 'placeholder_educational' }
        'documentary' { return 'placeholder_documentary' }
        'workout' { return 'placeholder_workout' }
        default { return $null }
    }
}

function Propose-Category($omdb) {
    if (-not $omdb -or $omdb.Response -ne 'True') { return $null }
    $C = $script:WheelCats
    $actors = [string]$omdb.Actors
    $director = [string]$omdb.Director
    $genre = [string]$omdb.Genre
    $lang = [string]$omdb.Language
    $country = [string]$omdb.Country
    $title = [string]$omdb.Title
    $plot = [string]$omdb.Plot

    if ($director -match '(?i)Zemeckis') { return $C.ZEMECKIS_ZONE }
    if ($actors -match '(?i)Nicolas Cage') { return $C.CAGE_STAGE }
    if ($actors -match '(?i)Jim Carrey') { return $C.CARREYS_CHARACTERS }
    if ($actors -match '(?i)Simon Pegg') { return $C.PEGGS_PLAYGROUND }
    if ($actors -match '(?i)Joaquin Phoenix') { return $C.PHOENIX_FREEWAY }
    if ($actors -match '(?i)Jack Black') { return $C.JB_JUNCTION }
    if ($genre -match '(?i)Animation') { return $C.ANIMATION_STATION }
    if ($genre -match '(?i)Western') { return $C.TUMBLEWEED_TURNPIKE }
    if ($title -match '(?i)(Part II|Part III| 2$| II$| III$|2:)') { return $C.SEQUEL_STREET }
    if ($genre -match '(?i)Music|Musical') { return $C.MUSIC_MOUNTAIN }
    $nonEn = $lang -and ($lang -notmatch '(?i)^English') -and ($lang -notmatch '(?i)^N/A')
    $foreignCountry = $country -and ($country -notmatch '(?i)USA|United States|UK|United Kingdom|Canada|Australia') -and ($country -match '(?i)Korea|Japan|China|France|Germany|Italy|Spain|Brazil|Sweden|Denmark|India|Hong Kong|Mexico|Russia')
    if ($nonEn -or $foreignCountry) { return $C.FOREIGN_EMBASSY }
    if ($genre -match '(?i)Sci-Fi|Science Fiction' -and ($plot -match '(?i)alien|extraterrestrial|invasion|UFO')) { return $C.ALIEN_ALLEY }
    if ($genre -match '(?i)Horror|Thriller' -and $genre -notmatch '(?i)Comedy') { return $C.MOVIES_TO_FALL_ASLEEP_TO }
    if ($genre -match '(?i)Sci-Fi') { return $C.NEON_AND_NINETIES }
    if ($genre -match '(?i)Comedy|Fantasy') { return $C.WACKY_WAY }
    return $C.WACKY_WAY
}

function Invoke-OmdbByTitle([string]$title, [string]$year) {
    $key = $script:OmdbKeys.Key
    $url = "https://www.omdbapi.com/?t=$([uri]::EscapeDataString($title))&apikey=$key"
    if ($year) { $url += "&y=$([uri]::EscapeDataString($year))" }
    try {
        return Invoke-RestMethod -Uri $url -Method Get
    } catch {
        if (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $_.Exception.Message) {
            $key = $script:OmdbKeys.Key
            $url = "https://www.omdbapi.com/?t=$([uri]::EscapeDataString($title))&apikey=$key"
            if ($year) { $url += "&y=$([uri]::EscapeDataString($year))" }
            return Invoke-RestMethod -Uri $url -Method Get
        }
        throw
    }
}

function Invoke-OmdbSearch([string]$title) {
    $key = $script:OmdbKeys.Key
    $url = "https://www.omdbapi.com/?s=$([uri]::EscapeDataString($title))&type=movie&apikey=$key"
    try {
        return Invoke-RestMethod -Uri $url -Method Get
    } catch {
        if (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $_.Exception.Message) {
            $key = $script:OmdbKeys.Key
            $url = "https://www.omdbapi.com/?s=$([uri]::EscapeDataString($title))&type=movie&apikey=$key"
            return Invoke-RestMethod -Uri $url -Method Get
        }
        return $null
    }
}

function Get-OmdbHit([string]$title, [string]$year) {
    $data = Invoke-OmdbByTitle $title $year
    if ($data.Response -eq 'False' -and (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $data)) {
        $data = Invoke-OmdbByTitle $title $year
    }
    if ($data.Response -eq 'True') { return $data }
    if ($year) {
        Start-Sleep -Milliseconds $ThrottleMs
        $data = Invoke-OmdbByTitle $title $null
        if ($data.Response -eq 'True') { return $data }
    }
    return $data
}

$catalog = Get-CatalogListings
Write-Host "Catalog listings: $($catalog.Count); key=$(Get-OmdbKeySessionDescribe $script:OmdbKeys)"

# Load candidate rows from pass2
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($InputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
if (-not $ws) { throw "Sheet '$SheetName' not found in $InputXlsx" }

$lastRow = $ws.UsedRange.Rows.Count
$rows = @()
for ($r = 2; $r -le $lastRow; $r++) {
    $a = [string]$ws.Cells.Item($r, 1).Text
    $b = [string]$ws.Cells.Item($r, 2).Text
    $f = [string]$ws.Cells.Item($r, 6).Text
    $i = [string]$ws.Cells.Item($r, 9).Text
    $m = [string]$ws.Cells.Item($r, 13).Text
    if ([string]::IsNullOrWhiteSpace($b)) { continue }
    $status = $m.Trim()
    $normBlank = [string]::IsNullOrWhiteSpace($i)
    if ($status -eq 'needs_review' -or $normBlank) {
        $rows += [pscustomobject]@{
            Row      = $r
            Original = $a.Trim()
            Titles2  = $b.Trim()
            YearF    = if ($f -match '(\d{4})') { $Matches[1] } else { $null }
            PrevStatus = $status
        }
    }
}
Write-Host "Pass3 candidates: $($rows.Count)"

$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()

$resultsByRow = @{}
if (Test-Path $ProgressJson) {
    foreach ($item in @(Get-Content -LiteralPath $ProgressJson -Raw -Encoding UTF8 | ConvertFrom-Json)) {
        $resultsByRow[[int]([string]$item.Row)] = $item
    }
    Write-Host "Resumed $($resultsByRow.Count) prior results"
}

$results = New-Object System.Collections.Generic.List[object]
$n = 0
foreach ($row in $rows) {
    $n++
    if ($resultsByRow.ContainsKey([int]$row.Row)) {
        $results.Add($resultsByRow[[int]$row.Row])
        continue
    }

    $split = Split-UserTag $row.Titles2
    $tag = $split.Tag
    $cleaned = Clean-Titles2 $split.Text
    $searchTitle = $cleaned.SearchTitle
    $year = $cleaned.Year
    if (-not $year -and $row.YearF) { $year = $row.YearF }

    $rec = [ordered]@{
        Row               = $row.Row
        Original          = $row.Original
        Titles2           = $row.Titles2
        UserTag           = $tag
        SearchTitle       = $searchTitle
        SearchYear        = $year
        normalized        = $null
        omdb_title        = $null
        omdb_year         = $null
        imdb_id           = $null
        status            = $null
        proposed_category = $null
        notes             = $null
    }

    # Season / disc packs → TV placeholder without relying on bare Episode
    if ($searchTitle -match '(?i)\bSeason\s+(\d+|One|Two|Three|Four|Five)\b|\bThe Complete .+ Season\b|\bDiscs?\s+\d|\bEpisode aired\b|\b\d+\s+episodes?\b') {
        $rec.status = 'placeholder_tv'
        $rec.normalized = Format-Norm $searchTitle $year
            $rec.notes = Join-Note 'tv/season pack - deferred' $(if ($tag) { "user tag was $tag" } else { $null })
        $results.Add([pscustomobject]$rec)
        Write-Host "[$n/$($rows.Count)] R$($row.Row) placeholder_tv (season/pack)"
        if (($results.Count % 20) -eq 0) { $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8 }
        continue
    }

    try {
        Start-Sleep -Milliseconds $ThrottleMs
        $data = Get-OmdbHit $searchTitle $year
    } catch {
        if ($tag) {
            $rec.status = Get-PlaceholderStatus $tag
            $rec.normalized = Format-Norm $searchTitle $year
            $rec.notes = Join-Note ("{0} - OMDb error, parked as placeholder" -f $tag) $_.Exception.Message
        } else {
            $rec.status = 'needs_review'
            $rec.notes = "OMDb request error: $($_.Exception.Message)"
        }
        $results.Add([pscustomobject]$rec)
        continue
    }

    if ($data.Response -eq 'True') {
        $rec.omdb_title = [string]$data.Title
        $oy = ([string]$data.Year) -replace '[–-].*', ''
        if ($oy -match '^(\d{4})') { $rec.omdb_year = $Matches[1] } else { $rec.omdb_year = $oy }
        $rec.imdb_id = [string]$data.imdbID
        $rec.normalized = "$($rec.omdb_title) ($($rec.omdb_year))"

        if ($data.Type -eq 'series' -or $data.Type -eq 'episode') {
            $rec.status = 'placeholder_tv'
            $rec.notes = Join-Note ("OMDb Type={0} - parked as TV placeholder" -f $data.Type) $(if ($tag) { "user tag was $tag" } else { $null })
        }
        elseif ($year -and $rec.omdb_year -and ($year -ne $rec.omdb_year)) {
            # Year clash: if user tagged niche media, park; else needs_review
            if ($tag -and $tag -ne 'tv') {
                $rec.status = Get-PlaceholderStatus $tag
                $rec.normalized = Format-Norm $searchTitle $year
                $rec.notes = Join-Note ("{0} - year clash with OMDb {1}; kept user title/year" -f $tag, $rec.omdb_year) ("OMDb={0} [{1}]" -f $rec.omdb_title, $rec.imdb_id)
                $rec.omdb_title = $null; $rec.omdb_year = $null; $rec.imdb_id = $null
            } else {
                $rec.status = 'needs_review'
                $rec.notes = Join-Note "Year clash: lookup=$year OMDb=$($rec.omdb_year)" $(if ($tag) { "user tag was $tag" } else { $null })
                $rec.proposed_category = Propose-Category $data
            }
        }
        else {
            if (Test-IsInCatalog $rec.normalized $catalog $rec.omdb_title $rec.omdb_year) {
                $rec.status = 'duplicate_in_catalog'
                $rec.notes = Join-Note 'Exact Title (Year) already in movieDatabase' $(if ($tag) { "user tag was $tag" } else { $null })
            }
            else {
                $rec.status = 'matched'
                $rec.notes = if ($tag) { "user tag was $tag; OMDb matched as movie" } else { $null }
            }
            $rec.proposed_category = Propose-Category $data
        }
    }
    else {
        # Miss
        if ($tag) {
            $rec.status = Get-PlaceholderStatus $tag
            $rec.normalized = Format-Norm $searchTitle $year
            $rec.notes = ("{0} - no reliable OMDb hit" -f $tag)
            Start-Sleep -Milliseconds $ThrottleMs
            $search = Invoke-OmdbSearch $searchTitle
            if ($search -and $search.Response -eq 'True' -and $search.Search) {
                $sug = @($search.Search | Select-Object -First 2 | ForEach-Object { '{0} ({1}) [{2}]' -f $_.Title, $_.Year, $_.imdbID }) -join '; '
                $rec.notes = Join-Note $rec.notes "Search suggestions: $sug"
            }
        }
        else {
            $rec.status = 'needs_review'
            Start-Sleep -Milliseconds $ThrottleMs
            $search = Invoke-OmdbSearch $searchTitle
            $suggestions = @()
            if ($search -and $search.Response -eq 'True' -and $search.Search) {
                $suggestions = @($search.Search | Select-Object -First 3 | ForEach-Object { '{0} ({1}) [{2}]' -f $_.Title, $_.Year, $_.imdbID })
            }
            if ($suggestions.Count -gt 0) {
                $rec.notes = 'Search suggestions: ' + ($suggestions -join '; ')
            }
            else {
                $rec.notes = Join-Note 'Movie not found' ([string]$data.Error)
            }
        }
    }

    $results.Add([pscustomobject]$rec)
    Write-Host ("[{0}/{1}] R{2} {3}: {4}" -f $n, $rows.Count, $row.Row, $rec.status, $row.Titles2)
    if (($results.Count % 15) -eq 0) {
        $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8
    }
}

$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8

# Write to pass3 copy
Write-Host "Copying pass2 -> pass3 and writing $($results.Count) rows..."
Copy-Item -LiteralPath $InputXlsx -Destination $OutputXlsx -Force
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($OutputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
if (-not $ws) { throw "Sheet missing on write-back" }

$ws.Cells.Item(1, 9).Value2 = 'normalized'
$ws.Cells.Item(1, 10).Value2 = 'omdb_title'
$ws.Cells.Item(1, 11).Value2 = 'omdb_year'
$ws.Cells.Item(1, 12).Value2 = 'imdb_id'
$ws.Cells.Item(1, 13).Value2 = 'status'
$ws.Cells.Item(1, 14).Value2 = 'proposed_category'
$ws.Cells.Item(1, 15).Value2 = 'notes'

foreach ($rec in $results) {
    $r = [int]([string]$rec.Row)
    $ws.Cells.Item($r, 9).Value2 = [string]$rec.normalized
    $ws.Cells.Item($r, 10).Value2 = [string]$rec.omdb_title
    $ws.Cells.Item($r, 11).Value2 = [string]$rec.omdb_year
    $ws.Cells.Item($r, 12).Value2 = [string]$rec.imdb_id
    $ws.Cells.Item($r, 13).Value2 = [string]$rec.status
    $ws.Cells.Item($r, 14).Value2 = [string]$rec.proposed_category
    $ws.Cells.Item($r, 15).Value2 = [string]$rec.notes
}

$wb.Save()
$wb.Close($true)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()
Write-Host "Wrote: $OutputXlsx size=$((Get-Item -LiteralPath $OutputXlsx).Length) mtime=$((Get-Item -LiteralPath $OutputXlsx).LastWriteTime)"

$groups = $results | Group-Object status
$summary = [ordered]@{}
foreach ($g in $groups) { $summary[$g.Name] = $g.Count }

$review = [pscustomobject]@{
    workbook = $OutputXlsx
    sheet    = $SheetName
    total    = $results.Count
    summary  = $summary
    needs_review = @($results | Where-Object { $_.status -eq 'needs_review' } | Select-Object Row, Titles2, SearchTitle, SearchYear, normalized, omdb_title, omdb_year, imdb_id, notes)
    placeholders = @($results | Where-Object { $_.status -like 'placeholder_*' } | Select-Object Row, Titles2, status, normalized, UserTag, notes)
    matched = @($results | Where-Object { $_.status -eq 'matched' } | Select-Object Row, Titles2, normalized, proposed_category, UserTag)
    duplicates = @($results | Where-Object { $_.status -eq 'duplicate_in_catalog' } | Select-Object Row, Titles2, normalized)
}
$review | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ReviewJson -Encoding UTF8

$md = New-Object System.Text.StringBuilder
[void]$md.AppendLine('# Titles 2.0 — third pass review')
[void]$md.AppendLine('')
[void]$md.AppendLine("**Results workbook:** ``$OutputXlsx``")
[void]$md.AppendLine("Sheet: ``$SheetName``")
[void]$md.AppendLine('')
[void]$md.AppendLine("Processed **$($results.Count)** rows (needs_review or blank normalized, with Titles 2.0).")
[void]$md.AppendLine('')
[void]$md.AppendLine('## Summary (this pass only)')
[void]$md.AppendLine('')
foreach ($k in $summary.Keys) { [void]$md.AppendLine("- **$k**: $($summary[$k])") }
[void]$md.AppendLine('')
[void]$md.AppendLine('No ``movieDatabase`` / ``main.js`` edits were made.')
[void]$md.AppendLine('')
[void]$md.AppendLine("## Matched ($($review.matched.Count))")
[void]$md.AppendLine('')
foreach ($item in $review.matched) {
    [void]$md.AppendLine("- Row $($item.Row): ``$($item.Titles2)`` -> ``$($item.normalized)`` | $($item.proposed_category)")
}
[void]$md.AppendLine('')
[void]$md.AppendLine("## Placeholders ($($review.placeholders.Count))")
[void]$md.AppendLine('')
foreach ($item in $review.placeholders) {
    [void]$md.AppendLine("- Row $($item.Row): ``$($item.status)`` | ``$($item.normalized)`` | $($item.notes)")
}
[void]$md.AppendLine('')
[void]$md.AppendLine("## Still needs review ($($review.needs_review.Count))")
[void]$md.AppendLine('')
foreach ($item in $review.needs_review) {
    $line = "- Row $($item.Row): ``$($item.Titles2)``"
    if ($item.normalized) { $line += " -> ``$($item.normalized)``" }
    if ($item.imdb_id) { $line += (' [{0}]' -f $item.imdb_id) }
    if ($item.notes) { $line += " | $($item.notes)" }
    [void]$md.AppendLine($line)
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## HOLD')
[void]$md.AppendLine('')
[void]$md.AppendLine('Do not add to movieDatabase until you confirm matched rows.')
Set-Content -LiteralPath $ReviewMd -Value $md.ToString() -Encoding UTF8

Write-Host '=== PASS3 SUMMARY ==='
$summary.GetEnumerator() | ForEach-Object { Write-Host ("{0}: {1}" -f $_.Key, $_.Value) }
Write-Host "Review: $ReviewMd"
Write-Host 'HOLD: no movieDatabase edits.'
