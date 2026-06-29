Add-Type -AssemblyName System.Drawing

$path = (Join-Path $PSScriptRoot '..\ticket_dispenser.png' | Resolve-Path).Path
$bmp = [System.Drawing.Bitmap]::FromFile($path)
$w = $bmp.Width
$h = $bmp.Height
$cx = [int]($w / 2)

function Test-SlotPixel([System.Drawing.Color]$Color) {
    return ($Color.A -gt 0 -and $Color.R -le 12 -and $Color.G -le 12 -and $Color.B -le 18)
}

$best = $null
for ($y = [int]($h * 0.68); $y -le [int]($h * 0.76); $y++) {
    $left = -1
    $right = -1
    for ($x = [int]($w * 0.195); $x -le [int]($w * 0.805); $x++) {
        $color = $bmp.GetPixel($x, $y)
        if (Test-SlotPixel $color) {
            if ($left -lt 0) { $left = $x }
            $right = $x
        }
    }
    if ($left -ge 0 -and $right -gt $left) {
        $width = $right - $left + 1
        if (-not $best -or $width -gt $best.width) {
            $best = @{ y = $y; left = $left; right = $right; width = $width }
        }
    }
}

if (-not $best) {
    throw 'Could not detect ticket dispenser slot opening.'
}

$slotCenterX = [int](($best.left + $best.right) / 2)
$top = -1
$bottom = -1
for ($y = [int]($h * 0.66); $y -le [int]($h * 0.79); $y++) {
    if (Test-SlotPixel ($bmp.GetPixel($slotCenterX, $y))) {
        if ($top -lt 0) { $top = $y }
        $bottom = $y
    }
}

$slotWidthRatio = [math]::Round($best.width / $w, 6)
$slotBottomRatio = [math]::Round(($bottom + 1) / $h, 6)
$slotTopRatio = [math]::Round($top / $h, 6)
$slotCenterXRatio = [math]::Round($slotCenterX / $w, 6)

Write-Host "Image: ${w}x${h}"
Write-Host "Slot left=$($best.left) right=$($best.right) top=$top bottom=$bottom width=$($best.width)"
Write-Host "slotWidthRatio=$slotWidthRatio"
Write-Host "slotBottomRatio=$slotBottomRatio"
Write-Host "slotTopRatio=$slotTopRatio"
Write-Host "slotCenterXRatio=$slotCenterXRatio"

$bmp.Dispose()
