/**
 * Per-product, per-locale Certificate of Analysis HTML stubs.
 *
 * Prerendered routes (one HTML file per product × locale):
 *   /coa/<slug>.html         → English
 *   /coa/<slug>.de.html      → German
 *   /coa/<slug>.nl.html      → Dutch
 *   /coa/<slug>.fr.html      → French
 *   /coa/<slug>.it.html      → Italian
 *   /coa/<slug>.es.html      → Spanish
 *
 * The HTML is suitable for direct browser print-to-PDF and is also the
 * exact source rendered by the Puppeteer endpoint at /api/coa/<slug>.pdf.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCanonicalCollection } from '../../lib/collections';
import { renderCoaHtml } from '../../lib/coa/render';
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  normalizeLocale,
  type CoaLocale,
} from '../../lib/coa/i18n';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getCanonicalCollection('products');
  const paths: { params: { variant: string }; props: { slug: string; locale: CoaLocale } }[] = [];
  for (const product of products) {
    const slug = product.id;
    paths.push({ params: { variant: slug }, props: { slug, locale: DEFAULT_LOCALE } });
    for (const lang of SUPPORTED_LOCALES) {
      if (lang === DEFAULT_LOCALE) continue;
      paths.push({ params: { variant: `${slug}.${lang}` }, props: { slug, locale: lang } });
    }
  }
  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { slug, locale } = props as { slug: string; locale: CoaLocale };
  const products = await getCanonicalCollection('products');
  const product = products.find(
    (p) => p.id === slug
  );
  if (!product) {
    return new Response('Product not found', { status: 404 });
  }
  const langSuffix = locale !== DEFAULT_LOCALE ? `?lang=${locale}` : '';
  const html = renderCoaHtml(product, {
    locale: normalizeLocale(locale),
    pdfHref: `/api/coa/${slug}.pdf${langSuffix}`,
  });
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
};
