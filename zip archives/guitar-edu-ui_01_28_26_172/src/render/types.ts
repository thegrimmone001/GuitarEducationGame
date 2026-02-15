export type CanvasHandle = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};

export function get2dContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context unavailable");
  return ctx;
}

/**
 * Resize a canvas to match its rendered CSS size at the current device pixel ratio.
 * Returns the logical CSS width/height and dpr used.
 */
export function resizeCanvasToHost(canvas: HTMLCanvasElement): { w: number; h: number; dpr: number } {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width));
  const h = Math.max(1, Math.floor(rect.height));
  const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

  const targetW = w * dpr;
  const targetH = h * dpr;

  if (canvas.width !== targetW) canvas.width = targetW;
  if (canvas.height !== targetH) canvas.height = targetH;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Reset transform then scale for DPR.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  return { w, h, dpr };
}
