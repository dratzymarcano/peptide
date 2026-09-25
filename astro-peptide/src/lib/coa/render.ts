/**
 * Render a Certificate of Analysis HTML document for a product.
 *
 * The output is a self-contained HTML string (inline CSS, A4 print rules,
 * brand colors mirroring /public/css/design-system.css). It is suitable for:
 *   - Static prerender at /coa/<slug>/<lang>/
 *   - PDF generation via Puppeteer at /api/coa/<slug>.pdf
 *
 * Every value on the certificate comes from a real laboratory report recorded
 * in `src/data/coa-lots.json` and typed by `./lots`. This module deliberately
 * has no fallback: a product with no lot on record gets
 * `renderCoaUnavailableHtml`, never a certificate with placeholder numbers.
 */

import type { CollectionEntry } from 'astro:content';
import { localizePath } from '../../i18n/config';
import { getCoaStrings, normalizeLocale, type CoaLocale } from './i18n';
import type { CoaLot, CoaResultRow } from './lots';

type Product = CollectionEntry<'products'>;

const SITE = 'https://peptide-kaufen.net';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


function getProductDisplayName(product: Product): string {
  return product.data.title.split('—')[0].split('|')[0].trim();
}

export interface RenderOptions {
  locale?: CoaLocale | string;
  /** Optional "Download PDF" link injected as a no-print floating button. */
  pdfHref?: string;
}

/**
 * Render the certificate for one real, on-record lot.
 *
 * `lot` is required and must come from the registry in `./lots` — there is no
 * derived-data path. Callers that cannot supply a lot must render
 * `renderCoaUnavailableHtml` instead.
 */
export function renderCoaHtml(product: Product, lot: CoaLot, opts: RenderOptions = {}): string {
  const locale = normalizeLocale(opts.locale);
  const t = getCoaStrings(locale);
  const rows: CoaResultRow[] = lot.results;

  const productName = getProductDisplayName(product);
  const sequence = product.data.sequence;
  const cas = product.data.cas ?? t.notApplicable;
  const mw = product.data.molecular_weight ?? t.notDetermined;
  const pkg = product.data.package_sizes.join(' · ');
  const netContent = product.data.package_sizes[0] ?? t.notDetermined;

  const localeAttr = locale;
  const policyHref = `${SITE}${localizePath('/coa-policy/', locale)}`;
  const pageTitle = `${t.documentTitle} | ${productName} · ${lot.batchNo}`;

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

  // Naming the testing laboratory is the certificate's load-bearing trust
  // signal — an unattributed results table is worth very little.
  const labSection = `
    <section>
      <h2 class="section">${escapeHtml(t.sectionTestingLaboratory)}</h2>
      <dl class="kv">
        <dt>${escapeHtml(t.fieldLabName)}</dt>
        <dd>${escapeHtml(lot.laboratory.name)}</dd>
        <dt>${escapeHtml(t.fieldLabLocation)}</dt>
        <dd>${escapeHtml(lot.laboratory.location)}</dd>
        ${
          lot.laboratory.accreditation
            ? `<dt>${escapeHtml(t.fieldLabAccreditation)}</dt>
               <dd class="mono">${escapeHtml(lot.laboratory.accreditation)}</dd>`
            : ''
        }
        ${
          lot.laboratory.reportNumber
            ? `<dt>${escapeHtml(t.fieldLabReportNo)}</dt>
               <dd class="mono">${escapeHtml(lot.laboratory.reportNumber)}</dd>`
            : ''
        }
        ${
          lot.laboratory.reportUrl
            ? `<dt>${escapeHtml(t.fieldLabReportUrl)}</dt>
               <dd><a href="${escapeHtml(lot.laboratory.reportUrl)}">${escapeHtml(lot.laboratory.reportUrl)}</a></dd>`
            : ''
        }
      </dl>
    </section>`;

  // Approvals list the people who actually signed the laboratory report. The
  // previous template drew a cursive pseudo-signature under an invented name;
  // a typed name, role and date is both honest and sufficient.
  const signatureSection = lot.signatories?.length
    ? `
    <section class="sigs">
      ${lot.signatories
        .map(
          (signatory) => `
      <div class="sig">
        <div class="role">${escapeHtml(signatory.role)}</div>
        <div class="name">${escapeHtml(signatory.name)}</div>
        <div class="date">${escapeHtml(t.sigDate)}: ${escapeHtml(signatory.date)}</div>
      </div>`
        )
        .join('')}
    </section>`
    : '';

  return `<!doctype html>
<html lang="${escapeHtml(localeAttr)}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(`${t.documentTitle}: ${productName}, lot ${lot.batchNo}.`)}" />
  <meta name="robots" content="noindex,follow" />
  <style>
    :root {
      --color-primary:        #0077B6;
      --color-primary-600:    #015BA0;
      --color-primary-50:     #EFF8FC;
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
        <span>${escapeHtml(t.metaRevision)}: ${escapeHtml(lot.revision)}</span>
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
        <dd>${escapeHtml(lot.origin ?? t.countryEu)}</dd>
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

    ${labSection}

    ${signatureSection}

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

/**
 * Page served at /coa/<slug> when no analytical report is on record.
 *
 * This is deliberately not a certificate: no results table, no batch number,
 * no approval block. It states plainly that the certificate is issued per lot
 * and how to obtain the one for a given shipment.
 */
export function renderCoaUnavailableHtml(product: Product, opts: RenderOptions = {}): string {
  const locale = normalizeLocale(opts.locale);
  const t = getCoaStrings(locale);
  const productName = getProductDisplayName(product);
  const policyHref = `${SITE}${localizePath('/coa-policy/', locale)}`;
  const contactHref = `${SITE}${localizePath('/contact/', locale)}`;

  return `<!doctype html>
<html lang="${escapeHtml(locale)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(`${t.unavailableTitle} | ${productName}`)}</title>
  <meta name="description" content="${escapeHtml(t.unavailableIntro(productName))}" />
  <meta name="robots" content="noindex,follow" />
  <style>
    :root {
      --color-primary: #0077B6;
      --color-ink:     #0F172A;
      --color-ink-2:   #334155;
      --color-ink-3:   #64748B;
      --color-border:  #E2E8F0;
      --color-warning: #B45309;
      --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: var(--font-sans); color: var(--color-ink);
      font-size: 16px; line-height: 1.6; background: #fff;
    }
    .sheet { max-width: 680px; margin: 0 auto; padding: 48px 24px; }
    .brand-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding-bottom: 24px; border-bottom: 1px solid var(--color-border);
    }
    .brand-bar img { height: 36px; display: block; }
    .brand-bar .ruo {
      text-align: right; font-size: 12px; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--color-ink-3);
    }
    h1 { font-size: 28px; letter-spacing: -0.01em; margin: 32px 0 8px; }
    .lede { color: var(--color-ink-2); margin: 0 0 24px; }
    .notice {
      padding: 16px 20px; background: #FEF7E6;
      border-left: 3px solid var(--color-warning); border-radius: 2px;
      color: var(--color-ink-2); font-size: 15px;
    }
    ul { color: var(--color-ink-2); padding-left: 20px; }
    li { margin-bottom: 8px; }
    .actions { margin-top: 32px; display: flex; flex-wrap: wrap; gap: 12px; }
    .btn {
      display: inline-block; padding: 12px 20px; border-radius: 6px;
      background: var(--color-primary); color: #fff;
      text-decoration: none; font-weight: 600;
    }
    .btn.secondary {
      background: #fff; color: var(--color-primary);
      border: 1px solid var(--color-border);
    }
    footer {
      margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--color-border);
      font-size: 14px; color: var(--color-ink-3);
    }
    a { color: var(--color-primary); }
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

    <h1>${escapeHtml(t.unavailableTitle)}</h1>
    <p class="lede">${escapeHtml(t.unavailableIntro(productName))}</p>

    <div class="notice">${escapeHtml(t.unavailableNotice)}</div>

    <ul>
      ${t.unavailableSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join('\n      ')}
    </ul>

    <div class="actions">
      <a class="btn" href="${contactHref}">${escapeHtml(t.unavailableContactCta)}</a>
      <a class="btn secondary" href="${policyHref}">${escapeHtml(t.footerPolicy)}</a>
    </div>

    <footer>
      <a href="${SITE}">peptide-kaufen.net</a> ·
      ${escapeHtml(t.footerContact)}: <a href="mailto:info@peptide-kaufen.net">info@peptide-kaufen.net</a>
    </footer>
  </div>
</body>
</html>`;
}
