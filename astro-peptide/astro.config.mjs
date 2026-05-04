import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const site = 'https://peptide-shop.net';
const locales = ['en', 'de', 'nl', 'fr', 'it', 'es'];
const defaultLocale = 'en';
const sitemapLocaleMap = {
  en: 'en',
  de: 'de',
  nl: 'nl',
  fr: 'fr',
  it: 'it',
  es: 'es',
};

function contentSlugs(collection) {
  const dir = join(rootDir, 'src', 'content', collection);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .sort();
}

function availableContentLocales(collection, slug) {
  const dir = join(rootDir, 'src', 'content', collection);
  const available = new Set();

  if (existsSync(join(dir, `${slug}.md`)) || existsSync(join(dir, defaultLocale, `${slug}.md`))) {
    available.add(defaultLocale);
  }

  for (const locale of locales) {
    if (locale === defaultLocale) continue;
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

  return locales;
}

function localizedUrl(path, locale) {
  return new URL(locale === defaultLocale ? path : `/${locale}${path}`, site).toString();
}

function basePathFromUrl(url) {
  const pathname = new URL(url).pathname;
  const withoutLocale = pathname.replace(/^\/(de|nl|fr|it|es)(\/|$)/, '/');
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
  '/search/',
  '/shipping/',
  '/shop/',
  '/terms/',
  ...contentSlugs('blog').map((slug) => `/blog/${slug}/`),
  ...contentSlugs('products').map((slug) => `/peptides/${slug}/`),
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

const productSlugs = [
  '5-amino-1mq',
  'aod-9604',
  'bacteriostatic-water',
  'bpc-157',
  'cagrilintide',
  'cjc-1295-no-dac',
  'dsip',
  'epitalon',
  'gh-frag-176-191',
  'ghk-cu',
  'ghrp-2',
  'ghrp-6',
  'ipamorelin',
  'melanotan-2',
  'nad-plus',
  'o-304',
  'retatrutide',
  'selank',
  'semaglutide',
  'semax',
  'tb-500',
  'tesofensine',
  'tirzepatide',
];

const productRedirects = Object.fromEntries(
  productSlugs.map((slug) => [`/peptides/buy-${slug}`, `/peptides/${slug}/`])
);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    react(),
    sitemap({
      customPages: localizedSitemapPages,
      filter: (page) =>
        !page.includes('/cart') &&
        !page.includes('/checkout') &&
        !page.includes('/account/') &&
        !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const basePath = basePathFromUrl(item.url);
        const availableLocales = localesForPath(basePath);
        const links = availableLocales.map((locale) => ({
          lang: sitemapLocaleMap[locale],
          url: localizedUrl(basePath, locale),
        }));
        links.push({ lang: 'x-default', url: localizedUrl(basePath, defaultLocale) });
        return { ...item, links };
      },
    }),
    tailwind(),
  ],
  output: 'server', // Hybrid rendering for API endpoints
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: { enabled: true },
  }),
  // 301 redirects for IA migration (legacy /peptides/{category} → /use-case/{slug})
  // Astro normalises trailing slashes, so a single entry covers both forms.
  redirects: {
    ...productRedirects,
    '/peptides':                 '/catalog/',
    '/peptides/weight-loss':     '/use-case/weight-loss/',
    '/peptides/muscle-recovery': '/use-case/muscle-recovery/',
    '/peptides/growth-hormone':  '/use-case/anti-aging/',
    '/peptides/tanning':         '/use-case/tanning/',
    '/peptides/cognitive':       '/use-case/cognitive/',
  },
});
