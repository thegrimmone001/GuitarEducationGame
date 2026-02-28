# Guitar Education Game UI (`guitar-edu-ui`)

Browser-based, smartboard-friendly guitar education game UI built with **TypeScript + Vite**.

This repo is structured so the interaction contract between **surfaces** (Rail / Fretboard / Staff / TAB) and the **controller rules** stays deterministic as new modes and learning systems are added.

---

## Quick start

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Testing:

- See `TESTING.md`

---

## Canon docs (read these first)

When starting a new work session (or a new chat thread), treat these as the **project’s written law**:

1. **`DECISIONS_LOG.md`** — architectural invariants (do-not-regress rules)
2. **`CHANGELOG.md`** — canon zip-to-zip deltas
3. **`BUILD_LOG.md`** — intent of each packaged milestone
4. **`CHECKLIST.md`** — current backlog and validation targets
5. **`PROJECT_NOTES.md`** and **`/DOCS/*`** — supplemental notes
6. **`CANON_PROGRESS.md`** — A1.xx crosswalk + current-position marker (incl. **E) Refinements** meta bucket)

---

## Thread Boot Protocol (required)

Every time work begins (especially in a new chat thread), do this before implementing changes:

1. Identify the active build ID (e.g., `01_10_26_19`).
2. Read: `DECISIONS_LOG.md` → `CHANGELOG.md` → `BUILD_LOG.md` → `CHECKLIST.md`.
2a. Read: `CANON_PROGRESS.md` (crosswalk + current position + **E) Refinements** regression traps).
3. Produce a 1-page **Alignment Snapshot**:
   - Locked invariants
   - Current trajectory
   - Next 1–3 tasks only
   - Known regression traps
4. Implement + package.

This prevents drift across threads and keeps the system aligned to the documented spec.

---

## Core concepts

### Surfaces
The UI is built around four “answer surfaces”:

- **Rail** — note strip / rail
- **Fretboard** — interactive fretboard overlay
- **Staff** — treble staff (noteheads / ledger)
- **TAB** — tablature numbers

Surfaces are always present in layout. “Not visible” never means removed.

### Surface Input Matrix (controller authority)
The **Surface Input Matrix** deterministically defines, per UI mode, which surfaces are:

- **required** for a valid answer
- **eligible** to accept input
- **permitted** to show placed marks

This replaced the older “View Layout” concept.

Primary implementation: `src/app/gameController.ts`.

### Surface Layers (visual filters only)
User-facing layer toggles are **Display / Prompt / Marks**.

- **Display**: reference presentation of the surface
- **Prompt**: asked/target cues
- **Marks**: player placed/confirmed marks

Rule: layers are **visual-only**. They hide rendered content but never remove the section.

Compatibility note: internal preference keys remain `pref.layers.view|asked|answered`.

---

## Staff + TAB: rendered template rule

Staff+TAB is treated as a **static rendered template** (background). Interaction is implemented via an overlay.

Rules:

- Do **not** assume the background is “clean SVG notation.”
- Overlay geometry must be derivable even if the background later becomes a raster.
- Normalize staff mapping to the **core 5 lines** (treble staff) even if the template includes more lines.
- Measures/columns must be derived robustly (not dependent on barlines being present as primitives).

Primary implementation: `src/shell/staffTabOverlay.ts`.

Important SVG group IDs (used by controller and visibility/layer gating):

- `#geduStaffMarks`
- `#geduTabNumbers`

---

## Key DOM mounts

Created in `src/ui/layout.ts`:

- `#staffTabStage`
  - `#staffBgHost` (background host)
  - `#staffOverlaySvg` (interaction overlay)
- `#fretStage`
  - `#fretBgHost`
  - `#fretOverlaySvg`
- `#noteStrip-rail` (rail mount)

If these IDs change, update the controller wiring (do not “guess and hope”).

---

## Repo map

- `src/app/gameController.ts` — orchestration, Surface Matrix gating, composite submission
- `src/shell/staffTabOverlay.ts` — staff/tab overlay layout + hit testing + mark rendering
- `src/shell/fretboardOverlay.ts` — fretboard overlay + hit testing
- `src/shell/rail.ts` — rail rendering + layer controls
- `src/ui/layout.ts` — UI DOM layout + settings menu construction
- `src/shell/storage.ts` — local persistence

---

## Packaging rules (zips)

When creating a milestone zip (e.g., `01_10_26_19`):

- **Do not include** `node_modules/` or `dist/`.
- **Hard-ban:** the zip must be **flat** (no single top-level root folder).
  - This prevents Windows extraction from creating a redundant nested folder like:
    `...\guitar-edu-ui_YY_MM_DD_NN\guitar-edu-ui_YY_MM_DD_NN\...`
  - Best practice: create an empty folder named `guitar-edu-ui_YY_MM_DD_NN` and extract the zip into it.
- Update:
  - `BUILD_LOG.md`
  - `CHANGELOG.md`
  - `DECISIONS_LOG.md` (only when architectural invariants change)

---

## Current build

See `BUILD_LOG.md` for the active packaged milestone and intent.
