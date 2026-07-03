$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

$uiDirs = @("spin", "intro", "keeper", "coin-flip", "shuffle", "ticket-stubs")
foreach ($dir in $uiDirs) {
    New-Item -ItemType Directory -Force -Path (Join-Path $root "audio\ui\$dir") | Out-Null
}

New-Item -ItemType Directory -Force -Path (Join-Path $root "audio\_staging") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $root "audio\win") | Out-Null

function Move-IfExists($src, $destDir) {
    if (-not (Test-Path $src)) { return }
    $name = Split-Path $src -Leaf
    $dest = Join-Path $destDir $name
    if (Test-Path $dest) { Remove-Item $dest -Force }
    Move-Item -Path $src -Destination $dest
}

# UI sounds
Move-IfExists (Join-Path $root "sounds\spin-projector-button-push.mp3") (Join-Path $root "audio\ui\spin")
Get-ChildItem (Join-Path $root "sounds") -Filter "output*.wav" -ErrorAction SilentlyContinue | ForEach-Object {
    Move-IfExists $_.FullName (Join-Path $root "audio\ui\intro")
}
Move-IfExists (Join-Path $root "sounds\output.wav") (Join-Path $root "audio\ui\intro")
Get-ChildItem (Join-Path $root "sounds") -Filter "keeper-*" -ErrorAction SilentlyContinue | ForEach-Object {
    Move-IfExists $_.FullName (Join-Path $root "audio\ui\keeper")
}
Get-ChildItem (Join-Path $root "sounds") -Filter "coin-flip-*" -ErrorAction SilentlyContinue | ForEach-Object {
    Move-IfExists $_.FullName (Join-Path $root "audio\ui\coin-flip")
}
Get-ChildItem (Join-Path $root "sounds") -Filter "ticket-shuffle-*" -ErrorAction SilentlyContinue | ForEach-Object {
    Move-IfExists $_.FullName (Join-Path $root "audio\ui\shuffle")
}
Get-ChildItem (Join-Path $root "sounds") -Filter "ticket-stubs-*" -ErrorAction SilentlyContinue | ForEach-Object {
    Move-IfExists $_.FullName (Join-Path $root "audio\ui\ticket-stubs")
}

# Victory categories
Get-ChildItem (Join-Path $root "win_sounds") -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    if ($_.Name -eq "NEW") { return }
    $dest = Join-Path $root "audio\win\$($_.Name)"
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
    Get-ChildItem $_.FullName -File -ErrorAction SilentlyContinue | ForEach-Object {
        Move-IfExists $_.FullName $dest
    }
}

# Staging (skip duplicate coin flips)
Get-ChildItem (Join-Path $root "win_sounds\NEW") -File -ErrorAction SilentlyContinue | ForEach-Object {
    if ($_.Name -in @("coin flip 1.mp3", "coin flip 2.mp3")) { return }
    Move-IfExists $_.FullName (Join-Path $root "audio\_staging")
}

# Remove empty legacy dirs
@("sounds", "win_sounds") | ForEach-Object {
    $legacy = Join-Path $root $_
    if (Test-Path $legacy) {
        Remove-Item $legacy -Recurse -Force
    }
}

Write-Host "Audio tree migration complete."
