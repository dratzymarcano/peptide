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
  locales.map((locale) => new URL(locale === defaultLocale ? path : `/${locale}${path}`, site).toString())
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
      i18n: {
        defaultLocale,
        locales: sitemapLocaleMap,
      },
      filter: (page) =>
        !page.includes('/cart') &&
        !page.includes('/checkout') &&
        !page.includes('/account/') &&
        !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
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
