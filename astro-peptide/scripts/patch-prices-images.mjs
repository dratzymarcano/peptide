#!/usr/bin/env node
// Patch the 25 newly seeded products: add price (GBP), tightened price_range,
// and category-specific image. Idempotent: edits frontmatter blocks in-place.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '..', 'src', 'content', 'products');

// Per-product GBP price for the supplied package size and category image.
const updates = {
  // Cardiovascular
  'anp-1-28':              { price: 165, image: '/images/products/category-cardiovascular.svg' },
  'bnp-32':                { price: 185, image: '/images/products/category-cardiovascular.svg' },
  'angiotensin-ii':        { price:  75, image: '/images/products/category-cardiovascular.svg' },
  'endothelin-1':          { price: 195, image: '/images/products/category-cardiovascular.svg' },
  'bradykinin-acetate':    { price:  65, image: '/images/products/category-cardiovascular.svg' },
  // Cancer & Apoptosis
  'thymalin':              { price:  95, image: '/images/products/category-cancer-apoptosis.svg' },
  'pnc-27':                { price: 245, image: '/images/products/category-cancer-apoptosis.svg' },
  'mia-602':               { price: 385, image: '/images/products/category-cancer-apoptosis.svg' },
  'bombesin':              { price: 135, image: '/images/products/category-cancer-apoptosis.svg' },
  'octreotide-acetate':    { price: 165, image: '/images/products/category-cancer-apoptosis.svg' },
  // Immunology
  'll-37':                 { price: 185, image: '/images/products/category-immunology.svg' },
  'thymosin-alpha-1':      { price: 125, image: '/images/products/category-immunology.svg' },
  'thymulin':              { price: 175, image: '/images/products/category-immunology.svg' },
  'alpha-defensin-1':      { price: 245, image: '/images/products/category-immunology.svg' },
  'tuftsin':               { price:  55, image: '/images/products/category-immunology.svg' },
  // Cell Signaling
  'pki-6-22-amide':        { price: 135, image: '/images/products/category-cell-signaling.svg' },
  'myristoylated-pki-14-22': { price: 155, image: '/images/products/category-cell-signaling.svg' },
  'aip-camkii-inhibitor':  { price: 175, image: '/images/products/category-cell-signaling.svg' },
  'substance-p':           { price:  75, image: '/images/products/category-cell-signaling.svg' },
  'gastrin-i-human':       { price: 145, image: '/images/products/category-cell-signaling.svg' },
  // Protein Analysis
  'bsa-tryptic-digest-standard': { price:  85, image: '/images/products/category-protein-analysis.svg' },
  'angiotensin-i-ms-standard':   { price:  55, image: '/images/products/category-protein-analysis.svg' },
  'glu-fibrinopeptide-b':        { price:  95, image: '/images/products/category-protein-analysis.svg' },
  'acth-fragments-maldi-set':    { price: 165, image: '/images/products/category-protein-analysis.svg' },
  'bradykinin-1-7-ms-standard':  { price:  65, image: '/images/products/category-protein-analysis.svg' },
};

let patched = 0, missing = 0;
for (const [slug, { price, image }] of Object.entries(updates)) {
  const path = join(DIR, `${slug}.md`);
  if (!existsSync(path)) { missing++; console.warn(`MISSING: ${slug}`); continue; }
  let src = readFileSync(path, 'utf8');

  // 1. Replace price_range line with quoted GBP string + insert price line above.
  //    Match: price_range: "Contact for pricing"
  const priceRangeLine = /^price_range:\s*".*?"\s*$/m;
  const newPriceBlock = `price: ${price}\nprice_range: "£${price} GBP"`;
  if (priceRangeLine.test(src)) {
    src = src.replace(priceRangeLine, newPriceBlock);
  } else {
    console.warn(`NO price_range line in ${slug}, skipping price patch`);
  }

  // 2. Replace placeholder image path
  src = src.replace(
    /^(\s+- )\/images\/products\/research-vial\.svg\s*$/m,
    `$1${image}`
  );
  // Also patch the inline images: array form just in case
  src = src.replace(
    /(images:\s*\n\s+- )\/images\/products\/research-vial\.svg/,
    `$1${image}`
  );

  writeFileSync(path, src, 'utf8');
  patched++;
}

console.log(`Patched ${patched} files; missing ${missing}.`);
