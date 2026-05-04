#!/usr/bin/env node
// Robust frontmatter repair: re-emit known-shape product frontmatter cleanly.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '..', 'src', 'content', 'products');

const files = readdirSync(DIR).filter((f) => f.endsWith('.md'));

const TOP_KEYS = new Set([
  'id','title','primary_keyword','search_volume','aliases','cas','molecular_weight',
  'purity','storage','package_sizes','moq','price','price_range','short_description',
  'category','researchArea','useCases','sequence','tags','images','meta','faqs','reviews',
]);

const stripQuotes = (s) => {
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
};

const yamlStr = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

let changed = 0;

for (const f of files) {
  const path = join(DIR, f);
  const original = readFileSync(path, 'utf8');
  const m = original.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) continue;
  const fm = m[1];
  const body = m[2];

  // Tokenize into top-level entries.
  const lines = fm.split('\n');
  const entries = []; // { key, valueLines: [] }
  let cur = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    const km = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (km && TOP_KEYS.has(km[1])) {
      if (cur) entries.push(cur);
      cur = { key: km[1], inline: km[2], rest: [] };
    } else if (cur) {
      cur.rest.push(line);
    }
  }
  if (cur) entries.push(cur);

  // Build a JS object representation.
  const data = {};
  for (const e of entries) {
    const { key, inline, rest } = e;
    if (rest.length === 0) {
      // Single-line scalar.
      data[key] = stripQuotes(inline);
      continue;
    }
    // Determine whether rest is a list (lines starting with `-`), a mapping, or a continuation.
    const firstNonEmpty = rest.find((l) => l.trim());
    if (firstNonEmpty && /^\s*-\s+/.test(firstNonEmpty)) {
      // List
      if (key === 'faqs' || key === 'reviews') {
        // list of mappings
        const items = [];
        let item = null;
        let lastKey = null;
        for (const l of rest) {
          if (!l.trim()) continue;
          const itemStart = l.match(/^\s*-\s*([A-Za-z_]+):\s*(.*)$/);
          const subKey = l.match(/^\s*([A-Za-z_]+):\s*(.*)$/);
          if (itemStart) {
            if (item) items.push(item);
            item = {};
            item[itemStart[1]] = stripQuotes(itemStart[2]);
            lastKey = itemStart[1];
          } else if (subKey && item && !subKey[1].startsWith('-')) {
            item[subKey[1]] = stripQuotes(subKey[2]);
            lastKey = subKey[1];
          } else if (item && lastKey) {
            // continuation of last value
            item[lastKey] = (item[lastKey] + ' ' + l.trim()).trim();
          }
        }
        if (item) items.push(item);
        data[key] = items;
      } else {
        // simple list of scalars
        const arr = [];
        for (const l of rest) {
          const itemMatch = l.match(/^\s*-\s+(.*)$/);
          if (itemMatch) arr.push(stripQuotes(itemMatch[1]));
        }
        data[key] = arr;
      }
    } else if (firstNonEmpty && /^\s*[A-Za-z_]+:/.test(firstNonEmpty)) {
      // Mapping (e.g., meta)
      const obj = {};
      let lastKey = null;
      for (const l of rest) {
        if (!l.trim()) continue;
        const subKey = l.match(/^\s*([A-Za-z_]+):\s*(.*)$/);
        if (subKey) {
          obj[subKey[1]] = stripQuotes(subKey[2]);
          lastKey = subKey[1];
        } else if (lastKey) {
          obj[lastKey] = (obj[lastKey] + ' ' + l.trim()).trim();
        }
      }
      data[key] = obj;
    } else {
      // continuation of inline scalar
      let value = inline;
      for (const l of rest) {
        value = (value + ' ' + l.trim()).trim();
      }
      data[key] = stripQuotes(value);
    }
  }

  // Re-emit in a stable order.
  const order = [
    'id','title','primary_keyword','search_volume','aliases','cas','molecular_weight',
    'purity','storage','sequence','package_sizes','moq','price','price_range',
    'short_description','category','researchArea','useCases','tags','images','meta','faqs','reviews',
  ];

  const out = [];
  for (const k of order) {
    if (!(k in data)) continue;
    const v = data[k];
    if (Array.isArray(v)) {
      if (v.length === 0) { out.push(`${k}: []`); continue; }
      if (k === 'faqs' || k === 'reviews') {
        out.push(`${k}:`);
        for (const it of v) {
          const keys = Object.keys(it);
          if (keys.length === 0) continue;
          out.push(`  - ${keys[0]}: ${yamlStr(it[keys[0]])}`);
          for (let i = 1; i < keys.length; i++) {
            out.push(`    ${keys[i]}: ${yamlStr(it[keys[i]])}`);
          }
        }
      } else {
        out.push(`${k}:`);
        for (const item of v) out.push(`  - ${yamlStr(item)}`);
      }
    } else if (typeof v === 'object' && v !== null) {
      out.push(`${k}:`);
      for (const sk of Object.keys(v)) {
        out.push(`  ${sk}: ${yamlStr(v[sk])}`);
      }
    } else {
      // Scalar — quote always for safety.
      if (v === '' || v === undefined || v === null) {
        out.push(`${k}: ""`);
      } else if (typeof v === 'number' || /^-?\d+(\.\d+)?$/.test(String(v))) {
        out.push(`${k}: ${v}`);
      } else {
        out.push(`${k}: ${yamlStr(v)}`);
      }
    }
  }

  const newFm = out.join('\n');
  const result = `---\n${newFm}\n---\n${body}`;
  if (result !== original) {
    writeFileSync(path, result, 'utf8');
    changed++;
  }
}
console.log(`Re-emitted ${changed} of ${files.length} files.`);
