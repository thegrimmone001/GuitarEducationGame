import { BUILD_ID } from "../app/buildInfo";
import presetsAj from "../data/presets_A-J_v1_1.json";
const NOTE_NAMES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

type Opt = { label: string; value: string };

type ElAttrs = Record<string, string>;

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: ElAttrs = {},
  children: Array<Element | Text | string> = [],
) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  for (const c of children) node.append(c instanceof Node ? c : document.createTextNode(c));
  return node;
};

const SVG_NS = "http://www.w3.org/2000/svg";

const elSvg = <K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: ElAttrs = {},
  children: Array<SVGElement | Text | string> = [],
) => {
  const node = document.createElementNS(SVG_NS, tag) as SVGElementTagNameMap[K];
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  for (const c of children) node.append(c instanceof Node ? c : document.createTextNode(c));
  return node;
};

function build2OctaveRail(home: string) {
  const rail = el("div", { class: "rail", id: "noteStrip-rail" });
  const startIdx = NOTE_NAMES.indexOf(home);
  const seq: string[] = [];
  // Two-octave span centered on the current note.
  // 25 tiles: 12 notes to the left, the current note, 12 notes to the right.
  for (let offset = -12; offset <= 12; offset++) {
    seq.push(NOTE_NAMES[(startIdx + offset + 1200) % 12]);
  }

  seq.forEach((n, i) => {
    const isCenter = i === 12;
    rail.append(
      el(
        "div",
        {
          class: `noteTile ${n.includes("#") ? "acc" : ""}${isCenter ? " active" : ""}`.trim(),
          "data-note": n,
          "data-idx": String(i),
          ...(isCenter ? { "data-center": "1" } : {}),
        },
        [n],
      ),
    );
  });

  return rail;
}

function wireTabs(root: HTMLElement) {
  const groups = root.querySelectorAll<HTMLElement>("[data-tabs]");
  groups.forEach((g) => {
    const tabs = Array.from(g.querySelectorAll<HTMLButtonElement>(".tab"));
    const panes = Array.from(g.querySelectorAll<HTMLElement>(".pane"));
    const activate = (id: string) => {
      tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === id));
      panes.forEach((p) => p.classList.toggle("active", p.dataset.pane === id));
    };
    tabs.forEach((t) => t.addEventListener("click", () => activate(t.dataset.tab!)));
    activate(tabs[0]?.dataset.tab ?? "single");
  });
}

// ---- Form helpers (UI only; engine wiring comes later) ----
function selectEl(id: string, options: Opt[], settingKey?: string, value?: string) {
  const s = document.createElement("select");
  s.id = id;
  s.className = "select";
  if (settingKey) s.dataset.setting = settingKey;
  options.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o.value;
    opt.textContent = o.label;
    s.appendChild(opt);
  });
  if (value != null) s.value = value;
  return s;
}

function numberEl(id: string, min: number, max: number, settingKey?: string, value?: number) {
  const i = document.createElement("input");
  i.type = "number";
  i.id = id;
  i.className = "numInput";
  i.min = String(min);
  i.max = String(max);
  i.step = "1";
  if (settingKey) i.dataset.setting = settingKey;
  if (value != null) i.value = String(value);
  return i;
}

function checkboxEl(id: string, checked = false, settingKey?: string) {
  const i = document.createElement("input");
  i.type = "checkbox";
  i.id = id;
  i.checked = checked;
  i.className = "toggle";
  if (settingKey) i.dataset.setting = settingKey;
  return i;
}

function formRow(label: string, control: HTMLElement, hint?: string) {
  return el("div", { class: "formRow" }, [
    el("div", { class: "formLabel" }, [label]),
    el("div", { class: "formControl" }, [control]),
    ...(hint ? [el("div", { class: "formHint" }, [hint])] : []),
  ]);
}

function formRowInline(label: string, controls: HTMLElement[]) {
  return el("div", { class: "formRow" }, [
    el("div", { class: "formLabel" }, [label]),
    el("div", { class: "formControl" }, [el("div", { class: "inline" }, controls)]),
  ]);
}

function checkGroup(title: string, items: Array<{ label: string; id: string; key: string }>) {
  const wrap = el("div", { class: "checkGroup" });
  if (title.trim().length) wrap.append(el("div", { class: "groupTitle" }, [title]));
  const grid = el("div", { class: "checks" });
  items.forEach((it) => {
    const row = el("label", { class: "check" }, [
      checkboxEl(it.id, false, it.key),
      el("span", { class: "checkText" }, [it.label]),
    ]);
    grid.append(row);
  });
  wrap.append(grid);
  return wrap;
}

function miniBtn(id: string, eventName: string, text: string, color: string) {
  const b = el("button", { class: "btn btn-sm", id, type: "button" }, [
    el("span", { class: `dot ${color}` }),
    el("span", { class: "btnText" }, [text]),
  ]);
  b.addEventListener("click", () => window.dispatchEvent(new CustomEvent(eventName)));
  return b;
}

function buildKeypad() {
  const keypad = document.getElementById("keypad");
  if (!keypad) return;

  // 25-key fret selector (instant):
  // - 5 columns × 5 rows
  // - keys: 0..24
  // - no ENTER / DEL / CLEAR (selection is immediate)
  // Layout (row-major):
  //  0  1  2  3  4
  //  5  6  7  8  9
  // 10 11 12 13 14
  // 15 16 17 18 19
  // 20 21 22 23 24
  const keys: Array<{ label: string; value: number }> = Array.from({ length: 25 }, (_, i) => ({
    label: String(i),
    value: i,
  }));

  keypad.innerHTML = "";
  keypad.classList.add("keypad-25");

  keys.forEach((k) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "key";
    b.dataset.fret = String(k.value);
    b.textContent = k.label;
    b.addEventListener("click", () => {
      // Highlight selected fret key for visibility.
      keypad.querySelectorAll<HTMLButtonElement>(".key").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      window.dispatchEvent(new CustomEvent("gedu:fretPick", { detail: { fret: k.value } }));
    });
    keypad.appendChild(b);
  });
}

export function mountLayout(target: HTMLElement) {
  const shell = el("div", { class: "ge-shell", id: "ge-shell" });

  // --- Launch / Menu Stage ---
  // Central menu is the starting point. Menus expand left→right into columns.
  // Education and Single Player → Free Play enter the UI directly.
  // Single Player → Game and Multiplayer flow into Match Options.

  // Launch menu (shown first)
  const launch = el("div", { class: "ge-launch", id: "ge-launch" });
  const launchShell = el("div", { class: "ge-launchShell" });

  // Top row: branding + account area (separate from the core menu flow).
  const acctNote = el("div", { class: "ge-launchAccountNote" }, [
    "Account is not wired yet (UI placeholder).",
  ]);
  const btnLogin = el("button", { class: "ge-launchMiniBtn", type: "button" }, ["Log In"]);
  const btnCreate = el("button", { class: "ge-launchMiniBtn", type: "button" }, ["Create Account"]);
  btnLogin.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("gedu:account", { detail: { action: "login" } }));
  });
  btnCreate.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("gedu:account", { detail: { action: "create" } }));
  });

  const launchTop = el("div", { class: "ge-launchTop" }, [
    el("div", { class: "ge-launchBrand" }, [
      el("div", { class: "ge-launchBrandTitle" }, ["GuitarEdu"]),
      el("div", { class: "ge-launchBrandSub" }, ["Start Menu"]),
    ]),
    el("div", { class: "ge-launchAccount" }, [
      el("div", { class: "ge-launchAccountTitle" }, ["Account"]),
      el("div", { class: "ge-launchAccountBtns" }, [btnLogin, btnCreate]),
      acctNote,
    ]),
  ]);

  const launchCols = el("div", { class: "ge-launchCols", id: "ge-launchCols" });
  launchShell.append(launchTop, launchCols);
  launch.append(launchShell);

  // Main app layout (hidden until an entry path is chosen)
  const main = el("div", { class: "ge-main hidden" });

  type LaunchIntent = "education" | "freeplay" | "game" | "multiplayer";
  const launchState: {
    intent: LaunchIntent | null;
    playerCount: number;
    playerNames: string[];
    playersConfirmed: boolean;
  } = { intent: null, playerCount: 1, playerNames: ["P1"], playersConfirmed: false };

  
const SPINE_COLS = 3;

const isPlaceholderCol = (n: Element) => (n as HTMLElement).classList.contains("ge-menuColPlaceholder");

const makePlaceholderCol = () => {
  const col = el("div", { class: "ge-menuCol ge-menuColPlaceholder" });
  col.append(el("div", { class: "ge-menuTitle" }, [""]));
  col.append(el("div", { class: "ge-menuList" }, []));
  return col;
};

const ensureSpineSlots = () => {
  // Remove extra placeholders if we somehow exceeded the spine width.
  while (launchCols.children.length > SPINE_COLS) launchCols.lastElementChild?.remove();
  // Add placeholders to keep the "spine" visible.
  while (launchCols.children.length < SPINE_COLS) launchCols.append(makePlaceholderCol());
};

const clearColsFrom = (idx: number) => {
  const kids = Array.from(launchCols.children);
  kids.slice(idx).forEach((k) => k.remove());
  ensureSpineSlots();
};

const appendRealCol = (col: HTMLElement) => {
  // Always append real columns before placeholders.
  const kids = Array.from(launchCols.children);
  kids.filter(isPlaceholderCol).forEach((k) => k.remove());
  launchCols.append(col);
  ensureSpineSlots();
};

const addCol = (title: string, items: Array<{ label: string; onPick: () => void }>) => {
  const col = el("div", { class: "ge-menuCol" });
  col.append(el("div", { class: "ge-menuTitle" }, [title]));
  const list = el("div", { class: "ge-menuList" });
  items.forEach((it) => {
    const b = el("button", { class: "ge-menuItem", type: "button" }, [it.label]);
    b.addEventListener("click", it.onPick);
    list.append(b);
  });
  col.append(list);
  appendRealCol(col);
  return col;
};

const addColNode = (title: string, node: HTMLElement) => {
  const col = el("div", { class: "ge-menuCol" });
  col.append(el("div", { class: "ge-menuTitle" }, [title]));
  col.append(node);
  appendRealCol(col);
  return col;
};

  let currentIntent: "education" | "freeplay" | "game" | "multiplayer" | "" = "";

  // Forward declarations for flyout functions (defined later)
  let openFlyout: () => void;
  let closeFlyout: () => void;

  const enterUI = () => {
    currentIntent = (launchState.intent ?? "") as any;
    launch.classList.add("hidden");
    main.classList.remove("hidden");
    // Teaching Tools are only available for Education / Free Play.
    // Game + Multiplayer are locked to pre-match settings.
    const allowTeachingTools = currentIntent === "education" || currentIntent === "freeplay";
    const tt = document.getElementById("teachingTools");
    if (tt) tt.classList.toggle("hidden", !allowTeachingTools);
    window.dispatchEvent(new CustomEvent("gedu:enterUI", { detail: { intent: launchState.intent ?? "" } }));
  };

  // Match Options: Domain Constraints first, then Presets, then all other options.
  // This is a UI-only ordering rule to speed up iteration.

  // Canon: Start Screen “Initialization Panels” must be able to pre-seed
  // Match Options. We store a draft payload on window during menu navigation.
  const makeDefaultMatchOptions = () => ({
    learningType: "single" as string, // single | interval | chord | scale | arpeggio
    context: {
      key: "C",
      // Pitch Framework is a checkbox set. Stored as CSV for now (e.g., "chromatic,ionian,pentatonic").
      pitchFramework: "chromatic",
      // Accidentals is a pool (Naturals/Sharps/Flats). Stored as CSV (default all).
      accidentals: "naturals,sharps,flats",
    },
    domain: {
      fretMin: 0,
      fretMax: 12,
      instrument: "guitar",
      tuning: "standard",
      // String selection is explicit (6..1). Stored as a CSV for now (UI shell).
      strings: "6,5,4,3,2,1",
      span: 4,
    },
    preset: "A" as string,
    inputMethod: "singleNote" as string, // singleNote | structure | partial
    // Legacy surface toggles retained for backward compatibility with pre-B2 rendering.
    // Canon user-facing concept is Surface Controls (Prompt / Mark / Persistence / SAM).
    // Boards are always visible; the older visibility toggle is deprecated and must not be surfaced.
    surfaces: {
      fretboard: { prompt: true, mark: true, display: true, sam: true, cardinality: "all" },
      staff: { prompt: false, mark: true, display: true, sam: false, cardinality: "single" },
      tab: { prompt: false, mark: true, display: true, sam: false, cardinality: "single" },
      noteRail: { prompt: true, mark: false, display: true, sam: false, cardinality: "single" },
    },

    // Phase B-2 (v1.1) UI-output contract blocks (no engine wiring implied).
    answer: { set: "single", count: 1 }, // Answer Set ≠ Answer Count
    surfaceControlsV11: {
      $id: "glg.surfaceControls.schema.v1.1",
      surfaces: {
        fretboard: {
          prompt: { enabled: true, scope: "single" },
          mark: { enabled: true, scope: "single" },
          persistence: { enabled: true, scope: "single" },
          sam: { enabled: true, revealMode: "single" },
        },
        staff: {
          prompt: { enabled: false, scope: "single" },
          mark: { enabled: true, scope: "single" },
          persistence: { enabled: true, scope: "single" },
          sam: { enabled: false, revealMode: "single" },
        },
        tab: {
          prompt: { enabled: false, scope: "single" },
          mark: { enabled: true, scope: "single" },
          persistence: { enabled: true, scope: "single" },
          sam: { enabled: false, revealMode: "single" },
        },
        noteRail: {
          prompt: { enabled: true, scope: "single" },
          mark: { enabled: false, scope: "single" },
          // Canon note: for H/I/J, Note Rail should NOT persist by default (handled by presets table).
          persistence: { enabled: false, scope: "single" },
          sam: { enabled: false, revealMode: "single" },
        },
      },
    },
    pitchSetsV11: {
      intervals: [],
      chords: [],
      scalesModes: [],
      arpeggios: [],
    },
    progressionsV11: {
      enabled: false,
      steps: [],
      libraryId: "",
    },
    timersV11: {
      turnTimer: { enabled: false, seconds: 10 },
      runtimeCap: { enabled: false, seconds: 0 },
      attemptsPerTurn: { enabled: false, count: 0 },
      // Check Clock / Chess Clock / Time Bank behaviors (shell).
      clockMode: "off", // off | checkClock | chessClock | timeBank
      timeBankSeconds: 0,
      incrementSeconds: 0,
      penaltySeconds: 0,
      onCorrectAddSeconds: 0,
      onWrongSubtractSeconds: 0,
    },
    systemSettingsV11: {
      tonalAssist: {
        enabled: true,
        scope: "currentEditedObject",
        sensitivity: "medium",
        suggestionLimit: 8,
        candidateSets: {
          major: true,
          minorVariants: true,
          modes: true,
          majorBlues: true,
          minorBlues: true,
        },
      },
    },

    rules: {
      difficulty: "medium", // easy | medium | hard (Free Play is a separate entry path)
      timer: "off",
      accuracy: "singleDomain",
      board: "shared",
    },
  });

const showMatchOptions = () => {
  clearColsFrom(2);

  // Local state for the Match Options shell (wiring is event-driven; no refactor).
  // NOTE: Basic vs Advanced is a hard split. Basic is always visible; Advanced is collapsed.
  const mo = structuredClone(
    (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ ?? makeDefaultMatchOptions()
  );

  let lastEmitSig = "";
  let lastEmitAt = 0;
  let emitPending = false;
  let initPhase = true;
  let initEmitQueued = false;

  const emit = () => {
    // During initial mount, many controls call sync()/emit(). We suppress those and
    // emit exactly once when initialization completes.
    if (initPhase) {
      if (!initEmitQueued) {
        initEmitQueued = true;
        queueMicrotask(() => {
          initEmitQueued = false;
          if (initPhase) return; // still initializing
          emit();
        });
      }
      return;
    }

    // Coalesce multiple rapid sync() calls into a single emission.
    if (emitPending) return;
    emitPending = true;
    queueMicrotask(() => {
      emitPending = false;
      const sig = JSON.stringify(mo);
      const now = performance.now();

      // Ignore duplicates (and near-duplicates during control thrash).
      if (sig === lastEmitSig && now - lastEmitAt < 500) return;

    lastEmitSig = sig;
      lastEmitAt = now;

    // Keep draft payload in sync so Initialization Panels can pre-seed and Match Options can resume.
    try {
      (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
    } catch {}

      // Emit a sanitized payload for downstream consumers.
      // The UI keeps a richer draft object for convenience, but the public
      // matchOptions payload must not include deprecated legacy keys.
      const payload: any = structuredClone(mo);
      // Legacy surface toggles (prompt/mark/display/sam) are deprecated in favor of Surface Controls v1.1.
      delete payload.surfaces;
      // Legacy surface layer toggles are deprecated (Prompt / Mark / Persistence / SAM is canonical).
      delete payload.surfaceLayers;

      (window as any).__GEDU_LAST_MATCH_OPTIONS__ = payload;
      window.dispatchEvent(new CustomEvent("gedu:matchOptions", { detail: payload }));
    });
  };

  const col = el("div", { class: "ge-menuCol ge-matchOptionsCol" });
  col.append(el("div", { class: "ge-menuTitle" }, ["Match Options"]));

  const section = (title: string) => {
    const s = el("div", { class: "ge-moSection" });
    s.append(el("div", { class: "ge-moSectionTitle" }, [title]));
    return s;
  };

  const row = () => el("div", { class: "ge-moRow" });

  const labeledSelect = (
    label: string,
    opts: Array<{ v: string; t: string }>,
    value: string,
    onChange: (v: string) => void,
  ) => {
    const wrap = el("label", { class: "ge-moField" });
    wrap.append(el("div", { class: "ge-moLabel" }, [label]));
    const sel = document.createElement("select");
    sel.className = "ge-moSelect";
    opts.forEach((o) => {
      const op = document.createElement("option");
      op.value = o.v;
      op.textContent = o.t;
      sel.appendChild(op);
    });
    sel.value = value;
    sel.addEventListener("change", () => onChange(sel.value));
    wrap.append(sel);
    return wrap;
  };

  const labeledNumber = (label: string, value: number, min: number, max: number, onChange: (v: number) => void) => {
    const wrap = el("label", { class: "ge-moField" });
    wrap.append(el("div", { class: "ge-moLabel" }, [label]));
    const inp = document.createElement("input");
    inp.type = "number";
    inp.className = "ge-moNumber";
    inp.value = String(value);
    inp.min = String(min);
    inp.max = String(max);
    inp.addEventListener("change", () => {
      const n = Math.max(min, Math.min(max, Number(inp.value || value)));
      inp.value = String(n);
      onChange(n);
    });
    wrap.append(inp);
    return wrap;
  };

  const pillGroup = (label: string, items: Array<{ k: string; t: string }>, getCsv: () => string, setCsv: (csv: string) => void) => {
    const wrap = el("div", { class: "ge-moField" });
    wrap.append(el("div", { class: "ge-moLabel" }, [label]));
    const group = el("div", { class: "ge-moPillRow" });

    const getSet = () => new Set((getCsv() || "").split(",").map((s) => s.trim()).filter(Boolean));
    const sync = () => {
      const set = getSet();
      group.querySelectorAll("button[data-k]").forEach((b) => {
        const k = (b as HTMLButtonElement).dataset.k || "";
        (b as HTMLButtonElement).classList.toggle("is-active", set.has(k));
      });
    };
    const toggle = (k: string) => {
      const set = getSet();
      if (set.has(k)) set.delete(k);
      else set.add(k);
      // If the set is empty, fall back to first item to avoid "nothing selected" states.
      if (set.size === 0 && items.length) set.add(items[0].k);
      setCsv(Array.from(set).join(","));
      sync();

// End initial mount phase: allow a single canonical matchOptions emission.
queueMicrotask(() => {
  initPhase = false;
  emit();
});

      emit();
    };

    items.forEach((it) => {
      const b = el("button", { class: "ge-moPill", type: "button" }, [it.t]) as HTMLButtonElement;
      b.dataset.k = it.k;
      b.addEventListener("click", () => toggle(it.k));
      group.append(b);
    });

    wrap.append(group);
    // Initial sync
    sync();
    return wrap;
  };

  const setLearningType = (v: string, imSelect?: HTMLSelectElement, imSection?: HTMLElement, ltConstraints?: HTMLElement) => {
    mo.learningType = v;

    // Input Method is only valid for Chords / Scales / Arpeggios.
    const allowIM = v === "chord" || v === "scale" || v === "arpeggio";
    if (!allowIM) mo.inputMethod = "singleNote";
    if (imSelect) {
      imSelect.disabled = !allowIM;
      imSelect.value = mo.inputMethod;
    }
    if (imSection) imSection.classList.toggle("hidden", !allowIM);

    // Learning Target Constraints is context-gated.
    if (ltConstraints) {
      ltConstraints.querySelectorAll<HTMLElement>("[data-lt]").forEach((p) => {
        p.classList.toggle("hidden", p.dataset.lt !== v);
      });
    }

    emit();
  };

  // -----------------------------
  // BASIC MATCH SETTINGS (always visible)
  // -----------------------------
  const sBasic = section("Basic Match Settings");

  // Learning Target + Difficulty
  const rBasic0 = row();
  rBasic0.append(
    labeledSelect(
      "Learning Target",
      [
        { v: "single", t: "Single Note" },
        { v: "interval", t: "Intervals" },
        { v: "chord", t: "Chords" },
        { v: "scale", t: "Scales" },
        { v: "arpeggio", t: "Arpeggios" },
      ],
      mo.learningType,
      (v) => setLearningType(v),
    ),
  );
  rBasic0.append(
    labeledSelect(
      "Difficulty",
      [
        { v: "easy", t: "Easy" },
        { v: "medium", t: "Medium" },
        { v: "hard", t: "Hard" },
      ],
      mo.rules.difficulty,
      (v) => {
        mo.rules.difficulty = v;
        emit();
      },
    ),
  );
  sBasic.append(rBasic0);

  // Key + Pitch Framework
  const rBasic1 = row();
  rBasic1.append(
    labeledSelect(
      "Key",
      ["C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"].map((k) => ({
        v: k,
        t: k,
      })),
      mo.context.key,
      (v) => {
        mo.context.key = v;
        emit();
      },
    ),
  );

  // Pitch Framework is a checkbox set.
  rBasic1.append(
    pillGroup(
      "Pitch Framework",
      [
        { k: "chromatic", t: "Chromatic" },
        { k: "ionian", t: "Ionian" },
        { k: "dorian", t: "Dorian" },
        { k: "phrygian", t: "Phrygian" },
        { k: "lydian", t: "Lydian" },
        { k: "mixolydian", t: "Mixolydian" },
        { k: "aeolian", t: "Aeolian" },
        { k: "locrian", t: "Locrian" },
        { k: "pentatonic", t: "Pentatonic" },
        { k: "blues", t: "Blues" },
      ],
      () => mo.context.pitchFramework,
      (csv) => {
        mo.context.pitchFramework = csv;
      },
    ),
  );
  sBasic.append(rBasic1);

  // Accidentals pool + Fret Range
  const rBasic2 = row();
  rBasic2.append(
    pillGroup(
      "Accidentals",
      [
        { k: "naturals", t: "Naturals" },
        { k: "sharps", t: "Sharps" },
        { k: "flats", t: "Flats" },
      ],
      () => mo.context.accidentals,
      (csv) => {
        mo.context.accidentals = csv;
      },
    ),
  );
  rBasic2.append(
    labeledNumber("Fret Min", mo.domain.fretMin, 0, 24, (n) => {
      mo.domain.fretMin = n;
      if (mo.domain.fretMax < n) mo.domain.fretMax = n;
      emit();
    }),
  );
  rBasic2.append(
    labeledNumber("Fret Max", mo.domain.fretMax, 0, 24, (n) => {
      mo.domain.fretMax = n;
      if (mo.domain.fretMin > n) mo.domain.fretMin = n;
      emit();
    }),
  );
  sBasic.append(rBasic2);

  col.append(sBasic);

  // -----------------------------
  // ADVANCED MATCH SETTINGS (flyout)
  // Canon: Advanced settings are not embedded into the Match Options column.
  // They open in their own wing/flyout overlaying the playfield.
  // -----------------------------
  const advOpenBtn = el(
    "button",
    { class: "ge-advOpenBtn", type: "button", "aria-haspopup": "dialog" },
    ["Advanced Match Settings"],
  ) as HTMLButtonElement;
  col.append(advOpenBtn);

  // Canon: Wing Fly-Out System (v1.2)
// - Right-anchored wing (not centered modal)
// - No dimming scrim (click-catcher only)
// - No internal scrolling
// - Fixed header (Instrument Settings)
// - Fixed Presets A–J row
// - Main Grid: Column A (Surface + Pitch Set Source) | Column B (Mode + Context)
// - Bottom Grid: Column A (Timers/Rules) | Column B (Tonal Assist guidance)
const advScrim = el("div", { class: "ge-advBackdrop hidden" }) as HTMLDivElement;
const advFlyout = el("div", { class: "ge-advWing hidden", role: "dialog", "aria-modal": "false" }) as HTMLDivElement;

// Title bar (close only; non-modal)
const advFlyoutTitleBar = el("div", { class: "ge-advTitleBar" });
const advFlyoutTitle = el("div", { class: "ge-advFlyoutTitle" }, ["Advanced Match Settings"]);
const advCloseBtn = el("button", { class: "ge-advCloseBtn", type: "button" }, ["Close"]) as HTMLButtonElement;
advFlyoutTitleBar.append(advFlyoutTitle, advCloseBtn);

// Header: Instrument + Learning Context + Presets (all in one row)
const advHeader = el("div", { class: "ge-advHeader" });

// Instrument section
const advHeaderInstr = el("div", { class: "ge-advHeaderSection" });
const advHeaderLabel = el("div", { class: "ge-advHeaderLabel" }, ["Instrument"]);
const advInstrumentGrid = el("div", { class: "ge-advInstrumentGrid" });
advHeaderInstr.append(advHeaderLabel, advInstrumentGrid);

// Learning Type section
const advHeaderLearn = el("div", { class: "ge-advHeaderSection" });
const advLearnLabel = el("div", { class: "ge-advHeaderLabel" }, ["Learning"]);
const advLearnSel = document.createElement("select");
advLearnSel.className = "ge-moSelect";
[
  { v: "single", t: "Single Note" },
  { v: "chord", t: "Chords" },
  { v: "scale", t: "Scales" },
  { v: "arpeggio", t: "Arpeggios" },
  { v: "interval", t: "Intervals" },
].forEach((o) => {
  const op = document.createElement("option");
  op.value = o.v;
  op.textContent = o.t;
  advLearnSel.appendChild(op);
});
advLearnSel.value = "single";
advLearnSel.addEventListener("change", () => {
  (window as any).__GEDU_DRAFT_MATCH_OPTIONS__.learningType = advLearnSel.value;
});
advHeaderLearn.append(advLearnLabel, advLearnSel);

// Key section
const advHeaderKey = el("div", { class: "ge-advHeaderSection" });
const advKeyLabel = el("div", { class: "ge-advHeaderLabel" }, ["Key"]);
const advKeySel = document.createElement("select");
advKeySel.className = "ge-moSelect";
["C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"].forEach((k) => {
  const op = document.createElement("option");
  op.value = k;
  op.textContent = k;
  advKeySel.appendChild(op);
});
advKeySel.value = "C";
advKeySel.addEventListener("change", () => {
  (window as any).__GEDU_DRAFT_MATCH_OPTIONS__.context.key = advKeySel.value;
});
advHeaderKey.append(advKeyLabel, advKeySel);

// Presets section
const advPresetsInHeader = el("div", { class: "ge-advHeaderSection" });
const advPresetsLabel = el("div", { class: "ge-advHeaderLabel" }, ["Presets"]);
const advPresetsHost = el("div", { class: "ge-advPresetsHost" });
advPresetsInHeader.append(advPresetsLabel, advPresetsHost);

// Assemble header
advHeader.append(advHeaderInstr, advHeaderLearn, advHeaderKey, advPresetsInHeader);

// Tab navigation for Advanced Settings (4 tabs now)
const advTabsRow = el("div", { class: "ge-advTabsRow" });
const advTabSurfacePitch = el("button", { class: "ge-advTabBtn active", type: "button" }, ["Surface & Pitch"]);
const advTabTimersRules = el("button", { class: "ge-advTabBtn", type: "button" }, ["Timers & Rules"]);
const advTabLearning = el("button", { class: "ge-advTabBtn", type: "button" }, ["Learning"]);
const advTabProgressions = el("button", { class: "ge-advTabBtn", type: "button" }, ["Progressions"]);
advTabsRow.append(advTabSurfacePitch, advTabTimersRules, advTabLearning, advTabProgressions);

// Content panels for each tab
const advContentSurfacePitch = el("div", { class: "ge-advContentPanel" });
const advContentTimersRules = el("div", { class: "ge-advContentPanel hidden" });
const advContentLearning = el("div", { class: "ge-advContentPanel hidden" });
const advContentProgressions = el("div", { class: "ge-advContentPanel hidden" });

// Tab click handlers
advTabSurfacePitch.addEventListener("click", () => {
  advTabSurfacePitch.classList.add("active");
  advTabTimersRules.classList.remove("active");
  advTabLearning.classList.remove("active");
  advTabProgressions.classList.remove("active");
  advContentSurfacePitch.classList.remove("hidden");
  advContentTimersRules.classList.add("hidden");
  advContentLearning.classList.add("hidden");
  advContentProgressions.classList.add("hidden");
});

advTabTimersRules.addEventListener("click", () => {
  advTabSurfacePitch.classList.remove("active");
  advTabTimersRules.classList.add("active");
  advTabLearning.classList.remove("active");
  advTabProgressions.classList.remove("active");
  advContentSurfacePitch.classList.add("hidden");
  advContentTimersRules.classList.remove("hidden");
  advContentLearning.classList.add("hidden");
  advContentProgressions.classList.add("hidden");
});

advTabLearning.addEventListener("click", () => {
  advTabSurfacePitch.classList.remove("active");
  advTabTimersRules.classList.remove("active");
  advTabLearning.classList.add("active");
  advTabProgressions.classList.remove("active");
  advContentSurfacePitch.classList.add("hidden");
  advContentTimersRules.classList.add("hidden");
  advContentLearning.classList.remove("hidden");
  advContentProgressions.classList.add("hidden");
});

advTabProgressions.addEventListener("click", () => {
  advTabSurfacePitch.classList.remove("active");
  advTabTimersRules.classList.remove("active");
  advTabLearning.classList.remove("active");
  advTabProgressions.classList.add("active");
  advContentSurfacePitch.classList.add("hidden");
  advContentTimersRules.classList.add("hidden");
  advContentLearning.classList.add("hidden");
  advContentProgressions.classList.remove("hidden");
});

// Main + Bottom grids - restructure to use content panels
const advGrids = el("div", { class: "ge-advGrids" });

// Surface & Pitch tab content (2 columns)
const advContentSurfacePitchInner = el("div", { class: "ge-advMainGrid" });
const advColA = el("div", { class: "ge-advCol ge-advColA" });
const advColB = el("div", { class: "ge-advCol ge-advColB" });
advContentSurfacePitchInner.append(advColA, advColB);
advContentSurfacePitch.append(advContentSurfacePitchInner);

// Timers & Rules tab content (1 column - bottom area)
const advContentTimersRulesInner = el("div", { class: "ge-advBottomGrid" });
const advColABottom = el("div", { class: "ge-advCol ge-advColABottom" });
const advColBBottom = el("div", { class: "ge-advCol ge-advColBBottom" });
advContentTimersRulesInner.append(advColABottom, advColBBottom);
advContentTimersRules.append(advContentTimersRulesInner);

// Learning tab content (uses remaining space)
const advContentLearningInner = el("div", { class: "ge-advMainGrid" });
const advColLearningA = el("div", { class: "ge-advCol ge-advColA" });
const advColLearningB = el("div", { class: "ge-advCol ge-advColB" });
advContentLearningInner.append(advColLearningA, advColLearningB);
advContentLearning.append(advContentLearningInner);

// Progressions tab content
const advContentProgressionsInner = el("div", { class: "ge-advMainGrid" });
const advColProgA = el("div", { class: "ge-advCol ge-advColA" });
const advColProgB = el("div", { class: "ge-advCol ge-advColB" });
advContentProgressionsInner.append(advColProgA, advColProgB);
advContentProgressions.append(advContentProgressionsInner);

// Assemble grids with content panels
advGrids.append(advTabsRow, advContentSurfacePitch, advContentTimersRules, advContentLearning, advContentProgressions);

// Footer with Start/Back buttons
const advFooter = el("div", { class: "ge-advFooter" });
const advStartBtn = el("button", { class: "ge-advStartBtn", type: "button" }, ["Start Match"]);
advStartBtn.addEventListener("click", () => {
  closeFlyout();
  launchState.intent = "game";
  enterUI();
});
const advBackBtn = el("button", { class: "ge-advBackBtn", type: "button" }, ["Back"]);
advBackBtn.addEventListener("click", () => clearColsFrom(1));
advFooter.append(advStartBtn, advBackBtn);

// Assemble wing (presets now embedded in header)
advFlyout.append(advFlyoutTitleBar, advHeader, advGrids, advFooter);
document.body.append(advScrim, advFlyout);

// Open/close helpers (UI shell only)
let lastFocus: HTMLElement | null = null;
closeFlyout = () => {
  advScrim.classList.add("hidden");
  advFlyout.classList.add("hidden");
  if (lastFocus) lastFocus.focus();
  lastFocus = null;
};
openFlyout = () => {
  // Initialize match options if not already done
  if (!(window as any).__GEDU_DRAFT_MATCH_OPTIONS__) {
    (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(makeDefaultMatchOptions());
  }
  const mo = (window as any).__GEDU_DRAFT_MATCH_OPTIONS__;
  // Sync header selectors with current match options
  advLearnSel.value = mo.learningType ?? "single";
  advKeySel.value = mo.context?.key ?? "C";

  lastFocus = (document.activeElement as HTMLElement) || null;
  advScrim.classList.remove("hidden");
  advFlyout.classList.remove("hidden");
  const first = advFlyout.querySelector<HTMLElement>("button,select,input,textarea,[tabindex]:not([tabindex='-1'])");
  if (first) first.focus();
};
advOpenBtn.addEventListener("click", openFlyout);
advScrim.addEventListener("click", closeFlyout);
advCloseBtn.addEventListener("click", () => {
  closeFlyout();
  clearColsFrom(1);
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // First close advanced flyout if open
    if (!advFlyout.classList.contains("hidden")) {
      closeFlyout();
      clearColsFrom(1);
      e.preventDefault();
      return;
    }
    // Otherwise go back in menu (like clicking Back button)
    const kids = Array.from(launchCols.children);
    if (kids.length > 1) {
      clearColsFrom(kids.length - 1);
      e.preventDefault();
    }
  }
});

// Regions are appended below:

  // 1) Instrument Controls
  const sDomain = section("Instrument Controls");
  const rD0 = row();
  rD0.append(
    labeledSelect(
      "Instrument",
      [
        { v: "guitar", t: "Guitar" },
        { v: "bass", t: "Bass" },
        { v: "ukulele", t: "Ukulele" },
        { v: "banjo", t: "Banjo" },
        { v: "custom", t: "Custom" },
      ],
      mo.domain.instrument,
      (v) => {
        mo.domain.instrument = v;
        emit();
      },
    ),
  );
  rD0.append(
    labeledSelect(
      "Tuning",
      [
        { v: "standard", t: "Standard" },
        { v: "dropD", t: "Drop D" },
        { v: "ebStd", t: "E♭ Standard" },
        { v: "dStd", t: "D Standard" },
        { v: "dropC", t: "Drop C" },
        { v: "cStd", t: "C Standard" },
        { v: "openG", t: "Open G" },
        { v: "openD", t: "Open D" },
        { v: "custom", t: "Custom" },
      ],
      mo.domain.tuning,
      (v) => {
        mo.domain.tuning = v;
        emit();
      },
    ),
  );
  sDomain.append(rD0);

  const rD1 = row();
  // Strings: explicit 6..1 checkboxes (stored as CSV in mo.domain.strings)
  {
    const wrap = el("div", { class: "ge-moField" });
    wrap.append(el("div", { class: "ge-moLabel" }, ["Strings"]));
    const group = el("div", { class: "ge-moPillRow ge-moPillRow--strings" });
    const getSet = () => new Set((mo.domain.strings || "").split(",").map((s: string) => s.trim()).filter(Boolean));
    const sync = () => {
      const set = getSet();
      group.querySelectorAll("button[data-str]").forEach((b) => {
        const k = (b as HTMLButtonElement).dataset.str || "";
        (b as HTMLButtonElement).classList.toggle("is-active", set.has(k));
      });
    };
    const toggle = (k: string) => {
      const set = getSet();
      if (set.has(k)) set.delete(k);
      else set.add(k);
      // Never allow zero strings.
      if (set.size === 0) set.add(k);
      // Persist as descending CSV (6..1)
      const ordered = ["6", "5", "4", "3", "2", "1"].filter((s) => set.has(s));
      mo.domain.strings = ordered.join(",");
      sync();
      emit();
    };
    ["6", "5", "4", "3", "2", "1"].forEach((k) => {
      const b = el("button", { class: "ge-moPill ge-moPill--string", type: "button" }, [k]) as HTMLButtonElement;
      b.dataset.str = k;
      b.addEventListener("click", () => toggle(k));
      group.append(b);
    });
    wrap.append(group);
    sync();
    rD1.append(wrap);
  }
  rD1.append(
    labeledNumber("Span", mo.domain.span, 1, 12, (n) => {
      mo.domain.span = n;
      emit();
    }),
  );
  sDomain.append(rD1);
  advInstrumentGrid.append(sDomain);

  // 2) Learning Target Constraints (context gated placeholders)
  const sConstraints = section("Learning Target Constraints");
  const constraints = el("div", { class: "ge-moConstraints" });

  const mkConstraintPane = (lt: string, title: string, text: string) => {
    const p = el("div", { class: "ge-moConstraintPane", "data-lt": lt });
    p.append(el("div", { class: "ge-moConstraintTitle" }, [title]));
    p.append(el("div", { class: "ge-moHint" }, [text]));
    return p;
  };

  constraints.append(
    mkConstraintPane("single", "Single Note Constraints", "No additional constraints for Single Note beyond Basic settings."),
  );
  constraints.append(
    mkConstraintPane("interval", "Interval Constraints", "Interval-specific constraints live here (as defined in the spec)."),
  );
  constraints.append(
    mkConstraintPane("chord", "Chord Constraints", "Chord menus (quality/extensions/inversions) live here (as defined in the spec)."),
  );
  constraints.append(
    mkConstraintPane("scale", "Scale Constraints", "Scale/mode selection + view/input options live here (as defined in the spec)."),
  );
  constraints.append(
    mkConstraintPane("arpeggio", "Arpeggio Constraints", "Arpeggio selection + view/input options live here (as defined in the spec)."),
  );

  sConstraints.append(constraints);
  advColLearningA.append(sConstraints);

  // 3) Presets A–J
  const sPreset = el("div", { class: "ge-advPresetsInner" });
  const grid = el("div", { class: "ge-moPresetGrid" });
  const presetButtons: HTMLButtonElement[] = [];

  const syncSurfaceControlsDomFromMo = () => {
    const surfKeys = ["fretboard", "staff", "tab", "noteRail"] as const;
    const roleKeys = ["prompt", "mark", "persistence"] as const;

    for (const sk of surfKeys) {
      // Roles with scope
      for (const rk of roleKeys) {
        const cb = document.getElementById(`sc_${sk}_${rk}`) as HTMLInputElement | null;
        const sel = document.getElementById(`sc_${sk}_${rk}_scope`) as HTMLSelectElement | null;
        const role = (mo.surfaceControlsV11 as any).surfaces?.[sk]?.[rk];
        if (cb && role) cb.checked = !!role.enabled;
        if (sel && role) sel.value = String(role.scope ?? "single");
      }

      // SAM answer-set
      const samCb = document.getElementById(`sc_${sk}_sam`) as HTMLInputElement | null;
      const samSel = document.getElementById(`sc_${sk}_sam_mode`) as HTMLSelectElement | null;
      const sam = (mo.surfaceControlsV11 as any).surfaces?.[sk]?.sam;
      if (samCb && sam) samCb.checked = !!sam.enabled;
      if (samSel && sam) samSel.value = String(sam.revealMode ?? "single");

      // Keep legacy compatibility toggles in sync (boards remain visible; 'display' stays true internally).
      const legacy = (mo.surfaces as any)[sk];
      if (legacy) {
        legacy.prompt = !!(mo.surfaceControlsV11 as any).surfaces?.[sk]?.prompt?.enabled;
        legacy.mark = !!(mo.surfaceControlsV11 as any).surfaces?.[sk]?.mark?.enabled;
        legacy.sam = !!(mo.surfaceControlsV11 as any).surfaces?.[sk]?.sam?.enabled;
        legacy.display = true; // deprecated concept; do not surface
      }
    }
  };

  const setPreset = (p: string) => {
    mo.preset = p;

    const preset = (presetsAj as any)?.presets?.[p]?.surfaceControlsV11 ?? null;
    if (preset && preset.surfaces) {
      // Apply the preset to the canonical surfaceControls block (v1.1).
      const cloned = JSON.parse(JSON.stringify(preset));
      (mo.surfaceControlsV11 as any).surfaces = cloned.surfaces;
      // Preserve schema id if present on the local object.
      (mo.surfaceControlsV11 as any).$id = (mo.surfaceControlsV11 as any).$id || (presetsAj as any)?.schema || "glg.surfaceControls.schema.v1.1";
      // Sync legacy + DOM to prevent UI drift.
      syncSurfaceControlsDomFromMo();
    }

    presetButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.preset === p));
    emit();
  };
  "ABCDEFGHIJ".split("").forEach((p) => {
    const b = el("button", { class: "ge-moPresetBtn", type: "button" }, [p]) as HTMLButtonElement;
    b.dataset.preset = p;
    b.addEventListener("click", () => setPreset(p));
    presetButtons.push(b);
    grid.append(b);
  });
  sPreset.append(grid);
  advPresetsHost.append(sPreset);
  setPreset(mo.preset);

  // 4) Input Method (context gated: chords/scales/arpeggios only)
  const sIM = section("Input Method");
  const rIM = row();
  const inputMethodField = el("label", { class: "ge-moField" });
  inputMethodField.append(el("div", { class: "ge-moLabel" }, ["Method"]));
  const inputMethodSelect = document.createElement("select");
  inputMethodSelect.className = "ge-moSelect";
  [
    { v: "singleNote", t: "Single-Note" },
    { v: "structure", t: "Structure" },
    { v: "partial", t: "Partial" },
  ].forEach((o) => {
    const op = document.createElement("option");
    op.value = o.v;
    op.textContent = o.t;
    inputMethodSelect.appendChild(op);
  });
  inputMethodSelect.value = mo.inputMethod;
  inputMethodSelect.addEventListener("change", () => {
    mo.inputMethod = inputMethodSelect.value;
    emit();
  });
  inputMethodField.append(inputMethodSelect);
  rIM.append(inputMethodField);
  sIM.append(rIM);
  advColB.append(sIM);

    // 5) Surface Controls (Prompt / Mark / Persistence / SAM) — Phase B-2 UI shell
  const sSurface = section("Surface Controls");
  sSurface.append(
    el("div", { class: "ge-moHint" }, [
      "Boards are always visible. Persistence controls whether correct answers remain after marking.",
    ]),
  );

  const SCOPES = [
    { v: "single", t: "Single" },
    { v: "rotating", t: "Rotating" },
    { v: "all", t: "All" },
    { v: "random", t: "Random" },
  ];

  const COORD = [
    { v: "independent", t: "Independent" },
    { v: "singleSurfaceOnly", t: "Single Surface Only" },
    { v: "multiSurfaceSimultaneous", t: "Multi-Surface Simultaneous" },
    { v: "rotateBetweenSelected", t: "Rotate Between Selected" },
    { v: "randomSelectedSurface", t: "Random Selected Surface" },
  ];

  const matrix = el("div", { class: "ge-moMatrix", role: "group", "aria-label": "Surface Controls" });

  const header = el("div", { class: "ge-moMatrixRow ge-moMatrixHeader" });
  header.append(el("div", { class: "ge-moMatrixCell ge-moMatrixCell--surface" }, ["Surface"]));
  ["Prompt", "Mark", "Persistence", "SAM"].forEach((h) =>
    header.append(el("div", { class: "ge-moMatrixCell ge-moMatrixCell--h" }, [h])),
  );
  matrix.append(header);

  const mkRoleCell = (surfKey: any, roleKey: any, label: string) => {
    const cell = el("div", { class: "ge-moMatrixCell ge-moMatrixCell--role" });
    const id = `sc_${String(surfKey)}_${roleKey}`;
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = id;
    cb.checked = !!(mo.surfaceControlsV11 as any).surfaces[surfKey][roleKey].enabled;

    const scopeSel = document.createElement("select");
    scopeSel.className = "ge-moMiniSelect";
    scopeSel.id = `sc_${String(surfKey)}_${String(roleKey)}_scope`;
    SCOPES.forEach((o) => {
      const op = document.createElement("option");
      op.value = o.v;
      op.textContent = o.t;
      scopeSel.appendChild(op);
    });
    scopeSel.value = (mo.surfaceControlsV11 as any).surfaces[surfKey][roleKey].scope;

    const syncLegacy = () => {
      if (roleKey === "prompt") (mo.surfaces as any)[surfKey].prompt = cb.checked;
      if (roleKey === "mark") (mo.surfaces as any)[surfKey].mark = cb.checked;
      (mo.surfaces as any)[surfKey].display = true;
    };

    const apply = () => {
      (mo.surfaceControlsV11 as any).surfaces[surfKey][roleKey].enabled = cb.checked;
      (mo.surfaceControlsV11 as any).surfaces[surfKey][roleKey].scope = scopeSel.value;
      syncLegacy();
      emit();
    };
    cb.addEventListener("change", apply);
    scopeSel.addEventListener("change", apply);

    const wrapCb = el("label", { class: "ge-moMiniCheck", for: id }, [cb, el("span", { class: "ge-moSr" }, [label])]);
    cell.append(wrapCb, scopeSel);
    return cell;
  };

  const mkSamCell = (surfKey: any, label: string) => {
    const cell = el("div", { class: "ge-moMatrixCell ge-moMatrixCell--role" });
    const id = `sc_${String(surfKey)}_sam`;
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = id;
    cb.checked = !!(mo.surfaceControlsV11 as any).surfaces[surfKey].sam.enabled;

    // Canon: SAM is not a Surface Scope control. It controls what is revealed after a mark.
    // SAM options map to Answer Sets: Single | Equivalent | All
    const samSel = document.createElement("select");
    samSel.className = "ge-moMiniSelect";
    samSel.id = `sc_${String(surfKey)}_sam_mode`;
    [
      { v: "single", t: "Single" },
      { v: "equivalent", t: "Equivalent" },
      { v: "all", t: "All" },
    ].forEach((o) => {
      const op = document.createElement("option");
      op.value = o.v;
      op.textContent = o.t;
      samSel.appendChild(op);
    });
    samSel.value = (mo.surfaceControlsV11 as any).surfaces[surfKey].sam.revealMode || "single";

    const apply = () => {
      (mo.surfaceControlsV11 as any).surfaces[surfKey].sam.enabled = cb.checked;
      (mo.surfaceControlsV11 as any).surfaces[surfKey].sam.revealMode = samSel.value;
      (mo.surfaces as any)[surfKey].sam = cb.checked;
      emit();
    };
    cb.addEventListener("change", apply);
    samSel.addEventListener("change", apply);

    const wrapCb = el("label", { class: "ge-moMiniCheck", for: id }, [cb, el("span", { class: "ge-moSr" }, [label])]);
    cell.append(wrapCb, samSel);
    return cell;
  };

  const addSurfaceRow = (surfKey: any, title: string) => {
    const r = el("div", { class: "ge-moMatrixRow" });
    r.append(el("div", { class: "ge-moMatrixCell ge-moMatrixCell--surface" }, [title]));
    r.append(mkRoleCell(surfKey, "prompt", `${title} prompt`));
    r.append(mkRoleCell(surfKey, "mark", `${title} mark`));
    r.append(mkRoleCell(surfKey, "persistence", `${title} persistence`));
    r.append(mkSamCell(surfKey, `${title} sam`));
    matrix.append(r);
  };

  addSurfaceRow("fretboard", "Fretboard");
  addSurfaceRow("staff", "Staff");
  addSurfaceRow("tab", "TAB");
  addSurfaceRow("noteRail", "Note Rail");

  sSurface.append(matrix);

  const coordRow = row();
  const mkCoordSelect = (roleKey: any, title: string) => {
    const field = el("label", { class: "ge-moField" });
    field.append(el("div", { class: "ge-moLabel" }, [title]));
    const sel = document.createElement("select");
    sel.className = "ge-moSelect";
    COORD.forEach((o) => {
      const op = document.createElement("option");
      op.value = o.v;
      op.textContent = o.t;
      sel.appendChild(op);
    });
    sel.value = "independent";
    sel.addEventListener("change", () => {
      (Object.keys((mo.surfaceControlsV11 as any).surfaces) as any[]).forEach((sk) => {
        const role = (mo.surfaceControlsV11 as any).surfaces[sk][roleKey];
        if (!role.enabled) {
          delete role.coordination;
          return;
        }
        role.coordination = { mode: sel.value };
      });
      emit();
    });
    field.append(sel);
    return field;
  };
  coordRow.append(mkCoordSelect("prompt", "Prompt Coordination"));
  coordRow.append(mkCoordSelect("mark", "Mark Coordination"));
  coordRow.append(mkCoordSelect("persistence", "Persistence Coordination"));
  sSurface.append(coordRow);

  advColA.append(sSurface);

  // 6) Pitch Sets — UI shells
  const sPitch = section("Pitch Sets");
  sPitch.append(el("div", { class: "ge-moHint" }, ["Builder shells only. No engine wiring."]));
  const pitchTabs = el("div", { class: "ge-moTabs" });
  const pitchBody = el("div", { class: "ge-moTabBody" });

  type PitchTabKey = "intervals" | "chords" | "scalesModes" | "arpeggios";
  const tabDefs: { k: PitchTabKey; t: string }[] = [
    { k: "intervals", t: "Intervals" },
    { k: "chords", t: "Chords" },
    { k: "scalesModes", t: "Scales / Modes" },
    { k: "arpeggios", t: "Arpeggios" },
  ];
  let activePitchTab: PitchTabKey = "intervals";

  const renderPitchTab = () => {
    pitchBody.replaceChildren();
    const list = (mo.pitchSetsV11 as any)[activePitchTab] as any[];

    const addBtn = el("button", { class: "btn btn-sm", type: "button" }, ["Add"]) as HTMLButtonElement;
    addBtn.addEventListener("click", () => {
      list.push({ id: `${activePitchTab}_${Date.now()}`, enabled: true, name: "", meta: {} });
      emit();
      renderPitchTab();
    });

    const wrap = el("div", { class: "ge-moList" });
    wrap.append(el("div", { class: "ge-moListActions" }, [addBtn]));

    if (!list.length) {
      wrap.append(el("div", { class: "ge-moHint" }, ["No entries yet."]));
    } else {
      list.forEach((item: any, idx: number) => {
        const rowEl = el("div", { class: "ge-moListRow" });
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!item.enabled;
        cb.addEventListener("change", () => {
          item.enabled = cb.checked;
          emit();
        });
        const name = document.createElement("input");
        name.className = "ge-moInput";
        name.placeholder = "Name / Label";
        name.value = item.name ?? "";
        name.addEventListener("input", () => {
          item.name = name.value;
          emit();
        });
        const del = el("button", { class: "btn btn-sm", type: "button" }, ["Remove"]) as HTMLButtonElement;
        del.addEventListener("click", () => {
          list.splice(idx, 1);
          emit();
          renderPitchTab();
        });
        rowEl.append(cb, name, del);
        wrap.append(rowEl);
      });
    }
    pitchBody.append(wrap);
  };

  tabDefs.forEach(({ k, t }) => {
    const b = el("button", { class: "ge-moTabBtn", type: "button" }, [t]) as HTMLButtonElement;
    b.classList.toggle("is-active", k === activePitchTab);
    b.addEventListener("click", () => {
      activePitchTab = k;
      pitchTabs.querySelectorAll("button").forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      renderPitchTab();
    });
    pitchTabs.append(b);
  });

  sPitch.append(pitchTabs, pitchBody);
  advColA.append(sPitch);
  renderPitchTab();

  // 7) Progressions — UI shell
  const sProg = section("Progressions");
  sProg.append(el("div", { class: "ge-moHint" }, ["Builder + per-step overrides (shell)."]));
  const rProg = row();
  const progEnabled = document.createElement("input");
  progEnabled.type = "checkbox";
  progEnabled.checked = !!mo.progressionsV11.enabled;
  progEnabled.addEventListener("change", () => { mo.progressionsV11.enabled = progEnabled.checked; emit(); });
  const fProg = el("label", { class: "ge-moField" });
  fProg.append(el("div", { class: "ge-moLabel" }, ["Enabled"]));
  fProg.append(el("div", { class: "ge-moInline" }, [progEnabled]));
  rProg.append(fProg);
  const btnAddStep = el("button", { class: "btn btn-sm", type: "button" }, ["Add Step"]) as HTMLButtonElement;
  btnAddStep.addEventListener("click", () => {
    (mo.progressionsV11.steps as any[]).push({ degree: "I", overridesJson: "" });
    emit();
    renderProgSteps();
  });
  rProg.append(btnAddStep);
  sProg.append(rProg);

  const progSteps = el("div", { class: "ge-moList" });
  const renderProgSteps = () => {
    progSteps.replaceChildren();
    const steps = mo.progressionsV11.steps as any[];
    if (!steps.length) { progSteps.append(el("div", { class: "ge-moHint" }, ["No steps yet."])); return; }
    steps.forEach((st: any, idx: number) => {
      const rowEl = el("div", { class: "ge-moListRow" });
      const deg = document.createElement("input");
      deg.className = "ge-moInput ge-moInput--sm";
      deg.placeholder = "Degree (e.g., I, ii, V/V)";
      deg.value = st.degree ?? "";
      deg.addEventListener("input", () => { st.degree = deg.value; emit(); });
      const ov = document.createElement("input");
      ov.className = "ge-moInput";
      ov.placeholder = "Overrides (JSON) — optional";
      ov.value = st.overridesJson ?? "";
      ov.addEventListener("input", () => { st.overridesJson = ov.value; emit(); });
      const del = el("button", { class: "btn btn-sm", type: "button" }, ["Remove"]) as HTMLButtonElement;
      del.addEventListener("click", () => { steps.splice(idx, 1); emit(); renderProgSteps(); });
      rowEl.append(deg, ov, del);
      progSteps.append(rowEl);
    });
  };
  sProg.append(progSteps);
  advColProgA.append(sProg);
  renderProgSteps();

  // 8) Timers — UI shell
  const sTimers = section("Timers");
  sTimers.append(el("div", { class: "ge-moHint" }, ["Turn Timer, Check/Chess/Time Bank, Runtime Cap, Attempts per Turn (shell)."]));

  const rT0 = row();
  rT0.append(
    labeledSelect(
      "Clock Mode",
      [
        { v: "off", t: "Off" },
        { v: "checkClock", t: "Check Clock" },
        { v: "chessClock", t: "Chess Clock" },
        { v: "timeBank", t: "Time Bank" },
      ],
      mo.timersV11.clockMode,
      (v) => { mo.timersV11.clockMode = v; emit(); },
    ),
  );
  sTimers.append(rT0);

  const mkEnabledNum = (label: string, obj: any, keyEnabled: string, keyVal: string, min: number, max: number) => {
    const wrap = el("div", { class: "ge-moField" });
    wrap.append(el("div", { class: "ge-moLabel" }, [label]));
    const line = el("div", { class: "ge-moInline" });
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!obj[keyEnabled];
    const inp = document.createElement("input");
    inp.type = "number";
    inp.className = "ge-moInput ge-moInput--sm";
    inp.min = String(min);
    inp.max = String(max);
    inp.value = String(obj[keyVal] ?? 0);
    const sync = () => { obj[keyEnabled] = cb.checked; obj[keyVal] = Number(inp.value || 0); emit(); };
    cb.addEventListener("change", sync);
    inp.addEventListener("input", sync);
    line.append(cb, inp);
    wrap.append(line);
    return wrap;
  };

  const rT1 = row();
  rT1.append(mkEnabledNum("Turn Timer (sec)", mo.timersV11.turnTimer, "enabled", "seconds", 0, 600));
  rT1.append(mkEnabledNum("Runtime Cap (sec)", mo.timersV11.runtimeCap, "enabled", "seconds", 0, 86400));
  rT1.append(mkEnabledNum("Attempts / Turn", mo.timersV11.attemptsPerTurn, "enabled", "count", 0, 99));
  sTimers.append(rT1);

  const rT2 = row();
  rT2.append(labeledNumber("Time Bank (sec)", mo.timersV11.timeBankSeconds, 0, 86400, (n) => { mo.timersV11.timeBankSeconds = n; emit(); }));
  rT2.append(labeledNumber("Increment (sec)", mo.timersV11.incrementSeconds, 0, 120, (n) => { mo.timersV11.incrementSeconds = n; emit(); }));
  rT2.append(labeledNumber("Penalty (sec)", mo.timersV11.penaltySeconds, 0, 120, (n) => { mo.timersV11.penaltySeconds = n; emit(); }));
  sTimers.append(rT2);

  const rT3 = row();
  rT3.append(labeledNumber("On Correct +sec", mo.timersV11.onCorrectAddSeconds, 0, 120, (n) => { mo.timersV11.onCorrectAddSeconds = n; emit(); }));
  rT3.append(labeledNumber("On Wrong -sec", mo.timersV11.onWrongSubtractSeconds, 0, 120, (n) => { mo.timersV11.onWrongSubtractSeconds = n; emit(); }));
  sTimers.append(rT3);

  advColABottom.append(sTimers);

  // Player / Board Options
  const sBoard = section("Player / Board Options");
  const rBoard = row();
  rBoard.append(
    labeledSelect(
      "Boards",
      [
        { v: "shared", t: "Shared" },
        { v: "perPlayer", t: "Player Boards" },
      ],
      mo.rules.board,
      (v) => {
        mo.rules.board = v;
        emit();
      },
    ),
  );
  sBoard.append(rBoard);
  advColABottom.append(sBoard);

  // Apply gating initial state
  setLearningType(mo.learningType, inputMethodSelect, sIM, constraints);

  const actions = el("div", { class: "ge-moActions" });
  const startBtn = el("button", { class: "ge-moStart", type: "button" }, ["Start Match"]) as HTMLButtonElement;
  startBtn.addEventListener("click", () => {
    emit();
    enterUI();
  });
  const backBtn = el("button", { class: "ge-moBack", type: "button" }, ["Back"]) as HTMLButtonElement;
  backBtn.addEventListener("click", () => clearColsFrom(1));
  actions.append(startBtn, backBtn);
  col.append(actions);

  launchCols.append(col);
  emit();
};

  const showPlayers = () => {
    clearColsFrom(1);

    // Multiplayer roster UI:
    // - Add/remove players (2..8)
    // - Edit player names (persisted for INIT_MATCH)
    const clampCount = (n: number) => Math.max(2, Math.min(8, n));
    const syncNames = () => {
      launchState.playerCount = clampCount(launchState.playerCount);

      // Keep raw input values (can be empty). Derive effective names for engine/log.
      const raw: string[] = [];
      const effective: string[] = [];
      for (let i = 0; i < launchState.playerCount; i++) {
        const prev = (launchState.playerNames[i] ?? "").toString();
        const trimmed = prev.trim();
        raw.push(trimmed);
        effective.push(trimmed.length > 0 ? trimmed : `P${i + 1}`);
      }
      launchState.playerNames = raw;

      try {
        (window as any).__GEDU_PLAYER_COUNT__ = launchState.playerCount;
        (window as any).__GEDU_PLAYER_NAMES__ = [...effective];
      } catch {}
      window.dispatchEvent(new CustomEvent("gedu:players", { detail: { count: launchState.playerCount, names: [...effective] } }));
    };

    // Initialize minimum multiplayer state.
    launchState.playerCount = clampCount(launchState.playerCount || 2);
    launchState.playerNames = Array.isArray(launchState.playerNames) ? launchState.playerNames : [];
    syncNames();

    const wrap = document.createElement("div");
    wrap.className = "ge-playerRoster";

    const headerRow = document.createElement("div");
    headerRow.className = "ge-playerRosterHeader";

    const countLabel = document.createElement("div");
    countLabel.className = "ge-playerRosterCount";
    const refreshCountLabel = () => {
      countLabel.textContent = `Player Count: ${launchState.playerCount}`;
    };

    const btnAdd = document.createElement("button");
    btnAdd.className = "ge-btn ge-btnSecondary";
    btnAdd.textContent = "+";
    btnAdd.onclick = () => {
      launchState.playerCount = clampCount(launchState.playerCount + 1);
      syncNames();
      renderRows();
    };

    const btnSub = document.createElement("button");
    btnSub.className = "ge-btn ge-btnSecondary";
    btnSub.textContent = "-";
    btnSub.onclick = () => {
      launchState.playerCount = clampCount(launchState.playerCount - 1);
      syncNames();
      renderRows();
    };

    headerRow.appendChild(countLabel);
    headerRow.appendChild(btnSub);
    headerRow.appendChild(btnAdd);

    const list = document.createElement("div");
    list.className = "ge-playerRosterList";

    const renderRows = () => {
      refreshCountLabel();
      list.innerHTML = "";
      for (let i = 0; i < launchState.playerCount; i++) {
        const row = document.createElement("div");
        row.className = "ge-playerRosterRow";

        const label = document.createElement("div");
        label.className = "ge-playerRosterLabel";
        label.textContent = `P${i + 1}`;

        const input = document.createElement("input");
        input.className = "ge-playerRosterInput";
        input.type = "text";
        input.value = launchState.playerNames[i] ?? "";
        input.placeholder = `P${i + 1}`;
        input.oninput = () => {
          launchState.playerNames[i] = input.value;
          syncNames();
        };

        row.appendChild(label);
        row.appendChild(input);
        list.appendChild(row);
      }
    };

    renderRows();

    const actions = document.createElement("div");
    actions.className = "ge-playerRosterActions";

    const btnConfirm = document.createElement("button");
    btnConfirm.className = "ge-btn";
    btnConfirm.textContent = "Confirm Players";
    btnConfirm.onclick = () => {
      syncNames();
      launchState.playersConfirmed = true;
      showInitPanels();
    };

    const btnBack = document.createElement("button");
    btnBack.className = "ge-btn ge-btnSecondary";
    btnBack.textContent = "Back";
    btnBack.onclick = () => showRootMenu();

    actions.appendChild(btnConfirm);
    actions.appendChild(btnBack);

    wrap.appendChild(headerRow);
    wrap.appendChild(list);
    wrap.appendChild(actions);

    addColNode("Players", wrap);
  };

  // Canon: Start Screen Initialization Panels
  // - Applies to: Single Player → Challenge, and Multiplayer
  // - Does NOT apply to: Education, Single Player → Free Play
  const showInitPanels = () => {
    clearColsFrom(2);

    const mo = (window as any).__GEDU_DRAFT_MATCH_OPTIONS__
      ? structuredClone((window as any).__GEDU_DRAFT_MATCH_OPTIONS__)
      : structuredClone(makeDefaultMatchOptions());
    (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = mo;

    const wrap = el("div", { class: "ge-initGrid" });

    const card = (title: string, body: HTMLElement) => {
      const c = el("div", { class: "ge-initCard" });
      c.append(el("div", { class: "ge-initCardTitle" }, [title]));
      c.append(body);
      return c;
    };

    // Panel 1: Game Mode (read-only)
    {
      const b = el("div", { class: "ge-initBody" }, [
        el("div", { class: "ge-initLine" }, [
          el("span", { class: "ge-initK" }, ["Intent:"]),
          el("span", { class: "ge-initV" }, [String(launchState.intent ?? "—")]),
        ]),
        el("div", { class: "ge-initHint" }, [
          "Set core defaults here before entering Match Settings.",
        ]),
      ]);
      wrap.append(card("Game Mode", b));
    }

    // Panel 2: Learning Type
    {
      const sel = document.createElement("select");
      sel.className = "ge-moSelect";
      [
        { v: "single", t: "Single Note" },
        { v: "chord", t: "Chords" },
        { v: "scale", t: "Scales" },
        { v: "arpeggio", t: "Arpeggios" },
        { v: "interval", t: "Intervals" },
      ].forEach((o) => {
        const op = document.createElement("option");
        op.value = o.v;
        op.textContent = o.t;
        sel.appendChild(op);
      });
      sel.value = mo.learningType ?? "single";
      sel.addEventListener("change", () => {
        mo.learningType = sel.value;
        (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
      });

      const b = el("div", { class: "ge-initBody" }, [
        el("label", { class: "ge-initField" }, [
          el("div", { class: "ge-initLabel" }, ["Type"]),
          sel,
        ]),
      ]);
      wrap.append(card("Learning Type", b));
    }

    // Panel 3: Musical Context
    {
      const keySel = document.createElement("select");
      keySel.className = "ge-moSelect";
      ["C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"].forEach((k) => {
        const op = document.createElement("option");
        op.value = k;
        op.textContent = k;
        keySel.appendChild(op);
      });
      keySel.value = mo.context?.key ?? "C";
      keySel.addEventListener("change", () => {
        mo.context.key = keySel.value;
        (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
      });

      const acc = new Set(String(mo.context?.accidentals ?? "naturals,sharps,flats").split(",").filter(Boolean));
      const mkAcc = (v: string, t: string) => {
        const w = el("label", { class: "ge-moPill" });
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = acc.has(v);
        cb.addEventListener("change", () => {
          if (cb.checked) acc.add(v);
          else acc.delete(v);
          mo.context.accidentals = Array.from(acc).join(",");
          (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
        });
        w.append(cb, el("span", {}, [t]));
        return w;
      };

      const b = el("div", { class: "ge-initBody" }, [
        el("label", { class: "ge-initField" }, [
          el("div", { class: "ge-initLabel" }, ["Key"]),
          keySel,
        ]),
        el("div", { class: "ge-initLabel" }, ["Accidentals"]),
        el("div", { class: "ge-initPills" }, [
          mkAcc("naturals", "Naturals"),
          mkAcc("sharps", "Sharps"),
          mkAcc("flats", "Flats"),
        ]),
      ]);
      wrap.append(card("Musical Context", b));
    }

    // Panel 4: Domain Core
    {
      const presetSel = document.createElement("select");
      presetSel.className = "ge-moSelect";
      [
        { v: "0-5", t: "0–5" },
        { v: "0-12", t: "0–12" },
        { v: "0-24", t: "0–24" },
        { v: "custom", t: "Custom" },
      ].forEach((o) => {
        const op = document.createElement("option");
        op.value = o.v;
        op.textContent = o.t;
        presetSel.appendChild(op);
      });

      const minIn = document.createElement("input");
      minIn.type = "number";
      minIn.className = "ge-moInput ge-moInput--sm";
      minIn.min = "0";
      minIn.max = "24";
      minIn.value = String(mo.domain?.fretMin ?? 0);
      const maxIn = document.createElement("input");
      maxIn.type = "number";
      maxIn.className = "ge-moInput ge-moInput--sm";
      maxIn.min = "0";
      maxIn.max = "24";
      maxIn.value = String(mo.domain?.fretMax ?? 12);

      const setRange = (min: number, max: number) => {
        mo.domain.fretMin = min;
        mo.domain.fretMax = max;
        minIn.value = String(min);
        maxIn.value = String(max);
        (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
      };

      const inferPreset = () => {
        const min = Number(minIn.value || 0);
        const max = Number(maxIn.value || 0);
        if (min === 0 && max === 5) return "0-5";
        if (min === 0 && max === 12) return "0-12";
        if (min === 0 && max === 24) return "0-24";
        return "custom";
      };

      presetSel.value = inferPreset();
      presetSel.addEventListener("change", () => {
        if (presetSel.value === "0-5") setRange(0, 5);
        else if (presetSel.value === "0-12") setRange(0, 12);
        else if (presetSel.value === "0-24") setRange(0, 24);
        else {
          // Custom: leave as-is
          (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
        }
      });

      const onCustom = () => {
        mo.domain.fretMin = Number(minIn.value || 0);
        mo.domain.fretMax = Number(maxIn.value || 0);
        presetSel.value = inferPreset();
        (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
      };
      minIn.addEventListener("input", onCustom);
      maxIn.addEventListener("input", onCustom);

      const b = el("div", { class: "ge-initBody" }, [
        el("label", { class: "ge-initField" }, [
          el("div", { class: "ge-initLabel" }, ["Fret Range"]),
          presetSel,
        ]),
        el("div", { class: "ge-initInline" }, [
          el("label", { class: "ge-initMini" }, [el("div", { class: "ge-initLabel" }, ["Min"]), minIn]),
          el("label", { class: "ge-initMini" }, [el("div", { class: "ge-initLabel" }, ["Max"]), maxIn]),
        ]),
        el("div", { class: "ge-initHint" }, ["Instrument defaults to Guitar (Standard). Tuning changes live in Advanced."]),
      ]);
      wrap.append(card("Domain Core", b));
    }

    // Panel 5: Surface Preset
    {
      const sel = document.createElement("select");
      sel.className = "ge-moSelect";
      ["A","B","C","D","E","F","G","H","I","J"].forEach((p) => {
        const op = document.createElement("option");
        op.value = p;
        op.textContent = p;
        sel.appendChild(op);
      });
      sel.value = mo.preset ?? "A";
      sel.addEventListener("change", () => {
        mo.preset = sel.value;
        (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
      });

      const b = el("div", { class: "ge-initBody" }, [
        el("label", { class: "ge-initField" }, [
          el("div", { class: "ge-initLabel" }, ["Preset"]),
          sel,
        ]),
      ]);
      wrap.append(card("Surface Preset", b));
    }

    // Panel 6: Timers (Quick)
    {
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!mo.timersV11?.turnTimer?.enabled;
      const seconds = document.createElement("input");
      seconds.type = "number";
      seconds.className = "ge-moInput ge-moInput--sm";
      seconds.min = "1";
      seconds.max = "600";
      seconds.value = String(mo.timersV11?.turnTimer?.seconds ?? 10);
      seconds.disabled = !cb.checked;

      const sync = () => {
        mo.timersV11.turnTimer.enabled = cb.checked;
        mo.timersV11.turnTimer.seconds = Number(seconds.value || 10);
        seconds.disabled = !cb.checked;
        (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
      };
      cb.addEventListener("change", sync);
      seconds.addEventListener("input", sync);

      const b = el("div", { class: "ge-initBody" }, [
        el("div", { class: "ge-initInline" }, [
          el("label", { class: "ge-initMini" }, [el("div", { class: "ge-initLabel" }, ["Turn Timer"]), cb]),
          el("label", { class: "ge-initMini" }, [el("div", { class: "ge-initLabel" }, ["Seconds"]), seconds]),
        ]),
        el("div", { class: "ge-initHint" }, ["Additional clock modes live under Match Settings → Advanced."]),
      ]);
      wrap.append(card("Timers (Quick)", b));
    }

    const actions = el("div", { class: "ge-initActions" });
    const btnBack = el("button", { class: "ge-btn ge-btnSecondary", type: "button" }, ["Back"]);
    btnBack.addEventListener("click", () => {
      clearColsFrom(1);
      // Return to the correct second column.
      if (launchState.intent === "multiplayer") showPlayers();
      else showSinglePlayer();
    });

    const btnContinue = el("button", { class: "ge-btn", type: "button" }, ["Continue to Match Settings"]);
    btnContinue.addEventListener("click", () => {
      // Ensure draft is saved.
      (window as any).__GEDU_DRAFT_MATCH_OPTIONS__ = structuredClone(mo);
      showMatchOptions();
    });

    actions.append(btnBack, btnContinue);

    const host = el("div", { class: "ge-initHost" }, [wrap, actions]);

    const col = el("div", { class: "ge-menuCol ge-initCol" });
    col.append(el("div", { class: "ge-menuTitle" }, ["Initialization"]));
    col.append(host);
    launchCols.append(col);
  };

  const showSinglePlayer = () => {
    clearColsFrom(1);
    addCol("Single Player", [
      {
        label: "Free Play",
        onPick: () => {
          launchState.intent = "freeplay";
          enterUI();
        },
      },
      {
        label: "Challenge",
        onPick: () => {
          launchState.intent = "game";
          // Open Advanced Settings flyout directly (merged with initialization)
          openFlyout();
        },
      },
      {
        label: "Back",
        onPick: () => showRootMenu(),
      },
    ]);
  };

  const showHelp = () => {
    clearColsFrom(1);
    addCol("FAQ / Help", [
      { label: "FAQ", onPick: () => window.dispatchEvent(new CustomEvent("gedu:help", { detail: { page: "faq" } })) },
      { label: "Back", onPick: () => showRootMenu() },
    ]);
  };



  // (removed) Menu Test Panel — dev-only tool removed per canon.
const showSystemSettingsPanel = () => {
  clearColsFrom(1);

  const sys = (window as any).__GEDU_SYSTEM_SETTINGS__ ?? structuredClone(makeDefaultMatchOptions().systemSettingsV11);
  (window as any).__GEDU_SYSTEM_SETTINGS__ = sys;

  const wrap = el("div", { class: "ge-testPanel" }, [
    el("div", { class: "ge-testBox" }, [
      el("div", { class: "ge-testTitle" }, ["System Settings"]),
      el("div", { class: "ge-testHint" }, [
        "UI shells only. Tonal Assist settings are stored in __GEDU_SYSTEM_SETTINGS__.",
      ]),
    ]),
  ]);

  // Tonal Assist
  const s = el("div", { class: "ge-moSection" });
  s.append(el("div", { class: "ge-moSectionTitle" }, ["Tonal Assist"]));

  const r0 = el("div", { class: "ge-moRow" });

  const enabled = document.createElement("input");
  enabled.type = "checkbox";
  enabled.checked = !!sys.tonalAssist.enabled;
  enabled.addEventListener("change", () => {
    sys.tonalAssist.enabled = enabled.checked;
    window.dispatchEvent(new CustomEvent("gedu:systemSettingsChanged", { detail: sys }));
  });

  const fEnabled = el("label", { class: "ge-moField" });
  fEnabled.append(el("div", { class: "ge-moLabel" }, ["Enabled"]));
  fEnabled.append(el("div", { class: "ge-moInline" }, [enabled]));
  r0.append(fEnabled);

  const sens = document.createElement("select");
  sens.className = "ge-moSelect";
  [
    { v: "low", t: "Low" },
    { v: "medium", t: "Medium" },
    { v: "high", t: "High" },
  ].forEach((o) => {
    const op = document.createElement("option");
    op.value = o.v;
    op.textContent = o.t;
    sens.appendChild(op);
  });
  sens.value = sys.tonalAssist.sensitivity;
  sens.addEventListener("change", () => {
    sys.tonalAssist.sensitivity = sens.value;
    window.dispatchEvent(new CustomEvent("gedu:systemSettingsChanged", { detail: sys }));
  });
  const fSens = el("label", { class: "ge-moField" });
  fSens.append(el("div", { class: "ge-moLabel" }, ["Sensitivity"]));
  fSens.append(sens);
  r0.append(fSens);

  const limit = document.createElement("input");
  limit.type = "number";
  limit.className = "ge-moInput ge-moInput--sm";
  limit.min = "0";
  limit.max = "50";
  limit.value = String(sys.tonalAssist.suggestionLimit ?? 8);
  limit.addEventListener("input", () => {
    sys.tonalAssist.suggestionLimit = Number(limit.value || 0);
    window.dispatchEvent(new CustomEvent("gedu:systemSettingsChanged", { detail: sys }));
  });
  const fLim = el("label", { class: "ge-moField" });
  fLim.append(el("div", { class: "ge-moLabel" }, ["Suggestion Limit"]));
  fLim.append(limit);
  r0.append(fLim);

  s.append(r0);

  const r1 = el("div", { class: "ge-moRow" });
  const mkCand = (k: string, label: string) => {
    const w = el("label", { class: "ge-moPill" });
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!sys.tonalAssist.candidateSets[k];
    cb.addEventListener("change", () => {
      sys.tonalAssist.candidateSets[k] = cb.checked;
      window.dispatchEvent(new CustomEvent("gedu:systemSettingsChanged", { detail: sys }));
    });
    w.append(cb, el("span", {}, [label]));
    return w;
  };
  r1.append(mkCand("major", "Major"));
  r1.append(mkCand("minorVariants", "Minor Variants"));
  r1.append(mkCand("modes", "Modes"));
  r1.append(mkCand("majorBlues", "Major Blues"));
  r1.append(mkCand("minorBlues", "Minor Blues"));
  s.append(r1);

  wrap.append(s);

  addColNode("System Settings", wrap);
};

  const showSettings = () => {
    clearColsFrom(1);
    addCol("Settings", [
      {
        label: "System Settings",
        onPick: () => showSystemSettingsPanel(),
      },
      { label: "Back", onPick: () => showRootMenu() },
    ]);
  };

  const showRootMenu = () => {
    clearColsFrom(0);
    addCol("Menu", [
      { label: "Single Player", onPick: () => showSinglePlayer() },
      {
        label: "Multiplayer",
        onPick: () => {
          launchState.intent = "multiplayer";
          launchState.playerCount = Math.max(2, launchState.playerCount);
          try { (window as any).__GEDU_PLAYER_COUNT__ = launchState.playerCount; } catch {}
          showPlayers();
        },
      },
      {
        label: "Education",
        onPick: () => {
          launchState.intent = "education";
          enterUI();
        },
      },
      { label: "Settings", onPick: () => showSettings() },
      { label: "FAQ / Help", onPick: () => showHelp() },
      {
        label: "Exit",
        onPick: () => window.dispatchEvent(new CustomEvent("gedu:exitRequested")),
      },
    ]);
  };

  // In-match Exit returns to the authoritative Start Menu.
  window.addEventListener("gedu:exitToMenu", () => {
    main.classList.add("hidden");
    launch.classList.remove("hidden");
    currentIntent = "";
    showRootMenu();
  });

  // Initial central menu (authoritative entry point)
  showRootMenu();

  // Main 3 columns (game UI)
  // --- Left column ---
  const ops = el("div", { class: "section" }, [
  el("div", { class: "block-title" }, ["Operations"]),

  el("div", { class: "opsGrid" }, [
    miniBtn("btn-stop", "gedu:stop", "End", "red"),
    miniBtn("btn-new", "gedu:new", "New", "blue"),
    miniBtn("btn-exit", "gedu:exitToMenu", "Exit", "yellow"),
  ]),
]);


  // Teaching Tools: available for Education / Free Play only.
  // These are playfield modifiers intended to help instruction and should not be available
  // for Game or Multiplayer unless explicitly sanctioned later.
  const coreSettings = el("div", { class: "section", id: "teachingTools" }, [
    el("div", { class: "block-title" }, ["Teaching Tools"]),
    formRow(
      "Root Note",
      selectEl(
        "core-root",
        [
          { label: "C", value: "C" },
          { label: "C#", value: "C#" },
          { label: "D", value: "D" },
          { label: "D#", value: "D#" },
          { label: "E", value: "E" },
          { label: "F", value: "F" },
          { label: "F#", value: "F#" },
          { label: "G", value: "G" },
          { label: "G#", value: "G#" },
          { label: "A", value: "A" },
          { label: "A#", value: "A#" },
          { label: "B", value: "B" },
        ],
        "core.root",
        "C",
      ),
    ),
    formRow(
      "Modes",
      selectEl(
        "core-modes",
        [
          { label: "Chromatic", value: "chromatic" },
          { label: "Pentatonic", value: "pentatonic" },
          { label: "Blues", value: "blues" },
          { label: "Ionian (Major)", value: "ionian" },
          { label: "Dorian", value: "dorian" },
          { label: "Phrygian", value: "phrygian" },
          { label: "Lydian", value: "lydian" },
          { label: "Mixolydian", value: "mixolydian" },
          { label: "Aeolian (Minor)", value: "aeolian" },
          { label: "Locrian", value: "locrian" },
        ],
        "core.modes",
        "chromatic",
      ),
    ),
    formRow(
      "Label Mode",
      selectEl(
        "core-display",
        [
          { label: "Note Names", value: "names" },
          { label: "Intervals", value: "intervals" },
          { label: "Roman Numeral Intervals (\u266dII style)", value: "romanIntervals" },
          { label: "Interval Roman (I/ii/II/iii...)", value: "intervalRoman" },
        ],
        "core.display",
        "names",
      ),
    ),
    formRowInline("Chord Labels", [
      selectEl(
        "chords-visibility",
        [
          { label: "Roman Numerals", value: "roman" },
          { label: "Nashville Numbers", value: "nashville" },
          { label: "Chord Name", value: "name" },
        ],
        "chords.visibility",
        "name",
      ),
      selectEl(
        "chords-extension",
        [
          { label: "None", value: "none" },
          { label: "Triad", value: "triad" },
          { label: "7th", value: "7th" },
          { label: "9th", value: "9th" },
        ],
        "chords.extension",
        "triad",
      ),
    ]),
    formRow(
      "Note Visibility",
      selectEl(
        "core-noteVisibility",
        [
          { label: "All", value: "all" },
          { label: "Naturals", value: "naturals" },
          { label: "Enharmonics", value: "enharmonics" },
        ],
        "core.noteVisibility",
        "all",
      ),
    ),

    formRow(
      "Accidentals",
      selectEl(
        "core-accidentalView",
        [
          { label: "Both", value: "both" },
          { label: "Sharps only", value: "sharps" },
          { label: "Flats only", value: "flats" },
          { label: "Auto (context)", value: "auto" },
        ],
        "core.accidentalView",
        "both",
      ),
    ),
    checkGroup("Highlight Tones", [
      { label: "Root / Tonic", id: "core-hl-root", key: "core.hl.root" },
      { label: "3rd", id: "core-hl-3", key: "core.hl.3" },
      { label: "5th", id: "core-hl-5", key: "core.hl.5" },
      { label: "7th", id: "core-hl-7", key: "core.hl.7" },
    ]),

    el("div", { class: "subTitle" }, ["Game Options"]),
    formRowInline("Tokens", [
      el("div", { class: "inlineLabeled" }, [
        el("div", { class: "miniLabel" }, ["Cap"]),
        numberEl("core-tokenCap", 0, 20, "core.tokenCap", 10),
      ]),
      el("div", { class: "inlineLabeled" }, [
        el("div", { class: "miniLabel" }, ["Start"]),
        numberEl("core-startTokens", 0, 20, "core.startTokens", 0),
      ]),
    ]),
    formRowInline("Dev/Test", [
      el("label", { class: "check" }, [
        checkboxEl("core-devMode", false, "core.devMode"),
        el("span", { class: "checkText" }, ["Enable"]),
      ]),
    ]),
  ]);

  // Hidden by default; shown when entering Education or Free Play.
  coreSettings.classList.add("hidden");

  const preferences = el("div", { class: "section" }, [
    el("div", { class: "block-title" }, ["Preferences"]),
    el("div", { class: "subTitle" }, ["Notation"]),
    el("div", { class: "ge-prefNote" }, ["Staff + TAB are always visible."]),

    formRow(
      "Notation Pitch",
      selectEl(
        "pref-notationPitch",
        [
          { label: "Written (default)", value: "written" },
          { label: "Concert", value: "concert" },
        ],
        "pref.notationPitch",
        "written",
      ),
      "Written is the standard for printed guitar music; Concert matches sounding pitch.",
    ),
    formRow(
      "Tritone Label",
      selectEl(
        "pref-tritoneStyle",
        [
          { label: "+/o (default)", value: "plusDim" },
          { label: "TT", value: "TT" },
          { label: "IV♯", value: "sharp4" },
          { label: "V♭", value: "flat5" },
          { label: "Auto (context)", value: "auto" },
        ],
        "note.tritone",
        "plusDim",
      ),
      "Affects Interval Roman display only.",
    ),
  ]);
  const help = el("div", { class: "section" }, [
    el("div", { class: "block-title" }, ["Help & Support"]),
    el("div", { class: "helpRow" }, [
      el("button", { class: "btn btn-sm", type: "button", id: "help-faq" }, ["FAQ"]),
      el("button", { class: "btn btn-sm", type: "button", id: "help-tutorials" }, ["Tutorials"]),
    ]),
  ]);

  const left = el("div", { class: "ge-panel ge-left" }, [
    el("div", { class: "section ge-logo" }, [
      el("div", { class: "note", "aria-hidden": "true" }),
      el("div", { class: "brand" }, ["Guitar", el("span", { class: "edu" }, ["Edu"]) ]),
    ]),
    ops,
    // Contextual task summary (inserted directly below operation controls)
    el("div", { class: "section", id: "taskContext" }, [
      el("div", { class: "block-title" }, ["Task Context"]),
      el("div", { class: "kv" }, [
        el("div", { class: "row" }, [
          el("div", { class: "k" }, ["Learning Target"]),
          el("div", { class: "v", id: "ctx-learningTarget" }, ["—"]),
        ]),
el("div", { class: "row" }, [
  el("div", { class: "k" }, ["Required Inputs"]),
  el("div", { class: "v", id: "ctx-requiredSurfaces" }, ["—"]),
]),
        el("div", { class: "row" }, [
          el("div", { class: "k" }, ["Pitch Framework"]),
          el("div", { class: "v", id: "ctx-pitchFramework" }, ["—"]),
        ]),
        el("div", { class: "row" }, [
          el("div", { class: "k" }, ["Key"]),
          el("div", { class: "v", id: "ctx-key" }, ["—"]),
        ]),
        el("div", { class: "row" }, [
          el("div", { class: "k" }, ["Prompt"]),
          el("div", { class: "v", id: "ctx-prompt" }, ["—"]),
        ]),
      ]),
    ]),
    el("div", { class: "scrollCol" }, [coreSettings, preferences, help]),
  ]);

  // --- Center column ---
  const center = el("div", { class: "ge-panel ge-center" }, [
    el("div", { class: "section" }, [
      el("div", { class: "block-title" }, ["Staff + TAB"]),
      el("div", { class: "svgStage", id: "staffTabStage" }, [
        // Background + overlay are injected/managed by the controller so we can keep hitboxes
        // perfectly aligned to the SVG geometry.
        el("div", { class: "svgHost", id: "staffBgHost", "aria-hidden": "true" }),
        // Canvas fallback: primary rendering is migrating away from SVG. The SVG overlay remains
        // for hitboxes and legacy prototype behavior, but visuals must not depend on SVG assets.
        el("canvas", { class: "canvasLayer", id: "staffCanvas", "aria-label": "Staff+TAB canvas" }),
        elSvg("svg", { class: "svgOverlay", id: "staffOverlaySvg", "aria-label": "Staff + TAB interaction layer" }),
      ]),
    ]),
    el("div", { class: "section" }, [
      el("div", { class: "noteStrip noteRail", id: "noteStrip" }, [
        el("div", { class: "homeMarker", id: "noteStrip-marker", "aria-hidden": "true" }),
        // NOTE: this element must carry the `.rail` class; the rail renderer appends `.noteTile` children.
        el("div", { class: "rail noteRailMount", id: "noteStrip-rail", "aria-label": "Note strip" }, []),
      ]),
    ]),
    el("div", { class: "section col" }, [
      el("div", { class: "fretStage", id: "fretStage" }, [
        el("div", { class: "svgHost", id: "fretBgHost", "aria-hidden": "true" }),
        // Canvas fallback: primary rendering is migrating away from SVG.
        el("canvas", { class: "canvasLayer", id: "fretCanvas", "aria-label": "Fretboard canvas" }),
        elSvg("svg", { class: "svgOverlay", id: "fretOverlaySvg", "aria-label": "Fretboard interaction layer" }),
      ]),
    ]),
  ]);

  // --- Right column ---
  const right = el("div", { class: "ge-panel ge-right" }, [
    // Current player (upper right)
    el("div", { class: "section", style: "padding:0" }, [
      el("div", { class: "ge-playercard", id: "activePlayer-card" }, [
        el("div", { class: "avatar", "aria-hidden": "true" }),
        el("div", { class: "player-scoreRow" }, [
          el("div", { class: "score", id: "activePlayer-score" }, ["0"]),
          el("div", { class: "mult", id: "activePlayer-mult" }, ["×1"]),
        ]),
        el("div", { class: "player-target", id: "activePlayer-target", title: "Current target note (spelling matters for sharps/flats)" }, [""]),
        // Token / bonus indicators (filled in controller)
        el("div", { class: "tokenRow", id: "activePlayer-tokens", "aria-label": "Tokens" }, []),
        el("div", { class: "player-bottom" }, [
          el("div", { id: "activePlayer-name" }, ["Player 1"]),
          el("div", { class: "badge", id: "activePlayer-timer" }, ["00:00"]),
        ]),
      ]),
    ]),


    el("div", { class: "section", "data-tabs": "right" }, [
      el("div", { class: "block-title" }, ["Utility"]),
      el("div", { class: "tabs compact" }, [
        el("button", { class: "tab active", type: "button", "data-tab": "num" }, ["Num"]),
        el("button", { class: "tab", type: "button", "data-tab": "note" }, ["Note"]),
        el("button", { class: "tab", type: "button", "data-tab": "interval" }, ["Interval"]),
        el("button", { class: "tab", type: "button", "data-tab": "chord" }, ["Chord"]),
        el("button", { class: "tab", type: "button", "data-tab": "scale" }, ["Scale"]),
        el("button", { class: "tab", type: "button", "data-tab": "arpeggio" }, ["Arpeggio"]),
        el("button", { class: "tab", type: "button", "data-tab": "teach", id: "utility-teach-tab", "data-teach-only": "1", hidden: "true" }, ["Teach"]),
      ]),
      el("div", { class: "tabpanes" }, [
        el("div", { class: "pane active", "data-pane": "num" }, [
          el("div", { class: "keypad", id: "keypad" }),
        ]),
        el("div", { class: "pane", "data-pane": "note" }, [
          el("div", { class: "noteTools" }, [
            el("div", { class: "teachSubTitle" }, ["Staff Accidentals"]),
            el("div", { style: "font-size:12px;color:rgba(215,230,255,.75);margin-bottom:10px" }, [
              "Pre-select how staff clicks mark accidentals. Prompt asks each time.",
            ]),
            el("div", { class: "teachRow" }, [
              el("label", { class: "teachRadio" }, [
                el("input", { type: "radio", name: "staffAccPref", id: "note-acc-prompt", checked: "true" }),
                el("span", {}, ["Prompt"]),
              ]),
              el("label", { class: "teachRadio" }, [
                el("input", { type: "radio", name: "staffAccPref", id: "note-acc-natural" }),
                el("span", {}, ["Natural"]),
              ]),
              el("label", { class: "teachRadio" }, [
                el("input", { type: "radio", name: "staffAccPref", id: "note-acc-sharp" }),
                el("span", {}, ["Sharp"]),
              ]),
              el("label", { class: "teachRadio" }, [
                el("input", { type: "radio", name: "staffAccPref", id: "note-acc-flat" }),
                el("span", {}, ["Flat"]),
              ]),
            ]),
          ]),
        ]),
        el("div", { class: "pane", "data-pane": "interval" }, [
          el("div", { style: "font-size:12px;color:rgba(215,230,255,.8)" }, ["Intervals UI placeholder."]),
        ]),
        el("div", { class: "pane", "data-pane": "chord" }, [
          el("div", { style: "font-size:12px;color:rgba(215,230,255,.8)" }, ["Chords UI placeholder."]),
        ]),
        el("div", { class: "pane", "data-pane": "scale" }, [
          el("div", { style: "font-size:12px;color:rgba(215,230,255,.8)" }, ["Misc UI placeholder."]),
        ]),
        el("div", { class: "pane", "data-pane": "arpeggio" }, [
          el("div", { style: "font-size:12px;color:rgba(215,230,255,.8)" }, ["Arpeggios UI placeholder."]),
        ]),
        el("div", { class: "pane", "data-pane": "teach", id: "utility-teach-pane", hidden: "true" }, [
          el("div", { class: "teachPane" }, [
            el("div", { class: "teachTitle" }, ["Education Mode Tools"]),
            el("div", { class: "teachBody" }, [
              el("div", { class: "teachHint" }, [
                "Input places markers. Eraser removes. Use the note rail to choose what you place.",
              ]),

              el("div", { class: "teachRow" }, [
                el("label", { class: "teachRadio" }, [
                  el("input", { type: "radio", name: "eduTool", id: "edu-tool-input", checked: "true" }),
                  el("span", {}, ["Input"]),
                ]),
                el("label", { class: "teachRadio" }, [
                  el("input", { type: "radio", name: "eduTool", id: "edu-tool-erase" }),
                  el("span", {}, ["Eraser"]),
                ]),
              ]),

              el("div", { class: "teachRow" }, [
                el("div", { class: "teachSelected" }, [
                  el("div", { class: "k" }, ["Selected:"]),
                  el("div", { class: "v", id: "edu-selected" }, ["C"]),
                ]),
                el("button", { class: "btn btn-sm", type: "button", id: "edu-clearAll" }, ["Clear All"]),
              ]),

              el("div", { class: "teachSubTitle" }, ["Show Markers"]),
              el("div", { class: "teachRow" }, [
                el("label", { class: "teachCheck" }, [
                  el("input", { type: "checkbox", id: "edu-show-staff", checked: "true" }),
                  el("span", {}, ["Staff"]),
                ]),
                el("label", { class: "teachCheck" }, [
                  el("input", { type: "checkbox", id: "edu-show-tab", checked: "true" }),
                  el("span", {}, ["TAB"]),
                ]),
                el("label", { class: "teachCheck" }, [
                  el("input", { type: "checkbox", id: "edu-show-fret", checked: "true" }),
                  el("span", {}, ["Fretboard"]),
                ]),
              ]),

              el("div", { class: "teachSubTitle" }, ["Clear Surface"]),
              el("div", { class: "teachRow" }, [
                el("button", { class: "btn btn-sm", type: "button", id: "edu-clearStaff" }, ["Staff"]),
                el("button", { class: "btn btn-sm", type: "button", id: "edu-clearTab" }, ["TAB"]),
                el("button", { class: "btn btn-sm", type: "button", id: "edu-clearFret" }, ["Fret"]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),

    el("div", { class: "section", "data-tabs": "miscinfo" }, [
      el("div", { class: "block-title" }, ["Misc. Information"]),
      el("div", { class: "tabs compact" }, [
        el("button", { class: "tab active", type: "button", "data-tab": "ach" }, ["Achievements"]),
        el("button", { class: "tab", type: "button", "data-tab": "chord" }, ["Chords"]),
        el("button", { class: "tab", type: "button", "data-tab": "scales" }, ["Scales"]),
        el("button", { class: "tab", type: "button", "data-tab": "lb" }, ["Leaderboard"]),
        el("button", { class: "tab devHidden", type: "button", "data-tab": "dev", id: "misc-dev-tab" }, ["Dev/Test"]),
      ]),
      el("div", { class: "tabpanes" }, [
        el("div", { class: "pane active", "data-pane": "ach" }, [
          el("div", { class: "miscPane" }, ["Achievements placeholder"]),
        ]),
        el("div", { class: "pane", "data-pane": "interval" }, [
          el("div", { style: "font-size:12px;color:rgba(215,230,255,.8)" }, ["Intervals UI placeholder."]),
        ]),
        el("div", { class: "pane", "data-pane": "chord" }, [
          el("div", { class: "miscPane" }, ["Chord library placeholder"]),
        ]),
        el("div", { class: "pane", "data-pane": "scales" }, [
          el("div", { class: "miscPane" }, ["Scale library placeholder"]),
        ]),
        el("div", { class: "pane", "data-pane": "lb" }, [
          el("div", { class: "tabs compact subTabs", "data-tabs": "lbsub" }, [
            el("button", { class: "tab active", type: "button", "data-tab": "match" }, ["Match"]),
            el("button", { class: "tab", type: "button", "data-tab": "high" }, ["High Scores"]),
          ]),
          el("div", { class: "tabpanes" }, [
            el("div", { class: "pane active", "data-pane": "match" }, [
              el("div", { class: "leader-list", id: "leaderboard" }, []),
            ]),
            el("div", { class: "pane", "data-pane": "high" }, [
              el("div", { class: "leader-list", id: "highscores" }, []),
            ]),
          ]),
        ]),

        el("div", { class: "pane", "data-pane": "dev", id: "misc-dev-pane" }, [
          el("div", { class: "paneForm" }, [
            el("div", { class: "formHint" }, ["Dev/Test tools are for rapid testing only."] ),
            el("div", { class: "opsGrid" }, [
              el("button", { class: "btn btn-sm", type: "button", id: "dev-prevPlayer" }, ["Prev Player"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-nextPlayer" }, ["Next Player"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-endTurn" }, ["End Turn"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-clearBoard" }, ["Clear Board"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-forceInMatch" }, ["Force In-Match"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-forceLastChance" }, ["Force Last Chance"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-forceResults" }, ["Force Results"]),
            ]),

            el("div", { class: "subTitle" }, ["Staff/TAB Timeline Stress"]),
            el("div", { class: "opsGrid" }, [
              el("button", { class: "btn btn-sm", type: "button", id: "dev-fillStaffTab" }, ["Fill Window"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-advanceStaffTab" }, ["Advance 1"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-advanceStaffTab16" }, ["Advance 16"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-fillAndShift" }, ["Fill + Shift"]),
            ]),

            el("div", { class: "subTitle" }, ["Mode 3 Truth Table Verification"]),
            el("div", { class: "opsGrid" }, [
              el("button", { class: "btn btn-sm", type: "button", id: "dev-runMode3Strict" }, ["Run (Strict)"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-runMode3Enh" }, ["Run (Enharmonic)"]),
            ]),
            el(
              "textarea",
              {
                id: "dev-mode3Report",
                class: "mono",
                rows: "9",
                spellcheck: "false",
                style: "width:100%; resize:vertical; padding:8px; border-radius:10px; border:1px solid rgba(0,0,0,0.12);",
                placeholder: "Mode 3 matrix verification results will appear here…",
              },
              [],
            ),

            el("div", { class: "subTitle" }, ["Persistence (USB/Offline)"]),
            el("div", { class: "opsGrid" }, [
              el("button", { class: "btn btn-sm", type: "button", id: "dev-exportSave" }, ["Export Save"]),
              el("button", { class: "btn btn-sm", type: "button", id: "dev-importSave" }, ["Import Save"]),
            ]),
            el(
              "input",
              {
                id: "dev-importSaveFile",
                type: "file",
                accept: "application/json",
                style: "display:none",
              },
              [],
            ),
            el("div", { class: "formHint" }, [
              "Exports a single JSON snapshot (settings + leaderboards). Import replaces local data and writes to IndexedDB.",
            ]),

            el("div", { class: "subTitle" }, ["Paint / Erase"]),
            formRowInline("Enable", [checkboxEl("dev-paintEnabled", false)]),
            formRowInline("Player", [
              selectEl(
                "dev-paintPlayer",
                [
                  { label: "P1", value: "0" },
                  { label: "P2", value: "1" },
                  { label: "P3", value: "2" },
                  { label: "P4", value: "3" },
                  { label: "P5", value: "4" },
                ],
              ),
              selectEl(
                "dev-paintMode",
                [
                  { label: "Paint", value: "paint" },
                  { label: "Erase", value: "erase" },
                ],
              ),
            ]),
            formRow(
              "Lane",
              selectEl(
                "dev-paintLane",
                [
                  { label: "Prompt", value: "prompt" },
                  { label: "Natural", value: "nat" },
                  { label: "Sharp", value: "shr" },
                  { label: "Flat", value: "flt" },
                ],
              ),
              "Click the fretboard to paint/erase claims.",
            ),
            el("div", { class: "formHint" }, ["Tip: Click a rail tile to set the current prompt (dev only)."] ),
          ]),
        ]),
      ]),
    ]),
  ]);

  main.append(left, center, right);

  // Footer
  const footer = el("div", { class: "ge-panel ge-footer" }, [
    el("div", { class: "alerts" }, [
      el("div", { class: "alert-pill" }, ["ALERTS"]),
      el(
        "button",
        {
          class: "alert-pill alert-pillBtn",
          id: "eventLogBtn",
          type: "button",
          title: "Open event log (troubleshooting)",
        },
        ["LOG"],
      ),
      el("div", { class: "alert-text", id: "alerts-text" }, ["Ready."]),
    ]),
    el(
      "button",
      {
        class: "badge devQuick devHidden",
        id: "devQuick",
        type: "button",
        title: "Open Dev/Test tools",
      },
      ["DEV"],
    ),
    el(
      "div",
      { class: "badge", id: "buildVersion", title: "Click 5x to unlock Dev/Test tools" },
      [`Build ${BUILD_ID}`],
    ),
  ]);

  shell.append(launch, main, footer);

    // --- Legacy splash/session overlays removed ---
  // The project now uses the central Start Menu + column flow as the sole entry authority.
  // The prior Splash + Start Setup overlays (including any legacy "mode" selectors) are intentionally removed
  // to prevent regression and duplicated session-routing UI.

// --- Match start overlay (Ready / Engage gate; Turn 1 does NOT begin immediately) ---
  const matchStart = el("div", { class: "matchStartOverlay", id: "matchStartOverlay" }, [
    el("div", { class: "matchStartCard ge-panel" }, [
      el("div", { class: "matchStartTitle" }, ["Ready"]),
      el("div", { class: "matchStartHint", id: "matchStart-hint" }, ["Tap anywhere to engage"]),
      el("div", { class: "matchStartActions" }, [
        el("button", { class: "btn", type: "button", id: "matchStart-engage" }, ["Engage"]),
      ]),
    ]),
  ]);
  shell.append(matchStart);

  // --- Event Log overlay (debugging aid; records app/game events in-session) ---
  const eventLogOverlay = el("div", { class: "eventLogOverlay", id: "eventLogOverlay" }, [
    el("div", { class: "eventLogCard ge-panel" }, [
      el("div", { class: "eventLogHeader" }, [
        el("div", { class: "eventLogTitle" }, ["Event Log"]),
        el("div", { class: "eventLogActions" }, [
          el("button", { class: "btn btn-sm", type: "button", id: "eventLogClear" }, ["Clear"]),
          el("button", { class: "btn btn-sm", type: "button", id: "eventLogCopy" }, ["Copy"]),
          el("button", { class: "btn btn-sm", type: "button", id: "eventLogDownload" }, ["Download"]),
          el("button", { class: "btn btn-sm", type: "button", id: "eventLogClose" }, ["Close"]),
        ]),
      ]),
      el("pre", { class: "eventLogBody", id: "eventLogBody" }, ["(no events yet)"]),
    ]),
  ]);
  shell.append(eventLogOverlay);

  // --- Intermission overlay (multiplayer; shown between turns) ---
  const intermission = el("div", { class: "intermissionOverlay", id: "intermissionOverlay" }, [
    el("div", { class: "intermissionCard ge-panel" }, [
      el("div", { class: "intermissionTitle" }, ["Intermission"]),
      el("div", { class: "intermissionNext", id: "intermission-next" }, ["Next: "] ),
      el("div", { class: "intermissionTimer", id: "intermission-timer" }, ["00:00"]),
      el("div", { class: "intermissionHint" }, ["Tap anywhere to start early"]),
      el("div", { class: "intermissionActions" }, [
        el("button", { class: "btn", type: "button", id: "intermission-start" }, ["Start Turn"]),
      ]),
    ]),
  ]);
  shell.append(intermission);

  // --- Staff accidental prompt overlay (Natural / Sharp / Flat) ---
  const acc = el("div", { class: "accidentalOverlay", id: "accidentalOverlay", hidden: "true" }, [
    el("div", { class: "accidentalCard ge-panel" }, [
      el("div", { class: "accidentalTitle" }, ["Staff Accidental"]),
      el("div", { class: "accidentalHint" }, ["Select the accidental for this staff mark."]),
      el("div", { class: "accidentalActions" }, [
        el("button", { class: "btn btn-sm", type: "button", id: "accidental-natural" }, ["Natural ♮"]),
        el("button", { class: "btn btn-sm", type: "button", id: "accidental-sharp" }, ["Sharp ♯"]),
        el("button", { class: "btn btn-sm", type: "button", id: "accidental-flat" }, ["Flat ♭"]),
      ]),
      el("div", { style: "height:10px" }),
      el("div", { class: "accidentalActions" }, [
        el("button", { class: "btn btn-sm", type: "button", id: "accidental-cancel" }, ["Cancel"]),
      ]),
    ]),
  ]);
  shell.append(acc);

  target.replaceChildren(shell);

  wireTabs(shell);
  buildKeypad();
}
