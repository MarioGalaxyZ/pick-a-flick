#Requires -Version 5.1
<#
.SYNOPSIS
  Pass 7: salvage placeholder_* rows via OMDb imdb-id lookup first,
  then harder title/episode search (Eyewitness-style docs).
  Writes pass7.xlsx. Does not edit movieDatabase.
#>
$ErrorActionPreference = 'Stop'

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$InputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass6b.xlsx'
$OutputXlsx = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass7.xlsx'
$SheetName = 'Movie Titles (2)'
$ProgressJson = Join-Path $Root 'scripts\_tmp-titles2-pass7-progress.json'
$ReviewJson = Join-Path $Root 'scripts\_tmp-titles2-pass7-review.json'
$ReviewMd = Join-Path $Root 'scripts\_tmp-titles2-pass7-review.md'
$MainJs = Join-Path $Root 'app\main.js'
$EnvFile = Join-Path $Root '.env'
$ThrottleMs = 350

# Known episode ids to seed when L is empty (DVD label -> imdb)
$script:SeedImdbByNormalized = @{
    'Eyewitness: Arctic & Antarctic (1994)' = 'tt4690534'
    'Eyewitness: Arctic and Antarctic (1994)' = 'tt4690534'
}

if (-not (Test-Path -LiteralPath $InputXlsx)) {
    $alt = 'c:\Users\james\Downloads\New Titles from TN and IN Movie Collections - OMDb pass6.xlsx'
    if (Test-Path -LiteralPath $alt) {
        Write-Host "pass6b missing; falling back to pass6.xlsx"
        $InputXlsx = $alt
    } else {
        throw "Input workbook not found: $InputXlsx"
    }
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
$script:EyewitnessEpisodeCache = $null

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

function Get-ImdbIdFromText([string]$text) {
    if (-not $text) { return $null }
    if ($text -match '(?i)\b(tt\d{7,})\b') { return $Matches[1].ToLower() }
    return $null
}

function Normalize-MatchKey([string]$s) {
    if (-not $s) { return '' }
    $t = $s.ToLowerInvariant()
    $t = $t -replace '&', ' and '
    $t = $t -replace '[^a-z0-9]+', ' '
    $t = $t -replace '\s+', ' '
    return $t.Trim()
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

function Invoke-OmdbUrl([string]$queryWithoutKey) {
    $attempts = 0
    while ($true) {
        $attempts++
        $key = $script:OmdbKeys.Key
        $url = "https://www.omdbapi.com/?$queryWithoutKey&apikey=$key"
        try {
            $data = Invoke-RestMethod -Uri $url -Method Get
            if ($data.Response -eq 'False') {
                $err = [string]$data.Error
                if ($err -match '(?i)Request limit|limit reached|rate.?limit') {
                    if ($attempts -lt 4) {
                        Write-Host "OMDb rate limit; sleeping 20s then retry ($attempts)..."
                        Start-Sleep -Seconds 20
                        continue
                    }
                }
                if (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $err) {
                    continue
                }
            }
            return $data
        } catch {
            $msg = $_.Exception.Message
            if ($msg -match '(?i)Request limit|limit reached|rate.?limit|429') {
                if ($attempts -lt 4) {
                    Write-Host "OMDb HTTP rate limit; sleeping 20s then retry ($attempts)..."
                    Start-Sleep -Seconds 20
                    continue
                }
            }
            if (Switch-OmdbKeyMaybeFallback -Session $script:OmdbKeys -ErrorOrData $msg) {
                continue
            }
            throw
        }
    }
}

function Invoke-OmdbByTitle([string]$title, [string]$year, [string]$type = $null) {
    $q = "t=$([uri]::EscapeDataString($title))"
    if ($year) { $q += "&y=$([uri]::EscapeDataString($year))" }
    if ($type) { $q += "&type=$([uri]::EscapeDataString($type))" }
    return Invoke-OmdbUrl $q
}

function Invoke-OmdbByImdbId([string]$imdbId) {
    return Invoke-OmdbUrl ("i=$([uri]::EscapeDataString($imdbId))")
}

function Invoke-OmdbSearch([string]$title, [string]$type = $null) {
    $q = "s=$([uri]::EscapeDataString($title))"
    if ($type) { $q += "&type=$([uri]::EscapeDataString($type))" }
    try {
        return Invoke-OmdbUrl $q
    } catch {
        return $null
    }
}

function Invoke-OmdbSeason([string]$seriesId, [int]$season) {
    return Invoke-OmdbUrl ("i=$([uri]::EscapeDataString($seriesId))&Season=$season")
}

function Get-OmdbYear([string]$yearField) {
    $oy = $yearField -replace '[–-].*', ''
    if ($oy -match '^(\d{4})') { return $Matches[1] }
    return $oy
}

function Get-PlaceholderKeepStatus([string]$currentStatus, $data) {
    $genre = [string]$data.Genre
    if ($currentStatus -eq 'placeholder_documentary') { return 'placeholder_documentary' }
    if ($currentStatus -eq 'placeholder_educational') { return 'placeholder_educational' }
    if ($currentStatus -eq 'placeholder_workout') { return 'placeholder_workout' }
    if ($currentStatus -eq 'placeholder_family') { return 'placeholder_family' }
    if ($currentStatus -eq 'placeholder_video') { return 'placeholder_video' }
    if ($currentStatus -eq 'placeholder_unknown') { return 'placeholder_unknown' }
    if ($genre -match '(?i)Documentary') { return 'placeholder_documentary' }
    return 'placeholder_tv'
}

function Apply-MovieHit($rec, $data, $catalog, [string]$note) {
    $oy = Get-OmdbYear ([string]$data.Year)
    $rec.omdb_title = [string]$data.Title
    $rec.omdb_year = $oy
    $rec.imdb_id = [string]$data.imdbID
    $rec.normalized = ('{0} ({1})' -f $rec.omdb_title, $rec.omdb_year)
    $rec.has_poster = ([string]$data.Poster -and [string]$data.Poster -ne 'N/A')
    if (Test-IsInCatalog $rec.normalized $catalog) {
        $rec.status = 'duplicate_in_catalog'
        $rec.notes = Join-Note $note 'already in movieDatabase'
    } else {
        $rec.status = 'matched'
        $rec.notes = $note
    }
    $rec.proposed_category = Propose-Category $data
}

function Apply-EpisodeOrSeriesHit($rec, $data, [string]$keepStatus, [string]$sheetNormalized, [string]$note) {
    $oy = Get-OmdbYear ([string]$data.Year)
    $rec.omdb_title = [string]$data.Title
    $rec.omdb_year = $oy
    $rec.imdb_id = [string]$data.imdbID
    $rec.has_poster = ([string]$data.Poster -and [string]$data.Poster -ne 'N/A')
    # Keep DVD-style I when present; do not replace with bare episode title
    if ($sheetNormalized -and $sheetNormalized -match '.+\(\d{4}\)$') {
        $rec.normalized = $sheetNormalized
    } else {
        $rec.normalized = ('{0} ({1})' -f $rec.omdb_title, $rec.omdb_year)
    }
    $rec.status = $keepStatus
    $typeNote = 'pass7: OMDb hit via {0} (Type={1})' -f $note, $data.Type
    if ($rec.has_poster) { $typeNote = Join-Note $typeNote 'poster=yes' } else { $typeNote = Join-Note $typeNote 'poster=no' }
    $rec.notes = $typeNote
}

function Get-TitleVariants([string]$title) {
    $list = New-Object System.Collections.Generic.List[string]
    if (-not $title) { return @() }
    $t = $title.Trim()
    [void]$list.Add($t)
    # Drop series prefix "Something: Rest"
    if ($t -match '^([^:]+):\s*(.+)$') {
        $rest = $Matches[2].Trim()
        if ($rest) { [void]$list.Add($rest) }
        [void]$list.Add($Matches[1].Trim())
    }
    $noEyewitness = $t -replace '(?i)^Eyewitness:\s*', ''
    if ($noEyewitness -ne $t) { [void]$list.Add($noEyewitness) }
    $amp = $t -replace '&', 'and'
    if ($amp -ne $t) { [void]$list.Add($amp) }
    $amp2 = $noEyewitness -replace '&', 'and'
    if ($amp2 -and $amp2 -ne $t) { [void]$list.Add($amp2) }
    # Drop pack / disc junk
    $clean = $t -replace '(?i)\s*\(Discs?\s*[\d\-]+\)', ''
    $clean = $clean -replace '(?i)\s*:\s*The Complete.*$', ''
    $clean = $clean -replace '(?i)\s*Season\s+(One|Two|Three|Four|\d+).*$', ''
    $clean = $clean.Trim(' :-')
    if ($clean -and $clean -ne $t) { [void]$list.Add($clean) }
    return @($list | Select-Object -Unique)
}

function Get-EyewitnessEpisodeMap {
    if ($null -ne $script:EyewitnessEpisodeCache) { return $script:EyewitnessEpisodeCache }
    $map = @{}
    $seriesId = 'tt1242482'
    Write-Host 'Loading Eyewitness series episode list (tt1242482)...'
    Start-Sleep -Milliseconds $ThrottleMs
    $series = Invoke-OmdbByImdbId $seriesId
    $total = 3
    if ($series.Response -eq 'True' -and $series.totalSeasons) {
        $parsed = 0
        if ([int]::TryParse([string]$series.totalSeasons, [ref]$parsed)) { $total = $parsed }
    }
    for ($season = 1; $season -le $total; $season++) {
        Start-Sleep -Milliseconds $ThrottleMs
        $seasonData = Invoke-OmdbSeason $seriesId $season
        if ($seasonData.Response -ne 'True' -or -not $seasonData.Episodes) { continue }
        foreach ($ep in @($seasonData.Episodes)) {
            $id = [string]$ep.imdbID
            $title = [string]$ep.Title
            if (-not $id -or -not $title) { continue }
            $key = Normalize-MatchKey $title
            if ($key) { $map[$key] = $id }
            # also key without leading articles
            $key2 = Normalize-MatchKey ($title -replace '^(?i)(the|a|an)\s+', '')
            if ($key2 -and -not $map.ContainsKey($key2)) { $map[$key2] = $id }
        }
    }
    $script:EyewitnessEpisodeCache = $map
    Write-Host ("Eyewitness episodes cached: {0}" -f $map.Count)
    return $map
}

function Find-EyewitnessEpisodeId([string]$sheetTitle) {
    $map = Get-EyewitnessEpisodeMap
    $episodePart = $sheetTitle
    if ($sheetTitle -match '(?i)^Eyewitness:\s*(.+)$') { $episodePart = $Matches[1] }
    $keys = @(
        (Normalize-MatchKey $episodePart),
        (Normalize-MatchKey ($episodePart -replace '&', 'and')),
        (Normalize-MatchKey ($episodePart -replace ' and ', ' & '))
    ) | Where-Object { $_ } | Select-Object -Unique
    foreach ($k in $keys) {
        if ($map.ContainsKey($k)) { return $map[$k] }
    }
    # Significant-token overlap (Jungle, Ocean, Pond, River, ...)
    $bestId = $null
    $bestScore = 0
    $sheetTokens = @($keys | ForEach-Object { $_ -split ' ' } | Where-Object { $_.Length -gt 2 } | Select-Object -Unique)
    foreach ($entry in $map.GetEnumerator()) {
        foreach ($k in $keys) {
            if ($k -and $entry.Key -and ($k.Contains($entry.Key) -or $entry.Key.Contains($k))) {
                return $entry.Value
            }
        }
        $epTokens = @($entry.Key -split ' ' | Where-Object { $_.Length -gt 2 })
        $score = @($sheetTokens | Where-Object { $epTokens -contains $_ }).Count
        if ($score -gt $bestScore) {
            $bestScore = $score
            $bestId = $entry.Value
        }
    }
    if ($bestScore -ge 1) { return $bestId }
    return $null
}

function Resolve-ImdbIdForRow($row) {
    $id = Get-ImdbIdFromText $row.L
    if ($id) { return @{ Id = $id; Source = 'col-L' } }
    $id = Get-ImdbIdFromText $row.B
    if ($id) { return @{ Id = $id; Source = 'col-B' } }
    $id = Get-ImdbIdFromText $row.O
    if ($id) { return @{ Id = $id; Source = 'col-O' } }
    $id = Get-ImdbIdFromText $row.I
    if ($id) { return @{ Id = $id; Source = 'col-I' } }
    $id = Get-ImdbIdFromText $row.A
    if ($id) { return @{ Id = $id; Source = 'col-A' } }

    foreach ($key in @($row.I, $row.A)) {
        if ($key -and $script:SeedImdbByNormalized.ContainsKey($key)) {
            return @{ Id = $script:SeedImdbByNormalized[$key]; Source = 'seed-map' }
        }
    }

    $titleForEw = Get-TitleWithoutYear $(if ($row.I) { $row.I } else { $row.A })
    if ($titleForEw -match '(?i)^Eyewitness:') {
        $epId = Find-EyewitnessEpisodeId $titleForEw
        if ($epId) { return @{ Id = $epId; Source = 'eyewitness-series' } }
    }

    return $null
}

function Test-AcceptableTitleHit($data, [string]$sheetTitle, [string]$year, [string]$priorStatus) {
    if (-not $data -or $data.Response -ne 'True') { return $false }
    $type = [string]$data.Type
    # Colon-style DVD labels should not latch onto the parent series
    if ($sheetTitle -match ':' -and $type -eq 'series') { return $false }
    if ($type -eq 'movie' -and $priorStatus -like 'placeholder_*') {
        $oy = Get-OmdbYear ([string]$data.Year)
        if ($year -and $oy) {
            $delta = [Math]::Abs(([int]$year) - ([int]$oy))
            if ($delta -gt 2) { return $false }
        }
        # Require token overlap; for "Series: Episode" labels, prefer overlap on the episode half
        $compare = $sheetTitle
        if ($sheetTitle -match '^[^:]+:\s*(.+)$') { $compare = $Matches[1] }
        $sheetKey = Normalize-MatchKey (Get-TitleWithoutYear $compare)
        $omdbKey = Normalize-MatchKey ([string]$data.Title)
        if ($sheetKey -and $omdbKey) {
            $sheetTokens = @($sheetKey -split ' ' | Where-Object { $_.Length -gt 2 })
            $overlap = @($sheetTokens | Where-Object { $omdbKey -match [regex]::Escape($_) }).Count
            if ($overlap -lt 1) { return $false }
        }
    }
    return $true
}

function Try-TitleLookups([string]$title, [string]$year, [string]$priorStatus) {
    $variants = Get-TitleVariants $title
    # Prefer movie/episode over bare series for salvage quality
    $types = @('movie', 'episode', $null, 'series')
    foreach ($v in $variants) {
        foreach ($type in $types) {
            $yearTries = if ($year) { @($year, $null) } else { @($null) }
            foreach ($yTry in $yearTries) {
                Start-Sleep -Milliseconds $ThrottleMs
                $data = Invoke-OmdbByTitle $v $yTry $type
                if ($data.Response -eq 'True' -and (Test-AcceptableTitleHit $data $title $year $priorStatus)) {
                    return $data
                }
            }
        }
    }
    foreach ($v in $variants) {
        foreach ($type in @('movie', 'episode', $null)) {
            Start-Sleep -Milliseconds $ThrottleMs
            $search = Invoke-OmdbSearch $v $type
            if (-not $search -or $search.Response -ne 'True' -or -not $search.Search) { continue }
            $candidates = @($search.Search)
            if ($title -match ':') {
                $candidates = @($candidates | Where-Object { $_.Type -ne 'series' })
            }
            $pick = $null
            if ($year) {
                $pick = $candidates | Where-Object {
                    $sy = Get-OmdbYear ([string]$_.Year)
                    $sy -eq $year
                } | Select-Object -First 1
            }
            if (-not $pick -and $candidates.Count -eq 1) { $pick = $candidates[0] }
            if (-not $pick -and $title -match ':') {
                $pick = $candidates | Where-Object { $_.Type -eq 'episode' -or $_.Type -eq 'movie' } | Select-Object -First 1
            }
            if ($pick -and $pick.imdbID) {
                Start-Sleep -Milliseconds $ThrottleMs
                $byId = Invoke-OmdbByImdbId ([string]$pick.imdbID)
                if ($byId.Response -eq 'True' -and (Test-AcceptableTitleHit $byId $title $year $priorStatus)) {
                    return $byId
                }
            }
        }
    }
    return $null
}

function Try-SeriesColonEpisode([string]$title, [string]$year) {
    if ($title -notmatch '^([^:]+):\s*(.+)$') { return $null }
    $seriesName = $Matches[1].Trim()
    $episodeName = $Matches[2].Trim()
    Start-Sleep -Milliseconds $ThrottleMs
    $seriesHit = Invoke-OmdbByTitle $seriesName $null 'series'
    if ($seriesHit.Response -ne 'True') {
        Start-Sleep -Milliseconds $ThrottleMs
        $seriesHit = Invoke-OmdbByTitle $seriesName $year 'series'
    }
    if ($seriesHit.Response -ne 'True') {
        Start-Sleep -Milliseconds $ThrottleMs
        $search = Invoke-OmdbSearch $seriesName 'series'
        if ($search -and $search.Response -eq 'True' -and $search.Search) {
            $pick = @($search.Search) | Select-Object -First 1
            if ($pick.imdbID) {
                Start-Sleep -Milliseconds $ThrottleMs
                $seriesHit = Invoke-OmdbByImdbId ([string]$pick.imdbID)
            }
        }
    }
    if ($seriesHit.Response -ne 'True' -or $seriesHit.Type -ne 'series') {
        return @{ SeriesNote = ("series candidate search for '{0}' failed" -f $seriesName); Data = $null }
    }

    $seriesId = [string]$seriesHit.imdbID
    $total = 1
    if ($seriesHit.totalSeasons) {
        $parsed = 0
        if ([int]::TryParse([string]$seriesHit.totalSeasons, [ref]$parsed) -and $parsed -gt 0) { $total = [Math]::Min($parsed, 8) }
    }
    $epKey = Normalize-MatchKey $episodeName
    for ($season = 1; $season -le $total; $season++) {
        Start-Sleep -Milliseconds $ThrottleMs
        $seasonData = Invoke-OmdbSeason $seriesId $season
        if ($seasonData.Response -ne 'True' -or -not $seasonData.Episodes) { continue }
        foreach ($ep in @($seasonData.Episodes)) {
            $ek = Normalize-MatchKey ([string]$ep.Title)
            if (-not $ek) { continue }
            if ($ek -eq $epKey -or $ek.Contains($epKey) -or $epKey.Contains($ek)) {
                if ($ep.imdbID) {
                    Start-Sleep -Milliseconds $ThrottleMs
                    $full = Invoke-OmdbByImdbId ([string]$ep.imdbID)
                    if ($full.Response -eq 'True') {
                        return @{ SeriesNote = ("series={0} [{1}]" -f $seriesHit.Title, $seriesId); Data = $full }
                    }
                }
            }
        }
    }
    return @{
        SeriesNote = ('series={0} [{1}] - no episode title match for "{2}"' -f $seriesHit.Title, $seriesId, $episodeName)
        Data       = $null
        SeriesHit  = $seriesHit
    }
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
$skippedPacks = 0
for ($r = 2; $r -le $lastRow; $r++) {
    $status = ([string]$ws.Cells.Item($r, 13).Text).Trim()
    if ($status -notlike 'placeholder_*') { continue }
    $notes = ([string]$ws.Cells.Item($r, 15).Text).Trim()
    if ($notes -match '(?i)tv/season pack - deferred') {
        $skippedPacks++
        continue
    }
    $rows += [pscustomobject]@{
        Row    = $r
        A      = ([string]$ws.Cells.Item($r, 1).Text).Trim()
        B      = ([string]$ws.Cells.Item($r, 2).Text).Trim()
        F      = ([string]$ws.Cells.Item($r, 6).Text).Trim()
        I      = ([string]$ws.Cells.Item($r, 9).Text).Trim()
        J      = ([string]$ws.Cells.Item($r, 10).Text).Trim()
        K      = ([string]$ws.Cells.Item($r, 11).Text).Trim()
        L      = ([string]$ws.Cells.Item($r, 12).Text).Trim()
        Status = $status
        N      = ([string]$ws.Cells.Item($r, 14).Text).Trim()
        O      = $notes
    }
}
Write-Host "placeholder rows in scope: $($rows.Count) (skipped season packs: $skippedPacks)"

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
    $sheetNorm = if ($row.I) { $row.I } else { $null }
    $rec = [ordered]@{
        Row               = $row.Row
        A                 = $row.A
        B                 = $row.B
        prior_status      = $row.Status
        path              = $null
        normalized        = $row.I
        omdb_title        = $row.J
        omdb_year         = $row.K
        imdb_id           = $row.L
        status            = $row.Status
        proposed_category = $row.N
        notes             = $row.O
        has_poster        = $false
        salvaged          = $false
    }

    $keepStatus = $row.Status
    $hit = $null
    $path = $null

    # 1) imdb id from L/B/O/seed/Eyewitness series
    $idInfo = Resolve-ImdbIdForRow $row
    if ($idInfo) {
        Start-Sleep -Milliseconds $ThrottleMs
        $data = Invoke-OmdbByImdbId $idInfo.Id
        if ($data.Response -eq 'True') {
            $hit = $data
            $path = 'imdb-' + $idInfo.Source
        }
    }

    # 2) title / episode variants
    if (-not $hit) {
        $searchTitle = Get-TitleWithoutYear $(if ($row.B -and $row.B -notmatch '(?i)^tt\d') { $row.B } elseif ($row.I) { $row.I } else { $row.A })
        $year = Get-YearFromText $(if ($row.I) { $row.I } elseif ($row.B) { $row.B } else { $row.F })
        $hit = Try-TitleLookups $searchTitle $year $keepStatus
        if ($hit) { $path = 'title-search' }
    }

    # 3) Series: Episode walk
    if (-not $hit) {
        $searchTitle = Get-TitleWithoutYear $(if ($row.I) { $row.I } else { $row.A })
        $year = Get-YearFromText $(if ($row.I) { $row.I } else { $row.F })
        if ($searchTitle -match ':') {
            $seriesTry = Try-SeriesColonEpisode $searchTitle $year
            if ($seriesTry.Data) {
                $hit = $seriesTry.Data
                $path = 'series-episode'
            } elseif ($seriesTry.SeriesNote) {
                $rec.notes = Join-Note ('pass7: still no OMDb') $seriesTry.SeriesNote
                $path = 'series-note-only'
                # Optionally attach series id in notes for manual follow-up; keep status
                if ($seriesTry.SeriesHit) {
                    $rec.omdb_title = [string]$seriesTry.SeriesHit.Title
                    $rec.omdb_year = Get-OmdbYear ([string]$seriesTry.SeriesHit.Year)
                    $rec.imdb_id = [string]$seriesTry.SeriesHit.imdbID
                    $rec.has_poster = ([string]$seriesTry.SeriesHit.Poster -and [string]$seriesTry.SeriesHit.Poster -ne 'N/A')
                    $rec.notes = Join-Note $rec.notes ('parent series only; episode not matched')
                    $rec.salvaged = $false
                    $rec.path = $path
                    $results.Add([pscustomobject]$rec)
                    Write-Host ("[{0}/{1}] R{2} {3}->{4}: {5}" -f $n, $rows.Count, $row.Row, $path, $rec.status, $rec.normalized)
                    if (($results.Count % 15) -eq 0) {
                        $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8
                    }
                    continue
                }
            }
        }
    }

    if ($hit) {
        if ($hit.Type -eq 'movie') {
            Apply-MovieHit $rec $hit $catalog ('pass7: OMDb movie hit via {0}' -f $path)
            $rec.salvaged = $true
            $rec.path = $path
        } else {
            $statusKeep = Get-PlaceholderKeepStatus $keepStatus $hit
            Apply-EpisodeOrSeriesHit $rec $hit $statusKeep $sheetNorm $path
            $rec.salvaged = $true
            $rec.path = $path
        }
    } else {
        if ($path -ne 'series-note-only') {
            $rec.notes = Join-Note 'pass7: still no OMDb' $row.O
            $rec.path = 'miss'
        }
        $rec.salvaged = $false
    }

    $results.Add([pscustomobject]$rec)
    Write-Host ("[{0}/{1}] R{2} {3}->{4}: {5} L={6}" -f $n, $rows.Count, $row.Row, $rec.path, $rec.status, $rec.normalized, $rec.imdb_id)
    if (($results.Count % 15) -eq 0) {
        $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8
    }
}

$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $ProgressJson -Encoding UTF8

Write-Host "Writing $($results.Count) rows to pass7..."
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

$salvaged = @($results | Where-Object { $_.salvaged })
$misses = @($results | Where-Object { -not $_.salvaged })
$promotedMovies = @($results | Where-Object { $_.status -in @('matched', 'duplicate_in_catalog') })
$withPoster = @($salvaged | Where-Object { $_.has_poster })
$byPath = $results | Group-Object path
$byStatus = $results | Group-Object status

$md = New-Object System.Text.StringBuilder
[void]$md.AppendLine('# Titles 2.0 - pass 7 review (placeholder OMDb salvage)')
[void]$md.AppendLine('')
[void]$md.AppendLine("**Input:** ``$InputXlsx``")
[void]$md.AppendLine("**Results workbook:** ``$OutputXlsx``")
[void]$md.AppendLine("Sheet: ``$SheetName``")
[void]$md.AppendLine('')
[void]$md.AppendLine("Processed **$($results.Count)** placeholder rows (skipped season packs: $skippedPacks).")
[void]$md.AppendLine('')
[void]$md.AppendLine('## Summary')
[void]$md.AppendLine('')
[void]$md.AppendLine(('- **Salvaged (OMDb hit):** {0}' -f $salvaged.Count))
[void]$md.AppendLine(('- **With poster:** {0}' -f $withPoster.Count))
[void]$md.AppendLine(('- **Promoted to matched/duplicate:** {0}' -f $promotedMovies.Count))
[void]$md.AppendLine(('- **Still empty / miss:** {0}' -f $misses.Count))
[void]$md.AppendLine('')
[void]$md.AppendLine('## Paths')
[void]$md.AppendLine('')
foreach ($g in $byPath) { [void]$md.AppendLine(('- **{0}**: {1}' -f $g.Name, $g.Count)) }
[void]$md.AppendLine('')
[void]$md.AppendLine('## Status after pass')
[void]$md.AppendLine('')
foreach ($g in $byStatus) { [void]$md.AppendLine(('- **{0}**: {1}' -f $g.Name, $g.Count)) }
[void]$md.AppendLine('')
[void]$md.AppendLine('## Salvaged')
[void]$md.AppendLine('')
foreach ($item in $salvaged) {
    $poster = if ($item.has_poster) { 'poster' } else { 'no-poster' }
    [void]$md.AppendLine(('- Row {0} [{1}] `{2}` -> {3} L={4} ({5})' -f $item.Row, $item.path, $item.normalized, $item.status, $item.imdb_id, $poster))
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## Still no OMDb')
[void]$md.AppendLine('')
if ($misses.Count -eq 0) { [void]$md.AppendLine('_None_') }
else {
    foreach ($item in $misses) {
        [void]$md.AppendLine(('- Row {0}: `{1}` | {2}' -f $item.Row, $item.normalized, $item.notes))
    }
}
[void]$md.AppendLine('')
[void]$md.AppendLine('## HOLD')
[void]$md.AppendLine('')
[void]$md.AppendLine('No movieDatabase edits. Episode/series salvage fills J/K/L for later import with `imdbIdByListing` if desired.')
Set-Content -LiteralPath $ReviewMd -Value $md.ToString() -Encoding UTF8

$review = [pscustomobject]@{
    workbook         = $OutputXlsx
    input            = $InputXlsx
    processed        = $results.Count
    skipped_packs    = $skippedPacks
    salvaged         = $salvaged.Count
    with_poster      = $withPoster.Count
    promoted_movies  = $promotedMovies.Count
    misses           = $misses.Count
    results          = $results
}
$review | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ReviewJson -Encoding UTF8

Write-Host '=== PASS7 SUMMARY ==='
Write-Host ("salvaged={0} poster={1} matched/dup={2} miss={3}" -f $salvaged.Count, $withPoster.Count, $promotedMovies.Count, $misses.Count)
foreach ($g in $byPath) { Write-Host ("path {0}: {1}" -f $g.Name, $g.Count) }
Write-Host "Wrote: $OutputXlsx"
Write-Host "Review: $ReviewMd"
Write-Host 'HOLD: no movieDatabase edits.'
