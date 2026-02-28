# MATCH_SETTINGS_SPEC.md

## Match & Session Settings
**Canonical Specification**

This document defines all **non-surface** settings that determine:
- **what is being played** (learning type, musical context, learning structures)
- **how correctness is evaluated** (accuracy requirements, equivalence generation)
- **how a session progresses** (timing rules, end conditions, bonus phase)

These settings work **in coordination** with the Surface Control System but do not override it.

Match Settings do **not** define:
- How surfaces render
- Where input occurs
- How feedback is shown

Those responsibilities belong to the Surface Control System (Active / Prompt / Mark / Display / SAM) and presentation preferences.

---

## 1. Scope

Match Settings define:
- What the player is doing (learning type, pitch framework)
- How answers are evaluated (accuracy rules)
- How time is handled
- What is locked once a match begins

All Match Settings are **locked after match start**.

---

## 2. Game Mode

**Type:** Single-select

- Education
- Single Player
- Multiplayer
- Exploration / Free Play

**Locking:** Locked after match start.

---

## 3. Learning Type (Primary Selector)

**Type:** Single-select

- Single Notes
- Intervals
- Chords
- Scales
- Arpeggios

Learning Type determines:
- What constitutes a correct answer
- What learning-structure settings are eligible
- Whether multi-note validation is required

**Locking:** Locked after match start.

---

## 4. Musical Context

### 4.1 Key
Defines the tonal center for contexts that require one.

Notes:
- Key is required for diatonic/modal/degree-based content.
- Key may be ignored by fully chromatic content when the prompt is absolute (note-name or pitch-class driven).

### 4.2 Accidentals Pool
**Type:** Multi-select

- Naturals
- Sharps
- Flats

The accidentals pool constrains:
- What spellings are eligible for prompts (when prompts are spelling-sensitive)
- What spellings are accepted as correct when multiple enharmonic spellings exist

The pool does not override Surface Control cardinality. It only defines which spellings are valid candidates.

### 4.3 Pitch Framework / Collection
Defines the pitch collection space.

Options:
- Chromatic
- Diatonic (Major = Ionian, Minor = Aeolian)
- Pentatonic (Major / Minor)
- Blues
- Modal (Dorian, Phrygian, Lydian, Mixolydian, Locrian)
- Custom / Derived (future)

### 4.4 Roman Numeral Interval System
On / Off

This governs whether interval prompts/labels may be represented using Roman Numeral Interval terminology.
It does not by itself change which surfaces are active or marked.

---

## 5. Instrument & Fretboard Context

### 5.1 Instrument
- Guitar
- Bass
- Ukulele
- Banjo
- Custom (future)

### 5.2 Tuning
- Standard
- Drop
- Open
- Custom

Tuning affects:
- String pitch mapping
- Valid fretboard equivalence sets

### 5.3 Fretboard Controls
- Preset ranges (5 / 12 / 24)
- Custom Min / Max Fret
- String range (start/end)
- String Inclusion / Exclusion
- Span
- Notes-per-string
- Position scope (start/end)

Fretboard controls constrain the domain of valid answers and equivalence sets.

---

## 6. Input Method

Input Method defines **interaction granularity** only.
It never changes correctness rules.

**Type:** Single-select

Options:
- Single-Note Input
- Structure Placement (Library-Based)
- Partial Structure Placement

Dependencies:
- Enabled only for: Chords, Scales, Arpeggios
- Disabled for: Single Notes, Intervals

---

## 7. Learning Structures

Learning Structures are only eligible when compatible with the selected Learning Type.

### 7.1 Interval Settings
- **Absolute vs Relative**
  - Absolute: intervals are named as distances between two pitches (e.g., m3, P5).
  - Relative: intervals are named relative to a reference (key center, scale degree, or current prompt anchor).
- **Simple vs Compound**
  - Simple: reduced within one octave (e.g., 2nd through 8ve).
  - Compound: may extend beyond an octave (e.g., 9th, 10th, 13th).
- **Interval Set selection**
  - Which interval classes are in-scope for prompting and scoring.

### 7.2 Chord Settings
- **Quality pool**
  - Which chord qualities are eligible for prompts (e.g., major, minor, diminished, augmented, seventh qualities).
- **Voicing rules**
  - Which chord tone distributions are permitted (e.g., root-position only, allow inversions, allow omissions, allow doubles).
- **Completion rules**
  - What must be supplied for a chord to be considered correct (e.g., full pitch-class set, required chord tones, or explicit voicing targets).

### 7.3 Scale Settings
- **Linear / Positional / Multi-position**
  - Linear: a defined ordered traversal (often one string or across strings in sequence).
  - Positional: a defined shape/position window.
  - Multi-position: multiple positions are eligible within the current fret range.
- **Completion scope**
  - What counts as “complete” (e.g., one octave, two octaves, full in-range coverage, or degree coverage).

### 7.4 Arpeggio Settings
Arpeggios are treated as a learning structure that can be enabled where applicable.

- **Source**
  - Chord-based (arpeggiate a selected chord quality)
  - Scale-degree-based (arpeggiate a degree within the current key/collection)
- **Traversal direction**
  - Ascending
  - Descending
  - Up/Down (cycle)

---

## 8. Timing Rules

### 8.1 Timing Mode
- Off
- Turn-Based
- Continuous

### 8.2 Player Turn Time
- Seconds per turn (Turn-Based)

### 8.3 Time-to-Completion
- Total elapsed time (Continuous)

### 8.4 Time Modification
- Add time on correct
- Subtract time on miss

### 8.5 Multi-Answer Turn Window
- Single answer per window
- Multiple answers per window

### 8.6 Turn Window Behavior
- Fixed
- Rolling
- Hard cutoff

### 8.7 Time Bank
Optional (when Timing Mode is Turn-Based or Continuous).

AKA: **Check Clock / Chess Clock / Time Bank**.
This behaves like a chess clock (per-player total time), with time deducted per turn when enabled.

Note:
- **Intermission is not a match setting.** Intermission is handled by the Intermission GUI phase.

### 8.9 Increments
Optional. Adds time after correct answers (or other configured triggers).

### 8.10 Penalties
Optional. Subtracts time after misses (or other configured triggers).

### 8.11 Runtime Cap
Optional. Hard maximum session length.

### 8.12 Game Timer Start Gate
When a Game Timer is enabled, it **must not start** until the Intermission GUI is closed.

Equivalence note (terminology alignment):
- Turn-Based ≈ Per-turn window
- Continuous ≈ Time-to-completion

---

## 9. Accuracy Requirement

- Single Domain
- Multi-Domain

Defines how many **Mark-enabled** surfaces must be satisfied for a submission to be counted as correct.

### 9.1 Accuracy Scope (Advanced)
Optional. Defines how accuracy is evaluated over time:
- Per Answer
- Per Turn

### 9.2 Penalty Triggers & Effects (Advanced)
Optional. Exposes penalty configuration without defining scoring math.

Penalty triggers (toggle list; non-exhaustive):
- Incorrect mark
- Timeout
- Incomplete answer set

Penalty effects (toggle list; non-exhaustive):
- Score penalty
- Time penalty
- Turn loss

---

## 10. Failure Conditions

A visible, toggle-based list defining match end conditions.

Initial canonical set (implementation may follow later):
- **Turn timeout ends match** (Turn-Based)
- **Wrong submission ends match**
- **Maximum misses ends match** (configurable count)
- **No-score turns ends match** (configurable count)
- **Time limit reached ends match** (Continuous)

---

## 11. Randomization

Randomization is **opt-in only**.

Rules:
- Random selection always respects:
  - Domain constraints
  - Cardinality
  - Surface roles
- No global random toggle exists

---

## 12. Bonus Phase

Enabled / Disabled (per mode).

If enabled, Bonus Phase must define:
- Activation rule
- Objective
- Scoring/token interaction
- Board behavior (whether claimed areas disappear, persist, or reset)

No bonus behavior is assumed.

---

## 13. Locking Summary

All Match Settings are locked after match start.

**End of Specification**
