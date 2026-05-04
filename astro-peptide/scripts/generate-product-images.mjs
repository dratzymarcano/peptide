#!/usr/bin/env node
/**
 * generate-product-images.mjs
 *
 * For every product in src/content/products/*.md:
 *  1. Build an SVG that matches the placeholder vial design,
 *     with the product name on top and the first package dosage below.
 *  2. Write the SVG to public/images/products/<slug>.svg.
 *  3. Rewrite the product's `images:` frontmatter list to point to that SVG.
 *
 * Idempotent: re-running regenerates SVGs and re-points the frontmatter.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import yaml from 'js-yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const PRODUCTS_DIR = join(ROOT, 'src/content/products');
const IMAGES_DIR = join(ROOT, 'public/images/products');

const FM_RE = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

/** Pull a short dosage string ("5 mg", "10 mL") out of a package_size line. */
function extractDosage(packageSize) {
  if (!packageSize) return 'PEPTIDE';
  const m = packageSize.match(/(\d+(?:\.\d+)?)\s*(mg|mcg|µg|ug|ml|g|iu)\b/i);
  if (!m) return packageSize.toUpperCase();
  const unit = m[2].toLowerCase() === 'ml' ? 'mL' : m[2].toLowerCase();
  return `${m[1]} ${unit}`;
}

/** Pick a short, label-friendly product name. */
function extractName(data, slug) {
  const raw = (data.primary_keyword || slug).toString();
  return raw.toUpperCase();
}

/**
 * Wrap the name onto up to two lines, splitting on hyphens or spaces
 * so long identifiers like GLU-FIBRINOPEPTIDE-B stay readable.
 */
function wrapName(name) {
  if (name.length <= 10) return [name];
  const tokens = name.split(/([- ])/); // keep separators
  const mid = Math.ceil(name.length / 2);
  let acc = '';
  let i = 0;
  for (; i < tokens.length; i++) {
    if (acc.length + tokens[i].length >= mid) break;
    acc += tokens[i];
  }
  let line1 = acc.replace(/[- ]$/, '') || tokens[0];
  let line2 = name.slice(line1.length).replace(/^[- ]/, '');
  if (!line2) return [name];
  return [line1, line2];
}

/** Auto-fit font size for a single line within ~190px of label width. */
function fitNameFontSize(line) {
  const len = line.length;
  if (len <= 5) return 56;
  if (len <= 7) return 48;
  if (len <= 9) return 40;
  if (len <= 11) return 34;
  if (len <= 13) return 30;
  if (len <= 16) return 26;
  return 22;
}

function buildSvg(name, dosage) {
  const lines = wrapName(name);
  const nameSize = Math.min(...lines.map(fitNameFontSize));
  const lineHeight = Math.round(nameSize * 1.05);
  const blockHeight = lineHeight * lines.length;
  const labelCx = 125; // label center x within the inner group
  const labelTop = 196;
  const labelHeight = 200;
  const nameTop = labelTop + (labelHeight - blockHeight - 56) / 2 + nameSize;
  const dosageY = nameTop + (lines.length - 1) * lineHeight + 50;
  const ruleY = dosageY + 22;

  const nameTspans = lines
    .map((line, idx) => `<tspan x="${labelCx}" dy="${idx === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="${escapeXml(name)} ${escapeXml(dosage)} research peptide vial">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <circle cx="400" cy="410" r="260" fill="#E6F1F8"/>
  <ellipse cx="400" cy="650" rx="170" ry="28" fill="#CBD5E1" opacity="0.65"/>
  <g transform="translate(275 130)">
    <rect x="70" y="0" width="110" height="58" rx="10" fill="#0F172A"/>
    <rect x="82" y="14" width="86" height="30" rx="6" fill="#334155"/>
    <path d="M68 58h114l27 480c2 38-28 70-66 70H107c-38 0-68-32-66-70L68 58Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="8"/>
    <path d="M67 294h116l15 244c2 31-22 58-54 58h-38c-32 0-56-27-54-58l15-244Z" fill="#D8EEF8"/>
    <rect x="-30" y="${labelTop}" width="310" height="${labelHeight}" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="6"/>
    <text x="${labelCx}" y="${nameTop}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${nameSize}" font-weight="800" fill="#005B8C">${nameTspans}</text>
    <text x="${labelCx}" y="${dosageY}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="36" font-weight="700" fill="#334155">${escapeXml(dosage)}</text>
    <line x1="40" y1="${ruleY}" x2="210" y2="${ruleY}" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round"/>
  </g>
</svg>
`;
}

function escapeXml(s) {
  return String(s).replace(/[<>&"']/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  }[c]));
}

const files = readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith('.md'));
let written = 0;
let updated = 0;

for (const file of files) {
  const slug = basename(file, '.md');
  const path = join(PRODUCTS_DIR, file);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(FM_RE);
  if (!m) {
    console.warn(`skip ${file}: no frontmatter`);
    continue;
  }
  const data = yaml.load(m[1]);
  const body = m[2];

  const name = extractName(data, slug);
  const dosage = extractDosage(data.package_sizes?.[0]);
  const svgPath = `/images/products/${slug}.svg`;

  const svg = buildSvg(name, dosage);
  writeFileSync(join(IMAGES_DIR, `${slug}.svg`), svg);
  written++;

  // Re-point `images:` to the new SVG (single entry).
  const prevImages = JSON.stringify(data.images ?? []);
  data.images = [svgPath];
  if (JSON.stringify(data.images) !== prevImages) updated++;

  const newFm = yaml.dump(data, { lineWidth: 1000, noRefs: true, quotingType: '"', forceQuotes: false });
  writeFileSync(path, `---\n${newFm}---\n${body}`);
}

console.log(`wrote ${written} svg files; updated ${updated} product .md frontmatter blocks`);
