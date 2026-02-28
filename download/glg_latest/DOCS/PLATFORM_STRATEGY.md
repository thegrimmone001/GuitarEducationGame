# Platform Strategy (North Star)

This project will ship from **one codebase** (the web app) to multiple distribution targets.

## Goal
Support all of the following without forking the product:

1. **Hosted Website (Web)**
2. **Offline-capable installable Web App (PWA)**
3. **Downloadable Desktop App (Windows/macOS/Linux)**
4. **Portable / USB distribution**

## Recommended Architecture

### Core Product
Keep the game as a **Vite + React web app**. Treat everything else as packaging around the same built assets.

### Distribution Targets

#### A) Web (Hosted)
- Build the static bundle and deploy to a CDN/host.
- Best for classrooms, instant updates, central analytics.

#### B) PWA (Offline-first)
- Add a service worker + asset caching + install manifest.
- Runs offline after first load.
- Strong fit for school devices, tablets, and kiosk-style play.

#### C) Desktop Wrapper (Preferred: Tauri)
- Wrap the web build in a lightweight desktop shell.
- **Tauri** is preferred (small footprint, strong security model, system WebView).
- Electron remains an alternative if we need maximum ecosystem compatibility.

#### D) USB / Pen Drive
- Recommended: **Portable desktop build** (Tauri) for Windows.
- Secondary: offline PWA packaging, but portable desktop is more deterministic for "works anywhere".

## Testing Strategy (Aligned to Shipping)

### Unit Tests (Vitest)
Remain the primary guardrail for deterministic logic:
- timeline shift-left pipeline
- commit gates / accepted-history integrity
- spelling policy truth table (strict vs enharmonic)
- TAB stacking + persistence
- ledger clipping constraints

### E2E Tests (Playwright)
E2E should run against a **built preview server** whenever possible, because it matches shipped behavior.

Preferred:
- `npm run build`
- `npm run preview -- --port 4173`
- Playwright targets `http://localhost:4173`

This approach is more stable than driving a dev server and reduces Windows/Node runtime flakiness.

### Desktop Smoke Tests
Once the desktop wrapper exists:
- run a minimal "boots and loads" smoke
- keep feature-level UI testing in Playwright against the preview build

## Dev Workflow Policy

### Supported (Canonical)
- Developers start the app via terminal:
  - `npm install`
  - `npm run dev`

### Convenience Launchers
Batch files are treated as **convenience** only. They must:
- fail loudly
- write logs
- never be the only supported path

Rationale: native optional-dependency installs (Rollup) can be non-deterministic on Windows under newer Node/npm.

## Implementation Roadmap

### Phase 1 (Now)
1. Keep current Vite/React app as the canonical runtime.
2. Shift E2E to run against `vite preview` by default.
3. Document platform strategy and testing flows.

### Phase 2 (PWA)
1. ✅ Add manifest + icons (see `public/icons/`).
2. ✅ Add service worker caching (offline-first) via `vite-plugin-pwa`.
3. ✅ Add offline-friendly persistence snapshot in IndexedDB + export/import.

#### Offline Asset Boundary (Current)
The service worker caches **the static build output** (HTML/CSS/JS + Vite assets) and public assets
needed to render the UI (SVGs, icons, fonts).

What is *not* cached:
- anything fetched from the network at runtime (future: analytics, multiplayer services)

#### Game State Persistence (Current)
We persist a single **versioned snapshot** to IndexedDB:
- settings
- leaderboards

The snapshot can be exported/imported as a JSON file for USB / air-gapped workflows.

### Phase 3 (Desktop: Tauri)
1. Add `/packages/desktop` wrapper.
2. Load production build inside Tauri.
3. Produce Windows portable build.
4. Add smoke test for wrapper boot.

## Design Implications
To ship across all targets, UI/UX should remain:
- touch-first (no hover-only interactions)
- responsive (tablet, kiosk, desktop)
- deterministic rendering (consistent across WebView engines)
- offline-friendly storage (IndexedDB + export/import)
