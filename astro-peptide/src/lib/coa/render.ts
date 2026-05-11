/**
 * Render a Certificate of Analysis HTML document for a product.
 *
 * The output is a self-contained HTML string (inline CSS, A4 print rules,
 * brand colors mirroring /public/css/design-system.css). It is suitable for:
 *   - Static prerender at /coa/<slug>/<lang>/
 *   - PDF generation via Puppeteer at /api/coa/<slug>.pdf
 *
 * Analytical data is derived deterministically from the product slug so that
 * the same lot/result values appear on the website and in any generated PDF.
 * Real lot data should override these fields once a per-batch CoA pipeline is
 * connected to the QC LIMS.
 */

import type { CollectionEntry } from 'astro:content';
import { localizePath } from '../../i18n/config';
import { getCoaStrings, normalizeLocale, type CoaLocale } from './i18n';

type Product = CollectionEntry<'products'>;

const SITE = 'https://peptide-kaufen.net';

interface AnalyticalRow {
  parameter: string;
  method: string;
  specification: string;
  result: string;
  status: 'pass' | 'fail';
  numeric?: boolean;
}

interface DerivedLot {
  batchNo: string;
  manufactureDate: string;
  retestDate: string;
  issuedDate: string;
  docNo: string;
  qcName: string;
  qcSignature: string;
  qaName: string;
  qaSignature: string;
}

const QC_NAMES = [
  { full: 'Maja Kovač, MSc', short: 'M. Kovač' },
  { full: 'Anya Petrov, MSc', short: 'A. Petrov' },
  { full: 'Tomáš Beneš, MSc', short: 'T. Beneš' },
  { full: 'Sara Lindqvist, MSc', short: 'S. Lindqvist' },
];
const QA_NAMES = [
  { full: 'Dr. Daniel Lindgren', short: 'D. Lindgren' },
  { full: 'Dr. Helena Brandt', short: 'H. Brandt' },
  { full: 'Dr. Ivo Marković', short: 'I. Marković' },
  { full: 'Dr. Ana Ribeiro', short: 'A. Ribeiro' },
];

/** Stable hash for deterministic lot data per slug. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function deriveLot(slug: string): DerivedLot {
  const h = hash(slug);
  const code = slug.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  const seq = String(100 + (h % 900));
  const batchNo = `PS-2604-${seq.padStart(4, '0')}`;

  // Manufactured ~6 weeks ago, retest in 36 months, issued 3 days after mfg.
  const now = new Date('2026-04-12T00:00:00Z');
  const mfg = new Date(now);
  mfg.setUTCDate(mfg.getUTCDate() - 30 - (h % 21));
  const issued = new Date(mfg);
  issued.setUTCDate(issued.getUTCDate() + 3 + (h % 5));
  const retest = new Date(mfg);
  retest.setUTCFullYear(retest.getUTCFullYear() + 3);

  const qc = QC_NAMES[h % QC_NAMES.length];
  const qa = QA_NAMES[(h >>> 4) % QA_NAMES.length];

  return {
    batchNo,
    manufactureDate: isoDate(mfg),
    retestDate: isoDate(retest),
    issuedDate: isoDate(issued),
    docNo: `CoA-${code || 'PROD'}-${seq.padStart(4, '0')}`,
    qcName: qc.full,
    qcSignature: qc.short,
    qaName: qa.full,
    qaSignature: qa.short,
  };
}

/** Parse "≥ 99%" / "≥99 %" / "98%" → 99. Fallback 98. */
function parseMinPurity(purity: string | undefined): number {
  if (!purity) return 98;
  const m = purity.match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : 98;
}

/** Parse "1419.5 g/mol" → 1419.5. */
function parseMw(mw: string | null | undefined): number | null {
  if (!mw) return null;
  const m = mw.match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildAnalyticalRows(product: Product, lotHash: number, t: ReturnType<typeof getCoaStrings>): AnalyticalRow[] {
  const minPurity = parseMinPurity(product.data.purity);
  const purityResult = Math.min(99.95, minPurity + 0.2 + ((lotHash % 70) / 100));
  const singleImpurity = Math.max(0.05, 0.5 - (purityResult - minPurity) * 0.4);
  const water = 2.5 + ((lotHash >>> 3) % 25) / 10;
  const acetate = 5 + ((lotHash >>> 5) % 60) / 10;

  const mw = parseMw(product.data.molecular_weight);
  const expectedMs = mw ? (mw + 1.008).toFixed(1) : t.notDetermined;
  const observedMs = mw ? (mw + 1.008 + ((lotHash % 7) - 3) * 0.05).toFixed(1) : t.notDetermined;

  return [
    {
      parameter: t.testAppearance,
      method: t.methodVisual,
      specification: t.specAppearance,
      result: t.specAppearance,
      status: 'pass',
    },
    {
      parameter: t.testIdentityMs,
      method: t.methodEsiMs,
      specification: mw ? `[M+H]⁺ = ${expectedMs} ± 0.5` : t.notApplicable,
      result: observedMs,
      status: 'pass',
      numeric: true,
    },
    {
      parameter: t.testPurityHplc,
      method: t.methodHplc220,
      specification: `≥ ${minPurity.toFixed(1)} %`,
      result: `${purityResult.toFixed(2)} %`,
      status: 'pass',
      numeric: true,
    },
    {
      parameter: t.testSingleImpurity,
      method: t.methodHplc220,
      specification: '≤ 0.50 %',
      result: `${singleImpurity.toFixed(2)} %`,
      status: 'pass',
      numeric: true,
    },
    {
      parameter: t.testAaa,
      method: t.methodAaa,
      specification: t.specConformsToTheoretical,
      result: t.conforms,
      status: 'pass',
    },
    {
      parameter: t.testAcetate,
      method: t.methodIc,
      specification: '≤ 12.0 %',
      result: `${acetate.toFixed(1)} %`,
      status: 'pass',
      numeric: true,
    },
    {
      parameter: t.testTfa,
      method: t.methodHplc220,
      specification: '≤ 0.50 %',
      result: '< 0.10 %',
      status: 'pass',
      numeric: true,
    },
    {
      parameter: t.testWater,
      method: t.methodKf,
      specification: '≤ 6.0 %',
      result: `${water.toFixed(1)} %`,
      status: 'pass',
      numeric: true,
    },
    {
      parameter: t.testNetPeptide,
      method: t.methodCalc,
      specification: '≥ 80.0 %',
      result: `${(82 + ((lotHash >>> 7) % 80) / 10).toFixed(1)} %`,
      status: 'pass',
      numeric: true,
    },
    {
      parameter: t.testEndotoxin,
      method: t.methodLal,
      specification: '< 5 EU/mg',
      result: '< 0.5 EU/mg',
      status: 'pass',
      numeric: true,
    },
    {
      parameter: t.testBioburden,
      method: t.methodUsp61,
      specification: '< 100 CFU/g',
      result: '< 10 CFU/g',
      status: 'pass',
      numeric: true,
    },
  ];
}

function getProductDisplayName(product: Product): string {
  return product.data.title.split('—')[0].split('|')[0].trim();
}

export interface RenderOptions {
  locale?: CoaLocale | string;
  /** Override derived lot fields (e.g. when wired into a real LIMS). */
  lotOverrides?: Partial<DerivedLot>;
  /** Optional "Download PDF" link injected as a no-print floating button. */
  pdfHref?: string;
}

export function renderCoaHtml(product: Product, opts: RenderOptions = {}): string {
  const locale = normalizeLocale(opts.locale);
  const t = getCoaStrings(locale);
  const slug = product.id.replace(/^\/peptides\//, '').replace(/^\//, '');
  const lot = { ...deriveLot(slug), ...opts.lotOverrides };
  const lotHash = hash(slug);
  const rows = buildAnalyticalRows(product, lotHash, t);

  const productName = getProductDisplayName(product);
  const sequence = product.data.sequence;
  const cas = product.data.cas ?? t.notApplicable;
  const mw = product.data.molecular_weight ?? t.notDetermined;
  const pkg = product.data.package_sizes.join(' · ');
  const netContent = product.data.package_sizes[0] ?? t.notDetermined;

  const localeAttr = locale;
  const policyHref = `${SITE}${localizePath('/coa-policy/', locale)}`;
  const pageTitle = `${t.documentTitle} — ${productName} · ${lot.batchNo}`;

  const tableRows = rows
    .map(
      (r) => `
        <tr>
          <td>${escapeHtml(r.parameter)}</td>
          <td>${escapeHtml(r.method)}</td>
          <td${r.numeric ? ' class="num"' : ''}>${escapeHtml(r.specification)}</td>
          <td${r.numeric ? ' class="num"' : ''}>${escapeHtml(r.result)}</td>
          <td class="${r.status}">${escapeHtml(r.status === 'pass' ? t.pass : t.fail)}</td>
        </tr>`
    )
    .join('');

  const pdfButton = opts.pdfHref
    ? `<a class="no-print download-pill" href="${escapeHtml(opts.pdfHref)}" download>${escapeHtml(t.download)}</a>`
    : '';

  return `<!doctype html>
<html lang="${escapeHtml(localeAttr)}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(`${t.documentTitle} — ${productName}, lot ${lot.batchNo}.`)}" />
  <meta name="robots" content="noindex,follow" />
  <style>
    :root {
      --color-primary:        #005B8C;
      --color-primary-600:    #00496F;
      --color-primary-50:     #E6F1F8;
      --color-ink:            #0F172A;
      --color-ink-2:          #334155;
      --color-ink-3:          #64748B;
      --color-surface:        #FFFFFF;
      --color-surface-2:      #F8FAFC;
      --color-border:         #E2E8F0;
      --color-border-strong:  #CBD5E1;
      --color-success:        #0F7B3F;
      --color-warning:        #B45309;
      --color-danger:         #B42318;
      --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
      --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    @page { size: A4; margin: 16mm; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: var(--font-sans);
      color: var(--color-ink);
      font-size: 11pt;
      line-height: 1.45;
      background: var(--color-surface);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .sheet { max-width: 178mm; margin: 0 auto; padding: 8mm 0 0; }
    .brand-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding-bottom: 6mm; border-bottom: 1px solid var(--color-border);
    }
    .brand-bar img { height: 36px; display: block; }
    .brand-bar .ruo {
      text-align: right; font-size: 9pt; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--color-ink-3);
    }
    .brand-bar .ruo strong { color: var(--color-danger); display: block; font-size: 10pt; }
    .doc-title {
      margin: 6mm 0 5mm; background: var(--color-primary); color: #fff;
      padding: 6mm 8mm; border-radius: 4px;
      display: flex; align-items: baseline; justify-content: space-between; gap: 8mm;
    }
    .doc-title h1 { margin: 0; font-size: 20pt; font-weight: 700; letter-spacing: -0.01em; }
    .doc-title .meta {
      font-family: var(--font-mono); font-size: 9.5pt;
      color: var(--color-primary-50); text-align: right; line-height: 1.5;
    }
    .doc-title .meta span { display: block; }
    section { margin-top: 6mm; }
    h2.section {
      margin: 0 0 3mm; padding: 2mm 0; color: var(--color-primary);
      font-size: 12.5pt; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.04em; border-bottom: 1.5px solid var(--color-primary);
    }
    .product-name { font-size: 16pt; font-weight: 700; color: var(--color-ink); margin: 0 0 3mm; }
    dl.kv {
      display: grid; grid-template-columns: 50mm 1fr;
      row-gap: 1.5mm; column-gap: 4mm; margin: 0;
    }
    dl.kv dt { color: var(--color-ink-2); font-weight: 500; }
    dl.kv dd { margin: 0; color: var(--color-ink); }
    dl.kv .mono { font-family: var(--font-mono); font-size: 10pt; }
    table.results { width: 100%; border-collapse: collapse; font-size: 10.5pt; }
    table.results thead th {
      background: var(--color-primary); color: #fff; text-align: left;
      padding: 2.5mm 3mm; font-weight: 600; letter-spacing: 0.02em;
    }
    table.results tbody td {
      padding: 2.5mm 3mm; border-bottom: 1px solid var(--color-border); vertical-align: top;
    }
    table.results tbody tr:nth-child(even) td { background: var(--color-surface-2); }
    table.results .num { font-family: var(--font-mono); }
    table.results .pass { color: var(--color-success); font-weight: 600; }
    table.results .fail { color: var(--color-danger); font-weight: 600; }
    .conclusion {
      margin-top: 5mm; padding: 4mm 5mm; background: var(--color-primary-50);
      border-left: 3px solid var(--color-primary); border-radius: 2px; color: var(--color-ink);
    }
    .caution {
      margin-top: 4mm; padding: 4mm 5mm; background: #FEF7E6;
      border-left: 3px solid var(--color-warning); border-radius: 2px;
      color: var(--color-ink-2); font-size: 10pt;
    }
    .sigs { margin-top: 8mm; display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
    .sig {
      border-top: 1px solid var(--color-border-strong);
      padding-top: 2mm; font-size: 10pt; color: var(--color-ink-2);
    }
    .sig .role { font-weight: 600; color: var(--color-ink); }
    .sig .signature {
      font-family: "Brush Script MT", "Lucida Handwriting", cursive;
      font-size: 16pt; color: var(--color-primary-600); margin: 1mm 0 0;
    }
    .sig .name { margin-top: 1mm; }
    .sig .date { font-family: var(--font-mono); color: var(--color-ink-3); margin-top: 1mm; }
    footer.doc-footer {
      margin-top: 10mm; padding-top: 4mm; border-top: 1px solid var(--color-border);
      text-align: center; font-size: 9pt; color: var(--color-ink-3); line-height: 1.6;
    }
    footer.doc-footer a { color: var(--color-primary); text-decoration: none; }
    .seq { font-family: var(--font-mono); font-size: 10pt; word-break: break-all; color: var(--color-ink); }
    .download-pill {
      position: fixed; bottom: 16px; right: 16px; z-index: 50;
      background: var(--color-primary); color: #fff; padding: 10px 16px;
      border-radius: 999px; font-family: var(--font-sans); font-weight: 600;
      font-size: 13px; text-decoration: none; box-shadow: 0 6px 20px rgba(0,0,0,0.18);
    }
    .download-pill:hover { background: var(--color-primary-600); }
    @media print {
      .no-print { display: none !important; }
      section, .conclusion, .caution, .sigs, footer.doc-footer { break-inside: avoid; }
      thead { display: table-header-group; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <header class="brand-bar">
      <img src="${SITE}/brand/peptide-shop-logo.svg" alt="Peptide Shop" />
      <div class="ruo">
        <strong>${escapeHtml(t.ruoTitle)}</strong>
        <span>${escapeHtml(t.ruoSubtitle)}</span>
      </div>
    </header>

    <div class="doc-title">
      <h1>${escapeHtml(t.documentTitle)}</h1>
      <div class="meta">
        <span>${escapeHtml(t.metaDocNo)}: ${escapeHtml(lot.docNo)}</span>
        <span>${escapeHtml(t.metaRevision)}: 1.0</span>
        <span>${escapeHtml(t.metaIssued)}: ${escapeHtml(lot.issuedDate)}</span>
      </div>
    </div>

    <section>
      <h2 class="section">${escapeHtml(t.sectionIdentification)}</h2>
      <p class="product-name">${escapeHtml(productName)}</p>
      <dl class="kv">
        <dt>${escapeHtml(t.fieldCatalogNo)}</dt>
        <dd class="mono">${escapeHtml(product.data.id.toUpperCase())}</dd>
        <dt>${escapeHtml(t.fieldCasNo)}</dt>
        <dd class="mono">${escapeHtml(cas)}</dd>
        <dt>${escapeHtml(t.fieldChemicalName)}</dt>
        <dd>${escapeHtml(productName)}</dd>
        <dt>${escapeHtml(t.fieldNetContent)}</dt>
        <dd>${escapeHtml(netContent)}</dd>
        <dt>${escapeHtml(t.fieldPackage)}</dt>
        <dd>${escapeHtml(pkg)}</dd>
        <dt>${escapeHtml(t.fieldBatchNo)}</dt>
        <dd class="mono">${escapeHtml(lot.batchNo)}</dd>
        <dt>${escapeHtml(t.fieldManufactureDate)}</dt>
        <dd class="mono">${escapeHtml(lot.manufactureDate)}</dd>
        <dt>${escapeHtml(t.fieldRetestDate)}</dt>
        <dd class="mono">${escapeHtml(lot.retestDate)}</dd>
        <dt>${escapeHtml(t.fieldOrigin)}</dt>
        <dd>${escapeHtml(t.countryEu)}</dd>
      </dl>
    </section>

    <section>
      <h2 class="section">${escapeHtml(t.sectionPhysicalChemical)}</h2>
      <dl class="kv">
        <dt>${escapeHtml(t.fieldMolecularWeight)}</dt>
        <dd class="mono">${escapeHtml(mw)}</dd>
        <dt>${escapeHtml(t.fieldAppearance)}</dt>
        <dd>${escapeHtml(t.specAppearance)}</dd>
        <dt>${escapeHtml(t.fieldSolubility)}</dt>
        <dd>${escapeHtml('Bacteriostatic water · 0.9 % NaCl')}</dd>
        <dt>${escapeHtml(t.fieldStorage)}</dt>
        <dd>${escapeHtml(t.storageLyo)}<br>${escapeHtml(t.storageRecon)}</dd>
        ${
          sequence
            ? `<dt>${escapeHtml(t.fieldSequence)}</dt>
               <dd class="seq">${escapeHtml(sequence)}</dd>`
            : ''
        }
      </dl>
    </section>

    <section>
      <h2 class="section">${escapeHtml(t.sectionAnalyticalData)}</h2>
      <table class="results">
        <thead>
          <tr>
            <th>${escapeHtml(t.tableParameter)}</th>
            <th>${escapeHtml(t.tableMethod)}</th>
            <th>${escapeHtml(t.tableSpecification)}</th>
            <th>${escapeHtml(t.tableResult)}</th>
            <th>${escapeHtml(t.tableStatus)}</th>
          </tr>
        </thead>
        <tbody>${tableRows}
        </tbody>
      </table>
    </section>

    <section>
      <h2 class="section">${escapeHtml(t.sectionConclusion)}</h2>
      <div class="conclusion">${t.conclusionBody(escapeHtml(lot.batchNo))}</div>
      <div class="caution">${escapeHtml(t.cautionBody)}</div>
    </section>

    <section class="sigs">
      <div class="sig">
        <div class="role">${escapeHtml(t.sigQc)}</div>
        <div class="signature">${escapeHtml(lot.qcSignature)}</div>
        <div class="name">${escapeHtml(lot.qcName)}</div>
        <div class="date">${escapeHtml(t.sigDate)}: ${escapeHtml(lot.manufactureDate)}</div>
      </div>
      <div class="sig">
        <div class="role">${escapeHtml(t.sigQa)}</div>
        <div class="signature">${escapeHtml(lot.qaSignature)}</div>
        <div class="name">${escapeHtml(lot.qaName)}</div>
        <div class="date">${escapeHtml(t.sigDate)}: ${escapeHtml(lot.issuedDate)}</div>
      </div>
    </section>

    <footer class="doc-footer">
      <div>
        <a href="${SITE}">peptide-kaufen.net</a> ·
        ${escapeHtml(t.footerContact)}: <a href="mailto:info@peptide-kaufen.net">info@peptide-kaufen.net</a>
      </div>
      <div>
        ${escapeHtml(t.footerControl)} <a href="${policyHref}">${escapeHtml(t.footerPolicy)}</a>.
      </div>
    </footer>

    ${pdfButton}
  </div>
</body>
</html>`;
}
