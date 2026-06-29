@echo off
cd /d "%~dp0"

echo Refreshing audio database...
echo.

call :runRefresh
set REFRESH_EXIT=%ERRORLEVEL%

echo.
if %REFRESH_EXIT% equ 0 (
    echo Refresh completed successfully.
) else (
    echo Refresh finished with errors.
)
echo.
pause
exit /b %REFRESH_EXIT%

:runRefresh
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\analyze-audio-gains.ps1"
exit /b %ERRORLEVEL%
