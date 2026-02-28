# LOCK-IN TABLES (Canonical)

These tables define deterministic behavior for implementation and testing.
If a behavior is not documented here or in the authoritative match/spec files, it does not exist unless explicitly added.

---

## 1) Display Modes: priority and stacking

### 1.1 Effective display modes (single-select)
`NoteDisplayMode ∈ { NOTE_NAMES, NUMBERS, INTERVALS, INTERVAL_ROMAN }`

- There is **no** generic “Roman” display mode.
- `INTERVAL_ROMAN` is the **Roman Numeral Interval System** (as defined elsewhere in canon). Do not reinterpret it here.

### 1.2 Precedence (only if multiple toggles exist internally)
1. `INTERVAL_ROMAN`
2. `INTERVALS`
3. `NUMBERS`
4. `NOTE_NAMES` (default)

### 1.3 Output format lock-in
| Display mode | What it shows |
|---|---|
| NOTE_NAMES | Note names (subject to Note Visibility rules) |
| NUMBERS | Chromatic numbering system (project-defined) |
| INTERVALS | Standard interval notation (project-defined set) |
| INTERVAL_ROMAN | Roman Numeral Interval System (project-defined) |

---

## 2) Difficulty Matrix (Free Play / Easy / Medium / Hard)

### 2.1 Difficulty states
`Difficulty ∈ { FREE_PLAY, EASY, MEDIUM, HARD }`

- “Learning” difficulty does not exist. Free Play replaces it.

### 2.2 Deterministic rules table
| Axis | FREE_PLAY | EASY | MEDIUM | HARD |
|---|---|---|---|---|
| Scoring | Off by default | On | On | On |
| Failure Conditions | Off by default | Minimal | Standard | Strict |
| Timer | Off by default | Optional | On (default) | On (default) |
| Prompt strictness | User-driven | Lenient | Normal | Strict |
| Enharmonic acceptance | Accept both (unless strict enabled) | Accept both | Contextual | Contextual + strict |
| Hinting | Max | High | Low | Off |
| Multi-answer prompts | Allowed | Rare | Common | Common + strict |

Lock: Free Play never blocks input due to “wrong answer” unless the user explicitly enables failure/timer rules.

---

## 3) SAM (Single Answer Mode): strict acceptance + visibility

### 3.1 SAM states
`SAM ∈ { SINGLE, MULTI }`

### 3.2 Default SAM by Learning Target
| Learning Target | Default SAM | Completion in SINGLE | Completion in MULTI |
|---|---|---|---|
| Single Note | SINGLE | One correct submission event | All valid positions within constraints |
| Intervals | SINGLE | One correct interval event | All valid interval events within constraints |
| Chords | MULTI | One full chord spelling (required tones once) | All required tones across all valid positions within constraints |
| Scales | MULTI | One full scale spelling (required degrees once) | All required degrees across all valid positions within constraints |
| Arpeggios | MULTI | One full arpeggio spelling (required degrees once) | All required degrees across all valid positions within constraints |

### 3.3 Visibility/feedback by Difficulty
| Difficulty | Show “remaining answers”? | Show “remaining count”? | Show alternate spellings hint? |
|---|---:|---:|---:|
| FREE_PLAY | Yes | Yes | Yes |
| EASY | Yes | Yes | Yes |
| MEDIUM | Minimal | Yes | Optional |
| HARD | No | No | No |

---

## 4) Note Rail Interactivity (Reference / Input / Inspection)

### 4.1 Rail modes
`RailMode ∈ { REFERENCE, INPUT, INSPECTION }`

### 4.2 Rail behavior table
| RailMode | Click | Hover | Purpose |
|---|---|---|---|
| REFERENCE | No submission | Optional highlight-only | Anchor/context visualization |
| INPUT | Submits via unified input pipeline | Hover previews | Answer surface |
| INSPECTION | No submission | Hover probes related positions | Diagnostic/teaching tool |

### 4.3 Lock to surface roles (Prompt / Mark / Persistence)
| If Rail is… | Allowed RailMode |
|---|---|
| Prompt surface | REFERENCE or INPUT |
| Mark surface | INPUT (optional INSPECTION overlay) |
| Persistence-only surface | REFERENCE |

---

## 5) Segment Definition (unique segment) + token awarding

### 5.1 Segment (formal)
A **Segment** is a new contiguous run of claimed cells meeting minimum length.

`Segment = (Owner, Direction, OrderedCellSet)`

- `Direction ∈ { HORIZONTAL, VERTICAL, DIAG_DOWN, DIAG_UP }`
- `len(OrderedCellSet) ≥ SegmentMin`
- Default `SegmentMin = 4` unless match rules override

### 5.2 Uniqueness rule
A segment is **unique** if the exact tuple `(Owner, Direction, OrderedCellSet)` has not been awarded in the current match.

### 5.3 Awarding rule (ties to GEG-012)
- **1 token per NEW unique segment**
- If a single claim creates multiple unique segments, award one token per segment (unless a cap is enabled)

### 5.4 Learning target interaction
Learning target affects claim batching, not the segment definition:
- Notes/Intervals: check segments after each accepted answer
- Chords/Scales/Arpeggios: check segments after the full structure resolves, then evaluate the batch

---

## 6) Answer Shortcut Menu (Right-Click) — Canon stub

This is a canonical interaction shortcut; detailed contents will be refined later.

- Trigger: **Mouse right-click** on an eligible answer surface target.
- Context gating: Menu options must be restricted to options valid for the current:
  - Learning Target
  - Prompt requirements
  - Pitch Sets / Key
  - Accidentals pool
  - SAM
  - Surface roles (Prompt / Mark / Persistence / SAM)
- Pipeline: Selecting a menu option must submit through the **same unified input pipeline** as normal input (no special scoring path).
- Non-eligible areas must preserve the browser default context menu.
- Touch fallback: long-press may be used later (documented only; implementation optional).

