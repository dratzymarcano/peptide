import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Helper to clean slug - removes /peptides/ prefix and leading slashes
const cleanSlug = (slug: string) => slug.replace(/^\/peptides\//, '').replace(/^\//, '');

// Static pages with their searchable content
const staticPages = [
  { title: 'About Us', slug: '/about/', keywords: ['about', 'company', 'team', 'history', 'mission', 'peptide research', 'who we are'] },
  { title: 'Quality Assurance', slug: '/quality/', keywords: ['quality', 'purity', 'testing', 'lab', 'hplc', 'mass spectrometry', 'certificate', 'coa'] },
  { title: 'Shipping Information', slug: '/shipping/', keywords: ['shipping', 'delivery', 'dispatch', 'tracking', 'international', 'uk', 'europe'] },
  { title: 'Contact Us', slug: '/contact/', keywords: ['contact', 'email', 'phone', 'support', 'help', 'enquiry', 'question'] },
  { title: 'FAQ', slug: '/faq/', keywords: ['faq', 'frequently asked', 'questions', 'help', 'answers', 'common'] },
  { title: 'Terms & Conditions', slug: '/terms/', keywords: ['terms', 'conditions', 'legal', 'agreement', 'policy'] },
  { title: 'Privacy Policy', slug: '/privacy/', keywords: ['privacy', 'data', 'gdpr', 'cookies', 'personal information'] },
  { title: 'Disclaimer', slug: '/disclaimer/', keywords: ['disclaimer', 'research', 'not for human', 'legal'] },
  { title: 'Wholesale', slug: '/wholesale/', keywords: ['wholesale', 'bulk', 'business', 'reseller', 'volume', 'discount'] },
  { title: 'COA Policy', slug: '/coa-policy/', keywords: ['coa', 'certificate', 'analysis', 'testing', 'purity'] },
  { title: 'Research Bundles', slug: '/bundles/', keywords: ['bundle', 'bundles', 'kit', 'combo', 'package', 'discount'] },
  { title: 'Shop All Peptides', slug: '/shop/', keywords: ['shop', 'all', 'peptides', 'products', 'browse', 'catalog'] },
];

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')?.toLowerCase() || '';
  
  if (query.length < 2) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Search products
    const allProducts = await getCollection('products');
    // Filter to English products only to prevent duplicates
    const products = allProducts.filter(p => p.slug.startsWith('en/'));

    const productResults = products
      .filter(product => {
        const title = product.data.title?.toLowerCase() || '';
        const shortDesc = product.data.short_description?.toLowerCase() || '';
        const category = product.data.category?.toLowerCase() || '';
        const cas = product.data.cas?.toLowerCase() || '';
        
        return title.includes(query) || 
               shortDesc.includes(query) || 
               category.includes(query) ||
               cas.includes(query);
      })
      .slice(0, 6)
      .map(product => ({
        id: `product-${product.data.id}`,
        title: product.data.title.replace(' | Peptide Shop UK', '').replace('Buy ', ''),
        slug: `/peptides/${cleanSlug(product.slug)}`,
        category: product.data.category?.replace(/-/g, ' ') || 'Peptide',
        type: 'product' as const
      }));

    // Search blog posts
    const posts = await getCollection('blog');
    const blogResults = posts
      .filter(post => {
        const title = post.data.title?.toLowerCase() || '';
        const description = post.data.description?.toLowerCase() || '';
        const category = post.data.category?.toLowerCase() || '';
        const tags = post.data.tags?.map((t: string) => t.toLowerCase()).join(' ') || '';
        
        return title.includes(query) || 
               description.includes(query) || 
               category.includes(query) ||
               tags.includes(query);
      })
      .slice(0, 3)
      .map(post => ({
        id: `blog-${post.slug}`,
        title: post.data.title,
        slug: `/blog/${post.slug}/`,
        category: post.data.category || 'Blog',
        type: 'blog' as const
      }));

    // Search static pages
    const pageResults = staticPages
      .filter(page => {
        const titleMatch = page.title.toLowerCase().includes(query);
        const keywordMatch = page.keywords.some(kw => kw.includes(query));
        return titleMatch || keywordMatch;
      })
      .slice(0, 3)
      .map(page => ({
        id: `page-${page.slug}`,
        title: page.title,
        slug: page.slug,
        category: 'Page',
        type: 'page' as const
      }));

    // Combine and prioritize results: products first, then blog, then pages
    const results = [...productResults, ...blogResults, ...pageResults].slice(0, 10);

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ results: [], error: 'Search failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
