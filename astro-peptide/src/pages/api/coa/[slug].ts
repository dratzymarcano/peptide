/**
 * On-demand Certificate of Analysis PDF endpoint.
 *
 * Route: GET /api/coa/<slug>.pdf?lang=<en|de|nl|fr|it|es>
 *
 * Renders the same HTML template used by /coa/<slug>.html through a headless
 * Chromium instance (Puppeteer) and streams the resulting PDF to the client.
 *
 * Puppeteer is loaded lazily so the dev server, build, and unrelated routes
 * don't fail when the dependency is not installed (e.g. on edge runtimes).
 * Install with:  npm i puppeteer  (bundled Chromium) or
 *                npm i puppeteer-core  (use system Chrome via PUPPETEER_EXECUTABLE_PATH)
 */
import type { APIRoute } from 'astro';
import { getCanonicalCollection } from '../../../lib/collections';
import { normalizeLocale } from '../../../lib/coa/i18n';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// PDF rendering via Puppeteer is disabled on the Cloudflare Workers runtime.
// The static HTML at /coa/<slug>.html is the canonical source; users can print
// to PDF from the browser. We keep this endpoint as a redirect so any external
// links continue to resolve.

export const GET: APIRoute = async ({ params, url, redirect }) => {
  const slugParam = params.slug ?? '';
  const slug = slugParam.replace(/\.pdf$/, '');
  const locale = normalizeLocale(url.searchParams.get('lang'));

  const products = await getCanonicalCollection('products');
  const product = products.find(
    (p) => p.slug.replace(/^\/peptides\//, '').replace(/^\//, '') === slug
  );
  if (!product) {
    return json({ code: 'product_not_found' }, 404);
  }

  const target = `/coa/${slug}${locale !== 'en' ? `.${locale}` : ''}.html`;
  return redirect(target, 302);
};

