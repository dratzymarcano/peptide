#!/usr/bin/env node
// Apply competitive, very affordable per-single-vial pricing across the catalogue.
// Source-of-truth: PRICING below. For each slug we set:
//  - package_sizes[0] (re-emit single-element list)
//  - price (numeric)
//  - price_range "€NNN per vial"
// Also rewrites unit_price_eur in src/data/product-catalogue.json.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROD_DIR = join(__dirname, '..', 'src', 'content', 'products');
const CAT_PATH = join(__dirname, '..', 'src', 'data', 'product-catalogue.json');

// Map: slug -> { size: string, price: number, unit?: 'vial'|'pack'|'powder'|'caps' }
const PRICING = {
  // Mass-spec / research standards (already single vials)
  'angiotensin-i-ms-standard':       { size: '1 × 1 mg vial',  price: 30 },
  'angiotensin-ii':                  { size: '1 × 5 mg vial',  price: 40 },
  'anp-1-28':                        { size: '1 × 1 mg vial',  price: 60 },
  'aip-camkii-inhibitor':            { size: '1 × 1 mg vial',  price: 70 },
  'alpha-defensin-1':                { size: '1 × 0.5 mg vial', price: 95 },
  'acth-fragments-maldi-set':        { size: '2 × 0.5 mg vials (one of each fragment)', price: 115, unit: 'pack' },
  'bnp-32':                          { size: '1 × 0.5 mg vial', price: 70 },
  'bombesin':                        { size: '1 × 1 mg vial',  price: 55 },
  'bradykinin-1-7-ms-standard':      { size: '1 × 1 mg vial',  price: 25 },
  'bradykinin-acetate':              { size: '1 × 5 mg vial',  price: 30 },
  'bsa-tryptic-digest-standard':     { size: '1 × 100 µg lyophilised', price: 40 },
  'endothelin-1':                    { size: '1 × 0.5 mg vial', price: 70 },
  'gastrin-i-human':                 { size: '1 × 1 mg vial',  price: 55 },
  'glu-fibrinopeptide-b':            { size: '1 × 1 mg vial',  price: 40 },
  'll-37':                           { size: '1 × 1 mg vial',  price: 70 },
  'mia-602':                         { size: '1 × 2 mg vial',  price: 145 },
  'myristoylated-pki-14-22':         { size: '1 × 1 mg vial',  price: 60 },
  'octreotide-acetate':              { size: '1 × 2 mg vial',  price: 60 },
  'pki-6-22-amide':                  { size: '1 × 1 mg vial',  price: 55 },
  'pnc-27':                          { size: '1 × 5 mg vial',  price: 95 },
  'substance-p':                     { size: '1 × 5 mg vial',  price: 40 },
  'thymalin':                        { size: '1 × 10 mg vial', price: 40 },
  'thymosin-alpha-1':                { size: '1 × 5 mg vial',  price: 55 },
  'thymulin':                        { size: '1 × 1 mg vial',  price: 70 },
  'tuftsin':                         { size: '1 × 5 mg vial',  price: 30 },

  // Therapeutic-class research peptides (converted from 10-vial kit to single vial)
  'aod-9604':                        { size: '1 × 5 mg vial',  price: 25 },
  'bpc-157':                         { size: '1 × 5 mg vial',  price: 22 },
  'cagrilintide':                    { size: '1 × 5 mg vial',  price: 55 },
  'cjc-1295-no-dac':                 { size: '1 × 5 mg vial',  price: 18 },
  'dsip':                            { size: '1 × 5 mg vial',  price: 15 },
  'epitalon':                        { size: '1 × 10 mg vial', price: 15 },
  'gh-frag-176-191':                 { size: '1 × 5 mg vial',  price: 22 },
  'ghrp-2':                          { size: '1 × 5 mg vial',  price: 15 },
  'ghrp-6':                          { size: '1 × 5 mg vial',  price: 15 },
  'ipamorelin':                      { size: '1 × 5 mg vial',  price: 18 },
  'melanotan-2':                     { size: '1 × 10 mg vial', price: 15 },
  'nad-plus':                        { size: '1 × 500 mg vial', price: 55 },
  'retatrutide':                     { size: '1 × 5 mg vial',  price: 145 },
  'selank':                          { size: '1 × 5 mg vial',  price: 18 },
  'semaglutide':                     { size: '1 × 5 mg vial',  price: 45 },
  'semax':                           { size: '1 × 5 mg vial',  price: 18 },
  'tb-500':                          { size: '1 × 5 mg vial',  price: 25 },
  'tirzepatide':                     { size: '1 × 10 mg vial', price: 95 },

  // Capsules / powders / accessories (kept in their natural pack)
  '5-amino-1mq':                     { size: '60 × 50 mg caps', price: 65,  unit: 'pack' },
  'tesofensine':                     { size: '60 × 0.5 mg caps', price: 55, unit: 'pack' },
  'o-304':                           { size: '3 g powder',     price: 95, unit: 'pack' },
  'ghk-cu':                          { size: '500 mg powder',  price: 75, unit: 'pack' },
  'bacteriostatic-water':            { size: '10 × 10 mL vials', price: 18, unit: 'pack' },
};

const yamlStr = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

const files = readdirSync(PROD_DIR).filter((f) => f.endsWith('.md'));
let mdChanged = 0;
let missingSlugs = [];

for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const cfg = PRICING[slug];
  if (!cfg) { missingSlugs.push(slug); continue; }

  const path = join(PROD_DIR, f);
  const original = readFileSync(path, 'utf8');
  const m = original.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) continue;
  const fm = m[1];
  const body = m[2];

  // Replace package_sizes block (single item).
  let newFm = fm.replace(
    /^package_sizes:\n(?:  - .+\n?)+/m,
    `package_sizes:\n  - ${yamlStr(cfg.size)}\n`,
  );
  // Replace price line.
  newFm = newFm.replace(/^price:\s*[\d.]+\s*$/m, `price: ${cfg.price}`);
  // Replace price_range line.
  const unit = cfg.unit === 'pack' ? 'per pack' : 'per vial';
  newFm = newFm.replace(/^price_range:\s*"[^"]*"\s*$/m, `price_range: ${yamlStr('€' + cfg.price + ' ' + unit)}`);

  // Also patch the "| Package size | <old> |" body table row.
  let newBody = body.replace(/(\| Package size \| )[^|]+(\|)/i, `$1${cfg.size} $2`);

  const out = `---\n${newFm}\n---\n${newBody}`;
  if (out !== original) {
    writeFileSync(path, out, 'utf8');
    mdChanged++;
  }
}

// Update product catalogue JSON unit_price_eur entries (match by slug-like id).
const catalogue = JSON.parse(readFileSync(CAT_PATH, 'utf8'));
let catChanged = 0;
const products = Array.isArray(catalogue) ? catalogue : (catalogue.products ?? []);
for (const item of products) {
  const slug = item.slug || item.id;
  if (!slug) continue;
  const key = slug.replace(/^peptide-/, '').replace(/^.*\//, '');
  const cfg = PRICING[key];
  if (!cfg) continue;
  if (item.unit_price_eur !== cfg.price) {
    item.unit_price_eur = cfg.price;
    catChanged++;
  }
}
writeFileSync(CAT_PATH, JSON.stringify(catalogue, null, 2) + '\n', 'utf8');

console.log(`Updated ${mdChanged} of ${files.length} MD files.`);
console.log(`Updated ${catChanged} catalogue entries.`);
if (missingSlugs.length) {
  console.log('Missing PRICING entries for:', missingSlugs.join(', '));
}
