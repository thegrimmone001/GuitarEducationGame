# Automatable Test Harness Outline (Vitest)
> This is a scaffold. It assumes Vite + TS. Adjust paths to match repo structure.
> Philosophy: unit tests for pure modules, integration tests for controller transitions, snapshot tests for determinism.

## 1) Install (dev)
- npm i -D vitest jsdom @types/node

## 2) Add scripts (package.json)
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch"
  }
}
```

## 3) Suggested folder
- src/__tests__/
  - engine.lifecycle.test.ts
  - fretboard.layout.test.ts
  - import.policy.test.ts
  - role.enforcement.test.ts
  - mastery.adaptive.test.ts
  - assignment.bundle.test.ts

## 4) Core tests

### A) Fretboard layout (didactic, uniform)
- Given width/height + fretCount:
  - assert uniform spacing deltas
  - assert note centers at fret midpoints
  - assert stringY monotonic and evenly spaced
  - assert no NaN

### B) Deterministic checksum
- stableStringify + fnv1a32:
  - same object ordering yields same checksum
  - different value yields different checksum

### C) Assignment bundle validation
- validateBundle(bundle):
  - bad checksum fails
  - missing required fields fails
  - strict exam mode (future) can require all checksums

### D) Adaptive selection
- with fixed seed + mastery snapshot:
  - same selected concepts and weights
  - caps enforced (difficulty, fret range)

### E) Role enforcement
- simulate "write attempt" functions:
  - student blocked when locks enabled
  - open/teacher allowed

## 5) Integration tests (controller)
If engine/controller exposes pure reducers or transition functions:
- apply events in order and assert state
- reject illegal transitions

## 6) Snapshot tests
For artifacts (AssessmentSummaryView, MasteryDashboardView):
- compute projections and snapshot JSON

## Notes
- Keep tests side-effect-free: mock storage and time.
- Use deterministic seeds; never rely on Date.now in tests (inject clock).
