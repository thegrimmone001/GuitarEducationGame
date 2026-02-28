\
    @echo off
    setlocal
    echo ============================================
    echo GEDU - Internal Simulation (Smoke Tests)
    echo ============================================
    echo 1) npm install   (first time only)
    echo 2) npm run test:ci
    echo.
    npm run test:ci
    if errorlevel 1 (
      echo.
      echo FAILED: Smoke tests reported failures.
      exit /b 1
    )
    echo.
    echo OK: Smoke tests passed.
    exit /b 0
