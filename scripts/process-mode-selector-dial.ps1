$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$stagingDir = Join-Path $root 'graphics\_staging'
$candidateSources = @(
    (Join-Path $stagingDir 'mode selector dial no background.png'),
    (Join-Path $stagingDir 'mode selector dial.png'),
    (Join-Path $stagingDir 'mode-selector-dial-source.png')
)
$src = $null
foreach ($candidate in $candidateSources) {
    if (Test-Path -LiteralPath $candidate) {
        $src = $candidate
        break
    }
}
$outPath = Join-Path $root 'graphics\ui\mode-selector-dial.png'

if (-not $src) {
    $fallback = 'C:\Users\james\.cursor\projects\c-Users-james-Documents-Pick-A-Flick-Cursor\assets\c__Users_james_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_mode_selector_dial-dd464ece-7519-4f19-8a20-a9b7eb616ce6.png'
    if (-not (Test-Path -LiteralPath $fallback)) {
        throw 'Dial source PNG not found in graphics/_staging/ or assets fallback.'
    }
    if (-not (Test-Path -LiteralPath $stagingDir)) {
        New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null
    }
    $src = Join-Path $stagingDir 'mode-selector-dial-source.png'
    Copy-Item -LiteralPath $fallback -Destination $src -Force
}

function Test-CheckerboardPixel([byte]$r, [byte]$g, [byte]$b) {
    $avg = ($r + $g + $b) / 3
    if ($avg -ge 110 -and $avg -le 180) {
        if ([Math]::Abs($r - $g) -le 8 -and [Math]::Abs($g - $b) -le 8 -and [Math]::Abs($r - $b) -le 8) {
            return $true
        }
    }
    return $false
}

function Test-OuterBackgroundPixel([byte]$r, [byte]$g, [byte]$b) {
    if ($r -le 8 -and $g -le 8 -and $b -le 8) { return $true }
    return (Test-CheckerboardPixel $r $g $b)
}

function Test-BackgroundPixel([byte]$r, [byte]$g, [byte]$b) {
    return (Test-OuterBackgroundPixel $r $g $b)
}

function Test-KnobPixel([byte]$r, [byte]$g, [byte]$b) {
    if (Test-CheckerboardPixel $r $g $b) { return $false }
    if ($r -le 8 -and $g -le 8 -and $b -le 8) { return $false }
    if ($r -ge 190 -and $g -ge 190 -and $b -ge 190) { return $false }
    return $true
}

function Test-TrueAlphaSource([byte[]]$bytes, [int]$width, [int]$height, [int]$stride) {
    $transparentCorners = 0
    $xMax = $width - 1
    $yMax = $height - 1
    $cornerCoords = @(
        0, 0,
        $xMax, 0,
        0, $yMax,
        $xMax, $yMax
    )
    for ($ci = 0; $ci -lt $cornerCoords.Length; $ci += 2) {
        $cx = $cornerCoords[$ci]
        $cy = $cornerCoords[$ci + 1]
        $si = ($cy * $stride) + ($cx * 4)
        if ($bytes[$si + 3] -lt 32) { $transparentCorners++ }
    }
    if ($transparentCorners -ge 3) { return $true }

    $checkerboardHits = 0
    $samples = 0
    for ($y = 0; $y -lt $height; $y += 8) {
        for ($x = 0; $x -lt $width; $x += 8) {
            $si = ($y * $stride) + ($x * 4)
            $samples++
            if (Test-CheckerboardPixel $bytes[$si + 2] $bytes[$si + 1] $bytes[$si]) {
                $checkerboardHits++
            }
        }
    }
    return ($checkerboardHits -lt [Math]::Max(1, [int][Math]::Floor($samples * 0.02)))
}

function Get-KnobBounds([byte[]]$bytes, [int]$width, [int]$height, [int]$stride, [byte]$alphaThreshold = 20) {
    $minX = $width
    $minY = $height
    $maxX = 0
    $maxY = 0
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $si = ($y * $stride) + ($x * 4)
            if ($bytes[$si + 3] -gt $alphaThreshold) {
                if ($x -lt $minX) { $minX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    if ($maxX -lt $minX -or $maxY -lt $minY) { return $null }
    return @{
        MinX = $minX
        MinY = $minY
        MaxX = $maxX
        MaxY = $maxY
        Cx   = [int][Math]::Round(($minX + $maxX) / 2.0)
        Cy   = [int][Math]::Round(($minY + $maxY) / 2.0)
        Radius = [int][Math]::Floor([Math]::Min($maxX - $minX + 1, $maxY - $minY + 1) / 2.0)
    }
}

$orig = [System.Drawing.Bitmap]::FromFile($src)
$w = $orig.Width
$h = $orig.Height
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$data = $orig.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$srcBytes = New-Object byte[] ($stride * $h)
[Runtime.InteropServices.Marshal]::Copy($data.Scan0, $srcBytes, 0, $srcBytes.Length)
$orig.UnlockBits($data)

function Get-Pixel([int]$x, [int]$y) {
    if ($x -lt 0 -or $y -lt 0 -or $x -ge $w -or $y -ge $h) { return $null }
    $si = ($y * $stride) + ($x * 4)
    return @{
        R = $srcBytes[$si + 2]
        G = $srcBytes[$si + 1]
        B = $srcBytes[$si]
        A = $srcBytes[$si + 3]
    }
}

$trueAlpha = Test-TrueAlphaSource $srcBytes $w $h $stride
$cx = [int]($w / 2)
$cy = [int]($h / 2)
$radius = 0
$radiusMethod = 'unknown'

if ($trueAlpha) {
    $bounds = Get-KnobBounds $srcBytes $w $h $stride
    if ($bounds) {
        $cx = $bounds.Cx
        $cy = $bounds.Cy
        $radius = [int][Math]::Max(1, [Math]::Floor($bounds.Radius * 0.98))
        $radiusMethod = 'knob-bounds'
    }

    if ($radius -lt 1) {
        $rayCount = 64
        $scanStart = [int][Math]::Max(40, [Math]::Floor([Math]::Min($w, $h) * 0.15))
        $alphaRun = 4
        $edges = New-Object System.Collections.Generic.List[int]
        for ($i = 0; $i -lt $rayCount; $i++) {
            $angle = (2 * [Math]::PI * $i) / $rayCount
            $dx = [Math]::Cos($angle)
            $dy = [Math]::Sin($angle)
            $run = 0
            $seenKnob = $false
            for ($r = $scanStart; $r -lt [Math]::Min($w, $h); $r++) {
                $x = [int][Math]::Round($cx + ($dx * $r))
                $y = [int][Math]::Round($cy + ($dy * $r))
                $px = Get-Pixel $x $y
                if ($null -eq $px) { break }
                if ($px.A -gt 20) {
                    $seenKnob = $true
                    $run = 0
                    continue
                }
                if (-not $seenKnob) { continue }
                $run++
                if ($run -ge $alphaRun) {
                    $edge = $r - $alphaRun + 1
                    $edges.Add($edge) | Out-Null
                    break
                }
            }
        }
        if ($edges.Count -lt 1) {
            $orig.Dispose()
            throw 'Could not detect dial outer radius from true-alpha source.'
        }
        $detected = ($edges | Sort-Object)[[int][Math]::Floor($edges.Count * 0.15)]
        $radius = [int][Math]::Max(1, [Math]::Floor($detected * 0.98))
        $radiusMethod = 'alpha-edge'
    }
} else {
    $rayCount = 64
    $scanStart = [int][Math]::Max(200, [Math]::Floor([Math]::Min($w, $h) * 0.33))
    $bgRun = 6
    $edges = New-Object System.Collections.Generic.List[int]
    for ($i = 0; $i -lt $rayCount; $i++) {
        $angle = (2 * [Math]::PI * $i) / $rayCount
        $dx = [Math]::Cos($angle)
        $dy = [Math]::Sin($angle)
        $run = 0
        $seenKnob = $false
        for ($r = $scanStart; $r -lt [Math]::Min($w, $h); $r++) {
            $x = [int][Math]::Round($cx + ($dx * $r))
            $y = [int][Math]::Round($cy + ($dy * $r))
            $px = Get-Pixel $x $y
            if ($null -eq $px) { break }
            if (Test-KnobPixel $px.R $px.G $px.B) {
                $seenKnob = $true
                $run = 0
                continue
            }
            if (-not $seenKnob) { continue }
            if (-not (Test-CheckerboardPixel $px.R $px.G $px.B)) {
                $run = 0
                continue
            }
            $run++
            if ($run -ge $bgRun) {
                $edge = $r - $bgRun + 1
                $edges.Add($edge) | Out-Null
                break
            }
        }
    }
    if ($edges.Count -lt 1) {
        $orig.Dispose()
        throw 'Could not detect dial outer radius from checkerboard source image.'
    }
    $detected = ($edges | Sort-Object)[[int][Math]::Floor($edges.Count * 0.15)]
    $radius = [int][Math]::Max(1, [Math]::Floor($detected * 0.97))
    $radiusMethod = 'checkerboard-edge'
}

$radiusSq = $radius * $radius
$size = $radius * 2

$outBmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$outRect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
$outData = $outBmp.LockBits($outRect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$outBytes = New-Object byte[] ($outData.Stride * $size)

for ($y = 0; $y -lt $size; $y++) {
    for ($x = 0; $x -lt $size; $x++) {
        $dx = $x - $radius + 0.5
        $dy = $y - $radius + 0.5
        $oi = ($y * $outData.Stride) + ($x * 4)
        if (($dx * $dx + $dy * $dy) -gt $radiusSq) {
            $outBytes[$oi] = 0
            $outBytes[$oi + 1] = 0
            $outBytes[$oi + 2] = 0
            $outBytes[$oi + 3] = 0
            continue
        }
        $sx = $cx - $radius + $x
        $sy = $cy - $radius + $y
        if ($sx -lt 0 -or $sy -lt 0 -or $sx -ge $w -or $sy -ge $h) {
            $outBytes[$oi] = 0
            $outBytes[$oi + 1] = 0
            $outBytes[$oi + 2] = 0
            $outBytes[$oi + 3] = 0
            continue
        }
        $si = ($sy * $stride) + ($sx * 4)
        if ($trueAlpha) {
            $outBytes[$oi] = $srcBytes[$si]
            $outBytes[$oi + 1] = $srcBytes[$si + 1]
            $outBytes[$oi + 2] = $srcBytes[$si + 2]
            $outBytes[$oi + 3] = $srcBytes[$si + 3]
        } elseif (Test-BackgroundPixel $srcBytes[$si + 2] $srcBytes[$si + 1] $srcBytes[$si]) {
            $outBytes[$oi] = 0
            $outBytes[$oi + 1] = 0
            $outBytes[$oi + 2] = 0
            $outBytes[$oi + 3] = 0
        } else {
            $outBytes[$oi] = $srcBytes[$si]
            $outBytes[$oi + 1] = $srcBytes[$si + 1]
            $outBytes[$oi + 2] = $srcBytes[$si + 2]
            $outBytes[$oi + 3] = 255
        }
    }
}

[Runtime.InteropServices.Marshal]::Copy($outBytes, 0, $outData.Scan0, $outBytes.Length)
$outBmp.UnlockBits($outData)
$outBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$check = [System.Drawing.Bitmap]::FromFile($outPath)
$edgePx = $check.GetPixel([Math]::Min($radius + 5, $size - 1), $radius)
$cornerPx = $check.GetPixel(0, 0)
$outFile = Get-Item -LiteralPath $outPath
Write-Output "source=$([IO.Path]::GetFileName($src)) ${w}x${h} trueAlpha=$trueAlpha cx=$cx cy=$cy radiusMethod=$radiusMethod"
Write-Output "radius=$radius size=${size}x${size} cornerA=$($cornerPx.A) edgeA=$($edgePx.A) edgeR=$($edgePx.R) edgeG=$($edgePx.G)"
Write-Output "Saved dial asset: $outPath ($($outFile.Length) bytes)"
$check.Dispose()
$outBmp.Dispose()
$orig.Dispose()
