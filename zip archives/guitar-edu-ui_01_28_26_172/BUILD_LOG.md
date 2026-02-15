# Build Log

## 2026-01-28 — 01_28_26_172
- Purpose: Phase L foundation — teacher workflow artifacts (assignment definition, portable bundle, results packet).
- Core:
  - Added `src/shell/assignmentTypes.ts` and `src/shell/assignmentStorage.ts`.
  - Added `DOCS/PHASE_L_TEACHER_WORKFLOWS.md`.
  - No UI commitments; enforcement wiring will occur at controller/menu boundaries.

## 2026-01-16 — 01_16_26_97
- Purpose: Settings application — respect Match Options timer policy.
- Core:
  - When Match Options sets `rules.timer` to `off`, multiplayer no longer schedules turn/intermission timeouts.
  - Settings now carry `turnSec/intermissionSec = 0` when timer is off, and the controller bypasses the timeout scheduler.

## 2026-01-16 — 01_16_26_94
- Purpose: Multiplayer UX — add a simple roster editor so player count and names are explicit and controllable.
- UI:
  - Start Menu multiplayer now shows a player roster list (name fields per slot), visible count, and add/remove controls.
  - Confirm persists `__GEDU_PLAYER_COUNT__` and `__GEDU_PLAYER_NAMES__` for match init.
- Engine init:
  - Multiplayer player profiles now prefer `window.__GEDU_PLAYER_NAMES__` when present.

## Semantics and authority (stability audit)
- **CHECKLIST.md** is the only completion gate for GEG items.
- **BUILD_LOG.md** records packaged snapshot milestones and rationale only.
- Any `GEG-###` references inside BUILD_LOG are historical pointers and **must not** be treated as checklist completion.
- Legacy tracking artifacts (Task Boards / Retired ID ledgers) are intentionally removed to avoid ID collisions and false signals.



## 2026-01-16 — 01_16_26_80
- Purpose: Stability audit cleanup — eliminate non-canonical task trackers and clarify log semantics.
- Core:
  - Removed legacy task trackers: `docs/TASK_BOARD.md`, `DOCS/TASK_BOARD.md`, `DOCS/RETIRED_TASK_IDS.md`.
  - Updated `CHECKLIST.md` Task ID policy to remove the retired-ID ledger reference and keep gaps checklist-owned.
  - Clarified BUILD_LOG semantics (packaging history only; CHECKLIST is the completion gate).
  - Fixed snapshot packaging root folder convention to prevent nested/mismatched directory names.

## 2026-01-16 — 01_16_26_88
- Purpose: Match correctness — enforce exact pitch equivalence across STAFF/TAB/Fretboard when multiple surfaces are required.
- Core:
  - Added standard-tuning MIDI pitch helper (`pitchMidiAt`) for absolute pitch comparisons.
  - Implemented treble-clef absolute pitch mapping for staff y-index selections (E4 bottom line reference).
  - Composite validation now requires STAFF pitch to equal TAB/Fret pitch when TAB and/or Fretboard is required.



## guitar-edu-ui_01_15_26_02

- Completed GEG-001: restored deterministic repaint of Canvas2D surfaces by calling renderer `draw()` from the controller `renderAll()` loop.
- Files changed:
  - `src/app/gameController.ts`
  - `docs/TASK_BOARD.md`
  - `CHANGELOG.md`
  - `BUILD_LOG.md`

This log tracks packaged zip milestones and their intent.

## 2026-01-14 — 01_13_26_20
- Purpose: Documentation integrity pass — record task-ID gap policy and update canon progress snapshot to current build.
- Core:
  - Added `DOCS/RETIRED_TASK_IDS.md` and linked it from `CHECKLIST.md` (later removed during stability audit to avoid ID collisions).
  - Updated `CANON_PROGRESS.md` build package reference to `guitar-edu-ui_01_13_26_19.zip`.

## Canon progress marker
## 2026-01-13 — 01_13_26_19
- Purpose: Documentation reconciliation — align Match Settings spec with Advanced Match Options UI mapping (minimum-change).
- Core:
  - Learning Type now includes Arpeggios.
  - Input Method is now a canonical match setting (interaction granularity only; Chords/Scales/Arpeggios).
  - Domain Constraints expanded in spec to include string range, span, notes-per-string, and position scope.
  - Timing Rules expanded to match UI mapping primitives (including Timing Off).
  - Randomization canonized (opt-in; embedded; no global toggle).
  - Advanced mapping now explicitly places Failure Conditions, Bonus Phase, and Roman Numeral Interval System.


For “where we are in the master checklist,” keep `CANON_PROGRESS.md` up to date. Each build should either advance or reaffirm the canon position.

## 2026-01-13 — 01_13_26_01
- Purpose: Phase 1 UX alignment — add a Start Setup gate between Splash and session start.
- Core:
  - Splash session selection now opens Start Setup (content/mode/root/fret range) instead of starting immediately.
  - Start Setup writes choices into canonical settings controls and dispatches `gedu:beginSession`.
  - Controller listens to `gedu:beginSession` (keeps `gedu:splashSelect` for backward compatibility).

## 2026-01-13 — 01_13_26_03
- Purpose: Canon alignment pass — remove deprecated lexicon and ensure note rail defaults remain prompt-first.
- Core:
  - Renamed `ModeId.COMBINED` to `ModeId.STAFF_TAB_FRET` (legacy value string retained for backward compatibility).
  - Note rail default layers: `asked` ON (prompt highlight), `answered` OFF by default (no implied rail history).

## 2026-01-12 — 01_12_26_13
- Purpose: Stabilize E2E test execution by aligning Playwright to **shipping behavior** (built output) instead of relying on the dev server.
- Core:
  - `npm run e2e` and `npm run e2e:ui` now perform: `build -> vite preview (4173) -> playwright`.
  - Updated `playwright.config.ts` baseURL defaults to preview port (override via `E2E_BASE_URL`).
  - Updated `TESTING.md` to document preview-based E2E.

## 2026-01-12 — 01_12_26_10
- Purpose: Fix Windows `RUN_DEV.bat` dev-server launch reliability (nested-quote `start` parsing issue) and ensure Vite output is both visible and logged.
- Change: Add `DEVSERVER_RUNNER.bat` and route `RUN_DEV.bat` through it.

## 2026-01-12 — 01_12_26_05
- Purpose: Phase C workflow acceleration — add a no-terminal-friendly Windows runner for dev and tests.
- Core:
  - Added `RUN_DEV.bat` to install deps if needed, start the Vite dev server, and open the browser.
  - Added `RUN_TESTS.bat` to install deps if needed, ensure Playwright browsers are installed, then run:
    - `npm run test:ci`
    - `npm run e2e` (headless)
  - Updated `TESTING.md` with one-click runner instructions.

## 2026-01-12 — 01_12_26_09
- Purpose: Make one-click workflows debuggable when launch fails.
- Core:
  - `RUN_DEV.bat` now always writes `logs/run_dev.log` and `logs/devserver.log`.
  - `RUN_TESTS.bat` now always writes `logs/run_tests.log`.
  - Updated `TESTING.md` with a Logs section.

## 2026-01-11 — 01_11_26_09
- Purpose: Phase 3 correctness on top of the accepted-marks persistence pipeline (STAFF+TAB+FRET truth triangle).
- Core:
  - When STAFF is required, STAFF is the authoritative pitch source: staff letter + chosen accidental must match the prompt’s pitch and spelling (black-key sharp/flat strictness; white keys must be natural).
  - When TAB + FRET are both required, enforce exact string+fret match (TAB is authoritative for position).
  - Commit pipeline hardened: snapshot pending STAFF/TAB marks before reducer effects can clear them; commit snapshot only after successful composite validation.

## 2026-01-11 — 01_11_26_05
- Purpose: A-contract audit follow-through: restore/verify timers + overlays + checkbox layers without violating the static Staff/TAB requirement.
- Core:
  - Purged remaining legacy Pause references (no pause state or events).
  - Removed Staff/TAB viewBox cropping so the notation surface never zooms/crops per UI mode.
  - Wired Surface Layers (Display / Prompt / Marks) into Staff/TAB (grid/hover/marks) and Fretboard (claimed dots, learning labels, pulse overlays).

## 2026-01-11 — 01_10_26_26
- Purpose: remove TAB-input ambiguity and eliminate the accidental “0” stamping / disappearing-number behavior reported in Mode 3.
- Core:
  - Clicking a TAB slot without a chosen fret now creates a **pending TAB slot** (outline) instead of placing `0`.
  - TAB number selection is explicitly required (including open-string `0`) before a TAB answer is committed.
  - Turn/prompt resets now clear TAB keypad UI state so a prior selection cannot leak into a new prompt.

## 2026-01-11 — 01_11_26_02
- Purpose: restore match flow to the updated contract (pause removed, Ready/Engage gate, seconds-based timers, single-player time-to-complete default).
- Core:
  - Removed Pause button and pause event handling (no user-facing pause).
  - Added a Ready/Engage overlay gate so Turn 1 does not start immediately.
  - Timers are stored in seconds (`turnSec`, `intermissionSec`) and converted to ms only for scheduling.
  - Single-player displays a stopwatch by default.

## 2026-01-11 — 01_10_26_25
- Purpose: make Mode 3 composite answering behave like a real “multi-surface” check (TAB + FRET both must be correct to the prompt), while improving clarity during composite entry.
- Core:
  - TAB + FRET validation is now **pitch-based**, not strict string/fret equality.
  - Submits using the most recently updated Answer surface.
  - Adds a pending “ring” marker on the fretboard to show the selected cell during composite entry.

## 2026-01-10 — 01_10_26_16
- Purpose: lock in Staff+Tab overlay rewrite and controller-owned mark state.
- Core: Surface Input Matrix + composite submission gating (Staff drives pitch).

## 2026-01-10 — 01_10_26_17
- Purpose: stabilize surface-matrix application in the DOM and add user-facing layer toggles.
- Core: `staffTabStage` id alignment; Surface Layers (View/Asked/Answered); rail layer controls.

## 2026-01-10 — 01_10_26_18
- Purpose: align the user-facing Surface Layers terminology with the Surface Matrix vocabulary.
- Core: rename UI labels to Display/Prompt/Marks (internal keys unchanged).

## 2026-01-10 — 01_10_26_19
- Purpose: make the Staff+TAB overlay geometry match the 3-measure rendered template.
- Core: normalize to the core 5 staff lines + derive measure spans from repeated long line segments (fixes column math and enables reliable tab-number rendering).
- Added: `getBlank3MeasureStaffTabLayout()` fallback so geometry remains correct even if the background is swapped to a raster render (no SVG line primitives).

## 2026-01-10 — 01_10_26_20
- Purpose: restore a canonical repo entrypoint for onboarding and cross-thread alignment.
- Core: added root `README.md` including Thread Boot Protocol and the project’s canon docs order.
- Canon: introduced `CANON_PROGRESS.md` as the crosswalk between the DOCX canon and the repo backlog.

## 2026-01-10 — 01_10_26_22
- Purpose: add an explicit meta tracking bucket for recurring UI/UX and rendering refinements to reduce cross-thread regressions.
- Core: `CANON_PROGRESS.md` gains **E) Refinements, Adjustments, and Fine Tuning** (cross-cutting), and `README.md` references it as part of the boot protocol.

## 2026-01-10 — 01_10_26_23
- Purpose: restore the missing multiplayer intermission UX so the phase is visible and behaves like a real turn break.
- Core: phase-driven intermission overlay with countdown + tap-to-start-early; auto-transition to the next turn remains controller-driven.

## 2026-01-10 — 01_10_26_24
- Purpose: fix regressions reported in 01_10_26_23 (timers + Mode 3 surface requirements) and reduce staff/tab hover confusion.
- Core:
  - Engine now emits `TURN_STARTED` so the controller reliably starts the turn countdown.
  - Intermission default increased to 5s and countdown formatting now avoids showing 00:00 while time remains.
  - Mode 3 now requires **TAB + Fretboard** before submission (no auto-fret claim from TAB-only input).
  - Staff/TAB hover feedback changed from full-column shading to a thin alignment line + local hover box.

## 2026-01-11 — 01_11_26_04
- Purpose: implement STAFF/TAB timeline persistence groundwork while keeping notation spatially static.
- Core:
  - Default STAFF/TAB grid set to 8th-note slots (8 columns per measure).
  - STAFF/TAB marks persist across turns; new accepted marks advance a timeline cursor.
  - When the visible window is full, marks scroll left by one slot (no viewBox crop/zoom).
  - STAFF supports multiple noteheads per slot for multi-answer alignment.

## 2026-01-11 — 01_11_26_06
- Purpose: tighten Mode 3 correctness using the persistent accepted-marks timeline.
- Core:
  - In UI Mode `m3` (TAB mode), the fretboard pick must match the TAB selection exactly (same string + fret).
  - Failed composite attempts clear only the transient timeline slot; accepted TAB entries persist until the window scrolls.

## 2026-01-11 — 01_11_26_07
- Purpose: Phase 1.1 + 1.2 validation layer before Mode 3 truth-table lock.
- Core:
  - Added Dev/Test timeline stress tools: fill window, advance cursor, and simulate shift-left beyond capacity.
  - TAB overlay now supports multiple strings per slot (chord-style stacking) while remaining subdivision-aligned and spatially static.

## 2026-01-11 — 01_11_26_08
- Purpose: Implement the accepted-marks persistence pipeline required for Mode 3 truth-model locking.
- Core:
  - STAFF/TAB match clicks now write to pending preview maps; only accepted composite submissions commit them into the persistent timeline record.
  - Pending previews render on separate overlay layers that obey the Asked checkbox layer.
  - Shift-left pipeline now safely reindexes both accepted and pending maps.


---

## guitar-edu-ui_01_11_26_10

- Added Mode 3 staff spelling policy UI toggle (strict vs enharmonic).
- Staff overlay: chord accidental column placement to reduce collisions.
- Added pending STAFF preview rendering (separate layer group).

## 2026-01-11 — Build 01_11_26_11
- Ledger-line preview added for STAFF hover/pending; ledger lines union-rendered per slot.
- Added Dev/Test Mode 3 matrix verification report (strict vs enharmonic).

## 2026-01-12 — Build 01_12_26_01
- Purpose: Phase A (Unit Tests) for faster iteration and regression prevention.
- Core:
  - Added Vitest harness and unit test suite (`tests/unit/`).
  - Extracted deterministic helpers for:
    - STAFF/TAB shift-left pipeline (`src/shell/staffTabTimeline.ts`)
    - STAFF spelling policy checks (`src/shell/spellingPolicy.ts`)
    - TAB multi-string slot stability (`src/shell/tabStack.ts`)
    - Snapshot commit gate (accepted-only, no null frets) (`src/shell/staffTabCommit.ts`)
  - Controller now delegates to these helpers so tests validate real behavior.

## 2026-01-12 — Build 01_12_26_03
- Purpose: fix Phase A test harness so it matches runtime enums.
- Core: aligned unit tests to import/use the canonical `SlotType` enum used by `spellingPolicy`.
- Result: `npm run test:ci` passes (9/9).

## 2026-01-12 — Build 01_12_26_04
- Purpose: Phase B (E2E) for no-terminal-friendly iteration and regression prevention.
- Core:
  - Added Playwright harness (`playwright.config.ts`) and `tests/e2e/` specs.
  - Added scripts: `npm run e2e` (headless) and `npm run e2e:ui` (interactive).
  - E2E validates:
    - Dev unlock paths (5-click build badge + Ctrl+Shift+D) and footer DEV panel access.
    - Staff accidental prompt and commit persistence.
    - Fill + shift-left stress for STAFF/TAB persistence and TAB number visibility.
    - Mode 3 strict vs enharmonic policy verification via Dev/Test truth-table report.
  - Added `TESTING.md` with install + run instructions.


### 01_12_26_06
- Patched RUN_DEV.bat: wait-for-server loop (ports 5173-5180) before opening browser.
- Patched RUN_DEV.bat: writes dev server output to `devserver.log` for quick troubleshooting.


## guitar-edu-ui_01_12_26_07
- Fix RUN_DEV.bat: robust working-directory anchoring, safe quoting, and reliable browser open after server startup.

## guitar-edu-ui_01_12_26_08
- Tooling: RUN_DEV.bat now detects Node major version and, on Node >= 23, automatically uses an optional-dependency install flow and validates Rollup can be required.
- Tooling: When Rollup's Windows native optional dependency is missing, RUN_DEV.bat performs an automated repair (clean install with `--include=optional` + `npm rebuild rollup`).

## 2026-01-12 — Patch 01_12_26_11
- Hotfix: DEVSERVER_RUNNER now runs `call npm run dev` directly and appends all output to `logs\\devserver.log` (no PowerShell Tee-Object quoting failures).
- Hotfix: RUN_DEV logging initialization repaired; log paths normalized to Windows backslashes.

## 2026-01-12 — Patch 01_12_26_12
- Docs: Platform endgame locked to **Web + PWA + Desktop (Tauri)**.
- Added `DOCS/PLATFORM_STRATEGY.md` and recorded the decision in `DECISIONS_LOG.md`.

## 2026-01-12 — Patch 01_12_26_14
- PWA: Added manifest + service worker via `vite-plugin-pwa`.
- Persistence: Implemented IndexedDB snapshot (settings + leaderboards) with Dev/Test export/import helpers.
- App boot: Added IndexedDB hydrate step before controller init.



## 01_12_26_15
- Added RUN_PREVIEW.bat (one-click build + vite preview + auto-open browser) with logging to logs/run_preview.log.

## 2026-01-13 — Patch 01_13_26_02
- Phase 1: Enabled chord-style STAFF stacking within a single timeline slot (pending).
  - STAFF picks now toggle a note on/off in the pending list instead of replacing the slot.
  - Accidental prompt commit no longer clears other pending STAFF/TAB marks in the same column.

## Build 01_14_26_01 (2026-01-14)
Menu readiness patch for testing (minimum UI changes; no new gameplay systems):
- Utility tabs: added **Interval** and **Arpeggio** navigation panes (placeholders).
- Num keypad: removed display window; selection now highlights the pressed key; still 0–24.
- Match Options: removed **Learning** difficulty option (Free Play remains a separate entry path).
- Surface Controls: removed explicit **Active** checkbox column; active is implicit from Prompt/Mark/Display/SAM usage.
- Musical Context: renamed **Collection → Pitch Framework** and expanded to Chromatic + all 7 modes + Pentatonic + Blues.
- Accidentals: switched from single-select (incl. Auto) to a **pool** (Naturals / Sharps / Flats) stored as `all` or CSV.

## Build 01_14_26_02 (2026-01-14)
Match Options menu split + context gating (test-enabling; no new gameplay systems):
- Implemented **Basic Match Settings** (always visible) vs **Advanced Match Settings** (collapsed).
## Build 01_14_26_02 (2026-01-14)
Match Options menu split + context gating (test-enabling; no new gameplay systems):
- Implemented **Basic Match Settings** (always visible) vs **Advanced Match Settings** (collapsed).
- Basic includes: Learning Target, Difficulty (Easy/Medium/Hard), Key, Pitch Framework (checkbox set), Accidentals pool, Fret Min/Max.
- Advanced includes: Instrument Controls, context-gated Learning Target Constraints panes, Presets (A–J), context-gated Input Method, Surface Controls (no Active checkbox), Timers & Rules shell, Player/Board options.
- Input Method now hides/disables unless Learning Target is Chords/Scales/Arpeggios.

## Build 01_14_26_04 (2026-01-14)

- Docs: Added `DOCS/LOCK_IN_TABLES.md` (display modes, difficulty, SAM, rail, segments).
- Canon: Added Right-click Answer Shortcut Menu stub (docs + checklist task).
- Docs: Noted right-click shortcut in Start Screen and Advanced Match Options UI mappings.

## Build 01_14_26_11 (2026-01-14)
Rendering lifecycle stabilization (no gameplay changes):
- Fix: Canvas2D first paint is deferred until main UI is visible (prevents hidden 1×1 canvas init).
- Fix: Added ResizeObserver-driven repaints so flex/layout settle triggers redraws without requiring a window resize.
- Outcome: Staff+TAB and Fretboard canvases no longer show as blank white panels after leaving the launch menu.

01_14_26_07 | 2026-01-14 | Canvas2D primary visual fallback layers (staff/tab + fretboard); SVG retained for overlays/markers.

## 01_14_26_10
- Staff+TAB Canvas2D renderer now rasterizes the established SVG template into the canvas to preserve the prior near-final look while keeping Canvas2D primary.
- RendererManager loads `/Guitar-Notes_Tab_Staff-Blank-3Measures.svg` as Canvas background (non-blocking) and redraws normally.


## 01_14_26_12
- Fix: Single-player Engage now dispatches START_TURN so prompts generate.
- Fix: Note rail renders in pre-match (non-edu) state.
- Fix: Fretboard canvas string thickness orientation (low strings bottom).

## 01_14_26_13
- Add: In-session Event Log overlay (LOG button in footer) to record UI events (`gedu:*`) and engine actions for troubleshooting.
- Add: Non-invasive hook in reducer dispatch to record actions when event log is installed.
\n## 01_14_26_14\n- Fix: wire gedu:enterUI intent to beginMatch/beginEducation (restores prompt generation + rail in challenge/multiplayer entry flows).\n

## 2026-01-15 — 01_14_26_14
- Purpose: Restore session start wiring so `gedu:enterUI` deterministically starts the correct session and engine actions are emitted to the Event Log.
- Core:
  - Added backwards-compat handler for `gedu:enterUI` to map intent → session start (single/multi/edu).

## 01_14_26_15
- Fix: make the `gedu:enterUI` bridge deterministic by listening on both `window` and `document`.
- Add: log `ENTER_UI` (intent), `BEGIN_MATCH`, and `INIT_MATCH` to the Event Log so session start is visible during troubleshooting.

## 01_14_26_16
- Fix: initialize `initGameController()` BEFORE IndexedDB hydration so UI events cannot fire before listeners are attached (prevents missing session start + missing engine log lines).

[2026-01-15] Build 01_15_26_03
- UI: Event Log overlay now includes Copy button (clipboard + fallback).
- Controller: moved session initialization ahead of first note rail render to avoid TDZ and ensure consistent note rail population.

[2026-01-15] Build 01_15_26_04
- Boot: added single-run guard to prevent double initialization.
- Logging: `gedu:matchOptions` now de-dupes identical consecutive payloads.
- UI: build label now reads from src/app/buildInfo.ts BUILD_ID.

[2026-01-15] Build 01_15_26_05
- Boot: guard now gates initialization without moving imports (fixes page-load failures).
- UI: build badge now displays `Build 01_15_26_05`.

[2026-01-15] Build 01_15_26_06
- Stability: main entry boot() refactor under window.__GEDU_BOOTED__ guard (prevents duplicate init without breaking module load).
- Validation: added smoke test harness (?smoke=1) that verifies critical mounts (ge-shell, staffCanvas, fretCanvas, noteStrip-rail) and logs gedu:smokeTest.
- UI: build badge now reads BUILD_ID (01_15_26_06).

[2026-01-15] Build 01_15_26_07
- Visibility: replaced `.hidden` usage on core surface sections with `.isSuppressed` class to keep canvases mounted and sized.
- CSS: added `.section.isSuppressed` styles (fade + disable pointer events).

[2026-01-15] Build 01_15_26_08
- UI: added Prompt banner above note rail; controller already updates #promptText with current prompt label.
- SmokeTest: now checks for #promptText and #taskContext mounts.

[2026-01-15] Build 01_15_26_09
- EngineReducer: START_TURN now picks a fresh actionable prompt via pickNextPromptVariant.
- EventLog: added Download export (.txt) with filename gedu_<BUILD_ID>_<timestamp>.txt.
- SmokeTest: added check for #eventLogDownload.

[2026-01-15] Build 01_15_26_10
- Controller: Task Context values are now populated deterministically from match options.
- SmokeTest: added checks for ctx-learningTarget and ctx-prompt.

[2026-01-15] Build 01_15_26_11
- UI/Layout: Task Context now includes Active Surfaces + Required Inputs rows.
- Controller: Task Context now reports active surfaces (from matchOptions) and required inputs (from engine modeId/notation.view).
- SmokeTest: added mount checks for ctx-activeSurfaces and ctx-requiredSurfaces.

[2026-01-15] Build 01_15_26_12
- Input Gating: Fretboard and Staff pick handlers now respect surface input enablement (matrix.fretboard.input / matrix.staff.input).

[2026-01-15] Build 01_15_26_13
- EventLog: download now includes report header + embedded last match options and engine settings.
- Controller: publishes __GEDU_LAST_MATCH_OPTIONS__ and __GEDU_LAST_ENGINE_SETTINGS__ for capture.

[2026-01-15] Build 01_15_26_14
- Docs: added CHECKLIST_MASTER and documented smoke/report workflow for suspended manual testing.

[2026-01-15] Build 01_15_26_15
- submitCompositeIfReady: pitchSel selection now filters by matrix.<surface>.required to ensure only required surfaces submit.

[2026-01-15] Build 01_15_26_15
- getSurfaceMatrix(): now derives needStaff/needTab/needFret from engine settings during live match.

[2026-01-15] Build 01_15_26_16
- CSS: added .surfaceClip overflow hidden for staff/tab sections; added subtle canvas backgrounds.

[2026-01-15] Build 01_15_26_17
- NoteRail: prompt highlight + asked history + exhaustion visuals.

[2026-01-15] Build 01_15_26_18
- layout.ts: matchOptions emitter now coalesces and ignores duplicate payloads.

[2026-01-15] Build 01_15_26_19
- main.ts: boot wrapped in try/catch with renderFatal overlay + global error handlers.

[2026-01-15] Build 01_15_26_20
- main.ts: fatal overlay adds copy/download controls.

[2026-01-15] Build 01_15_26_21
- Added batch scripts + npm check pipeline for hands-off verification.

[2026-01-15] Build 01_15_26_22
- eventLog.ts: copy/download controls added to Event Log panel.

[2026-01-15] Build 01_15_26_23
- Added window guards: __GEDU_GAME_CONTROLLER_INSTALLED__ and __GEDU_LAYOUT_INSTALLED__.

[2026-01-15] Build 01_15_26_24
- main.ts: reset param clears GEDU-prefixed localStorage keys and reloads.
- eventLog.ts: added Reset app button.

[2026-01-15] Build 01_15_26_25
- gameController: added exitRequested handler (clean shutdown + menu return).

[2026-01-15] Build 01_15_26_26
- Report Pack export added.

[2026-01-15] Build 01_15_26_27
- Reset robustness improvements.

[2026-01-15] Build 01_15_26_28
- eventLog.ts: added Copy Report Pack control.

[2026-01-15] Build 01_15_26_29
- gameController: idempotent guards for enter/init lifecycle.

[2026-01-15] Build 01_15_26_30
- smokeTest.ts: lifecycle smoke added.

[2026-01-15] Build 01_15_26_31
- layout.ts: Task Context update wiring.

[2026-01-15] Build 01_15_26_32
- gameController: matchOptions coalescing.

[2026-01-15] Build 01_15_26_33
- eventLog.ts: Clear log control.

[2026-01-15] Build 01_15_26_34
- eventLog.ts: clear buffer wiring.

[2026-01-15] Build 01_15_26_35
- eventLog.ts: filter controls.

[2026-01-15] Build 01_15_26_36
- eventLog.ts: __GEDU_EVENTLOG_INSTALLED__ guard.

[2026-01-15] Build 01_15_26_37
- main.ts + eventLog.ts: error capture hooks.

[2026-01-15] Build 01_15_26_38
- main.ts: robust diagnostics block (error/unhandledrejection + console capture).

[2026-01-15] Build 01_15_26_39
- main.ts: one-shot reset flag handling.

[2026-01-15] Build 01_15_26_40
- main.ts + gameController.ts: SAFE_MODE support.

[2026-01-15] Build 01_15_26_41
- layout.ts: safe/reset quick controls.

[2026-01-15] Build 01_15_26_42
- layout.ts + eventLog.ts: smoke + heartbeat.

[2026-01-15] Build 01_15_26_43
- Canon compliance rollback: removed non-canon UI features.

[2026-01-15] Build 01_15_26_44
- Added canon approval gate docs: CANON_CHANGE_CONTROL.md + SUGGESTIONS_LOG.md.

[2026-01-15] Build 01_15_26_46
- gameController.ts: enterUI inFlight guard.

[2026-01-15] Build 01_15_26_47
- engine.ts: beginMatch single-flight guard.

[2026-01-15] Build 01_15_26_48
- gameController.ts: matchOptions listener guard.

[2026-01-15] Build 01_15_26_49
- gameController.ts: enterUI/exitToMenu listener guards.

[2026-01-15] Build 01_15_26_50
- controller.ts: initUiController idempotent guard.

[2026-01-15] Build 01_15_26_51
- RendererManager.ts: initCanvasRenderers idempotent guard.

[2026-01-15] Build 01_15_26_52
- Added SYS guard:skip logging in guarded installers; cleaned main boot call.

[2026-01-15] Build 01_15_26_53
- Internal simulation: static checks only (no network). See DOCS/STABILITY_SIM_REPORT_2026-01-15.md
- Fixed syntax regressions in main.ts and gameController.ts introduced during guard work.

[2026-01-15] Build 01_15_26_55
- staffTabOverlay.ts: boundary clamp (blank layout) + hit-test guard.

[2026-01-15] Build 01_15_26_56
- gameController.ts: staffPick now branches for region=tab to enable tab number placement.

[2026-01-15] Build 01_15_26_57
- fretboardOverlay.ts: gate ownership markers under layers.answered.

[2026-01-15] Build 01_15_26_58
- gameController.ts: note rail history/exhaustion now functional (askedPcs.add on prompt update).

[2026-01-15] Build 01_15_26_59
- styles.css: .noteTile.disabled adds pointer-events:none.

[2026-01-15] Build 01_15_26_60
- layout.ts: initPhase gate ensures single canonical matchOptions emission after mount.

[2026-01-15] Build 01_15_26_61
- eventLog.ts: getEventLogText()
- layout.ts: Event Log Copy button.
[2026-01-15] Build 01_15_26_62
- Added RUN_CI_LOCAL.bat, RUN_PACKAGE_RELEASE.bat, and tools/package_release.mjs

[2026-01-15] Build 01_15_26_63
- docs/CONFIRMATION_PROTOCOL.md and docs/SUGGESTIONS_LOG.md added.

[2026-01-15] Build 01_15_26_64
- eventLog.ts: __GEDU_EVENTLOG_INSTALLED__ guard
- gameController.ts: __GEDU_ENTERUI_GUARD__ to prevent double session start
- docs: STATE_OWNERSHIP_MAP.md, NAVIGATION_AUDIT.md

[2026-01-15] Build 01_15_26_65
- gameController.ts: buildSettingsFromUi prefers __GEDU_LAST_MATCH_OPTIONS__ (domain + difficulty) to reduce drift.

[2026-01-15] Build 01_15_26_66
- layout.ts: persist __GEDU_LAST_MATCH_OPTIONS__
- gameController.ts: map additional fields from matchOptions

[2026-01-15] Build 01_15_26_67
- main.ts: __GEDU_APP_BOOTED__ guard

[2026-01-15] Build 01_15_26_68
- tests/engine.smoke.test.ts added

[2026-01-15] Build 01_15_26_69
- settingsValidation.ts added; gameController validates GameSettings at start

[2026-01-15] Build 01_15_26_70
- tests/settingsValidation.test.ts added

[2026-01-15] Build 01_15_26_71
- package.json: ci:local now includes build

[2026-01-15] Build 01_15_26_72
- tools/check_deprecated_terms.mjs added; ci:local runs check:deprecated first

[2026-01-15] Build 01_15_26_73
- gameController.ts: __GEDU_CONTROLLER_INSTALLED__ guard

[2026-01-15] Build 01_15_26_74
- docs/STABILITY_AUDIT_REPORT.md added
- RUN_SMOKE_TESTS.bat added

[2026-01-15] Build 01_15_26_75
- gameController.ts: getSurfaceMatrix byEngine uses notation.view includes staff/tab

[2026-01-15] Build 01_15_26_76
- layout.ts: matchOptions duplicate suppression + window payload

[2026-01-15] Build 01_15_26_77
- docs/RENDERING_AUDIT_PLAN.md added

[2026-01-15] Build 01_15_26_78
- UI: eventLogCopy button
- eventLog.ts: copy handler emits eventLog:copied

[2026-01-16] [Snapshot] Build 01_16_26_90
- Build label: BUILD_ID aligned to snapshot (UI + Event Log).
- Process: runtime verification checkpoints start at build 90 and repeat every 15 builds (90, 105, 120, ...).

[2026-01-16] [Snapshot] Build 01_16_26_91
- UI: persist launch playerCount to window for controller to consume.
- Controller: multiplayer player count now respects launch selection.
- Controller: Match Options key + pitchFramework now drive promptProfileId mapping.

## 2026-01-16 — Snapshot Build 01_16_26_92
- Canon hygiene update: adopt Solution B packaging (flat zip) + zip tripwire enforcement.
- Checklist update: add GEG-021 / GEG-021a for multiplayer roster + player naming.

## 2026-01-16 — Build 01_16_26_95
- Controller: **End** now hard-terminates match state (clears engine state + returns to Start Menu).
- Checklist: GEG-001 marked complete.

## 2026-01-16 — Build 01_16_26_96
- Controller: handle **ROUND_COMPLETE** + **LAST_CHANCE_STARTED** effects (alerts + debug events) to support turn-loop visibility.
- Checklist: add note under GEG-002; add GEG-005 multiplayer player roster UI.

## 2026-01-16 — Build 01_16_26_98
- UI: intermission overlay made `position:fixed` with high z-index so it reliably appears during multiplayer intermissions.
- Tooling: added unzip-nesting tripwires to RUN_DEV.bat and RUN_TESTS.bat (detects <folder>\\<folder> extraction mistakes and exits with fix instructions).

## 2026-01-16 — Build 01_16_26_98
- Docs: clarified flat-zip packaging rule and hard-banned redundant nested build folders.
- Tripwire: added `scripts/check-extracted-layout.mjs` to detect nested extraction layouts.


## 2026-01-19 — Build 01_19_26_99
- Start Menu labels updated; Account area added.
- Settings > Menu Test Panel added.
- Staff+TAB locked visible (removed Notation View + forced staffTab).


## Build 01_25_26_150 — Phase B-2 (Schemas + Presets v1.1)
- Added DOCS/SCHEMAS/*.v1.1.json contracts (no engine wiring).
- Added PRESETS_A-J_DEFINITION_TABLE_v1_1.md and presets_A-J_v1_1.json.

[2026-01-25] Build 150 packaged: Phase B-2 preset definition table + schema set v1.1 (UI output contracts only).

## Build 01_25_26_156 — Menu Alignment Stabilization (UI only)
- Stabilized Match Options field sizing to reduce wrap-driven jitter.
- Refit Surface Controls matrix columns to the fixed wing width (no clipping) and standardized mini-control sizing.
- Removed width caps on mini selects so option labels do not trigger reflow.

## Build 01_25_26_157 — Hotfix: Presets JSON Import Path + Build ID Sync
- Restored expected `src/data/presets_A-J_v1_1.json` so `src/ui/layout.ts` resolves the presets import under Vite.
- Synced `BUILD_ID` to `01_25_26_157` to match the packaged snapshot label.

## 2026-01-26 — Build 01_26_26_162
- Start Menu: added **Initialization** panels for Single Player → **Challenge** and Multiplayer flows (pre-seeds Match Options draft).
- Start Menu: renamed Single Player → “Game” to **Challenge** (Free Play unchanged).
- Typecheck: resolved Start Menu refactor scope issues (no behavioral changes to engine).
