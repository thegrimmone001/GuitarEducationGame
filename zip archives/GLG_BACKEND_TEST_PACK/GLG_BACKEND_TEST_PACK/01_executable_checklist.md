# GLG Backend Test Checklist (Executable)
> Scope: Engine + system logic (no CSS/layout). Derived from current canon: didactic fretboard, Phase I (System), Phase J/K/L.
>
> How to use: run through in order; record PASS/FAIL + notes. If FAIL, capture eventLog excerpt and steps.

## A. Engine Core & State Integrity
- [ ] A1. ENTER_UI → BEGIN_MATCH → INIT_MATCH → START_TURN → END_MATCH (no illegal transitions)
- [ ] A2. DEV_FORCE_PHASE only works in dev mode; illegal phase jumps are rejected
- [ ] A3. END_MATCH persists session artifact and clears transient match state

## B. Validation Pipeline (D1–D3)
- [ ] B1. Correct pitch/position returns CORRECT
- [ ] B2. Wrong pitch class returns INCORRECT (not OUT_OF_SCOPE)
- [ ] B3. Wrong octave returns INCORRECT (or WRONG_OCTAVE classification if present)
- [ ] B4. Enharmonic policy respected (strict vs relaxed, if implemented)
- [ ] B5. Out-of-domain notes return OUT_OF_SCOPE (never crash)
- [ ] B6. Traditional Mode ON bypasses scoring/timers/bonuses/steal (validation still runs)

## C. Fretboard Geometry & Registration (Didactic Model)
- [ ] C1. Uniform fret spacing across frets (no logarithmic compression)
- [ ] C2. Notes rendered centered on (stringY, fretX+fretWidth/2)
- [ ] C3. Hover highlight aligns with click zones at multiple viewport sizes
- [ ] C4. After resize: click zones, highlights, and markers remain aligned (no drift)
- [ ] C5. Neck still reads as guitar neck (taper + nut cue + string hierarchy visible)

## D. System Settings Enforcement (Phase I)
### D1 MIDI
- [ ] D1.1 Enable MIDI attaches listeners; disable detaches listeners
- [ ] D1.2 Device disconnect does not crash; logs warning; input falls back to mouse/touch
- [ ] D1.3 MIDI events normalize to InputEvent and follow same validation path

### D2 File Import
- [ ] D2.1 enableImport=false blocks import
- [ ] D2.2 strictValidation=true rejects malformed MusicXML cleanly
- [ ] D2.3 Note ties preserved (always) on MusicXML import
- [ ] D2.4 Import never starts a match; produces external artifact only

### D3 Role Controls
- [ ] D3.1 role=student + lockSystemSettings blocks system writes
- [ ] D3.2 lockAdvancedMenus blocks advanced edits
- [ ] D3.3 lockMatchSettings blocks timer/difficulty/domain edits
- [ ] D3.4 Blocks produce logs; no partial mutation occurs

### D4 Defaults (GameModeSystemSettings)
- [ ] D4.1 Defaults apply only at INIT_MATCH for next match
- [ ] D4.2 Defaults do not overwrite explicit match settings

## E. Traditional Mode (Phase I4)
- [ ] E1. enableTraditionalMode=true disables scoring/timers/bonuses/steal
- [ ] E2. Notation integrity preserved (ties/durations where applicable)
- [ ] E3. Playback allowed/blocked per system setting

## F. Assessment & Mastery UX (Phase J)
- [ ] F1. AssessmentSummaryView totals and rates compute correctly from session
- [ ] F2. MasteryDashboardView groups by concept buckets (pitch/interval/scale/chord)
- [ ] F3. Export JSON produces deterministic content for same session
- [ ] F4. Export CSV contains required columns and consistent ordering

## G. Adaptive Generation (Phase K)
- [ ] G1. Same seed + mastery snapshot → same target selection
- [ ] G2. Weak/unseen concepts are weighted higher; mastered decay out
- [ ] G3. Teacher caps enforced (difficulty, fret range, accidentals)
- [ ] G4. Explainability report generated and references reasons

## H. Teacher Workflows (Phase L)
- [ ] H1. AssignmentDefinition serializes deterministically (stable stringify)
- [ ] H2. Bundle export produces manifest + checksums
- [ ] H3. Bundle import rejects bad checksum / missing file (no partial import)
- [ ] H4. Student intake enforces assignment locks (read-only, locked settings)
- [ ] H5. Result packet export includes assignmentId/sessionId and is auditable
- [ ] H6. Mastery merge is explicit; no silent merge

## I. Persistence & Recovery
- [ ] I1. Refresh/reopen retains SystemSettings + RoleSettings
- [ ] I2. Imported external artifacts remain read-only after reload
- [ ] I3. No corrupted state after interrupted session

## Run Log
Record here:
- Build:
- Date:
- Tester:
- PASS count:
- FAIL count:
- Notes:
