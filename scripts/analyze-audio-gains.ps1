# Sync win clip roster and analyze loudness (regenerates audio-paths.js, win-clips-manifest.js + audio-gain-map.js).
#
# Run this after adding new clips to audio/win/<category>/ or audio/ui/:
#   .\scripts\analyze-audio-gains.ps1
# Or: npm run refresh-audio
#
# Requires Node.js. Uses ffmpeg-static from npm if dependencies are installed;
# otherwise downloads a portable ffmpeg binary on first run (Windows).

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

    if (Test-Path (Join-Path $projectRoot 'package.json')) {
        if (-not (Test-Path (Join-Path $projectRoot 'node_modules\ffmpeg-static')) -and (Get-Command npm -ErrorAction SilentlyContinue)) {
            Write-Host 'Installing ffmpeg-static (one-time)...'
            npm install
            if ($LASTEXITCODE -ne 0) {
                throw "npm install failed with exit code $LASTEXITCODE"
            }
        }
    }

    & $node (Join-Path $PSScriptRoot 'sync-audio-paths.mjs')
    if ($LASTEXITCODE -ne 0) {
        throw "sync-audio-paths.mjs failed with exit code $LASTEXITCODE"
    }

    & $node (Join-Path $PSScriptRoot 'sync-win-clips-manifest.mjs')
    if ($LASTEXITCODE -ne 0) {
        throw "sync-win-clips-manifest.mjs failed with exit code $LASTEXITCODE"
    }

    & $node (Join-Path $PSScriptRoot 'analyze-audio-gains.mjs')
    if ($LASTEXITCODE -ne 0) {
        throw "analyze-audio-gains.mjs failed with exit code $LASTEXITCODE"
    }

    Write-Host ''
    Write-Host 'Done. audio-paths.js, win-clips-manifest.js and audio-gain-map.js are ready.'
} catch {
    Write-Host ''
    Write-Host $_.Exception.Message -ForegroundColor Red
    $exitCode = 1
} finally {
    Pop-Location
}

exit $exitCode
