#Requires -Version 5.1
<#
.SYNOPSIS
  Pass 6: clear needs_review by accepting normalized (col I) years,
  and re-OMDb rows where Titles 2.0 was corrected (Dangerous Journey, Johnny Appleseed).
  Writes pass6.xlsx. Does not edit movieDatabase.
#>
$ErrorActionPreference = 'Stop'

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$InputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass5.xlsx'
$OutputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass6.xlsx'
$SheetName = 'Movie Titles (2)'
$ProgressJson = Join-Path $Root 'scripts\_tmp-titles2-pass6-progress.json'
$ReviewJson = Join-Path $Root 'scripts\_tmp-titles2-pass6-review.json'
$ReviewMd = Join-Path $Root 'scripts\_tmp-titles2-pass6-review.md'
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

function Test-IsInCatalog([string]$normalized, $catalog) {
    if ($normalized -and $catalog.Contains($normalized)) { return $true }
    foreach ($item in $catalog) {
        if ([string]::Equals($item, $normalized, [StringComparison]::OrdinalIgnoreCase)) { return $true }
    }
    return $false
}

function Get-YearFromText([string]$text) {
    if (-not $text) { return $null }
    if ($text -match '^\s*(\d{4})\s*$') { return $Matches[1] }
    if ($text -match '\((\d{4})\)') { return $Matches[1] }
    if ($text -match '(?:^|\s)(\d{4})(?:\s|$)') { return $Matches[1] }
    return $null
}

function Get-TitleWithoutYear([string]$text) {
    if (-not $text) { return $null }
    $t = $text.Trim()
    if ($t -match '^(.*?)\s*\((\d{4})\)\s*$') { return $Matches[1].Trim() }
    if ($t -match '^(.*?\D)\s+(\d{4})\s*$') { return $Matches[1].Trim() }
    return $t
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
    if ($genre -match '(?i)Family') { return $C.ANIMATION_STATION }
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

function Apply-OmdbHit($rec, $data, $catalog, [string]$note) {
    $oy = ([string]$data.Year) -replace '[–-].*', ''
    if ($oy -match '^(\d{4})') { $oy = $Matches[1] }
    $rec.omdb_title = [string]$data.Title
    $rec.omdb_year = $oy
    $rec.imdb_id = [string]$data.imdbID
    $rec.normalized = ('{0} ({1})' -f $rec.omdb_title, $rec.omdb_year)
    if ($data.Type -eq 'series' -or $data.Type -eq 'episode') {
        $rec.status = 'needs_review'
        $rec.notes = Join-Note $note ('OMDb Type={0}' -f $data.Type)
        return
    }
    if (Test-IsInCatalog $rec.normalized $catalog) {
        $rec.status = 'duplicate_in_catalog'
        $rec.notes = Join-Note $note 'already in movieDatabase'
    } else {
        $rec.status = 'matched'
        $rec.notes = $note
    }
    $rec.proposed_category = Propose-Category $data
}

function Test-IsYearOnly([string]$b) {
    return ($b -match '^\s*\d{4}\s*$')
}

function Test-BIsTitleCorrection([string]$b, [string]$i) {
    if ([string]::IsNullOrWhiteSpace($b)) { return $false }
    if (Test-IsYearOnly $b) { return $true } # year-only correction for Johnny Appleseed
    $bTitle = Get-TitleWithoutYear $b
    $iTitle = Get-TitleWithoutYear $i
    $bYear = Get-YearFromText $b
    $iYear = Get-YearFromText $i
    # Dangerous Journey style: I blank or title differs
    if ([string]::IsNullOrWhiteSpace($i)) { return $true }
    if ($bTitle -and $iTitle -and ($bTitle -ne $iTitle)) { return $true }
    # Same title, B year disagrees with I - for LCD/Steve/Veggie plan says prefer I, so NOT a B correction path
    if ($bYear -and $iYear -and ($bYear -ne $iYear) -and $bTitle -and $iTitle -and ($bTitle -eq $iTitle)) {
        return $false
    }
    # B agrees with I (same title+year) -> promote via I
    return $false
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
    $status = ([string]$ws.Cells.Item($r, 13).Text).Trim()
    if ($status -ne 'needs_review') { continue }
    $rows += [pscustomobject]@{
        Row = $r
        A   = ([string]$ws.Cells.Item($r, 1).Text).Trim()
        B   = ([string]$ws.Cells.Item($r, 2).Text).Trim()
        F   = ([string]$ws.Cells.Item($r, 6).Text).Trim()
        I   = ([string]$ws.Cells.Item($r, 9).Text).Trim()
        J   = ([string]$ws.Cells.Item($r, 10).Text).Trim()
        K   = ([string]$ws.Cells.Item($r, 11).Text).Trim()
        L   = ([string]$ws.Cells.Item($r, 12).Text).Trim()
        N   = ([string]$ws.Cells.Item($r, 14).Text).Trim()
        O   = ([string]$ws.Cells.Item($r, 15).Text).Trim()
    }
}
Write-Host "needs_review rows: $($rows.Count)"

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
    $rec = [ordered]@{
        Row               = $row.Row
        A                 = $row.A
        B                 = $row.B
        path              = $null
        normalized        = $row.I
        omdb_title        = $row.J
        omdb_year         = $row.K
        imdb_id           = $row.L
        status            = 'needs_review'
        proposed_category = $row.N
        notes             = $row.O
    }

    $isRobinHood = ($row.A -match '(?i)Robin Hood' -or $row.I -match '(?i)Robin Hood') -and ([string]::IsNullOrWhiteSpace($row.B))

    # --- Path: B title correction / year-only ---
    if ((Test-BIsTitleCorrection $row.B $row.I) -or (Test-IsYearOnly $row.B) -or ([string]::IsNullOrWhiteSpace($row.I) -and $row.B)) {
        $searchTitle = $null
        $year = $null

        if (Test-IsYearOnly $row.B) {
            $year = $row.B.Trim()
            $searchTitle = Get-TitleWithoutYear $row.I
            if (-not $searchTitle -or $searchTitle -match '^\d{4}$') {
                $searchTitle = Get-TitleWithoutYear $row.A
            }
            # Johnny Appleseed row: A may be just the name
            if ($row.A -match '(?i)Johnny Appleseed') { $searchTitle = 'Johnny Appleseed' }
        } else {
            $searchTitle = Get-TitleWithoutYear $row.B
            $year = Get-YearFromText $row.B
            if (-not $year) { $year = Get-YearFromText $row.F }
        }

        $hit = $null
        foreach ($yTry in @($year, $(if ($year -eq '1993') { '1992' } else { $null }), $null)) {
            if ($null -eq $yTry -and $year) { continue }
            Start-Sleep -Milliseconds $ThrottleMs
            $data = Invoke-OmdbByTitle $searchTitle $yTry
            if ($data.Response -eq 'False' -and (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $data)) {
                $data = Invoke-OmdbByTitle $searchTitle $yTry
            }
            if ($data.Response -eq 'True') {
                $oy = ([string]$data.Year) -replace '[–-].*', ''
                if ($oy -match '^(\d{4})') { $oy = $Matches[1] }
                if (-not $year -or $oy -eq $year -or ($year -eq '1993' -and $oy -in @('1992', '1993'))) {
                    $hit = $data
                    break
                }
            }
        }

        if (-not $hit) {
            Start-Sleep -Milliseconds $ThrottleMs
            $search = Invoke-OmdbSearch $searchTitle
            if ($search -and $search.Response -eq 'True' -and $search.Search) {
                $pick = $null
                if ($year) {
                    $pick = @($search.Search) | Where-Object { [string]$_.Year -eq $year } | Select-Object -First 1
                    if (-not $pick -and $year -eq '1993') {
                        $pick = @($search.Search) | Where-Object { [string]$_.Year -eq '1992' } | Select-Object -First 1
                    }
                }
                if (-not $pick -and @($search.Search).Count -eq 1) { $pick = @($search.Search)[0] }
                if ($pick -and $pick.imdbID) {
                    Start-Sleep -Milliseconds $ThrottleMs
                    $byId = Invoke-OmdbByImdbId ([string]$pick.imdbID)
                    if ($byId.Response -eq 'True') { $hit = $byId }
                }
            }
        }

        if ($hit) {
            Apply-OmdbHit $rec $hit $catalog ("pass6: OMDb from Titles 2.0 ({0})" -f $row.B)
            $rec.path = 'B-lookup'
        } else {
            $rec.status = 'needs_review'
            $rec.normalized = if ($year) { '{0} ({1})' -f $searchTitle, $year } else { $searchTitle }
            $rec.notes = ('pass6: Titles 2.0 lookup failed for "{0}" year={1}' -f $searchTitle, $year)
            $rec.path = 'B-miss'
        }

        $results.Add([pscustomobject]$rec)
        Write-Host ("[{0}/{1}] R{2} {3}->{4}: {5}" -f $n, $rows.Count, $row.Row, $rec.path, $rec.status, $rec.normalized)
        continue
    }

    # --- Robin Hood: try 1989 once, do not accept 2010 ---
    if ($isRobinHood) {
        $alts = @('Robin Hood', 'Robin Hood: Prince of Thieves')
        $hit = $null
        foreach ($alt in $alts) {
            Start-Sleep -Milliseconds $ThrottleMs
            $data = Invoke-OmdbByTitle $alt '1989'
            if ($data.Response -eq 'True') {
                $oy = ([string]$data.Year) -replace '[–-].*', ''
                if ($oy -match '^(\d{4})' -and $Matches[1] -eq '1989') { $hit = $data; break }
            }
        }
        if (-not $hit) {
            Start-Sleep -Milliseconds $ThrottleMs
            $search = Invoke-OmdbSearch 'Robin Hood'
            if ($search -and $search.Response -eq 'True') {
                $pick = @($search.Search) | Where-Object { [string]$_.Year -eq '1989' } | Select-Object -First 1
                if ($pick -and $pick.imdbID) {
                    Start-Sleep -Milliseconds $ThrottleMs
                    $byId = Invoke-OmdbByImdbId ([string]$pick.imdbID)
                    if ($byId.Response -eq 'True') { $hit = $byId }
                }
            }
        }
        if ($hit) {
            Apply-OmdbHit $rec $hit $catalog 'pass6: Robin Hood forced 1989'
            $rec.path = 'RobinHood-1989'
        } else {
            $rec.status = 'needs_review'
            $rec.notes = 'pass6: Robin Hood 1989 still unresolved (not accepting 2010)'
            $rec.path = 'RobinHood-left'
        }
        $results.Add([pscustomobject]$rec)
        Write-Host ("[{0}/{1}] R{2} {3}->{4}: {5}" -f $n, $rows.Count, $row.Row, $rec.path, $rec.status, $rec.normalized)
        continue
    }

    # --- Path: accept I ---
    $solidI = ($row.I -match '.+\(\d{4}\)$') -and ($row.L -match '^tt\d+')
    if ($solidI) {
        # Refresh category from imdb if possible
        try {
            Start-Sleep -Milliseconds $ThrottleMs
            $data = Invoke-OmdbByImdbId $row.L
            if ($data.Response -eq 'True') {
                Apply-OmdbHit $rec $data $catalog 'pass6: accept normalized year in I'
                # Keep I text if it already matches Title (Year) - Apply already sets from OMDb
                $rec.path = 'accept-I'
            } else {
                $rec.normalized = $row.I
                if (Test-IsInCatalog $row.I $catalog) {
                    $rec.status = 'duplicate_in_catalog'
                } else {
                    $rec.status = 'matched'
                }
                $rec.notes = 'pass6: accept normalized year in I (imdb refresh failed)'
                $rec.path = 'accept-I-offline'
            }
        } catch {
            $rec.normalized = $row.I
            $rec.status = if (Test-IsInCatalog $row.I $catalog) { 'duplicate_in_catalog' } else { 'matched' }
            $rec.notes = 'pass6: accept normalized year in I'
            $rec.path = 'accept-I-offline'
        }
    } else {
        $rec.status = 'needs_review'
        $rec.notes = Join-Note 'pass6: could not accept I (missing solid Title/Year + imdb)' $row.O
        $rec.path = 'left'
    }

    $results.Add([pscustomobject]$rec)
    Write-Host ("[{0}/{1}] R{2} {3}->{4}: {5}" -f $n, $rows.Count, $row.Row, $rec.path, $rec.status, $rec.normalized)
}

$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8

Write-Host "Writing $($results.Count) rows to pass6..."
Copy-Item -LiteralPath $InputXlsx -Destination $OutputXlsx -Force
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($OutputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
if (-not $ws) { throw 'Sheet missing on write-back' }

foreach ($rec in $results) {
    $r = [int]$rec.Row
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

# Count remaining
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($OutputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
$nrLeft = 0
$lastRow = $ws.UsedRange.Rows.Count
$leftoverLines = @()
for ($r = 2; $r -le $lastRow; $r++) {
    if (([string]$ws.Cells.Item($r, 13).Text).Trim() -eq 'needs_review') {
        $nrLeft++
        $leftoverLines += ('R{0} A={1} B={2} I={3}' -f $r, $ws.Cells.Item($r, 1).Text, $ws.Cells.Item($r, 2).Text, $ws.Cells.Item($r, 9).Text)
    }
}
$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()

$byPath = $results | Group-Object path
$byStatus = $results | Group-Object status

$md = New-Object System.Text.StringBuilder
[void]$md.AppendLine('# Titles 2.0 - pass 6 review (accept I years)')
[void]$md.AppendLine('')
[void]$md.AppendLine("**Results workbook:** ``$OutputXlsx``")
[void]$md.AppendLine("Sheet: ``$SheetName``")
[void]$md.AppendLine('')
[void]$md.AppendLine("Processed **$($results.Count)** needs_review rows.")
[void]$md.AppendLine("Sheet needs_review remaining: **$nrLeft**")
[void]$md.AppendLine('')
[void]$md.AppendLine('## Paths')
[void]$md.AppendLine('')
foreach ($g in $byPath) { [void]$md.AppendLine(('- **{0}**: {1}' -f $g.Name, $g.Count)) }
[void]$md.AppendLine('')
[void]$md.AppendLine('## Status')
[void]$md.AppendLine('')
foreach ($g in $byStatus) { [void]$md.AppendLine(('- **{0}**: {1}' -f $g.Name, $g.Count)) }
[void]$md.AppendLine('')
[void]$md.AppendLine('## Resolved')
[void]$md.AppendLine('')
foreach ($item in @($results | Where-Object { $_.status -ne 'needs_review' })) {
    [void]$md.AppendLine(('- Row {0} [{1}]: `{2}` | {3}' -f $item.Row, $item.path, $item.normalized, $item.status))
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## Leftovers')
[void]$md.AppendLine('')
if ($nrLeft -eq 0) { [void]$md.AppendLine('_None_') }
else { foreach ($line in $leftoverLines) { [void]$md.AppendLine("- $line") } }
[void]$md.AppendLine('')
[void]$md.AppendLine('## HOLD')
[void]$md.AppendLine('')
[void]$md.AppendLine('No movieDatabase edits.')
Set-Content -LiteralPath $ReviewMd -Value $md.ToString() -Encoding UTF8

$review = [pscustomobject]@{
    workbook = $OutputXlsx
    processed = $results.Count
    needs_review_left = $nrLeft
    results = $results
}
$review | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ReviewJson -Encoding UTF8

Write-Host '=== PASS6 SUMMARY ==='
foreach ($g in $byPath) { Write-Host ("path {0}: {1}" -f $g.Name, $g.Count) }
foreach ($g in $byStatus) { Write-Host ("status {0}: {1}" -f $g.Name, $g.Count) }
Write-Host "needs_review_left=$nrLeft"
Write-Host "Wrote: $OutputXlsx"
Write-Host "Review: $ReviewMd"
Write-Host 'HOLD: no movieDatabase edits.'
