import fs from "node:fs";
import path from "node:path";

// Tripwire: enforce canon hygiene invariants.
// - Forbid a lowercase /docs directory.
// - Ensure canonical filenames appear only where allowed.

const ROOT = process.cwd();

function fail(msg) {
  console.error(`TRIPWIRE FAIL: ${msg}`);
  process.exit(1);
}

function exists(p) {
  return fs.existsSync(path.join(ROOT, p));
}

// 1) Forbid /docs
if (exists("docs")) {
  fail("Forbidden folder detected: ./docs (lowercase). Use repo root and ./DOCS only.");
}

// 2) Require /DOCS
if (!exists("DOCS")) {
  fail("Missing required folder: ./DOCS (uppercase). Canon docs must live in root and ./DOCS only.");
}

// 3) Canon filename uniqueness / location rules
// NOTE: GEG IDs are reserved to CHECKLIST.md; this script focuses on file-path drift.
const RULES = [
  { name: "CHECKLIST.md", allowed: ["CHECKLIST.md"] },
  { name: "DECISIONS_LOG.md", allowed: ["DECISIONS_LOG.md"] },
  { name: "BUILD_LOG.md", allowed: ["BUILD_LOG.md"] },
  { name: "CHANGELOG.md", allowed: ["CHANGELOG.md"] },
  { name: "MATCH_SETTINGS_SPEC.md", allowed: ["MATCH_SETTINGS_SPEC.md"] },
  { name: "DEPRECATED_TERMS.md", allowed: ["DOCS/DEPRECATED_TERMS.md"] }
];

function findAllByName(dir, targetName, out = [], prefix = "") {
  const fullDir = path.join(dir, prefix);
  for (const entry of fs.readdirSync(fullDir, { withFileTypes: true })) {
    const rel = prefix ? path.join(prefix, entry.name) : entry.name;
    if (entry.isDirectory()) {
      // Skip node_modules and dist in audits
      if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".git") continue;
      findAllByName(dir, targetName, out, rel);
    } else if (entry.isFile() && entry.name === targetName) {
      out.push(rel.replace(/\\/g, "/"));
    }
  }
  return out;
}

for (const rule of RULES) {
  const found = findAllByName(ROOT, rule.name);
  for (const p of found) {
    if (!rule.allowed.includes(p)) {
      fail(`Canonical file path drift: found ${rule.name} at "${p}" (allowed: ${rule.allowed.join(", ")})`);
    }
  }
  // Ensure required files exist
  for (const required of rule.allowed) {
    if (!exists(required)) {
      fail(`Missing required canonical file: ${required}`);
    }
  }
  // Ensure duplicates aren't present
  if (found.length > rule.allowed.length) {
    fail(`Duplicate canonical file detected for ${rule.name}: ${found.join(", ")}`);
  }
}

console.log("OK: docs tree tripwire passed");
