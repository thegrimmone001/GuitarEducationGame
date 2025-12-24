import {
  Action, Effect, GameSettings, GameState, PlayerProfile, PlayerState,
  SlotType, VariantId, ModeId, PlayType, MatchType, GhostTarget, Difficulty,
} from "./types";
import { fromVariantId, isValidSpelling, pitchClassAt, toVariantId } from "./music";
import { stableStringify, fnv1a32 } from "./hash";
import { buildAllowedVariantsFromSettings } from "./promptProfiles";

const MULT_TIERS = [1, 2, 3, 5, 10] as const;

// Easy-mode assist: using a hint costs points and ends the current turn.
// (The exact value can be made configurable later; keep it deterministic for now.)
const HINT_PENALTY_POINTS = 5;

function tierFromStreak(streak: number): number {
  if (streak >= 20) return 4;
  if (streak >= 10) return 3;
  if (streak >= 6) return 2;
  if (streak >= 3) return 1;
  return 0;
}

function milestoneMessage(streak: number): string | null {
  if (streak === 3) return "3 in a row!";
  if (streak === 6) return "6 in a row!";
  if (streak === 8) return "8 in a row — HEATING UP!";
  if (streak === 10) return "HOT STREAK!";
  if (streak === 20) return "YOU’RE ON FIRE!";
  return null;
}

function rngNext(seed: number): number {
  let x = seed | 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return x | 0;
}
function rngInt(seed: number, maxExclusive: number): { seed: number; value: number } {
  const s2 = rngNext(seed);
  const v = (s2 >>> 0) % maxExclusive;
  return { seed: s2, value: v };
}

function cellIndexOf(stringIndex: number, fretIndex: number, fretCount: number): number {
  return stringIndex * fretCount + fretIndex;
}

function isCellInDomain(state: GameState, stringIndex: number, fretIndex: number): boolean {
  if (stringIndex < 0 || stringIndex >= 6) return false;
  if (fretIndex < 0 || fretIndex >= state.fretCount) return false;
  const idx = cellIndexOf(stringIndex, fretIndex, state.fretCount);
  return state.domainCellEnabled[idx] === 1;
}

function setAll(arr: Uint8Array, v: number) { arr.fill(v); }

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

function pushClaimStack(ps: PlayerState, packed: number) {
  if (ps.lastClaimStackSize >= ps.lastClaimStack.length) {
    const next = new Int32Array(ps.lastClaimStack.length * 2);
    next.set(ps.lastClaimStack);
    ps.lastClaimStack = next;
  }
  for (let i = Math.min(ps.lastClaimStackSize, ps.lastClaimStack.length - 2); i >= 0; i--) {
    ps.lastClaimStack[i + 1] = ps.lastClaimStack[i];
  }
  ps.lastClaimStack[0] = packed;
  ps.lastClaimStackSize++;
}

function packSlot(cellCount: number, slot: SlotType, cellIndex: number): number {
  return slot * cellCount + cellIndex;
}
function unpackSlot(cellCount: number, packed: number): { slot: SlotType; cellIndex: number } {
  const slot = Math.floor(packed / cellCount) as SlotType;
  const cellIndex = packed % cellCount;
  return { slot, cellIndex };
}

function createInitialState(settings: GameSettings, profiles: PlayerProfile[], seed: number): GameState {
  // Defensive normalization (some settings may come from older saved versions).
  // This shell intentionally runs a single match flow: blackout repeated for N rounds.
  const fixedRoundsTotal = Math.max(1, Math.min(50, Number((settings as any).fixedRoundsTotal ?? 1)));

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

  const owner: [Int16Array, Int16Array, Int16Array] = [
    new Int16Array(cellCount),
    new Int16Array(cellCount),
    new Int16Array(cellCount),
  ];
  owner[0].fill(-1); owner[1].fill(-1); owner[2].fill(-1);

  const connectClaimed: [Uint8Array, Uint8Array, Uint8Array] = [
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
  ];
  const vulnerable: [Uint8Array, Uint8Array, Uint8Array] = [
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
  ];
  const claimedThisTurn: [Uint8Array, Uint8Array, Uint8Array] = [
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
    new Uint8Array(cellCount),
  ];

  const cellPitchClass = new Uint8Array(cellCount);
  const domainCellEnabled = new Uint8Array(cellCount);

  for (let s = 0; s < 6; s++) {
    for (let f = 0; f < fretCount; f++) {
      const idx = cellIndexOf(s, f, fretCount);
      cellPitchClass[idx] = pitchClassAt(s, f);
      const inFretRange = f >= normalized.domain.minFret && f <= normalized.domain.maxFret;
      const inString = normalized.domain.enabledStrings[s] === true;
      domainCellEnabled[idx] = (inFretRange && inString) ? 1 : 0;
    }
  }

  const allowed = buildAllowedVariantsFromSettings(normalized);

  const requiredByVariant = new Int16Array(36);
  const unclaimedByVariant = new Int16Array(36);
  let requiredTotal = 0;

  for (let idx = 0; idx < cellCount; idx++) {
    if (domainCellEnabled[idx] === 0) continue;
    const pc = cellPitchClass[idx];

    for (let lane = 0 as SlotType; lane <= 2; lane++) {
      const vid = pc * 3 + lane;
      if (allowed[vid] !== 1) continue;
      if (!isValidSpelling(pc as any, lane)) continue;
      requiredTotal++;
      requiredByVariant[vid]++;
      unclaimedByVariant[vid]++;
    }
  }

  const players: PlayerState[] = profiles.map(createPlayerState);

  return {
    settings: normalized,
    phase: "IN_MATCH",
    bonus: { active: false, playerIndex: 0, nextPlayerIndex: 0, reason: "end_turn" },
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

    variants: {
      allowed,
      requiredByVariant,
      requiredTotal,
      claimedRequired: 0,
      unclaimedByVariant,
    },

    turn: {
      correctCount: 0,
      wrongCount: 0,
      tries: 0,
      streakCount: 0,
      streakTier: 0,
      breakBonusTier: 0,
    },

    prompt: { variantId: 0 },
    rngSeed: seed | 0,
  };
}

function variantIsActionableForPlayer(state: GameState, variantId: VariantId, playerIdx: number): boolean {
  // No enharmonic-toggle behavior: a prompt is actionable only if that exact
  // spelling lane is answerable (unclaimed target exists or a legal steal exists).
  return variantIsActionableForPlayerExact(state, variantId, playerIdx);
}

// Exact-lane variant actionability (does NOT consider the opposite enharmonic lane).
function variantIsActionableForPlayerExact(state: GameState, variantId: VariantId, playerIdx: number): boolean {
  const v = fromVariantId(variantId);
  if (!isValidSpelling(v.pitchClass, v.spelling)) return false;
  if (state.variants.allowed[variantId] !== 1) return false;

  const pid = state.players[playerIdx]?.profile.id ?? (playerIdx as any);
  const playerHasToken = (s: GameState, pIdx: number) => (s.players[pIdx]?.tokenCount ?? 0) > 0;

  // Unclaimed cells exist in this exact lane.
  if (state.variants.unclaimedByVariant[variantId] > 0) return true;

  // Otherwise, only possible via stealing.
  const canStealWhenExhausted = state.settings.steal.globalStealOnExhausted && state.variants.unclaimedByVariant[variantId] === 0;
  if (!playerHasToken(state, playerIdx)) return false;

  for (let idx = 0; idx < state.cellPitchClass.length; idx++) {
    if (state.domainCellEnabled[idx] === 0) continue;
    if (state.cellPitchClass[idx] !== v.pitchClass) continue;
    const owner = state.board.owner[v.spelling][idx];
    if (owner === -1) continue;
    if (owner === pid) continue;

    // Vulnerable steals always allowed; otherwise require exhausted+globalSteal.
    const vulnerable = state.board.vulnerable[v.spelling][idx];
    if (vulnerable) return true;
    if (canStealWhenExhausted) return true;
  }
  return false;
}

function pickNextPromptVariant(state: GameState, playerIdx: number, strict = false): { state: GameState; variantId: VariantId | null } {
  const eligible: number[] = [];
  for (let vid = 0; vid < 36; vid++) {
    if (variantIsActionableForPlayer(state, vid as VariantId, playerIdx)) eligible.push(vid);
  }

  // IMPORTANT:
  // We never fall back to "non-actionable" prompts.
  // If no prompt can be answered (unclaimed target exists OR a legal steal exists),
  // we return null and let the turn/match resolver advance the game.
  if (eligible.length === 0) return { state, variantId: null };

  const r = rngInt(state.rngSeed, eligible.length);
  state.rngSeed = r.seed;
  return { state, variantId: eligible[r.value] as VariantId };
}

function playerHasAnyActionablePrompt(state: GameState, playerIdx: number): boolean {
  for (let vid = 0; vid < 36; vid++) {
    if (variantIsActionableForPlayer(state, vid as VariantId, playerIdx)) return true;
  }
  return false;
}


function pickGhostTarget(state: GameState, variantId: VariantId, playerIdx: number): GhostTarget | null {
  if (!state.settings.feedback.samEnabled) return null;

  const ps = state.players[playerIdx];
  const pid = ps.profile.id;

  const v = fromVariantId(variantId);
  const pc = v.pitchClass;

  const lane = v.spelling;
  const owners = state.board.owner[lane];
  const vuln = state.board.vulnerable[lane];

  // unclaimed first
  for (let idx = 0; idx < state.cellCount; idx++) {
    if (state.domainCellEnabled[idx] === 0) continue;
    if (state.cellPitchClass[idx] !== pc) continue;
    if (!isValidSpelling(pc as any, lane)) continue;
    if (owners[idx] === -1) return { cellIndex: idx, slot: lane, variantId };
  }

  if (ps.tokenCount > 0) {
    // vulnerable
    for (let idx = 0; idx < state.cellCount; idx++) {
      if (state.domainCellEnabled[idx] === 0) continue;
      if (state.cellPitchClass[idx] !== pc) continue;
      if (!isValidSpelling(pc as any, lane)) continue;
      const o = owners[idx];
      if (o === -1 || o === pid) continue;
      if (vuln[idx] === 1) return { cellIndex: idx, slot: lane, variantId };
    }

    // global steal if exhausted
    const laneVid = toVariantId(pc as any, lane);
    const exhausted = state.variants.unclaimedByVariant[laneVid] === 0;
    if (exhausted && state.settings.steal.globalStealOnExhausted) {
      for (let idx = 0; idx < state.cellCount; idx++) {
        if (state.domainCellEnabled[idx] === 0) continue;
        if (state.cellPitchClass[idx] !== pc) continue;
        if (!isValidSpelling(pc as any, lane)) continue;
        const o = owners[idx];
        if (o === -1 || o === pid) continue;
        return { cellIndex: idx, slot: lane, variantId };
      }
    }
  }

  return null;
}

function pickGhostTargets(state: GameState, variantId: VariantId, playerIdx: number): GhostTarget[] {
  if (!state.settings.feedback.samEnabled) return [];

  const ps = state.players[playerIdx];
  const pid = ps.profile.id;

  const v = fromVariantId(variantId);
  const pc = v.pitchClass;

  const lane = v.spelling;
  const owners = state.board.owner[lane];
  const vuln = state.board.vulnerable[lane];

  const out: GhostTarget[] = [];

  // Unclaimed first.
  for (let idx = 0; idx < state.cellCount; idx++) {
    if (state.domainCellEnabled[idx] === 0) continue;
    if (state.cellPitchClass[idx] !== pc) continue;
    if (!isValidSpelling(pc as any, lane)) continue;
    if (owners[idx] === -1) out.push({ cellIndex: idx, slot: lane, variantId });
  }
  if (out.length) return out;

  if (ps.tokenCount > 0) {
    // Vulnerable.
    for (let idx = 0; idx < state.cellCount; idx++) {
      if (state.domainCellEnabled[idx] === 0) continue;
      if (state.cellPitchClass[idx] !== pc) continue;
      if (!isValidSpelling(pc as any, lane)) continue;
      const o = owners[idx];
      if (o === -1 || o === pid) continue;
      if (vuln[idx] === 1) out.push({ cellIndex: idx, slot: lane, variantId });
    }
    if (out.length) return out;

    // Global steal if exhausted.
    const laneVid = toVariantId(pc as any, lane);
    const exhausted = state.variants.unclaimedByVariant[laneVid] === 0;
    if (exhausted && state.settings.steal.globalStealOnExhausted) {
      for (let idx = 0; idx < state.cellCount; idx++) {
        if (state.domainCellEnabled[idx] === 0) continue;
        if (state.cellPitchClass[idx] !== pc) continue;
        if (!isValidSpelling(pc as any, lane)) continue;
        const o = owners[idx];
        if (o === -1 || o === pid) continue;
        out.push({ cellIndex: idx, slot: lane, variantId });
      }
    }
  }

  return out;
}

function clearClaimedThisTurn(state: GameState) {
  setAll(state.board.claimedThisTurn[0], 0);
  setAll(state.board.claimedThisTurn[1], 0);
  setAll(state.board.claimedThisTurn[2], 0);
}

function isBoardFull(state: GameState): boolean {
  return state.variants.claimedRequired >= state.variants.requiredTotal;
}

function resetBoardForNewRound(state: GameState) {
  // Clear board ownership and per-turn markers.
  for (let lane = 0 as SlotType; lane <= 2; lane++) {
    state.board.owner[lane].fill(-1);
    setAll(state.board.connectClaimed[lane], 0);
    setAll(state.board.vulnerable[lane], 0);
    setAll(state.board.claimedThisTurn[lane], 0);
  }

  // Clear per-player claim history used for vulnerability marking.
  for (const ps of state.players) {
    ps.lastClaimStackSize = 0;
    ps.turnsWithoutScore = 0;
  }

  // Recompute variant counts.
  state.variants.claimedRequired = 0;
  for (let vid = 0; vid < 36; vid++) {
    state.variants.requiredByVariant[vid] = 0;
    state.variants.unclaimedByVariant[vid] = 0;
  }

  let requiredTotal = 0;
  for (let idx = 0; idx < state.cellCount; idx++) {
    if (state.domainCellEnabled[idx] === 0) continue;
    const pc = state.cellPitchClass[idx] as any;
    for (let lane = 0 as SlotType; lane <= 2; lane++) {
      if (!isValidSpelling(pc, lane)) continue;
      const vid = toVariantId(pc, lane);
      if (state.variants.allowed[vid] === 0) continue;
      state.variants.requiredByVariant[vid] += 1;
      state.variants.unclaimedByVariant[vid] += 1;
      requiredTotal += 1;
    }
  }
  state.variants.requiredTotal = requiredTotal;
}

function clearBreakBonusOnTurnEndOrMiss(state: GameState) {
  state.turn.breakBonusTier = 0;
}

function effectiveTier(state: GameState): number {
  return Math.max(state.turn.streakTier, state.turn.breakBonusTier);
}

function awardTokens(state: GameState, playerIdx: number, amount: number) {
  const cap = state.settings.steal.tokenCap;
  const ps = state.players[playerIdx];
  ps.tokenCount = Math.min(cap, ps.tokenCount + amount);
}

function clearPlayerVulnerableIfScored(state: GameState, playerIdx: number) {
  if (state.turn.correctCount <= 0) return;
  const pid = state.players[playerIdx].profile.id;

  for (let lane = 0 as SlotType; lane <= 2; lane++) {
    const owners = state.board.owner[lane];
    const vuln = state.board.vulnerable[lane];
    for (let i = 0; i < state.cellCount; i++) {
      if (vuln[i] === 1 && owners[i] === pid) vuln[i] = 0;
    }
  }
}

function markVulnerableOnScorelessTurn(state: GameState, playerIdx: number) {
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

function applyTurnScorelessTracking(state: GameState, playerIdx: number) {
  const ps = state.players[playerIdx];
  if (state.turn.correctCount <= 0) {
    ps.turnsWithoutScore++;
    if (ps.turnsWithoutScore >= 3) markVulnerableOnScorelessTurn(state, playerIdx);
  } else {
    ps.turnsWithoutScore = 0;
  }
}

function claimSlot(state: GameState, playerIdx: number, lane: SlotType, cellIndex: number): Effect[] {
  const ps = state.players[playerIdx];
  const owners = state.board.owner[lane];

  owners[cellIndex] = ps.profile.id;
  state.board.claimedThisTurn[lane][cellIndex] = 1;

  const pc = state.cellPitchClass[cellIndex];
  const vid = toVariantId(pc as any, lane);
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
  ps.score += 1 * MULT_TIERS[tier];

  const fx: Effect[] = [];
  const msg = milestoneMessage(state.turn.streakCount);
  if (msg) {
    fx.push({ type: "STREAK_CALLOUT", playerId: ps.profile.id, message: msg });
    if (state.turn.streakCount === 20) fx.push({ type: "FIRE_MODE", playerId: ps.profile.id, enabled: true });
  }
  return fx;
}

type ActionResult = { ended: boolean; effects: Effect[]; endVariantId?: VariantId };

function endTurnForWrong(state: GameState, playerId: number): Effect[] {
  state.turn.wrongCount++;
  state.turn.tries++;
  state.turn.streakCount = 0;
  state.turn.streakTier = 0;
  clearBreakBonusOnTurnEndOrMiss(state);
  return [{ type: "FIRE_MODE", playerId, enabled: false }];
}

function applyWrongAttemptContinue(state: GameState, playerId: number): Effect[] {
  // Same accounting as an end-turn miss, but does not actually end the turn.
  state.turn.wrongCount++;
  state.turn.tries++;
  state.turn.streakCount = 0;
  state.turn.streakTier = 0;
  clearBreakBonusOnTurnEndOrMiss(state);
  return [{ type: "FIRE_MODE", playerId, enabled: false }];
}

function tryNormalTap(state: GameState, playerIdx: number, stringIndex: number, fretIndex: number): ActionResult {
  const effects: Effect[] = [];
  const ps = state.players[playerIdx];

  if (!isCellInDomain(state, stringIndex, fretIndex)) return { ended: false, effects };

  const cellIndex = cellIndexOf(stringIndex, fretIndex, state.fretCount);
  const promptVid = state.prompt.variantId;
  const prompt = fromVariantId(promptVid);
  const lane = prompt.spelling;

  const pc = state.cellPitchClass[cellIndex];
  if (!isValidSpelling(pc as any, lane)) {
    effects.push(...endTurnForWrong(state, ps.profile.id));
    return { ended: true, effects, endVariantId: promptVid };
  }

  // Input consistency rule:
  // Sharps/flats must have the same effective target size as natural notes.
  // Therefore, we do NOT require left/right-half precision for SHR/FLT prompts.
  // Spelling is determined by the prompt variant.

  if (pc !== prompt.pitchClass) {
    effects.push(...endTurnForWrong(state, ps.profile.id));
    return { ended: true, effects, endVariantId: promptVid };
  }

  if (state.board.owner[lane][cellIndex] !== -1) {
    effects.push(...endTurnForWrong(state, ps.profile.id));
    return { ended: true, effects, endVariantId: promptVid };
  }

  effects.push(...claimSlot(state, playerIdx, lane, cellIndex));

  const strict = isBoardFull(state);
  const pick = pickNextPromptVariant(state, playerIdx, strict);
  state = pick.state;
  if (pick.variantId === null) {
    // No actionable prompts remain (typically: full board and no legal steals).
    return { ended: true, effects };
  }
  state.prompt.variantId = pick.variantId;
  effects.push({ type: "PROMPT_CHANGED", variantId: state.prompt.variantId });

  return { ended: false, effects };
}

function isSlotStealableNow(state: GameState, playerIdx: number, lane: SlotType, cellIndex: number): boolean {
  const ps = state.players[playerIdx];
  if (ps.tokenCount <= 0) return false;

  const owners = state.board.owner[lane];
  const o = owners[cellIndex];
  if (o === -1) return false;
  if (o === ps.profile.id) return false;

  const pc = state.cellPitchClass[cellIndex];
  if (!isValidSpelling(pc as any, lane)) return false;

  if (state.board.vulnerable[lane][cellIndex] === 1) return true;

  if (!state.settings.steal.globalStealOnExhausted) return false;
  const vid = toVariantId(pc as any, lane);
  const exhausted = state.variants.unclaimedByVariant[vid] === 0;
  return exhausted;
}

function tryStealTap(state: GameState, playerIdx: number, stringIndex: number, fretIndex: number): ActionResult {
  const effects: Effect[] = [];
  const ps = state.players[playerIdx];
  const inLastChance = state.lastChance.active;

  if (!isCellInDomain(state, stringIndex, fretIndex)) return { ended: false, effects };

  const cellIndex = cellIndexOf(stringIndex, fretIndex, state.fretCount);
  const promptVid = state.prompt.variantId;
  const prompt = fromVariantId(promptVid);
  // Steals always target the lane implied by the current prompt spelling.
  const lane = prompt.spelling;

  // In last chance, only steal attempts matter. If you have no tokens, you're done.
  if (ps.tokenCount <= 0) {
    if (!inLastChance) {
      effects.push(...endTurnForWrong(state, ps.profile.id));
      return { ended: true, effects, endVariantId: promptVid };
    }
    return { ended: true, effects };
  }

  const attemptWrongFx = () => (inLastChance ? applyWrongAttemptContinue(state, ps.profile.id) : endTurnForWrong(state, ps.profile.id));

  // Attempt consumes a token in last chance regardless of outcome.
  if (!isSlotStealableNow(state, playerIdx, lane, cellIndex)) {
    ps.tokenCount--;
    effects.push(...attemptWrongFx());
    if (!inLastChance) return { ended: true, effects, endVariantId: promptVid };
  } else {
    const pc = state.cellPitchClass[cellIndex];
    if (pc !== prompt.pitchClass) {
      ps.tokenCount--;
      effects.push(...attemptWrongFx());
      if (!inLastChance) return { ended: true, effects, endVariantId: promptVid };
    } else {
      // Successful steal
      ps.tokenCount--;

      // If this cell was part of a previously counted connect segment, award a break
      // bonus and clear the segment markers so future re-connections can score again.
      const prevOwner = state.board.owner[lane][cellIndex];
      const prevMask = state.board.connectClaimed[lane][cellIndex];
      if (prevMask !== 0 && prevOwner !== -1) {
        const curTier = effectiveTier(state);
        if (curTier === 0) state.turn.breakBonusTier = 1;
        else if (curTier < 4) state.turn.breakBonusTier = curTier + 1;
        else ps.score += state.settings.steal.breakConnectMaxTierBonus;

        clearConnectMarkersForBrokenCell(state, lane, cellIndex, prevOwner, prevMask);
      }

      state.board.owner[lane][cellIndex] = ps.profile.id;
      state.board.vulnerable[lane][cellIndex] = 0;
      state.board.claimedThisTurn[lane][cellIndex] = 1;

      // Always clear marker bits on the stolen cell itself (it no longer belongs to the old segment).
      state.board.connectClaimed[lane][cellIndex] = 0;

      state.turn.correctCount++;
      state.turn.tries++;
      state.turn.streakCount++;
      state.turn.streakTier = tierFromStreak(state.turn.streakCount);

      const tier = effectiveTier(state);
      ps.score += 1 * MULT_TIERS[tier];

      const msg = milestoneMessage(state.turn.streakCount);
      if (msg) {
        effects.push({ type: "STREAK_CALLOUT", playerId: ps.profile.id, message: msg });
        if (state.turn.streakCount === 20) effects.push({ type: "FIRE_MODE", playerId: ps.profile.id, enabled: true });
      }
    }
  }

  // End last-chance turn automatically when tokens run out.
  if (inLastChance && ps.tokenCount <= 0) {
    return { ended: true, effects };
  }

  // Pick next prompt.
  const strict = inLastChance || isBoardFull(state);
  const pick = pickNextPromptVariant(state, playerIdx, strict);
  state = pick.state;
  if (pick.variantId === null) {
    // Nothing actionable left.
    return { ended: true, effects };
  }
  state.prompt.variantId = pick.variantId;
  effects.push({ type: "PROMPT_CHANGED", variantId: state.prompt.variantId });

  return { ended: false, effects };
}

function stringOf(cellIndex: number, fretCount: number): number { return Math.floor(cellIndex / fretCount); }
function fretOf(cellIndex: number, fretCount: number): number { return cellIndex % fretCount; }

function clearConnectMarkersForBrokenCell(
  state: GameState,
  lane: SlotType,
  cellIndex: number,
  ownerId: number,
  mask: number,
) {
  const owners = state.board.owner[lane];
  const cc = state.board.connectClaimed[lane];
  const sStart = stringOf(cellIndex, state.fretCount);
  const fStart = fretOf(cellIndex, state.fretCount);

  const dirs: Array<{ bit: number; ds: number; df: number }> = [
    { bit: 1, ds: 0, df: 1 },
    { bit: 2, ds: 1, df: 0 },
    { bit: 4, ds: 1, df: 1 },
    { bit: 8, ds: -1, df: 1 },
  ];

  for (const d of dirs) {
    if ((mask & d.bit) === 0) continue;

    // Walk backwards to the anchor of the old segment (owned by ownerId).
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

    // Clear the marker on the full forward segment.
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

function evalConnectEndOfTurn(state: GameState, playerIdx: number): { connectScore: number; tokensEarned: number } {
  const ps = state.players[playerIdx];
  const pid = ps.profile.id;
  let bonus = 0;
  let tokens = 0;

  // Connect directions: horizontal (frets), vertical (strings), diag / and diag \.
  const dirs: Array<[number, number]> = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
  ];

  const visited = new Set<string>();

  for (let lane = 0 as SlotType; lane <= 2; lane++) {
    const owners = state.board.owner[lane];
    const cct = state.board.claimedThisTurn[lane];
    const cc = state.board.connectClaimed[lane];

    for (let idx = 0; idx < state.cellCount; idx++) {
      // Only evaluate segments that could have changed this turn (at least one new claim).
      if (cct[idx] !== 1) continue;
      if (owners[idx] !== pid) continue;
      if (state.domainCellEnabled[idx] === 0) continue;

      for (const [ds, df] of dirs) {
        const dirBit = (ds === 0 && df === 1) ? 1 : (ds === 1 && df === 0) ? 2 : (ds === 1 && df === 1) ? 4 : 8;
        const step = (s: number, f: number, k: number): [number, number] => [s + ds * k, f + df * k];

        let s0 = stringOf(idx, state.fretCount);
        let f0 = fretOf(idx, state.fretCount);

        // Walk backwards to find the anchor of the full segment.
        while (true) {
          const [ps, pf] = step(s0, f0, -1);
          if (ps < 0 || ps >= 6 || pf < 0 || pf >= state.fretCount) break;
          const pi = cellIndexOf(ps, pf, state.fretCount);
          if (state.domainCellEnabled[pi] === 0) break;
          if (owners[pi] !== pid) break;
          s0 = ps; f0 = pf;
        }

        const anchorIdx = cellIndexOf(s0, f0, state.fretCount);
        const key = `${lane}:${anchorIdx}:${ds}:${df}`;
        if (visited.has(key)) continue;
        visited.add(key);

        // Collect the full contiguous segment forward from the anchor.
        const seg: number[] = [];
        let curS = s0, curF = f0;
        while (curS >= 0 && curS < 6 && curF >= 0 && curF < state.fretCount) {
          const ci = cellIndexOf(curS, curF, state.fretCount);
          if (state.domainCellEnabled[ci] === 0) break;
          if (owners[ci] !== pid) break;
          seg.push(ci);
          const next = step(curS, curF, 1);
          curS = next[0];
          curF = next[1];
        }

        if (seg.length < 4) continue;

        // Segment-based scoring (project canon):
        // - A "segment" is a contiguous 4+ run in a direction.
        // - Tokens are awarded ONCE per NEW segment (per lane+direction), regardless of length.
        // - Score points may still scale gently with extensions.
        let countedLen = 0;
        for (const ci of seg) if ((cc[ci] & dirBit) !== 0) countedLen++;

        const isNewSegment = countedLen < 4;
        if (isNewSegment) tokens += 1;

        // Base connect bonus once when the run first reaches 4.
        if (isNewSegment) bonus += 25;

        // Add incremental points for new length beyond what was previously counted (minimum 4).
        const prevLenForPoints = Math.max(4, countedLen);
        if (seg.length > prevLenForPoints) {
          bonus += 2 * (seg.length - prevLenForPoints);
        }

        // Mark this segment-direction as counted (allows a cell to participate in multiple directions).
        for (const ci of seg) cc[ci] = cc[ci] | dirBit;
      }
    }
  }

  return { connectScore: bonus, tokensEarned: tokens };
}

export function reducer(state: GameState | null, action: Action): { state: GameState; effects: Effect[] } {
  const effects: Effect[] = [];

  switch (action.type) {
    case "INIT_MATCH": {
      const s = createInitialState(action.settings, action.players, action.seed);
      const pick = pickNextPromptVariant(s, 0, false);
      let firstVid = pick.variantId;
      if (firstVid === null) {
        // Extremely defensive fallback: invalid domains/settings could yield no actionable variants.
        // In that case, pick the first allowed variant so the UI has something stable to render.
        let found: VariantId | null = null;
        for (let vid = 0; vid < 36; vid++) {
          if (pick.state.variants.allowed[vid] === 1) { found = vid as VariantId; break; }
        }
        firstVid = (found ?? 0) as VariantId;
      }
      pick.state.prompt.variantId = firstVid;
      effects.push({ type: "PROMPT_CHANGED", variantId: firstVid });
      return { state: pick.state, effects };
    }

    // --- Dev/Test helpers (non-gameplay) ---
    case "DEV_SET_CURRENT_PLAYER": {
      if (!state) throw new Error("State required");
      const n = state.players.length;
      const p = Math.max(0, Math.min(n - 1, action.playerIndex));
      state.currentPlayer = p;
      return { state, effects };
    }

    case "DEV_FORCE_PHASE": {
      if (!state) throw new Error("State required");
      state.phase = action.phase;
      if (action.phase === "LAST_CHANCE") state.lastChance.active = true;
      if (action.phase !== "LAST_CHANCE") state.lastChance.active = false;

      // Keep bonus state coherent when forcibly switching phases.
      if (action.phase === "BONUS") {
        const nextIdx = state.players.length > 0 ? ((state.currentPlayer + 1) % state.players.length) : 0;
        state.bonus = { active: true, playerIndex: state.currentPlayer, nextPlayerIndex: nextIdx, reason: "dev_force" };
      } else {
        state.bonus.active = false;
      }
      return { state, effects };
    }

    case "END_BONUS": {
      if (!state) throw new Error("State required");
      if (state.phase !== "BONUS") return { state, effects };

      const bonusPlayerIdx = state.bonus.active ? state.bonus.playerIndex : state.currentPlayer;
      const bonusPlayerId = state.players[bonusPlayerIdx]?.profile.id ?? 0;

      // Advance to the next player and return to the standard intermission flow.
      if (state.settings.playType === PlayType.MULTI && state.players.length > 1) {
        const nextIdx = state.bonus.active ? state.bonus.nextPlayerIndex : ((bonusPlayerIdx + 1) % state.players.length);
        state.currentPlayer = nextIdx;
        state.phase = "INTERMISSION";
        state.bonus.active = false;
        effects.push({ type: "TURN_ENDED", playerId: bonusPlayerId, nextPlayerId: state.players[nextIdx].profile.id });
        return { state, effects };
      }

      // Single-player fallback: end bonus and resume normal play.
      state.phase = state.lastChance.active ? "LAST_CHANCE" : "IN_MATCH";
      state.bonus.active = false;
      effects.push({ type: "TURN_ENDED", playerId: bonusPlayerId });
      return { state, effects };
    }

    case "DEV_SET_PAINT": {
      if (!state) throw new Error("State required");
      const cur = state.settings.dev ?? {
        enabled: false,
        paintPlayerIndex: 0,
        paintLane: "prompt" as const,
        paintMode: "paint" as const,
      };
      state.settings.dev = { ...cur, ...action.patch };
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
      // Clear per-player claim history used for vulnerability marking.
      for (const ps of state.players) {
        ps.lastClaimStackSize = 0;
        ps.turnsWithoutScore = 0;
      }
      state.variants.claimedRequired = 0;
      for (let vid = 0; vid < 36; vid++) state.variants.unclaimedByVariant[vid] = state.variants.requiredByVariant[vid];
      return { state, effects };
    }

    case "DEV_END_TURN": {
      if (!state) throw new Error("State required");
      // Ends the current turn immediately, applying end-of-turn scoring (connect bonuses, tokens, etc.)
      // without requiring a miss/timeout. Useful for testing.
      if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") return { state, effects };
      finalizeTurnWithPulse(state, effects, undefined);
      return { state, effects };
    }

    case "DEV_PLACE": {
      if (!state) throw new Error("State required");
      const { stringIndex, fretIndex, lane, set } = action;
      if (stringIndex < 0 || stringIndex >= 6 || fretIndex < 0 || fretIndex >= state.fretCount) return { state, effects };
      const ci = cellIndexOf(stringIndex, fretIndex, state.fretCount);
      if (state.domainCellEnabled[ci] === 0) return { state, effects };

      const owners = state.board.owner[lane];
      const prevOwner = owners[ci];
      const prevMask = state.board.connectClaimed[lane][ci];

      // If this cell is being changed/cleared and it was part of a counted segment,
      // clear the old segment markers so it can be re-scored later.
      if (prevOwner !== -1 && prevMask !== 0 && (set === 0 || action.ownerPlayerIndex < 0 || state.players[action.ownerPlayerIndex]?.profile.id !== prevOwner)) {
        clearConnectMarkersForBrokenCell(state, lane, ci, prevOwner, prevMask);
      }

      // Compute the target owner id for paint.
      const targetOwnerId = (set === 1 && action.ownerPlayerIndex >= 0 && action.ownerPlayerIndex < state.players.length)
        ? state.players[action.ownerPlayerIndex].profile.id
        : -1;

      const pc = state.cellPitchClass[ci] as any;
      const vid = toVariantId(pc, lane);
      const countsCell = state.variants.allowed[vid] === 1 && isValidSpelling(pc, lane);

      if (set === 1) {
        if (targetOwnerId === -1) return { state, effects };
        if (prevOwner === targetOwnerId) return { state, effects };
        // Adjust required counts if the cell transitions between unclaimed and claimed.
        if (countsCell && prevOwner === -1) {
          state.variants.unclaimedByVariant[vid] = Math.max(0, state.variants.unclaimedByVariant[vid] - 1);
          state.variants.claimedRequired += 1;
        }
        owners[ci] = targetOwnerId;
        state.board.vulnerable[lane][ci] = 0;
        state.board.claimedThisTurn[lane][ci] = 1;
        state.board.connectClaimed[lane][ci] = 0;
      } else {
        if (prevOwner === -1) return { state, effects };
        if (countsCell) {
          state.variants.unclaimedByVariant[vid] = Math.min(state.variants.requiredByVariant[vid], state.variants.unclaimedByVariant[vid] + 1);
          state.variants.claimedRequired = Math.max(0, state.variants.claimedRequired - 1);
        }
        owners[ci] = -1;
        state.board.vulnerable[lane][ci] = 0;
        state.board.claimedThisTurn[lane][ci] = 0;
        state.board.connectClaimed[lane][ci] = 0;
      }

      return { state, effects };
    }

    case "UPDATE_SETTINGS": {
      // Apply updated settings without resetting the match (domain changes should restart the match).
      if (!state) throw new Error("State required");
      state.settings = action.settings;
      return { state, effects };
    }

    case "START_TURN": {
      if (!state) throw new Error("State required");
      if (state.phase === "RESULTS") return { state, effects };

      // Bonus stage must be explicitly ended before a new turn can start.
      if (state.phase === "BONUS") return { state, effects };

      // Phase marker (mainly for UI labels).
      state.phase = state.lastChance.active ? "LAST_CHANCE" : "IN_MATCH";

      state.turnCounter += 1;

      clearClaimedThisTurn(state);

      state.turn.correctCount = 0;
      state.turn.wrongCount = 0;
      state.turn.tries = 0;
      state.turn.streakCount = 0;
      state.turn.streakTier = 0;
      state.turn.breakBonusTier = 0;

      // In last chance, only actionable steal prompts should be generated.
      const strict = state.lastChance.active;
      const pick = pickNextPromptVariant(state, state.currentPlayer, strict);
      state = pick.state;

      if (pick.variantId === null) {
        // Nothing actionable for this player (e.g., no tokens or no legal steals).
        finalizeTurnWithPulse(state, effects);
        return { state, effects };
      }

      state.prompt.variantId = pick.variantId;
      effects.push({ type: "PROMPT_CHANGED", variantId: state.prompt.variantId });
      return { state, effects };
    }

    case "TAP_CELL": {
      if (!state) throw new Error("State required");
      if (state.settings.modeId !== ModeId.FRETBOARD && state.settings.modeId !== ModeId.TAB) return { state, effects };


      if (state.phase !== "IN_MATCH") return { state, effects };
      // During last chance, we ignore non-steal taps to prevent accidental turn kills.
      if (state.lastChance.active) return { state, effects };

      const res = tryNormalTap(state, state.currentPlayer, action.stringIndex, action.fretIndex);
      effects.push(...res.effects);

      if (res.ended) {
        finalizeTurnWithPulse(state, effects, res.endVariantId);
      }
      return { state, effects };
    }

    case "STEAL_CELL": {
      if (!state) throw new Error("State required");
      if (state.settings.modeId !== ModeId.FRETBOARD && state.settings.modeId !== ModeId.TAB) return { state, effects };


      if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") return { state, effects };
      const res = tryStealTap(state, state.currentPlayer, action.stringIndex, action.fretIndex);
      effects.push(...res.effects);

      if (res.ended) {
        finalizeTurnWithPulse(state, effects, res.endVariantId);
      }
      return { state, effects };
    }

    case "TIMEOUT": {
      if (!state) throw new Error("State required");
      if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") return { state, effects };
      const endedVariant = state.prompt.variantId;
      const endedPid = state.players[state.currentPlayer].profile.id;

      effects.push(...endTurnForWrong(state, endedPid));
      finalizeTurnWithPulse(state, effects, endedVariant);
      return { state, effects };
    }

    case "USE_HINT": {
      if (!state) throw new Error("State required");
      // Hints are an assist available in Learning + Easy difficulties during normal play.
      if (state.settings.difficulty !== Difficulty.EASY && state.settings.difficulty !== Difficulty.LEARNING) return { state, effects };
      if (state.phase !== "IN_MATCH") return { state, effects };
      // During last chance, only steals are permitted.
      if (state.lastChance.active) return { state, effects };

      const endedPlayerIdx = state.currentPlayer;
      const endedPid = state.players[endedPlayerIdx].profile.id;
      const endedVariant = state.prompt.variantId;

      const scoreBefore = state.players[endedPlayerIdx].score;
      state.players[endedPlayerIdx].score = Math.max(0, scoreBefore - HINT_PENALTY_POINTS);

      // Counts as a turn action: increments tries, resets streak/bonus.
      state.turn.tries += 1;
      state.turn.streakCount = 0;
      state.turn.streakTier = 0;
      clearBreakBonusOnTurnEndOrMiss(state);

      // Always disable fire mode on a hint (same as a miss).
      effects.push({ type: "FIRE_MODE", playerId: endedPid, enabled: false });

      // End the turn, but suppress the standard SAM pulse so we can emit a dedicated hint pulse.
      finalizeTurnWithPulse(state, effects, undefined);

      // Dedicated hint pulse (always shown, even if SAM is disabled).
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
  }
}

function finalizeTurnWithPulse(state: GameState, effects: Effect[], endedVariantId?: VariantId) {
  const endedPlayerIdx = state.currentPlayer;
  const endedPlayerId = state.players[endedPlayerIdx].profile.id;

  const scoreBeforeFinalize = state.players[endedPlayerIdx].score;

  const { connectScore, tokensEarned } = evalConnectEndOfTurn(state, endedPlayerIdx);
  if (connectScore > 0) state.players[endedPlayerIdx].score += connectScore;

  // In last chance we do not mint new tokens; players only spend what they banked.
  const tokensToAward = state.lastChance.active ? 0 : tokensEarned;
  if (tokensToAward > 0) awardTokens(state, endedPlayerIdx, tokensToAward);

  applyTurnScorelessTracking(state, endedPlayerIdx);
  clearPlayerVulnerableIfScored(state, endedPlayerIdx);

  const boardFull = isBoardFull(state);
  const totalRounds = Math.max(1, state.settings.fixedRoundsTotal || 1);

  // When the board fills, either advance to the next round or finish the match.
  // "Blackout" is the core win condition; "Rounds" simply repeats it N times.
  let startedLastChance = false;
  let matchCompletedNow = false;

  // Board completion is the core win condition for this shell.
  // Rounds simply repeat the blackout condition N times.
  // (Older builds included additional match types; those are intentionally consolidated.)
  if (!state.lastChance.active && boardFull) {
    if (state.roundIndex < totalRounds) {
      effects.push({ type: "ROUND_COMPLETE", completedRound: state.roundIndex, totalRounds });
      state.roundIndex += 1;
      resetBoardForNewRound(state);
    } else {
      const isMulti = state.settings.playType === PlayType.MULTI && state.players.length > 1;
      const anyTokens = state.players.some((p) => p.tokenCount > 0);

      if (isMulti && anyTokens) {
        // Start order begins with the next player after the one who filled the board.
        const startIdx = (endedPlayerIdx + 1) % state.players.length;
        const orderList: number[] = [];
        for (let i = 0; i < state.players.length; i++) {
          const idx = (startIdx + i) % state.players.length;
          // Only include players who (a) have tokens and (b) have at least one legal steal.
          if (state.players[idx].tokenCount > 0 && playerHasAnyActionablePrompt(state, idx)) {
            orderList.push(idx);
          }
        }

        if (orderList.length === 0) {
          state.phase = "RESULTS";
          matchCompletedNow = true;
          effects.push({ type: "MATCH_COMPLETE", roundsCompleted: state.roundIndex, totalRounds });
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
        effects.push({ type: "MATCH_COMPLETE", roundsCompleted: state.roundIndex, totalRounds });
      }
    }
  }


  // Pulse (optional)
  emitPulseIfEnabled(state, effects, endedPlayerIdx, endedPlayerId, endedVariantId, scoreBeforeFinalize);

  clearBreakBonusOnTurnEndOrMiss(state);

  // If we completed the match above, stop here.
  if (matchCompletedNow) return;

  // --- Bonus stage scaffold ---
  // Bonus is multiplayer-only and sits between the end of a player's turn and the normal
  // TURN_ENDED intermission. For now, eligibility is dev-driven (forceBonusOnTurnEnd) so
  // we can build/test the flow before chord/scale detection is finished.
  const devForceBonus = !!state.settings.dev?.enabled && !!state.settings.dev?.forceBonusOnTurnEnd;
  const canBonus =
    devForceBonus &&
    state.settings.playType === PlayType.MULTI &&
    state.players.length > 1 &&
    !state.lastChance.active &&
    !boardFull;

  if (canBonus) {
    const nextIdx = (endedPlayerIdx + 1) % state.players.length;
    state.bonus = { active: true, playerIndex: endedPlayerIdx, nextPlayerIndex: nextIdx, reason: "dev_force" };
    state.phase = "BONUS";
    effects.push({ type: "BONUS_STARTED", playerId: endedPlayerId, reason: "dev_force" });
    return;
  }

  // Advance to next player / next last-chance slot.
  if (state.settings.playType === PlayType.MULTI) {
    if (state.lastChance.active) {
      if (!startedLastChance) {
        // Advance to the next player in the last-chance queue who can actually act.
        // (If a player has tokens but no legal steals exist, we skip them so the game can end cleanly.)
        let nextPos = state.lastChance.pos + 1;
        while (nextPos < state.lastChance.order.length) {
          const idx = state.lastChance.order[nextPos];
          if ((state.players[idx]?.tokenCount ?? 0) > 0 && playerHasAnyActionablePrompt(state, idx)) break;
          nextPos++;
        }
        if (nextPos >= state.lastChance.order.length) {
          // Last chance finished.
          state.lastChance.active = false;
          state.phase = "RESULTS";
          effects.push({ type: "MATCH_COMPLETE", roundsCompleted: state.roundIndex, totalRounds });
          return;
        }
        state.lastChance.pos = nextPos;
        state.currentPlayer = state.lastChance.order[nextPos];
      }
      state.phase = "INTERMISSION";
      effects.push({ type: "TURN_ENDED", playerId: endedPlayerId, nextPlayerId: state.players[state.currentPlayer].profile.id });
      return;
    }

    state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    state.phase = "INTERMISSION";
    effects.push({ type: "TURN_ENDED", playerId: endedPlayerId, nextPlayerId: state.players[state.currentPlayer].profile.id });
    return;
  }

  // Single player
  state.phase = state.lastChance.active ? "LAST_CHANCE" : "IN_MATCH";
  effects.push({ type: "TURN_ENDED", playerId: endedPlayerId });
}

function emitPulseIfEnabled(
  state: GameState,
  effects: Effect[],
  endedPlayerIdx: number,
  endedPlayerId: number,
  endedVariantId: VariantId | undefined,
  scoreBeforeFinalize: number,
) {
  if (!state.settings.feedback.samEnabled) return;
  if (endedVariantId === undefined) return;

  const scoreAfterFinalize = state.players[endedPlayerIdx].score;
  const scoreDelta = scoreAfterFinalize - scoreBeforeFinalize;

  const revealAll = state.settings.feedback.samRevealMode === "all";
  const ghosts = revealAll ? pickGhostTargets(state, endedVariantId, endedPlayerIdx) : undefined;
  const ghost = revealAll ? (ghosts && ghosts.length ? ghosts[0] : null) : pickGhostTarget(state, endedVariantId, endedPlayerIdx);

  effects.push({
    type: "FEEDBACK_PULSE",
    playerId: endedPlayerId,
    variantId: endedVariantId,
    durationMs: state.settings.feedback.samDurationMs,
    ghost,
    ghosts,
    scoreDelta,
    includeLabel: state.settings.feedback.samIncludeLabel,
  });
}

export function settingsHash(settings: GameSettings): string {
  // Dev/Test settings should not split leaderboards.
  const { dev: _dev, ...rest } = settings as any;
  const canon = stableStringify(rest);
  return fnv1a32(canon);
}
