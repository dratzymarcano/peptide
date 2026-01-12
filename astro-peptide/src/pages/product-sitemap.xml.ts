import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { supportedLanguages, productSlugTranslations, getLocalizedProductSlug } from '../i18n/translations';

const site = 'https://peptide-shop.net';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Get all English products (base products)
  const allProducts = await getCollection('products');
  const englishProducts = allProducts.filter(p => p.slug.startsWith('en/'));
  
  let urls = '';
  
  for (const product of englishProducts) {
    const productSlug = product.slug.replace('en/', '');
    const buySlug = `buy-${productSlug}`;
    
    // Generate hreflang alternates for this product
    const alternates = supportedLanguages.map(lang => {
      if (lang === 'en') {
        return `      <xhtml:link rel="alternate" hreflang="en" href="${site}/peptides/${buySlug}/" />`;
      }
      const localizedSlug = getLocalizedProductSlug(buySlug, lang);
      return `      <xhtml:link rel="alternate" hreflang="${lang}" href="${site}/${lang}/peptides/${localizedSlug}/" />`;
    }).join('\n');
    
    // English URL
    urls += `  <url>
    <loc>${site}/peptides/${buySlug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
${alternates}
  </url>\n`;
    
    // Other language URLs
    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      
      const localizedSlug = getLocalizedProductSlug(buySlug, lang);
      urls += `  <url>
    <loc>${site}/${lang}/peptides/${localizedSlug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
${alternates}
  </url>\n`;
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = true;
