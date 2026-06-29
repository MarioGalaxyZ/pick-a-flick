# Generates movie-metadata.js from main.js listings via OMDb.
# Usage: powershell -File scripts/generate-movie-metadata.ps1
# Set OMDB_API_KEY in .env (copy from .env.example) or environment before running.

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot 'load-env.ps1')
Import-DotEnv (Join-Path $Root '.env')

$MainJs = Join-Path $Root 'main.js'
$OutputPath = Join-Path $Root 'movie-metadata.js'
$OverridesPath = Join-Path $PSScriptRoot 'poster-overrides.json'
$ThrottleMs = 250
$ApiKey = if ($env:OMDB_API_KEY) { $env:OMDB_API_KEY } else { '14e2f0ac' }

function Parse-MovieListing([string]$Listing) {
    if ($Listing -match '\((\d{4})\)') {
        return @{
            cleanTitle = ($Listing -split '\(')[0].Trim()
            year = $Matches[1]
            listing = $Listing
        }
    }
    return @{ cleanTitle = $Listing.Trim(); year = $null; listing = $Listing }
}

function Normalize-PartNumbers([string]$Title) {
    $roman = @{ '1'='I'; '2'='II'; '3'='III'; '4'='IV'; '5'='V'; '6'='VI'; '7'='VII'; '8'='VIII'; '9'='IX'; '10'='X' }
    return [regex]::Replace($Title, '\bPart\s+(\d+)\b', {
        param($m)
        $n = [int]$m.Groups[1].Value
        if ($roman.ContainsKey("$n")) { "Part $($roman["$n"])" } else { $m.Value }
    }, 'IgnoreCase')
}

function Get-OmdbSearchTitle([string]$Listing) {
    $aliases = @{ "Bill & Ted's Face The Music (2020)" = 'Bill & Ted Face the Music' }
    if ($aliases.ContainsKey($Listing)) { return $aliases[$Listing] }
    return (Parse-MovieListing $Listing).cleanTitle
}

function Sanitize-PosterUrl([string]$Url) {
    if ([string]::IsNullOrWhiteSpace($Url) -or $Url -eq 'N/A') { return $Url }
    $u = $Url -replace '^http://', 'https://'
    $u = $u -replace '//ia\.media-imdb\.com/images/', '//m.media-amazon.com/images/'
    $u = $u -replace '//images-na\.ssl-images-amazon\.com/images/', '//m.media-amazon.com/images/'
    $u = $u -replace 'XkEyXkFqcG[^@]+@', 'XkEyXkFqcGc@'
    $u = $u -replace 'XkFqcGc[^@]+@', 'XkFqcGc@'
    return $u
}

function Invoke-Omdb([string]$Title, [string]$Year) {
    $encoded = [uri]::EscapeDataString($Title)
    $url = "https://www.omdbapi.com/?t=$encoded&apikey=$ApiKey"
    if ($Year) { $url += "&y=$([uri]::EscapeDataString($Year))" }
    $json = curl.exe -s -m 30 $url
    if (-not $json) { throw 'Empty OMDb response' }
    return $json | ConvertFrom-Json
}

function Test-HasPoster($Data) {
    return ($Data.Response -eq 'True') -and $Data.Poster -and ($Data.Poster -ne 'N/A')
}

function Get-OmdbListing([string]$Title, [string]$Year) {
    $data = Invoke-Omdb $Title $Year
    if ($Year -and -not (Test-HasPoster $data)) {
        $data = Invoke-Omdb $Title $null
    }
    if (-not (Test-HasPoster $data)) {
        $normalized = Normalize-PartNumbers $Title
        if ($normalized -ne $Title) {
            $data = Invoke-Omdb $normalized $Year
            if ($Year -and -not (Test-HasPoster $data)) {
                $data = Invoke-Omdb $normalized $null
            }
        }
    }
    return $data
}

function Test-PosterUrl([string]$Url) {
    try {
        $r = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing
        return ($r.StatusCode -eq 200) -and ($r.Headers['Content-Type'] -like 'image/*')
    } catch {
        try {
            $r = Invoke-WebRequest -Uri $Url -UseBasicParsing
            return ($r.StatusCode -eq 200) -and ($r.Headers['Content-Type'] -like 'image/*')
        } catch { return $false }
    }
}

function Get-ValidatedPoster($Data, [string]$Listing, $Overrides) {
    if ($Overrides.byListing.PSObject.Properties.Name -contains $Listing) {
        $u = $Overrides.byListing.$Listing
        if (Test-PosterUrl $u) { return $u }
    }
    if (-not $Data -or $Data.Response -ne 'True') { return $null }
    $candidates = @()
    if ($Data.imdbID -and $Overrides.byImdbId.PSObject.Properties.Name -contains $Data.imdbID) {
        $candidates += $Overrides.byImdbId.($Data.imdbID)
    }
    $sanitized = Sanitize-PosterUrl $Data.Poster
    if ($sanitized) { $candidates += $sanitized }
    if ($Data.Poster -and $Data.Poster -ne $sanitized) { $candidates += $Data.Poster }
    if ($sanitized -and $sanitized -like '*@._V1*') {
        $candidates += ($sanitized -replace '@\._V1', '._V1')
    }
    foreach ($u in ($candidates | Select-Object -Unique)) {
        if (Test-PosterUrl $u) { return $u }
    }
    return $null
}

function Build-MetadataRecord($Data, [string]$Poster) {
    $fields = @('Title','Year','Rated','Runtime','Genre','Director','Actors','Plot','imdbRating','Metascore','imdbID','Ratings')
    $record = [ordered]@{ Response = 'True' }
    foreach ($f in $fields) {
        if ($Data.$f -and $Data.$f -ne 'N/A') { $record[$f] = $Data.$f }
    }
    if ($Poster) { $record['Poster'] = $Poster }
    return $record
}

function Build-BootstrapRecord([string]$Listing, $Existing, [string]$Poster) {
    $parsed = Parse-MovieListing $Listing
    $record = [ordered]@{ Response = 'True'; Title = $parsed.cleanTitle; Year = $parsed.year }
    if ($Existing -and $Existing.Runtime) { $record['Runtime'] = $Existing.Runtime }
    if ($Poster) { $record['Poster'] = $Poster }
    return $record
}

function Test-FullMetadataRecord($Record) {
    return $Record -and $Record.Response -eq 'True' -and $Record.Poster -and $Record.Plot
}

function Load-ExistingMetadata([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) { return @{} }
    $content = Get-Content -Raw -LiteralPath $Path -Encoding UTF8
    $match = [regex]::Match($content, 'window\.movieMetadataByListing\s*=\s*(\{[\s\S]*\});')
    if (-not $match.Success) { return @{} }
    try {
        return (Invoke-Expression ("return $($match.Groups[1].Value)"))
    } catch {
        return @{}
    }
}

$mainJs = Get-Content -Raw -Path $MainJs -Encoding UTF8
$dbStart = $mainJs.IndexOf('const movieDatabase = {')
$dbEnd = $mainJs.IndexOf("`n    };", $dbStart)
$dbSection = $mainJs.Substring($dbStart, $dbEnd - $dbStart)
$listings = [regex]::Matches($dbSection, '"([^"]+\(\d{4}\)[^"]*)"') |
    ForEach-Object { $_.Groups[1].Value } |
    Sort-Object -Unique

$overrides = Get-Content -Raw -Path $OverridesPath -Encoding UTF8 | ConvertFrom-Json
$existing = Load-ExistingMetadata $OutputPath
$metadata = [ordered]@{}
foreach ($key in $existing.Keys) { $metadata[$key] = $existing[$key] }

$missed = @()
$posterMisses = @()
$omdbFetched = 0
$bootstrapped = 0
$skipped = 0

Write-Host "Generating metadata for $($listings.Count) listings..."
Write-Host "API key: $(if ($env:OMDB_API_KEY) { 'from OMDB_API_KEY' } else { 'default (set .env for your own key)' })`n"

$i = 0
foreach ($listing in $listings) {
    $i++
    $parsed = Parse-MovieListing $listing
    $searchTitle = Get-OmdbSearchTitle $listing
    $listingPosterOverride = $null
    if ($overrides.byListing.PSObject.Properties.Name -contains $listing) {
        $listingPosterOverride = $overrides.byListing.$listing
    }

    Write-Host -NoNewline "[$i/$($listings.Count)] $listing ... "

    if (-not $parsed.year) {
        Write-Host 'SKIP (no year)'
        $missed += $listing
        Start-Sleep -Milliseconds $ThrottleMs
        continue
    }

    $existingRecord = $null
    if ($metadata.Contains($listing)) { $existingRecord = $metadata[$listing] }
    if (Test-FullMetadataRecord $existingRecord) {
        Write-Host 'SKIP (cached)'
        $skipped++
        Start-Sleep -Milliseconds $ThrottleMs
        continue
    }

    $data = $null
    $omdbError = $null
    try {
        $data = Get-OmdbListing $searchTitle $parsed.year
        if ($data.Response -ne 'True') { $omdbError = $data.Error }
    } catch {
        $omdbError = $_.Exception.Message
    }

    if ($data -and $data.Response -eq 'True') {
        $poster = Get-ValidatedPoster $data $listing $overrides
        if (-not $poster) { $poster = $listingPosterOverride }
        if (-not $poster) { $posterMisses += $listing }
        $metadata[$listing] = Build-MetadataRecord $data $poster
        $omdbFetched++
        Write-Host ($(if ($poster) { 'OK' } else { 'OK (no poster)' }))
    } else {
        $poster = $listingPosterOverride
        if ($poster -and -not (Test-PosterUrl $poster)) { $poster = $null }
        $metadata[$listing] = Build-BootstrapRecord $listing $existingRecord $poster
        $bootstrapped++
        if (-not $poster) { $posterMisses += $listing }
        $missed += $listing
        Write-Host "BOOTSTRAP$(if ($omdbError) { " ($omdbError)" } else { '' })"
    }

    Start-Sleep -Milliseconds $ThrottleMs
}

$lines = @(
    '// Auto-generated by scripts/generate-movie-metadata.ps1 - do not edit by hand.',
    '// Re-run: npm run generate-metadata:ps',
    '// Set OMDB_API_KEY in .env for your own OMDb key.',
    'window.movieMetadataByListing = {'
)
$sortedKeys = @($metadata.Keys | Sort-Object)
for ($idx = 0; $idx -lt $sortedKeys.Count; $idx++) {
    $key = $sortedKeys[$idx]
    $jsonKey = ($key | ConvertTo-Json -Compress)
    $jsonVal = ($metadata[$key] | ConvertTo-Json -Compress -Depth 6)
    $suffix = if ($idx -lt $sortedKeys.Count - 1) { ',' } else { '' }
    $lines += "  $jsonKey`: $jsonVal$suffix"
}
$lines += '};'
$lines += ''
Set-Content -Path $OutputPath -Value ($lines -join "`n") -Encoding UTF8

$posterCount = ($metadata.Values | Where-Object { $_.Poster }).Count
Write-Host "`n--- Summary ---"
Write-Host "Total entries: $($metadata.Count)/$($listings.Count)"
Write-Host "OMDb fetched: $omdbFetched"
Write-Host "Bootstrapped: $bootstrapped"
Write-Host "Skipped (cached): $skipped"
Write-Host "With posters: $posterCount"
Write-Host "OMDb misses / bootstrap: $($missed.Count)"
Write-Host "Poster misses: $($posterMisses.Count)"
Write-Host "Output: $OutputPath"

if ($omdbFetched -eq 0 -and $bootstrapped -gt 0) {
    Write-Host "`nNo OMDb data fetched. Copy .env.example to .env, add your free key from https://www.omdbapi.com/apikey.aspx, then re-run."
}
