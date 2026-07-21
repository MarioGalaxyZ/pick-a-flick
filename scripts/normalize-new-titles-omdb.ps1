#Requires -Version 5.1
<#
.SYNOPSIS
  Normalize Movie Titles sheet against OMDb; write columns H-N. Does not edit movieDatabase.
  Uses Title (col A) and Year (col E) when present; also parses year from title text.
#>
$ErrorActionPreference = 'Stop'

$Root = Split-Path (Split-Path $PSScriptRoot -Parent) -ErrorAction SilentlyContinue
if (-not $Root) { $Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path }
$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path

$WorkXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb normalized.xlsx'
$ProgressJson = Join-Path $Root 'scripts\_tmp-new-titles-omdb-progress.json'
$ReviewJson = Join-Path $Root 'scripts\_tmp-new-titles-omdb-review.json'
$MainJs = Join-Path $Root 'app\main.js'
$EnvFile = Join-Path $Root '.env'
$ThrottleMs = 280

. (Join-Path $PSScriptRoot 'load-env.ps1')
. (Join-Path $PSScriptRoot 'lib\omdb-api-key.ps1')
$cliApiKey = $env:OMDB_API_KEY
$cliFreeKey = $env:OMDB_API_KEY_FREE
Import-DotEnv $EnvFile
if ($cliApiKey) { $env:OMDB_API_KEY = $cliApiKey }
if ($cliFreeKey) { $env:OMDB_API_KEY_FREE = $cliFreeKey }
$script:OmdbKeys = Get-OmdbKeySession

function Test-OmdbQuotaOrAuthError([string]$Message) {
    return (Test-OmdbKeyFailure $Message)
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

function Normalize-ArticleTitle([string]$title) {
    if ($title -match '^(.*),\s*(The|A|An)\s*$') {
        return "$($Matches[2]) $($Matches[1].Trim())"
    }
    return $title
}

function Clean-RawTitle([string]$raw) {
    $t = ($raw -replace '\s+', ' ').Trim()
    $year = $null

    # ", x 1971" / " (1971)" / trailing year
    if ($t -match '^(.*?)[,\s]+x\s+(\d{4})\s*$') {
        $t = $Matches[1].Trim()
        $year = $Matches[2]
    }
    elseif ($t -match '^(.*?)\s*\((\d{4})\)\s*$') {
        $t = $Matches[1].Trim()
        $year = $Matches[2]
    }
    elseif ($t -match '^(.*?\D)\s+(\d{4})\s*$') {
        $t = $Matches[1].Trim().TrimEnd(',').Trim()
        $year = $Matches[2]
    }

    # Bond shorthand: Bond #14 85 View To A Kill, A
    if ($t -match '(?i)^Bond\s*#?\d+\s+(\d{2})\s+(.+)$') {
        $yy = [int]$Matches[1]
        $year = if ($yy -ge 30) { "19$($Matches[1])" } else { "20$($Matches[1])" }
        $t = Normalize-ArticleTitle $Matches[2].Trim()
    }

    $t = Normalize-ArticleTitle $t

    # Common tidy-ups
    $t = $t -replace "Americ'a", 'America''s'
    $t = $t -replace 'Grifith', 'Griffith'
    $t = $t -replace '(?i)^Body Guard\b', 'Bodyguard'
    $t = Normalize-ArticleTitle $t
    $t = $t -replace '(?i)\bPart\s+2\b', 'Part II'
    $t = $t -replace '(?i)\bPart\s+3\b', 'Part III'
    $t = $t -replace '(?i)\bAnother 48 hours\b', 'Another 48 Hrs.'

    return [pscustomobject]@{ SearchTitle = $t; Year = $year; CleanNote = $null }
}

function Join-Note($a, $b) {
    $parts = @($a, $b) | Where-Object { $_ -and ([string]$_).Trim() -ne '' }
    return ($parts -join ' | ')
}

function Test-LikelyNonMovie([string]$raw, [string]$searchTitle) {
    $s = "$raw | $searchTitle"
    if ($s -match '(?i)Adventures in Odyssey') {
        return @{ Status = 'skip_non_movie'; Notes = 'Adventures in Odyssey — audio/video series, not theatrical film' }
    }
    if ($s -match '(?i)\bShow, The$|\bTV Series\b|\bSeason\b|\bEpisodes?\b') {
        return @{ Status = 'series_candidate'; Notes = 'Looks like TV show / series listing' }
    }
    if ($raw -match '/') {
        return @{ Status = 'needs_review'; Notes = 'Possible double-feature or multi-title line (contains /)' }
    }
    if ($s -match '(?i)Andy Griffith') {
        return @{ Status = 'series_candidate'; Notes = 'Andy Griffith Show — TV series' }
    }
    return $null
}

function Get-OmdbActiveApiKey {
    return $script:OmdbKeys.Key
}

function Invoke-OmdbByTitle([string]$title, [string]$year) {
    $attempts = 0
    while ($true) {
        $attempts++
        $apiKey = Get-OmdbActiveApiKey
        $url = 'https://www.omdbapi.com/?t=' + [uri]::EscapeDataString($title) + '&apikey=' + $apiKey
        if ($year) { $url += '&y=' + [uri]::EscapeDataString($year) }
        try {
            $data = Invoke-RestMethod -Uri $url -Method Get
            # OMDb sometimes returns 200 with a quota/auth Error instead of HTTP 401
            if ($data -and $data.Response -eq 'False' -and (Test-OmdbQuotaOrAuthError ([string]$data.Error))) {
                if (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $data) {
                    $attempts = 0
                    continue
                }
                throw "OMDb quota/auth error: $($data.Error)"
            }
            return $data
        } catch {
            $msg = $_.Exception.Message
            if (Test-OmdbQuotaOrAuthError $msg) {
                if (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $msg) {
                    $attempts = 0
                    continue
                }
                if ($attempts -lt 4) {
                    $backoff = 2000 * $attempts
                    Write-Host ("OMDb quota/auth error - backing off {0}ms (attempt {1}): {2}" -f $backoff, $attempts, $msg)
                    Start-Sleep -Milliseconds $backoff
                    continue
                }
            }
            throw
        }
    }
}

function Invoke-OmdbSearch([string]$title) {
    $url = 'https://www.omdbapi.com/?s=' + [uri]::EscapeDataString($title) + '&type=movie&apikey=' + (Get-OmdbActiveApiKey)
    try {
        $data = Invoke-RestMethod -Uri $url -Method Get
        if ($data -and $data.Response -eq 'False' -and (Test-OmdbQuotaOrAuthError ([string]$data.Error))) {
            if (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $data) {
                return Invoke-OmdbSearch $title
            }
        }
        return $data
    } catch {
        $msg = $_.Exception.Message
        if ((Test-OmdbQuotaOrAuthError $msg) -and (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $msg)) {
            return Invoke-OmdbSearch $title
        }
        return $null
    }
}

function Get-OmdbHit([string]$title, [string]$year) {
    $data = Invoke-OmdbByTitle $title $year
    if ($data.Response -eq 'True') { return $data }

    if ($year) {
        Start-Sleep -Milliseconds $ThrottleMs
        $data = Invoke-OmdbByTitle $title $null
        if ($data.Response -eq 'True') { return $data }
    }

    # Part digit → roman already partly handled; try without punctuation quirks
    $alt = ($title -replace '\.', '' -replace '\s+', ' ').Trim()
    if ($alt -ne $title) {
        Start-Sleep -Milliseconds $ThrottleMs
        $data = Invoke-OmdbByTitle $alt $year
        if ($data.Response -eq 'True') { return $data }
    }

    return $data
}

. (Join-Path $PSScriptRoot 'lib\wheel-category-keys.ps1')
$script:WheelCats = Get-WheelCategoryKeys

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
    if ($title -match '(?i)(Part II|Part III| 2$| II$| III$|2:)') {
        return $C.SEQUEL_STREET
    }
    if ($genre -match '(?i)Music|Musical') { return $C.MUSIC_MOUNTAIN }
    if ($genre -match '(?i)Biography' -and ($plot -match '(?i)singer|musician|band|rock|rap|country music')) {
        return $C.MUSIC_MOUNTAIN
    }
    $nonEn = $lang -and ($lang -notmatch '(?i)^English') -and ($lang -notmatch '(?i)^N/A')
    $foreignCountry = $country -and ($country -notmatch '(?i)USA|United States|UK|United Kingdom|Canada|Australia') -and ($country -match '(?i)Korea|Japan|China|France|Germany|Italy|Spain|Brazil|Sweden|Denmark|India|Hong Kong|Mexico|Russia')
    if ($nonEn -or $foreignCountry) { return $C.FOREIGN_EMBASSY }
    if ($genre -match '(?i)Sci-Fi|Science Fiction' -and ($plot -match '(?i)alien|extraterrestrial|invasion|UFO' -or $title -match '(?i)Alien|Mars|Predator|Independence Day|Arrival|Contact|District 9')) {
        return $C.ALIEN_ALLEY
    }
    if ($genre -match '(?i)Horror|Thriller' -and $genre -notmatch '(?i)Comedy') {
        return $C.MOVIES_TO_FALL_ASLEEP_TO
    }
    if ($genre -match '(?i)Sci-Fi' -and ($plot -match '(?i)cyber|neon|android|dystopia' -or $genre -match '(?i)Crime')) {
        return $C.NEON_AND_NINETIES
    }
    if ($genre -match '(?i)Comedy|Fantasy') { return $C.WACKY_WAY }
    if ($genre -match '(?i)Sci-Fi') { return $C.NEON_AND_NINETIES }
    return $C.WACKY_WAY
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
    # title-only fuzzy: same title different year still needs review, not auto-dup
    return $false
}

$catalog = Get-CatalogListings
Write-Host "Catalog listings: $($catalog.Count); API key: $(Get-OmdbKeySessionDescribe $script:OmdbKeys) (length $($script:OmdbKeys.Key.Length))"

# Load titles from Excel
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($WorkXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq 'Movie Titles') { $ws = $s; break } }
if (-not $ws) { throw 'Movie Titles sheet not found' }

$rows = @()
$lastRow = $ws.UsedRange.Rows.Count
$yearFromECount = 0
for ($r = 2; $r -le $lastRow; $r++) {
    $title = [string]$ws.Cells.Item($r, 1).Text
    if ([string]::IsNullOrWhiteSpace($title)) { continue }
    $sheetYearRaw = [string]$ws.Cells.Item($r, 5).Text
    $sheetYear = $null
    if ($sheetYearRaw -match '(\d{4})') { $sheetYear = $Matches[1]; $yearFromECount++ }
    $rows += [pscustomobject]@{ Row = $r; Original = $title.Trim(); SheetYear = $sheetYear }
}
Write-Host ("Loaded {0} titles ({1} with Year in col E)" -f $rows.Count, $yearFromECount)

# Close workbook while calling OMDb (re-open to write at end)
$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()
$ws = $null; $wb = $null; $excel = $null

# Resume support: keep solid results; retry auth failures / empty errors
$resultsByRow = @{}
if (Test-Path $ProgressJson) {
    $prev = Get-Content -LiteralPath $ProgressJson -Raw -Encoding UTF8 | ConvertFrom-Json
    $kept = 0
    $retryable = 0
    foreach ($item in @($prev)) {
        $notes = [string]$item.notes
        $shouldRetry = (Test-OmdbQuotaOrAuthError $notes) -or ($notes -match 'OMDb request error') -or (
            $item.status -eq 'needs_review' -and -not $item.imdb_id -and $notes -match 'OMDb request error'
        )
        if ($shouldRetry) {
            $retryable++
            continue
        }
        $resultsByRow[[int]$item.Row] = $item
        $kept++
    }
    Write-Host "Resumed $kept prior results; will retry $retryable auth/error rows"
}

$processed = 0
$total = $rows.Count
$results = New-Object System.Collections.Generic.List[object]
$consecutiveQuotaErrors = 0
$maxConsecutiveQuotaErrors = 8
$abortedForQuota = $false

foreach ($row in $rows) {
    if ($resultsByRow.ContainsKey([int]$row.Row)) {
        $results.Add($resultsByRow[[int]$row.Row])
        continue
    }

    $processed++
    $raw = $row.Original
    $cleaned = Clean-RawTitle $raw
    $searchTitle = $cleaned.SearchTitle
    # Prefer Year from column E; fall back to year parsed from title text
    $year = $null
    $yearSource = $null
    if ($row.SheetYear) {
        $year = $row.SheetYear
        $yearSource = 'colE'
    }
    elseif ($cleaned.Year) {
        $year = $cleaned.Year
        $yearSource = 'title'
    }
    # If both present and disagree, prefer col E for lookup but flag for review after hit
    $yearMismatchNote = $null
    if ($row.SheetYear -and $cleaned.Year -and ($row.SheetYear -ne $cleaned.Year)) {
        $yearMismatchNote = "Sheet Year (E)=$($row.SheetYear) vs year in title text=$($cleaned.Year); used col E for OMDb"
    }

    $pre = Test-LikelyNonMovie $raw $searchTitle
    $rec = [ordered]@{
        Row               = $row.Row
        Original          = $raw
        SearchTitle       = $searchTitle
        SearchYear        = $year
        YearSource        = $yearSource
        SheetYear         = $row.SheetYear
        normalized        = $null
        omdb_title        = $null
        omdb_year         = $null
        imdb_id           = $null
        status            = $null
        proposed_category = $null
        notes             = $yearMismatchNote
        omdb_type         = $null
        omdb_genre        = $null
    }

    if ($pre -and $pre.Status -eq 'skip_non_movie') {
        $rec.status = $pre.Status
        $rec.notes = $pre.Notes
        $results.Add([pscustomobject]$rec)
        Write-Host "[$($row.Row)] skip_non_movie: $raw"
        if (($results.Count % 20) -eq 0) {
            $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8
        }
        continue
    }
    if ($pre) {
        $rec.status = $pre.Status
        $rec.notes = $pre.Notes
    }

    try {
        Start-Sleep -Milliseconds $ThrottleMs
        $data = Get-OmdbHit $searchTitle $year
        $consecutiveQuotaErrors = 0
    } catch {
        $errMsg = $_.Exception.Message
        $rec.status = 'needs_review'
        $rec.notes = Join-Note $rec.notes "OMDb request error: $errMsg"
        $results.Add([pscustomobject]$rec)
        if (Test-OmdbQuotaOrAuthError $errMsg) {
            $consecutiveQuotaErrors++
            if ($consecutiveQuotaErrors -ge $maxConsecutiveQuotaErrors) {
                $abortedForQuota = $true
                Write-Host ""
                Write-Host "ABORT: $maxConsecutiveQuotaErrors consecutive OMDb quota/auth errors."
                Write-Host "Likely causes: free-tier daily limit (1,000), wrong/expired/canceled premium key, or both keys exhausted."
                Write-Host "Progress saved to: $ProgressJson"
                Write-Host "Fix: set OMDB_API_KEY / OMDB_API_KEY_FREE in .env, then re-run this script."
                Write-Host "Retryable rows will be picked up automatically from progress."
                Write-Host ""
                $have = New-Object 'System.Collections.Generic.HashSet[int]'
                foreach ($existing in $results) { [void]$have.Add([int]$existing.Row) }
                foreach ($rest in $rows) {
                    $rr = [int]$rest.Row
                    if ($have.Contains($rr)) { continue }
                    if ($resultsByRow.ContainsKey($rr)) {
                        $results.Add($resultsByRow[$rr])
                        [void]$have.Add($rr)
                        continue
                    }
                    $c = Clean-RawTitle $rest.Original
                    $y = if ($rest.SheetYear) { $rest.SheetYear } elseif ($c.Year) { $c.Year } else { $null }
                    $results.Add([pscustomobject][ordered]@{
                        Row = $rest.Row; Original = $rest.Original; SearchTitle = $c.SearchTitle; SearchYear = $y
                        YearSource = $(if ($rest.SheetYear) { 'colE' } elseif ($c.Year) { 'title' } else { $null })
                        SheetYear = $rest.SheetYear
                        normalized = $null; omdb_title = $null; omdb_year = $null; imdb_id = $null
                        status = 'needs_review'
                        proposed_category = $null
                        notes = 'OMDb request error: skipped after consecutive quota/auth failures - re-run when API key/quota works'
                        omdb_type = $null; omdb_genre = $null
                    })
                    [void]$have.Add($rr)
                }
                break
            }
        } else {
            $consecutiveQuotaErrors = 0
        }
        continue
    }

    if ($data.Response -eq 'True') {
        $rec.omdb_title = [string]$data.Title
        $rec.omdb_year = ([string]$data.Year) -replace '–.*', '' -replace '-.*', ''
        if ($rec.omdb_year -match '^(\d{4})') { $rec.omdb_year = $Matches[1] }
        $rec.imdb_id = [string]$data.imdbID
        $rec.omdb_type = [string]$data.Type
        $rec.omdb_genre = [string]$data.Genre
        $rec.normalized = "$($rec.omdb_title) ($($rec.omdb_year))"

        if ($data.Type -eq 'series') {
            $rec.status = 'series_candidate'
            $rec.notes = Join-Note $rec.notes 'OMDb Type=series'
        }
        elseif ($data.Type -eq 'episode') {
            $rec.status = 'skip_non_movie'
            $rec.notes = Join-Note $rec.notes 'OMDb Type=episode'
        }
        elseif ($year -and $rec.omdb_year -and ($year -ne $rec.omdb_year)) {
            $rec.status = 'needs_review'
            $rec.notes = Join-Note $rec.notes "Year clash: lookup=$year (from $yearSource) OMDb=$($rec.omdb_year)"
        }
        elseif ($pre -and $pre.Status -eq 'needs_review') {
            $rec.status = 'needs_review'
            $rec.notes = $pre.Notes
            $rec.proposed_category = Propose-Category $data
        }
        elseif ($pre -and $pre.Status -eq 'series_candidate') {
            $rec.status = 'series_candidate'
            $rec.notes = $pre.Notes
        }
        else {
            # Title similarity check — flag heavy rewrites
            $normSearch = ($searchTitle -replace '[^a-zA-Z0-9]', '').ToLowerInvariant()
            $normHit = (($rec.omdb_title) -replace '[^a-zA-Z0-9]', '').ToLowerInvariant()
            if ($normSearch.Length -ge 4 -and $normHit.Length -ge 4) {
                if (-not ($normHit.Contains($normSearch.Substring(0, [Math]::Min(6, $normSearch.Length))) -or $normSearch.Contains($normHit.Substring(0, [Math]::Min(6, $normHit.Length))))) {
                    # soft check: first word
                    $sw = ($searchTitle -split '\s+')[0].ToLowerInvariant() -replace '[^a-z0-9]', ''
                    $hw = ($rec.omdb_title -split '\s+')[0].ToLowerInvariant() -replace '[^a-z0-9]', ''
                    if ($sw -and $hw -and $sw -ne $hw -and -not $normHit.Contains($sw) -and -not $normSearch.Contains($hw)) {
                        $rec.status = 'needs_review'
                        $rec.notes = "OMDb title looks divergent from search ('$searchTitle' → '$($rec.omdb_title)')"
                    }
                }
            }
            if (-not $rec.status) {
                if (Test-IsInCatalog $rec.normalized $catalog $rec.omdb_title $rec.omdb_year) {
                    $rec.status = 'duplicate_in_catalog'
                    $rec.notes = 'Exact Title (Year) already in movieDatabase'
                }
                else {
                    $rec.status = 'matched'
                }
            }
            $rec.proposed_category = Propose-Category $data
        }
    }
    else {
        $omdbErr = [string]$data.Error
        if (Test-OmdbQuotaOrAuthError $omdbErr) {
            # Defensive: Invoke-OmdbByTitle should already throw these; keep resume-friendly if one slips through
            $rec.status = 'needs_review'
            $rec.notes = Join-Note $rec.notes "OMDb request error: $omdbErr"
            $results.Add([pscustomobject]$rec)
            $consecutiveQuotaErrors++
            if ($consecutiveQuotaErrors -ge $maxConsecutiveQuotaErrors) {
                $abortedForQuota = $true
                Write-Host ""
                Write-Host "ABORT: $maxConsecutiveQuotaErrors consecutive OMDb quota/auth errors."
                Write-Host "Progress saved to: $ProgressJson"
                Write-Host "Fix OMDB_API_KEY / OMDB_API_KEY_FREE / quota, then re-run this script."
                Write-Host ""
                break
            }
            continue
        }
        # Try search for suggestions
        Start-Sleep -Milliseconds $ThrottleMs
        $search = Invoke-OmdbSearch $searchTitle $apiKey
        $suggestions = @()
        if ($search -and $search.Response -eq 'True' -and $search.Search) {
            $suggestions = @($search.Search | Select-Object -First 3 | ForEach-Object { "$($_.Title) ($($_.Year)) [$($_.imdbID)]" })
        }
        if ($pre) {
            $rec.status = $pre.Status
            $rec.notes = $pre.Notes
        }
        else {
            $rec.status = 'not_found'
        }
        if ($suggestions.Count -gt 0) {
            $rec.notes = Join-Note $rec.notes ("Search suggestions: " + ($suggestions -join '; '))
            if ($rec.status -eq 'not_found') { $rec.status = 'needs_review' }
        }
        else {
            $rec.notes = Join-Note $rec.notes $omdbErr
        }
    }

    $results.Add([pscustomobject]$rec)
    Write-Host ("[{0}/{1}] row {2} {3}: {4}" -f $processed, $total, $row.Row, $rec.status, $raw)

    if (($results.Count % 20) -eq 0) {
        $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8
    }
}

$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8
Write-Host "Writing $($results.Count) rows back to Excel..."

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open($WorkXlsx)
$ws = $null
foreach ($s in $wb.Worksheets) { if ($s.Name -eq 'Movie Titles') { $ws = $s; break } }
if (-not $ws) { throw 'Movie Titles sheet not found on write-back' }

$ws.Cells.Item(1, 8).Value2 = 'normalized'
$ws.Cells.Item(1, 9).Value2 = 'omdb_title'
$ws.Cells.Item(1, 10).Value2 = 'omdb_year'
$ws.Cells.Item(1, 11).Value2 = 'imdb_id'
$ws.Cells.Item(1, 12).Value2 = 'status'
$ws.Cells.Item(1, 13).Value2 = 'proposed_category'
$ws.Cells.Item(1, 14).Value2 = 'notes'

foreach ($rec in $results) {
    $r = [int]$rec.Row
    $ws.Cells.Item($r, 8).Value2 = $rec.normalized
    $ws.Cells.Item($r, 9).Value2 = $rec.omdb_title
    $ws.Cells.Item($r, 10).Value2 = $rec.omdb_year
    $ws.Cells.Item($r, 11).Value2 = $rec.imdb_id
    $ws.Cells.Item($r, 12).Value2 = $rec.status
    $ws.Cells.Item($r, 13).Value2 = $rec.proposed_category
    $ws.Cells.Item($r, 14).Value2 = $rec.notes
}

$wb.Save()
$wb.Close($true)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()

# Summary + review packet
$groups = $results | Group-Object status
$summary = [ordered]@{}
foreach ($g in $groups) { $summary[$g.Name] = $g.Count }

$review = [pscustomobject]@{
    workbook = $WorkXlsx
    total    = $results.Count
    summary  = $summary
    needs_review = @($results | Where-Object { $_.status -eq 'needs_review' } | Select-Object Row, Original, SearchTitle, SearchYear, normalized, omdb_title, omdb_year, imdb_id, proposed_category, notes)
    series_candidate = @($results | Where-Object { $_.status -eq 'series_candidate' } | Select-Object Row, Original, normalized, omdb_title, omdb_year, imdb_id, notes)
    not_found = @($results | Where-Object { $_.status -eq 'not_found' } | Select-Object Row, Original, SearchTitle, notes)
    skip_non_movie = @($results | Where-Object { $_.status -eq 'skip_non_movie' } | Select-Object Row, Original, notes)
    duplicate_in_catalog = @($results | Where-Object { $_.status -eq 'duplicate_in_catalog' } | Select-Object Row, Original, normalized, proposed_category)
    matched_sample = @($results | Where-Object { $_.status -eq 'matched' } | Select-Object -First 30 Row, Original, normalized, proposed_category)
}

$review | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ReviewJson -Encoding UTF8
Write-Host "=== SUMMARY ==="
$summary.GetEnumerator() | ForEach-Object { Write-Host ("{0}: {1}" -f $_.Key, $_.Value) }
Write-Host "Review JSON: $ReviewJson"
Write-Host "Workbook: $WorkXlsx"
if ($abortedForQuota) {
    Write-Host ""
    Write-Host "Stopped early due to OMDb quota/auth errors. Progress + Excel were still saved."
    Write-Host "Re-run this script after fixing OMDB_API_KEY / OMDB_API_KEY_FREE / waiting for quota reset."
}
