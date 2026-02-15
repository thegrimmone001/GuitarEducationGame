# Advanced Match Options – UI Mapping & Dependencies

This document canonically records how **Advanced Match Options** are grouped, ordered, and gated in the UI.
It exists to prevent ambiguity, re-litigation, or drift between design, implementation, and documentation.

This document:
- Introduces **no new systems**
- Changes **no definitions**
- Describes **placement, grouping, and dependency only**

---

## UI Structure

Match configuration is presented as:

- **Basic Match Settings** (always visible)
- **Advanced Match Settings** (collapsed by default)

This document defines the ordering *within Advanced Match Settings* and the dependency rules between groups.

---

## Advanced Panel Order (Top → Bottom)

1. Domain Constraints
2. Musical Interaction (Surface Controls + Pitch Sets)
3. Match Rules (Time / Accuracy / Penalties)
4. Learning Type Details
5. Input Method
6. Randomization (embedded per Learning Type)

This order reflects dependency flow:
**where it occurs → how it is shown → when success/failure occurs → what is tested → how input occurs**

---

## Panel 1 — Domain Constraints (§4.4–§4.6)

Always visible:
- Instrument (including Custom Instrument)
- Tuning (preset + custom)
- String range
- Span
- Notes-per-string
- Position scope (start/end)

Note:
- **Fret range is configured in Basic Match Settings** (to avoid redundancy).

Rules:
- Domain constraints apply globally
- No other panel may override domain constraints
- Structure placement must obey all domain limits

---

## Panel 2 — Musical Interaction (§4.8)

Always visible:
- Per-surface roles:
  - Prompt
  - Mark
  - Persistence
  - SAM

**Active is implicit** (derived from Surface Controls + context) and MUST NOT be exposed as a checkbox.

- Cardinality per surface:
  - Single / Equivalent / Octave (with range) / All
- **Surface Scope** per surface and per role:
  - single / rotating / all / random
- Pitch Sets (adjacent to Surface Controls):
  - Add/remove pitch sets (Key/Scale/Mode)
  - Accidentals are configured **per pitch set**
- Presets A–J
  - Canon table: `DOCS/PRESETS_A-J_DEFINITION_TABLE_v9.md`
  - Machine data: `DOCS/presets_A-J_v9.json`

Rules:
- Surface Controls affect information flow only
- Cardinality never expands valid answer sets
- Presets only modify surface behavior

---

## Panel 3 — Match Rules (§4.7)

Always visible:
- Board topology:
  - Player boards
  - Shared board
- Timing models:
  - Disabled (Timing Off)
  - Per-turn window
  - Time-to-completion
  - Check Clock (AKA: Chess Clock | Time Bank)
- Timing variables:
  - turn length
  - increments
  - penalties
  - runtime cap
  - time add/subtract
  - turn window behavior (fixed / rolling / hard cutoff)
  - multi-answer per turn (on/off)
- Accuracy requirement:
  - Single-domain
  - Multi-domain
- Penalties & accuracy (advanced):
  - Accuracy scope (per answer / per turn)
  - Penalty triggers (toggle list)
  - Penalty effects (toggle list)
- Failure Conditions (toggle list)
- Bonus Phase (Enabled / Disabled + behavior config)

Rules:
- Match Rules never change valid answers
- Accuracy requirement gates confirmation only

---

## Panel 4 — Learning Type Details (§4.2)

Visible learning types:
- Single Notes
- Intervals
- Chords
- Scales
- Arpeggios

Rules:
- Only one Learning Type active at a time
- Selecting a Learning Type enables its parameter group
- Non-applicable controls are disabled (never hidden)

Intervals-only:
- Roman Numeral Interval System (On / Off)

---

## Panel 5 — Input Method (§4.2 Advanced Input Method)

Options:
- Single-Note Input
- Structure Placement (Library-Based)
- Partial Structure Placement

Dependencies:
- Enabled only for: Chords, Scales, Arpeggios
- Disabled for: Single Notes, Intervals

Notes:
- Input Method never changes correctness rules
- Input Method only affects interaction granularity

---

## Panel 6 — Randomization (Embedded)

Location:
- Appears inside the active Learning Type panel

Rules:
- Randomization is opt-in only
- Random selection always respects:
  - Domain constraints
  - Cardinality
  - Surface roles
- No global random toggle exists

---

## Dependency Summary

| Panel | Depends On | Enables |
|------|-----------|---------|
| Learning Type Details | — | Input Method |
| Input Method | Learning Type | Learning Type sub-controls |
| Domain Constraints | — | All other panels |
| Surface Controls | — | Display/Prompt/Mark behavior |
| Match Rules | — | Timing & confirmation |
| Randomization | Learning Type | Selection only |

---

## Canon Lock Statement

This document is authoritative for:
- Advanced Match Options UI structure
- Panel ordering
- Panel dependency rules

No future implementation or documentation may contradict this without an explicit versioned update.

---

## Do Not Reintroduce (Hard Guardrail)

This section explicitly binds this document to the project’s deprecated terminology and patterns list.
Its purpose is to prevent legacy systems, names, or mental models from re-entering implementation,
documentation, or discussion.

### Explicitly Prohibited Concepts

The following MUST NOT be reintroduced in any form:

- Numbered or named **“Modes”** (e.g., Mode 1–5, Combined Mode, Hybrid Mode)
- Any system where:
  - UI layout determines game rules
  - “Mode” implicitly controls surfaces, timing, or learning type
- Treating **Surface Layers** (View / Asked / Answered) as rule logic
- Any logic where:
  - Display implies correctness
  - Prompt implies required input
- Auto-revealing **equivalents** as a difficulty shortcut
- Systems that collapse:
  - Learning Type
  - Input Method
  - Surface Controls
  into a single selector

### Canonical Replacement Model (Reminder)

The ONLY valid model is:

- **Learning Type** — what knowledge is being tested
- **Input Method** — how input is applied
- **Domain Constraints** — where answers may exist
- **Surface Controls** — how information flows
- **Match Rules** — when success/failure occurs

These layers MUST remain independent and composable.

### Enforcement Rule

If a proposal, implementation, or refactor:

- Requires introducing a “mode”
- Cannot be expressed within the existing panels documented here
- Blends two or more canonical layers into one control

Then it is **non-compliant** and must be rejected or reworked.

This rule applies to:
- Code
- UI
- Documentation
- Future design discussions

This section is intentionally repetitive and explicit.
It exists to save time by eliminating re-litigation.

---

## Match Options Ordering (Speed Rule)

Within **Match Options**, ordering is optimized for fast iteration:

1. **Basic Match Settings** (Learning Target, Difficulty, Key, Musical Collection, Accidentals, Fret Range)
2. **Advanced Match Settings** (collapsed)
   - Domain Constraints
   - Surface Controls
   - Match Rules
   - Learning Type Details / Input Method / Randomization

This is a UI-only ordering rule. It does not alter the canonical layer definitions or dependencies.

## Input shortcuts
- Right-click (mouse) opens an Answer Shortcut Menu on eligible answer surfaces (context-gated; unified input pipeline).
