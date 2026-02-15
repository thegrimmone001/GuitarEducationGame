# Decisions Log

A running log of architectural decisions that impact future development.

## 2026-01-10 — Surface Matrix replaces View Layout
- Decision: replace the older “View Layout” idea with a **Surface Input Matrix** that deterministically defines, per UI mode, which surfaces are:
  - required for a valid answer
  - eligible to accept input
  - permitted to show placed marks
- Rationale: reduces ambiguity, prevents regressions, and keeps rules enforceable at the controller level.

## 2026-01-10 — Surface Layers are visual-only
- Decision: add **Surface Layers** toggles as visual filters only.
- Rule: layer toggles never remove a surface; they only hide that surface’s rendered content.
- Rationale: matches the requirement that “not visible” does not mean the section disappears.

## 2026-01-10 — Surface Layer terminology
- Decision: rename the user-facing layer names to **Display / Prompt / Marks** (was View / Asked / Answered).
- Rule: internal preference keys remain `pref.layers.view|asked|answered` for backward compatibility; only labels and documentation change.
- Rationale: the new names are surface-agnostic and describe intent across Rail, Fretboard, Staff, and TAB.

## 2026-01-10 — Staff+TAB are treated as a rendered template
- Decision: treat the Staff+TAB background as a **static rendered template**, not a dynamically constructed SVG surface.
- Rule: overlay geometry (measures/columns, staff core lines, tab bands) must be derivable without assuming the SVG uses exactly 5 staff lines or exposes barline segments.
- Implementation note: normalize STAFF to the **middle 5 lines** (core staff) and derive measure spans from repeated long horizontal segments.
- Rationale: keeps the hit-grid stable today and makes it safe to swap the background to a raster image later without breaking interaction.

## 2026-01-10 — README is the canonical repo entrypoint
- Decision: restore a root **`README.md`** and treat it as the canonical entrypoint for onboarding and thread alignment.
- Rule: when starting work (especially in a new chat thread), follow the **Thread Boot Protocol** defined in `README.md`.
- Rationale: reduces drift across sessions and keeps implementation aligned with the project’s written specification.

## 2026-01-10 — Intermission is a first-class phase overlay
- Decision: represent multiplayer intermission as a dedicated **phase overlay** instead of relying on transient alerts.
- Rule: the overlay is shown only when `phase === INTERMISSION` and `PlayType === MULTI`, and it may be dismissed early via tap/click to start the next turn.
- Rationale: makes the turn break explicit to players on smartboards and prevents “instant next turn” confusion.

## 2026-01-10 — Turn-start effect is required for timer correctness
- Decision: the engine must emit a `TURN_STARTED` effect whenever a new turn begins.
- Rule: timers and per-turn UI reset occur in response to this effect, not implicit state inspection.
- Rationale: prevents regressions where turns advance but countdowns never start.

## 2026-01-12 — Platform Strategy Locked: Web + PWA + Tauri
- Decision: Ship the product from a single web codebase, targeting:
  1) Hosted Web deployment,
  2) Offline-capable PWA,
  3) Desktop distribution via **Tauri**.
- Rationale: Avoids shipping Node to end users, reduces platform-specific divergence, supports app-store grade builds, and enables portable/offline usage without forking the app.
- Testing rule: Prefer E2E tests against **built preview** behavior (e.g., `vite preview`) rather than dev-server-only behavior.
- Reference: `DOCS/PLATFORM_STRATEGY.md`.

## 2026-01-10 — Mode 3 is TAB + Fretboard composite
- Decision: Mode 3 (TAB) requires both a TAB entry and a matching Fretboard position before the engine receives a pitch action.
- Rule: TAB entry alone must never auto-claim the fretboard in Mode 3; composite submission is enforced by the Surface Matrix.
- Rationale: matches real-world tab reading and resolves the “TAB input makes the fretboard answer for you” behavior.

## 2026-01-11 — TAB requires explicit fret selection
- Decision: TAB input must never implicitly place fret `0`.
- Rule: clicking a TAB slot without an explicitly selected fret creates a **pending TAB slot** visual (outline) and waits for a fret pick (including open-string `0`).
- Rationale: prevents accidental “0 then 1” behavior and makes TAB entry deterministic in composite modes.

## 2026-01-16 — Canon Hygiene Protocol v1.0 (anti-drift)
- Completion gate: `CHECKLIST.md` is the only authority for completion status. No other file may declare “DONE/COMPLETE” states.
- Canon sources: only the canon list defined at chat boot may define behavior, UI, logic, or terminology.
- Folder invariants: documentation may exist only in repo root and `/DOCS` (uppercase). A lowercase `/docs` folder is forbidden.
- ID namespace rule: `GEG-###` identifiers are reserved exclusively for `CHECKLIST.md`. Any other tracking (if ever approved) must use a different prefix.
- Packaging invariant (Solution B): zip artifacts are **flat** (no top-level root folder). Required top-level entries include `package.json`, `src/`, and `DOCS/`.
- Snapshot extraction rule: flat zips may be extracted into a same-named folder without creating a redundant nested directory. Prefer extracting into an **empty** folder to avoid file merges.
- Drift gate: any new feature/abstraction/refactor/new doc/folder must be logged to `SUGGESTIONS_LOG.md` and requires explicit approval before action.
- Tripwires: `tools/tripwire_docs_tree.mjs` and `tools/tripwire_zip_structure.mjs` enforce the above rules and must be run in local CI.

- 2026-01-14: Primary surface rendering backend migrates from SVG to Canvas2D. SVG is permitted only as optional overlay assets (inlays, markers, icons) and must never be required for functionality.

## 2026-01-25 — Terminology lock: Persistence replaces Display (anti-confusion)
- Decision: Replace the user-facing term **Display** with **Persistence**.
- Rule: “Visible/visibility” refers only to whether a board is shown on screen; boards are always present. **Persistence** means “correct answers remain after marking.”
- Enforcement: Add `display`, `visible`, and `visibility` to `DOCS/DEPRECATED_TERMS.md` (hard-banned for current scheme) and update all new specs to use **Persistence**.

## 2026-01-25 — Phase B-2 schema lock (Preset Definition Table + JSON schema)
- Decision: Lock Phase B-2 outputs as first-class contracts:
  - Surface Controls schema (Prompt / Mark / Persistence / SAM)
  - MatchOptions master schema (AnswerSet vs AnswerCount; timers; pitch sets; progression hooks)
  - Tonal Assist settings + output contracts
  - Pitch Set schemas (Intervals / Chords / Scales-Modes / Arpeggios)
- Rule: These schemas define UI output shape only; no engine wiring is implied by their presence.

## 2026-01-25 — Tonal Assist access model
- Decision: Tonal Assist is available via three access layers:
  1) Gameplay: Misc Information Panel (primary home)
  2) Advanced Menu: “Analyze Tonality” from the current edited object (Chord Bank / Scale Builder / Progression Builder)
  3) System Menu: global tuning (scope, sensitivity, suggestion limits)
- Rule: Advanced Menu invocation analyzes the **current thing** (the active editor target), not live gameplay.
