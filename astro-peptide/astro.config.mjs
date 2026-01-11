import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://peptide-shop.net',
  integrations: [react(), sitemap(), tailwind()],
  output: 'server', // Hybrid rendering for API endpoints
  adapter: cloudflare(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'de', 'fr', 'es', 'it'],
    routing: {
      prefixDefaultLocale: false, // English at root: /peptides, others at /de/peptides, etc.
    },
  },
});
