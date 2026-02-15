\
@echo off
setlocal
cd /d "%~dp0"

rem Tripwire: prevent running from a nested duplicate folder (common unzip mistake)
for %%I in ("%CD%") do set "CURDIRNAME=%%~nxI"
if exist "%CD%\%CURDIRNAME%\package.json" (
  echo.
  echo ERROR: Detected a nested project folder: "%CURDIRNAME%\%CURDIRNAME%".
  echo Fix: Move the inner folder contents up one level so this folder contains package.json.
  echo.
  pause
  exit /b 1
)

echo.
echo === Guitar-Edu-UI Dev Server ===
echo Build: 01_16_26_98
echo.
echo If this is your first run:
echo   npm install
echo.
echo Starting dev server...
npm run dev
