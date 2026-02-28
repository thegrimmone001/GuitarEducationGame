import { IS_BLACK } from "./music";
import { SlotType } from "./types";

export type SpellingPolicy = "strict" | "enharmonic";

/**
 * Canon Mode 3 spelling policy:
 * - strict: black keys must match prompt spelling (C# != Db); white keys must be natural
 * - enharmonic: any spelling that resolves to the same pitch class is accepted
 */
export function isStaffSpellingAccepted(args: {
  policy: SpellingPolicy;
  targetPitchClass: number;
  targetSpelling: SlotType;
  staffPitchClass: number;
  staffSlot: SlotType;
}): boolean {
  const { policy, targetPitchClass, targetSpelling, staffPitchClass, staffSlot } = args;
  if (!Number.isFinite(targetPitchClass) || !Number.isFinite(staffPitchClass)) return false;
  if (((targetPitchClass % 12) + 12) % 12 !== (((staffPitchClass % 12) + 12) % 12)) return false;

  if (policy === "enharmonic") return true;

  const pc = ((targetPitchClass % 12) + 12) % 12;
  if (IS_BLACK[pc]) {
    return staffSlot === targetSpelling;
  }
  // White keys must be natural in strict mode (E♯ is not E♮, etc.)
  return staffSlot === SlotType.NAT && targetSpelling === SlotType.NAT;
}
