import { FretboardRenderer2D } from "./FretboardRenderer2D";
import { StaffTabRenderer2D } from "./StaffTabRenderer2D";

export type RendererManagerHandles = {
  fretboard?: FretboardRenderer2D;
  staffTab?: StaffTabRenderer2D;
};

function assetUrl(path: string): string {
  // Vite base URL support
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}

/**
 * Initializes the Canvas2D primary renderers.
 * If canvases are missing (older layouts), this is a no-op.
 *
 * Canon-pure rendering:
 * - Staff+TAB background uses the existing SVG template rasterized into Canvas,
 *   preserving the previously "near-perfect" appearance while keeping Canvas2D
 *   as the primary backend.
 */
export function initCanvasRenderers(doc: Document): RendererManagerHandles {
  const handles: RendererManagerHandles = {};

  const w = window as any;
  if (w.__GEDU_RENDERERS_INSTALLED__) {
    try { (window as any).__GEDU_LOG_SYS__?.("guard:skip", { guard: "__GEDU_RENDERERS_INSTALLED__", file: "RendererManager.ts" }); } catch {}
    return handles;
  }
  w.__GEDU_RENDERERS_INSTALLED__ = true;

  // IMPORTANT: The app now has a launch/menu stage where the main UI is initially hidden.
  // When a canvas is inside a display:none subtree, getBoundingClientRect() returns 0x0.
  // If we draw during that phase, the canvas gets sized to 1×1 and never repaints unless
  // a window resize occurs. This produces the "blank white panels" regression.
  //
  // Canon requirement: rendering must be deterministic and self-healing as layout becomes visible.
  const scheduleSafeDraw = (() => {
    let raf = 0;
    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        handles.fretboard?.draw();
        handles.staffTab?.draw(true); // force so a newly-loaded background is painted
      });
    };
  })();

  const observeSize = (el: Element | null) => {
    if (!el || !("ResizeObserver" in window)) return;
    try {
      const ro = new ResizeObserver(() => scheduleSafeDraw());
      ro.observe(el as Element);
    } catch {
      // Ignore; resize listener below remains as fallback.
    }
  };

  const fretCanvas = doc.querySelector<HTMLCanvasElement>("#fretCanvas");
  if (fretCanvas) {
    // Default to a 0..12 learning neck (13 columns including open string).
    handles.fretboard = new FretboardRenderer2D(fretCanvas, { fretCount: 13, strings: 6 });
    // Observe parent container size changes (flex/layout settle) to repaint when the UI becomes visible.
    observeSize(fretCanvas.parentElement);
  }

  const staffCanvas = doc.querySelector<HTMLCanvasElement>("#staffCanvas");
  if (staffCanvas) {
    handles.staffTab = new StaffTabRenderer2D(staffCanvas);
    // Preserve established staff/tab look by using the SVG template as background.
    void handles.staffTab.setBackgroundFromSvg(
      assetUrl("/Guitar-Notes_Tab_Staff-Blank-3Measures.svg")
    );
    observeSize(staffCanvas.parentElement);
  }

  // Redraw on window resize.
  window.addEventListener("resize", scheduleSafeDraw);

  // First paint: wait until canvases have measurable size (post-launch, when main UI is shown).
  // This avoids 1×1 backing-store initialization when hidden.
  const ensureFirstPaint = (tries = 0) => {
    const staffReady = !staffCanvas || staffCanvas.getBoundingClientRect().width > 4;
    const fretReady = !fretCanvas || fretCanvas.getBoundingClientRect().width > 4;

    if (staffReady && fretReady) {
      scheduleSafeDraw();
      return;
    }
    if (tries > 240) {
      // Give up after ~4 seconds; still attempt a draw so we don't stay blank forever.
      scheduleSafeDraw();
      return;
    }
    requestAnimationFrame(() => ensureFirstPaint(tries + 1));
  };

  ensureFirstPaint();

  return handles;
}
