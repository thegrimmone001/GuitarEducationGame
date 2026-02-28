import { describe, expect, it } from "vitest";
import { createStaffTabOverlayState } from "../../src/shell/staffTabOverlay";
import { shiftStaffTabTimelineLeft, advanceStaffTabTimelineCursor } from "../../src/shell/staffTabTimeline";

describe("staff/tab timeline shift-left", () => {
  it("shifts accepted marks left by 1, drops oldest, and moves cursor", () => {
    const s = createStaffTabOverlayState();
    // accepted
    s.staffMarksByCol.set(0, [{ yIndex: 1, accidental: null }]);
    s.staffMarksByCol.set(1, [{ yIndex: 2, accidental: "sharp" }]);
    s.tabMarksByCol.set(0, [{ stringIndex: 0, fret: 3 }]);
    s.tabMarksByCol.set(1, [{ stringIndex: 1, fret: 5 }]);
    // pending (should shift too)
    s.pendingStaffMarksByCol.set(1, [{ yIndex: 99, accidental: null }]);
    s.pendingTabMarksByCol.set(1, [{ stringIndex: 5, fret: 12 }]);

    s.timelineCursorCol = 1;

    shiftStaffTabTimelineLeft(s, 1);

    expect(s.staffMarksByCol.has(0)).toBe(true);
    expect(s.staffMarksByCol.has(1)).toBe(false);
    expect(s.staffMarksByCol.get(0)?.[0]?.yIndex).toBe(2);

    expect(s.tabMarksByCol.get(0)).toEqual([{ stringIndex: 1, fret: 5 }]);

    // pending shifted
    expect(s.pendingStaffMarksByCol.get(0)?.[0]?.yIndex).toBe(99);
    expect(s.pendingTabMarksByCol.get(0)).toEqual([{ stringIndex: 5, fret: 12 }]);
  });

  it("advance clamps at end and triggers shift-left when full", () => {
    const s = createStaffTabOverlayState();
    const totalCols = 3;
    s.timelineCursorCol = 2;
    s.staffMarksByCol.set(2, [{ yIndex: 7, accidental: null }]);
    advanceStaffTabTimelineCursor(s, totalCols);
    // shift-left by 1 => prior col 2 becomes col 1
    expect(s.timelineCursorCol).toBe(2);
    expect(s.staffMarksByCol.get(1)?.[0]?.yIndex).toBe(7);
  });
});
