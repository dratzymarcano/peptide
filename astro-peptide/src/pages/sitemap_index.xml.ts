import type { APIRoute } from 'astro';

const site = 'https://peptide-shop.net';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${site}/page-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${site}/product-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${site}/post-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = true;
