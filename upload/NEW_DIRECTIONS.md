# NEW_DIRECTIONS.md — Guitar Learning Game

**Date:** 2026-01-16

**Policy:** ARCHIVE-ONLY. No deletions. No refactors. No speculative features.


---

## 1) Entry Point

- Follow `AUTHORITATIVE_INDEX.md` first.

- Resolve conflicts strictly by authority: Checklist → Specs → Docs → Code → UI → Runtime.


---

## 2) Current Checkpoint

- **Resume from:** **GEG-002**

- Checklist line: - [ ] **GEG-002** Turn loop fully wired: turn start → input → end turn → scoring → (bonus phase if **enabled and triggered**) → next player.


---

## 3) Work Queue (Next 10 Checklist IDs)

- **GEG-002** —   
  Status: READY  
  Evidence: - [ ] **GEG-002** Turn loop fully wired: turn start → input → end turn → scoring → (bonus phase if **enabled and triggered**) → next player.
- **GEG-004** —   
  Status: READY  
  Evidence: - [ ] **GEG-004** Bonus phase reliably reachable and visible (including via dev tools).
- **GEG-005** —   
  Status: READY  
  Evidence: - [ ] **GEG-005** Multiplayer player roster UI: show player count, editable player names, add/remove players with controls (future: link to accounts).
- **GEG-010** —   
  Status: READY  
  Evidence: - [ ] **GEG-010** Sequence detection in 4 directions: horizontal, vertical, diagonal up, diagonal down.
- **GEG-011** —   
  Status: READY  
  Evidence: - [ ] **GEG-011** Segment scoring matches canon (4+ run):
- **GEG-012** —   
  Status: READY  
  Evidence: - [ ] **GEG-012** Token awarding matches canon: **1 token per NEW segment** (not per note, not per extension).
- **GEG-013** —   
  Status: READY  
  Evidence: - [ ] **GEG-013** Steal token spend + resolution works (ownership updates + scoring side-effects where applicable).
- **GEG-014** —   
  Status: READY  
  Evidence: - [ ] **GEG-014** Last-chance phase works: steals/tokens-only behavior and clean end conditions.
- **GEG-015** —   
  Status: READY  
  Evidence: - [ ] **GEG-015** Main Menu Settings: **Token cap** adjustable.
- **GEG-016** —   
  Status: READY  
  Evidence: - [ ] **GEG-016** Main Menu Settings: **Starting tokens** adjustable (supports gameplay variants).

---

## 4) Binding Map (System Terms → Checklist IDs)

System terms/features are bound to checklist work for traceability (basis: chat co-occurrence within the same thread ±2 days).

- **BONUS_PHASE** → GEG-001, GEG-002, GEG-010
- **DEPRECATED_LAST_CHANCE** → GEG-001, GEG-010, GEG-040
- **DOUBLE_BOARDS** → GEG-001, GEG-002, GEG-010
- **MATCH_SETTINGS_APPLY** → GEG-001, GEG-040, GEG-002
- **MULTI_SURFACE_DESYNC** → GEG-001, GEG-002, GEG-003
- **SVG_RENDERER_DUPLICATION** → GEG-001, GEG-002, GEG-003
- **NOTE_RAIL** → GEG-001, GEG-002, GEG-040
- **UTILITY_TABS** → GEG-001, GEG-040, GEG-060
- **RIGHT_CLICK_SHORTCUT** → GEG-001, GEG-040, GEG-060
- **STAFF_RULES** → GEG-001, GEG-002, GEG-003
- **TAB_RULES** → GEG-002, GEG-001, GEG-003
- **FRETBOARD** → GEG-001, GEG-002, GEG-003
- **RUNTIME_TESTS** → GEG-001, GEG-002, GEG-010
- **DEV_TOOLS_HIDDEN** → GEG-001, GEG-002, GEG-003

---

## 5) Clarification Protocol

When a question arises:

1. Identify the feature key in `GLG_Term_Feature_Timeline_v3_BINDINGS.xlsx`.

2. Check `LifecycleState`:

   - REMOVED → stop.

   - DEFERRED → stop (blocked until scheduled).

3. Check `Disposition`:

   - ARCHIVE_CANDIDATE → do not implement.

4. Use `BoundChecklistIDs` to locate the governing checklist item(s).

5. If unbound → log as **Decision Needed**; do not act.


---

## 6) Evidence Pack (Read-only)

- `TIMELINE_LEDGER_MASTER.md`

- `GLG_Term_Feature_Timeline_v3_BINDINGS.xlsx`

- `GLG_Term_Feature_Profiles_v2.docx`
