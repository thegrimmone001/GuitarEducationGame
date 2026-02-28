import { resizeCanvasToHost } from "./types";
import { computeDidacticLayout } from "../shell/fretboardLayout";

export type FretboardView = {
  // Total playable fret columns INCLUDING open string (fret 0).
  // Example: 0..12 => fretCount = 13
  fretCount: number;
  strings: number; // usually 6
};

/**
 * Deterministic canvas renderer for the fretboard. This is the new primary visual surface.
 * Hit-testing remains handled by existing overlays for now.
 */
export class FretboardRenderer2D {
  private canvas: HTMLCanvasElement;
  private view: FretboardView;

  constructor(canvas: HTMLCanvasElement, view: Partial<FretboardView> = {}) {
    this.canvas = canvas;
    this.view = { fretCount: view.fretCount ?? 13, strings: view.strings ?? 6 };
  }

  setView(view: Partial<FretboardView>) {
    this.view = { ...this.view, ...view };
    this.draw();
  }

  draw() {
    const { w, h } = resizeCanvasToHost(this.canvas);
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,0,0,0.0)";
    ctx.fillRect(0, 0, w, h);

    const layout = computeDidacticLayout({
      w,
      h,
      fretCount: Math.max(1, this.view.fretCount),
      stringCount: Math.max(1, this.view.strings),
    });

    const gridX = layout.neck.xMin;
    const gridY = layout.neck.yMin;
    const gridW = layout.neck.xMax - layout.neck.xMin;
    const gridH = layout.neck.yMax - layout.neck.yMin;

    // Neck silhouette (educational: readable, not physically tapered fret spacing)
    // Slight rightward taper to preserve "guitar neck" feel while keeping grid uniform.
    const taper = Math.min(gridW * 0.08, gridH * 0.18);
    const x0 = gridX;
    const x1 = gridX + gridW;
    const y0 = gridY;
    const y1 = gridY + gridH;
    ctx.beginPath();
    ctx.moveTo(x0, y0 + taper);
    ctx.lineTo(x1, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x0, y1 - taper);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Frets (uniform columns)
    const fretCount = Math.max(1, this.view.fretCount);
    const colW = gridW / fretCount;

    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1;

    for (let i = 0; i <= fretCount; i++) {
      const x = gridX + i * colW;
      ctx.beginPath();
      ctx.moveTo(x, gridY);
      ctx.lineTo(x, gridY + gridH);
      ctx.stroke();
    }

    // Nut emphasis
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gridX + colW, gridY);
    ctx.lineTo(gridX + colW, gridY + gridH);
    ctx.stroke();

    // Strings
    const stringCount = Math.max(1, this.view.strings);
    const rowH = gridH / stringCount;

    for (let s = 0; s < stringCount; s++) {
      const y = gridY + (s + 0.5) * rowH;
      const t = s / Math.max(1, stringCount - 1);
      // Thicker/stronger strings should appear at the bottom (low strings).
      ctx.strokeStyle = `rgba(255,255,255,${0.18 + 0.22 * t})`;
      ctx.lineWidth = 1 + t;
      ctx.beginPath();
      ctx.moveTo(gridX, y);
      ctx.lineTo(gridX + gridW, y);
      ctx.stroke();
    }

    // Simple fret markers (12, 15, 17, 19, 21, 24) as circles - OPTIONAL visual aid.
    // These are not authoritative; they are a fallback visual.
    const markerFrets = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
    const markerColor = "rgba(255,255,255,0.12)";
    ctx.fillStyle = markerColor;
    // Markers are on frets (not on the open column), so skip f=0.
    for (let f = 1; f < fretCount; f++) {
      if (!markerFrets.has(f)) continue;
      const cx = gridX + (f + 0.5) * colW;
      const cy = gridY + gridH / 2;
      const r = Math.min(colW, rowH) * 0.12;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      if (f === 12 || f === 24) {
        // double dot
        const dy = gridH * 0.18;
        ctx.beginPath();
        ctx.arc(cx, cy - dy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy + dy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
