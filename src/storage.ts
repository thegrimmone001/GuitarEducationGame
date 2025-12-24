import { GameSettings, PlayType, ModeId } from "./types";
import { settingsHash } from "./engineReducer";

const SETTINGS_KEY = "gedu.settings.v1";

export interface ScoreEntry {
  name: string;
  score: number;
  // Total active gameplay time (milliseconds) used to achieve the score.
  // This intentionally excludes intermission waiting and paused time.
  // (Older leaderboard entries may not have this field.)
  durationMs?: number;
  atIso: string;
}

function lbKey(settings: GameSettings): string {
  const h = settingsHash(settings);
  return `gedu.lb.v1.${settings.modeId}.${settings.playType}.${h}`;
}

export function saveSettings(settings: GameSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): GameSettings | null {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as GameSettings; } catch { return null; }
}

export function recordScore(settings: GameSettings, name: string, score: number, durationMs?: number) {
  const key = lbKey(settings);
  const raw = localStorage.getItem(key);
  const arr: ScoreEntry[] = raw ? (JSON.parse(raw) as ScoreEntry[]) : [];
  arr.push({ name, score, durationMs, atIso: new Date().toISOString() });
  // Primary sort: score desc.
  // Secondary sort: duration asc (faster is better), if both entries have a duration.
  arr.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const ad = a.durationMs;
    const bd = b.durationMs;
    if (typeof ad === "number" && typeof bd === "number") return ad - bd;
    if (typeof ad === "number" && typeof bd !== "number") return -1;
    if (typeof ad !== "number" && typeof bd === "number") return 1;
    return 0;
  });
  const trimmed = arr.slice(0, 50);
  localStorage.setItem(key, JSON.stringify(trimmed));
}

export function getLeaderboard(settings: GameSettings): ScoreEntry[] {
  const key = lbKey(settings);
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try { return JSON.parse(raw) as ScoreEntry[]; } catch { return []; }
}
