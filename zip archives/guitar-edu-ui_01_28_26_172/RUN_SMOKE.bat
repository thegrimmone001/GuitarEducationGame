\
@echo off
setlocal
cd /d "%~dp0"
echo.
echo === Guitar-Edu-UI Smoke Mode ===
echo Build: 01_15_26_21
echo.
echo 1) Run: npm install  (first time only)
echo 2) This starts the dev server. Open the URL shown by Vite and append:
echo      ?smoke=1
echo    Example:
echo      http://localhost:5173/?smoke=1
echo.
npm run dev
