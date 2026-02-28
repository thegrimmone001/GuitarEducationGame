/**
 * Guitar Education Game - Music Theory Module
 *
 * Handles pitch classes, note variants, spellings, and music theory logic.
 * All calculations use standard guitar tuning (E A D G B E).
 *
 * @module guitar-game/music
 */

import { SlotType, VariantId, NoteVariant, PitchClass } from "./types";

// ============================================================================
// PITCH CLASS CONSTANTS
// ============================================================================

/**
 * Whether each pitch class is a black key (sharp/flat)
 * Index 0 = C, 1 = C#/Db, ..., 11 = B
 */
export const IS_BLACK: readonly boolean[] = [
  false, // C
  true,  // C#/Db
  false, // D
  true,  // D#/Eb
  false, // E
  false, // F
  true,  // F#/Gb
  false, // G
  true,  // G#/Ab
  false, // A
  true,  // A#/Bb
  false, // B
] as const;

/**
 * Open string pitch classes for standard tuning
 * Index 0 = high E (thinnest), Index 5 = low E (thickest)
 * E B G D A E from high to low
 */
const OPEN_STRING_PC: readonly PitchClass[] = [4, 11, 7, 2, 9, 4];

/**
 * Natural note names in order
 */
const NAT_NAMES: readonly string[] = ["C", "D", "E", "F", "G", "A", "B"];

/**
 * Pitch classes for natural notes
 */
const NAT_PCS: readonly PitchClass[] = [0, 2, 4, 5, 7, 9, 11];

/**
 * Sharp names for black key pitch classes
 */
const SHARP_NAMES: readonly string[] = ["C♯", "D♯", "F♯", "G♯", "A♯"];

/**
 * Flat names for black key pitch classes
 */
const FLAT_NAMES: readonly string[] = ["D♭", "E♭", "G♭", "A♭", "B♭"];

/**
 * Black key pitch classes (for indexing into sharp/flat name arrays)
 */
const BLACK_PCS: readonly PitchClass[] = [1, 3, 6, 8, 10];

// ============================================================================
// PITCH CLASS FUNCTIONS
// ============================================================================

/**
 * Calculate the pitch class at a given string and fret position
 *
 * @param stringIndex - String number (0 = high E, 5 = low E)
 * @param fretIndex - Fret number (0 = open string)
 * @returns Pitch class (0-11)
 *
 * @example
 * pitchClassAt(0, 0)  // 4 (E)
 * pitchClassAt(0, 1)  // 5 (F)
 * pitchClassAt(5, 0)  // 4 (E)
 */
export function pitchClassAt(stringIndex: number, fretIndex: number): PitchClass {
  const open = OPEN_STRING_PC[stringIndex] ?? 0;
  return ((open + fretIndex) % 12) as PitchClass;
}

/**
 * Get the pitch class for an open string
 *
 * @param stringIndex - String number (0-5)
 * @returns Pitch class of the open string
 */
export function openStringPitchClass(stringIndex: number): PitchClass {
  return OPEN_STRING_PC[stringIndex] ?? 0;
}

/**
 * Get the note name for a pitch class with optional spelling preference
 *
 * @param pc - Pitch class (0-11)
 * @param spelling - Preferred spelling (NAT, SHR, or FLT)
 * @returns Note name string
 */
export function pitchClassName(pc: PitchClass, spelling: SlotType = SlotType.NAT): string {
  if (!IS_BLACK[pc]) {
    const idx = NAT_PCS.indexOf(pc);
    return NAT_NAMES[idx >= 0 ? idx : 0];
  }

  const blackIdx = BLACK_PCS.indexOf(pc);
  if (blackIdx < 0) return "?";

  return spelling === SlotType.FLT ? FLAT_NAMES[blackIdx] : SHARP_NAMES[blackIdx];
}

// ============================================================================
// SPELLING FUNCTIONS
// ============================================================================

/**
 * Check if a spelling is valid for a given pitch class
 *
 * @param pc - Pitch class (0-11)
 * @param slot - Spelling type (NAT, SHR, or FLT)
 * @returns Whether the spelling is valid
 *
 * @example
 * isValidSpelling(0, SlotType.NAT)  // true (C natural is valid)
 * isValidSpelling(1, SlotType.NAT)  // false (C# cannot be natural)
 * isValidSpelling(1, SlotType.SHR)  // true (C# sharp spelling is valid)
 */
export function isValidSpelling(pc: PitchClass, slot: SlotType): boolean {
  if (!IS_BLACK[pc]) return slot === SlotType.NAT;
  return slot === SlotType.SHR || slot === SlotType.FLT;
}

/**
 * Get the opposite enharmonic spelling
 *
 * @param slot - Current spelling
 * @returns Opposite spelling, or null for naturals
 */
export function enharmonicOppositeSlot(slot: SlotType): SlotType | null {
  if (slot === SlotType.SHR) return SlotType.FLT;
  if (slot === SlotType.FLT) return SlotType.SHR;
  return null;
}

// ============================================================================
// VARIANT FUNCTIONS
// ============================================================================

/**
 * Encode a pitch class and spelling into a variant ID
 *
 * @param pc - Pitch class (0-11)
 * @param slot - Spelling type
 * @returns Variant ID (0-35)
 */
export function toVariantId(pc: PitchClass, slot: SlotType): VariantId {
  return (pc * 3 + slot) as VariantId;
}

/**
 * Decode a variant ID into pitch class and spelling
 *
 * @param vid - Variant ID (0-35)
 * @returns Note variant with pitch class and spelling
 */
export function fromVariantId(vid: VariantId): NoteVariant {
  const pc = Math.floor(vid / 3) as PitchClass;
  const spelling = (vid % 3) as SlotType;
  return { pitchClass: pc, spelling };
}

/**
 * Get the display label for a variant
 *
 * @param vid - Variant ID
 * @returns Human-readable note name
 */
export function variantLabel(vid: VariantId): string {
  const v = fromVariantId(vid);
  return pitchClassName(v.pitchClass, v.spelling);
}

/**
 * Check if a variant is valid (proper spelling for the pitch class)
 *
 * @param vid - Variant ID
 * @returns Whether the variant has a valid spelling
 */
export function isValidVariant(vid: VariantId): boolean {
  const v = fromVariantId(vid);
  return isValidSpelling(v.pitchClass, v.spelling);
}

// ============================================================================
// INTERVAL FUNCTIONS
// ============================================================================

/**
 * Calculate the interval between two pitch classes
 *
 * @param from - Starting pitch class
 * @param to - Ending pitch class
 * @returns Interval in semitones (0-11)
 */
export function intervalBetween(from: PitchClass, to: PitchClass): number {
  return ((to - from) + 12) % 12;
}

/**
 * Interval names for display
 */
export const INTERVAL_NAMES: readonly string[] = [
  "1", "♭2", "2", "♭3", "3", "4", "♯4/♭5", "5", "♯5/♭6", "6", "♭7", "7",
];

/**
 * Get the name for an interval
 *
 * @param semitones - Number of semitones (0-11)
 * @returns Interval name
 */
export function intervalName(semitones: number): string {
  return INTERVAL_NAMES[semitones % 12] ?? "?";
}

// ============================================================================
// KEY/SCALE HELPERS
// ============================================================================

/**
 * Major scale intervals from root
 */
export const MAJOR_SCALE_INTERVALS: readonly number[] = [0, 2, 4, 5, 7, 9, 11];

/**
 * Natural minor scale intervals from root
 */
export const MINOR_SCALE_INTERVALS: readonly number[] = [0, 2, 3, 5, 7, 8, 10];

/**
 * Get pitch classes in a major scale
 *
 * @param root - Root note pitch class
 * @returns Array of pitch classes in the scale
 */
export function majorScale(root: PitchClass): PitchClass[] {
  return MAJOR_SCALE_INTERVALS.map(i => ((root + i) % 12) as PitchClass);
}

/**
 * Get pitch classes in a natural minor scale
 *
 * @param root - Root note pitch class
 * @returns Array of pitch classes in the scale
 */
export function minorScale(root: PitchClass): PitchClass[] {
  return MINOR_SCALE_INTERVALS.map(i => ((root + i) % 12) as PitchClass);
}

/**
 * Check if a pitch class is in a major scale
 *
 * @param pc - Pitch class to check
 * @param root - Scale root
 * @returns Whether the note is in the scale
 */
export function isInMajorScale(pc: PitchClass, root: PitchClass): boolean {
  return majorScale(root).includes(pc);
}

/**
 * Check if a pitch class is in a natural minor scale
 *
 * @param pc - Pitch class to check
 * @param root - Scale root
 * @returns Whether the note is in the scale
 */
export function isInMinorScale(pc: PitchClass, root: PitchClass): boolean {
  return minorScale(root).includes(pc);
}

// ============================================================================
// STRING/FRET UTILITIES
// ============================================================================

/**
 * String names in standard tuning (high to low)
 */
export const STRING_NAMES: readonly string[] = ["e", "B", "G", "D", "A", "E"];

/**
 * Get the name of a string
 *
 * @param stringIndex - String number (0-5)
 * @returns String name
 */
export function stringName(stringIndex: number): string {
  return STRING_NAMES[stringIndex] ?? "?";
}

/**
 * Calculate cell index from string and fret
 *
 * @param stringIndex - String number (0-5)
 * @param fretIndex - Fret number (0+)
 * @param fretCount - Total number of frets
 * @returns Cell index
 */
export function cellIndexOf(stringIndex: number, fretIndex: number, fretCount: number): number {
  return stringIndex * fretCount + fretIndex;
}

/**
 * Extract string index from cell index
 *
 * @param cellIndex - Cell index
 * @param fretCount - Total number of frets
 * @returns String index (0-5)
 */
export function stringOf(cellIndex: number, fretCount: number): number {
  return Math.floor(cellIndex / fretCount);
}

/**
 * Extract fret index from cell index
 *
 * @param cellIndex - Cell index
 * @param fretCount - Total number of frets
 * @returns Fret index
 */
export function fretOf(cellIndex: number, fretCount: number): number {
  return cellIndex % fretCount;
}

// ============================================================================
// HARMONIC HELPERS
// ============================================================================

/**
 * Relative major for each minor key
 * (Minor root -> Major root that shares the same key signature)
 */
const RELATIVE_MAJOR: readonly PitchClass[] = [
  3,  // Cm -> Eb
  4,  // C#m -> E
  5,  // Dm -> F
  6,  // D#m -> F#
  7,  // Em -> G
  8,  // Fm -> Ab
  9,  // F#m -> A
  10, // Gm -> Bb
  11, // G#m -> B
  0,  // Am -> C
  1,  // A#m -> C#
  2,  // Bm -> D
];

/**
 * Get the relative major for a minor key
 *
 * @param minorRoot - Minor key root pitch class
 * @returns Relative major pitch class
 */
export function relativeMajor(minorRoot: PitchClass): PitchClass {
  return RELATIVE_MAJOR[minorRoot] ?? 0;
}

/**
 * Get the relative minor for a major key
 *
 * @param majorRoot - Major key root pitch class
 * @returns Relative minor pitch class
 */
export function relativeMinor(majorRoot: PitchClass): PitchClass {
  // Minor is 3 semitones below major
  return ((majorRoot + 9) % 12) as PitchClass;
}
