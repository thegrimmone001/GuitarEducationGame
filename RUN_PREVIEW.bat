@echo off
setlocal

REM ============================================================
REM Guitar-Edu-UI One-Click Preview Runner
REM - Installs deps (if needed)
REM - Builds production bundle
REM - Starts "vite preview" on 127.0.0.1:4173 in a separate window
REM - Opens your default browser when server responds
REM ============================================================

cd /d "%~dp0"

if not exist "logs" mkdir "logs"

(
  echo ============================================================
  echo [RUN_PREVIEW] Launch started: %date% %time%
  echo [RUN_PREVIEW] Working directory: %cd%
  echo [RUN_PREVIEW] Script path: %~f0
  echo ============================================================
) >> "logs\run_preview.log"

(
  echo [RUN_PREVIEW] node:
  node -v
  echo [RUN_PREVIEW] npm:
  npm -v
) >> "logs\run_preview.log" 2>&1

REM Install dependencies if needed
if not exist "node_modules" (
  echo [RUN_PREVIEW] node_modules missing - installing... >> "logs\run_preview.log"
  npm install --include=optional >> "logs\run_preview.log" 2>&1
  if errorlevel 1 (
    echo [RUN_PREVIEW] npm install failed. See logs\run_preview.log >> "logs\run_preview.log"
    echo Install failed. Open logs\run_preview.log
    pause
    exit /b 1
  )
)

REM Build production bundle
echo [RUN_PREVIEW] Building (npm run build)... >> "logs\run_preview.log"
npm run build >> "logs\run_preview.log" 2>&1
if errorlevel 1 (
  echo [RUN_PREVIEW] Build failed. See logs\run_preview.log >> "logs\run_preview.log"
  echo Build failed. Open logs\run_preview.log
  pause
  exit /b 1
)

REM Start preview server in a separate window so this script can probe and open browser
echo [RUN_PREVIEW] Starting preview server on 127.0.0.1:4173 >> "logs\run_preview.log"
start "Guitar-Edu-UI Preview Server" cmd /k call npm run preview -- --host 127.0.0.1 --port 4173

REM Wait for the preview server to respond, then open browser
set TARGET_URL=http://127.0.0.1:4173
set MAX_TRIES=30
set /a i=0
:waitloop
set /a i+=1
powershell -NoProfile -Command "try { Invoke-WebRequest -Uri %TARGET_URL% -UseBasicParsing -TimeoutSec 1 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 goto openbrowser
if %i% GEQ %MAX_TRIES% goto giveup
timeout /t 1 >nul
goto waitloop

:openbrowser
echo [RUN_PREVIEW] Preview responding. Opening %TARGET_URL% >> "logs\run_preview.log"
start "" %TARGET_URL%
echo [RUN_PREVIEW] Done. (Leave the Preview Server window running.)
exit /b 0

:giveup
echo [RUN_PREVIEW] Preview did not respond in time. Try opening %TARGET_URL% manually. >> "logs\run_preview.log"
echo Preview did not respond yet.
echo Open %TARGET_URL% in your browser, and check the "Preview Server" window for errors.
pause
exit /b 2
