@echo off
setlocal enabledelayedexpansion

REM Guitar-Edu-UI One-Click Test Runner (Windows)
REM - Installs dependencies if needed
REM - Ensures Playwright browsers are installed
REM - Runs unit tests (one-shot) then e2e tests (headless)

cd /d "%~dp0"

REM Tripwire: prevent running from a nested duplicate folder (common unzip mistake)
for %%I in ("%CD%") do set "CURDIRNAME=%%~nxI"
if exist "%CD%\%CURDIRNAME%\package.json" (
  echo.
  echo ERROR: Detected a nested project folder: "%CURDIRNAME%\%CURDIRNAME%".
  echo Fix: Move the inner folder contents up one level so this folder contains package.json.
  echo.
  exit /b 1
)

REM --- Logging (always-on) ---
set "LOG_DIR=%~dp0logs"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%" >nul 2>&1
set "RUNLOG=%LOG_DIR%/run_tests.log"
(
  echo ============================================================
  echo [RUN_TESTS] Launch started: %DATE% %TIME%
  echo [RUN_TESTS] Working directory: %CD%
  echo ============================================================
) >"%RUNLOG%"
echo [RUN_TESTS] Logging: %RUNLOG%

if not exist "node_modules\" (
  echo [RUN_TESTS] node_modules not found. Installing dependencies...
  echo [RUN_TESTS] Installing dependencies...>>"%RUNLOG%"
  call npm install>>"%RUNLOG%" 2>&1
  if errorlevel 1 (
    echo [RUN_TESTS] npm install failed.
    echo [RUN_TESTS] npm install failed.>>"%RUNLOG%"
    exit /b 1
  )
)

echo [RUN_TESTS] Ensuring Playwright browsers are installed...
echo [RUN_TESTS] Ensuring Playwright browsers are installed...>>"%RUNLOG%"
call npx playwright install>>"%RUNLOG%" 2>&1
if errorlevel 1 (
  echo [RUN_TESTS] Playwright install failed.
  echo [RUN_TESTS] Playwright install failed.>>"%RUNLOG%"
  exit /b 1
)

echo [RUN_TESTS] Running unit tests (vitest one-shot)...
echo [RUN_TESTS] Running unit tests (vitest one-shot)...>>"%RUNLOG%"
call npm run test:ci>>"%RUNLOG%" 2>&1
if errorlevel 1 (
  echo [RUN_TESTS] Unit tests FAILED.
  echo [RUN_TESTS] Unit tests FAILED.>>"%RUNLOG%"
  exit /b 1
)

echo [RUN_TESTS] Running e2e tests (playwright headless)...
echo [RUN_TESTS] Running e2e tests (playwright headless)...>>"%RUNLOG%"
call npm run e2e>>"%RUNLOG%" 2>&1
if errorlevel 1 (
  echo [RUN_TESTS] E2E tests FAILED.
  echo [RUN_TESTS] E2E tests FAILED.>>"%RUNLOG%"
  exit /b 1
)

echo [RUN_TESTS] ALL TESTS PASSED.
echo [RUN_TESTS] ALL TESTS PASSED.>>"%RUNLOG%"
endlocal
exit /b 0
