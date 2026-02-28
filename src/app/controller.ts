type GameMode = "single" | "chords" | "scales";
type SessionMode = "single" | "multi" | "edu" | null;

const NOTE_NAMES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"] as const;
type NoteName = typeof NOTE_NAMES[number];

type RunState = "idle" | "running" | "stopped";

type SettingValue = string | number | boolean;

interface UiState {
  session: SessionMode;
  mode: GameMode;
  run: RunState;
  score: number;
  streak: number;
  target: NoteName;
  seconds: number;
  inputText: string;
  settings: Record<string, SettingValue>;
}

const rand = (n: number) => Math.floor(Math.random() * n);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function fmtTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${mm}:${ss}`;
}

function setAlert(text: string) {
  const el = document.getElementById("alerts-text");
  if (el) el.textContent = text;
}

const fmtScore = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);

function getSetting<T extends SettingValue>(settings: Record<string, SettingValue>, key: string, fallback: T): T {
  const v = settings[key];
  return (v === undefined ? fallback : (v as T));
}



function syncEducationUi(session: SessionMode) {
  const teachTab = document.getElementById("utility-teach-tab") as HTMLButtonElement | null;
  const teachPane = document.getElementById("utility-teach-pane") as HTMLElement | null;
  // Teach tab/pane should only be visible in Education Mode
  if (teachTab) teachTab.hidden = session !== "edu";
  if (teachPane) teachPane.toggleAttribute("hidden", session !== "edu");
}

function activateUtilityTab(id: string) {
  const section = document.querySelector<HTMLElement>('[data-tabs="right"]');
  const btn = section?.querySelector<HTMLButtonElement>(`.tab[data-tab="${id}"]`) ?? null;
  btn?.click();
}

function syncSessionUi(session: SessionMode) {
  const row = document.getElementById("ps-personalBoardsRow");
  if (row) row.toggleAttribute("hidden", session !== "multi");
  syncEducationUi(session);
}

function syncPlayerCard(score: number, streak: number, seconds: number) {
  const scoreEl = document.getElementById("activePlayer-score");
  if (scoreEl) scoreEl.textContent = fmtScore(score);

  const multEl = document.getElementById("activePlayer-mult");
  if (multEl) {
    const mult = clamp(1 + Math.floor(streak / 3), 1, 6);
    multEl.textContent = `×${mult}`;
  }

  const timerEl = document.getElementById("activePlayer-timer");
  if (timerEl) timerEl.textContent = fmtTime(seconds);
}

function setSplashVisible(show: boolean) {
  const splash = document.getElementById("splash");
  if (!splash) return;
  splash.classList.toggle("show", show);
}

function buildCenteredSequence(center: NoteName, length = 25) {
  // 2 full octaves + 1 (centered). For length=25 => 12 left, center, 12 right.
  const half = Math.floor(length / 2);
  const ci = NOTE_NAMES.indexOf(center);
  const seq: NoteName[] = [];
  for (let i = -half; i <= half; i++) {
    const idx = (ci + i + 1200) % 12;
    seq.push(NOTE_NAMES[idx]);
  }
  return seq;
}

const NATURAL_SET = new Set<NoteName>(["A", "B", "C", "D", "E", "F", "G"]);
const ENHARMONIC_MAP: Partial<Record<NoteName, string>> = {
  "A#": "A#/Bb",
  "C#": "C#/Db",
  "D#": "D#/Eb",
  "F#": "F#/Gb",
  "G#": "G#/Ab",
};

const INTERVALS = ["1", "b2", "2", "b3", "3", "4", "#4", "5", "b6", "6", "b7", "7"] as const;
const ROMAN_INTERVALS = ["I", "bII", "II", "bIII", "III", "IV", "#IV", "V", "bVI", "VI", "bVII", "VII"] as const;

// --- Fretboard mapping (Standard Guitar: high E → low E for rows 0..5) ---
// Using NOTE_NAMES indexing (A, A#, B, C, C#, D, D#, E, F, F#, G, G#)
const STD_STRINGS_HIGH_TO_LOW: NoteName[] = ["E", "B", "G", "D", "A", "E"];

function noteFromStringFret(row: number, fret: number): NoteName {
  const open = STD_STRINGS_HIGH_TO_LOW[clamp(row, 0, 5)];
  const idx = (noteIndex(open) + clamp(fret, 0, 60)) % 12;
  return NOTE_NAMES[idx];
}

function clearFretClasses(root: HTMLElement, cls: string) {
  root.querySelectorAll<HTMLElement>(`.fretCell.${cls}`).forEach((n) => n.classList.remove(cls));
}

function flashSamFretboard(note: NoteName) {
  const overlay = document.getElementById("fretOverlay");
  if (!overlay) return;
  const cells = overlay.querySelectorAll<HTMLElement>(`.fretCell[data-note="${note}"]`);
  cells.forEach((c) => c.classList.add("sam"));
  window.setTimeout(() => cells.forEach((c) => c.classList.remove("sam")), 850);
}

function noteIndex(n: NoteName) {
  return NOTE_NAMES.indexOf(n);
}

function safeNoteFromRoot(root: string): NoteName {
  // Root select includes sharps and naturals; default to C if anything unexpected.
  return (NOTE_NAMES as readonly string[]).includes(root) ? (root as NoteName) : "C";
}

function labelFor(
  note: NoteName,
  display: "names" | "intervals" | "romanIntervals",
  root: NoteName,
  enharmonics: boolean,
) {
  if (display === "names") {
    if (!enharmonics) return note;
    return ENHARMONIC_MAP[note] ?? note;
  }

  const off = (noteIndex(note) - noteIndex(root) + 1200) % 12;
  return display === "intervals" ? INTERVALS[off] : ROMAN_INTERVALS[off];
}

function renderNoteRail(
  center: NoteName,
  opts: { display: "names" | "intervals" | "romanIntervals"; root: NoteName; noteVisibility: "naturals" | "enharmonics" },
) {
  const rail = document.getElementById("noteStrip-rail");
  if (!rail) return;
  rail.innerHTML = "";
  const seq = buildCenteredSequence(center, 25);
  seq.forEach((n, i) => {
    const d = document.createElement("div");
    const isAcc = n.includes("#");
    const disableAcc = opts.noteVisibility === "naturals" && isAcc;
    d.className = `noteTile${i === 12 ? " active" : ""}${disableAcc ? " disabled" : ""}`;
    d.dataset.note = n;
    if (disableAcc) {
      d.dataset.disabled = "1";
      d.textContent = "";
    } else {
      const enh = opts.noteVisibility === "enharmonics";
      d.textContent = labelFor(n, opts.display, opts.root, enh);
    }
    rail.appendChild(d);
  });
}

function renderFretOverlay(range: { fretMin: number; fretMax: number }) {
  const overlay = document.getElementById("fretOverlay");
  if (!overlay) return;

  const fretMin = clamp(Math.floor(range.fretMin), 0, 24);
  const fretMax = clamp(Math.floor(range.fretMax), 0, 24);
  const start = Math.min(fretMin, fretMax);
  const end = Math.max(fretMin, fretMax);
  const cols = clamp(end - start + 1, 1, 25);

  overlay.style.setProperty("--fretCols", String(cols));
  overlay.innerHTML = "";

  const frag = document.createDocumentFragment();
  for (let row = 0; row < 6; row++) {
    for (let c = 0; c < cols; c++) {
      const fret = start + c;
      const note = noteFromStringFret(row, fret);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "fretCell";
      b.dataset.row = String(row);
      b.dataset.fret = String(fret);
      b.dataset.note = note;
      b.setAttribute("aria-label", `String ${row + 1} fret ${fret} (${note})`);
      frag.appendChild(b);
    }
  }
  overlay.appendChild(frag);
}

function flashSamTarget(note: NoteName) {
  const rail = document.getElementById("noteStrip-rail");
  if (!rail) return;
  const tile = rail.querySelector<HTMLElement>(`.noteTile[data-note="${note}"]`);
  if (!tile) return;
  tile.classList.add("sam");
  window.setTimeout(() => tile.classList.remove("sam"), 800);
}

function syncModeUi(mode: GameMode) {
  const tabs = document.querySelectorAll<HTMLButtonElement>("#ops-modeTabs .tab");
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === mode));
  const panes = document.querySelectorAll<HTMLElement>("[data-tabs='left'] .pane");
  panes.forEach((p) => p.classList.toggle("active", p.dataset.pane === mode));
}

function syncKeypadDisplay(text: string) {
  const display = document.getElementById("keypad-display");
  if (display) display.textContent = text.length ? text : "0";
}

export function initUiController(root: HTMLElement) {
  let tick: number | null = null;

  const state: UiState = {
    session: null,
    mode: "single",
    run: "idle",
    score: 0,
    streak: 0,
    target: "A",
    seconds: 0,
    inputText: "",
    settings: {},
  };

  const announce = () => {
    syncSessionUi(state.session);
    const badgeMode = state.mode === "single" ? "Single" : state.mode === "chords" ? "Chords" : "Scales";
    const badgeRun =
      state.run === "running"
        ? "RUN"
          : state.run === "stopped"
            ? "STOP"
            : "IDLE";
    const badgeSession = state.session === "multi" ? "MULTI" : state.session === "single" ? "SOLO" : "NO-SESSION";

    setAlert(
      `${badgeRun} • ${badgeSession} • ${badgeMode} • Target: ${state.target} • Score: ${state.score} • Streak: ${state.streak} • Time: ${fmtTime(state.seconds)}`,
    );
    syncPlayerCard(state.score, state.streak, state.seconds);
  };

  const setTarget = (note?: NoteName) => {
    const noteVisibility = getSetting(state.settings, "core.noteVisibility", "naturals" as const);
    const pool = noteVisibility === "naturals" ? NOTE_NAMES.filter((n) => NATURAL_SET.has(n)) : NOTE_NAMES;
    state.target = note ?? pool[rand(pool.length)];

    const display = getSetting(state.settings, "core.display", "names" as const);
    const root = safeNoteFromRoot(getSetting(state.settings, "core.root", "C" as const));
    renderNoteRail(state.target, { display, root, noteVisibility });

    // Keep the fretboard overlay in sync with user preferences.
    const fretMin = Number(getSetting(state.settings, "pref.fretMin", 5 as const));
    const fretMax = Number(getSetting(state.settings, "pref.fretMax", 12 as const));
    renderFretOverlay({ fretMin, fretMax });
    announce();
  };

  const hardReset = () => {
    state.run = "idle";
    state.score = 0;
    state.streak = 0;
    state.seconds = 0;
    state.inputText = "";
    syncKeypadDisplay(state.inputText);
    setTarget("A");
    announce();
  };

  const startTimer = () => {
    if (tick != null) window.clearInterval(tick);
    tick = window.setInterval(() => {
      if (state.run !== "running") return;
      state.seconds += 1;
      announce();
    }, 1000);
  };

  const requireSession = (): boolean => {
    if (state.session) return true;
    setSplashVisible(true);
    setAlert("Select Single Player or Multiplayer on the splash screen to begin.");
    return false;
  };

  const start = () => {
    if (!requireSession()) return;
    if (state.session === "edu") {
      state.run = "idle";
      setAlert("Education Mode: gameplay is disabled (no scoring).");
      return;
    }
    state.run = "running";
    startTimer();
    announce();
  };

  const stop = () => {
    if (!requireSession()) return;
    state.run = "stopped";
    announce();
    setAlert("Game ended. Press New Game to start a fresh run.");
  };

  const newGame = () => {
    if (!requireSession()) return;
    hardReset();
    start();
  };

  const submitNote = (guess: NoteName) => {
    if (state.session === "edu") {
      state.target = guess;
      setAlert(`Education Mode: selected ${guess}.`);
      return;
    }
    if (state.run !== "running") {
      setAlert(`(Not running) You clicked ${guess}. Press Start.`);
      return;
    }

    if (guess === state.target) {
      state.streak += 1;
      state.score += 100 * clamp(1 + Math.floor(state.streak / 3), 1, 6);
      setAlert(`✓ Correct: ${guess} • +${100 * clamp(1 + Math.floor(state.streak / 3), 1, 6)} points`);
      window.setTimeout(() => {
        setTarget();
      }, 450);
    } else {
      state.streak = 0;
      const sam = Boolean(getSetting(state.settings, "ps.sam", false as const));
      setAlert(`✗ Wrong: ${guess} • Target was ${state.target}${sam ? " • SAM" : ""}`);
      if (sam) flashSamTarget(state.target);
      window.setTimeout(() => announce(), 900);
    }
  };

  // --- Event wiring ---
  window.addEventListener("gedu:start", start);
  window.addEventListener("gedu:stop", stop);
  window.addEventListener("gedu:new", newGame);

  // Splash session selection
  window.addEventListener("gedu:splashSelect", (ev: Event) => {
    const e = ev as CustomEvent<{ session: "single" | "multi" | "edu" }>;
    const session = e.detail?.session;
    state.session = session ?? "single";

    const nameEl = document.getElementById("activePlayer-name");
    if (nameEl) nameEl.textContent = state.session === "multi" ? "Player 1" : state.session === "edu" ? "Instructor" : "Solo";

    syncSessionUi(state.session);
    if (state.session === "edu") {
      activateUtilityTab("teach");
    } else {
      activateUtilityTab("num");
    }

    setSplashVisible(false);
    hardReset();
    setAlert(state.session === "multi" ? "Multiplayer selected. Ready." : state.session === "edu" ? "Education Mode selected. Ready." : "Single Player selected. Ready.");
  });

  window.addEventListener("gedu:splashSettings", () => {
    setAlert("Settings (splash) is a placeholder for now.");
  });

  window.addEventListener("gedu:splashAccount", () => {
    setAlert("Account (splash) is a placeholder for now.");
  });

  // Help buttons
  root.addEventListener("click", (ev) => {
    const t = ev.target as HTMLElement | null;
    const faq = t?.closest?.("#help-faq");
    const tut = t?.closest?.("#help-tutorials");
    if (faq) setAlert("FAQ placeholder.");
    if (tut) setAlert("Tutorials placeholder.");
  });

  // Gameplay mode selection (left tabs)
  root.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement | null)?.closest?.("#ops-modeTabs .tab") as HTMLButtonElement | null;
    if (!btn) return;
    const mode = btn.dataset.tab as GameMode | undefined;
    if (!mode) return;
    state.mode = mode;
    syncModeUi(mode);
    announce();
  });

  // Settings UI capture (data-setting)
  root.addEventListener("change", (e) => {
    const t = e.target as HTMLElement | null;
    const key = (t as any)?.dataset?.setting as string | undefined;
    if (!key) return;

    let value: SettingValue;
    if (t instanceof HTMLInputElement && t.type === "checkbox") value = t.checked;
    else if (t instanceof HTMLInputElement && t.type === "number") value = Number(t.value);
    else if (t instanceof HTMLSelectElement) value = t.value;
    else if (t instanceof HTMLInputElement) value = t.value;
    else value = "";

    state.settings[key] = value;
    setAlert(`Setting: ${key} → ${String(value)}`);

    // Fretboard overlay range/view sync
    if (key === "pref.fretView" || key === "pref.fretMin" || key === "pref.fretMax") {
      const minEl = document.getElementById("pref-fretMin") as HTMLInputElement | null;
      const maxEl = document.getElementById("pref-fretMax") as HTMLInputElement | null;
      const viewEl = document.getElementById("pref-fretView") as HTMLSelectElement | null;

      let fretMin = Number(getSetting(state.settings, "pref.fretMin", 5 as const));
      let fretMax = Number(getSetting(state.settings, "pref.fretMax", 12 as const));
      const view = Number(getSetting(state.settings, "pref.fretView", 12 as const));

      // If the view was changed, drive max from min for a stable, predictable window.
      if (key === "pref.fretView") {
        fretMax = clamp(Math.floor(fretMin + view - 1), 0, 24);
        state.settings["pref.fretMax"] = fretMax;
        if (maxEl) maxEl.value = String(fretMax);
      }

      // If min/max get inverted, keep a valid range.
      if (fretMax < fretMin) {
        if (key === "pref.fretMin") {
          fretMax = fretMin;
          state.settings["pref.fretMax"] = fretMax;
          if (maxEl) maxEl.value = String(fretMax);
        } else {
          fretMin = fretMax;
          state.settings["pref.fretMin"] = fretMin;
          if (minEl) minEl.value = String(fretMin);
        }
      }

      // Clamp inputs visibly.
      fretMin = clamp(Math.floor(fretMin), 0, 24);
      fretMax = clamp(Math.floor(fretMax), 0, 24);
      if (minEl) minEl.value = String(fretMin);
      if (maxEl) maxEl.value = String(fretMax);
      if (viewEl) viewEl.value = String(view);

      renderFretOverlay({ fretMin, fretMax });
    }

    // Re-render rail when display/visibility/root changes.
    if (key === "core.display" || key === "core.root" || key === "core.noteVisibility") {
      const display = getSetting(state.settings, "core.display", "names" as const);
      const noteVisibility = getSetting(state.settings, "core.noteVisibility", "naturals" as const);
      const rootN = safeNoteFromRoot(getSetting(state.settings, "core.root", "C" as const));
      renderNoteRail(state.target, { display, root: rootN, noteVisibility });
      // If naturals was selected and current target is accidental, re-roll target to a natural.
      if (noteVisibility === "naturals" && state.target.includes("#")) setTarget();
    }
  });

  // Note strip input (click any tile)
  root.addEventListener("click", (e) => {
    const tile = (e.target as HTMLElement | null)?.closest?.(".noteTile") as HTMLElement | null;
    if (!tile) return;
    if (tile.dataset.disabled === "1") return;
    const note = tile.dataset.note as NoteName | undefined;
    if (!note) return;
    submitNote(note);
  });

  // Fretboard input (click any overlay cell)
  root.addEventListener("click", (e) => {
    const cell = (e.target as HTMLElement | null)?.closest?.(".fretCell") as HTMLElement | null;
    if (!cell) return;

    const note = (cell.dataset.note as NoteName | undefined) ?? null;
    if (!note) return;

    // Visual feedback on the fretboard
    const overlay = document.getElementById("fretOverlay");
    if (overlay) {
      overlay.querySelectorAll<HTMLElement>(".fretCell.active").forEach((n) => n.classList.remove("active"));
    }
    cell.classList.add("active");

    const wasRunning = state.run === "running" && state.session !== "edu";
    const isCorrect = wasRunning && note === state.target;

    // Pulse hit/miss briefly (disabled in Education Mode)
    cell.classList.remove("hit", "miss");
    if (wasRunning) cell.classList.add(isCorrect ? "hit" : "miss");
    window.setTimeout(() => cell.classList.remove("hit", "miss"), 650);

    submitNote(note);

    const sam = Boolean(getSetting(state.settings, "ps.sam", false as const));
    if (wasRunning && !isCorrect && sam) flashSamFretboard(state.target);
  });

  // Keypad input (already emits gedu:keypad)
  window.addEventListener("gedu:keypad", (ev: Event) => {
    const e = ev as CustomEvent<{ key: string; text: string }>;
    const k = e.detail?.key;
    const text = e.detail?.text ?? "";

    if (k === "ENTER") {
      const v = Number.parseInt(text, 10);
      if (Number.isFinite(v)) {
        const idx = ((v % 12) + 12) % 12;
        submitNote(NOTE_NAMES[idx]);
      } else {
        setAlert("Enter expects a number (0-11 maps to notes). ");
        announce();
      }
      state.inputText = "";
      syncKeypadDisplay(state.inputText);
      return;
    }

    if (k === "CLEAR") {
      state.inputText = "";
      syncKeypadDisplay(state.inputText);
      announce();
      return;
    }

    // digits
    if (/^\d$/.test(k)) {
      state.inputText = text;
      syncKeypadDisplay(state.inputText);
      announce();
    }
  });

  // Initial paint
  syncModeUi(state.mode);
  setSplashVisible(true);
  hardReset();
  setAlert("Select Single Player or Multiplayer to begin.");
}
