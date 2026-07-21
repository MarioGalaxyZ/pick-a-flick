#Requires -Version 5.1
<#
.SYNOPSIS
  Pass 4: fill blank normalized (col I) on Movie Titles (2).
  Harder OMDb retries, tags including "tv movie", always write non-empty I.
  Writes pass4.xlsx. Does not edit movieDatabase.
#>
$ErrorActionPreference = 'Stop'

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$InputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass3.xlsx'
$OutputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass4.xlsx'
$SheetName = 'Movie Titles (2)'
$ProgressJson = Join-Path $Root 'scripts\_tmp-titles2-pass4-progress.json'
$ReviewJson = Join-Path $Root 'scripts\_tmp-titles2-pass4-review.json'
$ReviewMd = Join-Path $Root 'scripts\_tmp-titles2-pass4-review.md'
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
    # Two-word tag first
    if ($t -match '(?i)^(.*?),\s*(tv\s+movie)\s*$') {
        $t = $Matches[1].Trim()
        $tag = 'tv_movie'
    }
    elseif ($t -match '(?i)^(.*?)\s+(tv\s+movie)\s*$') {
        $t = $Matches[1].Trim()
        $tag = 'tv_movie'
    }
    elseif ($t -match '(?i)^(.*?),\s*(tv|educational|documentary|workout|exercise)\s*$') {
        $t = $Matches[1].Trim()
        $tag = $Matches[2].ToLowerInvariant()
    }
    elseif ($t -match '(?i)^(.*?)\s+(tv|educational|documentary|workout|exercise)\s*$') {
        $t = $Matches[1].Trim()
        $tag = $Matches[2].ToLowerInvariant()
    }
    if ($t -match '(?i)\b(Workout|Pilates|15 Minute Workout)\b') { $tag = 'workout' }
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
        $t = $Matches[1].Trim(); $year = $Matches[2]
    }
    elseif ($t -match '^(.*?)\s*\(TV Movie\s+(\d{4})\)\s*$') {
        $t = $Matches[1].Trim(); $year = $Matches[2]
    }
    elseif ($t -match '^(.*?\D)\s+(\d{4})\s*$') {
        $t = $Matches[1].Trim().TrimEnd(',').Trim(); $year = $Matches[2]
    }
    $t = ($t -replace '\s+is a\s+.+$', '').Trim()
    return [pscustomobject]@{ SearchTitle = $t; Year = $year }
}

function Format-Norm([string]$title, [string]$year) {
    if ($year) { return "$title ($year)" }
    return $title
}

function Get-PlaceholderStatus([string]$tag) {
    switch ($tag) {
        'tv' { return 'placeholder_tv' }
        'tv_movie' { return 'placeholder_tv' }
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
    $title = [string]$omdb.Title
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

function Invoke-OmdbByImdbId([string]$imdbId) {
    $key = $script:OmdbKeys.Key
    $url = "https://www.omdbapi.com/?i=$([uri]::EscapeDataString($imdbId))&apikey=$key"
    try {
        return Invoke-RestMethod -Uri $url -Method Get
    } catch {
        if (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $_.Exception.Message) {
            $key = $script:OmdbKeys.Key
            $url = "https://www.omdbapi.com/?i=$([uri]::EscapeDataString($imdbId))&apikey=$key"
            return Invoke-RestMethod -Uri $url -Method Get
        }
        throw
    }
}

function Get-TitleAlternates([string]$title, [string]$year) {
    $alts = New-Object System.Collections.Generic.List[object]
    $alts.Add([pscustomobject]@{ Title = $title; Year = $year }) | Out-Null

    if ($title -match '(?i)^Miss Congeniality\s*2') {
        $alts.Add([pscustomobject]@{ Title = 'Miss Congeniality 2'; Year = '2005' }) | Out-Null
        $alts.Add([pscustomobject]@{ Title = 'Miss Congeniality 2: Armed and Fabulous'; Year = '2005' }) | Out-Null
        $alts.Add([pscustomobject]@{ Title = 'Miss Congeniality: Armed and Fabulous'; Year = '2005' }) | Out-Null
        $alts.Add([pscustomobject]@{ Title = 'Miss Congeniality 2 Armed and Fabulous'; Year = '2005' }) | Out-Null
    }
    if ($title -match '(?i)^VeggieTales:\s*Larry-Boy') {
        $alts.Add([pscustomobject]@{ Title = 'Larry-Boy and the Fib from Outer Space'; Year = $year }) | Out-Null
        $alts.Add([pscustomobject]@{ Title = 'VeggieTales LarryBoy and the Fib from Outer Space'; Year = $year }) | Out-Null
    }
    if ($title -match '(?i)^The Beverly Hillbillies') {
        $alts.Add([pscustomobject]@{ Title = 'The Beverly Hillbillies'; Year = '1993' }) | Out-Null
        $alts.Add([pscustomobject]@{ Title = 'Beverly Hillbillies'; Year = '1993' }) | Out-Null
    }
    if ($title -match '(?i)Chariots of the Gods') {
        $alts.Add([pscustomobject]@{ Title = 'Chariots of the Gods'; Year = '1970' }) | Out-Null
        $alts.Add([pscustomobject]@{ Title = 'Chariots of the Gods The Mysteries Continue'; Year = '1996' }) | Out-Null
    }
    if ($title -match '(?i)^Lassie:') {
        $bare = ($title -replace '(?i)^Lassie:\s*', '').Trim()
        $alts.Add([pscustomobject]@{ Title = $bare; Year = $year }) | Out-Null
    }

    # Deduplicate
    $seen = @{}
    $out = @()
    foreach ($a in $alts) {
        $k = "$($a.Title)|$($a.Year)"
        if (-not $seen.ContainsKey($k)) { $seen[$k] = $true; $out += $a }
    }
    return $out
}

function Get-OmdbHitEnhanced([string]$title, [string]$year) {
    foreach ($alt in (Get-TitleAlternates $title $year)) {
        Start-Sleep -Milliseconds $ThrottleMs
        $data = Invoke-OmdbByTitle $alt.Title $alt.Year
        if ($data.Response -eq 'False' -and (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $data)) {
            $data = Invoke-OmdbByTitle $alt.Title $alt.Year
        }
        if ($data.Response -eq 'True') { return $data }
        if ($alt.Year) {
            Start-Sleep -Milliseconds $ThrottleMs
            $data = Invoke-OmdbByTitle $alt.Title $null
            if ($data.Response -eq 'True') { return $data }
        }
    }

    # Search fallback
    $searchQueries = @($title)
    if ($title -match '(?i)Miss Congeniality') { $searchQueries += 'Miss Congeniality 2'; $searchQueries += 'Armed and Fabulous' }
    if ($title -match '(?i)Larry-Boy|LarryBoy') { $searchQueries += 'Larry-Boy Fib Outer Space' }
    if ($title -match '(?i)Beverly Hillbillies') { $searchQueries += 'Beverly Hillbillies' }

    foreach ($q in $searchQueries) {
        Start-Sleep -Milliseconds $ThrottleMs
        $search = Invoke-OmdbSearch $q
        if (-not $search -or $search.Response -ne 'True' -or -not $search.Search) { continue }
        $candidates = @($search.Search)
        $pick = $null
        if ($title -match '(?i)Miss Congeniality') {
            $pick = $candidates | Where-Object {
                ([string]$_.Title -match '(?i)Congeniality') -and ([string]$_.Title -match '(?i)Armed|2')
            } | Select-Object -First 1
        }
        if (-not $pick -and $year) {
            $pick = $candidates | Where-Object { [string]$_.Year -eq $year } | Select-Object -First 1
        }
        if (-not $pick -and $candidates.Count -eq 1) { $pick = $candidates[0] }
        if ($pick -and $pick.imdbID) {
            Start-Sleep -Milliseconds $ThrottleMs
            $byId = Invoke-OmdbByImdbId ([string]$pick.imdbID)
            if ($byId.Response -eq 'True') { return $byId }
        }
    }

    return [pscustomobject]@{ Response = 'False'; Error = 'Movie not found' }
}

$catalog = Get-CatalogListings
Write-Host "Catalog listings: $($catalog.Count); key=$(Get-OmdbKeySessionDescribe $script:OmdbKeys)"

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($InputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
if (-not $ws) { throw "Sheet '$SheetName' not found" }

$lastRow = $ws.UsedRange.Rows.Count
$rows = @()
for ($r = 2; $r -le $lastRow; $r++) {
    $i = [string]$ws.Cells.Item($r, 9).Text
    if (-not [string]::IsNullOrWhiteSpace($i)) { continue }
    $b = [string]$ws.Cells.Item($r, 2).Text
    $a = [string]$ws.Cells.Item($r, 1).Text
    $f = [string]$ws.Cells.Item($r, 6).Text
    if ([string]::IsNullOrWhiteSpace($b)) {
        # Still fill from A if somehow blank B
        $b = $a
    }
    $rows += [pscustomobject]@{
        Row      = $r
        Original = $a.Trim()
        Titles2  = $b.Trim()
        YearF    = if ($f -match '(\d{4})') { $Matches[1] } else { $null }
    }
}
Write-Host "Blank-I rows to fill: $($rows.Count)"

$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()

$results = New-Object System.Collections.Generic.List[object]
$n = 0
foreach ($row in $rows) {
    $n++
    $split = Split-UserTag $row.Titles2
    $tag = $split.Tag
    $cleaned = Clean-Titles2 $split.Text
    $searchTitle = $cleaned.SearchTitle
    $year = $cleaned.Year
    if (-not $year -and $row.YearF) { $year = $row.YearF }
    # Miss Congeniality 2 default year
    if (-not $year -and $searchTitle -match '(?i)Miss Congeniality\s*2') { $year = '2005' }

    $fallbackNorm = Format-Norm $searchTitle $year
    if ([string]::IsNullOrWhiteSpace($fallbackNorm)) { $fallbackNorm = $row.Titles2 }

    $rec = [ordered]@{
        Row               = $row.Row
        Original          = $row.Original
        Titles2           = $row.Titles2
        UserTag           = $tag
        SearchTitle       = $searchTitle
        SearchYear        = $year
        normalized        = $fallbackNorm
        omdb_title        = $null
        omdb_year         = $null
        imdb_id           = $null
        status            = 'needs_review'
        proposed_category = $null
        notes             = $null
    }

    try {
        $data = Get-OmdbHitEnhanced $searchTitle $year
    } catch {
        if ($tag) {
            $rec.status = Get-PlaceholderStatus $tag
            $rec.normalized = $fallbackNorm
            $rec.notes = Join-Note ("{0} - OMDb error; filled from Titles 2.0" -f $tag) $_.Exception.Message
        } else {
            $rec.status = 'needs_review'
            $rec.normalized = $fallbackNorm
            $rec.notes = Join-Note 'OMDb error; filled from Titles 2.0' $_.Exception.Message
        }
        $results.Add([pscustomobject]$rec)
        Write-Host ("[{0}/{1}] R{2} {3}: {4}" -f $n, $rows.Count, $row.Row, $rec.status, $rec.normalized)
        continue
    }

    if ($data.Response -eq 'True') {
        $rec.omdb_title = [string]$data.Title
        $oy = ([string]$data.Year) -replace '[–-].*', ''
        if ($oy -match '^(\d{4})') { $rec.omdb_year = $Matches[1] } else { $rec.omdb_year = $oy }
        $rec.imdb_id = [string]$data.imdbID
        $rec.normalized = ('{0} ({1})' -f $rec.omdb_title, $rec.omdb_year)

        if ($data.Type -eq 'series' -or $data.Type -eq 'episode') {
            $rec.status = 'placeholder_tv'
            $rec.notes = Join-Note ('OMDb Type={0} - parked as TV' -f $data.Type) $(if ($tag) { "user tag was $tag" } else { $null })
            if ($tag -eq 'educational') {
                $rec.status = 'placeholder_educational'
                $rec.normalized = $fallbackNorm
                $rec.notes = 'educational tag; OMDb returned series/episode - parked educational'
                $rec.omdb_title = $null; $rec.omdb_year = $null; $rec.imdb_id = $null
            }
        }
        elseif (Test-IsInCatalog $rec.normalized $catalog $rec.omdb_title $rec.omdb_year) {
            $rec.status = 'duplicate_in_catalog'
            $rec.notes = 'Exact Title (Year) already in movieDatabase'
            $rec.proposed_category = Propose-Category $data
        }
        else {
            $rec.status = 'matched'
            $rec.notes = if ($tag) { "user tag was $tag; OMDb matched" } else { 'OMDb matched (pass4 enhanced lookup)' }
            $rec.proposed_category = Propose-Category $data
        }
    }
    else {
        if ($tag) {
            $rec.status = Get-PlaceholderStatus $tag
            $rec.normalized = $fallbackNorm
            $rec.notes = ("{0} - no reliable OMDb hit; filled from Titles 2.0" -f $tag)
        }
        else {
            $rec.status = 'needs_review'
            $rec.normalized = $fallbackNorm
            $rec.notes = 'Movie not found after enhanced retries; filled from Titles 2.0'
            Start-Sleep -Milliseconds $ThrottleMs
            $search = Invoke-OmdbSearch $searchTitle
            if ($search -and $search.Response -eq 'True' -and $search.Search) {
                $sug = @($search.Search | Select-Object -First 3 | ForEach-Object { '{0} ({1}) [{2}]' -f $_.Title, $_.Year, $_.imdbID }) -join '; '
                $rec.notes = Join-Note $rec.notes ("Search suggestions: {0}" -f $sug)
            }
        }
    }

    if ([string]::IsNullOrWhiteSpace([string]$rec.normalized)) {
        $rec.normalized = $fallbackNorm
    }

    $results.Add([pscustomobject]$rec)
    Write-Host ("[{0}/{1}] R{2} {3}: {4}" -f $n, $rows.Count, $row.Row, $rec.status, $rec.normalized)
}

$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8

Write-Host "Writing $($results.Count) rows to pass4..."
Copy-Item -LiteralPath $InputXlsx -Destination $OutputXlsx -Force
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($OutputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
if (-not $ws) { throw 'Sheet missing on write-back' }

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

# Verify zero blanks
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($OutputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
$blankLeft = 0
$lastRow = $ws.UsedRange.Rows.Count
for ($r = 2; $r -le $lastRow; $r++) {
    $a = [string]$ws.Cells.Item($r, 1).Text
    if ([string]::IsNullOrWhiteSpace($a)) { continue }
    $i = [string]$ws.Cells.Item($r, 9).Text
    if ([string]::IsNullOrWhiteSpace($i)) { $blankLeft++ }
}
$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()

$groups = $results | Group-Object status
$summary = [ordered]@{}
foreach ($g in $groups) { $summary[$g.Name] = $g.Count }

$review = [pscustomobject]@{
    workbook   = $OutputXlsx
    sheet      = $SheetName
    processed  = $results.Count
    blank_left = $blankLeft
    summary    = $summary
    rows       = @($results | Select-Object Row, Titles2, status, normalized, imdb_id, notes)
}
$review | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ReviewJson -Encoding UTF8

$md = New-Object System.Text.StringBuilder
[void]$md.AppendLine('# Titles 2.0 - pass 4 review (fill blank normalized)')
[void]$md.AppendLine('')
[void]$md.AppendLine("**Results workbook:** ``$OutputXlsx``")
[void]$md.AppendLine("Sheet: ``$SheetName``")
[void]$md.AppendLine('')
[void]$md.AppendLine("Processed **$($results.Count)** previously blank-I rows.")
[void]$md.AppendLine("Blank I remaining on sheet: **$blankLeft**")
[void]$md.AppendLine('')
[void]$md.AppendLine('## Summary (this pass)')
[void]$md.AppendLine('')
foreach ($k in $summary.Keys) { [void]$md.AppendLine("- **$k**: $($summary[$k])") }
[void]$md.AppendLine('')
[void]$md.AppendLine('No movieDatabase / main.js edits.')
[void]$md.AppendLine('')
[void]$md.AppendLine('## All processed rows')
[void]$md.AppendLine('')
foreach ($item in $results) {
    [void]$md.AppendLine(('- Row {0}: `{1}` -> `{2}` | {3} | {4}' -f $item.Row, $item.Titles2, $item.normalized, $item.status, $item.notes))
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## HOLD')
[void]$md.AppendLine('')
[void]$md.AppendLine('Ready for next steps once you confirm. Do not add to movieDatabase until asked.')
Set-Content -LiteralPath $ReviewMd -Value $md.ToString() -Encoding UTF8

Write-Host '=== PASS4 SUMMARY ==='
$summary.GetEnumerator() | ForEach-Object { Write-Host ("{0}: {1}" -f $_.Key, $_.Value) }
Write-Host "blank_left=$blankLeft"
Write-Host "Wrote: $OutputXlsx"
Write-Host "Review: $ReviewMd"
if ($blankLeft -ne 0) { throw "Expected 0 blank I cells, found $blankLeft" }
Write-Host 'HOLD: no movieDatabase edits.'
