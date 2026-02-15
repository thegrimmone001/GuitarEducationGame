# Master Timeline Ledger (MTL)
Generated from GLG_011826 history + current working zips.
Generated: 2026-01-19 09:20

## Legend
- **Integrity**: whether the instruction spine is present (docs/checklist/specs).
- **Evidence**: extracted from each zip (file presence + CHANGELOG headers).

## guitar-edu-ui_01_06_26_02.zip (2026-01-06 • build 2)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_09_26_01.zip (2026-01-09 • build 1)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_10_26_23.zip (2026-01-10 • build 23)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_11_26_08.zip (2026-01-11 • build 8)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_11_26_10.zip (2026-01-11 • build 10)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_12_26_15.zip (2026-01-12 • build 15)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_13_26_02.zip (2026-01-13 • build 2)
- **Integrity:** instruction spine 4/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=yes, DECISIONS_LOG.md=yes, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=yes
- **CHANGELOG (head evidence):**

```text
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
```

## guitar-edu-ui_01_13_26_18.zip (2026-01-13 • build 18)
- **Integrity:** instruction spine 5/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=yes, DECISIONS_LOG.md=yes, MATCH_SETTINGS_SPEC.md=yes, THREAD_HANDOFF.md=yes
- **CHANGELOG (head evidence):**

```text
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
```

## guitar-edu-ui_01_13_26_20.zip (2026-01-13 • build 20)
- **Integrity:** instruction spine 5/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=yes, DECISIONS_LOG.md=yes, MATCH_SETTINGS_SPEC.md=yes, THREAD_HANDOFF.md=yes
- **CHANGELOG (head evidence):**

```text
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
```

## guitar-edu-ui_01_14_26_02.zip (2026-01-14 • build 2)
- **Integrity:** instruction spine 5/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=yes, DECISIONS_LOG.md=yes, MATCH_SETTINGS_SPEC.md=yes, THREAD_HANDOFF.md=yes
- **CHANGELOG (head evidence):**

```text
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
```

## guitar-edu-ui_01_14_26_12.zip (2026-01-14 • build 12)
- **Integrity:** instruction spine 5/5 • DOCS folder: yes • LOCK_IN_TABLES: yes • conversation_composite: no
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=yes, DECISIONS_LOG.md=yes, MATCH_SETTINGS_SPEC.md=yes, THREAD_HANDOFF.md=yes
- **CHANGELOG (head evidence):**

```text
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
```

## guitar-edu-ui_01_16_26_98.zip (2026-01-16 • build 98)
- **Integrity:** instruction spine 5/5 • DOCS folder: yes • LOCK_IN_TABLES: yes • conversation_composite: no
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=yes, DECISIONS_LOG.md=yes, MATCH_SETTINGS_SPEC.md=yes, THREAD_HANDOFF.md=yes
- **CHANGELOG (head evidence):**

```text
> **Note (stability audit):** The legacy lowercase `/docs` folder has been removed. Any historic references to `docs/*` paths in this changelog refer to artifacts that no longer exist and should be treated as archival history only.
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
```

## guitar-edu-ui_01_17_26_30.zip (2026-01-17 • build 30)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
- Marked **GEG-016** complete in CHECKLIST.md.
## Step 14.3 (GEG-020 Player card timer)
- Verified Player Card contains avatar, score, tokens, and turn timer display.
- Marked **GEG-020** complete in CHECKLIST.md.
## Step 14.4 (GEG-022 Active players only)
- Added a Multiplayer player-count selector to the splash screen (2–5).
- Match init now uses the selected player count so the in-match leaderboard renders only active players.
- Marked **GEG-022** complete in CHECKLIST.md.
## Step 14.5 (Multiplayer cap correction)
```

## guitar-edu-ui_01_17_26_111.zip (2026-01-17 • build 111)
- **Integrity:** instruction spine 5/5 • DOCS folder: yes • LOCK_IN_TABLES: yes • conversation_composite: no
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=yes, DECISIONS_LOG.md=yes, MATCH_SETTINGS_SPEC.md=yes, THREAD_HANDOFF.md=yes
- **CHANGELOG (head evidence):**

```text
> **Note (stability audit):** The legacy lowercase `/docs` folder has been removed. Any historic references to `docs/*` paths in this changelog refer to artifacts that no longer exist and should be treated as archival history only.
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
```

## guitar-edu-ui_01_18_26_01.zip (2026-01-18 • build 1)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_18_26_02.zip (2026-01-18 • build 2)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_18_26_03.zip (2026-01-18 • build 3)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_18_26_04.zip (2026-01-18 • build 4)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*

## guitar-edu-ui_01_18_26_14.zip (2026-01-18 • build 14)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
- Marked **GEG-016** complete in CHECKLIST.md.
## Step 14.3 (GEG-020 Player card timer)
- Verified Player Card contains avatar, score, tokens, and turn timer display.
- Marked **GEG-020** complete in CHECKLIST.md.
```

## guitar-edu-ui_01_18_26_15.zip (2026-01-18 • build 15)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
- Marked **GEG-016** complete in CHECKLIST.md.
## Step 14.3 (GEG-020 Player card timer)
- Verified Player Card contains avatar, score, tokens, and turn timer display.
- Marked **GEG-020** complete in CHECKLIST.md.
```

## guitar-edu-ui_01_18_26_16.zip (2026-01-18 • build 16)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
- Marked **GEG-016** complete in CHECKLIST.md.
## Step 14.3 (GEG-020 Player card timer)
- Verified Player Card contains avatar, score, tokens, and turn timer display.
- Marked **GEG-020** complete in CHECKLIST.md.
```

## guitar-edu-ui_01_18_26_17.zip (2026-01-18 • build 17)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
- Marked **GEG-016** complete in CHECKLIST.md.
## Step 14.3 (GEG-020 Player card timer)
- Verified Player Card contains avatar, score, tokens, and turn timer display.
- Marked **GEG-020** complete in CHECKLIST.md.
```

## guitar-edu-ui_01_18_26_18.zip (2026-01-18 • build 18)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
- Marked **GEG-016** complete in CHECKLIST.md.
## Step 14.3 (GEG-020 Player card timer)
- Verified Player Card contains avatar, score, tokens, and turn timer display.
- Marked **GEG-020** complete in CHECKLIST.md.
```

## guitar-edu-ui_01_18_26_19.zip (2026-01-18 • build 19)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
- Marked **GEG-016** complete in CHECKLIST.md.
## Step 14.3 (GEG-020 Player card timer)
- Verified Player Card contains avatar, score, tokens, and turn timer display.
- Marked **GEG-020** complete in CHECKLIST.md.
```

## guitar-edu-ui_01_18_26_20.zip (2026-01-18 • build 20)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## 2026-01-18
- Bonus phase now exists as a distinct, visible phase (BONUS) triggered when a player earns connect score or mints tokens.
- Added dev control to force BONUS phase.
- Added bonus banner UI and timer-driven END_BONUS handoff into intermission/next turn.
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
```

## guitar-edu-ui_01_18_26_21.zip (2026-01-18 • build 21)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## 2026-01-18
- Checklist audit pass: verified and marked complete:
  - Core flow: **GEG-001..004** (Ready→Start gating, intermission, bonus).
  - Connect-4 scoring/tokens/steals: **GEG-010..016**.
  - Utility basics: **GEG-080..082**.
- Bonus phase now exists as a distinct, visible phase (BONUS) triggered when a player earns connect score or mints tokens.
- Added dev control to force BONUS phase.
- Added bonus banner UI and timer-driven END_BONUS handoff into intermission/next turn.
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
```

## guitar-edu-ui_01_18_26_22.zip (2026-01-18 • build 22)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## 2026-01-18
- Checklist audit pass: verified and marked complete:
  - Core flow: **GEG-001..004** (Ready→Start gating, intermission, bonus).
  - Connect-4 scoring/tokens/steals: **GEG-010..016**.
  - Utility basics: **GEG-080..082**.
- Bonus phase now exists as a distinct, visible phase (BONUS) triggered when a player earns connect score or mints tokens.
- Added dev control to force BONUS phase.
- Added bonus banner UI and timer-driven END_BONUS handoff into intermission/next turn.
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
```

## guitar-edu-ui_01_18_26_23.zip (2026-01-18 • build 23)
- **Integrity:** instruction spine 1/5 • DOCS folder: yes • LOCK_IN_TABLES: no • conversation_composite: yes
- **Spine files:** CHECKLIST.md=yes, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):**

```text
# Changelog (project zips)
## Step 14.8 (GEG-B1 Vulnerability after misses)
- Added miss-streak tracking per prompt variant; after **3 consecutive misses** on the same prompt, one owned cell for that prompt becomes **vulnerable**.
- Vulnerable fret cells now **blink** (CSS animation) to reflect canon.
- Added `steal.vulnerableAfterMisses` to settings (default: 3).
- Appended CC-0009 and CC-0010 to `DOCS/conversation_composite.json`.
## Step 14.1 (Regression cleanup)
- Replaced fretboard SVG with `Guitar_FretBoard_Horizontal-Complete_v2i.svg` content (better aligned hitbox art).
- Restored Note Visibility selector to include **All** and set default to **All**.
- Restored controller defaults for `core.noteVisibility` to **all** (was regressed to naturals).
- Fixed minor indentation regression in controller settings change handler.
- Confirmed project zips must not include `node_modules/` or `dist/`.
## Step 14.2 (GEG-016 Starting tokens)
- Implemented UI coupling between Token Cap and Starting Tokens so Start is clamped to Cap in real time (Main Menu Settings).
- Marked **GEG-016** complete in CHECKLIST.md.
## Step 14.3 (GEG-020 Player card timer)
- Verified Player Card contains avatar, score, tokens, and turn timer display.
- Marked **GEG-020** complete in CHECKLIST.md.
```

## guitar-edu-ui_01_19_26_01.zip (2026-01-19 • build 1)
- **Integrity:** instruction spine 0/5 • DOCS folder: no • LOCK_IN_TABLES: no • conversation_composite: no
- **Spine files:** CHECKLIST.md=no, CANON_PROGRESS.md=no, DECISIONS_LOG.md=no, MATCH_SETTINGS_SPEC.md=no, THREAD_HANDOFF.md=no
- **CHANGELOG (head evidence):** *(not present in this archive)*
