export interface TabEntry {
  stringIndex: number;
  fret: number | null;
}

/**
 * Upserts a TAB entry for a specific string in a chord-style TAB slot.
 * Keeps the slot stable and sorted by stringIndex.
 */
export function upsertTabEntry(slot: TabEntry[], entry: TabEntry): TabEntry[] {
  const si = Math.max(0, Math.min(5, Math.floor(entry.stringIndex)));
  const fret = entry.fret == null ? null : Math.floor(entry.fret);

  let replaced = false;
  const out: TabEntry[] = [];
  for (const it of slot) {
    if (!it) continue;
    if (Math.floor(it.stringIndex) === si) {
      out.push({ stringIndex: si, fret });
      replaced = true;
    } else {
      out.push({ stringIndex: Math.floor(it.stringIndex), fret: it.fret ?? null });
    }
  }
  if (!replaced) out.push({ stringIndex: si, fret });
  out.sort((a, b) => a.stringIndex - b.stringIndex);
  return out;
}
