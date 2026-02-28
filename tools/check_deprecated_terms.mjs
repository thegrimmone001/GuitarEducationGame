import fs from "node:fs";
import path from "node:path";

function readLines(p) {
  if (!fs.existsSync(p)) return [];
  const txt = fs.readFileSync(p, "utf8");
  const begin = "<!-- DEPRECATED_TERMS:BEGIN -->";
  const end = "<!-- DEPRECATED_TERMS:END -->";
  const i0 = txt.indexOf(begin);
  const i1 = txt.indexOf(end);
  if (i0 === -1 || i1 === -1 || i1 <= i0) return [];
  const block = txt.slice(i0 + begin.length, i1);
  return block
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.replace(/^-\s+/, "").trim())
    .filter(Boolean);
}

function walk(dir, pred) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === "dist" || ent.name === ".git") continue;
      out.push(...walk(full, pred));
    } else if (pred(full)) out.push(full);
  }
  return out;
}

// Canon: deprecated terms live in DOCS/DEPRECATED_TERMS.md
const deprecated = readLines(path.join("DOCS", "DEPRECATED_TERMS.md"));
if (!deprecated.length) {
  console.log("No deprecated terms listed (DOCS/DEPRECATED_TERMS.md). Skipping.");
  process.exit(0);
}

const files = walk("src", (p) => p.endsWith(".ts") || p.endsWith(".tsx") || p.endsWith(".md"));
const hits = [];

for (const f of files) {
  const txt = fs.readFileSync(f, "utf8");
  for (const term of deprecated) {
    // Allow exact occurrences inside DOCS/DEPRECATED_TERMS.md only.
    if (f.replace(/\\/g, "/").endsWith("DOCS/DEPRECATED_TERMS.md")) continue;

    // simple substring match; deterministic and fast
    if (txt.toLowerCase().includes(term.toLowerCase())) {
      hits.push({ file: f, term });
    }
  }
}

if (hits.length) {
  console.error("Deprecated term usage detected:");
  for (const h of hits) console.error(`- ${h.term} in ${h.file}`);
  process.exit(1);
}

console.log("OK: no deprecated terms found.");
