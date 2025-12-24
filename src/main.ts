import "./style.css";

import { reducer } from "./engineReducer";
import { createUiAdapter, attachBoardPointerHandlers } from "./uiAdapter";
import { renderOverlay } from "./fretboardOverlay";
import { getLeaderboard, recordScore, loadSettings, saveSettings } from "./storage";
import {
  Difficulty,
  MatchType,
  ModeId,
  PlayType,
  GameSettings,
  PlayerProfile,
  GameState,
  Effect,
  PlayerId,
  SlotType,
  VariantId,
} from "./types";
import { variantLabel } from "./music";
import { createChromaticRail, RailMode } from "./rail";
import { describePromptProfileId } from "./promptProfiles";
import { createTabBoard, TabBoardState } from "./tabBoard";

/**
 * GuitarEdu — Shell v1
 * - Title screen: mode / play-type / players / start
 * - Settings modal accessible from title and in-game
 * - Game screen: Mode 1 (fretboard) integrated
 * - Turn timer driven by UI (engine is deterministic)
 */

const app = document.getElementById("app")!;

// Keep UI text aligned with the engine's hint penalty.
const HINT_PENALTY_POINTS_UI = 5;

// ----------------------------
// Base DOM shell (screens + modals)
// ----------------------------

app.innerHTML = `
  <div id="screenTitle" class="screen"></div>
  <div id="screenGame" class="screen hidden"></div>
  <div id="backdrop" class="backdrop hidden"></div>
  <div id="modalSettings" class="modal hidden"></div>
  <div id="modalLeaderboard" class="modal hidden"></div>
`;

const screenTitle = document.getElementById("screenTitle") as HTMLDivElement;
const screenGame = document.getElementById("screenGame") as HTMLDivElement;
const backdrop = document.getElementById("backdrop") as HTMLDivElement;
const modalSettings = document.getElementById("modalSettings") as HTMLDivElement;
const modalLeaderboard = document.getElementById("modalLeaderboard") as HTMLDivElement;

function show(el: HTMLElement, on: boolean) {
  el.classList.toggle("hidden", !on);
}

type ModalId = "settings" | "leaderboard";

function openModal(id: ModalId) {
  show(backdrop, true);
  show(modalSettings, id === "settings");
  show(modalLeaderboard, id === "leaderboard");
}

function closeModals() {
  show(backdrop, false);
  show(modalSettings, false);
  show(modalLeaderboard, false);
}

backdrop.addEventListener("click", () => closeModals());
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
});

// ----------------------------
// Defaults + normalization
// ----------------------------

function defaultSettings(): GameSettings {
  return {
    modeId: ModeId.FRETBOARD,
    playType: PlayType.MULTI,
    matchType: MatchType.BLACKOUT,
    difficulty: Difficulty.MEDIUM,
    fixedRoundsTotal: 3,
    timers: {
      turnMs: 15_000,
      intermissionMs: 900,
    },
    // 24-fret neck + explicit open-string column => 25 columns (frets 0..24).
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
      // Default token bank size (user-requested): 10, with support up to 20.
      tokenCap: 10,
      globalStealOnExhausted: true,
      enharmonicOppositeStealBonus: 5,
      breakConnectMaxTierBonus: 25,
    },
    accessibility: { colorBlindMode: true },
    dev: {
      enabled: false,
      paintPlayerIndex: 0,
      paintLane: "prompt",
      paintMode: "paint",
      forceBonusOnTurnEnd: false,
    },
    promptProfileId: "chromatic",
  };
}

function normalizeSettings(raw: any): GameSettings {
  const d = defaultSettings();
  const s = (raw ?? {}) as Partial<GameSettings>;
  const out: GameSettings = {
    ...d,
    ...s,
    timers: { ...d.timers, ...(s as any).timers },
    domain: { ...d.domain, ...(s as any).domain },
    feedback: { ...d.feedback, ...(s as any).feedback },
    steal: { ...d.steal, ...(s as any).steal },
    accessibility: { ...d.accessibility, ...(s as any).accessibility },
    dev: { ...d.dev, ...(s as any).dev },
  };
  // Consolidate blackout + rounds into a single match flow.
  // (Persisted older settings may still include other match types.)
  out.matchType = MatchType.BLACKOUT;
  out.fixedRoundsTotal = Math.max(1, Math.min(50, Number((out as any).fixedRoundsTotal ?? 1)));
  out.steal.tokenCap = Math.max(0, Math.min(20, Number((out as any).steal?.tokenCap ?? out.steal.tokenCap ?? 10)));
  return out;
}

const PLAYER_MARKS = ["●", "▲", "■", "◆", "✚", "✖", "★", "⬢", "⬣", "⬟", "◐", "◑", "◒", "◓", "◍", "⬤"];

function makePlayers(n: number): PlayerProfile[] {
  const count = Math.max(1, Math.min(16, n));
  const arr: PlayerProfile[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({ id: i, name: `P${i + 1}`, colorId: i, patternId: i });
  }
  return arr;
}

// ----------------------------
// App state
// ----------------------------

type ViewId = "title" | "game";

let view: ViewId = "title";
let settings = normalizeSettings(loadSettings());
let playerProfiles: PlayerProfile[] = makePlayers(settings.playType === PlayType.SINGLE ? 1 : 4);

let state: GameState | null = null;
let pulse: {
  playerId: number;
  variantId: number;
  ghost: { cellIndex: number; slot: number } | null;
  ghosts?: Array<{ cellIndex: number; slot: number }>;
  scoreDelta: number;
} | null = null;

// UI-driven timer
let timerRunning = false;
let timerPaused = false;
let pendingIntermissionMessage: string | null = null;
let lastPulseStartedAt = 0;
let lastPulseDurationMs = 0;
let lastPulseBlocksIntermission = false;
let intermissionShowTimeout: number | null = null;

let turnEndsAt = 0;

// ----------------------------
// Match clock (for leaderboard "time to complete")
// ----------------------------

// Accumulates ONLY active timed-play (turn timers running), excluding intermissions and pauses.
let matchActiveMs = 0;
let activeSegmentStartedAt = 0;

function resetMatchClock() {
  matchActiveMs = 0;
  activeSegmentStartedAt = 0;
}

function accumulateActiveTime(now = performance.now()) {
  if (activeSegmentStartedAt > 0) {
    matchActiveMs += Math.max(0, now - activeSegmentStartedAt);
    activeSegmentStartedAt = 0;
  }
}

function formatDuration(ms?: number): string {
  if (typeof ms !== "number" || !isFinite(ms) || ms < 0) return "—";
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
let pausedRemainingMs = 0;
let rafId: number | null = null;

// Callouts + fire mode
let callout: { text: string; until: number; playerId: PlayerId } | null = null;
const firePlayers = new Set<PlayerId>();

// Base SVG adapter (Mode 1)
let adapter: Awaited<ReturnType<typeof createUiAdapter>> | null = null;
let attachedOverlay: SVGSVGElement | null = null;

// Tab board (Mode 3)
let tabBoard: ReturnType<typeof createTabBoard> | null = null;
const TAB_COLUMNS = 16;
let tabState: TabBoardState = {
  cursor: 0,
  grid: Array.from({ length: 6 }, () => Array.from({ length: TAB_COLUMNS }, () => null as number | null)),
  selectedString: null,
};
let tabFretText = "";
let tabStealMode = false;
let lastTabSubmit: { stringIndex: number; fretIndex: number; steal: boolean } | null = null;

function resetTabForMatch() {
  tabState = {
    cursor: 0,
    grid: Array.from({ length: 6 }, () => Array.from({ length: TAB_COLUMNS }, () => null as number | null)),
    selectedString: null,
  };
  tabFretText = "";
  tabStealMode = false;
  lastTabSubmit = null;
  tabBoard?.setState(tabState);
}

let tabInputDispose: (() => void) | null = null;

function syncTabUiFromState() {
  if (!state) return;
  if (state.settings.modeId !== ModeId.TAB) return;

  tabBoard?.setState(tabState);

  const strEl = document.getElementById("tabDispString");
  const fretEl = document.getElementById("tabDispFret");
  const modeEl = document.getElementById("tabDispMode");
  const btnSteal = document.getElementById("btnTabSteal") as HTMLButtonElement | null;
  const btnEnter = document.getElementById("btnTabEnter") as HTMLButtonElement | null;

  if (strEl) {
    const s = tabState.selectedString;
    strEl.textContent = s === null ? "–" : `${s + 1} (${["e","B","G","D","A","E"][s]})`;
  }

  if (fretEl) fretEl.textContent = tabFretText === "" ? "–" : tabFretText;

  const tokens = state.players[state.currentPlayer].tokenCount;
  if (btnSteal) {
    btnSteal.disabled = tokens <= 0;
    btnSteal.classList.toggle("active", tabStealMode);
  }
  if (modeEl) modeEl.textContent = tabStealMode ? "Steal" : "Normal";

  const maxFret = state.settings.domain.fretCount - 1;
  const fretNum = parseInt(tabFretText, 10);
  const fretOk = Number.isInteger(fretNum) && fretNum >= 0 && fretNum <= maxFret;
  const hasString = tabState.selectedString !== null;
  const hasFret = tabFretText.trim() !== "";
  if (fretEl) fretEl.classList.toggle("invalid", hasFret && !fretOk);
  if (btnEnter) btnEnter.disabled = !(hasString && fretOk);
}

function submitTabAnswer() {
  if (!state) return;
  if (state.settings.modeId !== ModeId.TAB) return;

  const stringIndex = tabState.selectedString;
  const maxFret = state.settings.domain.fretCount - 1;
  const fretIndex = parseInt(tabFretText, 10);

  if (stringIndex === null) return;
  if (!Number.isInteger(fretIndex)) return;
  if (fretIndex < 0 || fretIndex > maxFret) return;

  // Steal attempts require tokens; UI should prevent this, but guard anyway.
  const tokens = state.players[state.currentPlayer].tokenCount;
  const steal = tabStealMode && tokens > 0;

  lastTabSubmit = { stringIndex, fretIndex, steal };
  dispatch({
    type: steal ? "STEAL_CELL" : "TAP_CELL",
    payload: { stringIndex, fretIndex },
  });
}

function attachTabInputHandlers() {
  // Clean up previous listeners (e.g., on re-render)
  tabInputDispose?.();

  const btns = Array.from(document.querySelectorAll<HTMLButtonElement>(".keyBtn"));
  const stealBtn = document.getElementById("btnTabSteal") as HTMLButtonElement | null;
  const enterBtn = document.getElementById("btnTabEnter") as HTMLButtonElement | null;

  const onKey = (key: string) => {
    if (!state || state.settings.modeId !== ModeId.TAB) return;

    if (key === "back") {
      tabFretText = tabFretText.slice(0, -1);
    } else if (key === "clr") {
      tabFretText = "";
    } else {
      // Digits (two-digit frets are enough for 0-24)
      if (tabFretText.length >= 2) return;
      tabFretText = `${tabFretText}${key}`;
    }

    syncTabUiFromState();
  };

  const clickHandlers: Array<() => void> = [];
  for (const b of btns) {
    const h = () => onKey(b.dataset.key || "");
    b.addEventListener("click", h);
    clickHandlers.push(() => b.removeEventListener("click", h));
  }

  const onStealToggle = () => {
    if (!state || state.settings.modeId !== ModeId.TAB) return;
    const tokens = state.players[state.currentPlayer].tokenCount;
    if (tokens <= 0) return;
    tabStealMode = !tabStealMode;
    syncTabUiFromState();
  };
  stealBtn?.addEventListener("click", onStealToggle);

  const onEnter = () => submitTabAnswer();
  enterBtn?.addEventListener("click", onEnter);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!state || state.settings.modeId !== ModeId.TAB) return;
    if (e.key === "Enter") {
      e.preventDefault();
      submitTabAnswer();
      return;
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      onKey("back");
      return;
    }
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      onKey(e.key);
    }
  };
  window.addEventListener("keydown", onKeyDown);

  // Ensure the display reflects the current tab state immediately after mounting.
  syncTabUiFromState();

  tabInputDispose = () => {
    for (const rm of clickHandlers) rm();
    stealBtn?.removeEventListener("click", onStealToggle);
    enterBtn?.removeEventListener("click", onEnter);
    window.removeEventListener("keydown", onKeyDown);
  };
}

function renderTitle() {
  view = "title";
  show(screenTitle, true);
  show(screenGame, false);
  closeModals();

  // If we return to title mid-match, stop timers.
  stopTimer();

  const isSingle = settings.playType === PlayType.SINGLE;
  const playerCount = playerProfiles.length;

  screenTitle.innerHTML = `
    <div class="titleHero">
      <div class="brand">
        <div class="logo">G</div>
        <div>
          <div class="h1">GuitarEdu</div>
          <div class="sub">Smart-board friendly guitar learning games</div>
        </div>
      </div>
      <div class="heroActions">
        <button class="btn" id="btnTitleSettings">Settings</button>
        <button class="btn" id="btnTitleLeaderboard">Leaderboard</button>
      </div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="cardTitle">Game mode</div>
        <div class="modeGrid">
          <button class="modeBtn ${settings.modeId === ModeId.FRETBOARD ? "active" : ""}" data-mode="${ModeId.FRETBOARD}">
            <div class="modeName">Mode 1</div>
            <div class="modeDesc">${settings.modeId === ModeId.TAB ? "Tab note finder" : "Fretboard note finder"}</div>
          </button>
          <button class="modeBtn" disabled>
            <div class="modeName">Mode 2</div>
            <div class="modeDesc">Staff note finder (soon)</div>
          </button>
          <button class="modeBtn ${settings.modeId === ModeId.TAB ? "active" : ""}" data-mode="${ModeId.TAB}">
            <div class="modeName">Mode 3</div>
            <div class="modeDesc">Tab note finder</div>
          </button>
          <button class="modeBtn" disabled>
            <div class="modeName">Mode 4</div>
            <div class="modeDesc">Combined trainer (soon)</div>
          </button>
        </div>
      </div>

      <div class="card">
        <div class="cardTitle">Match setup</div>

        <div class="row">
          <div class="label">Play type</div>
          <div class="seg">
            <button class="segBtn ${isSingle ? "active" : ""}" id="segSingle">Single</button>
            <button class="segBtn ${!isSingle ? "active" : ""}" id="segMulti">Multiplayer</button>
          </div>
        </div>

        <div class="row">
          <div class="label">Players</div>
          <div class="stepper">
            <button class="btn" id="btnPMinus" ${isSingle ? "disabled" : ""}>−</button>
            <div class="stepVal" id="pCount">${playerCount}</div>
            <button class="btn" id="btnPPlus" ${isSingle ? "disabled" : ""}>+</button>
          </div>
        </div>

        <div class="row">
          <div class="label">Difficulty</div>
          <select id="selDifficulty" class="select">
            <option value="${Difficulty.LEARNING}" ${settings.difficulty === Difficulty.LEARNING ? "selected" : ""}>Learning</option>
            <option value="${Difficulty.EASY}" ${settings.difficulty === Difficulty.EASY ? "selected" : ""}>Easy</option>
            <option value="${Difficulty.MEDIUM}" ${settings.difficulty === Difficulty.MEDIUM ? "selected" : ""}>Medium</option>
            <option value="${Difficulty.HARD}" ${settings.difficulty === Difficulty.HARD ? "selected" : ""}>Hard</option>
          </select>
        </div>


        <div class="row" id="rowRounds">
          <div class="label">Rounds</div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn" id="btnRoundsMinus" type="button" style="padding:6px 10px;">−</button>
            <input id="inpRoundsTotal" class="input" type="number" min="1" max="50" value="${settings.fixedRoundsTotal}" style="width:90px;" />
            <button class="btn" id="btnRoundsPlus" type="button" style="padding:6px 10px;">+</button>
          </div>
        </div>

        <div class="row" style="align-items:flex-start;">
          <div class="label">Player names</div>
          <div class="names" id="names"></div>
        </div>

        <div class="row" style="justify-content:flex-end; gap:10px;">
          <button class="btn primary" id="btnStart">Start</button>
        </div>
      </div>
    </div>
  `;

  // names list
  const namesEl = document.getElementById("names")!;
  namesEl.innerHTML = playerProfiles
    .map(
      (p, i) => `
      <div class="nameRow">
        <div class="badge" aria-hidden="true">${settings.accessibility.colorBlindMode ? PLAYER_MARKS[p.patternId % PLAYER_MARKS.length] : ""}</div>
        <input class="input" data-pid="${p.id}" value="${escapeHtml(p.name)}" />
      </div>`
    )
    .join("");

  // events
  document.getElementById("btnTitleSettings")!.addEventListener("click", () => {
    renderSettingsModal();
    openModal("settings");
  });
  document.getElementById("btnTitleLeaderboard")!.addEventListener("click", () => {
    renderLeaderboardModal();
    openModal("leaderboard");
  });

  // Mode selection
  screenTitle.querySelectorAll<HTMLButtonElement>(".modeBtn[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const raw = btn.dataset.mode;
      if (!raw) return;
      settings.modeId = raw as ModeId;
      saveSettings(settings);
      renderTitle();
    });
  });

  document.getElementById("segSingle")!.addEventListener("click", () => {
    settings.playType = PlayType.SINGLE;
    playerProfiles = makePlayers(1);
    saveSettings(settings);
    renderTitle();
  });
  document.getElementById("segMulti")!.addEventListener("click", () => {
    settings.playType = PlayType.MULTI;
    if (playerProfiles.length < 2) playerProfiles = makePlayers(4);
    saveSettings(settings);
    renderTitle();
  });

  const btnMinus = document.getElementById("btnPMinus") as HTMLButtonElement;
  const btnPlus = document.getElementById("btnPPlus") as HTMLButtonElement;
  btnMinus?.addEventListener("click", () => {
    const n = Math.max(2, playerProfiles.length - 1);
    playerProfiles = playerProfiles.slice(0, n);
    renderTitle();
  });
  btnPlus?.addEventListener("click", () => {
    const n = Math.min(16, playerProfiles.length + 1);
    playerProfiles = makePlayers(n).map((p, i) => ({ ...p, name: playerProfiles[i]?.name ?? p.name }));
    renderTitle();
  });

  const selDifficulty = document.getElementById("selDifficulty") as HTMLSelectElement;
  selDifficulty.addEventListener("change", () => {
    settings.difficulty = selDifficulty.value as Difficulty;
    saveSettings(settings);
  });

  const inpRoundsTotal = document.getElementById("inpRoundsTotal") as HTMLInputElement | null;
  const btnRoundsMinus = document.getElementById("btnRoundsMinus") as HTMLButtonElement | null;
  const btnRoundsPlus = document.getElementById("btnRoundsPlus") as HTMLButtonElement | null;
  const clampRounds = (n: number) => Math.max(1, Math.min(50, n));

  if (inpRoundsTotal) {
    const apply = (n: number) => {
      const v = clampRounds(n);
      inpRoundsTotal.value = String(v);
      settings.fixedRoundsTotal = v;
      saveSettings(settings);
    };

    inpRoundsTotal.addEventListener("change", () => apply(Number(inpRoundsTotal.value)));
    inpRoundsTotal.addEventListener("input", () => {
      // Allow typing; we clamp on change.
    });

    btnRoundsMinus?.addEventListener("click", () => apply(Number(inpRoundsTotal.value) - 1));
    btnRoundsPlus?.addEventListener("click", () => apply(Number(inpRoundsTotal.value) + 1));
  }


  // name edits
  namesEl.querySelectorAll<HTMLInputElement>("input[data-pid]").forEach((inp) => {
    inp.addEventListener("input", () => {
      const id = Number(inp.dataset.pid);
      const p = playerProfiles.find((x) => x.id === id);
      if (p) p.name = inp.value.slice(0, 16);
    });
  });

  document.getElementById("btnStart")!.addEventListener("click", () => {
    // Ensure settings persisted.
    saveSettings(settings);
    startMatch();
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

// ----------------------------
// Rendering: settings modal
// ----------------------------

function renderSettingsModal() {
  // Decompose the prompt profile into UI fields.
  const raw = (settings.promptProfileId || "chromatic").trim();
  const lower = raw.toLowerCase();
  let kind: "chromatic" | "accidentals" | "key" | "scale" = "chromatic";
  let root = "C";
  let mode: "maj" | "min" = "maj";
  let pref: "auto" | "sharps" | "flats" = "auto";
  let accMode: "both" | "sharps" | "flats" = "both";

  if (lower.startsWith("accidentals")) {
    kind = "accidentals";
    const p = raw.split(":");
    const suff = (p[1] || "").toLowerCase();
    accMode = suff === "flats" ? "flats" : suff === "sharps" ? "sharps" : "both";
  } else if (!lower.startsWith("chromatic")) {
    const p = raw.split(":");
    kind = (p[0] as any) || "chromatic";
    root = p[1] || "C";
    mode = (p[2] as any) || "maj";
    pref = ((p[3] as any) || "auto") === "flats" ? "flats" : ((p[3] as any) || "auto") === "sharps" ? "sharps" : "auto";
  }

  const rootOpts = [
    "C","C#","Db","D","D#","Eb","E","F","F#","Gb","G","G#","Ab","A","A#","Bb","B",
  ];

  const displayedMaxFret = Math.max(0, Number(settings.domain.fretCount || 25) - 1);
  const displayedPreset = displayedMaxFret <= 5 ? 5 : displayedMaxFret <= 12 ? 12 : 24;

  modalSettings.innerHTML = `
    <div class="modalHead">
      <div class="modalTitle">Settings</div>
      <button class="btn" id="btnCloseSettings">Close</button>
    </div>
    <div class="modalBody">
      <div class="formGrid">
        <div class="row">
          <div class="label">Turn timer (seconds)</div>
          <input class="input" id="inpTurn" type="number" min="3" max="120" value="${Math.round(settings.timers.turnMs / 1000)}" />
        </div><div class="row">
          <div class="label">Displayed frets</div>
          <select class="input" id="selFretView">
            <option value="5" ${displayedPreset === 5 ? "selected" : ""}>0–5 (6 frets)</option>
            <option value="12" ${displayedPreset === 12 ? "selected" : ""}>0–12 (13 frets)</option>
            <option value="24" ${displayedPreset === 24 ? "selected" : ""}>0–24 (25 frets)</option>
          </select>
        </div>
        <div class="row">
          <div class="label">Active range min fret</div>
          <input class="input" id="inpMinFret" type="number" min="0" max="${displayedMaxFret}" value="${settings.domain.minFret}" />
        </div>
        <div class="row">
          <div class="label">Active range max fret</div>
          <input class="input" id="inpMaxFret" type="number" min="0" max="${displayedMaxFret}" value="${settings.domain.maxFret}" />
        </div>

        <div class="row">
          <div class="label">Prompt profile</div>
          <select class="input" id="selProfileKind">
            <option value="chromatic" ${kind === "chromatic" ? "selected" : ""}>Chromatic (all notes)</option>
            <option value="accidentals" ${kind === "accidentals" ? "selected" : ""}>Accidentals only (sharps/flats)</option>
            <option value="key" ${kind === "key" ? "selected" : ""}>Key (diatonic)</option>
            <option value="scale" ${kind === "scale" ? "selected" : ""}>Scale (diatonic)</option>
          </select>
        </div>

        <div class="row" id="rowAccMode">
          <div class="label">Accidentals lane</div>
          <select class="input" id="selAccMode">
            <option value="both" ${accMode === "both" ? "selected" : ""}>Both (♯ and ♭)</option>
            <option value="sharps" ${accMode === "sharps" ? "selected" : ""}>Sharps only</option>
            <option value="flats" ${accMode === "flats" ? "selected" : ""}>Flats only</option>
          </select>
        </div>

        <div class="row" id="rowRoot">
          <div class="label">Root</div>
          <select class="input" id="selRoot">
            ${rootOpts.map(r => `<option value="${r}" ${r === root ? "selected" : ""}>${r}</option>`).join("")}
          </select>
        </div>
        <div class="row" id="rowMode">
          <div class="label">Mode</div>
          <select class="input" id="selMode">
            <option value="maj" ${mode === "maj" ? "selected" : ""}>Major</option>
            <option value="min" ${mode === "min" ? "selected" : ""}>Minor</option>
          </select>
        </div>
        <div class="row" id="rowPref">
          <div class="label">Spelling preference</div>
          <select class="input" id="selPref">
            <option value="auto" ${pref === "auto" ? "selected" : ""}>Auto</option>
            <option value="sharps" ${pref === "sharps" ? "selected" : ""}>Sharps</option>
            <option value="flats" ${pref === "flats" ? "selected" : ""}>Flats</option>
          </select>
        </div>

        <div class="row">
          <div class="label">Steal token cap</div>
          <input class="input" id="inpCap" type="number" min="0" max="20" value="${settings.steal.tokenCap}" />
        </div>
        <div class="row">
          <div class="label">Color-blind mode</div>
          <label class="chk"><input id="chkCB" type="checkbox" ${settings.accessibility.colorBlindMode ? "checked" : ""}/> On (recommended)</label>
        </div>
        <div class="row">
          <div class="label">Show-after-miss (SAM)</div>
          <label class="chk"><input id="chkSAM" type="checkbox" ${settings.feedback.samEnabled ? "checked" : ""}/> Enabled</label>
        </div>
        <div class="row">
          <div class="label">SAM reveal</div>
          <select class="input" id="selSAMMode">
            <option value="single" ${settings.feedback.samRevealMode !== "all" ? "selected" : ""}>Single target</option>
            <option value="all" ${settings.feedback.samRevealMode === "all" ? "selected" : ""}>All targets</option>
          </select>
        </div>
        <div class="row">
          <div class="label">SAM duration (ms)</div>
          <input class="input" id="inpSAM" type="number" min="100" max="2500" value="${settings.feedback.samDurationMs}" />
        </div>
        <div class="row">
          <div class="label">Dev/Test mode</div>
          <label class="chk"><input id="chkDev" type="checkbox" ${settings.dev.enabled ? "checked" : ""} ${view === "title" ? "" : "disabled"}/> Enabled</label>
        </div>
      </div>
      <div class="hint">
        <b>UI note:</b> The top rail blacks out notes not in the selected key/scale to remove ambiguity.
      </div>
    </div>
  `;

  const inpTurn = document.getElementById("inpTurn") as HTMLInputElement;
  const selFretView = document.getElementById("selFretView") as HTMLSelectElement;
  const inpMinFret = document.getElementById("inpMinFret") as HTMLInputElement;
  const inpMaxFret = document.getElementById("inpMaxFret") as HTMLInputElement;
  const inpCap = document.getElementById("inpCap") as HTMLInputElement;
  const chkCB = document.getElementById("chkCB") as HTMLInputElement;
  const chkSAM = document.getElementById("chkSAM") as HTMLInputElement;
  const selSAMMode = document.getElementById("selSAMMode") as HTMLSelectElement;
  const inpSAM = document.getElementById("inpSAM") as HTMLInputElement;
  const chkDev = document.getElementById("chkDev") as HTMLInputElement;
  const selKind = document.getElementById("selProfileKind") as HTMLSelectElement;
  const selAccMode = document.getElementById("selAccMode") as HTMLSelectElement;
  const selRoot = document.getElementById("selRoot") as HTMLSelectElement;
  const selMode = document.getElementById("selMode") as HTMLSelectElement;
  const selPref = document.getElementById("selPref") as HTMLSelectElement;
  const rowAccMode = document.getElementById("rowAccMode") as HTMLElement;
  const rowRoot = document.getElementById("rowRoot") as HTMLElement;
  const rowMode = document.getElementById("rowMode") as HTMLElement;
  const rowPref = document.getElementById("rowPref") as HTMLElement;

  const syncVisibility = () => {
    const k = selKind.value;
    rowAccMode.style.display = k === "accidentals" ? "grid" : "none";
    const showKey = k === "key" || k === "scale";
    rowRoot.style.display = showKey ? "grid" : "none";
    rowMode.style.display = showKey ? "grid" : "none";
    rowPref.style.display = showKey ? "grid" : "none";
  };

  const apply = () => {
    const prevDomain = { ...settings.domain };
    const maxFretVisible = Math.max(0, Math.min(24, Number(selFretView.value) || 24));
    settings.domain.fretCount = maxFretVisible + 1;
    // Keep range inputs constrained to the visible fret span.
    inpMinFret.max = String(maxFretVisible);
    inpMaxFret.max = String(maxFretVisible);
    settings.domain.maxFret = Math.max(0, Math.min(maxFretVisible, Number(inpMaxFret.value) || maxFretVisible));
    settings.domain.minFret = Math.max(0, Math.min(settings.domain.maxFret, Number(inpMinFret.value) || 0));

    settings.timers.turnMs = Math.max(3, Math.min(120, Number(inpTurn.value) || 15)) * 1000;
    settings.timers.intermissionMs = 0;
    settings.steal.tokenCap = Math.max(0, Math.min(20, Number(inpCap.value) || 10));
    settings.accessibility.colorBlindMode = !!chkCB.checked;
    settings.feedback.samEnabled = !!chkSAM.checked;
    settings.feedback.samRevealMode = selSAMMode.value === "all" ? "all" : "single";
    settings.feedback.samDurationMs = Math.max(100, Math.min(2500, Number(inpSAM.value) || 900));

    // Dev/Test mode can only be enabled before starting a match (Title screen).
    if (view === "title") settings.dev.enabled = chkDev.checked;

    const k = selKind.value;
    if (k === "chromatic") {
      settings.promptProfileId = "chromatic";
    } else if (k === "accidentals") {
      const m = selAccMode.value;
      settings.promptProfileId = m === "both" ? "accidentals" : `accidentals:${m}`;
    } else {
      const r = selRoot.value;
      const md = selMode.value;
      const pf = selPref.value;
      settings.promptProfileId = `${k}:${r}:${md}${pf && pf !== "auto" ? `:${pf}` : ""}`;
    }

    saveSettings(settings);
    // In-game, domain changes need a reset (board dimensions + active range).
    const domainChanged = prevDomain.fretCount !== settings.domain.fretCount
      || prevDomain.minFret !== settings.domain.minFret
      || prevDomain.maxFret !== settings.domain.maxFret;

    if (view === "game") {
      if (domainChanged) startMatch();
      else {
        dispatch({ type: "UPDATE_SETTINGS", settings });
        paint();
      }
    }
  };

  syncVisibility();

  const listeners = [
    inpTurn,
    selFretView,
    inpMinFret,
    inpMaxFret,
    inpCap,
    chkCB,
    chkSAM,
    selSAMMode,
    inpSAM,
    chkDev,
    selKind,
    selAccMode,
    selRoot,
    selMode,
    selPref,
  ];
  listeners.forEach((el) => {
    // Some controls (notably checkboxes/selects) may only emit "change" reliably depending on browser settings.
    el.addEventListener("input", () => { syncVisibility(); apply(); });
    el.addEventListener("change", () => { syncVisibility(); apply(); });
  });

  // Ensure any pending selections are committed even if no event fired before closing.
  document.getElementById("btnCloseSettings")!.addEventListener("click", () => {
    syncVisibility();
    apply();
    closeModals();
  });
}

// ----------------------------
// Rendering: leaderboard modal
// ----------------------------

function renderLeaderboardModal() {
  const lb = getLeaderboard(settings);
  modalLeaderboard.innerHTML = `
    <div class="modalHead">
      <div class="modalTitle">Leaderboard</div>
      <button class="btn" id="btnCloseLB">Close</button>
    </div>
    <div class="modalBody">
      <div class="small">Profile: <b>${settings.playType === PlayType.SINGLE ? "Single" : "Multi"}</b> · Mode <b>${settings.modeId}</b> · ${settings.promptProfileId}</div>
      <div class="lbList">${
        lb.length
          ? lb
              .slice(0, 20)
              .map((e, i) => `
                <div class="lbRow">
                  <div>${i + 1}.</div>
                  <div>${escapeHtml(e.name)}</div>
                  <div class="lbScore">${e.score}</div>
                  <div class="lbTime">${formatDuration(e.durationMs)}</div>
                </div>
              `)
              .join("")
          : `<div class="muted">No scores yet.</div>`
      }</div>
    </div>
  `;
  document.getElementById("btnCloseLB")!.addEventListener("click", () => closeModals());
}

// ----------------------------
// Game screen + engine bridge
// ----------------------------

let baseSvg!: SVGSVGElement;
let overlaySvg!: SVGSVGElement;
let intermissionEl!: HTMLElement;
let interTitleEl!: HTMLElement;
let interTextEl!: HTMLElement;
let calloutEl!: HTMLElement;
let promptEl!: HTMLElement;
let modeTitleEl: HTMLElement | null = null;
// NOTE: timerEl is only available after the game screen mounts.
// The title screen calls stopTimer() on boot, so this must be nullable.
let timerEl: HTMLElement | null = null;
let scoreStripEl!: HTMLElement;
let statsEl!: HTMLElement;
let activePlayerCardEl: HTMLElement | null = null;
let phasePillEl: HTMLElement | null = null;
let turnInfoEl: HTMLElement | null = null;
let mechanicsDockEl: HTMLElement | null = null;
let devToolsEl: HTMLElement | null = null;
let selDevPaintPlayer: HTMLSelectElement | null = null;
let selDevPaintLane: HTMLSelectElement | null = null;
let selDevPaintMode: HTMLSelectElement | null = null;
let selDevForcePhase: HTMLSelectElement | null = null;
let chkDevForceBonus: HTMLInputElement | null = null;

// ----------------------------
// Contextual input panel (right column)
// ----------------------------
type CtxTabId = "numbers" | "notes" | "chords" | "scales" | "intervals";
let ctxTab: CtxTabId = "notes";
let ctxSelectedNote: string | null = null;
let ctxSelectedChordQuality: string | null = null;
let ctxSelectedScaleType: string | null = null;
let ctxSelectedInterval: string | null = null;

// Chromatic rail (notes/interval compass + reference)
let rail: ReturnType<typeof createChromaticRail> | null = null;
let railMountEl: HTMLElement | null = null;

function pcFromNoteName(name: string): number | null {
  const n = name.trim().toUpperCase().replace("♯", "#").replace("♭", "B");
  const map: Record<string, number> = {
    C: 0, "C#": 1, DB: 1,
    D: 2, "D#": 3, EB: 3,
    E: 4,
    F: 5, "F#": 6, GB: 6,
    G: 7, "G#": 8, AB: 8,
    A: 9, "A#": 10, BB: 10,
    B: 11,
  };
  return map[n] ?? null;
}

function anchorVariantFromProfileId(profileId: string): VariantId {
  const raw = (profileId || "").trim();
  const lower = raw.toLowerCase();
  if (!raw || lower === "chromatic" || lower.startsWith("chromatic:") || lower === "accidentals" || lower.startsWith("accidentals:")) {
    // Default anchor for chromatic view (unused in ROTATE_COMPASS).
    return (0 * 3 + SlotType.NAT) as VariantId; // C
  }
  const parts = raw.split(":").map(s => s.trim());
  const rootName = parts[1] || "C";
  const pc = pcFromNoteName(rootName) ?? 0;
  const hasFlat = rootName.toLowerCase().includes("b");
  const hasSharp = rootName.includes("#") || rootName.includes("♯");
  const slot = hasFlat ? SlotType.FLT : hasSharp ? SlotType.SHR : SlotType.NAT;
  return (pc * 3 + slot) as VariantId;
}

function applyCtxTab(active: CtxTabId) {
  const card = document.getElementById("ctxInputCard");
  if (!card) return;

  const btns = Array.from(card.querySelectorAll<HTMLButtonElement>(".geTabs .segBtn"));
  for (const b of btns) {
    const tab = (b.dataset.tab || "") as CtxTabId;
    const on = tab === active;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
  }

  const panels = Array.from(card.querySelectorAll<HTMLElement>(".ctxPanel"));
  for (const p of panels) {
    const tab = (p.dataset.tab || "") as CtxTabId;
    p.classList.toggle("hidden", tab !== active);
  }
}

function setupCtxInputPanel() {
  const card = document.getElementById("ctxInputCard");
  if (!card) return;

  const btns = Array.from(card.querySelectorAll<HTMLButtonElement>(".geTabs .segBtn"));
  for (const b of btns) {
    b.addEventListener("click", () => {
      const next = (b.dataset.tab || "notes") as CtxTabId;
      ctxTab = next;
      applyCtxTab(ctxTab);
    });
  }

  // Note picker
  const noteLabel = document.getElementById("ctxNotePick");
  const noteBtns = Array.from(card.querySelectorAll<HTMLButtonElement>(".noteBtn"));
  for (const nb of noteBtns) {
    nb.addEventListener("click", () => {
      const n = nb.dataset.note || null;
      ctxSelectedNote = (ctxSelectedNote === n) ? null : n;
      if (noteLabel) noteLabel.textContent = ctxSelectedNote ?? "—";
      for (const other of noteBtns) {
        other.classList.toggle("active", (other.dataset.note || null) === ctxSelectedNote);
      }
    });
  }
  if (noteLabel) noteLabel.textContent = ctxSelectedNote ?? "—";

  // Chord picker
  const chordLabel = document.getElementById("ctxChordPick");
  const chordBtns = Array.from(card.querySelectorAll<HTMLButtonElement>(".pillBtn[data-chord]"));
  for (const cb of chordBtns) {
    cb.addEventListener("click", () => {
      const q = cb.dataset.chord || null;
      ctxSelectedChordQuality = (ctxSelectedChordQuality === q) ? null : q;
      if (chordLabel) chordLabel.textContent = ctxSelectedChordQuality ?? "—";
      for (const other of chordBtns) {
        other.classList.toggle("active", (other.dataset.chord || null) === ctxSelectedChordQuality);
      }
    });
  }
  if (chordLabel) chordLabel.textContent = ctxSelectedChordQuality ?? "—";

  // Scale picker
  const scaleLabel = document.getElementById("ctxScalePick");
  const scaleBtns = Array.from(card.querySelectorAll<HTMLButtonElement>(".pillBtn[data-scale]"));
  for (const sb of scaleBtns) {
    sb.addEventListener("click", () => {
      const s = sb.dataset.scale || null;
      ctxSelectedScaleType = (ctxSelectedScaleType === s) ? null : s;
      if (scaleLabel) scaleLabel.textContent = ctxSelectedScaleType ?? "—";
      for (const other of scaleBtns) {
        other.classList.toggle("active", (other.dataset.scale || null) === ctxSelectedScaleType);
      }
    });
  }
  if (scaleLabel) scaleLabel.textContent = ctxSelectedScaleType ?? "—";

  // Interval picker
  const intLabel = document.getElementById("ctxIntervalPick");
  const intBtns = Array.from(card.querySelectorAll<HTMLButtonElement>(".pillBtn[data-interval]"));
  for (const ib of intBtns) {
    ib.addEventListener("click", () => {
      const i = ib.dataset.interval || null;
      ctxSelectedInterval = (ctxSelectedInterval === i) ? null : i;
      if (intLabel) intLabel.textContent = ctxSelectedInterval ?? "—";
      for (const other of intBtns) {
        other.classList.toggle("active", (other.dataset.interval || null) === ctxSelectedInterval);
      }
    });
  }
  if (intLabel) intLabel.textContent = ctxSelectedInterval ?? "—";

  // Default tab focus
  if (settings.modeId === ModeId.TAB) ctxTab = "numbers";
  applyCtxTab(ctxTab);
}

function renderGameShell() {
  view = "game";
  show(screenTitle, false);
  show(screenGame, true);
  closeModals();

  screenGame.innerHTML = `
    <div class=\"geHeader\">
      <div class=\"geHeaderLeft\">
        <div class=\"geLogoBox\" aria-label=\"GuitarEdu\">LOGO</div>
      </div>

      <div class=\"geHeaderCenter\">
        <div class=\"geModeTitle\" id=\"modeTitle\">—</div>
      </div>

      <div class=\"geHeaderRight\">
        <button class=\"btn\" id=\"btnBack\" title=\"Return to title\">Menu</button>
        <button class=\"btn\" id=\"btnGameLB\" title=\"Leaderboard\">Leaderboard</button>
        <button class=\"iconBtn\" id=\"btnGameSettings\" title=\"Settings\" aria-label=\"Settings\">⚙</button>
      </div>
    </div>

    <div class=\"gePlayerStrip\">
      <div class=\"scoreStrip\" id=\"scoreStrip\"></div>
    </div>

    <div class=\"geLeft\">
      <div class=\"geCard\">
        <div class=\"geCardTitle\">Task</div>
        <div class=\"geTabRow\" role=\"tablist\" aria-label=\"Task tabs\">
          <button class=\"segBtn active\" id=\"leftTabMain\" role=\"tab\">Main</button>
          <button class=\"segBtn\" id=\"leftTabDisplay\" role=\"tab\">Display</button>
          <button class=\"segBtn\" id=\"leftTabMisc\" role=\"tab\">Misc</button>
        </div>

        <div class=\"geStack\" id=\"leftTabContent\">
          <div class=\"row\" style=\"padding-top:0;\">
            <div class=\"label\">Difficulty</div>
            <select class=\"select\" id=\"selDifficultyInline\">
              <option value=\"learning\" ${settings.difficulty === Difficulty.LEARNING ? "selected" : ""}>Learning</option>
              <option value=\"easy\" ${settings.difficulty === Difficulty.EASY ? "selected" : ""}>Easy</option>
              <option value=\"medium\" ${settings.difficulty === Difficulty.MEDIUM ? "selected" : ""}>Medium</option>
              <option value=\"hard\" ${settings.difficulty === Difficulty.HARD ? "selected" : ""}>Hard</option>
            </select>
          </div>

          <div class=\"row\">
            <div class=\"label\">Fret range</div>
            <div class=\"small muted\">Use Settings → Domain for now</div>
          </div>

          <div class=\"row\">
            <div class=\"label\">Notes / Intervals</div>
            <div class=\"small muted\">Use Settings → Feedback for now</div>
          </div>

          <div class=\"small muted\" style=\"margin-top:6px;\">
            This panel is the permanent home for in-game controls. We will progressively migrate options out of Settings.
          </div>
        </div>
      </div>

      <div class=\"geCard\">
        <div class=\"geCardTitle\">Info Panel A</div>
        <div class=\"small\" id=\"leftInfoText\">Round alerts, bonus prompts, and contextual tips will live here.</div>
      </div>
    </div>

    <div class=\"geCenter\">
      <div class=\"geCard geStaffCard\">
        <div class=\"geStaffTop\">
          <div class=\"prompt\" id=\"prompt\">—</div>
        </div>
        <div class=\"geStaffFrame\">
          <img class=\"geStaffImg\" src=\"/Guitar_Tab_Staff-Blank.svg\" alt=\"Staff and tab\" />
        </div>
      </div>

      <div class=\"geCard geRailCard\">
        <div id=\"railMount\" class=\"railMount\"></div>
      </div>

      <div class=\"geCard geFretCard\">
        <div class=\"boardWrap ${settings.modeId === ModeId.TAB ? "tabMode" : ""}\">
          <svg id=\"baseSvg\" viewBox=\"0 0 1458 342\" aria-label=\"Fretboard base\"></svg>
          <svg id=\"overlaySvg\" class=\"overlay\" viewBox=\"0 0 1458 342\" aria-label=\"Overlay\"></svg>

          <div id=\"tabLayer\" class=\"tabLayer ${settings.modeId === ModeId.TAB ? "" : "hidden"}\">
            <div id=\"tabMount\" class=\"tabMount\"></div>
          </div>

          <div id=\"callout\" class=\"callout hidden\"></div>

          <div id=\"intermission\" class=\"intermission\">
            <div class=\"card\">
              <div id=\"interTitle\" style=\"font-size:18px; font-weight:700; margin-bottom:6px;\">Next player</div>
              <div class=\"small\" id=\"interText\">—</div>
              <div style=\"margin-top:10px;\" class=\"btnrow\">
                <button class=\"btn primary\" id=\"btnNextTurn\">Ready</button>
                <button class=\"btn\" id=\"btnInterAlt\" style=\"display:none; margin-left:8px;\">—</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class=\"geRight\">
      <div class=\"geCard activePlayerShell\">
        <div id=\"activePlayerCard\"></div>
        <div class=\"activeTimerOverlay\" id=\"timer\">—</div>
      </div>

      <div class=\"geCard geContextInput\" id=\"ctxInputCard\">
        <div class=\"geCardTitle\">Input</div>

        <div class=\"geTabs\" role=\"tablist\" aria-label=\"Input panels\">
          <button class=\"segBtn\" id=\"ctxTabNumbers\" data-tab=\"numbers\" role=\"tab\">Numbers</button>
          <button class=\"segBtn\" id=\"ctxTabNotes\" data-tab=\"notes\" role=\"tab\">Notes</button>
          <button class=\"segBtn\" id=\"ctxTabChords\" data-tab=\"chords\" role=\"tab\">Chords</button>
          <button class=\"segBtn\" id=\"ctxTabScales\" data-tab=\"scales\" role=\"tab\">Scales</button>
          <button class=\"segBtn\" id=\"ctxTabIntervals\" data-tab=\"intervals\" role=\"tab\">Intervals</button>
        </div>

        <div class=\"ctxPanels\">
          <div class=\"ctxPanel\" id=\"ctxPanelNumbers\" data-tab=\"numbers\">
            <div class=\"small muted\" style=\"margin-bottom:8px;\">For Tab / Combined modes: select a string line, enter a fret, press Enter.</div>
            <div class=\"tabDisp\">
              <div class=\"tabDispRow\"><span class=\"small\">String</span><span id=\"tabDispString\" class=\"tabValue\">—</span></div>
              <div class=\"tabDispRow\"><span class=\"small\">Fret</span><span id=\"tabDispFret\" class=\"tabValue\">—</span></div>
              <div class=\"small\" id=\"tabDispMode\">Normal</div>
            </div>
            <div class=\"keypad\" id=\"tabKeypad\">
              <button class=\"keyBtn\" data-key=\"1\">1</button>
              <button class=\"keyBtn\" data-key=\"2\">2</button>
              <button class=\"keyBtn\" data-key=\"3\">3</button>
              <button class=\"keyBtn\" data-key=\"4\">4</button>
              <button class=\"keyBtn\" data-key=\"5\">5</button>
              <button class=\"keyBtn\" data-key=\"6\">6</button>
              <button class=\"keyBtn\" data-key=\"7\">7</button>
              <button class=\"keyBtn\" data-key=\"8\">8</button>
              <button class=\"keyBtn\" data-key=\"9\">9</button>
              <button class=\"keyBtn\" data-key=\"clr\">Clear</button>
              <button class=\"keyBtn\" data-key=\"0\">0</button>
              <button class=\"keyBtn\" data-key=\"back\">⌫</button>
            </div>
            <div class=\"btnrow\" style=\"justify-content:space-between; margin-top:10px;\">
              <button class=\"btn btnToggle\" id=\"btnTabSteal\" disabled>Steal</button>
              <button class=\"btn primary\" id=\"btnTabEnter\">Enter</button>
            </div>
          </div>

          <div class=\"ctxPanel\" id=\"ctxPanelNotes\" data-tab=\"notes\">
            <div class=\"ctxRow\">
              <div class=\"small muted\">Pick a note name (individual sharps/flats supported).</div>
              <div class=\"small\">Selected: <span id=\"ctxNotePick\" class=\"tabValue\">—</span></div>
            </div>
            <div class=\"noteGrid\" id=\"ctxNoteGrid\">
              ${["C","D","E","F","G","A","B"].map(n => `<button class=\"noteBtn\" data-note=\"${n}\">${n}</button>`).join("")}
              ${["C#","D#","F#","G#","A#"].map(n => `<button class=\"noteBtn\" data-note=\"${n}\">${n}</button>`).join("")}
              ${["Db","Eb","Gb","Ab","Bb"].map(n => `<button class=\"noteBtn\" data-note=\"${n}\">${n}</button>`).join("")}
            </div>
            <div class=\"small muted\" style=\"margin-top:8px;\">Future: this will drive Staff/Tab entry + bonus-stage chord/scale validation.</div>
          </div>

          <div class=\"ctxPanel\" id=\"ctxPanelChords\" data-tab=\"chords\">
            <div class=\"ctxRow\">
              <div class=\"small muted\">Chord quality / shape selection.</div>
              <div class=\"small\">Selected: <span id=\"ctxChordPick\" class=\"tabValue\">—</span></div>
            </div>
            <div class=\"pillGrid\">
              ${["Major","Minor","Triad","Dom7","Maj7","Min7","Dim","HalfDim","Aug","Sus2","Sus4"].map(q => `<button class=\"pillBtn\" data-chord=\"${q}\">${q}</button>`).join("")}
            </div>
            <div class=\"small muted\" style=\"margin-top:8px;\">Bonus stage will only trigger when a playable chord shape exists.</div>
          </div>

          <div class=\"ctxPanel\" id=\"ctxPanelScales\" data-tab=\"scales\">
            <div class=\"ctxRow\">
              <div class=\"small muted\">Scale / mode selection.</div>
              <div class=\"small\">Selected: <span id=\"ctxScalePick\" class=\"tabValue\">—</span></div>
            </div>
            <div class=\"pillGrid\">
              ${["Major","Nat Minor","Harm Minor","Mel Minor","Dorian","Phrygian","Lydian","Mixolydian","Locrian","Maj Penta","Min Penta","Blues"].map(s => `<button class=\"pillBtn\" data-scale=\"${s}\">${s}</button>`).join("")}
            </div>
            <div class=\"small muted\" style=\"margin-top:8px;\">We will exclude Chromatic from bonus-stage scale validation.</div>
          </div>

          <div class=\"ctxPanel\" id=\"ctxPanelIntervals\" data-tab=\"intervals\">
            <div class=\"ctxRow\">
              <div class=\"small muted\">Interval building blocks (for chords, progressions, or drills).</div>
              <div class=\"small\">Selected: <span id=\"ctxIntervalPick\" class=\"tabValue\">—</span></div>
            </div>
            <div class=\"pillGrid\">
              ${["1","b2","2","b3","3","4","#4/b5","5","#5/b6","6","b7","7","8"].map(i => `<button class=\"pillBtn\" data-interval=\"${i}\">${i}</button>`).join("")}
            </div>
          </div>
        </div>
      </div>

      <div class=\"geCard\">
        <div class=\"btnrow\">
          <button class=\"btn primary\" id=\"btnStartTurn\">Start</button>
          <button class=\"btn\" id=\"btnPause\">Pause</button>
          ${(settings.difficulty === Difficulty.EASY || settings.difficulty === Difficulty.LEARNING) && settings.modeId !== ModeId.TAB ? `<button class=\"btn\" id=\"btnHint\" title=\"Reveal a correct target and end your turn (-${HINT_PENALTY_POINTS_UI} points)\">Hint (-${HINT_PENALTY_POINTS_UI})</button>` : ""}
          <button class=\"btn\" id=\"btnReset\">Reset</button>
          <button class=\"btn danger\" id=\"btnEnd\">End</button>
        </div>

        <hr class=\"${settings.dev.enabled ? "" : "hidden"}\" />
        <div class=\"kv small ${settings.dev.enabled ? "" : "hidden"}\" id=\"stats\"></div>

        <hr class=\"${settings.dev.enabled ? "" : "hidden"}\" />
        <div class=\"card ${settings.dev.enabled ? "" : "hidden"}\" id=\"devTools\">
          <div class=\"cardTitle\">Dev/Test</div>
          <div class=\"small\" style=\"margin-bottom:8px;\">Click the board to paint claims. Hold <b>Shift</b> to erase.</div>
          <div class=\"formGrid\">
            <label>Paint player</label>
            <select id=\"selDevPaintPlayer\">
              ${Array.from({ length: playerProfiles.length }, (_, i) => `<option value=\"${i}\" ${i === settings.dev.paintPlayerIndex ? "selected" : ""}>P${i + 1}</option>`).join("")}
            </select>

            <label>Lane</label>
            <select id=\"selDevPaintLane\">
              <option value=\"prompt\" ${settings.dev.paintLane === "prompt" ? "selected" : ""}>Prompt lane</option>
              <option value=\"nat\" ${settings.dev.paintLane === "nat" ? "selected" : ""}>Natural (A..G)</option>
              <option value=\"shr\" ${settings.dev.paintLane === "shr" ? "selected" : ""}>Sharp lane (A#..G#)</option>
              <option value=\"flt\" ${settings.dev.paintLane === "flt" ? "selected" : ""}>Flat lane (Ab..Gb)</option>
            </select>

            <label>Paint mode</label>
            <select id=\"selDevPaintMode\">
              <option value=\"paint\" ${settings.dev.paintMode === "paint" ? "selected" : ""}>Paint</option>
              <option value=\"erase\" ${settings.dev.paintMode === "erase" ? "selected" : ""}>Erase</option>
            </select>

            <label>Force phase</label>
            <select id=\"selDevForcePhase\">
              <option value=\"TITLE\">Title</option>
              <option value=\"IN_MATCH\">In match</option>
              <option value=\"BONUS\">Bonus</option>
              <option value=\"LAST_CHANCE\">Last chance</option>
              <option value=\"INTERMISSION\">Intermission</option>
              <option value=\"RESULTS\">Results</option>
            </select>

            <label>Force bonus on end turn</label>
            <label class=\"chk\" style=\"align-items:center; gap:8px;\"><input id=\"chkDevForceBonus\" type=\"checkbox\" ${settings.dev.forceBonusOnTurnEnd ? "checked" : ""}/> Enabled</label>
          </div>
          <div class=\"btnrow\" style=\"flex-wrap:wrap; margin-top:10px;\">
            <button class=\"btn\" id=\"btnDevSetP1\">To P1</button>
            <button class=\"btn\" id=\"btnDevSetP2\">To P2</button>
            <button class=\"btn\" id=\"btnDevEndTurn\">End turn</button>
            <button class=\"btn\" id=\"btnDevClear\">Clear board</button>
          </div>
        </div>

        <hr />
        <div class=\"hint\">
          <b>Input:</b> ${settings.modeId === ModeId.TAB ? "select a tab line + enter a fret" : "tap/click a position to answer"}. ${settings.modeId === ModeId.TAB ? "Use Steal during your turn on a vulnerable note matching the prompt." : "Tap a claimed dot to attempt a steal (token required)."}
        </div>
      </div>

      <div class=\"geCard hidden\" id=\"infoPanelB\">
        <div class=\"geCardTitle\">Info Panel B</div>
        <div class=\"small\">Contextual menus (keypad, chord/scale selectors, note names) will appear here depending on the task.</div>
      </div>
    </div>

    <div class=\"geFooter\">
      <div class=\"geFooterLeft\">
        <div class=\"pill\" id=\"phasePill\">—</div>
        <div class=\"small\" id=\"turnInfo\">—</div>
      </div>
      <div class=\"geFooterRight ${settings.dev.enabled ? "" : "hidden"}\">
        <div class=\"dockCard\" id=\"mechanicsDock\"></div>
      </div>
    </div>
  `;

  baseSvg = document.querySelector<SVGSVGElement>("#baseSvg")!;
  overlaySvg = document.querySelector<SVGSVGElement>("#overlaySvg")!;
  intermissionEl = document.getElementById("intermission")!;
  interTitleEl = document.getElementById("interTitle")!;
  interTextEl = document.getElementById("interText")!;
  calloutEl = document.getElementById("callout")!;
  promptEl = document.getElementById("prompt")!;
  timerEl = document.getElementById("timer")!;
  scoreStripEl = document.getElementById("scoreStrip")!;
  statsEl = document.getElementById("stats")!;
  activePlayerCardEl = document.getElementById("activePlayerCard");
  phasePillEl = document.getElementById("phasePill");
  turnInfoEl = document.getElementById("turnInfo");
  mechanicsDockEl = document.getElementById("mechanicsDock");
  modeTitleEl = document.getElementById("modeTitle");
  renderHeaderModeTitle();

  // Right-column contextual input (tabs + selectors)
  setupCtxInputPanel();

  // Mount chromatic rail
  railMountEl = document.getElementById("railMount")!;
  railMountEl.innerHTML = "";
  if (!rail) rail = createChromaticRail();
  railMountEl.appendChild(rail.el);

  document.getElementById("btnBack")!.addEventListener("click", () => renderTitle());
  document.getElementById("btnGameSettings")!.addEventListener("click", () => {
    renderSettingsModal();
    openModal("settings");
  });
  document.getElementById("btnGameLB")!.addEventListener("click", () => {
    renderLeaderboardModal();
    openModal("leaderboard");
  });

  const selDifficultyInline = document.getElementById("selDifficultyInline") as HTMLSelectElement | null;
  selDifficultyInline?.addEventListener("change", () => {
    settings.difficulty = selDifficultyInline.value as any;
    saveSettings(settings);
    startMatch();
  });

  document.getElementById("btnStartTurn")!.addEventListener("click", () => {
    if (!state) return;
    if (state.phase === "RESULTS") return;
    dispatch({ type: "START_TURN" });
    // Only start the timer if the reducer accepted the turn start.
    if (!state || (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE")) return;
    startTimer();
    hideIntermission();
  });
  document.getElementById("btnPause")!.addEventListener("click", () => togglePause());

  // Easy assist: hint reveals one correct target and ends the current turn.
  const btnHint = document.getElementById("btnHint") as HTMLButtonElement | null;
  btnHint?.addEventListener("click", () => {
    if (!state) return;
    if (state.phase !== "IN_MATCH") return;
    if (state.lastChance.active) return;
    if (state.settings.difficulty !== Difficulty.EASY && state.settings.difficulty !== Difficulty.LEARNING) return;
    dispatch({ type: "USE_HINT" });
  });

  document.getElementById("btnReset")!.addEventListener("click", () => startMatch());
  document.getElementById("btnEnd")!.addEventListener("click", () => endMatch(false, true));
  document.getElementById("btnNextTurn")!.addEventListener("click", () => {
    if (!state) return;

    // Bonus stage exits back into the normal intermission flow.
    if (state.phase === "BONUS") {
      hideIntermission();
      dispatch({ type: "END_BONUS" });
      return;
    }

    // In results, use this button as an exit back to Title.
    if (state.phase === "RESULTS") {
      hideIntermission();
      renderTitle();
      return;
    }
    hideIntermission();
    dispatch({ type: "START_TURN" });
    if (!state || (state.phase !== "IN_MATCH" && state.phase !== "LAST_CHANCE")) return;
    startTimer();
  });
  document.getElementById("btnInterAlt")!.addEventListener("click", () => {
    // Secondary results action: start a fresh match instance.
    hideIntermission();
    startMatch();
  });

  // ----------------------------
  // Dev/Test tools wiring
  // ----------------------------
  devToolsEl = document.getElementById("devTools");
  selDevPaintPlayer = document.getElementById("selDevPaintPlayer") as HTMLSelectElement | null;
  selDevPaintLane = document.getElementById("selDevPaintLane") as HTMLSelectElement | null;
  selDevPaintMode = document.getElementById("selDevPaintMode") as HTMLSelectElement | null;
  selDevForcePhase = document.getElementById("selDevForcePhase") as HTMLSelectElement | null;
  chkDevForceBonus = document.getElementById("chkDevForceBonus") as HTMLInputElement | null;

  // Sync dev UI to persisted settings (safe even if hidden).
  if (selDevPaintPlayer) selDevPaintPlayer.value = String(settings.dev.paintPlayerIndex ?? 0);
  if (selDevPaintLane) selDevPaintLane.value = String(settings.dev.paintLane ?? "prompt");
  if (selDevPaintMode) selDevPaintMode.value = String(settings.dev.paintMode ?? "paint");
  if (selDevForcePhase) selDevForcePhase.value = (state?.phase ?? "IN_MATCH");
  if (chkDevForceBonus) chkDevForceBonus.checked = !!settings.dev.forceBonusOnTurnEnd;

  const btnDevSetP1 = document.getElementById("btnDevSetP1") as HTMLButtonElement | null;
  const btnDevSetP2 = document.getElementById("btnDevSetP2") as HTMLButtonElement | null;
  const btnDevEndTurn = document.getElementById("btnDevEndTurn") as HTMLButtonElement | null;
  const btnDevClear = document.getElementById("btnDevClear") as HTMLButtonElement | null;

  // Use .on* assignments so repeated renderGameShell calls do not stack listeners.
  const commitDevPaint = () => {
    if (!state) return;
    if (!settings.dev) settings.dev = { enabled: false, paintPlayerIndex: 0, paintLane: "prompt", paintMode: "paint", forceBonusOnTurnEnd: false };

    const patch: any = {};
    if (selDevPaintPlayer) patch.paintPlayerIndex = Math.max(0, Math.min(state.players.length - 1, Number(selDevPaintPlayer.value) || 0));
    if (selDevPaintLane) patch.paintLane = (selDevPaintLane.value || "prompt") as any;
    if (selDevPaintMode) patch.paintMode = (selDevPaintMode.value || "paint") as any;
    if (chkDevForceBonus) patch.forceBonusOnTurnEnd = !!chkDevForceBonus.checked;

    // Persist to settings so dev flows survive refresh.
    settings.dev = { ...settings.dev, ...patch };
    saveSettings(settings);

    dispatch({ type: "DEV_SET_PAINT", patch });
  };

  if (selDevPaintPlayer) selDevPaintPlayer.onchange = commitDevPaint;
  if (selDevPaintLane) selDevPaintLane.onchange = commitDevPaint;
  if (selDevPaintMode) selDevPaintMode.onchange = commitDevPaint;
  if (chkDevForceBonus) chkDevForceBonus.onchange = commitDevPaint;

  if (selDevForcePhase) {
    selDevForcePhase.onchange = () => {
      if (!state) return;
      const phase = (selDevForcePhase!.value as any);
      dispatch({ type: "DEV_FORCE_PHASE", phase });
      // If we force out of INTERMISSION, ensure the overlay doesn't block the screen.
      if (phase === "BONUS") {
        const pidx = state?.bonus?.playerIndex ?? state?.currentPlayer ?? 0;
        const nm = state?.players?.[pidx]?.profile.name ?? `P${pidx + 1}`;
        showIntermission(
          `<div><b>Bonus stage:</b> ${escapeHtml(nm)}</div><div class="small" style="margin-top:6px;">(Forced via dev tool.)</div>`,
          { title: "Bonus stage", nextLabel: "End bonus", html: true }
        );
      } else if (phase !== "INTERMISSION") {
        hideIntermission();
      }
    };
  }

  if (btnDevSetP1) btnDevSetP1.onclick = () => {
    if (!state) return;
    dispatch({ type: "DEV_SET_CURRENT_PLAYER", playerIndex: 0 });
  };
  if (btnDevSetP2) btnDevSetP2.onclick = () => {
    if (!state) return;
    dispatch({ type: "DEV_SET_CURRENT_PLAYER", playerIndex: 1 });
  };
  if (btnDevEndTurn) btnDevEndTurn.onclick = () => {
    if (!state) return;
    // Stops the current turn immediately (applies end-of-turn scoring).
    dispatch({ type: "DEV_END_TURN" });
  };
  if (btnDevClear) btnDevClear.onclick = () => {
    if (!state) return;
    dispatch({ type: "DEV_CLEAR_BOARD" });
  };
}

function queueIntermission(msg: string, opts: { title?: string; nextLabel?: string; html?: boolean } | undefined, delayMs: number) {
  if (intermissionShowTimeout !== null) {
    window.clearTimeout(intermissionShowTimeout);
    intermissionShowTimeout = null;
  }
  if (!delayMs || delayMs <= 0) {
    showIntermission(msg, opts);
    return;
  }
  intermissionShowTimeout = window.setTimeout(() => {
    intermissionShowTimeout = null;
    showIntermission(msg, opts);
  }, delayMs);
}

function showIntermission(msg: string, opts?: { title?: string; nextLabel?: string; altLabel?: string; html?: boolean }) {
  const title = opts?.title ?? (settings.playType === PlayType.MULTI ? "Next player" : "Ready");
  const nextLabel = opts?.nextLabel ?? (settings.playType === PlayType.MULTI ? "Ready" : "Go");
  if (interTitleEl) interTitleEl.textContent = title;
  const btnNext = document.getElementById("btnNextTurn") as HTMLButtonElement | null;
  if (btnNext) btnNext.textContent = nextLabel;
  const btnAlt = document.getElementById("btnInterAlt") as HTMLButtonElement | null;
  if (btnAlt) {
    if (opts?.altLabel) {
      btnAlt.textContent = opts.altLabel;
      btnAlt.style.display = "inline-flex";
    } else {
      btnAlt.style.display = "none";
    }
  }
  if (opts?.html) interTextEl.innerHTML = msg;
  else interTextEl.textContent = msg;
  intermissionEl.classList.add("show");
}

function hideIntermission() {
  if (intermissionShowTimeout !== null) {
    window.clearTimeout(intermissionShowTimeout);
    intermissionShowTimeout = null;
  }
  intermissionEl.classList.remove("show");
}

function updatePrompt() {
  if (!state) {
    promptEl.textContent = "—";
    return;
  }
  promptEl.textContent = variantLabel(state.prompt.variantId as any);
}

function renderScoreStrip() {
  if (!state) return;
  const activeId = state.players[state.currentPlayer]?.profile.id;
  const tier = state.turn.streakTier;
  const mult = tierToMult(tier);

  scoreStripEl.innerHTML = state.players
    .map((p) => {
      const isActive = p.profile.id === activeId;
      const hasFire = firePlayers.has(p.profile.id);
      const tokenDots = Array.from({ length: settings.steal.tokenCap }, (_, i) => {
        const on = i < p.tokenCount;
        return `<span class="tokenDot ${on ? "on" : ""}"></span>`;
      }).join("");

      const multText = isActive && mult > 1 ? `x${mult}` : "";
      return `
        <div class="scoreCard ${isActive ? "active" : ""} ${hasFire ? "fire" : ""}">
          <div class="tokens">${tokenDots}</div>
          <div class="nameRow">
            <div class="mark">${settings.accessibility.colorBlindMode ? PLAYER_MARKS[p.profile.patternId % PLAYER_MARKS.length] : ""}</div>
            <div class="name">${escapeHtml(p.profile.name)}</div>
          </div>
          <div class="scoreRow">
            <div class="score">${p.score}</div>
            <div class="mult">${multText}</div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderStatsPanel() {
  if (!state) return;
  if (!settings.dev?.enabled) { statsEl.innerHTML = ""; return; }
  const cur = state.players[state.currentPlayer];
  const tier = state.turn.streakTier;
  const mult = tierToMult(tier);
  statsEl.innerHTML = `
    <div>Player</div><div>${escapeHtml(cur.profile.name)}</div>
    <div>Profile</div><div>${escapeHtml(describePromptProfileId(settings.promptProfileId))}</div>
    <div>Score</div><div>${cur.score} ${mult > 1 ? `(x${mult})` : ""}</div>
    <div>Tokens</div><div>${cur.tokenCount}</div>
    ${state.settings.fixedRoundsTotal > 1 ? `<div>Round</div><div>${state.roundIndex} / ${state.settings.fixedRoundsTotal}${state.lastChance.active ? " (Last chance)" : ""}</div>` : ""}
    <div>Turn</div><div>${state.turnCounter}</div>
    <div>Correct</div><div>${state.turn.correctCount}</div>
    <div>Wrong</div><div>${state.turn.wrongCount}</div>
    <div>Tries</div><div>${state.turn.tries}</div>
    <div>Streak</div><div>${state.turn.streakCount}</div>
  `;
}

function renderHudPanels() {
  if (!state) return;

  // Active player card (big, always-visible)
  if (activePlayerCardEl) {
    const p = state.players[state.currentPlayer];
    const tier = state.turn.streakTier;
    const mult = tierToMult(tier);
    const tokenDots = Array.from({ length: settings.steal.tokenCap }, (_, i) => {
      const on = i < p.tokenCount;
      return `<span class="tokenDot ${on ? "on" : ""}"></span>`;
    }).join("");

    activePlayerCardEl.innerHTML = `
      <div class="activePlayerTop">
        <div class="nameRow">
          <div class="mark">${settings.accessibility.colorBlindMode ? PLAYER_MARKS[p.profile.patternId % PLAYER_MARKS.length] : ""}</div>
          <div class="name">${escapeHtml(p.profile.name)}</div>
        </div>
        <div class="activeScore">
          <span class="score">${p.score}</span>
          <span class="mult">${mult > 1 ? `x${mult}` : ""}</span>
        </div>
      </div>
      <div class="tokens">${tokenDots}</div>
      <div class="small">Turn streak: <b>${state.turn.streakCount}</b> · Correct: <b>${state.turn.correctCount}</b> · Wrong: <b>${state.turn.wrongCount}</b></div>
    `;
  }

  // Phase pill + compact match info (right side)
  if (phasePillEl) {
    const lc = state.lastChance.active ? " · Last chance" : "";
    const bonus = state.phase === "BONUS" ? " · Bonus" : "";
    phasePillEl.textContent = `${state.phase}${bonus}${lc}`;
  }
  if (turnInfoEl) {
    const r = state.settings.fixedRoundsTotal > 1 ? `Round ${state.roundIndex}/${state.settings.fixedRoundsTotal}` : `Round ${state.roundIndex}`;
    turnInfoEl.textContent = `${r} · Turn ${state.turnCounter}`;
  }

  // Bottom dock: reserved real-estate for complex mechanics (chords/scales/bonus) + testing readouts.
  if (mechanicsDockEl) {
    if (!settings.dev?.enabled) { mechanicsDockEl.innerHTML = ""; return; }
    const devForced = !!state.settings.dev?.forceBonusOnTurnEnd;
    const isMulti = state.settings.playType === PlayType.MULTI;
    const target = variantLabel(state.prompt.variantId as any);

    mechanicsDockEl.innerHTML = `
      <div class="dockGrid">
        <div class="dockCol">
          <div class="dockTitle">Turn</div>
          <div class="dockKv"><span>Prompt</span><b>${escapeHtml(target)}</b></div>
          <div class="dockKv"><span>Tries</span><b>${state.turn.tries}</b></div>
          <div class="dockKv"><span>Correct</span><b>${state.turn.correctCount}</b></div>
          <div class="dockKv"><span>Wrong</span><b>${state.turn.wrongCount}</b></div>
        </div>
        <div class="dockCol">
          <div class="dockTitle">Scoring</div>
          <div class="dockKv"><span>Streak</span><b>${state.turn.streakCount}</b></div>
          <div class="dockKv"><span>Tier</span><b>${state.turn.streakTier}</b></div>
          <div class="dockKv"><span>Multiplier</span><b>x${tierToMult(state.turn.streakTier)}</b></div>
          <div class="dockKv"><span>Fire</span><b>${firePlayers.has(state.players[state.currentPlayer].profile.id) ? "ON" : "OFF"}</b></div>
        </div>
        <div class="dockCol">
          <div class="dockTitle">Bonus</div>
          <div class="dockKv"><span>Multiplayer</span><b>${isMulti ? "YES" : "NO"}</b></div>
          <div class="dockKv"><span>Dev force</span><b>${devForced ? "ON" : "OFF"}</b></div>
          <div class="dockKv"><span>Status</span><b>${state.phase === "BONUS" ? "IN BONUS" : "—"}</b></div>
          <div class="dockKv"><span>Eligibility</span><b class="muted">(hook pending)</b></div>
        </div>
      </div>
    `;
  }
}

function tierToMult(tier: number): number {
  if (tier <= 0) return 1;
  if (tier === 1) return 2;
  if (tier === 2) return 3;
  if (tier === 3) return 5;
  return 10;
}

function showCallout(text: string, playerId: PlayerId) {
  callout = { text, playerId, until: performance.now() + 900 };
  calloutEl.textContent = text;
  calloutEl.classList.remove("hidden");
  setTimeout(() => {
    if (!callout) return;
    if (performance.now() >= callout.until) {
      callout = null;
      calloutEl.classList.add("hidden");
    }
  }, 920);
}

function recordScoreFromState() {
  if (!state) return;
  const duration = matchActiveMs;
  if (settings.playType === PlayType.MULTI) {
    const winner = [...state.players].sort((a, b) => b.score - a.score)[0];
    if (winner) recordScore(settings, winner.profile.name, winner.score, duration);
  } else {
    const p = state.players[0];
    recordScore(settings, p.profile.name, p.score, duration);
  }
}


function showMatchCompleteOverlay(roundsCompleted: number, opts?: { endedEarly?: boolean }) {
  if (!state || !state.players?.length) {
    showIntermission(`Rounds completed: ${roundsCompleted}`, { title: opts?.endedEarly ? "Game ended" : "Game complete", nextLabel: "Back to title", altLabel: opts?.endedEarly ? "Try again" : "New game" });
    return;
  }

  const ranked = [...state.players].sort((a, b) => b.score - a.score);
  const winner = ranked[0];
  const winnerName = escapeHtml(winner.profile.name || "Winner");

  const endedEarly = !!opts?.endedEarly;

  let html = `<div class="small">Rounds completed: <b>${roundsCompleted}</b></div>`;
  if (!endedEarly) {
    html += `<div style="margin-top:10px; font-size:16px; font-weight:800;">Congratulations, ${winnerName}!</div>`;
  }

  if (!endedEarly && ranked.length > 1) {
    const top3 = ranked.slice(0, 3);
    html += `<div style="margin-top:10px;" class="small"><b>Top players</b></div>`;
    html += `<div style="margin-top:6px; display:grid; gap:6px;">`;
    top3.forEach((p, i) => {
      const nm = escapeHtml(p.profile.name || `P${i + 1}`);
      html += `<div style="display:flex; justify-content:space-between; gap:10px;">
        <div><b>${i + 1}</b>. ${nm}</div>
        <div><b>${p.score}</b></div>
      </div>`;
    });
    html += `</div>`;
  }

  showIntermission(html, { title: endedEarly ? "Game ended" : "Game complete", nextLabel: "Back to title", altLabel: endedEarly ? "Try again" : "New game", html: true });
}

function applyEffects(effects: Effect[]) {
  for (const fx of effects) {
    switch (fx.type) {
      case "PROMPT_CHANGED": {
        updatePrompt();
  renderHeaderModeTitle();
        // Reset the timer while the turn is running (spec: correct answer resets timer).
        if (timerRunning && !timerPaused) resetTimer();
        break;
      }
      case "FEEDBACK_PULSE": {
        lastPulseStartedAt = performance.now();
        lastPulseDurationMs = fx.durationMs;
        lastPulseBlocksIntermission = !!fx.ghost || (Array.isArray(fx.ghosts) && fx.ghosts.length > 0);
        pulse = {
          playerId: fx.playerId,
          variantId: fx.variantId,
          ghost: fx.ghost ? { cellIndex: fx.ghost.cellIndex, slot: fx.ghost.slot } : null,
          ghosts: fx.ghosts ? fx.ghosts.map((g) => ({ cellIndex: g.cellIndex, slot: g.slot })) : undefined,
          scoreDelta: fx.scoreDelta,
        };
        setTimeout(() => {
          pulse = null;
          paint();
        }, fx.durationMs);
        break;
      }
      case "STREAK_CALLOUT": {
        showCallout(fx.message, fx.playerId);
        break;
      }
      case "FIRE_MODE": {
        if (fx.enabled) firePlayers.add(fx.playerId);
        else firePlayers.delete(fx.playerId);
        break;
      }
      case "ROUND_COMPLETE": {
        pendingIntermissionMessage = `Round ${fx.completedRound} complete.`;
        break;
      }
      case "LAST_CHANCE_STARTED": {
        pendingIntermissionMessage = "Final round complete. Last chance steals: use your remaining tokens.";
        break;
      }
      case "BONUS_STARTED": {
        stopTimer();
        const pidx = state?.bonus?.playerIndex ?? state?.currentPlayer ?? 0;
        const nm = state?.players?.[pidx]?.profile.name ?? `P${pidx + 1}`;
        showIntermission(
          `<div><b>Bonus stage:</b> ${escapeHtml(nm)}</div><div class="small" style="margin-top:6px;">(Scaffold: bonus gameplay hooks will be added next.)</div>`,
          { title: "Bonus stage", nextLabel: "End bonus", html: true }
        );
        break;
      }
      case "MATCH_COMPLETE": {
        stopTimer();
        recordScoreFromState();
        showMatchCompleteOverlay(fx.roundsCompleted);
        break;
      }
      case "BLACKOUT_COMPLETE": {
        stopTimer();
        recordScoreFromState();
        // Treat Blackout completion as a single-round completion.
        showMatchCompleteOverlay(state?.roundIndex ?? 1, { endedEarly: true });
        break;
      }
      case "TURN_ENDED": {
        stopTimer();
        const override = pendingIntermissionMessage;
        pendingIntermissionMessage = null;

        const isMulti = settings.playType === PlayType.MULTI;
        const title = isMulti ? "Next player" : "Ready";
        const nextLabel = isMulti ? "Ready" : "Go";

        // If a SAM pulse just fired, delay the overlay slightly so the player can see it.
        const now = performance.now();
        const elapsed = now - lastPulseStartedAt;
        const pulseActive = lastPulseBlocksIntermission && elapsed < (lastPulseDurationMs || 0);
        const samDelay = pulseActive ? Math.max(0, (lastPulseDurationMs || 0) - elapsed) : 0;

        let msg = "";
        if (override) {
          if (isMulti) {
            const next = state?.players[state!.currentPlayer].profile.name ?? "—";
            msg = `${override} Next: ${next}`;
          } else {
            msg = override;
          }
        } else {
          if (isMulti) {
            const next = state?.players[state!.currentPlayer].profile.name ?? "—";
            msg = `Next: ${next}`;
          } else {
            msg = `Press Start to continue.`;
          }
        }

        queueIntermission(msg, { title, nextLabel }, samDelay);
        break;
      }
    }
  }
}

function dispatch(a: any) {
  if (!state && a.type !== "INIT_MATCH") return;

  const prevCorrect = state ? state.turn.correctCount : 0;
  const prevMode = state ? state.settings.modeId : settings.modeId;

  // Track the most recent tab submission so we can place it when correct.
  const isTabSubmit = (a.type === "TAP_CELL" || a.type === "STEAL_CELL") && prevMode === ModeId.TAB;

  const res = reducer(state, a);
  state = res.state;

  if (state && isTabSubmit && lastTabSubmit) {
    const becameCorrect = state.turn.correctCount > prevCorrect;
    if (becameCorrect) {
      const col = tabState.cursor;
      const s = lastTabSubmit.stringIndex;
      if (tabState.grid[s] && tabState.grid[s][col] !== undefined) {
        tabState.grid[s][col] = lastTabSubmit.fretIndex;
      }

      if (col >= TAB_COLUMNS - 1) {
        // Clear after the final slot is filled.
        window.setTimeout(() => {
          if (!state || state.settings.modeId !== ModeId.TAB) return;
          tabState.cursor = 0;
          tabState.grid = Array.from({ length: 6 }, () => Array.from({ length: TAB_COLUMNS }, () => null));
          tabBoard?.setState(tabState);
        }, 450);
        tabState.cursor = 0;
      } else {
        tabState.cursor = col + 1;
      }

      tabBoard?.setState(tabState);
    }

    // Clear numeric entry after any submission.
    tabFretText = "";
    tabStealMode = false;
    lastTabSubmit = null;
    syncTabUiFromState();
  }

  applyEffects(res.effects as any);
  paint();
}


function modeTitleFromSettings(): string {
  switch (settings.modeId) {
    case ModeId.FRETBOARD: return "Fret Finder";
    case ModeId.STAFF: return "Staff Finder";
    case ModeId.TAB: return "Tab Finder";
    case ModeId.COMBINED: return "Combined";
    default: return "GuitarEdu";
  }
}

function renderHeaderModeTitle() {
  if (!modeTitleEl) return;
  modeTitleEl.textContent = modeTitleFromSettings();
}

function paint() {
  if (!state || !adapter) return;

  updatePrompt();
  renderHeaderModeTitle();
  // Update the scale/interval rail (visual compass for chromatic; fixed reference for keys/scales).
  if (rail) {
    const profileLower = (settings.promptProfileId || "chromatic").toLowerCase();
    const isChromatic = profileLower.startsWith("chromatic") || profileLower.startsWith("accidentals");
    const mode: RailMode = isChromatic ? "ROTATE_COMPASS" : "FIXED_REFERENCE";
    const anchor = anchorVariantFromProfileId(settings.promptProfileId);
    rail.setConfig({ anchorVariantId: anchor, currentVariantId: state.prompt.variantId as VariantId, mode }, settings);
  }
  renderScoreStrip();
  renderStatsPanel();
  renderHudPanels();
  renderOverlay(overlaySvg, adapter.layout, state, pulse);
  syncGameControls();
}


function syncGameControls() {
  // Disable gameplay controls once the match is complete.
  const btnStart = document.getElementById("btnStartTurn") as HTMLButtonElement | null;
  const btnPause = document.getElementById("btnPause") as HTMLButtonElement | null;
  const btnNext = document.getElementById("btnNextTurn") as HTMLButtonElement | null;
  const btnEnd = document.getElementById("btnEnd") as HTMLButtonElement | null;
  const btnHint = document.getElementById("btnHint") as HTMLButtonElement | null;

  if (!btnStart || !btnPause || !btnNext || !btnEnd) return;
  if (!state) return;

  const isDone = state.phase === "RESULTS";
  const isBonus = state.phase === "BONUS";
  btnStart.disabled = isDone || isBonus;
  btnPause.disabled = isDone || isBonus || !timerRunning;
  btnNext.disabled = false;

  // Hint is only available during an active Easy-mode turn (non-last-chance).
  if (btnHint) {
    btnHint.disabled =
      isDone ||
      isBonus ||
      !timerRunning ||
      timerPaused ||
      state.phase !== "IN_MATCH" ||
      state.lastChance.active ||
      (state.settings.difficulty !== Difficulty.EASY && state.settings.difficulty !== Difficulty.LEARNING);
  }
}

function startMatch() {
  // Reset leaderboard timing for a fresh match instance.
  resetMatchClock();

  // Ensure play type + player count are aligned.
  if (settings.playType === PlayType.SINGLE) playerProfiles = makePlayers(1);
  if (settings.playType === PlayType.MULTI && playerProfiles.length < 2) playerProfiles = makePlayers(4);

  saveSettings(settings);

  renderGameShell();
  hideIntermission();
  firePlayers.clear();
  callout = null;
  calloutEl?.classList.add("hidden");

  // Mount board assets asynchronously (SVG + input handlers).
  (async () => {
    await loadBaseSvg();
    if (!adapter) {
      adapter = await createUiAdapter(baseSvg, dispatch);
    } else {
      // Ensure adapter svg root points to the current mounted SVG element.
      adapter.svgRoot = baseSvg as any;
    }

    const tabLayer = document.getElementById("tabLayer");
    const tabMount = document.getElementById("tabMount");

    // Mode-specific input surface
    if (settings.modeId === ModeId.TAB) {
      baseSvg.classList.add("hidden");
      overlaySvg.classList.add("hidden");
      tabLayer?.classList.remove("hidden");
      attachedOverlay = null;

      if (!tabBoard) {
        tabBoard = createTabBoard();
        tabBoard.onSelectString((stringIndex) => {
          tabState.selectedString = stringIndex;
          syncTabUiFromState();
        });
      }
      if (tabMount) tabMount.replaceChildren(tabBoard.el);
      resetTabForMatch();
      attachTabInputHandlers();
    } else {
      baseSvg.classList.remove("hidden");
      overlaySvg.classList.remove("hidden");
      tabLayer?.classList.add("hidden");
      tabInputDispose?.();
      tabInputDispose = null;

      if (attachedOverlay !== overlaySvg) {
        attachBoardPointerHandlers(adapter, () => {
          // In normal play, only accept input during an active (non-paused) timed turn.
          // In Dev/Test mode, allow board interaction at any time to speed up testing.
          if (!state) return null;
          if (state.settings.dev?.enabled) return state;
          return (timerRunning && !timerPaused) ? state : null;
        }, overlaySvg);
        attachedOverlay = overlaySvg;
      }
    }

    dispatch({ type: "INIT_MATCH", settings, players: playerProfiles, seed: Date.now() | 0 });
    // Wait for explicit Start click to begin the first turn.
    showIntermission("Press Start to begin.", { title: "Ready", nextLabel: "Go" });
    paint();
  })();
}

function endMatch(record = false, endedEarly = false) {
  if (!state) return;
  stopTimer();
  dispatch({ type: "END_MATCH" });
  if (record) recordScoreFromState();
  showMatchCompleteOverlay(state?.roundIndex ?? 1);
}

// ----------------------------
// Timer loop
// ----------------------------

function startTimer() {
  // Start tracking active gameplay time (excludes intermission + pause).
  activeSegmentStartedAt = performance.now();
  timerRunning = true;
  timerPaused = false;
  pausedRemainingMs = 0;
  turnEndsAt = performance.now() + settings.timers.turnMs;
  tickTimer();
}

function resetTimer() {
  turnEndsAt = performance.now() + settings.timers.turnMs;
}

function stopTimer() {
  // Commit any pending active time before stopping.
  accumulateActiveTime(performance.now());
  timerRunning = false;
  timerPaused = false;
  pausedRemainingMs = 0;
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  if (timerEl) timerEl.textContent = "—";
  const btn = document.getElementById("btnPause");
  if (btn) btn.textContent = "Pause";
}

function togglePause() {
  if (!timerRunning) return;
  const now = performance.now();
  if (!timerPaused) {
    // Commit the active segment so paused time is not counted.
    accumulateActiveTime(now);
    pausedRemainingMs = Math.max(0, Math.round(turnEndsAt - now));
    timerPaused = true;
  } else {
    timerPaused = false;
    turnEndsAt = now + pausedRemainingMs;
    pausedRemainingMs = 0;
    // Resume active time tracking.
    activeSegmentStartedAt = now;
  }
  const btn = document.getElementById("btnPause");
  if (btn) btn.textContent = timerPaused ? "Resume" : "Pause";
  if (!timerPaused) {
    // Restart with remaining time preserved.
    tickTimer();
  }
}

function tickTimer() {
  if (!timerRunning) return;
  // Timer UI only exists on the game screen.
  if (!timerEl) return;
  if (timerPaused) {
    // Freeze display on the remaining time.
    timerEl.textContent = `${(pausedRemainingMs / 1000).toFixed(1)}s`;
    rafId = requestAnimationFrame(tickTimer);
    return;
  }

  const now = performance.now();
  const msLeft = Math.max(0, Math.round(turnEndsAt - now));
  timerEl.textContent = `${(msLeft / 1000).toFixed(1)}s`;
  if (msLeft <= 0) {
    timerEl.textContent = "0.0s";
    // Commit final active time for this timed segment.
    accumulateActiveTime(now);
    timerRunning = false;
    dispatch({ type: "TIMEOUT" });
    return;
  }
  rafId = requestAnimationFrame(tickTimer);
}

// ----------------------------
// Boot: load base SVG + attach pointer handlers
// ----------------------------

async function loadBaseSvg() {
  const svgText = await fetch("/fretboard.svg").then((r) => r.text());
  // Insert SVG content inside our controlled <svg> so the viewBox stays stable.
  baseSvg.innerHTML = svgText
    .replace(/^<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/g, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/g, "");
}

async function boot() {
  // Initial render
  renderTitle();

  // We create the adapter only after the game screen mounts its SVG in the DOM.
}

boot();
