# Suggestions Log (Pending Review)

Purpose: capture **non-canon** improvement ideas without implementing them until approved.

---

## Template

### SUG-000: <Title>
- **Category:** UI | Engine | Data | Diagnostics | Docs | Build
- **Rationale:** <why this matters>
- **Scope:** <files / modules / surfaces touched>
- **Canon Mapping:** <which canon file(s) would be updated, or "none">
- **Risk:** <what could break / confuse / expand scope>
- **Acceptance Criteria:** <testable conditions>
- **Status:** Proposed | Approved | Rejected | Implemented
- **Notes:** <any extra context>

---

## Current Suggestions

### SUG-001: SAFE MODE (bypass engine start for UI diagnostics)
- **Category:** Diagnostics
- **Rationale:** Allows UI inspection when startup/engine is unstable.
- **Scope:** `src/main.ts`, `src/app/gameController.ts`, possibly UI header.
- **Canon Mapping:** None (requires DECISIONS_LOG + CHECKLIST updates).
- **Risk:** Adds alternate runtime path; could mask real bugs if used incorrectly.
- **Acceptance Criteria:** When approved and implemented, `?safe=1` loads UI without starting match engine.
- **Status:** Proposed
- **Notes:** Previously prototyped; rolled back for canon compliance.

### SUG-002: Event Log quick filters + Clear button
- **Category:** Diagnostics
- **Rationale:** Faster capture and review of logs during troubleshooting.
- **Scope:** `src/app/eventLog.ts`
- **Canon Mapping:** None (requires DECISIONS_LOG + CHECKLIST updates).
- **Risk:** UI clutter; potential misuse by clearing context.
- **Acceptance Criteria:** Filters (All/UI/Engine/Sys) and Clear log work reliably and are included in report workflow.
- **Status:** Proposed
- **Notes:** Previously prototyped; rolled back for canon compliance.

### SUG-003: Header quick controls (Reset / Smoke)
- **Category:** UI
- **Rationale:** One-click recovery and smoke runs.
- **Scope:** `src/ui/layout.ts`
- **Canon Mapping:** None (requires Start Screen / menus canon update).
- **Risk:** Non-canon control surface expansion; visual drift.
- **Acceptance Criteria:** Buttons exist only if approved and match design rules.
- **Status:** Proposed
- **Notes:** Previously prototyped; rolled back for canon compliance.


### SUG-004: Resolve conflicting GEG ID namespaces (CHECKLIST vs docs/TASK_BOARD)
- **Category:** Docs
- **Rationale:** `GEG-###` identifiers were being reused across multiple ledgers, making checkpoints ambiguous.
- **Scope:** `CHECKLIST.md`, `BUILD_LOG.md`, `CHANGELOG.md` (docs-only reconciliation).
- **Canon Mapping:** Completion authority is `CHECKLIST.md` only; BUILD_LOG is milestone narrative.
- **Risk:** Incorrect checkpoint interpretation leading to drift.
- **Acceptance Criteria:** One completion gate; no parallel GEG ledgers.
- **Status:** Resolved (2026-01-16)
- **Notes:** Legacy task ledgers removed; Build/Change logs clarified; `/docs` folder removed.

### SUG-005: Eliminate duplicate canon doc paths (DOCS/ vs docs/)
- **Category:** Docs
- **Rationale:** Duplicated doc trees (`DOCS/` and `docs/`) contain overlapping canon topics (e.g., deprecated terms, task board) with conflicting contents.
- **Scope:** `DOCS/*` plus references in `CHANGELOG.md` / `BUILD_LOG.md`.
- **Canon Mapping:** Canon docs live in `DOCS/`.
- **Risk:** Confusing “which file is canon,” leading to regressions.
- **Acceptance Criteria:** One canonical docs directory; legacy duplicates removed.
- **Status:** Resolved (2026-01-16)
- **Notes:** Lowercase `/docs` folder removed; any remaining references are archival.
