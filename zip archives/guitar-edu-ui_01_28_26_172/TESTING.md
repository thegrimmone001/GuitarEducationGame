# Testing (Vitest + Playwright)

This repo supports two complementary test layers:

- **Unit tests (Vitest)**: fast logic regression checks (timeline, commit gate, spelling policy, tab stacking, clip constraints).
- **E2E tests (Playwright)**: minimal but real browser flows (dev unlock, staff accidental prompt, shift-left, Mode 3 policy).

> Note: Playwright requires a one-time browser download.

## One-click (Windows)

From the repo root, double-click:

- **RUN_DEV.bat** — installs deps if needed, starts the dev server, opens your browser.
- **RUN_TESTS.bat** — installs deps if needed, ensures Playwright browsers are installed, then runs:
  1) `npm run test:ci` (unit)
  2) `npm run e2e` (headless)

## Install

```bash
npm install
```

One-time Playwright browser install:

```bash
npx playwright install
```

## Unit tests (Vitest)

Watch mode:

```bash
npm run test
```

One-shot (CI style):

```bash
npm run test:ci
```

## E2E tests (Playwright)

E2E runs against **built output** via `vite preview` on **port 4173** (shipping-aligned and more stable than dev-server E2E).

Headless:

```bash
npm run e2e
```

Interactive UI runner:

```bash
npm run e2e:ui
```

Optional override:

```bash
set E2E_BASE_URL=http://127.0.0.1:4173
```

### What E2E covers

- Dev/Test unlock:
  - 5-click build badge unlock
  - Ctrl+Shift+D unlock
  - footer **DEV** opens Dev/Test panel
- Staff accidental prompt + commit persists
- Fill + shift-left stress keeps STAFF/TAB marks visible
- Mode 3 spelling policy strict vs enharmonic verification

## Logs

If a one-click runner does not open the browser, or tests fail without a clear message, check `./logs/`:

- `logs/run_dev.log` — what `RUN_DEV.bat` did and where it failed.
- `logs/devserver.log` — full Vite/dev-server output (stack traces, missing deps, etc.).
- `logs/run_tests.log` — full output for `RUN_TESTS.bat`.
