# Guitar Education Game — Checklist (Playability First)

> Purpose: Single source of truth for remaining work items before “prototype complete + polish.”  
> Scope: Based on project chats + the provided prototypes/zips in this project thread.  
> Last updated: 2025-12-26

---

## How to use
- Check items as they are **implemented and verified in the running build**.
- Prefer adding acceptance notes and links to commits/issues next to each item.
- Avoid feature creep: get **playable first**, then **polish**.

---

## A) Core gameplay flow
- [ ] **GEG-001** Start / Pause / **End** / New correctly control a single match instance (End truly terminates the match state).
- [ ] **GEG-002** Turn loop fully wired: turn start → input → end turn → scoring → (bonus phase if triggered) → next player.
- [ ] **GEG-003** Intermission phase displays and transitions correctly (multiplayer).
- [ ] **GEG-004** Bonus phase reliably reachable and visible (including via dev tools).

---

## B) Sequences (Connect-4 mechanics) + scoring + tokens + steals
- [ ] **GEG-010** Sequence detection in 4 directions: horizontal, vertical, diagonal up, diagonal down.
- [ ] **GEG-011** Segment scoring matches canon (4+ run):
  - +25 when a new segment first reaches 4
  - +2 per additional extension beyond what was previously counted
- [ ] **GEG-012** Token awarding matches canon: **1 token per NEW segment** (not per note, not per extension).
- [ ] **GEG-013** Steal token spend + resolution works (ownership updates + scoring side-effects where applicable).
- [ ] **GEG-014** Last-chance phase works: steals/tokens-only behavior and clean end conditions.
- [ ] **GEG-015** Main Menu Settings: **Token cap** adjustable.
- [ ] **GEG-016** Main Menu Settings: **Starting tokens** adjustable (supports gameplay variants).

---

## C) Players, timers, and leaderboards
- [ ] **GEG-020** Player card includes: avatar, score, tokens, **timer** (turn timer) to save UI space.
- [ ] **GEG-022** In-match leaderboard shows **active players only** (no empty slots).
- [ ] **GEG-023** Add **persistent High Score Board** (saved across sessions; local storage acceptable for now) and render it in Utility area.

---

## D) Modes (locked specification)
- [ ] **GEG-030** Implement Mode selector with the following behavior:
  - Mode 1: Fretboard only
  - Mode 2: Fretboard + Staff
  - Mode 3: Fretboard + Tab
  - Mode 4: Fretboard + Staff + Tab
  - Mode 5: Staff + Tab
- [ ] **GEG-031** Modes control both **rendering** and **allowed input surfaces**.
- [ ] **GEG-032** Input surfaces independent by default. **Learning difficulty** mirrors by default (see F).

---

## E) Fretboard controls + display system
- [ ] **GEG-040** Learning difficulty: show **all** labels AND still fully playable (simulate gameplay: claim/highlight, trigger sequences, earn tokens).
- [ ] **GEG-041** SAM options: `single` and `multiple`.
  - Single: show one “best/closest” correct location
  - Multiple: show all correct locations
- [ ] **GEG-042** Default fret range: **min 1, max 12, visible 12 frets**.
- [ ] **GEG-043** Note visibility modes everywhere: **All / Naturals / Enharmonic** (rail + fretboard reflect choice).
- [ ] **GEG-044** Highlighting system supports:
  - 7ths
  - Extended chord tones: **9ths / 11ths / 13ths**
- [ ] **GEG-045** Note display options (global, consistent across UI):
  - Note Names
  - Numbers (context-driven)
  - Intervals (scale/key/mode dependent)
  - Interval Roman numerals (custom style)

---

## F) Staff + Tab input behavior, mirroring, and multi-answer support
- [ ] **GEG-050** Staff hover highlight + click placement aligned to staff lines/spaces.
- [ ] **GEG-051** Tab hover highlight + click placement aligned to tab lines + measure divisions.
- [ ] **GEG-052** TAB mode behavior: player can **select string then input fret** OR **input fret then select string**.
- [ ] **GEG-053** 10-key accepts only **0–24** (reject 25+). Multi-digit entry supported (10–24).
- [ ] **GEG-054** “Multiple valid answers” handled cleanly:
  - Fretboard: same pitch at multiple locations
  - Enharmonics: multiple spellings depending on settings/context
- [ ] **GEG-055** Mirroring behavior options:
  - Default: mirrored notes are **placed** (not ghost-only)
  - Learning: inputs in one place trigger the others to show/appear (default placed; hint-only modes later)

---

## G) Note rail (compass strip) requirements
- [ ] **GEG-060** Current note centered; two-octave span; “endless loop” illusion.
- [ ] **GEG-061** Chromatic uses rotating rail; scales/keys/chords use fixed reference rail.
- [ ] **GEG-062** Rail labels never overflow a cell (sharps/flats stay within the note cell region).
- [ ] **GEG-063** Rail is clickable (acts like a button/input surface):
  - Hover highlight + pressed state + selected state
  - Click selects note/interval according to current display settings
- [ ] **GEG-064** Rail selection integrates into the unified input pipeline (per-mode and per-settings behavior).

---

## H) Interval Roman + tritone system (custom)
- [ ] **GEG-070** Interval Roman display format: `I ii II iii III IV ...`
- [ ] **GEG-071** Tritone: make **all options available**:
  - TT
  - +/o (default for Interval Roman)
  - #IV / ♭V
  - +IV / oV
  - Auto (context)
- [ ] **GEG-072** Tritone spelling resolved by **scale/mode/key context** where applicable (some scales imply #IV, others ♭V).

---

## I) Utility area (tabs and controls)
> Utility tab labels are locked: **Num / Note / Chord / Scale**

- [ ] **GEG-080** Utility tabs exist and match labels: Num / Note / Chord / Scale.
- [ ] **GEG-081** Num tab:
  - 10-key 0–24 only
  - Clear/Enter behavior defined and consistent
- [ ] **GEG-082** Note tab:
  - Display format (Names / Numbers / Intervals / Interval Roman)
  - Note visibility (All / Naturals / Enharmonic)
  - Tritone label options (see H)
- [ ] **GEG-083** Chord tab:
  - Chord menus and view options
  - Extended chord highlighting toggles (7/9/11/13)
  - Diagram display toggles (CAGED, etc.)
- [ ] **GEG-084** Scale tab:
  - Scale/mode selection and view options
  - Degree/interval display behavior

---

## J) Dev/Test mode
- [ ] **GEG-090** Dev/Test Mode toggle in Main Menu Settings works.
- [ ] **GEG-091** When Dev/Test is enabled, show dev options inside the Utility/Misc area (per spec).
- [ ] **GEG-092** Dev tools allow:
  - Force phase (bonus / last-chance / etc.)
  - Switch active player instantly
  - Inject prompts/notes
  - Paint/erase claims (for rapid testing)

---

## K) Assets + hitboxes (alignment correctness)
- [ ] **GEG-100** Update fretboard background image and re-align hitboxes precisely.
- [ ] **GEG-101** Update staff + tablature background and re-align hitboxes precisely.
- [ ] **GEG-102** Confirm hover highlight + click zones align to the new art at different viewport sizes.

---

## L) Removals / cleanup (locked)
- [ ] **GEG-110** Remove legacy/superseded item: **GEG-021** (no longer relevant).
- [ ] **GEG-111** Stop button label is **End** (ends the game instance).
- [ ] **GEG-112** Accidentals fully removed: not visible, not clickable.
- [ ] **GEG-113** Remove “Unlimited Misses” and “No Hints” from play style options (per project direction).

---

## M) Polish (do after prototype is fully playable)
- [ ] **GEG-200** Readability/contrast pass across menus and tabs.
- [ ] **GEG-201** Button/tab state styling consistency (selected vs disabled vs hover).
- [ ] **GEG-202** Spacing/alignment final pass: staff/tab, rail, fretboard, utility panels.

---

## Notes / Decisions log
- Learning difficulty: show all note labels + still playable.
- Input independence by default; Learning mirrors by default; mirroring options later.
- TAB: string→fret OR fret→string.
- Fret range default: 1–12, show 12.
- Utility labels: Num/Note/Chord/Scale.
- Tritone must support TT and +/o and sharp/flat spellings with context selection.
