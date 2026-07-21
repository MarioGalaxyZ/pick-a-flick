# Deprecated: use npm run generate-metadata:ps instead.
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot 'load-env.ps1')
. (Join-Path $PSScriptRoot 'lib\omdb-api-key.ps1')
$cliApiKey = $env:OMDB_API_KEY
$cliFreeKey = $env:OMDB_API_KEY_FREE
Import-DotEnv (Join-Path $Root '.env')
if ($cliApiKey) { $env:OMDB_API_KEY = $cliApiKey }
if ($cliFreeKey) { $env:OMDB_API_KEY_FREE = $cliFreeKey }

$OmdbKeys = Get-OmdbKeySession
$mainJsPath = Join-Path $Root 'app\main.js'
$mainJs = Get-Content $mainJsPath -Raw

$listings = [regex]::Matches($mainJs, '"([^"]+\(\d{4}\)[^"]*)"') |
    ForEach-Object { $_.Groups[1].Value } |
    Select-Object -Unique

function Invoke-OmdbRuntimeRequest([string]$Title, [string]$Year) {
    $encoded = [uri]::EscapeDataString($Title)
    $url = "https://www.omdbapi.com/?t=$encoded&apikey=$($OmdbKeys.Key)"
    if ($Year) { $url += "&y=$([uri]::EscapeDataString($Year))" }
    $data = Invoke-RestMethod -Uri $url -TimeoutSec 15
    if (
        $data.Response -eq 'False' -and
        (Test-OmdbKeyFailure ([string]$data.Error)) -and
        (Switch-OmdbKeyMaybeFallback -Session $OmdbKeys -ErrorOrData $data)
    ) {
        $url = "https://www.omdbapi.com/?t=$encoded&apikey=$($OmdbKeys.Key)"
        if ($Year) { $url += "&y=$([uri]::EscapeDataString($Year))" }
        $data = Invoke-RestMethod -Uri $url -TimeoutSec 15
    }
    return $data
}

function Parse-Listing($listing) {
    if ($listing -match '\((\d{4})\)') {
        $year = $Matches[1]
        $cleanTitle = ($listing -split '\(')[0].Trim()
        return @{ cleanTitle = $cleanTitle; year = $year }
    }
    return $null
}

function Get-OmdbRuntime($listing) {
    $parsed = Parse-Listing $listing
    if (-not $parsed) {
        Write-Warning "SKIP (no year): $listing"
        return $null
    }

    try {
        $data = Invoke-OmdbRuntimeRequest $parsed.cleanTitle $parsed.year
        if ($data.Response -eq 'True' -and $data.Runtime -and $data.Runtime -ne 'N/A') {
            if ($data.Runtime -match '(\d+)') { return [int]$Matches[1] }
        }

        $retry = Invoke-OmdbRuntimeRequest $parsed.cleanTitle $null
        if ($retry.Response -eq 'True' -and $retry.Runtime -and $retry.Runtime -ne 'N/A') {
            if ($retry.Runtime -match '(\d+)') { return [int]$Matches[1] }
        }
    } catch {
        Write-Warning "ERROR: $listing - $_"
    }

    Write-Warning "MISS: $listing"
    return $null
}

Write-Host "API key: $(Get-OmdbKeySessionDescribe $OmdbKeys) (length $($OmdbKeys.Key.Length))"

$runtimeMap = @{}
$i = 0
foreach ($listing in $listings) {
    $i++
    Write-Progress -Activity 'OMDb runtimes' -Status $listing -PercentComplete (($i / $listings.Count) * 100)
    $mins = Get-OmdbRuntime $listing
    if ($null -ne $mins) { $runtimeMap[$listing] = $mins }
    Start-Sleep -Milliseconds 250
}

$lines = ($runtimeMap.GetEnumerator() | Sort-Object Name | ForEach-Object {
    $t = $_.Key -replace '\\', '\\' -replace '"', '\"'
    "        `"$t`": $($_.Value),"
}) -join "`n"

Write-Host "`n// $($runtimeMap.Count) entries`nconst movieRuntimeMinutes = {`n$lines`n};"
