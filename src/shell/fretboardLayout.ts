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
  // Primary format: a polygon with id="Neck".
  let points: string | null = null;
  const direct = svgText.match(/<polygon[^>]+id="Neck"[^>]+points="([\s\S]*?)"/);
  if (direct) points = direct[1];

  // Alternate format (newer assets): <g id="Neck"> ... <polygon points="..." ...> ...
  if (!points) {
    const g = svgText.match(/<g[^>]+id="Neck"[^>]*>([\s\S]*?)<\/g>/);
    if (g) {
      const poly = g[1].match(/<polygon[^>]+points="([\s\S]*?)"/);
      if (poly) points = poly[1];
    }
  }

  if (!points) throw new Error("SVG missing Neck polygon");

  const coords = points.match(/([0-9.]+),([0-9.]+)/g) ?? [];
  const xs: number[] = [];
  const ys: number[] = [];
  for (const pair of coords) {
    const [x, y] = pair.split(",").map(Number);
    if (Number.isFinite(x) && Number.isFinite(y)) { xs.push(x); ys.push(y); }
  }
  return { xMin: Math.min(...xs), xMax: Math.max(...xs), yMin: Math.min(...ys), yMax: Math.max(...ys) };
}

// Exposed helper: used by the controller to read viewBox/neck bounds from visual SVG assets.
export function parseSvgViewBox(svgText: string): { x: number; y: number; w: number; h: number } {
  return extractViewBox(svgText);
}

export function parseSvgNeckBounds(svgText: string): { xMin: number; xMax: number; yMin: number; yMax: number } {
  return extractNeckBounds(svgText);
}

export function mapLayoutToNeck(
  layout: FretboardLayout,
  newViewBox: { x: number; y: number; w: number; h: number },
  newNeck: { xMin: number; xMax: number; yMin: number; yMax: number }
): FretboardLayout {
  const old = layout.neck;
  const oldW = Math.max(1e-6, old.xMax - old.xMin);
  const oldH = Math.max(1e-6, old.yMax - old.yMin);
  const newW = Math.max(1e-6, newNeck.xMax - newNeck.xMin);
  const newH = Math.max(1e-6, newNeck.yMax - newNeck.yMin);

  const mapX = (x: number) => newNeck.xMin + ((x - old.xMin) / oldW) * newW;
  const mapY = (y: number) => newNeck.yMin + ((y - old.yMin) / oldH) * newH;

  const scaleY = newH / oldH;

  return {
    viewBox: newViewBox,
    neck: { ...newNeck },
    fretBoundaries: layout.fretBoundaries.map(mapX),
    stringCenters: layout.stringCenters.map(mapY),
    stringBands: layout.stringBands.map(mapY),
    dotRadius: layout.dotRadius * scaleY,
  };
}

// NOTE: many of our SVG assets (especially the photo-style v2i fretboard) contain
// multiple near-duplicate coordinates for a single visual line due to clipping paths,
// shadows, and tiny floating-point differences. A wider epsilon keeps the logical
// fret/string lines stable.
function clusterSorted(values: number[], eps = 0.5): number[] {
  const sorted = [...values].sort((a,b) => a-b);
  const clusters: number[][] = [];
  for (const v of sorted) {
    const last = clusters[clusters.length - 1];
    if (!last || Math.abs(last[last.length - 1] - v) > eps) clusters.push([v]);
    else last.push(v);
  }
  return clusters.map(c => c.reduce((a,b)=>a+b,0) / c.length);
}

type SvgMatrix = { a: number; b: number; c: number; d: number; e: number; f: number };

function tryParseMatrix(transform: string | null): SvgMatrix | null {
  if (!transform) return null;
  const m = transform.match(/matrix\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(/[ ,]+/).map(Number).filter(Number.isFinite);
  if (parts.length !== 6) return null;
  const [a, b, c, d, e, f] = parts;
  return { a, b, c, d, e, f };
}

function tryParseSvg(svgText: string): Document | null {
  try {
    if (typeof DOMParser === "undefined") return null;
    return new DOMParser().parseFromString(svgText, "image/svg+xml");
  } catch {
    return null;
  }
}

function extractFretLines(svgText: string): number[] {
  const doc = tryParseSvg(svgText);
  if (doc) {
    const g = doc.getElementById("Frets");
    if (!g) throw new Error("SVG missing Frets group");

    // Primary: vector frets drawn as <line x1=...>
    const lineXs = Array.from(g.querySelectorAll("line"))
      .map((ln) => Number(ln.getAttribute("x1")))
      .filter(Number.isFinite);
    if (lineXs.length) return clusterSorted(lineXs);

    // Fallback: photo-style fretboard (v2i) draws frets as clipped <image> segments.
    // Use each image's transform matrix translation + scaled width to get the fret center.
    const imgXs = Array.from(g.querySelectorAll("image"))
      .map((img) => {
        const w = Number(img.getAttribute("width"));
        const mat = tryParseMatrix(img.getAttribute("transform"));
        if (!Number.isFinite(w) || !mat) return NaN;
        return mat.e + (w * mat.a) / 2;
      })
      .filter(Number.isFinite);
    if (imgXs.length) return clusterSorted(imgXs);
  }

  // Last-resort regex parse (keeps compatibility if DOMParser is unavailable)
  const m = svgText.match(/<g id="Frets">([\s\S]*?)<\/g>/);
  if (!m) throw new Error("SVG missing Frets group");
  const xs = [...m[1].matchAll(/x1="([0-9.]+)"/g)].map((mm) => Number(mm[1])).filter(Number.isFinite);
  return clusterSorted(xs);
}

function extractStringLines(svgText: string): number[] {
  const doc = tryParseSvg(svgText);
  if (doc) {
    const g = doc.getElementById("Strings");
    if (!g) throw new Error("SVG missing Strings group");

    // Primary: vector strings drawn as <line y1=...>
    const lineYs = Array.from(g.querySelectorAll("line"))
      .map((ln) => Number(ln.getAttribute("y1")))
      .filter(Number.isFinite);
    if (lineYs.length) return lineYs.sort((a, b) => a - b);

    // Fallback: photo-style fretboard draws each string as a clipped <image> strip.
    const imgYs = Array.from(g.querySelectorAll("image"))
      .map((img) => {
        const h = Number(img.getAttribute("height"));
        const mat = tryParseMatrix(img.getAttribute("transform"));
        if (!Number.isFinite(h) || !mat) return NaN;
        return mat.f + (h * mat.d) / 2;
      })
      .filter(Number.isFinite);
    if (imgYs.length) return clusterSorted(imgYs).sort((a, b) => a - b);
  }

  // Last-resort regex parse
  const m = svgText.match(/<g id="Strings">([\s\S]*?)<\/g>/);
  if (!m) throw new Error("SVG missing Strings group");
  const ys = [...m[1].matchAll(/y1="([0-9.]+)"/g)].map((mm) => Number(mm[1])).filter(Number.isFinite);
  return ys.sort((a, b) => a - b);
}

export function computeLayoutFromSvg(svgText: string): FretboardLayout {
  const viewBox = extractViewBox(svgText);
  const neckPoly = extractNeckBounds(svgText);

  const extractedFretLines = extractFretLines(svgText);
  if (!extractedFretLines.length) throw new Error("No fret lines detected");

  // Some assets include the nut as the first fret line; others (photo-style) do not.
  // We want boundaries for: open area, nut, fret1... and a right-edge boundary.
  const diffs = extractedFretLines
    .slice(1)
    .map((x, i) => x - extractedFretLines[i])
    .filter((d) => d > 1);
  const medianSpan = diffs.length
    ? [...diffs].sort((a, b) => a - b)[Math.floor(diffs.length / 2)]
    : (neckPoly.xMax - neckPoly.xMin) / 24;

  const hasNutInLines = Math.abs(extractedFretLines[0] - neckPoly.xMin) < 1.5;
  const nutX = hasNutInLines ? extractedFretLines[0] : (extractedFretLines[0] - medianSpan);
  const fretLines = hasNutInLines ? extractedFretLines : [nutX, ...extractedFretLines];

  // Prefer the neck polygon's true left edge as the open-string boundary when it sits left of the nut.
  const openLeft = (neckPoly.xMin < nutX - 1) ? neckPoly.xMin : Math.max(viewBox.x, nutX - medianSpan);

  // Ensure boundaries include: openLeft, nut+frets..., and the right edge of the neck polygon.
  const fretBoundaries = [openLeft, ...fretLines, neckPoly.xMax]
    .sort((a, b) => a - b)
    .filter((x, i, arr) => i === 0 || Math.abs(x - arr[i - 1]) > 0.25);

  // Expand interactive neck bounds to include the open-string area.
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

// ---------------------------------------------------------------------------
// DIDACTIC (EDUCATIONAL) FRETBOARD LAYOUT
// ---------------------------------------------------------------------------
// Canon: GLG uses uniform fret spacing for learning clarity.
// This layout intentionally does NOT model physical fret math.
//
// Notes on indexing:
// - The game state uses fretIndex 0 as OPEN.
// - Therefore, `fretCount` must equal the total number of playable columns,
//   including the open-string column.
// - `fretBoundaries.length === fretCount + 1`
// - The nut sits at boundary[1].
export function computeDidacticLayout(params: {
  w: number;
  h: number;
  fretCount: number;   // includes OPEN (fret 0)
  stringCount?: number; // default 6
  padXFrac?: number;   // default 0.06
  padYFrac?: number;   // default 0.12
}): FretboardLayout {
  const w = Math.max(1, params.w);
  const h = Math.max(1, params.h);
  const fretCount = Math.max(1, Math.floor(params.fretCount));
  const strings = Math.max(1, Math.floor(params.stringCount ?? 6));

  const padX = Math.round(w * (params.padXFrac ?? 0.06));
  const padY = Math.round(h * (params.padYFrac ?? 0.12));

  const neck = {
    xMin: padX,
    xMax: Math.max(padX + 1, w - padX),
    yMin: padY,
    yMax: Math.max(padY + 1, h - padY),
  };

  const neckW = Math.max(1, neck.xMax - neck.xMin);
  const neckH = Math.max(1, neck.yMax - neck.yMin);

  // Uniform columns across the usable neck width.
  const colW = neckW / fretCount;
  const fretBoundaries: number[] = [];
  for (let i = 0; i <= fretCount; i++) fretBoundaries.push(neck.xMin + i * colW);

  // Uniform string spacing.
  const rowH = neckH / strings;
  const stringCenters: number[] = [];
  const stringBands: number[] = [];
  for (let i = 0; i <= strings; i++) stringBands.push(neck.yMin + i * rowH);
  for (let i = 0; i < strings; i++) stringCenters.push(neck.yMin + (i + 0.5) * rowH);

  // Readability-first dot size.
  const dotRadius = Math.max(12, Math.min(colW * 0.28, rowH * 0.35, 26));

  return {
    viewBox: { x: 0, y: 0, w, h },
    neck,
    fretBoundaries,
    stringCenters,
    stringBands,
    dotRadius,
  };
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
  if (stringIndex < 0 || stringIndex >= layout.stringCenters.length) return null;

  return { stringIndex, fretIndex };
}
