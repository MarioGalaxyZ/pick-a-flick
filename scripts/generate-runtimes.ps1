$OMDB_API_KEY = '14e2f0ac'
$mainJsPath = Join-Path $PSScriptRoot '..\main.js'
$mainJs = Get-Content $mainJsPath -Raw

$listings = [regex]::Matches($mainJs, '"([^"]+\(\d{4}\)[^"]*)"') |
    ForEach-Object { $_.Groups[1].Value } |
    Select-Object -Unique

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

    $title = [uri]::EscapeDataString($parsed.cleanTitle)
    $year = $parsed.year
    $url = "https://www.omdbapi.com/?t=$title&y=$year&apikey=$OMDB_API_KEY"

    try {
        $data = Invoke-RestMethod -Uri $url -TimeoutSec 15
        if ($data.Response -eq 'True' -and $data.Runtime -and $data.Runtime -ne 'N/A') {
            if ($data.Runtime -match '(\d+)') { return [int]$Matches[1] }
        }

        $retryUrl = "https://www.omdbapi.com/?t=$title&apikey=$OMDB_API_KEY"
        $retry = Invoke-RestMethod -Uri $retryUrl -TimeoutSec 15
        if ($retry.Response -eq 'True' -and $retry.Runtime -and $retry.Runtime -ne 'N/A') {
            if ($retry.Runtime -match '(\d+)') { return [int]$Matches[1] }
        }
    } catch {
        Write-Warning "ERROR: $listing - $_"
    }

    Write-Warning "MISS: $listing"
    return $null
}

$runtimeMap = @{}
$i = 0
foreach ($listing in $listings) {
    $i++
    Write-Host "[$i/$($listings.Count)] $listing"
    $mins = Get-OmdbRuntime $listing
    if ($null -ne $mins) {
        $runtimeMap[$listing] = $mins
    }
    Start-Sleep -Milliseconds 250
}

$lines = $runtimeMap.GetEnumerator() |
    Sort-Object Name |
    ForEach-Object {
        $escaped = $_.Name -replace '\\', '\\' -replace '"', '\"'
        "        `"$escaped`": $($_.Value),"
    }

$output = @"
// $($runtimeMap.Count) entries
const movieRuntimeMinutes = {
$($lines -join "`n")
};
"@

$outputPath = Join-Path $PSScriptRoot 'runtime-map.js'
$output | Set-Content $outputPath -Encoding UTF8
Write-Host "Wrote $($runtimeMap.Count) entries to $outputPath"
