import { resizeCanvasToHost } from "./types";

/**
 * Canvas2D Staff+TAB renderer.
 *
 * Canon-pure path:
 * - Canvas is the primary rendered surface.
 * - We preserve the established, near-final STAFF+TAB look by rasterizing the
 *   existing SVG template into the canvas as the background.
 * - This avoids re-inventing notation layout while still keeping Canvas2D as
 *   the primary backend.
 */
export class StaffTabRenderer2D {
  private canvas: HTMLCanvasElement;

  // Background template (rasterized SVG)
  private bgImg: HTMLImageElement | null = null;
  private bgLoaded = false;
  private bgError: string | null = null;

  // Keep last-drawn size so we can avoid unnecessary rework
  private lastW = 0;
  private lastH = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  /**
   * Load an SVG template and use it as the canvas background.
   * The SVG is fetched as text, turned into a Blob URL, and then drawn via Image().
   */
  async setBackgroundFromSvg(svgUrl: string): Promise<void> {
    this.bgLoaded = false;
    this.bgError = null;

    try {
      const res = await fetch(svgUrl, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${svgUrl}`);

      const svgText = await res.text();
      const blob = new Blob([svgText], { type: "image/svg+xml" });
      const objUrl = URL.createObjectURL(blob);

      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.bgImg = img;
          this.bgLoaded = true;
          URL.revokeObjectURL(objUrl);
          resolve();
        };
        img.onerror = () => {
          URL.revokeObjectURL(objUrl);
          reject(new Error(`Failed to load SVG image: ${svgUrl}`));
        };
        img.src = objUrl;
      });

      // Draw immediately after load
      this.draw(true);
    } catch (e: any) {
      this.bgError = String(e?.message ?? e);
      this.bgLoaded = false;
      this.bgImg = null;
      // Fallback draw so surface isn't blank
      this.draw(true);
    }
  }

  /**
   * Draw the STAFF+TAB surface.
   * If the SVG background is available, it is drawn first (scaled to fill).
   * Otherwise we draw a minimal fallback system so the surface is never blank.
   */
  draw(force = false) {
    const { w, h } = resizeCanvasToHost(this.canvas);
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    if (!force && w === this.lastW && h === this.lastH) {
      // no-op for stable layout unless forced
    } else {
      this.lastW = w;
      this.lastH = h;
    }

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background: prefer rasterized SVG template for parity with prior "near-perfect" render.
    if (this.bgImg && this.bgLoaded) {
      // Fill the available space. SVG is resolution-independent so scaling is safe.
      ctx.drawImage(this.bgImg, 0, 0, w, h);
      return;
    }

    // Fallback: minimal staff/tab system (kept intentionally simple)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const pad = Math.max(10, Math.round(w * 0.035));
    const innerX = pad;
    const innerW = w - pad * 2;
    const innerY = pad;
    const innerH = h - pad * 2;

    const staffH = innerH * 0.56;
    const tabH = innerH - staffH;

    // Staff lines
    const staffTop = innerY + Math.round(staffH * 0.18);
    const staffGap = Math.max(8, Math.round(staffH * 0.12));
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = staffTop + i * staffGap;
      ctx.beginPath();
      ctx.moveTo(innerX, y);
      ctx.lineTo(innerX + innerW, y);
      ctx.stroke();
    }

    // TAB label + lines
    const tabTop = innerY + staffH + Math.round(tabH * 0.10);
    const tabGap = Math.max(7, Math.round(tabH * 0.10));
    ctx.font = `${Math.max(18, Math.round(tabGap * 1.7))}px serif`;
    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";
    ctx.fillText("TAB", innerX, tabTop + (5 * tabGap) / 2);

    for (let i = 0; i < 6; i++) {
      const y = tabTop + i * tabGap;
      ctx.beginPath();
      ctx.moveTo(innerX, y);
      ctx.lineTo(innerX + innerW, y);
      ctx.stroke();
    }

    // Measures
    ctx.strokeStyle = "#777";
    ctx.lineWidth = 1;
    const bars = 3;
    for (let i = 1; i < bars; i++) {
      const x = innerX + (innerW * i) / bars;
      // Staff barline only across staff system
      ctx.beginPath();
      ctx.moveTo(x, staffTop);
      ctx.lineTo(x, staffTop + 4 * staffGap);
      ctx.stroke();
      // Tab barline only across tab lines
      ctx.beginPath();
      ctx.moveTo(x, tabTop);
      ctx.lineTo(x, tabTop + 5 * tabGap);
      ctx.stroke();
    }

    // Visible error hint (non-invasive): if background failed, draw small warning text.
    if (this.bgError) {
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#b00020";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(`Staff background load failed: ${this.bgError}`, innerX, Math.max(14, innerY - 2));
    }
  }
}
