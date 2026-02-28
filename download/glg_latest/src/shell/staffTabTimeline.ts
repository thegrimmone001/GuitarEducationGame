import type { StaffTabOverlayState } from "./staffTabOverlay";

/**
 * Canon: STAFF/TAB remain spatially static. When the visible window is full,
 * we shift accepted history left by N slots and drop anything that falls < 0.
 * Pending maps shift in lock-step so previews stay aligned with the cursor.
 */
export function shiftStaffTabTimelineLeft(s: StaffTabOverlayState, by: number): void {
  if (!Number.isFinite(by) || by <= 0) return;
  const n = Math.floor(by);

  const outStaff = new Map<number, any>();
  for (const [k, v] of s.staffMarksByCol.entries()) {
    const nk = k - n;
    if (nk >= 0) outStaff.set(nk, v);
  }

  const outTab = new Map<number, Array<{ stringIndex: number; fret: number | null }>>();
  for (const [k, v] of s.tabMarksByCol.entries()) {
    const nk = k - n;
    if (nk >= 0) outTab.set(nk, v);
  }

  const outPendingStaff = new Map<number, any>();
  for (const [k, v] of s.pendingStaffMarksByCol.entries()) {
    const nk = k - n;
    if (nk >= 0) outPendingStaff.set(nk, v);
  }

  const outPendingTab = new Map<number, Array<{ stringIndex: number; fret: number | null }>>();
  for (const [k, v] of s.pendingTabMarksByCol.entries()) {
    const nk = k - n;
    if (nk >= 0) outPendingTab.set(nk, v);
  }

  s.staffMarksByCol = outStaff as any;
  s.tabMarksByCol = outTab;
  s.pendingStaffMarksByCol = outPendingStaff as any;
  s.pendingTabMarksByCol = outPendingTab;
}

/**
 * Advances the cursor by 1. If advancing would exceed totalCols, shift-left by 1
 * and clamp cursor to the last visible slot.
 */
export function advanceStaffTabTimelineCursor(s: StaffTabOverlayState, totalCols: number): void {
  const total = Math.max(0, Math.floor(totalCols));
  if (total <= 0) {
    s.timelineCursorCol = 0;
    return;
  }
  let next = Math.floor(s.timelineCursorCol ?? 0) + 1;
  if (next >= total) {
    shiftStaffTabTimelineLeft(s, 1);
    next = total - 1;
  }
  s.timelineCursorCol = next;
}
