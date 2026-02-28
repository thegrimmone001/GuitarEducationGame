export enum ModeId {
  FRETBOARD = "mode1_fretboard",
  STAFF = "mode2_staff",
  TAB = "mode3_tab",
  // Legacy value retained for backward compatibility, but the project lexicon
  // no longer uses the term "combined". This mode represents multi-surface
  // play (staff + tab + fretboard) controlled by Display/Prompt/Mark settings.
  STAFF_TAB_FRET = "mode4_combined",
  // Mode 5: Staff + Tab (no fretboard) - per GEG-030 specification
  STAFF_TAB = "mode5_staff_tab",
}

export enum PlayType {
  SINGLE = "single",
  MULTI = "multi",
}

export enum MatchType {
  TIMED_TOTAL = "timed_total",
  TARGET_SCORE = "target_score",
  FIXED_ROUNDS = "fixed_rounds",
  BLACKOUT = "blackout",
}

export enum Difficulty {
  LEARNING = "learning",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum SlotType {
  NAT = 0,
  SHR = 1, // LEFT half
  FLT = 2, // RIGHT half
}

export type PlayerId = number; // 0..15
export type PitchClass = number; // 0..11

export interface NoteVariant {
  pitchClass: PitchClass;
  spelling: SlotType;
}
export type VariantId = number; // 0..35

export interface DomainSettings {
  fretCount: number;
  minFret: number;
  maxFret: number;
  enabledStrings: boolean[]; // length 6
}

export interface FeedbackSettings {
  samEnabled: boolean;
  samDurationMs: number;
  // Controls how many correct targets are revealed during a SAM pulse.
  // "single": show one actionable target (default)
  // "all": show all actionable targets for the prompt variant
  samRevealMode: "single" | "all";
  claimLabelMode: "persist" | "fade" | "flash" | "off";
  claimLabelDurationMs: number;
  samIncludeLabel: boolean;
}

export interface StealSettings {
  tokenCap: number;
  globalStealOnExhausted: boolean;
  enharmonicOppositeStealBonus: number; // +5
  breakConnectMaxTierBonus: number; // +25
}

export interface AccessibilitySettings {
  colorBlindMode: boolean; // ON by default
}

// Developer / exploration helpers.
// These are intentionally NOT part of normal gameplay balance; they exist to
// speed up testing of future features (chords, scales, complex shape scoring).
export interface DevSettings {
  enabled: boolean;
  // When enabled, clicks on the fretboard paint/erase claims instead of attempting normal gameplay input.
  // (Dev/Test mode can be enabled without forcing paint mode.)
  paintEnabled: boolean;
  // Which player index to paint as when test mode is enabled.
  paintPlayerIndex: number;
  // Which lane to paint into. "prompt" uses the current prompt spelling lane.
  paintLane: "prompt" | "nat" | "shr" | "flt";
  // Paint claims or erase claims.
  paintMode: "paint" | "erase";
}

export interface GameSettings {
  modeId: ModeId;
  playType: PlayType;
  matchType: MatchType;
  difficulty: Difficulty;

  // Used when matchType === FIXED_ROUNDS (set before starting a match).
  fixedRoundsTotal: number;

  // UI-controlled timers.
  // The engine is deterministic and never ticks time; the UI drives TIMEOUT actions.
  timers: {
    // Multiplayer: per-turn countdown.
    // Single player: time-to-complete (stopwatch) by default; turnSec is used only for multiplayer.
    turnSec: number;
    // Delay overlay between turns (multiplayer only).
    intermissionSec: number;
  };

  // Mode 3 (when STAFF is required) spelling policy.
  // strict: staff accidental must match the prompt spelling for black keys; white keys must be natural.
  // enharmonic: any spelling that yields the correct pitch class is accepted (e.g., C# or Db).
  mode3SpellingPolicy: 'strict' | 'enharmonic';

  domain: DomainSettings;
  feedback: FeedbackSettings;
  steal: StealSettings;
  accessibility: AccessibilitySettings;
  dev: DevSettings;

  // Notation rendering preferences (UI only; does not change game rules).
  notation?: {
    view: "staffTab" | "staff" | "tab";
    pitch: "written" | "concert";
  };

  promptProfileId: string; // e.g. "chromatic", "key:G:maj", "scale:E:min:flats"
}

export interface PlayerProfile {
  id: PlayerId;
  name: string;
  colorId: number;
  patternId: number;
}

export interface BoardLanes {
  owner: [Int16Array, Int16Array, Int16Array];
  connectClaimed: [Uint8Array, Uint8Array, Uint8Array];
  vulnerable: [Uint8Array, Uint8Array, Uint8Array];
  claimedThisTurn: [Uint8Array, Uint8Array, Uint8Array];
}

export interface VariantMeta {
  allowed: Uint8Array; // [36]
  // Total number of eligible cells per variant for the current domain + prompt profile.
  // This is stable within a match and is used to clamp dev/test painting operations.
  requiredByVariant: Int16Array; // [36]
  requiredTotal: number;
  claimedRequired: number;
  unclaimedByVariant: Int16Array; // [36]
}

export interface TurnStats {
  correctCount: number;
  wrongCount: number;
  tries: number;
  streakCount: number;
  streakTier: number;
  breakBonusTier: number;
}

export interface PlayerState {
  profile: PlayerProfile;
  score: number;
  tokenCount: number;
  turnsWithoutScore: number;

  lastClaimStack: Int32Array;
  lastClaimStackSize: number;
}

export type Phase = "TITLE" | "IN_MATCH" | "INTERMISSION" | "LAST_CHANCE" | "RESULTS";

export interface PromptState {
  // Current, player-facing prompt spelling.
  // (No enharmonic toggling: in chromatic mode the generator can still produce
  // both spellings over time, and the prompt spelling always defines scoring.)
  variantId: VariantId;
}

export interface LastChanceState {
  active: boolean;
  order: Int16Array; // player indices in last-chance turn order
  pos: number; // index into order
}

export interface GameState {
  settings: GameSettings;
  phase: Phase;

  players: PlayerState[];
  currentPlayer: number;
  roundIndex: number;
  lastChance: LastChanceState;

  // Total turns started in this match instance (includes last-chance turns).
  turnCounter: number;

  cellCount: number;
  fretCount: number;
  board: BoardLanes;
  cellPitchClass: Uint8Array;
  domainCellEnabled: Uint8Array;

  variants: VariantMeta;

  turn: TurnStats;
  prompt: PromptState;

  rngSeed: number;
}

export interface GhostTarget {
  cellIndex: number;
  slot: SlotType;
  variantId: VariantId;
}

export type Effect =
  | {
      type: "FEEDBACK_PULSE";
      playerId: PlayerId;
      variantId: VariantId;
      durationMs: number;
      ghost: GhostTarget | null;
      // Optional multi-target reveal (used when samRevealMode === "all").
      ghosts?: GhostTarget[];
      scoreDelta: number;
      includeLabel: boolean;
    }
  | { type: "TURN_STARTED"; playerId: PlayerId }
  | { type: "STREAK_CALLOUT"; playerId: PlayerId; message: string }
  | { type: "FIRE_MODE"; playerId: PlayerId; enabled: boolean }
  | { type: "TURN_ENDED"; playerId: PlayerId; nextPlayerId?: PlayerId }
  | { type: "BLACKOUT_COMPLETE" }
  | { type: "ROUND_COMPLETE"; completedRound: number; totalRounds: number }
  | { type: "LAST_CHANCE_STARTED"; totalRounds: number }
  | { type: "MATCH_COMPLETE"; roundsCompleted: number; totalRounds?: number }
  | { type: "PROMPT_CHANGED"; variantId: VariantId };

export type Action =
  | { type: "INIT_MATCH"; settings: GameSettings; players: PlayerProfile[]; seed: number }
  | { type: "UPDATE_SETTINGS"; settings: GameSettings }
  | { type: "START_TURN" }
  // Board taps are full-size targets, consistent across naturals and accidentals.
  // Sharp/flat scoring is determined solely by the current prompt spelling.
  | { type: "TAP_CELL"; stringIndex: number; fretIndex: number }
  | { type: "STEAL_CELL"; stringIndex: number; fretIndex: number }
  // Easy assist: reveal a correct target (costs points and ends the turn).
  | { type: "USE_HINT" }
  // Dev/testing helpers (only active when settings.dev.enabled is true).
  | { type: "DEV_SET_CURRENT_PLAYER"; playerIndex: number }
  | { type: "DEV_SET_PAINT"; patch: Partial<DevSettings> }
  | { type: "DEV_FORCE_PHASE"; phase: Phase }
  | { type: "DEV_PLACE"; stringIndex: number; fretIndex: number; lane: SlotType; ownerPlayerIndex: number; set: 0 | 1 }
  | { type: "DEV_CLEAR_BOARD" }
  | { type: "DEV_END_TURN" }
  // Dev/learning helper: directly set the current prompt (useful for rail-driven practice).
  | { type: "DEV_SET_PROMPT"; variantId: VariantId }
  | { type: "TIMEOUT" }
  | { type: "END_MATCH" };
