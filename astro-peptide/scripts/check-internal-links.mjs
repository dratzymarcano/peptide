import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const DIST_CLIENT = path.join(ROOT, 'dist', 'client');

const isExternal = (url) => /^(https?:)?\/\//i.test(url) || /^mailto:/i.test(url) || /^tel:/i.test(url);
const stripQueryHash = (url) => url.replace(/[?#].*$/, '');

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(full);
    else if (ent.isFile()) yield full;
  }
}

function extractLinks(html) {
  const links = new Set();
  const attrRe = /\b(?:href|src)=("|')([^"']+)(\1)/gi;
  let m;
  while ((m = attrRe.exec(html))) {
    const raw = m[2].trim();
    if (!raw || raw === '#' || raw.startsWith('javascript:')) continue;
    links.add(raw);
  }
  return [...links];
}

function resolveToDistPath(urlPath) {
  const clean = stripQueryHash(urlPath);
  if (!clean.startsWith('/')) return null; // ignore relative for now

  // Assets with extensions are expected to exist as-is.
  const hasExt = /\.[a-z0-9]{1,8}$/i.test(clean);
  if (hasExt) {
    return path.join(DIST_CLIENT, clean);
  }

  // Route: /foo or /foo/ => dist/client/foo/index.html
  const routeDir = clean.endsWith('/') ? clean : `${clean}/`;
  return path.join(DIST_CLIENT, routeDir, 'index.html');
}

async function main() {
  let htmlCount = 0;
  const broken = [];

  // Precompute all files for fast existence checks
  const allFiles = new Set();
  for await (const file of walk(DIST_CLIENT)) {
    allFiles.add(file);
  }

  for await (const file of walk(DIST_CLIENT)) {
    if (!file.endsWith('.html')) continue;
    htmlCount++;
    const html = await fs.readFile(file, 'utf8');
    const links = extractLinks(html);

    for (const href of links) {
      if (isExternal(href)) continue;
      const target = resolveToDistPath(href);
      if (!target) continue;
      if (!allFiles.has(target)) {
        broken.push({ from: path.relative(DIST_CLIENT, file), to: href, expected: path.relative(DIST_CLIENT, target) });
      }
    }
  }

  if (broken.length) {
    const max = 80;
    console.error(`Broken internal links: ${broken.length} (showing up to ${max})`);
    for (const b of broken.slice(0, max)) {
      console.error(`- from: ${b.from} -> to: ${b.to} (expected: ${b.expected})`);
    }
    process.exit(1);
  }

  console.log(`OK: scanned ${htmlCount} HTML files, no broken internal links in dist/client.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
