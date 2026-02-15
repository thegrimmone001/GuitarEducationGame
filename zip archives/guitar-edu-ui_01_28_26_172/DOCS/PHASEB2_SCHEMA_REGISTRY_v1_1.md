# Phase B-2 — Schema Registry v1.1 (Canon Lock)

Date locked: **2026-01-25**

Scope: UI-output contracts only (no engine wiring implied).

## Canon-locked terminology
- **Persistence**: correct answers remain after marking.
- Boards are always visible (visibility ≠ persistence).
- Deprecated terms: `display`, `visible`, `visibility`.

## Schema IDs (v1.1)

### Required
- `glg.matchOptions.schema.v1.1` — MatchOptions master (references Surface Controls, Answer Rules, Timers, Pitch Sets, Progressions, Tonal Assist ref).
- `glg.surfaceControls.schema.v1.1` — Surface Controls contract (Prompt / Mark / Persistence / SAM).
- `glg.timers.schema.v1.1` — Timers/clocks UI contract (Turn Timer, Check Clock/Chess Clock/Time Bank, Runtime Cap, Attempts per Turn, increments/penalties/add-subtract).
- `glg.tonalAssist.settings.schema.v1.1` — System settings for Tonal Assist (scope, sensitivity, suggestion limits).

### Optional (enabled per match / libraries)
- `glg.progression.schema.v1.1` — Progression builder/library contract (mode-aware degrees + overrides).
- `glg.pitchSet.interval.schema.v1.1` — Interval pitch sets (fixed/relative + compound allowed).
- `glg.pitchSet.chord.schema.v1.1` — Chord pitch sets (builder/bank/hybrid + byKey/byRoot).
- `glg.pitchSet.scaleMode.schema.v1.1` — Scale/Mode pitch sets (includes Major, Minor, Modes, Minor Blues, Major Blues; pentatonic boxes 1–5 via Position/Box).
- `glg.pitchSet.arpeggio.schema.v1.1` — Arpeggio pitch sets (order/motion).
- `glg.tonalAssist.output.schema.v1.1` — Suggestion payload (why + add/replace actions).
