> **Note (stability audit):** The legacy lowercase `/docs` folder has been removed. Any historic references to `docs/*` paths in this changelog refer to artifacts that no longer exist and should be treated as archival history only.

## Build: guitar-edu-ui_01_28_26_172

- Phase L (Teacher Workflows) foundation:
  - Added `src/shell/assignmentTypes.ts` (AssignmentDefinition, AssignmentBundle v1, AssignmentResultPacket v1).
  - Added `src/shell/assignmentStorage.ts` (offline local storage + checksum validation + bundle import helpers).
  - Added `DOCS/PHASE_L_TEACHER_WORKFLOWS.md` (workflow/UI surface guidance; no layout commitments).

## Build: guitar-edu-ui_01_26_26_162

- Start Menu: added **Initialization** panels for Single Player → **Challenge** and Multiplayer flows.
- Start Menu: Initialization panels pre-seed Match Options via `window.__GEDU_DRAFT_MATCH_OPTIONS__` (UI-only).
- Start Menu: renamed Single Player menu item “Game” → **Challenge**.

## Build: guitar-edu-ui_01_25_26_147

- Docs: Locked Advanced Menu layout spec v10 (no scrolling; overlay wings; stable layout).
- Docs: Added Phase B-2 Schema Registry v1.1 addendum (Pitch Sets, Progressions, Tonal Assist, timers + runtime caps).
- Lexicon: Added `pitch framework` to `DOCS/DEPRECATED_TERMS.md` (replaced by Pitch Sets).

## Build: guitar-edu-ui_01_16_26_88

## Build: guitar-edu-ui_01_16_26_94

- Multiplayer Start Menu: Added a player roster panel with editable player names, visible count, and add/remove controls.
- Engine init: Multiplayer `players[]` now uses `window.__GEDU_PLAYER_NAMES__` when present (falls back to P1...Pn).

- Match correctness: When STAFF is required alongside TAB and/or Fretboard, enforce **exact pitch** alignment across surfaces (not just pitch-class). Staff pitch is treated as treble-clef absolute pitch and must equal the TAB/Fret absolute pitch.
- Music: Added `pitchMidiAt()` helper for standard-tuning absolute pitch comparisons.

## Build: guitar-edu-ui_01_15_26_02

- Fix: Ensure Canvas2D surfaces (fretboard + staff/tab) repaint deterministically on each `renderAll()` pass so they do not remain blank after splash/visibility transitions.
- Docs: Removed legacy Task Board tracking (CHECKLIST.md remains the only completion gate).

## Build: guitar-edu-ui_01_13_26_20

- Docs: Added a task-ID gap policy and ledger.
  - Added `DOCS/RETIRED_TASK_IDS.md` (currently records all undefined IDs as **Unassigned**).
  - Linked the ledger from `CHECKLIST.md`.
- Docs: Updated `CANON_PROGRESS.md` build package reference to `guitar-edu-ui_01_13_26_19.zip`.

## Build: guitar-edu-ui_01_13_26_19

- Docs: Reconciled `MATCH_SETTINGS_SPEC.md` with `DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md`.
  - Added **Arpeggios** to Learning Type.
  - Canonized **Input Method** as a match setting (interaction granularity only).
  - Expanded **Domain Constraints** in spec (string range, span, notes-per-string, position scope).
  - Expanded **Timing Rules** to include disabled state + time bank/intermission/increments/penalties/runtime cap.
  - Canonized **Randomization** rules (opt-in; embedded; no global toggle).
  - Placed **Failure Conditions**, **Bonus Phase**, and **Roman Numeral Interval System** in Advanced Match Options mapping.

## Build: guitar-edu-ui_01_13_26_03

- Lexicon: Removed the deprecated "combined" label from `ModeId` (kept the legacy internal value for backward compatibility).
- Note Rail: Default layer state now treats the rail as a **prompt-first** surface (`asked` ON, `answered` OFF by default). This avoids implying rail history persistence while keeping the prompt highlight active.

## Build: guitar-edu-ui_01_13_26_05

- Docs: Added `DOCS/DEPRECATED_TERMS.md` to enumerate obsolete terms and disallowed regressions (no numbered “modes”, no “combined mode”, no treating asked/answered/view as rules).
- Docs: Added `MATCH_SETTINGS_SPEC.md` into the archive and expanded match settings details for learning structures, timing, accuracy, failure, and bonus requirements.

## Build: guitar-edu-ui_01_13_26_01

- Splash: Selecting a session now opens a **Start Setup** gate (content/mode/root/fret range) instead of immediately starting a match.
- Start Setup: Applies selections into the existing canonical settings controls and then dispatches `gedu:beginSession`.
- Compatibility: `gedu:splashSelect` is still supported in the controller for older builds.

## Build: guitar-edu-ui_01_12_26_14

- Platform: Added **PWA** support (manifest + service worker) via `vite-plugin-pwa`.
- Offline: Defined current offline asset boundary (static build + required public assets) in `DOCS/PLATFORM_STRATEGY.md`.
- Persistence: Added IndexedDB snapshot (settings + leaderboards) with **Export Save / Import Save** tools in Dev/Test panel.
- Bootstrap: App hydrates local state from IndexedDB on load (without breaking existing localStorage keys).

## Build: guitar-edu-ui_01_12_26_13

- E2E: Playwright now runs against **built output** via `vite preview` on **port 4173** (shipping-aligned; reduces Windows/Node optional-dep flakiness).
- E2E: Added `start-server-and-test` and updated `npm run e2e` / `npm run e2e:ui` to: `build -> preview -> playwright`.
- Docs: Updated `TESTING.md` to document preview-based E2E behavior and baseURL override.

## Build: guitar-edu-ui_01_12_26_12

- Docs: Added `DOCS/PLATFORM_STRATEGY.md` defining the shipping architecture: **Web + PWA + Desktop (Tauri)** from one codebase.
- Docs: Recorded the decision in `DECISIONS_LOG.md` and progress notes in `CANON_PROGRESS.md`.

## Build: guitar-edu-ui_01_12_26_11

- Hotfix: Windows one-click dev runner now guarantees `npm run dev` executes and logs output (removed fragile PowerShell Tee-Object invocation; runner uses direct `call npm run dev >> logs\devserver.log`).
- Hotfix: RUN_DEV logging block repaired and paths normalized (backslashes).

## Build: guitar-edu-ui_01_12_26_10

- Fixed `RUN_DEV.bat` dev-server launch on Windows by removing fragile nested-quote `start ... cmd /k "..."` invocation.
- Added `DEVSERVER_RUNNER.bat` to run `npm run dev` in the Dev Server window while teeing output into `logs/devserver.log`.
- `RUN_DEV.bat` now launches the runner directly and logs the step to `logs/run_dev.log`.

## Build: guitar-edu-ui_01_12_26_09

- One-click runners now write always-on logs to `./logs/`:
  - `run_dev.log`, `devserver.log`, `run_tests.log`
- `RUN_DEV.bat` port-probe made silent to avoid noisy console output.


## Build: guitar-edu-ui_01_11_26_10

- Mode 3: added explicit STAFF spelling policy toggle (Strict vs Allow Enharmonic).
- Staff overlay: improved chord accidental positioning to avoid collisions with clustered noteheads.
- Staff overlay: pending STAFF marks now render (preview-only) with lighter styling.

## Build: guitar-edu-ui_01_11_26_13

- Dev/Test access hardened: footer **DEV** button appears when unlocked and opens Dev/Test pane.
- TAB persistence bug fix: incomplete TAB entries (null fret) are never committed into accepted history.
- Increased first-measure playable inset to prevent early-slot note collisions with clef / TAB label.

## Build: guitar-edu-ui_01_12_26_01

### Phase A — Unit Tests (Vitest)

- Added Vitest unit test harness (`vitest.config.ts`) and `tests/unit/` suite.
- Timeline shift-left correctness: accepted + pending maps shift together; oldest drops; cursor behavior validated.
- Commit gate: accepted history only mutates on successful composite acceptance; pending never leaks into accepted.
- Mode 3 spelling policy truth table tests (Strict vs Enharmonic).
- TAB stacking tests: multi-string slots persist and shift correctly.
- Ledger preview constraint test: clip groups exist so staff/ledger visuals cannot bleed into TAB.

### Developer workflow

- Added `npm run test` (watch) and `npm run test:ci` (one-shot).

## Build: guitar-edu-ui_01_12_26_03

- Fixed unit test harness enum usage so Mode 3 spelling tests run against the same `SlotType` enum used by runtime logic.
- Result: `npm run test:ci` passes cleanly (9/9 tests).

## Build: guitar-edu-ui_01_12_26_04

### Phase B — E2E Tests (Playwright)

- Added Playwright E2E harness (`playwright.config.ts`) and `tests/e2e/` suite.
- E2E coverage:
  - Dev unlock: 5-click build badge **and** Ctrl+Shift+D; footer DEV opens Dev/Test panel.

## Build: guitar-edu-ui_01_12_26_05

### Phase C — One-Click Runner (Windows)

- Added **RUN_DEV.bat** at repo root:
  - installs dependencies if needed
  - starts the dev server
  - opens the app in the default browser (Vite default: `http://localhost:5173`)
- Added **RUN_TESTS.bat** at repo root:
  - installs dependencies if needed
  - ensures Playwright browsers are installed
  - runs `npm run test:ci` then `npm run e2e` (headless)
- Updated `TESTING.md` to document the one-click workflow.
  - RUN_DEV and RUN_TESTS usage notes.

# Changelog

Canon zip-to-zip changes for the Guitar Education Game UI.

## 2026-01-11 — Patch 01_11_26_09
- Phase 3 correctness (Mode 3 triangle) on top of accepted-marks persistence:
  - STAFF is authoritative when required: staff letter + chosen accidental must match prompt pitch and spelling (black-key sharp/flat strict; white keys natural).
  - When TAB + FRET are both required, enforce exact string+fret match (TAB authoritative for position).
  - Commit pipeline hardened: snapshot pending staff/tab marks before reducer effects can clear previews; commit snapshot only after successful composite validation.
## 2026-01-11 — Patch 01_11_26_05
- Removed all remaining **Pause** references (legacy controller + leaderboard comment).
  - Internal interaction gating is now referred to as **freeze** (used only for Ready/Engage and safe transitions).
- Enforced A-contract: **Staff/TAB remain spatially static** (removed UI-mode viewBox crop/zoom behavior).
- Extended **Surface Layers** (Display / Prompt / Marks) to all three domains:
  - Staff/TAB: Display toggles the notation grid, Prompt toggles hover/selection, Marks toggles accepted marks visibility.
  - Fretboard: Marks toggles claimed dots, Display toggles learning labels, Prompt toggles SAM/pulse overlays.


## 2026-01-10 — Patch 01_10_26_16
- Fixed a phase constant mismatch that disabled input gating (`in_match` vs `IN_MATCH`).
- Implemented a **Surface Input Matrix** to define, per UI mode, which surfaces are required, accept input, and show placed marks.
- Added composite submission logic so **Staff drives pitch**, and (when required) **Fret + Tab must match** the same string/fret.
- Implemented TAB entry ordering: **string → fret** or **fret → string**, including retaining the selected TAB column.
- Fixed TAB default number handling to avoid null/default rendering issues.
- Cleaned up Staff+Tab overlay mark visibility toggling per UI mode.

## 2026-01-10 — Patch 01_10_26_17
- Aligned the Staff+Tab stage container id (`staffTabStage`) with the controller so surface-matrix gating applies reliably.
- Added **Surface Layers** checkboxes (**View / Asked / Answered**) and wired them into gameplay mark visibility (visual only; surfaces remain present).
- Added `rail.setLayers()` with view-layer label hiding and asked-layer target highlighting control.

## 2026-01-10 — Patch 01_10_26_18
- Renamed Surface Layers UI labels to **Display / Prompt / Marks** (was **View / Asked / Answered**) without changing underlying preference keys.

## 2026-01-10 — Patch 01_10_26_19
- Staff+TAB overlay: fixed geometry extraction for the 3-measure blank staff/TAB template.
  - Normalize STAFF to the core **5 lines** (for correct treble-line letter mapping).
  - Derive measure spans from repeated long line segments (robust even with shortened left-most measure lines for clef/TAB label).
  - Stabilizes column math and prevents TAB number placement from collapsing into a tiny segment.
  - Added a safe fallback `getBlank3MeasureStaffTabLayout()` so the overlay can stay correct even if the background is swapped to a raster asset (no SVG line primitives).

## 2026-01-10 — Patch 01_10_26_20
- Added root **`README.md`** as the canonical repo entrypoint.
- Documented the required **Thread Boot Protocol** and canon-doc read order to prevent cross-thread drift.
- Added **`CANON_PROGRESS.md`** to pin “where we are in the canon list” (A1.xx alignment crosswalk) and keep progress visible in the repo.

## 2026-01-10 — Patch 01_10_26_22
- Added a meta backlog bucket: **E) Refinements, Adjustments, and Fine Tuning** in `CANON_PROGRESS.md` to track recurring rendering/UX polish items and prevent regressions.
- Updated `README.md` to include `CANON_PROGRESS.md` in the canon-doc read order and highlight the Refinements bucket during Thread Boot.

## 2026-01-10 — Patch 01_10_26_23
- Added a multiplayer **Intermission overlay** that visibly represents the `INTERMISSION` phase between turns.
- Overlay includes a countdown timer and supports **tap/button to start the next turn early**.
- Turn start now explicitly clears intermission UI/timers to prevent stuck overlay states.

## 2026-01-10 — Patch 01_10_26_24
- Fixed missing TURN countdown: the engine now emits `TURN_STARTED` so the controller starts the turn timer reliably.
- Intermission countdown: default increased to **5 seconds** and countdown formatting now avoids displaying `00:00` while time remains.
- Surface Matrix: Mode 3 (TAB) now requires the player to also select the matching **Fretboard** position before submission.
- Staff/TAB hover feedback: replaced full-column shading with a thin alignment line and a local hover box to reduce “marking the whole staff” confusion.

## 2026-01-11 — Patch 01_10_26_25
- **Mode 3 composite correctness:** TAB + FRET no longer require the *same string/fret*; instead, each required answer surface must match the **prompt pitch** (staff-driven when staff is required).
  - Prevents false mismatches when multiple correct positions exist for the same note.
  - Ensures TAB-only or FRET-only entry can’t “override” the other; both required surfaces must be correct before submission.
- Composite submission now uses the **most recently updated answer surface** (TAB vs FRET) when dispatching to the engine.
- Added a lightweight **pending fretboard selection ring** during composite entry to reduce “no answer registered” confusion.

## 2026-01-11 — Patch 01_10_26_26
- **TAB entry no longer auto-stamps `0`:** if a TAB slot is clicked without a chosen fret, the overlay shows a **pending slot** (outline) and waits for an explicit fret number.
- TAB keypad selection and "selected" highlight now stay in sync even if the selection is set indirectly.
- Turn/prompt resets now clear TAB keypad state cleanly (prevents stale-number carryover between prompts).

## 2026-01-11 — Patch 01_11_26_02
- **Pause removed entirely:** removed the Pause button and pause event handling (no user-facing pause control).
- Added a **Ready/Engage overlay** so Turn 1 does not start immediately after starting a match.
  - Engage starts the match clock and starts the appropriate timer behavior.
- **Timer settings are now stored in seconds** (`turnSec`, `intermissionSec`) and converted to milliseconds only when scheduling.
- Single-player timer display is now a **stopwatch** (time-to-complete) by default.
- Added `THREAD_HANDOFF.md` and updated `CANON_PROGRESS.md` build package marker.

## 2026-01-11 — Patch 01_11_26_04
- **Staff/TAB timeline persistence (foundation):** STAFF/TAB marks are no longer cleared on each turn.
  - Marks persist as a running record until the visible area fills.
  - When full, the timeline scrolls left by one 8th-note slot (spatially static; no viewBox changes).
- **Default notation grid is now 4/4 in 8th-note slots:** `columnsPerMeasure = 8`.
- STAFF marks now support **multiple noteheads per rhythmic slot** (fan-out for legibility).
- STAFF/TAB horizontal placement during match uses a **timeline cursor** rather than click-x position.

## 2026-01-11 — Patch 01_11_26_06
- **Mode 3 correctness tightened (TAB ↔ FRET alignment):** when UI Mode is `m3` (TAB mode), the required fretboard pick must match the TAB selection **exactly** (same string + same fret), not just the pitch class.
  - Uses the existing accepted-marks pipeline: accepted TAB entries persist in the timeline; failed composite attempts clear only the transient slot.

## 2026-01-11 — Patch 01_11_26_07
- **Phase 1.1: Timeline persistence stress tools:** added Dev/Test buttons to auto-fill the STAFF/TAB window and simulate shift-left beyond capacity.
- **Phase 1.2: Stacking rules:** TAB now supports **multiple strings per rhythmic slot** (chord-style tablature). Rendering remains spatially static and subdivision-aligned.

## 2026-01-11 — Patch 01_11_26_08
- **Accepted-marks persistence pipeline implemented:** STAFF/TAB clicks now create **pending (preview) marks** that do *not* become part of the persistent record until the composite answer is accepted.
  - Pending previews render in separate overlay layers (`geduStaffPending`, `geduTabPending`) and obey the **Asked** checkbox layer.
  - On accepted composite submission, pending marks for the active slot are committed to the persistent record, then the timeline cursor advances.
  - On prompt/turn change or failed attempt, pending previews are cleared while accepted history remains.
- **Shift-left pipeline extended:** when the visible STAFF/TAB area is full, shift-left now also reindexes any pending previews safely.

## 2026-01-11 — Patch 01_11_26_11
- **Ledger-line preview + dense-range rules:**
  - STAFF ledger lines are now **union-rendered per rhythmic slot** (no double-drawing when multiple chord tones share the same ledger positions).
  - Pending STAFF marks now include ledger-line preview when above/below the 5-line staff.
  - Hovering a STAFF cell now shows **ledger-line preview** for that placement (clipped to the STAFF region).
- **Dev/Test: Mode 3 matrix verification:** added buttons in Dev/Test to run a deterministic Mode 3 truth-table report for **Strict** vs **Enharmonic** spelling policies.

## 2026-01-11 — Patch 01_11_26_12
- **Dev/Test access restored (failsafe unlock):** added a clickable build badge in the footer. Click **5x** (or press **Ctrl+Shift+D**) to unlock Dev/Test tools even if menus regress.
- **Notation lead-in spacing:** the first measure now reserves a lead-in region so the first rhythmic slot does not collide with the treble clef / "TAB" label.
  - Implemented as a constant inset on measure 1's playable x-range (STAFF/TAB remain spatially static; no viewBox cropping).

## Build: guitar-edu-ui_01_12_26_02

- Unit tests: fixed SlotType import path so Mode 3 spelling policy tests run correctly.

## Build: guitar-edu-ui_01_12_26_03

- Mode 3 Strict spelling: enforce **naturals on white keys** (both prompt spelling and STAFF entry must be NAT).
- Fix: eliminate undefined-branch crash surfaced by unit tests (SlotType.NAT access).



## Build: guitar-edu-ui_01_12_26_04

- Phase B: added Playwright E2E harness and minimal real E2E coverage (Dev unlock, staff accidental commit, shift-left stress, Mode 3 strict/enharmonic).

## Build: guitar-edu-ui_01_12_26_05

- Phase C: added one-click Windows runners (RUN_DEV.bat, RUN_TESTS.bat).

## Build: guitar-edu-ui_01_12_26_06

- Patch: RUN_DEV.bat now waits for the dev server to become reachable and opens the first responding localhost port (5173–5180).
- Patch: RUN_DEV.bat logs Vite output to devserver.log for diagnostics.

## Build: guitar-edu-ui_01_12_26_07

- Patch: RUN_DEV.bat now anchors to its own folder, fully quotes paths, and starts Vite without fragile output redirection.
- Patch: Browser auto-open probes ports 5173–5180 after launching the dev server (more reliable on Windows).

## Build: guitar-edu-ui_01_12_26_08

- Patch: RUN_DEV.bat detects Node major version and, on Node >= 23, automatically uses an optional-dependency install flow and performs a Rollup load sanity check.
- Patch: If Rollup native deps are missing on Windows (common optional-deps issue), RUN_DEV.bat runs an automated repair (clean install with `--include=optional` + `npm rebuild rollup`).


## 01_12_26_15
- Added RUN_PREVIEW.bat (one-click build + vite preview + auto-open browser) with logging to logs/run_preview.log.

## Build: guitar-edu-ui_01_13_26_02

- Phase 1: STAFF chord stacking enabled within a single timeline slot.
  - STAFF clicks no longer clear other pending marks in the same column.
  - Clicking the same STAFF step again toggles that note off (keeps single-note entry simple while enabling chords).
  - Accidental prompt commit respects chord stacking (does not clear other pending marks).

### 01_14_26_01 (2026-01-14)
- Menu readiness patch for testing (see BUILD_LOG).

### 01_14_26_02 (2026-01-14)
- Match Options: implemented hard split between **Basic Match Settings** (always visible) and **Advanced Match Settings** (collapsed).
- Added context gating: Input Method only available for Chords/Scales/Arpeggios; Learning Target Constraints panes switch by target.
- Surface Controls: Active remains implicit (no checkbox).

### 01_14_26_04 — Canon + docs lock-in
- Docs: Added `DOCS/LOCK_IN_TABLES.md` (display modes, difficulty, SAM, rail interactivity, segment definition, right-click shortcut stub).
- Checklist: Added `GEG-116` Right-click Answer Shortcut Menu.
- Docs: Noted right-click shortcut in UI mapping docs.

## 01_14_26_07 (2026-01-14)
- Migrated primary visual rendering to Canvas2D fallback layers for Staff+TAB and Fretboard (SVG remains optional for overlays/markers).
- Added #staffCanvas and #fretCanvas layers to restore deterministic visuals even when SVG assets fail.

## 01_14_26_10
- Canvas Staff+TAB background now matches the previously working SVG template by drawing the SVG into Canvas2D.
- Prevents visual regression where Canvas replaced a near-final staff/tab layout.

## 01_14_26_11
- Fix: Canvas render lifecycle now waits for the main UI to become visible before first draw (prevents 1×1 hidden initialization).
- Fix: Added element-level resize repaint via ResizeObserver so flex/layout settles trigger a redraw without requiring a window resize.
- Result: Staff+TAB and Fretboard canvases no longer white-out or remain blank after leaving the launch menu.


## 01_14_26_12
- Fix: Single-player Engage now dispatches START_TURN so prompts generate.
- Fix: Note rail renders in pre-match (non-edu) state.
- Fix: Fretboard canvas string thickness orientation (low strings bottom).

## 01_14_26_13
- Add: Event Log overlay (footer LOG button) that records UI events (`gedu:*`) and engine actions for troubleshooting.

## 01_14_26_14
- Fix: Added backwards-compat handler for `gedu:enterUI` so session start is triggered when the launch menu emits intent-based navigation.
- Result: Engine actions now dispatch on session entry (INIT_MATCH / START_TURN) and appear in the Event Log.

## 01_14_26_15
- Fix: Deterministic session-start wiring for `gedu:enterUI` (listen on both window and document).
- Add: Event Log now shows session start signals (`ENTER_UI`, `BEGIN_MATCH`, `INIT_MATCH`) for troubleshooting.

## 01_14_26_16
- Fix: Initialize controller wiring before IndexedDB hydration so `gedu:enterUI` and other early UI events cannot be missed.

## 2026-01-15 - Snapshot 01_15_26_03
- Added "Copy" action to the Event Log overlay for one-click capture.
- Fixed initialization ordering in game controller to prevent note rail render from failing due to temporal-dead-zone access.

## 2026-01-15 - Snapshot 01_15_26_04
- Prevented accidental double-boot that could register duplicate listeners and duplicate UI events.
- De-duplicated `gedu:matchOptions` logging to emit only when the payload actually changes.
- Updated Build badge to use BUILD_ID so snapshots report correct build in UI.

## 2026-01-15 - Snapshot 01_15_26_05
- Fixed boot guard implementation that broke module imports and prevented the app from loading.
- Fixed build badge rendering to correctly display the current BUILD_ID.


## 2026-01-15 - Snapshot 01_15_26_06
- Added query-driven smoke test () that asserts critical UI mounts and emits  with PASS/FAIL payload.
- Refactored boot to a single  function under a safe double-init guard (no import/module hazards).
- Build badge now reflects BUILD_ID 01_15_26_06.

## 2026-01-15 - Snapshot 01_15_26_06
- Added query-driven smoke test (?smoke=1) that asserts critical UI mounts and emits gedu:smokeTest with PASS/FAIL payload.
- Refactored boot to a single boot() function under a safe double-init guard (no import/module hazards).
- Build badge now reflects BUILD_ID 01_15_26_06.

## 2026-01-15 - Snapshot 01_15_26_07
- Enforced core surface mount contract: fretboard and note rail sections are never removed from layout; they are visually suppressed instead.
- Added `.isSuppressed` styling for non-active surface sections.

## 2026-01-15 - Snapshot 01_15_26_08
- Added a Prompt banner above the note rail (id: promptText) and wired it to the controller’s existing prompt updates.
- Expanded smoke test assertions to include promptText + Task Context panel.

## 2026-01-15 - Snapshot 01_15_26_09
- Engine: selects a fresh actionable prompt at the start of each turn (restores random prompt generator behavior).
- Event Log: added Download button to export logs as a timestamped .txt (includes BUILD_ID).
- SmokeTest: now asserts Event Log Download button exists.

## 2026-01-15 - Snapshot 01_15_26_10
- Task Context panel now explicitly shows Learning Target and keeps Pitch Framework/Prompt synchronized.
- SmokeTest expanded to assert Task Context rows are present.

## 2026-01-15 - Snapshot 01_15_26_11
- Task Context: added Active Surfaces and Required Inputs rows.
- Controller: fixed Task Context updater (removed duplicate/invalid block) and now derives surfaces from match options + engine mode.
- SmokeTest: now asserts ctx-activeSurfaces and ctx-requiredSurfaces exist.

## 2026-01-15 - Snapshot 01_15_26_12
- Controller: added explicit input gating for Fretboard and Staff picks using getSurfaceMatrix().
  Disabled surfaces now show a clear alert and do not submit/mark actions.

## 2026-01-15 - Snapshot 01_15_26_13
- Reporting: Event Log Download now exports a full Report Pack (Build ID, URL, last matchOptions, last engine settings, and the event log).
- Controller: stores last matchOptions and last engine settings on window for deterministic report capture.

## 2026-01-15 - Snapshot 01_15_26_14
- Added docs/CHECKLIST_MASTER.md as the single execution checklist for hands-off iteration.
- Updated THREAD_BOOT_PROTOCOL with Smoke mode + Report Pack steps.

## 2026-01-15 - Snapshot 01_15_26_15
- Composite validation: submission now only uses required answer surfaces (tab/fret) when selecting the pitch action to dispatch.
  Optional surfaces can be active for display/record without causing phantom fails.

## 2026-01-15 - Snapshot 01_15_26_15
- Validation: required surface matrix now uses engine truth (modeId + notation.view) while in-match, eliminating phantom required surfaces.
- Checklist: marked required-surface validation item as DONE.

## 2026-01-15 - Snapshot 01_15_26_16
- Rendering: added surface clipping for staff/tab sections to prevent bleed into adjacent areas.
- Styling: increased staff/tab canvas contrast for visibility.
- SmokeTest: now asserts staffSection/tabSection mounts.

## 2026-01-15 - Snapshot 01_15_26_17
- Note Rail: added .prompt highlight, asked-history dimming, and railExhausted state when allowed set is exhausted.
- Controller: tracks asked pitch classes via prompt progression.
- SmokeTest: asserts rail has 25 tiles and includes a .prompt tile.

## 2026-01-15 - Snapshot 01_15_26_18
- Match Options: emissions are now coalesced and de-duplicated (prevents multiple identical gedu:matchOptions events during init and rapid sync bursts).

## 2026-01-15 - Snapshot 01_15_26_19
- Stability: added fatal boot error boundary and global error/unhandledrejection capture to avoid blank-page failures during browser load.

## 2026-01-15 - Snapshot 01_15_26_20
- Stability: fatal boot overlay now includes Copy and Download buttons for error capture.

## 2026-01-15 - Snapshot 01_15_26_21
- Automation: added RUN_DEV.bat, RUN_SMOKE.bat, RUN_CHECKS.bat for streamlined iteration.
- Tooling: added npm scripts `typecheck` and `check`.
- Docs: added QUICKSTART_HANDSOFF.md.

## 2026-01-15 - Snapshot 01_15_26_22
- Event Log: added Copy and Download controls for fast capture of events.

## 2026-01-15 - Snapshot 01_15_26_23
- Stability: added idempotent init guards to prevent duplicate listeners/renderers when modules re-evaluate (HMR/double-load).

## 2026-01-15 - Snapshot 01_15_26_24
- Recovery: added one-shot reset flow via `?reset=1` and an Event Log 'Reset app' button.

## 2026-01-15 - Snapshot 01_15_26_25
- Navigation: wired `gedu:exitRequested` to stop timers, clear match state, and return to Start Menu via `gedu:exitToMenu`.

## 2026-01-15 - Snapshot 01_15_26_26
- Reporting: Event Log Download now exports a full Report Pack (Build ID, URL, last matchOptions, last engine settings, full log).

## 2026-01-15 - Snapshot 01_15_26_27
- Recovery: reset now clears a broader set of GEDU-related localStorage keys; Event Log reset prompts confirmation.

## 2026-01-15 - Snapshot 01_15_26_28
- Reporting: Event Log now includes a 'Copy report' button that copies the full Report Pack to clipboard.

## 2026-01-15 - Snapshot 01_15_26_29
- Stability: added idempotent guards to prevent double ENTER_UI and duplicate BEGIN_MATCH execution.

## 2026-01-15 - Snapshot 01_15_26_30
- Smoke: added lifecycle test that enters UI, exits, re-enters and asserts INIT_MATCH does not duplicate.

## 2026-01-15 - Snapshot 01_15_26_31
- UI: Task Context panel is now wired to matchOptions and updates live.

## 2026-01-15 - Snapshot 01_15_26_32
- Stability: coalesced duplicate matchOptions events to prevent redundant UI/log spam.

## 2026-01-15 - Snapshot 01_15_26_33
- Event Log: added 'Clear log' button (with confirmation) for clean capture sessions.

## 2026-01-15 - Snapshot 01_15_26_34
- Event Log: added Clear log button that clears the underlying buffer and refreshes view.

## 2026-01-15 - Snapshot 01_15_26_35
- Event Log: added quick filters for All, UI, Engine, and Sys.

## 2026-01-15 - Snapshot 01_15_26_36
- Stability: added idempotent guard to Event Log installer to prevent duplicate listeners/panels.

## 2026-01-15 - Snapshot 01_15_26_37
- Diagnostics: global window errors and unhandled promise rejections are now logged into the Event Log (Sys).

## 2026-01-15 - Snapshot 01_15_26_38
- Diagnostics: normalized global error hooks and added console.warn/error capture into Sys Event Log.

## 2026-01-15 - Snapshot 01_15_26_39
- Stability: reset=1 is now one-shot (query flag removed after clearing storage) to prevent reload loops.

## 2026-01-15 - Snapshot 01_15_26_40
- Diagnostics: added SAFE MODE (`?safe=1`) to enter UI without starting the engine/match.

## 2026-01-15 - Snapshot 01_15_26_41
- UX: SAFE mode now indicates in UI and provides quick SAFE toggle + Reset buttons.

## 2026-01-15 - Snapshot 01_15_26_42
- UX/Diagnostics: added header Smoke button and heartbeat indicator (seconds since last event).

## 2026-01-15 - Snapshot 01_15_26_43
- Canon compliance: removed non-canon UI additions (SAFE/Reset/Smoke buttons, heartbeat, Event Log filters/clear). Kept only requested logging/reporting improvements.

## 2026-01-15 - Snapshot 01_15_26_44
- Process: added CANON_CHANGE_CONTROL.md and SUGGESTIONS_LOG.md to enforce no-drift approval gate.

## 2026-01-15 - Snapshot 01_15_26_46
- Stability: added enterUI single-flight guard to prevent double-dispatch bursts.

## 2026-01-15 - Snapshot 01_15_26_47
- Stability: engine beginMatch is now single-flight to prevent duplicate match init.

## 2026-01-15 - Snapshot 01_15_26_48
- Stability: guarded matchOptions listener registration to prevent duplicates.

## 2026-01-15 - Snapshot 01_15_26_49
- Stability: guarded enterUI and exitToMenu listener registration to prevent duplicate navigation handlers.

## 2026-01-15 - Snapshot 01_15_26_50
- Stability: initUiController is now idempotent to prevent duplicate splash/menu event handlers.

## 2026-01-15 - Snapshot 01_15_26_51
- Stability: initCanvasRenderers is now idempotent to prevent double renderer init.

## 2026-01-15 - Snapshot 01_15_26_52
- Stability: guards now emit SYS log on skip; removed any stray boot-call wrapper text.

## 2026-01-15 - Snapshot 01_15_26_53
- Stability: repaired main boot guard section; removed stray brace/block in gameController; added simulation report.

## 2026-01-15 - Snapshot 01_15_26_55
- Staff/Tab overlay: clamp STAFF region to never overlap TAB; guard hit-test so TAB cannot be captured by STAFF hover/click.

## 2026-01-15 - Snapshot 01_15_26_56
- F: Tab numbers: staffPick handler now supports region=tab (string selection) and completes pick when fret already selected.

## 2026-01-15 - Snapshot 01_15_26_57
- F: Fretboard overlay: answered markers/claim labels now respect surfaceLayers.answered.

## 2026-01-15 - Snapshot 01_15_26_58
- F: Note rail: askedPcs now populates on each prompt; asked layer controls prompt/history; exhaustion class can now trigger.

## 2026-01-15 - Snapshot 01_15_26_59
- F: Note rail: disabled tiles (naturals-only accidentals) now ignore input via pointer-events none.

## 2026-01-15 - Snapshot 01_15_26_60
- G: Match Options emission: suppress init-phase spam; emit once after mount completes.

## 2026-01-15 - Snapshot 01_15_26_61
- H: Event Log: added Copy button (clipboard + fallback) for rapid capture.
## 2026-01-15 - Snapshot 01_15_26_62
- H: Added local CI script (typecheck + vitest run) and deterministic release zip packaging helpers.

## 2026-01-15 - Snapshot 01_15_26_63
- Docs: added Confirmation Protocol and Suggestions Log to prevent non-canon drift.

## 2026-01-15 - Snapshot 01_15_26_64
- I: Stability-only navigation audit: EventLog installer idempotent + enterUI duplicate routing guard + ownership/audit docs.

## 2026-01-15 - Snapshot 01_15_26_65
- G: Canonicalized UI→engine mapping: buildSettingsFromUi now prefers emitted matchOptions for fret range, strings, and difficulty.

## 2026-01-15 - Snapshot 01_15_26_66
- G: Persist last emitted matchOptions on window and extend UI→engine mapping (key/pitch framework/tuning).

## 2026-01-15 - Snapshot 01_15_26_67
- I: Added single-boot guard to prevent duplicate initialization.

## 2026-01-15 - Snapshot 01_15_26_68
- I: Added vitest engine smoke test for deterministic reducer sanity.

## 2026-01-15 - Snapshot 01_15_26_69
- J: Added GameSettings validation at match start; dev throws on invalid contract.

## 2026-01-15 - Snapshot 01_15_26_70
- J: Added unit tests for GameSettings validation.

## 2026-01-15 - Snapshot 01_15_26_71
- H/J: Local CI script now runs build after typecheck + tests.

## 2026-01-15 - Snapshot 01_15_26_72
- G: Added deprecated-terms enforcement script and included it in ci:local.

## 2026-01-15 - Snapshot 01_15_26_73
- I: Added controller install idempotency guard to prevent double listeners.

## 2026-01-15 - Snapshot 01_15_26_74
- Added STABILITY_AUDIT_REPORT.md and RUN_SMOKE_TESTS.bat for fast internal simulation.

## 2026-01-15 - Snapshot 01_15_26_75
- F: Fixed staff/tab surface gating to use engine notation.view instead of legacy modeId mapping.

## 2026-01-15 - Snapshot 01_15_26_76
- I: Debounced/deduped matchOptions emission and persisted __GEDU_LAST_MATCH_OPTIONS__ payload.

## 2026-01-15 - Snapshot 01_15_26_77
- Added docs/RENDERING_AUDIT_PLAN.md to drive remaining rendering checklist items.

## 2026-01-15 - Snapshot 01_15_26_78
- Event Log: added Copy button for fast log capture.

## 2026-01-16 - Snapshot 01_16_26_90
- Build: aligned BUILD_ID to snapshot label (UI + Event Log).
- Process: runtime verification checkpoints begin at build 90 and repeat every 15 builds.

## 2026-01-16 - Snapshot 01_16_26_91
- Fix: Multiplayer player count now follows the Launch Players selection.
- Fix: Match Options (Key + Pitch Framework) now drives promptProfileId.
- Fix: Canon default min fret is 0 when legacy controls are absent.

### 01_16_26_92
- Packaging: Solution B (flat zip) enforced via tripwire and release packaging script.
- Docs/Canon: DECISIONS_LOG updated to reflect new packaging invariant and extraction rule.
- Checklist: added GEG-021 roster + player names (and deferred GEG-021a).

## 2026-01-16 - Snapshot 01_16_26_98
- UI: Intermission overlay now uses fixed positioning + high z-index to ensure visibility during multiplayer turn gaps.
- Process: added a RUN_DEV/RUN_TESTS tripwire to detect and stop the common nested-folder unzip mistake (folder\folder).


## 2026-01-19 - Snapshot 01_19_26_99
- Start Menu: renamed top-level items to Single Player / Multiplayer / Education / Settings / FAQ-Help.
- Start Menu: added a dedicated Account area (Log In / Create Account placeholders).
- Start Menu: added Settings > Menu Test Panel (live view + copy of __GEDU_LAST_MATCH_OPTIONS__).
- Notation: removed Notation View selector and enforced Staff+TAB always visible (notation.view=staffTab).

## 2026-01-25 — Build 150 (Phase B-2 schema + preset lock)
- Added v1.1 schema contracts: matchOptions, timers, pitch sets, progressions, tonal assist settings.
- Added Presets A–J definition table v1.1 + presets JSON v1.1 (Surface Controls).
- Updated Phase B-2 schema registry to include timers schema.
