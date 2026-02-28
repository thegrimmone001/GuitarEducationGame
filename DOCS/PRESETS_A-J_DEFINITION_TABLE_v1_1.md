# Presets A–J — Definition Table (v1.1 lock)

Date locked: **2026-01-25**

Purpose: Presets **A–J** are **initialization templates** for **Surface Controls (v1.1)**.

Non-negotiable canon:
- Surface roles are strictly: **Prompt / Mark / Persistence / SAM**.
- Boards are always visible (visibility is not a setting).
- **Persistence** means correct answers remain after marking.
- **Answer Set** defaults to **Single** and **Answer Count** defaults to **1** (these live outside Surface Controls).
- Presets **A–G**: **Note Rail → Boards** (application direction).
- Presets **H–J**: **Boards → Note Rail** (recognition direction).
- No renaming. Descriptions may be clarified but intent must not drift.

Legend:
- **P** = Prompt enabled
- **M** = Mark enabled
- **R** = Persistence enabled
- **S** = SAM enabled

Scope note:
- Presets initialize Surface Controls only; all values remain user-overridable in Advanced.

---

## A–G (Note Rail → Boards)

| Preset | Note Rail | Fretboard | Staff | TAB | Mark Scope | Coordination note |
|---|---|---|---|---|---|---|
| A | P | M+R+S | — | — | single | Mark: independent (single surface) |
| B | P | — | M+R+S | — | single | Mark: independent (single surface) |
| C | P | — | — | M+R+S | single | Mark: independent (single surface) |
| D | P | M+R+S | M+R+S | — | all | Mark: multi-surface simultaneous |
| E | P | M+R+S | — | M+R+S | all | Mark: multi-surface simultaneous |
| F | P | — | M+R+S | M+R+S | all | Mark: multi-surface simultaneous |
| G | P | M+R+S | M+R+S | M+R+S | all | Mark: multi-surface simultaneous |

**Note Rail defaults (A–G):** Mark=off, Persistence=off, SAM=off.

---

## H–J (Boards → Note Rail)

| Preset | Note Rail | Fretboard | Staff | TAB | Mark Scope | Notes |
|---|---|---|---|---|---|---|
| H | M | P+R | — | — | single | **Persistence flip:** Note Rail persistence stays off; board persistence on |
| I | M | — | P+R | — | single | **Persistence flip:** Note Rail persistence stays off; board persistence on |
| J | M | — | — | P+R | single | **Persistence flip:** Note Rail persistence stays off; board persistence on |

**H–J defaults:**
- Note Rail: Mark=on, Persistence=off, SAM=off.
- Prompting board: Prompt=on, Persistence=on, SAM=off (unless user enables).

---

## JSON mapping

Each preset is represented in `DOCS/presets_A-J_v1_1.json` using:
- `glg.surfaceControls.schema.v1.1`
- Coordination values only where needed (D–G mark coordination = `multiSurfaceSimultaneous`).

