# DOCS/DEPRECATED_TERMS.md

This file exists to prevent regressions and repeated clarification.
It lists **terms, UI concepts, and implementation artifacts** that are **hard-banned** and must not be reintroduced.

Authoritative references:
- `PROJECT_NOTES.md` → §4 Game Menu (Start of session; locked after match start)
- `PROJECT_NOTES.md` → §4.8 Surface Control System
- `MATCH_SETTINGS_SPEC.md` → canonical match settings (non-surface)

---

## Machine-readable hard-banned term list

Only the bullet items inside this section are used by automated checks.

<!-- DEPRECATED_TERMS:BEGIN -->
- combined configuration
- combined mode
- display
- visible
- visibility
- pitch framework
- surface layers
- asked / answered / view
<!-- DEPRECATED_TERMS:END -->

---

## Hard-banned terminology

### 1) Gameplay “configuration modes” (legacy numbered system)
**Status:** HARD-BANNED.

The project no longer defines session behavior using a numbered configuration system (historically referred to as “1–5”).
Session behavior is defined by:
- **Match Settings** (what is being tested)
- **Surface Controls** (Prompt / Mark / Persistence / SAM + cardinality)
- **Presentation Preferences** (visual only)

**MUST NOT reintroduce:** any UI, logic, or documentation that relies on a numbered configuration selector as the primary behavior controller.

**Legacy identifiers (may exist in code for backward compatibility):**
- Internal fields such as `core.gameMode` and values like `m1…m5`
- Treat these as implementation leftovers, not canon.

### 2) “Combined configuration”
**Status:** HARD-BANNED.

Any use of “combined” to mean “multiple tasks/surfaces enabled” is obsolete.
Use Surface Controls and cardinality instead.

### 3) “Asked / Answered / View” as rule controls
**Status:** HARD-BANNED as gameplay rule controls.

These terms were used historically to describe visibility layers. They MUST NOT be used to define match logic or correctness.
The canonical rule system is **Surface Controls**:
- Prompt
- Mark
- Persistence
- SAM

If “asked/answered/view” appears anywhere, it must be treated as **legacy visual-only labeling** and scheduled for removal (do not expand its usage).

---

## Hard-banned UI concepts

### 4) Surface Layers ≠ Surface Control System
**Status:** HARD-BANNED as a substitute.

The archive contains a “Surface Layers” idea (often represented as View / Asked / Answered checkboxes).
Those are visual-only filters and MUST NOT be treated as the rule system.

The canonical rule system is **Surface Controls** with cardinality:
- Role enabled/disabled (Prompt / Mark / Persistence / SAM)
- Cardinality (Single / Equivalent / Octave / All)

---

## Hard-banned behaviors

### 5) Spoiler behavior: “Equivalents are given away”
**Status:** HARD-BANNED by default.

Equivalents must not be revealed automatically unless explicitly enabled by Surface Controls (cardinality) and/or SAM rules.

### 6) Reintroducing undocumented mechanics
**Status:** HARD-BANNED.

No mechanics may be inferred from prior prototypes or memory.
If a behavior is not documented in the canon files, it is not allowed.

---

## Migration note (for maintainers)

When encountering legacy identifiers or wording that imply banned concepts:
- Do not delete blindly.
- Prefer isolating and routing behavior through Match Settings + Surface Controls.
- Update this file when a legacy artifact is fully removed.

---

## Cross‑Reference: Advanced Match Options UI Mapping

This deprecated-terms list is explicitly bound to:
- `DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md`

That document defines the current canonical replacement model for the patterns listed here.
