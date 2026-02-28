@echo off
setlocal enabledelayedexpansion

REM Dedicated dev-server runner.
REM Guarantees logging even if npm/vite crashes.

set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

set "LOG_DIR=%SCRIPT_DIR%logs"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%" >nul 2>&1
set "DEVLOG=%LOG_DIR%\devserver.log"

(
  echo ============================================================
  echo [DEV_SERVER] Runner started: %DATE% %TIME%
  echo [DEV_SERVER] Working directory: %CD%
  echo [DEV_SERVER] Node:
  node -v
  echo [DEV_SERVER] npm:
  npm -v
  echo ============================================================
  echo [DEV_SERVER] Starting: npm run dev
  echo ============================================================
) >> "%DEVLOG%" 2>&1

echo [DEV_SERVER] Logging to: %DEVLOG%
echo [DEV_SERVER] Starting Vite dev server...

REM Run and append all output to dev log.
call npm run dev >> "%DEVLOG%" 2>&1
set "EXITCODE=%ERRORLEVEL%"

echo ============================================================ >> "%DEVLOG%"
echo [DEV_SERVER] Dev server exited with code: !EXITCODE! >> "%DEVLOG%"
echo ============================================================ >> "%DEVLOG%"

echo [DEV_SERVER] Dev server exited with code: !EXITCODE!
echo [DEV_SERVER] See log: %DEVLOG%
pause

endlocal
