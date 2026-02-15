# Phase L — Teacher Workflows

This document defines the **workflow contract** for classroom usage. It intentionally avoids UI layout commitments.

## Canon primitives

### Teacher-authored artifacts
- **AssignmentDefinition**: the authoritative description of a lesson/assignment/exam.
- **AssignmentBundleV1**: a portable package that contains the assignment, referenced artifacts, and checksums.

### Student-produced artifacts
- **AssignmentResultPacketV1**: an auditable result export for a single run.

The corresponding TypeScript source of truth lives in:
- `src/shell/assignmentTypes.ts`
- `src/shell/assignmentStorage.ts`

## Workflow: Teacher create → export → student run → collect

### 1) Teacher creates an assignment
Teacher selects:
- `type`: lesson | assignment | exam
- `contentPlan`: generated/imported/mixed
- `assessmentPlan`: practice/quiz/exam + rules reference
- `locks`: what students cannot change
- `exports`: what is allowed to export

### 2) Teacher exports a portable bundle
Teacher exports a `AssignmentBundleV1` JSON blob.

Bundle invariants:
- deterministic checksums exist for:
  - assignment
  - each artifact id (when present)
- import rejects if assignment checksum mismatches

### 3) Student runs the assignment
Student loads the bundle. The system:
- validates version + checksums
- imports the AssignmentDefinition as read-only
- applies locks at the controller/UI boundaries (implementation phase)

### 4) Student exports results
Student exports `AssignmentResultPacketV1` (JSON and/or CSV depending on policy).

### 5) Teacher collects results
Teacher can validate integrity by checking:
- packet checksum
- matching assignmentId

## Lock model (enforcement targets)

Locks are enforced at interaction boundaries:
- Match settings editor
- Advanced menus
- System settings menus
- Mode switching controls

Notes:
- Exams should default to the strictest locks.
- No silent mastery merges. Any merge is explicit (future teacher action).

## UI surfaces (no layout commitments)

These are the minimal screens/components needed later:

### Teacher side
1. **Assignment Builder** (create/edit an AssignmentDefinition)
2. **Export Bundle** (download JSON)
3. **Results Import/Viewer** (load result packets and summarize)

### Student side
1. **Import Assignment** (load JSON bundle)
2. **Run** (launch into match/session)
3. **Export Results** (download JSON/CSV)

## Non-goals

- No account system required.
- No network services required.
- No UI layout binding in this document.
