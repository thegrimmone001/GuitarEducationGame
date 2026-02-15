# MATCH_SETTINGS_SPEC.md

## Match & Session Settings  
**Canonical Specification**

This document defines all **non-surface** settings that determine *what is being played*, *how correctness is evaluated*, and *how a session progresses*.  
These settings work **in coordination** with the Surface Control System but do not override it.

---

## 1. Scope

Match Settings define:

- What the player is doing (learning type, pitch framework)
- How answers are evaluated (accuracy rules)
- How time and failure are handled
- What settings are locked once a match begins

Match Settings do **not** define:
- How surfaces render
- Where input occurs
- How feedback is shown

Those responsibilities belong to `SURFACE_SPEC.md`.

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

Learning Type determines:
- What constitutes a correct answer
- How equivalence sets are generated
- Whether multi-note validation is required

Locked after match start.

---

## 4. Musical Context

### 4.1 Key
Defines tonal center.

---

### 4.2 Accidentals Pool
Multi-select:
- Naturals
- Sharps
- Flats

---

### 4.3 Pitch Framework / Collection

Defines the pitch collection space.

**Options:**
- Chromatic
- Diatonic (Major = Ionian, Minor = Aeolian)
- Pentatonic (Major / Minor)
- Blues
- Modal (Dorian, Phrygian, Lydian, Mixolydian, Locrian)
- Custom / Derived (future)

---

### 4.4 Roman Numeral Interval System
On / Off

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

### 5.3 Fretboard Controls
- Preset ranges (5 / 12 / 24)
- Custom Min / Max Fret
- String Inclusion / Exclusion

---

## 6. Learning Structures

### 6.1 Interval Settings
- Absolute vs Relative
- Simple vs Compound
- Interval Set selection

### 6.2 Chord Settings
- Quality pool
- Voicing rules
- Completion rules

### 6.3 Scale Settings
- Linear / Positional / Multi-position
- Completion scope

### 6.4 Arpeggio Settings
- Source (chord / scale degree)
- Traversal direction

---

## 7. Timing Rules

### 7.1 Timing Mode
- Off
- Turn-Based
- Continuous

### 7.2 Player Turn Time
- Seconds per turn

### 7.3 Time-to-Completion
- Total elapsed time

### 7.4 Time Modification
- Add time on correct
- Subtract time on miss

### 7.5 Multi-Answer Turn Window
- Single answer
- Multiple answers per window

### 7.6 Turn Window Behavior
- Fixed
- Rolling
- Hard cutoff

---

## 8. Accuracy Requirement

- Single Domain
- Multi-Domain

Defines how many Mark-enabled surfaces must be satisfied.

---

## 9. Failure Conditions

Future-extensible toggle list defining loss conditions.

---

## 10. Bonus Phase

Enabled / Disabled (per mode).

---

## 11. Locking Summary

All Match Settings are locked after match start.

---

**End of Specification**
