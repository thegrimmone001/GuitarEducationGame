# Advanced Match Settings — Menu Layout Lock (v9)

**Status:** CANON-LOCKED

This document locks the **Advanced Match Settings** menu layout (conceptual UI structure only).
No engine logic is specified here.

## Canon terminology

- Use **Persistence** (not Display). The words "display", "visible", and "visibility" are deprecated terms.
- Use **Surface Scope** (not Coordination).
- Use **Pitch Sets** (not Pitch Framework).
- Check Clock is also known as: **Chess Clock** / **Time Bank**.

## Advanced panel sections (Top → Bottom)

### A. Musical Interaction
A1. **Surface Controls** (per surface)
- Surfaces: Fretboard, Staff, TAB, Note Rail
- Roles per surface:
  - Prompt
  - Mark
  - Persistence
  - SAM
- Each role exposes:
  - **Cardinality** submenu
  - **Surface Scope** submenu (Prompt + Mark only)

A2. **Pitch Sets** (adjacent to Surface Controls)
- Add/remove pitch sets (Key/Scale/Mode)
- Accidentals are configured **per pitch set**

### B. Time, Clocks & Turn Flow
- Turn Timer
- Turn Window Behavior: Fixed / Rolling / Hard cutoff
- Multi-answer per turn: on/off
- Game Timer
  - Start gate: **Game Timer does not start until the Intermission GUI is closed**
- Check Clock (AKA Chess Clock / Time Bank): per-player total time, deducted per turn
- Runtime Cap
- Increments
- Time add/subtract
- Time-based penalties

### C. Penalties & Accuracy
- Accuracy requirement: Single-domain / Multi-domain
- Accuracy scope (advanced): Per answer / Per turn
- Penalty triggers (toggle list)
- Penalty effects (toggle list)

### D. Boards
- Board mode: Shared / Individual
- Reset behavior: Per turn / Per round / Per match / Manual

## Cardinality submenu (locked structure)

- Single
- Equivalent
- Octave (requires Octave Range: min/max)
- All


## Presets A–J (v9)
- Canon table: `DOCS/PRESETS_A-J_DEFINITION_TABLE_v9.md`
- Machine data: `DOCS/presets_A-J_v9.json`
- Validation target: `DOCS/match_settings_schema_v9.json`
- Schema-ready preset profiles: `DOCS/preset_profiles_matchSettings_v9.json`
