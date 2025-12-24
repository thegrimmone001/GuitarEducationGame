import { GameSettings, SlotType } from "./types";
import { IS_BLACK, isValidSpelling } from "./music";

const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
const NAT_MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10];

function pcFromNoteName(name: string): number | null {
  const n = name.trim().toUpperCase();
  const map: Record<string, number> = {
    C: 0, "C#": 1, DB: 1,
    D: 2, "D#": 3, EB: 3,
    E: 4,
    F: 5, "F#": 6, GB: 6,
    G: 7, "G#": 8, AB: 8,
    A: 9, "A#": 10, BB: 10,
    B: 11,
  };
  return map[n] ?? null;
}

type Pref = "sharps" | "flats";

const NOTE_NAMES_SHARPS = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const NOTE_NAMES_FLATS  = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];

function parseProfile(profileId: string): { kind: "chromatic" | "accidentals" | "key" | "scale"; rootPc: number | null; mode: "maj" | "min" | null; pref: Pref } {
  const raw = profileId.trim();
  const lower = raw.toLowerCase();

  if (lower === "chromatic" || lower.startsWith("chromatic:")) {
    return { kind: "chromatic", rootPc: null, mode: null, pref: "sharps" };
  }

  if (lower === "accidentals" || lower.startsWith("accidentals:")) {
    // Accidentals-only study mode: only black-key pitch classes.
    // Plain "accidentals" allows BOTH spellings.
    // "accidentals:flats" or "accidentals:sharps" can constrain spelling.
    const parts = raw.split(":").map(s => s.trim());
    const prefPart = (parts[1] || "").toLowerCase();
    const pref: Pref = prefPart === "flats" ? "flats" : "sharps";
    return { kind: "accidentals", rootPc: null, mode: null, pref };
  }

  const parts = raw.split(":").map(s => s.trim());
  const kind = (parts[0] || "").toLowerCase();
  const rootName = parts[1] || "";
  const modePart = (parts[2] || "").toLowerCase();
  const prefPart = (parts[3] || "").toLowerCase();

  const rootPc = pcFromNoteName(rootName);
  const mode = (modePart === "maj" || modePart === "major") ? "maj"
            : (modePart === "min" || modePart === "minor") ? "min"
            : null;

  const pref: Pref =
    prefPart === "flats" ? "flats"
    : prefPart === "sharps" ? "sharps"
    : (rootName.toLowerCase().includes("b")) ? "flats"
    : "sharps";

  if (kind === "key") return { kind: "key", rootPc, mode, pref };
  if (kind === "scale") return { kind: "scale", rootPc, mode, pref };

  return { kind: "chromatic", rootPc: null, mode: null, pref: "sharps" };
}

export function describePromptProfileId(profileId: string): string {
  const p = parseProfile(profileId);
  if (p.kind === "chromatic") return "Chromatic";
  if (p.kind === "accidentals") {
    const lower = profileId.trim().toLowerCase();
    if (lower === "accidentals") return "Accidentals (♯/♭)";
    return p.pref === "flats" ? "Accidentals (♭)" : "Accidentals (♯)";
  }
  if (p.rootPc === null || p.mode === null) return "Custom";
  const names = p.pref === "flats" ? NOTE_NAMES_FLATS : NOTE_NAMES_SHARPS;
  const root = names[p.rootPc];
  const mode = p.mode === "maj" ? "Major" : "Minor";
  return `${p.kind === "key" ? "Key" : "Scale"}: ${root} ${mode}`;
}

export function buildAllowedVariantsFromSettings(settings: GameSettings): Uint8Array {
  const allowed = new Uint8Array(36);
  const parsed = parseProfile(settings.promptProfileId);

  if (parsed.kind === "chromatic") {
    for (let pc = 0; pc < 12; pc++) {
      if (!IS_BLACK[pc]) {
        allowed[pc * 3 + SlotType.NAT] = 1;
      } else {
        allowed[pc * 3 + SlotType.SHR] = 1;
        allowed[pc * 3 + SlotType.FLT] = 1;
      }
    }
    return allowed;
  }

  if (parsed.kind === "accidentals") {
    for (let pc = 0; pc < 12; pc++) {
      if (IS_BLACK[pc]) {
        // Default: allow BOTH spellings. If the profile was 'accidentals:flats', restrict to flats.
        if (parsed.pref === "flats") allowed[pc * 3 + SlotType.FLT] = 1;
        else {
          // 'accidentals' and 'accidentals:sharps' both allow sharps.
          allowed[pc * 3 + SlotType.SHR] = 1;
          // If it was plain 'accidentals', also allow flats.
          if (settings.promptProfileId.trim().toLowerCase() === "accidentals") {
            allowed[pc * 3 + SlotType.FLT] = 1;
          }
        }
      }
    }
    return allowed;
  }

  if (parsed.rootPc === null || parsed.mode === null) {
    for (let pc = 0; pc < 12; pc++) {
      if (!IS_BLACK[pc]) allowed[pc * 3 + SlotType.NAT] = 1;
    }
    return allowed;
  }

  const intervals = parsed.mode === "maj" ? MAJOR_SCALE : NAT_MINOR_SCALE;
  const laneForBlack = parsed.pref === "flats" ? SlotType.FLT : SlotType.SHR;

  for (const step of intervals) {
    const pc = (parsed.rootPc + step) % 12;
    if (!IS_BLACK[pc]) {
      allowed[pc * 3 + SlotType.NAT] = 1;
    } else {
      allowed[pc * 3 + laneForBlack] = 1;
    }
  }

  // Safety: only keep valid spellings
  for (let pc = 0; pc < 12; pc++) {
    for (let slot = 0; slot <= 2; slot++) {
      const vid = pc * 3 + slot;
      if (allowed[vid] === 1 && !isValidSpelling(pc as any, slot as any)) allowed[vid] = 0;
    }
  }

  return allowed;
}
