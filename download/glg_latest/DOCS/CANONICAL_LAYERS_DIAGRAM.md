# Canonical Layers Diagram (Authoritative)

This document provides a **single-page visual model in text form** of the Guitar‑Edu‑UI
canonical layer system. It exists to orient contributors quickly and prevent layer collapse.

No prose explanations, no alternatives, no extensions.

---

## Canonical Layer Stack (Top → Bottom)

┌─────────────────────────────────────────────┐
│               Learning Type                 │
│  (Single Notes / Intervals / Chords /       │
│   Scales / Arpeggios)                        │
│  → Defines *what knowledge is tested*       │
└─────────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────────┐
│                Input Method                 │
│  (Single‑Note / Structure / Partial)        │
│  → Defines *how input is applied*           │
└─────────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────────┐
│              Domain Constraints             │
│  (Instrument / Tuning / Strings / Frets /  │
│   Span / Position Scope)                    │
│  → Defines *where answers may exist*        │
└─────────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────────┐
│              Surface Controls               │
│  (Active / Prompt / Mark / Display / SAM    │
│   + Cardinality)                            │
│  → Defines *how information flows*          │
└─────────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────────┐
│                Match Rules                  │
│  (Timing / Turns / Boards / Accuracy)       │
│  → Defines *when success or failure occurs*│
└─────────────────────────────────────────────┘

---

## Hard Rules

- Layers are **strictly one‑directional**
- No layer may:
  - override a layer above it
  - collapse into another layer
- Any proposal requiring a new “mode” or merged control is invalid

---

## Binding References

This diagram is canonically bound to:
- `DOCS/DEPRECATED_TERMS.md`
- `DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md`
- `DOCS/START_SCREEN_UI_MAPPING.md`
- `DOCS/HOW_TO_PROPOSE_CHANGES.md`

If a change cannot be expressed within this diagram, it is non‑compliant.

---

## Status

This diagram is **frozen**.
Updates require a versioned archive change and explicit rationale.
