# Thread Handoff

This file exists to reduce drift when a conversation thread is restarted.

## Active build

- Active package: `guitar-edu-ui_01_12_26_01.zip`

## Current trajectory (as of 2026-01-11)

1. Restore match flow correctness:
   - Pause removed entirely (no user-facing pause control)
   - Match start uses a **Ready/Engage** overlay (Turn 1 does not start immediately)
   - Single-player defaults to **time-to-complete**
   - Timer settings are stored in **seconds**

2. Restore UI control semantics:
   - Surface Layers are checkboxes: **Display / Prompt / Marks** (visual-only)

3. Next major implementation:
   - Staff/TAB timeline persistence: keep accepted marks as a running record until the visible area is filled
   - Default notation grid is 4/4 recorded in 8th-note slots
   - Staff/TAB must remain spatially static (no viewBox crop/zoom)

4. After timeline persistence:
   - Revisit Mode 3 correctness and runtime validation.

5. Dev/Test iteration speed (current focus):
   - Add Vitest unit tests (Phase A)
   - Add Playwright E2E smoke tests (Phase B)
   - Add one-click Windows runners (Phase C)
