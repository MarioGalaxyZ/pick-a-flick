#Requires -Version 5.1
<#
.SYNOPSIS
  Second OMDb pass on sheet "Movie Titles (2)" using Titles 2.0 (col B).
  Writes columns I-O. Does not edit movieDatabase.
#>
$ErrorActionPreference = 'Stop'

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$WorkXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb normalized.xlsx'
$OutputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass2.xlsx'
$SheetName = 'Movie Titles (2)'
$ProgressJson = Join-Path $Root 'scripts\_tmp-titles2-pass2-progress.json'
$ReviewJson = Join-Path $Root 'scripts\_tmp-titles2-pass2-review.json'
$ReviewMd = Join-Path $Root 'scripts\_tmp-titles2-pass2-review.md'
$MainJs = Join-Path $Root 'app\main.js'
$EnvFile = Join-Path $Root '.env'
$ThrottleMs = 280

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

function Test-UnsplitMultiTitle([string]$b) {
    if (-not $b) { return $false }
    if ($b -match '(?i)^Oh,\s*God!') { return $false }
    $known = @(
        '(?i)^Back to the Future,\s*Back to the Future Part II',
        '(?i)^Beverly Hills Cop,\s*Beverly Hills Cop II',
        '(?i)^Crocodile Dundee,\s*Crocodile Dundee II',
        '(?i)^Die Hard,\s*Die Hard 2'
    )
    foreach ($p in $known) { if ($b -match $p) { return $true } }
    return $false
}

function Get-PlaceholderKind([string]$b, [string]$a) {
    if (-not $b) { return $null }
    $t = $b.Trim()
    if ($t -match '(?i)^Family Home Video$') { return 'family' }
    if ($t -match '(?i)^(truly\s+)?unknown$') { return 'unknown' }
    if ($t -match '(?i)Adventures in Odyssey') { return 'video' }
    # Do NOT match bare "Episode" (Star Wars: Episode IV, etc.)
    if ($t -match '(?i)\bTV Series\b|\bDVD series\b|\bSeason\s+(\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten)\b|\bThe Complete .+ Season\b|\bEpisode aired\b|\b\d+\s+episodes?\b|\bDiscs?\s+\d') { return 'tv' }
    if ($t -match '(?i)^tv show$') { return 'tv' }
    if ($t -match '(?i)\bTV Movie\b|\btelevision special\b|\bTV special\b') { return 'tv_movie' }
    return $null
}

function Clean-Titles2([string]$b) {
    $t = ($b -replace '\s+', ' ').Trim()
    $year = $null

    # Strip trailing rating tokens
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

    # Strip wiki-ish tails
    $t = $t -replace '\s+is a\s+.+$', ''
    $t = $t.Trim()

    return [pscustomobject]@{ SearchTitle = $t; Year = $year }
}

function Format-PlaceholderNormalized([string]$kind, [string]$a, [string]$b, [string]$yearF) {
    $cleaned = Clean-Titles2 $b
    $year = $cleaned.Year
    if (-not $year -and $yearF -match '^\d{4}$') { $year = $yearF }

    switch ($kind) {
        'family' {
            if ($year) { return "Family Home Video ($year)" }
            return 'Family Home Video'
        }
        'unknown' {
            $label = if ($a) { $a.Trim() } else { 'Unknown Title' }
            if ($year) { return "$label ($year)" }
            return "$label (unknown)"
        }
        'video' {
            $title = $cleaned.SearchTitle
            if ($year) { return "$title ($year)" }
            return $title
        }
        'tv' {
            $title = $cleaned.SearchTitle
            if ($year) { return "$title ($year)" }
            return $title
        }
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
    if ($genre -match '(?i)Sci-Fi|Science Fiction' -and ($plot -match '(?i)alien|extraterrestrial|invasion|UFO' -or $title -match '(?i)Alien|Mars|Predator|Independence Day|Arrival|Contact|District 9')) {
        return $C.ALIEN_ALLEY
    }
    if ($genre -match '(?i)Horror|Thriller' -and $genre -notmatch '(?i)Comedy') { return $C.MOVIES_TO_FALL_ASLEEP_TO }
    if ($genre -match '(?i)Sci-Fi' -and ($plot -match '(?i)cyber|neon|android|dystopia' -or $genre -match '(?i)Crime')) { return $C.NEON_AND_NINETIES }
    if ($genre -match '(?i)Comedy|Fantasy') { return $C.WACKY_WAY }
    if ($genre -match '(?i)Sci-Fi') { return $C.NEON_AND_NINETIES }
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

# Load rows from Excel
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($WorkXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) {
    if ($s.Name -eq $SheetName) { $ws = $s; break }
}
if (-not $ws) {
    $names = @($wb.Worksheets | ForEach-Object { $_.Name }) -join ', '
    throw "Sheet '$SheetName' not found. Sheets: $names"
}

$lastRow = $ws.UsedRange.Rows.Count
$rows = @()
for ($r = 2; $r -le $lastRow; $r++) {
    $a = [string]$ws.Cells.Item($r, 1).Text
    $b = [string]$ws.Cells.Item($r, 2).Text
    $f = [string]$ws.Cells.Item($r, 6).Text
    if ([string]::IsNullOrWhiteSpace($b)) { continue }
    $rows += [pscustomobject]@{
        Row      = $r
        Original = $a.Trim()
        Titles2  = $b.Trim()
        YearF    = if ($f -match '(\d{4})') { $Matches[1] } else { $null }
    }
}
Write-Host "Titles 2.0 rows to process: $($rows.Count)"

$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()

$resultsByRow = @{}
if (Test-Path $ProgressJson) {
    $prev = Get-Content -LiteralPath $ProgressJson -Raw | ConvertFrom-Json
    foreach ($item in @($prev)) { $resultsByRow[[int]$item.Row] = $item }
    Write-Host "Resumed $($resultsByRow.Count) prior results"
}

$results = New-Object System.Collections.Generic.List[object]
$i = 0
foreach ($row in $rows) {
    $i++
    if ($resultsByRow.ContainsKey([int]$row.Row)) {
        $results.Add($resultsByRow[[int]$row.Row])
        continue
    }

    $a = $row.Original
    $b = $row.Titles2
    $yearF = $row.YearF

    $rec = [ordered]@{
        Row               = $row.Row
        Original          = $a
        Titles2           = $b
        SearchTitle       = $null
        SearchYear        = $null
        normalized        = $null
        omdb_title        = $null
        omdb_year         = $null
        imdb_id           = $null
        status            = $null
        proposed_category = $null
        notes             = $null
    }

    if (Test-UnsplitMultiTitle $b) {
        $rec.status = 'needs_review'
        $rec.notes = 'split into separate rows like F/X (multi-title still in Titles 2.0)'
        $results.Add([pscustomobject]$rec)
        Write-Host "[$i/$($rows.Count)] R$($row.Row) needs_review (unsplit multi): $b"
        if (($results.Count % 20) -eq 0) { $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8 }
        continue
    }

    $kind = Get-PlaceholderKind $b $a
    if ($kind -and $kind -ne 'tv_movie') {
        $statusMap = @{
            family  = 'placeholder_family'
            unknown = 'placeholder_unknown'
            tv      = 'placeholder_tv'
            video   = 'placeholder_video'
        }
        $noteMap = @{
            family  = 'family home video — no OMDb'
            unknown = 'unknown title — placeholder'
            tv      = 'tv/series — deferred'
            video   = 'direct-to-video / Odyssey — placeholder'
        }
        $rec.status = $statusMap[$kind]
        $rec.normalized = Format-PlaceholderNormalized $kind $a $b $yearF
        $rec.notes = $noteMap[$kind]
        $results.Add([pscustomobject]$rec)
        Write-Host "[$i/$($rows.Count)] R$($row.Row) $($rec.status): $b"
        if (($results.Count % 20) -eq 0) { $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8 }
        continue
    }

    $cleaned = Clean-Titles2 $b
    $searchTitle = $cleaned.SearchTitle
    $year = $cleaned.Year
    if (-not $year -and $yearF) { $year = $yearF }
    $rec.SearchTitle = $searchTitle
    $rec.SearchYear = $year

    # TV movies: still try OMDb (they're often in OMDb as movie)
    try {
        Start-Sleep -Milliseconds $ThrottleMs
        $data = Get-OmdbHit $searchTitle $year
    } catch {
        $rec.status = 'needs_review'
        $rec.notes = "OMDb request error: $($_.Exception.Message)"
        $results.Add([pscustomobject]$rec)
        continue
    }

    if ($data.Response -eq 'True') {
        $rec.omdb_title = [string]$data.Title
        $oy = ([string]$data.Year) -replace '[–-].*', ''
        if ($oy -match '^(\d{4})') { $rec.omdb_year = $Matches[1] } else { $rec.omdb_year = $oy }
        $rec.imdb_id = [string]$data.imdbID
        $rec.normalized = "$($rec.omdb_title) ($($rec.omdb_year))"

        if ($data.Type -eq 'series') {
            $rec.status = 'placeholder_tv'
            $rec.notes = 'OMDb Type=series — parked as TV placeholder'
            $rec.proposed_category = $null
        }
        elseif ($data.Type -eq 'episode') {
            $rec.status = 'placeholder_tv'
            $rec.notes = 'OMDb Type=episode — parked as TV placeholder'
        }
        elseif ($year -and $rec.omdb_year -and ($year -ne $rec.omdb_year)) {
            $rec.status = 'needs_review'
            $rec.notes = "Year clash: lookup=$year OMDb=$($rec.omdb_year)"
            $rec.proposed_category = Propose-Category $data
        }
        else {
            if (Test-IsInCatalog $rec.normalized $catalog $rec.omdb_title $rec.omdb_year) {
                $rec.status = 'duplicate_in_catalog'
                $rec.notes = 'Exact Title (Year) already in movieDatabase'
            }
            else {
                $rec.status = 'matched'
                if ($kind -eq 'tv_movie') { $rec.notes = 'TV movie — OMDb matched' }
            }
            $rec.proposed_category = Propose-Category $data
        }
    }
    else {
        Start-Sleep -Milliseconds $ThrottleMs
        $search = Invoke-OmdbSearch $searchTitle
        $suggestions = @()
        if ($search -and $search.Response -eq 'True' -and $search.Search) {
            $suggestions = @($search.Search | Select-Object -First 3 | ForEach-Object { "$($_.Title) ($($_.Year)) [$($_.imdbID)]" })
        }
        $rec.status = 'needs_review'
        if ($suggestions.Count -gt 0) {
            $rec.notes = 'Search suggestions: ' + ($suggestions -join '; ')
        }
        else {
            $rec.notes = Join-Note 'Movie not found' ([string]$data.Error)
        }
    }

    $results.Add([pscustomobject]$rec)
    Write-Host ("[{0}/{1}] R{2} {3}: {4}" -f $i, $rows.Count, $row.Row, $rec.status, $b)

    if (($results.Count % 15) -eq 0) {
        $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8
    }
}

$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8
Write-Host "Writing $($results.Count) rows to Excel sheet '$SheetName'..."

# Write to pass2 copy — source xlsx is often locked open in Excel
Copy-Item -LiteralPath $WorkXlsx -Destination $OutputXlsx -Force
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($OutputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
if (-not $ws) { throw "Sheet '$SheetName' missing on write-back" }

# Ensure headers I-O
$ws.Cells.Item(1, 9).Value2 = 'normalized'
$ws.Cells.Item(1, 10).Value2 = 'omdb_title'
$ws.Cells.Item(1, 11).Value2 = 'omdb_year'
$ws.Cells.Item(1, 12).Value2 = 'imdb_id'
$ws.Cells.Item(1, 13).Value2 = 'status'
$ws.Cells.Item(1, 14).Value2 = 'proposed_category'
$ws.Cells.Item(1, 15).Value2 = 'notes'

foreach ($rec in $results) {
    $r = [int]$rec.Row
    $ws.Cells.Item($r, 9).Value2 = $rec.normalized
    $ws.Cells.Item($r, 10).Value2 = $rec.omdb_title
    $ws.Cells.Item($r, 11).Value2 = $rec.omdb_year
    $ws.Cells.Item($r, 12).Value2 = $rec.imdb_id
    $ws.Cells.Item($r, 13).Value2 = $rec.status
    $ws.Cells.Item($r, 14).Value2 = $rec.proposed_category
    $ws.Cells.Item($r, 15).Value2 = $rec.notes
}

$wb.Save()
$wb.Close($true)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()
Write-Host "Wrote results to: $OutputXlsx"

$groups = $results | Group-Object status
$summary = [ordered]@{}
foreach ($g in $groups) { $summary[$g.Name] = $g.Count }

$review = [pscustomobject]@{
    workbook = $OutputXlsx
    sheet    = $SheetName
    total    = $results.Count
    summary  = $summary
    needs_review = @($results | Where-Object { $_.status -eq 'needs_review' } | Select-Object Row, Original, Titles2, SearchTitle, SearchYear, normalized, omdb_title, omdb_year, imdb_id, notes)
    unsplit_multis = @($results | Where-Object { $_.notes -match 'split into separate rows' } | Select-Object Row, Original, Titles2, notes)
    placeholders = @($results | Where-Object { $_.status -like 'placeholder_*' } | Select-Object Row, Original, Titles2, status, normalized, notes)
    matched = @($results | Where-Object { $_.status -eq 'matched' } | Select-Object Row, Original, Titles2, normalized, proposed_category)
    duplicates = @($results | Where-Object { $_.status -eq 'duplicate_in_catalog' } | Select-Object Row, Original, normalized)
}

$review | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ReviewJson -Encoding UTF8

$md = New-Object System.Text.StringBuilder
[void]$md.AppendLine('# Titles 2.0 — second pass review')
[void]$md.AppendLine('')
[void]$md.AppendLine("Workbook: ``$WorkXlsx``")
[void]$md.AppendLine("Sheet: ``$SheetName``")
[void]$md.AppendLine('')
[void]$md.AppendLine('## Summary')
[void]$md.AppendLine('')
foreach ($k in $summary.Keys) { [void]$md.AppendLine("- **$k**: $($summary[$k])") }
[void]$md.AppendLine('')
[void]$md.AppendLine('No ``movieDatabase`` / ``main.js`` edits were made.')
[void]$md.AppendLine('')
[void]$md.AppendLine('## Unsplit multi-title rows (split like F/X)')
[void]$md.AppendLine('')
foreach ($item in $review.unsplit_multis) {
    [void]$md.AppendLine("- Row $($item.Row): ``$($item.Titles2)``")
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## Needs review')
[void]$md.AppendLine('')
foreach ($item in $review.needs_review) {
    $line = "- Row $($item.Row): ``$($item.Titles2)``"
    if ($item.normalized) { $line += " -> ``$($item.normalized)``" }
    if ($item.imdb_id) { $line += " [$($item.imdb_id)]" }
    if ($item.notes) { $line += " | $($item.notes)" }
    [void]$md.AppendLine($line)
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## Placeholders')
[void]$md.AppendLine('')
foreach ($item in $review.placeholders) {
    [void]$md.AppendLine("- Row $($item.Row): ``$($item.status)`` | ``$($item.normalized)`` | $($item.notes)")
}
[void]$md.AppendLine('')
[void]$md.AppendLine("## Matched ($($review.matched.Count))")
[void]$md.AppendLine('')
foreach ($item in $review.matched) {
    [void]$md.AppendLine("- Row $($item.Row): ``$($item.Titles2)`` -> ``$($item.normalized)`` | $($item.proposed_category)")
}

Set-Content -LiteralPath $ReviewMd -Value $md.ToString() -Encoding UTF8

Write-Host '=== SUMMARY ==='
$summary.GetEnumerator() | ForEach-Object { Write-Host ("{0}: {1}" -f $_.Key, $_.Value) }
Write-Host "Review MD: $ReviewMd"
Write-Host "Workbook: $WorkXlsx sheet=$SheetName"
Write-Host 'HOLD: no movieDatabase edits.'
