# Canon Progress Marker (A1.xx alignment)

This file exists to prevent “context drift” across new chat threads.

## Canonical source of truth

- `Guitar_Education_Game_Comprehensive_Guide_Merged_Canon.docx` (Generated: 2026-01-07)

## Current build snapshot

- **Build package:** `guitar-edu-ui_01_28_26_172.zip`
- **Current milestone:** Representation Systems + Multi-Surface Input
- **Milestone definition (what “done” looks like):**
  - Staff behaves like printed sheet music (ledger lines, correct vertical placement, no bleed into TAB).
  - TAB renders strings + numbers (no dots) and aligns to staff by a shared timing grid.
  - When multiple answer surfaces are enabled, a submission only passes when *all enabled* answer surfaces are correct (correct to the prompt pitch; not necessarily identical string/fret between surfaces).

## Canon checklist position (high signal)

### ✅ Canon items we are treating as “already implemented”

- A1 Page layout/grid exists (header + main + footer layout).
- B1 Fret range controls: 0–24 support, presets (5/12/24), default min 1 max 12, and dimming outside range.
- C1 Accidentals buttons removed; note labels can still show A#/Bb within a single cell.
- D1 Main menu structure decisions (Single Note / Chords / Scales first; audio settings on main menu; fretboard controls grouped with instruments).

*Phase 1 UX wiring in progress: Splash selection now routes through a Start Setup gate (content/mode/root/fret range) before beginning a session.*
- D3 SAM lives in Game Mode Options (needs strict behavior definitions, but placement is correct).

### 🛠 Canon items actively in completion/bug-fix

- A2 Player cards: “timer inside card” and final card variant confirmation.
- A3 Utility: expand coverage (Chord/Scale utility, mode-specific input controls).
- B3 Fretboard hitbox alignment + an authoritative coordinate system.
- E2 Rail: “current note centered” polish (rail remains prompt-first; no implied history persistence).
- F1 Turn controls: consistent End/Start/Pause/Reset behavior + correct placement.
 - A4 Intermission phase: overlay + countdown + early-start interaction implemented; needs runtime verification.
- F2 Dev/Test mode: currently visible but lacks reliable phase simulation controls.
- G1 Token minting correctness (segment-driven tokens; multiplayer-only).
- G2 Bonus phase: trigger, visibility, and dev hooks for testing.
- I1 UI cleanup: remove stray/legacy UI artifacts.
- I2 Assets: canonical asset manifest + fallback behavior.

### ✅ Workflow tooling now in place (supporting canon verification)

- Unit tests: Vitest suite for timeline shift-left, commit gate, Mode 3 spelling policy, TAB stacking, and ledger clipping.
- E2E tests: Playwright smoke flows for Dev unlock, staff accidental commit persistence, shift-left stress, and Mode 3 strict vs enharmonic.
  - E2E now runs against **built output** via `vite preview` (port 4173) for stability.
- Windows one-click runners: `RUN_DEV.bat` and `RUN_TESTS.bat`.

### 🧩 Canon items that still require a one-page lock-in table

- C2 Display modes: priority/stacking rules for Note Names vs Numbers vs Intervals vs Roman Numeral Interval.
- D2 Difficulty matrix: Learning/Easy/Medium/Hard rule table (labels, hints, SAM, mistake handling).
- D3 SAM: strict acceptance/visibility rules per mode (Any/Best/Designated) and how it interacts with difficulty.
- E1 Rail interactivity: when the rail is input vs reference vs inspection.
- Segment definition: what counts as a unique segment across content types (notes/chords/scales/arpeggios).

## Non-negotiable rules reinforced by the canon

- If a mode presents multiple inputs (staff + TAB + fretboard, etc.), the player must answer correctly on all required inputs or it is a miss.
- Staff pitch is the authoritative pitch source; TAB and fretboard must match it.
- “Not visible” means “marks hidden,” not “surface removed.”


---

## E) Refinements, Adjustments, and Fine Tuning (meta bucket)

This section is an **added tracking bucket** to reduce repeated regressions and “treading over the same issues.”

- It **does not** replace or renumber the DOCX canon’s **E) Generator / Rail System** section.
- It is a **cross-cutting** place to log the small-but-critical UI/UX and rendering correctness fixes that tend to reappear.
- Primary backlog location remains **`CHECKLIST.md` → M) Polish**.

### E1. Rendering correctness refinements

- Staff ledger lines **never** bleed into TAB.
- TAB renders **numbers**, not dots, and numbers are clipped to TAB bounds.
- Staff noteheads, stems, and ledger lines only render inside the staff’s clip group.
- Staff + TAB remain rhythmically aligned to the shared timing grid as spacing evolves.

### E2. Surface + layer semantics refinements

- “Not visible” hides **marks**, not the entire surface section.
- Layers remain: **Display / Prompt / Marks** (visual-only filters).
- Controller-owned mark state only (no view-owned state).

### E3. Interaction + usability refinements

- Touch targets remain full-size (no “half-hit” requirements for sharp/flat split visuals).
- Hitboxes remain stable across scaling and responsive layout.
- Input eligibility gating is respected (no accidental input on non-input surfaces).

### E4. Layout + spacing refinements

- Remove legacy resizing bars; center primary gameplay surfaces.
- Staff/TAB measure count adapts to available space (default 3, fewer on narrow screens).
- Prevent overlapping bounds between staff and TAB (strict separation).

### E5. Terminology + labeling refinements

- Use stable player-facing names (e.g., Display / Prompt / Marks) while preserving internal preference keys.
- Ensure “Surface Matrix” terminology is used consistently in UI labels and docs.

### E6. Documentation + versioning refinements

- Maintain a single canonical entrypoint (`README.md`).
- Ensure every build package updates logs and the canon progress marker.


### 01_11_26_10
- Mode 3 spelling policy toggle (strict vs enharmonic).
- Staff chord stacking collision improvements (accidental placement).
- Pending staff preview rendering layer added.

### 01_12_26_01
- Phase A: Unit test harness (Vitest) + `tests/unit/` suite for shift-left, commit gate, Mode 3 spelling policy, TAB stacking, and ledger clip constraints.

### 01_12_26_03
- Phase A patch: Mode 3 spelling-policy unit tests aligned to the canonical `SlotType` enum; `test:ci` passes.

### 01_12_26_04
- Phase B: Playwright E2E harness + `tests/e2e/` suite for dev unlock, staff accidental commit persistence, shift-left stress, and Mode 3 strict vs enharmonic validation.

## 01_12_26_06 — Runner reliability patch
- RUN_DEV.bat now blocks until the dev server is reachable and opens the correct localhost port.
- Vite output is written to `devserver.log` to make launch failures diagnosable without terminal usage.


### 01_12_26_07
- Dev workflow: RUN_DEV.bat reliability patch (Windows-safe quoting + port probe after launch).

### 01_12_26_08
- Dev workflow: RUN_DEV.bat auto-repairs Windows Rollup native optional dependency issues on Node >= 23 (optional-deps install + rollup rebuild).

## 2026-01-12 — Patch 01_12_26_11
- Phase C (One-click runners): RUN_DEV/DEVSERVER_RUNNER hardened on Windows. Dev server now always writes actionable output to `logs\\devserver.log` even when startup fails.

## 2026-01-12 — Platform strategy locked
- Product distribution will target **Web + PWA + Desktop (Tauri)** from a single web codebase.
- Testing direction: E2E should prefer **built preview** behavior over dev-server-only behavior to match shipping targets.
- Reference: `DOCS/PLATFORM_STRATEGY.md`.

## 2026-01-12 — Patch 01_12_26_14
- Phase 2 (PWA): app now installs and runs offline (static caching) via `vite-plugin-pwa`.
- Phase 2 (Persistence): settings + leaderboards are mirrored into IndexedDB as a versioned snapshot.
- Dev/Test: added Export Save / Import Save controls (USB-friendly classroom carry-over).



## 01_12_26_15
- Added RUN_PREVIEW.bat (one-click build + vite preview + auto-open browser) with logging to logs/run_preview.log.

## 2026-01-13 — Patch 01_13_26_04
- Documentation: Game Menu + Surface Control System canonized in `PROJECT_NOTES.md` (no new spec files added).
- Checklist: added tasks to implement Surface Control System (Active/Display/Prompt/Mark/SAM) + Presets A–J + Start-of-session Game Menu UI.


## Locked truth tables
- Added `DOCS/LOCK_IN_TABLES.md` to lock display modes, difficulty, SAM, rail interactivity, segments, and right-click shortcut canon.

## 2026-01-25 — Phase B-2 lock (schemas + Tonal Assist + Pitch Sets)
- Locked term: **Persistence** replaces “Display” across current scheme; `display/visible/visibility` remain deprecated.
- Locked Tonal Assist model:
  - Gameplay: Misc Information Panel (home)
  - Advanced Menu: Analyze the current edited object
  - System Menu: sensitivity/scope/suggestion limits (includes Major Blues + Minor Blues candidates)
- Added schema contracts (DOCS/SCHEMAS) for:
  - Surface Controls, MatchOptions, Pitch Sets, Tonal Assist (settings + output), and Schema Registry.
- Note: These artifacts are UI-output contracts only; engine logic wiring is explicitly deferred.


## 2026-01-25 — Phase B-2 deliverable update
- Added v1.1 schema files for MatchOptions, Timers, Pitch Sets, Progressions, Tonal Assist settings.
- Added Presets A–J Definition Table v1.1 and presets_A-J_v1_1.json (surfaceControls v1.1 aligned).

- [2026-01-25] Phase B-2: schema set v1.1 added (matchOptions, timers, pitchSets, progressions, tonalAssist settings); Presets A–J table + JSON v1.1 added.
