#!/usr/bin/env node
/**
 * UI audit harness.
 *
 * Walks every page type at desktop and mobile and reports, per page:
 *   - axe-core accessibility violations (WCAG 2.1 A/AA)
 *   - layout faults: horizontal overflow, elements escaping the viewport,
 *     tap targets below 24px, images without intrinsic dimensions
 *   - Core Web Vitals: LCP and CLS, plus the LCP element
 *
 * Usage: node scripts/ui-audit.mjs [baseUrl] [--json out.json]
 */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const base = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:4400';
const jsonFlag = process.argv.indexOf('--json');
const jsonOut = jsonFlag > -1 ? process.argv[jsonFlag + 1] : null;

const PAGES = [
  ['home', '/'],
  ['shop', '/shop/'],
  ['product', '/peptides/ipamorelin/'],
  ['catalog', '/catalog/'],
  ['catalog-area', '/catalog/hormones/'],
  ['use-case', '/use-case/weight-loss/'],
  ['cart', '/cart/'],
  ['checkout', '/checkout/'],
  ['blog', '/blog/'],
  ['blog-post', '/blog/peptide-storage-handling-best-practices/'],
  ['learn', '/learn/'],
  ['quality', '/quality/'],
  ['about', '/about/'],
  ['contact', '/contact/'],
  ['faq', '/faq/'],
  ['bundles', '/bundles/'],
  ['search', '/search/'],
  ['impressum', '/impressum/'],
  ['404', '/this-page-does-not-exist/'],
  ['de-home', '/de/'],
  ['fr-product', '/fr/peptides/ipamorelin/'],
];

const VIEWPORTS = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
];

/** Layout faults measured in the page. */
async function layoutAudit(page) {
  return page.evaluate(() => {
    const out = { overflow: null, escaping: [], smallTargets: [], imagesNoDims: [], overlaps: [] };
    const de = document.documentElement;
    if (de.scrollWidth > de.clientWidth + 1) {
      out.overflow = { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth };
    }

    const describe = (el) => {
      const id = el.id ? `#${el.id}` : '';
      const cls = typeof el.className === 'string' && el.className
        ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
        : '';
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    };

    const vw = de.clientWidth;
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;

      // Content pushed outside the viewport horizontally.
      if (r.right > vw + 1 && cs.position !== 'fixed') {
        out.escaping.push({ el: describe(el), right: Math.round(r.right), vw });
      }

      // Interactive targets smaller than the WCAG 2.2 minimum.
      const interactive = el.matches('a[href], button, input:not([type=hidden]), select, textarea, [role=button]');
      if (interactive && (r.width < 24 || r.height < 24)) {
        out.smallTargets.push({ el: describe(el), w: Math.round(r.width), h: Math.round(r.height) });
      }

      // Images without intrinsic size reserve no space -> layout shift.
      if (el.tagName === 'IMG') {
        const hasDims = el.hasAttribute('width') && el.hasAttribute('height');
        const hasAspect = cs.aspectRatio && cs.aspectRatio !== 'auto';
        if (!hasDims && !hasAspect) out.imagesNoDims.push(describe(el));
      }
    }
    // Cap noise
    out.escaping = out.escaping.slice(0, 10);
    out.smallTargets = out.smallTargets.slice(0, 10);
    out.imagesNoDims = out.imagesNoDims.slice(0, 10);
    return out;
  });
}

/** LCP + CLS observed during load. */
async function vitals(page) {
  return page.evaluate(() => new Promise((resolve) => {
    const result = { lcp: null, lcpElement: null, cls: 0, shifts: [] };
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          result.lcp = Math.round(last.startTime);
          const el = last.element;
          result.lcpElement = el
            ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/)[0] : ''}`
            : null;
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.hadRecentInput) continue;
          result.cls += entry.value;
          if (entry.value > 0.01) {
            const sources = (entry.sources || []).map((s) => s.node
              ? `${s.node.tagName?.toLowerCase()}${typeof s.node.className === 'string' && s.node.className ? '.' + s.node.className.trim().split(/\s+/)[0] : ''}`
              : '?');
            result.shifts.push({ value: Number(entry.value.toFixed(4)), sources: sources.slice(0, 3) });
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch { /* unsupported */ }

    setTimeout(() => {
      result.cls = Number(result.cls.toFixed(4));
      resolve(result);
    }, 2500);
  }));
}

const browser = await chromium.launch();
const report = [];
let totalViolations = 0;
let totalLayout = 0;

for (const [vpName, viewport] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript(() => localStorage.setItem('peptide-age-verified', 'true'));

  for (const [name, path] of PAGES) {
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160)); });
    page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + String(e).slice(0, 160)));

    let status = 0;
    try {
      const res = await page.goto(base + path, { waitUntil: 'networkidle', timeout: 60000 });
      status = res?.status() ?? 0;
      await page.waitForTimeout(600);
    } catch (error) {
      report.push({ page: name, viewport: vpName, error: String(error).slice(0, 200) });
      await page.close();
      continue;
    }

    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const violations = axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      count: v.nodes.length,
      help: v.help,
      sample: v.nodes[0]?.target?.join(' ') ?? '',
      snippet: (v.nodes[0]?.html ?? '').slice(0, 120),
    }));

    const layout = await layoutAudit(page);
    const cwv = vpName === 'desktop' ? await vitals(page) : null;

    totalViolations += violations.reduce((s, v) => s + v.count, 0);
    totalLayout += (layout.overflow ? 1 : 0) + layout.escaping.length + layout.smallTargets.length + layout.imagesNoDims.length;

    report.push({ page: name, path, viewport: vpName, status, violations, layout, cwv, consoleErrors: consoleErrors.slice(0, 5) });
    await page.close();
  }
  await ctx.close();
}
await browser.close();

// ---- Report ----
const byRule = new Map();
for (const entry of report) {
  for (const v of entry.violations ?? []) {
    const key = `${v.id} (${v.impact})`;
    if (!byRule.has(key)) byRule.set(key, { count: 0, pages: new Set(), help: v.help, sample: v.sample, snippet: v.snippet });
    const rec = byRule.get(key);
    rec.count += v.count;
    rec.pages.add(`${entry.page}/${entry.viewport}`);
  }
}

console.log(`\n=== ACCESSIBILITY (${totalViolations} violations) ===`);
for (const [rule, rec] of [...byRule.entries()].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`\n${rule} — ${rec.count} nodes on ${rec.pages.size} page/viewport combos`);
  console.log(`  ${rec.help}`);
  console.log(`  e.g. ${rec.sample}`);
  console.log(`  ${rec.snippet}`);
  console.log(`  pages: ${[...rec.pages].slice(0, 6).join(', ')}${rec.pages.size > 6 ? ' …' : ''}`);
}

console.log(`\n=== LAYOUT (${totalLayout} findings) ===`);
for (const e of report) {
  const l = e.layout;
  if (!l) continue;
  const bits = [];
  if (l.overflow) bits.push(`H-OVERFLOW ${l.overflow.scrollWidth}>${l.overflow.clientWidth}`);
  if (l.escaping.length) bits.push(`escaping: ${l.escaping.map((x) => x.el).join(', ')}`);
  if (l.smallTargets.length) bits.push(`small targets: ${l.smallTargets.map((x) => `${x.el} ${x.w}x${x.h}`).join(', ')}`);
  if (l.imagesNoDims.length) bits.push(`img no dims: ${l.imagesNoDims.join(', ')}`);
  if (bits.length) console.log(`${e.page}/${e.viewport}: ${bits.join(' | ')}`);
}

console.log(`\n=== CORE WEB VITALS (desktop) ===`);
for (const e of report.filter((r) => r.cwv)) {
  const { lcp, lcpElement, cls, shifts } = e.cwv;
  const clsFlag = cls > 0.1 ? '  ❌ CLS' : cls > 0.05 ? '  ⚠ CLS' : '';
  const lcpFlag = lcp > 2500 ? '  ❌ LCP' : lcp > 1500 ? '  ⚠ LCP' : '';
  console.log(`${e.page.padEnd(14)} LCP ${String(lcp).padStart(5)}ms (${lcpElement ?? '?'})  CLS ${cls}${clsFlag}${lcpFlag}`);
  for (const s of shifts.slice(0, 2)) console.log(`    shift ${s.value} from ${s.sources.join(', ')}`);
}

const errs = report.filter((e) => e.consoleErrors?.length);
if (errs.length) {
  console.log(`\n=== CONSOLE ERRORS ===`);
  for (const e of errs) console.log(`${e.page}/${e.viewport}: ${e.consoleErrors.join(' | ')}`);
}

const bad = report.filter((e) => e.status && e.status >= 400 && e.page !== '404');
if (bad.length) {
  console.log(`\n=== BAD STATUS ===`);
  for (const e of bad) console.log(`${e.page}/${e.viewport}: ${e.status}`);
}

if (jsonOut) writeFileSync(jsonOut, JSON.stringify(report, null, 2));
console.log(`\nSummary: ${totalViolations} a11y violations, ${totalLayout} layout findings across ${PAGES.length} pages × ${VIEWPORTS.length} viewports.`);
