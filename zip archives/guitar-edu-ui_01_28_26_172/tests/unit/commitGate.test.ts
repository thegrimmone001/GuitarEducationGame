import { describe, expect, it } from "vitest";
import { createStaffTabOverlayState } from "../../src/shell/staffTabOverlay";
import { commitSnapshotsToAccepted } from "../../src/shell/staffTabCommit";

describe("commit gate", () => {
  it("mutates accepted history only when commit is called; pending never pollutes accepted", () => {
    const s = createStaffTabOverlayState();

    // pending exists, but accepted is empty
    s.pendingStaffMarksByCol.set(0, [{ yIndex: 3, accidental: null }]);
    s.pendingTabMarksByCol.set(0, [{ stringIndex: 0, fret: 5 }]);

    expect(s.staffMarksByCol.size).toBe(0);
    expect(s.tabMarksByCol.size).toBe(0);

    commitSnapshotsToAccepted({
      state: s,
      col: 0,
      staffPending: [{ yIndex: 3, accidental: null }],
      tabPending: [{ stringIndex: 0, fret: 5 }],
    });

    expect(s.staffMarksByCol.get(0)?.length).toBe(1);
    expect(s.tabMarksByCol.get(0)).toEqual([{ stringIndex: 0, fret: 5 }]);
    // pending cleared at committed col
    expect(s.pendingStaffMarksByCol.has(0)).toBe(false);
    expect(s.pendingTabMarksByCol.has(0)).toBe(false);
  });

  it("never commits null frets into accepted TAB history", () => {
    const s = createStaffTabOverlayState();
    commitSnapshotsToAccepted({
      state: s,
      col: 1,
      staffPending: [],
      tabPending: [
        { stringIndex: 2, fret: null },
        { stringIndex: 3, fret: 0 },
      ],
    });
    expect(s.tabMarksByCol.get(1)).toEqual([{ stringIndex: 3, fret: 0 }]);
  });
});
