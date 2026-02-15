# Guitar-Edu-UI — Menu Layout & Design Specification (Canonical)

## Scope
This document defines the **menu layout, structure, and prioritization** for Guitar-Edu-UI.
It documents *layout and grouping only*. No gameplay logic is defined here.

This file is authoritative for:
- Menu structure
- Menu grouping (Basic vs Advanced)
- Visibility rules
- Ordering and hierarchy

---

## Global Menu Flow (Start Screen)

Central menu → slides left as selections are made, next menu appears to the right.

### Primary Start Menu
- Single Player
- Multiplayer
- Educational
- Options
- Help
- Exit

### Behaviors
- **Educational**
  - Enters UI immediately
  - No Match Options
- **Single Player**
  - Free Play → enters UI immediately
  - Challenge → opens Match Options
- **Multiplayer**
  - Add Players → then Match Options
- **Options**
  - System / Preferences only
- **Help**
  - FAQ / reference pages

---

## Match Options — Top-Level Structure

Match Options are split into **Basic** and **Advanced** sections.

```
MATCH OPTIONS
├─ Basic Match Settings      (always visible)
└─ Advanced Match Settings   (collapsed)
```

---

## Basic Match Settings (Locked After Start)

These define **what is being tested**.
They must be set before starting a match and cannot change mid-match.

### Basic Match Settings
- Key
- Pitch Framework
- Accidentals
- Fret Min
- Fret Max
- Difficulty

### Pitch Framework (Checkboxes)
- Chromatic
- Ionian
- Dorian
- Phrygian
- Lydian
- Mixolydian
- Aeolian
- Locrian
- Pentatonic
- Blues

### Difficulty
- Easy
- Medium
- Hard

### Rules
- Always visible
- Locked after match start
- Required for Challenge & Multiplayer
- Bypassed for Educational & Free Play

---

## Advanced Match Settings (Accordion)

Collapsed by default. Modifies **how** the match behaves.

### Order of Sections

1. Instrument
2. Learning Target Constraints
3. Presets (A–J)
4. Input Method
5. Surface Controls
6. Timers & Rules
7. Player / Board Options

---

## Instrument
- Instrument type
- Tuning
- Strings (checkboxes: 6–1)
- Span

---

## Learning Target Constraints (Contextual)

Appears only for relevant learning targets.

### Interval Context
- Type: Absolute / Relative
- Interval Pool:
  m2, M2, m3, M3, P4, TT, P5, m6, M6, m7, M7, 8, 9, 11, 13

### Chord Context
- Qualities:
  Maj, Min, Dim, Aug, Sus2, Sus4, Half-diminished
- Extensions:
  ♭5, 6, ♭7, 7, maj7, 9, 11, 13
- Inversions:
  Root, 1st, 2nd, 3rd, 4th
- Voicing Options:
  Slash chords

---

## Presets (A–J)
- Surface configuration shortcuts
- Do not alter Basic Match Settings

---

## Input Method
- Single-note input
- Shape placement
- Pattern placement

Contextual enabling based on learning target.

---

## Surface Controls

Surface activity is **implicit**.
If no controls are checked, the surface is inactive.

### Per Surface (Fretboard / Staff / TAB / Note Rail)
- Prompt
- Mark
- Display
- SAM

### Cardinality
- Off
- Single
- Equivalents
- All

---

## Timers & Rules
- Timer Model:
  Off / Turn Window / Time Bank
- Time per turn
- Add time on correct
- Total time bank
- Runtime cap

---

## Player / Board Options
- Shared Board
- Player Boards

---

## Preferences (Not Match Options)

Preferences affect presentation only and never define match rules.

Examples:
- Visual aids
- Notation style
- Highlighting options

---

## Design Principles (Non-Negotiable)
- Checkboxes over dropdowns where multiple options apply
- Basic = WHAT is tested
- Advanced = HOW it is tested
- No legacy Mode systems
- Surface "Active" is implicit
- Menus scale from simple to complex without hiding critical context

---

## Change Control
Any modification to menu structure must reference:
- This document
- DEPRECATED_TERMS.md
- Match Settings Spec

Unreferenced changes are invalid.
