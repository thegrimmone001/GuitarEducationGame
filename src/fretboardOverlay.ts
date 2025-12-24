import { FretboardLayout, cellCenter } from "./fretboardLayout";
import { Difficulty, GameState, SlotType, VariantId } from "./types";
import { IS_BLACK, pitchClassAt, toVariantId, variantLabel } from "./music";

const PLAYER_COLORS = [
  "#38bdf8", "#a78bfa", "#34d399", "#fb7185",
  "#fbbf24", "#60a5fa", "#f472b6", "#4ade80",
  "#f97316", "#22c55e", "#e879f9", "#93c5fd",
  "#fda4af", "#c084fc", "#fde047", "#2dd4bf",
];

const PLAYER_MARKS = ["●","▲","■","◆","✚","✖","★","⬢","⬣","⬟","◐","◑","◒","◓","◍","⬤"];

function el<K extends keyof SVGElementTagNameMap>(tag: K): SVGElementTagNameMap[K] {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function setAttrs(node: Element, attrs: Record<string, string>) {
  for (const [k,v] of Object.entries(attrs)) node.setAttribute(k, v);
}

function halfCirclePath(cx: number, cy: number, r: number, which: "left" | "right"): string {
  const sweep = which === "left" ? "0" : "1";
  // Move to top, arc to bottom, close along diameter
  return `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${sweep} ${cx} ${cy + r} L ${cx} ${cy - r} Z`;
}

function makeNoteLabel(opts: {
  x: number;
  y: number;
  r: number;
  text: string;
  alpha: number;
  emphasize: boolean;
}) {
  const t = el("text");
  setAttrs(t, {
    x: String(opts.x),
    y: String(opts.y),
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": String(Math.max(10, opts.r * (opts.emphasize ? 0.72 : 0.64))),
    fill: `rgba(0,0,0,${opts.alpha})`,
    stroke: `rgba(255,255,255,${Math.min(0.6, Math.max(0, opts.alpha))})`,
    "stroke-width": String(Math.max(1, opts.r * 0.12)),
    "paint-order": "stroke",
  });
  t.textContent = opts.text;
  return t;
}

export function renderOverlay(
  svg: SVGSVGElement,
  layout: FretboardLayout,
  state: GameState,
  pulse: {
    playerId: number;
    variantId: VariantId;
    ghost: { cellIndex: number; slot: SlotType } | null;
    ghosts?: Array<{ cellIndex: number; slot: SlotType }>;
    scoreDelta: number;
  } | null
) {
  const gDots = el("g");
  const gClaimLabels = el("g");
  const gAllLabels = el("g");
  gClaimLabels.setAttribute("pointer-events", "none");
  gAllLabels.setAttribute("pointer-events", "none");

  const r = layout.dotRadius;
  const colorBlind = state.settings.accessibility.colorBlindMode;

  // --- Dots (ownership / vulnerable markers) ---
  for (let s = 0; s < 6; s++) {
    for (let f = 0; f < state.fretCount; f++) {
      const idx = s * state.fretCount + f;
      if (state.domainCellEnabled[idx] === 0) continue;

      const pc = pitchClassAt(s, f);
      const isBlack = IS_BLACK[pc];
      const { cx, cy } = cellCenter(layout, s, f);

      const natOwner = state.board.owner[SlotType.NAT][idx];
      const shrOwner = state.board.owner[SlotType.SHR][idx];
      const fltOwner = state.board.owner[SlotType.FLT][idx];

      const natV = state.board.vulnerable[SlotType.NAT][idx] === 1;
      const shrV = state.board.vulnerable[SlotType.SHR][idx] === 1;
      const fltV = state.board.vulnerable[SlotType.FLT][idx] === 1;

      // NAT (white keys)
      if (!isBlack && natOwner !== -1) {
        const c = PLAYER_COLORS[natOwner % PLAYER_COLORS.length];
        const circ = el("circle");
        setAttrs(circ, { cx: String(cx), cy: String(cy), r: String(r), fill: c, opacity: "0.92" });
        if (natV) circ.classList.add("vulnerable");
        gDots.appendChild(circ);

        if (colorBlind) {
          const t = el("text");
          setAttrs(t, {
            x: String(cx),
            y: String(cy + r * 0.35),
            "text-anchor": "middle",
            "font-size": String(r * 1.05),
            fill: "rgba(0,0,0,0.75)"
          });
          t.textContent = PLAYER_MARKS[natOwner % PLAYER_MARKS.length];
          gDots.appendChild(t);
        }
        continue;
      }

      // Black keys: split lanes
      if (isBlack) {
        if (shrOwner !== -1) {
          const c = PLAYER_COLORS[shrOwner % PLAYER_COLORS.length];
          const p = el("path");
          setAttrs(p, { d: halfCirclePath(cx, cy, r, "left"), fill: c, opacity: "0.92" });
          if (shrV) p.classList.add("vulnerable");
          gDots.appendChild(p);

          if (colorBlind) {
            const t = el("text");
            setAttrs(t, {
              x: String(cx - r * 0.35),
              y: String(cy + r * 0.35),
              "text-anchor": "middle",
              "font-size": String(r * 0.95),
              fill: "rgba(0,0,0,0.75)"
            });
            t.textContent = PLAYER_MARKS[shrOwner % PLAYER_MARKS.length];
            gDots.appendChild(t);
          }
        }

        if (fltOwner !== -1) {
          const c = PLAYER_COLORS[fltOwner % PLAYER_COLORS.length];
          const p = el("path");
          setAttrs(p, { d: halfCirclePath(cx, cy, r, "right"), fill: c, opacity: "0.92" });
          if (fltV) p.classList.add("vulnerable");
          gDots.appendChild(p);

          if (colorBlind) {
            const t = el("text");
            setAttrs(t, {
              x: String(cx + r * 0.35),
              y: String(cy + r * 0.35),
              "text-anchor": "middle",
              "font-size": String(r * 0.95),
              fill: "rgba(0,0,0,0.75)"
            });
            t.textContent = PLAYER_MARKS[fltOwner % PLAYER_MARKS.length];
            gDots.appendChild(t);
          }
        }

        // same player owns both halves => add double ring
        if (shrOwner !== -1 && shrOwner === fltOwner) {
          const c = PLAYER_COLORS[shrOwner % PLAYER_COLORS.length];
          const outer = el("circle");
          setAttrs(outer, { cx: String(cx), cy: String(cy), r: String(r + 2), fill: "none", stroke: c, "stroke-width": "3" });
          gDots.appendChild(outer);
          const inner = el("circle");
          setAttrs(inner, { cx: String(cx), cy: String(cy), r: String(r - 2), fill: "none", stroke: c, "stroke-width": "2" });
          gDots.appendChild(inner);
        }
      }
    }
  }

  // --- Note labels ---
  const diff = state.settings.difficulty;
  const showAll = diff === Difficulty.LEARNING;     // B: show note names everywhere (including grayed-out range)
  const showOwned = diff === Difficulty.EASY;       // show note names only on correctly claimed notes

  if (showAll || showOwned) {
    for (let s = 0; s < 6; s++) {
      for (let f = 0; f < state.fretCount; f++) {
        const idx = s * state.fretCount + f;

        const pc = pitchClassAt(s, f);
        const isBlack = IS_BLACK[pc];
        const { cx, cy } = cellCenter(layout, s, f);

        const inDomain = state.domainCellEnabled[idx] === 1;
        const baseAlpha = inDomain ? (showAll ? 0.70 : 0.92) : (showAll ? 0.22 : 0.0);
        if (baseAlpha <= 0) continue;

        if (!isBlack) {
          const vid = toVariantId(pc, SlotType.NAT);
          if (state.variants.allowed[vid] !== 1) continue;

          const owned = state.board.owner[SlotType.NAT][idx] !== -1;
          if (!showAll && !owned) continue;

          const t = makeNoteLabel({
            x: cx,
            y: cy + r * 0.20,
            r,
            text: variantLabel(vid),
            alpha: baseAlpha,
            emphasize: owned && !showAll,
          });
          (showAll ? gAllLabels : gClaimLabels).appendChild(t);
        } else {
          for (const lane of [SlotType.SHR, SlotType.FLT] as const) {
            const vid = toVariantId(pc, lane);
            if (state.variants.allowed[vid] !== 1) continue;

            const owned = state.board.owner[lane][idx] !== -1;
            if (!showAll && !owned) continue;

            const x = lane === SlotType.SHR ? cx - r * 0.35 : cx + r * 0.35;
            const t = makeNoteLabel({
              x,
              y: cy + r * 0.20,
              r,
              text: variantLabel(vid),
              alpha: baseAlpha,
              emphasize: owned && !showAll,
            });
            (showAll ? gAllLabels : gClaimLabels).appendChild(t);
          }
        }
      }
    }
  }

  // --- Pulse overlay (synced score + ghost reveal) ---
  let gPulse: SVGGElement | null = null;
  if (pulse) {
    gPulse = el("g");
    gPulse.classList.add("pulseOverlay");

    const label = el("text");
    setAttrs(label, { x: String(layout.neck.xMin + 14), y: String(layout.neck.yMin + 26), "font-size": "18", fill: "white" });
    const d = pulse.scoreDelta;
    const prefix = d >= 0 ? "Correct" : "Hint";
    const sign = d >= 0 ? "+" : "-";
    label.textContent = `${prefix}: ${variantLabel(pulse.variantId)}  (${sign}${Math.abs(d)})`;
    gPulse.appendChild(label);

    const ghosts = pulse.ghosts ?? (pulse.ghost ? [pulse.ghost] : []);
    if (ghosts.length) {
      const alpha = ghosts.length > 10 ? 0.55 : 0.9;
      for (const g of ghosts) {
        const gi = g.cellIndex;
        const s = Math.floor(gi / state.fretCount);
        const f = gi % state.fretCount;
        const { cx, cy } = cellCenter(layout, s, f);

        // Ghost ring indicates the correct *target* location (unclaimed if available, else stealable).
        const ring = el("circle");
        setAttrs(ring, { cx: String(cx), cy: String(cy), r: String(r + 4), fill: "none", stroke: "white", "stroke-width": "3", opacity: String(alpha) });
        gPulse.appendChild(ring);

        // For black keys, show which half is correct by drawing the half-fill ghost.
        if (g.slot === SlotType.SHR) {
          const hp = el("path");
          setAttrs(hp, { d: halfCirclePath(cx, cy, r, "left"), fill: "rgba(255,255,255,0.65)" });
          gPulse.appendChild(hp);
        } else if (g.slot === SlotType.FLT) {
          const hp = el("path");
          setAttrs(hp, { d: halfCirclePath(cx, cy, r, "right"), fill: "rgba(255,255,255,0.65)" });
          gPulse.appendChild(hp);
        } else {
          const hc = el("circle");
          setAttrs(hc, { cx: String(cx), cy: String(cy), r: String(r), fill: "rgba(255,255,255,0.65)" });
          gPulse.appendChild(hc);
        }
      }
    }
  }

  // Final DOM update (order matters)
  const children: Element[] = [gDots];
  if (showOwned) children.push(gClaimLabels);
  if (showAll) children.push(gAllLabels);
  if (gPulse) children.push(gPulse);

  svg.replaceChildren(...children);
}
