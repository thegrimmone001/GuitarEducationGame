import "./styles.css";
import { mountLayout } from "./ui/layout";
import { initGameController } from "./app/gameController";
import { hydrateFromIndexedDb } from "./shell/storage";
import { installEventLog } from "./app/eventLog";
import { runSmokeTestIfRequested } from "./app/smokeTest";
import { BUILD_ID } from "./app/buildInfo";

// DEV-STABILITY: prevent double boot (e.g., hot reload quirks / duplicate script include)
const __w = window as any;
const __bootOk = !__w.__GEDU_APP_BOOTED__;
if (!__bootOk) {
  console.warn("[GEDU] Boot suppressed: already initialized");
} else {
  __w.__GEDU_APP_BOOTED__ = true;
}

if (__bootOk) {

function maybeResetAppState() {
  const url = new URL(window.location.href);

  if (!url.searchParams.has("reset")) return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("GEDU_") || k.startsWith("gedu_") || k.startsWith("guitar-edu") || k.toLowerCase().includes("gedu") || k.toLowerCase().includes("guitar-edu"))) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.warn("[GEDU] Reset failed:", e);
  }
  url.searchParams.delete("reset");
  window.location.replace(url.toString());
}

function renderFatal(app: HTMLElement, err: unknown) {
  const msg = err instanceof Error ? (err.stack || err.message) : String(err);
  console.error("[GEDU] Fatal boot error:", err);
  app.innerHTML = `
    <div style="padding:16px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;">
      <h2 style="margin:0 0 8px 0;">Guitar-Edu-UI failed to load</h2>
      <div style="margin:0 0 12px 0;opacity:0.9;">Build: <code>${BUILD_ID}</code></div>
      <p style="margin:0 0 12px 0;">A fatal error occurred during boot. Copy the details below and attach to your report pack.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px 0;"><button data-gedu-fatal-copy style="padding:8px 10px;border-radius:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(0,0,0,0.35);color:#fff;cursor:pointer;">Copy error</button><button data-gedu-fatal-download style="padding:8px 10px;border-radius:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(0,0,0,0.35);color:#fff;cursor:pointer;">Download error</button></div><textarea data-gedu-fatal-text readonly style="width:100%;height:240px;white-space:pre;overflow:auto;">${msg.replace(/</g,"&lt;")}</textarea>
    </div>
  `;
}


function boot() {
  const app = document.getElementById("app") as HTMLElement | null;
  if (!app) throw new Error("#app not found");
  try {

      mountLayout(app);
      installEventLog(document);

      // Engine-backed controller (merged from the shell version into the new layout).
      // IMPORTANT: initialize the controller immediately so UI events (enterUI, beginSession, etc.)
      // cannot fire before listeners are attached. Hydration runs after and should never block wiring.
      initGameController(document);

      // Optional, dev-friendly smoke test (query param driven).
      runSmokeTestIfRequested(document);

      // Hydrate any persisted snapshot (USB/offline friendly) AFTER controller wiring.
      (async () => {
        try {
          await hydrateFromIndexedDb();
        } catch {
          /* ignore */
        }
      })();
  } catch (err) {
    renderFatal(app, err);
  }
}

// Prevent accidental double-boot (e.g., HMR edge cases or duplicate script mounts)
const w = window as any;

// Expose build id (used by report packs / UI)
w.BUILD_ID = BUILD_ID;

// Capture unhandled errors into Event Log for Report Packs
const wlogSys = (name: string, detail?: unknown) => {
  try { (window as any).__GEDU_LOG_SYS__?.(name, detail); } catch {}
};

window.addEventListener("error", (ev: Event) => {
  const e = ev as any;
  wlogSys("window.error", {
    message: e?.message,
    filename: e?.filename,
    lineno: e?.lineno,
    colno: e?.colno,
  });
});

window.addEventListener("unhandledrejection", (ev: PromiseRejectionEvent) => {
  wlogSys("window.unhandledrejection", {
    reason: String((ev as any).reason ?? ""),
  });
});

// Capture console warnings/errors (optional but useful during instability)
const origWarn = console.warn.bind(console);
const origErr = console.error.bind(console);
console.warn = (...args: any[]) => {
  wlogSys("console.warn", { args: args.map((a) => String(a)) });
  origWarn(...args);
};
console.error = (...args: any[]) => {
  wlogSys("console.error", { args: args.map((a) => String(a)) });
  origErr(...args);
};

// Reset any stored app state if requested
maybeResetAppState();

// Hard boot guard
if (w.__GEDU_BOOT_ALREADY_RAN__) {
  try { (window as any).__GEDU_LOG_SYS__?.("guard:skip", { guard: "__GEDU_BOOT_ALREADY_RAN__", file: "main.ts" }); } catch {}
} else {
  w.__GEDU_BOOT_ALREADY_RAN__ = true;
  boot();
}
}