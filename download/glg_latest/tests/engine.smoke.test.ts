import { describe, expect, it } from "vitest";
import { reducer } from "../src/shell/engineReducer";
import { Difficulty, MatchType, ModeId, PlayType, type GameSettings, type PlayerProfile } from "../src/shell/types";

function baseSettings(): GameSettings {
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

function p1(): PlayerProfile[] {
  return [{ id: 0, name: "P1", colorId: 0, patternId: 0 }];
}

describe("engine smoke", () => {
  it("initializes and starts a turn without throwing", () => {
    const settings = baseSettings();
    const init = reducer(null, { type: "INIT_MATCH", settings, players: p1(), seed: 123 });
    expect(init.state).toBeTruthy();
    expect(init.effects).toBeTruthy();

    const started = reducer(init.state, { type: "START_TURN" });
    expect(started.state.phase).toBeTruthy();

    // tap a few cells; should never throw and state should remain valid
    const tap1 = reducer(started.state, { type: "TAP_CELL", stringIndex: 0, fretIndex: 0 });
    const tap2 = reducer(tap1.state, { type: "TAP_CELL", stringIndex: 2, fretIndex: 3 });
    const tap3 = reducer(tap2.state, { type: "TAP_CELL", stringIndex: 5, fretIndex: 5 });

    expect(tap3.state).toBeTruthy();
    expect(Array.isArray(tap3.effects)).toBe(true);
  });

  it("accepts UPDATE_SETTINGS deterministically", () => {
    const settings = baseSettings();
    const init = reducer(null, { type: "INIT_MATCH", settings, players: p1(), seed: 999 });
    const s2 = { ...settings, difficulty: Difficulty.EASY };
    const upd = reducer(init.state, { type: "UPDATE_SETTINGS", settings: s2 as any });
    expect(upd.state.settings.difficulty).toBe(Difficulty.EASY);
  });
});
