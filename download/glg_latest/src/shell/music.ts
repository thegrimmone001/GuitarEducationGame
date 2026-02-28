import { SlotType, VariantId, NoteVariant, PitchClass } from "./types";

// Pitch-class helpers
export const IS_BLACK: boolean[] = [
  false, true, false, true, false, false, true, false, true, false, true, false,
];

// String order matches the provided SVG: thinnest at the TOP, thickest at the BOTTOM.
// (Top = high E; bottom = low E.)
const OPEN_STRING_PC: PitchClass[] = [4, 11, 7, 2, 9, 4]; // E B G D A E (high -> low)

// Absolute pitch helpers (MIDI)
// Standard tuning, high->low: E4 B3 G3 D3 A2 E2
// NOTE: This is currently fixed to standard tuning; when alternate tunings are introduced,
// these values must be derived from the tuning model.
const OPEN_STRING_MIDI: number[] = [64, 59, 55, 50, 45, 40];

export function pitchClassAt(stringIndex: number, fretIndex: number): PitchClass {
  const open = OPEN_STRING_PC[stringIndex] ?? 0;
  return ((open + fretIndex) % 12) as PitchClass;
}

export function pitchMidiAt(stringIndex: number, fretIndex: number): number {
  const open = OPEN_STRING_MIDI[stringIndex] ?? 60;
  return open + fretIndex;
}

export function isValidSpelling(pc: PitchClass, slot: SlotType): boolean {
  if (!IS_BLACK[pc]) return slot === SlotType.NAT;
  return slot === SlotType.SHR || slot === SlotType.FLT;
}

export function toVariantId(pc: PitchClass, slot: SlotType): VariantId {
  return (pc * 3 + slot) as VariantId;
}

export function fromVariantId(vid: VariantId): NoteVariant {
  const pc = Math.floor(vid / 3) as PitchClass;
  const spelling = (vid % 3) as SlotType;
  return { pitchClass: pc, spelling };
}

export function enharmonicOppositeSlot(slot: SlotType): SlotType | null {
  if (slot === SlotType.SHR) return SlotType.FLT;
  if (slot === SlotType.FLT) return SlotType.SHR;
  return null;
}

// UI label helpers (prototype names)
const NAT_NAMES = ["C","D","E","F","G","A","B"];
const NAT_PCS: PitchClass[] = [0,2,4,5,7,9,11];

export function variantLabel(vid: VariantId): string {
  const v = fromVariantId(vid);
  const pc = v.pitchClass;
  if (!IS_BLACK[pc]) {
    const idx = NAT_PCS.indexOf(pc);
    return NAT_NAMES[idx >= 0 ? idx : 0];
  }
  // Black keys: use “sharp-name” for SHR lane and “flat-name” for FLT lane.
  // Use music glyphs (♯/♭) to reduce visual ambiguity.
  const sharpNames = ["C♯","D♯","F♯","G♯","A♯"];
  const flatNames  = ["D♭","E♭","G♭","A♭","B♭"];
  const blackPcs: PitchClass[] = [1,3,6,8,10];
  const i = blackPcs.indexOf(pc);
  return v.spelling === SlotType.FLT ? flatNames[i] : sharpNames[i];
}
