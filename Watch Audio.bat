@echo off
cd /d "%~dp0"

echo Watching audio/ — drop clips and reload the browser when updated.
echo Press Ctrl+C to stop watching.
echo.

call :runWatch
set WATCH_EXIT=%ERRORLEVEL%

echo.
if %WATCH_EXIT% equ 0 (
    echo Watcher stopped.
) else (
    echo Watcher exited with errors.
)
echo.
pause
exit /b %WATCH_EXIT%

:runWatch
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\watch-audio.ps1"
exit /b %ERRORLEVEL%
