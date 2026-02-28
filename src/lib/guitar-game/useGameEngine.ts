/**
 * Guitar Education Game - React Hook
 *
 * Provides React integration for the game engine.
 *
 * @module guitar-game/useGameEngine
 */

"use client";

import { useReducer, useCallback, useMemo, useRef, useEffect } from "react";
import {
  reducer,
  GameState,
  GameSettings,
  PlayerProfile,
  Action,
  Effect,
  ModeId,
  PlayType,
  Difficulty,
  SlotType,
  MatchType,
} from "@/lib/guitar-game";

// ============================================================================
// DEFAULT SETTINGS
// ============================================================================

/**
 * Create default game settings
 */
function defaultSettings(): GameSettings {
  return {
    modeId: ModeId.FRETBOARD,
    playType: PlayType.MULTI,
    matchType: MatchType.BLACKOUT,
    difficulty: Difficulty.MEDIUM,
    fixedRoundsTotal: 3,
    timers: {
      turnMs: 15_000,
      intermissionMs: 900,
    },
    domain: {
      fretCount: 25,
      minFret: 0,
      maxFret: 24,
      enabledStrings: [true, true, true, true, true, true],
    },
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
    dev: {
      enabled: false,
      paintPlayerIndex: 0,
      paintLane: "prompt",
      paintMode: "paint",
      forceBonusOnTurnEnd: false,
    },
    promptProfileId: "chromatic",
  };
}

/**
 * Normalize partial settings with defaults
 */
function normalizeSettings(partial?: Partial<GameSettings>): GameSettings {
  const defaults = defaultSettings();
  if (!partial) return defaults;

  return {
    ...defaults,
    ...partial,
    timers: { ...defaults.timers, ...partial.timers },
    domain: { ...defaults.domain, ...partial.domain },
    feedback: { ...defaults.feedback, ...partial.feedback },
    steal: { ...defaults.steal, ...partial.steal },
    accessibility: {
      ...defaults.accessibility,
      ...partial.accessibility,
    },
    dev: { ...defaults.dev, ...partial.dev },
  };
}

// ============================================================================
// PLAYER PROFILES
// ============================================================================

/**
 * Create default player profiles
 */
function makePlayers(n: number): PlayerProfile[] {
  const count = Math.max(1, Math.min(16, n));
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `P${i + 1}`,
    colorId: i,
    patternId: i,
  }));
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface GameEngineState {
  /** Current game state (null if not initialized) */
  gameState: GameState | null;
  /** Game settings */
  settings: GameSettings;
  /** Player profiles */
  players: PlayerProfile[];
  /** Whether a match is in progress */
  isPlaying: boolean;
  /** Current turn timer value (ms remaining, 0 if not running) */
  timerValue: number;
  /** Whether timer is paused */
  timerPaused: boolean;
  /** Current callout text */
  callout: string | null;
  /** Players in "fire mode" */
  firePlayers: Set<number>;
  /** Last effects from the reducer */
  lastEffects: Effect[];
}

export interface GameEngineActions {
  /** Start a new match */
  startMatch: () => void;
  /** End current match */
  endMatch: () => void;
  /** Start the current turn */
  startTurn: () => void;
  /** Handle cell tap */
  tapCell: (stringIndex: number, fretIndex: number) => void;
  /** Handle steal attempt */
  stealCell: (stringIndex: number, fretIndex: number) => void;
  /** End bonus phase */
  endBonus: () => void;
  /** Use hint (costs points) */
  useHint: () => void;
  /** Handle timeout */
  timeout: () => void;
  /** Update settings */
  updateSettings: (settings: Partial<GameSettings>) => void;
  /** Set player count */
  setPlayerCount: (count: number) => void;
  /** Set player name */
  setPlayerName: (playerId: number, name: string) => void;
  /** Set player color/icon */
  setPlayerColor: (playerId: number, colorId: number) => void;
  /** Set game mode */
  setMode: (modeId: ModeId) => void;
  /** Set difficulty */
  setDifficulty: (difficulty: Difficulty) => void;
  /** Set play type (single/multi) */
  setPlayType: (playType: PlayType) => void;
  /** Toggle timer pause */
  togglePause: () => void;
  /** Dev: set current player */
  devSetCurrentPlayer: (playerIndex: number) => void;
  /** Dev: force phase */
  devForcePhase: (phase: GameState["phase"]) => void;
  /** Dev: place claim */
  devPlace: (
    stringIndex: number,
    fretIndex: number,
    lane: SlotType,
    ownerPlayerIndex: number,
    set: 0 | 1
  ) => void;
  /** Dev: clear board */
  devClearBoard: () => void;
}

export type UseGameEngineReturn = GameEngineState & GameEngineActions;

// ============================================================================
// REDUCER FOR UI STATE
// ============================================================================

interface UIState {
  settings: GameSettings;
  players: PlayerProfile[];
  isPlaying: boolean;
  timerValue: number;
  timerPaused: boolean;
  callout: string | null;
  firePlayers: Set<number>;
  lastEffects: Effect[];
  gameState: GameState | null;
}

type UIAction =
  | { type: "INIT_MATCH"; gameState: GameState; effects: Effect[] }
  | { type: "UPDATE_STATE"; gameState: GameState; effects: Effect[] }
  | { type: "UPDATE_SETTINGS"; settings: GameSettings }
  | { type: "SET_PLAYERS"; players: PlayerProfile[] }
  | { type: "SET_PLAYER_NAME"; playerId: number; name: string }
  | { type: "SET_PLAYER_COLOR"; playerId: number; colorId: number }
  | { type: "END_MATCH" }
  | { type: "SET_TIMER"; value: number }
  | { type: "TOGGLE_PAUSE" }
  | { type: "SET_CALLOUT"; text: string | null }
  | { type: "SET_FIRE"; playerId: number; enabled: boolean }
  | { type: "CLEAR_EFFECTS" };

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "INIT_MATCH":
      return {
        ...state,
        gameState: action.gameState,
        isPlaying: true,
        timerPaused: false,
        lastEffects: action.effects,
      };

    case "UPDATE_STATE": {
      // Process effects
      let newCallout = state.callout;
      const newFirePlayers: Set<number> = new Set(state.firePlayers);

      for (const fx of action.effects) {
        if (fx.type === "STREAK_CALLOUT") {
          newCallout = fx.message;
        } else if (fx.type === "FIRE_MODE") {
          if (fx.enabled) {
            newFirePlayers.add(fx.playerId);
          } else {
            newFirePlayers.delete(fx.playerId);
          }
        }
      }

      return {
        ...state,
        gameState: action.gameState,
        lastEffects: action.effects,
        callout: newCallout,
        firePlayers: newFirePlayers,
      };
    }

    case "UPDATE_SETTINGS":
      return { ...state, settings: action.settings };

    case "SET_PLAYERS":
      return { ...state, players: action.players };

    case "SET_PLAYER_NAME":
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.playerId ? { ...p, name: action.name } : p
        ),
      };

    case "SET_PLAYER_COLOR":
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.playerId ? { ...p, colorId: action.colorId } : p
        ),
      };

    case "END_MATCH":
      return {
        ...state,
        isPlaying: false,
        timerPaused: false,
        callout: null,
        firePlayers: new Set<number>(),
      };

    case "SET_TIMER":
      return { ...state, timerValue: action.value };

    case "TOGGLE_PAUSE":
      return { ...state, timerPaused: !state.timerPaused };

    case "SET_CALLOUT":
      return { ...state, callout: action.text };

    case "CLEAR_EFFECTS":
      return { ...state, lastEffects: [] };

    default:
      return state;
  }
}

// ============================================================================
// MAIN HOOK
// ============================================================================

/**
 * Hook for managing game engine state in React
 */
export function useGameEngine(): UseGameEngineReturn {
  const [state, dispatch] = useReducer(uiReducer, {
    settings: defaultSettings(),
    players: makePlayers(2),
    isPlaying: false,
    timerValue: 0,
    timerPaused: false,
    callout: null,
    firePlayers: new Set<number>(),
    lastEffects: [],
    gameState: null,
  });

  // Use ref to track game state across renders without triggering re-renders
  const gameStateRef = useRef<GameState | null>(null);

  // Sync ref with state using useEffect (not during render)
  useEffect(() => {
    gameStateRef.current = state.gameState;
  }, [state.gameState]);

  // Dispatch an action to the game engine
  const dispatchGameAction = useCallback((action: Action) => {
    if (!gameStateRef.current) return;

    const result = reducer(gameStateRef.current, action);
    gameStateRef.current = result.state;
    dispatch({
      type: "UPDATE_STATE",
      gameState: result.state,
      effects: result.effects,
    });
  }, []);

  // Start a new match
  const startMatch = useCallback(() => {
    const seed = Date.now() ^ Math.random() * 0xffffffff;
    const result = reducer(null, {
      type: "INIT_MATCH",
      settings: state.settings,
      players: state.players,
      seed,
    });
    gameStateRef.current = result.state;
    dispatch({
      type: "INIT_MATCH",
      gameState: result.state,
      effects: result.effects,
    });
  }, [state.settings, state.players]);

  // End current match
  const endMatch = useCallback(() => {
    dispatchGameAction({ type: "END_MATCH" });
    dispatch({ type: "END_MATCH" });
  }, [dispatchGameAction]);

  // Start turn
  const startTurn = useCallback(() => {
    dispatchGameAction({ type: "START_TURN" });
  }, [dispatchGameAction]);

  // Tap cell
  const tapCell = useCallback(
    (stringIndex: number, fretIndex: number) => {
      dispatchGameAction({ type: "TAP_CELL", stringIndex, fretIndex });
    },
    [dispatchGameAction]
  );

  // Steal cell
  const stealCell = useCallback(
    (stringIndex: number, fretIndex: number) => {
      dispatchGameAction({ type: "STEAL_CELL", stringIndex, fretIndex });
    },
    [dispatchGameAction]
  );

  // End bonus
  const endBonus = useCallback(() => {
    dispatchGameAction({ type: "END_BONUS" });
  }, [dispatchGameAction]);

  // Use hint
  const useHint = useCallback(() => {
    dispatchGameAction({ type: "USE_HINT" });
  }, [dispatchGameAction]);

  // Timeout
  const timeout = useCallback(() => {
    dispatchGameAction({ type: "TIMEOUT" });
  }, [dispatchGameAction]);

  // Update settings
  const updateSettings = useCallback(
    (partial: Partial<GameSettings>) => {
      const newSettings = normalizeSettings({ ...state.settings, ...partial });
      dispatch({ type: "UPDATE_SETTINGS", settings: newSettings });
    },
    [state.settings]
  );

  // Set player count
  const setPlayerCount = useCallback(
    (count: number) => {
      const newPlayers = makePlayers(count).map((p, i) => ({
        ...p,
        name: state.players[i]?.name ?? p.name,
        colorId: state.players[i]?.colorId ?? p.colorId,
      }));
      dispatch({ type: "SET_PLAYERS", players: newPlayers });
    },
    [state.players]
  );

  // Set player name
  const setPlayerName = useCallback((playerId: number, name: string) => {
    dispatch({ type: "SET_PLAYER_NAME", playerId, name });
  }, []);

  // Set player color/icon
  const setPlayerColor = useCallback((playerId: number, colorId: number) => {
    dispatch({ type: "SET_PLAYER_COLOR", playerId, colorId });
  }, []);

  // Set mode
  const setMode = useCallback(
    (modeId: ModeId) => {
      updateSettings({ modeId });
    },
    [updateSettings]
  );

  // Set difficulty
  const setDifficulty = useCallback(
    (difficulty: Difficulty) => {
      updateSettings({ difficulty });
    },
    [updateSettings]
  );

  // Set play type
  const setPlayType = useCallback(
    (playType: PlayType) => {
      updateSettings({ playType });
      if (playType === PlayType.SINGLE && state.players.length !== 1) {
        dispatch({ type: "SET_PLAYERS", players: makePlayers(1) });
      } else if (playType === PlayType.MULTI && state.players.length < 2) {
        dispatch({ type: "SET_PLAYERS", players: makePlayers(2) });
      }
    },
    [updateSettings, state.players.length]
  );

  // Toggle pause
  const togglePause = useCallback(() => {
    dispatch({ type: "TOGGLE_PAUSE" });
  }, []);

  // Dev actions
  const devSetCurrentPlayer = useCallback(
    (playerIndex: number) => {
      dispatchGameAction({ type: "DEV_SET_CURRENT_PLAYER", playerIndex });
    },
    [dispatchGameAction]
  );

  const devForcePhase = useCallback(
    (phase: GameState["phase"]) => {
      dispatchGameAction({ type: "DEV_FORCE_PHASE", phase });
    },
    [dispatchGameAction]
  );

  const devPlace = useCallback(
    (
      stringIndex: number,
      fretIndex: number,
      lane: SlotType,
      ownerPlayerIndex: number,
      set: 0 | 1
    ) => {
      dispatchGameAction({
        type: "DEV_PLACE",
        stringIndex,
        fretIndex,
        lane,
        ownerPlayerIndex,
        set,
      });
    },
    [dispatchGameAction]
  );

  const devClearBoard = useCallback(() => {
    dispatchGameAction({ type: "DEV_CLEAR_BOARD" });
  }, [dispatchGameAction]);

  // Computed values
  const currentPlayer = useMemo(() => {
    if (!state.gameState) return null;
    return state.players[state.gameState.currentPlayer] ?? null;
  }, [state.gameState, state.players]);

  const promptVariant = useMemo(() => {
    return state.gameState?.prompt.variantId ?? null;
  }, [state.gameState]);

  // Return all state and actions
  return {
    // State
    gameState: state.gameState,
    settings: state.settings,
    players: state.players,
    isPlaying: state.isPlaying,
    timerValue: state.timerValue,
    timerPaused: state.timerPaused,
    callout: state.callout,
    firePlayers: state.firePlayers,
    lastEffects: state.lastEffects,

    // Actions
    startMatch,
    endMatch,
    startTurn,
    tapCell,
    stealCell,
    endBonus,
    useHint,
    timeout,
    updateSettings,
    setPlayerCount,
    setPlayerName,
    setPlayerColor,
    setMode,
    setDifficulty,
    setPlayType,
    togglePause,
    devSetCurrentPlayer,
    devForcePhase,
    devPlace,
    devClearBoard,
  };
}
