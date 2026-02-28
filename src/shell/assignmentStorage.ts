import { fnv1a32, stableStringify } from "./hash";
import type { AssignmentBundleV1, AssignmentDefinition, AssignmentResultPacketV1 } from "./assignmentTypes";

// Local, offline-first storage keys.
const ASSIGNMENTS_KEY = "gedu.assignments.v1";
const RESULTS_KEY = "gedu.assignmentResults.v1";

type Stored<T> = {
  v: 1;
  items: Record<string, T>;
};

function readStore<T>(key: string): Stored<T> {
  const raw = localStorage.getItem(key);
  if (!raw) return { v: 1, items: {} };
  try {
    const parsed = JSON.parse(raw) as Stored<T>;
    if (!parsed || parsed.v !== 1 || typeof parsed.items !== "object") return { v: 1, items: {} };
    return parsed;
  } catch {
    return { v: 1, items: {} };
  }
}

function writeStore<T>(key: string, store: Stored<T>): void {
  localStorage.setItem(key, JSON.stringify(store));
}

export function checksumOf(value: unknown): string {
  return fnv1a32(stableStringify(value));
}

// --- Assignments ---

export function saveAssignment(def: AssignmentDefinition): void {
  const store = readStore<AssignmentDefinition>(ASSIGNMENTS_KEY);
  store.items[def.id] = def;
  writeStore(ASSIGNMENTS_KEY, store);
}

export function getAssignment(id: string): AssignmentDefinition | null {
  const store = readStore<AssignmentDefinition>(ASSIGNMENTS_KEY);
  return store.items[id] ?? null;
}

export function listAssignments(): AssignmentDefinition[] {
  const store = readStore<AssignmentDefinition>(ASSIGNMENTS_KEY);
  return Object.values(store.items).sort((a, b) => (b.createdAtIso || "").localeCompare(a.createdAtIso || ""));
}

// --- Bundles ---

export function makeAssignmentBundle(def: AssignmentDefinition, artifacts: Record<string, unknown> = {}): AssignmentBundleV1 {
  const checksums: Record<string, string> = {};
  checksums.assignment = checksumOf(def);
  for (const [id, obj] of Object.entries(artifacts)) checksums[id] = checksumOf(obj);

  return {
    version: 1,
    exportedAtIso: new Date().toISOString(),
    assignment: def,
    artifacts,
    checksums,
  };
}

export function validateAssignmentBundle(bundle: unknown): { ok: true; bundle: AssignmentBundleV1 } | { ok: false; reason: string } {
  try {
    const b = bundle as AssignmentBundleV1;
    if (!b || b.version !== 1) return { ok: false, reason: "Unsupported bundle version" };
    if (!b.assignment || !b.assignment.id) return { ok: false, reason: "Bundle missing assignment" };
    if (!b.checksums || typeof b.checksums !== "object") return { ok: false, reason: "Bundle missing checksums" };

    const expected = checksumOf(b.assignment);
    if (b.checksums.assignment !== expected) return { ok: false, reason: "Assignment checksum mismatch" };

    for (const [id, obj] of Object.entries(b.artifacts ?? {})) {
      const h = checksumOf(obj);
      const expectedH = b.checksums[id];
      if (expectedH && expectedH !== h) return { ok: false, reason: `Artifact checksum mismatch: ${id}` };
    }
    return { ok: true, bundle: b };
  } catch (e: any) {
    return { ok: false, reason: e?.message ?? "Invalid bundle" };
  }
}

export function bundleToJson(bundle: AssignmentBundleV1): string {
  return JSON.stringify(bundle, null, 2);
}

export function bundleFromJson(raw: string): { ok: true; bundle: AssignmentBundleV1 } | { ok: false; reason: string } {
  try {
    const parsed = JSON.parse(raw);
    return validateAssignmentBundle(parsed);
  } catch (e: any) {
    return { ok: false, reason: e?.message ?? "Invalid JSON" };
  }
}

export function importAssignmentBundle(bundle: AssignmentBundleV1): { ok: true } | { ok: false; reason: string } {
  const res = validateAssignmentBundle(bundle);
  if (!res.ok) return res;

  // Store assignment definition locally (read-only enforcement happens at controller/UI boundaries later).
  saveAssignment(res.bundle.assignment);
  return { ok: true };
}

// --- Results ---

export function saveAssignmentResult(packet: AssignmentResultPacketV1): void {
  const store = readStore<AssignmentResultPacketV1>(RESULTS_KEY);
  store.items[packet.sessionId] = packet;
  writeStore(RESULTS_KEY, store);
}

export function listAssignmentResults(): AssignmentResultPacketV1[] {
  const store = readStore<AssignmentResultPacketV1>(RESULTS_KEY);
  return Object.values(store.items).sort((a, b) => (b.createdAtIso || "").localeCompare(a.createdAtIso || ""));
}
