import { describe, expect, it } from "vitest";
import { isStaffSpellingAccepted } from "../../src/shell/spellingPolicy";
import { SlotType } from "../../src/shell/types";

describe("mode 3 spelling policy", () => {
  it("strict rejects enharmonic equivalents when prompt spelling is required", () => {
    // target: C# (pc 1, spelling SHR), staff: Db (same pc 1, slot FLT)
    const ok = isStaffSpellingAccepted({
      policy: "strict",
      targetPitchClass: 1,
      targetSpelling: SlotType.SHR,
      staffPitchClass: 1,
      staffSlot: SlotType.FLT,
    });
    expect(ok).toBe(false);
  });

  it("enharmonic accepts equivalent spellings", () => {
    const ok = isStaffSpellingAccepted({
      policy: "enharmonic",
      targetPitchClass: 1,
      targetSpelling: SlotType.SHR,
      staffPitchClass: 1,
      staffSlot: SlotType.FLT,
    });
    expect(ok).toBe(true);
  });

  it("strict requires naturals on white keys", () => {
    // target: E (pc 4). staff tries E# (pc 5) => already rejected by pc mismatch.
    // but also: for white keys, slot must be natural.
    const ok = isStaffSpellingAccepted({
      policy: "strict",
      targetPitchClass: 4,
      targetSpelling: SlotType.NAT,
      staffPitchClass: 4,
      staffSlot: SlotType.SHR,
    });
    expect(ok).toBe(false);
  });
});
