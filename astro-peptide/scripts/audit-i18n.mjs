import { setTimeout as delay } from 'node:timers/promises';

const ORIGIN = process.env.ORIGIN || 'http://localhost:4321';
const MAX_PAGES = Number(process.env.MAX_PAGES || 2000);
const CONCURRENCY = Number(process.env.CONCURRENCY || 6);

const seedPaths = [
  '/',
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
  '/peptides/',
  '/nl/',
  '/de/',
  '/fr/',
  '/es/',
  '/it/',
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
    if (/\.(png|jpe?g|gif|webp|svg|pdf|zip|mp4|mp3|woff2?)$/i.test(url.pathname)) continue;
    out.push(url.pathname + url.search);
  }
  return out;
}

function getLangFromPath(pathname) {
  const m = pathname.match(/^\/(nl|de|fr|es|it)(?:\/|$)/);
  return m?.[1] ?? 'en';
}

function stripHtmlToText(html) {
  // Remove scripts/styles
  let out = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');

  // Remove tags
  out = out.replace(/<[^>]+>/g, ' ');

  // Decode a few common entities
  out = out
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  return out.replace(/\s+/g, ' ').trim();
}

// High-confidence English UI phrases that should not appear on localized pages.
// (This is intentionally conservative; it’s a detector, not a translator.)
const englishLeakPhrases = [
  'Skip to main content',
  'General Information',
  'Quality & Testing',
  'Ordering & Payment',
  'Shipping & Delivery',
  'International & Customs',
  'Storage & Handling',
  'Returns & Refunds',
  'What are peptides?',
  'Are your products safe for human consumption?',
  'How can I contact customer support?',
  'Do you offer wholesale pricing?',
  'Terms and Conditions',
  'Privacy Policy',
  'Research Use Only',
  'Last updated',
  'Contact Us',
  'Submit Application',
];

async function fetchPage(pathname) {
  const url = new URL(pathname, ORIGIN);
  const res = await fetch(url, { redirect: 'follow' });
  const ct = res.headers.get('content-type') || '';
  const body = ct.includes('text/html') ? await res.text() : '';
  return { url: url.toString(), status: res.status, contentType: ct, body };
}

function detectLeaks({ pathname, body }) {
  const lang = getLangFromPath(pathname);
  if (lang === 'en') return [];

  const text = stripHtmlToText(body);
  const found = [];

  for (const phrase of englishLeakPhrases) {
    if (text.includes(phrase)) found.push(phrase);
  }

  return found;
}

async function main() {
  const queue = [];
  const seen = new Set();
  const failures = [];
  const leaks = [];

  for (const p of seedPaths) {
    if (!seen.has(p)) {
      seen.add(p);
      queue.push(p);
    }
  }

  let processed = 0;

  async function worker() {
    while (true) {
      const next = queue.shift();
      if (!next) return;
      if (processed >= MAX_PAGES) return;

      processed++;
      try {
        const { url, status, contentType, body } = await fetchPage(next);
        if (status >= 400) {
          failures.push({ path: next, status });
          continue;
        }

        if (contentType.includes('text/html') && body) {
          const found = detectLeaks({ pathname: next, body });
          if (found.length) {
            leaks.push({ path: next, lang: getLangFromPath(next), phrases: found.slice(0, 8) });
          }

          const links = extractHrefs(body, url);
          for (const l of links) {
            if (seen.has(l)) continue;
            seen.add(l);
            queue.push(l);
          }
        }
      } catch {
        failures.push({ path: next, status: 'FETCH_ERROR' });
      }

      await delay(5);
    }
  }

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) workers.push(worker());
  await Promise.all(workers);

  if (failures.length) {
    failures.sort((a, b) => String(a.status).localeCompare(String(b.status)));
    console.error(`Fetch failures: ${failures.length}`);
    for (const f of failures.slice(0, 80)) {
      console.error(`- ${f.status} ${f.path}`);
    }
  }

  if (leaks.length) {
    leaks.sort((a, b) => a.path.localeCompare(b.path));
    console.error(`\nPotential English leaks on localized routes: ${leaks.length}`);
    for (const l of leaks.slice(0, 120)) {
      console.error(`- [${l.lang}] ${l.path}: ${l.phrases.join(' | ')}`);
    }
    process.exit(1);
  }

  console.log(`OK: crawled ${seen.size} pages; no English leak phrases found on localized routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
