/**
 * Guitar Education Game - Module Index
 *
 * Main entry point for the guitar game engine.
 *
 * @module guitar-game
 */

// Core types
export * from "./types";

// Music theory utilities
export * from "./music";

// Hash and RNG utilities
export * from "./hash";

// Prompt profile system
export * from "./promptProfiles";

// Storage persistence
export * from "./storage";

// Audio feedback
export * from "./audio";

// Main game engine
export { reducer, settingsHash } from "./engineReducer";

// React hook
export { useGameEngine } from "./useGameEngine";
export type {
  GameEngineState,
  GameEngineActions,
  UseGameEngineReturn,
} from "./useGameEngine";

// Audio hook
export { useGameAudio } from "./useGameAudio";

// Type imports for engine reducer
export type { Action, Effect, GameState } from "./types";
