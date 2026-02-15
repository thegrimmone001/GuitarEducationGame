# GLG Console Smoke Test Script (Manual + Expected Logs)
> Goal: quickly validate critical backend wiring using Dev tools + eventLog.
> Requirements: dev mode enabled; open browser console; keep eventLog visible.

## 0. Baseline
1) Load app
2) Confirm eventLog shows: `SYS eventLog:installed`

Expected:
- No red errors in console
- eventLog capacity installed

## 1. Match lifecycle
Action:
- Enter UI (Freeplay) → Start match → Stop → New → ExitToMenu

Expected logs (order may include UI lines):
- `ENGINE ENTER_UI`
- `ENGINE BEGIN_MATCH`
- `ENGINE INIT_MATCH`
- `ENGINE START_TURN`
- `ENGINE END_MATCH` (on stop)

FAIL indicators:
- START_TURN before INIT_MATCH
- Missing END_MATCH on stop

## 2. Phase forcing (dev only)
Action:
- Use dev buttons / hooks to force phases: IN_MATCH → LAST_CHANCE → RESULTS

Expected:
- `ENGINE DEV_FORCE_PHASE` entries
- No crash, no illegal state warnings

## 3. Fretboard registration quick check
Action:
- Click 6 distinct string/fret intersections (e.g., fret 0..5 same string)
- Resize window narrower and repeat clicks

Expected:
- UI gedu:fretPick logs correct fret numbers
- Markers appear centered on strings
- No drift after resize

## 4. Traditional mode enforcement (system setting)
Action:
- Enable Traditional Mode in system settings (if UI exists; otherwise set via stored settings)
- Start match

Expected:
- No timer countdown starts
- No scoring increments
- Validation feedback still occurs

## 5. MIDI attach/detach (if supported on platform)
Action:
- Enable MIDI → play a note → disable MIDI

Expected:
- `SYS midi:attach`
- Note events normalized to InputEvent path
- `SYS midi:detach`

## 6. Import policy (if import UI exists)
Action:
- Attempt import with enableImport=false

Expected:
- Import blocked with log: `SYS import:block` or equivalent
- No match started

## 7. Assignment bundle sanity (Phase L)
Action:
- Create minimal AssignmentDefinition JSON
- Call bundle validate/import helper (if exposed) OR just ensure storage helpers serialize deterministically

Expected:
- Stable checksum for same JSON
- Bad checksum rejected

## Capture for failures
- Copy console error stack
- Copy last 30 eventLog lines
- Screenshot UI state
