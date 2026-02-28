@echo off
setlocal
echo === GEG PACKAGE RELEASE ===
echo This will run: npm run build  then create releases\guitar-edu-ui_*_release.zip
echo ===========================
npm run build
if errorlevel 1 (
  echo.
  echo BUILD FAILED
  exit /b 1
)
npm run release:zip
if errorlevel 1 (
  echo.
  echo PACKAGE FAILED
  exit /b 1
)
echo.
echo PACKAGE OK
