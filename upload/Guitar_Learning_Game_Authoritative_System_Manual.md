Generated: 2026-01-19\
Status: Draft (Exhaustive and Traceable)

# Document Control

  ----------------------------------------------------------------------------------
  Document ID         GLG-ASM-v1.0
  ------------------- --------------------------------------------------------------
  Generated On        2026-01-19

  Scope               Authoritative system manual + build contract + test reference

  Primary Canon       Guitar_Education_Game_Comprehensive_Guide_Merged_Canon.docx;
  Sources             GLG_Term_Feature_Profiles_v2.docx

  Trace Sources       MTL_MASTER_TIMELINE_LEDGER.md; conversation_composite.json;
                      CHECKLIST.md; CANON_PROGRESS.md; DECISIONS_LOG.md;
                      MATCH_SETTINGS_SPEC.md; THREAD_HANDOFF.md; project CHANGELOG
                      evidence

  Missing Artifact    No file named \'conversation.converted.json\' was found in the
  Note                current provided builds. \'DOCS/conversation_composite.json\'
                      is present in multiple builds and is embedded here.

  Non-Guess Rule      If something is not explicitly present in a cited artifact, it
                      must be treated as undefined until added through change
                      control.
  ----------------------------------------------------------------------------------

# Artifact Index (Paths + File Timestamps)

  -------------------------------------------------------------------------------------------------------------
  Artifact                 Path                                                                    Last
                                                                                                   Modified
                                                                                                   (local)
  ------------------------ ----------------------------------------------------------------------- ------------
  Canon Base (Rules)       /mnt/data/Guitar_Education_Game_Comprehensive_Guide_Merged_Canon.docx   2026-01-19
                                                                                                   12:24:58

  Terminology Base         /mnt/data/GLG_Term_Feature_Profiles_v2.docx                             2026-01-19
                                                                                                   12:24:58

  Master Timeline Ledger   /mnt/data/MTL_MASTER_TIMELINE_LEDGER.md                                 2026-01-19
                                                                                                   12:25:04

  Spine: CHECKLIST.md      /mnt/data/\_asm_src2/CHECKLIST.md                                       2026-01-17
  (from 01_16_26_98)                                                                               01:45:01

  Spine: CANON_PROGRESS.md /mnt/data/\_asm_src2/CANON_PROGRESS.md                                  2026-01-17
  (from 01_16_26_98)                                                                               01:45:01

  Spine: DECISIONS_LOG.md  /mnt/data/\_asm_src2/DECISIONS_LOG.md                                   2026-01-17
  (from 01_16_26_98)                                                                               01:45:01

  Spine:                   /mnt/data/\_asm_src2/MATCH_SETTINGS_SPEC.md                             2026-01-17
  MATCH_SETTINGS_SPEC.md                                                                           01:45:01
  (from 01_16_26_98)                                                                               

  Spine: THREAD_HANDOFF.md /mnt/data/\_asm_src2/THREAD_HANDOFF.md                                  2026-01-17
  (from 01_16_26_98)                                                                               01:45:01

  Conversation Composite   /mnt/data/\_asm_src/DOCS/conversation_composite.json                    2026-01-18
  JSON (from 01_18_26_22)                                                                          08:36:52

  Project Changelog        /mnt/data/\_asm_src/DOCS/CHANGELOG.md                                   2026-01-19
  Evidence (01_18 extract)                                                                         05:31:57
  -------------------------------------------------------------------------------------------------------------

# Instruction Spine DOCS Index (01_16_26_98)

  -----------------------------------------------------------------------
  DOCS File                                 Last Modified (local)
  ----------------------------------------- -----------------------------
  ADVANCED_MATCH_OPTIONS_UI_MAPPING.md      2026-01-17 01:45:01

  CANONICAL_LAYERS_DIAGRAM.md               2026-01-17 01:45:01

  DEPRECATED_TERMS.md                       2026-01-17 01:45:01

  HOW_TO_PROPOSE_CHANGES.md                 2026-01-17 01:45:01

  LOCK_IN_TABLES.md                         2026-01-17 01:45:01

  MERGE_NOTES.md                            2026-01-17 01:45:01

  PLATFORM_STRATEGY.md                      2026-01-17 01:45:01

  RUNTIME_CANON_GUARDS.md                   2026-01-17 01:45:01

  STABILITY_SIM_REPORT_2026-01-15.md        2026-01-17 01:45:01

  START_SCREEN_UI_MAPPING.md                2026-01-17 01:45:01
  -----------------------------------------------------------------------

# Part I -- Authority and Change Control

Authority hierarchy applied:\
1) Canon Design (rules):
Guitar_Education_Game_Comprehensive_Guide_Merged_Canon.docx\
2) Canon Terms/Features: GLG_Term_Feature_Profiles_v2.docx\
3) Historical Fact: Master Timeline Ledger (MTL)\
4) Implementation Evidence: Project CHANGELOG excerpts +
conversation_composite.json\
5) Execution Gates: CHECKLIST.md, CANON_PROGRESS.md, DECISIONS_LOG.md,
MATCH_SETTINGS_SPEC.md, THREAD_HANDOFF.md, and DOCS mappings\
\
Change control:\
- Any modification must be recorded in CANON_PROGRESS.md, justified in
DECISIONS_LOG.md (if architectural), and reflected in
MATCH_SETTINGS_SPEC.md when it affects settings.\
- A build is invalid if it omits the instruction spine (CHECKLIST,
CANON_PROGRESS, DECISIONS_LOG, MATCH_SETTINGS_SPEC, THREAD_HANDOFF)
unless explicitly documented as legacy.\
- Regressions include: reintroducing deprecated terms; reverting menu
flow to pre-Start-Setup; removing required surfaces; breaking
deterministic repaint; breaking dev-tool gating.

# Part II -- Canon Design and Musical Rules (Embedded Canon Text)

Embedded verbatim from
Guitar_Education_Game_Comprehensive_Guide_Merged_Canon.docx.

Guitar Education Game

Comprehensive Build Guide and Canon Specification

Merged Source Documents + Canon Addenda

Build-reference document \| Generated: 2026-01-07

File naming convention: guitar-edu-ui_MM_DD_YY_XX

Table of Contents

Note: Insert an automatic Table of Contents in Word (References → Table
of Contents).

Canon Overview and Constraints

This document is the authoritative engineering and design reference for
the Guitar Education Game. It defines finalized intent, locks
constraints, and enumerates what must be implemented without
reinterpretation. Any feature not documented here must be treated as a
proposal until explicitly approved and added to canon.

Canon Addendum A

Design Clarifications, Definitions, and Expansions (Derived from
Consolidation Review Session)

Canon Addendum

Design Clarifications, Definitions, and Expansions

(Derived from Consolidation Review Session)

1\. Core Direction (Affirmed)

\- The Core Vision and Purpose section is considered complete and
approved.

\- The project remains:

\- Education-first

\- Accuracy-driven

\- Non-inventive with respect to music theory, notation, and engraving

\- Any future additions must extend, not reinterpret, existing
definitions.

2\. High-Level Architecture -- Clarification

2.1 Session Types -- Single-Player Mode (Clarified)

\- Single-Player Mode is explicitly time-based

\- The objective is completion time

\- No competitive scoring mechanics required

\- No bonus reinforcement system is necessary

\- Timers are not optional flavor, but the core success metric

Education vs Exploration

\- Education Mode and Exploration Mode are:

\- Non-competitive

\- Non-scored

\- Pressure-free

\- Education Mode may be used by:

\- Instructors

\- Students

\- Self-guided learners

\- Exploration Mode exists purely for:

\- Free interaction

\- Visual understanding

\- Pattern discovery

3\. Representation Systems -- Major Clarifications

3.1 Fretboard Rendering

\- Once the fretboard is fully rendered (non-SVG):

\- It must not default to showing all 24 frets

\- Only the active or instructional range should be visible

\- Purpose:

\- Reduce visual overload

\- Improve learning focus

\- Maximize staff and tab space

3.2 Music Staff (Critical Canon Rule)

\- The music staff must behave identically to real sheet music.

\- Requirements:

\- Correct clef generation per instrument:

\- Treble

\- Bass

\- Instrument-specific clefs as required

\- Proper rendering of:

\- Key signatures (sharps/flats)

\- Time signatures

\- Ledger lines (above/below staff)

\- Ledger lines must never bleed into tablature

\- Staff spacing must allow:

\- Whole to 32nd notes

\- Triplets

\- Beaming

\- Rests

\- Notes must occupy correct rhythmic positions, not fixed vertical
slots

\- Design Principle:

\- If handed a printed score, the app should look identical.

3.3 Tablature

\- Tab and staff are separate rendering systems

\- Tab uses:

\- Strings

\- Numbers (not dots)

\- Alignment between staff and tab is rhythmic, not visual guesswork

\- Input interaction:

\- No selection boxes

\- Notes are selected by direct highlighting

\- String specificity must be explicit

4\. Note and Theory Display Rules -- Expanded

4.1 Default Display Priority

\- Note Names (default)

\- Contextual overlays:

\- Intervals (chords)

\- Scale degrees (scales)

\- Roman Numeral Intervals

4.2 Roman Numeral Interval System (Canon Name Locked)

Official Name:

\- Roman Numeral Interval System (Short: Roman Numeral Interval)

Key Properties:

\- Context-aware

\- Not a single fixed interpretation

\- Must support:

\- Functional harmony

\- Interval representation

\- Scale-degree logic

Diminished and Augmented Handling:

\- Default: text-based (dim, aug)

\- Symbol-based (°, +) allowed as an advanced toggle

\- Text form is the educational default

Sevenths:

\- Standard notation first (V7, maj7, min7)

\- Advanced variants selectable

Major vs Minor Context Awareness:

\- Relative major/minor overlap must be explainable

\- The system must support:

\- Keeping Roman numerals aligned OR re-mapping to reflect harmonic
function

\- UI must help learners see:

\- Similarities

\- Differences

\- Structural overlap

4.3 Note Visibility Modes (Expanded)

Available modes:

\- All Notes

\- Naturals Only

\- Enharmonic (both)

\- Key / Scale Dependent (new)

Additionally:

\- Default key selection must include None

\- C is no longer mandatory as a default anchor

5\. RAIL System -- Expanded Purpose

\- The RAIL is not only a display.

\- It may function as:

\- A visual reference

\- An input interface

\- Supported modes:

\- Note names

\- Intervals

\- Scale degrees

\- Roman Numeral Intervals

\- Plain numeric indexing (0--24)

6\. Game Surface Controls -- Structural Expansion

Surface Controls:

Primary gameplay selection:

\- Single Note

\- Chord

\- Scale

\- Interval

\- Arpeggio

These are not separate games, but content layered onto the main game.

7\. Scoring, Tokens, Territory -- Multiplayer Only

7.1 Territory Rules (Affirmed)

\- Once captured:

\- A space cannot be re-captured

\- No re-bonusing allowed

\- Re-availability of notes may:

\- Break existing connections

\- Never regenerate prior bonuses

7.2 Connect-Style Bonus System (Expanded)

\- To be documented explicitly:

\- Enharmonic spaces count as:

\- Two independent values OR one shared territory

\- Shape recognition (future-defined):

\- Lines

\- Boxes

\- Filled areas

\- Other geometric patterns (TBD)

7.4 Endgame / Blackout State (New Canon)

\- Trigger: full board

\- All players receive one final turn

\- Triggering player:

\- Goes last

\- Plays until a miss

\- Bonus use allowed during final turn

\- No new territory scoring after blackout

8\. Education Mode / Instructor Tool -- Clarified

\- Explicitly not gameplay

\- Supports:

\- Single notes

\- Chunks (chords, scales, arpeggios)

\- Pattern placement

\- Libraries feed directly into placement

\- Menus must be:

\- Flexible

\- Intuitive

\- Context-aware

9\. Libraries -- Minor Expansion

\- Libraries are informational first

\- Must clearly define:

\- Viewing

\- Selection

\- Placement behavior

\- Arpeggios must be added everywhere chords/scales exist

10--11. Difficulty and UI/UX

\- Difficulty section accepted as complete

\- UI/UX needs new dedicated breakdown:

\- Operations menu

\- Game mode options

\- Play style options

\- Core vs Main Menu settings

\- Highlight settings

\- Preferences

\- Fretboard controls

\- Utility panels

\- Achievements

\- Leaderboards

\- Footer alerts and notifications

12\. Engineering and Discipline Rules -- Expanded Intent

\- Existing rules are correct but require reinforcement language:

\- No invention without documentation

\- Any proposed invention:

\- Must be submitted as a suggestion

\- Must be confirmed before implementation

\- Rendering accuracy is non-negotiable

\- Dev/Test mode must simulate every phase

\- Features must map to defined states

13\. Explicitly Parked / Future Features -- Expanded

\- Guitar Pro file import

\- MusicXML interoperability

\- Song-based lessons

\- External repository compatibility

\- Analytical overlays (future toolset)

\- Circle of Fifths

\- Circle of Thirds

14\. Strategic Priority -- Reinforced

Order of execution is locked:

\- Definitions

\- Notation stabilization

\- Education tools

\- Only then advanced gameplay

\- No exceptions.

15\. Rendering & Implementation Strategy -- Clarified

\- Target: MusicXML-grade engraving

\- No simplified notation mode

\- Rendering system may be hybrid:

\- Generative (preferred)

\- SVG for ornamental inlays when required

16\. Bonus State -- Canon Definition

\- Bonus states do not exist in single-player

\- Bonus states trigger when:

\- Recognizable musical structures are completed

\- Bonus scoring requires:

\- Notes must already exist on board

\- Correct identification

\- Correct selection from menus

17\. Multi-Input Accuracy Rule (Critical)

\- In modes with multiple representations:

\- ALL inputs must be correct

\- Partial correctness = fail

\- Applies to:

\- Staff

\- Tab

\- Fretboard

Status:

\- This addendum resolves all ambiguity raised in the session.

\- It introduces no new mechanics.

\- It locks intent and future constraints.

\- It is suitable for engineering reference, design validation, and
canon enforcement.

Canon Addendum B

Canon Specification Addendum --- Sections 6, 7, 10, and 11 (Conversation
Consolidation & Ambiguity Resolution)

Guitar Education Game

Canon Specification Addendum --- Sections 6, 7, 10, and 11

(Conversation Consolidation & Ambiguity Resolution)

1\. Token System (Multiplayer Only)

1.1 Token Award Rule

\- Tokens are awarded whenever a unique segment is completed.

\- Segment type is irrelevant:

\- Chords

\- Scales

\- Arpeggios

\- Tokens are awarded immediately upon segment completion, not during
bonus resolution.

\- Difficulty does not affect token earning.

\- Tokens do not exist in single-player.

1.2 Segment Definition

\- A segment is considered unique when it has not been previously
completed in the current round.

\- Reclaiming or stealing a segment does not generate additional tokens.

2\. Bonus Phase System

2.1 Bonus Phase Availability

\- Multiplayer: Enabled by default, toggleable in settings.

\- Single-Player: Bonus phase is disabled entirely (non-applicable).

2.2 Bonus Phase Trigger

\- Bonus phase triggers only at the end of a turn, before player
rotation.

\- Trigger condition:

\- At least one qualifying structure (Chord, Scale, or Arpeggio) was
completed during the turn.

3\. Qualification Thresholds (Bonus Eligibility)

3.1 Chords

\- Minimum three notes.

\- Must meet harmonic quality:

\- Root + Third + Fifth

\- Extensions (7ths, 9ths, 11ths, 13ths) may qualify additionally.

\- Partial chords do not qualify.

3.2 Arpeggios

\- Must represent a complete chord shape.

\- Minimum three notes.

\- Maximum constrained by instrument (up to six strings).

\- Treated as chord-derived structures.

3.3 Scales

\- Must span Root to Octave (Root).

\- Partial scale fragments do not qualify.

4\. Dual-Board Architecture

4.1 Main Gameplay Board

\- Shared by all players.

\- Persistent during the round.

\- Tracks:

\- Ownership

\- Vulnerability

\- Stealing

\- Locked segments

\- Locks prevent re-scoring only, not interaction.

4.2 Bonus Phase Board

\- Temporary, isolated board state.

\- Exists only during bonus phase.

\- Highlighting does not claim ownership.

\- Board resets completely after bonus phase ends.

5\. Bonus Phase Claim & Clear Rule

\- During bonus mode, when a player:

\- Highlights a valid structure,

\- Correctly identifies and confirms it,

\- All notes comprising that structure are immediately removed from the
bonus board.

Effects:

\- Prevents repeated identification of the same material.

\- Reduces visual clutter.

\- Creates a progressively simplifying puzzle space.

Applies only to the bonus board.

Does not affect the main board.

6\. Locking Rules (Clarified)

6.1 Lock Behavior

\- Locks prevent re-scoring only.

\- Locked areas:

\- May still be selected

\- May be stolen

\- May be reclaimed later

6.2 Lock Scope

\- Locks persist only within the current bonus phase.

\- Locks do not persist across rounds, matches, or sessions.

7\. Stealing Mechanics

7.1 Stealable Conditions

A note or segment becomes stealable when either condition is met:

Vulnerability Condition

\- Player misses sufficient turns.

\- Notes begin flashing.

\- Flashing indicates vulnerability and stealability.

Completion Condition

\- All instances of a note are discovered.

\- Note becomes stealable without flashing.

\- Breakable segments appear automatically.

8\. Instructor Mapping Authority (Section 7.2)

8.1 Mapping Surface Controls

Instructor selects mapping behavior explicitly:

\- Explicit (Manual) Mapping

\- No auto-mapping or highlighting.

\- Highest assessment precision.

\- Assisted Mapping (Highlight-Only)

\- System highlights valid equivalents.

\- No auto-population.

\- Auto-Population Mapping

\- System auto-populates selected domains:

\- Staff

\- Tab

\- Fretboard

\- Note Rail

8.2 Multi-Position Handling

Instructor chooses one:

\- Highlight all valid positions

\- Highlight best/closest

\- Auto-populate all

\- Require manual disambiguation

Students never control mapping logic.

9\. Staff Notation Policy

9.1 Engraving Standard

Full, correct engraving is mandatory, including:

\- Proper clefs

\- Key signatures

\- Time signatures

\- Ledger lines

\- Accurate spacing

\- Correct stem direction

9.2 Rationale

Reinforces real-world music literacy.

Ensures consistency with:

\- Sheet music

\- Guitar Pro

\- Ultimate Guitar

\- Professional notation systems

10\. Staff Prompt to Fretboard Answer Policy (SAM)

10.1 Answer Acceptance Modes

Controlled via SAM (Single / Equivalents / All) and difficulty:

\- Any Correct

\- Any valid position accepted.

\- Learning modes.

\- Best / Closest

\- System evaluates proximity to input.

\- Precision modes.

\- Designated Position

\- Only predefined location accepted.

\- Assessment and advanced play.

10.2 Visibility Controls

\- Show all answers

\- Show closest only

\- Show none until after response

\- Show all of same pitch equivalent

\- Show single note

Instructor and mode controlled.

11\. Analytics & Metadata

11.1 Persistence Layers

\- Local: Stored per user profile.

\- Exportable: CSV / JSON for instructors.

\- Server-Side (Future): Database-backed persistence.

11.2 Multiplayer Analytics

\- Aggregated per user profile, not per session.

\- Enables longitudinal tracking.

12\. Roman Numeral Interval System (Section 11 -- Canon)

12.1 Core Principles

\- Describes interval distance, not harmonic function.

\- Case indicates interval quality:

\- Uppercase = Major / Perfect

\- Lowercase = Minor

\- Accidentals modify numerals directly.

12.2 Dual Extension Representation (Critical)

Interval-Class View (Collapsed)

\- 9 -\> 2

\- 11 -\> 4

\- 13 -\> 6

Used for:

\- Fretboard logic

\- Pattern recognition

Extension-Explicit View (Linear)

\- IX, XI, XIII, XV, etc.

Used for:

\- Chord naming

\- Staff notation clarity

Both views reference the same pitch class.

12.3 Minor Key Handling

\- Only the tonic is inherently minor: i

\- Perfect intervals remain uppercase: IV, V

\- Chord quality is a separate layer.

13\. Bonus Mode --- Multi-Name Handling

13.1 Trigger

If a claimed structure has multiple valid names:

\- Enharmonic

\- Extension-based

\- Alternate spellings

13.2 System Response

\- Indicates additional valid name exists (without revealing it).

\- Adds +1 second to bonus clock.

\- Player chooses:

\- Attempt one additional name

\- Skip and continue

13.3 Lockout

After attempt or skip:

\- Position is locked from further naming attempts for that bonus phase.

14\. Design Intent Summary

\- Reward musical understanding, not rote guessing.

\- Preserve deterministic logic for engine implementation.

\- Ensure transferable literacy across staff, tab, and fretboard.

\- Prevent exploit loops and scoring inflation.

\- Maintain clarity across all modes and difficulties.

Status

\- All referenced ambiguities are resolved.

\- Remaining work is documentation formatting and implementation, not
design definition.

Implementation Checklist Mapped to Canon

This checklist is strictly derived from the canon addenda above. It does
not introduce new mechanics; it translates locked intent into
build-verifiable items.

Session Types and Success Metrics

Education Mode: non-scored, pressure-free, instructor or self-guided;
supports placement, hide/show, and mapping authority.

Exploration Mode: non-scored, pressure-free free interaction and pattern
discovery (distinct from gameplay).

Single-Player: time-based; completion time is the success metric; no
bonus phase; no tokens.

Multiplayer: competitive; tokens and bonus phase enabled; territory and
stealing apply.

Rendering and Notation Accuracy (MusicXML-grade target)

Staff behaves identically to printed sheet music: clefs, key signatures,
time signatures, rhythmic spacing, rests, beaming, ledger lines (never
bleeding into TAB).

TAB renders strings + numbers (no dots), with rhythmic alignment to
staff based on a shared timing grid.

Staff and TAB are separate rendering systems that align rhythmically,
not by visual guesswork.

Fretboard rendering: SVG permitted for prototype; non-SVG final render
must show only the active/instructional range (not default 24 frets).

Display Priority and Roman Numeral Interval System

Default primary display: Note Names.

Context overlays: Intervals for chords, scale degrees for scales, Roman
Numeral Interval System for interval-based teaching.

Roman Numeral Interval System: context-aware; supports functional
harmony, interval representation, and scale-degree logic; default
text-based dim/aug; symbols as advanced toggle.

Dual extension representation: collapsed interval-class view (9→2, 11→4,
13→6) and extension-explicit view (IX, XI, XIII, XV\...).

Note Visibility and Key Context

Visibility modes: All Notes, Naturals Only, Enharmonic (both), Key/Scale
Dependent.

Default key selection includes None (C is not mandatory).

Mode Directionality

Input order must be configurable: Fretboard→Staff, Staff→Fretboard,
TAB→Others, randomized.

Multiplayer: Tokens, Segments, Bonus Phase, Territory

Tokens are multiplayer-only.

Tokens are awarded when a unique segment is completed; segment type
irrelevant (chords/scales/arpeggios).

A segment is unique only if not previously completed in the current
round; stealing/reclaiming does not award additional tokens.

Bonus phase: multiplayer enabled by default (toggleable); triggers at
end of turn when at least one qualifying structure was completed; occurs
before player rotation.

Qualification thresholds: chords (min 3 notes, R+3+5), arpeggios
(complete chord-derived shape, 3--6 notes), scales (root to octave).

Dual-board architecture: main gameplay board persists; bonus board is
temporary and resets after bonus; bonus highlighting does not claim
ownership.

Bonus claim & clear: identified structure is removed from bonus board
only; does not affect main board.

Locks prevent re-scoring only; locked areas remain
interactive/stealable; locks persist only within current bonus phase.

Territory rule: once captured, a space cannot be re-captured; no
re-bonusing; re-availability may break connections but never regenerates
prior bonuses.

Endgame blackout: on full board, all players get one final turn;
triggering player goes last and plays until miss; bonus use allowed; no
new territory scoring after blackout.

Instructor Mapping Authority

Mapping Surface Controls: Explicit Manual; Assisted Highlight-Only;
Auto-Population to selected domains (staff/tab/fretboard/note rail).

Multi-position handling: highlight all valid; highlight best/closest;
auto-populate all; require manual disambiguation.

Students never control mapping logic.

SAM (Staff Prompt to Fretboard Answer Policy)

Acceptance modes: Any Correct; Best/Closest; Designated Position.

Visibility controls: show all answers; show closest only; show none
until after response.

Controlled by SAM and difficulty; instructor and mode control where
applicable.

Multi-Input Accuracy Rule

When multiple representations are required, ALL inputs must be correct;
partial correctness is failure (staff/tab/fretboard).

Analytics and Metadata

Persistence layers: local per user; exportable CSV/JSON; server-side
future.

Multiplayer analytics aggregated per user profile, not per session.

Annex A --- Source Document 1 (Imported Text)

Original file: Guitar Education Game_details-1.docx

Guitar Education Game --- Master Checklist (current project truth)

Status keys

✅ Done / Implemented

🛠 Needs completion (partially built, bugs, polish, missing wiring)

🧩 Needs definition (rules/spec not fully locked)

⏳ Pending (planned, not started)

A\) Layout + UI Structure

A1. Page Layout / Grid

✅ Header section: 3 columns; middle column split into 3 rows; bottom
row

✅ Main gameplay section: 3 columns (L / M / R) with required row splits
(L=2 rows, M=3 rows, R=2 rows)

✅ Footer section exists

A2. Player Cards / Leaderboard

🧩 Player card final spec variants:

(avatar, score, name, tokens only) --- spec locked, but confirm
"timer-in-card" rule below

Full card (avatar left, 10 bonus counters top-right, score below) ---
spec exists but may not be implemented

🛠 "Timer inside player card to save space" (GEG-020) --- integrate and
verify layout does not break

A3. Utility / Menus / Tabs

🧩 Utility labels locked: Num / Note / Chord / Scale

🛠 Utility area needs more coverage (Chord menu, Scales menu, diagram
view options, mode-specific input buttons)

⏳ Tabbed calculator panel assets (10-key, 205×316) --- only if still
intended for current build path

⏳ Misc Information panel (205×316) with chord diagrams/CAGED ---
planned UI asset block

B\) Fretboard + Interaction

B1. Fret Range Controls

✅ Neck supports frets 0--24

✅ Display presets: 5 / 12 / 24

✅ Active min/max range supported with dimming outside range

✅ Default active range: min 1 / max 12 (GEG-042)

B2. Fret Rail

🧩 "Fret rail should be a place players can select notes (like a
button)" --- behavior rules needed (select = guess? select = filter?
select = input assist?)

🛠 If present now, needs wiring to game logic per mode

B3. Hitboxes / Fretboard Asset Swap

🛠 Fretboard image update + hitbox alignment (you noted you attached a
file previously)

🧩 Define authoritative coordinate system (percent-based grid vs px) so
updates don't keep breaking

C\) Note Display + Theory Labeling

C1. Note Visibility (Accidental Rules)

✅ Accidentals fully removed (not clickable, not visible) in the build
where this was enforced

✅ Rail defaults to showing sharps + flats inside each note cell (no
overflow)

🧩 Reconcile this with "accidentals removed" vs "show sharps and flats":

Needs a clean definition: are sharps/flats shown as part of the note
label (A#/Bb) while "accidental buttons" are removed? (likely yes)

C2. Display Modes (what the player sees)

🧩 Must support viewing notes as:

Note names

Numbers (degree)

Intervals (scale/key/mode dependent)

Roman numeral intervals (I, ii, II, iii, III...)

🧩 "In some instances notes can show up with multiple options" --- rules
needed:

Priority order

Display stacking (primary/secondary)

Context triggers (key vs chord vs chromatic)

D\) Game Modes + Settings Architecture

D1. Main Menu Structure

🧩 First menu option should be: Single Note / Chords / Scales /
Intervals / Arpeggios (drives gameplay type)

✅ Instruments / Visual Feedback / Difficulty moved out of first slot
(per your preference)

✅ Audio Settings moved to Main Menu

✅ Instrument tuning placed by Instrument selection

✅ Fretboard Controls placed next to Instrument Controls

✅ Remove redundant "Intervals" submenu (combined with Note
Names/Interval Names)

✅ Add "Roman Numeral Interval" option under the combined item

✅ Note Display toggle removed from submenu if already present in Core
Settings

✅ Note Highlighting includes 7ths

D2. Difficulty

🧩 Difficulty tiers defined: Learning / Easy / Medium / Hard

🧩 Need a final rule table for each tier:

Label visibility timing

Hint availability

SAM behavior

Mistake handling

Score multipliers (if any)

D3. SAM (Show After Miss)

✅ SAM lives in Game Mode Options

🧩 SAM options: "single" vs "multiple" needs strict definitions per mode

E\) Generator / Rail System

E1. Note Rail Behavior

🧩 Rail should act like a 2-octave "compass/endless loop"

🧩 Two paradigms must be supported:

Rotate rail (chromatic/no key reference)

Fixed rail (scales/keys/chords with stable tonic)

🛠 Rail should be interactive "when needed" (mode-dependent); define
interactions:

click to input?

click to inspect?

click to toggle display?

E2. "Current Note Centered"

🧩 Generator strip should keep current note centered and scroll/rotate
around it

🛠 If partially built, needs alignment and animation polish

F\) Core Match Flow / Turn System

F1. Turn Controls

🛠 "Stop button should say End (end game instance)" --- implement
consistently

🛠 Simplify: Skip / End / New / Exit

F2. Dev/Test Mode (critical for building)

✅ Dev/Test mode should be enabled before match starts

🛠 Dev mode currently appears in settings but "does not function" (per
your report)

🛠 Needs phase simulation controls:

advance turn

switch player instantly

force bonus phase

inject notes / outcomes

✅ Learning mode can still simulate normal gameplay and highlight notes
(GEG-040)

G\) Scoring, Tokens, Bonuses

G1. Token Minting Logic

✅ Rule locked: tokens must come from individual segments, not just
points

🧩 Need final definitions for:

what counts as a "segment"

when it mints (first-time only vs repeat)

interaction with chords/scales modes later

G2. Bonus Phase

🛠 "Bonus phase not showing" and dev tools cannot test it --- needs
repair + test hooks

🧩 Define exact triggers and UI state transitions:

when bonus phase starts/ends

what the player is allowed to do

what is rewarded

G3. Extended Connect / Shapes

⏳ Extended chord bonuses (9ths, 11ths, 13ths) are planned for chord
content (GEG-044)

🧩 Define how extended chord success affects:

score

multipliers

tokens

feedback display

H\) Chords / Scales / Learning Content

H1. Chords Mode

⏳ Add extended chord options (9/11/13 etc.) (GEG-044)

🧩 Define voicing rules:

multiple correct positions (accept any vs "best/closest")

inversions allowed?

string-count constraints

H2. Scales Mode

⏳ Scale systems and modes planned

🧩 Needs spec for:

root anchoring

interval highlighting

rail/fretboard synchronization

I\) Visual Feedback + Design Rules

I1. Highlighting / Feedback

✅ Note highlighting includes all chord degrees option

🧩 Define consistent feedback language:

correct / incorrect

hint states

"simulated" vs "scored" actions (learning/dev)

🛠 Clean up stray/leftover UI artifacts (old panels, extra note above
staff, remnants seen when zoomed out)

I2. Assets

🛠 Missing assets issue noted (zip incomplete / not all assets present)

🧩 Needs a single canonical asset manifest:

filenames

dimensions

where used

fallback behavior if missing

J\) Data / Persistence / Engineering Notes

🧩 Define storage for:

player score location (card vs global model)

multipliers displayed next to score

per-player tokens, per-turn flags

🛠 Fix build errors like duplicate declarations (main.ts duplicate
symbols issue you encountered earlier)

🧩 Establish project "engine entry point" (where the game loop begins)
since no obvious src tree existed in your packaging

Quick totals (to guide next actions)

✅ Done: layout framework, fret range defaults, menu architecture
decisions, key mode requirements, several UI rules

🛠 Needs completion: dev mode functionality, token logic correctness,
bonus phase visibility/testing, asset/hitbox alignment, control panel
cleanup

🧩 Needs definition: display-mode priority system, rail interactivity
rules, difficulty matrix, SAM formal behavior, segment definition for
token minting

⏳ Pending: full chords/scales pipeline, extended chord support, full
chord/scale diagrams UI blocks

If you want the most leverage next: we should lock the "Needs
definition" items into a one-page spec, because they directly control
how you code dev mode, token minting, and display behavior without
rework.

Annex B --- Source Document 2 (Imported Text)

Original file: Guitar Education Game_details-2.docx

Conversation start date: December 20, 2025 (America/Denver)

Detailed summary of what we defined and agreed on

Overall goal

Build a smartboard-friendly guitar education video game that runs in
browsers and on computers, supporting both touch and mouse input. The
game must be modular so it can expand from a note-finding game into
scale finding, chord finding, interval training, and eventually
song-oriented exercises.

Core game structure

Title/Splash Screen

Player selects:

Surface Controls for selecting Board Properties

Single-player or multiplayer

Number of players (1--16)

Settings (difficulty, timers, note pools, key/scale context, etc.)

Settings must be accessible:

On the title screen

In-game

Persistent leaderboards

Leaderboards should persist locally (and later could be extended).

Separate leaderboards by:

Surface Controls (Fretboard only, Staff only, Tab only, Staff and Tab,
Staff and Fretboard, Tab and Fretboard, etc...)

Single vs multiplayer

Surface Controls (as defined in the conversation)

Fretboard note finding (primary mode implemented first)

Random note generator can generate:

Naturals

Chromatic (including sharps/flats)

Later: key/scale/chord/interval constrained pools

Fretboard default view:

Blank (no note dots or labels)

Fret markers still visible

Interaction:

If correct note is selected → highlight in that player's color (with
accessibility support)

If wrong or time runs out → turn passes to next player (multiplayer)

If correct → timer resets, new prompt generates, player continues until
miss/time-out

Staff mode (planned)

Same "find the note" concept but using standard staff notation as the
primary representation.

Tablature mode (redefined)

Purpose: reinforce reading/writing tablature.

Key clarified requirement:

Strings should NOT be part of the 10-key.

Player selects the string by clicking the correct line on the tab, then
enters the fret number (or vice versa).

Use 8th-note-like spacing to place entries.

When the staff/tab fills, it clears and restarts.

Combinations (planned)

Combines multiple representations and settings:

Fretboard

Staff

Tablature

"Random" across representations

Player may need to satisfy multiple representation checks before
advancing (as originally described).

Scoring and progression

Base scoring

Base: 1 point per correct answer

Streak multipliers

3 correct in a row → x2

6 correct → x3

10 correct → x5

20 correct → x10

Multiplier display:

Appears next to the player's score

Large callouts:

"3 in a row!"

"6 in a row!"

"Heating up"

"Hot streak"

"You're on FIRE!"

Fire animation in scorecard background at high streak thresholds

Turn stats to display

Score

Correct-in-a-row

Wrong count

Total tries

Multiplier (active only while streak is alive)

"Connect-4" territory logic

Bonuses for connecting 4+ claimed notes:

Horizontal, vertical, diagonal

Scoring concept proposed:

Base connection: extra points per dot (4 as base)

Additional dots beyond 4: worth more (2 points per additional)

Claimed groups cannot be reused for additional connect scoring (group
becomes "locked" / extra-highlighted).

Connection scoring should apply at end of the turn:

A player can extend a run across multiple picks in the same turn.

Extending an existing run across different turns should not retrigger
scoring.

"Blackout" match type

Game ends when the board is filled according to what is "available":

Chromatic = all notes

Key/scale/interval = only notes allowed by the context

Steal tokens and steal logic

Tokens can be earned and banked.

Steals can only happen when:

A note is vulnerable/stealable

AND it matches the currently generated prompt

If a player attempts a steal and the note does not match the generated
prompt:

Token is lost

Turn ends

Tokens may be unused if no steals are available.

Token cap discussion:

10 tokens may be excessive; cap should be adjustable.

Vulnerable notes definition (agreed direction)

Trigger condition proposed:

If a player misses 3 turns in a row without scoring, notes become
vulnerable.

Additional layer proposed:

If all instances of a note become claimed, they may become available to
steal.

Bonus for breaking connected groups

If a steal breaks an already-locked connect group:

Award a multiplier bump (or if already max, award 25 points)

Enharmonics and split-circle rules (important clarifications)

Enharmonics are distinct prompts and can be scored separately in
chromatic study:

Example: F♯ and G♭ are different prompts

Visual rule on the board:

Split circle matches SVG orientation:

Sharp side on the left

Flat side on the right

Ownership rule:

Two different players may own two halves of the split circle.

If one player owns both halves, render a double ring.

Critical usability fix:

Board taps must be full-size targets (sharps/flats cannot require
left/right precision).

Split is for visual ownership, not for harder input.

Difficulty modes (refined)

Learning:

Notes visible and labeled

Easy:

Naturals not visible, enharmonics visible (as previously proposed)

Medium:

Notes show when claimed

Notes may briefly appear after claimed (configurable)

Hard:

Notes do not persist as labels when claimed

Optional: notes may flash briefly after claim, but do not remain

"Show after miss" not desired in hard mode

"SAM" (Show After Miss / Show Answer Mapping)

Off by default on Hard

On for lower difficulties

UI/UX direction (major decisions)

Main UI layout concept (from your sketch)

Top header area:

Controls and context info grouped for clarity

Middle:

Staff/tab strip region (depending on mode)

Bottom:

Main board

Right side:

Player scorecards

The active context info:

Key/scale

Prompt type (single note / interval / chord, etc.)

Note pool settings

This is the "rules readout" so there is no confusion mid-game.

Accessibility requirement

Color-blind mode enabled by default.

Use additional cues beyond color (shapes/patterns) so players remain
distinguishable.

Scale/interval interface ("rail") design and logic

You introduced two-octave chromatic note/interval graphics as a core UI
element.

Two usage modes for the rail

Chromatic (no key context)

Rail behaves like a compass.

"Home" or focus note stays centered.

Rail rotates/animates to next note using shortest distance logic.

Key/Scale/Chord/Interval context

Rail stays fixed (root anchored).

Notes not in the selected scale must be unambiguous:

Blacked out (preferred) and non-interactive.

For key-aware spelling (example: G major):

Correct spellings remain active (F♯ allowed)

Incorrect enharmonic spellings are blacked out (G♭ blocked)

Accidentals-only study mode

Clarified meaning:

A note pool mode that includes only sharps/flats (black keys), excluding
naturals.

Implementation progress and fixes made during the conversation

Fixed open-string mapping (fret 0 column).

Fixed incorrect enharmonic recognition caused by half-hit requirements.

Removed unnecessary prompt icons so the generator shows only the note
name with ♯/♭.

Built a working title/shell screen and fixed blank-screen crashes due to
initialization errors.

Locked in the rail behavior split (rotate for chromatic, fixed for
key/scale/chord/interval).

List of objectives of the game

Teach note recognition and location on guitar fretboard through
interactive play.

Support multiple representations of the same musical concepts:

Fretboard

Staff notation

Guitar tablature

Combined representation challenges

Support classroom play on smartboards with touch-first UI and clear
visual hierarchy.

Provide distinct single-player vs multiplayer experiences:

Single-player: best time, average time per correct, learning-oriented

Multiplayer: competitive territory mechanics, turns, steals, streak
pressure

Enable structured learning modes through configurable note pools:

Naturals only

Accidentals only (sharps/flats study)

Full chromatic

Key/scale constrained

Chord constrained

Interval constrained

Reinforce key/scale context unambiguously by blacking out non-scale
notes in scale-degree views.

Reward accuracy and consistency via streak multipliers and callouts.

Gamify multiplayer with territory mechanics:

Connect-4 style bonuses

Steal tokens tied to correct answers and vulnerability rules

Blackout match type completion

Maintain accessibility by design (color-blind mode on, shape cues,
high-contrast states).

Create a modular system that can expand into:

chord and scale finding

interval training with a rotating compass rail

structured song teaching through Mode 4's combined interface

# Part III -- Terminology and Feature Profiles (Embedded Canon Text)

Embedded verbatim from GLG_Term_Feature_Profiles_v2.docx.

GLG Term / Feature Profiles (Phase 3)

Generated: 2026-01-17 05:50:14 UTC

Each profile is derived from scoped conversation events (2025-12-01 →
2026-01-16 UTC) and cross-referenced with Anchor98 docs where available.
This document is descriptive; it does not authorize changes.

BONUS_PHASE

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:04:56 UTC --- Guitar education game design --- user:
sounds like a good plan of attack. I agree on the engine and
renderer\... enharmonics circle should be allowed to be scored twice
since there is both a flat and a sharp occupying that space. for
example: f sharp and g flat are different notes and can both be
generated in a chromatic mode but would on

2025-12-19 01:05:28 UTC --- Guitar education game design --- assistant:
Understood --- these refinements make the game \*more musically
correct\* and give the board real strategic depth without bloating the
engine. Here's how I would formalize it so it stays clean in code and
clear on the smart board. \## Enharmonics as distinct "claimable
variants" (F# and Gb can both score

2025-12-19 01:23:55 UTC --- Guitar education game design --- assistant:
Perfect --- here's a tight spec-level refinement that keeps your
\*\*engine/renderer split intact\*\*, upgrades the \*\*classroom UX\*\*,
and cleanly introduces the \*\*enharmonic "double-connect" twist\*\*
without creating rule chaos. \## Scorecard UX and multiplier
presentation \### Scorecard layout (per player)

2025-12-19 02:13:53 UTC --- Guitar education game design --- assistant:
Here are the key optimizations to \*\*lock in now\*\* (before coding)
based on your new rules. These decisions touch multiple systems, so
settling them up front will prevent refactors. \## 1) Add the "Blackout"
match type cleanly \*\*Blackout\*\* ends the game when the fretboard is
"fully filled." To avoid a

2025-12-19 02:25:50 UTC --- Guitar education game design --- user:
\"blackout\" should be defined by what is available. so if we are in
chromatic it will be everything, if it is in a key, scale, or interval
it will be limited to the notes that are defined therein. Bonus 5pts if
they steal an enharmonic with the opposite generated, helps reinforce
the note position an

2025-12-19 02:25:54 UTC --- Guitar education game design --- assistant:
Here are the three updates, tightened into \*\*engine-ready rules\*\* so
you can code without reinterpretation later. \## 1) Blackout match type
is defined by "what is available" \*\*Definition:\*\* Blackout ends when
\*\*every claimable slot on the board (given the current Settings) has
been claimed by someon

DEPRECATED_LAST_CHANCE

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

DEV_TOOLS_HIDDEN

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-30 16:07:49 UTC --- Rendered Staff+Tab Implementation ---
assistant: Understood. We'll shift to \*\*backend-functional work\*\*
that you can validate later without needing the visuals perfect right
now. Below is the next backend milestone plan and the concrete
implementation targets (files/modules, data shapes, and logic). This
will move the project forward materially wh

2025-12-30 18:52:38 UTC --- Rendered Staff+Tab Implementation ---
assistant: Excellent. I'll proceed exactly there and treat this as a
\*\*backend stabilization phase\*\* so that when you return to visual
testing, you're validating a system that is already logically correct.
Below is what I am locking in and beginning immediately, so expectations
are clear and we don't drift. \--

2026-01-10 08:43:42 UTC --- Patch Splash Match Rules --- assistant: You
were last at \*\*A1.40 (Settings Enforcement)\*\*. With the patches
applied since then, you are now at \*\*A1.46\*\*. \### A1.41--A1.46
(what moved forward) \*\*A1.41 --- Splash owns Match Rules\*\* - Match
Rules removed from the in-game/left menu and live entirely on the Start
Menu UI. \*\*A1.42 --- Dev/Test unloc

2026-01-12 05:17:10 UTC --- Guitar-Edu-UI Audit --- assistant: Phase
\*\*1.1 + 1.2\*\* is now implemented in the active build as a
\*\*timeline persistence stress layer + stacking rules\*\*, specifically
to expose capacity/shift flaws before we harden Mode 3's full truth
model. \[Download
guitar-edu-ui_01_11_26_07.zip\](sandbox:/mnt/data/guitar-edu-ui_01_11_26_07.zip)
\##

2026-01-12 05:42:36 UTC --- Guitar-Edu-UI Audit --- assistant: Phase
1.1 + 1.2 executed (persistence stress + stacking rules) \*\*using an
"accepted marks persist" pipeline\*\*, so we can safely lock Mode 3
truth-model on top without timeline corruption. \### What I implemented
(Phase 1.1 + 1.2, optimized for exposing capacity flaws) \#### 1)
Accepted-marks persisten

2026-01-12 09:04:34 UTC --- Guitar-Edu-UI Audit --- assistant:
Understood --- the screenshots make it clear we're hitting \*\*three
hard blockers\*\* that prevent meaningful testing right now: 1)
\*\*Dev/Test unlock "works" logically but you still can't reach the
controls\*\* (because the Dev pane entry point is trapped behind the
regressed menu/tabs UI). 2) \*\*TAB number

2026-01-12 09:26:01 UTC --- Guitar-Edu-UI Audit --- assistant: Here's a
clean "handoff packet" you can paste into a \*\*new chat thread\*\* to
pick up immediately without re-explaining anything. \-\-- \## New Thread
Title \*\*GuitarEdu UI --- Add Automated Tests + One-Click Runner
(Vitest + Playwright + In-App Test Runner)\*\* \-\-- \## Paste This As
The First Message In The N

2026-01-13 04:24:44 UTC --- Guitar Learning Game Menu --- assistant:
Below is a \*\*clean, canonical menu map\*\* for the \*\*Guitar Learning
Game\*\*, organized by \*\*System\*\*, \*\*Game\*\*, and
\*\*Preferences\*\*. This reflects the current direction of the project,
resolves prior ambiguities, and is structured for \*\*clarity,
testability, and future expansion\*\*. \-\-- \## 1. \*\*System

DOUBLE_BOARDS

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-16 22:48:42 UTC --- Guitar Edu Game Setup --- user:
\[15:42:28.576\] SYS eventLog:installed {\"max\":400} \[15:42:49.330\]
UI gedu:players {\"count\":2} \[15:42:49.533\] UI gedu:players
{\"count\":2} \[15:42:49.709\] UI gedu:players {\"count\":2}
\[15:42:49.873\] UI gedu:players {\"count\":2} \[15:42:50.049\] UI
gedu:players {\"count\":2} \[15:42:50.237\] UI gedu:players {\"co

2026-01-16 23:17:15 UTC --- Guitar Edu Game Setup --- assistant: Done.
\## A) Solution B is now canonical \### Purpose Eliminate the redundant
nested folder issue during Windows extraction by switching snapshot
artifacts to \*\*flat zip format\*\*. \### Files touched -
\`DECISIONS_LOG.md\` (packaging invariant + extraction rule updated) -
\`tools/tripwire_zip_structure.mjs

2026-01-16 23:34:08 UTC --- Guitar Edu Game Setup --- user:
\[16:30:12.794\] SYS eventLog:installed {\"max\":400} \[16:30:39.401\]
UI gedu:players {\"count\":2} \[16:30:39.797\] UI gedu:players
{\"count\":2} \[16:30:40.073\] UI gedu:players {\"count\":2}
\[16:30:40.333\] UI gedu:players {\"count\":2} \[16:30:52.446\] UI
gedu:matchOptions {\"learningType\":\"single\",\"context\":{\"key\":

2026-01-16 23:39:55 UTC --- Guitar Edu Game Setup --- assistant: Applied
two targeted fixes to address the runtime issues you reported ("settings
not being applied" + "double boards rendering"). \## 1) Match settings
not applying (Key / Pitch Framework) \*\*Root cause:\*\*
\`buildSettingsFromUi()\` was still reading \*legacy\* UI controls
(\`#core-root\`, \`#core-modes\`) whe

FRETBOARD

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:05:28 UTC --- Guitar education game design --- assistant:
Understood --- these refinements make the game \*more musically
correct\* and give the board real strategic depth without bloating the
engine. Here's how I would formalize it so it stays clean in code and
clear on the smart board. \## Enharmonics as distinct "claimable
variants" (F# and Gb can both score

2025-12-19 01:23:55 UTC --- Guitar education game design --- assistant:
Perfect --- here's a tight spec-level refinement that keeps your
\*\*engine/renderer split intact\*\*, upgrades the \*\*classroom UX\*\*,
and cleanly introduces the \*\*enharmonic "double-connect" twist\*\*
without creating rule chaos. \## Scorecard UX and multiplier
presentation \### Scorecard layout (per player)

2025-12-19 01:34:09 UTC --- Guitar education game design --- assistant:
Got it --- we'll match the \*\*SVG mental model\*\* exactly: - \*\*Sharp
= left half\*\* (because it "goes up") - \*\*Flat = right half\*\*
(because it "goes down") - The split visually "leans toward" the note
it's affecting (your intuition is solid, and yes: \*affect\* is the verb
😉). And we'll support \*\*two diffe

2025-12-19 01:39:14 UTC --- Guitar education game design --- assistant:
That's a strong lever, and it fits the "scaffold → remove scaffolding"
progression cleanly. \## Difficulty spec update: "label-on-claim" as the
key difference Think of difficulty as controlling \*\*what information
is visible, and when\*\*. We can formalize it with two independent
visibility layers: 1) \*

2025-12-19 01:41:57 UTC --- Guitar education game design --- assistant:
Great --- let's formalize \*\*"Show after miss"\*\* so it's powerful for
teaching \*without\* breaking multiplayer competitiveness. \## "Show
After Miss" (SAM) setting \### What it does When a player answers
incorrectly (or times out), the game can optionally reveal the correct
answer \*briefly\*. This is a tea

2025-12-19 01:57:53 UTC --- Guitar education game design --- assistant:
Here are the highest-leverage optimizations to lock down \*\*before
coding\*\*, so you don't end up refactoring core rules/UI later. I'm
focusing on decisions that (1) touch many systems, (2) affect
fairness/teachability, and (3) are easiest to settle now. \## 1)
Formalize the "single source of truth" fo

GEG-001

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-10 08:48:42 UTC --- Patch Splash Match Rules --- assistant:
Agreed --- we drifted from the project's file/zip naming + documentation
discipline. \### Fixed (and recorded) - \*\*Restored the deliverable
naming convention\*\* for full builds: -
\`guitar-edu-ui_MM_DD_YY\_##.zip\` - \*\*Enforced clean packaging\*\*
per \`DOCS/CHANGELOG.md\`: - \*\*No \`node_modules/\`\*\* - \*\*No \`dis

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:00:56 UTC --- Match Options UI Reconciliation ---
assistant: They are \*\*not "missing tasks"\*\* in the current canon
set. In \*\*01_13_26_19\*\*, the \*\*only authoritative task ledger\*\*
that defines GEG IDs is \*\*CHECKLIST.md\*\*, and it simply does \*\*not
define\*\* a large number of numbers---so those IDs \*\*do not exist\*\*
in the project right now unless we explicitly add

2026-01-15 03:06:13 UTC --- Match Options UI Reconciliation ---
assistant: Understood. Right-click stays in canon, but we will \*\*not
implement it now\*\*. \## Updated priority - \*\*GEG-116 (Right-click
Answer Shortcut Menu):\*\* Defer. No code work until higher-priority
testing blockers are cleared. \## Next step The next highest-value step
for testing is to make sure \*\*the core

2026-01-15 03:20:34 UTC --- Match Options UI Reconciliation ---
assistant: You're right: that screenshot is not "missing features," it's
a \*\*surface init failure\*\* that leaves the UI shell intact but
prevents the rendering subsystems from coming online. \## Audit findings
(root causes) \### 1) Fretboard + Staff/Tab backgrounds are failing to
load (critical) In \`src/app/gameC

2026-01-16 10:15:38 UTC --- Guitar Edu Game Setup --- assistant: \##
Assessment result: last completed GEG checkpoint (per the zip) \###
Purpose Identify the most recent \*\*GEG-xxx checkpoint marked as
completed\*\* in the uploaded snapshot
\`guitar-edu-ui_01_15_26_78.zip\`. \### Files reviewed (read-only) -
\`BUILD_LOG.md\` - \`CHANGELOG.md\` - \`CHECKLIST.md\` - \`docs/TASK_B

2026-01-16 10:28:58 UTC --- Guitar Edu Game Setup --- assistant: \##
Step completed: reconcile "GEG-xxx completion" conflicts (doc authority
clarified) \### Purpose Remove ambiguity about which files define "done
vs remaining," so we can return to checklist-driven coding without
documentation drift. \### Files touched (docs-only) -
\`docs/TASK_BOARD.md\` \*(marked lega

Anchor Evidence (docs)

CHECKLIST.md: - \[x\] \*\*GEG-001\*\* Engage / \*\*End\*\* / New
correctly control a single match instance (End truly terminates the
match state).

BUILD_LOG.md: - Completed GEG-001: restored deterministic repaint of
Canvas2D surfaces by calling renderer \`draw()\` from the controller
\`renderAll()\` loop.

BUILD_LOG.md: - Checklist: GEG-001 marked complete.

GEG-002

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-10 08:43:42 UTC --- Patch Splash Match Rules --- assistant: You
were last at \*\*A1.40 (Settings Enforcement)\*\*. With the patches
applied since then, you are now at \*\*A1.46\*\*. \### A1.41--A1.46
(what moved forward) \*\*A1.41 --- Splash owns Match Rules\*\* - Match
Rules removed from the in-game/left menu and live entirely on the Start
Menu UI. \*\*A1.42 --- Dev/Test unloc

2026-01-10 09:17:47 UTC --- Patch Splash Match Rules --- assistant:
Implemented the next functional patch (now tracked as \*\*A1.48\*\*) and
rolled it into a new correctly-named build. \### What changed (A1.48) -
\*\*Turn-start is now "real" in the engine → UI pipeline\*\* - Added a
new engine effect: \`TURN_STARTED\` - Emitted on \`START_TURN\` (only
when a prompt is actually g

2026-01-10 09:30:43 UTC --- Patch Splash Match Rules --- assistant:
You're right --- \*\*the GEG tracking path in the repo docs was
drifting\*\*, mainly because Start Menu enforcement was living under
\*\*"A0"\*\* while the rest of the requirements were \*\*GEG-###\*\*,
and the \*\*A-series ↔ GEG-series crosswalk wasn't explicit\*\*. \###
What I changed after reviewing the recorded do

2026-01-10 09:37:10 UTC --- Patch Splash Match Rules --- assistant:
Confirmed --- the safest way to stay on the \*\*most up-to-date path\*\*
is to make \*\*date-based precedence explicit\*\* in the repo (so older
notes cannot "win" by accident). \### What I checked - Reviewed the
dated canon in \`DOCS/DECISIONS_LOG.md\`: - \*\*Newest guidance is
2026-01-10\*\* (A1.48, A1.47, A1.41--A

2026-01-10 09:51:49 UTC --- Patch Splash Match Rules --- assistant: You
are currently at \*\*A1.48\*\* (GEG-002 prerequisite): \*\*turn-start
timer wiring is in place\*\*, with \*\*A1.41--A1.47 already
consolidated\*\* (Start Menu enforcement, Dev unlock, system menu
restriction, pointer reliability, End/New hardened, \*\*no Pause\*\*,
and visible intermission countdown). I also ali

2026-01-10 10:50:34 UTC --- Patch Splash Match Rules --- assistant:
Understood. I just did a \*\*canon audit\*\* on the latest packaged
build (\*\*\`guitar-edu-ui_01_10_26_09.zip\`\*\*) by reading the repo's
recorded documentation (not memory), and I'm now locked to the
\*\*newest dated path\*\*. \### Canon lock: what I am using as the
source of truth \*\*Order of authority (hard ru

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-002\*\* Turn loop fully wired: turn start
→ input → end turn → scoring → (bonus phase if \*\*enabled and
triggered\*\*) → next player.

BUILD_LOG.md: - Checklist: add note under GEG-002; add GEG-005
multiplayer player roster UI.

GEG-003

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-10 09:07:49 UTC --- Patch Splash Match Rules --- assistant: You
were last at \*\*A1.40\*\*. With the patches since then, you are now
at: - \*\*A1.46\*\* (Start Menu enforcement + input reliability + "no
pause") - \*\*A1.47\*\* (Multiplayer intermission countdown visibility)
\### What I just implemented (A1.47) - \*\*Multiplayer intermission is
now visible\*\* via a countdown

2026-01-10 10:05:01 UTC --- Patch Splash Match Rules --- assistant:
Implemented the fix for \*\*"turn timer works but there is no
intermission"\*\* and advanced the build. \### What was wrong The engine
\*was\* entering \`phase = \"INTERMISSION\"\`, but the UI \*\*was not
re-rendering after reducer dispatch\*\*, so the intermission phase never
visibly appeared. \### What's now fixe

2026-01-10 10:50:34 UTC --- Patch Splash Match Rules --- assistant:
Understood. I just did a \*\*canon audit\*\* on the latest packaged
build (\*\*\`guitar-edu-ui_01_10_26_09.zip\`\*\*) by reading the repo's
recorded documentation (not memory), and I'm now locked to the
\*\*newest dated path\*\*. \### Canon lock: what I am using as the
source of truth \*\*Order of authority (hard ru

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 12:39:01 UTC --- Guitar Edu Game Setup --- assistant:
Understood. I will \*\*resume the checklist at the lowest-numbered
item\*\* and \*\*advance only to the next item that can be legitimately
completed\*\*, strictly following canon and the Stability Audit rules.
Below is the \*\*initial pass\*\* with clear determinations. \*\*No
boxes are checked yet\*\*---I will ask f

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[x\] \*\*GEG-003\*\* Intermission phase displays and
transitions correctly (multiplayer).

GEG-004

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 12:39:01 UTC --- Guitar Edu Game Setup --- assistant:
Understood. I will \*\*resume the checklist at the lowest-numbered
item\*\* and \*\*advance only to the next item that can be legitimately
completed\*\*, strictly following canon and the Stability Audit rules.
Below is the \*\*initial pass\*\* with clear determinations. \*\*No
boxes are checked yet\*\*---I will ask f

2026-01-16 12:44:04 UTC --- Guitar Edu Game Setup --- assistant:
Understood. The checklist \*\*is\*\* partially outdated relative to the
\*\*current Start/Launch menu + Match Options UI\*\* in the latest
snapshot (\`guitar-edu-ui_01_16_26_83.zip\`). I scanned the canon docs
and the actual UI implementation to identify \*\*exact conflicts\*\* and
the \*\*minimum revision set\*\* ne

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-004\*\* Bonus phase reliably reachable and
visible (including via dev tools).

GEG-005

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 11:00:56 UTC --- Match Options UI Reconciliation ---
assistant: They are \*\*not "missing tasks"\*\* in the current canon
set. In \*\*01_13_26_19\*\*, the \*\*only authoritative task ledger\*\*
that defines GEG IDs is \*\*CHECKLIST.md\*\*, and it simply does \*\*not
define\*\* a large number of numbers---so those IDs \*\*do not exist\*\*
in the project right now unless we explicitly add

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-005\*\* Multiplayer player roster UI: show
player count, editable player names, add/remove players with controls
(future: link to accounts).

BUILD_LOG.md: - Checklist: add note under GEG-002; add GEG-005
multiplayer player roster UI.

GEG-010

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 12:39:01 UTC --- Guitar Edu Game Setup --- assistant:
Understood. I will \*\*resume the checklist at the lowest-numbered
item\*\* and \*\*advance only to the next item that can be legitimately
completed\*\*, strictly following canon and the Stability Audit rules.
Below is the \*\*initial pass\*\* with clear determinations. \*\*No
boxes are checked yet\*\*---I will ask f

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

2026-01-16 22:22:52 UTC --- Guitar Edu Game Setup --- assistant:
Acknowledged. \*\*Runtime test cadence is now locked: every 15
iterations starting at build 90\*\* (90, 105, 120, ...). No test run
will be requested outside that cadence unless you explicitly override.
\## Next step completed (Build 89): Preferences redundancy cleanup \###
Purpose Remove \*\*non-presentation

2026-01-16 22:31:09 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding to \*\*Build 90 runtime checkpoint\*\* (per the new cadence:
\*\*90, 105, 120...\*\*). \## What I changed for Build 90 (minimal +
deterministic) \### Purpose - Stop the "wrong nested folder" issue at
the source (by ensuring the \*\*top-level folder name matches the zip
name\*\*) - Make Build 90 a clean,

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-010\*\* Sequence detection in 4
directions: horizontal, vertical, diagonal up, diagonal down.

GEG-011

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 12:39:01 UTC --- Guitar Edu Game Setup --- assistant:
Understood. I will \*\*resume the checklist at the lowest-numbered
item\*\* and \*\*advance only to the next item that can be legitimately
completed\*\*, strictly following canon and the Stability Audit rules.
Below is the \*\*initial pass\*\* with clear determinations. \*\*No
boxes are checked yet\*\*---I will ask f

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-011\*\* Segment scoring matches canon (4+
run):

GEG-012

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:18:44 UTC --- Match Options UI Reconciliation ---
assistant: Below are \*\*lock-in tables\*\* for the five items you
listed. Treat these as \*\*canonical truth tables\*\* for implementation
and testing. They are written to be \*\*deterministic\*\*,
\*\*non-overlapping\*\*, and \*\*compatible with the
"Active/Prompt/Mark" surface model\*\*. \-\-- \# 1) Display modes
priority and sta

2026-01-14 11:43:51 UTC --- Match Options UI Reconciliation ---
assistant: Locked. Here are the \*\*final canon tables\*\* for the
remaining items (2--5), updated so they are \*\*lexicon-safe\*\* and
\*\*do not reinvent\*\* anything that your fine-detail definitions
already cover. \-\-- \# 2) Difficulty matrix truth table (Easy / Medium
/ Hard + Free Play) \*\*Lock:\*\* "Learning" is removed

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-012\*\* Token awarding matches canon:
\*\*1 token per NEW segment\*\* (not per note, not per extension).

GEG-013

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-013\*\* Steal token spend + resolution
works (ownership updates + scoring side-effects where applicable).

GEG-014

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-014\*\* Last-chance phase works:
steals/tokens-only behavior and clean end conditions.

GEG-015

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-015\*\* Main Menu Settings: \*\*Token
cap\*\* adjustable.

GEG-016

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-016\*\* Main Menu Settings: \*\*Starting
tokens\*\* adjustable (supports gameplay variants).

GEG-020

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-020\*\* Player card includes: avatar,
score, tokens, \*\*timer\*\* (turn timer) to save UI space.

GEG-021

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 23:17:15 UTC --- Guitar Edu Game Setup --- assistant: Done.
\## A) Solution B is now canonical \### Purpose Eliminate the redundant
nested folder issue during Windows extraction by switching snapshot
artifacts to \*\*flat zip format\*\*. \### Files touched -
\`DECISIONS_LOG.md\` (packaging invariant + extraction rule updated) -
\`tools/tripwire_zip_structure.mjs

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-021\*\* Multiplayer player setup: show
player count, editable player names, and a visual add/remove list for
player slots (future: link to accounts).

CHECKLIST.md: - \[x\] \*\*GEG-021\*\* Multiplayer player roster UI:

CHECKLIST.md: - \[ \] \*\*GEG-021a\*\* (Deferred) Account linking hook:
roster slots must be compatible with later account selection/import, but
no account system is required for completion of GEG-021.

CHECKLIST.md: - \[ \] \*\*GEG-021a\*\* (Deferred) Account linking hook:
roster slots must be compatible with later account selection/import, but
no account system is required for completion of GEG-021.

CHECKLIST.md: - \[ \] \*\*GEG-110\*\* Remove legacy/superseded item:
\*\*GEG-021\*\* (no longer relevant).

BUILD_LOG.md: - Checklist update: add GEG-021 / GEG-021a for multiplayer
roster + player naming.

BUILD_LOG.md: - Checklist update: add GEG-021 / GEG-021a for multiplayer
roster + player naming.

CHANGELOG.md: - Checklist: added GEG-021 roster + player names (and
deferred GEG-021a).

GEG-022

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-022\*\* In-match leaderboard shows
\*\*active players only\*\* (no empty slots).

GEG-023

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-023\*\* Add \*\*persistent High Score
Board\*\* (saved across sessions; local storage acceptable for now) and
render it in Utility area.

GEG-030

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-10 11:10:55 UTC --- Patch Splash Match Rules --- assistant:
You're no longer at \*\*A1.40\*\* --- the repo is now at \*\*A1.51\*\*
(with A1.41--A1.50 already captured in \`DOCS/CHANGELOG.md\` and
\`DOCS/DECISIONS_LOG.md\`). \## What I corrected + advanced (A1.51)
\### 1) Gameplay Type tabs are now \*\*real controls\*\* - \*\*Single
Note / Chords / Scales\*\* tabs are now \*\*clickable

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 11:09:02 UTC --- Guitar Edu Game Setup --- assistant:
Approved refinements applied \*\*(docs-only)\*\* --- with one important
constraint: - ✅ I \*\*did\*\* implement the \*\*Section D rewrite\*\*
exactly as previously proposed (Surface Controls + Active Surface Matrix
as the primary abstraction; legacy Mode 1--5 removed from the checklist
language). - ⚠️ I \*\*did not\*

2026-01-16 11:11:25 UTC --- Guitar Edu Game Setup --- assistant:
Understood. Proceeding with a \*\*strict re-audit\*\* under Stability
Audit rules. This is \*\*analysis only\*\*. No files are changed in this
step. \-\-- \# Comprehensive Re-Audit Report \*\*Snapshot under
review:\*\* \`guitar-edu-ui_01_15_26_79.zip\` \*\*Baseline
comparison:\*\* \`guitar-edu-ui_01_15_26_78.zip\` \*\*Phase

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-030\*\* Surface Control System replaces
rigid "Mode 1--5" selection.

GEG-031

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-10 11:47:01 UTC --- Patch Splash Match Rules --- assistant:
Understood, and corrected. \### What changed (A1.53) - \*\*"Not visible"
no longer removes the panel.\*\* Staff/TAB and Fretboard sections now
\*\*stay in the layout\*\* (no UI jumping). - \*\*"Not visible" now
means:\*\* - the \*\*overlay layer\*\* (notes/positions/claims) is
hidden, and - \*\*interaction is disabled

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-031\*\* Active Surface Matrix governs both
rendering and allowed input per surface.

GEG-032

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-032\*\* Surface independence is the
default.

GEG-033

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-033\*\* Surface Control System is the
primary configuration mechanism.

GEG-034

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-034\*\* Presets A--J define bundled
Surface Control configurations.

GEG-035

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-035\*\* Match configuration is finalized
at engage/start.

GEG-036

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 11:09:02 UTC --- Guitar Edu Game Setup --- assistant:
Approved refinements applied \*\*(docs-only)\*\* --- with one important
constraint: - ✅ I \*\*did\*\* implement the \*\*Section D rewrite\*\*
exactly as previously proposed (Surface Controls + Active Surface Matrix
as the primary abstraction; legacy Mode 1--5 removed from the checklist
language). - ⚠️ I \*\*did not\*

2026-01-16 11:11:25 UTC --- Guitar Edu Game Setup --- assistant:
Understood. Proceeding with a \*\*strict re-audit\*\* under Stability
Audit rules. This is \*\*analysis only\*\*. No files are changed in this
step. \-\-- \# Comprehensive Re-Audit Report \*\*Snapshot under
review:\*\* \`guitar-edu-ui_01_15_26_79.zip\` \*\*Baseline
comparison:\*\* \`guitar-edu-ui_01_15_26_78.zip\` \*\*Phase

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-036\*\* All surface input gating must key
exclusively off Prompt / Mark / Display / SAM roles.

GEG-040

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:18:44 UTC --- Match Options UI Reconciliation ---
assistant: Below are \*\*lock-in tables\*\* for the five items you
listed. Treat these as \*\*canonical truth tables\*\* for implementation
and testing. They are written to be \*\*deterministic\*\*,
\*\*non-overlapping\*\*, and \*\*compatible with the
"Active/Prompt/Mark" surface model\*\*. \-\-- \# 1) Display modes
priority and sta

2026-01-14 11:43:51 UTC --- Match Options UI Reconciliation ---
assistant: Locked. Here are the \*\*final canon tables\*\* for the
remaining items (2--5), updated so they are \*\*lexicon-safe\*\* and
\*\*do not reinvent\*\* anything that your fine-detail definitions
already cover. \-\-- \# 2) Difficulty matrix truth table (Easy / Medium
/ Hard + Free Play) \*\*Lock:\*\* "Learning" is removed

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-040\*\* Learning difficulty: show
\*\*all\*\* labels AND still fully playable (simulate gameplay:
claim/highlight, trigger sequences, earn tokens).

GEG-041

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-10 11:10:55 UTC --- Patch Splash Match Rules --- assistant:
You're no longer at \*\*A1.40\*\* --- the repo is now at \*\*A1.51\*\*
(with A1.41--A1.50 already captured in \`DOCS/CHANGELOG.md\` and
\`DOCS/DECISIONS_LOG.md\`). \## What I corrected + advanced (A1.51)
\### 1) Gameplay Type tabs are now \*\*real controls\*\* - \*\*Single
Note / Chords / Scales\*\* tabs are now \*\*clickable

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-041\*\* SAM options: \`single\` and
\`multiple\`.

GEG-042

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-10 12:18:08 UTC --- Patch Splash Match Rules --- assistant: \###
✅ Proceeded to the next step --- and corrected the trajectory We are
\*\*no longer at A1.40\*\*. Based on the latest recorded decisions and
the code state inside \`/mnt/data/guitar_13/guitar-edu-ui\`, the project
has already advanced through \*\*A1.53\*\*, and I have now implemented
the next logical step th

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:00:56 UTC --- Match Options UI Reconciliation ---
assistant: They are \*\*not "missing tasks"\*\* in the current canon
set. In \*\*01_13_26_19\*\*, the \*\*only authoritative task ledger\*\*
that defines GEG IDs is \*\*CHECKLIST.md\*\*, and it simply does \*\*not
define\*\* a large number of numbers---so those IDs \*\*do not exist\*\*
in the project right now unless we explicitly add

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

2026-01-16 12:44:04 UTC --- Guitar Edu Game Setup --- assistant:
Understood. The checklist \*\*is\*\* partially outdated relative to the
\*\*current Start/Launch menu + Match Options UI\*\* in the latest
snapshot (\`guitar-edu-ui_01_16_26_83.zip\`). I scanned the canon docs
and the actual UI implementation to identify \*\*exact conflicts\*\* and
the \*\*minimum revision set\*\* ne

2026-01-16 13:12:19 UTC --- Guitar Edu Game Setup --- assistant: Proceed
complete. I performed the \*\*checklist/spec alignment revision\*\*
based on your resolutions and removed the specific outdated elements you
flagged. \## Brief summary - Implemented \*\*R-1 (A):\*\* removed the
\*\*Accidentals Pool control\*\* from Match Options UI, while preserving
\*\*Staff Accidentals\*\*

2026-01-16 13:26:34 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding as directed. I performed a \*\*comprehensive, step-by-step
audit\*\* of the canon docs against the \*\*current Launch/Menu + Match
Options\*\* implementation and applied the \*\*minimum revisions\*\*
needed to resolve the specific outdated instructions you flagged
(without introducing new systems). \#

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-042\*\* Default fret range: \*\*min 0, max
12, visible 12 frets\*\*.

GEG-043

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-043\*\* Note visibility modes everywhere:
\*\*All / Naturals / Enharmonic\*\* (rail + fretboard reflect choice).

GEG-044

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-044\*\* Highlighting system supports:

GEG-045

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-045\*\* Note display options (global,
consistent across UI):

GEG-050

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-050\*\* Staff hover highlight + click
placement aligned to staff lines/spaces.

GEG-051

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-051\*\* Tab hover highlight + click
placement aligned to tab lines + measure divisions.

CHECKLIST.md: - \[ \] \*\*GEG-051a\*\* Staff + Tab share a single
\*\*subdivision timeline\*\*:

GEG-052

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-052\*\* TAB mode behavior: player can
\*\*select string then input fret\*\* OR \*\*input fret then select
string\*\*.

GEG-053

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-053\*\* Keypad accepts only \*\*0--24\*\*
(reject 25+).

GEG-054

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-054\*\* "Multiple valid answers" handled
cleanly:

GEG-055

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-055\*\* Mirroring behavior options:

GEG-060

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:18:44 UTC --- Match Options UI Reconciliation ---
assistant: Below are \*\*lock-in tables\*\* for the five items you
listed. Treat these as \*\*canonical truth tables\*\* for implementation
and testing. They are written to be \*\*deterministic\*\*,
\*\*non-overlapping\*\*, and \*\*compatible with the
"Active/Prompt/Mark" surface model\*\*. \-\-- \# 1) Display modes
priority and sta

2026-01-14 11:43:51 UTC --- Match Options UI Reconciliation ---
assistant: Locked. Here are the \*\*final canon tables\*\* for the
remaining items (2--5), updated so they are \*\*lexicon-safe\*\* and
\*\*do not reinvent\*\* anything that your fine-detail definitions
already cover. \-\-- \# 2) Difficulty matrix truth table (Easy / Medium
/ Hard + Free Play) \*\*Lock:\*\* "Learning" is removed

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-060\*\* Current note centered; two-octave
span; "endless loop" illusion.

GEG-061

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-061\*\* Chromatic uses rotating rail;
scales/keys/chords use fixed reference rail.

GEG-062

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-062\*\* Rail labels never overflow a cell
(sharps/flats stay within the note cell region).

GEG-063

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-063\*\* Rail is clickable (acts like a
button/input surface):

GEG-064

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-064\*\* Rail selection integrates into the
unified input pipeline (per-mode and per-settings behavior).

GEG-070

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-070\*\* Interval Roman display format: \`I
ii II iii III IV \...\`

GEG-071

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:21:31 UTC --- Guitar Edu Game Setup --- assistant: \##
Reconciliation via code audit (canon-safe) \### Purpose Reconcile the
conflicting "GEG-xxx completion" signals by checking what the \*\*code
actually implements\*\* versus what the various tracking docs claim.
\### Files touched - \`docs/SUGGESTIONS_LOG.md\` \*(doc-only: logged
conflicts per drift-prevent

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

2026-01-16 11:09:02 UTC --- Guitar Edu Game Setup --- assistant:
Approved refinements applied \*\*(docs-only)\*\* --- with one important
constraint: - ✅ I \*\*did\*\* implement the \*\*Section D rewrite\*\*
exactly as previously proposed (Surface Controls + Active Surface Matrix
as the primary abstraction; legacy Mode 1--5 removed from the checklist
language). - ⚠️ I \*\*did not\*

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-071\*\* Tritone: make \*\*all options
available\*\*:

GEG-072

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:15:38 UTC --- Guitar Edu Game Setup --- assistant: \##
Assessment result: last completed GEG checkpoint (per the zip) \###
Purpose Identify the most recent \*\*GEG-xxx checkpoint marked as
completed\*\* in the uploaded snapshot
\`guitar-edu-ui_01_15_26_78.zip\`. \### Files reviewed (read-only) -
\`BUILD_LOG.md\` - \`CHANGELOG.md\` - \`CHECKLIST.md\` - \`docs/TASK_B

2026-01-16 10:28:58 UTC --- Guitar Edu Game Setup --- assistant: \##
Step completed: reconcile "GEG-xxx completion" conflicts (doc authority
clarified) \### Purpose Remove ambiguity about which files define "done
vs remaining," so we can return to checklist-driven coding without
documentation drift. \### Files touched (docs-only) -
\`docs/TASK_BOARD.md\` \*(marked lega

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-072\*\* Tritone spelling resolved by
\*\*scale/mode/key context\*\* where applicable (some scales imply #IV,
others ♭V).

GEG-080

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-080\*\* Utility tabs exist and match
labels: Num / Note / Chord / Scale.

GEG-081

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-081\*\* Num tab:

GEG-082

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-082\*\* Note tab:

GEG-083

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-083\*\* Chord tab:

GEG-084

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-084\*\* Scale tab:

GEG-090

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-090\*\* Dev/Test Mode toggle in Main Menu
Settings works.

GEG-091

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-091\*\* When Dev/Test is enabled, show dev
options inside the Utility/Misc area (per spec).

GEG-092

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-092\*\* Dev tools allow:

GEG-100

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-100\*\* Update fretboard background image
and re-align hitboxes precisely.

GEG-101

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-101\*\* Update staff + tablature
background and re-align hitboxes precisely.

GEG-102

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-102\*\* Confirm hover highlight + click
zones align to the new art at different viewport sizes.

GEG-110

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-110\*\* Remove legacy/superseded item:
\*\*GEG-021\*\* (no longer relevant).

GEG-111

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-111\*\* Stop button label is \*\*End\*\*
(ends the game instance).

GEG-112

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 12:44:04 UTC --- Guitar Edu Game Setup --- assistant:
Understood. The checklist \*\*is\*\* partially outdated relative to the
\*\*current Start/Launch menu + Match Options UI\*\* in the latest
snapshot (\`guitar-edu-ui_01_16_26_83.zip\`). I scanned the canon docs
and the actual UI implementation to identify \*\*exact conflicts\*\* and
the \*\*minimum revision set\*\* ne

2026-01-16 13:12:19 UTC --- Guitar Edu Game Setup --- assistant: Proceed
complete. I performed the \*\*checklist/spec alignment revision\*\*
based on your resolutions and removed the specific outdated elements you
flagged. \## Brief summary - Implemented \*\*R-1 (A):\*\* removed the
\*\*Accidentals Pool control\*\* from Match Options UI, while preserving
\*\*Staff Accidentals\*\*

2026-01-16 13:26:34 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding as directed. I performed a \*\*comprehensive, step-by-step
audit\*\* of the canon docs against the \*\*current Launch/Menu + Match
Options\*\* implementation and applied the \*\*minimum revisions\*\*
needed to resolve the specific outdated instructions you flagged
(without introducing new systems). \#

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-112\*\* Accidentals controls are present
in Match Controls UI and staff accidental behavior is preserved (staff
adheres to standard notation rules; other surfaces remain flexible).

GEG-113

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-113\*\* Remove "Unlimited Misses" and "No
Hints" from play style options (per project direction).

GEG-116

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-15 02:54:25 UTC --- Match Options UI Reconciliation ---
assistant: Added to canon: \*\*Right-click (mouse context menu) opens an
Answer Shortcut Menu\*\* (details to be defined/refined later). \## Next
steps \### 1) Canon insertion points (documentation) -
\*\*DOCS/LOCK_IN_TABLES.md\*\* - Add a new subsection under
input/interaction rules: \*\*Answer Shortcut Menu (Right-Click

2026-01-15 03:00:06 UTC --- Match Options UI Reconciliation ---
assistant: Completed. I \*\*canonized\*\* the right-click Answer
Shortcut Menu and made it \*\*auditable + testable in docs\*\* (without
defining contents prematurely). \### What I shipped (doc + ledger
updates) - \*\*Created:\*\* \`DOCS/LOCK_IN_TABLES.md\` - Locks the five
truth-table areas (Display Modes, Difficulty, SAM,

2026-01-15 03:06:13 UTC --- Match Options UI Reconciliation ---
assistant: Understood. Right-click stays in canon, but we will \*\*not
implement it now\*\*. \## Updated priority - \*\*GEG-116 (Right-click
Answer Shortcut Menu):\*\* Defer. No code work until higher-priority
testing blockers are cleared. \## Next step The next highest-value step
for testing is to make sure \*\*the core

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] GEG-116 Right-click Answer Shortcut Menu
(surface-aware, context-gated; submits through unified input pipeline).

CHANGELOG.md: - Checklist: Added \`GEG-116\` Right-click Answer Shortcut
Menu.

GEG-200

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-200\*\* Readability/contrast pass across
menus and tabs.

GEG-201

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-201\*\* Button/tab state styling
consistency (selected vs disabled vs hover).

GEG-202

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:00:56 UTC --- Match Options UI Reconciliation ---
assistant: They are \*\*not "missing tasks"\*\* in the current canon
set. In \*\*01_13_26_19\*\*, the \*\*only authoritative task ledger\*\*
that defines GEG IDs is \*\*CHECKLIST.md\*\*, and it simply does \*\*not
define\*\* a large number of numbers---so those IDs \*\*do not exist\*\*
in the project right now unless we explicitly add

Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-202\*\* Spacing/alignment final pass:
staff/tab, rail, fretboard, utility panels.

MATCH_SETTINGS_APPLY

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-10 11:28:38 UTC --- Patch Splash Match Rules --- assistant: You
were at \*\*A1.40\*\* earlier; the current build line is now at
\*\*A1.52\*\*. I applied the \*\*next step (A1.52)\*\* to keep the
project trajectory "playable-first" and to stop settings drift: -
\*\*Fixed live settings sync\*\* - \`accidentalView\` now correctly
syncs from Start Menu → active match settings. -

2026-01-14 09:30:49 UTC --- Match Options UI Reconciliation --- user:
Goal: Finalize and implement the Match Options UI and behavior using the
existing archive as the single source of truth, resolving only
documented conflicts and making no speculative additions. This frames
the conversation as execution + reconciliation, not ideation. 2. Files
to Treat as Authoritati

2026-01-14 09:30:51 UTC --- Match Options UI Reconciliation ---
assistant: \## Authoritative files for this chat (single source of
truth) MATCH_SETTINGS_SPEC.md START_SCREEN_UI_MAPPING.md
ADVANCED_MATCH_OPTIONS_UI_MAPPING.md DEPRECATED_TERMS.md Latest build
archive (guitar-edu-ui_01_13_26_18.zip or newer) If something is not in
these files, it does not exist unless we expli

2026-01-14 09:32:50 UTC --- Match Options UI Reconciliation --- user:
Goal: Finalize and implement the Match Options UI and behavior using the
existing archive as the single source of truth, resolving only
documented conflicts and making no speculative additions. This frames
the conversation as execution + reconciliation, not ideation. 2. Files
to Treat as Authoritati

2026-01-14 09:33:53 UTC --- Match Options UI Reconciliation ---
assistant: MATCH_SETTINGS_SPEC.md START_SCREEN_UI_MAPPING.md
ADVANCED_MATCH_OPTIONS_UI_MAPPING.md DEPRECATED_TERMS.md Latest build
archive (guitar-edu-ui_01_13_26_18.zip or newer) If something is not in
these files, it does not exist unless we explicitly add it. - No legacy
Mode 1--5 concepts - Musical modes ar

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 12:21:36 UTC --- Match Options UI Reconciliation ---
assistant: Understood. To reliably test what you \*already have\*, the
menus must match the \*\*canonical menu spec\*\* you uploaded
(\`Guitar-Edu-UI_Menu_Layout_and_Design.md\`) and the match canon docs
in the build. Below is a \*\*menu compliance checklist\*\* (what's
currently mismatched vs what must be true), followed

2026-01-14 13:09:41 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding---with \*\*context-gated controls\*\* explicitly
incorporated---so the menus become test-ready \*\*without inventing new
systems\*\*. \## What "up to date" means for testing A tester should be
able to: - Start a match with \*\*Basic Match Settings\*\* fully visible
and complete. - Expand \*\*Advanced Match

MULTI_SURFACE_DESYNC

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 02:56:03 UTC --- Guitar education game design --- assistant:
Below is a \*\*Systems Contract\*\* you can treat as the "immutable
spine" of the project. It's written engine-first, renderer-agnostic, and
covers the rules you've locked in so far. (It's intentionally explicit
so it can be implemented and unit-tested.) \-\-- \# Guitar Education
Game Systems Contract v1.0

2025-12-19 16:01:03 UTC --- Guitar education game design --- user: I
think there is a misunderstanding of what I want for mode 3. I don\'t
want the strings to be in the \"10 key\" that makes it not a 10 key\...
the interfaces goal for this game needs to include tablature to
reinforce reading the notes from it. the way I envision this working is
the player clicks on the

2025-12-19 16:28:21 UTC --- Guitar education game design --- assistant:
You're absolutely right---Mode 3 should \*\*teach tablature fluency\*\*,
so the interface must \*\*look and behave like tab\*\*, not like a
keypad with strings embedded in it. Here's what I've implemented
conceptually and partially in the current shell, and what still needs
finishing before you'll have a clea

2025-12-19 17:02:38 UTC --- Guitar education game design --- assistant:
Understood --- \*\*Mode 3 should be tab-only\*\*, and \*\*Mode 4 will be
the one that combines tab + staff + fretboard\*\*. The version you
tested treated Mode 3 like "tab keypad + string buttons," which breaks
the learning goal (it's not reinforcing real tablature reading/writing).
Here's what we are impleme

2025-12-19 17:22:25 UTC --- Guitar education game design --- assistant:
You can have \*\*both consistency and maximum learning impact\*\* if you
separate three things that are currently entangled: 1) \*\*What the
player sees (representation)\*\*: tab, staff, fretboard 2) \*\*What the
player must do (task)\*\*: write tab, read tab, name a note, find a
location 3) \*\*What the competit

2025-12-19 18:14:47 UTC --- Guitar education game design --- assistant:
Yep --- that sketch is a strong "systems UI" layout. It's basically a
\*\*3-zone vertical stack + right-side player dock\*\*, which scales
cleanly from mouse to smartboard. Here's how I'd formalize it so we can
build it without rework, including the rotating/shrinking scorecards.
\-\-- \## Screen layout cont

NOTE_RAIL

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-24 19:28:15 UTC --- Guitar Learning Game Requirements ---
assistant: \### \*\*Detailed Summary of Guitar Learning Game
Requirements\*\* The project centers around a \*\*guitar learning
game\*\* that teaches players various musical concepts such as
\*\*notes, chords, scales, and intervals\*\*, through an interactive
gaming experience. Below is a detailed, structured breakdown of t

2025-12-24 19:47:16 UTC --- Guitar Learning Game Requirements ---
assistant: \### \*\*Detailed Description of the Guitar Learning Game
Interface\*\* The user interface (UI) for the \*\*Guitar Learning
Game\*\* should provide a \*\*clean, intuitive, and engaging\*\*
environment that allows players to learn guitar concepts in a visually
stimulating way. The interface needs to blend functio

2025-12-24 19:55:30 UTC --- Guitar Learning Game Requirements ---
assistant: \### \*\*Detailed Description of the Guitar Learning Game
Interface\*\* The \*\*guitar learning game interface\*\* is designed to
provide an intuitive and immersive environment for learning musical
concepts like notes, chords, scales, and intervals. This interface
should not only be functional but also engag

2025-12-24 19:56:20 UTC --- Guitar Learning Game Requirements ---
assistant: The interface for the guitar learning game should be
intuitive and visually engaging, offering clear feedback for both
beginners and experienced players. The key elements of the interface are
outlined below, with attention to user experience, functionality, and
scalability. \-\-- \### \*\*1. Main View an

2025-12-24 19:59:26 UTC --- Guitar Learning Game Requirements ---
assistant: \### \*\*Detailed Description of the Game Modes\*\* The
guitar learning game will feature \*\*four main modes\*\* to guide
players through various aspects of music theory, and two additional
modes (Chords and Scales) that have yet to be fully added. Each mode has
a specific educational focus, allowing player

2025-12-24 20:04:41 UTC --- Guitar Learning Game Design - Layout HTML,
CSS, JAVA --- user: Detailed Summary of Guitar Learning Game
Requirements The project centers around a guitar learning game that
teaches players various musical concepts such as notes, chords, scales,
and intervals, through an interactive gaming experience. Below is a
detailed, structured breakdown of the requirements

2025-12-24 20:04:42 UTC --- Guitar Learning Game Design - Layout HTML,
CSS, JAVA --- assistant: \### Guitar Learning Game: Detailed Project
Breakdown \*\*Objective:\*\* The guitar learning game aims to teach
players musical theory concepts such as notes, chords, scales,
intervals, and more through an interactive gaming experience. Below is a
comprehensive breakdown of the project's requirements, fo

2025-12-24 20:34:10 UTC --- Guitar Learning Game Design - Layout HTML,
CSS, JAVA --- assistant: We can proceed to coding the layout based on
the provided files and the structure. From the files you\'ve uploaded,
the \`package.json\`, \`vite.config.ts\`, and \`tsconfig.json\` give us
important information about the build environment (Vite, TypeScript),
while the SVGs provide assets like guitar tabs, f

RIGHT_CLICK_SHORTCUT

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-12 08:53:38 UTC --- Guitar-Edu-UI Audit --- user: the dev/tools
are not showing up as activated but cannot see the controls. I have
attached screen shots showing step by step what is happening and how
things are not appearing or disappearing when one input after another is
put in. i cannot test making chords in the staff as only one note is
showing

2026-01-15 02:54:14 UTC --- Match Options UI Reconciliation --- user:
before I forget\... I just got the idea to use the mouse right click as
a shortcut menu for answers, add it to the cannon which we can flush out
and define/refine later. show next steps

2026-01-15 02:54:16 UTC --- Match Options UI Reconciliation ---
assistant: Add to Guitar Education Game canon: use mouse right-click as
a shortcut/context menu for answers (to be defined/refined later).

2026-01-15 02:54:25 UTC --- Match Options UI Reconciliation ---
assistant: Added to canon: \*\*Right-click (mouse context menu) opens an
Answer Shortcut Menu\*\* (details to be defined/refined later). \## Next
steps \### 1) Canon insertion points (documentation) -
\*\*DOCS/LOCK_IN_TABLES.md\*\* - Add a new subsection under
input/interaction rules: \*\*Answer Shortcut Menu (Right-Click

2026-01-15 03:00:06 UTC --- Match Options UI Reconciliation ---
assistant: Completed. I \*\*canonized\*\* the right-click Answer
Shortcut Menu and made it \*\*auditable + testable in docs\*\* (without
defining contents prematurely). \### What I shipped (doc + ledger
updates) - \*\*Created:\*\* \`DOCS/LOCK_IN_TABLES.md\` - Locks the five
truth-table areas (Display Modes, Difficulty, SAM,

2026-01-15 03:06:13 UTC --- Match Options UI Reconciliation ---
assistant: Understood. Right-click stays in canon, but we will \*\*not
implement it now\*\*. \## Updated priority - \*\*GEG-116 (Right-click
Answer Shortcut Menu):\*\* Defer. No code work until higher-priority
testing blockers are cleared. \## Next step The next highest-value step
for testing is to make sure \*\*the core

2026-01-15 04:34:28 UTC --- Match Options UI Reconciliation ---
assistant: Below is a \*\*clean, authoritative "fresh chat" instruction
block\*\* you can paste verbatim into a new conversation. It is designed
to force a \*\*full audit\*\*, eliminate drift, and reset the assistant
into \*\*execution + reconciliation mode\*\*, not ideation. \-\-- \#
Guitar Education Game --- Full Audit & Rec

2026-01-15 04:37:12 UTC --- Guitar Education Game Audit --- user: Guitar
Education Game --- Full Audit & Recovery Pass Primary Objective Conduct
a full audit of the Guitar Education Game project with the goal of
restoring functional rendering, interaction, and testability, strictly
using the existing documentation and build artifacts as the single
source of truth. T

RUNTIME_TESTS

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2026-01-12 09:15:45 UTC --- Guitar-Edu-UI Audit --- assistant:
Yes---adding a \*\*repeatable test script + a one-click runner\*\* will
dramatically speed iteration, especially for the staff/tab timeline and
Mode 3 truth rules. \## A practical testing stack for GuitarEdu UI
\### 1) "Fast logic tests" (no browser UI) Use \*\*Vitest\*\* for pure,
deterministic tests of the ru

2026-01-12 09:26:01 UTC --- Guitar-Edu-UI Audit --- assistant: Here's a
clean "handoff packet" you can paste into a \*\*new chat thread\*\* to
pick up immediately without re-explaining anything. \-\-- \## New Thread
Title \*\*GuitarEdu UI --- Add Automated Tests + One-Click Runner
(Vitest + Playwright + In-App Test Runner)\*\* \-\-- \## Paste This As
The First Message In The N

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-15 04:39:25 UTC --- Guitar Education Game Audit --- assistant:
Below is \*\*Task 1: the audit table\*\*, produced strictly from what is
\*actually present\* in the mounted build artifacts I can inspect in
this environment. \## Critical blocker (fact, evidenced) The build
archive you named as canonical
(\*\*\`guitar-edu-ui_01_14_26_07.zip\`\*\*) is \*\*not available\*\* in
the c

2026-01-16 21:15:23 UTC --- Guitar Edu Game Setup --- assistant: Runtime
test attempt completed (container-side), with \*\*blocking
dependency-install limitations\*\* in this environment. I \*did\* get us
back to a \*\*canon-compliant, type-safe\*\* state and repaired the
deprecated-terms tripwire so it matches the updated definitions. \###
What I ran (and what happened) -

2026-01-16 21:44:49 UTC --- Guitar Edu Game Setup --- assistant: Got it.
Your runtime log + screenshot are enough to take action, and you're
right: there are \*\*several UI elements that are now
redundant/out-of-canon for the current Match Options model\*\*, plus one
\*\*core correctness issue\*\* (exact pitch matching across
staff/tab/fretboard). I'm going to handle thi

2026-01-16 22:03:14 UTC --- Guitar Edu Game Setup --- assistant:
Completed \*\*Step 1: UI redundancy cleanup\*\* (only what you
approved). \## Brief summary - Removed the redundant \*\*Play Style
Options\*\* block from \*\*Operations\*\* - Removed \*\*Active
Surfaces\*\* from the \*\*Task Context\*\* panel (left menu) - Removed
the \*\*Prompt banner/label/value\*\* from the \*\*Note Rail\*\*

2026-01-16 22:22:45 UTC --- Guitar Edu Game Setup --- assistant: User
wants runtime tests every 15 iterations starting at build 90 (90, 105,
120, etc.) going forward.

STAFF_RULES

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-27 22:16:50 UTC --- Rendered Staff+Tab Implementation ---
assistant: Done. I replaced the \*\*static Staff+Tab SVG\*\* with a
\*\*fully rendered Staff+Tab surface\*\* (Canvas), so it can scale
cleanly, generate ledger lines correctly, and keep staff notes + tab
numbers locked to the same subdivision grid. \[Download the updated
project zip\](sandbox:/mnt/data/gedu_stafftab_ren

2025-12-28 00:09:39 UTC --- Rendered Staff+Tab Implementation --- user:
the music staff being rendered doesn\'t leave room for notes E2 to
E5\... it also needs to show the Treble Clef and any sharps or flats to
indicate key signatures. the fretboard is rendering fine but it is
leaving a lot of room below it. we can take some of that room to center
the fretboard and use th

2025-12-28 00:30:55 UTC --- Rendered Staff+Tab Implementation --- user:
the music staff being rendered doesn\'t leave room for notes E2 to
E5\... it also needs to show the Treble Clef and any sharps or flats to
indicate key signatures. the fretboard is rendering fine but it is
leaving a lot of room below it. we can take some of that room to center
the fretboard and use th

2025-12-28 00:36:41 UTC --- Rendered Staff+Tab Implementation ---
assistant: Understood. Here's what I've confirmed so far and the
concrete plan to address every point in your screenshot. \-\-- \##
What's actually wrong right now (root causes) \### 1) \*\*Staff range is
clipped (E2 → E5 can't fit)\*\* The current canvas renderer only
allocates \*\*staff step centers from the bottom li

2025-12-28 00:56:30 UTC --- Rendered Staff+Tab Implementation ---
assistant: Understood --- here is what has been addressed so far, what
was implemented, and what still needs to be completed to fully satisfy
your requirements. \-\-- \## ✅ What has already been implemented (in
the new v31 layout) \### 1) \*\*Staff + Tab is now rendered (Canvas),
not SVG\*\* - The Staff + Tab panel has

2025-12-28 04:59:29 UTC --- Rendered Staff+Tab Implementation ---
assistant: Implemented in the \*\*newer v31 layout\*\*: \### What
changed - \*\*Staff+TAB background is now generated (rendered) at
runtime\*\* (no dependency on the exported staff SVG file). - Added a
\*\*Treble Clef\*\* plus \*\*automatic key signature rendering\*\*
(Ionian → Locrian derive parent major; Chromatic/Pentatonic

2025-12-28 05:41:11 UTC --- Rendered Staff+Tab Implementation ---
assistant: I updated the \*\*new-layout v31 build\*\* so the Staff+TAB
panel is \*\*fully programmatic (no external SVG asset)\*\*, has
\*\*extended vertical headroom for ledger notes\*\*, and now renders a
\*\*clef + key signature\*\*. I also tightened the fretboard
presentation by \*\*centering the SVG\*\* so you can reclaim so

2025-12-28 07:13:33 UTC --- Rendered Staff+Tab Implementation ---
assistant: I updated the \*\*latest v31 layout zip you provided\*\* and
replaced the Staff+Tab SVG dependency with a \*\*canvas renderer\*\*
that supports: - \*\*Standard notation framing\*\* (treble/bass clef
support) - \*\*Key signature rendering\*\* (sharps/flats) -
\*\*Ledger-line-safe vertical scaling\*\* so the staff always

SVG_RENDERER_DUPLICATION

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:04:56 UTC --- Guitar education game design --- user:
sounds like a good plan of attack. I agree on the engine and
renderer\... enharmonics circle should be allowed to be scored twice
since there is both a flat and a sharp occupying that space. for
example: f sharp and g flat are different notes and can both be
generated in a chromatic mode but would on

2025-12-19 01:05:28 UTC --- Guitar education game design --- assistant:
Understood --- these refinements make the game \*more musically
correct\* and give the board real strategic depth without bloating the
engine. Here's how I would formalize it so it stays clean in code and
clear on the smart board. \## Enharmonics as distinct "claimable
variants" (F# and Gb can both score

2025-12-19 01:34:07 UTC --- Guitar education game design --- user: no
the inharmonic split should be the same as in the SVGs\... to sharpen
you go up and to flat you go down\... so sharp on the left and flat on
the right. it makes more sense visually since it connects closest to the
note it is effecting (affect/effect whatever). on the sharps and flats
if it isn\'t to

2025-12-19 01:34:09 UTC --- Guitar education game design --- assistant:
Got it --- we'll match the \*\*SVG mental model\*\* exactly: - \*\*Sharp
= left half\*\* (because it "goes up") - \*\*Flat = right half\*\*
(because it "goes down") - The split visually "leans toward" the note
it's affecting (your intuition is solid, and yes: \*affect\* is the verb
😉). And we'll support \*\*two diffe

2025-12-19 02:45:14 UTC --- Guitar education game design --- assistant:
Absolutely. Here's an "optimization-first" checklist---\*\*macro to
micro\*\*---that will save you time, bugs, and performance headaches on
smart boards. I'm framing these as \*\*decisions + small implementation
patterns\*\* you can lock in before writing real code. \-\-- \## 1) Lock
the event order so rules never

2025-12-19 02:56:03 UTC --- Guitar education game design --- assistant:
Below is a \*\*Systems Contract\*\* you can treat as the "immutable
spine" of the project. It's written engine-first, renderer-agnostic, and
covers the rules you've locked in so far. (It's intentionally explicit
so it can be implemented and unit-tested.) \-\-- \# Guitar Education
Game Systems Contract v1.0

2025-12-19 03:27:53 UTC --- Guitar education game design --- assistant:
Here's the next concrete step: I built a \*\*runnable Mode 1 (fretboard)
prototype\*\* that includes the \*\*UI adapter + SVG layout extraction +
split-circle sharp/flat tap logic + basic overlay renderer + local
leaderboard\*\*. \[Download the prototype
ZIP\](sandbox:/mnt/data/gedu-fretboard-prototype.zip) \#

TAB_RULES

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:05:28 UTC --- Guitar education game design --- assistant:
Understood --- these refinements make the game \*more musically
correct\* and give the board real strategic depth without bloating the
engine. Here's how I would formalize it so it stays clean in code and
clear on the smart board. \## Enharmonics as distinct "claimable
variants" (F# and Gb can both score

2025-12-19 16:01:03 UTC --- Guitar education game design --- user: I
think there is a misunderstanding of what I want for mode 3. I don\'t
want the strings to be in the \"10 key\" that makes it not a 10 key\...
the interfaces goal for this game needs to include tablature to
reinforce reading the notes from it. the way I envision this working is
the player clicks on the

2025-12-19 16:28:21 UTC --- Guitar education game design --- assistant:
You're absolutely right---Mode 3 should \*\*teach tablature fluency\*\*,
so the interface must \*\*look and behave like tab\*\*, not like a
keypad with strings embedded in it. Here's what I've implemented
conceptually and partially in the current shell, and what still needs
finishing before you'll have a clea

2025-12-19 17:02:38 UTC --- Guitar education game design --- assistant:
Understood --- \*\*Mode 3 should be tab-only\*\*, and \*\*Mode 4 will be
the one that combines tab + staff + fretboard\*\*. The version you
tested treated Mode 3 like "tab keypad + string buttons," which breaks
the learning goal (it's not reinforcing real tablature reading/writing).
Here's what we are impleme

2025-12-19 21:16:10 UTC --- Guitar education game design --- assistant:
Excellent --- the shell, rail, and Mode 1 flow are now stable enough
that the next step should be \*\*Mode 3 built correctly\*\*
(tablature-first interaction), while preserving the modular systems
contract we've been building toward. Below is the "next step" plan I
recommend locking in before we write mor

2025-12-20 01:19:29 UTC --- Guitar education game design --- assistant:
Understood --- I've made two concrete forward moves in the project: 1)
✅ \*\*Updated the project/asset naming to remove problematic
characters\*\* 2) ✅ \*\*Proceeded to the next step by implementing the
core Mode 3 (tablature) interaction model\*\* However, there is \*\*one
UI wiring mismatch\*\* that still needs

UTILITY_TABS

Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:23:53 UTC --- Guitar education game design --- user:
multiplier behavior should show the multiplier next to the score so at
three in a row a x2, six a x3, etc\... would show up next to their score
card. while a large animation would show \"3 in a row!\"\... \"6 in a
row\" \... \"8 in a row\" \"heating up\" and once they get to 10 in a
row \"hot streak\" and at 20

2025-12-19 01:23:55 UTC --- Guitar education game design --- assistant:
Perfect --- here's a tight spec-level refinement that keeps your
\*\*engine/renderer split intact\*\*, upgrades the \*\*classroom UX\*\*,
and cleanly introduces the \*\*enharmonic "double-connect" twist\*\*
without creating rule chaos. \## Scorecard UX and multiplier
presentation \### Scorecard layout (per player)

2025-12-19 01:57:53 UTC --- Guitar education game design --- assistant:
Here are the highest-leverage optimizations to lock down \*\*before
coding\*\*, so you don't end up refactoring core rules/UI later. I'm
focusing on decisions that (1) touch many systems, (2) affect
fairness/teachability, and (3) are easiest to settle now. \## 1)
Formalize the "single source of truth" fo

2025-12-19 02:25:50 UTC --- Guitar education game design --- user:
\"blackout\" should be defined by what is available. so if we are in
chromatic it will be everything, if it is in a key, scale, or interval
it will be limited to the notes that are defined therein. Bonus 5pts if
they steal an enharmonic with the opposite generated, helps reinforce
the note position an

2025-12-19 02:25:54 UTC --- Guitar education game design --- assistant:
Here are the three updates, tightened into \*\*engine-ready rules\*\* so
you can code without reinterpretation later. \## 1) Blackout match type
is defined by "what is available" \*\*Definition:\*\* Blackout ends when
\*\*every claimable slot on the board (given the current Settings) has
been claimed by someon

2025-12-19 02:37:43 UTC --- Guitar education game design --- assistant:
These are excellent "pre-code" optimizations because they touch the
generator, fairness, steals, and connect mechanics all at once. Here's a
tight, engine-ready way to lock them in. \## 1) Never generate an
unwinnable prompt \### Core rule A prompt may only be generated if the
\*\*current player has at

# Part IV -- Instruction Spine (Executable Specifications)

## CHECKLIST.md

Embedded verbatim. Any edit requires change-control and versioning.

\# Guitar Education Game --- Checklist (Playability First)

\> Purpose: Single source of truth for remaining work items before
"prototype complete + polish."

\> Scope: Based on project chats + the provided prototypes/zips in this
project thread.

\> Last updated: 2026-01-16

\*\*Canon progress marker:\*\* \`CANON_PROGRESS.md\` (keeps the repo
aligned to the master DOCX checklist).

\## Task ID policy

\- GEG IDs are \*\*stable reference keys\*\*, not a continuous sequence.

\- Any GEG-### not present in this checklist is \*\*unassigned\*\*
unless explicitly marked \*\*Retired\*\*.

\- Gap handling: If a referenced GEG-### is not present in this
checklist, treat it as \*\*unassigned\*\* (non-canonical) unless
explicitly added here.

\### Recent updates (2026-01-10)

\- Implemented \*\*Surface Input Matrix\*\* gating for
Fretboard/Staff/TAB visibility and input eligibility in
\`src/app/gameController.ts\`.

\- Completed the Staff+TAB overlay refactor and wired composite
submission across enabled answer surfaces.

\- Fixed phase constant mismatch that prevented correct in-match gating
(\`in_match\` → \`IN_MATCH\`).

\- Added a multiplayer \*\*Intermission overlay\*\* (phase UI +
countdown + tap-to-start-early) and wired auto-transition to the next
turn.

\-\--

\## How to use

\- Check items as they are \*\*implemented and verified in the running
build\*\*.

\- Prefer adding acceptance notes and links to commits/issues next to
each item.

\- Avoid feature creep: get \*\*playable first\*\*, then \*\*polish\*\*.

\## Language definitions

\- \*\*MUST\*\*: hard requirement for checklist completion.

\- \*\*SHOULD\*\*: required unless explicitly overridden by a dated
canon decision in \`DECISIONS_LOG.md\`.

\- \*\*MAY\*\*: optional; never blocks checklist completion.

\## Terminology alignment

\- "Start Screen", "Start Menu", and "Main Menu" refer to the same
\*\*initialization area\*\* where match settings are chosen before a
match is engaged.

\-\--

\## A) Core gameplay flow

\- \[x\] \*\*GEG-001\*\* Engage / \*\*End\*\* / New correctly control a
single match instance (End truly terminates the match state).

\- \[ \] \*\*GEG-002\*\* Turn loop fully wired: turn start → input → end
turn → scoring → (bonus phase if \*\*enabled and triggered\*\*) → next
player.

\- Note: Match Options \`rules.timer = \"off\"\` now disables
multiplayer auto-timeouts (turnSec/intermissionSec set to 0; controller
does not schedule TIMEOUT).

\- Note: Added ROUND_COMPLETE + LAST_CHANCE_STARTED alerts/logging in
controller; requires runtime verification.

\- \[x\] \*\*GEG-003\*\* Intermission phase displays and transitions
correctly (multiplayer).

\- \[ \] \*\*GEG-004\*\* Bonus phase reliably reachable and visible
(including via dev tools).

\- \[ \] \*\*GEG-005\*\* Multiplayer player roster UI: show player
count, editable player names, add/remove players with controls (future:
link to accounts).

\-\--

\## B) Sequences (Connect-4 mechanics) + scoring + tokens + steals

\- \[ \] \*\*GEG-010\*\* Sequence detection in 4 directions: horizontal,
vertical, diagonal up, diagonal down.

\- \[ \] \*\*GEG-011\*\* Segment scoring matches canon (4+ run):

\- +25 when a new segment first reaches 4

\- +2 per additional extension beyond what was previously counted

\- \[ \] \*\*GEG-012\*\* Token awarding matches canon: \*\*1 token per
NEW segment\*\* (not per note, not per extension).

\- \[ \] \*\*GEG-013\*\* Steal token spend + resolution works (ownership
updates + scoring side-effects where applicable).

\- \[ \] \*\*GEG-014\*\* Last-chance phase works: steals/tokens-only
behavior and clean end conditions.

\- \[ \] \*\*GEG-015\*\* Main Menu Settings: \*\*Token cap\*\*
adjustable.

\- \[ \] \*\*GEG-016\*\* Main Menu Settings: \*\*Starting tokens\*\*
adjustable (supports gameplay variants).

\-\--

\## C) Players, timers, and leaderboards

\- \[ \] \*\*GEG-020\*\* Player card includes: avatar, score,
multiplier, tokens, \*\*timer\*\* (turn timer) to save UI space.

\- \[ \] \*\*GEG-021\*\* Multiplayer player setup: show player count,
editable player names, player markers, color blind on/off, and a visual
add/remove list for player slots (future: link to accounts).

\- \[x\] \*\*GEG-021\*\* Multiplayer player roster UI:

\- Show current player count.

\- Provide an \*\*add/remove\*\* control that adjusts player count
deterministically.

\- Provide a visible list of player slots (P1..Pn) with editable
\*\*player names\*\*.

\- Player names must be applied to the engine \`players\[\]\` at match
initialization. (Implemented: Start Menu roster sets
\`window.\_\_GEDU_PLAYER_NAMES\_\_\`.)

\- Roster UI is local-only (no accounts required yet).

\- \[ \] \*\*GEG-021a\*\* (Deferred) Account linking hook: roster slots
must be compatible with later account selection/import, but no account
system is required for completion of GEG-021.

\- \[ \] \*\*GEG-022\*\* In-match leaderboard shows \*\*active players
only\*\* (no empty slots).

\- \[ \] \*\*GEG-023\*\* Add \*\*persistent High Score Board\*\* (saved
across sessions; local storage acceptable for now) and render it in
Utility area.

\-\--

\## D) Surface Controls (locked specification)

\- \[ \] \*\*GEG-030\*\* Surface Control System replaces rigid "Mode
1--5" selection.

\- Game behavior is defined by per-surface \*\*Prompt / Mark / Display /
SAM + Cardinal\*\* settings.

\- Presets may bundle these settings for quick selection.

\- \[ \] \*\*GEG-031\*\* Active Surface Matrix governs both rendering
and allowed input per surface.

\- Source of truth is derived from Surface Controls and the selected
Preset.

\- \_Implementation note:\_ Per-surface gating is defined by the
\*\*Surface Input Matrix\*\* (\`getSurfaceMatrix\` in
\`src/app/gameController.ts\`).

\- \[ \] \*\*GEG-032\*\* Surface independence is the default.

\- Any mirroring/coupling behavior must be explicitly defined by Surface
Control rules or Preset configuration.

\- \[ \] \*\*GEG-033\*\* Surface Control System is the primary
configuration mechanism.

\- Legacy mode abstractions are deprecated and must not be referenced in
runtime logic.

\- Surfaces: Staff / Tab / Fretboard / Note Rail

\- Roles: Prompt / Mark / Display / SAM + Cardinal (and any required
gating)

\- Per-role cardinality where applicable: Off / Single / Equivalents /
All

\- \[ \] \*\*GEG-034\*\* Presets A--J define bundled Surface Control
configurations.

\- Presets must be overridable at the per-surface level without mutating
the preset definition.

\- \[ \] \*\*GEG-035\*\* Match configuration is finalized at
engage/start.

\- Start-of-session configuration includes: Game Mode, Learning Type,
Musical Context, Instrument, Tuning, Fretboard Controls, Match Rules,
Surface Controls.

\- System-level menus remain accessible only where explicitly allowed by
canon.

\- \[ \] \*\*GEG-036\*\* All surface input gating must key exclusively
off Prompt / Mark / Display / SAM + Cardinal roles.

\- Legacy asked/answered/view terminology must not be used.

\-\--

\## E) Fretboard controls + display system

\- \[ \] \*\*GEG-040\*\* Learning difficulty: show \*\*all\*\* labels
AND still fully playable (simulate gameplay: claim/highlight, trigger
sequences, earn tokens).

\- \[ \] \*\*GEG-041\*\* SAM options: \`single\`, \`equivalent\`, and
'all'.

\- Single: show one "best/closest" correct location

\- Equivalent: show all locations of same pitch

\- All: show all correct locations

\- \[ \] \*\*GEG-042\*\* Default fret range: \*\*min 0, max 12, visible
12 frets\*\*.

\- \[ \] \*\*GEG-043\*\* Note visibility modes everywhere: \*\*All /
Naturals / Enharmonic / Auto (Default)\*\* (rail + fretboard reflect
choice).

\- \[ \] \*\*GEG-044\*\* Highlighting system supports:

\- Root, 3^rds^, 5^th^

\- 7ths

\- Extended chord tones: \*\*9ths / 11ths / 13ths\*\*

\- All qualities (chord dependent: maj, min, sus, aug, dim, etc...)

\- \[ \] \*\*GEG-045\*\* Note display options (global, consistent across
UI):

\- Note Names

\- Numbers (context-driven)

\- Roman (scale/key/mode dependent)

\- Interval Roman numerals (custom style)

\- Steps

\-\--

\## F) Staff + Tab input behavior, mirroring, and multi-answer support

\- \[ \] GEG-116 Right-click Answer Shortcut Menu (surface-aware,
context-gated; submits through unified input pipeline).

\- \[ \] \*\*GEG-050\*\* Staff hover highlight + click placement aligned
to staff lines/spaces.

\- \[ \] \*\*GEG-051\*\* Tab hover highlight + click placement aligned
to tab lines + measure divisions.

\- \[ \] \*\*GEG-051a\*\* Staff + Tab share a single \*\*subdivision
timeline\*\*:

\- Visible subdivision grid (future-proof for smaller divisions)

\- Placements snap to the same column centers in both systems

\- Hover clearly indicates the active subdivision across both staff +
tab

\- \[ \] \*\*GEG-052\*\* TAB mode behavior: player can \*\*select string
then input fret\*\* OR \*\*input fret then select string\*\*.

\- Note (code): TAB entry supports selecting \*\*string+column\*\* on
the TAB grid and \*\*fret\*\* via keypad in either order, with
controller-owned marks.

\- \_Implemented in controller (composite pipeline); needs runtime
verification.\_

\- \[ \] \*\*GEG-053\*\* Keypad accepts only \*\*0--24\*\* (reject 25+).

\- Current direction: use a \*\*25-key (5×5) instant keypad\*\* (no
Enter/Del/Clear).

\- \[ \] \*\*GEG-054\*\* "Multiple valid answers" handled cleanly:

\- Fretboard: same pitch at multiple locations

\- Enharmonics: multiple spellings depending on settings/context

\- \[ \] \*\*GEG-055\*\* Mirroring behavior options:

\- Default: mirrored notes are \*\*placed\*\* (not ghost-only)

\- Learning: inputs in one place trigger the others to show/appear
(default placed; hint-only modes later)

\-\--

\## G) Note rail (compass strip) requirements

\- \[ \] \*\*GEG-060\*\* Current note centered; two-octave span;
"endless loop" illusion.

\- \[ \] \*\*GEG-061\*\* Chromatic uses rotating rail;
scales/keys/chords use fixed reference rail.

\- \[ \] \*\*GEG-062\*\* Rail labels never overflow a cell (sharps/flats
stay within the note cell region).

\- \[ \] \*\*GEG-063\*\* Rail is clickable (acts like a button/input
surface):

\- Hover highlight + pressed state + selected state

\- Click selects note/interval according to current display settings

\- \[ \] \*\*GEG-064\*\* Rail selection integrates into the unified
input pipeline (per-mode and per-settings behavior).

\-\--

\## H) Interval Roman + tritone system (custom)

\- \[ \] \*\*GEG-070\*\* Interval Roman display format: \`I ii II iii
III IV +/o V iv IV iiv IIV\`

\- \[ \] \*\*GEG-070.1\*\* Interval Roman display format (extended): \`I
ii II iii III IV +/o V iv IV iiv IIV VIII ix IX x X xi XI xii XII xiii
XIII ...\`

\- \[ \] \*\*GEG-071\*\* Tritone: make \*\*all options available\*\*:

\- TT

\- +/o (default for Interval Roman)

\- #IV / ♭V

\- +IV / oV

\- Auto (context \*default)

\- \[ \] \*\*GEG-072\*\* Tritone spelling resolved by \*\*scale/mode/key
context\*\* where applicable (some scales imply #IV, others ♭V).

\-\--

\## I) Utility area (tabs and controls)

\> Utility tab labels are locked: \*\*Num / Note / Chord / Scale\*\*

\- \[ \] \*\*GEG-080\*\* Utility tabs exist and match labels: Num / Note
/ Chord / Scale.

\- \[ \] \*\*GEG-080.1\*\* Utility tabs sub menus: Intervals, Arpeggios
...

\- \[ \] \*\*GEG-081\*\* Num tab:

\- 25-key (5×5) keypad with \*\*0--24 only\*\*

\- Instant selection behavior (no Enter/Del/Clear)

\- \[ \] \*\*GEG-082\*\* Note tab (game):

\- Display format (Names / Numbers / Roman / Interval Roman / Steps)

\- Note visibility (All / Naturals / Enharmonic / Auto (contextual) )

\- Tritone label options (see H)

\- \[ \] \*\*GEG-082\*\* Note tab (educational):

\*staff and tab controls similar to GuitarPro\
\*needs more details

\- \[ \] \*\*GEG-083\*\* Chord tab:

\- Chord menus and view options

\- Extended chord highlighting toggles (7/9/11/13)

\- Diagram display toggles (CAGED, etc.)

\- Chord Qualities (maj, min, sus, aug, dim, half dim, etc...)

\- Modifiers

\- "Chord builder": chromatic check boxes (example. R, m3, 5, flat7;
■□□■□□□■□□■□□...)

\- \[ \] \*\*GEG-084\*\* Scale tab:

\- Scale/mode selection and view options

\- Degree/interval display behavior

\- "Scale Builder": chromatic check boxes

\- \[ \] \*\*GEG-085\*\* Intervals, Arpeggios, and other sub tabs

\*needs more details

\-\--

\## J) Dev/Test mode

\- \[ \] \*\*GEG-090\*\* Dev/Test Mode toggle in Main Menu Settings
works.

\- \[ \] \*\*GEG-091\*\* When Dev/Test is enabled, show dev options
inside the Utility/Misc area (per spec).

\- \[ \] \*\*GEG-092\*\* Dev tools allow:

\- Force phase (bonus / last-chance / etc.)

\- Switch active player instantly

\- Inject prompts/notes

\- Paint/erase claims (for rapid testing)

\_Implementation note:\_ Dev/Test currently includes End Turn (TIMEOUT),
Prev/Next Player, Clear Board, Force In-Match / Last Chance / Results,
plus Paint/Erase mode.

\-\--

\## K) Assets + hitboxes (alignment correctness)

\- \[ \] \*\*GEG-100\*\* Update fretboard background image and re-align
hitboxes precisely.

\- \[ \] \*\*GEG-101\*\* Update staff + tablature background and
re-align hitboxes precisely.

\- \[ \] \*\*GEG-102\*\* Confirm hover highlight + click zones align to
the new art at different viewport sizes.

\_Implementation note:\_ Asset loading/rendering issues were fixed by
(1) ensuring \`loadSvgIntoHost\` is called with relative asset paths (it
already applies \`assetUrl\` internally), and (2) adding
\`Guitar_FretBoard_Horizontal-NoNotes.svg\` to the \`public/\` folder so
Medium/Hard can start with a blank fretboard.

\-\--

\## L) Removals / cleanup (locked)

\- \[ \] \*\*GEG-110\*\* Remove legacy/superseded item: \*\*GEG-021\*\*
(no longer relevant).

\- \[ \] \*\*GEG-111\*\* Stop button label is \*\*End\*\* (ends the game
instance).

\- \[ \] \*\*GEG-112\*\* Accidentals controls are present in Match
Controls UI and staff accidental behavior is preserved (staff adheres to
standard notation rules; other surfaces remain flexible).

\- \[ \] \*\*GEG-113\*\* Remove "Unlimited Misses" and "No Hints" from
play style options (per project direction).

\-\--

\## M) Polish (do after prototype is fully playable)

\- \[ \] \*\*GEG-200\*\* Readability/contrast pass across menus and
tabs.

\- \[ \] \*\*GEG-201\*\* Button/tab state styling consistency (selected
vs disabled vs hover).

\- \[ \] \*\*GEG-202\*\* Spacing/alignment final pass: staff/tab, rail,
fretboard, utility panels.

\- \[ \] \*\*GEG-300\*\* Defining differences in logic, game play,
tools, menus, behavior, etc... between Game and Educational

\-\--

\## Notes / Decisions log

\- Learning difficulty: show all note labels + still playable.

\- Input independence by default; Learning mirrors by default; mirroring
options later.

\- TAB: string→fret OR fret→string.

\- Fret range default: 1--12, show 12.

\- Utility labels: Num/Note/Chord/Scale.

\- Tritone must support TT and +/o and sharp/flat spellings with context
selection.

## CANON_PROGRESS.md

Embedded verbatim. Any edit requires change-control and versioning.

\# Canon Progress Marker (A1.xx alignment)

This file exists to prevent "context drift" across new chat threads.

\## Canonical source of truth

\- \`Guitar_Education_Game_Comprehensive_Guide_Merged_Canon.docx\`
(Generated: 2026-01-07)

\## Current build snapshot

\- \*\*Build package:\*\* \`guitar-edu-ui_01_13_26_19.zip\`

\- \*\*Current milestone:\*\* Representation Systems + Multi-Surface
Input

\- \*\*Milestone definition (what "done" looks like):\*\*

\- Staff behaves like printed sheet music (ledger lines, correct
vertical placement, no bleed into TAB).

\- TAB renders strings + numbers (no dots) and aligns to staff by a
shared timing grid.

\- When multiple answer surfaces are enabled, a submission only passes
when \*all enabled\* answer surfaces are correct (correct to the prompt
pitch; not necessarily identical string/fret between surfaces).

\## Canon checklist position (high signal)

\### ✅ Canon items we are treating as "already implemented"

\- A1 Page layout/grid exists (header + main + footer layout).

\- B1 Fret range controls: 0--24 support, presets (5/12/24), default min
1 max 12, and dimming outside range.

\- C1 Accidentals buttons removed; note labels can still show A#/Bb
within a single cell.

\- D1 Main menu structure decisions (Single Note / Chords / Scales
first; audio settings on main menu; fretboard controls grouped with
instruments).

\*Phase 1 UX wiring in progress: Splash selection now routes through a
Start Setup gate (content/mode/root/fret range) before beginning a
session.\*

\- D3 SAM lives in Game Mode Options (needs strict behavior definitions,
but placement is correct).

\### 🛠 Canon items actively in completion/bug-fix

\- A2 Player cards: "timer inside card" and final card variant
confirmation.

\- A3 Utility: expand coverage (Chord/Scale utility, mode-specific input
controls).

\- B3 Fretboard hitbox alignment + an authoritative coordinate system.

\- E2 Rail: "current note centered" polish (rail remains prompt-first;
no implied history persistence).

\- F1 Turn controls: consistent End/Start/Pause/Reset behavior + correct
placement.

\- A4 Intermission phase: overlay + countdown + early-start interaction
implemented; needs runtime verification.

\- F2 Dev/Test mode: currently visible but lacks reliable phase
simulation controls.

\- G1 Token minting correctness (segment-driven tokens;
multiplayer-only).

\- G2 Bonus phase: trigger, visibility, and dev hooks for testing.

\- I1 UI cleanup: remove stray/legacy UI artifacts.

\- I2 Assets: canonical asset manifest + fallback behavior.

\### ✅ Workflow tooling now in place (supporting canon verification)

\- Unit tests: Vitest suite for timeline shift-left, commit gate, Mode 3
spelling policy, TAB stacking, and ledger clipping.

\- E2E tests: Playwright smoke flows for Dev unlock, staff accidental
commit persistence, shift-left stress, and Mode 3 strict vs enharmonic.

\- E2E now runs against \*\*built output\*\* via \`vite preview\` (port
4173) for stability.

\- Windows one-click runners: \`RUN_DEV.bat\` and \`RUN_TESTS.bat\`.

\### 🧩 Canon items that still require a one-page lock-in table

\- C2 Display modes: priority/stacking rules for Note Names vs Numbers
vs Intervals vs Roman Numeral Interval.

\- D2 Difficulty matrix: Easy/Medium/Hard rule table (labels, hints,
SAM, mistake handling).

\- D3 SAM: strict acceptance/visibility rules per mode
(Any/Best/Designated) and how it interacts with difficulty.

\- E1 Rail interactivity: when the rail is input vs reference vs
inspection.

\- Segment definition: what counts as a unique segment across content
types (notes/chords/scales/arpeggios).

\## Non-negotiable rules reinforced by the canon

\- If a mode presents multiple inputs (staff + TAB + fretboard, etc.),
the player must answer correctly on all required inputs or it is a miss.

\- Staff pitch is the authoritative pitch source; TAB and fretboard must
match it.

\- "Not visible" means "marks hidden," not "surface removed."

\-\--

\## E) Refinements, Adjustments, and Fine Tuning (meta bucket)

This section is an \*\*added tracking bucket\*\* to reduce repeated
regressions and "treading over the same issues."

\- It \*\*does not\*\* replace or renumber the DOCX canon's \*\*E)
Generator / Rail System\*\* section.

\- It is a \*\*cross-cutting\*\* place to log the small-but-critical
UI/UX and rendering correctness fixes that tend to reappear.

\- Primary backlog location remains \*\*\`CHECKLIST.md\` → M)
Polish\*\*.

\### E1. Rendering correctness refinements

\- Staff ledger lines \*\*never\*\* bleed into TAB.

\- TAB renders \*\*numbers\*\*, not dots, and numbers are clipped to TAB
bounds.

\- Staff noteheads, stems, and ledger lines only render inside the
staff's clip group.

\- Staff + TAB remain rhythmically aligned to the shared timing grid as
spacing evolves.

\### E2. Surface + layer semantics refinements

\- "Not visible" hides \*\*marks\*\*, not the entire surface section.

\- Layers remain: \*\*Display / Prompt / Marks\*\* (visual-only
filters).

\- Controller-owned mark state only (no view-owned state).

\### E3. Interaction + usability refinements

\- Touch targets remain full-size (no "half-hit" requirements for
sharp/flat split visuals).

\- Hitboxes remain stable across scaling and responsive layout.

\- Input eligibility gating is respected (no accidental input on
non-input surfaces).

\### E4. Layout + spacing refinements

\- Remove legacy resizing bars; center primary gameplay surfaces.

\- Staff/TAB measure count adapts to available space (default 3, fewer
on narrow screens).

\- Prevent overlapping bounds between staff and TAB (strict separation).

\### E5. Terminology + labeling refinements

\- Use stable player-facing names (e.g., Display / Prompt / Marks) while
preserving internal preference keys.

\- Ensure "Surface Matrix" terminology is used consistently in UI labels
and docs.

\### E6. Documentation + versioning refinements

\- Maintain a single canonical entrypoint (\`README.md\`).

\- Ensure every build package updates logs and the canon progress
marker.

\### 01_11_26_10

\- spelling policy toggle (strict vs enharmonic).

\- Staff chord stacking collision improvements (accidental placement).

\- Pending staff preview rendering layer added.

\### 01_12_26_01

\- Phase A: Unit test harness (Vitest) + \`tests/unit/\` suite for
shift-left, commit gate, spelling policy, TAB stacking, and ledger clip
constraints.

\### 01_12_26_03

\- Phase A patch: spelling-policy unit tests aligned to the canonical
\`SlotType\` enum; \`test:ci\` passes.

\### 01_12_26_04

\- Phase B: Playwright E2E harness + \`tests/e2e/\` suite for dev
unlock, staff accidental commit persistence, shift-left stress, and
strict vs enharmonic validation.

\## 01_12_26_06 --- Runner reliability patch

\- RUN_DEV.bat now blocks until the dev server is reachable and opens
the correct localhost port.

\- Vite output is written to \`devserver.log\` to make launch failures
diagnosable without terminal usage.

\### 01_12_26_07

\- Dev workflow: RUN_DEV.bat reliability patch (Windows-safe quoting +
port probe after launch).

\### 01_12_26_08

\- Dev workflow: RUN_DEV.bat auto-repairs Windows Rollup native optional
dependency issues on Node \>= 23 (optional-deps install + rollup
rebuild).

\## 2026-01-12 --- Patch 01_12_26_11

\- Phase C (One-click runners): RUN_DEV/DEVSERVER_RUNNER hardened on
Windows. Dev server now always writes actionable output to
\`logs\\\\devserver.log\` even when startup fails.

\## 2026-01-12 --- Platform strategy locked

\- Product distribution will target \*\*Web + PWA + Desktop (Tauri)\*\*
from a single web codebase.

\- Testing direction: E2E should prefer \*\*built preview\*\* behavior
over dev-server-only behavior to match shipping targets.

\- Reference: \`DOCS/PLATFORM_STRATEGY.md\`.

\## 2026-01-12 --- Patch 01_12_26_14

\- Phase 2 (PWA): app now installs and runs offline (static caching) via
\`vite-plugin-pwa\`.

\- Phase 2 (Persistence): settings + leaderboards are mirrored into
IndexedDB as a versioned snapshot.

\- Dev/Test: added Export Save / Import Save controls (USB-friendly
classroom carry-over).

\## 01_12_26_15

\- Added RUN_PREVIEW.bat (one-click build + vite preview + auto-open
browser) with logging to logs/run_preview.log.

\## 2026-01-13 --- Patch 01_13_26_04

\- Documentation: Game Menu + Surface Control System canonized in
\`PROJECT_NOTES.md\` (no new spec files added).

\- Checklist: added tasks to implement Surface Control System
(Active/Display/Prompt/Mark/SAM) + Presets A--J + Start-of-session Game
Menu UI.

\## Locked truth tables

\- Added \`DOCS/LOCK_IN_TABLES.md\` to lock display modes, difficulty,
SAM, rail interactivity, segments, and right-click shortcut canon.

## DECISIONS_LOG.md

Embedded verbatim. Any edit requires change-control and versioning.

\# Decisions Log

A running log of architectural decisions that impact future development.

\## 2026-01-10 --- Surface Matrix replaces View Layout

\- Decision: replace the older "View Layout" idea with a \*\*Surface
Input Matrix\*\* that deterministically defines, per UI mode, which
surfaces are:

\- required for a valid answer

\- eligible to accept input

\- permitted to show placed marks

\- Rationale: reduces ambiguity, prevents regressions, and keeps rules
enforceable at the controller level.

\## 2026-01-10 --- Surface Layers are visual-only

\- Decision: add \*\*Surface Layers\*\* toggles as visual filters only.

\- Rule: layer toggles never remove a surface; they only hide that
surface's rendered content.

\- Rationale: matches the requirement that "not visible" does not mean
the section disappears.

\## 2026-01-10 --- Surface Layer terminology

\- Decision: rename the user-facing layer names to \*\*Display / Prompt
/ Marks\*\* (was View / Asked / Answered).

\- Rule: internal preference keys remain
\`pref.layers.view\|asked\|answered\` for backward compatibility; only
labels and documentation change.

\- Rationale: the new names are surface-agnostic and describe intent
across Rail, Fretboard, Staff, and TAB.

\## 2026-01-10 --- Staff+TAB are treated as a rendered template

\- Decision: treat the Staff+TAB background as a \*\*static rendered
template\*\*, not a dynamically constructed SVG surface.

\- Rule: overlay geometry (measures/columns, staff core lines, tab
bands) must be derivable without assuming the SVG uses exactly 5 staff
lines or exposes barline segments.

\- Implementation note: normalize STAFF to the \*\*middle 5 lines\*\*
(core staff) and derive measure spans from repeated long horizontal
segments.

\- Rationale: keeps the hit-grid stable today and makes it safe to swap
the background to a raster image later without breaking interaction.

\## 2026-01-10 --- README is the canonical repo entrypoint

\- Decision: restore a root \*\*\`README.md\`\*\* and treat it as the
canonical entrypoint for onboarding and thread alignment.

\- Rule: when starting work (especially in a new chat thread), follow
the \*\*Thread Boot Protocol\*\* defined in \`README.md\`.

\- Rationale: reduces drift across sessions and keeps implementation
aligned with the project's written specification.

\## 2026-01-10 --- Intermission is a first-class phase overlay

\- Decision: represent multiplayer intermission as a dedicated \*\*phase
overlay\*\* instead of relying on transient alerts.

\- Rule: the overlay is shown only when \`phase === INTERMISSION\` and
\`PlayType === MULTI\`, and it may be dismissed early via tap/click to
start the next turn.

\- Rationale: makes the turn break explicit to players on smartboards
and prevents "instant next turn" confusion.

\## 2026-01-10 --- Turn-start effect is required for timer correctness

\- Decision: the engine must emit a \`TURN_STARTED\` effect whenever a
new turn begins.

\- Rule: timers and per-turn UI reset occur in response to this effect,
not implicit state inspection.

\- Rationale: prevents regressions where turns advance but countdowns
never start.

\## 2026-01-12 --- Platform Strategy Locked: Web + PWA + Tauri

\- Decision: Ship the product from a single web codebase, targeting:

1\) Hosted Web deployment,

2\) Offline-capable PWA,

3\) Desktop distribution via \*\*Tauri\*\*.

\- Rationale: Avoids shipping Node to end users, reduces
platform-specific divergence, supports app-store grade builds, and
enables portable/offline usage without forking the app.

\- Testing rule: Prefer E2E tests against \*\*built preview\*\* behavior
(e.g., \`vite preview\`) rather than dev-server-only behavior.

\- Reference: \`DOCS/PLATFORM_STRATEGY.md\`.

\## 2026-01-10 --- TAB + Fretboard composite

\- Decision: requires both a TAB entry and a matching Fretboard position
before the engine receives a pitch action.

\- Rule: TAB entry alone must never auto-claim the fretboard; composite
submission is enforced by the Surface Matrix.

\- Rationale: matches real-world tab reading and resolves the "TAB input
makes the fretboard answer for you" behavior.

\## 2026-01-11 --- TAB requires explicit fret selection

\- Decision: TAB input must never implicitly place fret \`0\`.

\- Rule: clicking a TAB slot without an explicitly selected fret creates
a \*\*pending TAB slot\*\* visual (outline) and waits for a fret pick
(including open-string \`0\`).

\- Rationale: prevents accidental "0 then 1" behavior and makes TAB
entry deterministic in composite modes.

\## 2026-01-16 --- Canon Hygiene Protocol v1.0 (anti-drift)

\- Completion gate: \`CHECKLIST.md\` is the only authority for
completion status. No other file may declare "DONE/COMPLETE" states.

\- Canon sources: only the canon list defined at chat boot may define
behavior, UI, logic, or terminology.

\- Folder invariants: documentation may exist only in repo root and
\`/DOCS\` (uppercase). A lowercase \`/docs\` folder is forbidden.

\- ID namespace rule: \`GEG-###\` identifiers are reserved exclusively
for \`CHECKLIST.md\`. Any other tracking (if ever approved) must use a
different prefix.

\- Packaging invariant (Solution B): zip artifacts are \*\*flat\*\* (no
top-level root folder). Required top-level entries include
\`package.json\`, \`src/\`, and \`DOCS/\`.

\- Snapshot extraction rule: flat zips may be extracted into a
same-named folder without creating a redundant nested directory. Prefer
extracting into an \*\*empty\*\* folder to avoid file merges.

\- Drift gate: any new feature/abstraction/refactor/new doc/folder must
be logged to \`SUGGESTIONS_LOG.md\` and requires explicit approval
before action.

\- Tripwires: \`tools/tripwire_docs_tree.mjs\` and
\`tools/tripwire_zip_structure.mjs\` enforce the above rules and must be
run in local CI.

\- 2026-01-14: Primary surface rendering backend migrates from SVG to
Canvas2D. SVG is permitted only as optional overlay assets (inlays,
markers, icons) and must never be required for functionality.

## MATCH_SETTINGS_SPEC.md

Embedded verbatim. Any edit requires change-control and versioning.

\# MATCH_SETTINGS_SPEC.md

\## Match & Session Settings

\*\*Canonical Specification\*\*

This document defines all \*\*non-surface\*\* settings that determine:

\- \*\*what is being played\*\* (learning type, musical context,
learning structures)

\- \*\*how correctness is evaluated\*\* (accuracy requirements,
equivalence generation)

\- \*\*how a session progresses\*\* (timing rules, end conditions, bonus
phase)

These settings work \*\*in coordination\*\* with the Surface Control
System but do not override it.

Match Settings do \*\*not\*\* define:

\- How surfaces render

\- Where input occurs

\- How feedback is shown

Those responsibilities belong to the Surface Control System (Prompt /
Mark / Display / SAM) and presentation preferences.

\-\--

\## 1. Scope

Match Settings define:

\- What the player is doing (learning type, pitch framework)

\- How answers are evaluated (accuracy rules)

\- How time is handled

\- What is locked once a match begins

All Match Settings are \*\*locked after match start\*\*.

\-\--

\## 2. Game Mode

\*\*Type:\*\* Single-select

\- Education

\- Single Player

\- Multiplayer

\- Exploration / Free Play

\*\*Locking:\*\* Locked after match start.

\-\--

\## 3. Learning Type (Primary Selector)

\*\*Type:\*\* Single-select

\- Single Notes

\- Intervals

\- Chords

\- Scales

\- Arpeggios

Learning Type determines:

\- What constitutes a correct answer

\- What learning-structure settings are eligible

\- Whether multi-note validation is required

\*\*Locking:\*\* Locked after match start.

\-\--

\## 4. Musical Context

\### 4.1 Key

Defines the tonal center for contexts that require one.

Notes:

\- Key is required for diatonic/modal/degree-based content.

\- Key may be ignored by fully chromatic content when the prompt is
absolute (note-name or pitch-class driven).

\### 4.2 Accidentals Pool

\*\*Type:\*\* Multi-select

\- Naturals

\- Sharps

\- Flats

The accidentals pool constrains:

\- What spellings are eligible for prompts (when prompts are
spelling-sensitive)

\- What spellings are accepted as correct when multiple enharmonic
spellings exist

The pool does not override Surface Control cardinality. It only defines
which spellings are valid candidates.

\### 4.3 Pitch Framework / Collection

Defines the pitch collection space.

Options:

\- Chromatic

\- Diatonic (Major = Ionian, Minor = Aeolian)

\- Pentatonic (Major / Minor)

\- Blues

\- Modal (Dorian, Phrygian, Lydian, Mixolydian, Locrian)

\- Custom / Derived (future)

\### 4.4 Interval Display Options

-   Name

-   Number

-   Roman

-   Roman Interval

-   Steps

This governs what interval prompts/labels may be represented.

It does not by itself change which surfaces are active or marked.

\-\--

\## 5. Instrument & Fretboard Context

\### 5.1 Instrument

\- Guitar

\- Bass

\- Ukulele

\- Banjo

\- Custom (future)

\### 5.2 Tuning

\- Standard

\- Drop

\- Open

\- Custom

Tuning affects:

\- String pitch mapping

\- Valid fretboard equivalence sets

\### 5.3 Fretboard Controls

\- Preset ranges (5 / 12 / 24)

\- Custom Min / Max Fret

\- String range (start/end)

\- String Inclusion / Exclusion

\- Span

\- Notes-per-string

\- Position scope (start/end)

Fretboard controls constrain the domain of valid answers and equivalence
sets.

\-\--

\## 6. Input Method

Input Method defines \*\*interaction granularity\*\* only.

It never changes correctness rules.

\*\*Type:\*\* Single-select

Options:

\- Single-Note Input

\- Structure Placement (Library-Based)

\- Partial Structure Placement

Dependencies:

\- Enabled only for: Chords, Scales, Arpeggios

\- Disabled for: Single Notes, Intervals

\-\--

\## 7. Learning Structures

Learning Structures are only eligible when compatible with the selected
Learning Type.

\### 7.1 Interval Settings

\- \*\*Absolute vs Relative\*\*

\- Absolute: intervals are named as distances between two pitches (e.g.,
m3, P5).

\- Relative: intervals are named relative to a reference (key center,
scale degree, or current prompt anchor).

\- \*\*Simple vs Compound\*\*

\- Simple: reduced within one octave (e.g., 2nd through 8ve).

\- Compound: may extend beyond an octave (e.g., 9th, 10th, 13th).

\- \*\*Interval Set selection\*\*

\- Which interval classes are in-scope for prompting and scoring.

\### 7.2 Chord Settings

\- \*\*Quality pool\*\*

\- Which chord qualities are eligible for prompts (e.g., major, minor,
diminished, augmented, seventh qualities).

\- \*\*Voicing rules\*\*

\- Which chord tone distributions are permitted (e.g., root-position
only, allow inversions, allow omissions, allow doubles).

\- \*\*Completion rules\*\*

\- What must be supplied for a chord to be considered correct (e.g.,
full pitch-class set, required chord tones, or explicit voicing
targets).

\### 7.3 Scale Settings

\- \*\*Linear / Positional / Multi-position\*\*

\- Linear: a defined ordered traversal (often one string or across
strings in sequence).

\- Positional: a defined shape/position window.

\- Multi-position: multiple positions are eligible within the current
fret range.

\- \*\*Completion scope\*\*

\- What counts as "complete" (e.g., one octave, two octaves, full
in-range coverage, or degree coverage).

\### 7.4 Arpeggio Settings

Arpeggios are treated as a learning structure that can be enabled where
applicable.

\- \*\*Source\*\*

\- Chord-based (arpeggiate a selected chord quality)

\- Scale-degree-based (arpeggiate a degree within the current
key/collection)

\- \*\*Traversal direction\*\*

\- Ascending

\- Descending

\- Up/Down (cycle)

\-\--

\## 8. Timing Rules

\### 8.1 Timing Mode

\- Off

\- Turn-Based

\- Continuous

\- Count Down

\- Total Time

\- Player total time (Chess like turn timer)

\### 8.2 Player Turn Time

\- Seconds per turn (Turn-Based)

\### 8.3 Time-to-Completion

\- Total elapsed time (Continuous)

\### 8.4 Time Modification

\- Add time on correct

\- Subtract time on miss

\### 8.5 Multi-Answer Turn Window

\- Single answer per window

\- Multiple answers per window

\### 8.6 Turn Window Behavior

\- Fixed

\- Rolling

\- Hard cutoff

\### 8.7 Time Bank

Optional (when Timing Mode is Turn-Based or Continuous).

\### 8.8 Intermission

Optional (Turn-Based). Defines a pause between turns.

\### 8.9 Increments

Optional. Adds time after correct answers (or other configured
triggers). Default in multiplayer

\### 8.10 Penalties

Optional. Subtracts time after misses (or other configured triggers).

\### 8.11 Runtime Cap

Optional. Hard maximum session length.

Equivalence note (terminology alignment):

\- Turn-Based ≈ Per-turn window

\- Continuous ≈ Time-to-completion

\-\--

\## 9. Accuracy Requirement

\- Single Domain

\- Multi-Domain

Defines how many \*\*Mark-enabled\*\* surfaces must be satisfied for a
submission to be counted as correct.

\-\--

\## 10. Failure Conditions

A visible, toggle-based list defining match end conditions.

Initial canonical set (implementation may follow later):

\- \*\*Turn timeout ends match\*\* (Turn-Based)

\- \*\*Wrong submission ends match\*\*

\- \*\*Maximum misses ends match\*\* (configurable count)

\- \*\*No-score turns ends match\*\* (configurable count)

\- \*\*Time limit reached ends match\*\* (Continuous)

\-\--

\## 11. Randomization

Randomization is \*\*opt-in only\*\*.

Rules:

\- Random selection always respects:

\- Domain constraints

\- Cardinality

\- Surface roles

\- No global random toggle exists

\-\--

\## 12. Bonus Phase

Enabled / Disabled (per mode).

If enabled, Bonus Phase must define:

\- Activation rule

\- Objective

\- Scoring/token interaction

\- Board behavior (whether claimed areas disappear, persist, or reset)

No bonus behavior is assumed.

\-\--

\## 13. Locking Summary

All Match Settings are locked after match start.

\*\*End of Specification\*\*

## THREAD_HANDOFF.md

Embedded verbatim. Any edit requires change-control and versioning.

\# Thread Handoff

This file exists to reduce drift when a conversation thread is
restarted.

\## Active build

\- Active package: \`guitar-edu-ui_01_12_26_01.zip\`

\## Current trajectory (as of 2026-01-11)

1\. Restore match flow correctness:

\- Pause removed entirely (no user-facing pause control)

\- Match start uses a \*\*Ready/Engage\*\* overlay (Turn 1 does not
start immediately)

\- Single-player defaults to \*\*time-to-complete\*\*

\- Timer settings are stored in \*\*seconds\*\*

2\. Restore UI control semantics:

\- Surface Layers are checkboxes: \*\*Display / Prompt / Marks / SAM\*\*
(visual-only)

3\. Next major implementation:

\- Staff/TAB timeline persistence: keep accepted marks as a running
record until the visible area is filled

\- Default notation grid is 4/4 recorded in 8th-note slots

\- Staff/TAB must remain spatially static (no viewBox crop/zoom)

4\. After timeline persistence:

\- Revisit correctness and runtime validation.

5\. Dev/Test iteration speed (current focus):

\- Add Vitest unit tests (Phase A)

\- Add Playwright E2E smoke tests (Phase B)

\- Add one-click Windows runners (Phase C)

# Part V -- Supporting DOCS (Mappings and Guards)

Embedded from /DOCS in 01_16_26_98 to prevent loss of instruction
context.

## ADVANCED_MATCH_OPTIONS_UI_MAPPING.md

Source: 01_16_26_98/DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md

\# Advanced Match Options -- UI Mapping & Dependencies

This document canonically records how \*\*Advanced Match Options\*\* are
grouped, ordered, and gated in the UI.

It exists to prevent ambiguity, re-litigation, or drift between design,
implementation, and documentation.

This document:

\- Introduces \*\*no new systems\*\*

\- Changes \*\*no definitions\*\*

\- Describes \*\*placement, grouping, and dependency only\*\*

\-\--

\## UI Structure

Match configuration is presented as:

\- \*\*Basic Match Settings\*\* (always visible)

\- \*\*Advanced Match Settings\*\* (collapsed by default)

This document defines the ordering \*within Advanced Match Settings\*
and the dependency rules between groups.

\-\--

\## Advanced Panel Order (Top → Bottom)

1\. Domain Constraints

2\. Surface Controls

3\. Match Rules

4\. Learning Type Details

5\. Input Method

6\. Randomization (embedded per Learning Type)

This order reflects dependency flow:

\*\*where it occurs → how it is shown → when success/failure occurs →
what is tested → how input occurs\*\*

\-\--

\## Panel 1 --- Domain Constraints (§4.4--§4.6)

Always visible:

\- Instrument (including Custom Instrument)

\- Tuning (preset + custom)

\- String range

\- Fret range

\- Span

\- Notes-per-string

\- Position scope (start/end)

Rules:

\- Domain constraints apply globally

\- No other panel may override domain constraints

\- Structure placement must obey all domain limits

\-\--

\## Panel 2 --- Surface Controls (§4.8)

Always visible:

\- Per-surface roles:

\- Prompt

\- Mark

\- Display

\- SAM

\*\*Active is implicit\*\* (derived from Surface Controls + context) and
MUST NOT be exposed as a checkbox.

\- Cardinality per surface:

\- Off / Single / Equivalents / All

\- Presets A--J

Rules:

\- Surface Controls affect information flow only

\- Cardinality never expands valid answer sets

\- Presets only modify surface behavior

\-\--

\## Panel 3 --- Match Rules (§4.7)

Always visible:

\- Board topology:

\- Player boards

\- Shared board

\- Timing models:

\- Disabled (Timing Off)

\- Per-turn window

\- Time-to-completion

\- Time bank

\- Timing variables:

\- turn length

\- intermission

\- increments

\- penalties

\- runtime cap

\- Accuracy requirement:

\- Single-domain

\- Multi-domain

\- Failure Conditions (toggle list)

\- Bonus Phase (Enabled / Disabled + behavior config)

Rules:

\- Match Rules never change valid answers

\- Accuracy requirement gates confirmation only

\-\--

\## Panel 4 --- Learning Type Details (§4.2)

Visible learning types:

\- Single Notes

\- Intervals

\- Chords

\- Scales

\- Arpeggios

Rules:

\- Only one Learning Type active at a time

\- Selecting a Learning Type enables its parameter group

\- Non-applicable controls are disabled (never hidden)

Intervals-only:

\- Roman Numeral Interval System (On / Off)

\-\--

\## Panel 5 --- Input Method (§4.2 Advanced Input Method)

Options:

\- Single-Note Input

\- Structure Placement (Library-Based)

\- Partial Structure Placement

Dependencies:

\- Enabled only for: Chords, Scales, Arpeggios

\- Disabled for: Single Notes, Intervals

Notes:

\- Input Method never changes correctness rules

\- Input Method only affects interaction granularity

\-\--

\## Panel 6 --- Randomization (Embedded)

Location:

\- Appears inside the active Learning Type panel

Rules:

\- Randomization is opt-in only

\- Random selection always respects:

\- Domain constraints

\- Cardinality

\- Surface roles

\- No global random toggle exists

\-\--

\## Dependency Summary

\| Panel \| Depends On \| Enables \|

\|\-\-\-\-\--\|\-\-\-\-\-\-\-\-\-\--\|\-\-\-\-\-\-\-\--\|

\| Learning Type Details \| --- \| Input Method \|

\| Input Method \| Learning Type \| Learning Type sub-controls \|

\| Domain Constraints \| --- \| All other panels \|

\| Surface Controls \| --- \| Display/Prompt/Mark behavior \|

\| Match Rules \| --- \| Timing & confirmation \|

\| Randomization \| Learning Type \| Selection only \|

\-\--

\## Canon Lock Statement

This document is authoritative for:

\- Advanced Match Options UI structure

\- Panel ordering

\- Panel dependency rules

No future implementation or documentation may contradict this without an
explicit versioned update.

\-\--

\## Do Not Reintroduce (Hard Guardrail)

This section explicitly binds this document to the project's deprecated
terminology and patterns list.

Its purpose is to prevent legacy systems, names, or mental models from
re-entering implementation,

documentation, or discussion.

\### Explicitly Prohibited Concepts

The following MUST NOT be reintroduced in any form:

\- Numbered or named \*\*"Modes"\*\* (e.g., Mode 1--5, Combined Mode,
Hybrid Mode)

\- Any system where:

\- UI layout determines game rules

\- "Mode" implicitly controls surfaces, timing, or learning type

\- Treating \*\*Surface Layers\*\* (View / Asked / Answered) as rule
logic

\- Any logic where:

\- Display implies correctness

\- Prompt implies required input

\- Auto-revealing \*\*equivalents\*\* as a difficulty shortcut

\- Systems that collapse:

\- Learning Type

\- Input Method

\- Surface Controls

into a single selector

\### Canonical Replacement Model (Reminder)

The ONLY valid model is:

\- \*\*Learning Type\*\* --- what knowledge is being tested

\- \*\*Input Method\*\* --- how input is applied

\- \*\*Domain Constraints\*\* --- where answers may exist

\- \*\*Surface Controls\*\* --- how information flows

\- \*\*Match Rules\*\* --- when success/failure occurs

These layers MUST remain independent and composable.

\### Enforcement Rule

If a proposal, implementation, or refactor:

\- Requires introducing a "mode"

\- Cannot be expressed within the existing panels documented here

\- Blends two or more canonical layers into one control

Then it is \*\*non-compliant\*\* and must be rejected or reworked.

This rule applies to:

\- Code

\- UI

\- Documentation

\- Future design discussions

This section is intentionally repetitive and explicit.

It exists to save time by eliminating re-litigation.

\-\--

\## Match Options Ordering (Speed Rule)

Within \*\*Match Options\*\*, ordering is optimized for fast iteration:

1\. \*\*Basic Match Settings\*\* (Learning Target, Difficulty, Key,
Musical Collection, Accidentals, Fret Range)

2\. \*\*Advanced Match Settings\*\* (collapsed)

\- Domain Constraints

\- Surface Controls

\- Match Rules

\- Learning Type Details / Input Method / Randomization

This is a UI-only ordering rule. It does not alter the canonical layer
definitions or dependencies.

\## Input shortcuts

\- Right-click (mouse) opens an Answer Shortcut Menu on eligible answer
surfaces (context-gated; unified input pipeline).

## CANONICAL_LAYERS_DIAGRAM.md

Source: 01_16_26_98/DOCS/CANONICAL_LAYERS_DIAGRAM.md

\# Canonical Layers Diagram (Authoritative)

This document provides a \*\*single-page visual model in text form\*\*
of the Guitar‑Edu‑UI

canonical layer system. It exists to orient contributors quickly and
prevent layer collapse.

No prose explanations, no alternatives, no extensions.

\-\--

\## Canonical Layer Stack (Top → Bottom)

┌─────────────────────────────────────────────┐

│ Learning Type │

│ (Single Notes / Intervals / Chords / Scales / Arpeggios) │

│ → Defines \*what knowledge is tested\* │

└─────────────────────────────────────────────┘

↓

┌─────────────────────────────────────────────┐

│ Input Method │

│ (Single‑Note / Structure / Partial) │

│ → Defines \*how input is applied\* │

└─────────────────────────────────────────────┘

↓

┌─────────────────────────────────────────────┐

│ Domain Constraints │

│ (Instrument / Tuning / Strings / Frets / Span / Position Scope) │

│ → Defines \*where answers may exist\* │

└─────────────────────────────────────────────┘

↓

┌─────────────────────────────────────────────┐

│ Surface Controls │

│ (Active / Prompt / Mark / Display / SAM + Cardinality) │

│ → Defines \*how information flows\* │

└─────────────────────────────────────────────┘

↓

┌─────────────────────────────────────────────┐

│ Match Rules │

│ (Timing / Turns / Boards / Accuracy) │

│ → Defines \*when success or failure occurs\* │

└─────────────────────────────────────────────┘

\-\--

\## Hard Rules

\- Layers are \*\*strictly one‑directional\*\*

\- No layer may:

\- override a layer above it

\- collapse into another layer

\- Any proposal requiring a new "mode" or merged control is invalid

\-\--

\## Binding References

This diagram is canonically bound to:

\- \`DOCS/DEPRECATED_TERMS.md\`

\- \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`

\- \`DOCS/START_SCREEN_UI_MAPPING.md\`

\- \`DOCS/HOW_TO_PROPOSE_CHANGES.md\`

If a change cannot be expressed within this diagram, it is
non‑compliant.

\-\--

\## Status

This diagram is \*\*frozen\*\*.

Updates require a versioned archive change and explicit rationale.

## DEPRECATED_TERMS.md

Source: 01_16_26_98/DOCS/DEPRECATED_TERMS.md

\# DOCS/DEPRECATED_TERMS.md

This file exists to prevent regressions and repeated clarification.

It lists \*\*terms, UI concepts, and implementation artifacts\*\* that
are \*\*hard-banned\*\* and must not be reintroduced.

Authoritative references:

\- \`PROJECT_NOTES.md\` → §4 Game Menu (Start of session; locked after
match start)

\- \`PROJECT_NOTES.md\` → §4.8 Surface Control System

\- \`MATCH_SETTINGS_SPEC.md\` → canonical match settings (non-surface)

\-\--

\## Machine-readable hard-banned term list

Only the bullet items inside this section are used by automated checks.

\<!\-- DEPRECATED_TERMS:BEGIN \--\>

\- combined configuration

\- combined mode

\- surface layers

\- asked / answered / view

\<!\-- DEPRECATED_TERMS:END \--\>

\-\--

\## Hard-banned terminology

\### 1) Gameplay "configuration modes" (legacy numbered system)

\*\*Status:\*\* HARD-BANNED.

The project no longer defines session behavior using a numbered
configuration system (historically referred to as "1--5").

Session behavior is defined by:

\- \*\*Match Settings\*\* (what is being tested)

\- \*\*Surface Controls\*\* (Prompt / Mark / Display / SAM +
cardinality)

\- \*\*Presentation Preferences\*\* (visual only)

\*\*MUST NOT reintroduce:\*\* any UI, logic, or documentation that
relies on a numbered configuration selector as the primary behavior
controller.

\*\*Legacy identifiers (may exist in code for backward
compatibility):\*\*

\- Internal fields such as \`core.gameMode\` and values like \`m1...m5\`

\- Treat these as implementation leftovers, not canon.

\### 2) "Combined configuration"

\*\*Status:\*\* HARD-BANNED.

Any use of "combined" to mean "multiple tasks/surfaces enabled" is
obsolete.

Use Surface Controls and cardinality instead.

\### 3) "Asked / Answered / View" as rule controls

\*\*Status:\*\* HARD-BANNED as gameplay rule controls.

These terms were used historically to describe visibility layers. They
MUST NOT be used to define match logic or correctness.

The canonical rule system is \*\*Surface Controls\*\*:

\- Prompt

\- Mark

\- Display

\- SAM

If "asked/answered/view" appears anywhere, it must be treated as
\*\*legacy visual-only labeling\*\* and scheduled for removal (do not
expand its usage).

\-\--

\## Hard-banned UI concepts

\### 4) Surface Layers ≠ Surface Control System

\*\*Status:\*\* HARD-BANNED as a substitute.

The archive contains a "Surface Layers" idea (often represented as View
/ Asked / Answered checkboxes).

Those are visual-only filters and MUST NOT be treated as the rule
system.

The canonical rule system is \*\*Surface Controls\*\* with cardinality:

\- Off / Single / Equivalents / All

\-\--

\## Hard-banned behaviors

\### 5) Spoiler behavior: "Equivalents are given away"

\*\*Status:\*\* HARD-BANNED by default.

Equivalents must not be revealed automatically unless explicitly enabled
by Surface Controls (cardinality) and/or SAM rules.

\### 6) Reintroducing undocumented mechanics

\*\*Status:\*\* HARD-BANNED.

No mechanics may be inferred from prior prototypes or memory.

If a behavior is not documented in the canon files, it is not allowed.

\-\--

\## Migration note (for maintainers)

When encountering legacy identifiers or wording that imply banned
concepts:

\- Do not delete blindly.

\- Prefer isolating and routing behavior through Match Settings +
Surface Controls.

\- Update this file when a legacy artifact is fully removed.

\-\--

\## Cross‑Reference: Advanced Match Options UI Mapping

This deprecated-terms list is explicitly bound to:

\- \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`

That document defines the current canonical replacement model for the
patterns listed here.

## HOW_TO_PROPOSE_CHANGES.md

Source: 01_16_26_98/DOCS/HOW_TO_PROPOSE_CHANGES.md

\# How to Propose Changes (Project Rule)

All proposed changes to UI, logic, terminology, or structure must be
evaluated against:

\- \`DOCS/DEPRECATED_TERMS.md\`

\- \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`

Before a change is accepted, it must be demonstrated that:

1\) No deprecated terms, systems, or mental models are reintroduced.

2\) The proposal can be expressed entirely within the existing canonical
layers

(Learning Type, Input Method, Domain Constraints, Surface Controls,
Match Rules).

3\) The proposal does not collapse multiple layers into a single
control.

If a proposal cannot meet all three conditions, it is non-compliant and
must be revised

or rejected. This rule exists to prevent regression, ambiguity, and
repeated re-litigation.

## LOCK_IN_TABLES.md

Source: 01_16_26_98/DOCS/LOCK_IN_TABLES.md

\# LOCK-IN TABLES (Canonical)

These tables define deterministic behavior for implementation and
testing.

If a behavior is not documented here or in the authoritative match/spec
files, it does not exist unless explicitly added.

\-\--

\## 1) Display Modes: priority and stacking

\### 1.1 Effective display modes (single-select)

\`NoteDisplayMode ∈ { NOTE_NAMES, NUMBERS, ROMAN, INTERVAL_ROMAN, STEPS
}\`

\- \`INTERVAL_ROMAN\` is the \*\*Roman Numeral Interval System\*\* (as
defined elsewhere in canon). Do not reinterpret it here.

\### 1.2 Precedence (only if multiple toggles exist internally)

1\. \`INTERVAL_ROMAN\`

2\. \`ROMAN\`

3\. \`NUMBERS\`

4\. \`NOTE_NAMES\` (default)

5\. STEPS

\### 1.3 Output format lock-in

\| Display mode \| What it shows \|

\|\-\--\|\-\--\|

\| NOTE_NAMES \| Note names (subject to Note Visibility rules) \|

\| NUMBERS \| Chromatic numbering system (project-defined) \|

\| ROMAN \| Standard interval notation (project-defined set) \|

\| INTERVAL_ROMAN \| Roman Numeral Interval System (project-defined) \|

\| STEPS \| Displays the total distance between notes \|

\-\--

\## 2) Difficulty Matrix (Free Play / Easy / Medium / Hard)

\### 2.1 Difficulty states

\`Difficulty ∈ { FREE_PLAY, EASY, MEDIUM, HARD }\`

\- "Learning" difficulty does not exist. Free Play replaces it.

\### 2.2 Deterministic rules table

\| Axis \| FREE_PLAY \| EASY \| MEDIUM \| HARD \|

\|\-\--\|\-\--\|\-\--\|\-\--\|\-\--\|

\| Scoring \| Off by default \| On \| On \| On \|

\| Failure Conditions \| Off by default \| Minimal \| Standard \| Strict
\|

\| Timer \| Off by default \| Optional \| On (default) \| On (default)
\|

\| Prompt strictness \| User-driven \| Lenient \| Normal \| Strict \|

\| Enharmonic acceptance \| Accept both (unless strict enabled) \|
Accept both \| Contextual \| Contextual + strict \|

\| Hinting \| Max \| High \| Low \| Off \|

\| Multi-answer prompts \| Allowed \| Rare \| Common \| Common + strict
\|

Lock: Free Play never blocks input due to "wrong answer" unless the user
explicitly enables failure/timer rules.

\-\--

\## 3) SAM (Single After Miss): strict acceptance + visibility

\### 3.1 SAM states

\`SAM ∈ { SINGLE, EQUIV, ALL }\`

[\### 3.2 Default SAM by Learning Target]{.mark}

[\| Learning Target \| Default SAM \| Completion in SINGLE \| Completion
in MULTI \|]{.mark}

[\|\-\--\|\-\--\|\-\--\|\-\--\|]{.mark}

[\| Single Note \| SINGLE \| One correct submission event \| All valid
positions within constraints \|]{.mark}

[\| Intervals \| SINGLE \| One correct interval event \| All valid
interval events within constraints \|]{.mark}

[\| Chords \| MULTI \| One full chord spelling (required tones once) \|
All required tones across all valid positions within constraints
\|]{.mark}

[\| Scales \| MULTI \| One full scale spelling (required degrees once)
\| All required degrees across all valid positions within constraints
\|]{.mark}

[\| Arpeggios \| MULTI \| One full arpeggio spelling (required degrees
once) \| All required degrees across all valid positions within
constraints \|]{.mark}

\### 3.3 Visibility/feedback by Difficulty

\| Difficulty \| Show "remaining answers"? \| Show "remaining count"? \|
Show alternate spellings hint? \|

\|\-\--\|\-\--:\|\-\--:\|\-\--:\|

\| FREE_PLAY \| Yes \| Yes \| Yes \|

\| EASY \| Yes \| Yes \| Yes \|

\| MEDIUM \| Minimal \| Yes \| Optional \|

\| HARD \| No \| No \| No \|

\-\--

\## 4) Note Rail Interactivity (Reference / Input / Inspection)

\### 4.1 Rail modes

\`RailMode ∈ { REFERENCE, INPUT, INSPECTION }\`

\### 4.2 Rail behavior table

\| RailMode \| Click \| Hover \| Purpose \|

\|\-\--\|\-\--\|\-\--\|\-\--\|

\| REFERENCE \| No submission \| Optional highlight-only \|
Anchor/context visualization \|

\| INPUT \| Submits via unified input pipeline \| Hover previews \|
Answer surface \|

\| INSPECTION \| No submission \| Hover probes related positions \|
Diagnostic/teaching tool \|

\### 4.3 Lock to surface roles (Active / Prompt / Mark)

\| If Rail is... \| Allowed RailMode \|

\|\-\--\|\-\--\|

\| Prompt surface \| REFERENCE or INPUT \|

\| Active answer surface \| INPUT (optional INSPECTION overlay) \|

\| Mark-only surface \| REFERENCE \|

\-\--

\## 5) Segment Definition (unique segment) + token awarding

\### 5.1 Segment (formal)

A \*\*Segment\*\* is a new contiguous run of claimed cells meeting
minimum length, on the Fretboard.

\`Segment = (Owner, Direction, OrderedCellSet)\`

\- \`Direction ∈ { HORIZONTAL, VERTICAL, DIAG_DOWN, DIAG_UP }\`

\- \`len(OrderedCellSet) ≥ SegmentMin\`

\- Default \`SegmentMin = 4\` unless match rules override

\### 5.2 Uniqueness rule

A segment is \*\*unique\*\* if the exact tuple \`(Owner, Direction,
OrderedCellSet)\` has not been awarded in the current match.

\### 5.3 Awarding rule (ties to GEG-012)

\- \*\*1 token per NEW unique segment\*\*

\- If a single claim creates multiple unique segments, award one token
per segment (unless a cap is enabled)

\### 5.4 Learning target interaction

Learning target affects claim batching, not the segment definition:

\- Notes/Intervals: check segments after each accepted answer

\- Chords/Scales/Arpeggios: check segments after the full structure
resolves, then evaluate the batch

\-\--

\## 6) Answer Shortcut Menu (Right-Click) --- Canon stub

This is a canonical interaction shortcut; detailed contents will be
refined later.

\- Trigger: \*\*Mouse right-click\*\* on an eligible answer surface
target.

\- Context gating: Menu options must be restricted to options valid for
the current:

\- Learning Target

\- Prompt requirements

\- Pitch Framework / Key

\- Accidentals pool

\- Surface roles (Prompt / Mark / Display / SAM + Cardinal)

\- Pipeline: Selecting a menu option must submit through the \*\*same
unified input pipeline\*\* as normal input (no special scoring path).

\- Non-eligible areas must preserve the browser default context menu.

\- Touch fallback: long-press may be used later (documented only;
implementation optional).

## MERGE_NOTES.md

Source: 01_16_26_98/DOCS/MERGE_NOTES.md

\# Merge Notes

Baseline: \`guitar-edu-ui_v31_notation_toggles_prefs\`.

This merge adds:

\- \`PROJECT_NOTES.md\` (source-of-truth spec)

\- (Removed) \`DOCS/CHANGELOG.md\` (duplicate of root \`CHANGELOG.md\`)

\- Clean packaging (no \`node_modules\` or \`dist\`)

No gameplay mechanics were changed by this merge.

## PLATFORM_STRATEGY.md

Source: 01_16_26_98/DOCS/PLATFORM_STRATEGY.md

\# Platform Strategy (North Star)

This project will ship from \*\*one codebase\*\* (the web app) to
multiple distribution targets.

\## Goal

Support all of the following without forking the product:

1\. \*\*Hosted Website (Web)\*\*

2\. \*\*Offline-capable installable Web App (PWA)\*\*

3\. \*\*Downloadable Desktop App (Windows/macOS/Linux)\*\*

4\. \*\*Portable / USB distribution\*\*

\## Recommended Architecture

\### Core Product

Keep the game as a \*\*Vite + React web app\*\*. Treat everything else
as packaging around the same built assets.

\### Distribution Targets

\#### A) Web (Hosted)

\- Build the static bundle and deploy to a CDN/host.

\- Best for classrooms, instant updates, central analytics.

\#### B) PWA (Offline-first)

\- Add a service worker + asset caching + install manifest.

\- Runs offline after first load.

\- Strong fit for school devices, tablets, and kiosk-style play.

\#### C) Desktop Wrapper (Preferred: Tauri)

\- Wrap the web build in a lightweight desktop shell.

\- \*\*Tauri\*\* is preferred (small footprint, strong security model,
system WebView).

\- Electron remains an alternative if we need maximum ecosystem
compatibility.

\#### D) USB / Pen Drive

\- Recommended: \*\*Portable desktop build\*\* (Tauri) for Windows.

\- Secondary: offline PWA packaging, but portable desktop is more
deterministic for \"works anywhere\".

\## Testing Strategy (Aligned to Shipping)

\### Unit Tests (Vitest)

Remain the primary guardrail for deterministic logic:

\- timeline shift-left pipeline

\- commit gates / accepted-history integrity

\- spelling policy truth table (strict vs enharmonic)

\- TAB stacking + persistence

\- ledger clipping constraints

\### E2E Tests (Playwright)

E2E should run against a \*\*built preview server\*\* whenever possible,
because it matches shipped behavior.

Preferred:

\- \`npm run build\`

\- \`npm run preview \-- \--port 4173\`

\- Playwright targets \`http://localhost:4173\`

This approach is more stable than driving a dev server and reduces
Windows/Node runtime flakiness.

\### Desktop Smoke Tests

Once the desktop wrapper exists:

\- run a minimal \"boots and loads\" smoke

\- keep feature-level UI testing in Playwright against the preview build

\## Dev Workflow Policy

\### Supported (Canonical)

\- Developers start the app via terminal:

\- \`npm install\`

\- \`npm run dev\`

\### Convenience Launchers

Batch files are treated as \*\*convenience\*\* only. They must:

\- fail loudly

\- write logs

\- never be the only supported path

Rationale: native optional-dependency installs (Rollup) can be
non-deterministic on Windows under newer Node/npm.

\## Implementation Roadmap

\### Phase 1 (Now)

1\. Keep current Vite/React app as the canonical runtime.

2\. Shift E2E to run against \`vite preview\` by default.

3\. Document platform strategy and testing flows.

\### Phase 2 (PWA)

1\. ✅ Add manifest + icons (see \`public/icons/\`).

2\. ✅ Add service worker caching (offline-first) via
\`vite-plugin-pwa\`.

3\. ✅ Add offline-friendly persistence snapshot in IndexedDB +
export/import.

\#### Offline Asset Boundary (Current)

The service worker caches \*\*the static build output\*\* (HTML/CSS/JS +
Vite assets) and public assets

needed to render the UI (SVGs, icons, fonts).

What is \*not\* cached:

\- anything fetched from the network at runtime (future: analytics,
multiplayer services)

\#### Game State Persistence (Current)

We persist a single \*\*versioned snapshot\*\* to IndexedDB:

\- settings

\- leaderboards

The snapshot can be exported/imported as a JSON file for USB /
air-gapped workflows.

\### Phase 3 (Desktop: Tauri)

1\. Add \`/packages/desktop\` wrapper.

2\. Load production build inside Tauri.

3\. Produce Windows portable build.

4\. Add smoke test for wrapper boot.

\## Design Implications

To ship across all targets, UI/UX should remain:

\- touch-first (no hover-only interactions)

\- responsive (tablet, kiosk, desktop)

\- deterministic rendering (consistent across WebView engines)

\- offline-friendly storage (IndexedDB + export/import)

## RUNTIME_CANON_GUARDS.md

Source: 01_16_26_98/DOCS/RUNTIME_CANON_GUARDS.md

\# Runtime Canon Guards (Enforcement Hooks)

This document records the minimal runtime enforcement hooks that prevent
regression into deprecated

legacy patterns.

These guards are intentionally small and surgical. They do not create
new systems or refactor the app.

They exist to ensure the codebase cannot silently drift back into
prohibited concepts.

\-\--

\## Guard 1 --- No "Modes" (Legacy uiMode Freeze)

Status: ACTIVE

\- Any legacy \`uiMode\` value (anything other than \`\"m4\"\`) is
treated as deprecated.

\- Runtime behavior forcibly freezes uiMode to \`\"m4\"\`.

\- A one-time console warning is emitted if a non-\`m4\` value is
encountered.

\- The UI selector \`#core-gameMode\` is disabled and forced to
\`\"m4\"\` when present.

This guard exists because the canon forbids "modes" and requires Surface
Controls + Match Rules

to define session behavior.

References:

\- \`DOCS/DEPRECATED_TERMS.md\`

\- \`DOCS/CANONICAL_LAYERS_DIAGRAM.md\`

\- \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`

\- \`DOCS/START_SCREEN_UI_MAPPING.md\`

## STABILITY_SIM_REPORT_2026-01-15.md

Source: 01_16_26_98/DOCS/STABILITY_SIM_REPORT_2026-01-15.md

\# Stability Audit -- Internal Simulation Report (2026-01-15)

Build under test: \*\*01_15_26_53\*\*

\## Environment constraints

\- Runner has \*\*no network access\*\*, so it cannot fetch packages via
\`npm ci\` / \`npm install\`.

\- This prevents running Vitest/Playwright here; simulation is limited
to static checks.

\## Checks executed

\### 1) TypeScript typecheck

Command executed:

\- \`npm run typecheck\`

Result:

\- \*\*FAIL\*\* in the current codebase due to pre-existing type errors
unrelated to the stability guards.

Notable errors (top-level):

\- \`src/app/gameController.ts\`: missing symbols (\`stopAllTimers\`,
\`logUI\`, \`pitchClassFromStringFret\`, \`STANDARD_TUNING\`), variable
redeclare (\`matrix\`), and setting shape mismatches.

\- \`src/app/smokeTest.ts\`: undefined identifiers (\`doc\`,
\`failures\`).

\- \`src/render/RendererManager.ts\`: return type mismatch when failing
to initialize.

\- \`src/shell/\*\`: snapshot/hydration helpers referenced but not
defined; \`idb-keyval\` module types missing in this environment.

\- \`src/ui/layout.ts\`: intent type mismatch (\`LaunchIntent \|
null\`).

\### 2) Packaging sanity

\- ZIP extraction and file integrity: \*\*PASS\*\*.

\- Boot guard logic compiles at the syntax level: \*\*PASS\*\* after the
corrections in this build.

\## Stability-specific findings

\### Successes

\- \*\*Resolved syntax-level breakage\*\* that would prevent the app
from loading:

\- Removed a stray brace in \`buildSettingsFromUi\`.

\- Removed a stray block outside of \`initGameController\`.

\- Repaired \`src/main.ts\` tail section (removed malformed braces;
added explicit hard boot guard).

\### Failures / blockers (non-stability)

\- The repo currently cannot pass \`tsc \--noEmit\`, which blocks a full
CI-grade stability simulation.

\- Dependency installation cannot be validated in this environment (no
network).

\## Recommended next action

\- Proceed to the next checklist section, but record a new canon task
set for \"Typecheck Clean\" so the project can return to a buildable
baseline:

\- Remove or implement missing helpers in \`gameController.ts\`.

\- Fix \`smokeTest.ts\` variables.

\- Fix \`RendererManager\` return typing for failed init.

\- Align shell snapshot/hydration helpers.

## START_SCREEN_UI_MAPPING.md

Source: 01_16_26_98/DOCS/START_SCREEN_UI_MAPPING.md

\# Start Screen UI Mapping (Frozen)

This document defines the \*\*Start Screen UI\*\* and is frozen by
design.

It exists to ensure fast, repeatable setup without exposing advanced or
expert-only controls.

\-\--

\## Terminology alignment

\- \"Start Screen\", \"Start Menu\", and \"Main Menu\" refer to the same
\*\*initialization area\*\* where match settings are chosen before a
match is engaged.

\- The current implementation presents this as a \*\*Launch Menu\*\*
that expands into columns (e.g., Match Options appears as a column).

\## Guardrails (Do Not Reintroduce)

The Start Screen MUST NOT:

\- Reintroduce numbered or named "modes"

\- Collapse Learning Type, Input Method, or Surface Controls into a
single selector

\- Expose Advanced Match Options parameters

\- Auto-reveal equivalents or shortcuts

Any change that appears to require these behaviors must instead be
routed

through \*\*Advanced Match Options\*\*.

This document is explicitly bound to:

\- \`DOCS/DEPRECATED_TERMS.md\`

\- \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`

\-\--

\## Initialization Panels (Frozen)

1\) Game Mode

2\) Learning Type (Primary Selector)

3\) Musical Context (Key / Collection / Accidentals shortcut)

4\) Domain Core (Instrument preset / Tuning preset / Fret range preset)

5\) Surface Preset (A--J)

6\) Timer Quick Toggle

No additional panels may be added without a versioned update.

\*\*UI mapping note:\*\* These panels may be presented as a single
screen or as multiple columns, but the information groups and their
relative priority must remain the same.

\-\--

\## Match Options Ordering (Reference)

When Match Options are entered from the Start Screen flow, the
configuration UI must present:

1\. Domain Constraints

2\. Surface Preset (A--J)

3\. Remaining options

This ordering is intentional to speed up match iteration and should not
be changed without a versioned update.

\## Input shortcuts

\- Right-click (mouse) opens an Answer Shortcut Menu on eligible answer
surfaces (context-gated; unified input pipeline).

# Part VI -- Conversation Composite (JSON Evidence)

Embedded from DOCS/conversation_composite.json (01_18_26_22).

{

\"project\": \"Guitar Education Game\",

\"artifact\": \"conversation_composite\",

\"version\": 2,

\"updated_at\": \"2026-01-17\",

\"rules\": {

\"append_only\": true,

\"supersede_instead_of_edit\": true,

\"status_values\": \[

\"active\",

\"superseded\"

\],

\"entry_types\": \[

\"decision\",

\"constraint\",

\"default\",

\"deprecation\",

\"process\"

\]

},

\"entries\": \[

{

\"id\": \"CC-0001\",

\"date\": \"2026-01-17\",

\"topic\": \"Modes\",

\"type\": \"decision\",

\"status\": \"active\",

\"statement\": \"Mode refers only to musical modes (e.g., Ionian,
Dorian, etc. plus chromatic/pentatonic/blues as applicable).\",

\"source\": \"Chat: 2026-01-17 (Modes clarification)\"

},

{

\"id\": \"CC-0002\",

\"date\": \"2026-01-17\",

\"topic\": \"SurfaceControls\",

\"type\": \"decision\",

\"status\": \"active\",

\"statement\": \"Boards/surfaces in play are determined by Surface
Controls (prompt/mark/display/in-play), not by any legacy
board-selection modes.\",

\"source\": \"Chat: 2026-01-17 (Surface controls replace board modes)\"

},

{

\"id\": \"CC-0003\",

\"date\": \"2026-01-17\",

\"topic\": \"SurfaceControls\",

\"type\": \"constraint\",

\"status\": \"active\",

\"statement\": \"A surface being \'not visible\' means it does not
display notes/positions; it does not imply the surface is removed unless
Surface Controls explicitly turn it off.\",

\"source\": \"Project canon (visibility vs removal)\"

},

{

\"id\": \"CC-0004\",

\"date\": \"2026-01-17\",

\"topic\": \"SAM\",

\"type\": \"decision\",

\"status\": \"active\",

\"statement\": \"Show After Miss (SAM) options are: Single, Equivalent
(same pitch), All. The prior \'Multiple\' option is deprecated and must
not appear in UI/state.\",

\"source\": \"Chat: 2026-01-17 (SAM expanded options)\"

},

{

\"id\": \"CC-0005\",

\"date\": \"2026-01-17\",

\"topic\": \"SAM\",

\"type\": \"constraint\",

\"status\": \"active\",

\"statement\": \"SAM \'Equivalent (same pitch)\' reveals positions that
produce the same pitch within the active fret range, and only includes
alternate spellings when the current rules allow them.\",

\"source\": \"Chat: 2026-01-17 (SAM equivalents definition)\"

},

{

\"id\": \"CC-0006\",

\"date\": \"2026-01-17\",

\"topic\": \"FretRange\",

\"type\": \"default\",

\"status\": \"active\",

\"statement\": \"Default fret range is 0 to 12 inclusive (13 total).\",

\"source\": \"Chat: 2026-01-17 (Default fret range correction)\"

},

{

\"id\": \"CC-0007\",

\"date\": \"2026-01-17\",

\"topic\": \"Process\",

\"type\": \"process\",

\"status\": \"active\",

\"statement\": \"Before executing each checklist step, re-check the
project conversation composite for the latest active canon that impacts
that step.\",

\"source\": \"Chat: 2026-01-17 (Pre-step canon check requirement)\"

},

{

\"id\": \"CC-0008\",

\"date\": \"2026-01-17\",

\"topic\": \"NoteDisplay\",

\"type\": \"decision\",

\"status\": \"active\",

\"statement\": \"Add Note Display option \'Roman (Scale Degree)\'
distinct from \'Interval Roman\' (Roman Numeral Interval System);
required for diatonic chords and traditional theory references.\",

\"source\": \"Chat: 2026-01-17 (Roman note display requirement)\"

},

{

\"id\": \"CC-0009\",

\"date\": \"2026-01-18\",

\"topic\": \"Vulnerability\",

\"type\": \"decision\",

\"status\": \"active\",

\"statement\": \"Current-note vulnerability triggers after 3 consecutive
misses (attempts to solve the current task/prompt) by the same player;
the threshold is adjustable in Match Settings. When vulnerable, the
current note blinks.\",

\"source\": \"Chat: 2026-01-18 (Vulnerability after consecutive
misses)\"

},

{

\"id\": \"CC-0010\",

\"date\": \"2026-01-18\",

\"topic\": \"SegmentSteal\",

\"type\": \"constraint\",

\"status\": \"active\",

\"statement\": \"A stolen segment may impose a significant point penalty
only when the entire segment is taken (ownership transfer of the full
segment). A single note breaking continuity does not trigger
segment-steal penalty.\",

\"source\": \"Chat: 2026-01-18 (Full-segment steal penalty constraint)\"

}

\]

}

# Part VII -- Master Timeline Ledger (MTL) -- Build-by-Build Record

Derived directly from MTL_MASTER_TIMELINE_LEDGER.md.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Archive                          Build   Date         Integrity                 Spine                         Key Notes   Changelog Head Evidence (excerpt)
                                                                                                                (excerpt)   
  -------------------------------- ------- ------------ ------------------------- ----------------------------- ----------- --------------------------------------------------
  guitar-edu-ui_01_06_26_02.zip    2       2026-01-06   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_09_26_01.zip    1       2026-01-09   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_10_26_23.zip    23      2026-01-10   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_11_26_08.zip    8       2026-01-11   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_11_26_10.zip    10      2026-01-11   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_12_26_15.zip    15      2026-01-12   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_13_26_02.zip    2       2026-01-13   instruction spine 4/5 •   CHECKLIST.md=yes,                         \## Build: guitar-edu-ui_01_13_26_01\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=yes,                    - Splash: Selecting a session now opens a
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=yes,                     \*\*Start Setup\*\* gate (content/mode/root/fret
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                range) instead of immediately starting a match.\
                                                        no                        THREAD_HANDOFF.md=yes                     - Start Setup: Applies selections into the
                                                                                                                            existing canonical settings controls and then
                                                                                                                            dispatches \`gedu:beginSession\`.\
                                                                                                                            - Compatibility: \`gedu:splashSelect\` is still
                                                                                                                            supported in the controller for older builds.\
                                                                                                                            \## Build: guitar-edu-ui_01_12_26_14\
                                                                                                                            - Platform: Added \*\*PWA\*\* support (manifest +
                                                                                                                            service worker) via \`vite-plugin-pwa\`.\
                                                                                                                            - Offline: Defined current offline asset boundary
                                                                                                                            (static build + required public assets) in
                                                                                                                            \`DOCS/PLATFORM_STRATEGY.md\`.\
                                                                                                                            - Persistence: Added IndexedDB snapshot
                                                                                                                            (settings + leaderboards) with \*\*Export Save /
                                                                                                                            Import Save\*\* tools in Dev/Test panel.\
                                                                                                                            - Bootstrap: App hydrates local state from
                                                                                                                            IndexedDB on load (without breaking existing
                                                                                                                            localStorage keys).\
                                                                                                                            \## Build: guitar-edu-ui_01_12_26_13\
                                                                                                                            - E2E: Playwright now runs against \*\*built
                                                                                                                            output\*\* via \`vite preview\` on \*\*port
                                                                                                                            4173\*\* (shipping-aligned; reduces Windows/Node
                                                                                                                            optional-dep flakiness).\
                                                                                                                            - E2E: Added \`start-server-and-test\` and updated
                                                                                                                            \`npm run e2e\` / \`npm run e2e:ui\` to: \`build
                                                                                                                            -\> preview -\> playwright\`.\
                                                                                                                            - Docs: Updated \`TESTING.md\` to document
                                                                                                                            preview-based E2E behavior and baseURL override.\
                                                                                                                            \## Build: guitar-edu-ui_01_12_26_12\
                                                                                                                            - Docs: Added \`DOCS/PLATFORM_STRATEGY.md\`
                                                                                                                            defining the shipping architecture: \*\*Web +
                                                                                                                            PWA + Desktop (Tauri)\*\* from one codebase.\
                                                                                                                            - Docs: Recorded the decision in
                                                                                                                            \`DECISIONS_LOG.md\` and progress notes in
                                                                                                                            \`CANON_PROGRESS.md\`.\
                                                                                                                            \## Build: guitar-edu-ui_01_12_26_11\
                                                                                                                            - Hotfix: Windows one-click dev runner now
                                                                                                                            guarantees \`npm run dev\` executes and logs
                                                                                                                            output (removed fragile PowerShell Tee-Object
                                                                                                                            invocation; runner uses direct \`call npm run dev
                                                                                                                            \>\> logs\\devserver.log\`).

  guitar-edu-ui_01_13_26_18.zip    18      2026-01-13   instruction spine 5/5 •   CHECKLIST.md=yes,                         \## Build: guitar-edu-ui_01_13_26_03\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=yes,                    - Lexicon: Removed the deprecated \"combined\"
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=yes,                     label from \`ModeId\` (kept the legacy internal
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=yes,               value for backward compatibility).\
                                                        no                        THREAD_HANDOFF.md=yes                     - Note Rail: Default layer state now treats the
                                                                                                                            rail as a \*\*prompt-first\*\* surface (\`asked\`
                                                                                                                            ON, \`answered\` OFF by default). This avoids
                                                                                                                            implying rail history persistence while keeping
                                                                                                                            the prompt highlight active.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_05\
                                                                                                                            - Docs: Added \`DOCS/DEPRECATED_TERMS.md\` to
                                                                                                                            enumerate obsolete terms and disallowed
                                                                                                                            regressions (no numbered "modes", no "combined
                                                                                                                            mode", no treating asked/answered/view as rules).\
                                                                                                                            - Docs: Added \`MATCH_SETTINGS_SPEC.md\` into the
                                                                                                                            archive and expanded match settings details for
                                                                                                                            learning structures, timing, accuracy, failure,
                                                                                                                            and bonus requirements.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_01\
                                                                                                                            - Splash: Selecting a session now opens a
                                                                                                                            \*\*Start Setup\*\* gate (content/mode/root/fret
                                                                                                                            range) instead of immediately starting a match.\
                                                                                                                            - Start Setup: Applies selections into the
                                                                                                                            existing canonical settings controls and then
                                                                                                                            dispatches \`gedu:beginSession\`.\
                                                                                                                            - Compatibility: \`gedu:splashSelect\` is still
                                                                                                                            supported in the controller for older builds.\
                                                                                                                            \## Build: guitar-edu-ui_01_12_26_14\
                                                                                                                            - Platform: Added \*\*PWA\*\* support (manifest +
                                                                                                                            service worker) via \`vite-plugin-pwa\`.\
                                                                                                                            - Offline: Defined current offline asset boundary
                                                                                                                            (static build + required public assets) in
                                                                                                                            \`DOCS/PLATFORM_STRATEGY.md\`.\
                                                                                                                            - Persistence: Added IndexedDB snapshot
                                                                                                                            (settings + leaderboards) with \*\*Export Save /
                                                                                                                            Import Save\*\* tools in Dev/Test panel.\
                                                                                                                            - Bootstrap: App hydrates local state from
                                                                                                                            IndexedDB on load (without breaking existing
                                                                                                                            localStorage keys).\
                                                                                                                            \## Build: guitar-edu-ui_01_12_26_13\
                                                                                                                            - E2E: Playwright now runs against \*\*built
                                                                                                                            output\*\* via \`vite preview\` on \*\*port
                                                                                                                            4173\*\* (shipping-aligned; reduces Windows/Node
                                                                                                                            optional-dep flakiness).\
                                                                                                                            - E2E: Added \`start-server-and-test\` and updated
                                                                                                                            \`npm run e2e\` / \`npm run e2e:ui\` to: \`build
                                                                                                                            -\> preview -\> playwright\`.

  guitar-edu-ui_01_13_26_20.zip    20      2026-01-13   instruction spine 5/5 •   CHECKLIST.md=yes,                         \## Build: guitar-edu-ui_01_13_26_20\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=yes,                    - Docs: Added a task-ID gap policy and ledger.\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=yes,                     - Added \`DOCS/RETIRED_TASK_IDS.md\` (currently
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=yes,               records all undefined IDs as \*\*Unassigned\*\*).\
                                                        no                        THREAD_HANDOFF.md=yes                     - Linked the ledger from \`CHECKLIST.md\`.\
                                                                                                                            - Docs: Updated \`CANON_PROGRESS.md\` build
                                                                                                                            package reference to
                                                                                                                            \`guitar-edu-ui_01_13_26_19.zip\`.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_19\
                                                                                                                            - Docs: Reconciled \`MATCH_SETTINGS_SPEC.md\` with
                                                                                                                            \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`.\
                                                                                                                            - Added \*\*Arpeggios\*\* to Learning Type.\
                                                                                                                            - Canonized \*\*Input Method\*\* as a match
                                                                                                                            setting (interaction granularity only).\
                                                                                                                            - Expanded \*\*Domain Constraints\*\* in spec
                                                                                                                            (string range, span, notes-per-string, position
                                                                                                                            scope).\
                                                                                                                            - Expanded \*\*Timing Rules\*\* to include
                                                                                                                            disabled state + time
                                                                                                                            bank/intermission/increments/penalties/runtime
                                                                                                                            cap.\
                                                                                                                            - Canonized \*\*Randomization\*\* rules (opt-in;
                                                                                                                            embedded; no global toggle).\
                                                                                                                            - Placed \*\*Failure Conditions\*\*, \*\*Bonus
                                                                                                                            Phase\*\*, and \*\*Roman Numeral Interval
                                                                                                                            System\*\* in Advanced Match Options mapping.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_03\
                                                                                                                            - Lexicon: Removed the deprecated \"combined\"
                                                                                                                            label from \`ModeId\` (kept the legacy internal
                                                                                                                            value for backward compatibility).\
                                                                                                                            - Note Rail: Default layer state now treats the
                                                                                                                            rail as a \*\*prompt-first\*\* surface (\`asked\`
                                                                                                                            ON, \`answered\` OFF by default). This avoids
                                                                                                                            implying rail history persistence while keeping
                                                                                                                            the prompt highlight active.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_05\
                                                                                                                            - Docs: Added \`DOCS/DEPRECATED_TERMS.md\` to
                                                                                                                            enumerate obsolete terms and disallowed
                                                                                                                            regressions (no numbered "modes", no "combined
                                                                                                                            mode", no treating asked/answered/view as rules).

  guitar-edu-ui_01_14_26_02.zip    2       2026-01-14   instruction spine 5/5 •   CHECKLIST.md=yes,                         \## Build: guitar-edu-ui_01_13_26_20\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=yes,                    - Docs: Added a task-ID gap policy and ledger.\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=yes,                     - Added \`DOCS/RETIRED_TASK_IDS.md\` (currently
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=yes,               records all undefined IDs as \*\*Unassigned\*\*).\
                                                        no                        THREAD_HANDOFF.md=yes                     - Linked the ledger from \`CHECKLIST.md\`.\
                                                                                                                            - Docs: Updated \`CANON_PROGRESS.md\` build
                                                                                                                            package reference to
                                                                                                                            \`guitar-edu-ui_01_13_26_19.zip\`.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_19\
                                                                                                                            - Docs: Reconciled \`MATCH_SETTINGS_SPEC.md\` with
                                                                                                                            \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`.\
                                                                                                                            - Added \*\*Arpeggios\*\* to Learning Type.\
                                                                                                                            - Canonized \*\*Input Method\*\* as a match
                                                                                                                            setting (interaction granularity only).\
                                                                                                                            - Expanded \*\*Domain Constraints\*\* in spec
                                                                                                                            (string range, span, notes-per-string, position
                                                                                                                            scope).\
                                                                                                                            - Expanded \*\*Timing Rules\*\* to include
                                                                                                                            disabled state + time
                                                                                                                            bank/intermission/increments/penalties/runtime
                                                                                                                            cap.\
                                                                                                                            - Canonized \*\*Randomization\*\* rules (opt-in;
                                                                                                                            embedded; no global toggle).\
                                                                                                                            - Placed \*\*Failure Conditions\*\*, \*\*Bonus
                                                                                                                            Phase\*\*, and \*\*Roman Numeral Interval
                                                                                                                            System\*\* in Advanced Match Options mapping.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_03\
                                                                                                                            - Lexicon: Removed the deprecated \"combined\"
                                                                                                                            label from \`ModeId\` (kept the legacy internal
                                                                                                                            value for backward compatibility).\
                                                                                                                            - Note Rail: Default layer state now treats the
                                                                                                                            rail as a \*\*prompt-first\*\* surface (\`asked\`
                                                                                                                            ON, \`answered\` OFF by default). This avoids
                                                                                                                            implying rail history persistence while keeping
                                                                                                                            the prompt highlight active.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_05\
                                                                                                                            - Docs: Added \`DOCS/DEPRECATED_TERMS.md\` to
                                                                                                                            enumerate obsolete terms and disallowed
                                                                                                                            regressions (no numbered "modes", no "combined
                                                                                                                            mode", no treating asked/answered/view as rules).

  guitar-edu-ui_01_14_26_12.zip    12      2026-01-14   instruction spine 5/5 •   CHECKLIST.md=yes,                         \## Build: guitar-edu-ui_01_13_26_20\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=yes,                    - Docs: Added a task-ID gap policy and ledger.\
                                                        LOCK_IN_TABLES: yes •     DECISIONS_LOG.md=yes,                     - Added \`DOCS/RETIRED_TASK_IDS.md\` (currently
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=yes,               records all undefined IDs as \*\*Unassigned\*\*).\
                                                        no                        THREAD_HANDOFF.md=yes                     - Linked the ledger from \`CHECKLIST.md\`.\
                                                                                                                            - Docs: Updated \`CANON_PROGRESS.md\` build
                                                                                                                            package reference to
                                                                                                                            \`guitar-edu-ui_01_13_26_19.zip\`.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_19\
                                                                                                                            - Docs: Reconciled \`MATCH_SETTINGS_SPEC.md\` with
                                                                                                                            \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`.\
                                                                                                                            - Added \*\*Arpeggios\*\* to Learning Type.\
                                                                                                                            - Canonized \*\*Input Method\*\* as a match
                                                                                                                            setting (interaction granularity only).\
                                                                                                                            - Expanded \*\*Domain Constraints\*\* in spec
                                                                                                                            (string range, span, notes-per-string, position
                                                                                                                            scope).\
                                                                                                                            - Expanded \*\*Timing Rules\*\* to include
                                                                                                                            disabled state + time
                                                                                                                            bank/intermission/increments/penalties/runtime
                                                                                                                            cap.\
                                                                                                                            - Canonized \*\*Randomization\*\* rules (opt-in;
                                                                                                                            embedded; no global toggle).\
                                                                                                                            - Placed \*\*Failure Conditions\*\*, \*\*Bonus
                                                                                                                            Phase\*\*, and \*\*Roman Numeral Interval
                                                                                                                            System\*\* in Advanced Match Options mapping.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_03\
                                                                                                                            - Lexicon: Removed the deprecated \"combined\"
                                                                                                                            label from \`ModeId\` (kept the legacy internal
                                                                                                                            value for backward compatibility).\
                                                                                                                            - Note Rail: Default layer state now treats the
                                                                                                                            rail as a \*\*prompt-first\*\* surface (\`asked\`
                                                                                                                            ON, \`answered\` OFF by default). This avoids
                                                                                                                            implying rail history persistence while keeping
                                                                                                                            the prompt highlight active.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_05\
                                                                                                                            - Docs: Added \`DOCS/DEPRECATED_TERMS.md\` to
                                                                                                                            enumerate obsolete terms and disallowed
                                                                                                                            regressions (no numbered "modes", no "combined
                                                                                                                            mode", no treating asked/answered/view as rules).

  guitar-edu-ui_01_16_26_98.zip    98      2026-01-16   instruction spine 5/5 •   CHECKLIST.md=yes,                         \> \*\*Note (stability audit):\*\* The legacy
                                                        DOCS folder: yes •        CANON_PROGRESS.md=yes,                    lowercase \`/docs\` folder has been removed. Any
                                                        LOCK_IN_TABLES: yes •     DECISIONS_LOG.md=yes,                     historic references to \`docs/\*\` paths in this
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=yes,               changelog refer to artifacts that no longer exist
                                                        no                        THREAD_HANDOFF.md=yes                     and should be treated as archival history only.\
                                                                                                                            \## Build: guitar-edu-ui_01_16_26_88\
                                                                                                                            \## Build: guitar-edu-ui_01_16_26_94\
                                                                                                                            - Multiplayer Start Menu: Added a player roster
                                                                                                                            panel with editable player names, visible count,
                                                                                                                            and add/remove controls.\
                                                                                                                            - Engine init: Multiplayer \`players\[\]\` now
                                                                                                                            uses \`window.\_\_GEDU_PLAYER_NAMES\_\_\` when
                                                                                                                            present (falls back to P1\...Pn).\
                                                                                                                            - Match correctness: When STAFF is required
                                                                                                                            alongside TAB and/or Fretboard, enforce \*\*exact
                                                                                                                            pitch\*\* alignment across surfaces (not just
                                                                                                                            pitch-class). Staff pitch is treated as
                                                                                                                            treble-clef absolute pitch and must equal the
                                                                                                                            TAB/Fret absolute pitch.\
                                                                                                                            - Music: Added \`pitchMidiAt()\` helper for
                                                                                                                            standard-tuning absolute pitch comparisons.\
                                                                                                                            \## Build: guitar-edu-ui_01_15_26_02\
                                                                                                                            - Fix: Ensure Canvas2D surfaces (fretboard +
                                                                                                                            staff/tab) repaint deterministically on each
                                                                                                                            \`renderAll()\` pass so they do not remain blank
                                                                                                                            after splash/visibility transitions.\
                                                                                                                            - Docs: Removed legacy Task Board tracking
                                                                                                                            (CHECKLIST.md remains the only completion gate).\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_20\
                                                                                                                            - Docs: Added a task-ID gap policy and ledger.\
                                                                                                                            - Added \`DOCS/RETIRED_TASK_IDS.md\` (currently
                                                                                                                            records all undefined IDs as \*\*Unassigned\*\*).\
                                                                                                                            - Linked the ledger from \`CHECKLIST.md\`.\
                                                                                                                            - Docs: Updated \`CANON_PROGRESS.md\` build
                                                                                                                            package reference to
                                                                                                                            \`guitar-edu-ui_01_13_26_19.zip\`.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_19\
                                                                                                                            - Docs: Reconciled \`MATCH_SETTINGS_SPEC.md\` with
                                                                                                                            \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`.\
                                                                                                                            - Added \*\*Arpeggios\*\* to Learning Type.

  guitar-edu-ui_01_17_26_30.zip    30      2026-01-17   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## Step 14.1 (Regression cleanup)\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Replaced fretboard SVG with
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                        yes                       THREAD_HANDOFF.md=no                      content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).\
                                                                                                                            - Marked \*\*GEG-016\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.3 (GEG-020 Player card timer)\
                                                                                                                            - Verified Player Card contains avatar, score,
                                                                                                                            tokens, and turn timer display.\
                                                                                                                            - Marked \*\*GEG-020\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.4 (GEG-022 Active players only)\
                                                                                                                            - Added a Multiplayer player-count selector to the
                                                                                                                            splash screen (2--5).\
                                                                                                                            - Match init now uses the selected player count so
                                                                                                                            the in-match leaderboard renders only active
                                                                                                                            players.\
                                                                                                                            - Marked \*\*GEG-022\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.5 (Multiplayer cap correction)

  guitar-edu-ui_01_17_26_111.zip   111     2026-01-17   instruction spine 5/5 •   CHECKLIST.md=yes,                         \> \*\*Note (stability audit):\*\* The legacy
                                                        DOCS folder: yes •        CANON_PROGRESS.md=yes,                    lowercase \`/docs\` folder has been removed. Any
                                                        LOCK_IN_TABLES: yes •     DECISIONS_LOG.md=yes,                     historic references to \`docs/\*\` paths in this
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=yes,               changelog refer to artifacts that no longer exist
                                                        no                        THREAD_HANDOFF.md=yes                     and should be treated as archival history only.\
                                                                                                                            \## Build: guitar-edu-ui_01_16_26_88\
                                                                                                                            \## Build: guitar-edu-ui_01_16_26_94\
                                                                                                                            - Multiplayer Start Menu: Added a player roster
                                                                                                                            panel with editable player names, visible count,
                                                                                                                            and add/remove controls.\
                                                                                                                            - Engine init: Multiplayer \`players\[\]\` now
                                                                                                                            uses \`window.\_\_GEDU_PLAYER_NAMES\_\_\` when
                                                                                                                            present (falls back to P1\...Pn).\
                                                                                                                            - Match correctness: When STAFF is required
                                                                                                                            alongside TAB and/or Fretboard, enforce \*\*exact
                                                                                                                            pitch\*\* alignment across surfaces (not just
                                                                                                                            pitch-class). Staff pitch is treated as
                                                                                                                            treble-clef absolute pitch and must equal the
                                                                                                                            TAB/Fret absolute pitch.\
                                                                                                                            - Music: Added \`pitchMidiAt()\` helper for
                                                                                                                            standard-tuning absolute pitch comparisons.\
                                                                                                                            \## Build: guitar-edu-ui_01_15_26_02\
                                                                                                                            - Fix: Ensure Canvas2D surfaces (fretboard +
                                                                                                                            staff/tab) repaint deterministically on each
                                                                                                                            \`renderAll()\` pass so they do not remain blank
                                                                                                                            after splash/visibility transitions.\
                                                                                                                            - Docs: Removed legacy Task Board tracking
                                                                                                                            (CHECKLIST.md remains the only completion gate).\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_20\
                                                                                                                            - Docs: Added a task-ID gap policy and ledger.\
                                                                                                                            - Added \`DOCS/RETIRED_TASK_IDS.md\` (currently
                                                                                                                            records all undefined IDs as \*\*Unassigned\*\*).\
                                                                                                                            - Linked the ledger from \`CHECKLIST.md\`.\
                                                                                                                            - Docs: Updated \`CANON_PROGRESS.md\` build
                                                                                                                            package reference to
                                                                                                                            \`guitar-edu-ui_01_13_26_19.zip\`.\
                                                                                                                            \## Build: guitar-edu-ui_01_13_26_19\
                                                                                                                            - Docs: Reconciled \`MATCH_SETTINGS_SPEC.md\` with
                                                                                                                            \`DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md\`.\
                                                                                                                            - Added \*\*Arpeggios\*\* to Learning Type.

  guitar-edu-ui_01_18_26_01.zip    1       2026-01-18   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_18_26_02.zip    2       2026-01-18   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_18_26_03.zip    3       2026-01-18   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_18_26_04.zip    4       2026-01-18   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      

  guitar-edu-ui_01_18_26_14.zip    14      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Added miss-streak tracking per prompt variant;
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                after \*\*3 consecutive misses\*\* on the same
                                                        yes                       THREAD_HANDOFF.md=no                      prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).\
                                                                                                                            - Marked \*\*GEG-016\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.3 (GEG-020 Player card timer)\
                                                                                                                            - Verified Player Card contains avatar, score,
                                                                                                                            tokens, and turn timer display.\
                                                                                                                            - Marked \*\*GEG-020\*\* complete in CHECKLIST.md.

  guitar-edu-ui_01_18_26_15.zip    15      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Added miss-streak tracking per prompt variant;
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                after \*\*3 consecutive misses\*\* on the same
                                                        yes                       THREAD_HANDOFF.md=no                      prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).\
                                                                                                                            - Marked \*\*GEG-016\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.3 (GEG-020 Player card timer)\
                                                                                                                            - Verified Player Card contains avatar, score,
                                                                                                                            tokens, and turn timer display.\
                                                                                                                            - Marked \*\*GEG-020\*\* complete in CHECKLIST.md.

  guitar-edu-ui_01_18_26_16.zip    16      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Added miss-streak tracking per prompt variant;
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                after \*\*3 consecutive misses\*\* on the same
                                                        yes                       THREAD_HANDOFF.md=no                      prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).\
                                                                                                                            - Marked \*\*GEG-016\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.3 (GEG-020 Player card timer)\
                                                                                                                            - Verified Player Card contains avatar, score,
                                                                                                                            tokens, and turn timer display.\
                                                                                                                            - Marked \*\*GEG-020\*\* complete in CHECKLIST.md.

  guitar-edu-ui_01_18_26_17.zip    17      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Added miss-streak tracking per prompt variant;
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                after \*\*3 consecutive misses\*\* on the same
                                                        yes                       THREAD_HANDOFF.md=no                      prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).\
                                                                                                                            - Marked \*\*GEG-016\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.3 (GEG-020 Player card timer)\
                                                                                                                            - Verified Player Card contains avatar, score,
                                                                                                                            tokens, and turn timer display.\
                                                                                                                            - Marked \*\*GEG-020\*\* complete in CHECKLIST.md.

  guitar-edu-ui_01_18_26_18.zip    18      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Added miss-streak tracking per prompt variant;
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                after \*\*3 consecutive misses\*\* on the same
                                                        yes                       THREAD_HANDOFF.md=no                      prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).\
                                                                                                                            - Marked \*\*GEG-016\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.3 (GEG-020 Player card timer)\
                                                                                                                            - Verified Player Card contains avatar, score,
                                                                                                                            tokens, and turn timer display.\
                                                                                                                            - Marked \*\*GEG-020\*\* complete in CHECKLIST.md.

  guitar-edu-ui_01_18_26_19.zip    19      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Added miss-streak tracking per prompt variant;
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                after \*\*3 consecutive misses\*\* on the same
                                                        yes                       THREAD_HANDOFF.md=no                      prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).\
                                                                                                                            - Marked \*\*GEG-016\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.3 (GEG-020 Player card timer)\
                                                                                                                            - Verified Player Card contains avatar, score,
                                                                                                                            tokens, and turn timer display.\
                                                                                                                            - Marked \*\*GEG-020\*\* complete in CHECKLIST.md.

  guitar-edu-ui_01_18_26_20.zip    20      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## 2026-01-18\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Bonus phase now exists as a distinct, visible
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                phase (BONUS) triggered when a player earns
                                                        yes                       THREAD_HANDOFF.md=no                      connect score or mints tokens.\
                                                                                                                            - Added dev control to force BONUS phase.\
                                                                                                                            - Added bonus banner UI and timer-driven END_BONUS
                                                                                                                            handoff into intermission/next turn.\
                                                                                                                            \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                                                                                            - Added miss-streak tracking per prompt variant;
                                                                                                                            after \*\*3 consecutive misses\*\* on the same
                                                                                                                            prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).

  guitar-edu-ui_01_18_26_21.zip    21      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## 2026-01-18\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Checklist audit pass: verified and marked
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                complete:\
                                                        yes                       THREAD_HANDOFF.md=no                      - Core flow: \*\*GEG-001..004\*\* (Ready→Start
                                                                                                                            gating, intermission, bonus).\
                                                                                                                            - Connect-4 scoring/tokens/steals:
                                                                                                                            \*\*GEG-010..016\*\*.\
                                                                                                                            - Utility basics: \*\*GEG-080..082\*\*.\
                                                                                                                            - Bonus phase now exists as a distinct, visible
                                                                                                                            phase (BONUS) triggered when a player earns
                                                                                                                            connect score or mints tokens.\
                                                                                                                            - Added dev control to force BONUS phase.\
                                                                                                                            - Added bonus banner UI and timer-driven END_BONUS
                                                                                                                            handoff into intermission/next turn.\
                                                                                                                            \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                                                                                            - Added miss-streak tracking per prompt variant;
                                                                                                                            after \*\*3 consecutive misses\*\* on the same
                                                                                                                            prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).

  guitar-edu-ui_01_18_26_22.zip    22      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## 2026-01-18\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Checklist audit pass: verified and marked
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                complete:\
                                                        yes                       THREAD_HANDOFF.md=no                      - Core flow: \*\*GEG-001..004\*\* (Ready→Start
                                                                                                                            gating, intermission, bonus).\
                                                                                                                            - Connect-4 scoring/tokens/steals:
                                                                                                                            \*\*GEG-010..016\*\*.\
                                                                                                                            - Utility basics: \*\*GEG-080..082\*\*.\
                                                                                                                            - Bonus phase now exists as a distinct, visible
                                                                                                                            phase (BONUS) triggered when a player earns
                                                                                                                            connect score or mints tokens.\
                                                                                                                            - Added dev control to force BONUS phase.\
                                                                                                                            - Added bonus banner UI and timer-driven END_BONUS
                                                                                                                            handoff into intermission/next turn.\
                                                                                                                            \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                                                                                            - Added miss-streak tracking per prompt variant;
                                                                                                                            after \*\*3 consecutive misses\*\* on the same
                                                                                                                            prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).

  guitar-edu-ui_01_18_26_23.zip    23      2026-01-18   instruction spine 1/5 •   CHECKLIST.md=yes,                         \# Changelog (project zips)\
                                                        DOCS folder: yes •        CANON_PROGRESS.md=no,                     \## Step 14.8 (GEG-B1 Vulnerability after misses)\
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      - Added miss-streak tracking per prompt variant;
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                after \*\*3 consecutive misses\*\* on the same
                                                        yes                       THREAD_HANDOFF.md=no                      prompt, one owned cell for that prompt becomes
                                                                                                                            \*\*vulnerable\*\*.\
                                                                                                                            - Vulnerable fret cells now \*\*blink\*\* (CSS
                                                                                                                            animation) to reflect canon.\
                                                                                                                            - Added \`steal.vulnerableAfterMisses\` to
                                                                                                                            settings (default: 3).\
                                                                                                                            - Appended CC-0009 and CC-0010 to
                                                                                                                            \`DOCS/conversation_composite.json\`.\
                                                                                                                            \## Step 14.1 (Regression cleanup)\
                                                                                                                            - Replaced fretboard SVG with
                                                                                                                            \`Guitar_FretBoard_Horizontal-Complete_v2i.svg\`
                                                                                                                            content (better aligned hitbox art).\
                                                                                                                            - Restored Note Visibility selector to include
                                                                                                                            \*\*All\*\* and set default to \*\*All\*\*.\
                                                                                                                            - Restored controller defaults for
                                                                                                                            \`core.noteVisibility\` to \*\*all\*\* (was
                                                                                                                            regressed to naturals).\
                                                                                                                            - Fixed minor indentation regression in controller
                                                                                                                            settings change handler.\
                                                                                                                            - Confirmed project zips must not include
                                                                                                                            \`node_modules/\` or \`dist/\`.\
                                                                                                                            \## Step 14.2 (GEG-016 Starting tokens)\
                                                                                                                            - Implemented UI coupling between Token Cap and
                                                                                                                            Starting Tokens so Start is clamped to Cap in real
                                                                                                                            time (Main Menu Settings).\
                                                                                                                            - Marked \*\*GEG-016\*\* complete in
                                                                                                                            CHECKLIST.md.\
                                                                                                                            \## Step 14.3 (GEG-020 Player card timer)\
                                                                                                                            - Verified Player Card contains avatar, score,
                                                                                                                            tokens, and turn timer display.\
                                                                                                                            - Marked \*\*GEG-020\*\* complete in CHECKLIST.md.

  guitar-edu-ui_01_19_26_01.zip    1       2026-01-19   instruction spine 0/5 •   CHECKLIST.md=no,                          
                                                        DOCS folder: no •         CANON_PROGRESS.md=no,                     
                                                        LOCK_IN_TABLES: no •      DECISIONS_LOG.md=no,                      
                                                        conversation_composite:   MATCH_SETTINGS_SPEC.md=no,                
                                                        no                        THREAD_HANDOFF.md=no                      
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Part VIII -- Project Changelog Evidence (Verbatim)

Embedded from DOCS/CHANGELOG.md (01_18_26_22 extract).

\# Changelog (project zips)

\## 2026-01-18

\- Checklist audit pass: verified and marked complete:

\- Core flow: \*\*GEG-001..004\*\* (Ready→Start gating, intermission,
bonus).

\- Connect-4 scoring/tokens/steals: \*\*GEG-010..016\*\*.

\- Utility basics: \*\*GEG-080..082\*\*.

\- Bonus phase now exists as a distinct, visible phase (BONUS) triggered
when a player earns connect score or mints tokens.

\- Added dev control to force BONUS phase.

\- Added bonus banner UI and timer-driven END_BONUS handoff into
intermission/next turn.

\## Step 14.8 (GEG-B1 Vulnerability after misses)

\- Added miss-streak tracking per prompt variant; after \*\*3
consecutive misses\*\* on the same prompt, one owned cell for that
prompt becomes \*\*vulnerable\*\*.

\- Vulnerable fret cells now \*\*blink\*\* (CSS animation) to reflect
canon.

\- Added \`steal.vulnerableAfterMisses\` to settings (default: 3).

\- Appended CC-0009 and CC-0010 to \`DOCS/conversation_composite.json\`.

\## Step 14.1 (Regression cleanup)

\- Replaced fretboard SVG with
\`Guitar_FretBoard_Horizontal-Complete_v2i.svg\` content (better aligned
hitbox art).

\- Restored Note Visibility selector to include \*\*All\*\* and set
default to \*\*All\*\*.

\- Restored controller defaults for \`core.noteVisibility\` to
\*\*all\*\* (was regressed to naturals).

\- Fixed minor indentation regression in controller settings change
handler.

\- Confirmed project zips must not include \`node_modules/\` or
\`dist/\`.

\## Step 14.2 (GEG-016 Starting tokens)

\- Implemented UI coupling between Token Cap and Starting Tokens so
Start is clamped to Cap in real time (Main Menu Settings).

\- Marked \*\*GEG-016\*\* complete in CHECKLIST.md.

\## Step 14.3 (GEG-020 Player card timer)

\- Verified Player Card contains avatar, score, tokens, and turn timer
display.

\- Marked \*\*GEG-020\*\* complete in CHECKLIST.md.

\## Step 14.4 (GEG-022 Active players only)

\- Added a Multiplayer player-count selector to the splash screen
(2--5).

\- Match init now uses the selected player count so the in-match
leaderboard renders only active players.

\- Marked \*\*GEG-022\*\* complete in CHECKLIST.md.

\## Step 14.5 (Multiplayer cap correction)

\- Corrected accidental Multiplayer hard-cap (2--5) by raising the upper
bound to \*\*2--12\*\*.

\- Centralized the Multiplayer upper bound in \`src/app/constants.ts\`
so UI + engine stay in sync.

\- Preserved GEG-022 behavior: leaderboard still renders \*\*active
players only\*\* (no empty slots).

\## Step 14.6 (GEG-023 Persistent high scores)

\- Confirmed the persistent High Score Board is wired to local storage
via \`src/shell/storage.ts\` and is rendered in the Utility area under
\*\*Misc. Information → Leaderboard → High Scores\*\*.

\- Marked \*\*GEG-023\*\* complete in CHECKLIST.md.

\## Step 14.7 (GEG-030/031 Mode selector compliance)

\- Verified Game Mode selector (Modes 1--5) drives surface visibility
per locked spec.

\- Fixed Staff/Tab panel mode-disable styling and input gating by adding
\`staffSection\` class to the Staff+Tab section.

\- Marked \*\*GEG-030\*\* and \*\*GEG-031\*\* complete in CHECKLIST.md.

\## Step 14.8 (Surface controls replace legacy board-selection modes)

\- Removed the legacy surface-selection "mode" concept from canon:
\*\*Mode\*\* is reserved for musical modes only.

\- Added \*\*Surface Controls → In Play\*\* toggles in Core Settings
(Fretboard / Note Rail / Staff / TAB).

\- Surface toggles now gate both \*\*rendering\*\* and \*\*allowed
input\*\* for Staff/TAB/Rail.

\- Notation View remains a display crop only (Staff Only / TAB Only /
Staff+TAB).

\- Updated CHECKLIST Section D: marked GEG-030/031 as deprecated; marked
GEG-032 complete.

\## Step 14.9 (GEG-040 Learning difficulty labels)

\- Confirmed Learning difficulty renders \*\*all note labels\*\* across
the fretboard (including grayed-out range) while keeping hitboxes
interactive (labels are \`pointer-events:none\`).

\- Verified normal play actions remain available in Learning difficulty
(claim/highlight, connect-segments, token awards).

\- Marked \*\*GEG-040\*\* complete in CHECKLIST.md.

\## Step 14.10 (GEG-041 SAM reveal options)

\- Added \*\*SAM Reveal\*\* selector in Core Settings with \`single\`
(best/closest) and \`multiple\` (all correct) options.

\- Wired selector to \`settings.feedback.samRevealMode\` via
\`#core-sam\` (mapped to \`single\` vs \`all\`).

\- Marked \*\*GEG-041\*\* complete in CHECKLIST.md.

\## Step 14.11 (GEG-041 SAM equivalents)

\- Updated SAM options to the flushed-out spec: \*\*Single\*\*,
\*\*Equivalent (same pitch)\*\*, \*\*All\*\*.

\- Removed the deprecated "Multiple" label/value from the Core Settings
selector.

\- Extended the engine SAM pulse to support \`samRevealMode:
\"equiv\"\`, revealing all actionable targets for the same pitch across
allowed spellings.

\## Step 14.12 (GEG-042 Default fret range)

\- Set the default fret range to \*\*min 0, max 12\*\*, with \*\*13
frets visible\*\* by default.

\- Updated controller defaults to respect the checklist defaults when
settings are not yet stored.

\- Marked \*\*GEG-042\*\* complete in CHECKLIST.md.

\## Step 14.13 (Conversation composite added)

\- Added \`DOCS/conversation_composite.json\` as the project-scoped,
minimal canon record (append-only) capturing only
implementation-relevant conversation decisions.

\- Intended to be read/validated before each checklist step to prevent
drift.

\## Step 14.14 (GEG-043 Note visibility modes)

\- Standardized Note Visibility enum values to: \`all\`, \`natural\`,
\`enharmonic\`.

\- Note Rail now reflects note visibility:

\- \`natural\` hides accidentals

\- \`enharmonic\` hides naturals and shows enharmonic spellings for
accidentals

\- \`all\` shows all notes

\- Fretboard label visibility remains driven by \`variants.allowed\`, so
labels follow the same Note Visibility filter.

\- Marked \*\*GEG-043\*\* complete in CHECKLIST.md.

\## Step 14.15 (GEG-044 Extended tone highlighting)

\- Expanded the Highlight Tones system to include \*\*9th / 11th /
13th\*\* (in addition to Root/3/5/7).

\- Implemented the educational highlight overlay on the fretboard:
selected tones are rendered as subtle rings behind ownership dots.

\- Extended Chord Display → Extension options to include \*\*11th\*\*
and \*\*13th\*\* for forward compatibility.

\- Marked \*\*GEG-044\*\* complete in CHECKLIST.md.

\## Step 14.16 (GEG-045 Note display options)

\- Updated Core Settings → Display to the locked, global options:
\*\*Note Names / Numbers / Intervals / Interval Roman\*\*.

\- Implemented the new \`numbers\` display mode (degree-style labels: 1,
♭2, 2, ♭3, 3, 4, ♯4, 5, ♭6, 6, ♭7, 7) across the note rail and prompt
labels.

\- Deprecated legacy \`romanIntervals\` display mode by mapping it to
\`intervalRoman\` for back-compat (no UI exposure).

\- Marked \*\*GEG-045\*\* complete in CHECKLIST.md.

\## Step 14.17 (Roman note display added)

\- Added Core Settings → Display option: \*\*Roman (Scale Degree)\*\*,
distinct from \*\*Interval Roman\*\* (Roman Numeral Interval System).

\- Implemented Roman (scale-degree/function) labels across the Note
Rail, prompt labels, and rail label resolver.

\- Updated \`DOCS/conversation_composite.json\` with the canon decision
for this distinction.

\## Step 14.18 (GEG-050 Staff hover alignment)

\- Improved the Staff hover overlay to visually confirm snapping to
staff \*\*lines/spaces\*\* by adding a precision guide line at the
snapped center.

\- Click placement continues to snap to the same staff line/space grid
(including ledger steps) using the shared hit-grid.

\- Marked \*\*GEG-050\*\* complete in CHECKLIST.md.

\## Step 14.19 (GEG-051 TAB hover alignment)

\- Improved the TAB hover overlay to visually confirm snapping to
\*\*string lines\*\* (string band center) and \*\*measure
subdivisions\*\* (column center).

\- Added precision guides on TAB hover: horizontal guide at snapped
string center and vertical guide at snapped column center.

\- Click placement continues to snap to the same subdivision column
centers used by the shared STAFF+TAB timeline grid.

\- Marked \*\*GEG-051\*\* complete in CHECKLIST.md.

\## Step 14.20 (GEG-052 TAB input order)

\- Confirmed TAB entry supports both input orders:

\- \*\*select string → pick fret\*\* (string pick arms TAB, keypad pick
commits)

\- \*\*pick fret → select string\*\* (keypad pick arms TAB, string pick
commits)

\- Implementation is handled by the paired event handlers
\`gedu:fretPick\` and \`gedu:staffPick\` (TAB region) in
\`src/app/gameController.ts\`.

\- Marked \*\*GEG-052\*\* complete in CHECKLIST.md.

\## Step 14.21 (GEG-052 TAB digit visibility)

\- Adjusted STAFF+TAB overlay z-order so hover indicators never obscure
\*\*TAB fret digits\*\*.

\- Enforced group order: grid (bottom) → hover (middle) → marks (top) in
\`src/shell/staffTabOverlay.ts\`.

\## Step 14.22 (GEG-051a Shared subdivision timeline)

\- Confirmed STAFF + TAB share a single subdivision timeline grid
rendered across both regions.

\- Hover indicates the active subdivision column across both Staff and
TAB using one snapped column center.

\- Click placement on both surfaces uses the same snapped column
mapping.

\- Marked \*\*GEG-051a\*\* complete in CHECKLIST.md.

\## Step 14.23 (GEG-053 Keypad bounds)

\- Enforced strict fret bounds for \`gedu:fretPick\`: accept only
\*\*0--24\*\* and reject \*\*25+\*\* (and negatives) rather than
clamping.

\- Marked \*\*GEG-053\*\* complete in CHECKLIST.md.

\## Step 14.24 (GEG-054 Multiple valid answers)

\- Implemented clean handling for multiple valid answers on the
fretboard.

\- Normal taps now accept any location matching the prompt pitch class,
and for black-key prompts will claim the cell in either the prompt
spelling lane or the opposite enharmonic lane when that lane is
allowed/visible.

\- Steal attempts now prefer the prompt spelling lane but can also
target the opposite enharmonic lane when it is allowed and the cell is
stealable there.

\- Added helper \`promptEquivalentLanes(\...)\` to centralize
lane-equivalence resolution.

\- Marked \*\*GEG-054\*\* complete in CHECKLIST.md.

\## Step 14.25 (GEG-055 Mirroring behavior)

\- Added \*\*Core Settings → Mirroring\*\* selector: \`Placed
(default)\` or \`Off\`.

\- Canon: Learning difficulty forces Mirroring to \`Placed\`.

\- Successful fretboard claims now auto-place corresponding marks onto
the shared STAFF+TAB subdivision grid:

\- TAB mark stores the selected \*\*string + fret\*\*

\- STAFF mark uses a deterministic pitch-class → staff-step mapping
(placeholder until true pitch-octave staff mapping is introduced)

\- Marked \*\*GEG-055\*\* complete in CHECKLIST.md.

\## Step 14.26 (GEG-060 Note Rail compass loop)

\- Implemented the Note Rail as a true compass-style strip:

\- Current note remains centered (index 12) with a \*\*two-octave /
25-cell\*\* window.

\- Added a fixed \*\*center marker\*\* so the \"centered\" target is
visually unambiguous.

\- Added short, semitone-step \*\*slide animation\*\* (shortest delta,
small jumps only) to create the \"endless loop\" illusion when prompts
advance.

\- Marked \*\*GEG-060\*\* complete in CHECKLIST.md.

\## Step 14.27 (GEG-061 Rail mode by context)

\- Canonized rail behavior by prompt context:

\- \*\*Chromatic / Accidentals\*\* use the \*\*rotating compass\*\* rail
(current prompt centered).

\- \*\*Key / Scale / Chord contexts\*\* use the \*\*fixed reference\*\*
rail (anchored to the context root).

\- Implemented the rule in \`updatePromptUi()\` by choosing rail mode
from \`promptProfileId\`.

\- Marked \*\*GEG-061\*\* complete in CHECKLIST.md.

\## Step 14.28 (GEG-062 Rail label overflow containment)

\- Ensured Note Rail labels never overflow their cells:

\- \`railLabel\` is now a full-size, centered flex container with
\`overflow:hidden\` and \`white-space:nowrap\`.

\- Split enharmonic labels (sharp/flat) are slightly reduced in size to
guarantee they fit.

\- The half-block indicator is an absolute overlay so it never
participates in layout or pushes labels.

\- Marked \*\*GEG-062\*\* complete in CHECKLIST.md.

\## Step 14.29 (GEG-063 Rail as input surface)

\- Rail clicks now emit a dedicated \`gedu:railPick\` event in addition
to selection.

\- The controller maps the clicked note\'s pitch-class to the first
enabled in-domain fretboard cell and dispatches a \`TAP_CELL\` attempt.

\- This enables rail-only note guessing when the fretboard
prompt/display is reduced by surface controls.

\- Marked \*\*GEG-063\*\* complete in CHECKLIST.md.

\## Step 14.30 (GEG-064 Rail unified input pipeline)

\- Rail pick input now routes through a single engine action:
\`TAP_VARIANT\`.

\- The engine resolves the picked variant into an actionable in-domain
fretboard placement, applying the same tap rules as direct cell taps.

\- Controller gates rail-pick gameplay by Surface Controls (rail must be
in play; fretboard must be in play for placement resolution).

\- Marked \*\*GEG-064\*\* complete in CHECKLIST.md.

\## Step 14.31 (GEG-070 Interval Roman display format)

\- Verified Interval Roman display formatting matches canon: \`I, ii,
II, iii, III, IV, (tritone), V, vi, VI, vii, VII\`.

\- Confirmed consistent formatting in both the Note Rail label resolver
and the global label resolver.

\- Marked \*\*GEG-070\*\* complete in CHECKLIST.md.

\## Step 14.32 (GEG-071/072 Tritone label options + context resolution)

\- Updated Tritone label preference to expose all canon options:

\- \`+/o\` (default)

\- \`TT\`

\- \`#IV / ♭V\`

\- \`+IV / oV\`

\- \`Auto (context)\`

\- Implemented full tritone rendering support for both Interval Roman
and Roman (Scale Degree) labels.

\- Improved \*\*Auto\*\* resolution to prefer \`#IV\` in Lydian contexts
and \`♭V\` in Locrian contexts, otherwise leaning by key signature (flat
keys prefer \`♭V\`).

\- Added back-compat normalization for legacy stored values (e.g.,
\`sharp4\`, \`flat5\`).

\- Marked \*\*GEG-071\*\* and \*\*GEG-072\*\* complete in CHECKLIST.md.

\## Step 14.33 (Utility Intent Contracts: presentation vs utility, pause
removal, prefs)

\- Removed \*\*Pause\*\* from Operations (Pause is non-canon;
end-of-match and intermission/ready states handle flow).

\- Replaced the legacy Gameplay Mode toggle with a \*\*Learning Type\*\*
tab strip: \*\*Single Note / Intervals / Chords / Scales /
Arpeggios\*\*.

\- Wired as an inline (pane-less) tab group and stored as
\`settings.learningType\` for future intent contracts.

\- Moved/confirmed \*\*Tritone label options\*\* are a \*\*presentation
preference\*\* (not a utility control).

\- Added Preferences:

\- \*\*Notation Pitch\*\* (Written / Concert)

\- \*\*Vulnerable After Misses\*\* (steal prompt visibility threshold)

\- \*\*Reduced Motion\*\* (suppresses vulnerable blink animation)

\- \*\*Education Marker Visibility\*\* moved to Preferences (Staff / TAB
/ Fretboard)

\- Fixed Education clear-button ids to match controller wiring
(\`edu-clear-all/staff/tab/fret\`).

\## Step 14.34 (Utility Menus: Note/Interval/Arp intent palettes +
routing scaffolding)

\- Expanded \*\*Utility\*\* tabs to include \*\*Interval\*\* and
\*\*Arp\*\* (alongside Num/Note/Chord/Scale/Teach).

\- Implemented a \*\*Note Palette\*\* intent selector (pitch +
accidental/spelling) in Utility:

\- Updates the Utility \"Selected\" readout.

\- In \*\*Education Mode\*\*, utility note selection also sets what will
be placed (syncs with the Education selected indicator).

\- Emits \`gedu:utilNoteIntent\` events to formalize the intent contract
for later engine binding.

\- Added \*\*Interval\*\* intent scaffolding (direction + semitone
count) and \`gedu:utilIntervalIntent\` event emission.

\- Added \*\*Arpeggio\*\* intent scaffolding (tone set + direction) with
routing constraints and \`gedu:utilArpIntent\` emission.

\- Added \*\*Scale routing\*\* scaffolding (string skipping /
return-crossing / max string-jump) and \`gedu:utilScaleRoute\` emission.

\## Step 14.35 (Implementation Audit: wire Utility intents + align
controller learningType)

\- Aligned UI controller state to the canonical \*\*Learning Type\*\*
set: \`single / intervals / chords / scales / arpeggios\`.

\- Removed the legacy \`paused\` run state (Pause is non-canon and no
longer represented in controller state).

\- Learning Type selection now stores \`match.learningType\` in settings
for downstream intent contracts.

\- Wired \*\*Utility intent palettes\*\* to real UI behavior:

\- Note Palette updates selection, syncs Education selected note, and
dispatches \`gedu:utilNoteIntent\`.

\- Interval Palette updates selection and dispatches
\`gedu:utilIntervalIntent\`.

\- Arpeggio Palette updates selection and dispatches
\`gedu:utilArpIntent\` including routing constraints.

\- Scale routing controls dispatch \`gedu:utilScaleRoute\`.

\- Preferences: \`pref.reducedMotion\` now toggles \`.reducedMotion\` on
the app shell at runtime.

\## Step 14.36 (Education Mode Structural Upgrade: tools card + note
values)

\- \*\*Education Mode\*\* now replaces the upper-right \*\*Player Score
Card\*\* with an \*\*Education Tools\*\* card.

\- Teaching tools were removed from Utility tabs to keep Utility focused
on \*\*intent controls\*\* (selectors/modifiers) rather than
presentation.

\- Education tools include Input/Eraser, Selected note indicator,
preference shortcuts, and per-surface clear actions.

\- Added \*\*Note Value\*\* selection (Whole / Half / Quarter / 8th /
16th) for Education Mode.

\- Education Staff/TAB input now advances the placement column by the
selected note value on the \*\*16th-note grid\*\* (16 columns per
measure).

\- Cursor is tracked implicitly from the last click column.

\## Step 14.37 (Education Staff/TAB Dual-Mode Scaffolding)

\- Added \*\*Staff/TAB Operational Mode\*\* toggle in Education Tools:
\*\*Notation\*\* vs \*\*Game\*\*.

\- \*\*Notation\*\*: time-aware surface (durations/measures) intended
for future import (MusicXML/Guitar Pro).

\- \*\*Game\*\*: pitch-first behavior aligned with gameplay.

\- Introduced separate overlay state stores for \*\*Game\*\* vs
\*\*Notation\*\* so import/export can target notation without corrupting
gameplay marks.

\- Updated staff/tab pointer handler binding to support hot-swapping the
active overlay state (attach returns a cleanup function).

\- Added \`notation.mode\` to settings for forward compatibility.

\## Step 14.38 (Education NotationScore + MusicXML import/export hooks)

\- Implemented a time-aware \*\*NotationScore\*\* model
(\`src/shell/notationScore.ts\`) aligned to MusicXML concepts:

\- Measures, divisions-per-quarter, per-event durations, pitched notes,
and optional TAB technical (string/fret).

\- Education \*\*Notation\*\* mode now writes placements into
NotationScore (in addition to drawing marks), enabling future
interoperability.

\- Added best-effort \*\*MusicXML import\*\* (primary part, measures,
notes/rests, durations, pitch, and \`technical/string\` +
\`technical/fret\` when present) plus internal JSON import/export hooks:

\- \`window.geduImportMusicXML(xmlText)\`

\- \`window.geduImportInternalScore(jsonText)\`

\- \`window.geduExportInternalScore()\`

\- Added a renderer sync that rehydrates the Staff/TAB overlay maps from
NotationScore when in Notation mode.

\- Pitch-to-staff mapping is a placeholder heuristic (semitone-step
mapping) until the proper treble-clef diatonic mapping is implemented.

\## Step 14.39 (MusicXML Import Contract enforcement: validation + TAB
detection + UI)

\- Added a structured \*\*MusicXML Import Result\*\* contract
(\`ImportResult\`) including status, warnings, and basic import
statistics.

\- Implemented \*\*MusicXML validation + TAB detection\*\* via
\`importMusicXmlWithReport(xmlText)\`:

\- Hard failures for invalid XML, missing \`\<part\>\`, missing
measures, or missing pitch on non-rest notes.

\- Soft warnings for missing \`\<divisions\>\` and missing
\`\<duration\>\` (defaults applied).

\- TAB detection tiers:

\- Preserved when per-note \`technical/string\` + \`technical/fret\`
exists.

\- Warns when TAB clef exists but no per-note technical data is found.

\- Warns when neither TAB clef nor per-note technical data exists.

\- Updated \`window.geduImportMusicXML\` to return an \`ImportResult\`
and display a concise alert summary.

\- Added an \*\*Education Tools → Import/Export\*\* panel:

\- File chooser + Import button

\- Optional MusicXML paste box

\- Copy Internal Score JSON button

\- Status line for quick feedback

\## Step 14.40 (MusicXML Import UX + strictness controls + treble-clef
staff mapping)

\- Added \*\*Import Policy\*\* controls to the Education Import/Export
panel:

\- \*\*Require TAB (string+fret)\*\*: fails import when per-note
technical TAB data is missing.

\- \*\*Strict timing (divisions+durations)\*\*: fails import if
\`\<divisions\>\` is missing or if any note/rest is missing
\`\<duration\>\`.

\- Import panel now includes a structured \*\*Import Summary\*\* card
(stats + warnings list) to support predictable classroom workflows.

\- Implemented correct \*\*treble-clef diatonic staff placement\*\* for
imported pitches:

\- Staff mapping anchors bottom line to \*\*E4\*\* and maps line/space
positions by diatonic steps (ignoring accidentals for placement).

\## Step 14.41 (Build system normalization + reproducible packaging)

\- Normalized npm scripts to use local bin wrappers: \`vite\` and
\`tsc\` (no direct \`node ./node_modules/\...\` paths).

\- Added \`engines.node\` (\>=18) and \`.nvmrc\` (20) for consistent
runtime expectations.

\- Added \`DOCS/BUILD.md\` with the clean install/build protocol.

\- Added \`npm run verify:clean\` (tools/verify_clean_build.cjs) as the
release gate: remove artifacts, run \`npm ci\`, then \`npm run build\`.

\- Removed \`node_modules/\`, \`dist/\`, \`.vite/\`, and TS build info
from the shipped archive (source + lockfile only).

\## Step 14.42 (Utility Tab Canon Compliance + Interval/Arp nesting +
Scale → Arp shortcut)

\- Enforced Utility top-level tabs to exactly: \*\*Num / Note / Chord /
Scale\*\* (canon compliance).

\- Moved \*\*Intervals\*\* into the \*\*Note\*\* pane as a nested
collapsible subpanel (IDs preserved: \`util-int-\*\`).

\- Moved \*\*Arpeggios\*\* into the \*\*Chord\*\* pane as a nested
collapsible subpanel (IDs preserved: \`util-arp-\*\`).

\- Added \*\*Scale → Arpeggio\*\* shortcut button
(\`util-scale-arpShortcut\`) that:

\- switches to the \*\*Chord\*\* tab and

\- opens the \*\*Arpeggios\*\* subpanel (\`util-arp-details\`).

\- Confirmed Utility remains intent-focused (selectors/modifiers),
keeping view/visibility preferences out of Utility.

\## Step 14.43 (MusicXML coverage expansion: chords, ties, voices,
tuplets + TAB/tuning validation)

\- Expanded MusicXML parsing fidelity in \`NotationScore\`:

\- Chords via \`\<chord/\>\` (simultaneous notes share a start time and
do not advance the measure cursor).

\- Basic tie preservation via \`\<tie type=\"start\|stop\"\>\` and
\`\<notations\>\<tied type=\"start\|stop\"\>\`.

\- Voice and staff metadata preservation (\`\<voice\>\`, \`\<staff\>\`).

\- Basic tuplet preservation via \`\<time-modification\>\` (stores
actual vs normal note counts).

\- Cursor now honors \`\<backup\>\` and \`\<forward\>\` to better
support multi-voice files.

\- Added best-effort TAB validation warnings (string/fret validity and
tuning-range checks when tuning is present).

\- Import Summary now includes additional fidelity counters
(\`chordNotes\`, \`tiedNotes\`, \`tupletNotes\`, \`voicedNotes\`).

\- Added \`DOCS/IMPORT_TESTS.md\` with a reusable set of MusicXML import
test cases.

\## Step 14.44 (Notation rendering fidelity pass: chords, ties,
tuplets + voice offsets)

\- Upgraded the Staff/TAB overlay renderer to support \*\*multiple marks
per subdivision column\*\* (chords/polyphony) in Notation Mode.

\- Added minimal \*\*tie arc rendering\*\* and \*\*tuplet number
labels\*\* for imported MusicXML.

\- Added basic \*\*voice-based vertical offsets\*\* (voice 2 rendered
slightly lower) to improve readability in multi-voice scores.

\- Updated Staff/TAB pointer handler + Education placement logic to
match the new mark storage model (arrays per column).

\## Step 14.45 (Notation Cursor + Editing v1)

\- Added an \*\*Education → Cursor\*\* section (readout + left/right +
prev/next measure) to author notation deterministically.

\- Added \*\*Edit Mode\*\* controls:

\- \*\*Overwrite\*\*: replace events at the cursor time.

\- \*\*Insert\*\*: shift later events forward by the selected duration
(voice-scoped) before inserting.

\- Added a \*\*Rest tool\*\* for Notation Mode authoring.

\- Implemented \*\*TAB authority rules\*\* (v1):

\- Editing in TAB writes both pitch and TAB.

\- Editing in STAFF can preserve existing TAB unless \*\*Refinger on
pitch edits\*\* is enabled.

\- Extended the overlay renderer to display a minimal \*\*rest glyph\*\*
and ensured \`syncNotationOverlayFromScore()\` emits rest marks.

\## 2026-01-18 (\_01_18_26_20)

\- GEG-004: Added BONUS phase as a first-class phase (reachable in
normal play when tokens/connect score earned).

\- Added bonus banner overlay and dev force button (Force Bonus).

\- Added bonusMs timer to settings normalization and defaults.

# Part IX -- Menus-First Acceptance Tests (Executable Contract)

These tests are required before progressing to any non-menu work. Each
must pass on the same build.

1\. Archive root contains package.json; project starts with \`npm
install\` then \`npm run dev\`.

2\. Splash is the entry point. Selecting a session opens Start Setup
(does not auto-start match).

3\. System menu is only accessible at main screen. In-match does not
expose system-level settings.

4\. Match Options UI matches MATCH_SETTINGS_SPEC.md and uses current
lexicon (no deprecated terms).

5\. Dev/Test tools are gated behind the canonical unlock behavior. When
disabled, dev toggles disappear and require re-unlock.

6\. Surfaces repaint deterministically on transitions (no blank
staff/tab/fretboard after toggles).

7\. Multiplayer player count and roster reflect splash selection; only
active players render in leaderboard.
