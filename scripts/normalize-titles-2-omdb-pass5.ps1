#Requires -Version 5.1
<#
.SYNOPSIS
  Pass 5: resolve needs_review year clashes on Movie Titles (2).
  A) Auto-accept OMDb when |lookupYear - omdbYear| == 1
  B) Forced-year OMDb re-lookup for the rest
  Writes pass5.xlsx. Does not edit movieDatabase.
#>
$ErrorActionPreference = 'Stop'

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$InputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass4.xlsx'
$OutputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass5.xlsx'
$SheetName = 'Movie Titles (2)'
$ProgressJson = Join-Path $Root 'scripts\_tmp-titles2-pass5-progress.json'
$ReviewJson = Join-Path $Root 'scripts\_tmp-titles2-pass5-review.json'
$ReviewMd = Join-Path $Root 'scripts\_tmp-titles2-pass5-review.md'
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
    if ($text -match '\((\d{4})\)') { return $Matches[1] }
    if ($text -match '(?i)lookup=(\d{4})') { return $Matches[1] }
    if ($text -match '(?:^|\s)(\d{4})(?:\s|$)') { return $Matches[1] }
    return $null
}

function Get-TitleWithoutYear([string]$normalized) {
    if (-not $normalized) { return $null }
    $t = $normalized.Trim()
    if ($t -match '^(.*?)\s*\((\d{4})\)\s*$') { return $Matches[1].Trim() }
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

function Get-ForcedYearAlternates([string]$a, [string]$b, [string]$titleNoYear, [string]$forcedYear) {
    $alts = New-Object System.Collections.Generic.List[string]
    foreach ($t in @($titleNoYear, $b, $a)) {
        if ($t) {
            $clean = ($t -replace '\s+', ' ').Trim()
            $clean = $clean -replace '\s*\(\d{4}\)\s*$', ''
            $clean = $clean -replace '[–—―]', '-'
            if ($clean -and -not $alts.Contains($clean)) { [void]$alts.Add($clean) }
        }
    }

    $blob = "$a | $b | $titleNoYear"
    if ($blob -match '(?i)Charlotte.?s Web') {
        foreach ($t in @("Charlotte's Web", 'Charlotte’s Web')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)In-?laws|Inlaws') {
        foreach ($t in @('The In-Laws', 'The Inlaws', 'In-Laws', 'Inlaws')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)Golden\s*Eye|GoldenEye') {
        foreach ($t in @('GoldenEye', 'Golden Eye')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)Star Wars|Phantom Menace|Playroom') {
        foreach ($t in @('Star Wars: Episode I - The Phantom Menace', 'The Phantom Menace', 'Star Wars Episode I')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)Grinch') {
        foreach ($t in @('How the Grinch Stole Christmas!', 'How the Grinch Stole Christmas', 'Dr. Seuss How the Grinch Stole Christmas')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)Johnny Appleseed') {
        foreach ($t in @('Johnny Appleseed', 'The Legend of Johnny Appleseed')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)Pilgrim') {
        foreach ($t in @("Pilgrim's Progress", 'The Pilgrims Progress')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)Robin Hood') {
        foreach ($t in @('Robin Hood', 'Robin Hood: Prince of Thieves')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)Wind in the Willows') {
        foreach ($t in @('The Wind in the Willows')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }
    if ($blob -match '(?i)VeggieTales|Forgive Them') {
        foreach ($t in @('VeggieTales: God Wants Me to Forgive Them!?!', 'God Wants Me to Forgive Them')) {
            if (-not $alts.Contains($t)) { [void]$alts.Add($t) }
        }
    }

    return @($alts)
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
        $rec.notes = Join-Note $note ('OMDb Type={0} - not auto-accepted' -f $data.Type)
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
    $status = [string]$ws.Cells.Item($r, 13).Text
    if ($status.Trim() -ne 'needs_review') { continue }
    $rows += [pscustomobject]@{
        Row      = $r
        A        = ([string]$ws.Cells.Item($r, 1).Text).Trim()
        B        = ([string]$ws.Cells.Item($r, 2).Text).Trim()
        F        = ([string]$ws.Cells.Item($r, 6).Text).Trim()
        I        = ([string]$ws.Cells.Item($r, 9).Text).Trim()
        J        = ([string]$ws.Cells.Item($r, 10).Text).Trim()
        K        = ([string]$ws.Cells.Item($r, 11).Text).Trim()
        L        = ([string]$ws.Cells.Item($r, 12).Text).Trim()
        N        = ([string]$ws.Cells.Item($r, 14).Text).Trim()
        O        = ([string]$ws.Cells.Item($r, 15).Text).Trim()
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
    $lookupYear = Get-YearFromText $row.O
    if (-not $lookupYear) { $lookupYear = Get-YearFromText $row.B }
    if (-not $lookupYear) { $lookupYear = Get-YearFromText $row.F }
    if (-not $lookupYear) { $lookupYear = Get-YearFromText $row.A }

    $omdbYear = $row.K
    if (-not $omdbYear) { $omdbYear = Get-YearFromText $row.I }
    if (-not $omdbYear -and $row.O -match 'OMDb=(\d{4})') { $omdbYear = $Matches[1] }

    $titleNoYear = Get-TitleWithoutYear $row.I
    if (-not $titleNoYear -and $row.J) { $titleNoYear = $row.J }
    if (-not $titleNoYear -and $row.B) { $titleNoYear = Get-TitleWithoutYear $row.B }
    if (-not $titleNoYear) { $titleNoYear = $row.A }

    $rec = [ordered]@{
        Row               = $row.Row
        A                 = $row.A
        B                 = $row.B
        lookupYear        = $lookupYear
        omdbYearPrior     = $omdbYear
        normalized        = $row.I
        omdb_title        = $row.J
        omdb_year         = $row.K
        imdb_id           = $row.L
        status            = 'needs_review'
        proposed_category = $row.N
        notes             = $row.O
        bucket            = $null
    }

    $delta = $null
    if ($lookupYear -and $omdbYear) {
        $delta = [Math]::Abs([int]$lookupYear - [int]$omdbYear)
    }

    # --- Bucket A: auto-accept 1-year delta ---
    $hasHit = ($row.L -match '^tt\d+') -or ($row.I -match '\(\d{4}\)' -and $row.J)
    if ($hasHit -and $delta -eq 1) {
        # Prefer existing OMDb columns; if imdb present, refresh once for category
        if ($row.L -match '^tt\d+') {
            try {
                Start-Sleep -Milliseconds $ThrottleMs
                $data = Invoke-OmdbByImdbId $row.L
                if ($data.Response -eq 'True') {
                    Apply-OmdbHit $rec $data $catalog 'pass5 bucket A: auto-accept OMDb (1-year clash)'
                    $rec.bucket = 'A'
                    $results.Add([pscustomobject]$rec)
                    Write-Host ("[{0}/{1}] R{2} A->{3}: {4}" -f $n, $rows.Count, $row.Row, $rec.status, $rec.normalized)
                    continue
                }
            } catch { }
        }
        # Fall through using existing I as OMDb listing
        $rec.normalized = $row.I
        if (-not $rec.normalized -and $row.J -and $omdbYear) {
            $rec.normalized = ('{0} ({1})' -f $row.J, $omdbYear)
        }
        if (Test-IsInCatalog $rec.normalized $catalog) {
            $rec.status = 'duplicate_in_catalog'
            $rec.notes = 'pass5 bucket A: auto-accept OMDb (1-year clash) | already in movieDatabase'
        } else {
            $rec.status = 'matched'
            $rec.notes = 'pass5 bucket A: auto-accept OMDb (1-year clash)'
        }
        $rec.bucket = 'A'
        $results.Add([pscustomobject]$rec)
        Write-Host ("[{0}/{1}] R{2} A->{3}: {4}" -f $n, $rows.Count, $row.Row, $rec.status, $rec.normalized)
        continue
    }

    # --- Bucket B: forced-year re-lookup ---
    $forcedYear = $lookupYear
    if (-not $forcedYear) { $forcedYear = Get-YearFromText $row.F }
    $alts = Get-ForcedYearAlternates $row.A $row.B $titleNoYear $forcedYear
    $hit = $null
    $usedAlt = $null

    foreach ($alt in $alts) {
        if ($forcedYear) {
            Start-Sleep -Milliseconds $ThrottleMs
            $data = Invoke-OmdbByTitle $alt $forcedYear
            if ($data.Response -eq 'False' -and (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $data)) {
                $data = Invoke-OmdbByTitle $alt $forcedYear
            }
            if ($data.Response -eq 'True') {
                $oy = ([string]$data.Year) -replace '[–-].*', ''
                if ($oy -match '^(\d{4})') { $oy = $Matches[1] }
                if ($oy -eq $forcedYear -or -not $forcedYear) {
                    $hit = $data; $usedAlt = $alt; break
                }
            }
        }
    }

    # Search by title, prefer forced year
    if (-not $hit) {
        $q = $alts[0]
        Start-Sleep -Milliseconds $ThrottleMs
        $search = Invoke-OmdbSearch $q
        if ($search -and $search.Response -eq 'True' -and $search.Search) {
            $pick = $null
            if ($forcedYear) {
                $pick = @($search.Search) | Where-Object { [string]$_.Year -eq $forcedYear } | Select-Object -First 1
            }
            if (-not $pick -and @($search.Search).Count -eq 1) { $pick = @($search.Search)[0] }
            if ($pick -and $pick.imdbID) {
                Start-Sleep -Milliseconds $ThrottleMs
                $byId = Invoke-OmdbByImdbId ([string]$pick.imdbID)
                if ($byId.Response -eq 'True') {
                    $oy = ([string]$byId.Year) -replace '[–-].*', ''
                    if ($oy -match '^(\d{4})') { $oy = $Matches[1] }
                    if (-not $forcedYear -or $oy -eq $forcedYear) {
                        $hit = $byId
                        $usedAlt = [string]$pick.Title
                    }
                }
            }
        }
    }

    if ($hit) {
        $note = ('pass5 bucket B: forced year {0} via "{1}"' -f $forcedYear, $usedAlt)
        Apply-OmdbHit $rec $hit $catalog $note
        $rec.bucket = 'B'
    } else {
        $rec.status = 'needs_review'
        $rec.normalized = $row.I
        $rec.notes = ('pass5 bucket C: forced year {0} still no hit | prior: {1}' -f $forcedYear, $row.O)
        $rec.bucket = 'C'
    }

    $results.Add([pscustomobject]$rec)
    Write-Host ("[{0}/{1}] R{2} {3}->{4}: {5}" -f $n, $rows.Count, $row.Row, $rec.bucket, $rec.status, $rec.normalized)
}

$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8

Write-Host "Writing $($results.Count) rows to pass5..."
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

# Count remaining needs_review on sheet
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($OutputXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq $SheetName) { $ws = $s; break } }
$nrLeft = 0
$lastRow = $ws.UsedRange.Rows.Count
for ($r = 2; $r -le $lastRow; $r++) {
    if (([string]$ws.Cells.Item($r, 13).Text).Trim() -eq 'needs_review') { $nrLeft++ }
}
$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()

$byBucket = $results | Group-Object bucket
$byStatus = $results | Group-Object status
$leftovers = @($results | Where-Object { $_.status -eq 'needs_review' })

$md = New-Object System.Text.StringBuilder
[void]$md.AppendLine('# Titles 2.0 - pass 5 review (needs_review year clashes)')
[void]$md.AppendLine('')
[void]$md.AppendLine("**Results workbook:** ``$OutputXlsx``")
[void]$md.AppendLine("Sheet: ``$SheetName``")
[void]$md.AppendLine('')
[void]$md.AppendLine("Processed **$($results.Count)** needs_review rows.")
[void]$md.AppendLine("Sheet needs_review remaining: **$nrLeft**")
[void]$md.AppendLine('')
[void]$md.AppendLine('## Buckets')
[void]$md.AppendLine('')
foreach ($g in $byBucket) { [void]$md.AppendLine(('- **{0}**: {1}' -f $g.Name, $g.Count)) }
[void]$md.AppendLine('')
[void]$md.AppendLine('## Status (this pass)')
[void]$md.AppendLine('')
foreach ($g in $byStatus) { [void]$md.AppendLine(('- **{0}**: {1}' -f $g.Name, $g.Count)) }
[void]$md.AppendLine('')
[void]$md.AppendLine('## Resolved')
[void]$md.AppendLine('')
foreach ($item in @($results | Where-Object { $_.status -ne 'needs_review' })) {
    [void]$md.AppendLine(('- Row {0} [{1}]: `{2}` | {3} | {4}' -f $item.Row, $item.bucket, $item.normalized, $item.status, $item.notes))
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## Still needs review (bucket C) - edit Titles 2.0')
[void]$md.AppendLine('')
if ($leftovers.Count -eq 0) {
    [void]$md.AppendLine('_None_')
} else {
    foreach ($item in $leftovers) {
        [void]$md.AppendLine(('- Row {0}: A=`{1}` B=`{2}` I=`{3}` | lookup={4} | {5}' -f $item.Row, $item.A, $item.B, $item.normalized, $item.lookupYear, $item.notes))
    }
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## HOLD')
[void]$md.AppendLine('')
[void]$md.AppendLine('No movieDatabase edits. Fix leftover Titles 2.0 if needed, then continue.')
Set-Content -LiteralPath $ReviewMd -Value $md.ToString() -Encoding UTF8

$review = [pscustomobject]@{
    workbook = $OutputXlsx
    processed = $results.Count
    needs_review_left = $nrLeft
    buckets = @($byBucket | ForEach-Object { @{ name = $_.Name; count = $_.Count } })
    leftovers = $leftovers
}
$review | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ReviewJson -Encoding UTF8

Write-Host '=== PASS5 SUMMARY ==='
foreach ($g in $byBucket) { Write-Host ("bucket {0}: {1}" -f $g.Name, $g.Count) }
foreach ($g in $byStatus) { Write-Host ("status {0}: {1}" -f $g.Name, $g.Count) }
Write-Host "needs_review_left=$nrLeft"
Write-Host "Wrote: $OutputXlsx"
Write-Host "Review: $ReviewMd"
Write-Host 'HOLD: no movieDatabase edits.'
