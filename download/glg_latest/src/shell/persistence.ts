import { get, set } from "idb-keyval";

import type { GameSettings } from "./types";
import type { ScoreEntry } from "./storage";

// Single-key snapshot for USB-friendly export/import.
// NOTE: keep this format stable and versioned.
export type AppSnapshotV1 = {
  version: 1;
  exportedAtIso: string;
  settings: GameSettings | null;
  // Keyed by the existing leaderboard storage keys so we can restore without
  // needing to know all possible settings combinations.
  leaderboards: Record<string, ScoreEntry[]>;
};

const IDB_KEY = "gedu.snapshot.v1";

export async function loadSnapshot(): Promise<AppSnapshotV1 | null> {
  try {
    const snap = (await get(IDB_KEY)) as AppSnapshotV1 | undefined;
    if (!snap || snap.version !== 1) return null;
    return snap;
  } catch {
    return null;
  }
}

export async function saveSnapshot(snap: AppSnapshotV1): Promise<boolean> {
  try {
    await set(IDB_KEY, snap);
    return true;
  } catch {
    return false;
  }
}

export function makeSnapshot(settings: GameSettings | null, leaderboards: Record<string, ScoreEntry[]>): AppSnapshotV1 {
  return {
    version: 1,
    exportedAtIso: new Date().toISOString(),
    settings,
    leaderboards,
  };
}

export function serializeSnapshot(snap: AppSnapshotV1): string {
  return JSON.stringify(snap, null, 2);
}

export function parseSnapshot(raw: string): AppSnapshotV1 | null {
  try {
    const snap = JSON.parse(raw) as AppSnapshotV1;
    if (!snap || snap.version !== 1) return null;
    if (!("leaderboards" in snap)) return null;
    return snap;
  } catch {
    return null;
  }
}
