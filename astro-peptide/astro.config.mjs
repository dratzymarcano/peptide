import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://peptideresearch.eu', // Replace with actual domain
  integrations: [react(), sitemap()],
  output: 'server', // Hybrid rendering for API endpoints
  adapter: undefined, // Will be set by Cloudflare adapter during deployment setup, but for now we keep it generic or use 'server' mode with an adapter if needed. 
  // For Cloudflare Pages with server-side rendering (API routes), we need an adapter.
  // However, the prompt asks for "Cloudflare Pages config" separately. 
  // We'll stick to static mostly, but the API route needs SSR.
  // Let's assume 'hybrid' or 'server' with cloudflare adapter is the goal.
});
