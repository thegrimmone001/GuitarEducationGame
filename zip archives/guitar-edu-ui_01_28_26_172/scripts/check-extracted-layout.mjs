#!/usr/bin/env node
/**
 * Tripwire: detect redundant nested folder layouts after extracting milestone zips.
 *
 * Usage:
 *   node scripts/check-extracted-layout.mjs <path-to-extracted-folder>
 *
 * Passes when:
 *   - <root>/package.json exists, AND
 *   - there is NOT a nested folder with the same name as <root>.
 */

import fs from 'node:fs';
import path from 'node:path';

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function existsFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

const rootArg = process.argv[2];
if (!rootArg) {
  console.error('ERROR: missing path argument.');
  console.error('Usage: node scripts/check-extracted-layout.mjs <path-to-extracted-folder>');
  process.exit(2);
}

const root = path.resolve(rootArg);
const base = path.basename(root);
const nested = path.join(root, base);

const pkgAtRoot = existsFile(path.join(root, 'package.json'));
const nestedIsDir = isDir(nested);
const pkgAtNested = existsFile(path.join(nested, 'package.json'));

if (nestedIsDir && pkgAtNested && !pkgAtRoot) {
  console.error('ERROR: redundant nested folder detected.');
  console.error(`You likely want: ${nested}`);
  process.exit(1);
}

if (nestedIsDir) {
  console.error('ERROR: nested folder with the same name as the root folder detected.');
  console.error(`Disallowed: ${nested}`);
  process.exit(1);
}

if (!pkgAtRoot) {
  console.error('ERROR: expected package.json at the extracted root folder.');
  console.error(`Checked: ${path.join(root, 'package.json')}`);
  process.exit(1);
}

console.log('OK: extracted layout looks correct.');
