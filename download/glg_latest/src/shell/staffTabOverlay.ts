const SVG_NS = "http://www.w3.org/2000/svg";

export type StaffTabRegion = "staff" | "tab";

export interface StaffTabLayout {
  viewBox: { x: number; y: number; w: number; h: number };
  measures: Array<{ x0: number; x1: number }>;
  columnsPerMeasure: number;
  staff: {
    lineYs: number[]; // 5 values
    halfStep: number; // lineGap / 2
    stepCenters: number[]; // includes a small ledger margin
    yMin: number;
    yMax: number;
  };
  tab: {
    lineYs: number[]; // 6 values
    stringBands: number[]; // 7 values
    yMin: number;
    yMax: number;
  };
}

export interface StaffTabHit {
  region: StaffTabRegion;
  measureIndex: number;
  colInMeasure: number;
  col: number; // global column across all measures
  yIndex: number; // staff step index OR string index
  rect: { x: number; y: number; w: number; h: number };
  cx: number;
  cy: number;
}

// The first measure includes clef and the "TAB" label. Reserve a lead-in so that
// the first rhythmic slot does not collide with those elements.
// Increased to prevent collisions between early-slot noteheads and the clef / TAB label.
// Keep this purely as a drawing-space inset (no viewBox changes).
const FIRST_MEASURE_INSET_X = 88;

function measurePlayableX0(layout: StaffTabLayout, measureIndex: number): number {
  const m = layout.measures[measureIndex];
  if (!m) return 0;
  return m.x0 + (measureIndex === 0 ? FIRST_MEASURE_INSET_X : 0);
}

function measurePlayableWidth(layout: StaffTabLayout, measureIndex: number): number {
  const m = layout.measures[measureIndex];
  if (!m) return 1;
  return Math.max(1e-6, m.x1 - measurePlayableX0(layout, measureIndex));
}

function num(v: string | null): number | null {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function uniqCluster(values: number[], eps = 0.02): number[] {
  const s = [...values].sort((a, b) => a - b);
  const out: number[] = [];
  for (const v of s) {
    const last = out[out.length - 1];
    if (last == null || Math.abs(last - v) > eps) out.push(v);
  }
  return out;
}

function parseViewBox(svgText: string): { x: number; y: number; w: number; h: number } {
  const m = svgText.match(/viewBox=\"([^\"]+)\"/);
  if (!m) throw new Error("Staff SVG missing viewBox");
  const parts = m[1]
    .trim()
    .split(/[ ,]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n));
  if (parts.length !== 4) throw new Error("Invalid viewBox");
  return { x: parts[0], y: parts[1], w: parts[2], h: parts[3] };
}

// Default grid is 4/4 recorded in 8th-note slots => 8 columns per measure.
export function parseStaffTabLayout(svgText: string, columnsPerMeasure = 8): StaffTabLayout {
  // If STAFF+TAB background is no longer an inline SVG (e.g., swapped to a raster image),
  // we may not have line primitives available to derive geometry. In that case, fall back
  // to the canonical 3-measure blank template geometry.
  if (!svgText || !svgText.includes("<line")) {
    return getBlank3MeasureStaffTabLayout(columnsPerMeasure);
  }

  const viewBox = parseViewBox(svgText);

  const dom = new DOMParser().parseFromString(svgText, "image/svg+xml");

  // Horizontal lines
  const lines = Array.from(dom.querySelectorAll("line"))
    .map((l) => {
      const x1 = num(l.getAttribute("x1"));
      const x2 = num(l.getAttribute("x2"));
      const y1 = num(l.getAttribute("y1"));
      const y2 = num(l.getAttribute("y2"));
      if (x1 == null || x2 == null || y1 == null || y2 == null) return null;
      if (Math.abs(y1 - y2) > 1e-3) return null;
      return { x1: Math.min(x1, x2), x2: Math.max(x1, x2), y: y1 };
    })
    .filter(Boolean) as Array<{ x1: number; x2: number; y: number }>;

  const yVals = uniqCluster(lines.map((l) => l.y));
  if (yVals.length < 11) {
    throw new Error(`Unexpected staff/tab line count: ${yVals.length}`);
  }

  // Split into 2 groups using the biggest Y gap.
  const ys = [...yVals].sort((a, b) => a - b);
  let bestGap = -1;
  let cut = 0;
  for (let i = 0; i < ys.length - 1; i++) {
    const g = ys[i + 1] - ys[i];
    if (g > bestGap) {
      bestGap = g;
      cut = i + 1;
    }
  }
  const g1 = ys.slice(0, cut);
  const g2 = ys.slice(cut);

  // Staff should be the group with 5 lines; tab the group with 6 lines.
  // NOTE: The blank staff+TAB template may include extra ledger lines.
  // We normalize to the *core* 5 staff lines (treble: EGBDF) and 6 TAB lines.
  const staffYsAll = (g1.length === 5 ? g1 : g2.length === 5 ? g2 : g1).slice().sort((a, b) => a - b);
  const tabYsAll = (g1.length === 6 ? g1 : g2.length === 6 ? g2 : g2).slice().sort((a, b) => a - b);

  const pickMiddle = (arr: number[], k: number): number[] => {
    if (arr.length <= k) return arr;
    const start = Math.floor((arr.length - k) / 2);
    return arr.slice(start, start + k);
  };

  const staffLines = pickMiddle(staffYsAll, 5);
  const tabLines = pickMiddle(tabYsAll, 6);

  // Measure segments from the template: choose the longest repeated x-spans.
  // This is robust even if the left-most measure has shortened lines for clef/TAB label.
  const spanCounts = new Map<string, { x0: number; x1: number; n: number }>();
  for (const l of lines) {
    const w = l.x2 - l.x1;
    if (w <= viewBox.w * 0.18) continue; // ignore tiny segments (labels, stubs)
    const key = `${l.x1.toFixed(3)}-${l.x2.toFixed(3)}`;
    const cur = spanCounts.get(key);
    if (cur) cur.n += 1;
    else spanCounts.set(key, { x0: l.x1, x1: l.x2, n: 1 });
  }
  const segs = Array.from(spanCounts.values())
    .filter((s) => s.n >= 4) // at least a staff/TAB subset
    .sort((a, b) => a.x0 - b.x0)
    .map((s) => ({ x0: s.x0, x1: s.x1 }));

  // If template doesn't provide explicit segments, fall back to a single full-width segment.
  if (segs.length === 0) {
    const minX = Math.min(...lines.map((l) => l.x1));
    const maxX = Math.max(...lines.map((l) => l.x2));
    segs.push({ x0: minX, x1: maxX });
  }

  // Staff steps (line + space grid). One diatonic step = half a line gap.
  const staffGap = staffLines.length >= 2 ? (staffLines[1] - staffLines[0]) : 8;
  const halfStep = staffGap / 2;
  const staffTop = staffLines[0] ?? 0;
  const staffBottom = staffLines[staffLines.length - 1] ?? staffTop + 4 * staffGap;

  // Include ample ledger steps above and below to support future pitch ranges and
  // smaller rhythmic subdivisions without reworking the hit grid. Each "step" is
  // a line or space (half a staff line gap).
  const extra = 14;
  const stepCenters: number[] = [];
  const stepCount = (staffLines.length - 1) * 2 + 1 + extra * 2; // e.g., 9 + 4 = 13
  const startY = staffTop - extra * halfStep;
  for (let i = 0; i < stepCount; i++) stepCenters.push(startY + i * halfStep);

  const staffYMin = staffTop - (extra + 1) * halfStep;
  const staffYMax = staffBottom + (extra + 1) * halfStep;

  // Tab bands for string selection.
  const tabGap = tabLines.length >= 2 ? (tabLines[1] - tabLines[0]) : 10;
  const bands: number[] = [];
  bands.push((tabLines[0] ?? 0) - tabGap / 2);
  for (let i = 0; i < tabLines.length - 1; i++) bands.push((tabLines[i] + tabLines[i + 1]) / 2);
  bands.push((tabLines[tabLines.length - 1] ?? 0) + tabGap / 2);

  const tabYMin = bands[0];
  const tabYMax = bands[bands.length - 1];

  // Prevent hit-test overlap between the expanded STAFF ledger region and the TAB region.
  // We clamp STAFF.yMax below the midpoint between the staff bottom line and the tab top line,
  // and clamp TAB.yMin above that same midpoint. This keeps STAFF clicks from leaking into TAB.
  const tabTopLine = tabLines[0] ?? tabYMin;
  const boundaryY = (staffBottom + tabTopLine) / 2;
  let staffYMaxFinal = staffYMax;
  let tabYMinFinal = tabYMin;
  if (Number.isFinite(boundaryY)) {
    // Only apply when the computed boundary is sensible (between the two regions).
    if (boundaryY > staffBottom && boundaryY < tabYMax) {
      staffYMaxFinal = Math.min(staffYMax, boundaryY - halfStep);
      tabYMinFinal = Math.max(tabYMin, boundaryY + halfStep);
    }
  }

  return {
    viewBox,
    measures: segs,
    columnsPerMeasure,
    staff: { lineYs: staffLines, halfStep, stepCenters, yMin: staffYMin, yMax: staffYMaxFinal },
    tab: { lineYs: tabLines, stringBands: bands, yMin: tabYMinFinal, yMax: tabYMax },
  };
}

/**
 * Canonical geometry for the 3-measure blank Staff+TAB sheet.
 *
 * This is used as a safe fallback if STAFF+TAB stops being an inline SVG (e.g. swapped to a raster background),
 * or if the SVG markup changes in a way that removes the line primitives we currently derive geometry from.
 */
export function getBlank3MeasureStaffTabLayout(columnsPerMeasure = 8): StaffTabLayout {
  const viewBox = { x: 0, y: 0, w: 863.999, h: 222.275 };

  const measures = [
    { x0: 24.658, x1: 310.318, cols: columnsPerMeasure },
    { x0: 310.318, x1: 574.317, cols: columnsPerMeasure },
    { x0: 574.317, x1: 838.316, cols: columnsPerMeasure },
  ];

  // Middle-5 of the staff region (treble staff core). Bottom line = E in treble clef.
  const staffLines = [54.565, 61.947, 69.329, 76.711, 84.093];
  const tabLines = [134.203, 143.832, 153.46, 163.088, 172.716, 182.345];

  const staffGap = Math.abs(staffLines[1] - staffLines[0]);
  const halfStep = staffGap / 2;
  const extraLedgerSteps = 14;

  const staffTop = staffLines[0];
  const staffBottom = staffLines[staffLines.length - 1];

  const staffYMin = staffTop - extraLedgerSteps * halfStep;
  const staffYMax = staffBottom + extraLedgerSteps * halfStep;

  const totalSteps = (staffLines.length - 1) * 2 + 1 + extraLedgerSteps * 2;
  const stepCenters: number[] = [];
  const startY = staffTop - extraLedgerSteps * halfStep;
  for (let i = 0; i < totalSteps; i++) {
    stepCenters.push(startY + i * halfStep);
  }

  const tabGap = Math.abs(tabLines[1] - tabLines[0]);
  const bands: number[] = [];
  for (let i = 0; i <= tabLines.length; i++) {
    if (i === 0) bands.push(tabLines[0] - tabGap / 2);
    else if (i === tabLines.length) bands.push(tabLines[tabLines.length - 1] + tabGap / 2);
    else bands.push((tabLines[i - 1] + tabLines[i]) / 2);
  }
  const tabYMin = bands[0];
  const tabYMax = bands[bands.length - 1];

  // Same anti-overlap clamp used by the parser
  const boundaryY = (staffBottom + tabLines[0]) / 2;
  let staffYMaxFinal = staffYMax;
  let tabYMinFinal = tabYMin;
  if (boundaryY > staffBottom && boundaryY < tabYMax) {
    staffYMaxFinal = Math.min(staffYMax, boundaryY - halfStep);
    tabYMinFinal = Math.max(tabYMin, boundaryY + halfStep);
  }

  return {
    viewBox,
    measures,
    columnsPerMeasure,
    staff: { lineYs: staffLines, halfStep, stepCenters, yMin: staffYMin, yMax: staffYMaxFinal },
    tab: { lineYs: tabLines, stringBands: bands, yMin: tabYMinFinal, yMax: tabYMax },
  };
}

export function hitTestStaffTab(layout: StaffTabLayout, x: number, y: number): StaffTabHit | null {
  // Find measure segment
  let measureIndex = -1;
  for (let i = 0; i < layout.measures.length; i++) {
    const m = layout.measures[i];
    if (x >= m.x0 && x <= m.x1) {
      measureIndex = i;
      break;
    }
  }
  if (measureIndex < 0) return null;

  const m = layout.measures[measureIndex];
  const x0 = measurePlayableX0(layout, measureIndex);
  const w = measurePlayableWidth(layout, measureIndex);
  const colW = w / layout.columnsPerMeasure;
  const colInMeasure = Math.max(0, Math.min(layout.columnsPerMeasure - 1, Math.floor((x - x0) / colW)));
  const col = measureIndex * layout.columnsPerMeasure + colInMeasure;

  // Region
  if (y >= layout.staff.yMin && y <= layout.staff.yMax && y < layout.tab.yMin) {
    // staff
    const steps = layout.staff.stepCenters;
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < steps.length; i++) {
      const d = Math.abs(steps[i] - y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }

    const cy = steps[best];
    const rectH = layout.staff.halfStep * 2;
    const rectY = cy - rectH / 2;

    return {
      region: "staff",
      measureIndex,
      colInMeasure,
      col,
      yIndex: best,
      rect: { x: x0 + colInMeasure * colW, y: rectY, w: colW, h: rectH },
      cx: x0 + colInMeasure * colW + colW / 2,
      cy,
    };
  }

  if (y >= layout.tab.yMin && y <= layout.tab.yMax) {
    // tab
    let stringIndex = -1;
    const b = layout.tab.stringBands;
    for (let i = 0; i < b.length - 1; i++) {
      if (y >= b[i] && y < b[i + 1]) {
        stringIndex = i;
        break;
      }
    }
    if (stringIndex < 0) return null;

    const y0 = layout.tab.stringBands[stringIndex];
    const y1 = layout.tab.stringBands[stringIndex + 1];
    const cy = (y0 + y1) / 2;

    return {
      region: "tab",
      measureIndex,
      colInMeasure,
      col,
      yIndex: stringIndex,
      rect: { x: x0 + colInMeasure * colW, y: y0, w: colW, h: y1 - y0 },
      cx: x0 + colInMeasure * colW + colW / 2,
      cy,
    };
  }

  return null;
}

function svgEl<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string> = {}): SVGElementTagNameMap[K] {
  const n = document.createElementNS(SVG_NS, tag) as SVGElementTagNameMap[K];
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

function ensureGroup(svg: SVGSVGElement, id: string): SVGGElement {
  let g = svg.querySelector(`#${id}`) as SVGGElement | null;
  if (!g) {
    g = document.createElementNS(SVG_NS, "g") as SVGGElement;
    g.id = id;
    g.setAttribute("pointer-events", "none");
    svg.appendChild(g);
  }
  return g;
}

function ensureDefs(svg: SVGSVGElement): SVGDefsElement {
  let d = svg.querySelector('defs') as SVGDefsElement | null;
  if (!d) {
    d = document.createElementNS(SVG_NS, 'defs') as SVGDefsElement;
    // Keep defs at the top for predictable clip-path resolution.
    svg.insertBefore(d, svg.firstChild);
  }
  return d;
}

function ensureClipPath(defs: SVGDefsElement, id: string): SVGClipPathElement {
  let cp = defs.querySelector(`#${id}`) as SVGClipPathElement | null;
  if (!cp) {
    cp = document.createElementNS(SVG_NS, 'clipPath') as SVGClipPathElement;
    cp.id = id;
    defs.appendChild(cp);
  }
  return cp;
}

function setClipRect(cp: SVGClipPathElement, rectId: string, x: number, y: number, w: number, h: number): void {
  let r = cp.querySelector(`#${rectId}`) as SVGRectElement | null;
  if (!r) {
    r = document.createElementNS(SVG_NS, 'rect') as SVGRectElement;
    r.id = rectId;
    cp.appendChild(r);
  }
  r.setAttribute('x', String(x));
  r.setAttribute('y', String(y));
  r.setAttribute('width', String(w));
  r.setAttribute('height', String(h));
}

export interface StaffTabOverlayState {
  hover: StaffTabHit | null;
  // Subdivision-aligned marks.
  //
  // STAFF can accumulate multiple marks per subdivision (e.g., polyphony / multiple valid fretboard answers).
  // TAB remains singular per subdivision.
  staffMarksByCol: Map<
    number,
    Array<{
      yIndex: number;
      accidental: "natural" | "sharp" | "flat" | null;
    }>
  >; // col -> list of staff yIndex + optional accidental
  // TAB marks can be "pending" (no fret number chosen yet). Pending marks should not
  // display a default "0" because open-string is a meaningful answer and must be explicit.
  //
  // TAB supports multiple strings per rhythmic slot (chord-style tab). Each slot may contain
  // 1..N string entries, each with its own (optional) fret number.
  tabMarksByCol: Map<number, Array<{ stringIndex: number; fret: number | null }>>; // col -> list of TAB string+fret
  // Pending (transient) marks for the current in-progress composite attempt. These render
  // as a preview but do NOT become part of the persistent record until the composite is accepted.
  pendingStaffMarksByCol: Map<number, Array<{ yIndex: number; accidental: "natural" | "sharp" | "flat" | null }>>;
  pendingTabMarksByCol: Map<number, Array<{ stringIndex: number; fret: number | null }>>;
  // The default fret number to stamp when clicking the TAB surface.
  // The controller can update this as the player interacts with the keypad.
  tabDefaultNumber: number | null;

  // Timeline cursor used by match modes that treat STAFF/TAB as a persistent record.
  // 0-based global column index across all visible measures.
  timelineCursorCol: number;
}

function uniqNums(values: number[], eps = 0.02): number[] {
  const s = [...values].filter((v) => Number.isFinite(v)).sort((a, b) => a - b);
  const out: number[] = [];
  for (const v of s) {
    const last = out[out.length - 1];
    if (last == null || Math.abs(last - v) > eps) out.push(v);
  }
  return out;
}

function computeLedgerYsForCy(
  cy: number,
  topLine: number,
  bottomLine: number,
  lineGap: number,
): number[] {
  const ys: number[] = [];
  if (!Number.isFinite(cy) || !Number.isFinite(topLine) || !Number.isFinite(bottomLine) || !Number.isFinite(lineGap)) return ys;
  if (cy < topLine - 0.5) {
    for (let yLedger = topLine - lineGap; yLedger >= cy - 0.5; yLedger -= lineGap) ys.push(yLedger);
  } else if (cy > bottomLine + 0.5) {
    for (let yLedger = bottomLine + lineGap; yLedger <= cy + 0.5; yLedger += lineGap) ys.push(yLedger);
  }
  return ys;
}

export function createStaffTabOverlayState(): StaffTabOverlayState {
  return { hover: null, staffMarksByCol: new Map(), tabMarksByCol: new Map(), pendingStaffMarksByCol: new Map(), pendingTabMarksByCol: new Map(), tabDefaultNumber: null, timelineCursorCol: 0 };
}

export function renderStaffTabOverlay(svg: SVGSVGElement, layout: StaffTabLayout, s: StaffTabOverlayState): void {
  const defs = ensureDefs(svg);

  // Clip regions prevent STAFF marks/ledger lines from bleeding into TAB (and vice versa).
  // IDs are intentionally stable: controller uses these for visibility gating.
  const staffClip = ensureClipPath(defs, "geduStaffClip");
  const tabClip = ensureClipPath(defs, "geduTabClip");

  const xMin = Math.min(...layout.measures.map((m) => m.x0));
  const xMax = Math.max(...layout.measures.map((m) => m.x1));
  const w = Math.max(1e-6, xMax - xMin);

  setClipRect(staffClip, "geduStaffClipRect", xMin, layout.staff.yMin, w, Math.max(1e-6, layout.staff.yMax - layout.staff.yMin));
  setClipRect(tabClip, "geduTabClipRect", xMin, layout.tab.yMin, w, Math.max(1e-6, layout.tab.yMax - layout.tab.yMin));

  const gridG = ensureGroup(svg, "staffTab-grid");
  const staffMarksG = ensureGroup(svg, "geduStaffMarks");
  const tabMarksG = ensureGroup(svg, "geduTabNumbers");
  const staffPendingG = ensureGroup(svg, "geduStaffPending");
  const tabPendingG = ensureGroup(svg, "geduTabPending");
  const hoverG = ensureGroup(svg, "staffTab-hover");

  staffMarksG.setAttribute("clip-path", "url(#geduStaffClip)");
  staffPendingG.setAttribute("clip-path", "url(#geduStaffClip)");
  tabMarksG.setAttribute("clip-path", "url(#geduTabClip)");
  tabPendingG.setAttribute("clip-path", "url(#geduTabClip)");

  // Enforce z-order: grid (bottom) -> accepted marks -> pending marks -> hover (top)
  svg.appendChild(gridG);
  svg.appendChild(staffMarksG);
  svg.appendChild(tabMarksG);
  svg.appendChild(staffPendingG);
  svg.appendChild(tabPendingG);
  svg.appendChild(hoverG);

  // Clear
  gridG.replaceChildren();
  staffMarksG.replaceChildren();
  tabMarksG.replaceChildren();
  staffPendingG.replaceChildren();
  tabPendingG.replaceChildren();
  hoverG.replaceChildren();

  // Subdivision grid (visual + future-proof for smaller rhythmic divisions)
  // Draw vertical lines for each subdivision in each measure across the entire STAFF+TAB region.
  const gridY0 = layout.staff.yMin;
  const gridY1 = layout.tab.yMax;
  for (let mi = 0; mi < layout.measures.length; mi++) {
    const m = layout.measures[mi];
    const x0 = measurePlayableX0(layout, mi);
    const mw = measurePlayableWidth(layout, mi);
    const colW = mw / layout.columnsPerMeasure;
    for (let ci = 1; ci < layout.columnsPerMeasure; ci++) {
      const x = x0 + ci * colW;
      const ln = svgEl("line", {
        x1: String(x),
        y1: String(gridY0),
        x2: String(x),
        y2: String(gridY1),
        stroke: "rgba(0,0,0,0.10)",
        "stroke-width": "1",
      });
      gridG.appendChild(ln);
    }
  }

  // STAFF marks (noteheads + ledger lines)
  for (const [col, marks] of s.staffMarksByCol.entries()) {
    if (!Number.isFinite(col)) continue;
    if (!Array.isArray(marks) || marks.length === 0) continue;

    const measureIndex = Math.floor(col / layout.columnsPerMeasure);
    const colInMeasure = col % layout.columnsPerMeasure;
    const m = layout.measures[measureIndex];
    if (!m) continue;
    const x0 = measurePlayableX0(layout, measureIndex);
    const colW = measurePlayableWidth(layout, measureIndex) / layout.columnsPerMeasure; // Multiple marks in the same subdivision are slightly fanned horizontally for legibility.
    const fan = Math.min(3, Math.max(0, marks.length - 1));
    const fanDx = Math.max(2, Math.min(8, colW * 0.12));

    const baseCx = x0 + colInMeasure * colW + colW / 2;
    const noteRx = Math.max(2, layout.staff.halfStep * 0.75);

    const cxPositions = marks.map((_, i) => baseCx + (i - fan / 2) * fanDx);
    const chordLeft = Math.min(...cxPositions);
    const chordRight = Math.max(...cxPositions);
    const accPad = Math.max(8, noteRx * 2.8);
    const accX = Math.max(x0 + colW * 0.12, chordLeft - accPad);

    // Ledger lines for the slot (union across all marks in the subdivision).
    // This avoids double-drawing identical ledger lines when multiple chord tones
    // share the same ledger positions.
    const staffLines = layout.staff.lineYs;
    const topLine = staffLines[0] ?? 0;
    const bottomLine = staffLines[staffLines.length - 1] ?? topLine;
    const lineGap = layout.staff.halfStep * 2;
    const ledgerHalfLenBase = Math.max(10, Math.min(22, colW * 0.22));
    const chordHalfWidth = Math.max(ledgerHalfLenBase, (chordRight - chordLeft) / 2 + noteRx * 0.9);

    const slotCys = marks
      .map((mk) => (Number.isFinite(mk?.yIndex) ? (layout.staff.stepCenters[mk!.yIndex] ?? null) : null))
      .filter((v): v is number => v != null);

    const ledgerYs = uniqNums(slotCys.flatMap((cy) => computeLedgerYsForCy(cy, topLine, bottomLine, lineGap)), 0.05);
    if (ledgerYs.length) {
      const cxLedger = (chordLeft + chordRight) / 2;
      for (const yLedger of ledgerYs) {
        const ln = svgEl("line", {
          x1: String(cxLedger - chordHalfWidth),
          y1: String(yLedger),
          x2: String(cxLedger + chordHalfWidth),
          y2: String(yLedger),
          stroke: "rgba(0,0,0,0.55)",
          "stroke-width": "1.2",
          "stroke-linecap": "round",
        });
        staffMarksG.appendChild(ln);
      }
    }

    for (let i = 0; i < marks.length; i++) {
      const mark = marks[i];
      const yIndex = mark?.yIndex;
      const acc = mark?.accidental ?? null;
      if (!Number.isFinite(yIndex)) continue;

      const cy = layout.staff.stepCenters[yIndex] ?? null;
      if (cy == null) continue;

      const cx = cxPositions[i] ?? baseCx;

      const e = svgEl("ellipse", {
      cx: String(cx),
      cy: String(cy),
      rx: String(noteRx),
      ry: String(Math.max(2, layout.staff.halfStep * 0.55)),
      fill: "rgba(0,0,0,0.22)",
      stroke: "rgba(0,0,0,0.55)",
      "stroke-width": "1.2",
    });
      staffMarksG.appendChild(e);

    // Optional accidental glyph to the left of the notehead.
    // (UI-only; scoring logic is controlled by the prompt spelling.)
      if (acc) {
        const glyph = acc === "sharp" ? "♯" : acc === "flat" ? "♭" : "♮";
        const tx = accX;
        const ty = cy + Math.max(4, layout.staff.halfStep * 0.35);
        const t = svgEl("text", {
          x: String(tx),
          y: String(ty),
          "font-size": String(Math.max(10, layout.staff.halfStep * 1.7)),
          "text-anchor": "middle",
          fill: "rgba(0,0,0,0.72)",
          "font-family": "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        });
        t.textContent = glyph;
        staffMarksG.appendChild(t);
      }
    }
  }



  // PENDING STAFF marks (preview-only; not part of persistent record)
  for (const [col, marks] of s.pendingStaffMarksByCol.entries()) {
    if (!Number.isFinite(col)) continue;
    if (!Array.isArray(marks) || marks.length === 0) continue;

    const measureIndex = Math.floor(col / layout.columnsPerMeasure);
    const colInMeasure = col % layout.columnsPerMeasure;
    const m = layout.measures[measureIndex];
    if (!m) continue;
    const x0 = measurePlayableX0(layout, measureIndex);
    const colW = measurePlayableWidth(layout, measureIndex) / layout.columnsPerMeasure;

    const fan = Math.min(3, Math.max(0, marks.length - 1));
    const fanDx = Math.max(2, Math.min(8, colW * 0.12));

    const baseCx = x0 + colInMeasure * colW + colW / 2;
    const noteRx = Math.max(2, layout.staff.halfStep * 0.75);

    const cxPositions = marks.map((_, i) => baseCx + (i - fan / 2) * fanDx);
    const chordLeft = Math.min(...cxPositions);
    const chordRight = Math.max(...cxPositions);
    const accPad = Math.max(8, noteRx * 2.8);
    const accX = Math.max(x0 + colW * 0.12, chordLeft - accPad);

    // Ledger preview for pending marks (helps fast, accurate placement when notes
    // extend above/below the 5-line staff).
    const staffLines = layout.staff.lineYs;
    const topLine = staffLines[0] ?? 0;
    const bottomLine = staffLines[staffLines.length - 1] ?? topLine;
    const lineGap = layout.staff.halfStep * 2;
    const ledgerHalfLenBase = Math.max(10, Math.min(22, colW * 0.22));
    const chordHalfWidth = Math.max(ledgerHalfLenBase, (chordRight - chordLeft) / 2 + noteRx * 0.9);
    const slotCys = marks
      .map((mk) => (Number.isFinite(mk?.yIndex) ? (layout.staff.stepCenters[mk!.yIndex] ?? null) : null))
      .filter((v): v is number => v != null);
    const ledgerYs = uniqNums(slotCys.flatMap((cy) => computeLedgerYsForCy(cy, topLine, bottomLine, lineGap)), 0.05);
    if (ledgerYs.length) {
      const cxLedger = (chordLeft + chordRight) / 2;
      for (const yLedger of ledgerYs) {
        const ln = svgEl("line", {
          x1: String(cxLedger - chordHalfWidth),
          y1: String(yLedger),
          x2: String(cxLedger + chordHalfWidth),
          y2: String(yLedger),
          stroke: "rgba(0,0,0,0.35)",
          "stroke-width": "1.1",
          "stroke-linecap": "round",
        });
        staffPendingG.appendChild(ln);
      }
    }

    for (let i = 0; i < marks.length; i++) {
      const mark = marks[i];
      const yIndex = mark?.yIndex;
      const acc = mark?.accidental ?? null;
      if (!Number.isFinite(yIndex)) continue;
      const cy = layout.staff.stepCenters[yIndex] ?? null;
      if (cy == null) continue;
      const cx = cxPositions[i] ?? baseCx;

      const e = svgEl("ellipse", {
        cx: String(cx),
        cy: String(cy),
        rx: String(noteRx),
        ry: String(Math.max(2, layout.staff.halfStep * 0.55)),
        fill: "rgba(0,0,0,0.10)",
        stroke: "rgba(0,0,0,0.35)",
        "stroke-width": "1.0",
      });
      staffPendingG.appendChild(e);

      if (acc) {
        const glyph = acc === "sharp" ? "♯" : acc === "flat" ? "♭" : "♮";
        const t = svgEl("text", {
          x: String(accX),
          y: String(cy + Math.max(4, layout.staff.halfStep * 0.35)),
          "font-size": String(Math.max(10, layout.staff.halfStep * 1.7)),
          "text-anchor": "middle",
          fill: "rgba(0,0,0,0.50)",
          "font-family": "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        });
        t.textContent = glyph;
        staffPendingG.appendChild(t);
      }
    }
  }
  // TAB numbers
  for (const [col, list] of s.tabMarksByCol.entries()) {
    if (!Number.isFinite(col)) continue;
    if (!Array.isArray(list) || list.length === 0) continue;

    const measureIndex = Math.floor(col / layout.columnsPerMeasure);
    const colInMeasure = col % layout.columnsPerMeasure;
    const m = layout.measures[measureIndex];
    if (!m) continue;
    const x0 = measurePlayableX0(layout, measureIndex);
    const colW = measurePlayableWidth(layout, measureIndex) / layout.columnsPerMeasure;

    const cx = x0 + colInMeasure * colW + colW / 2;

    for (const v of list) {
      const stringIndex = v?.stringIndex;
      const fretNum = v?.fret;
      if (!Number.isFinite(stringIndex)) continue;

      const y0 = layout.tab.stringBands[stringIndex];
      const y1 = layout.tab.stringBands[stringIndex + 1];
      if (y0 == null || y1 == null) continue;

      const cy = (y0 + y1) / 2;

      // TAB uses fret numbers (text), not noteheads/dots.
      // If the fret is not set yet, render a subtle pending slot indicator.
      if (fretNum == null || !Number.isFinite(Number(fretNum))) {
        const padCellX = Math.max(2.5, Math.min(colW, y1 - y0) * 0.08);
        const padCellY = Math.max(2.5, Math.min(colW, y1 - y0) * 0.10);
        const bg = svgEl("rect", {
          x: String(x0 + colInMeasure * colW + padCellX),
          y: String(y0 + padCellY),
          width: String(Math.max(1, colW - padCellX * 2)),
          height: String(Math.max(1, (y1 - y0) - padCellY * 2)),
          rx: "3",
          ry: "3",
          fill: "rgba(255,255,255,0.55)",
          stroke: "rgba(0,0,0,0.25)",
          "stroke-width": "1",
          "stroke-dasharray": "3 3",
        });
        tabMarksG.appendChild(bg);
        continue;
      }

      const label = String(Math.max(0, Math.min(24, Math.floor(Number(fretNum)))));

      // Small pill background improves readability over string lines.
      const pad = Math.max(2.5, Math.min(colW, y1 - y0) * 0.10);
      const fontSize = Math.max(9, Math.min(18, (y1 - y0) * 0.55));

      const bg = svgEl("rect", {
        x: String(cx - (label.length === 1 ? fontSize * 0.38 : fontSize * 0.62) - pad),
        y: String(cy - fontSize * 0.55 - pad * 0.6),
        width: String((label.length === 1 ? fontSize * 0.76 : fontSize * 1.24) + pad * 2),
        height: String(fontSize * 1.1 + pad * 1.2),
        rx: String(Math.max(2, fontSize * 0.22)),
        ry: String(Math.max(2, fontSize * 0.22)),
        fill: "rgba(255,255,255,0.85)",
        stroke: "rgba(0,0,0,0.35)",
        "stroke-width": "1",
      });
      tabMarksG.appendChild(bg);

      const t = svgEl("text", {
        x: String(cx),
        y: String(cy + fontSize * 0.34),
        "text-anchor": "middle",
        "font-size": String(fontSize),
        "font-family": "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        fill: "rgba(0,0,0,0.92)",
      });
      t.textContent = label;
      tabMarksG.appendChild(t);
    }
  }

    // PENDING TAB marks (preview-only; not part of persistent record)
  for (const [col, entries] of s.pendingTabMarksByCol.entries()) {
    if (!Number.isFinite(col)) continue;
    if (!Array.isArray(entries) || entries.length === 0) continue;

    const measureIndex = Math.floor(col / layout.columnsPerMeasure);
    const colInMeasure = col % layout.columnsPerMeasure;
    const m = layout.measures[measureIndex];
    if (!m) continue;
    const x0 = measurePlayableX0(layout, measureIndex);
    const colW = measurePlayableWidth(layout, measureIndex) / layout.columnsPerMeasure;
    const cx = x0 + colInMeasure * colW + colW / 2;

    for (const it of entries) {
      if (!it) continue;
      const si = it.stringIndex;
      if (!Number.isFinite(si)) continue;
      const band0 = layout.tab.stringBands[si] ?? null;
      const band1 = layout.tab.stringBands[si + 1] ?? null;
      if (band0 == null || band1 == null) continue;
      const cy = (band0 + band1) / 2;

      const label = it.fret == null ? "•" : String(it.fret);
      const t = svgEl("text", {
        x: String(cx),
        y: String(cy + 5),
        "font-size": "16",
        "text-anchor": "middle",
        fill: "rgba(0,0,0,0.55)",
      });
      t.textContent = label;
      tabPendingG.appendChild(t);
    }
  }

// Hover
  if (s.hover) {
    // Column indicator: a thin center line keeps subdivision alignment visible
    // without "shading" the entire STAFF/TAB region.
    const x = s.hover.rect.x + s.hover.rect.w / 2;
    const colLine = svgEl("line", {
      x1: String(x),
      y1: String(gridY0),
      x2: String(x),
      y2: String(gridY1),
      stroke: "rgba(0,0,0,0.30)",
      "stroke-width": "1",
    });
    hoverG.appendChild(colLine);

    // Region hover: gives local precision for clicking.
    const r = s.hover.rect;
    const hoverRect = svgEl("rect", {
      x: String(r.x),
      y: String(r.y),
      width: String(r.w),
      height: String(r.h),
      rx: "2",
      ry: "2",
      fill: "rgba(0,0,0,0.03)",
      stroke: "rgba(0,0,0,0.18)",
      "stroke-width": "1",
    });
    hoverG.appendChild(hoverRect);

    // Ledger-line preview for STAFF hover (helps speed + accuracy when placing notes
    // above/below the 5-line staff). This is clipped to the STAFF region so it never
    // bleeds into TAB.
    if (s.hover.region === "staff") {
      const staffLines = layout.staff.lineYs;
      const topLine = staffLines[0] ?? s.hover.cy;
      const bottomLine = staffLines[staffLines.length - 1] ?? s.hover.cy;
      const lineGap = layout.staff.halfStep * 2;
      const ledgerYs = uniqNums(computeLedgerYsForCy(s.hover.cy, topLine, bottomLine, lineGap), 0.05);
      if (ledgerYs.length) {
        const g = svgEl("g", { "clip-path": "url(#geduStaffClip)" });
        const halfLen = Math.max(12, Math.min(28, s.hover.rect.w * 0.55));
        for (const yLedger of ledgerYs) {
          const ln = svgEl("line", {
            x1: String(s.hover.cx - halfLen),
            y1: String(yLedger),
            x2: String(s.hover.cx + halfLen),
            y2: String(yLedger),
            stroke: "rgba(0,0,0,0.28)",
            "stroke-width": "1.0",
            "stroke-linecap": "round",
          });
          g.appendChild(ln);
        }
        hoverG.appendChild(g);
      }
    }

    // Small center marker
    const dot = svgEl("circle", {
      cx: String(s.hover.cx),
      cy: String(s.hover.cy),
      r: "2.5",
      fill: "rgba(0,0,0,0.55)",
    });
    hoverG.appendChild(dot);
  }
}

function clientToSvg(svg: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const p = pt.matrixTransform(ctm.inverse());
  return { x: p.x, y: p.y };
}

export function attachStaffTabPointerHandlers(
  svg: SVGSVGElement,
  layout: StaffTabLayout,
  state: StaffTabOverlayState,
  onPick?: (hit: StaffTabHit) => void,
): void {
  const render = () => renderStaffTabOverlay(svg, layout, state);

  svg.addEventListener(
    "pointermove",
    (ev) => {
      const p = clientToSvg(svg, ev.clientX, ev.clientY);
      const hit = hitTestStaffTab(layout, p.x, p.y);
      state.hover = hit;
      render();
    },
    { passive: true },
  );

  svg.addEventListener(
    "pointerleave",
    () => {
      state.hover = null;
      render();
    },
    { passive: true },
  );

  svg.addEventListener(
    "pointerdown",
    (ev) => {
      const p = clientToSvg(svg, ev.clientX, ev.clientY);
      const hit = hitTestStaffTab(layout, p.x, p.y);
      if (!hit) return;
      // NOTE: Marker state is controller-owned. The overlay only reports the hit.
      state.hover = hit;
      onPick?.(hit);
      // Do not leave a persistent hover block after clicking.
      state.hover = null;
      render();
    },
    { passive: true },
  );

  // Initial paint
  render();
}
