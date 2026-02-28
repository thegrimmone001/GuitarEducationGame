\
@echo off
setlocal
cd /d "%~dp0"
echo.
echo === Guitar-Edu-UI Checks (Typecheck + Build) ===
echo Build: 01_15_26_21
echo.
echo Running: npm run check
npm run check
