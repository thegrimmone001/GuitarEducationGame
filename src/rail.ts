import { buildAllowedVariantsFromSettings } from "./promptProfiles";
import { fromVariantId, variantLabel, IS_BLACK } from "./music";
import { GameSettings, SlotType, VariantId } from "./types";

export type RailMode = "ROTATE_COMPASS" | "FIXED_REFERENCE";

export interface RailConfig {
  /** When in FIXED_REFERENCE, anchor to the context root (key/scale/chord root). */
  anchorVariantId: VariantId;
  /** Current prompt (always highlighted). */
  currentVariantId: VariantId;
  /** Determines whether the rail animates like a compass or remains static. */
  mode: RailMode;
}

export interface ChromaticRail {
  el: HTMLElement;
  setConfig: (cfg: RailConfig, settings: GameSettings) => void;
}

// 25 slots: offsets -12..+12 around center.
const SLOT_COUNT = 25;
const CENTER_INDEX = 12;
const OFFSETS = Array.from({ length: SLOT_COUNT }, (_, i) => i - CENTER_INDEX);
// 25 slots: 0..24 from tonic when in FIXED_REFERENCE.
const OFFSETS_FIXED = Array.from({ length: SLOT_COUNT }, (_, i) => i);

function signedShortestDelta(fromPc: number, toPc: number): number {
  const up = (toPc - fromPc + 12) % 12;
  const down = (fromPc - toPc + 12) % 12;
  if (up < down) return +up;
  if (down < up) return -down;
  // Tritone tie (6): prefer right/ascending for now.
  return +up;
}

function pcOf(vid: VariantId): number {
  return Math.floor(vid / 3);
}

function laneOf(vid: VariantId): SlotType {
  return (vid % 3) as SlotType;
}

function toVariantForPc(pc: number, preferLane: SlotType): VariantId {
  // For white keys, force NAT.
  if (!IS_BLACK[pc]) return (pc * 3 + SlotType.NAT) as VariantId;
  // For black keys, use the preferred lane.
  return (pc * 3 + preferLane) as VariantId;
}

function inferPreferredLane(settings: GameSettings): SlotType {
  // If the promptProfileId implies a preference (key/scale), buildAllowedVariants will restrict to one lane.
  // We can infer by checking one known black pc (like 1). If SHR allowed, prefer SHR, else FLT.
  const allowed = buildAllowedVariantsFromSettings(settings);
  const testPc = 1;
  const shr = allowed[testPc * 3 + SlotType.SHR] === 1;
  const flt = allowed[testPc * 3 + SlotType.FLT] === 1;
  if (shr && !flt) return SlotType.SHR;
  if (flt && !shr) return SlotType.FLT;
  // Chromatic defaults to sharps.
  return SlotType.SHR;
}

function isAllowedPc(pc: number, settings: GameSettings): { allowed: boolean; allowedShr: boolean; allowedFlt: boolean; allowedNat: boolean } {
  const allowed = buildAllowedVariantsFromSettings(settings);
  const allowedNat = allowed[pc * 3 + SlotType.NAT] === 1;
  const allowedShr = allowed[pc * 3 + SlotType.SHR] === 1;
  const allowedFlt = allowed[pc * 3 + SlotType.FLT] === 1;
  return { allowed: allowedNat || allowedShr || allowedFlt, allowedShr, allowedFlt, allowedNat };
}

function renderCellsCompass(centerVariantId: VariantId, settings: GameSettings): string {
  const centerPc = pcOf(centerVariantId);
  const preferLane = inferPreferredLane(settings);

  return OFFSETS.map((off, i) => {
    const pc = (centerPc + off + 1200) % 12;
    const allow = isAllowedPc(pc, settings);
    const isCenter = i === CENTER_INDEX;

    // Decide how to label the cell.
    // NOTE: labelHtml may contain small markup for dual-spelling black keys.
    let labelHtml = "";
    if (!IS_BLACK[pc]) {
      labelHtml = variantLabel((pc * 3 + SlotType.NAT) as VariantId);
    } else {
      // If only one lane allowed, use that spelling.
      if (allow.allowedShr && !allow.allowedFlt) labelHtml = variantLabel((pc * 3 + SlotType.SHR) as VariantId);
      else if (allow.allowedFlt && !allow.allowedShr) labelHtml = variantLabel((pc * 3 + SlotType.FLT) as VariantId);
      else {
        // Both lanes allowed (chromatic): render a clean split label (sharp-left, flat-right).
        // This prevents truncation while matching the visual logic used on the fretboard.
        const a = variantLabel((pc * 3 + SlotType.SHR) as VariantId);
        const b = variantLabel((pc * 3 + SlotType.FLT) as VariantId);
        labelHtml = `<span class="railSplit"><span class="railSplitSharp">${a}</span><span class="railSplitFlat">${b}</span></span>`;
      }
    }

    const cls = [
      "railCell",
      allow.allowed ? "allowed" : "blocked",
      IS_BLACK[pc] ? "black" : "white",
      isCenter ? "center" : "",
    ].filter(Boolean).join(" ");

    // For key/scale mode: if black key is only allowed in one spelling, show half-block indicators.
    const half = IS_BLACK[pc] && allow.allowed && (allow.allowedShr !== allow.allowedFlt)
      ? `<div class="halfBlock ${allow.allowedShr ? "fltOff" : "shrOff"}"></div>`
      : "";

    return `<div class="${cls}" data-idx="${i}">${half}<div class="railLabel">${labelHtml}</div></div>`;
  }).join("");
}

function renderCellsFixed(anchorVariantId: VariantId, settings: GameSettings): string {
  const basePc = pcOf(anchorVariantId);
  const preferLane = inferPreferredLane(settings);

  return OFFSETS_FIXED.map((off, i) => {
    const pc = (basePc + off + 1200) % 12;
    const allow = isAllowedPc(pc, settings);

    // Decide how to label the cell.
    // In fixed-reference mode, the tonic spelling should remain consistent at 0, 12, 24.
    let labelHtml = "";
    const isTonicCell = (i === 0 || i === 12 || i === 24);
    if (isTonicCell) {
      labelHtml = variantLabel(anchorVariantId);
    } else if (!IS_BLACK[pc]) {
      labelHtml = variantLabel((pc * 3 + SlotType.NAT) as VariantId);
    } else {
      if (allow.allowedShr && !allow.allowedFlt) labelHtml = variantLabel((pc * 3 + SlotType.SHR) as VariantId);
      else if (allow.allowedFlt && !allow.allowedShr) labelHtml = variantLabel((pc * 3 + SlotType.FLT) as VariantId);
      else {
        const a = variantLabel((pc * 3 + SlotType.SHR) as VariantId);
        const b = variantLabel((pc * 3 + SlotType.FLT) as VariantId);
        labelHtml = `<span class="railSplit"><span class="railSplitSharp">${a}</span><span class="railSplitFlat">${b}</span></span>`;
      }
    }

    const cls = [
      "railCell",
      allow.allowed ? "allowed" : "blocked",
      IS_BLACK[pc] ? "black" : "white",
      isTonicCell ? "tonic" : "",
    ].filter(Boolean).join(" ");

    const half = IS_BLACK[pc] && allow.allowed && (allow.allowedShr !== allow.allowedFlt)
      ? `<div class="halfBlock ${allow.allowedShr ? "fltOff" : "shrOff"}"></div>`
      : "";

    return `<div class="${cls}" data-idx="${i}">${half}<div class="railLabel">${labelHtml}</div></div>`;
  }).join("");
}

export function createChromaticRail(): ChromaticRail {
  const el = document.createElement("div");
  el.className = "rail";
  el.innerHTML = `
    <div class="railViewport">
      <div class="railTrack" id="railTrack"></div>
    </div>
  `;

  const track = el.querySelector<HTMLElement>("#railTrack")!;

  let lastCenterPc: number | null = null;
  let lastCenterLane: SlotType | null = null;
  let cfg: RailConfig | null = null;

  const setConfig = (next: RailConfig, settings: GameSettings) => {
    cfg = next;

    const mode = next.mode;
    const centerVid = mode === "ROTATE_COMPASS" ? next.currentVariantId : next.anchorVariantId;
    const centerPc = pcOf(centerVid);
    const centerLane = laneOf(centerVid);

    // Static render for fixed reference: tonic (anchor) is the left-most cell.
    if (mode === "FIXED_REFERENCE") {
      const anchorVid = next.anchorVariantId;
      const basePc = pcOf(anchorVid);
      track.style.transition = "none";
      track.style.transform = "translateX(0px)";
      track.innerHTML = renderCellsFixed(anchorVid, settings);
      // Highlight current prompt within the fixed rail.
      requestAnimationFrame(() => {
        const currentPc = pcOf(next.currentVariantId);
        const deltaFromTonic = (currentPc - basePc + 12) % 12; // 0..11
        const targetIndex = deltaFromTonic; // highlight within the first octave
        track.querySelectorAll(".railCell").forEach((c) => c.classList.remove("target"));
        const target = track.querySelector(`.railCell[data-idx="${targetIndex}"]`);
        target?.classList.add("target");
      });
      lastCenterPc = basePc;
      lastCenterLane = laneOf(anchorVid);
      return;
    }

    // ROTATE_COMPASS: center is always the current prompt.
    if (lastCenterPc === null) {
      track.style.transition = "none";
      track.style.transform = "translateX(0px)";
      track.innerHTML = renderCellsCompass(next.currentVariantId, settings);
      track.querySelector(`.railCell[data-idx="${CENTER_INDEX}"]`)?.classList.add("target");
      lastCenterPc = centerPc;
      lastCenterLane = centerLane;
      return;
    }

    // Animate from last center to new center using shortest semitone distance.
    const delta = signedShortestDelta(lastCenterPc, centerPc);
    const abs = Math.abs(delta);
    if (abs === 0) {
      // Only spelling changed; re-render without animation.
      track.style.transition = "none";
      track.style.transform = "translateX(0px)";
      track.innerHTML = renderCellsCompass(next.currentVariantId, settings);
      track.querySelector(`.railCell[data-idx="${CENTER_INDEX}"]`)?.classList.add("target");
      lastCenterPc = centerPc;
      lastCenterLane = centerLane;
      return;
    }

    // Render at the OLD center first, then animate the track shift.
    const oldCenterVid = toVariantForPc(lastCenterPc, lastCenterLane ?? SlotType.SHR);
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";
    track.innerHTML = renderCellsCompass(oldCenterVid, settings);

    const cell0 = track.querySelector<HTMLElement>(`.railCell[data-idx="0"]`);
    const cellW = cell0?.getBoundingClientRect().width ?? 34;

    // Positive delta means moving up/ascending => shift track left so the new note appears in center.
    const px = -delta * cellW;
    requestAnimationFrame(() => {
      track.style.transition = "transform 280ms ease-out";
      track.style.transform = `translateX(${px}px)`;
    });

    // After animation, snap to the new centered render.
    window.setTimeout(() => {
      if (!cfg) return;
      track.style.transition = "none";
      track.style.transform = "translateX(0px)";
      track.innerHTML = renderCellsCompass(cfg.currentVariantId, settings);
      track.querySelector(`.railCell[data-idx="${CENTER_INDEX}"]`)?.classList.add("target");
      lastCenterPc = centerPc;
      lastCenterLane = centerLane;
    }, 300);
  };

  return { el, setConfig };
}
