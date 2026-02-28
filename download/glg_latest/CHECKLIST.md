# Guitar Education Game — Checklist (Playability First)

> Purpose: Single source of truth for remaining work items before “prototype complete + polish.”  
> Scope: Based on project chats + the provided prototypes/zips in this project thread.  
> Last updated: 2026-01-16

**Canon progress marker:** `CANON_PROGRESS.md` (keeps the repo aligned to the master DOCX checklist).

## Task ID policy

- GEG IDs are **stable reference keys**, not a continuous sequence.
- Any GEG-### not present in this checklist is **unassigned** unless explicitly marked **Retired**.
- Gap handling: If a referenced GEG-### is not present in this checklist, treat it as **unassigned** (non-canonical) unless explicitly added here.

### Recent updates (2026-01-10)
- Implemented **Surface Input Matrix** gating for Fretboard/Staff/TAB visibility and input eligibility in `src/app/gameController.ts`.
- Completed the Staff+TAB overlay refactor and wired composite submission across enabled answer surfaces.
- Fixed phase constant mismatch that prevented correct in-match gating (`in_match` → `IN_MATCH`).
- Added a multiplayer **Intermission overlay** (phase UI + countdown + tap-to-start-early) and wired auto-transition to the next turn.

---

## How to use
- Check items as they are **implemented and verified in the running build**.
- Prefer adding acceptance notes and links to commits/issues next to each item.
- Avoid feature creep: get **playable first**, then **polish**.

## Language definitions
- **MUST**: hard requirement for checklist completion.
- **SHOULD**: required unless explicitly overridden by a dated canon decision in `DECISIONS_LOG.md`.
- **MAY**: optional; never blocks checklist completion.

## Terminology alignment
- “Start Screen”, “Start Menu”, and “Main Menu” refer to the same **initialization area** where match settings are chosen before a match is engaged.

---

## A) Core gameplay flow
- [x] **GEG-001** Engage / **End** / New correctly control a single match instance (End truly terminates the match state).
- [ ] **GEG-002** Turn loop fully wired: turn start → input → end turn → scoring → (bonus phase if **enabled and triggered**) → next player.
  - Note: Match Options `rules.timer = "off"` now disables multiplayer auto-timeouts (turnSec/intermissionSec set to 0; controller does not schedule TIMEOUT).
  - Note: Added ROUND_COMPLETE + LAST_CHANCE_STARTED alerts/logging in controller; requires runtime verification.
- [x] **GEG-003** Intermission phase displays and transitions correctly (multiplayer).
- [ ] **GEG-004** Bonus phase reliably reachable and visible (including via dev tools).
- [ ] **GEG-005** Multiplayer player roster UI: show player count, editable player names, add/remove players with controls (future: link to accounts).

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
- [ ] **GEG-021** Multiplayer player setup: show player count, editable player names, and a visual add/remove list for player slots (future: link to accounts).
- [x] **GEG-021** Multiplayer player roster UI:
  - Show current player count.
  - Provide an **add/remove** control that adjusts player count deterministically.
  - Provide a visible list of player slots (P1..Pn) with editable **player names**.
  - Player names must be applied to the engine `players[]` at match initialization. (Implemented: Start Menu roster sets `window.__GEDU_PLAYER_NAMES__`.)
  - Roster UI is local-only (no accounts required yet).
- [ ] **GEG-021a** (Deferred) Account linking hook: roster slots must be compatible with later account selection/import, but no account system is required for completion of GEG-021.
- [ ] **GEG-022** In-match leaderboard shows **active players only** (no empty slots).
- [ ] **GEG-023** Add **persistent High Score Board** (saved across sessions; local storage acceptable for now) and render it in Utility area.

---

## D) Modes (locked specification)
- [ ] **GEG-030** Surface Control System replaces rigid “Mode 1–5” selection.
  - Game behavior is defined by per-surface **Prompt / Mark / Display / SAM** settings.
  - Presets may bundle these settings for quick selection.

- [ ] **GEG-031** Active Surface Matrix governs both rendering and allowed input per surface.
  - Source of truth is derived from Surface Controls and the selected Preset.
  - _Implementation note:_ Per-surface gating is defined by the **Surface Input Matrix** (`getSurfaceMatrix` in `src/app/gameController.ts`).

- [ ] **GEG-032** Surface independence is the default.
  - Any mirroring/coupling behavior must be explicitly defined by Surface Control rules or Preset configuration.

- [ ] **GEG-033** Surface Control System is the primary configuration mechanism.
  - Legacy mode abstractions are deprecated and must not be referenced in runtime logic.
  - Surfaces: Staff / Tab / Fretboard / Note Rail
  - Roles: Prompt / Mark / Display / SAM (and any required gating)
  - Per-role cardinality where applicable: Off / Single / Equivalents / All

- [ ] **GEG-034** Presets A–J define bundled Surface Control configurations.
  - Presets must be overridable at the per-surface level without mutating the preset definition.

- [ ] **GEG-035** Match configuration is finalized at engage/start.
  - Start-of-session configuration includes: Game Mode, Learning Type, Musical Context, Instrument, Tuning, Fretboard Controls, Match Rules, Surface Controls.
  - System-level menus remain accessible only where explicitly allowed by canon.

- [ ] **GEG-036** All surface input gating must key exclusively off Prompt / Mark / Display / SAM roles.
  - Legacy asked/answered/view terminology must not be used.

---

## E) Fretboard controls + display system
- [ ] **GEG-040** Learning difficulty: show **all** labels AND still fully playable (simulate gameplay: claim/highlight, trigger sequences, earn tokens).
- [ ] **GEG-041** SAM options: `single` and `multiple`.
  - Single: show one “best/closest” correct location
  - Multiple: show all correct locations
- [ ] **GEG-042** Default fret range: **min 0, max 12, visible 12 frets**.
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

- [ ] GEG-116 Right-click Answer Shortcut Menu (surface-aware, context-gated; submits through unified input pipeline).
- [ ] **GEG-050** Staff hover highlight + click placement aligned to staff lines/spaces.
- [ ] **GEG-051** Tab hover highlight + click placement aligned to tab lines + measure divisions.
- [ ] **GEG-051a** Staff + Tab share a single **subdivision timeline**:
  - Visible subdivision grid (future-proof for smaller divisions)
  - Placements snap to the same column centers in both systems
  - Hover clearly indicates the active subdivision across both staff + tab
- [ ] **GEG-052** TAB mode behavior: player can **select string then input fret** OR **input fret then select string**.
  - Note (code): TAB entry supports selecting **string+column** on the TAB grid and **fret** via keypad in either order, with controller-owned marks.
  - _Implemented in controller (composite pipeline); needs runtime verification._
- [ ] **GEG-053** Keypad accepts only **0–24** (reject 25+).
  - Current direction: use a **25-key (5×5) instant keypad** (no Enter/Del/Clear).
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
  - 25-key (5×5) keypad with **0–24 only**
  - Instant selection behavior (no Enter/Del/Clear)
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

  _Implementation note:_ Dev/Test currently includes End Turn (TIMEOUT), Prev/Next Player, Clear Board, Force In-Match / Last Chance / Results, plus Paint/Erase mode.

---

## K) Assets + hitboxes (alignment correctness)
- [ ] **GEG-100** Update fretboard background image and re-align hitboxes precisely.
- [ ] **GEG-101** Update staff + tablature background and re-align hitboxes precisely.
- [ ] **GEG-102** Confirm hover highlight + click zones align to the new art at different viewport sizes.

  _Implementation note:_ Asset loading/rendering issues were fixed by (1) ensuring `loadSvgIntoHost` is called with relative asset paths (it already applies `assetUrl` internally), and (2) adding `Guitar_FretBoard_Horizontal-NoNotes.svg` to the `public/` folder so Medium/Hard can start with a blank fretboard.

---

## L) Removals / cleanup (locked)
- [ ] **GEG-110** Remove legacy/superseded item: **GEG-021** (no longer relevant).
- [ ] **GEG-111** Stop button label is **End** (ends the game instance).
- [ ] **GEG-112** Accidentals controls are present in Match Controls UI and staff accidental behavior is preserved (staff adheres to standard notation rules; other surfaces remain flexible).
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