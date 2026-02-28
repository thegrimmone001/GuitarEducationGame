# Start Screen UI Mapping (Frozen)

This document defines the **Start Screen UI** and is frozen by design.
It exists to ensure fast, repeatable setup without exposing advanced or expert-only controls.

---


## Terminology alignment

- "Start Screen", "Start Menu", and "Main Menu" refer to the same **initialization area** where match settings are chosen before a match is engaged.
- The current implementation presents this as a **Launch Menu** that expands into columns (e.g., Match Options appears as a column).

## Guardrails (Do Not Reintroduce)

The Start Screen MUST NOT:
- Reintroduce numbered or named “modes”
- Collapse Learning Type, Input Method, or Surface Controls into a single selector
- Expose Advanced Match Options parameters
- Auto-reveal equivalents or shortcuts

Any change that appears to require these behaviors must instead be routed
through **Advanced Match Options**.

This document is explicitly bound to:
- `DOCS/DEPRECATED_TERMS.md`
- `DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md`

---

## Initialization Panels (Frozen)

1) Game Mode
2) Learning Type (Primary Selector)
3) Musical Context (Key / Collection / Accidentals shortcut)
4) Domain Core (Instrument preset / Tuning preset / Fret range preset)
5) Surface Preset (A–J)
6) Timer Quick Toggle

No additional panels may be added without a versioned update.


**UI mapping note:** These panels may be presented as a single screen or as multiple columns, but the information groups and their relative priority must remain the same.

---

## Match Options Ordering (Reference)

When Match Options are entered from the Start Screen flow, the configuration UI must present:

1. Domain Constraints
2. Surface Preset (A–J)
3. Remaining options

This ordering is intentional to speed up match iteration and should not be changed without a versioned update.

## Input shortcuts
- Right-click (mouse) opens an Answer Shortcut Menu on eligible answer surfaces (context-gated; unified input pipeline).
