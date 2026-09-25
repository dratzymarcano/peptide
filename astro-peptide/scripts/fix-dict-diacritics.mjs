#!/usr/bin/env node
/**
 * Apply diacritic maps to dictionary VALUES only (preserves JSON keys).
 *
 * Interpolation placeholders are masked before substitution and restored
 * afterwards. Without that, the Spanish map's `area → área` entry rewrote the
 * `{area}` token inside five strings, so every Spanish research-area page
 * shipped the literal "{área}" in its <title>, <h1> and JSON-LD — the token no
 * longer matched the `area` key the page interpolates against. A placeholder
 * is code; only the prose around it is translatable text.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [, , locale] = process.argv;
if (!['es', 'fr', 'it', 'de'].includes(locale)) {
  console.error('usage: fix-dict-diacritics.mjs <es|fr|it|de>');
  process.exit(1);
}

const mapPath = resolve(process.cwd(), `scripts/diacritics/${locale}.json`);
const map = JSON.parse(readFileSync(mapPath, 'utf8'));

const dictPath = resolve(process.cwd(), `src/i18n/dictionaries/${locale}.json`);
const dict = JSON.parse(readFileSync(dictPath, 'utf8'));

const entries = Object.entries(map)
  .filter(([k, v]) => k !== v)
  .sort((a, b) => b[0].length - a[0].length);

const compiled = entries.map(([from, to]) => {
  const caseSensitive = from[0] === from[0].toUpperCase();
  if (caseSensitive) {
    return { re: new RegExp(`\\b${from}\\b`, 'g'), fn: () => to };
  }
  const re = new RegExp(`\\b(${from[0].toUpperCase()}${from.slice(1)}|${from})\\b`, 'g');
  return {
    re,
    fn: (m) => (m[0] === m[0].toUpperCase() ? to[0].toUpperCase() + to.slice(1) : to),
  };
});

let count = 0;

// U+E000 is a private-use codepoint: it cannot occur in real copy, so it is
// safe as a mask sentinel and cannot itself match a \b word boundary rule.
const MASK = '\uE000';

function fixString(value) {
  const placeholders = [];
  const masked = value.replace(/\{[^}]*\}/g, (match) => {
    placeholders.push(match);
    return `${MASK}${placeholders.length - 1}${MASK}`;
  });

  let out = masked;
  for (const { re, fn } of compiled) {
    out = out.replace(re, (m) => {
      count++;
      return fn(m);
    });
  }

  return out.replace(
    new RegExp(`${MASK}(\\d+)${MASK}`, 'g'),
    (_match, index) => placeholders[Number(index)],
  );
}

function fix(value) {
  if (typeof value === 'string') return fixString(value);
  if (Array.isArray(value)) return value.map(fix);
  if (value && typeof value === 'object') {
    const next = {};
    for (const [k, v] of Object.entries(value)) next[k] = fix(v);
    return next;
  }
  return value;
}

const fixed = fix(dict);
writeFileSync(dictPath, JSON.stringify(fixed, null, 2) + '\n');
console.log(`[${locale}] replaced ${count} occurrences (values only)`);
