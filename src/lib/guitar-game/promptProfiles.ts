/**
 * Guitar Education Game - Prompt Profiles
 *
 * Defines which note variants can be prompted based on game settings.
 * Profiles include chromatic, accidentals-only, key-based, and scale-based.
 *
 * @module guitar-game/promptProfiles
 */

import { GameSettings, SlotType, VariantId, PitchClass } from "./types";
import { isValidSpelling, toVariantId, MAJOR_SCALE_INTERVALS, MINOR_SCALE_INTERVALS } from "./music";

/**
 * Profile result containing allowed variants array
 */
export interface PromptProfile {
  /** Allowed variant IDs (1 = allowed, 0 = not allowed) */
  allowed: Uint8Array;
  /** Human-readable description */
  description: string;
}

/**
 * Parse a prompt profile ID into its components
 *
 * @param profileId - Profile string (e.g., "chromatic", "key:G:maj", "scale:E:min:flats")
 * @returns Parsed profile configuration
 */
export function parseProfileId(profileId: string): {
  kind: "chromatic" | "accidentals" | "key" | "scale";
  root?: PitchClass;
  mode?: "maj" | "min";
  preference?: "auto" | "sharps" | "flats";
  accidentalMode?: "both" | "sharps" | "flats";
} {
  const raw = (profileId || "chromatic").trim().toLowerCase();

  // Default chromatic
  if (raw === "chromatic" || raw.startsWith("chromatic:")) {
    return { kind: "chromatic" };
  }

  // Accidentals-only mode
  if (raw.startsWith("accidentals")) {
    const parts = raw.split(":");
    const suff = (parts[1] || "both").toLowerCase();
    return {
      kind: "accidentals",
      accidentalMode: suff === "flats" ? "flats" : suff === "sharps" ? "sharps" : "both",
    };
  }

  // Key or scale mode
  const parts = raw.split(":");
  const kind = parts[0] as "key" | "scale";

  // Parse root note
  const rootName = (parts[1] || "C").toUpperCase();
  const root = parsePitchClass(rootName);

  // Parse mode (major/minor)
  const modeRaw = (parts[2] || "maj").toLowerCase();
  const mode: "maj" | "min" = modeRaw === "min" ? "min" : "maj";

  // Parse spelling preference
  const prefRaw = (parts[3] || "auto").toLowerCase();
  const preference: "auto" | "sharps" | "flats" =
    prefRaw === "sharps" ? "sharps" : prefRaw === "flats" ? "flats" : "auto";

  return { kind, root, mode, preference };
}

/**
 * Parse a note name into a pitch class
 *
 * @param name - Note name (e.g., "C", "C#", "Db")
 * @returns Pitch class (0-11), or 0 if invalid
 */
export function parsePitchClass(name: string): PitchClass {
  const n = name.trim().toUpperCase()
    .replace("♯", "#")
    .replace("♭", "B");

  const map: Record<string, PitchClass> = {
    C: 0, "C#": 1, DB: 1,
    D: 2, "D#": 3, EB: 3,
    E: 4,
    F: 5, "F#": 6, GB: 6,
    G: 7, "G#": 8, AB: 8,
    A: 9, "A#": 10, BB: 10,
    B: 11,
  };

  return map[n] ?? 0;
}

/**
 * Build allowed variants array from game settings
 *
 * @param settings - Current game settings
 * @returns Uint8Array where index is variant ID, value is 1 if allowed
 */
export function buildAllowedVariantsFromSettings(settings: GameSettings): Uint8Array {
  const allowed = new Uint8Array(36);
  const profile = parseProfileId(settings.promptProfileId);

  switch (profile.kind) {
    case "chromatic":
      fillChromatic(allowed);
      break;

    case "accidentals":
      fillAccidentals(allowed, profile.accidentalMode ?? "both");
      break;

    case "key":
    case "scale":
      fillDiatonic(allowed, profile.root ?? 0, profile.mode ?? "maj", profile.preference ?? "auto");
      break;
  }

  return allowed;
}

/**
 * Fill allowed array for chromatic mode (all notes)
 */
function fillChromatic(allowed: Uint8Array): void {
  for (let pc = 0; pc < 12; pc++) {
    for (let slot = 0; slot < 3; slot++) {
      const vid = toVariantId(pc as PitchClass, slot as SlotType);
      if (isValidSpelling(pc as PitchClass, slot as SlotType)) {
        allowed[vid] = 1;
      }
    }
  }
}

/**
 * Fill allowed array for accidentals-only mode
 */
function fillAccidentals(allowed: Uint8Array, mode: "both" | "sharps" | "flats"): void {
  // Black key pitch classes
  const blackPcs: PitchClass[] = [1, 3, 6, 8, 10];

  for (const pc of blackPcs) {
    if (mode === "both" || mode === "sharps") {
      const vid = toVariantId(pc, SlotType.SHR);
      allowed[vid] = 1;
    }
    if (mode === "both" || mode === "flats") {
      const vid = toVariantId(pc, SlotType.FLT);
      allowed[vid] = 1;
    }
  }
}

/**
 * Fill allowed array for diatonic (key/scale) mode
 */
function fillDiatonic(
  allowed: Uint8Array,
  root: PitchClass,
  mode: "maj" | "min",
  preference: "auto" | "sharps" | "flats"
): void {
  // Get scale degrees
  const intervals = mode === "min" ? MINOR_SCALE_INTERVALS : MAJOR_SCALE_INTERVALS;
  const scalePcs = intervals.map(i => ((root + i) % 12) as PitchClass);

  // Determine preferred spelling based on root and preference
  const useFlats = preference === "flats" ||
    (preference === "auto" && shouldUseFlats(root, mode));

  // Add each scale tone
  for (const pc of scalePcs) {
    if (isValidSpelling(pc, SlotType.NAT)) {
      // Natural note
      allowed[toVariantId(pc, SlotType.NAT)] = 1;
    } else {
      // Accidental - use preference
      if (useFlats) {
        allowed[toVariantId(pc, SlotType.FLT)] = 1;
      } else {
        allowed[toVariantId(pc, SlotType.SHR)] = 1;
      }
    }
  }
}

/**
 * Determine if a key should use flat spellings
 * Based on circle of fifths logic
 */
function shouldUseFlats(root: PitchClass, mode: "maj" | "min"): boolean {
  // Major keys that use flats: F, Bb, Eb, Ab, Db, Gb, Cb
  // Minor keys that use flats: D, G, C, F, Bb, Eb, Ab
  if (mode === "maj") {
    // F(5), Bb(10), Eb(3), Ab(8), Db(1), Gb(6), Cb(11)
    return [5, 10, 3, 8, 1, 6, 11].includes(root);
  } else {
    // D(2), G(7), C(0), F(5), Bb(10), Eb(3), Ab(8)
    return [2, 7, 0, 5, 10, 3, 8].includes(root);
  }
}

/**
 * Get a human-readable description for a profile
 *
 * @param profileId - Profile string
 * @returns Description text
 */
export function describeProfile(profileId: string): string {
  const parsed = parseProfileId(profileId);

  switch (parsed.kind) {
    case "chromatic":
      return "All 12 notes (chromatic)";

    case "accidentals":
      const accMode = parsed.accidentalMode ?? "both";
      if (accMode === "sharps") return "Sharps only (♯)";
      if (accMode === "flats") return "Flats only (♭)";
      return "All accidentals (♯ and ♭)";

    case "key":
    case "scale":
      const rootName = pitchClassToName(parsed.root ?? 0, parsed.preference ?? "auto");
      const modeName = parsed.mode === "min" ? "minor" : "major";
      return `${rootName} ${modeName} (${parsed.kind})`;

    default:
      return "Unknown profile";
  }
}

/**
 * Convert pitch class to note name with preference
 */
function pitchClassToName(pc: PitchClass, preference: "auto" | "sharps" | "flats"): string {
  const natNames = ["C", "D", "E", "F", "G", "A", "B"];
  const natPcs: PitchClass[] = [0, 2, 4, 5, 7, 9, 11];
  const sharpNames = ["C♯", "D♯", "F♯", "G♯", "A♯"];
  const flatNames = ["D♭", "E♭", "G♭", "A♭", "B♭"];
  const blackPcs: PitchClass[] = [1, 3, 6, 8, 10];

  const natIdx = natPcs.indexOf(pc);
  if (natIdx >= 0) return natNames[natIdx];

  const blackIdx = blackPcs.indexOf(pc);
  if (blackIdx >= 0) {
    return preference === "flats" ? flatNames[blackIdx] : sharpNames[blackIdx];
  }

  return "?";
}

/**
 * Get the anchor variant ID for a profile (used as default prompt)
 *
 * @param profileId - Profile string
 * @returns Variant ID to use as anchor/default
 */
export function anchorVariantFromProfile(profileId: string): VariantId {
  const parsed = parseProfileId(profileId);

  if (parsed.kind === "chromatic" || parsed.kind === "accidentals") {
    // Default to C natural for chromatic
    return toVariantId(0, SlotType.NAT);
  }

  // For key/scale, use the root note
  const root = parsed.root ?? 0;

  // Determine spelling based on preference
  if (isValidSpelling(root, SlotType.NAT)) {
    return toVariantId(root, SlotType.NAT);
  }

  const useFlats = parsed.preference === "flats" ||
    (parsed.preference === "auto" && shouldUseFlats(root, parsed.mode ?? "maj"));

  return useFlats
    ? toVariantId(root, SlotType.FLT)
    : toVariantId(root, SlotType.SHR);
}
