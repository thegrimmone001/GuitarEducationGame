import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

function readBuildId() {
  const p = path.join("src","app","buildInfo.ts");
  const txt = fs.readFileSync(p, "utf8");
  const m = txt.match(/BUILD_ID\s*=\s*"([^"]+)"/);
  return m ? m[1] : "unknown";
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

// This script intentionally does NOT run `npm install`.
// Expected usage:
//   npm ci
//   npm run build
//   npm run release:zip
//
// It uses PowerShell's Compress-Archive on Windows for a deterministic artifact.
const buildId = readBuildId();
const releasesDir = path.join("releases");
ensureDir(releasesDir);

const baseName = `guitar-edu-ui_${buildId}_release`;
const zipName = `${baseName}.zip`;
const zipPath = path.join(releasesDir, zipName);

// Stage into a temporary folder, but ZIP **its contents** (Solution B: flat zip).
// This prevents Windows from creating a redundant nested folder when users extract into
// a same-named directory.
const stageDir = path.join(releasesDir, `${baseName}__stage`);

function rmrf(p) {
  if (!fs.existsSync(p)) return;
  fs.rmSync(p, { recursive: true, force: true });
}

function copyRecursive(src, dst) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dst, name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

// Always regenerate
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

// Recreate staging folder
rmrf(stageDir);
ensureDir(stageDir);

const includes = [
  "dist",
  "DOCS",
  "README.md",
  "CHANGELOG.md",
  "BUILD_LOG.md",
  "DECISIONS_LOG.md",
  "CHECKLIST.md",
  "package.json",
  "package-lock.json"
].filter((p) => fs.existsSync(p));

for (const p of includes) {
  copyRecursive(p, path.join(stageDir, p));
}

// Zip the staging folder *contents* so the archive is flat (no top-level folder).
const ps = `Compress-Archive -Force -Path "${stageDir}\\*" -DestinationPath "${zipPath}"`;

try {
  execSync(`powershell -NoProfile -ExecutionPolicy Bypass -Command ${JSON.stringify(ps)}`, { stdio: "inherit" });
} catch (e) {
  console.error("Packaging failed. On non-Windows systems, create a zip from:", includes);
  process.exit(1);
}

console.log(`OK: ${zipPath}`);
console.log(`OK: staged (flat) from: ${stageDir}`);

// Best-effort cleanup
try { rmrf(stageDir); } catch {}
