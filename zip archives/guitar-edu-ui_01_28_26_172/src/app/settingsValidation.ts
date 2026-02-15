import type { GameSettings } from "../shell/types";

export type SettingsValidationResult = { ok: true } | { ok: false; errors: string[] };

export function validateGameSettings(s: GameSettings): SettingsValidationResult {
  const errors: string[] = [];

  // domain sanity
  if (typeof s.domain?.minFret !== "number" || typeof s.domain?.maxFret !== "number") {
    errors.push("domain.minFret/maxFret must be numbers");
  } else {
    if (s.domain.minFret < 0) errors.push("domain.minFret must be >= 0");
    if (s.domain.maxFret < s.domain.minFret) errors.push("domain.maxFret must be >= minFret");
  }

  if (typeof s.domain?.fretCount !== "number" || s.domain.fretCount <= 0) {
    errors.push("domain.fretCount must be a positive number");
  } else if (typeof s.domain?.minFret === "number" && typeof s.domain?.maxFret === "number") {
    const expected = (s.domain.maxFret - s.domain.minFret) + 1;
    if (s.domain.fretCount !== expected) errors.push(`domain.fretCount must equal (maxFret-minFret)+1 (${expected})`);
  }

  if (!Array.isArray(s.domain?.enabledStrings) || s.domain.enabledStrings.length === 0) {
    errors.push("domain.enabledStrings must be a non-empty boolean[]");
  }

  // required ids
  // NOTE: modeId remains in the settings model for backward compatibility but is not a canonical
  // user-facing concept. Validation only ensures it is present as a stable internal key.
  if (!s.modeId) errors.push("modeId is required");
  if (!s.playType) errors.push("playType is required");
  if (!s.matchType) errors.push("matchType is required");
  if (!s.difficulty) errors.push("difficulty is required");

  // prompt profile
  if (!s.promptProfileId) errors.push("promptProfileId is required");

  // notation preferences are optional; if provided they must be complete
  if (s.notation) {
    if (!s.notation.view) errors.push("notation.view is required when notation is provided");
    if (!s.notation.pitch) errors.push("notation.pitch is required when notation is provided");
  }

  return errors.length ? { ok: false, errors } : { ok: true };
}
