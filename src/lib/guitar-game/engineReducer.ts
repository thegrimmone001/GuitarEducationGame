/**
 * Guitar Education Game - Engine Reducer
 *
 * Core game state management using a Redux-like reducer pattern.
 * Handles all game actions and produces state updates + side effects.
 *
 * @module guitar-game/engineReducer
 */

import {
  Action,
  Effect,
  GameSettings,
  GameState,
  PlayerProfile,
  PlayerState,
  SlotType,
  VariantId,
  GhostTarget,
  Difficulty,
  ModeId,
  PlayType,
  Phase,
  BoardLanes,
  VariantMeta,
  TurnStats,
  MatchType,
  STREAK_MULTIPLIERS,
  HINT_PENALTY_POINTS,
  CONNECT_BONUS_BASE,
  VULNERABILITY_THRESHOLD,
  TOTAL_VARIANTS,
  MAX_PLAYERS,
} from "./types";
import {
  fromVariantId,
  isValidSpelling,
  pitchClassAt,
  toVariantId,
  cellIndexOf,
  stringOf,
  fretOf,
} from "./music";
import { stableStringify, fnv1a32, DeterministicRNG } from "./hash";
import { buildAllowedVariantsFromSettings } from "./promptProfiles";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get streak tier from consecutive correct answers
 */
function tierFromStreak(streak: number): number {
  if (streak >= 20) return 4;
  if (streak >= 10) return 3;
  if (streak >= 6) return 2;
  if (streak >= 3) return 1;
  return 0;
}

/**
 * Get milestone message for streak count
 */
function milestoneMessage(streak: number): string | null {
  if (streak === 3) return "3 in a row!";
  if (streak === 6) return "6 in a row!";
  if (streak === 8) return "8 in a row — HEATING UP!";
  if (streak === 10) return "HOT STREAK!";
  if (streak === 20) return "YOU'RE ON FIRE!";
  return null;
}

/**
 * Check if a cell is within the active domain
 */
function isCellInDomain(
  state: GameState,
  stringIndex: number,
  fretIndex: number
): boolean {
  if (stringIndex < 0 || stringIndex >= 6) return false;
  if (fretIndex < 0 || fretIndex >= state.fretCount) return false;
  const idx = cellIndexOf(stringIndex, fretIndex, state.fretCount);
  return state.domainCellEnabled[idx] === 1;
}

/**
 * Fill a Uint8Array with a value
 */
function setAll(arr: Uint8Array, v: number): void {
  arr.fill(v);
}

// ============================================================================
// PLAYER STATE MANAGEMENT
// ============================================================================

/**
 * Create initial player state
 */
function createPlayerState(profile: PlayerProfile): PlayerState {
  return {
    profile,
    score: 0,
    tokenCount: 0,
    turnsWithoutScore: 0,
    lastClaimStack: new Int32Array(1024),
    lastClaimStackSize: 0,
  };
}

/**
 * Push a claim onto the player's stack (for vulnerability tracking)
 */
function pushClaimStack(ps: PlayerState, packed: number): void {
  if (ps.lastClaimStackSize >= ps.lastClaimStack.length) {
    // Expand array if needed
    const next = new Int32Array(ps.lastClaimStack.length * 2);
    next.set(ps.lastClaimStack);
    ps.lastClaimStack = next;
  }
  // Shift existing entries down
  for (let i = Math.min(ps.lastClaimStackSize, ps.lastClaimStack.length - 2); i >= 0; i--) {
    ps.lastClaimStack[i + 1] = ps.lastClaimStack[i];
  }
  ps.lastClaimStack[0] = packed;
  ps.lastClaimStackSize++;
}

/**
 * Pack slot and cell index into a single number
 */
function packSlot(cellCount: number, slot: SlotType, cellIndex: number): number {
  return slot * cellCount + cellIndex;
}

/**
 * Unpack slot and cell index from packed number
 */
function unpackSlot(
  cellCount: number,
  packed: number
): { slot: SlotType; cellIndex: number } {
  const slot = Math.floor(packed / cellCount) as SlotType;
  const cellIndex = packed % cellCount;
  return { slot, cellIndex };
}

// ============================================================================
// STATE INITIALIZATION
// ============================================================================

/**
 * Create the initial game state
 */
function createInitialState(
  settings: GameSettings,
  profiles: PlayerProfile[],
  seed: number
): GameState {
  // Normalize settings
  const fixedRoundsTotal = Math.max(
    1,
    Math.min(50, settings.fixedRoundsTotal ?? 1)
  );

  const fretCount = Math.max(1, Number(settings.domain.fretCount) || 1);
  const maxFret = Math.min(fretCount - 1, Number(settings.domain.maxFret) || 0);
  const minFret = Math.max(0, Math.min(maxFret, Number(settings.domain.minFret) || 0));

  const normalized: GameSettings = {
    ...settings,
    matchType: MatchType.BLACKOUT,
    fixedRoundsTotal,
    domain: {
      ...settings.domain,
      fretCount,
      minFret,
      maxFret,
    },
  };

  const cellCount = 6 * fretCount;

  // Initialize board lanes
  const owner: BoardLanes["owner"] = [
    new Int16Array(cellCount),
    new Int16Array(cellCount),
    new Int16Array(cellCount),
  ];
  owner[0].fill(-1);
  owner[1].fill(-1);
  owner[2].fill(-1);

  const connectClaimed: BoardLanes["connectClaimed"] = [
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
  ];

  const vulnerable: BoardLanes["vulnerable"] = [
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
  ];

  const claimedThisTurn: BoardLanes["claimedThisTurn"] = [
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
  ];

  // Compute pitch classes and domain enablement
  const cellPitchClass = new Uint8Array(cellCount);
  const domainCellEnabled = new Uint8Array(cellCount);

  for (let s = 0; s < 6; s++) {
    for (let f = 0; f < fretCount; f++) {
      const idx = cellIndexOf(s, f, fretCount);
      cellPitchClass[idx] = pitchClassAt(s, f);
      const inFretRange =
        f >= normalized.domain.minFret && f <= normalized.domain.maxFret;
      const inString = normalized.domain.enabledStrings[s] === true;
      domainCellEnabled[idx] = inFretRange && inString ? 1 : 0;
    }
  }

  // Build allowed variants
  const allowed = buildAllowedVariantsFromSettings(normalized);

  // Count required cells per variant
  const requiredByVariant = new Int16Array(TOTAL_VARIANTS);
  const unclaimedByVariant = new Int16Array(TOTAL_VARIANTS);
  let requiredTotal = 0;

  for (let idx = 0; idx < cellCount; idx++) {
    if (domainCellEnabled[idx] === 0) continue;
    const pc = cellPitchClass[idx];

    for (let lane = 0 as SlotType; lane <= 2; lane++) {
      const vid = pc * 3 + lane;
      if (allowed[vid] !== 1) continue;
      if (!isValidSpelling(pc as number, lane)) continue;
      requiredTotal++;
      requiredByVariant[vid]++;
      unclaimedByVariant[vid]++;
    }
  }

  // Initialize players
  const players: PlayerState[] = profiles.slice(0, MAX_PLAYERS).map(createPlayerState);

  // Build variant metadata
  const variants: VariantMeta = {
    allowed,
    requiredByVariant,
    requiredTotal,
    claimedRequired: 0,
    unclaimedByVariant,
  };

  // Build turn stats
  const turn: TurnStats = {
    correctCount: 0,
    wrongCount: 0,
    tries: 0,
    streakCount: 0,
    streakTier: 0,
    breakBonusTier: 0,
  };

  return {
    settings: normalized,
    phase: "IN_MATCH",
    bonus: {
      active: false,
      playerIndex: 0,
      nextPlayerIndex: 0,
      reason: "end_turn",
    },
    players,
    currentPlayer: 0,
    roundIndex: 1,
    lastChance: { active: false, order: new Int16Array(0), pos: 0 },
    turnCounter: 0,
    cellCount,
    fretCount,
    board: { owner, connectClaimed, vulnerable, claimedThisTurn },
    cellPitchClass,
    domainCellEnabled,
    variants,
    turn,
    prompt: { variantId: 0 },
    rngSeed: seed | 0,
  };
}

// ============================================================================
// PROMPT GENERATION
// ============================================================================

/**
 * Check if a variant is actionable for a player
 * (has unclaimed targets or legal steal opportunities)
 */
function variantIsActionableForPlayer(
  state: GameState,
  variantId: VariantId,
  playerIdx: number
): boolean {
  const v = fromVariantId(variantId);
  if (!isValidSpelling(v.pitchClass, v.spelling)) return false;
  if (state.variants.allowed[variantId] !== 1) return false;

  const pid = state.players[playerIdx]?.profile.id ?? playerIdx;
  const playerHasToken =
    (state.players[playerIdx]?.tokenCount ?? 0) > 0;

  // Check for unclaimed cells
  if (state.variants.unclaimedByVariant[variantId] > 0) return true;

  // Check for steal opportunities
  const canStealWhenExhausted =
    state.settings.steal.globalStealOnExhausted &&
    state.variants.unclaimedByVariant[variantId] === 0;
  if (!playerHasToken) return false;

  for (let idx = 0; idx < state.cellPitchClass.length; idx++) {
    if (state.domainCellEnabled[idx] === 0) continue;
    if (state.cellPitchClass[idx] !== v.pitchClass) continue;
    const owner = state.board.owner[v.spelling][idx];
    if (owner === -1 || owner === pid) continue;

    const vulnerable = state.board.vulnerable[v.spelling][idx];
    if (vulnerable) return true;
    if (canStealWhenExhausted) return true;
  }

  return false;
}

/**
 * Pick the next prompt variant for a player
 */
function pickNextPromptVariant(
  state: GameState,
  playerIdx: number
): { state: GameState; variantId: VariantId | null } {
  const eligible: number[] = [];

  for (let vid = 0; vid < TOTAL_VARIANTS; vid++) {
    if (variantIsActionableForPlayer(state, vid as VariantId, playerIdx)) {
      eligible.push(vid);
    }
  }

  if (eligible.length === 0) {
    return { state, variantId: null };
  }

  const rng = new DeterministicRNG(state.rngSeed);
  const idx = rng.nextInt(eligible.length);

  return {
    state: { ...state, rngSeed: rng.getSeed() },
    variantId: eligible[idx] as VariantId,
  };
}

/**
 * Check if a player has any actionable prompts
 */
function playerHasAnyActionablePrompt(
  state: GameState,
  playerIdx: number
): boolean {
  for (let vid = 0; vid < TOTAL_VARIANTS; vid++) {
    if (variantIsActionableForPlayer(state, vid as VariantId, playerIdx)) {
      return true;
    }
  }
  return false;
}

// ============================================================================
// GHOST TARGET SELECTION (FOR SAM)
// ============================================================================

/**
 * Pick a ghost target for SAM reveal
 */
function pickGhostTarget(
  state: GameState,
  variantId: VariantId,
  playerIdx: number
): GhostTarget | null {
  if (!state.settings.feedback.samEnabled) return null;

  const ps = state.players[playerIdx];
  const pid = ps.profile.id;
  const v = fromVariantId(variantId);
  const pc = v.pitchClass;
  const lane = v.spelling;
  const owners = state.board.owner[lane];
  const vuln = state.board.vulnerable[lane];

  // Prefer unclaimed cells
  for (let idx = 0; idx < state.cellCount; idx++) {
    if (state.domainCellEnabled[idx] === 0) continue;
    if (state.cellPitchClass[idx] !== pc) continue;
    if (!isValidSpelling(pc, lane)) continue;
    if (owners[idx] === -1) {
      return { cellIndex: idx, slot: lane, variantId };
    }
  }

  // Then vulnerable cells (if player has tokens)
  if (ps.tokenCount > 0) {
    for (let idx = 0; idx < state.cellCount; idx++) {
      if (state.domainCellEnabled[idx] === 0) continue;
      if (state.cellPitchClass[idx] !== pc) continue;
      if (!isValidSpelling(pc, lane)) continue;
      const o = owners[idx];
      if (o === -1 || o === pid) continue;
      if (vuln[idx] === 1) {
        return { cellIndex: idx, slot: lane, variantId };
      }
    }

    // Global steal if exhausted
    const laneVid = toVariantId(pc, lane);
    const exhausted = state.variants.unclaimedByVariant[laneVid] === 0;
    if (exhausted && state.settings.steal.globalStealOnExhausted) {
      for (let idx = 0; idx < state.cellCount; idx++) {
        if (state.domainCellEnabled[idx] === 0) continue;
        if (state.cellPitchClass[idx] !== pc) continue;
        if (!isValidSpelling(pc, lane)) continue;
        const o = owners[idx];
        if (o === -1 || o === pid) continue;
        return { cellIndex: idx, slot: lane, variantId };
      }
    }
  }

  return null;
}

// ============================================================================
// BOARD STATE MANAGEMENT
// ============================================================================

/**
 * Clear claimed-this-turn markers
 */
function clearClaimedThisTurn(state: GameState): void {
  setAll(state.board.claimedThisTurn[0], 0);
  setAll(state.board.claimedThisTurn[1], 0);
  setAll(state.board.claimedThisTurn[2], 0);
}

/**
 * Check if the board is full
 */
function isBoardFull(state: GameState): boolean {
  return state.variants.claimedRequired >= state.variants.requiredTotal;
}

/**
 * Reset board for a new round
 */
function resetBoardForNewRound(state: GameState): void {
  // Clear ownership and markers
  for (let lane = 0 as SlotType; lane <= 2; lane++) {
    state.board.owner[lane].fill(-1);
    setAll(state.board.connectClaimed[lane], 0);
    setAll(state.board.vulnerable[lane], 0);
    setAll(state.board.claimedThisTurn[lane], 0);
  }

  // Clear player history
  for (const ps of state.players) {
    ps.lastClaimStackSize = 0;
    ps.turnsWithoutScore = 0;
  }

  // Recompute variant counts
  state.variants.claimedRequired = 0;
  for (let vid = 0; vid < TOTAL_VARIANTS; vid++) {
    state.variants.unclaimedByVariant[vid] =
      state.variants.requiredByVariant[vid];
  }
}

// ============================================================================
// SCORING
// ============================================================================

/**
 * Get effective tier (max of streak and break bonus)
 */
function effectiveTier(state: GameState): number {
  return Math.max(state.turn.streakTier, state.turn.breakBonusTier);
}

/**
 * Award tokens to a player (capped at tokenCap)
 */
function awardTokens(state: GameState, playerIdx: number, amount: number): void {
  const cap = state.settings.steal.tokenCap;
  const ps = state.players[playerIdx];
  ps.tokenCount = Math.min(cap, ps.tokenCount + amount);
}

/**
 * Claim a cell for a player
 */
function claimSlot(
  state: GameState,
  playerIdx: number,
  lane: SlotType,
  cellIndex: number
): Effect[] {
  const ps = state.players[playerIdx];
  const owners = state.board.owner[lane];

  owners[cellIndex] = ps.profile.id;
  state.board.claimedThisTurn[lane][cellIndex] = 1;

  const pc = state.cellPitchClass[cellIndex];
  const vid = toVariantId(pc, lane);

  if (state.variants.unclaimedByVariant[vid] > 0) {
    state.variants.unclaimedByVariant[vid]--;
    state.variants.claimedRequired++;
  }

  pushClaimStack(ps, packSlot(state.cellCount, lane, cellIndex));

  state.turn.correctCount++;
  state.turn.tries++;
  state.turn.streakCount++;
  state.turn.streakTier = tierFromStreak(state.turn.streakCount);

  const tier = effectiveTier(state);
  ps.score += 1 * STREAK_MULTIPLIERS[tier];

  const fx: Effect[] = [];
  const msg = milestoneMessage(state.turn.streakCount);
  if (msg) {
    fx.push({ type: "STREAK_CALLOUT", playerId: ps.profile.id, message: msg });
    if (state.turn.streakCount === 20) {
      fx.push({ type: "FIRE_MODE", playerId: ps.profile.id, enabled: true });
    }
  }

  return fx;
}

// ============================================================================
// CONNECT SCORING
// ============================================================================

// Connect directions: horizontal, vertical, diag /, diag \
type ConnectDir = { bit: number; ds: number; df: number };
const CONNECT_DIRS: ConnectDir[] = [
  { bit: 1, ds: 0, df: 1 },   // horizontal
  { bit: 2, ds: 1, df: 0 },   // vertical
  { bit: 4, ds: 1, df: 1 },   // diag /
  { bit: 8, ds: -1, df: 1 },  // diag \
];

/**
 * Clear connect markers for a broken cell
 */
function clearConnectMarkersForBrokenCell(
  state: GameState,
  lane: SlotType,
  cellIndex: number,
  ownerId: number,
  mask: number
): void {
  const owners = state.board.owner[lane];
  const cc = state.board.connectClaimed[lane];
  const sStart = stringOf(cellIndex, state.fretCount);
  const fStart = fretOf(cellIndex, state.fretCount);

  for (const d of CONNECT_DIRS) {
    if ((mask & d.bit) === 0) continue;

    // Walk back to segment anchor
    let s0 = sStart;
    let f0 = fStart;
    while (true) {
      const ps = s0 - d.ds;
      const pf = f0 - d.df;
      if (ps < 0 || ps >= 6 || pf < 0 || pf >= state.fretCount) break;
      const pi = cellIndexOf(ps, pf, state.fretCount);
      if (state.domainCellEnabled[pi] === 0) break;
      if (owners[pi] !== ownerId) break;
      s0 = ps;
      f0 = pf;
    }

    // Clear markers forward from anchor
    let curS = s0;
    let curF = f0;
    while (curS >= 0 && curS < 6 && curF >= 0 && curF < state.fretCount) {
      const ci = cellIndexOf(curS, curF, state.fretCount);
      if (state.domainCellEnabled[ci] === 0) break;
      if (owners[ci] !== ownerId) break;
      cc[ci] = cc[ci] & ~d.bit;
      curS += d.ds;
      curF += d.df;
    }
  }
}

/**
 * Evaluate connect bonuses at end of turn
 */
function evalConnectEndOfTurn(
  state: GameState,
  playerIdx: number
): { connectScore: number; tokensEarned: number } {
  const ps = state.players[playerIdx];
  const pid = ps.profile.id;
  let bonus = 0;
  let tokens = 0;

  const visited = new Set<string>();

  for (let lane = 0 as SlotType; lane <= 2; lane++) {
    const owners = state.board.owner[lane];
    const cct = state.board.claimedThisTurn[lane];
    const cc = state.board.connectClaimed[lane];

    for (let idx = 0; idx < state.cellCount; idx++) {
      if (cct[idx] !== 1) continue;
      if (owners[idx] !== pid) continue;
      if (state.domainCellEnabled[idx] === 0) continue;

      for (const d of CONNECT_DIRS) {
        const s0 = stringOf(idx, state.fretCount);
        const f0 = fretOf(idx, state.fretCount);

        // Walk back to anchor
        let anchorS = s0;
        let anchorF = f0;
        while (true) {
          const ps2 = anchorS - d.ds;
          const pf2 = anchorF - d.df;
          if (ps2 < 0 || ps2 >= 6 || pf2 < 0 || pf2 >= state.fretCount) break;
          const pi = cellIndexOf(ps2, pf2, state.fretCount);
          if (state.domainCellEnabled[pi] === 0) break;
          if (owners[pi] !== pid) break;
          anchorS = ps2;
          anchorF = pf2;
        }

        const anchorIdx = cellIndexOf(anchorS, anchorF, state.fretCount);
        const key = `${lane}:${anchorIdx}:${d.ds}:${d.df}`;
        if (visited.has(key)) continue;
        visited.add(key);

        // Collect segment
        const seg: number[] = [];
        let curS = anchorS;
        let curF = anchorF;
        while (curS >= 0 && curS < 6 && curF >= 0 && curF < state.fretCount) {
          const ci = cellIndexOf(curS, curF, state.fretCount);
          if (state.domainCellEnabled[ci] === 0) break;
          if (owners[ci] !== pid) break;
          seg.push(ci);
          curS += d.ds;
          curF += d.df;
        }

        if (seg.length < 4) continue;

        // Count previously claimed
        let countedLen = 0;
        for (const ci of seg) {
          if ((cc[ci] & d.bit) !== 0) countedLen++;
        }

        const isNewSegment = countedLen < 4;
        if (isNewSegment) tokens += 1;
        if (isNewSegment) bonus += CONNECT_BONUS_BASE;

        // Extension bonus
        const prevLenForPoints = Math.max(4, countedLen);
        if (seg.length > prevLenForPoints) {
          bonus += 2 * (seg.length - prevLenForPoints);
        }

        // Mark segment
        for (const ci of seg) {
          cc[ci] = cc[ci] | d.bit;
        }
      }
    }
  }

  return { connectScore: bonus, tokensEarned: tokens };
}

// ============================================================================
// VULNERABILITY TRACKING
// ============================================================================

/**
 * Clear vulnerability markers if player scored
 */
function clearPlayerVulnerableIfScored(
  state: GameState,
  playerIdx: number
): void {
  if (state.turn.correctCount <= 0) return;
  const pid = state.players[playerIdx].profile.id;

  for (let lane = 0 as SlotType; lane <= 2; lane++) {
    const owners = state.board.owner[lane];
    const vuln = state.board.vulnerable[lane];
    for (let i = 0; i < state.cellCount; i++) {
      if (vuln[i] === 1 && owners[i] === pid) {
        vuln[i] = 0;
      }
    }
  }
}

/**
 * Mark a cell as vulnerable after scoreless turns
 */
function markVulnerableOnScorelessTurn(
  state: GameState,
  playerIdx: number
): void {
  const ps = state.players[playerIdx];
  for (let k = 0; k < ps.lastClaimStackSize; k++) {
    const packed = ps.lastClaimStack[k];
    const { slot, cellIndex } = unpackSlot(state.cellCount, packed);
    const owners = state.board.owner[slot];
    const vuln = state.board.vulnerable[slot];

    if (owners[cellIndex] !== ps.profile.id) continue;
    if (vuln[cellIndex] === 1) continue;

    vuln[cellIndex] = 1;
    return;
  }
}

/**
 * Apply turn-end vulnerability tracking
 */
function applyTurnScorelessTracking(
  state: GameState,
  playerIdx: number
): void {
  const ps = state.players[playerIdx];
  if (state.turn.correctCount <= 0) {
    ps.turnsWithoutScore++;
    if (ps.turnsWithoutScore >= VULNERABILITY_THRESHOLD) {
      markVulnerableOnScorelessTurn(state, playerIdx);
    }
  } else {
    ps.turnsWithoutScore = 0;
  }
}

// ============================================================================
// STEAL LOGIC
// ============================================================================

/**
 * Check if a slot is currently stealable
 */
function isSlotStealableNow(
  state: GameState,
  playerIdx: number,
  lane: SlotType,
  cellIndex: number
): boolean {
  const ps = state.players[playerIdx];
  if (ps.tokenCount <= 0) return false;

  const owners = state.board.owner[lane];
  const o = owners[cellIndex];
  if (o === -1 || o === ps.profile.id) return false;

  const pc = state.cellPitchClass[cellIndex];
  if (!isValidSpelling(pc, lane)) return false;

  // Vulnerable cells are always stealable
  if (state.board.vulnerable[lane][cellIndex] === 1) return true;

  // Global steal when exhausted
  if (!state.settings.steal.globalStealOnExhausted) return false;
  const vid = toVariantId(pc, lane);
  return state.variants.unclaimedByVariant[vid] === 0;
}

// ============================================================================
// ACTION HANDLERS
// ============================================================================

type ActionResult = {
  ended: boolean;
  effects: Effect[];
  endVariantId?: VariantId;
};

/**
 * Handle normal tap on a cell
 */
function tryNormalTap(
  state: GameState,
  playerIdx: number,
  stringIndex: number,
  fretIndex: number
): ActionResult {
  const effects: Effect[] = [];
  const ps = state.players[playerIdx];

  if (!isCellInDomain(state, stringIndex, fretIndex)) {
    return { ended: false, effects };
  }

  const cellIndex = cellIndexOf(stringIndex, fretIndex, state.fretCount);
  const promptVid = state.prompt.variantId;
  const prompt = fromVariantId(promptVid);
  const lane = prompt.spelling;

  const pc = state.cellPitchClass[cellIndex];

  // Check for wrong answer
  if (!isValidSpelling(pc, lane) || pc !== prompt.pitchClass) {
    effects.push(...endTurnForWrong(state, ps.profile.id));
    return { ended: true, effects, endVariantId: promptVid };
  }

  // Check if already claimed
  if (state.board.owner[lane][cellIndex] !== -1) {
    effects.push(...endTurnForWrong(state, ps.profile.id));
    return { ended: true, effects, endVariantId: promptVid };
  }

  // Successful claim
  effects.push(...claimSlot(state, playerIdx, lane, cellIndex));

  // Pick next prompt
  const pick = pickNextPromptVariant(state, playerIdx);
  state = pick.state;

  if (pick.variantId === null) {
    return { ended: true, effects };
  }

  state.prompt.variantId = pick.variantId;
  effects.push({ type: "PROMPT_CHANGED", variantId: state.prompt.variantId });

  return { ended: false, effects };
}

/**
 * Handle steal attempt on a cell
 */
function tryStealTap(
  state: GameState,
  playerIdx: number,
  stringIndex: number,
  fretIndex: number
): ActionResult {
  const effects: Effect[] = [];
  const ps = state.players[playerIdx];
  const inLastChance = state.lastChance.active;

  if (!isCellInDomain(state, stringIndex, fretIndex)) {
    return { ended: false, effects };
  }

  const cellIndex = cellIndexOf(stringIndex, fretIndex, state.fretCount);
  const promptVid = state.prompt.variantId;
  const prompt = fromVariantId(promptVid);
  const lane = prompt.spelling;

  // Need tokens to steal
  if (ps.tokenCount <= 0) {
    if (!inLastChance) {
      effects.push(...endTurnForWrong(state, ps.profile.id));
      return { ended: true, effects, endVariantId: promptVid };
    }
    return { ended: true, effects };
  }

  // Check if stealable
  if (!isSlotStealableNow(state, playerIdx, lane, cellIndex)) {
    ps.tokenCount--;
    effects.push(
      ...(inLastChance
        ? applyWrongAttemptContinue(state, ps.profile.id)
        : endTurnForWrong(state, ps.profile.id))
    );
    if (!inLastChance) {
      return { ended: true, effects, endVariantId: promptVid };
    }
  } else {
    const pc = state.cellPitchClass[cellIndex];

    if (pc !== prompt.pitchClass) {
      ps.tokenCount--;
      effects.push(
        ...(inLastChance
          ? applyWrongAttemptContinue(state, ps.profile.id)
          : endTurnForWrong(state, ps.profile.id))
      );
      if (!inLastChance) {
        return { ended: true, effects, endVariantId: promptVid };
      }
    } else {
      // Successful steal
      ps.tokenCount--;

      // Handle break bonus
      const prevOwner = state.board.owner[lane][cellIndex];
      const prevMask = state.board.connectClaimed[lane][cellIndex];
      if (prevMask !== 0 && prevOwner !== -1) {
        const curTier = effectiveTier(state);
        if (curTier === 0) state.turn.breakBonusTier = 1;
        else if (curTier < 4) state.turn.breakBonusTier = curTier + 1;
        else ps.score += state.settings.steal.breakConnectMaxTierBonus;

        clearConnectMarkersForBrokenCell(
          state,
          lane,
          cellIndex,
          prevOwner,
          prevMask
        );
      }

      // Transfer ownership
      state.board.owner[lane][cellIndex] = ps.profile.id;
      state.board.vulnerable[lane][cellIndex] = 0;
      state.board.claimedThisTurn[lane][cellIndex] = 1;
      state.board.connectClaimed[lane][cellIndex] = 0;

      state.turn.correctCount++;
      state.turn.tries++;
      state.turn.streakCount++;
      state.turn.streakTier = tierFromStreak(state.turn.streakCount);

      const tier = effectiveTier(state);
      ps.score += 1 * STREAK_MULTIPLIERS[tier];

      const msg = milestoneMessage(state.turn.streakCount);
      if (msg) {
        effects.push({
          type: "STREAK_CALLOUT",
          playerId: ps.profile.id,
          message: msg,
        });
        if (state.turn.streakCount === 20) {
          effects.push({
            type: "FIRE_MODE",
            playerId: ps.profile.id,
            enabled: true,
          });
        }
      }
    }
  }

  // End last-chance turn if out of tokens
  if (inLastChance && ps.tokenCount <= 0) {
    return { ended: true, effects };
  }

  // Pick next prompt
  const pick = pickNextPromptVariant(state, playerIdx);
  state = pick.state;
  if (pick.variantId === null) {
    return { ended: true, effects };
  }

  state.prompt.variantId = pick.variantId;
  effects.push({ type: "PROMPT_CHANGED", variantId: state.prompt.variantId });

  return { ended: false, effects };
}

/**
 * End turn due to wrong answer
 */
function endTurnForWrong(state: GameState, playerId: number): Effect[] {
  state.turn.wrongCount++;
  state.turn.tries++;
  state.turn.streakCount = 0;
  state.turn.streakTier = 0;
  state.turn.breakBonusTier = 0;
  return [{ type: "FIRE_MODE", playerId, enabled: false }];
}

/**
 * Apply wrong attempt but continue turn (for last-chance mode)
 */
function applyWrongAttemptContinue(
  state: GameState,
  playerId: number
): Effect[] {
  state.turn.wrongCount++;
  state.turn.tries++;
  state.turn.streakCount = 0;
  state.turn.streakTier = 0;
  state.turn.breakBonusTier = 0;
  return [{ type: "FIRE_MODE", playerId, enabled: false }];
}

/**
 * Finalize turn with scoring and pulse
 */
function finalizeTurnWithPulse(
  state: GameState,
  effects: Effect[],
  endedVariantId?: VariantId
): void {
  const endedPlayerIdx = state.currentPlayer;
  const endedPlayerId = state.players[endedPlayerIdx].profile.id;
  const scoreBeforeFinalize = state.players[endedPlayerIdx].score;

  // Apply connect bonuses
  const { connectScore, tokensEarned } = evalConnectEndOfTurn(
    state,
    endedPlayerIdx
  );
  if (connectScore > 0) {
    state.players[endedPlayerIdx].score += connectScore;
  }

  // Award tokens (not in last-chance)
  const tokensToAward = state.lastChance.active ? 0 : tokensEarned;
  if (tokensToAward > 0) {
    awardTokens(state, endedPlayerIdx, tokensToAward);
  }

  applyTurnScorelessTracking(state, endedPlayerIdx);
  clearPlayerVulnerableIfScored(state, endedPlayerIdx);

  const boardFull = isBoardFull(state);
  const totalRounds = Math.max(1, state.settings.fixedRoundsTotal || 1);

  let startedLastChance = false;
  let matchCompletedNow = false;

  // Handle board completion
  if (!state.lastChance.active && boardFull) {
    if (state.roundIndex < totalRounds) {
      effects.push({
        type: "ROUND_COMPLETE",
        completedRound: state.roundIndex,
        totalRounds,
      });
      state.roundIndex++;
      resetBoardForNewRound(state);
    } else {
      const isMulti =
        state.settings.playType === PlayType.MULTI && state.players.length > 1;
      const anyTokens = state.players.some((p) => p.tokenCount > 0);

      if (isMulti && anyTokens) {
        // Start last-chance phase
        const startIdx = (endedPlayerIdx + 1) % state.players.length;
        const orderList: number[] = [];

        for (let i = 0; i < state.players.length; i++) {
          const idx = (startIdx + i) % state.players.length;
          if (
            state.players[idx].tokenCount > 0 &&
            playerHasAnyActionablePrompt(state, idx)
          ) {
            orderList.push(idx);
          }
        }

        if (orderList.length === 0) {
          state.phase = "RESULTS";
          matchCompletedNow = true;
          effects.push({
            type: "MATCH_COMPLETE",
            roundsCompleted: state.roundIndex,
            totalRounds,
          });
        } else {
          state.lastChance.active = true;
          state.lastChance.order = Int16Array.from(orderList);
          state.lastChance.pos = 0;
          state.currentPlayer = orderList[0];
          startedLastChance = true;
          effects.push({ type: "LAST_CHANCE_STARTED", totalRounds });
        }
      } else {
        state.phase = "RESULTS";
        matchCompletedNow = true;
        effects.push({
          type: "MATCH_COMPLETE",
          roundsCompleted: state.roundIndex,
          totalRounds,
        });
      }
    }
  }

  // Emit feedback pulse
  if (state.settings.feedback.samEnabled && endedVariantId !== undefined) {
    const scoreAfterFinalize = state.players[endedPlayerIdx].score;
    const scoreDelta = scoreAfterFinalize - scoreBeforeFinalize;
    const ghost = pickGhostTarget(state, endedVariantId, endedPlayerIdx);

    effects.push({
      type: "FEEDBACK_PULSE",
      playerId: endedPlayerId,
      variantId: endedVariantId,
      durationMs: state.settings.feedback.samDurationMs,
      ghost,
      scoreDelta,
      includeLabel: state.settings.feedback.samIncludeLabel,
    });
  }

  state.turn.breakBonusTier = 0;

  if (matchCompletedNow) return;

  // Handle bonus stage (dev-driven for now)
  const devForceBonus =
    !!state.settings.dev?.enabled && !!state.settings.dev?.forceBonusOnTurnEnd;
  const canBonus =
    devForceBonus &&
    state.settings.playType === PlayType.MULTI &&
    state.players.length > 1 &&
    !state.lastChance.active &&
    !boardFull;

  if (canBonus) {
    const nextIdx = (endedPlayerIdx + 1) % state.players.length;
    state.bonus = {
      active: true,
      playerIndex: endedPlayerIdx,
      nextPlayerIndex: nextIdx,
      reason: "dev_force",
    };
    state.phase = "BONUS";
    effects.push({
      type: "BONUS_STARTED",
      playerId: endedPlayerId,
      reason: "dev_force",
    });
    return;
  }

  // Advance to next player
  if (state.settings.playType === PlayType.MULTI) {
    if (state.lastChance.active) {
      if (!startedLastChance) {
        let nextPos = state.lastChance.pos + 1;
        while (nextPos < state.lastChance.order.length) {
          const idx = state.lastChance.order[nextPos];
          if (
            (state.players[idx]?.tokenCount ?? 0) > 0 &&
            playerHasAnyActionablePrompt(state, idx)
          ) {
            break;
          }
          nextPos++;
        }

        if (nextPos >= state.lastChance.order.length) {
          state.lastChance.active = false;
          state.phase = "RESULTS";
          effects.push({
            type: "MATCH_COMPLETE",
            roundsCompleted: state.roundIndex,
            totalRounds,
          });
          return;
        }

        state.lastChance.pos = nextPos;
        state.currentPlayer = state.lastChance.order[nextPos];
      }
      state.phase = "INTERMISSION";
      effects.push({
        type: "TURN_ENDED",
        playerId: endedPlayerId,
        nextPlayerId: state.players[state.currentPlayer].profile.id,
      });
      return;
    }

    state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    state.phase = "INTERMISSION";
    effects.push({
      type: "TURN_ENDED",
      playerId: endedPlayerId,
      nextPlayerId: state.players[state.currentPlayer].profile.id,
    });
    return;
  }

  // Single player
  state.phase = state.lastChance.active ? "LAST_CHANCE" : "IN_MATCH";
  effects.push({ type: "TURN_ENDED", playerId: endedPlayerId });
}

// ============================================================================
// MAIN REDUCER
// ============================================================================

/**
 * Main game reducer
 *
 * @param state - Current state (null for initialization)
 * @param action - Action to process
 * @returns New state and effects
 */
export function reducer(
  state: GameState | null,
  action: Action
): { state: GameState; effects: Effect[] } {
  const effects: Effect[] = [];

  switch (action.type) {
    case "INIT_MATCH": {
      const s = createInitialState(action.settings, action.players, action.seed);
      const pick = pickNextPromptVariant(s, 0);

      let firstVid = pick.variantId;
      if (firstVid === null) {
        // Fallback to first allowed variant
        for (let vid = 0; vid < TOTAL_VARIANTS; vid++) {
          if (pick.state.variants.allowed[vid] === 1) {
            firstVid = vid as VariantId;
            break;
          }
        }
        firstVid = firstVid ?? 0;
      }

      pick.state.prompt.variantId = firstVid;
      effects.push({ type: "PROMPT_CHANGED", variantId: firstVid });
      return { state: pick.state, effects };
    }

    case "UPDATE_SETTINGS": {
      if (!state) throw new Error("State required");
      state.settings = action.settings;
      return { state, effects };
    }

    case "START_TURN": {
      if (!state) throw new Error("State required");
      if (state.phase === "RESULTS") return { state, effects };
      if (state.phase === "BONUS") return { state, effects };

      state.phase = state.lastChance.active ? "LAST_CHANCE" : "IN_MATCH";
      state.turnCounter++;

      clearClaimedThisTurn(state);

      state.turn.correctCount = 0;
      state.turn.wrongCount = 0;
      state.turn.tries = 0;
      state.turn.streakCount = 0;
      state.turn.streakTier = 0;
      state.turn.breakBonusTier = 0;

      const pick = pickNextPromptVariant(state, state.currentPlayer);
      state = pick.state;

      if (pick.variantId === null) {
        finalizeTurnWithPulse(state, effects);
        return { state, effects };
      }

      state.prompt.variantId = pick.variantId;
      effects.push({ type: "PROMPT_CHANGED", variantId: state.prompt.variantId });
      return { state, effects };
    }

    case "END_BONUS": {
      if (!state) throw new Error("State required");
      if (state.phase !== "BONUS") return { state, effects };

      const bonusPlayerIdx = state.bonus.active
        ? state.bonus.playerIndex
        : state.currentPlayer;
      const bonusPlayerId = state.players[bonusPlayerIdx]?.profile.id ?? 0;

      if (
        state.settings.playType === PlayType.MULTI &&
        state.players.length > 1
      ) {
        const nextIdx = state.bonus.active
          ? state.bonus.nextPlayerIndex
          : (bonusPlayerIdx + 1) % state.players.length;
        state.currentPlayer = nextIdx;
        state.phase = "INTERMISSION";
        state.bonus.active = false;
        effects.push({
          type: "TURN_ENDED",
          playerId: bonusPlayerId,
          nextPlayerId: state.players[nextIdx].profile.id,
        });
        return { state, effects };
      }

      state.phase = state.lastChance.active ? "LAST_CHANCE" : "IN_MATCH";
      state.bonus.active = false;
      effects.push({ type: "TURN_ENDED", playerId: bonusPlayerId });
      return { state, effects };
    }

    case "TAP_CELL": {
      if (!state) throw new Error("State required");
      if (
        state.settings.modeId !== ModeId.FRETBOARD &&
        state.settings.modeId !== ModeId.TAB
      ) {
        return { state, effects };
      }
      if (state.phase !== "IN_MATCH") return { state, effects };
      if (state.lastChance.active) return { state, effects };

      const res = tryNormalTap(
        state,
        state.currentPlayer,
        action.stringIndex,
        action.fretIndex
      );
      effects.push(...res.effects);

      if (res.ended) {
        finalizeTurnWithPulse(state, effects, res.endVariantId);
      }
      return { state, effects };
    }

    case "STEAL_CELL": {
      if (!state) throw new Error("State required");
      if (
        state.settings.modeId !== ModeId.FRETBOARD &&
        state.settings.modeId !== ModeId.TAB
      ) {
        return { state, effects };
      }
      if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") {
        return { state, effects };
      }

      const res = tryStealTap(
        state,
        state.currentPlayer,
        action.stringIndex,
        action.fretIndex
      );
      effects.push(...res.effects);

      if (res.ended) {
        finalizeTurnWithPulse(state, effects, res.endVariantId);
      }
      return { state, effects };
    }

    case "TIMEOUT": {
      if (!state) throw new Error("State required");
      if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") {
        return { state, effects };
      }

      const endedVariant = state.prompt.variantId;
      const endedPid = state.players[state.currentPlayer].profile.id;

      effects.push(...endTurnForWrong(state, endedPid));
      finalizeTurnWithPulse(state, effects, endedVariant);
      return { state, effects };
    }

    case "USE_HINT": {
      if (!state) throw new Error("State required");
      if (
        state.settings.difficulty !== Difficulty.EASY &&
        state.settings.difficulty !== Difficulty.LEARNING
      ) {
        return { state, effects };
      }
      if (state.phase !== "IN_MATCH") return { state, effects };
      if (state.lastChance.active) return { state, effects };

      const endedPlayerIdx = state.currentPlayer;
      const endedPid = state.players[endedPlayerIdx].profile.id;
      const endedVariant = state.prompt.variantId;

      const scoreBefore = state.players[endedPlayerIdx].score;
      state.players[endedPlayerIdx].score = Math.max(
        0,
        scoreBefore - HINT_PENALTY_POINTS
      );

      state.turn.tries++;
      state.turn.streakCount = 0;
      state.turn.streakTier = 0;
      state.turn.breakBonusTier = 0;

      effects.push({ type: "FIRE_MODE", playerId: endedPid, enabled: false });

      finalizeTurnWithPulse(state, effects, undefined);

      const scoreAfter = state.players[endedPlayerIdx].score;
      const scoreDelta = scoreAfter - scoreBefore;
      const ghost = pickGhostTarget(state, endedVariant, endedPlayerIdx);

      effects.push({
        type: "FEEDBACK_PULSE",
        playerId: endedPid,
        variantId: endedVariant,
        durationMs: Math.max(1200, state.settings.feedback.samDurationMs),
        ghost,
        scoreDelta,
        includeLabel: true,
      });

      return { state, effects };
    }

    case "END_MATCH": {
      if (!state) throw new Error("State required");
      state.phase = "RESULTS";
      return { state, effects };
    }

    // Dev actions
    case "DEV_SET_CURRENT_PLAYER": {
      if (!state) throw new Error("State required");
      const n = state.players.length;
      state.currentPlayer = Math.max(0, Math.min(n - 1, action.playerIndex));
      return { state, effects };
    }

    case "DEV_FORCE_PHASE": {
      if (!state) throw new Error("State required");
      state.phase = action.phase;
      if (action.phase === "LAST_CHANCE") state.lastChance.active = true;
      if (action.phase !== "LAST_CHANCE") state.lastChance.active = false;

      if (action.phase === "BONUS") {
        const nextIdx =
          state.players.length > 0
            ? (state.currentPlayer + 1) % state.players.length
            : 0;
        state.bonus = {
          active: true,
          playerIndex: state.currentPlayer,
          nextPlayerIndex: nextIdx,
          reason: "dev_force",
        };
      } else {
        state.bonus.active = false;
      }
      return { state, effects };
    }

    case "DEV_SET_PAINT": {
      if (!state) throw new Error("State required");
      state.settings.dev = { ...state.settings.dev, ...action.patch };
      return { state, effects };
    }

    case "DEV_CLEAR_BOARD": {
      if (!state) throw new Error("State required");
      for (let lane = 0 as SlotType; lane <= 2; lane++) {
        state.board.owner[lane].fill(-1);
        state.board.vulnerable[lane].fill(0);
        state.board.claimedThisTurn[lane].fill(0);
        state.board.connectClaimed[lane].fill(0);
      }
      for (const ps of state.players) {
        ps.lastClaimStackSize = 0;
        ps.turnsWithoutScore = 0;
      }
      state.variants.claimedRequired = 0;
      for (let vid = 0; vid < TOTAL_VARIANTS; vid++) {
        state.variants.unclaimedByVariant[vid] =
          state.variants.requiredByVariant[vid];
      }
      return { state, effects };
    }

    case "DEV_END_TURN": {
      if (!state) throw new Error("State required");
      if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") {
        return { state, effects };
      }
      finalizeTurnWithPulse(state, effects, undefined);
      return { state, effects };
    }

    case "DEV_PLACE": {
      if (!state) throw new Error("State required");
      const { stringIndex, fretIndex, lane, set } = action;
      if (
        stringIndex < 0 ||
        stringIndex >= 6 ||
        fretIndex < 0 ||
        fretIndex >= state.fretCount
      ) {
        return { state, effects };
      }

      const ci = cellIndexOf(stringIndex, fretIndex, state.fretCount);
      if (state.domainCellEnabled[ci] === 0) return { state, effects };

      const owners = state.board.owner[lane];
      const prevOwner = owners[ci];
      const prevMask = state.board.connectClaimed[lane][ci];

      if (
        prevOwner !== -1 &&
        prevMask !== 0 &&
        (set === 0 ||
          action.ownerPlayerIndex < 0 ||
          state.players[action.ownerPlayerIndex]?.profile.id !== prevOwner)
      ) {
        clearConnectMarkersForBrokenCell(state, lane, ci, prevOwner, prevMask);
      }

      const targetOwnerId =
        set === 1 &&
        action.ownerPlayerIndex >= 0 &&
        action.ownerPlayerIndex < state.players.length
          ? state.players[action.ownerPlayerIndex].profile.id
          : -1;

      const pc = state.cellPitchClass[ci];
      const vid = toVariantId(pc, lane);
      const countsCell =
        state.variants.allowed[vid] === 1 && isValidSpelling(pc, lane);

      if (set === 1) {
        if (targetOwnerId === -1) return { state, effects };
        if (prevOwner === targetOwnerId) return { state, effects };

        if (countsCell && prevOwner === -1) {
          state.variants.unclaimedByVariant[vid] = Math.max(
            0,
            state.variants.unclaimedByVariant[vid] - 1
          );
          state.variants.claimedRequired++;
        }
        owners[ci] = targetOwnerId;
        state.board.vulnerable[lane][ci] = 0;
        state.board.claimedThisTurn[lane][ci] = 1;
        state.board.connectClaimed[lane][ci] = 0;
      } else {
        if (prevOwner === -1) return { state, effects };
        if (countsCell) {
          state.variants.unclaimedByVariant[vid] = Math.min(
            state.variants.requiredByVariant[vid],
            state.variants.unclaimedByVariant[vid] + 1
          );
          state.variants.claimedRequired = Math.max(
            0,
            state.variants.claimedRequired - 1
          );
        }
        owners[ci] = -1;
        state.board.vulnerable[lane][ci] = 0;
        state.board.claimedThisTurn[lane][ci] = 0;
        state.board.connectClaimed[lane][ci] = 0;
      }

      return { state, effects };
    }

    default:
      return { state: state!, effects };
  }
}

/**
 * Compute a stable hash for settings (for leaderboard grouping)
 */
export function settingsHash(settings: GameSettings): string {
  // Omit dev settings from hash - they shouldn't affect leaderboard grouping
  const { dev, ...rest } = settings;
  // Intentionally ignore `dev` to keep hash stable
  void dev;
  const canon = stableStringify(rest);
  return String(fnv1a32(canon));
}
