import {
  Action,
  DevSettings,
  Difficulty,
  GameSettings,
  GameState,
  MatchType,
  ModeId,
  Phase,
  PlayType,
  PlayerProfile,
  SlotType,
  VariantId,
} from "../shell/types";
import { reducer } from "../shell/engineReducer";
// NOTE: The canonical note rail UI uses `.noteTile` children inside `#noteStrip-rail`.
// The older `shell/rail` implementation renders a different DOM and is not styled in the current UI.
import { fromVariantId, IS_BLACK, pitchClassAt, pitchMidiAt, toVariantId, variantLabel } from "../shell/music";
import { describePromptProfileId, buildAllowedVariantsFromSettings } from "../shell/promptProfiles";
import { cellCenter, computeLayoutFromSvg, hitTestCell, mapLayoutToNeck, parseSvgNeckBounds, parseSvgViewBox, FretboardLayout } from "../shell/fretboardLayout";
import { computeDidacticLayout } from "../shell/fretboardLayout";
import { attachBoardPointerHandlers } from "../shell/uiAdapter";
import { renderOverlay } from "../shell/fretboardOverlay";
import { attachStaffTabPointerHandlers, createStaffTabOverlayState, parseStaffTabLayout, renderStaffTabOverlay, StaffTabLayout, StaffTabHit } from "../shell/staffTabOverlay";
import { getLeaderboard, recordScore, downloadSnapshot, importSnapshotFromFile } from "../shell/storage";
import { advanceStaffTabTimelineCursor, shiftStaffTabTimelineLeft as shiftTimelineLeft } from "../shell/staffTabTimeline";
import { commitSnapshotsToAccepted } from "../shell/staffTabCommit";
import { isStaffSpellingAccepted } from "../shell/spellingPolicy";
import { upsertTabEntry } from "../shell/tabStack";
import { initCanvasRenderers } from "../render/RendererManager";

type UiRoot = HTMLElement | Document;

// ----------------------------
// Helpers
// ----------------------------

const PLAYER_COUNT_MULTI = 5;

const logUI = (event: string, detail?: any) => {
  try { (window as any).__GEDU_LOG_UI__?.(event, detail); } catch {}
};

const STANDARD_TUNING_MIDI: number[] = [40, 45, 50, 55, 59, 64]; // E2 A2 D3 G3 B3 E4

function resolveTuningMidi(tuning: any): number[] {
  // Supports: "standard" | number[] (midi) | { midi:number[] }
  if (!tuning) return STANDARD_TUNING_MIDI;
  if (tuning === "standard") return STANDARD_TUNING_MIDI;
  if (Array.isArray(tuning) && tuning.every((n) => typeof n === "number")) return tuning as number[];
  if (typeof tuning === "object" && tuning && Array.isArray((tuning as any).midi)) return (tuning as any).midi as number[];
  return STANDARD_TUNING_MIDI;
}

function pitchClassFromStringFret(stringIndex: number, fret: number, tuning: any): number {
  const midi = resolveTuningMidi(tuning);
  const open = midi[stringIndex] ?? midi[0] ?? 40;
  return (open + fret) % 12;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function formatMs(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${pad2(m)}:${pad2(r)}`;
}

// Countdown formatting: avoid showing 00:00 while there is still time left.
function formatCountdownMs(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${pad2(m)}:${pad2(r)}`;
}

function escapeHtml(s: string): string {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function pcFromUiNoteName(name: string): number {
  const n = String(name || "C").trim().toUpperCase();
  const map: Record<string, number> = {
    C: 0,
    "C#": 1,
    DB: 1,
    D: 2,
    "D#": 3,
    EB: 3,
    E: 4,
    F: 5,
    "F#": 6,
    GB: 6,
    G: 7,
    "G#": 8,
    AB: 8,
    A: 9,
    "A#": 10,
    BB: 10,
    B: 11,
  };
  return map[n] ?? 0;
}

function intervalName(semitones: number): string {
  const s = ((semitones % 12) + 12) % 12;
  const names: Record<number, string> = {
    0: "P1",
    1: "m2",
    2: "M2",
    3: "m3",
    4: "M3",
    5: "P4",
    6: "TT",
    7: "P5",
    8: "m6",
    9: "M6",
    10: "m7",
    11: "M7",
  };
  return names[s] ?? `+${s}`;
}

function romanIntervalName(semitones: number): string {
  const s = ((semitones % 12) + 12) % 12;
  const names: Record<number, string> = {
    0: "I",
    1: "♭II",
    2: "II",
    3: "♭III",
    4: "III",
    5: "IV",
    6: "♭V",
    7: "V",
    8: "♭VI",
    9: "VI",
    10: "♭VII",
    11: "VII",
  };
  return names[s] ?? `+${s}`;
}

type TritoneStyle = "plusDim" | "TT" | "sharp4" | "flat5" | "auto";

function inferPreferSharp4(settings: GameSettings): boolean {
  const pid = (settings.promptProfileId ?? "").toLowerCase();
  if (pid.includes("lydian")) return true;
  if (pid.includes("locrian")) return false;
  if (pid.includes(":flats") || pid.includes("b")) return false;
  return true;
}

function intervalRomanName(semitones: number, style: TritoneStyle, preferSharp4: boolean): string {
  const s = ((semitones % 12) + 12) % 12;
  switch (s) {
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
      return preferSharp4 ? "+IV" : "oV";
    }
    case 7: return "V";
    case 8: return "vi";
    case 9: return "VI";
    case 10: return "vii";
    case 11: return "VII";
    default: return `+${s}`;
  }
}

function labelForVariant(vid: VariantId, displayMode: string, rootPc: number, settings: GameSettings): string {
  if (displayMode === "intervals") {
    const pc = fromVariantId(vid).pitchClass;
    return intervalName(pc - rootPc);
  }
  if (displayMode === "romanIntervals") {
    const pc = fromVariantId(vid).pitchClass;
    return romanIntervalName(pc - rootPc);
  }
  if (displayMode === "intervalRoman") {
    const pc = fromVariantId(vid).pitchClass;
    const style = (((settings as any).tritoneStyle ?? "plusDim") as TritoneStyle);
    const preferSharp4 = inferPreferSharp4(settings);
    return intervalRomanName(pc - rootPc, style, preferSharp4);
  }
  return variantLabel(vid);
}

declare global {
  interface Window {
    __GEDU_PLAYER_NAMES__?: string[];
  }
}

function getPlayerNames(count: number): string[] {
  const c = clamp(count, 1, 16);
  const raw = Array.isArray(window.__GEDU_PLAYER_NAMES__) ? window.__GEDU_PLAYER_NAMES__ : [];
  const names: string[] = [];
  for (let i = 0; i < c; i++) {
    const n = (raw[i] ?? "").trim();
    names.push(n.length ? n : `P${i + 1}`);
  }
  return names;
}

function buildPlayers(count: number): PlayerProfile[] {
  const c = clamp(count, 1, 16);
  const names = getPlayerNames(c);
  const out: PlayerProfile[] = [];
  for (let i = 0; i < c; i++) out.push({ id: i, name: names[i] ?? `P${i + 1}`, colorId: i, patternId: i });
  return out;
}

function defaultSettings(): GameSettings {
  return {
    modeId: ModeId.FRETBOARD,
    playType: PlayType.MULTI,
    matchType: MatchType.BLACKOUT,
    difficulty: Difficulty.MEDIUM,
    fixedRoundsTotal: 3,
    // Timers are stored in SECONDS (UI contract). Convert to ms only at runtime for scheduling.
    // Intermission is intentionally long enough to be perceivable (and to show a countdown).
    timers: { turnSec: 15, intermissionSec: 5 },
    mode3SpellingPolicy: "strict",
    domain: { fretCount: 25, minFret: 0, maxFret: 24, enabledStrings: [true, true, true, true, true, true] },
    feedback: {
      samEnabled: true,
      samDurationMs: 900,
      samRevealMode: "single",
      claimLabelMode: "off",
      claimLabelDurationMs: 900,
      samIncludeLabel: true,
    },
    steal: {
      tokenCap: 10,
      globalStealOnExhausted: true,
      enharmonicOppositeStealBonus: 5,
      breakConnectMaxTierBonus: 25,
    },
    accessibility: { colorBlindMode: true },
    dev: { enabled: false, paintEnabled: false, paintPlayerIndex: 0, paintLane: "prompt", paintMode: "paint" },
    notation: { view: "staffTab", pitch: "written" },
    promptProfileId: "chromatic",
  };
}

function modeToPromptProfileId(root: string, mode: string): string {
  const m = String(mode || "chromatic").toLowerCase();
  const r = String(root || "C").trim();
  if (m === "chromatic") return "chromatic";
  if (m === "pentatonic") return `scale:${r}:pentatonic:sharps`;
  if (m === "blues") return `scale:${r}:blues:sharps`;
  if (["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"].includes(m)) {
    return `scale:${r}:${m}:sharps`;
  }
  // Fallback
  return "chromatic";
}

function difficultyFromUi(v: string): Difficulty {
  const s = String(v || "medium").toLowerCase();
  if (s === "learning") return Difficulty.LEARNING;
  if (s === "easy") return Difficulty.EASY;
  if (s === "hard") return Difficulty.HARD;
  return Difficulty.MEDIUM;
}


function enabledStringsFromCsv(csv: string | undefined, stringCount = 6): boolean[] {
  const out = new Array<boolean>(stringCount).fill(true);
  if (!csv) return out;
  // UI stores strings as e.g. "6,5,4,3,2,1" (human labels). Map to indices 0..5.
  const keep = new Set(
    csv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n))
  );
  for (let i = 0; i < stringCount; i++) {
    const label = stringCount - i; // index 0 => "6"
    out[i] = keep.size ? keep.has(label) : true;
  }
  return out;
}



function readEnabledStrings(root: UiRoot): boolean[] {
  const sel = (root as Document).querySelector<HTMLSelectElement>("#pref-strings");
  const enabled = [false, false, false, false, false, false];
  if (!sel) return [true, true, true, true, true, true];
  const values = Array.from(sel.selectedOptions).map((o) => o.value);
  if (values.length === 0) return [true, true, true, true, true, true];

  // UI values are string numbers "1".."6" (1st string = high E). Engine indices are 0..5 (0 = high E).
  for (const v of values) {
    const n = Number(v);
    if (!Number.isFinite(n)) continue;
    const engineIdx = clamp(n, 1, 6) - 1;
    if (engineIdx >= 0 && engineIdx < 6) enabled[engineIdx] = true;
  }
  return enabled;
}

function readInt(root: UiRoot, selector: string, fallback: number): number {
  const el = (root as Document).querySelector<HTMLInputElement>(selector);
  const n = Number(el?.value);
  return Number.isFinite(n) ? n : fallback;
}

function readStr(root: UiRoot, selector: string, fallback: string): string {
  const el = (root as Document).querySelector<HTMLInputElement | HTMLSelectElement>(selector);
  return (el?.value ?? fallback) as string;
}

function readBool(root: UiRoot, selector: string, fallback = false): boolean {
  const el = (root as Document).querySelector<HTMLInputElement>(selector);
  if (!el) return fallback;
  return !!el.checked;
}


// ----------------------------
// Canon Guards (runtime)
// ----------------------------

// Legacy UI "modes" are deprecated and must not affect behavior.
// Until full Surface Controls wiring replaces legacy mode routing,
// we hard-freeze uiMode to "m4" and warn once if a different value is encountered.
let __warnedLegacyUiMode = false;
function enforceNoModes(uiMode: string): string {
  const v = (uiMode ?? "").toLowerCase();
  if (v && v !== "m4") {
    if (!__warnedLegacyUiMode) {
      __warnedLegacyUiMode = true;
      console.warn(
        "[CanonGuard] Deprecated legacy uiMode detected:",
        uiMode,
        "→ forced to 'm4'. See DOCS/DEPRECATED_TERMS.md and DOCS/CANONICAL_LAYERS_DIAGRAM.md."
      );
    }
    return "m4";
  }
  return "m4";
}
function buildSettingsFromUi(root: UiRoot, session: "single" | "multi" | "edu"): GameSettings {
  const d = defaultSettings();
  const ui: any = (window as any).__GEDU_LAST_MATCH_OPTIONS__ ?? null;

  const playType = session === "multi" ? PlayType.MULTI : PlayType.SINGLE;
  const difficulty = difficultyFromUi((ui?.rules?.difficulty ?? readStr(root, "#ops-difficulty", "medium")));
  const uiModeRaw = readStr(root, "#core-gameMode", "m4");
  const uiMode = enforceNoModes(uiModeRaw);
  // Canon: Match Options is the single source of truth for Key + Pitch Framework.
  // Legacy UI controls may exist but must not be required for correctness.
  const uiKey = typeof ui?.context?.key === "string" ? ui.context.key.trim() : "";
  const rootNote = uiKey ? uiKey : readStr(root, "#core-root", "C");
  const uiPitchFramework = typeof ui?.context?.pitchFramework === "string" ? ui.context.pitchFramework.trim() : "";
  const pitchFrameworkCsv = uiPitchFramework ? uiPitchFramework : String(readStr(root, "#core-modes", "chromatic"));
  const pitchFramework = pitchFrameworkCsv
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  // Deterministic selection: prefer an explicit single selection, otherwise fall back to "chromatic".
  const frameworkId = (pitchFramework.length === 1)
    ? pitchFramework[0]
    : (pitchFramework.includes("chromatic") ? "chromatic" : (pitchFramework[0] ?? "chromatic"));
  const promptProfileId = modeToPromptProfileId(rootNote, frameworkId);

  const displayMode = readStr(root, "#core-display", "names");
  const tritoneStyle = readStr(root, "#pref-tritoneStyle", "plusDim");
  const noteVisibilityUi = readStr(root, "#core-noteVisibility", "all");
  const accidentalViewUi = readStr(root, "#core-accidentalView", "both");
  let noteVisibility: "all" | "natural" | "enharmonic" =
    noteVisibilityUi === "all" ? "all" : noteVisibilityUi === "enharmonics" ? "enharmonic" : "natural";
  // Learning difficulty assumes the player knows nothing: allow all spellings by default.
  if (difficulty === Difficulty.LEARNING) noteVisibility = "all";

  // How to render accidentals on the note rail (and other name-based displays).
  // Default is "both" (stack sharp and flat). "auto" can later be used for key/mode recipes.
  const accidentalView = (difficulty === Difficulty.LEARNING ? "both" : accidentalViewUi) as any;

  // Notation preferences (UI only). Default mirrors printed guitar notation.
  const notationView = "staffTab" as const;
  const notationPitch = readStr(root, "#pref-notationPitch", "written") as any;

  // Staff spelling policy (when STAFF is required).
  // Policy is a rule-level setting and must not live in Preferences.
  // Default is strict.
  const mode3SpellingPolicyUi = "strict";

  // Surface layer visibility toggles are deprecated and removed from Preferences.
  // Layers remain enabled by default (legacy compatibility).
  const layerView = true;
  const layerAsked = true;
  const layerAnswered = true;

  const samModeUi = readStr(root, "#core-sam", "single");
  const samRevealMode = samModeUi === "multiple" ? "all" : "single";

  let viewFrets = clamp(readInt(root, "#pref-fretView", 12), 1, 24);

  // If Match Options (single source of truth) is available, prefer its domain ranges.
  // This keeps UI -> engine mapping deterministic even if individual DOM ids evolve.
  const uiFretMin = (typeof ui?.domain?.fretMin === "number") ? ui.domain.fretMin : null;
  const uiFretMax = (typeof ui?.domain?.fretMax === "number") ? ui.domain.fretMax : null;
  if (uiFretMax !== null) {
    viewFrets = clamp(uiFretMax, 1, 24);
  }

  // Fret count represents playable columns including open string (fret 0).
  const fretCount = viewFrets + 1;

  // Canon: fret min defaults to 0 (open string).
  const minFretRaw = clamp(readInt(root, "#pref-fretMin", 0), 0, viewFrets);
  const maxFretRaw = clamp(readInt(root, "#pref-fretMax", 12), minFretRaw, viewFrets);

  const minFret = (uiFretMin !== null) ? clamp(uiFretMin, 0, viewFrets) : minFretRaw;
  const maxFret = (uiFretMax !== null) ? clamp(uiFretMax, minFret, viewFrets) : maxFretRaw;

  const enabledStrings = (typeof ui?.domain?.strings === "string")
    ? enabledStringsFromCsv(ui.domain.strings, 6)
    : readEnabledStrings(root);

  // Token / Dev settings (Main Menu Settings)
  const tokenCap = clamp(readInt(root, "#core-tokenCap", 10), 0, 20);
  const startTokens = clamp(readInt(root, "#core-startTokens", 0), 0, tokenCap);
  const devEnabled = readBool(root, "#core-devMode", false);

  // Dev/Test pane settings (only takes effect when dev is enabled)
  const devPaintEnabled = readBool(root, "#dev-paintEnabled", false);
  const devPaintPlayerIndex = clamp(Number(readStr(root, "#dev-paintPlayer", "0")), 0, 4);
  const devPaintLane = readStr(root, "#dev-paintLane", "prompt") as any;
  const devPaintMode = readStr(root, "#dev-paintMode", "paint") as any;

  const s: GameSettings = {
    ...d,
    modeId: ModeId.FRETBOARD,
    playType,
    matchType: MatchType.BLACKOUT,
    difficulty,
    promptProfileId,
    domain: { ...d.domain, fretCount, minFret, maxFret, enabledStrings },
    feedback: { ...d.feedback, samRevealMode },
    steal: { ...d.steal, tokenCap },
    dev: {
      ...d.dev,
      enabled: devEnabled,
      paintEnabled: devPaintEnabled,
      paintPlayerIndex: devPaintPlayerIndex,
      paintLane: devPaintLane,
      paintMode: devPaintMode,
    },
    notation: {
      // UI can provide a narrowed type; normalize via String() to avoid unintentional comparisons.
      view: ((String(notationView) === "staff" || String(notationView) === "tab") ? (String(notationView) as any) : "staffTab"),
      pitch: (notationPitch === "concert" ? "concert" : "written"),
    },
  };

  // Optional policy used by some modes; keep out of the typed settings to avoid churn.
  (s as any).mode3SpellingPolicy = (String(mode3SpellingPolicyUi) === "enharmonic" ? "enharmonic" : "strict");

  // Non-typed extensions used by promptProfiles (kept compatible with the shell version).
  (s as any).noteVisibility = noteVisibility;
  (s as any).accidentalView = accidentalView;
  (s as any).displayMode = displayMode;
  (s as any).tritoneStyle = tritoneStyle;
  (s as any).rootNote = rootNote;
  (s as any).uiMode = uiMode;
  (s as any).startTokens = startTokens;
  // CANON: "Surface Controls" replaces deprecated "surfaceLayers".
  // Do not emit deprecated fields in Match Options.

  // Canon bridge: apply Surface Controls (v1.1) to engine-visible settings without adding new gameplay logic.
  if (ui?.surfaceControlsV11?.surfaces) {
    (s as any).surfaceControlsV11 = ui.surfaceControlsV11;
    const sc = ui.surfaceControlsV11.surfaces;
    const staffOn = !!(sc.staff?.prompt?.enabled || sc.staff?.mark?.enabled || sc.staff?.persistence?.enabled || sc.staff?.sam?.enabled);
    const tabOn = !!(sc.tab?.prompt?.enabled || sc.tab?.mark?.enabled || sc.tab?.persistence?.enabled || sc.tab?.sam?.enabled);
    if (staffOn && tabOn) (s as any).notation.view = "staffTab";
    else if (staffOn) (s as any).notation.view = "staff";
    else if (tabOn) (s as any).notation.view = "tab";
    // SAM policy is derived from any enabled surface SAM. RevealMode values are: single|equivalent|all.
    const samMode = (sc.fretboard?.sam?.enabled && sc.fretboard?.sam?.revealMode) ? sc.fretboard.sam.revealMode
      : (sc.staff?.sam?.enabled && sc.staff?.sam?.revealMode) ? sc.staff.sam.revealMode
      : (sc.tab?.sam?.enabled && sc.tab?.sam?.revealMode) ? sc.tab.sam.revealMode
      : (sc.noteRail?.sam?.enabled && sc.noteRail?.sam?.revealMode) ? sc.noteRail.sam.revealMode
      : "single";
    const samEnabled = !!(sc.fretboard?.sam?.enabled || sc.staff?.sam?.enabled || sc.tab?.sam?.enabled || sc.noteRail?.sam?.enabled);
    (s as any).feedback.samEnabled = samEnabled;
    (s as any).feedback.samRevealMode = samMode;
  }

  // Match Options timer policy.
  // Canon: when timer is "off" we disable auto-timeouts.
  const timerPolicy = String(ui?.rules?.timer ?? "");
  if (timerPolicy === "off") {
    // Retain numeric fields but set to 0 so controller logic can gate off timers.
    s.timers = { ...s.timers, turnSec: 0, intermissionSec: 0 };
  }

  // Canon bridge: Timers v1.1 (if present) override legacy timer policy.
  // This keeps the UI contract forward-compatible while allowing the engine
  // to continue using the simple timers.turnSec + intermissionSec fields.
  if (ui?.timersV11) {
    try {
      (s as any).timersV11 = ui.timersV11;
      const turnEnabled = !!ui.timersV11?.turnTimer?.enabled;
      const turnSec = clamp(Number(ui.timersV11?.turnTimer?.seconds ?? 0), 0, 600);
      const interEnabled = !!ui.timersV11?.intermission?.enabled;
      const interSec = clamp(Number(ui.timersV11?.intermission?.seconds ?? 0), 0, 600);
      s.timers = {
        ...s.timers,
        turnSec: turnEnabled ? turnSec : 0,
        intermissionSec: interEnabled ? interSec : 0,
      };
    } catch {
      // Ignore malformed timers payload; legacy policy remains.
    }
  }

  // Final sanitation pass: remove deprecated keys that must not reach the engine.
  stripDeprecatedSettingsKeys(s);
  return s;
}

function stripDeprecatedSettingsKeys(settings: any) {
  if (!settings || typeof settings !== "object") return;

  // Deprecated: Surface Layers (replaced by Surface Controls).
  if ("surfaceLayers" in settings) delete settings.surfaceLayers;
  if ("surfaceLayer" in settings) delete settings.surfaceLayer;

  // Defensive: remove any legacy surfaces payload that may leak through.
  if ("surfaces" in settings) delete settings.surfaces;

  // Defensive: remove deprecated terminology keys if they appear.
  // (We keep displayMode because it is an established engine key; only purge
  // ambiguous naked 'display' keys.)
  if ("display" in settings) delete settings.display;
}

// ----------------------------
// Controller
// ----------------------------

export function initGameController(root: UiRoot): void {
// DEV-STABILITY: prevent duplicate controller install (double listeners / double dispatch)
const __w = window as any;
if (__w.__GEDU_CONTROLLER_INSTALLED__) {
  console.warn("[GEDU] Controller install suppressed: already installed");
  return;
}
__w.__GEDU_CONTROLLER_INSTALLED__ = true;


const w = window as any;
if (w.__GEDU_GAME_CONTROLLER_INSTALLED__) return;
w.__GEDU_GAME_CONTROLLER_INSTALLED__ = true;

  const doc = root as Document;

  // Canvas2D primary renderers (SVG prototype assets may fail to load; visuals must not depend on SVG).
  // This does not change gameplay logic; it restores deterministic visual surfaces for testing.
  const renderers = (() => {
    try { return initCanvasRenderers(doc); } catch { return null; }
  })();

  // Visual stability: when Canvas2D renderers are available, the SVG background hosts must not
  // remain visible (they cause "double board" visuals). Pointer interaction remains on overlays.
  if (renderers) {
    const staffBgHost = doc.querySelector<HTMLElement>("#staffBgHost");
    if (staffBgHost) staffBgHost.style.display = "none";
    const fretBgHost = doc.querySelector<HTMLElement>("#fretBgHost");
    if (fretBgHost) fretBgHost.style.display = "none";
  }


  // CanonGuard: legacy uiMode selector is deprecated (no “modes”). Freeze and disable.
  const legacyModeSelect = doc.querySelector<HTMLSelectElement>("#core-gameMode");
  if (legacyModeSelect) {
    try {
      legacyModeSelect.value = "m4";
      legacyModeSelect.disabled = true;
      legacyModeSelect.setAttribute("data-deprecated", "true");
      legacyModeSelect.title = "Deprecated: legacy UI mode selector is disabled. Canon uses Learning Type + Surface Controls.";
    } catch { /* ignore */ }
  }

  const splash = doc.querySelector<HTMLElement>("#splash");
  const matchStartOverlay = doc.querySelector<HTMLElement>("#matchStartOverlay");
  const matchStartHint = doc.querySelector<HTMLElement>("#matchStart-hint");
  const matchStartEngage = doc.querySelector<HTMLButtonElement>("#matchStart-engage");
  const intermissionOverlay = doc.querySelector<HTMLElement>("#intermissionOverlay");
  const intermissionNext = doc.querySelector<HTMLElement>("#intermission-next");
  const accidentalOverlay = doc.querySelector<HTMLElement>("#accidentalOverlay");
  const accidentalNatural = doc.querySelector<HTMLButtonElement>("#accidental-natural");
  const accidentalSharp = doc.querySelector<HTMLButtonElement>("#accidental-sharp");
  const accidentalFlat = doc.querySelector<HTMLButtonElement>("#accidental-flat");
  const accidentalCancel = doc.querySelector<HTMLButtonElement>("#accidental-cancel");
  const intermissionTimer = doc.querySelector<HTMLElement>("#intermission-timer");
  const intermissionStart = doc.querySelector<HTMLButtonElement>("#intermission-start");
  const promptText = doc.querySelector<HTMLElement>("#promptText");
  const alertsText = doc.querySelector<HTMLElement>("#alerts-text");

  const activeName = doc.querySelector<HTMLElement>("#activePlayer-name");
  const activeScore = doc.querySelector<HTMLElement>("#activePlayer-score");
  const activeMult = doc.querySelector<HTMLElement>("#activePlayer-mult");
  const activeTarget = doc.querySelector<HTMLElement>("#activePlayer-target");
  const activeTimer = doc.querySelector<HTMLElement>("#activePlayer-timer");
  const activeTokens = doc.querySelector<HTMLElement>("#activePlayer-tokens");
  const leaderboard = doc.querySelector<HTMLElement>("#leaderboard");
  const highscores = doc.querySelector<HTMLElement>("#highscores");

  // Contextual task summary (left panel, below operation controls)
  const ctxLearningTarget = doc.querySelector<HTMLElement>("#ctx-learningTarget");
  const ctxPitchFramework = doc.querySelector<HTMLElement>("#ctx-pitchFramework");
  const ctxKey = doc.querySelector<HTMLElement>("#ctx-key");
  const ctxPrompt = doc.querySelector<HTMLElement>("#ctx-prompt");
  const ctxRequiredSurfaces = doc.querySelector<HTMLElement>("#ctx-requiredSurfaces");

  const devTab = doc.querySelector<HTMLElement>("#misc-dev-tab");
  const devPane = doc.querySelector<HTMLElement>("#misc-dev-pane");

  const fretStage = doc.querySelector<HTMLElement>("#fretStage");
  const fretBgHost = doc.querySelector<HTMLElement>("#fretBgHost");
  const fretOverlaySvg = doc.querySelector<SVGSVGElement>("#fretOverlaySvg");
  const staffBgHost = doc.querySelector<HTMLElement>("#staffBgHost");
  const staffOverlaySvg = doc.querySelector<SVGSVGElement>("#staffOverlaySvg");
  const noteStripRail = doc.querySelector<HTMLElement>("#noteStrip-rail");

  if (!fretStage || !fretBgHost || !fretOverlaySvg) throw new Error("Fretboard surface not found");
  const fretStageEl: HTMLElement = fretStage;
  const fretBgHostEl: HTMLElement = fretBgHost;
  const fretOverlaySvgEl: SVGSVGElement = fretOverlaySvg;
  const staffBgHostEl: HTMLElement | null = staffBgHost;
  const staffOverlaySvgEl: SVGSVGElement | null = staffOverlaySvg;

  // Note rail (canonical `.noteTile` renderer)
  const NOTE_NAMES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
  const askedPcs = new Set<number>();
  let lastPromptPc: number | null = null;

  const pcToName = (pc: number): string => NOTE_NAMES[((pc % 12) + 12) % 12] ?? "C";

  const readNoteVisibility = (s: GameSettings): "naturals" | "enharmonics" => {
    // Current UI uses this value in a few places. Fall back to enharmonics.
    const raw = ((s as any).noteVisibility ?? (s.domain as any)?.noteVisibility ?? "enharmonics").toString().toLowerCase();
    return raw === "naturals" ? "naturals" : "enharmonics";
  };

  const renderNoteStrip = (centerVid: VariantId, s: GameSettings) => {
  if (!noteStripRail) return;

  // Allowed pitch classes for the current prompt profile (used for exhaustion visuals).
  const allowed = buildAllowedVariantsFromSettings(s);
  const allowedPcs = new Set<number>();
  for (let vid = 0; vid < allowed.length; vid++) {
    if (!allowed[vid]) continue;
    allowedPcs.add(Math.floor(vid / 3));
  }

  const exhausted = allowedPcs.size > 0 && askedPcs.size >= allowedPcs.size;
  noteStripRail.classList.toggle("railExhausted", exhausted);

  noteStripRail.innerHTML = "";
  const rootPc = pcFromUiNoteName((s as any).rootNote ?? "C");
  const displayMode = ((s as any).displayMode ?? "names") as "names" | "intervals" | "romanIntervals";
  const noteVisibility = readNoteVisibility(s);

  const v = fromVariantId(centerVid);
  const centerPc = v.pitchClass;

  // CANON: Note rail is always visible. Highlighting is gated by Surface Controls.
  const sc = (s as any).surfaceControlsV11?.surfaces ?? null;
  const showAsked = sc?.noteRail?.prompt?.enabled !== false;

  for (let i = -12; i <= 12; i++) {
    const pc = (centerPc + i + 1200) % 12;
    const name = pcToName(pc);
    const isAcc = name.includes("#");
    const disableAcc = noteVisibility === "naturals" && isAcc;

    const tile = document.createElement("div");
    const isPrompt = i === 0;

    tile.className =
      `noteTile${isPrompt ? " active" : ""}` +
      `${disableAcc ? " disabled" : ""}` +
      `${showAsked && isPrompt ? " prompt" : ""}` +
      `${showAsked && askedPcs.has(pc) ? " asked" : ""}`;

    tile.dataset.note = name;
    tile.dataset.pc = String(pc);

    if (disableAcc) {
      tile.dataset.disabled = "1";
      tile.textContent = "";
    } else {
      // Render using the existing label helper (keeps Interval Roman display intact)
      const vid = toVariantId(pc as any, isAcc ? SlotType.SHR : SlotType.NAT);
      tile.dataset.vid = String(vid);
      tile.textContent = labelForVariant(vid, displayMode, rootPc, s);
    }
    noteStripRail.appendChild(tile);
  }
}
;

  let session: "single" | "multi" | "edu" = "single";

  // Initial render (pre-match): center on C.
  renderNoteStrip(toVariantId(pcFromUiNoteName("C") as any, SlotType.NAT), buildSettingsFromUi(doc, session));

  // Task context: mirror the Match Options selection + current prompt.
  let lastMatchOptions: any | null = null;
  const learningTargetLabel = (k: string): string => {
    switch ((k || "").toLowerCase()) {
      case "single": return "Single Note";
      case "interval": return "Intervals";
      case "chord": return "Chords";
      case "scale": return "Scales";
      case "arpeggio": return "Arpeggios";
      default: return "—";
    }
  };

  const pitchFrameworkLabel = (mo: any): string => {
    const set = mo?.context?.pitchFramework;
    if (!set || typeof set !== "object") return "—";
    const order = [
      "chromatic",
      "ionian",
      "dorian",
      "phrygian",
      "lydian",
      "mixolydian",
      "aeolian",
      "locrian",
      "pentatonic",
      "blues",
    ];
    const picked = order.filter((k) => !!set[k]).map((k) => k[0]!.toUpperCase() + k.slice(1));
    return picked.length ? picked.join(", ") : "—";
  };

  const updateTaskContext = () => {
  const mo = lastMatchOptions;

  // Learning Target: based on input method (singleNote/chords/scales/etc.). Fall back gracefully.
  if (ctxLearningTarget) {
    const im = (mo as any)?.inputMethod ?? "singleNote";
    const label = im === "singleNote" ? "Single Note" : String(im);
    ctxLearningTarget.textContent = label;
  }

  if (ctxPitchFramework) ctxPitchFramework.textContent = pitchFrameworkLabel(mo);
  if (ctxKey) ctxKey.textContent = mo?.context?.key ?? "—";

  // Required Inputs: derived from engine mode (more authoritative during a live match).
  if (ctxRequiredSurfaces) {
    if (!state) {
      ctxRequiredSurfaces.textContent = "Not in match";
    } else {
      const modeId = (state.settings as any).modeId;
      const view = (state.settings as any)?.notation?.view ?? "staffTab";
      const req: string[] = [];

      // Base by modeId
      if (modeId === "mode1_fretboard") req.push("Fretboard");
      if (modeId === "mode2_staff") req.push("Staff");
      if (modeId === "mode3_tab") req.push("Tab");
      if (modeId === "mode4_combined") {
        req.push("Fretboard");
        if (String(view).includes("staff")) req.push("Staff");
        if (String(view).includes("tab")) req.push("Tab");
      }
      // If somehow empty, fall back to match options surface toggles (Prompt/Mark/Display).
      if (!req.length) {
        const s = (mo as any)?.surfaces ?? {};
        const active: string[] = [];
        const add = (name: string, key: string) => {
          const v = s?.[key];
          if (!v) return;
          if (v.prompt || v.mark || v.display) active.push(name);
        };
        add("Fretboard", "fretboard");
        add("Staff", "staff");
        add("Tab", "tab");
        add("Note Rail", "noteRail");
        if (active.length) req.push(...active);
      }
      ctxRequiredSurfaces.textContent = req.filter(Boolean).join(", ") || "—";
    }
  }

  // Prompt (authoritative from engine prompt state)
  if (ctxPrompt) {
    if (state) {
      const displayMode = (state.settings as any).displayMode ?? "names";
      const rootPc = pcFromUiNoteName((state.settings as any).rootNote ?? "C");
      const label = labelForVariant(state.prompt.variantId, displayMode, rootPc, state.settings);
      ctxPrompt.textContent = `${describePromptProfileId(state.settings.promptProfileId)} | ${label}`;
    } else {
      ctxPrompt.textContent = "Not in match";
    }
  }
};

  // Note rail clicks dispatch the canonical selection event.
  if (noteStripRail) {
    noteStripRail.addEventListener("click", (ev) => {
      const t = ev.target as HTMLElement | null;
      const tile = t?.closest?.(".noteTile") as HTMLElement | null;
      if (!tile) return;
      if (tile.classList.contains("disabled") || tile.dataset.disabled === "1") return;
      const vidStr = tile.dataset.vid;
      if (!vidStr) return;
      const vid = Number(vidStr);
      if (!Number.isFinite(vid)) return;
      window.dispatchEvent(new CustomEvent("gedu:railSelect", { detail: { variantId: vid } }));
    });
  }


  // Staff accidental preference (UI aid).
  // "prompt" asks on every staff click; otherwise stamps the selected accidental.
  type StaffAccPref = "prompt" | "natural" | "sharp" | "flat";
  const readAccPref = (): StaffAccPref => {
    const raw = (localStorage.getItem("gedu.staffAccPref") || "prompt").toLowerCase();
    if (raw === "natural" || raw === "sharp" || raw === "flat" || raw === "prompt") return raw as StaffAccPref;
    return "prompt";
  };
  let staffAccPref: StaffAccPref = readAccPref();
  let pendingAccidentalPick: { col: number; yIndex: number } | null = null;

  // Match gating: the contract requires a Ready/Engage overlay so Turn 1 does not begin automatically.
  let matchEngaged = false;

  // Education mode (instructor) state
  let eduTool: "input" | "erase" = "input";
  // VariantId convention in this codebase: 0=C natural, 1=C# ...; spelling is derived.
  let eduSelectedVariantId: number = 0;
  const eduFretMarks = new Map<number, number>(); // cellIndex -> variantId
  let eduShowStaff = true;
  let eduShowTab = true;
  let eduShowFret = true;
  let eduFretHandlersInstalled = false;
  let settings: GameSettings = buildSettingsFromUi(doc, session);
  const getMultiPlayerCount = () => {
    const n = Number((window as any).__GEDU_PLAYER_COUNT__ ?? PLAYER_COUNT_MULTI);
    return clamp(Number.isFinite(n) ? n : PLAYER_COUNT_MULTI, 2, 8);
  };

  let players: PlayerProfile[] = buildPlayers(session === "single" ? 1 : getMultiPlayerCount());
  let state: GameState | null = null;

let lastMatchOptionsHash = "";
let lastMatchOptionsAt = 0;
let enterUiInFlight = false;
let lastEnterUiAt = 0;
let matchActive = false;


  // Internal interaction freeze (not a user pause feature). Used for Ready/Engage gating and safe transitions.
  let frozen = false;
  let turnEndsAt = 0;
  let timerHandle: number | null = null;
  let intermissionHandle: number | null = null;
  let intermissionTickHandle: number | null = null;
  let intermissionEndsAt = 0;
  let samHandle: number | null = null;
  let devClickTimer: number | null = null;

  function stopAllTimers() {
    if (timerHandle != null) { try { window.clearInterval(timerHandle); } catch {} timerHandle = null; }
    if (intermissionTickHandle != null) { try { window.clearInterval(intermissionTickHandle); } catch {} intermissionTickHandle = null; }
    if (intermissionHandle != null) { try { window.clearTimeout(intermissionHandle); } catch {} intermissionHandle = null; }
    if (samHandle != null) { try { window.clearTimeout(samHandle); } catch {} samHandle = null; }
        if (devClickTimer != null) { try { window.clearTimeout(devClickTimer); } catch {} devClickTimer = null; }
  }

  // Match timing (used for persistent high score entries)
  let matchStartedAtMs = 0;
  let matchRecorded = false;
  // TAB input state (instant): select string + fret (either order), claim immediately.
  let tabSelectedString: number | null = null;
  let tabSelectedFret: number | null = null;

  let tabSelectedCol: number | null = null;

  // Composite answer progress (controller-owned; cleared on prompt/turn changes)
  let pendingStaffPick: { col: number; yIndex: number; accidental: "natural" | "sharp" | "flat" | null } | null = null;
  let pendingTabPick: { col: number; stringIndex: number; fret: number; action: "TAP_CELL" | "STEAL_CELL" } | null = null;
  let pendingFretPick:
    | { action: "TAP_CELL" | "STEAL_CELL"; stringIndex: number; fretIndex: number }
    | null = null;

  // When multiple Answer surfaces are enabled (e.g., TAB + FRET), we submit using
  // the most recently updated answer surface. This avoids stale submissions and
  // matches user intent ("the thing I just entered is what should submit").
  let lastAnswerSurface: "tab" | "fret" | null = null;


  let fretLayout: FretboardLayout | null = null;
  // Didactic fretboard layout tracking (Canvas2D is authoritative for visuals).
  let __didFretW = 0;
  let __didFretH = 0;
  let __didFretCount = 0;
  let staffLayout: StaffTabLayout | null = null;
  const staffOverlayState = createStaffTabOverlayState();
  let activePulse: {
    playerId: number;
    variantId: number;
    durationMs: number;
    ghost: any | null;
    ghosts?: any[];
    scoreDelta: number;
    includeLabel?: boolean;
  } | null = null;
  let pulseHandle: number | null = null;

  function setAlert(msg: string | null): void {
    if (!alertsText) return;
    const phase = state?.phase ?? "TITLE";
    alertsText.textContent = `${phase}: ${msg ?? ""}`;
  }

  function clearTimers(): void {
    if (timerHandle !== null) window.clearInterval(timerHandle);
    if (intermissionHandle !== null) window.clearTimeout(intermissionHandle);
    if (intermissionTickHandle !== null) window.clearInterval(intermissionTickHandle);
    if (samHandle !== null) window.clearTimeout(samHandle);
    timerHandle = null;
    intermissionHandle = null;
    intermissionTickHandle = null;
    intermissionEndsAt = 0;
    samHandle = null;
  }

  function stopTurnTimer(): void {
    if (timerHandle !== null) window.clearInterval(timerHandle);
    timerHandle = null;
    turnEndsAt = 0;
    if (activeTimer) activeTimer.textContent = "00:00";
  }

  function startStopwatch(): void {
    stopTurnTimer();
    // Stopwatch is used for single-player time-to-complete.
    timerHandle = window.setInterval(() => {
      if (frozen) return;
      // Canon C5: do not tick clocks during RESULTS.
      if (state && state.phase === "RESULTS") return;
      if (checkRuntimeCap()) return;
      if (activeTimer) activeTimer.textContent = formatMs(currentMatchDurationMs());
    }, 100);
  }

  function startTurnTimer(): void {
    stopTurnTimer();
    if (!state) return;

    const matrix = getSurfaceMatrix();
    if (!matrix.staff.input) {
      setAlert("STAFF input is disabled in this mode");
      return;
    }
    applyUiModeVisibility();

      // Ensure primary Canvas2D surfaces repaint deterministically as UI becomes visible.
      renderers?.fretboard?.draw();
      renderers?.staffTab?.draw();
    const clockMode = getClockMode();

    // Clock mode "off": no visible timer and no auto-timeouts.
    if (clockMode === "off") {
      if (activeTimer) activeTimer.textContent = "";
      return;
    }

    // Clock mode "checkClock": stopwatch only (time-to-complete / elapsed time).
    // Applies to both single and multi when explicitly selected.
    if (clockMode === "checkClock") {
      startStopwatch();
      return;
    }

    // Clock mode "turn": countdown per turn if enabled.
    const ms = Math.max(0, Number(state.settings.timers.turnSec ?? 0)) * 1000;

    // Timer disabled ("off"). In this case turns advance by gameplay events,
    // not by an automatic timeout.
    if (ms <= 0) {
      if (activeTimer) activeTimer.textContent = "";
      return;
    }

    turnEndsAt = Date.now() + ms;
    if (activeTimer) activeTimer.textContent = formatCountdownMs(ms);
    timerHandle = window.setInterval(() => {
      if (!state || frozen) return;
      // Canon C5: countdown only runs during active turn phases.
      if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") return;
      if (checkRuntimeCap()) return;
      const left = turnEndsAt - Date.now();
      if (activeTimer) activeTimer.textContent = formatCountdownMs(left);
      if (left <= 0) {
        stopTurnTimer();
        dispatch({ type: "TIMEOUT" } as Action);
      }
    }, 100);
  }

  function hideIntermissionOverlay(): void {
    if (intermissionOverlay) intermissionOverlay.classList.remove("show");
    if (intermissionTickHandle !== null) window.clearInterval(intermissionTickHandle);
    intermissionTickHandle = null;
    intermissionEndsAt = 0;
  }

  function showIntermissionOverlay(nextPlayerId?: number): void {
    if (!state) return;
    if (state.settings.playType !== PlayType.MULTI) return;
    if (state.phase !== "INTERMISSION") return;

    const nextId = nextPlayerId ?? state.players[state.currentPlayer]?.profile.id ?? 0;
    const nextProfile = state.players.find((p) => p.profile.id === nextId)?.profile;
    const name = nextProfile?.name ?? `P${Number(nextId) + 1}`;

    if (intermissionNext) intermissionNext.textContent = `Next: ${name}`;

    const ms = Math.max(0, Number(state.settings.timers.intermissionSec ?? 0)) * 1000;
    intermissionEndsAt = Date.now() + ms;
    if (intermissionTimer) intermissionTimer.textContent = formatCountdownMs(ms);

    if (intermissionOverlay) intermissionOverlay.classList.add("show");

    if (intermissionTickHandle !== null) window.clearInterval(intermissionTickHandle);
    intermissionTickHandle = window.setInterval(() => {
      if (!state || frozen) return;
      const left = Math.max(0, intermissionEndsAt - Date.now());
      if (intermissionTimer) intermissionTimer.textContent = formatCountdownMs(left);
      if (left <= 0) {
        // The START_TURN dispatch is driven by intermissionHandle; this just keeps UI tidy.
        if (intermissionTickHandle !== null) window.clearInterval(intermissionTickHandle);
        intermissionTickHandle = null;
      }
    }, 100);
  }

  function startTurnEarly(reason: "tap" | "button" | "auto" = "tap"): void {
    if (!state) return;
    if (frozen) return;
    if (state.phase !== "INTERMISSION") return;
    if (state.settings.playType !== PlayType.MULTI) return;

    if (intermissionHandle !== null) window.clearTimeout(intermissionHandle);
    intermissionHandle = null;
    hideIntermissionOverlay();
    setAlert(reason === "auto" ? "Starting turn" : "Starting early");
    dispatch({ type: "START_TURN" } as Action);
  }

  function hideMatchStartOverlay(): void {
    if (matchStartOverlay) matchStartOverlay.classList.remove("show");
  }

  function showMatchStartOverlay(sess: "single" | "multi"): void {
    // Freeze interaction until the user explicitly engages.
    frozen = true;
    matchEngaged = false;

    if (matchStartHint) {
      matchStartHint.textContent = sess === "single"
        ? "Tap anywhere to engage (timer starts on engage)"
        : "Tap anywhere to engage (Turn 1 starts on engage)";
    }
    if (matchStartOverlay) matchStartOverlay.classList.add("show");
  }

  function engageMatch(reason: "tap" | "button" | "opsStart" = "tap"): void {
    if (!state) return;
    if (session === "edu") return;
    if (matchEngaged) return;

    hideMatchStartOverlay();
    frozen = false;
    matchEngaged = true;
    matchStartedAtMs = Date.now();

    setAlert(reason === "opsStart" ? "Engaged" : "Engaged");
    // Start timers / flow.
    if (state.settings.playType === PlayType.MULTI) {
      dispatch({ type: "START_TURN" } as Action);
    } else {
      // Single-player must also start Turn 1 on engage so a prompt is generated.
      dispatch({ type: "START_TURN" } as Action);
    }
    // Start the visible timer for both single and multi.
    startTurnTimer();
    renderAll();
  }

  function hideSplash(): void {
    splash?.classList.remove("show");
  }

  function showSplash(): void {
    splash?.classList.add("show");
  }

  function currentMatchDurationMs(): number {
    if (!matchStartedAtMs) return 0;
    return Math.max(0, Date.now() - matchStartedAtMs);
  }

  function getClockMode(): "off" | "checkClock" | "turn" {
    const cm = String((state as any)?.settings?.timersV11?.clockMode ?? "");
    if (cm === "off" || cm === "checkClock" || cm === "turn") return cm;
    // Defaults: single = stopwatch, multi = turn.
    return (state?.settings?.playType === PlayType.MULTI) ? "turn" : "checkClock";
  }

  function getRuntimeCapMs(): number {
    const t = (state as any)?.settings?.timersV11?.runtimeCap;
    const enabled = !!t?.enabled;
    const sec = Number(t?.seconds ?? 0);
    if (!enabled || !Number.isFinite(sec) || sec <= 0) return 0;
    return Math.min(Math.max(0, sec), 86400) * 1000;
  }

  function checkRuntimeCap(): boolean {
    const cap = getRuntimeCapMs();
    if (cap <= 0) return false;
    const dur = currentMatchDurationMs();
    if (dur >= cap) {
      setAlert("Runtime cap reached");
      endMatch();
      return true;
    }
    return false;
  }

  function syncDevTabVisibility(isDevEnabled?: boolean): void {
    const enabled =
      isDevEnabled ?? ((doc.querySelector<HTMLInputElement>("#core-devMode")?.checked ?? false) === true);
    if (devTab) devTab.classList.toggle("devHidden", !enabled);
    if (devPane) devPane.classList.toggle("devHidden", !enabled);

    // If dev is disabled and the dev pane is currently active, bounce back to Achievements.
    if (!enabled) {
      const miscTabs = doc.querySelector<HTMLElement>("[data-tabs=\"miscinfo\"]");
      const activeTab = miscTabs?.querySelector<HTMLElement>(".tab.active");
      if (activeTab && activeTab.getAttribute("data-tab") === "dev") {
        miscTabs?.querySelector<HTMLElement>(".tab[data-tab=\"ach\"]")?.click();
      }
    }
  }

  function updateHighScoresUi(useSettings?: GameSettings): void {
    if (!highscores) return;
    const s = useSettings ?? state?.settings ?? settings;
    const entries = getLeaderboard(s).slice(0, 10);
    if (entries.length === 0) {
      highscores.innerHTML = `<div class="hint">No saved scores yet. Finish a match to populate this list.</div>`;
      return;
    }
    highscores.innerHTML = entries
      .map((e) => {
        const when = new Date(e.atIso).toLocaleDateString();
        const dur = e.durationMs ? ` • ${formatMs(e.durationMs)}` : "";
        return `<div class="leader-row"><div class="leader-name">${escapeHtml(e.name)}</div><div class="leader-score">${e.score}</div><div class="leader-meta">${when}${dur}</div></div>`;
      })
      .join("");
  }

  function recordScoresIfNeeded(): void {
    if (!state) return;
    if (matchRecorded) return;
    matchRecorded = true;
    const dur = currentMatchDurationMs();
    for (const p of state.players) {
      recordScore(state.settings, p.profile.name, p.score, dur);
    }
    updateHighScoresUi(state.settings);
  }

  const SVG_ENTITY_MAP: Record<string, string> = {
    ns_extend: "http://ns.adobe.com/Extensibility/1.0/",
    ns_ai: "http://ns.adobe.com/AdobeIllustrator/10.0/",
    ns_graphs: "http://ns.adobe.com/Graphs/1.0/",
    ns_vars: "http://ns.adobe.com/Variables/1.0/",
    ns_imrep: "http://ns.adobe.com/ImageReplacement/1.0/",
    ns_sfw: "http://ns.adobe.com/SaveForWeb/1.0/",
    ns_custom: "http://ns.adobe.com/GenericCustomNamespace/1.0/",
    ns_adobe_xpath: "http://ns.adobe.com/XPath/1.0/",
  };

  const ASSET_BASE = (import.meta as any).env?.BASE_URL ?? "/";
  function assetUrl(path: string): string {
    // Support file:// runs (window.location.origin === "null") by returning a relative path.
    const clean = path.startsWith("/") ? path.slice(1) : path;
    const origin = window.location.origin;
    if (!origin || origin === "null" || window.location.protocol === "file:") return clean;
    return new URL(clean, origin + ASSET_BASE).toString();
  }

  // Staff/TAB hit-grid resolution.
  // 16 columns per measure = 16th-note grid in 4/4.
  // When we add smaller rhythmic divisions (32nds, tuplets, swing, etc.),
  // we can increase this (e.g., 32, 48, 64...) or move to a tick-based grid.
  // Default notation grid: 4/4 recorded in 8th-note slots.
  const DEFAULT_STAFF_COLUMNS_PER_MEASURE = 8;

  function sanitizeSvgText(raw: string): string {
    let t = raw;

    // Replace Illustrator entity references (browsers do not evaluate SVG DTD entities when injecting via innerHTML).
    for (const [k, v] of Object.entries(SVG_ENTITY_MAP)) {
      t = t.replaceAll("&" + k + ";", v);
    }

    // Remove XML declaration and DOCTYPE (including internal subsets).
    t = t.replace(/<\?xml[\s\S]*?\?>/g, "");
    t = t.replace(/<!DOCTYPE[\s\S]*?\]>/g, "");
    t = t.replace(/<!DOCTYPE[^>]*>/g, "");
    t = t.replace(/<!ENTITY[\s\S]*?>/g, "");

    // Remove Adobe-only foreignObject blocks (keeps the real <g> content).
    t = t.replace(/<foreignObject[\s\S]*?<\/foreignObject>/g, "");

    return t;
  }

  async function loadSvgIntoHost(
    host: HTMLElement,
    urlPath: string,
    preserveAspectRatio: string = "xMidYMid meet",
  ): Promise<string> {
    // Try BASE_URL-aware absolute fetch first; fall back to relative for file:// or misconfigured base paths.
    let res: Response | null = null;
    const primaryUrl = assetUrl(urlPath);
    try { res = await fetch(primaryUrl); } catch { res = null; }
    if (!res || !res.ok) {
      const fallback = (urlPath.startsWith("/") ? urlPath.slice(1) : urlPath);
      try { res = await fetch(fallback); } catch { /* ignore */ }
    }
    if (!res) throw new Error(`Failed to fetch SVG: ${urlPath}`);
    if (!res.ok) throw new Error("Failed to load " + urlPath + ": " + res.status);

    const raw = await res.text();
    const svgText = sanitizeSvgText(raw);
    host.innerHTML = svgText;

    const svg = host.querySelector("svg") as SVGSVGElement | null;
    if (svg) {
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("preserveAspectRatio", preserveAspectRatio);
    }

    return svgText;
  }




  function chooseTabPitchAction(stringIndex: number, fretIndex: number): "TAP_CELL" | "STEAL_CELL" {
    if (!state) return "TAP_CELL";
    const cellIndex = stringIndex * state.fretCount + fretIndex;
    const lane = fromVariantId(state.prompt.variantId).spelling;
    const owner = state.board.owner[lane][cellIndex];
    const currentPid = state.players[state.currentPlayer]?.profile.id ?? -1;
    return owner >= 0 && owner !== currentPid ? "STEAL_CELL" : "TAP_CELL";
  }

  function dispatchFromFretSurface(action: Action): void {
    // Non-cell actions (dev/test, settings, etc.) pass through unchanged.
    if (action.type !== "TAP_CELL" && action.type !== "STEAL_CELL") {
      dispatch(action);
      return;
    }

    // Composite modes gate input and delay committing the TAP/STEAL until all required surfaces are filled.
    if (!state || frozen) return;
    const matrix = getSurfaceMatrix();
    if (!matrix.fret.input) return;

    pendingFretPick = { action: action.type, stringIndex: action.stringIndex, fretIndex: action.fretIndex };
    lastAnswerSurface = "fret";

    // Immediate feedback for composite entry.
    updateOverlayOwnership();
    submitCompositeIfReady();
  }

  function ensureDidacticFretLayout(force = false): void {
    // When Canvas2D renderers are installed, the SVG fret background host is hidden.
    // Therefore the SVG overlay/hit-testing must be generated from the same didactic
    // model as the canvas renderer (uniform frets, readable spacing).
    if (!renderers?.fretboard) return;
    if (!fretOverlaySvgEl) return;

    const fretCanvas = doc.querySelector<HTMLCanvasElement>("#fretCanvas");
    if (!fretCanvas) return;

    const rect = fretCanvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const fretCount = Math.max(1, state?.fretCount ?? 13);

    if (!force && w === __didFretW && h === __didFretH && fretCount === __didFretCount && fretLayout) return;

    __didFretW = w;
    __didFretH = h;
    __didFretCount = fretCount;

    // Update the canvas renderer to match state.
    try { renderers.fretboard.setView({ fretCount }); } catch {}

    fretLayout = computeDidacticLayout({
      w,
      h,
      fretCount,
      stringCount: 6,
    });

    fretOverlaySvgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
    fretOverlaySvgEl.setAttribute("preserveAspectRatio", "none");
    fretOverlaySvgEl.setAttribute("width", "100%");
    fretOverlaySvgEl.setAttribute("height", "100%");
  }
  async function setupSvgSurfaces(): Promise<void> {
    // Staff background (optional)
    if (staffBgHostEl && staffOverlaySvgEl) {
      // NOTE: loadSvgIntoHost expects a relative asset path (it applies assetUrl() internally).
      const staffText = await loadSvgIntoHost(staffBgHostEl, "/Guitar-Notes_Tab_Staff-Blank-3Measures.svg", "xMidYMid meet");
      const vb = parseSvgViewBox(staffText);
      staffOverlaySvgEl.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
      staffOverlaySvgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
      staffLayout = parseStaffTabLayout(staffText, DEFAULT_STAFF_COLUMNS_PER_MEASURE);
      renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
      attachStaffTabPointerHandlers(staffOverlaySvgEl, staffLayout, staffOverlayState, (hit: StaffTabHit) => {
        window.dispatchEvent(new CustomEvent("gedu:staffPick", { detail: hit }));
      });

      // Apply the initial crop according to the current UI Mode.
      // (Mode 2 = staff only, Mode 3 = tab only, others = both.)
      const uiModeEl = doc.getElementById("core-gameMode") as HTMLSelectElement | null;
      const uiMode = uiModeEl?.value ?? "m4";
    }

    // Fretboard: when Canvas2D renderers are installed, the SVG background is hidden,
    // so we must generate the SVG overlay + hit-testing layout from the same didactic
    // (uniform) model as the canvas.
    if (renderers?.fretboard) {
      // Ensure the hidden SVG background doesn't compete for layout.
      try { fretBgHostEl.innerHTML = ""; } catch {}
      ensureDidacticFretLayout(true);
      // Keep layout in sync with resizes.
      try {
        if ("ResizeObserver" in window) {
          const ro = new ResizeObserver(() => {
            ensureDidacticFretLayout(false);
            updateOverlayOwnership();
          });
          ro.observe(doc.querySelector("#fretStage") ?? fretOverlaySvgEl);
        }
      } catch { /* ignore */ }
    } else {
      // SVG fallback (legacy): compute hitbox layout directly from the background SVG.
      let bgText = "";
      try {
        bgText = await loadSvgIntoHost(
          fretBgHostEl,
          "/Guitar_FretBoard_Horizontal-Complete_v2i.svg",
          "xMinYMin meet",
        );
      } catch {
        bgText = await loadSvgIntoHost(
          fretBgHostEl,
          "/Guitar_FretBoard_Horizontal-Complete.svg",
          "xMinYMin meet",
        );
      }

      let layout: FretboardLayout;
      let vb: { x: number; y: number; w: number; h: number };
      try {
        const cleanBgText = sanitizeSvgText(bgText);
        layout = computeLayoutFromSvg(cleanBgText);
        vb = layout.viewBox;
      } catch (e) {
        console.warn("Failed to compute layout from background SVG; falling back to vector geometry mapping.", e);
        const hitRaw = await (await fetch(assetUrl("/Guitar_FretBoard_Horizontal-Complete.svg"))).text();
        const hitText = sanitizeSvgText(hitRaw);
        const baseLayout = computeLayoutFromSvg(hitText);
        layout = baseLayout;
        vb = baseLayout.viewBox;
        try {
          const bgVB = parseSvgViewBox(bgText);
          const bgNeck = parseSvgNeckBounds(bgText);
          layout = mapLayoutToNeck(baseLayout, bgVB, bgNeck);
          vb = bgVB;
        } catch (e2) {
          console.warn("Failed to map fretboard layout to background SVG; using base layout.", e2);
        }
      }

      fretLayout = layout;
      fretOverlaySvgEl.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
      fretOverlaySvgEl.setAttribute("preserveAspectRatio", "xMinYMin meet");
      fretOverlaySvgEl.setAttribute("width", "100%");
      fretOverlaySvgEl.setAttribute("height", "100%");
    }

    attachBoardPointerHandlers(
      { layout: fretLayout, svgRoot: fretOverlaySvgEl, dispatch: dispatchFromFretSurface },
      () => state,
      fretOverlaySvgEl,
    );

    // Education mode: allow placing markers on the fretboard even when no match is running.
    if (!eduFretHandlersInstalled) {
      eduFretHandlersInstalled = true;
      fretOverlaySvgEl.addEventListener("pointerdown", (ev: PointerEvent) => {
        if (session !== "edu") return;
        if (!fretLayout) return;
        // Convert client -> svg coords
        const rect = fretOverlaySvgEl.getBoundingClientRect();
        const vb = fretOverlaySvgEl.viewBox.baseVal;
        const sx = vb.x + ((ev.clientX - rect.left) * vb.width) / Math.max(1, rect.width);
        const sy = vb.y + ((ev.clientY - rect.top) * vb.height) / Math.max(1, rect.height);

        const hit = hitTestCell(fretLayout, sx, sy);
        if (!hit) return;
        const fretCols = Math.max(1, fretLayout.fretBoundaries.length - 1);
        const cellIndex = hit.stringIndex * fretCols + hit.fretIndex;
        if (eduTool === "erase") eduFretMarks.delete(cellIndex);
        else eduFretMarks.set(cellIndex, eduSelectedVariantId);
        renderEduFretMarks();
        applyEduVisibility();
      }, { passive: true });
    }

    // Initial render if a game is already running.
    updateOverlayOwnership();
    syncFretKeypadAvailability();
    if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
  }

  // --- Education helpers ---
  function updateEduSelectedUi(): void {
    const el = doc.getElementById("edu-selected");
    if (!el) return;
    const lab = variantLabel(eduSelectedVariantId);
    el.textContent = lab;
  }

  function clearEduMarks(which: "all" | "staff" | "tab" | "fret"): void {
    if (which === "all" || which === "staff") staffOverlayState.staffMarksByCol.clear();
    if (which === "all" || which === "tab") staffOverlayState.tabMarksByCol.clear();
    if (which === "all" || which === "fret") eduFretMarks.clear();
    if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
    renderEduFretMarks();
    applyEduVisibility();
  }

  function applyEduVisibility(): void {
    if (session !== "edu") return;
    if (staffOverlaySvgEl) {
      const gStaff = staffOverlaySvgEl.querySelector<SVGGElement>("#geduStaffMarks");
      const gTab = staffOverlaySvgEl.querySelector<SVGGElement>("#geduTabNumbers");
      if (gStaff) gStaff.style.display = eduShowStaff ? "" : "none";
      if (gTab) gTab.style.display = eduShowTab ? "" : "none";
    }
    const gFret = fretOverlaySvgEl.querySelector<SVGGElement>("#geduEduMarks");
    if (gFret) gFret.style.display = eduShowFret ? "" : "none";
  }

  function renderEduFretMarks(): void {
    if (session !== "edu") return;
    if (!fretLayout) return;

    const NS = "http://www.w3.org/2000/svg";
    let g = fretOverlaySvgEl.querySelector<SVGGElement>("#geduEduMarks");
    if (!g) {
      g = document.createElementNS(NS, "g") as SVGGElement;
      g.setAttribute("id", "geduEduMarks");
      fretOverlaySvgEl.appendChild(g);
    }
    while (g.firstChild) g.removeChild(g.firstChild);

    const fretCols = Math.max(1, fretLayout.fretBoundaries.length - 1);
    const r = Math.max(6, Math.min(10, fretLayout.dotRadius * 1.25));
    for (const [cellIndex, vid] of eduFretMarks.entries()) {
      const stringIndex = Math.floor(cellIndex / fretCols);
      const fretIndex = cellIndex % fretCols;
      const c = cellCenter(fretLayout, stringIndex, fretIndex);

      const circ = document.createElementNS(NS, "circle");
      circ.setAttribute("cx", String(c.cx));
      circ.setAttribute("cy", String(c.cy));
      circ.setAttribute("r", String(r));
      circ.setAttribute("fill", "rgba(255,255,255,0.12)");
      circ.setAttribute("stroke", "rgba(255,255,255,0.65)");
      circ.setAttribute("stroke-width", "1");
      g.appendChild(circ);

      const t = document.createElementNS(NS, "text");
      t.setAttribute("x", String(c.cx));
      t.setAttribute("y", String(c.cy + r * 0.35));
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("font-size", String(Math.max(9, r * 0.95)));
      t.setAttribute("font-weight", "700");
      t.setAttribute("fill", "rgba(255,255,255,0.95)");
      t.textContent = variantLabel(vid);
      g.appendChild(t);
    }
  }

  void setupSvgSurfaces().catch((err) => {
    console.error("Failed to set up SVG surfaces", err);
  });

  function rebuildOverlay(): void {
    // No-op: fretboard interaction and rendering are handled by the SVG overlay.
    // This stub is kept so older calls (e.g., start/reset) don't crash.
  }

  function renderPendingCompositeMarks(): void {
    if (!state) return;
    if (!fretLayout) return;

    const NS = "http://www.w3.org/2000/svg";

    // Ensure group exists (renderOverlay clears the SVG each call).
    let g = fretOverlaySvgEl.querySelector<SVGGElement>("#geduPending");
    if (!g) {
      g = document.createElementNS(NS, "g") as SVGGElement;
      g.setAttribute("id", "geduPending");
      fretOverlaySvgEl.appendChild(g);
    }
    while (g.firstChild) g.removeChild(g.firstChild);

    if (!pendingFretPick) return;

    const c = cellCenter(fretLayout, pendingFretPick.stringIndex, pendingFretPick.fretIndex);
    const ring = document.createElementNS(NS, "circle");
    ring.setAttribute("cx", String(c.cx));
    ring.setAttribute("cy", String(c.cy));
    ring.setAttribute("r", String(Math.max(8, fretLayout.dotRadius * 1.75)));
    ring.setAttribute("fill", "rgba(0,0,0,0)");
    ring.setAttribute("stroke", "rgba(255,255,255,0.85)");
    ring.setAttribute("stroke-width", "2");
    ring.setAttribute("stroke-dasharray", "4 3");
    g.appendChild(ring);
  }

  function updateOverlayOwnership(): void {
    if (!state) return;
    // Keep overlay + hit-testing aligned to the Canvas2D fretboard when enabled.
    ensureDidacticFretLayout(false);
    if (!fretLayout) return;
    renderOverlay(fretOverlaySvgEl, fretLayout, state, activePulse);
    renderPendingCompositeMarks();
  }

  function updateActivePlayerUi(): void {
    if (!state) return;
    const pIndex = state.currentPlayer;
    const p = state.players[pIndex];
    if (!p) return;

    if (activeName) activeName.textContent = players[pIndex]?.name ?? `P${pIndex + 1}`;
    if (activeScore) activeScore.textContent = String(p.score);
    if (activeMult) activeMult.textContent = `×${1 + (state.turn?.streakTier ?? 0)}`;

    if (activeTokens) {
      const cap = state.settings.steal.tokenCap;
      activeTokens.innerHTML = "";
      for (let i = 0; i < cap; i++) {
        const dot = document.createElement("span");
        dot.className = "tokenDot" + (i < p.tokenCount ? " filled" : "");
        activeTokens.appendChild(dot);
      }
    }
  }

  function updateLeaderboardUi(): void {
    if (!state || !leaderboard) return;
    leaderboard.innerHTML = "";
    for (let i = 0; i < state.players.length; i++) {
      const p = state.players[i];
      const row = document.createElement("div");
      row.className = "leader-chip" + (i === state.currentPlayer ? " active" : "");
      row.innerHTML = `
        <div class="leader-avatar">${(players[i]?.name ?? `P${i + 1}`).slice(0, 2)}</div>
        <div class="leader-name">${players[i]?.name ?? `P${i + 1}`}</div>
        <div class="leader-score">${p.score}</div>
        <div class="leader-tokens">${p.tokenCount}</div>
      `;
      leaderboard.appendChild(row);
    }
  }

  function updatePromptUi(): void {
    if (!state) return;
    const displayMode = (state.settings as any).displayMode ?? "names";
    const rootPc = pcFromUiNoteName((state.settings as any).rootNote ?? "C");
    const label = labelForVariant(state.prompt.variantId, displayMode, rootPc, state.settings);

    // Update the visible target label (and promptText if that element exists).
    if (promptText) promptText.textContent = label;
    if (activeTarget) {
      const v = fromVariantId(state.prompt.variantId);
      const isBlack = IS_BLACK[v.pitchClass];
      const spelling = isBlack && v.spelling === SlotType.SHR ? "sharp" : (isBlack && v.spelling === SlotType.FLT ? "flat" : "");
      activeTarget.textContent = spelling ? `Target: ${label} (${spelling})` : `Target: ${label}`;
      activeTarget.classList.toggle("is-sharp", isBlack && v.spelling === SlotType.SHR);
      activeTarget.classList.toggle("is-flat", isBlack && v.spelling === SlotType.FLT);
    }

    // Rail render (canonical): center on current prompt.
// Track which pitch classes have been prompted (for rail history + exhaustion).
try {
  const pv = fromVariantId(state.prompt.variantId);
  askedPcs.add(pv.pitchClass);
  lastPromptPc = pv.pitchClass;
} catch {}

    renderNoteStrip(state.prompt.variantId, state.settings);

    // Make the sharp/flat requirement visible at a glance without giving away fretboard positions.
    const v = fromVariantId(state.prompt.variantId);
    const isBlack = IS_BLACK[v.pitchClass];
    const spelling = isBlack && v.spelling === SlotType.SHR ? "sharp" : (isBlack && v.spelling === SlotType.FLT ? "flat" : "");
    const targetSuffix = spelling ? ` | Target: ${label} (${spelling})` : ` | Target: ${label}`;
    setAlert(describePromptProfileId(state.settings.promptProfileId) + targetSuffix);

    // Keep the left-panel context summary in sync with the live prompt.
    updateTaskContext();
  }




  type SurfaceMatrix = {
    staff: { required: boolean; input: boolean; showMarks: boolean };
    tab: { required: boolean; input: boolean; showMarks: boolean };
    fret: { required: boolean; input: boolean; showMarks: boolean };
  };

  // CANON: Surface Controls replace deprecated "surfaceLayers".
  function getSurfaceControls() {
    const src = ((state?.settings ?? settings) as any) ?? {};
    return (src.surfaceControlsV11?.surfaces ?? null) as any;
  }

  function getUiMode(): string {
    return (((state?.settings as any) ?? {}) as any).uiMode ?? "m4";
  }

  function getSurfaceMatrix(): SurfaceMatrix {
  const uiMode = getUiMode();
  const inMatch = !!state && (state.phase === "IN_MATCH" || state.phase === "LAST_CHANCE");

  // Prefer engine truth when in a match (prevents phantom "required" surfaces).
  const modeId = inMatch ? String((state!.settings as any).modeId ?? "") : "";
  const view = inMatch ? String(((state!.settings as any).notation?.view ?? "")) : "";

  const byEngine = () => {
    // Canon: in-match surface requirements are derived from engine settings, not legacy modeIds.
    // We treat notation.view as the source of truth for whether staff/tab are required/visible.
    const v = (view || "").toLowerCase();

    const needStaff = v.includes("staff");
    const needTab = v.includes("tab");

    // Canon: even in staff/tab modes, the fretboard remains part of pitch discovery unless explicitly disabled later.
    const needFret = true;

    return { needStaff, needTab, needFret };
  };

  const byUiMode = () => {
    // Fallback mapping when not in a match.
    const needStaff = uiMode === "m2" || uiMode === "m4" || uiMode === "m5";
    const needTab = uiMode === "m3" || uiMode === "m4" || uiMode === "m5";
    // Mode 3 (TAB) still requires the player to locate the pitch on the fretboard.
    const needFret = uiMode === "m1" || uiMode === "m2" || uiMode === "m3" || uiMode === "m4";
    return { needStaff, needTab, needFret };
  };

  const needs = inMatch ? byEngine() : byUiMode();

  // Surface Controls override (Prompt/Mark/Persistence/SAM) when present. This keeps UI shells deterministic.
  const sc = (state?.settings as any)?.surfaceControlsV11?.surfaces ?? null;
  if (sc) {
    const staffOn = !!(sc.staff?.prompt?.enabled || sc.staff?.mark?.enabled || sc.staff?.persistence?.enabled || sc.staff?.sam?.enabled);
    const tabOn = !!(sc.tab?.prompt?.enabled || sc.tab?.mark?.enabled || sc.tab?.persistence?.enabled || sc.tab?.sam?.enabled);
    (needs as any).needStaff = staffOn;
    (needs as any).needTab = tabOn;
    (needs as any).needFret = true;
  }


  const staffMarks = sc ? !!sc.staff?.mark?.enabled : needs.needStaff;
  const tabMarks = sc ? !!sc.tab?.mark?.enabled : needs.needTab;

  return {
    staff: { required: needs.needStaff, input: inMatch && (sc ? !!sc.staff?.mark?.enabled : needs.needStaff), showMarks: staffMarks },
    tab: { required: needs.needTab, input: inMatch && (sc ? !!sc.tab?.mark?.enabled : needs.needTab), showMarks: tabMarks },
    fret: { required: needs.needFret, input: inMatch && needs.needFret, showMarks: false },
  };
}

  function clearTurnInputProgress(reason: "prompt" | "turn" | "manual" | "accepted" = "manual"): void {
    // Preserve the persistent STAFF/TAB record.
    // Only remove transient marks from the current in-progress attempt when the attempt did not get accepted.
    const transientStaffCol = pendingStaffPick?.col ?? null;
    const transientTabCol = pendingTabPick?.col ?? null;

    pendingStaffPick = null;
    pendingTabPick = null;
    pendingFretPick = null;
    lastAnswerSurface = null;

    tabSelectedString = null;
    tabSelectedFret = null;
    tabSelectedCol = null;

    // Clear transient UI marks (but keep EDU marks untouched; EDU has its own controls).
    if (session !== "edu") {
      // Always clear transient (pending) previews for the in-progress slot.
      if (transientStaffCol != null) clearPendingAtCol(transientStaffCol);
      if (transientTabCol != null) clearPendingAtCol(transientTabCol);
      staffOverlayState.tabDefaultNumber = null;
      if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
    }

    if (reason === "prompt") {
      setAlert(null);
    }

    // Ensure the fret keypad UI resets when a turn or prompt advances.
    syncFretKeypadAvailability();
  }

  function staffLetterForYIndex(layout: StaffTabLayout | null, yIndex: number): string | null {
    if (!layout || layout.staff.stepCenters.length === 0) return null;

    // Use the bottom staff line as the reference step.
    const bottomLineY = layout.staff.lineYs[layout.staff.lineYs.length - 1] ?? layout.staff.stepCenters[layout.staff.stepCenters.length - 1];

    let ref = 0;
    let best = Infinity;
    for (let i = 0; i < layout.staff.stepCenters.length; i++) {
      const d = Math.abs(layout.staff.stepCenters[i] - bottomLineY);
      if (d < best) {
        best = d;
        ref = i;
      }
    }

    // In treble clef, the bottom line is E.
    const letters = ["C", "D", "E", "F", "G", "A", "B"] as const;
    const eIndex = 2;
    const offset = ref - yIndex;
    const idx = ((eIndex + offset) % 7 + 7) % 7;
    return letters[idx] ?? null;
  }

  function staffMidiForYIndex(layout: StaffTabLayout | null, yIndex: number, accidental: "natural" | "sharp" | "flat" | null): number | null {
    if (!layout || layout.staff.stepCenters.length === 0) return null;

    // Same reference step selection as staffLetterForYIndex: bottom staff line.
    const bottomLineY = layout.staff.lineYs[layout.staff.lineYs.length - 1] ?? layout.staff.stepCenters[layout.staff.stepCenters.length - 1];

    let ref = 0;
    let best = Infinity;
    for (let i = 0; i < layout.staff.stepCenters.length; i++) {
      const d = Math.abs(layout.staff.stepCenters[i] - bottomLineY);
      if (d < best) {
        best = d;
        ref = i;
      }
    }

    // In treble clef, the bottom line is E4.
    const BASE_E4_MIDI = 64;
    const stepDelta = ref - Math.floor(yIndex);

    // Semitone steps when moving upward by diatonic steps from E:
    // E->F(+1), F->G(+2), G->A(+2), A->B(+2), B->C(+1), C->D(+2), D->E(+2)
    const UP: number[] = [1, 2, 2, 2, 1, 2, 2];
    const DOWN: number[] = [2, 2, 1, 2, 2, 2, 1];

    let semi = 0;
    if (stepDelta > 0) {
      for (let i = 0; i < stepDelta; i++) semi += UP[i % UP.length];
    } else if (stepDelta < 0) {
      for (let i = 0; i < -stepDelta; i++) semi -= DOWN[i % DOWN.length];
    }

    const acc = accidental === "sharp" ? 1 : accidental === "flat" ? -1 : 0;
    return BASE_E4_MIDI + semi + acc;
  }

  function expectedPromptLetter(): string | null {
    if (!state) return null;
    const label = variantLabel(state.prompt.variantId);
    const letter = label.trim().slice(0, 1);
    return letter ? letter.toUpperCase() : null;
  }

  function totalStaffTabCols(): number {
    if (!staffLayout) return 0;
    const measures = staffLayout.measures?.length ?? 0;
    const cols = staffLayout.columnsPerMeasure ?? 0;
    return Math.max(0, measures * cols);
  }

  function shiftStaffTabTimelineLeft(by: number): void {
    shiftTimelineLeft(staffOverlayState, by);
  }

  function ensureStaffTabCursor(): void {
    const total = totalStaffTabCols();
    if (total <= 0) {
      staffOverlayState.timelineCursorCol = 0;
      return;
    }
    staffOverlayState.timelineCursorCol = clamp(Math.floor(staffOverlayState.timelineCursorCol ?? 0), 0, total - 1);
  }

  function advanceStaffTabTimeline(): void {
    const total = totalStaffTabCols();
    if (total <= 0) return;

    // Canon: shift-left pipeline keeps STAFF/TAB spatially static (no viewBox changes).
    advanceStaffTabTimelineCursor(staffOverlayState, total);

    if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
  }

  
  function addStaffPendingMark(col: number, yIndex: number, accidental: "natural" | "sharp" | "flat" | null): void {
    const c = Math.floor(col);
    const yi = Math.floor(yIndex);
    if (!Number.isFinite(c) || !Number.isFinite(yi)) return;

    // Canon: allow chord-style stacking in a single rhythmic slot.
    // Behavior: clicking the same staff step twice toggles it off.
    // (This keeps single-note workflows simple while enabling chords.)
    const map = (staffOverlayState as any).pendingStaffMarksByCol as Map<number, Array<{ yIndex: number; accidental: any }>>;
    const cur = map.get(c) ?? [];
    const idx = cur.findIndex((m) => Math.floor(m?.yIndex) === yi);
    if (idx >= 0) {
      cur.splice(idx, 1);
    } else {
      cur.push({ yIndex: yi, accidental });
    }
    map.set(c, cur);
  }

  function setTabPendingMark(col: number, stringIndex: number, fret: number | null): void {
    const c = Math.floor(col);
    const si = clamp(Math.floor(stringIndex), 0, 5);
    if (!Number.isFinite(c) || !Number.isFinite(si)) return;

    const map = staffOverlayState.pendingTabMarksByCol;
    const cur = map.get(c) ?? [];
    const next = upsertTabEntry(cur, { stringIndex: si, fret });
    map.set(c, next);
  }

  function clearPendingAtCol(col: number): void {
    const c = Math.floor(col);
    const ps = (staffOverlayState as any).pendingStaffMarksByCol as Map<number, any[]>;
    const pt = (staffOverlayState as any).pendingTabMarksByCol as Map<number, any[]>;
    ps.delete(c);
    pt.delete(c);
  }

  function commitPendingAtCol(col: number): void {
    const c = Math.floor(col);
    const ps = (staffOverlayState as any).pendingStaffMarksByCol as Map<number, Array<{ yIndex: number; accidental: any }>>;
    const pt = (staffOverlayState as any).pendingTabMarksByCol as Map<number, Array<{ stringIndex: number; fret: number | null }>>;

    const staffPending = ps.get(c) ?? [];
    for (const m of staffPending) {
      if (!m) continue;
      addStaffMark(c, m.yIndex, (m.accidental ?? null) as any);
    }

    const tabPending = pt.get(c) ?? [];
    for (const t of tabPending) {
      if (!t) continue;
      // Never commit a null fret into accepted history. Open-string is a meaningful
      // answer and must be explicit (0). A null fret represents an incomplete TAB entry.
      if (t.fret == null) continue;
      setTabMark(c, t.stringIndex, t.fret);
    }

    ps.delete(c);
    pt.delete(c);
  }

function addStaffMark(col: number, yIndex: number, accidental: "natural" | "sharp" | "flat" | null): void {
    const c = Math.floor(col);
    const yi = Math.floor(yIndex);
    if (!Number.isFinite(c) || !Number.isFinite(yi)) return;
    const cur = staffOverlayState.staffMarksByCol.get(c) ?? [];
    cur.push({ yIndex: yi, accidental });
    staffOverlayState.staffMarksByCol.set(c, cur);
  }

  function setTabMark(col: number, stringIndex: number, fret: number | null): void {
    const c = Math.floor(col);
    const si = clamp(Math.floor(stringIndex), 0, 5);
    if (!Number.isFinite(c) || !Number.isFinite(si)) return;
    const cur = staffOverlayState.tabMarksByCol.get(c) ?? [];
    const next = upsertTabEntry(cur, { stringIndex: si, fret });
    staffOverlayState.tabMarksByCol.set(c, next);
  }

  function submitCompositeIfReady(): void {
    if (!state) return;

    const matrix = getSurfaceMatrix();
    if (session === "edu") return;
    if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") return;

    // Wait until all required surfaces have a value.
    if (matrix.staff.required && !pendingStaffPick) return;
    if (matrix.tab.required && !pendingTabPick) return;
    if (matrix.fret.required && !pendingFretPick) return;

    // Mode 3+ correctness rule: when TAB is required alongside FRET, TAB represents an exact
    // string+fret location; the fretboard selection must match TAB exactly (not just pitch class).
    if (matrix.tab.required && matrix.fret.required && pendingTabPick && pendingFretPick) {
      const sameString = pendingFretPick.stringIndex === pendingTabPick.stringIndex;
      const sameFret = pendingFretPick.fretIndex === pendingTabPick.fret;
      if (!sameString || !sameFret) {
        dispatch({ type: "TIMEOUT" });
        clearTurnInputProgress("manual");
        return;
      }
    }

    const target = fromVariantId(state.prompt.variantId);

    // Absolute pitch (MIDI) is enforced when two or more pitch-producing surfaces are required.
    // Prompt generation is pitch-class based, so staff-only or single-surface validation remains
    // pitch-class based unless another surface provides an absolute pitch anchor.
    const tabMidi = matrix.tab.required && pendingTabPick ? pitchMidiAt(pendingTabPick.stringIndex, pendingTabPick.fret) : null;
    const fretMidi = matrix.fret.required && pendingFretPick ? pitchMidiAt(pendingFretPick.stringIndex, pendingFretPick.fretIndex) : null;
    const requiredMidi: number | null = tabMidi ?? fretMidi ?? null;

    const spellingPolicy = state.settings.mode3SpellingPolicy ?? "strict";

    // Mode 3 truth model: STAFF drives pitch (and spelling intent) when it is required.
    // The staff selection must match the prompt's intended spelling for black keys.
    if (matrix.staff.required && pendingStaffPick) {
      const gotLetter = staffLetterForYIndex(staffLayout, pendingStaffPick.yIndex);
      const staffMidi = staffMidiForYIndex(staffLayout, pendingStaffPick.yIndex, (pendingStaffPick.accidental ?? null) as any);
      if (!gotLetter || staffMidi == null) {
        dispatch({ type: "TIMEOUT" });
        clearTurnInputProgress("manual");
        return;
      }

      const letterPc: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
      const basePc = letterPc[gotLetter.toUpperCase()];
      if (basePc === undefined) {
        dispatch({ type: "TIMEOUT" });
        clearTurnInputProgress("manual");
        return;
      }

      const acc = (pendingStaffPick.accidental ?? null) as ("natural" | "sharp" | "flat" | null);
      const slot = acc === "sharp" ? SlotType.SHR : acc === "flat" ? SlotType.FLT : SlotType.NAT;
      const staffPc = slot === SlotType.SHR ? (basePc + 1) % 12 : slot === SlotType.FLT ? (basePc + 11) % 12 : basePc;

      // STAFF must represent the prompt's correct pitch.
      if (staffPc !== target.pitchClass) {
        dispatch({ type: "TIMEOUT" });
        clearTurnInputProgress("manual");
        return;
      }

      // Spelling policy: strict vs enharmonic.
      // strict (default): if the prompt is a black key, the accidental must match. White keys must be natural.
      // enharmonic: any spelling that yields the correct pitch class is accepted (e.g., C# or Db; E# for F).
      const okSpelling = isStaffSpellingAccepted({
        policy: spellingPolicy as any,
        targetPitchClass: target.pitchClass,
        targetSpelling: target.spelling,
        staffPitchClass: staffPc,
        staffSlot: slot,
      });
      if (!okSpelling) {
        dispatch({ type: "TIMEOUT" });
        clearTurnInputProgress("manual");
        return;
      }

      // Exact pitch enforcement: when TAB or FRET is required, STAFF must match that exact pitch.
      if (requiredMidi != null && staffMidi !== requiredMidi) {
        dispatch({ type: "TIMEOUT" });
        clearTurnInputProgress("manual");
        return;
      }
    }

    // Validate rhythmic column alignment between STAFF and TAB.

    if (matrix.staff.required && matrix.tab.required && pendingStaffPick && pendingTabPick) {
      if (pendingStaffPick.col !== pendingTabPick.col) {
        dispatch({ type: "TIMEOUT" });
        clearTurnInputProgress("manual");
        return;
      }
    }

    // Validate each enabled pitch-producing Answer surface.
    // If requiredMidi is present, enforce absolute pitch. Otherwise, fall back to prompt pitch-class.
    if (matrix.tab.required && pendingTabPick) {
      const m = tabMidi ?? pitchMidiAt(pendingTabPick.stringIndex, pendingTabPick.fret);
      if (requiredMidi != null) {
        if (m !== requiredMidi) {
          dispatch({ type: "TIMEOUT" });
          clearTurnInputProgress("manual");
          return;
        }
      } else {
        if ((m % 12) !== target.pitchClass) {
          dispatch({ type: "TIMEOUT" });
          clearTurnInputProgress("manual");
          return;
        }
      }
    }
    if (matrix.fret.required && pendingFretPick) {
      const m = fretMidi ?? pitchMidiAt(pendingFretPick.stringIndex, pendingFretPick.fretIndex);
      if (requiredMidi != null) {
        if (m !== requiredMidi) {
          dispatch({ type: "TIMEOUT" });
          clearTurnInputProgress("manual");
          return;
        }
      } else {
        if ((m % 12) !== target.pitchClass) {
          dispatch({ type: "TIMEOUT" });
          clearTurnInputProgress("manual");
          return;
        }
      }
    }

    // Choose which pitch action to submit (prefer the most recently updated Answer surface).
    let pitchSel:
      | { action: "TAP_CELL" | "STEAL_CELL"; stringIndex: number; fretIndex: number }
      | null = null;

    // Choose which pitch action to submit (prefer the most recently updated *required* Answer surface).
// IMPORTANT: Optional/non-required surfaces must never be used to submit an answer; they can exist as
// view-only or record-only surfaces without causing "phantom fails".
if (lastAnswerSurface === "tab" && matrix.tab.required && pendingTabPick) {
  pitchSel = { action: pendingTabPick.action, stringIndex: pendingTabPick.stringIndex, fretIndex: pendingTabPick.fret };
} else if (lastAnswerSurface === "fret" && matrix.fret.required && pendingFretPick) {
  pitchSel = { action: pendingFretPick.action, stringIndex: pendingFretPick.stringIndex, fretIndex: pendingFretPick.fretIndex };
} else if (matrix.fret.required && pendingFretPick) {
  pitchSel = { action: pendingFretPick.action, stringIndex: pendingFretPick.stringIndex, fretIndex: pendingFretPick.fretIndex };
} else if (matrix.tab.required && pendingTabPick) {
  pitchSel = { action: pendingTabPick.action, stringIndex: pendingTabPick.stringIndex, fretIndex: pendingTabPick.fret };
}

    if (!pitchSel) return;

    // Snapshot pending marks BEFORE dispatch; the reducer effects may clear pending previews
    // (e.g., on PROMPT_CHANGED / TURN_ENDED). We only commit the snapshot after a successful
    // composite validation.
    const commitCol = (pendingStaffPick?.col ?? pendingTabPick?.col ?? staffOverlayState.timelineCursorCol) as number;
    const ps = (staffOverlayState as any).pendingStaffMarksByCol as Map<number, Array<{ yIndex: number; accidental: any }>>;
    const pt = (staffOverlayState as any).pendingTabMarksByCol as Map<number, Array<{ stringIndex: number; fret: number | null }>>;
    const staffPendingSnapshot = (ps.get(commitCol) ?? []).map((m) => ({ yIndex: m.yIndex, accidental: (m as any).accidental ?? null }));
    const tabPendingSnapshot = (pt.get(commitCol) ?? []).map((t) => ({ stringIndex: t.stringIndex, fret: t.fret ?? null }));

    // Submit the pitch action to the engine (prompt spelling is handled inside the engine).
    dispatch({ type: pitchSel.action, stringIndex: pitchSel.stringIndex, fretIndex: pitchSel.fretIndex });

    // Commit the slot using the snapshot (accepted-only pipeline).
    // Canon: accepted history only mutates on successful composite acceptance.
    // Canon: never commit null frets into accepted TAB history.
    commitSnapshotsToAccepted({
      state: staffOverlayState,
      col: commitCol,
      staffPending: staffPendingSnapshot as any,
      tabPending: tabPendingSnapshot as any,
    });

    // Advance the STAFF/TAB timeline cursor after a correct composite submission.
    advanceStaffTabTimeline();

    clearTurnInputProgress("accepted");
  }

  function syncFretKeypadAvailability(): void {
    const pad = doc.getElementById("keypad");
    if (!pad) return;

    const activeSelectedFret = tabSelectedFret ?? staffOverlayState.tabDefaultNumber;

    const matrix = getSurfaceMatrix();
    const enabled = session === "edu" ? true : !!state && matrix.tab.input;

    // Disable keys outside the current playable domain range.
    // Note: the 24-key UI is always present, but keys outside [minFret..maxFret] are disabled.
    const minAllowed = state ? state.settings.domain.minFret : 0;
    const maxAllowed = state ? Math.min(24, state.settings.domain.maxFret) : 24;

    const keys = pad.querySelectorAll<HTMLButtonElement>("button.key");
    keys.forEach((b) => {
      const f = Number(b.dataset.fret);
      // Open string (0) remains available even when the focused fret range starts at 1.
      const outOfRange = !Number.isFinite(f) || (f !== 0 && (f < minAllowed || f > maxAllowed)) || (f === 0 && maxAllowed < 0);
      const disabled = !enabled || outOfRange;
      b.disabled = disabled;
      b.classList.toggle("disabled", disabled);

      // Visual feedback for selected fret
      b.classList.toggle("selected", Number.isFinite(f) && activeSelectedFret != null && f === activeSelectedFret);
    });

    // Keep the keypad display in sync even when the selection is set indirectly.
    const disp = doc.getElementById("keypad-display");
    if (disp) {
      disp.textContent = activeSelectedFret == null ? "" : String(activeSelectedFret);
    }
  }

  function applyUiModeVisibility(overrideUiMode?: string): void {
    const uiMode: string = overrideUiMode ?? (((state?.settings as any) ?? {}) as any).uiMode ?? "m4";
    const showFret = uiMode !== "m5";

    const matrix = getSurfaceMatrix();

    // STAFF/TAB stage
    const staffSection = doc.getElementById("staffTabStage")?.closest(".section") as HTMLElement | null;
    if (staffSection) {
      // Keep the Staff/Tab panel in the layout so the UI does not jump;
      // in modes where it is not active we simply mark it disabled.
      staffSection.hidden = false;
      const enabled = session === "edu" ? true : matrix.staff.input || matrix.tab.input;
      staffSection.classList.toggle("isDisabled", !enabled);

      if (staffOverlaySvgEl) {
        staffOverlaySvgEl.style.pointerEvents = enabled ? "auto" : "none";

        // Gameplay marks are gated by the surface matrix; education mode uses its own toggles.
        if (session !== "edu") {
          const sc = getSurfaceControls();
          const gGrid = staffOverlaySvgEl.querySelector<SVGGElement>("#staffTab-grid");
          const gHover = staffOverlaySvgEl.querySelector<SVGGElement>("#staffTab-hover");
          const gStaff = staffOverlaySvgEl.querySelector<SVGGElement>("#geduStaffMarks");
          const gTab = staffOverlaySvgEl.querySelector<SVGGElement>("#geduTabNumbers");
          const gStaffPending = staffOverlaySvgEl.querySelector<SVGGElement>("#geduStaffPending");
          const gTabPending = staffOverlaySvgEl.querySelector<SVGGElement>("#geduTabPending");

          // Surface Controls gate prompt/persistence layers.
          const showPrompt = sc?.staff?.prompt?.enabled !== false || sc?.tab?.prompt?.enabled !== false;
          const showPersistence = sc?.staff?.persistence?.enabled !== false || sc?.tab?.persistence?.enabled !== false;

          if (gGrid) gGrid.style.display = "";
          if (gHover) gHover.style.display = showPrompt ? "" : "none";
          if (gStaffPending) gStaffPending.style.display = showPrompt ? "" : "none";
          if (gTabPending) gTabPending.style.display = showPrompt ? "" : "none";

          if (gStaff) gStaff.style.display = matrix.staff.showMarks && showPersistence ? "" : "none";
          if (gTab) gTab.style.display = matrix.tab.showMarks && showPersistence ? "" : "none";
        }
      }
    }

    // FRET stage
    const fretSection = doc.getElementById("fretStage")?.closest(".section") as HTMLElement | null;
    if (fretSection) {
      // Core surfaces must remain mounted. Do not remove from layout.
      fretSection.classList.toggle("isSuppressed", !showFret);
      const enabled = session === "edu" ? true : matrix.fret.input || !!state?.settings.dev?.enabled;
      fretSection.classList.toggle("isDisabled", showFret && !enabled);
      if (fretOverlaySvgEl) fretOverlaySvgEl.style.pointerEvents = enabled ? "auto" : "none";
    }

    // CANON: Note rail remains visible; do not suppress.
  }

  function renderAll(): void {
    // Education mode renders overlays without the game engine state.
    if (!state) {
      // Pre-match and Education: surfaces should still render (note rail included) so the UI is testable.
      applyUiModeVisibility();

      if (session == "edu") {
        updateEduSelectedUi();
        renderEduFretMarks();
        if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
        applyEduVisibility();
        return;
      }

      // Pre-match (single/multi before INIT_MATCH): render the note rail so the user can select context.
      const s = buildSettingsFromUi(doc, session);
      renderNoteStrip(toVariantId(pcFromUiNoteName("C") as any, SlotType.NAT), s);
      return;
    }
    applyUiModeVisibility();

    // Ensure primary Canvas2D surfaces repaint on every render pass.
    renderers?.fretboard?.draw();
    renderers?.staffTab?.draw();

    updatePromptUi();
    updateActivePlayerUi();
    updateLeaderboardUi();
    updateOverlayOwnership();
    syncFretKeypadAvailability();
    if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
  }

  function handleEffects(effects: any[]): void {
    const s0 = state;
    if (!s0) return;

    for (const eff of effects) {
      switch (eff.type) {
        case "PROMPT_CHANGED":
          clearTurnInputProgress("prompt");
          updatePromptUi();
          break;

        case "ROUND_COMPLETE":
          // Informational only: show which round just completed.
          // Keeps the runtime loop easy to validate while UI polish evolves.
          setAlert(`Round ${eff.roundIndex + 1}/${eff.totalRounds} complete`);
          break;

        case "BLACKOUT_COMPLETE":
          setAlert(`Blackout complete`);
          break;

        case "LAST_CHANCE_STARTED":
          // Canon: "bonus phase" (formerly ambiguous). We surface a lightweight indicator here.
          setAlert(`Bonus phase`);
          break;

        case "TURN_STARTED":
          clearTurnInputProgress("turn");
          hideIntermissionOverlay();
          applyUiModeVisibility();
          setAlert("Turn started");
          startTurnTimer();
          break;

        case "TURN_ENDED":
          clearTurnInputProgress("turn");
          // Canon C5: the visible clock must not be tied to turn boundaries.
          // - clockMode=turn: stop countdown between turns.
          // - clockMode=checkClock: keep stopwatch running across the whole match.
          // - clockMode=off: nothing to stop.
          {
            const cm = getClockMode();
            if (cm === "turn") stopTurnTimer();
            else if (cm === "off") stopTurnTimer();
            // checkClock: do not stop; stopwatch continues.
          }
          // In single-player, keep things flowing.
          if (s0.settings.playType === PlayType.SINGLE) {
            dispatch({ type: "START_TURN" } as Action);
          } else {
            // Multiplayer: respect intermission.
            showIntermissionOverlay(eff.nextPlayerId);
            const waitMs = Math.max(0, Number(s0.settings.timers.intermissionSec ?? 0)) * 1000;
            if (waitMs <= 0) {
              startTurnEarly("auto");
              break;
            }
            intermissionHandle = window.setTimeout(() => {
              if (!state || frozen) return;
              startTurnEarly("auto");
            }, waitMs);
          }
          break;

        case "FEEDBACK_PULSE": {
          // SAM pulse (highlight correct locations)
          if (!s0.settings.feedback.samEnabled) break;

          activePulse = {
            playerId: eff.playerId,
            variantId: eff.variantId,
            durationMs: eff.durationMs ?? s0.settings.feedback.samDurationMs,
            ghost: (eff.ghost ?? null) as any,
            ghosts: (eff.ghosts ?? undefined) as any,
            scoreDelta: (eff.scoreDelta ?? 0) as any,
            includeLabel: (eff.includeLabel ?? false) as any,
          };

          if (samHandle !== null) window.clearTimeout(samHandle);
          samHandle = window.setTimeout(() => {
            activePulse = null;
            renderAll();
          }, activePulse.durationMs);
          break;
        }

        case "ALERT":
          setAlert(String(eff.message ?? ""));
          break;

        case "MATCH_COMPLETE":
          stopTurnTimer();
          hideIntermissionOverlay();
          frozen = true;
          recordScoresIfNeeded();
          updateHighScoresUi();
          setAlert("Match complete");
          showSplash();
          break;
      }
    }

    renderAll();
  }

  function dispatch(action: Action): void {
    // Optional debug hook: record engine actions for troubleshooting.
    // This is intentionally non-invasive and must never affect behavior.
    try {
      (window as any).__GEDU_LOG_ACTION__?.(action);
    } catch {
      // ignore
    }
    const r = reducer(state, action);
    state = r.state;
    handleEffects(r.effects);
  }

  function beginMatch(sess: "single" | "multi"): void {
    clearTimers();
    hideIntermissionOverlay();
    hideMatchStartOverlay();
    frozen = false;
    matchEngaged = false;

    // Record the session transition for troubleshooting. This is informational only.
    try {
      (window as any).__GEDU_LOG_ACTION__?.({ type: "BEGIN_MATCH", session: sess });
    } catch {
      // ignore
    }

    session = sess;
    settings = buildSettingsFromUi(doc, session);
    syncDevTabVisibility(!!settings.dev?.enabled);

    // Hide instructor tools during standard play.
    const teachTab = doc.getElementById("utility-teach-tab") as HTMLButtonElement | null;
    const teachPane = doc.getElementById("utility-teach-pane") as HTMLDivElement | null;
    if (teachTab) teachTab.hidden = true;
    if (teachPane) teachPane.hidden = true;
    players = buildPlayers(session === "single" ? 1 : getMultiPlayerCount());

    // INIT_MATCH bypasses dispatch for determinism; log it explicitly for the Event Log.
    const initAction = { type: "INIT_MATCH", settings, players } as Action;
    try {
      (window as any).__GEDU_LOG_ACTION__?.(initAction);
    } catch {
      // ignore
    }
    const init = reducer(null, initAction);
    state = init.state;

    // Match timing begins ONLY when the player engages.
    matchStartedAtMs = 0;
    matchRecorded = false;

    // Apply starting tokens (clamped to the configured token cap).
    const startTokens = clamp(Number((settings as any).startTokens ?? 0), 0, settings.steal.tokenCap);
    if (state && startTokens > 0) {
      for (const p of state.players) p.tokenCount = startTokens;
    }

    updateHighScoresUi(settings);

    // Reset STAFF/TAB timeline record for the new match.
    staffOverlayState.staffMarksByCol.clear();
    staffOverlayState.tabMarksByCol.clear();
    staffOverlayState.tabDefaultNumber = null;
    staffOverlayState.timelineCursorCol = 0;
    if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);

    rebuildOverlay();
    renderAll();
    handleEffects(init.effects);

    // Do not start Turn 1 immediately. Show Ready/Engage overlay.
    hideSplash();
    showMatchStartOverlay(sess);
  }

  function beginEducation(): void {
    session = "edu";
    hideIntermissionOverlay();
    settings = buildSettingsFromUi(doc, session);
    // Instructor session: no scoring, no timers, no turns.
    players = buildPlayers(1);
    state = null;
    frozen = false;
    stopTurnTimer();
    setAlert("Education Mode");

    // Unhide Teach tab and switch to it.
    const teachTab = doc.getElementById("utility-teach-tab") as HTMLButtonElement | null;
    const teachPane = doc.getElementById("utility-teach-pane") as HTMLDivElement | null;
    if (teachTab) teachTab.hidden = false;
    if (teachPane) teachPane.hidden = false;
    teachTab?.click();

    // Default selection reads from note rail if available; fall back to C.
    updateEduSelectedUi();

    // Clear any previous marks and redraw.
    clearEduMarks("all");
    renderAll();
  }

  function endMatch(): void {
    if (!state) return;
    clearTimers();
    hideIntermissionOverlay();
    hideMatchStartOverlay();
    // Hard-terminate the match state.
    // Canon: the Operations "End" control must fully terminate the match instance
    // (inputs disabled, engine state cleared back to the Start Menu).
    frozen = true;

    // Allow any score bookkeeping to run while we still have a valid engine state.
    dispatch({ type: "END_MATCH" } as Action);
    recordScoresIfNeeded();
    updateHighScoresUi();

    // Clear engine state back to the Start Menu.
    state = null;
    matchEngaged = false;
    matchStartedAtMs = 0;
    matchRecorded = false;
    frozen = false;
    setAlert("Ready");
    showSplash();
  }

  function resetGame(): void {
    clearTimers();
    hideIntermissionOverlay();
    hideMatchStartOverlay();
    frozen = false;
    matchStartedAtMs = 0;
    matchRecorded = false;
    state = null;
    matchEngaged = false;
    rebuildOverlay();
    setAlert("Ready");
    showSplash();
  }

  function onCellClick(stringIndex: number, fretIndex: number): void {
    if (!state) return;
    if (frozen) return;
    if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") return;

    const cellIndex = stringIndex * state.fretCount + fretIndex;
    const slot = fromVariantId(state.prompt.variantId).spelling;
    const owner = state.board.owner[slot][cellIndex];
    const currentPid = state.players[state.currentPlayer]?.profile.id ?? -1;
    const isOtherOwner = owner >= 0 && owner !== currentPid;
    const actionType: "TAP_CELL" | "STEAL_CELL" = isOtherOwner ? "STEAL_CELL" : "TAP_CELL";

    pendingFretPick = { action: actionType, stringIndex, fretIndex };
    lastAnswerSurface = "fret";
    submitCompositeIfReady();
  }

  // Intermission overlay interaction (multiplayer)
  intermissionOverlay?.addEventListener("click", () => startTurnEarly("tap"));
  intermissionStart?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    startTurnEarly("button");
  });

  // Match start overlay interaction (Ready / Engage)
  matchStartOverlay?.addEventListener("click", () => engageMatch("tap"));
  matchStartEngage?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    engageMatch("button");
  });

  // Listen to layout events
  // Splash selection now flows through the Start Setup gate.
  window.addEventListener("gedu:beginSession", (e: any) => {
    const detail = e?.detail as { session: "single" | "multi" | "edu" };
    const sess = detail?.session ?? "single";
    if (sess === "edu") beginEducation();
    else beginMatch(sess);
  });

  // Backwards-compat: older builds may still dispatch gedu:splashSelect.
  window.addEventListener("gedu:splashSelect", (e: any) => {
    const detail = e?.detail as { session: "single" | "multi" | "edu" };
    const sess = detail?.session ?? "single";
    if (sess === "edu") beginEducation();
    else beginMatch(sess);
  });

  // Backwards-compat: some builds dispatch a semantic intent instead of a session id.
  // NOTE: different parts of the UI have historically dispatched on either window or document.
  // We listen on both to make the session-start bridge deterministic.
  const handleEnterUi = (e: any) => {
    const intent = String(e?.detail?.intent ?? "");

    // Deterministic routing guard:
    // Some builds dispatch `gedu:enterUI` on both `window` and `document`.
    // We listen to both for backwards-compat, but we must not start twice.
    const now = Date.now();
    const last = (window as any).__GEDU_ENTERUI_GUARD__ as { t: number; intent: string } | undefined;
    if (last && last.intent === intent && now - last.t < 100) return;
    (window as any).__GEDU_ENTERUI_GUARD__ = { t: now, intent };

    // Record the intent bridge for troubleshooting.
    try {
      (window as any).__GEDU_LOG_ACTION__?.({ type: "ENTER_UI", intent });
    } catch {
      // ignore
    }
    if (intent === "edu" || intent === "education") {
      beginEducation();
      return;
    }
    if (intent === "multiplayer" || intent === "multi") {
      beginMatch("multi");
      return;
    }
    // Default: challenge/single/unknown intents route to single-player.
    beginMatch("single");
  };
  window.addEventListener("gedu:enterUI", handleEnterUi as any);
  doc.addEventListener("gedu:enterUI", handleEnterUi as any);

  window.addEventListener("gedu:start", () => {
    if (session === "edu") {
      setAlert("Education Mode");
      renderAll();
      return;
    }
    if (!state) {
      beginMatch(session as any);
      return;
    }
    // Ops "Start" acts as Engage when a match is waiting at the Ready overlay.
    if (!matchEngaged) {
      engageMatch("opsStart");
      return;
    }
  });
// Authoritative exit request (from UI menus). Always stop timers and return to Start Menu.
window.addEventListener("gedu:exitRequested", () => {
  try {
    stopAllTimers();
    state = null;
    // Clear any transient UI alerts and force a clean render pass.
    setAlert("");
    applyUiModeVisibility();
    renderers?.fretboard?.draw();
    renderers?.staffTab?.draw();
  } catch {}
  logUI("gedu:exitToMenu");
  window.dispatchEvent(new CustomEvent("gedu:exitToMenu"));
});



  window.addEventListener("gedu:stop", () => {
    if (session === "edu") {
      clearEduMarks("all");
      showSplash();
      return;
    }
    endMatch();
  });

  window.addEventListener("gedu:new", () => {
    if (session === "edu") {
      clearEduMarks("all");
      setAlert("Education Mode");
      renderAll();
      return;
    }
    resetGame();
  });

  window.addEventListener("gedu:applyFretRange", () => {
    // Easiest deterministic behavior: restart match with new domain.
    if (!state) return;
    beginMatch(session === "multi" ? "multi" : "single");
  });

  window.addEventListener("gedu:applySettings", () => {
    if (session === "edu") {
      settings = buildSettingsFromUi(doc, session);
      renderAll();
      return;
    }
    if (!state) return;
    beginMatch(session as any);
  });

  // Match Options UI emits the canonical settings object.
  window.addEventListener("gedu:matchOptions", (e: any) => {
try { (window as any).__GEDU_LAST_MATCH_OPTIONS__ = (e as any).detail ?? null; } catch {}


    lastMatchOptions = e?.detail ?? null;
    updateTaskContext();
    // Refresh the pre-match rail rendering to reflect display/visibility toggles.
    if (!state) {
      const s = buildSettingsFromUi(doc, session);
      renderNoteStrip(toVariantId(pcFromUiNoteName("C") as any, SlotType.NAT), s);
    }
  });

  // Note rail selection: in dev mode or Learning difficulty, clicking a rail cell sets the current prompt.
  window.addEventListener("gedu:railSelect", (e: any) => {
    const vid = Number(e?.detail?.variantId);
    if (!Number.isFinite(vid)) return;

    // Education mode: the rail selects what will be placed.
    if (session === "edu") {
      eduSelectedVariantId = vid;
      updateEduSelectedUi();
      renderAll();
      return;
    }

    if (!state) return;
    const allow = !!state.settings.dev?.enabled || state.settings.difficulty === Difficulty.LEARNING;
    if (!allow) return;
    dispatch({ type: "DEV_SET_PROMPT", variantId: vid } as any);
  });
  // 25-key fret selector (instant): on fret pick, claim if a TAB string is selected (or vice versa).
  window.addEventListener("gedu:fretPick", (e: any) => {
    const raw = Number(e?.detail?.fret);
    if (!Number.isFinite(raw)) return;

    const requested = clamp(Math.floor(raw), 0, 24);
    tabSelectedFret = requested;
    staffOverlayState.tabDefaultNumber = requested;

    // Education mode: just update the default number.
    if (session === "edu") {
      if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
      return;
    }

    if (!state) return;

    const matrix = getSurfaceMatrix();
    if (!matrix.tab.input) {
      setAlert("TAB input is disabled in this mode");
      return;
    }

    const maxAllowed = Math.min(24, state.settings.domain.maxFret);
    const clampedFret = clamp(requested, 0, maxAllowed);
    tabSelectedFret = clampedFret;
    staffOverlayState.tabDefaultNumber = clampedFret;

    // If a TAB (string+column) is already selected, complete the TAB answer now.
    if (tabSelectedString !== null && tabSelectedCol !== null) {
      pendingTabPick = {
        col: tabSelectedCol,
        stringIndex: tabSelectedString,
        fret: clampedFret,
        action: chooseTabPitchAction(tabSelectedString, clampedFret),
      };
      lastAnswerSurface = "tab";
      setTabPendingMark(tabSelectedCol, tabSelectedString, clampedFret);
      if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
      submitCompositeIfReady();
      return;
    }

    setAlert(`TAB: fret ${clampedFret} selected (pick string/column)`);
    if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
  });


  // STAFF/TAB surface pick events
  window.addEventListener("gedu:staffPick", (e: any) => {
    const region = String(e?.detail?.region ?? "");
    const col = Number(e?.detail?.col);
    const y = Number(e?.detail?.yIndex);
    if (!Number.isFinite(col) || !Number.isFinite(y)) return;

    // Education mode: place/erase simple markers on staff or tab.
    if (session === "edu") {
      if (region === "staff") {
        if (eduTool === "erase") {
          staffOverlayState.staffMarksByCol.delete(col);
        } else {
          // Use the same accidental preference as normal gameplay.
          if (staffAccPref === "prompt") {
            showAccOverlay({ col, yIndex: y });
            return;
          }
          addStaffMark(col, y, staffAccPref);
        }
      }
      if (region === "tab") {
        if (eduTool === "erase") {
          staffOverlayState.tabMarksByCol.delete(col);
        } else {
          const fret = clamp(Number(tabSelectedFret ?? staffOverlayState.tabDefaultNumber ?? 0), 0, 24);
          setTabMark(col, clamp(y, 0, 5), fret);
        }
      }
      if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
      applyEduVisibility();
      return;
    }

    if (!state) return;
    if (frozen) return;
    if (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE") return;

    const matrix = getSurfaceMatrix();

    if (region === "staff") {
      if (!matrix.staff.input) return;

      // STAFF/TAB act as a persistent timeline record. Horizontal placement uses the
      // current timeline slot, not the click's x-position.
      ensureStaffTabCursor();
      const c = Math.floor(staffOverlayState.timelineCursorCol);
      const yi = Math.floor(y);
      if (staffAccPref === "prompt") {
        showAccOverlay({ col: c, yIndex: yi });
        return;
      }

      pendingStaffPick = { col: c, yIndex: yi, accidental: staffAccPref };
      // Canon: allow chord stacking within a single timeline slot.
      // Do NOT clear other pending marks in this column; instead toggle the clicked step.
      addStaffPendingMark(c, yi, staffAccPref);
      if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
      submitCompositeIfReady();
      return;
    }

    if (region !== "tab") return;
    if (!matrix.tab.input) return;

    ensureStaffTabCursor();
    tabSelectedString = clamp(Math.floor(y), 0, 5);
    tabSelectedCol = Math.floor(staffOverlayState.timelineCursorCol);

    const maxAllowed = Math.min(24, state.settings.domain.maxFret);
    const chosenFretRaw = tabSelectedFret ?? staffOverlayState.tabDefaultNumber;

    // If the fret hasn't been chosen yet, show a pending slot (no implicit 0).
    if (chosenFretRaw == null) {
      setTabPendingMark(tabSelectedCol, tabSelectedString, null);
      if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
      setAlert(`TAB: string ${tabSelectedString + 1} selected (pick fret)`);
      return;
    }

    const previewFret = clamp(Number(chosenFretRaw), 0, maxAllowed);
    tabSelectedFret = previewFret;

    // Visual feedback immediately.
    setTabPendingMark(tabSelectedCol, tabSelectedString, previewFret);
    if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);

    pendingTabPick = {
      col: tabSelectedCol,
      stringIndex: tabSelectedString,
      fret: previewFret,
      action: chooseTabPitchAction(tabSelectedString, previewFret),
    };
    lastAnswerSurface = "tab";
    submitCompositeIfReady();
  });

  // Staff accidental preference (Utility > Note)
  const accPrefPrompt = doc.querySelector<HTMLInputElement>("#note-acc-prompt");
  const accPrefNat = doc.querySelector<HTMLInputElement>("#note-acc-natural");
  const accPrefSharp = doc.querySelector<HTMLInputElement>("#note-acc-sharp");
  const accPrefFlat = doc.querySelector<HTMLInputElement>("#note-acc-flat");

  const syncAccPrefUi = () => {
    if (accPrefPrompt) accPrefPrompt.checked = staffAccPref === "prompt";
    if (accPrefNat) accPrefNat.checked = staffAccPref === "natural";
    if (accPrefSharp) accPrefSharp.checked = staffAccPref === "sharp";
    if (accPrefFlat) accPrefFlat.checked = staffAccPref === "flat";
  };
  const setAccPref = (v: StaffAccPref) => {
    staffAccPref = v;
    localStorage.setItem("gedu.staffAccPref", v);
    syncAccPrefUi();
  };
  syncAccPrefUi();
  accPrefPrompt?.addEventListener("change", () => { if (accPrefPrompt.checked) setAccPref("prompt"); });
  accPrefNat?.addEventListener("change", () => { if (accPrefNat.checked) setAccPref("natural"); });
  accPrefSharp?.addEventListener("change", () => { if (accPrefSharp.checked) setAccPref("sharp"); });
  accPrefFlat?.addEventListener("change", () => { if (accPrefFlat.checked) setAccPref("flat"); });

  // Accidental prompt overlay wiring
  function showAccOverlay(pending: { col: number; yIndex: number }): void {
    pendingAccidentalPick = pending;
    if (accidentalOverlay) {
      accidentalOverlay.hidden = false;
      accidentalOverlay.classList.add("show");
    }
  }
  function hideAccOverlay(): void {
    pendingAccidentalPick = null;
    if (accidentalOverlay) {
      accidentalOverlay.classList.remove("show");
      accidentalOverlay.hidden = true;
    }
  }
  function commitAccidental(accidental: "natural" | "sharp" | "flat"): void {
    const p = pendingAccidentalPick;
    if (!p) return;
    const col = Math.floor(p.col);
    const yIndex = Math.floor(p.yIndex);

    // Education mode: place the mark only (no composite submit).
    if (session === "edu") {
      if (eduTool === "erase") staffOverlayState.staffMarksByCol.delete(col);
      else addStaffMark(col, yIndex, accidental);
      if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
      applyEduVisibility();
      hideAccOverlay();
      return;
    }

    if (!state) return;
    const matrix = getSurfaceMatrix();
    if (!matrix.staff.input) return;

    pendingStaffPick = { col, yIndex, accidental };
    // Canon: do not clear other pending marks in this column (chord stacking).
    addStaffPendingMark(col, yIndex, accidental);
    if (staffLayout && staffOverlaySvgEl) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
    hideAccOverlay();
    submitCompositeIfReady();
  }

  accidentalNatural?.addEventListener("click", () => commitAccidental("natural"));
  accidentalSharp?.addEventListener("click", () => commitAccidental("sharp"));
  accidentalFlat?.addEventListener("click", () => commitAccidental("flat"));
  accidentalCancel?.addEventListener("click", () => hideAccOverlay());
  // Click outside the card cancels.
  accidentalOverlay?.addEventListener("click", (ev) => {
    if (ev.target === accidentalOverlay) hideAccOverlay();
  });

  // Dev/Test UI wiring
  // Education (Teach) UI wiring
  const eduToolInput = doc.querySelector<HTMLInputElement>("#edu-tool-input");
  const eduToolErase = doc.querySelector<HTMLInputElement>("#edu-tool-erase");
  const eduShowStaffChk = doc.querySelector<HTMLInputElement>("#edu-show-staff");
  const eduShowTabChk = doc.querySelector<HTMLInputElement>("#edu-show-tab");
  const eduShowFretChk = doc.querySelector<HTMLInputElement>("#edu-show-fret");
  const btnEduClearAll = doc.querySelector<HTMLButtonElement>("#edu-clear-all");
  const btnEduClearStaff = doc.querySelector<HTMLButtonElement>("#edu-clear-staff");
  const btnEduClearTab = doc.querySelector<HTMLButtonElement>("#edu-clear-tab");
  const btnEduClearFret = doc.querySelector<HTMLButtonElement>("#edu-clear-fret");

  const syncEduControlsToState = () => {
    if (eduToolInput) eduToolInput.checked = eduTool === "input";
    if (eduToolErase) eduToolErase.checked = eduTool === "erase";
    if (eduShowStaffChk) eduShowStaffChk.checked = eduShowStaff;
    if (eduShowTabChk) eduShowTabChk.checked = eduShowTab;
    if (eduShowFretChk) eduShowFretChk.checked = eduShowFret;
    updateEduSelectedUi();
    applyEduVisibility();
  };

  eduToolInput?.addEventListener("change", () => {
    if (eduToolInput.checked) eduTool = "input";
    if (session === "edu") renderAll();
  });
  eduToolErase?.addEventListener("change", () => {
    if (eduToolErase.checked) eduTool = "erase";
    if (session === "edu") renderAll();
  });
  eduShowStaffChk?.addEventListener("change", () => { eduShowStaff = !!eduShowStaffChk.checked; applyEduVisibility(); });
  eduShowTabChk?.addEventListener("change", () => { eduShowTab = !!eduShowTabChk.checked; applyEduVisibility(); });
  eduShowFretChk?.addEventListener("change", () => { eduShowFret = !!eduShowFretChk.checked; applyEduVisibility(); });
  btnEduClearAll?.addEventListener("click", () => clearEduMarks("all"));
  btnEduClearStaff?.addEventListener("click", () => clearEduMarks("staff"));
  btnEduClearTab?.addEventListener("click", () => clearEduMarks("tab"));
  btnEduClearFret?.addEventListener("click", () => clearEduMarks("fret"));
  syncEduControlsToState();

  const devModeToggle = doc.querySelector<HTMLInputElement>("#core-devMode");
  const DEV_UNLOCK_KEY = "gedu.devUnlocked";
  const buildBadge = doc.getElementById("buildVersion");
  const devQuickBtn = doc.getElementById("devQuick") as HTMLButtonElement | null;
  let devClickCount = 0;

  const isDevUnlocked = (): boolean => {
    try {
      return window.localStorage.getItem(DEV_UNLOCK_KEY) === "true";
    } catch {
      return false;
    }
  };

  const setDevUnlocked = (v: boolean): void => {
    try {
      window.localStorage.setItem(DEV_UNLOCK_KEY, v ? "true" : "false");
    } catch {
      // ignore
    }
  };

  const applyDevVisibility = (): void => {
    const enabled = isDevUnlocked() || !!devModeToggle?.checked;
    if (devModeToggle && isDevUnlocked()) devModeToggle.checked = true;
    syncDevTabVisibility(enabled);
    if (devQuickBtn) devQuickBtn.classList.toggle("devHidden", !enabled);
  };

  // 5-click unlock on build badge (works even if menus regress).
  buildBadge?.addEventListener("click", () => {
    devClickCount += 1;
    if (devClickTimer != null) window.clearTimeout(devClickTimer);
    devClickTimer = window.setTimeout(() => {
      devClickCount = 0;
      devClickTimer = null;
    }, 800);
    if (devClickCount >= 5) {
      devClickCount = 0;
      setDevUnlocked(true);
      setAlert("Dev/Test unlocked");
      applyDevVisibility();
      // Jump straight to the Dev pane so the user can actually see the tools.
      (doc.querySelector<HTMLElement>("#misc-dev-tab") as HTMLElement | null)?.click();
    }
  });

  // Keyboard unlock: Ctrl+Shift+D
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === "d" || e.key === "D")) {
      setDevUnlocked(true);
      setAlert("Dev/Test unlocked");
      applyDevVisibility();
      (doc.querySelector<HTMLElement>("#misc-dev-tab") as HTMLElement | null)?.click();
    }
  });

  // Quick access button (visible only when unlocked).
  devQuickBtn?.addEventListener("click", () => {
    (doc.querySelector<HTMLElement>("#misc-dev-tab") as HTMLElement | null)?.click();
  });

  devModeToggle?.addEventListener("change", () => {
    // Only user-controlled when unlocked is not active.
    applyDevVisibility();
  });
  applyDevVisibility();

  // Quick open Dev/Test pane button (footer).
  devQuickBtn?.addEventListener("click", () => {
    // Ensure visible.
    setDevUnlocked(true);
    applyDevVisibility();
    // Activate the dev tab within Misc. Information.
    doc.querySelector<HTMLElement>("#misc-dev-tab")?.click();
  });

  const btnDevPrev = doc.querySelector<HTMLButtonElement>("#dev-prevPlayer");
  const btnDevNext = doc.querySelector<HTMLButtonElement>("#dev-nextPlayer");
  const btnDevEndTurn = doc.querySelector<HTMLButtonElement>("#dev-endTurn");
  const btnDevClearBoard = doc.querySelector<HTMLButtonElement>("#dev-clearBoard");
  const btnDevPhaseInMatch = doc.querySelector<HTMLButtonElement>("#dev-forceInMatch");
  const btnDevPhaseIntermission = doc.querySelector<HTMLButtonElement>("#dev-forceIntermission");
  const btnDevPhaseLastChance = doc.querySelector<HTMLButtonElement>("#dev-forceLastChance");
  const btnDevPhaseResults = doc.querySelector<HTMLButtonElement>("#dev-forceResults");

  // Staff/TAB timeline stress tools
  const btnDevFillStaffTab = doc.querySelector<HTMLButtonElement>("#dev-fillStaffTab");
  const btnDevAdvanceStaffTab = doc.querySelector<HTMLButtonElement>("#dev-advanceStaffTab");
  const btnDevAdvanceStaffTab16 = doc.querySelector<HTMLButtonElement>("#dev-advanceStaffTab16");
  const btnDevFillAndShift = doc.querySelector<HTMLButtonElement>("#dev-fillAndShift");

  // Mode 3 truth-table verification tools
  const btnDevRunMode3Strict = doc.querySelector<HTMLButtonElement>("#dev-runMode3Strict");
  const btnDevRunMode3Enh = doc.querySelector<HTMLButtonElement>("#dev-runMode3Enh");
  const devMode3Report = doc.querySelector<HTMLTextAreaElement>("#dev-mode3Report");

  const devPaintEnabled = doc.querySelector<HTMLInputElement>("#dev-paintEnabled");
  const devPaintPlayer = doc.querySelector<HTMLSelectElement>("#dev-paintPlayer");
  const devPaintLane = doc.querySelector<HTMLSelectElement>("#dev-paintLane");
  const devPaintMode = doc.querySelector<HTMLSelectElement>("#dev-paintMode");

  // Persistence (USB-friendly)
  const btnDevExportSave = doc.querySelector<HTMLButtonElement>("#dev-exportSave");
  const btnDevImportSave = doc.querySelector<HTMLButtonElement>("#dev-importSave");
  const fileDevImportSave = doc.querySelector<HTMLInputElement>("#dev-importSaveFile");

  const dispatchAndRender = (action: Action) => {
    if (!state) return;
    dispatch(action);
    renderAll();
  };

  btnDevPrev?.addEventListener("click", () => {
    if (!state) return;
    const n = state.players.length;
    const next = (state.currentPlayer - 1 + n) % n;
    dispatchAndRender({ type: "DEV_SET_CURRENT_PLAYER", playerIndex: next } as Action);
  });
  btnDevNext?.addEventListener("click", () => {
    if (!state) return;
    const n = state.players.length;
    const next = (state.currentPlayer + 1) % n;
    dispatchAndRender({ type: "DEV_SET_CURRENT_PLAYER", playerIndex: next } as Action);
  });

  // Dev "End Turn" behavior:
  // Option A (selected): simulate the end of a turn by triggering the same pipeline as a natural timeout/miss.
  // This validates the real scoring/token/sequence logic.
  btnDevEndTurn?.addEventListener("click", () => dispatchAndRender({ type: "TIMEOUT" } as Action));

  btnDevClearBoard?.addEventListener("click", () => dispatchAndRender({ type: "DEV_CLEAR_BOARD" } as Action));

  btnDevExportSave?.addEventListener("click", () => {
    downloadSnapshot();
    alertsText && (alertsText.textContent = "Exported save snapshot.");
  });

  btnDevImportSave?.addEventListener("click", () => {
    fileDevImportSave?.click();
  });

  fileDevImportSave?.addEventListener("change", async () => {
    const f = fileDevImportSave.files?.[0];
    if (!f) return;
    const res = await importSnapshotFromFile(f);
    if (res.ok) {
      alertsText && (alertsText.textContent = "Imported save snapshot. Reloading...");
      setTimeout(() => window.location.reload(), 400);
    } else {
      alertsText && (alertsText.textContent = `Import failed: ${res.reason}`);
    }
  });

  const forcePhase = (phase: Phase) => dispatchAndRender({ type: "DEV_FORCE_PHASE", phase } as Action);
  btnDevPhaseInMatch?.addEventListener("click", () => forcePhase("IN_MATCH"));
  btnDevPhaseIntermission?.addEventListener("click", () => forcePhase("INTERMISSION"));
  btnDevPhaseLastChance?.addEventListener("click", () => forcePhase("LAST_CHANCE"));
  btnDevPhaseResults?.addEventListener("click", () => forcePhase("RESULTS"));

  // Staff/TAB timeline stress helpers
  const fillStaffTabWindow = () => {
    if (!staffLayout || !staffOverlaySvgEl) return;
    const total = totalStaffTabCols();
    if (total <= 0) return;

    // Clear persistent record first.
    staffOverlayState.staffMarksByCol.clear();
    staffOverlayState.tabMarksByCol.clear();

    // Fill every subdivision slot with deterministic patterns to expose spacing/collisions:
    // - STAFF: alternating y indices plus periodic "chord" clusters to test fanning
    // - TAB: alternating strings, with occasional 2-string chords
    for (let col = 0; col < total; col++) {
      // STAFF base note
      const yi = 14 + (col % 9);
      addStaffMark(col, yi, null);
      // Every 4th slot: add a second staff mark to test stacking.
      if (col % 4 === 0) addStaffMark(col, yi + 2, null);
      // Every 12th slot: add a third staff mark to stress the fan.
      if (col % 12 === 0) addStaffMark(col, yi + 4, null);

      // TAB: always at least one string
      const s0 = col % 6;
      setTabMark(col, s0, col % 13);
      // Every 6th slot: add a second string to simulate chord tab.
      if (col % 6 === 0) setTabMark(col, (s0 + 2) % 6, (col + 5) % 13);
    }

    staffOverlayState.timelineCursorCol = total - 1;
    renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
    setAlert(`Dev: Filled STAFF/TAB window (${total} slots). Cursor at last slot.`);
  };

  const advanceStaffTab = (n: number) => {
    if (!staffLayout || !staffOverlaySvgEl) return;
    const steps = Math.max(1, Math.floor(n));
    for (let i = 0; i < steps; i++) advanceStaffTabTimeline();
    setAlert(`Dev: Advanced timeline ${steps} slot(s).`);
  };

  const fillAndShift = () => {
    if (!staffLayout || !staffOverlaySvgEl) return;
    fillStaffTabWindow();
    // Now simulate a few accepted entries beyond the visible range to validate shift-left.
    for (let i = 0; i < 6; i++) {
      const c = Math.floor(staffOverlayState.timelineCursorCol ?? 0);
      addStaffMark(c, 10 + (i % 7), null);
      setTabMark(c, i % 6, i);
      advanceStaffTabTimeline();
    }
    setAlert("Dev: Filled + shifted (6 accepts beyond end). Oldest entries should fall off left.");
  };

  btnDevFillStaffTab?.addEventListener("click", () => fillStaffTabWindow());
  btnDevAdvanceStaffTab?.addEventListener("click", () => advanceStaffTab(1));
  btnDevAdvanceStaffTab16?.addEventListener("click", () => advanceStaffTab(16));
  btnDevFillAndShift?.addEventListener("click", () => fillAndShift());

  const runMode3MatrixVerification = (policy: "strict" | "enharmonic") => {
    type PickStaff = { yIndex: number; accidental: "natural" | "sharp" | "flat" | null; col: number };
    type PickTab = { stringIndex: number; fret: number; col: number };
    type PickFret = { stringIndex: number; fretIndex: number };
    type Matrix = { staff: { required: boolean }; tab: { required: boolean }; fret: { required: boolean } };

    const letterPc: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

    const slotForAcc = (acc: PickStaff["accidental"]) => (acc === "sharp" ? SlotType.SHR : acc === "flat" ? SlotType.FLT : SlotType.NAT);

    const staffPcFromPick = (pick: PickStaff): { pc: number | null; slot: SlotType } => {
      if (!staffLayout) return { pc: null, slot: SlotType.NAT };
      const letter = staffLetterForYIndex(staffLayout, pick.yIndex);
      if (!letter) return { pc: null, slot: slotForAcc(pick.accidental) };
      const base = letterPc[letter.toUpperCase()];
      if (base == null) return { pc: null, slot: slotForAcc(pick.accidental) };
      const slot = slotForAcc(pick.accidental);
      const pc = slot === SlotType.SHR ? (base + 1) % 12 : slot === SlotType.FLT ? (base + 11) % 12 : base;
      return { pc, slot };
    };

    const validate = (m: Matrix, targetPc: number, targetSpelling: SlotType, staff?: PickStaff, tab?: PickTab, fret?: PickFret): boolean => {
      // Require all surfaces
      if (m.staff.required && !staff) return false;
      if (m.tab.required && !tab) return false;
      if (m.fret.required && !fret) return false;

      // TAB+FRET exact match when both required
      if (m.tab.required && m.fret.required && tab && fret) {
        if (tab.stringIndex !== fret.stringIndex) return false;
        if (tab.fret !== fret.fretIndex) return false;
      }

      // STAFF drives pitch when required
      let requiredPc = targetPc;
      if (m.staff.required && staff) {
        const { pc, slot } = staffPcFromPick(staff);
        if (pc == null) return false;
        if (pc !== targetPc) return false;
        if (policy === "strict") {
          if (IS_BLACK[targetPc]) {
            if (slot !== targetSpelling) return false;
          } else {
            if (slot !== SlotType.NAT) return false;
          }
        }
        requiredPc = pc;
      }

      // Rhythmic column alignment between staff and tab
      if (m.staff.required && m.tab.required && staff && tab) {
        if (staff.col !== tab.col) return false;
      }

      // TAB pitch must match required pitch
      if (m.tab.required && tab) {
        // Use existing pitch-from-tab resolver when possible
        const pc = pitchClassFromStringFret(tab.stringIndex, tab.fret, (state as any)?.settings?.domain?.tuning ?? "standard");
        if (pc !== requiredPc) return false;
      }

      return true;
    };

    const lines: string[] = [];
    lines.push(`MODE 3 TRUTH TABLE VERIFICATION (${policy.toUpperCase()})`);
    lines.push(`Time: ${new Date().toLocaleString()}`);
    lines.push("");

    const matrices: Array<{ name: string; m: Matrix }> = [
      { name: "STAFF only", m: { staff: { required: true }, tab: { required: false }, fret: { required: false } } },
      { name: "TAB only", m: { staff: { required: false }, tab: { required: true }, fret: { required: false } } },
      { name: "FRET only", m: { staff: { required: false }, tab: { required: false }, fret: { required: true } } },
      { name: "STAFF+TAB", m: { staff: { required: true }, tab: { required: true }, fret: { required: false } } },
      { name: "TAB+FRET", m: { staff: { required: false }, tab: { required: true }, fret: { required: true } } },
      { name: "STAFF+TAB+FRET", m: { staff: { required: true }, tab: { required: true }, fret: { required: true } } },
    ];

    // Deterministic scenario cases
    // We pick a black-key target (C#) and a white-key target (F) to validate strict/enharmonic.
    const pcCSharp = 1;
    const pcF = 5;
    const col0 = 0;

    const findYIndexForLetter = (letter: string): number | null => {
      if (!staffLayout) return null;
      let best: { yi: number; dist: number } | null = null;
      for (let yi = 0; yi < staffLayout.staff.stepCenters.length; yi++) {
        const got = staffLetterForYIndex(staffLayout, yi);
        if (!got) continue;
        if (got.toUpperCase() !== letter.toUpperCase()) continue;
        // Prefer indices near the main staff region, but any match works.
        const dist = Math.abs(yi - Math.floor(staffLayout.staff.stepCenters.length / 2));
        if (!best || dist < best.dist) best = { yi, dist };
      }
      return best?.yi ?? null;
    };

    const yiC = findYIndexForLetter("C") ?? 0;
    const yiD = findYIndexForLetter("D") ?? 0;
    const yiE = findYIndexForLetter("E") ?? 0;
    const yiF = findYIndexForLetter("F") ?? 0;

    // STAFF pick archetypes used for spelling-policy tests.
    // - C# (C + sharp)
    // - Db (D + flat)
    // - E# (E + sharp) which is enharmonic to F
    const staffPickDb: PickStaff = { yIndex: yiD, accidental: "flat", col: col0 };
    const staffPickCSharp: PickStaff = { yIndex: yiC, accidental: "sharp", col: col0 };
    const staffPickEsharp: PickStaff = { yIndex: yiE, accidental: "sharp", col: col0 };

    // Choose a deterministic TAB location that yields C# in standard tuning:
    // low E (pc=4) + 9 semitones => pc=1.
    const tabPickCSharp: PickTab = { stringIndex: 0, fret: 9, col: col0 };
    const fretPickMatch: PickFret = { stringIndex: 0, fretIndex: 9 };
    const fretPickMismatch: PickFret = { stringIndex: 1, fretIndex: 9 };

    // Deterministic TAB location for F (low E + 1).
    const tabPickF: PickTab = { stringIndex: 0, fret: 1, col: col0 };
    const fretPickF: PickFret = { stringIndex: 0, fretIndex: 1 };

    const add = (name: string, ok: boolean, note?: string) => {
      lines.push(`${ok ? "PASS" : "FAIL"}  ${name}${note ? `  — ${note}` : ""}`);
    };

    if (!staffLayout) {
      lines.push("NOTE: staffLayout not initialized yet; STAFF-letter-derived cases are limited.");
    }

    for (const { name, m } of matrices) {
      lines.push("");
      lines.push(`Matrix: ${name}`);

      // TAB+FRET exact-match check
      if (m.tab.required && m.fret.required) {
        add("TAB+FRET exact match required", validate(m, pcCSharp, SlotType.SHR, undefined, tabPickCSharp, fretPickMatch), "match");
        add("TAB+FRET mismatch must fail", !validate(m, pcCSharp, SlotType.SHR, undefined, tabPickCSharp, fretPickMismatch), "mismatch");
      }

      // Strict vs enharmonic spelling behavior
      if (m.staff.required) {
        add("Black key: spelling matches prompt", validate(m, pcCSharp, SlotType.SHR, staffPickCSharp, m.tab.required ? tabPickCSharp : undefined, m.fret.required ? fretPickMatch : undefined));
        add(
          "Black key: enharmonic spelling",
          policy === "enharmonic"
            ? validate(m, pcCSharp, SlotType.SHR, staffPickDb, m.tab.required ? tabPickCSharp : undefined, m.fret.required ? fretPickMatch : undefined)
            : !validate(m, pcCSharp, SlotType.SHR, staffPickDb, m.tab.required ? tabPickCSharp : undefined, m.fret.required ? fretPickMatch : undefined),
          policy === "enharmonic" ? "should accept" : "should reject",
        );

        add(
          "White key: E# for F",
          policy === "enharmonic"
            ? validate(m, pcF, SlotType.NAT, staffPickEsharp, m.tab.required ? tabPickF : undefined, m.fret.required ? fretPickF : undefined)
            : !validate(m, pcF, SlotType.NAT, staffPickEsharp, m.tab.required ? tabPickF : undefined, m.fret.required ? fretPickF : undefined),
          policy === "enharmonic" ? "should accept" : "strict requires natural",
        );
      }
    }

    const out = lines.join("\n");
    if (devMode3Report) devMode3Report.value = out;
    else console.log(out);
  };

  btnDevRunMode3Strict?.addEventListener("click", () => runMode3MatrixVerification("strict"));
  btnDevRunMode3Enh?.addEventListener("click", () => runMode3MatrixVerification("enharmonic"));

  const syncPaintControlsToState = () => {
    if (!state) return;
    const patch: Partial<DevSettings> = {
      paintEnabled: !!devPaintEnabled?.checked,
      paintPlayerIndex: clamp(Number(devPaintPlayer?.value ?? 0), 0, Math.max(0, state.players.length - 1)),
      paintLane: (devPaintLane?.value as any) ?? "prompt",
      paintMode: (devPaintMode?.value as any) ?? "paint",
    };
    dispatchAndRender({ type: "DEV_SET_PAINT", patch } as Action);
  };

  devPaintEnabled?.addEventListener("change", syncPaintControlsToState);
  devPaintPlayer?.addEventListener("change", syncPaintControlsToState);
  devPaintLane?.addEventListener("change", syncPaintControlsToState);
  devPaintMode?.addEventListener("change", syncPaintControlsToState);


  // Live settings sync: when dropdowns/toggles change, update *visual* surfaces immediately
  // (so UI Mode, Note Visibility, Display Mode, etc. take effect without requiring a restart).
  doc.addEventListener("change", (ev) => {
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    const ds = (target as any).dataset as { setting?: string } | undefined;
    if (!ds?.setting) return;

    const next = buildSettingsFromUi(doc, session) as any;

    // Allow preview even before the first match is started.
    if (!state) {
      if ((target as any).id === "core-gameMode") applyUiModeVisibility(next.uiMode);
      return;
    }

    const cur = state.settings as any;
    cur.uiMode = next.uiMode;
    cur.noteVisibility = next.noteVisibility;
    cur.displayMode = next.displayMode;
    cur.tritoneLabelMode = next.tritoneLabelMode;
    cur.rootNote = next.rootNote;
    cur.modeId = next.modeId;
    cur.chordKind = next.chordKind;
    cur.highlight = next.highlight;

    applyUiModeVisibility(cur.uiMode);
    updatePromptUi();

    if (staffOverlaySvgEl && staffLayout) renderStaffTabOverlay(staffOverlaySvgEl, staffLayout, staffOverlayState);
    syncFretKeypadAvailability();
  });

  // Initialize UI
  syncFretKeypadAvailability();
  updateHighScoresUi(buildSettingsFromUi(doc, session));
  setAlert("Choose Single or Multiplayer to begin");
  showSplash();
}