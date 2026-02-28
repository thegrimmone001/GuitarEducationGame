import type { StaffTabOverlayState } from "./staffTabOverlay";
import { upsertTabEntry } from "./tabStack";

export interface StaffPendingMark {
  yIndex: number;
  accidental: "natural" | "sharp" | "flat" | null;
}

export interface TabPendingMark {
  stringIndex: number;
  fret: number | null;
}

/**
 * Canon: Accepted history mutates only on successful composite acceptance.
 * Pending marks must never leak into accepted history unless explicitly committed.
 * Canon fix: Never commit a null fret to accepted TAB history.
 */
export function commitSnapshotsToAccepted(args: {
  state: StaffTabOverlayState;
  col: number;
  staffPending: StaffPendingMark[];
  tabPending: TabPendingMark[];
}): void {
  const { state, col, staffPending, tabPending } = args;
  const c = Math.floor(col);
  if (!Number.isFinite(c) || c < 0) return;

  // STAFF can accumulate multiple marks per slot.
  if (staffPending && staffPending.length) {
    const cur = state.staffMarksByCol.get(c) ?? [];
    for (const m of staffPending) {
      if (!m) continue;
      cur.push({ yIndex: Math.floor(m.yIndex), accidental: (m.accidental ?? null) as any });
    }
    state.staffMarksByCol.set(c, cur as any);
  }

  // TAB supports multiple strings per slot; keep stable ordering.
  if (tabPending && tabPending.length) {
    let slot = (state.tabMarksByCol.get(c) ?? []) as Array<{ stringIndex: number; fret: number | null }>;
    for (const t of tabPending) {
      if (!t) continue;
      if (t.fret == null) continue; // canonical guard
      slot = upsertTabEntry(slot, { stringIndex: t.stringIndex, fret: t.fret });
    }
    state.tabMarksByCol.set(c, slot);
  }

  // Ensure the committed column is removed from pending maps.
  state.pendingStaffMarksByCol.delete(c);
  state.pendingTabMarksByCol.delete(c);
}
