$mainJs = Get-Content (Join-Path $PSScriptRoot '..\app\main.js') -Raw

function Test-FilterLogic {
    param(
        [hashtable]$RuntimeMap,
        [array]$Movies,
        [nullable[int]]$Min,
        [nullable[int]]$Max
    )

    $active = $true
    $filtered = @()
    foreach ($movie in $Movies) {
        if (-not $active) {
            $filtered += $movie
            continue
        }
        $minutes = $RuntimeMap[$movie]
        if ($null -eq $minutes) { continue }
        if ($null -ne $Min -and $minutes -lt $Min) { continue }
        if ($null -ne $Max -and $minutes -gt $Max) { continue }
        $filtered += $movie
    }
    return $filtered
}

$mapBlock = [regex]::Match($mainJs, 'const movieRuntimeMinutes = \{([\s\S]*?)\};').Groups[1].Value
$runtimeMap = @{}
[regex]::Matches($mapBlock, '"([^"]+)":\s*(\d+)') | ForEach-Object {
    $runtimeMap[$_.Groups[1].Value] = [int]$_.Groups[2].Value
}

$dbBlock = [regex]::Match($mainJs, 'const movieDatabase = \{([\s\S]*?)\};').Groups[1].Value
$allMovies = [regex]::Matches($dbBlock, '"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }

Write-Host "Runtime entries: $($runtimeMap.Count)"
Write-Host "Database movies: $($allMovies.Count)"

$unknown = $allMovies | Where-Object { -not $runtimeMap.ContainsKey($_) }
Write-Host "Unknown runtime count: $($unknown.Count)"
if ($unknown.Count -gt 0) {
    Write-Host "Unknown titles:"
    $unknown | ForEach-Object { Write-Host "  $_" }
}

$max90 = Test-FilterLogic -RuntimeMap $runtimeMap -Movies $allMovies -Min $null -Max 90
Write-Host "Max 90 eligible: $($max90.Count)"
$max90 | ForEach-Object {
    if ($runtimeMap[$_] -gt 90) { throw "FAIL max90: $_ = $($runtimeMap[$_])" }
}

$min120 = Test-FilterLogic -RuntimeMap $runtimeMap -Movies $allMovies -Min 120 -Max $null
Write-Host "Min 120 eligible: $($min120.Count)"
$min120 | ForEach-Object {
    if ($runtimeMap[$_] -lt 120) { throw "FAIL min120: $_ = $($runtimeMap[$_])" }
}

$window = Test-FilterLogic -RuntimeMap $runtimeMap -Movies $allMovies -Min 90 -Max 120
Write-Host "Min 90 max 120 eligible: $($window.Count)"
$window | ForEach-Object {
    $m = $runtimeMap[$_]
    if ($m -lt 90 -or $m -gt 120) { throw "FAIL window: $_ = $m" }
}

$options = @(60, 75, 90, 105, 120, 135, 150, 165, 180)
if (($options | Measure-Object).Count -ne 9) { throw 'FAIL option count' }
if ($options[0] -ne 60 -or $options[-1] -ne 180) { throw 'FAIL option bounds' }

Write-Host 'All filter logic checks passed.'
