/**
 * Guitar Education Game - Type Definitions
 *
 * This module defines all TypeScript types for the game engine.
 * Types are organized by domain: Core, Game State, Actions, Effects, and Settings.
 *
 * @module guitar-game/types
 */

// ============================================================================
// CORE TYPES
// ============================================================================

/**
 * Game mode identifiers
 * - FRETBOARD: Note finder using guitar fretboard visualization
 * - STAFF: Note finder using standard music staff notation
 * - TAB: Note finder using guitar tablature
 * - COMBINED: Multi-surface training mode
 */
export enum ModeId {
  FRETBOARD = "mode1_fretboard",
  STAFF = "mode2_staff",
  TAB = "mode3_tab",
  COMBINED = "mode4_combined",
}

/**
 * Play type determines scoring and competition mechanics
 * - SINGLE: Time-based completion, no competitive scoring
 * - MULTI: Turn-based with territory capture and tokens
 */
export enum PlayType {
  SINGLE = "single",
  MULTI = "multi",
}

/**
 * Match end condition
 * - BLACKOUT: Game ends when all cells are claimed
 * - FIXED_ROUNDS: Game ends after N complete board cycles
 */
export enum MatchType {
  TIMED_TOTAL = "timed_total",
  TARGET_SCORE = "target_score",
  FIXED_ROUNDS = "fixed_rounds",
  BLACKOUT = "blackout",
}

/**
 * Difficulty affects information visibility and assist features
 * - LEARNING: Full visibility, hints available, no time pressure
 * - EASY: Labels after claim, hints available
 * - MEDIUM: Limited hints, standard timers
 * - HARD: No hints, strict timing
 */
export enum Difficulty {
  LEARNING = "learning",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

/**
 * Slot type for note spellings
 * - NAT: Natural notes (C, D, E, F, G, A, B)
 * - SHR: Sharp spelling (left half of enharmonic cell)
 * - FLT: Flat spelling (right half of enharmonic cell)
 */
export enum SlotType {
  NAT = 0,
  SHR = 1,
  FLT = 2,
}

/**
 * Game phases for state machine
 */
export type Phase =
  | "TITLE"
  | "IN_MATCH"
  | "BONUS"
  | "INTERMISSION"
  | "LAST_CHANCE"
  | "RESULTS";

// ============================================================================
// PLAYER TYPES
// ============================================================================

/**
 * Player identifier (0-15 for multiplayer support)
 */
export type PlayerId = number;

/**
 * Pitch class (0-11 representing C through B)
 */
export type PitchClass = number;

/**
 * Player display configuration
 */
export interface PlayerProfile {
  /** Unique player identifier */
  id: PlayerId;
  /** Display name (max 16 characters) */
  name: string;
  /** Color index for player avatar/token */
  colorId: number;
  /** Pattern index for color-blind accessibility */
  patternId: number;
}

/**
 * Runtime player state during a match
 */
export interface PlayerState {
  /** Player profile reference */
  profile: PlayerProfile;
  /** Current score */
  score: number;
  /** Available steal tokens */
  tokenCount: number;
  /** Consecutive turns without scoring (for vulnerability) */
  turnsWithoutScore: number;
  /** Stack of claimed cell indices (for vulnerability marking) */
  lastClaimStack: Int32Array;
  /** Current stack size */
  lastClaimStackSize: number;
}

// ============================================================================
// NOTE VARIANT TYPES
// ============================================================================

/**
 * A note variant combines pitch class with spelling
 */
export interface NoteVariant {
  /** Pitch class 0-11 */
  pitchClass: PitchClass;
  /** Spelling: natural, sharp, or flat */
  spelling: SlotType;
}

/**
 * Variant ID is encoded as (pitchClass * 3 + slotType)
 * Range: 0-35 (12 pitch classes × 3 spellings)
 * Note: Not all combinations are valid (e.g., C-flat is invalid)
 */
export type VariantId = number;

// ============================================================================
// DOMAIN SETTINGS
// ============================================================================

/**
 * Fretboard domain configuration
 */
export interface DomainSettings {
  /** Total frets including open (0) position */
  fretCount: number;
  /** Minimum active fret (inclusive) */
  minFret: number;
  /** Maximum active fret (inclusive) */
  maxFret: number;
  /** Which strings are enabled (index 0 = high E, index 5 = low E) */
  enabledStrings: [boolean, boolean, boolean, boolean, boolean, boolean];
}

/**
 * Feedback and reveal settings
 */
export interface FeedbackSettings {
  /** Show After Miss - reveal correct answer on wrong attempt */
  samEnabled: boolean;
  /** Duration of SAM reveal in milliseconds */
  samDurationMs: number;
  /** How many targets to reveal during SAM */
  samRevealMode: "single" | "all";
  /** How to display claimed cell labels */
  claimLabelMode: "persist" | "fade" | "flash" | "off";
  /** Duration for fade/flash modes */
  claimLabelDurationMs: number;
  /** Include note label in SAM reveal */
  samIncludeLabel: boolean;
}

/**
 * Stealing mechanics configuration
 */
export interface StealSettings {
  /** Maximum tokens a player can hold */
  tokenCap: number;
  /** Allow steals when all cells for a note are claimed */
  globalStealOnExhausted: boolean;
  /** Bonus points for stealing with opposite enharmonic */
  enharmonicOppositeStealBonus: number;
  /** Maximum bonus for breaking connect segments */
  breakConnectMaxTierBonus: number;
}

/**
 * Accessibility configuration
 */
export interface AccessibilitySettings {
  /** Enable patterns for color-blind users */
  colorBlindMode: boolean;
}

/**
 * Developer/testing helpers (disabled in production)
 */
export interface DevSettings {
  /** Enable dev mode */
  enabled: boolean;
  /** Which player to paint as in dev mode */
  paintPlayerIndex: number;
  /** Which lane to paint into */
  paintLane: "prompt" | "nat" | "shr" | "flt";
  /** Paint or erase mode */
  paintMode: "paint" | "erase";
  /** Force bonus stage after turn end (for testing) */
  forceBonusOnTurnEnd?: boolean;
}

/**
 * Timer configuration
 */
export interface TimerSettings {
  /** Per-turn countdown in milliseconds */
  turnMs: number;
  /** Delay between turns in multiplayer */
  intermissionMs: number;
}

/**
 * Complete game settings
 */
export interface GameSettings {
  /** Active game mode */
  modeId: ModeId;
  /** Single or multiplayer */
  playType: PlayType;
  /** Match end condition */
  matchType: MatchType;
  /** Current difficulty level */
  difficulty: Difficulty;
  /** Number of rounds (for FIXED_ROUNDS mode) */
  fixedRoundsTotal: number;
  /** Timer settings */
  timers: TimerSettings;
  /** Fretboard domain settings */
  domain: DomainSettings;
  /** Feedback settings */
  feedback: FeedbackSettings;
  /** Stealing mechanics */
  steal: StealSettings;
  /** Accessibility options */
  accessibility: AccessibilitySettings;
  /** Developer tools */
  dev: DevSettings;
  /** Prompt profile ID (e.g., "chromatic", "key:G:maj") */
  promptProfileId: string;
}

// ============================================================================
// BOARD STATE TYPES
// ============================================================================

/**
 * Board lanes for each spelling type
 * Each array represents ownership/state for all cells
 */
export interface BoardLanes {
  /** Owner player ID per cell (-1 = unclaimed) */
  owner: [Int16Array, Int16Array, Int16Array];
  /** Connect segment markers (bit flags for 4 directions) */
  connectClaimed: [Uint8Array, Uint8Array, Uint8Array];
  /** Vulnerability markers (1 = vulnerable to steal) */
  vulnerable: [Uint8Array, Uint8Array, Uint8Array];
  /** Cells claimed this turn (for connect detection) */
  claimedThisTurn: [Uint8Array, Uint8Array, Uint8Array];
}

/**
 * Variant metadata for prompt generation
 */
export interface VariantMeta {
  /** Which variants are allowed by current settings */
  allowed: Uint8Array;
  /** Required cells per variant */
  requiredByVariant: Int16Array;
  /** Total required cells */
  requiredTotal: number;
  /** Currently claimed required cells */
  claimedRequired: number;
  /** Unclaimed cells per variant */
  unclaimedByVariant: Int16Array;
}

/**
 * Per-turn statistics
 */
export interface TurnStats {
  /** Correct answers this turn */
  correctCount: number;
  /** Wrong answers this turn */
  wrongCount: number;
  /** Total attempts */
  tries: number;
  /** Current streak count */
  streakCount: number;
  /** Streak tier (affects multiplier) */
  streakTier: number;
  /** Break bonus tier */
  breakBonusTier: number;
}

/**
 * Bonus stage state
 */
export interface BonusState {
  /** Is bonus stage active */
  active: boolean;
  /** Player who earned the bonus */
  playerIndex: number;
  /** Next player after bonus ends */
  nextPlayerIndex: number;
  /** How bonus was triggered */
  reason: "dev_force" | "end_turn";
}

/**
 * Current prompt state
 */
export interface PromptState {
  /** Current prompt variant ID */
  variantId: VariantId;
}

/**
 * Last-chance phase state
 */
export interface LastChanceState {
  /** Is last-chance phase active */
  active: boolean;
  /** Player turn order */
  order: Int16Array;
  /** Current position in order */
  pos: number;
}

/**
 * Complete game state
 */
export interface GameState {
  /** Active settings */
  settings: GameSettings;
  /** Current phase */
  phase: Phase;
  /** Bonus stage state */
  bonus: BonusState;
  /** All players */
  players: PlayerState[];
  /** Current player index */
  currentPlayer: number;
  /** Current round number */
  roundIndex: number;
  /** Last-chance state */
  lastChance: LastChanceState;
  /** Total turns started */
  turnCounter: number;
  /** Total cells */
  cellCount: number;
  /** Fret count */
  fretCount: number;
  /** Board state */
  board: BoardLanes;
  /** Pitch class per cell */
  cellPitchClass: Uint8Array;
  /** Whether each cell is in active domain */
  domainCellEnabled: Uint8Array;
  /** Variant metadata */
  variants: VariantMeta;
  /** Turn statistics */
  turn: TurnStats;
  /** Current prompt */
  prompt: PromptState;
  /** RNG seed for deterministic behavior */
  rngSeed: number;
}

// ============================================================================
// ACTION TYPES
// ============================================================================

/**
 * Ghost target for SAM reveal
 */
export interface GhostTarget {
  /** Cell index */
  cellIndex: number;
  /** Slot type */
  slot: SlotType;
  /** Variant ID */
  variantId: VariantId;
}

/**
 * All possible game actions
 */
export type Action =
  | { type: "INIT_MATCH"; settings: GameSettings; players: PlayerProfile[]; seed: number }
  | { type: "UPDATE_SETTINGS"; settings: GameSettings }
  | { type: "START_TURN" }
  | { type: "END_BONUS" }
  | { type: "TAP_CELL"; stringIndex: number; fretIndex: number }
  | { type: "STEAL_CELL"; stringIndex: number; fretIndex: number }
  | { type: "USE_HINT" }
  | { type: "DEV_SET_CURRENT_PLAYER"; playerIndex: number }
  | { type: "DEV_SET_PAINT"; patch: Partial<DevSettings> }
  | { type: "DEV_FORCE_PHASE"; phase: Phase }
  | { type: "DEV_PLACE"; stringIndex: number; fretIndex: number; lane: SlotType; ownerPlayerIndex: number; set: 0 | 1 }
  | { type: "DEV_CLEAR_BOARD" }
  | { type: "DEV_END_TURN" }
  | { type: "TIMEOUT" }
  | { type: "END_MATCH" };

// ============================================================================
// EFFECT TYPES
// ============================================================================

/**
 * All possible side effects from actions
 */
export type Effect =
  | {
      type: "FEEDBACK_PULSE";
      playerId: PlayerId;
      variantId: VariantId;
      durationMs: number;
      ghost: GhostTarget | null;
      ghosts?: GhostTarget[];
      scoreDelta: number;
      includeLabel: boolean;
    }
  | { type: "STREAK_CALLOUT"; playerId: PlayerId; message: string }
  | { type: "FIRE_MODE"; playerId: PlayerId; enabled: boolean }
  | { type: "TURN_ENDED"; playerId: PlayerId; nextPlayerId?: PlayerId }
  | { type: "BONUS_STARTED"; playerId: PlayerId; reason: "dev_force" | "end_turn" }
  | { type: "BLACKOUT_COMPLETE" }
  | { type: "ROUND_COMPLETE"; completedRound: number; totalRounds: number }
  | { type: "LAST_CHANCE_STARTED"; totalRounds: number }
  | { type: "MATCH_COMPLETE"; roundsCompleted: number; totalRounds?: number }
  | { type: "PROMPT_CHANGED"; variantId: VariantId };

// ============================================================================
// CONSTANTS
// ============================================================================

/** Maximum number of players supported */
export const MAX_PLAYERS = 16;

/** Maximum number of frets (0-24) */
export const MAX_FRETS = 25;

/** Total number of variants (12 pitch classes × 3 spellings) */
export const TOTAL_VARIANTS = 36;

/** Player mark symbols for color-blind mode */
export const PLAYER_MARKS = [
  "●", "▲", "■", "◆", "✚", "✖", "★", "⬢", "⬣", "⬟", "◐", "◑", "◒", "◓", "◍", "⬤",
] as const;

/** Streak tier multipliers */
export const STREAK_MULTIPLIERS = [1, 2, 3, 5, 10] as const;

/** Points penalty for using hint */
export const HINT_PENALTY_POINTS = 5;

/** Connect bonus base points */
export const CONNECT_BONUS_BASE = 25;

/** Vulnerability threshold (turns without score) */
export const VULNERABILITY_THRESHOLD = 3;
