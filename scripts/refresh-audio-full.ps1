$ErrorActionPreference = 'Stop'
$root = Join-Path $PSScriptRoot '..'
Set-Location $root

function Get-NodeCommand {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        return (Get-Command node).Source
    }
    $fallbacks = @(
        "$env:ProgramFiles\nodejs\node.exe",
        "${env:ProgramFiles(x86)}\nodejs\node.exe",
        "$env:LOCALAPPDATA\Programs\node\node.exe"
    )
    foreach ($candidate in $fallbacks) {
        if (Test-Path $candidate) { return $candidate }
    }
    throw 'Node.js is required but was not found on PATH.'
}

$node = Get-NodeCommand
Write-Host "Using Node: $node"

& $node (Join-Path $PSScriptRoot 'sync-audio-paths.mjs')
& $node (Join-Path $PSScriptRoot 'sync-win-clips-manifest.mjs')
& $node (Join-Path $PSScriptRoot 'analyze-audio-gains.mjs') '--' '--full'
& $node (Join-Path $PSScriptRoot 'analyze-coin-flip-blips.mjs')

Write-Host 'Full audio refresh complete.'
