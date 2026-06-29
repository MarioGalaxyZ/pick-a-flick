# Run the audio file watcher (uses same Node discovery as analyze-audio-gains.ps1).

$ErrorActionPreference = 'Stop'
$projectRoot = Resolve-Path (Join-Path $PSScriptRoot '..')

function Get-NodeCommand {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        return (Get-Command node).Source
    }

    $fallbacks = @(
        "$env:ProgramFiles\nodejs\node.exe",
        "${env:ProgramFiles(x86)}\nodejs\node.exe",
        "$env:LOCALAPPDATA\Programs\node\node.exe",
        "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
    )

    foreach ($candidate in $fallbacks) {
        if (Test-Path $candidate) {
            return $candidate
        }
    }

    throw 'Node.js is required but was not found on PATH.'
}

Push-Location $projectRoot
$exitCode = 0
try {
    $node = Get-NodeCommand
    Write-Host "Using Node: $node"
    Write-Host ''

    & $node (Join-Path $PSScriptRoot 'watch-audio.mjs')
    if ($LASTEXITCODE -ne 0) {
        throw "watch-audio.mjs failed with exit code $LASTEXITCODE"
    }
} catch {
    Write-Host ''
    Write-Host $_.Exception.Message -ForegroundColor Red
    $exitCode = 1
} finally {
    Pop-Location
}

exit $exitCode
