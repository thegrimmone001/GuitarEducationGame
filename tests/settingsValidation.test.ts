import { describe, expect, it } from "vitest";
import { validateGameSettings } from "../src/app/settingsValidation";
import { Difficulty, MatchType, ModeId, PlayType, type GameSettings } from "../src/shell/types";

function mk(): GameSettings {
  return {
    modeId: ModeId.FRETBOARD,
    playType: PlayType.SINGLE,
    matchType: MatchType.BLACKOUT,
    difficulty: Difficulty.MEDIUM,
    fixedRoundsTotal: 3,
    timers: { turnSec: 15, intermissionSec: 5 },
    mode3SpellingPolicy: "strict",
    domain: { fretCount: 13, minFret: 0, maxFret: 12, enabledStrings: [true, true, true, true, true, true] },
    feedback: {
      samEnabled: true,
      samDurationMs: 900,
      samRevealMode: "single",
      claimLabelMode: "off",
      claimLabelDurationMs: 900,
      samIncludeLabel: true,
    },
    steal: {
      tokenCap: 10,
      globalStealOnExhausted: true,
      enharmonicOppositeStealBonus: 5,
      breakConnectMaxTierBonus: 25,
    },
    accessibility: { colorBlindMode: true },
    dev: { enabled: false, paintEnabled: false, paintPlayerIndex: 0, paintLane: "prompt", paintMode: "paint" },
    notation: { view: "staffTab", pitch: "written" },
    promptProfileId: "chromatic",
    noteVisibility: "all",
    accidentalView: "both",
    displayMode: "names",
    tritoneStyle: "plusDim",
    rootNote: "C",
    uiMode: "m4",
    startTokens: 0,
    surfaceLayers: { view: true, asked: true, answered: true },
  } as any;
}

describe("settingsValidation", () => {
  it("accepts a valid settings object", () => {
    const r = validateGameSettings(mk());
    expect(r.ok).toBe(true);
  });

  it("rejects missing required fields", () => {
    const s = mk();
    (s as any).promptProfileId = "";
    (s as any).rootNote = "";
    const r = validateGameSettings(s);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.join(" ")).toContain("promptProfileId");
      expect(r.errors.join(" ")).toContain("rootNote");
    }
  });

  it("rejects inconsistent fretCount", () => {
    const s = mk();
    s.domain.fretCount = 99 as any;
    const r = validateGameSettings(s);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.join(" ")).toContain("fretCount");
  });
});
