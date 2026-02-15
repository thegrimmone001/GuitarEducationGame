import { Action, SlotType, GameState } from "./types";
import { computeLayoutFromSvg, FretboardLayout, hitTestCell, cellCenter } from "./fretboardLayout";
// NOTE:
// We no longer require left/right precision taps to distinguish sharps vs flats.
// Input should be consistent across all notes (same target size as naturals).
// Spelling (sharp vs flat) is determined by the current prompt variant.

export interface UiAdapter {
  layout: FretboardLayout;
  svgRoot: SVGSVGElement;
  dispatch: (a: Action) => void;
}

export async function createUiAdapter(svgRoot: SVGSVGElement, dispatch: (a: Action) => void): Promise<UiAdapter> {
  // Use the official vector fretboard geometry as the hitbox layout source.
  // (The photoreal v2 SVG is for visuals and does not expose clean fret/string lines.)
  const svgText = await fetch("/Guitar_FretBoard_Horizontal-Complete.svg").then(r => r.text());
  const layout = computeLayoutFromSvg(svgText);

  return { layout, svgRoot, dispatch };
}

function clientToSvg(svgRoot: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
  const pt = svgRoot.createSVGPoint();
  pt.x = clientX; pt.y = clientY;
  const ctm = svgRoot.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const inv = ctm.inverse();
  const p = pt.matrixTransform(inv);
  return { x: p.x, y: p.y };
}

function promptLane(state: GameState): SlotType {
  // The current prompt fully determines the intended spelling lane.
  // This keeps sharp/flat input as easy to hit as natural notes.
  return (state.prompt.variantId % 3) as SlotType;
}

function isNearDot(layout: FretboardLayout, stringIndex: number, fretIndex: number, x: number, y: number): boolean {
  const c = cellCenter(layout, stringIndex, fretIndex);
  const dx = x - c.cx;
  const dy = y - c.cy;
  return (dx*dx + dy*dy) <= (layout.dotRadius * layout.dotRadius);
}


const SVG_NS = "http://www.w3.org/2000/svg";

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

function renderHover(svg: SVGSVGElement, layout: FretboardLayout, hit: { stringIndex: number; fretIndex: number } | null): void {
  const g = ensureGroup(svg, "geduHover");
  g.innerHTML = "";
  if (!hit) return;
  const c = cellCenter(layout, hit.stringIndex, hit.fretIndex);
  const r = Math.max(6, Math.min(14, layout.dotRadius * 0.9));
  const circle = document.createElementNS(SVG_NS, "circle") as SVGCircleElement;
  circle.setAttribute("cx", String(c.cx));
  circle.setAttribute("cy", String(c.cy));
  circle.setAttribute("r", String(r));
  circle.setAttribute("fill", "rgba(0,0,0,0.07)");
  circle.setAttribute("stroke", "rgba(0,0,0,0.35)");
  circle.setAttribute("stroke-width", "1");
  g.appendChild(circle);
}

export function attachBoardPointerHandlers(
  adapter: UiAdapter,
  getState: () => GameState | null,
  overlaySvg: SVGSVGElement
) {
  const onPointer = (ev: PointerEvent) => {
    ev.preventDefault();
    overlaySvg.setPointerCapture(ev.pointerId);

    const state = getState();
    if (!state) return;

    const p = clientToSvg(adapter.svgRoot, ev.clientX, ev.clientY);
    const hit = hitTestCell(adapter.layout, p.x, p.y);
    if (!hit) return;

    const { stringIndex, fretIndex } = hit;
    const desiredLane = promptLane(state);

    // Dev/Test mode: allow direct painting/erasing of claims for rapid testing.
    // NOTE: Dev/Test can be enabled without forcing paint mode.
    if (state.settings.dev?.enabled && state.settings.dev.paintEnabled) {
      const dev = state.settings.dev;
      const set: 0 | 1 = (dev.paintMode === "erase" || ev.shiftKey) ? 0 : 1;
      let lane: SlotType = desiredLane;
      if (dev.paintLane === "nat") lane = 0;
      else if (dev.paintLane === "shr") lane = 1;
      else if (dev.paintLane === "flt") lane = 2;
      // "prompt" uses the spelling lane implied by the current prompt.

      // Clamp player index defensively.
      const ownerPlayerIndex = Math.max(0, Math.min(state.players.length - 1, dev.paintPlayerIndex | 0));

      adapter.dispatch({ type: "DEV_PLACE", stringIndex, fretIndex, lane, ownerPlayerIndex, set });
      return;
    }

    // IMPORTANT (consistency update):
    // Sharps/flats must be as easy to hit as natural notes.
    // We do NOT require a left/right half tap.
    // The prompt determines the intended spelling lane (NAT/SHR/FLT).
    const idx = stringIndex * state.fretCount + fretIndex;
    const laneOwner = state.board.owner[desiredLane][idx];

    // Only interpret a dot-tap as a steal attempt if the targeted lane is
    // owned by *another* player. (Avoid punishing accidental re-taps.)
    const curPlayerId = state.players[state.currentPlayer]?.profile.id ?? -1;

    const nearDot = isNearDot(adapter.layout, stringIndex, fretIndex, p.x, p.y);

    // If the player taps their own already-claimed dot in the prompt lane, ignore it.
    // (Smart-board taps can be imprecise; this prevents accidental self-sabotage.)
    if (laneOwner === curPlayerId && nearDot) return;

    // Tap a dot owned by another player in the prompt lane => steal attempt.
    if (laneOwner !== -1 && laneOwner !== curPlayerId && nearDot) {
      adapter.dispatch({ type: "STEAL_CELL", stringIndex, fretIndex });
      return;
    }

    // Normal attempt.
    adapter.dispatch({ type: "TAP_CELL", stringIndex, fretIndex });
  };

  overlaySvg.addEventListener("pointerdown", onPointer, { passive: false });

  const onMove = (ev: PointerEvent) => {
    const p = clientToSvg(adapter.svgRoot, ev.clientX, ev.clientY);
    const hit = hitTestCell(adapter.layout, p.x, p.y);
    renderHover(overlaySvg, adapter.layout, hit);
  };

  overlaySvg.addEventListener("pointermove", onMove, { passive: true });
  overlaySvg.addEventListener("pointerleave", () => renderHover(overlaySvg, adapter.layout, null), { passive: true });
}

