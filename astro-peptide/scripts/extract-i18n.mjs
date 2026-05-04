#!/usr/bin/env node
/**
 * extract-i18n.mjs
 *
 * Walks src/components and src/pages and reports candidate user-visible strings
 * that are NOT routed through the t() helper or the productContent/blogContent
 * runtime helpers. Output is a JSON report at scripts/i18n-extract-report.json
 * plus a human summary on stdout.
 *
 * This is a tooling aid for translators / reviewers, not a code generator.
 * It deliberately produces false positives (URLs, IDs, class names) — review
 * the report before promoting any string into dictionaries/en.json.
 *
 * Usage:
 *   node scripts/extract-i18n.mjs
 *   node scripts/extract-i18n.mjs --json
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SCAN_DIRS = ['src/components', 'src/pages', 'src/layouts'];
const EXT = new Set(['.astro', '.tsx']);
const REPORT_PATH = join(ROOT, 'scripts', 'i18n-extract-report.json');

const IGNORE_VALUES = new Set(['', '/', '#', 'true', 'false', 'null', 'undefined']);
const IGNORE_PATTERNS = [
  /^[a-z][a-z0-9-]*$/,            // single token / class name
  /^https?:\/\//i,
  /^[\d.,/:\s%-]+$/,              // numbers, dates, percentages
  /^\$?\{.*\}$/,                  // pure interpolation
  /^@[a-z0-9/-]+$/i,              // import paths
  /^[A-Z_]+$/,                    // SCREAMING_SNAKE constants
  /\.(astro|tsx|ts|js|css|svg|png|webp|jpg|jpeg|json)$/i,
];

const TEXT_NODE_RE = />([^<>{}\n][^<>{}]{2,}?)</g;            // >Hello world<
const ATTR_TEXT_RE = /(aria-label|title|placeholder|alt)=["']([^"'{}\n]{2,})["']/g;

function shouldKeep(value) {
  const v = value.trim();
  if (v.length < 2) return false;
  if (IGNORE_VALUES.has(v)) return false;
  if (!/[A-Za-z]/.test(v)) return false;
  if (IGNORE_PATTERNS.some((re) => re.test(v))) return false;
  return true;
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.has(full.slice(full.lastIndexOf('.')))) yield full;
  }
}

async function scanFile(file) {
  const src = await readFile(file, 'utf8');
  const hits = [];
  let m;
  TEXT_NODE_RE.lastIndex = 0;
  while ((m = TEXT_NODE_RE.exec(src)) !== null) {
    const value = m[1].trim();
    if (shouldKeep(value)) hits.push({ kind: 'text', value });
  }
  ATTR_TEXT_RE.lastIndex = 0;
  while ((m = ATTR_TEXT_RE.exec(src)) !== null) {
    const value = m[2].trim();
    if (shouldKeep(value)) hits.push({ kind: m[1], value });
  }
  return hits;
}

async function main() {
  const report = {};
  let total = 0;
  for (const dir of SCAN_DIRS) {
    try {
      for await (const file of walk(join(ROOT, dir))) {
        const hits = await scanFile(file);
        if (hits.length === 0) continue;
        const rel = relative(ROOT, file);
        report[rel] = hits;
        total += hits.length;
      }
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
  }
  await writeFile(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');
  if (process.argv.includes('--json')) {
    process.stdout.write(JSON.stringify(report, null, 2) + '\n');
    return;
  }
  const files = Object.keys(report).length;
  process.stdout.write(`i18n extract: ${total} candidate strings across ${files} files\n`);
  process.stdout.write(`Report: ${relative(ROOT, REPORT_PATH)}\n`);
  process.stdout.write('Note: this scan flags ANY hard-coded text. Many hits are false positives\n');
  process.stdout.write('(SVG content, code blocks, schema literals). Review before adding to en.json.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
