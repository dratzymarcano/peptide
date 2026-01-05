import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://peptide-shop.net',
  integrations: [react(), sitemap(), tailwind()],
  output: 'server', // Hybrid rendering for API endpoints
  adapter: node({
    mode: 'standalone',
  }),
});
