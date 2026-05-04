#!/usr/bin/env node
// Repair faqs YAML indentation in product MDs after a previous pass mangled it.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '..', 'src', 'content', 'products');

const files = readdirSync(DIR).filter((f) => f.endsWith('.md'));
let changed = 0;

for (const f of files) {
  const path = join(DIR, f);
  const original = readFileSync(path, 'utf8');
  const m = original.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) continue;
  let frontmatter = m[1];
  const body = m[2];

  const lines = frontmatter.split('\n');
  // Find faqs: block start and end (top-level keys at col 0 terminate it).
  let faqsStart = -1;
  let faqsEnd = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (/^faqs:\s*$/.test(lines[i])) { faqsStart = i; }
    else if (faqsStart !== -1 && /^[A-Za-z_]/.test(lines[i])) { faqsEnd = i; break; }
  }
  if (faqsStart === -1) continue;

  const block = lines.slice(faqsStart + 1, faqsEnd);
  // Reconstruct items: walk lines, group into Q/A pairs.
  const items = [];
  let cur = null;
  let mode = null; // 'q' | 'a'
  for (const raw of block) {
    if (!raw.trim()) continue;
    const qm = raw.match(/^\s*-\s*question:\s*(.*)$/);
    const am = raw.match(/^\s*answer:\s*(.*)$/);
    if (qm) {
      if (cur) items.push(cur);
      cur = { question: qm[1].trim().replace(/^"(.*)"$/, '$1'), answer: '' };
      mode = 'q';
    } else if (am) {
      if (!cur) { cur = { question: '', answer: '' }; }
      cur.answer = am[1].trim().replace(/^"(.*)"$/, '$1');
      mode = 'a';
    } else {
      // continuation
      const text = raw.trim();
      if (mode === 'a' && cur) {
        cur.answer = (cur.answer + ' ' + text).trim().replace(/^"(.*)"$/, '$1').replace(/"$/, '');
      } else if (mode === 'q' && cur) {
        cur.question = (cur.question + ' ' + text).trim();
      }
    }
  }
  if (cur) items.push(cur);

  // Strip stray surrounding quotes from concatenation and remove trailing escaped quotes.
  for (const it of items) {
    it.question = it.question.replace(/^"+|"+$/g, '').trim();
    it.answer = it.answer.replace(/^"+|"+$/g, '').trim();
  }

  // Re-emit faqs block using JSON-safe quoting (double-quoted YAML scalar).
  const yamlEscape = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  const newFaqs = ['faqs:'];
  for (const it of items) {
    newFaqs.push(`  - question: ${yamlEscape(it.question)}`);
    newFaqs.push(`    answer: ${yamlEscape(it.answer)}`);
  }

  const newLines = [
    ...lines.slice(0, faqsStart),
    ...newFaqs,
    ...lines.slice(faqsEnd),
  ];

  const newFrontmatter = newLines.join('\n');
  const out = `---\n${newFrontmatter}\n---\n${body}`;
  if (out !== original) {
    writeFileSync(path, out, 'utf8');
    changed++;
  }
}
console.log(`Repaired ${changed} of ${files.length} files.`);
