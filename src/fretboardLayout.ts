export interface FretboardLayout {
  viewBox: { x: number; y: number; w: number; h: number };
  neck: { xMin: number; xMax: number; yMin: number; yMax: number };
  // IMPORTANT:
  // We model an explicit "open string" column (fretIndex = 0) to the LEFT of the nut.
  // The SVG's first visible region is nut→fret1 (which is fret 1), so we inject
  // a virtual boundary to create an open-string region (fret 0) in the left margin.
  //
  // Therefore: fretBoundaries length = (playableFretCount + 2)
  // Example: 24-fret neck => playable frets 0..24 (25 columns) => boundaries length 26.
  fretBoundaries: number[];
  stringCenters: number[]; // length 6
  stringBands: number[]; // length 7
  dotRadius: number;
}

function parseNumberList(s: string): number[] {
  return s
    .replace(/[\n\t\r]/g, " ")
    .split(/[ ,]+/)
    .filter(Boolean)
    .map(Number)
    .filter(n => Number.isFinite(n));
}

function extractViewBox(svgText: string): { x: number; y: number; w: number; h: number } {
  const m = svgText.match(/viewBox="([^"]+)"/);
  if (!m) throw new Error("SVG missing viewBox");
  const nums = parseNumberList(m[1]);
  if (nums.length !== 4) throw new Error("Invalid viewBox");
  return { x: nums[0], y: nums[1], w: nums[2], h: nums[3] };
}

function extractNeckBounds(svgText: string) {
  const m = svgText.match(/<polygon[^>]+id="Neck"[^>]+points="([\s\S]*?)"/);
  if (!m) throw new Error("SVG missing Neck polygon");
  const coords = m[1].match(/([0-9.]+),([0-9.]+)/g) ?? [];
  const xs: number[] = [];
  const ys: number[] = [];
  for (const pair of coords) {
    const [x, y] = pair.split(",").map(Number);
    if (Number.isFinite(x) && Number.isFinite(y)) { xs.push(x); ys.push(y); }
  }
  return { xMin: Math.min(...xs), xMax: Math.max(...xs), yMin: Math.min(...ys), yMax: Math.max(...ys) };
}

function clusterSorted(values: number[], eps = 0.01): number[] {
  const sorted = [...values].sort((a,b) => a-b);
  const clusters: number[][] = [];
  for (const v of sorted) {
    const last = clusters[clusters.length - 1];
    if (!last || Math.abs(last[last.length - 1] - v) > eps) clusters.push([v]);
    else last.push(v);
  }
  return clusters.map(c => c.reduce((a,b)=>a+b,0) / c.length);
}

function extractFretLines(svgText: string): number[] {
  const m = svgText.match(/<g id="Frets">([\s\S]*?)<\/g>/);
  if (!m) throw new Error("SVG missing Frets group");
  const xs = [...m[1].matchAll(/x1="([0-9.]+)"/g)].map(mm => Number(mm[1])).filter(Number.isFinite);
  return clusterSorted(xs);
}

function extractStringLines(svgText: string): number[] {
  const m = svgText.match(/<g id="Strings">([\s\S]*?)<\/g>/);
  if (!m) throw new Error("SVG missing Strings group");
  const ys = [...m[1].matchAll(/y1="([0-9.]+)"/g)].map(mm => Number(mm[1])).filter(Number.isFinite);
  return ys.sort((a,b)=>a-b);
}

export function computeLayoutFromSvg(svgText: string): FretboardLayout {
  const viewBox = extractViewBox(svgText);
  const neckPoly = extractNeckBounds(svgText);

  const fretLines = extractFretLines(svgText);

  // The SVG includes the nut line as the first "fret" boundary (x = neckPoly.xMin).
  // The first playable region in the SVG is nut→fret1 (i.e., fret 1), so without an
  // extra region the engine's fretIndex=0 would incorrectly map to fret 1.
  //
  // Fix: add a virtual open-string boundary to the LEFT of the nut.
  // Use a width similar to the nut→fret1 spacing.
  const nutX = neckPoly.xMin;
  const firstSpan = (fretLines.length >= 2) ? (fretLines[1] - fretLines[0]) : ((neckPoly.xMax - neckPoly.xMin) / 24);
  const openLeft = Math.max(viewBox.x, nutX - firstSpan);

  // Ensure boundaries include:
  // openLeft, nut, frets..., and the right edge of the neck polygon.
  const fretBoundaries = [openLeft, ...fretLines, neckPoly.xMax].sort((a,b)=>a-b);

  // Expand interactive neck bounds to include the virtual open-string area.
  const neck = { ...neckPoly, xMin: openLeft };

  const stringCenters = extractStringLines(svgText);
  if (stringCenters.length !== 6) throw new Error("Expected 6 strings from SVG");

  // bands: top neck edge, midpoints, bottom neck edge
  const bands: number[] = [neckPoly.yMin];
  for (let i = 0; i < stringCenters.length - 1; i++) {
    bands.push((stringCenters[i] + stringCenters[i+1]) / 2);
  }
  bands.push(neckPoly.yMax);

  const fretW = Math.min(...fretBoundaries.slice(1).map((x,i)=>x - fretBoundaries[i]));
  const stringH = Math.min(...bands.slice(1).map((y,i)=>y - bands[i]));
  const dotRadius = Math.max(8, Math.min(fretW * 0.22, stringH * 0.33));

  return { viewBox, neck, fretBoundaries, stringCenters, stringBands: bands, dotRadius };
}

export function cellCenter(layout: FretboardLayout, stringIndex: number, fretIndex: number): { cx: number; cy: number } {
  const x0 = layout.fretBoundaries[fretIndex];
  const x1 = layout.fretBoundaries[fretIndex + 1];
  return { cx: (x0 + x1) / 2, cy: layout.stringCenters[stringIndex] };
}

export function hitTestCell(layout: FretboardLayout, x: number, y: number): { stringIndex: number; fretIndex: number } | null {
  if (x < layout.neck.xMin || x > layout.neck.xMax) return null;
  if (y < layout.neck.yMin || y > layout.neck.yMax) return null;

  // fret
  let fretIndex = -1;
  for (let i = 0; i < layout.fretBoundaries.length - 1; i++) {
    if (x >= layout.fretBoundaries[i] && x < layout.fretBoundaries[i + 1]) { fretIndex = i; break; }
  }
  if (fretIndex < 0) return null;

  // string band
  let stringIndex = -1;
  for (let i = 0; i < layout.stringBands.length - 1; i++) {
    if (y >= layout.stringBands[i] && y < layout.stringBands[i + 1]) { stringIndex = i; break; }
  }
  if (stringIndex < 0 || stringIndex > 5) return null;

  return { stringIndex, fretIndex };
}
