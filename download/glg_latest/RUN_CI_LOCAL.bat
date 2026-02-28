@echo off
setlocal
echo === GEG CI LOCAL ===
echo 1) npm ci
echo 2) npm run ci:local  (typecheck + tests + build)
echo ===================
npm run ci:local
if errorlevel 1 (
  echo.
  echo CI LOCAL FAILED
  exit /b 1
)
echo.
echo CI LOCAL OK
