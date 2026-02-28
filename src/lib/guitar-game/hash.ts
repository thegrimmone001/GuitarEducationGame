/**
 * Guitar Education Game - Hash Utilities
 *
 * Provides deterministic hashing for settings comparison and RNG seeding.
 *
 * @module guitar-game/hash
 */

/**
 * FNV-1a 32-bit hash
 *
 * @param data - String to hash
 * @returns 32-bit hash as number
 */
export function fnv1a32(data: string): number {
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < data.length; i++) {
    hash ^= data.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193); // FNV prime
  }
  return hash >>> 0;
}

/**
 * Create a stable JSON string from an object
 * Sorts object keys recursively for consistent serialization
 *
 * @param obj - Object to serialize
 * @returns Stable JSON string
 */
export function stableStringify(obj: unknown): string {
  if (obj === null) return "null";
  if (obj === undefined) return "null";
  if (typeof obj !== "object") return JSON.stringify(obj);

  if (Array.isArray(obj)) {
    return "[" + obj.map(stableStringify).join(",") + "]";
  }

  const keys = Object.keys(obj as Record<string, unknown>).sort();
  const pairs = keys.map(k => JSON.stringify(k) + ":" + stableStringify((obj as Record<string, unknown>)[k]));
  return "{" + pairs.join(",") + "}";
}

/**
 * Simple LCG (Linear Congruential Generator) for deterministic random
 */
export class DeterministicRNG {
  private state: number;

  constructor(seed: number) {
    this.state = seed | 0;
  }

  /**
   * Get next random value and update state
   */
  next(): number {
    let x = this.state | 0;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x | 0;
    return this.state;
  }

  /**
   * Get random integer in range [0, max)
   */
  nextInt(maxExclusive: number): number {
    return (this.next() >>> 0) % maxExclusive;
  }

  /**
   * Get current seed/state
   */
  getSeed(): number {
    return this.state;
  }

  /**
   * Set state directly
   */
  setSeed(seed: number): void {
    this.state = seed | 0;
  }
}
