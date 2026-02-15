import { describe, expect, it } from "vitest";
import { createStaffTabOverlayState } from "../../src/shell/staffTabOverlay";
import { commitSnapshotsToAccepted } from "../../src/shell/staffTabCommit";
import { shiftStaffTabTimelineLeft } from "../../src/shell/staffTabTimeline";

describe("TAB stacking", () => {
  it("multiple strings per slot persist and shift correctly", () => {
    const s = createStaffTabOverlayState();

    // commit a chord-like TAB: two strings in same col
    commitSnapshotsToAccepted({
      state: s,
      col: 2,
      staffPending: [],
      tabPending: [
        { stringIndex: 5, fret: 3 },
        { stringIndex: 0, fret: 10 },
      ],
    });

    expect(s.tabMarksByCol.get(2)).toEqual([
      { stringIndex: 0, fret: 10 },
      { stringIndex: 5, fret: 3 },
    ]);

    shiftStaffTabTimelineLeft(s, 1);
    // col 2 -> col 1
    expect(s.tabMarksByCol.get(1)).toEqual([
      { stringIndex: 0, fret: 10 },
      { stringIndex: 5, fret: 3 },
    ]);
  });
});
