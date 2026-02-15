type SmokeCheck = {
  id: string;
  ok: boolean;
  note?: string;
};

function getBoolParam(name: string): boolean {
  try {
    const url = new URL(window.location.href);
    const v = url.searchParams.get(name);
    if (!v) return false;
    return v === "1" || v.toLowerCase() === "true" || v.toLowerCase() === "yes";
  } catch {
    return false;
  }
}

function emit(eventType: string, detail: unknown) {
  try {
    window.dispatchEvent(new CustomEvent(eventType, { detail }));
  } catch {
    // never block boot
  }
}

function check(doc: Document, id: string, note?: string): SmokeCheck {
  const ok = !!doc.getElementById(id);
  return { id, ok, note: ok ? undefined : note };
}

export function runSmokeTestIfRequested(doc: Document) {
  if (!getBoolParam("smoke")) return;

  // Small delay so the layout + controller have a chance to mount.
  window.setTimeout(() => {
    const checks: SmokeCheck[] = [
      check(doc, "ge-shell", "Main shell container not found (layout did not mount)."),
      check(doc, "staffSection", "Staff section missing."),
      check(doc, "staffCanvas", "Staff canvas missing."),
      check(doc, "fretCanvas", "Fretboard canvas missing."),
      check(doc, "noteStrip-rail", "Note rail mount missing."),
      check(doc, "taskContext", "Task Context panel missing."),
      check(doc, "ctx-learningTarget", "Learning Target row missing."),
      check(doc, "ctx-requiredSurfaces", "Required Inputs row missing."),
      check(doc, "ctx-prompt", "Task Context prompt row missing."),
      check(doc, "eventLogBtn", "Event log button missing."),
      check(doc, "eventLogDownload", "Event log download button missing."),
      check(doc, "buildVersion", "Build badge missing."),
    ];

    const ok = checks.every((c) => c.ok);
    const payload = { ok, checks, href: window.location.href };

    if (ok) console.info("[GEDU] SMOKE PASS", payload);
    else console.error("[GEDU] SMOKE FAIL", payload);

    // EventLog will record any gedu:* event.
    emit("gedu:smokeTest", payload);
  }, 50);
}
