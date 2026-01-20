import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const DIST_CLIENT = path.join(ROOT, 'dist', 'client');
const DIST_ROOT = path.join(ROOT, 'dist');

const isExternal = (url) => /^(https?:)?\/\//i.test(url) || /^mailto:/i.test(url) || /^tel:/i.test(url);
const stripQueryHash = (url) => url.replace(/[?#].*$/, '');
const normalizePath = (urlPath) => {
  const clean = stripQueryHash(urlPath);
  if (clean === '/') return '/';
  return clean.endsWith('/') ? clean.slice(0, -1) : clean;
};

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

function resolveToDistPath(distBase, urlPath) {
  const clean = stripQueryHash(urlPath);
  if (!clean.startsWith('/')) return null; // ignore relative for now

  // Assets with extensions are expected to exist as-is.
  const hasExt = /\.[a-z0-9]{1,8}$/i.test(clean);
  if (hasExt) {
    return path.join(distBase, clean);
  }

  // Route: /foo or /foo/ => dist/client/foo/index.html
  const routeDir = clean.endsWith('/') ? clean : `${clean}/`;
  return path.join(distBase, routeDir, 'index.html');
}

async function main() {
  let htmlCount = 0;
  const broken = [];

  let distBase = DIST_CLIENT;
  try {
    await fs.access(DIST_CLIENT);
  } catch {
    await fs.access(DIST_ROOT);
    distBase = DIST_ROOT;
  }

  let routeConfig = null;
  try {
    const routesRaw = await fs.readFile(path.join(distBase, '_routes.json'), 'utf8');
    routeConfig = JSON.parse(routesRaw);
  } catch {
    routeConfig = null;
  }

  const matchesRoutePattern = (pattern, urlPath) => {
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
    const re = new RegExp(`^${escaped}$`);
    return re.test(urlPath);
  };

  const isServerRoute = (urlPath) => {
    if (!routeConfig || !routeConfig.include) return false;
    const normalized = normalizePath(urlPath);
    const included = routeConfig.include.some((p) => matchesRoutePattern(p, normalized));
    if (!included) return false;
    if (!routeConfig.exclude) return true;
    const excluded = routeConfig.exclude.some((p) => matchesRoutePattern(p, normalized));
    return !excluded;
  };

  // Precompute all files for fast existence checks
  const allFiles = new Set();
  for await (const file of walk(distBase)) {
    allFiles.add(file);
  }

  for await (const file of walk(distBase)) {
    if (!file.endsWith('.html')) continue;
    htmlCount++;
    const html = await fs.readFile(file, 'utf8');
    const links = extractLinks(html);

    for (const href of links) {
      if (isExternal(href)) continue;
      const target = resolveToDistPath(distBase, href);
      if (!target) continue;
      if (!allFiles.has(target)) {
        if (isServerRoute(href)) continue;
        broken.push({ from: path.relative(distBase, file), to: href, expected: path.relative(distBase, target) });
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

  console.log(`OK: scanned ${htmlCount} HTML files, no broken internal links in ${path.relative(ROOT, distBase)}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
