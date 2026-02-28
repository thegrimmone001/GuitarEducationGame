import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

// Tripwire: enforce zip artifact structure.
// Solution B (canonical): ZIPs are **flat** (no top-level root folder).
// This prevents Windows extraction into a same-named directory from creating a redundant nested folder.

const ROOT = process.cwd();

function fail(msg) {
  console.error(`TRIPWIRE FAIL: ${msg}`);
  process.exit(1);
}

function newestZipInReleases() {
  const releasesDir = path.join(ROOT, "releases");
  if (!fs.existsSync(releasesDir)) return null;
  const zips = fs.readdirSync(releasesDir)
    .filter((n) => n.toLowerCase().endsWith(".zip"))
    .map((n) => ({
      name: n,
      full: path.join(releasesDir, n),
      mtime: fs.statSync(path.join(releasesDir, n)).mtimeMs
    }))
    .sort((a, b) => b.mtime - a.mtime);
  return zips.length ? zips[0].full : null;
}

function listZipEntries(zipPath) {
  // Prefer Python (cross-platform), fall back to unzip.
  const pySnippet = [
    "import sys, zipfile",
    "p=sys.argv[1]",
    "z=zipfile.ZipFile(p,'r')",
    "for n in z.namelist():",
    "  print(n)"
  ].join("; ");

  try {
    const out = execSync(`python -c "${pySnippet}" "${zipPath}"`, { encoding: "utf8" });
    return out.split(/\r?\n/).filter(Boolean);
  } catch {
    // Windows sometimes uses 'py'
    try {
      const out = execSync(`py -c "${pySnippet}" "${zipPath}"`, { encoding: "utf8" });
      return out.split(/\r?\n/).filter(Boolean);
    } catch {
      try {
        const out = execSync(`unzip -Z1 "${zipPath}"`, { encoding: "utf8" });
        return out.split(/\r?\n/).filter(Boolean);
      } catch {
        fail("Unable to list zip entries (requires python/py or unzip). Install one of these tools to enforce packaging invariants.");
      }
    }
  }
}

const arg = process.argv[2];
const zipPath = arg ? path.resolve(ROOT, arg) : newestZipInReleases();
if (!zipPath) fail("No zip path provided and no ./releases/*.zip found.");
if (!fs.existsSync(zipPath)) fail(`Zip file not found: ${zipPath}`);

const baseName = path.basename(zipPath, path.extname(zipPath));
const entries = listZipEntries(zipPath);
if (!entries.length) fail("Zip appears empty.");

// Determine unique top-level paths
const tops = new Set();
for (const e of entries) {
  const normalized = e.replace(/\\/g, "/");
  const top = normalized.split("/")[0];
  if (top) tops.add(top);
}

// Fail if the archive is still wrapped in a single root folder (old behavior).
if (tops.size === 1) {
  const [onlyTop] = Array.from(tops);
  fail(
    `Zip must be flat (no root folder). Found a single top-level folder: "${onlyTop}". ` +
      `Rebuild the archive to include files/folders at the zip root.`
  );
}

// Fail if the archive contains a root folder that matches the zip name (classic nesting trap).
if (tops.has(baseName)) {
  fail(
    `Zip contains a top-level folder named "${baseName}". ` +
      `This violates Solution B (flat zip) and can cause redundant nesting on extraction.`
  );
}

// Minimal required root-level entries (heuristic): package.json + src/ + DOCS/
function hasEntry(p) {
  const want = p.replace(/\\/g, "/");
  return entries.some((e) => e.replace(/\\/g, "/") === want);
}
function hasPrefix(prefix) {
  const want = prefix.replace(/\\/g, "/");
  return entries.some((e) => e.replace(/\\/g, "/").startsWith(want));
}

if (!hasEntry("package.json")) fail("Zip missing required root file: package.json");
if (!hasPrefix("src/")) fail("Zip missing required folder: src/");
if (!hasPrefix("DOCS/")) fail("Zip missing required folder: DOCS/");

// Human-readable warning (not a failure): extraction best practice.
console.log(`WARN: This is a flat zip. Extract into an empty folder to avoid file merges.`);
console.log(`OK: zip structure tripwire passed (${path.basename(zipPath)})`);
