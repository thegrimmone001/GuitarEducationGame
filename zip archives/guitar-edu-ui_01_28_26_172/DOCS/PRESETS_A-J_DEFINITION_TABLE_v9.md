# Presets A–J — Definition Table (v9 lock)

This document defines Presets **A–J** as **initialization templates** for Surface Controls + Pitch Sets + Timing, aligned to **Advanced Menu v9**.

**Notes**
- Presets initialize Surface Controls only; all values remain user-overridable in Advanced.
- Surface Controls roles are strictly: **Prompt / Mark / Persistence / SAM**.
- Multi-surface behavior uses **Surface Scope**: `single | rotating | all | random`.
- Cardinality uses: `single | equivalent | octave | all`.
- `octave` requires `octaveRange {min,max}`.

---

## Canon intent summary
- **A–G:** Note Rail prompts → boards are marked (application direction)
- **H–J:** Boards prompt → Note Rail is marked (recognition direction)
- **Persistence rule:** **Note Rail** persistence is **off by default**; boards may be on.

---

## Default shared values (unless overridden)

- `cardinality.answerSet = single`
- `cardinality.answerCount = 1`
- `cardinality.octaveRange = {min: 1, max: 5}` (present only when `answerSet=octave`)
- `surfaceScope = single` when only one surface is enabled for that role

---

## Preset Table

Legend:
- **P** = Prompt enabled
- **M** = Mark enabled
- **R** = Persistence enabled
- **S** = SAM enabled

### A–G (Note Rail → Boards)

| Preset | Note Rail | Fretboard | Staff | TAB | Mark Surface Scope | Notes |
|---|---|---|---|---|---|---|
| A | P | M+R+S | — | — | `single` | Note Rail prompts; Fretboard marked |
| B | P | — | M+R+S | — | `single` | Note Rail prompts; Staff marked |
| C | P | — | — | M+R+S | `single` | Note Rail prompts; TAB marked |
| D | P | M+R+S | M+R+S | — | `all` | Fretboard + Staff must both be marked |
| E | P | M+R+S | — | M+R+S | `all` | Fretboard + TAB must both be marked |
| F | P | — | M+R+S | M+R+S | `all` | Staff + TAB must both be marked |
| G | P | M+R+S | M+R+S | M+R+S | `all` | All three boards must be marked |

**Note Rail defaults:** `Persistence=off`, `SAM=off`, `Mark=off`.

### H–J (Boards → Note Rail)

| Preset | Note Rail | Fretboard | Staff | TAB | Mark Surface Scope | Notes |
|---|---|---|---|---|---|---|
| H | M | P+R | — | — | `single` | Fretboard prompts; Note Rail marked; boards persist |
| I | M | — | P+R | — | `single` | Staff prompts; Note Rail marked; boards persist |
| J | M | — | — | P+R | `single` | TAB prompts; Note Rail marked; boards persist |

**H–J Persistence flip:** Note Rail persistence remains off by default; the prompting board has persistence enabled.

---

## Canon-aligned schema mapping (per-preset)

Each preset is represented as a JSON object compatible with the v9 schema (see `ADV_MENU_v9_PRESETS_A-J.json`).

Key points:
- In presets **D–G**, *Mark* uses `surfaceScope=all` to encode simultaneous multi-surface requirement.
- *Prompt* in A–G is Note Rail only (`surfaceScope=single`).
- *Prompt* in H–J is a single board (`surfaceScope=single`).

