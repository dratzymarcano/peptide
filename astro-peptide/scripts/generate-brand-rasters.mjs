#!/usr/bin/env node
/**
 * Renders the raster brand assets that SVG cannot serve.
 *
 * Two consumers need bitmaps and were being handed vectors:
 *
 *  - `og:image` / `twitter:image`. Facebook, LinkedIn, X, WhatsApp, Slack and
 *    iMessage all refuse SVG. The site's default share card was
 *    `/brand/peptide-shop-logo.svg`, so every page without its own photo — the
 *    homepage, /shop, /quality, every legal page — shared as a blank rectangle.
 *  - Organization `logo` in JSON-LD. Google's logo structured-data feature
 *    accepts the crawlable raster formats only, so the SVG was silently
 *    ineligible.
 *
 * Output is committed to public/brand/ so the build and the CDN stay simple.
 * Re-run with `npm run brand:rasters` after changing the mark or palette.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { BRAND_NAME } from '../site.config.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const brandDir = join(root, 'public', 'brand');
mkdirSync(brandDir, { recursive: true });

const INK = '#0F172A';
const PRIMARY = '#0077B6';
const ACCENT = '#059669';
const MIST = '#F8FAFC';

const markPng = readFileSync(join(brandDir, 'logo-mark.png'));
const markB64 = markPng.toString('base64');

/** The peptide logo mark at an arbitrary offset and size */
const mark = (x, y, size) => `
  <image href="data:image/png;base64,${markB64}" x="${x}" y="${y}" width="${size}" height="${size}"/>
`;

const FONT = "Inter, 'Inter Variable', 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif";

// --- 1200×630 default share card -------------------------------------------
const ogCard = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#08101D"/>
      <stop offset="55%" stop-color="#0E223D"/>
      <stop offset="100%" stop-color="#08101D"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="240" fill="${PRIMARY}" opacity="0.16"/>
  <circle cx="1130" cy="520" r="180" fill="${ACCENT}" opacity="0.13"/>
  ${mark(80, 58, 64)}
  <text x="160" y="104" font-family="${FONT}" font-size="36" font-weight="800" letter-spacing="-0.5" fill="#ffffff">${BRAND_NAME}</text>
  <text x="80" y="268" font-family="${FONT}" font-size="76" font-weight="800" letter-spacing="-2.4" fill="#ffffff">Research peptides,</text>
  <text x="80" y="352" font-family="${FONT}" font-size="76" font-weight="800" letter-spacing="-2.4" fill="#66C2F7">documented per lot.</text>
  <text x="80" y="424" font-family="${FONT}" font-size="27" font-weight="500" fill="#B9C6DA">HPLC-verified purity · a certificate of analysis with every order</text>
  <rect x="80" y="486" width="1040" height="1" fill="#ffffff" opacity="0.18"/>
  <text x="80" y="548" font-family="${FONT}" font-size="27" font-weight="700" fill="#ffffff">≥98% HPLC</text>
  <text x="310" y="548" font-family="${FONT}" font-size="27" font-weight="700" fill="#ffffff">COA in 6 languages</text>
  <text x="660" y="548" font-family="${FONT}" font-size="27" font-weight="700" fill="#ffffff">EU dispatch</text>
  <text x="900" y="548" font-family="${FONT}" font-size="27" font-weight="700" fill="#ffffff">14-day returns</text>
  <text x="80" y="586" font-family="${FONT}" font-size="21" font-weight="500" fill="#8FA1BC">Sold for in-vitro laboratory research only (RUO).</text>
</svg>`;

// --- raster wordmark for Organization logo ----------------------------------
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="148" viewBox="0 0 620 148">
  <rect width="620" height="148" fill="${MIST}"/>
  ${mark(24, 20, 108)}
  <text x="156" y="92" font-family="${FONT}" font-size="56" font-weight="800" letter-spacing="-1.2">
    <tspan fill="${INK}">PEPTIDE</tspan><tspan dx="16" fill="${PRIMARY}">SHOP</tspan>
  </text>
</svg>`;

// Rendered at 2× then downsampled: librsvg rasterises text with no hinting at
// 1× and the 21px legal line came out furry.
const targets = [
  { name: 'og-default.jpg', svg: ogCard, width: 1200, height: 630, encode: (p) => p.jpeg({ quality: 88, chromaSubsampling: '4:4:4' }) },
  { name: 'peptide-shop-logo.png', svg: logo, width: 600, height: 148, encode: (p) => p.png({ compressionLevel: 9 }) },
];

for (const { name, svg, width: w, height: h, encode } of targets) {
  const buffer = await encode(
    sharp(Buffer.from(svg), { density: 144 }).resize(w, h, { fit: 'fill' })
  ).toBuffer();
  writeFileSync(join(brandDir, name), buffer);
  const { width, height } = await sharp(buffer).metadata();
  console.log(`brand raster: ${name} — ${width}×${height}, ${(buffer.length / 1024).toFixed(1)} kB`);
}
