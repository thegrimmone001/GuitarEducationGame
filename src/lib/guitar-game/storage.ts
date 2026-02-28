/**
 * Guitar Education Game - Storage Module
 *
 * Handles persistence of game settings and leaderboard data.
 * Uses localStorage for browser persistence.
 *
 * @module guitar-game/storage
 */

import { GameSettings, PlayerProfile } from "./types";
import { settingsHash } from "./engineReducer";

// ============================================================================
// STORAGE KEYS
// ============================================================================

const STORAGE_KEY_PREFIX = "gedu_";
const SETTINGS_KEY = `${STORAGE_KEY_PREFIX}settings`;
const LEADERBOARD_KEY = `${STORAGE_KEY_PREFIX}leaderboard`;

// ============================================================================
// TYPES
// ============================================================================

/**
 * Leaderboard entry
 */
export interface LeaderboardEntry {
  /** Player name */
  name: string;
  /** Final score */
  score: number;
  /** Match duration in milliseconds */
  durationMs: number;
  /** Timestamp of completion */
  timestamp: number;
  /** Settings hash for filtering */
  settingsHash: string;
  /** Game mode */
  modeId: string;
  /** Prompt profile */
  promptProfileId: string;
}

/**
 * Stored leaderboard data
 */
interface StoredLeaderboard {
  version: number;
  entries: LeaderboardEntry[];
}

// ============================================================================
// SETTINGS PERSISTENCE
// ============================================================================

/**
 * Save game settings to localStorage
 *
 * @param settings - Settings to save
 */
export function saveSettings(settings: GameSettings): void {
  try {
    const json = JSON.stringify(settings);
    localStorage.setItem(SETTINGS_KEY, json);
  } catch (e) {
    console.error("[storage] Failed to save settings:", e);
  }
}

/**
 * Load game settings from localStorage
 *
 * @returns Saved settings or null if not found
 */
export function loadSettings(): Partial<GameSettings> | null {
  try {
    const json = localStorage.getItem(SETTINGS_KEY);
    if (!json) return null;
    return JSON.parse(json) as Partial<GameSettings>;
  } catch (e) {
    console.error("[storage] Failed to load settings:", e);
    return null;
  }
}

/**
 * Clear saved settings
 */
export function clearSettings(): void {
  try {
    localStorage.removeItem(SETTINGS_KEY);
  } catch (e) {
    console.error("[storage] Failed to clear settings:", e);
  }
}

// ============================================================================
// LEADERBOARD PERSISTENCE
// ============================================================================

/**
 * Get the current leaderboard for a settings profile
 *
 * @param settings - Current game settings (for hash filtering)
 * @returns Array of leaderboard entries
 */
export function getLeaderboard(settings: GameSettings): LeaderboardEntry[] {
  try {
    const json = localStorage.getItem(LEADERBOARD_KEY);
    if (!json) return [];

    const data = JSON.parse(json) as StoredLeaderboard;
    if (!data.entries || !Array.isArray(data.entries)) return [];

    // Filter by settings hash
    const hash = settingsHash(settings);
    return data.entries.filter(e => e.settingsHash === hash);
  } catch (e) {
    console.error("[storage] Failed to load leaderboard:", e);
    return [];
  }
}

/**
 * Record a score on the leaderboard
 *
 * @param settings - Current game settings
 * @param players - Player profiles
 * @param scores - Final scores per player
 * @param durationMs - Match duration
 */
export function recordScore(
  settings: GameSettings,
  players: PlayerProfile[],
  scores: number[],
  durationMs: number
): void {
  try {
    const hash = settingsHash(settings);

    // Load existing data
    const json = localStorage.getItem(LEADERBOARD_KEY);
    const data: StoredLeaderboard = json
      ? (JSON.parse(json) as StoredLeaderboard)
      : { version: 1, entries: [] };

    // Add entries for each player
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const score = scores[i] ?? 0;

      // Only record positive scores
      if (score <= 0) continue;

      const entry: LeaderboardEntry = {
        name: player.name,
        score,
        durationMs,
        timestamp: Date.now(),
        settingsHash: hash,
        modeId: settings.modeId,
        promptProfileId: settings.promptProfileId,
      };

      data.entries.push(entry);
    }

    // Sort by score descending
    data.entries.sort((a, b) => b.score - a.score);

    // Keep only top 100 entries per hash
    const byHash = new Map<string, LeaderboardEntry[]>();
    for (const e of data.entries) {
      const arr = byHash.get(e.settingsHash) ?? [];
      if (arr.length < 100) arr.push(e);
      byHash.set(e.settingsHash, arr);
    }

    data.entries = Array.from(byHash.values()).flat();

    // Save
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("[storage] Failed to record score:", e);
  }
}

/**
 * Clear all leaderboard data
 */
export function clearLeaderboard(): void {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
  } catch (e) {
    console.error("[storage] Failed to clear leaderboard:", e);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format a duration in milliseconds to a readable string
 *
 * @param ms - Duration in milliseconds
 * @returns Formatted string (e.g., "1:30")
 */
export function formatDuration(ms?: number): string {
  if (typeof ms !== "number" || !isFinite(ms) || ms < 0) return "—";

  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;

  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Export all data for backup
 *
 * @returns JSON string of all stored data
 */
export function exportAllData(): string {
  const data = {
    settings: loadSettings(),
    leaderboard: localStorage.getItem(LEADERBOARD_KEY),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Import data from backup
 *
 * @param json - JSON string from exportAllData
 */
export function importAllData(json: string): boolean {
  try {
    const data = JSON.parse(json);

    if (data.settings) {
      saveSettings(data.settings as GameSettings);
    }

    if (data.leaderboard) {
      localStorage.setItem(LEADERBOARD_KEY, data.leaderboard);
    }

    return true;
  } catch (e) {
    console.error("[storage] Failed to import data:", e);
    return false;
  }
}
