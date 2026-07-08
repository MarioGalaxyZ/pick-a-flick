$ErrorActionPreference = 'Stop'
$Port = 8765
$Root = Split-Path -Parent $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Output "Serving $Root on http://127.0.0.1:$Port/app/index.html"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $path = $context.Request.Url.LocalPath

    if ($path -eq '/') {
        $context.Response.StatusCode = 302
        $context.Response.Headers.Add('Location', '/app/index.html')
        $context.Response.Close()
        continue
    }

    if ($path -eq '/app' -or $path -eq '/app/') {
        $path = '/app/index.html'
    }

    $relative = $path.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar)
    $file = Join-Path $Root $relative
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
        $appFile = Join-Path $Root ('app' + [IO.Path]::DirectorySeparatorChar + $relative)
        if (Test-Path -LiteralPath $appFile -PathType Leaf) {
            $file = $appFile
        }
    }
    if (Test-Path -LiteralPath $file -PathType Leaf) {
        $ext = [IO.Path]::GetExtension($file).ToLowerInvariant()
        $contentType = switch ($ext) {
            '.html' { 'text/html; charset=utf-8' }
            '.js' { 'application/javascript; charset=utf-8' }
            '.css' { 'text/css; charset=utf-8' }
            '.json' { 'application/json; charset=utf-8' }
            '.mp3' { 'audio/mpeg' }
            '.wav' { 'audio/wav' }
            '.svg' { 'image/svg+xml' }
            default { 'application/octet-stream' }
        }
        $bytes = [IO.File]::ReadAllBytes($file)
        $context.Response.ContentType = $contentType
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $context.Response.StatusCode = 404
    }
    $context.Response.Close()
}
