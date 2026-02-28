export interface TabBoardState {
  /** 0..15 */
  cursor: number;
  /** 6x16 numbers (null = empty) */
  grid: Array<Array<number | null>>;
  /** 0..5 (high E at 0) */
  selectedString: number | null;
}

export interface TabBoard {
  el: HTMLElement;
  setState: (s: TabBoardState) => void;
  onSelectString: (cb: (stringIndex: number) => void) => void;
}

// Standard guitar tab order (top-to-bottom) matches our string indexing
// used across the project: high e at index 0, low E at index 5.
const STRING_LABELS = ["e", "B", "G", "D", "A", "E"];

export function createTabBoard(columns = 16): TabBoard {
  const root = document.createElement("div");
  root.className = "tabBoard";

  const gridWrap = document.createElement("div");
  gridWrap.className = "tabGrid";
  root.appendChild(gridWrap);

  const cells: HTMLDivElement[][] = [];
  const rows: HTMLDivElement[] = [];

  for (let s = 0; s < 6; s++) {
    const row = document.createElement("div");
    row.className = "tabRow";
    row.dataset.string = String(s);

    const label = document.createElement("div");
    label.className = "tabStringLabel";
    label.textContent = STRING_LABELS[s] ?? "";
    row.appendChild(label);

    const rowCells: HTMLDivElement[] = [];
    const rowTrack = document.createElement("div");
    rowTrack.className = "tabRowTrack";

    for (let c = 0; c < columns; c++) {
      const cell = document.createElement("div");
      cell.className = "tabCell";
      cell.dataset.col = String(c);
      cell.textContent = "";
      rowTrack.appendChild(cell);
      rowCells.push(cell);
    }

    row.appendChild(rowTrack);
    gridWrap.appendChild(row);

    rows.push(row);
    cells.push(rowCells);
  }

  let lastCursor = -1;
  let lastSelected: number | null = null;
  let cbSelect: ((stringIndex: number) => void) | null = null;

  // Pointer: selecting a string line is the core interaction.
  root.addEventListener("pointerdown", (ev) => {
    const target = ev.target as HTMLElement | null;
    const rowEl = target?.closest?.(".tabRow") as HTMLElement | null;
    if (!rowEl) return;
    const sStr = rowEl.dataset.string;
    if (sStr == null) return;
    const s = Number(sStr);
    if (Number.isFinite(s) && s >= 0 && s < 6) {
      cbSelect?.(s);
    }
  });

  function setState(s: TabBoardState) {
    // Cursor column highlight
    if (lastCursor !== s.cursor) {
      if (lastCursor >= 0) {
        for (let r = 0; r < 6; r++) cells[r][lastCursor]?.classList.remove("cursor");
      }
      if (s.cursor >= 0 && s.cursor < columns) {
        for (let r = 0; r < 6; r++) cells[r][s.cursor]?.classList.add("cursor");
      }
      lastCursor = s.cursor;
    }

    // Selected string highlight
    if (lastSelected !== s.selectedString) {
      if (lastSelected != null) rows[lastSelected]?.classList.remove("selected");
      if (s.selectedString != null) rows[s.selectedString]?.classList.add("selected");
      lastSelected = s.selectedString;
    }

    // Cell content updates
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < columns; c++) {
        const val = s.grid?.[r]?.[c] ?? null;
        const text = val == null ? "" : String(val);
        const el = cells[r][c];
        if (el.textContent !== text) el.textContent = text;
      }
    }
  }

  function onSelectString(cb: (stringIndex: number) => void) {
    cbSelect = cb;
  }

  return { el: root, setState, onSelectString };
}
