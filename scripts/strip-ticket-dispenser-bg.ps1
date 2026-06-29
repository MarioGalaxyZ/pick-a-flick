param(
    [string]$InputPath = "C:\Users\james\Documents\Pick A Flick Cursor\ticket_dispenser.png",
    [string]$SourcePath = "C:\Users\james\.cursor\projects\c-Users-james-Documents-Pick-A-Flick-Cursor\assets\c__Users_james_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ticket_dispenser-fc099831-bce7-4dec-863c-d977ad08c6b6.png",
    [int]$Threshold = 24
)

Add-Type -AssemblyName System.Drawing

Copy-Item -Path $SourcePath -Destination $InputPath -Force

$src = [System.Drawing.Bitmap]::FromFile($InputPath)
$width = $src.Width
$height = $src.Height
$maxX = $width - 1
$maxY = $height - 1

$dst = New-Object System.Drawing.Bitmap $width, $height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($dst)
$graphics.DrawImage($src, 0, 0, $width, $height)
$graphics.Dispose()
$src.Dispose()

function Test-Candidate {
    param([System.Drawing.Color]$Color)
    return ($Color.A -gt 0 -and $Color.R -le $Threshold -and $Color.G -le $Threshold -and $Color.B -le $Threshold)
}

$visited = New-Object 'System.Collections.Generic.HashSet[int]'
$queue = New-Object 'System.Collections.Generic.Queue[System.ValueTuple[int,int]]'

foreach ($seed in @(
    [System.ValueTuple[int,int]]::new(0, 0),
    [System.ValueTuple[int,int]]::new($maxX, 0),
    [System.ValueTuple[int,int]]::new(0, $maxY),
    [System.ValueTuple[int,int]]::new($maxX, $maxY)
)) {
    $color = $dst.GetPixel($seed.Item1, $seed.Item2)
    if (Test-Candidate $color) {
        $key = ($seed.Item2 * $width) + $seed.Item1
        if ($visited.Add($key)) {
            $queue.Enqueue($seed)
        }
    }
}

while ($queue.Count -gt 0) {
    $current = $queue.Dequeue()
    $x = $current.Item1
    $y = $current.Item2
    $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))

    $left = $x - 1
    $right = $x + 1
    $up = $y - 1
    $down = $y + 1

    foreach ($neighbor in @(
        [System.ValueTuple[int,int]]::new($left, $y),
        [System.ValueTuple[int,int]]::new($right, $y),
        [System.ValueTuple[int,int]]::new($x, $up),
        [System.ValueTuple[int,int]]::new($x, $down)
    )) {
        $nx = $neighbor.Item1
        $ny = $neighbor.Item2
        if ($nx -lt 0 -or $ny -lt 0 -or $nx -gt $maxX -or $ny -gt $maxY) { continue }

        $key = ($ny * $width) + $nx
        if ($visited.Contains($key)) { continue }

        $color = $dst.GetPixel($nx, $ny)
        if (-not (Test-Candidate $color)) { continue }

        if ($visited.Add($key)) {
            $queue.Enqueue($neighbor)
        }
    }
}

$dst.Save($InputPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Transparent pixels: $($visited.Count)"
Write-Host "Saved: $InputPath"
$dst.Dispose()
