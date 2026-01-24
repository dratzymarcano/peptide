// Helper functions for loading localized product content
import { getCollection, type CollectionEntry } from 'astro:content';
import type { SupportedLanguage } from './translations';

export type ProductEntry = CollectionEntry<'products'>;

/**
 * Get a product by its base slug (e.g., "semaglutide") for a specific language.
 * Falls back to English if the localized version doesn't exist.
 */
export async function getLocalizedProduct(
  baseSlug: string,
  lang: SupportedLanguage
): Promise<ProductEntry | undefined> {
  const products = await getCollection('products');
  
  // First, try to find a localized version
  // Products are stored as: en/semaglutide, nl/semaglutide, etc.
  const localizedSlug = `${lang}/${baseSlug}`;
  let product = products.find(p => p.slug === localizedSlug);
  
  // If no localized version, fall back to English
  if (!product && lang !== 'en') {
    const englishSlug = `en/${baseSlug}`;
    product = products.find(p => p.slug === englishSlug);
  }
  
  return product;
}

/**
 * Get all products for a specific language.
 * Returns localized versions where available, falling back to English.
 */
export async function getLocalizedProducts(
  lang: SupportedLanguage
): Promise<ProductEntry[]> {
  const products = await getCollection('products');
  
  // Get all English products as the base
  const englishProducts = products.filter(p => p.slug.startsWith('en/'));
  
  // For each English product, check if a localized version exists
  return englishProducts.map(enProduct => {
    const baseSlug = enProduct.slug.replace('en/', '');
    const localizedSlug = `${lang}/${baseSlug}`;
    
    // Find localized version or return English
    const localizedProduct = products.find(p => p.slug === localizedSlug);
    return localizedProduct || enProduct;
  });
}

/**
 * Get all English products (for English pages or as base for translation)
 */
export async function getEnglishProducts(): Promise<ProductEntry[]> {
  const products = await getCollection('products');
  return products.filter(p => p.slug.startsWith('en/'));
}

/**
 * Extract the base slug from a product entry
 * e.g., "en/semaglutide" → "semaglutide"
 */
export function getBaseSlug(product: ProductEntry): string {
  return product.slug.replace(/^(en|nl|de|fr|es|it)\//, '');
}

/**
 * Check if a localized version of a product exists
 */
export async function hasLocalizedVersion(
  baseSlug: string,
  lang: SupportedLanguage
): Promise<boolean> {
  if (lang === 'en') return true;
  
  const products = await getCollection('products');
  const localizedSlug = `${lang}/${baseSlug}`;
  return products.some(p => p.slug === localizedSlug);
}

/**
 * Get available languages for a product
 */
export async function getProductLanguages(
  baseSlug: string
): Promise<SupportedLanguage[]> {
  const products = await getCollection('products');
  const languages: SupportedLanguage[] = ['en', 'nl', 'de', 'fr', 'es', 'it', 'ru'];
  
  return languages.filter(lang => {
    const slug = `${lang}/${baseSlug}`;
    return products.some(p => p.slug === slug);
  });
}
