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
  setLayers: (layers: Partial<{ view: boolean; asked: boolean; answered: boolean }>) => void;
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

type TritoneStyle = "plusDim" | "TT" | "sharp4" | "flat5" | "auto";

function intervalName(semitones: number): string {
  const st = ((semitones % 12) + 12) % 12;
  switch (st) {
    case 0: return "P1";
    case 1: return "m2";
    case 2: return "M2";
    case 3: return "m3";
    case 4: return "M3";
    case 5: return "P4";
    case 6: return "TT";
    case 7: return "P5";
    case 8: return "m6";
    case 9: return "M6";
    case 10: return "m7";
    case 11: return "M7";
    default: return "";
  }
}

function romanIntervalClassic(semitones: number): string {
  const st = ((semitones % 12) + 12) % 12;
  switch (st) {
    case 0: return "I";
    case 1: return "\u266dII";
    case 2: return "II";
    case 3: return "\u266dIII";
    case 4: return "III";
    case 5: return "IV";
    case 6: return "\u266dV";
    case 7: return "V";
    case 8: return "\u266dVI";
    case 9: return "VI";
    case 10: return "\u266dVII";
    case 11: return "VII";
    default: return "";
  }
}

function inferPreferSharp4(settings: GameSettings): boolean {
  const pid = (settings.promptProfileId ?? "").toLowerCase();
  if (pid.includes("lydian")) return true;
  if (pid.includes("locrian")) return false;
  if (pid.includes(":flats") || pid.includes("b")) return false;
  return true;
}

function intervalRoman(semitones: number, style: TritoneStyle, preferSharp4: boolean): string {
  const st = ((semitones % 12) + 12) % 12;
  switch (st) {
    case 0: return "I";
    case 1: return "ii";
    case 2: return "II";
    case 3: return "iii";
    case 4: return "III";
    case 5: return "IV";
    case 6: {
      if (style === "TT") return "TT";
      if (style === "sharp4") return "IV\u266f";
      if (style === "flat5") return "V\u266d";
      if (style === "auto") return preferSharp4 ? "IV\u266f" : "V\u266d";
      // plusDim (default): user convention
      return preferSharp4 ? "+IV" : "oV";
    }
    case 7: return "V";
    case 8: return "vi";
    case 9: return "VI";
    case 10: return "vii";
    case 11: return "VII";
    default: return "";
  }
}

function labelForPc(pc: number, anchorPc: number, settings: GameSettings, allow: ReturnType<typeof isAllowedPc>): { html: string; vid: VariantId } {
  const displayMode = ((settings as any).displayMode ?? "names") as string;
  const style = (((settings as any).tritoneStyle ?? "plusDim") as TritoneStyle);
  const preferSharp4 = inferPreferSharp4(settings);
  const accidentalView = (((settings as any).accidentalView ?? "both") as string);

  // Choose a representative variantId for click/selection.
  const preferLane = inferPreferredLane(settings);
  let vid: VariantId;
  if (!IS_BLACK[pc]) {
    vid = (pc * 3 + SlotType.NAT) as VariantId;
  } else if (allow.allowedShr && !allow.allowedFlt) {
    vid = (pc * 3 + SlotType.SHR) as VariantId;
  } else if (allow.allowedFlt && !allow.allowedShr) {
    vid = (pc * 3 + SlotType.FLT) as VariantId;
  } else {
    vid = (pc * 3 + preferLane) as VariantId;
  }

  if (displayMode === "intervals") {
    const semi = (pc - anchorPc + 12) % 12;
    return { html: allow.allowed ? intervalName(semi) : "", vid };
  }
  if (displayMode === "romanIntervals") {
    const semi = (pc - anchorPc + 12) % 12;
    return { html: allow.allowed ? romanIntervalClassic(semi) : "", vid };
  }
  if (displayMode === "intervalRoman") {
    const semi = (pc - anchorPc + 12) % 12;
    return { html: allow.allowed ? intervalRoman(semi, style, preferSharp4) : "", vid };
  }

  // If the note is not part of the allowed set, hide its label (cell remains for spacing).
  if (!allow.allowed) {
    return { html: "", vid };
  }

  // Default: note names (with split enharmonics for chromatic black keys)
  if (!IS_BLACK[pc]) {
    return { html: variantLabel((pc * 3 + SlotType.NAT) as VariantId), vid };
  }

  const a = variantLabel((pc * 3 + SlotType.SHR) as VariantId);
  const b = variantLabel((pc * 3 + SlotType.FLT) as VariantId);

  const shrAllowed = allow.allowedShr;
  const fltAllowed = allow.allowedFlt;

  // Resolve the user's view preference without ever showing an impossible-only spelling.
  const resolveSingle = (want: "sharps" | "flats"): string => {
    if (want === "sharps") {
      if (shrAllowed) return a;
      if (fltAllowed) return b;
      return a;
    }
    // flats
    if (fltAllowed) return b;
    if (shrAllowed) return a;
    return b;
  };

  if (accidentalView === "auto") {
    // Context-driven: if one lane is allowed, show that one; otherwise show the inferred preference.
    if (shrAllowed && !fltAllowed) return { html: a, vid };
    if (fltAllowed && !shrAllowed) return { html: b, vid };
    // Both lanes allowed: use the computed representative vid (preferred lane) for a single label.
    return { html: (vid % 3 === SlotType.FLT ? b : a), vid };
  }

  if (accidentalView === "sharps") {
    return { html: resolveSingle("sharps"), vid };
  }
  if (accidentalView === "flats") {
    return { html: resolveSingle("flats"), vid };
  }

  // Default: show both sharps + flats stacked in one cell.
  const shrCls = shrAllowed ? "railSplitSharp" : "railSplitSharp disabled";
  const fltCls = fltAllowed ? "railSplitFlat" : "railSplitFlat disabled";
  return { html: `<span class="railSplit"><span class="${shrCls}" data-lane="shr" title="Select sharp spelling">${a}</span><span class="${fltCls}" data-lane="flt" title="Select flat spelling">${b}</span></span>`, vid };
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

function renderCellsCompass(centerVariantId: VariantId, anchorVariantId: VariantId, settings: GameSettings): string {
  const centerPc = pcOf(centerVariantId);
  const anchorPc = pcOf(anchorVariantId);
  const accidentalView = (((settings as any).accidentalView ?? "both") as string);

  return OFFSETS.map((off, i) => {
    const pc = (centerPc + off + 1200) % 12;
    const allow = isAllowedPc(pc, settings);
    const isCenter = i === CENTER_INDEX;

    const { html: labelHtml, vid } = labelForPc(pc, anchorPc, settings, allow);

    const reqLane = laneOf(centerVariantId);
    const cls = [
      "railCell",
      allow.allowed ? "allowed" : "blocked",
      IS_BLACK[pc] ? "black" : "white",
      isCenter ? "center" : "",
      (isCenter && IS_BLACK[pc] ? (reqLane === SlotType.SHR ? "req-shr" : (reqLane === SlotType.FLT ? "req-flt" : "")) : ""),
    ].filter(Boolean).join(" ");

    // For key/scale mode: if black key is only allowed in one spelling, show half-block indicators.
    const half = IS_BLACK[pc] && allow.allowed && accidentalView === "both" && (allow.allowedShr !== allow.allowedFlt)
      ? `<div class="halfBlock ${allow.allowedShr ? "fltOff" : "shrOff"}"></div>`
      : "";

    return `<div class="${cls}" data-idx="${i}" data-vid="${vid}">${half}<div class="railLabel">${labelHtml}</div></div>`;
  }).join("");
}

function renderCellsFixed(anchorVariantId: VariantId, settings: GameSettings): string {
  const basePc = pcOf(anchorVariantId);
  const anchorPc = basePc;
  const accidentalView = (((settings as any).accidentalView ?? "both") as string);

  return OFFSETS_FIXED.map((off, i) => {
    const pc = (basePc + off + 1200) % 12;
    const allow = isAllowedPc(pc, settings);

    // In fixed-reference mode, the tonic spelling should remain consistent at 0, 12, 24.
    let labelHtml = "";
    const isTonicCell = (i === 0 || i === 12 || i === 24);
    let vid: VariantId;
    if (isTonicCell) {
      labelHtml = variantLabel(anchorVariantId);
      vid = anchorVariantId;
    } else {
      const r = labelForPc(pc, anchorPc, settings, allow);
      labelHtml = r.html;
      vid = r.vid;
    }

    const cls = [
      "railCell",
      allow.allowed ? "allowed" : "blocked",
      IS_BLACK[pc] ? "black" : "white",
      isTonicCell ? "tonic" : "",
    ].filter(Boolean).join(" ");

    const half = IS_BLACK[pc] && allow.allowed && accidentalView === "both" && (allow.allowedShr !== allow.allowedFlt)
      ? `<div class="halfBlock ${allow.allowedShr ? "fltOff" : "shrOff"}"></div>`
      : "";

    return `<div class="${cls}" data-idx="${i}" data-vid="${vid}">${half}<div class="railLabel">${labelHtml}</div></div>`;
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

  // Hover highlight + click selection (dispatches a global event consumed by the controller).
  // For enharmonic cells (C#/Db), each half label can be clicked to choose the spelling.
  track.addEventListener("click", (ev) => {
    const t = ev.target as HTMLElement | null;
    const cell = t?.closest?.(".railCell") as HTMLElement | null;
    if (!cell) return;
    const vidStr = cell.getAttribute("data-vid");
    if (!vidStr) return;
    const baseVid = Number(vidStr);
    if (!Number.isFinite(baseVid)) return;

    let pickVid = baseVid;

    // If the click landed on a split label, use that lane.
    const laneEl = t?.closest?.("[data-lane]") as HTMLElement | null;
    const laneKey = laneEl?.getAttribute?.("data-lane");
    if (laneKey) {
      if (laneEl?.classList?.contains("disabled")) return;
      const pc = Math.floor(baseVid / 3);
      if (laneKey === "shr") pickVid = (pc * 3 + SlotType.SHR) as VariantId;
      if (laneKey === "flt") pickVid = (pc * 3 + SlotType.FLT) as VariantId;
    }

    window.dispatchEvent(new CustomEvent("gedu:railSelect", { detail: { variantId: pickVid } }));
  });

  let lastCenterPc: number | null = null;
  let lastCenterLane: SlotType | null = null;
  let cfg: RailConfig | null = null;
  let lastSettings: GameSettings | null = null;

  // Default: the rail is primarily a prompt surface. "asked" controls the
  // target highlight. "answered" is reserved for future rail-history visuals
  // and defaults OFF to avoid implying persistence on the rail.
  let layers = { view: true, asked: true, answered: false };

  const applyLayerClasses = () => {
    el.classList.toggle("layerViewOff", !layers.view);
    el.classList.toggle("layerAskedOff", !layers.asked);
    el.classList.toggle("layerAnsweredOff", !layers.answered);
  };

  const setLayers = (next: Partial<{ view: boolean; asked: boolean; answered: boolean }>): void => {
    layers = { ...layers, ...next };
    applyLayerClasses();
    // Re-apply highlight rules for the current config (target highlight depends on asked-layer).
    if (cfg && lastSettings) setConfig(cfg, lastSettings);
  };

  const setConfig = (next: RailConfig, settings: GameSettings) => {
    cfg = next;
    lastSettings = settings;
    applyLayerClasses();

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
        // Clear any prior target highlight.
        track.querySelectorAll(".railCell").forEach((c) => c.classList.remove("target", "req-shr", "req-flt"));

        if (layers.asked) {
          const currentPc = pcOf(next.currentVariantId);
          const deltaFromTonic = (currentPc - basePc + 12) % 12; // 0..11
          const targetIndex = deltaFromTonic; // highlight within the first octave
          const target = track.querySelector(`.railCell[data-idx="${targetIndex}"]`);
          target?.classList.add("target");

          // If the current prompt is an enharmonic (sharp/flat), emphasize the correct spelling.
          if (target) {
            const lane = laneOf(next.currentVariantId);
            if (IS_BLACK[currentPc] && lane === SlotType.SHR) target.classList.add("req-shr");
            if (IS_BLACK[currentPc] && lane === SlotType.FLT) target.classList.add("req-flt");
          }
        }
      });
      lastCenterPc = basePc;
      lastCenterLane = laneOf(anchorVid);
      return;
    }

    // ROTATE_COMPASS: current prompt is always centered.
    // We render a full two-octave (25-cell) window around the current note so the center marker stays fixed.
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";
    track.innerHTML = renderCellsCompass(next.currentVariantId, next.anchorVariantId, settings);
    if (layers.asked) {
      track.querySelector(`.railCell[data-idx="${CENTER_INDEX}"]`)?.classList.add("target");
    }
    lastCenterPc = centerPc;
    lastCenterLane = centerLane;
    return;
  };

  // Default layers are all visible.
  applyLayerClasses();
  return { el, setConfig, setLayers };
}
