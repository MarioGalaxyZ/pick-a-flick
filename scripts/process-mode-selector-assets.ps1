$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$stagingDir = Join-Path $root 'graphics\_staging'
$candidateSources = @(
    (Join-Path $stagingDir 'mode select pacman right shape no background minus leds.PNG'),
    (Join-Path $stagingDir 'mode select pacman right shape no background.png'),
    (Join-Path $stagingDir 'mode-selector-source.png')
)
$src = $null
foreach ($candidate in $candidateSources) {
    if (Test-Path -LiteralPath $candidate) {
        $src = $candidate
        break
    }
}
if (-not $src) {
    $fallback = 'C:\Users\james\.cursor\projects\c-Users-james-Documents-Pick-A-Flick-Cursor\assets\c__Users_james_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_mode_select_pacman_right_shape_no_background-6885cd1e-aaaa-4946-a5a8-2ec847fb0173.png'
    if (-not (Test-Path -LiteralPath $fallback)) {
        throw 'Panel source PNG not found in graphics/_staging/ or assets fallback.'
    }
    if (-not (Test-Path -LiteralPath $stagingDir)) {
        New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null
    }
    $src = Join-Path $stagingDir 'mode-selector-source.png'
    Copy-Item -LiteralPath $fallback -Destination $src -Force
}

$panelPath = Join-Path $root 'graphics\ui\mode-selector-panel.png'
# Dial overlay (mode-selector-dial.png) is hand-supplied — not generated here.

$orig = [System.Drawing.Bitmap]::FromFile($src)
$w = $orig.Width
$h = $orig.Height
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$data = $orig.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$srcBytes = New-Object byte[] ($stride * $h)
[Runtime.InteropServices.Marshal]::Copy($data.Scan0, $srcBytes, 0, $srcBytes.Length)
$orig.UnlockBits($data)

$cx = [int]($w * 0.48)
$cy = [int]($h * 0.395)
$radius = [int][Math]::Max(40, [Math]::Round(40 * ($w / 759.0)))
$radiusSq = $radius * $radius

$nearBlack = New-Object bool[] ($w * $h)
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $si = ($y * $stride) + ($x * 4)
        $nearBlack[($y * $w) + $x] = ($srcBytes[$si + 2] -le 8 -and $srcBytes[$si + 1] -le 8 -and $srcBytes[$si] -le 8)
    }
}

$outside = New-Object bool[] ($w * $h)
$queue = [System.Collections.Generic.Queue[int]]::new()
function Add-Outside([int]$x, [int]$y) {
    if ($x -lt 0 -or $y -lt 0 -or $x -ge $w -or $y -ge $h) { return }
    $idx = ($y * $w) + $x
    if ($outside[$idx] -or -not $nearBlack[$idx]) { return }
    $outside[$idx] = $true
    $queue.Enqueue($idx)
}
Add-Outside 0 0
Add-Outside ($w - 1) 0
Add-Outside 0 ($h - 1)
Add-Outside ($w - 1) ($h - 1)
while ($queue.Count -gt 0) {
    $idx = $queue.Dequeue()
    $x = $idx % $w
    $y = [int][Math]::Floor($idx / $w)
    Add-Outside ($x - 1) $y
    Add-Outside ($x + 1) $y
    Add-Outside $x ($y - 1)
    Add-Outside $x ($y + 1)
}

$panelBmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$panelData = $panelBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$outBytes = New-Object byte[] ($panelData.Stride * $h)
$outsideCount = 0
$bodyCount = 0
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $idx = ($y * $w) + $x
        $si = ($y * $stride) + ($x * 4)
        $oi = ($y * $panelData.Stride) + ($x * 4)
        $dx = $x - $cx
        $dy = $y - $cy
        if ($outside[$idx] -or (($dx * $dx + $dy * $dy) -le $radiusSq)) {
            $outBytes[$oi] = 0
            $outBytes[$oi + 1] = 0
            $outBytes[$oi + 2] = 0
            $outBytes[$oi + 3] = 0
            if ($outside[$idx]) { $outsideCount++ }
        } else {
            $outBytes[$oi] = $srcBytes[$si]
            $outBytes[$oi + 1] = $srcBytes[$si + 1]
            $outBytes[$oi + 2] = $srcBytes[$si + 2]
            $outBytes[$oi + 3] = $srcBytes[$si + 3]
            $bodyCount++
        }
    }
}
[Runtime.InteropServices.Marshal]::Copy($outBytes, 0, $panelData.Scan0, $outBytes.Length)
$panelBmp.UnlockBits($panelData)
$panelBmp.Save($panelPath, [System.Drawing.Imaging.ImageFormat]::Png)

$check = [System.Drawing.Bitmap]::FromFile($panelPath)
Write-Output "source=$([IO.Path]::GetFileName($src)) ${w}x${h} hub cx=$cx cy=$cy r=$radius"
Write-Output "outside=$outsideCount body=$bodyCount bodyA=$($check.GetPixel([int]($w*0.5),[int]($h*0.12)).A) bodyR=$($check.GetPixel([int]($w*0.5),[int]($h*0.12)).R) cornerA=$($check.GetPixel(0,0).A)"
$check.Dispose()
$panelBmp.Dispose()
$orig.Dispose()
Write-Output 'Saved panel asset.'
