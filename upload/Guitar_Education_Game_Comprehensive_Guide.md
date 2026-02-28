Comprehensive Build Guide and Canon Specification\
Merged Source Documents + Canon Addenda

Build-reference document \| Generated: 2026-01-07\
File naming convention: guitar-edu-ui_MM_DD_YY_XX

# Table of Contents

Note: Insert an automatic Table of Contents in Word (References → Table
of Contents).

# Canon Overview and Constraints

This document is the authoritative engineering and design reference for
the Guitar Education Game. It defines finalized intent, locks
constraints, and enumerates what must be implemented without
reinterpretation. Any feature not documented here must be treated as a
proposal until explicitly approved and added to canon.

# Canon Addendum A

Design Clarifications, Definitions, and Expansions (Derived from
Consolidation Review Session)

Canon Addendum\
Design Clarifications, Definitions, and Expansions

(Derived from Consolidation Review Session)

1\. Core Direction (Affirmed)

\- The Core Vision and Purpose section is considered complete and
approved.\
- The project remains:\
- Education-first\
- Accuracy-driven\
- Non-inventive with respect to music theory, notation, and engraving\
- Any future additions must extend, not reinterpret, existing
definitions.

2\. High-Level Architecture -- Clarification

2.1 Session Types -- Single-Player Mode (Clarified)

\- Single-Player Mode is explicitly time-based\
- The objective is completion time\
- No competitive scoring mechanics required\
- No bonus reinforcement system is necessary\
- Timers are not optional flavor, but the core success metric

Education vs Exploration

\- Education Mode and Exploration Mode are:\
- Non-competitive\
- Non-scored\
- Pressure-free\
- Education Mode may be used by:\
- Instructors\
- Students\
- Self-guided learners\
- Exploration Mode exists purely for:\
- Free interaction\
- Visual understanding\
- Pattern discovery

3\. Representation Systems -- Major Clarifications

3.1 Fretboard Rendering

\- Once the fretboard is fully rendered (non-SVG):\
- It must not default to showing all 24 frets\
- Only the active or instructional range should be visible\
- Purpose:\
- Reduce visual overload\
- Improve learning focus\
- Maximize staff and tab space

3.2 Music Staff (Critical Canon Rule)

\- The music staff must behave identically to real sheet music.\
- Requirements:\
- Correct clef generation per instrument:\
- Treble\
- Bass\
- Instrument-specific clefs as required\
- Proper rendering of:\
- Key signatures (sharps/flats)\
- Time signatures\
- Ledger lines (above/below staff)\
- Ledger lines must never bleed into tablature\
- Staff spacing must allow:\
- Whole to 32nd notes\
- Triplets\
- Beaming\
- Rests\
- Notes must occupy correct rhythmic positions, not fixed vertical
slots\
- Design Principle:\
- If handed a printed score, the app should look identical.

3.3 Tablature

\- Tab and staff are separate rendering systems\
- Tab uses:\
- Strings\
- Numbers (not dots)\
- Alignment between staff and tab is rhythmic, not visual guesswork\
- Input interaction:\
- No selection boxes\
- Notes are selected by direct highlighting\
- String specificity must be explicit

4\. Note and Theory Display Rules -- Expanded

4.1 Default Display Priority

\- Note Names (default)\
- Contextual overlays:\
- Intervals (chords)\
- Scale degrees (scales)\
- Roman Numeral Intervals

4.2 Roman Numeral Interval System (Canon Name Locked)

Official Name:\
- Roman Numeral Interval System (Short: Roman Numeral Interval)

Key Properties:\
- Context-aware\
- Not a single fixed interpretation\
- Must support:\
- Functional harmony\
- Interval representation\
- Scale-degree logic

Diminished and Augmented Handling:\
- Default: text-based (dim, aug)\
- Symbol-based (°, +) allowed as an advanced toggle\
- Text form is the educational default

Sevenths:\
- Standard notation first (V7, maj7, min7)\
- Advanced variants selectable

Major vs Minor Context Awareness:\
- Relative major/minor overlap must be explainable\
- The system must support:\
- Keeping Roman numerals aligned OR re-mapping to reflect harmonic
function\
- UI must help learners see:\
- Similarities\
- Differences\
- Structural overlap

4.3 Note Visibility Modes (Expanded)

Available modes:\
- All Notes\
- Naturals Only\
- Enharmonic (both)\
- Key / Scale Dependent (new)

Additionally:\
- Default key selection must include None\
- C is no longer mandatory as a default anchor

5\. RAIL System -- Expanded Purpose

\- The RAIL is not only a display.\
- It may function as:\
- A visual reference\
- An input interface\
- Supported modes:\
- Note names\
- Intervals\
- Scale degrees\
- Roman Numeral Intervals\
- Plain numeric indexing (0--24)

6\. Game Modes -- Structural Expansion

Mode Directionality:\
- For all applicable modes, input order must be configurable:\
- Fretboard to Staff\
- Staff to Fretboard\
- Tab to Others\
- Randomized

Mode Categories (Clarified):\
Primary gameplay selection:\
- Single Note\
- Chord\
- Scale\
- Arpeggio

These are not separate games, but content modes layered onto the main
game modes.

7\. Scoring, Tokens, Territory -- Multiplayer Only

7.1 Territory Rules (Affirmed)

\- Once captured:\
- A space cannot be re-captured\
- No re-bonusing allowed\
- Re-availability of notes may:\
- Break existing connections\
- Never regenerate prior bonuses

7.2 Connect-Style Bonus System (Expanded)\
- To be documented explicitly:\
- Enharmonic spaces count as:\
- Two independent values OR one shared territory\
- Shape recognition (future-defined):\
- Lines\
- Boxes\
- Filled areas\
- Other geometric patterns (TBD)

7.4 Endgame / Blackout State (New Canon)

\- Trigger: full board\
- All players receive one final turn\
- Triggering player:\
- Goes last\
- Plays until a miss\
- Bonus use allowed during final turn\
- No new territory scoring after blackout

8\. Education Mode / Instructor Tool -- Clarified

\- Explicitly not gameplay\
- Supports:\
- Single notes\
- Chunks (chords, scales, arpeggios)\
- Pattern placement\
- Libraries feed directly into placement\
- Menus must be:\
- Flexible\
- Intuitive\
- Context-aware

9\. Libraries -- Minor Expansion

\- Libraries are informational first\
- Must clearly define:\
- Viewing\
- Selection\
- Placement behavior\
- Arpeggios must be added everywhere chords/scales exist

10--11. Difficulty and UI/UX

\- Difficulty section accepted as complete\
- UI/UX needs new dedicated breakdown:\
- Operations menu\
- Game mode options\
- Play style options\
- Core vs Main Menu settings\
- Highlight settings\
- Preferences\
- Fretboard controls\
- Utility panels\
- Achievements\
- Leaderboards\
- Footer alerts and notifications

12\. Engineering and Discipline Rules -- Expanded Intent

\- Existing rules are correct but require reinforcement language:\
- No invention without documentation\
- Any proposed invention:\
- Must be submitted as a suggestion\
- Must be confirmed before implementation\
- Rendering accuracy is non-negotiable\
- Dev/Test mode must simulate every phase\
- Features must map to defined states

13\. Explicitly Parked / Future Features -- Expanded

\- Guitar Pro file import\
- MusicXML interoperability\
- Song-based lessons\
- External repository compatibility\
- Analytical overlays (future toolset)\
- Circle of Fifths\
- Circle of Thirds

14\. Strategic Priority -- Reinforced

Order of execution is locked:\
- Definitions\
- Notation stabilization\
- Education tools\
- Only then advanced gameplay\
- No exceptions.

15\. Rendering & Implementation Strategy -- Clarified

\- Target: MusicXML-grade engraving\
- No simplified notation mode\
- Rendering system may be hybrid:\
- Generative (preferred)\
- SVG for ornamental inlays when required

16\. Bonus State -- Canon Definition

\- Bonus states do not exist in single-player\
- Bonus states trigger when:\
- Recognizable musical structures are completed\
- Bonus scoring requires:\
- Notes must already exist on board\
- Correct identification\
- Correct selection from menus

17\. Multi-Input Accuracy Rule (Critical)

\- In modes with multiple representations:\
- ALL inputs must be correct\
- Partial correctness = fail\
- Applies to:\
- Staff\
- Tab\
- Fretboard

Status:\
- This addendum resolves all ambiguity raised in the session.\
- It introduces no new mechanics.\
- It locks intent and future constraints.\
- It is suitable for engineering reference, design validation, and canon
enforcement.

# Canon Addendum B

Canon Specification Addendum --- Sections 6, 7, 10, and 11 (Conversation
Consolidation & Ambiguity Resolution)

Guitar Education Game\
Canon Specification Addendum --- Sections 6, 7, 10, and 11

(Conversation Consolidation & Ambiguity Resolution)

1\. Token System (Multiplayer Only)

1.1 Token Award Rule\
- Tokens are awarded whenever a unique segment is completed.\
- Segment type is irrelevant:\
- Chords\
- Scales\
- Arpeggios\
- Tokens are awarded immediately upon segment completion, not during
bonus resolution.\
- Difficulty does not affect token earning.\
- Tokens do not exist in single-player.

1.2 Segment Definition\
- A segment is considered unique when it has not been previously
completed in the current round.\
- Reclaiming or stealing a segment does not generate additional tokens.

2\. Bonus Phase System

2.1 Bonus Phase Availability\
- Multiplayer: Enabled by default, toggleable in settings.\
- Single-Player: Bonus phase is disabled entirely (non-applicable).

2.2 Bonus Phase Trigger\
- Bonus phase triggers only at the end of a turn, before player
rotation.\
- Trigger condition:\
- At least one qualifying structure (Chord, Scale, or Arpeggio) was
completed during the turn.

3\. Qualification Thresholds (Bonus Eligibility)

3.1 Chords\
- Minimum three notes.\
- Must meet harmonic quality:\
- Root + Third + Fifth\
- Extensions (7ths, 9ths, 11ths, 13ths) may qualify additionally.\
- Partial chords do not qualify.

3.2 Arpeggios\
- Must represent a complete chord shape.\
- Minimum three notes.\
- Maximum constrained by instrument (up to six strings).\
- Treated as chord-derived structures.

3.3 Scales\
- Must span Root to Octave (Root).\
- Partial scale fragments do not qualify.

4\. Dual-Board Architecture

4.1 Main Gameplay Board\
- Shared by all players.\
- Persistent during the round.\
- Tracks:\
- Ownership\
- Vulnerability\
- Stealing\
- Locked segments\
- Locks prevent re-scoring only, not interaction.

4.2 Bonus Phase Board\
- Temporary, isolated board state.\
- Exists only during bonus phase.\
- Highlighting does not claim ownership.\
- Board resets completely after bonus phase ends.

5\. Bonus Phase Claim & Clear Rule\
- During bonus mode, when a player:\
- Highlights a valid structure,\
- Correctly identifies and confirms it,\
- All notes comprising that structure are immediately removed from the
bonus board.

Effects:\
- Prevents repeated identification of the same material.\
- Reduces visual clutter.\
- Creates a progressively simplifying puzzle space.

Applies only to the bonus board.\
Does not affect the main board.

6\. Locking Rules (Clarified)

6.1 Lock Behavior\
- Locks prevent re-scoring only.\
- Locked areas:\
- May still be selected\
- May be stolen\
- May be reclaimed later

6.2 Lock Scope\
- Locks persist only within the current bonus phase.\
- Locks do not persist across rounds, matches, or sessions.

7\. Stealing Mechanics

7.1 Stealable Conditions\
A note or segment becomes stealable when either condition is met:

Vulnerability Condition\
- Player misses sufficient turns.\
- Notes begin flashing.\
- Flashing indicates vulnerability and stealability.

Completion Condition\
- All instances of a note are discovered.\
- Note becomes stealable without flashing.\
- Breakable segments appear automatically.

8\. Instructor Mapping Authority (Section 7.2)

8.1 Mapping Modes\
Instructor selects mapping behavior explicitly:

\- Explicit (Manual) Mapping\
- No auto-mapping or highlighting.\
- Highest assessment precision.

\- Assisted Mapping (Highlight-Only)\
- System highlights valid equivalents.\
- No auto-population.

\- Auto-Population Mapping\
- System auto-populates selected domains:\
- Staff\
- Tab\
- Fretboard\
- Any combination

8.2 Multi-Position Handling\
Instructor chooses one:\
- Highlight all valid positions\
- Highlight best/closest\
- Auto-populate all\
- Require manual disambiguation

Students never control mapping logic.

9\. Staff Notation Policy

9.1 Engraving Standard\
Full, correct engraving is mandatory, including:\
- Proper clefs\
- Key signatures\
- Time signatures\
- Ledger lines\
- Accurate spacing\
- Correct stem direction

9.2 Rationale\
Reinforces real-world music literacy.\
Ensures consistency with:\
- Sheet music\
- Guitar Pro\
- Ultimate Guitar\
- Professional notation systems

10\. Staff Prompt to Fretboard Answer Policy (SAM)

10.1 Answer Acceptance Modes\
Controlled via SAM (Single / Any / Multiple) and difficulty:

\- Any Correct\
- Any valid position accepted.\
- Learning modes.

\- Best / Closest\
- System evaluates proximity to input.\
- Precision modes.

\- Designated Position\
- Only predefined location accepted.\
- Assessment and advanced play.

10.2 Visibility Controls\
- Show all answers\
- Show closest only\
- Show none until after response

Instructor and mode controlled.

11\. Analytics & Metadata

11.1 Persistence Layers\
- Local: Stored per user profile.\
- Exportable: CSV / JSON for instructors.\
- Server-Side (Future): Database-backed persistence.

11.2 Multiplayer Analytics\
- Aggregated per user profile, not per session.\
- Enables longitudinal tracking.

12\. Roman Numeral Interval System (Section 11 -- Canon)

12.1 Core Principles\
- Describes interval distance, not harmonic function.\
- Case indicates interval quality:\
- Uppercase = Major / Perfect\
- Lowercase = Minor\
- Accidentals modify numerals directly.

12.2 Dual Extension Representation (Critical)

Interval-Class View (Collapsed)\
- 9 -\> 2\
- 11 -\> 4\
- 13 -\> 6\
Used for:\
- Fretboard logic\
- Pattern recognition

Extension-Explicit View (Linear)\
- IX, XI, XIII, XV, etc.\
Used for:\
- Chord naming\
- Staff notation clarity

Both views reference the same pitch class.

12.3 Minor Key Handling\
- Only the tonic is inherently minor: i\
- Perfect intervals remain uppercase: IV, V\
- Chord quality is a separate layer.

13\. Bonus Mode --- Multi-Name Handling

13.1 Trigger\
If a claimed structure has multiple valid names:\
- Enharmonic\
- Extension-based\
- Alternate spellings

13.2 System Response\
- Indicates additional valid name exists (without revealing it).\
- Adds +1 second to bonus clock.\
- Player chooses:\
- Attempt one additional name\
- Skip and continue

13.3 Lockout\
After attempt or skip:\
- Position is locked from further naming attempts for that bonus phase.

14\. Design Intent Summary\
- Reward musical understanding, not rote guessing.\
- Preserve deterministic logic for engine implementation.\
- Ensure transferable literacy across staff, tab, and fretboard.\
- Prevent exploit loops and scoring inflation.\
- Maintain clarity across all modes and difficulties.

Status\
- All referenced ambiguities are resolved.\
- Remaining work is documentation formatting and implementation, not
design definition.

# Implementation Checklist Mapped to Canon

This checklist is strictly derived from the canon addenda above. It does
not introduce new mechanics; it translates locked intent into
build-verifiable items.

## Session Types and Success Metrics

-   Education Mode: non-scored, pressure-free, instructor or
    self-guided; supports placement, hide/show, and mapping authority.

-   Exploration Mode: non-scored, pressure-free free interaction and
    pattern discovery (distinct from gameplay).

-   Single-Player: time-based; completion time is the success metric; no
    bonus phase; no tokens.

-   Multiplayer: competitive; tokens and bonus phase enabled; territory
    and stealing apply.

## Rendering and Notation Accuracy (MusicXML-grade target)

-   Staff behaves identically to printed sheet music: clefs, key
    signatures, time signatures, rhythmic spacing, rests, beaming,
    ledger lines (never bleeding into TAB).

-   TAB renders strings + numbers (no dots), with rhythmic alignment to
    staff based on a shared timing grid.

-   Staff and TAB are separate rendering systems that align
    rhythmically, not by visual guesswork.

-   Fretboard rendering: SVG permitted for prototype; non-SVG final
    render must show only the active/instructional range (not default 24
    frets).

## Display Priority and Roman Numeral Interval System

-   Default primary display: Note Names.

-   Context overlays: Intervals for chords, scale degrees for scales,
    Roman Numeral Interval System for interval-based teaching.

-   Roman Numeral Interval System: context-aware; supports functional
    harmony, interval representation, and scale-degree logic; default
    text-based dim/aug; symbols as advanced toggle.

-   Dual extension representation: collapsed interval-class view (9→2,
    11→4, 13→6) and extension-explicit view (IX, XI, XIII, XV\...).

## Note Visibility and Key Context

-   Visibility modes: All Notes, Naturals Only, Enharmonic (both),
    Key/Scale Dependent.

-   Default key selection includes None (C is not mandatory).

## Mode Directionality

-   Input order must be configurable: Fretboard→Staff, Staff→Fretboard,
    TAB→Others, randomized.

## Multiplayer: Tokens, Segments, Bonus Phase, Territory

-   Tokens are multiplayer-only.

-   Tokens are awarded when a unique segment is completed; segment type
    irrelevant (chords/scales/arpeggios).

-   A segment is unique only if not previously completed in the current
    round; stealing/reclaiming does not award additional tokens.

-   Bonus phase: multiplayer enabled by default (toggleable); triggers
    at end of turn when at least one qualifying structure was completed;
    occurs before player rotation.

-   Qualification thresholds: chords (min 3 notes, R+3+5), arpeggios
    (complete chord-derived shape, 3--6 notes), scales (root to octave).

-   Dual-board architecture: main gameplay board persists; bonus board
    is temporary and resets after bonus; bonus highlighting does not
    claim ownership.

-   Bonus claim & clear: identified structure is removed from bonus
    board only; does not affect main board.

-   Locks prevent re-scoring only; locked areas remain
    interactive/stealable; locks persist only within current bonus
    phase.

-   Territory rule: once captured, a space cannot be re-captured; no
    re-bonusing; re-availability may break connections but never
    regenerates prior bonuses.

-   Endgame blackout: on full board, all players get one final turn;
    triggering player goes last and plays until miss; bonus use allowed;
    no new territory scoring after blackout.

## Instructor Mapping Authority

-   Mapping modes: Explicit Manual; Assisted Highlight-Only;
    Auto-Population to selected domains (staff/tab/fretboard).

-   Multi-position handling: highlight all valid; highlight
    best/closest; auto-populate all; require manual disambiguation.

-   Students never control mapping logic.

## SAM (Staff Prompt to Fretboard Answer Policy)

-   Acceptance modes: Any Correct; Best/Closest; Designated Position.

-   Visibility controls: show all answers; show closest only; show none
    until after response.

-   Controlled by SAM and difficulty; instructor and mode control where
    applicable.

## Multi-Input Accuracy Rule

-   When multiple representations are required, ALL inputs must be
    correct; partial correctness is failure (staff/tab/fretboard).

## Analytics and Metadata

-   Persistence layers: local per user; exportable CSV/JSON; server-side
    future.

-   Multiplayer analytics aggregated per user profile, not per session.

# Annex A --- Source Document 1 (Imported Text)

Original file: Guitar Education Game_details-1.docx

Guitar Education Game --- Master Checklist (current project truth)\
Status keys\
✅ Done / Implemented\
🛠 Needs completion (partially built, bugs, polish, missing wiring)\
🧩 Needs definition (rules/spec not fully locked)\
⏳ Pending (planned, not started)\
A) Layout + UI Structure\
A1. Page Layout / Grid\
✅ Header section: 3 columns; middle column split into 3 rows; bottom
row\
✅ Main gameplay section: 3 columns (L / M / R) with required row splits
(L=2 rows, M=3 rows, R=2 rows)\
✅ Footer section exists\
A2. Player Cards / Leaderboard\
🧩 Player card final spec variants:\
(avatar, score, name, tokens only) --- spec locked, but confirm
"timer-in-card" rule below\
Full card (avatar left, 10 bonus counters top-right, score below) ---
spec exists but may not be implemented\
🛠 "Timer inside player card to save space" (GEG-020) --- integrate and
verify layout does not break\
A3. Utility / Menus / Tabs\
🧩 Utility labels locked: Num / Note / Chord / Scale\
🛠 Utility area needs more coverage (Chord menu, Scales menu, diagram
view options, mode-specific input buttons)\
⏳ Tabbed calculator panel assets (10-key, 205×316) --- only if still
intended for current build path\
⏳ Misc Information panel (205×316) with chord diagrams/CAGED ---
planned UI asset block\
B) Fretboard + Interaction\
B1. Fret Range Controls\
✅ Neck supports frets 0--24\
✅ Display presets: 5 / 12 / 24\
✅ Active min/max range supported with dimming outside range\
✅ Default active range: min 1 / max 12 (GEG-042)\
B2. Fret Rail\
🧩 "Fret rail should be a place players can select notes (like a
button)" --- behavior rules needed (select = guess? select = filter?
select = input assist?)\
🛠 If present now, needs wiring to game logic per mode\
B3. Hitboxes / Fretboard Asset Swap\
🛠 Fretboard image update + hitbox alignment (you noted you attached a
file previously)\
🧩 Define authoritative coordinate system (percent-based grid vs px) so
updates don't keep breaking\
C) Note Display + Theory Labeling\
C1. Note Visibility (Accidental Rules)\
✅ Accidentals fully removed (not clickable, not visible) in the build
where this was enforced\
✅ Rail defaults to showing sharps + flats inside each note cell (no
overflow)\
🧩 Reconcile this with "accidentals removed" vs "show sharps and
flats":\
Needs a clean definition: are sharps/flats shown as part of the note
label (A#/Bb) while "accidental buttons" are removed? (likely yes)\
C2. Display Modes (what the player sees)\
🧩 Must support viewing notes as:\
Note names\
Numbers (degree)\
Intervals (scale/key/mode dependent)\
Roman numeral intervals (I, ii, II, iii, III...)\
🧩 "In some instances notes can show up with multiple options" --- rules
needed:\
Priority order\
Display stacking (primary/secondary)\
Context triggers (key vs chord vs chromatic)\
D) Game Modes + Settings Architecture\
D1. Main Menu Structure\
✅ First menu option should be: Single Note / Chords / Scales (drives
gameplay type)\
✅ Instruments / Visual Feedback / Difficulty moved out of first slot
(per your preference)\
✅ Audio Settings moved to Main Menu\
✅ Instrument tuning placed by Instrument selection\
✅ Fretboard Controls placed next to Instrument Controls\
✅ Remove redundant "Intervals" submenu (combined with Note
Names/Interval Names)\
✅ Add "Roman Numeral Interval" option under the combined item\
✅ Note Display toggle removed from submenu if already present in Core
Settings\
✅ Note Highlighting includes 7ths\
D2. Difficulty\
🧩 Difficulty tiers defined: Learning / Easy / Medium / Hard\
🧩 Need a final rule table for each tier:\
Label visibility timing\
Hint availability\
SAM behavior\
Mistake handling\
Score multipliers (if any)\
D3. SAM (Show After Miss)\
✅ SAM lives in Game Mode Options\
🧩 SAM options: "single" vs "multiple" needs strict definitions per
mode\
E) Generator / Rail System\
E1. Note Rail Behavior\
🧩 Rail should act like a 2-octave "compass/endless loop"\
🧩 Two paradigms must be supported:\
Rotate rail (chromatic/no key reference)\
Fixed rail (scales/keys/chords with stable tonic)\
🛠 Rail should be interactive "when needed" (mode-dependent); define
interactions:\
click to input?\
click to inspect?\
click to toggle display?\
E2. "Current Note Centered"\
🧩 Generator strip should keep current note centered and scroll/rotate
around it\
🛠 If partially built, needs alignment and animation polish\
F) Core Match Flow / Turn System\
F1. Turn Controls\
🛠 "Stop button should say End (end game instance)" --- implement
consistently\
🛠 Simplify Start/Stop/Pause/Reset region and move to correct layout
zone\
F2. Dev/Test Mode (critical for building)\
✅ Dev/Test mode should be enabled before match starts\
🛠 Dev mode currently appears in settings but "does not function" (per
your report)\
🛠 Needs phase simulation controls:\
advance turn\
switch player instantly\
force bonus phase\
inject notes / outcomes\
✅ Learning mode can still simulate normal gameplay and highlight notes
(GEG-040)\
G) Scoring, Tokens, Bonuses\
G1. Token Minting Logic\
🛠 "Still not giving tokens correctly" --- needs correction\
✅ Rule locked: tokens must come from individual segments, not just
points\
🧩 Need final definitions for:\
what counts as a "segment"\
when it mints (first-time only vs repeat)\
interaction with chords/scales modes later\
G2. Bonus Phase\
🛠 "Bonus phase not showing" and dev tools cannot test it --- needs
repair + test hooks\
🧩 Define exact triggers and UI state transitions:\
when bonus phase starts/ends\
what the player is allowed to do\
what is rewarded\
G3. Extended Connect / Shapes\
⏳ Extended chord bonuses (9ths, 11ths, 13ths) are planned for chord
content (GEG-044)\
🧩 Define how extended chord success affects:\
score\
multipliers\
tokens\
feedback display\
H) Chords / Scales / Learning Content\
H1. Chords Mode\
⏳ Add extended chord options (9/11/13 etc.) (GEG-044)\
🧩 Define voicing rules:\
multiple correct positions (accept any vs "best/closest")\
inversions allowed?\
string-count constraints\
H2. Scales Mode\
⏳ Scale systems and modes planned\
🧩 Needs spec for:\
root anchoring\
interval highlighting\
rail/fretboard synchronization\
I) Visual Feedback + Design Rules\
I1. Highlighting / Feedback\
✅ Note highlighting includes 7ths option\
🧩 Define consistent feedback language:\
correct / incorrect\
hint states\
"simulated" vs "scored" actions (learning/dev)\
🛠 Clean up stray/leftover UI artifacts (old panels, extra note above
staff, remnants seen when zoomed out)\
I2. Assets\
🛠 Missing assets issue noted (zip incomplete / not all assets present)\
🧩 Needs a single canonical asset manifest:\
filenames\
dimensions\
where used\
fallback behavior if missing\
J) Data / Persistence / Engineering Notes\
🧩 Define storage for:\
player score location (card vs global model)\
multipliers displayed next to score\
per-player tokens, per-turn flags\
🛠 Fix build errors like duplicate declarations (main.ts duplicate
symbols issue you encountered earlier)\
🧩 Establish project "engine entry point" (where the game loop begins)
since no obvious src tree existed in your packaging\
Quick totals (to guide next actions)\
✅ Done: layout framework, fret range defaults, menu architecture
decisions, key mode requirements, several UI rules\
🛠 Needs completion: dev mode functionality, token logic correctness,
bonus phase visibility/testing, asset/hitbox alignment, control panel
cleanup\
🧩 Needs definition: display-mode priority system, rail interactivity
rules, difficulty matrix, SAM formal behavior, segment definition for
token minting\
⏳ Pending: full chords/scales pipeline, extended chord support, full
chord/scale diagrams UI blocks\
If you want the most leverage next: we should lock the "Needs
definition" items into a one-page spec, because they directly control
how you code dev mode, token minting, and display behavior without
rework.

# Annex B --- Source Document 2 (Imported Text)

Original file: Guitar Education Game_details-2.docx

Conversation start date: December 20, 2025 (America/Denver)\
Detailed summary of what we defined and agreed on\
Overall goal\
Build a smartboard-friendly guitar education video game that runs in
browsers and on computers, supporting both touch and mouse input. The
game must be modular so it can expand from a note-finding game into
scale finding, chord finding, interval training, and eventually
song-oriented exercises.\
Core game structure\
Title/Splash Screen\
Player selects:\
Game mode (Mode 1--4 planned)\
Single-player or multiplayer\
Number of players (1--16)\
Settings (difficulty, timers, note pools, key/scale context, etc.)\
Settings must be accessible:\
On the title screen\
In-game\
Persistent leaderboards\
Leaderboards should persist locally (and later could be extended).\
Separate leaderboards by:\
Mode\
Single vs multiplayer\
Game Modes (as defined in the conversation)\
Mode 1 --- Fretboard note finding (primary mode implemented first)\
Random note generator can generate:\
Naturals\
Chromatic (including sharps/flats)\
Later: key/scale/chord/interval constrained pools\
Fretboard default view:\
Blank (no note dots or labels)\
Fret markers still visible\
Interaction:\
If correct note is selected → highlight in that player's color (with
accessibility support)\
If wrong or time runs out → turn passes to next player (multiplayer)\
If correct → timer resets, new prompt generates, player continues until
miss/time-out\
Mode 2 --- Staff mode (planned)\
Same "find the note" concept but using standard staff notation as the
primary representation.\
Mode 3 --- Tablature mode (redefined)\
Purpose: reinforce reading/writing tablature.\
Key clarified requirement:\
Strings should NOT be part of the 10-key.\
Player selects the string by clicking the correct line on the tab, then
enters the fret number (or vice versa).\
Use 8th-note-like spacing to place entries.\
When the staff/tab fills, it clears and restarts.\
Mode 4 --- Combination mode (planned)\
Combines multiple representations and settings:\
Fretboard\
Staff\
Tablature\
"Random" across representations\
Player may need to satisfy multiple representation checks before
advancing (as originally described).\
Scoring and progression\
Base scoring\
Base: 1 point per correct answer\
Streak multipliers\
3 correct in a row → x2\
6 correct → x3\
10 correct → x5\
20 correct → x10\
Multiplier display:\
Appears next to the player's score\
Large callouts:\
"3 in a row!"\
"6 in a row!"\
"Heating up"\
"Hot streak"\
"You're on FIRE!"\
Fire animation in scorecard background at high streak thresholds\
Turn stats to display\
Score\
Correct-in-a-row\
Wrong count\
Total tries\
Multiplier (active only while streak is alive)\
"Connect-4" territory logic (multiplayer layer for Mode 1 and later)\
Bonuses for connecting 4+ claimed notes:\
Horizontal, vertical, diagonal\
Scoring concept proposed:\
Base connection: extra points per dot (4 as base)\
Additional dots beyond 4: worth more (2 points per additional)\
Claimed groups cannot be reused for additional connect scoring (group
becomes "locked" / extra-highlighted).\
Connection scoring should apply at end of the turn:\
A player can extend a run across multiple picks in the same turn.\
Extending an existing run across different turns should not retrigger
scoring.\
"Blackout" match type\
Game ends when the board is filled according to what is "available":\
Chromatic = all notes\
Key/scale/interval = only notes allowed by the context\
Steal tokens and steal logic\
Tokens can be earned and banked.\
Steals can only happen when:\
A note is vulnerable/stealable\
AND it matches the currently generated prompt\
If a player attempts a steal and the note does not match the generated
prompt:\
Token is lost\
Turn ends\
Tokens may be unused if no steals are available.\
Token cap discussion:\
10 tokens may be excessive; cap should be adjustable.\
Vulnerable notes definition (agreed direction)\
Trigger condition proposed:\
If a player misses 3 turns in a row without scoring, notes become
vulnerable.\
Additional layer proposed:\
If all instances of a note become claimed, they may become available to
steal.\
Bonus for breaking connected groups\
If a steal breaks an already-locked connect group:\
Award a multiplier bump (or if already max, award 25 points)\
Enharmonics and split-circle rules (important clarifications)\
Enharmonics are distinct prompts and can be scored separately in
chromatic study:\
Example: F♯ and G♭ are different prompts\
Visual rule on the board:\
Split circle matches SVG orientation:\
Sharp side on the left\
Flat side on the right\
Ownership rule:\
Two different players may own two halves of the split circle.\
If one player owns both halves, render a double ring.\
Critical usability fix:\
Board taps must be full-size targets (sharps/flats cannot require
left/right precision).\
Split is for visual ownership, not for harder input.\
Difficulty modes (refined)\
Learning:\
Notes visible and labeled\
Easy:\
Naturals not visible, enharmonics visible (as previously proposed)\
Medium:\
Notes show when claimed\
Notes may briefly appear after claimed (configurable)\
Hard:\
Notes do not persist as labels when claimed\
Optional: notes may flash briefly after claim, but do not remain\
"Show after miss" not desired in hard mode\
"SAM" (Show After Miss / Show Answer Mapping)\
Off by default on Hard\
On for lower difficulties\
UI/UX direction (major decisions)\
Main UI layout concept (from your sketch)\
Top header area:\
Controls and context info grouped for clarity\
Middle:\
Staff/tab strip region (depending on mode)\
Bottom:\
Main board (fretboard in Mode 1, etc.)\
Right side:\
Player scorecards\
Game Controls area must include both:\
The buttons: Start / Stop / Pause / Reset\
The active context info:\
Key/scale\
Prompt type (single note / interval / chord, etc.)\
Note pool settings\
This is the "rules readout" so there is no confusion mid-game.\
Player scorecard docking behavior\
Scorecards should "rotate" up per turn (active player always most
prominent).\
When too many players:\
Cards shrink/stack and partially hide behind one another in sequence.\
Accessibility requirement\
Color-blind mode enabled by default.\
Use additional cues beyond color (shapes/patterns) so players remain
distinguishable.\
Scale/interval interface ("rail") design and logic\
You introduced two-octave chromatic note/interval graphics as a core UI
element.\
Two usage modes for the rail\
Chromatic (no key context)\
Rail behaves like a compass.\
"Home" or focus note stays centered.\
Rail rotates/animates to next note using shortest distance logic.\
Key/Scale/Chord/Interval context\
Rail stays fixed (root anchored).\
Notes not in the selected scale must be unambiguous:\
Blacked out (preferred) and non-interactive.\
For key-aware spelling (example: G major):\
Correct spellings remain active (F♯ allowed)\
Incorrect enharmonic spellings are blacked out (G♭ blocked)\
Accidentals-only study mode\
Clarified meaning:\
A note pool mode that includes only sharps/flats (black keys), excluding
naturals.\
Implementation progress and fixes made during the conversation\
Mode 1 fretboard prototype built and iterated.\
Fixed open-string mapping (fret 0 column).\
Fixed incorrect enharmonic recognition caused by half-hit requirements.\
Removed unnecessary prompt icons so the generator shows only the note
name with ♯/♭.\
Built a working title/shell screen and fixed blank-screen crashes due to
initialization errors.\
Began Mode 3 implementation, then corrected the conceptual direction
(tab must be tab, not string buttons in keypad).\
Locked in the rail behavior split (rotate for chromatic, fixed for
key/scale/chord/interval).\
List of objectives of the game\
Teach note recognition and location on guitar fretboard through
interactive play.\
Support multiple representations of the same musical concepts:\
Fretboard\
Staff notation\
Guitar tablature\
Combined representation challenges\
Support classroom play on smartboards with touch-first UI and clear
visual hierarchy.\
Provide distinct single-player vs multiplayer experiences:\
Single-player: best time, average time per correct, learning-oriented\
Multiplayer: competitive territory mechanics, turns, steals, streak
pressure\
Enable structured learning modes through configurable note pools:\
Naturals only\
Accidentals only (sharps/flats study)\
Full chromatic\
Key/scale constrained\
Chord constrained\
Interval constrained\
Reinforce key/scale context unambiguously by blacking out non-scale
notes in scale-degree views.\
Reward accuracy and consistency via streak multipliers and callouts.\
Gamify multiplayer with territory mechanics:\
Connect-4 style bonuses\
Steal tokens tied to correct answers and vulnerability rules\
Blackout match type completion\
Maintain accessibility by design (color-blind mode on, shape cues,
high-contrast states).\
Create a modular system that can expand into:\
chord and scale finding\
interval training with a rotating compass rail\
structured song teaching through Mode 4's combined interface
