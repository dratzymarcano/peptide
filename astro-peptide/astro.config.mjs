import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE_ORIGIN } from './site.config.mjs';

const rootDir = dirname(fileURLToPath(import.meta.url));
const site = SITE_ORIGIN;
const locales = ['de'];
const defaultLocale = 'de';
const sourceLocale = 'de';
const sitemapLocaleMap = {
  de: 'de',
};

function contentSlugs(collection) {
  const dir = join(rootDir, 'src', 'content', collection);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .sort();
}

/**
 * Collections translated at runtime for every locale.
 *
 * Must stay in sync with RUNTIME_TRANSLATED_COLLECTIONS in
 * src/lib/localizedEntry.ts — that constant drives the hreflang tags on the
 * page, this one drives the sitemap's alternate links, and the two disagreeing
 * is exactly the inconsistency Search Console reports as "alternate page
 * without self-referencing canonical".
 *
 * `src/i18n/productContent.ts` and `src/i18n/blogContent.ts` translate by
 * locale, not by slug, so every product and post has six real language
 * versions. Keying the sitemap off the presence of a `<locale>/<slug>.md`
 * override left ~240 live localized product URLs out of the sitemap entirely.
 */
const runtimeTranslatedCollections = new Set(['products', 'blog']);

function availableContentLocales(collection, slug) {
  const dir = join(rootDir, 'src', 'content', collection);
  const hasCanonical =
    existsSync(join(dir, `${slug}.md`)) || existsSync(join(dir, sourceLocale, `${slug}.md`));
  if (!hasCanonical) return [];

  if (runtimeTranslatedCollections.has(collection)) return [...locales];

  const available = new Set([sourceLocale]);
  for (const locale of locales) {
    if (locale === sourceLocale) continue;
    if (existsSync(join(dir, locale, `${slug}.md`))) {
      available.add(locale);
    }
  }

  return locales.filter((locale) => available.has(locale));
}

function localesForPath(path) {
  const blogMatch = path.match(/^\/blog\/([^/]+)\/$/);
  if (blogMatch) return availableContentLocales('blog', blogMatch[1]);

  const productMatch = path.match(/^\/peptides\/([^/]+)\/$/);
  if (productMatch) return availableContentLocales('products', productMatch[1]);

  // Learn articles render their English markdown body under every locale
  // prefix. They are English-only until translated, so they get a single
  // sitemap entry — at /en/learn/<slug>/, since English is no longer the
  // root — and no alternates; the other locale URLs canonicalise to it
  // (see src/pages/learn/[slug].astro).
  if (/^\/learn\/(?!what-are-peptides\/)[^/]+\/$/.test(path)) return [sourceLocale];

  return locales;
}

function localizedUrl(path, locale) {
  return new URL(locale === defaultLocale ? path : `/${locale}${path}`, site).toString();
}

// Derived from `locales` rather than a hand-written alternation. The literal
// list here omitted `en`, which was harmless only while English was the
// unprefixed root; the moment it moved to /en/ the stripper stopped matching
// and every alternate came out doubled as /en/en/….
const localePrefixPattern = new RegExp(`^/(${locales.join('|')})(/|$)`);

function basePathFromUrl(url) {
  const pathname = new URL(url).pathname;
  const withoutLocale = pathname.replace(localePrefixPattern, '/');
  return withoutLocale.endsWith('/') ? withoutLocale : `${withoutLocale}/`;
}

const publicBasePaths = [
  '/',
  '/about/',
  '/blog/',
  '/bundles/',
  '/catalog/',
  '/coa-policy/',
  '/contact/',
  '/disclaimer/',
  '/faq/',
  '/impressum/',
  '/learn/',
  '/learn/what-are-peptides/',
  '/privacy/',
  '/quality/',
  // '/search/' is deliberately absent: it renders internal search results,
  // which Google's guidelines ask to keep out of the index. The page itself
  // now carries `noindex, follow`.
  '/peptid-rechner/',
  '/shipping/',
  '/versand-oesterreich/',
  '/versand-schweiz/',
  '/shop/',
  '/terms/',
  ...contentSlugs('blog').map((slug) => `/blog/${slug}/`),
  ...contentSlugs('products').map((slug) => `/peptides/${slug}/`),
  // The twelve /learn/ reference articles were reachable from the learn index
  // but absent from the sitemap entirely.
  ...contentSlugs('learn').map((slug) => `/learn/${slug}/`),
  ...[
    'neuroscience',
    'cardiovascular',
    'diabetes',
    'cancer-apoptosis',
    'adhesion-ecm',
    'cell-tissue',
    'immunology',
    'epigenetics',
    'hormones',
    'cell-signaling',
    'protein-analysis',
    'cell-permeable',
  ].map((slug) => `/catalog/${slug}/`),
  ...['weight-loss', 'muscle-recovery', 'cognitive', 'anti-aging', 'tanning'].map((slug) => `/use-case/${slug}/`),
];

const localizedSitemapPages = publicBasePaths.flatMap((path) =>
  localesForPath(path).map((locale) => localizedUrl(path, locale))
);

// Legacy `/peptides/buy-<slug>` URLs redirect to the canonical product page with explicit 301.
// Handled by Cloudflare edge _redirects wildcard `/peptides/buy-* /peptides/:splat/ 301` and middleware.

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      customPages: localizedSitemapPages,
      xslURL: '/sitemap.xsl',
      filter: (page) =>
        !page.includes('/cart') &&
        !page.includes('/checkout') &&
        !page.includes('/account') &&
        !page.includes('/api/') &&
        !page.includes('/feeds/') &&
        // Internal search results. Astro discovers /search/ as a route, so
        // dropping it from publicBasePaths was not enough on its own.
        !/\/search\/?$/.test(new URL(page).pathname),
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;
        item.lastmod = new Date();

        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (path.startsWith('/peptides/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/catalog/') || path.startsWith('/use-case/') || path === '/shop/') {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (path.startsWith('/learn/')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }

        const basePath = basePathFromUrl(item.url);
        const availableLocales = localesForPath(basePath);
        // A page published in one language needs no alternate cluster; the
        // self-reference plus x-default it used to emit said nothing.
        if (availableLocales.length < 2) return item;
        const links = availableLocales.map((locale) => ({
          lang: sitemapLocaleMap[locale],
          url: localizedUrl(basePath, locale),
        }));
        // x-default is the root-served version, which is the German one.
        links.push({ lang: 'x-default', url: localizedUrl(basePath, defaultLocale) });
        return { ...item, links };
      },
    }),
  ],
  output: 'server', // Hybrid rendering for API endpoints
  adapter: cloudflare({
    imageService: 'compile',
    prerenderEnvironment: 'node',
    platformProxy: { enabled: false },
  }),
  // 301 redirects for IA migration (legacy /peptides/{category} → /use-case/{slug})
  // Astro normalises trailing slashes, so a single entry covers both forms.
  redirects: {
    '/sitemap.xml':              { status: 301, destination: '/sitemap-index.xml' },
    '/peptides/':                { status: 301, destination: '/catalog/' },
    '/peptides/weight-loss/':    { status: 301, destination: '/use-case/weight-loss/' },
    '/peptides/muscle-recovery/':{ status: 301, destination: '/use-case/muscle-recovery/' },
    '/peptides/growth-hormone/': { status: 301, destination: '/use-case/anti-aging/' },
    '/peptides/tanning/':        { status: 301, destination: '/use-case/tanning/' },
    '/peptides/cognitive/':      { status: 301, destination: '/use-case/cognitive/' },
  },
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'astro/zod'],
    },
    ssr: {
      noExternal: ['react', 'react-dom', '@nanostores/react'],
    },
  },
});
