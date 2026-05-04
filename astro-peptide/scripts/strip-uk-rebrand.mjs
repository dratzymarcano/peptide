#!/usr/bin/env node
// Sweep product MDs:
//  - Strip UK suffixes and rebrand £ → € in price_range
//  - Remove "*-uk" tags
//  - Remove " UK" / "UK dispatch" / "UK lab dispatch" phrases from titles, descriptions and meta
//  - Drop trailing ", RUO, UK dispatch." style fragments
//  - Normalize price_range to "€<n> per vial" when a numeric `price:` exists
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
  let s = original;

  // 1. Frontmatter primary_keyword: strip trailing " uk"
  s = s.replace(/^(primary_keyword:\s*[^\n]*?)\s+uk\s*$/m, '$1');

  // 2. Title field: strip trailing " — UK", " UK", " | ... UK"
  s = s.replace(/^(title:\s*"?[^"\n]*?)\s*[—-]\s*UK("?)\s*$/m, '$1$2');
  s = s.replace(/^(title:\s*"?[^"\n]*?)\s+UK("?)\s*$/m, '$1$2');

  // 3. Tag list: drop any "  - <slug>-uk" entries
  s = s.replace(/^\s+-\s+[a-z0-9][\w-]*-uk\s*$\n?/gim, '');

  // 4. price_range conversion to EUR.
  //    Case A: already-quoted "£NNN GBP" → "€NNN per vial"
  s = s.replace(/^(price_range:\s*)"£(\d+(?:\.\d+)?)\s*GBP"\s*$/m, '$1"€$2 per vial"');
  //    Case B: unquoted "£NNN per pack/month/bottle/unit" → "€NNN per vial"
  s = s.replace(/^(price_range:\s*)£(\d+(?:\.\d+)?)\s*per\s+\w+\s*$/m, '$1"€$2 per vial"');

  // 5. Strip "UK dispatch", "UK lab dispatch", "fast UK" phrases
  s = s.replace(/,?\s*and\s+UK\s+lab\s+dispatch/gi, '');
  s = s.replace(/,?\s*and\s+UK\s+dispatch(?:\s+within\s+\d+\s*h)?/gi, '');
  s = s.replace(/,?\s*UK\s+lab\s+dispatch\s+and\s+research-use\s+labelling/gi, ', research-use labelling');
  s = s.replace(/,?\s*UK\s+lab\s+dispatch/gi, '');
  s = s.replace(/,?\s*UK\s+dispatch/gi, '');
  s = s.replace(/\bfast\s+UK\s+delivery\b/gi, 'fast delivery within the EU');
  s = s.replace(/\bWe primarily offer fast delivery within the EU/g, 'We offer fast delivery within the EU');
  // tidy any leftover " RUO, ." or "RUO, ." artefacts
  s = s.replace(/RUO,\s*\./g, 'RUO.');
  s = s.replace(/,\s*\./g, '.');
  s = s.replace(/  +/g, ' ');

  // 6. £NNN inside body text (e.g. minimum-purchase FAQs) → €NNN
  s = s.replace(/£(\d+)/g, '€$1');

  // 7. Replace "minimum purchase of €200" line patterns to align with new €150 floor
  s = s.replace(/A minimum purchase of €\d+ is required for [^.]+\./g,
    'A site-wide minimum order value of €150 applies; combine multiple items to reach the threshold.');

  if (s !== original) {
    writeFileSync(path, s, 'utf8');
    changed++;
  }
}
console.log(`Updated ${changed} of ${files.length} product files.`);
