import { BUILD_ID } from "./buildInfo";
type LogEntry = {
  ts: number;
  kind: "ui" | "engine" | "sys";
  name: string;
  detail?: unknown;
};

const MAX_ENTRIES = 400;

function fmtTime(ts: number) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  return `${hh}:${mm}:${ss}.${ms}`;
}

function safeJson(v: unknown): string {
  try {
    if (v == null) return "";
    return JSON.stringify(v);
  } catch {
    return "[unserializable]";
  }
}

export function installEventLog(doc: Document) {
  const w = window as any;
  if (w.__GEDU_EVENTLOG_INSTALLED__) return;
  w.__GEDU_EVENTLOG_INSTALLED__ = true;

  const overlay = doc.getElementById("eventLogOverlay") as HTMLDivElement | null;
  const body = doc.getElementById("eventLogBody") as HTMLPreElement | null;
  const btnOpen = doc.getElementById("eventLogBtn") as HTMLButtonElement | null;
  const btnClose = doc.getElementById("eventLogClose") as HTMLButtonElement | null;
  const btnClear = doc.getElementById("eventLogClear") as HTMLButtonElement | null;
  const btnCopy = doc.getElementById("eventLogCopy") as HTMLButtonElement | null;
  const btnDownload = doc.getElementById("eventLogDownload") as HTMLButtonElement | null;

  const entries: LogEntry[] = [];
  let dirty = false;
  let rafId: number | null = null;

  const flush = () => {
    rafId = null;
    if (!dirty) return;
    dirty = false;
    if (!body) return;
    if (!entries.length) {
      body.textContent = "(no events yet)";
      return;
    }
    body.textContent = entries
      .map((e) => {
        const detail = e.detail != null ? ` ${safeJson(e.detail)}` : "";
        return `[${fmtTime(e.ts)}] ${e.kind.toUpperCase()} ${e.name}${detail}`;
      })
      .join("\n");
  };

  const requestFlush = () => {
    dirty = true;
    if (rafId == null) rafId = window.requestAnimationFrame(flush);
  };
  // De-dupe noisy UI events (e.g., matchOptions spam) without losing order semantics.
  // This keeps the log readable while still capturing state changes.
  let lastUiKey = "";
  let lastUiAt = 0;

  const push = (kind: LogEntry["kind"], name: string, detail?: unknown) => {
    if (kind === "ui") {
      const now = Date.now();
      const key = `${name}::${safeJson(detail)}`;
      if (key === lastUiKey && now - lastUiAt < 100) return;
      lastUiKey = key;
      lastUiAt = now;
    }
    entries.push({ ts: Date.now(), kind, name, detail });
    if (entries.length > MAX_ENTRIES) entries.splice(0, entries.length - MAX_ENTRIES);
    requestFlush();
  };

  // External clear signal (used by dev tools / emergency reset)
  window.addEventListener("gedu:eventLogClear", () => {
    entries.length = 0;
    push("sys", "eventLog:cleared");
    requestFlush();
  });

  // UI controls
  const show = () => {
    if (overlay) overlay.classList.add("show");
    requestFlush();
  };
  const hide = () => {
    if (overlay) overlay.classList.remove("show");
  };

  btnOpen?.addEventListener("click", () => {
    push("sys", "eventLog:open");
    show();
  });
  btnClose?.addEventListener("click", () => {
    push("sys", "eventLog:close");
    hide();
  });
  btnClear?.addEventListener("click", () => {
    entries.splice(0, entries.length);
    push("sys", "eventLog:cleared");
    requestFlush();
  });
  
btnCopy?.addEventListener("click", async () => {
  const txt = entries
    .map((e) => {
      const detail = e.detail != null ? ` ${safeJson(e.detail)}` : "";
      return `[${fmtTime(e.ts)}] ${e.kind.toUpperCase()} ${e.name}${detail}`;
    })
    .join("\n");

  const ok = await copyText(txt);
  push("sys", ok ? "eventLog:copied" : "eventLog:copyFailed");
});

overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) hide();
  });

  // Patch dispatchEvent to record ALL gedu:* events (single source of UI event truth)
  const originalDispatch = window.dispatchEvent.bind(window);
  window.dispatchEvent = ((event: Event) => {
    try {
      const t = (event as any)?.type;
      if (typeof t === "string" && t.startsWith("gedu:")) {
        const detail = (event as CustomEvent)?.detail;
        push("ui", t, detail);
      }
    } catch {
      // never block event dispatch
    }
    return originalDispatch(event);
  }) as any;

  // Expose a safe hook for engine actions (used by gameController)
  (window as any).__GEDU_LOG_ACTION__ = (action: any) => {
    try {
      push("engine", action?.type ?? "(unknown)", action);
    } catch {
      // ignore
    }
  };

// Expose safe hooks for UI/SYS logging
(window as any).__GEDU_LOG_SYS__ = (name: string, detail?: unknown) => {
  try { push("sys", name, detail); } catch {}
};
(window as any).__GEDU_LOG_UI__ = (name: string, detail?: unknown) => {
  try { push("ui", name, detail); } catch {}
};




const copyText = async (text: string) => {
  const t = (text || "").trim();
  if (!t) return false;
  try {
    await navigator.clipboard.writeText(t);
    return true;
  } catch {
    // Fallback: hidden textarea + execCommand
    try {
      const ta = doc.createElement("textarea");
      ta.value = t;
      ta.setAttribute("readonly", "true");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      doc.body.appendChild(ta);
      ta.select();
      const ok = doc.execCommand("copy");
      doc.body.removeChild(ta);
      return !!ok;
    } catch {
      return false;
    }
  }
};

btnCopy?.addEventListener("click", async () => {
  const ok = await copyText(body?.innerText ?? "");
  push("sys", "eventLog:copy", { ok: !!ok });
  // Tiny UX feedback without adding new UI: briefly flash button text
  try {
    if (!btnCopy) return;
    const prev = btnCopy.textContent || "Copy";
    btnCopy.textContent = ok ? "Copied" : "Copy failed";
    setTimeout(() => { try { btnCopy.textContent = prev; } catch {} }, 900);
  } catch { /* ignore */ }
});



const safeJsonPretty = (v: any) => {
  try { return JSON.stringify(v, null, 2); } catch { return String(v); }
};

const buildReportText = (rawLog: string) => {
  const now = new Date().toISOString();
  const url = (() => { try { return location.href; } catch { return "unknown"; } })();
  const mo = (window as any).__GEDU_LAST_MATCH_OPTIONS__;
  const eng = (window as any).__GEDU_LAST_ENGINE_SETTINGS__;
  const header = [
    "=== Guitar-Edu-UI Report ===",
    `Time: ${now}`,
    `Build: ${BUILD_ID}`,
    `URL: ${url}`,
    "",
    "--- Last Match Options ---",
    safeJson(mo ?? null),
    "",
    "--- Last Engine Settings ---",
    safeJson(eng ?? null),
    "",
    "--- Event Log ---",
    rawLog || "",
    ""
  ].join("\n");
  return header;
};

const downloadText = (text: string) => {
  const t = (text || "").trim();
  if (!t) return false;
  try {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const name = `gedu_${BUILD_ID}_${stamp}.txt`;
    const blob = new Blob([t], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = doc.createElement("a");
    a.href = url;
    a.download = name;
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 250);
    return true;
  } catch {
    return false;
  }
};

btnDownload?.addEventListener("click", () => {
  const ok = downloadText(buildReportText(body?.innerText ?? ""));
  push("sys", "eventLog:download", { ok: !!ok });
  try {
    if (!btnDownload) return;
    const prev = btnDownload.textContent || "Download";
    btnDownload.textContent = ok ? "Saved" : "Failed";
    setTimeout(() => { try { btnDownload.textContent = prev; } catch {} }, 900);
  } catch { /* ignore */ }
});

  push("sys", "eventLog:installed", { max: MAX_ENTRIES });

  return {
    push,
    show,
    hide,
    getEntries: () => entries.slice(),
  };
}

export function getEventLogText(): string {
  // Deprecated: kept for compatibility with older tooling.
  // Prefer using the copy/download buttons which pull from the live DOM report.
  return "";
}
