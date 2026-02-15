import { GameSettings, PlayType, ModeId } from "./types";
import { settingsHash } from "./engineReducer";
import { loadSnapshot, makeSnapshot, parseSnapshot, saveSnapshot, serializeSnapshot } from "./persistence";

const SETTINGS_KEY = "gedu.settings.v1";
const SNAPSHOT_EXPORT_NAME = "guitaredu-save.json";

// --- IndexedDB snapshot (USB-friendly) ---
let persistTimer: number | null = null;

function listLeaderboardKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("gedu.lb.v1.")) keys.push(k);
  }
  return keys;
}

async function persistSnapshotNow(): Promise<void> {
  const settingsRaw = localStorage.getItem(SETTINGS_KEY);
  let settings: GameSettings | null = null;
  if (settingsRaw) {
    try { settings = JSON.parse(settingsRaw) as GameSettings; } catch { settings = null; }
  }

  const leaderboards: Record<string, ScoreEntry[]> = {};
  for (const k of listLeaderboardKeys()) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try { leaderboards[k] = JSON.parse(raw) as ScoreEntry[]; } catch { /* ignore */ }
  }

  const snap = makeSnapshot(settings, leaderboards);
  await saveSnapshot(snap);
}

function scheduleSnapshotPersist(): void {
  if (persistTimer != null) window.clearTimeout(persistTimer);
  // Debounce to avoid hammering IndexedDB.
  persistTimer = window.setTimeout(() => {
    persistTimer = null;
    void persistSnapshotNow();
  }, 150);
}

export async function hydrateFromIndexedDb(): Promise<boolean> {
  const snap = await loadSnapshot();
  if (!snap) return false;

  // If we already have a settings object locally, assume this environment is the source of truth.
  // (Avoid overwriting local dev work.)
  const hasLocal = !!localStorage.getItem(SETTINGS_KEY);
  if (hasLocal) return false;

  if (snap.settings) localStorage.setItem(SETTINGS_KEY, JSON.stringify(snap.settings));
  for (const [k, arr] of Object.entries(snap.leaderboards ?? {})) {
    localStorage.setItem(k, JSON.stringify(arr ?? []));
  }
  return true;
}

export function exportSnapshotToDownload(): void {
  const settingsRaw = localStorage.getItem(SETTINGS_KEY);
  let settings: GameSettings | null = null;
  if (settingsRaw) {
    try { settings = JSON.parse(settingsRaw) as GameSettings; } catch { settings = null; }
  }
  const leaderboards: Record<string, ScoreEntry[]> = {};
  for (const k of listLeaderboardKeys()) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try { leaderboards[k] = JSON.parse(raw) as ScoreEntry[]; } catch { /* ignore */ }
  }

  const raw = serializeSnapshot(makeSnapshot(settings, leaderboards));
  const blob = new Blob([raw], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = SNAPSHOT_EXPORT_NAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function importSnapshotFromText(raw: string): Promise<{ ok: boolean; reason?: string }> {
  const snap = parseSnapshot(raw);
  if (!snap) return { ok: false, reason: "Invalid snapshot format" };
  // Apply to localStorage
  if (snap.settings) localStorage.setItem(SETTINGS_KEY, JSON.stringify(snap.settings));
  for (const [k, arr] of Object.entries(snap.leaderboards ?? {})) {
    localStorage.setItem(k, JSON.stringify(arr ?? []));
  }
  // Persist to IDB so it survives USB / offline sessions.
  await saveSnapshot(snap);
  return { ok: true };
}

export interface ScoreEntry {
  name: string;
  score: number;
  // Total active gameplay time (milliseconds) used to achieve the score.
  // This intentionally excludes intermission waiting and frozen gating time.
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
  scheduleSnapshotPersist();
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
  scheduleSnapshotPersist();
}

export function getLeaderboard(settings: GameSettings): ScoreEntry[] {
  const key = lbKey(settings);
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try { return JSON.parse(raw) as ScoreEntry[]; } catch { return []; }
}

// --- USB-friendly snapshot export/import ---

// Back-compat aliases used by the controller
export function downloadSnapshot(): void {
  exportSnapshotToDownload();
}

export async function importSnapshotFromFile(file: File): Promise<{ ok: true } | { ok: false; reason: string }> {
  try {
    const text = await file.text();
    const res = await importSnapshotFromText(text);
    if ((res as any).ok) return { ok: true };
    return { ok: false, reason: (res as any).reason ?? "Invalid snapshot" };
  } catch (e: any) {
    return { ok: false, reason: e?.message ?? "Import failed" };
  }
}
