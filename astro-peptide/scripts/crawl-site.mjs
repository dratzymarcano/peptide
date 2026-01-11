import { setTimeout as delay } from 'node:timers/promises';

const ORIGIN = process.env.ORIGIN || 'http://localhost:4321';
const MAX_PAGES = Number(process.env.MAX_PAGES || 2000);
const CONCURRENCY = Number(process.env.CONCURRENCY || 8);

const seedPaths = [
  '/',
  '/peptides/',
  '/blog/',
  '/about/',
  '/contact/',
  '/faq/',
  '/shop/',
  '/quality/',
  '/shipping/',
  '/terms/',
  '/privacy/',
  '/disclaimer/',
  '/coa-policy/',
  '/nl/',
  '/de/',
  '/fr/',
  '/es/',
  '/it/',
  // Known localized product slugs
  '/nl/peptides/bacteriostatic-water-kopen/',
  '/de/peptides/bacteriostatic-water-kaufen/',
  '/fr/peptides/acheter-de-l-eau-bacteriostatique/',
  '/es/peptides/agua-bacteriostatica-comprar/',
  '/it/peptides/acquisto-acqua-batteriostatica/',
];

const isExternal = (href) => /^(https?:)?\/\//i.test(href) || /^mailto:/i.test(href) || /^tel:/i.test(href);

function normalizeUrl(base, href) {
  try {
    const url = new URL(href, base);
    if (url.origin !== new URL(ORIGIN).origin) return null;
    url.hash = '';
    return url;
  } catch {
    return null;
  }
}

function extractHrefs(html, baseUrl) {
  const out = [];
  const re = /<a\s+[^>]*href=("|')([^"']+)(\1)[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[2].trim();
    if (!href || href === '#' || href.startsWith('javascript:') || isExternal(href)) continue;
    const url = normalizeUrl(baseUrl, href);
    if (!url) continue;
    // Skip obvious binary assets
    if (/\.(png|jpe?g|gif|webp|svg|pdf|zip|mp4|mp3|woff2?)$/i.test(url.pathname)) continue;
    out.push(url.pathname + url.search);
  }
  return out;
}

async function fetchPage(pathname) {
  const url = new URL(pathname, ORIGIN);
  const res = await fetch(url, { redirect: 'follow' });
  const ct = res.headers.get('content-type') || '';
  const body = ct.includes('text/html') ? await res.text() : '';
  return { url: url.toString(), status: res.status, contentType: ct, body };
}

async function main() {
  const queue = [];
  const seen = new Set();
  const failures = [];

  for (const p of seedPaths) {
    if (!seen.has(p)) {
      seen.add(p);
      queue.push(p);
    }
  }

  let inFlight = 0;
  let processed = 0;

  async function worker() {
    while (true) {
      const next = queue.shift();
      if (!next) return;
      if (processed >= MAX_PAGES) return;

      processed++;
      inFlight++;
      try {
        const { url, status, contentType, body } = await fetchPage(next);
        if (status >= 400) {
          failures.push({ path: next, status });
          continue;
        }

        if (contentType.includes('text/html') && body) {
          const links = extractHrefs(body, url);
          for (const l of links) {
            if (seen.has(l)) continue;
            seen.add(l);
            queue.push(l);
          }
        }
      } catch (e) {
        failures.push({ path: next, status: 'FETCH_ERROR' });
      } finally {
        inFlight--;
      }

      // tiny delay to be polite
      await delay(5);
    }
  }

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) workers.push(worker());
  await Promise.all(workers);

  if (failures.length) {
    failures.sort((a, b) => String(a.status).localeCompare(String(b.status)));
    console.error(`Broken links found: ${failures.length}`);
    for (const f of failures.slice(0, 80)) {
      console.error(`- ${f.status} ${f.path}`);
    }
    process.exit(1);
  }

  console.log(`OK: crawled ${seen.size} pages, no 4xx/5xx internal links found.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
