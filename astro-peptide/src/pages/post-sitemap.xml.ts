import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const site = 'https://peptide-shop.net';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Get all blog posts
  const blogPosts = await getCollection('blog');
  
  let urls = '';
  
  // Blog index page
  urls += `  <url>
    <loc>${site}/blog/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  
  // Individual blog posts
  for (const post of blogPosts) {
    const postDate = post.data.pubDate 
      ? new Date(post.data.pubDate).toISOString().split('T')[0]
      : today;
    
    urls += `  <url>
    <loc>${site}/blog/${post.slug}/</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  }
  
  // Blog category pages
  const categories = ['research-insights', 'lab-techniques', 'quality-control'];
  for (const category of categories) {
    urls += `  <url>
    <loc>${site}/blog/category/${category}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = true;
