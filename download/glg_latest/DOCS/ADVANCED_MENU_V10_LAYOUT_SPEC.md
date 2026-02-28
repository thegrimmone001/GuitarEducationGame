# Advanced Menu — Layout Spec v10 (Conceptual)

Date locked: 2026-01-25

Purpose: define UI layout behavior for the Advanced Match Settings panel without visuals or code.
This spec is additive; it does not change match rules.

## 1) Core constraint
- No scrolling in normal operation.
- Controls must fit by using a responsive dual-column wing and nested submenus.
- Controls should not shift position when toggles change state; use reserved rows and disabled states.

## 2) Placement model
- The Playfield is not part of the menu tree.
- Menus render as overlays on top of the Playfield.
- The Advanced Menu expands as a larger wing than other flyouts when needed.


## 3) Advanced Menu layout grid
- Wing width: responsive; prefer two columns on desktop/tablet, collapse to one column only on narrow screens.
- Column A: Surface Controls (Fretboard, Staff, TAB, Note Rail).
- Column B: Timers + Runtime + Penalties/Accuracy + Pitch Sets + Progressions (as nested groups).

## 4) Surface Controls group (required)
Surface Cards: one card per surface (Fretboard, Staff, TAB, Note Rail).
Each card contains four Role Rows:
- Prompt
- Mark
- Persistence
- SAM

Role Row fields
- Enabled toggle (on/off)
- Scope control (single / rotating / all / random)
- Coordination submenu for Prompt/Mark/Persistence (independent / multi-surface simultaneous / rotate / random).
- SAM has Scope only (no coordination).


## 5) Timer + runtime group (required)
- Turn Timer (per turn countdown; default 10s for multi unless overridden).
- Check Clock (aka Chess Clock / Time Bank): total time per player; each turn consumes from the remaining bank.
- Runtime Cap: total game runtime cap for the match.
- Time adjustments: increments, penalties, add/subtract (mechanics may live outside timers but are configured here).

## 6) Turn behavior group (required)
- Answer attempts per turn: single vs multiple (when multiple is enabled, an on/off gate is sufficient).

## 7) Pitch Sets + Progressions group (required for advanced content)
- Pitch Sets: Interval / Chord / Scale-Mode / Arpeggio (Single Note does not require Pitch Sets by default).
- Progressions: separate menu item from Arpeggios.
- Each editor should expose “Analyze Tonality” (Tonal Assist) for the current edited object.

## 8) Future visual cues (not implemented)
- Prompt and Mark styling (border/color/animation) is a planned system option, not a current advanced menu dependency.


## 6) Turn behavior + penalties/accuracy (required)
- Answer attempts per turn: when enabled, allow multiple answers per turn; otherwise one answer resolves the turn.
- Penalties: hooks for time subtraction and/or scoring penalties (exact penalty menu lives with Rules in later phase).
- Accuracy rules: hooks for how strict correctness is evaluated per learning target (schema-only here).

## 7) Pitch Sets (advanced, required for non-note targets)
- Pitch Sets = robust controls for Intervals / Chords / Scales-Modes / Arpeggios.
- This group should be visually adjacent to Surface Controls (not buried at bottom).
- Single Note: Pitch Sets is usually off; it remains available but is not required.

## 8) Progressions (separate from Arpeggios)
- Progressions are a distinct group with its own builder/library.
- Supports mode-aware degrees, overrides, borrowed chords, and secondary dominants.

## 9) Tonal Assist (access + placement)
- Gameplay home: Misc Information Panel (utility area).
- Advanced Menu: “Analyze Tonality” analyzes the current edited object and can add/replace suggestions.
- System Menu: tuning (sensitivity, scope, suggestion count, mismatch tolerance).

## 10) Visual cues (future work note)
- Prompt/Mark/Persistence visual styling (color, border, animation) is a future settings group. Do not implement yet; track as a TODO.

EOF

## 7) Pitch Sets (advanced; required for chords/scales/intervals/arpeggios)
- Term: Pitch Sets (replaces Pitch Framework).
- Location: adjacent to Surface Controls because these sets define what is being prompted/marked.
- Single Note may ignore Pitch Sets unless expanded later.
- Submenus:
  - Intervals: reference (fixed/relative), direction, compound allowed.
  - Chords: builder/bank/hybrid; byKey/byRoot; strings/span/mutes/skips; inversions; slash chords; extensions; alterations; diatonic lock.
  - Scales/Modes: families including Major, Minor, Modes, Major Blues, Minor Blues; pattern families; strings/span; notes per string; position boxes.
  - Arpeggios: separate from Progressions; direction, order, motion, shape.

  - Chords: constraints include min/max strings, min/max muted, min/max span; slash chords; extensions; alterations; diatonic lock required; builder + bank modes supported.
  - Scales/Modes: major/minor + modes; pentatonic shapes 1-5; pattern families (notes-per-string and position boxes); string/span constraints; chromatic builder option.
  - Arpeggios: order/direction/shape; string/span constraints.

## 8) Progressions (separate from Arpeggios)
- Progressions are their own group (not nested under Arpeggios).
- Must support a custom progression builder.
- Features: mode-aware degrees option; per-step override option; borrowed chords and secondary dominants supported.

## 9) Tonal Assist access points
- Gameplay home: Misc Information Panel.
- Advanced Menu: Analyze the current edited object (chord bank, scale builder, progression builder) and present suggestions.
- System Menu: sensitivity/scope/how many suggestions/mismatch tolerance.

## 10) Visual cue note (future)
- Color and animation for prompt/mark cues are required later as a tunable system setting. Not implemented in this phase; track in SUGGESTIONS_LOG.


## 8) Progressions (separate from arpeggios)
- Progressions are a dedicated menu item (not combined with arpeggios).
- Must support custom progression builder (add/remove/reorder steps).
- Mode-aware degrees optional (flexibility) with Override available to prevent advanced-player frustration.
- Borrowed chords and secondary dominants supported via step-local overrides.

## 9) Tonal Assist integration
- Tonal Assist primary home: Gameplay Misc Information Panel.
- Advanced Menu: Analyze Tonality action should analyze the current edited object (chord bank, scale builder, progression builder), not the live match.
- System Menu: settings for scope, sensitivity, suggestion count, and mismatch tolerance.

## 10) Visual cue note (future)
Prompt/Mark color, border/animation, and player-specific feedback cues are noted as a future design task and are not implemented or required for this phase.
- Tonal Assist analyzes the current thing:
  - In gameplay: it lives in the Misc Information Panel and analyzes the live context as configured.
  - In Advanced Menu: it analyzes the currently edited object (Chord Bank, Scale Builder, Progression Builder).
- System Menu (global): sensitivity, scope, max suggestions, mismatch tolerance, and candidate families/modes.

## 10) Visual cue note (future work)
- Prompt/mark/persistence visual styling (colors, borders, animations) needs a dedicated settings surface later.
  - Not a Phase B-2 requirement; log as future design.
