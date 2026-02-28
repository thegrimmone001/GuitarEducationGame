# GUITAR LEARNING GAME — PROJECT NOTES (Living Document)

## 1) Core vision
This application is a **guitar-focused educational game** that teaches the relationship between:
- **Fretboard**
- **Music Staff**
- **Tablature (TAB)**

The system must be **bidirectional**:
- Staff/TAB → Fretboard
- Fretboard → Staff/TAB

The goal is transferable literacy between representations.

## 2) Game sessions (top-level)
1. **Education Mode (Instructor / Teaching Tool)**
2. **Single-Player Mode (Learning & Practice)**
3. **Multiplayer Mode (Competitive / Social)**

## 3) Education Mode (Instructor)
Education Mode is an **interactive teaching surface** and is not governed by fairness constraints.

Required capabilities:
- **Input Mode**: Place notes/chords/scales/arpeggios on staff, TAB, or fretboard
- **Eraser Mode**: Remove placed items
- **Surface toggles**: Show/Hide markings independently on:
  - Staff
  - TAB
  - Fretboard
- **Clear** functions:
  - Clear staff
  - Clear TAB
  - Clear fretboard
  - Clear all

Instructor placement workflows (must support multiple directions):
- Choose a **note** and place it on staff / TAB / fretboard
- Choose a **chord** and place it on staff / TAB / fretboard
- Choose a **scale** and place it on staff / TAB / fretboard
- Choose an **arpeggio** and place it on staff / TAB / fretboard

Library-driven building (Education Mode):
- Selecting a root + quality shows a **live preview** of chord/scale tones
- Optional “placement GUI” can allow choosing:
  - shape
  - position
  - inversion/voicing

## 4) Single-Player Mode
Single-player is learning oriented.
- Tokens may be used for **buying time** (if enabled)
- No competitive stealing
- Bonus logic (if any) must be **explicitly defined** and must not be assumed

## 5) Multiplayer Mode
Multiplayer is competitive and turn-based.
Core concepts:
- Finding notes reveals them
- When a structure/pattern reaches its unlock condition (explicitly defined per mode), its notes may become **stealable**

Tokens in multiplayer are used for:
- **Stealing notes** (as defined by the mode rules)
- **Buying time** (if enabled)

No hidden mechanics.

## 6) Tokens
- Players start with **0 tokens by default**
- Starting tokens are configurable in main menu settings
- Tokens are not auto-earned via invented mechanics (e.g., no streak-to-token rule unless explicitly defined)

Token usage is restricted to:
- Buy time
- Steal notes (multiplayer)

## 7) Bonus / special phases
- There is **NO** automatic bonus for “finding all notes” unless explicitly defined
- Completion/unlock behavior is tied to the multiplayer stealing mechanic, not an assumed bonus
- If/when a Bonus Phase exists, it must have:
  - A defined activation rule per mode
  - A defined objective
  - A defined scoring / token interaction rule

## 8) Board states
At minimum:
- **Normal board state**: active gameplay / discovery
- **Bonus or Special board state**: distinct visuals, read-only evidence view unless rules say otherwise

Board states must share the same underlying musical truth.

## 9) Representation rules
### TAB
- TAB must render **string + fret numbers** (no dots)
- Placement must snap to string lines

### Staff
- Staff placement must align to staff positions (lines/spaces + ledger when implemented)
- Ultimately must include clef placement, key signatures, time signatures, and rhythmic alignment

### Multiple correct answers
- A staff pitch can map to multiple fretboard/TAB positions
- The engine must support multiple valid answers

### Shapes
- A physical shape/pattern is treated as a distinct object
- A shape may be reused in a different position for a different identity (e.g., transposed)
- Some advanced chords may have multiple valid names; naming variations may award bonus points only when explicitly enabled

## 4) Game Menu (Start of session; locked after match start)

Purpose: Defines what is being played and how the match functions.

### 4.1 Game Mode
- Education
- Single Player
- Multiplayer
- Exploration / Free Play

### 4.2 Learning Type (Primary Selector)
- Single Notes
- Intervals
- Chords
- Scales

Learning Type determines what sub-options are eligible below.

### 4.3 Musical Context
- **Key** (C, G, D, A, E, etc.)
- **Accidentals Pool** (toggles):
  - Naturals
  - Sharps
  - Flats
- **Pitch Framework / Collection** (when applicable):
  - Chromatic
  - Diatonic (Major = Ionian, Minor = Aeolian)
  - Pentatonic (Major / Minor)
  - Blues
  - Modal (Dorian, Phrygian, Lydian, Mixolydian, Locrian)
  - Custom / Derived (future)
- **Roman Numeral Interval System**: On / Off

### 4.4 Instrument
- Guitar
- Bass
- Ukulele
- Banjo
- Custom (future)

### 4.5 Tuning
- Standard
- Drop Tunings
- Open Tunings
- Custom Tuning

### 4.6 Fretboard Controls
- **Fret Range Presets** (5 / 12 / 24)
- **Custom Min / Max Fret**
- **String Inclusion / Exclusion** (advanced)
  - Note: future instruments may require variable string-count + custom tuning; this is parked until the fretboard renderer supports non-SVG layouts.

### 4.7 Match Rules
- **Turn-Based / Continuous**
- **Timer On / Off**
- **Timer Type**:
  - Countdown
  - Time-to-Completion
- **Accuracy Requirement**:
  - Single Domain
  - Multi-Domain (Staff + Tab + Fretboard)
- **Failure Conditions** (visible; no options until defined)
- **Bonus Phase Enabled** (per mode)

All items in this Game Menu are selected at session start and are locked after match start.

### 4.8 Surface Control System (Active / Display / Prompt / Mark / SAM)
These controls replace “asked / answered / view”.

**Definitions**
- **Active**: whether the surface is shown at all.
- **Prompt**: where the challenge is presented (what must be answered).
- **Mark**: where the player must provide input.
- **Display**: show and *keep* correct answers after a correct response (persistent record).
- **SAM** (Show After Miss): temporarily show the correct answer after an incorrect response (does not persist).

**Mode values** (for Prompt / Mark / Display / SAM where applicable)
- Off
- Single
- Equivalents (same pitch across valid positions)
- All

**Mirroring rule (no spoilers)**
- Surfaces that are **Active + Display** but **not Mark** may mirror confirmed correct answers from the Mark surface.
- “Equivalents” is preferred when the goal is “find all of X without giving it away.”

**Presets (A–J)**
- **A**: Fretboard = Mark + Display. Note Rail = Prompt
- **B**: Staff = Mark + Display. Note Rail = Prompt
- **C**: Tab = Mark + Display. Note Rail = Prompt
- **D**: Note Rail = Mark. Fretboard = Prompt
- **E**: Note Rail = Mark. Staff = Prompt
- **F**: Note Rail = Mark. Tab = Prompt
- **G**: Fretboard + Staff = Mark + Display. Note Rail = Prompt
- **H**: Fretboard + Tab = Mark + Display. Note Rail = Prompt
- **I**: Fretboard + Staff + Tab = Mark + Display. Note Rail = Prompt
- **J**: Note Rail = Prompt. Fretboard + Staff + Tab = Display

**Example (no spoilers)**
“Find all C notes on the fretboard, don’t give them away”
- Fretboard: Active = ON; Prompt = Off; Mark = Equivalents; Display = Equivalents; SAM = Optional (Equivalents)
- Result: player sees the challenge, inputs as many positions as they can find, only discovered positions appear.

## 5) Presentation preferences (in-game)
- This is distinct from System menu preferences.
- Visible in UI, but no options are defined yet (parked for future definition).

## 10) Libraries
Planned libraries:
- Chord Library
- Scale Library
- Arpeggio Library

Expected behavior:
- Selecting a root highlights related notes
- Selecting a quality/type refines the tone set
- Optional placement GUI chooses shape/position/inversion

## 11) Metadata & analytics (future)
Planned collection:
- “Found first / found last” locations
- Common misses
- Difficulty heatmaps (fretboard/staff/TAB)
- Instructor insights and adaptive learning (future)

## 12) Longer-term ideas (not implemented)
- Guitar Pro file import for song lessons
- Microphone input / pitch detection
- MIDI playback with high-quality guitar sound fonts
- Optional piano keyboard / piano roll UI
- Cosmetic customization:
  - menu themes (wood/stone/metal)
  - fretboard wood + inlays

## 13) Guardrails
- This document is a **source of truth**.
- New mechanics must be **proposed and approved** before implementation.
- Avoid inventing scoring, triggers, or defaults that were not defined.
