/**
 * Single source of truth for ProductCard data shape.
 *
 * Pages should call `toCardProduct(entry)` on a content-collection entry
 * and pass the result to <ProductCard product={...} />. Any future
 * derivation (rating, availability default, image fallback, promo math)
 * is added here ONCE and propagates to every card across the site.
 */
import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';
import { getLocalizedProduct } from '../i18n/productContent';
import { useTranslations } from '../i18n/ui';

export type Availability = 'in_stock' | 'low_stock' | 'out_of_stock' | 'preorder';

export interface CardPromo {
  label: string;
  discount_pct?: number;
  expires?: string;
}

export interface CardProduct {
  id: string;
  slug: string;
  url: string;
  title: string;
  shortDescription?: string;
  image: string;
  imageAlt: string;
  category?: string;
  purity?: string;
  packageSize?: string;
  price?: number;
  priceRange: string;
  compareAtPrice?: number;
  availability: Availability;
  promo?: CardPromo;
  rating?: { average: number; count: number };
}

const FALLBACK_IMAGE = '/images/peptide-default.jpg';

function deriveRating(reviews: CollectionEntry<'products'>['data']['reviews']) {
  if (!reviews || reviews.length === 0) return undefined;
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return { average: sum / reviews.length, count: reviews.length };
}

function deriveAvailability(d: CollectionEntry<'products'>['data']): Availability {
  if (d.availability) return d.availability;
  if (typeof d.stock_qty === 'number') {
    if (d.stock_qty === 0) return 'out_of_stock';
    if (d.stock_qty <= 5) return 'low_stock';
  }
  return 'in_stock';
}

function applyPromo(price: number | undefined, promo?: CardPromo): number | undefined {
  if (price == null || !promo?.discount_pct) return price;
  return Math.round(price * (100 - promo.discount_pct)) / 100;
}

/**
 * Normalize a product collection entry into the canonical CardProduct shape.
 * Use everywhere a ProductCard is rendered.
 */
export function toCardProduct(entry: CollectionEntry<'products'>, locale: Locale = 'en'): CardProduct {
  const d = entry.data;
  const localized = getLocalizedProduct(entry, locale);
  const t = useTranslations(locale);
  const slug = entry.slug.replace(/^\//, '');
  const basePrice = d.price;
  const finalPrice = applyPromo(basePrice, d.promo);
  const compareAt =
    d.compare_at_price ??
    (d.promo?.discount_pct && basePrice ? basePrice : undefined);

  return {
    id: d.id,
    slug,
    url: `/peptides/${slug}/`,
    title: localized.title,
    shortDescription: localized.shortDescription,
    image: d.images?.[0] ?? FALLBACK_IMAGE,
    imageAlt: localized.cleanTitle,
    category: d.researchArea ? t(`taxonomy.researchAreas.${d.researchArea}.name`) : d.category,
    purity: d.purity,
    packageSize: d.package_sizes?.[0],
    price: finalPrice,
    priceRange: localized.priceRange,
    compareAtPrice: compareAt,
    availability: deriveAvailability(d),
    promo: d.promo,
    rating: deriveRating(d.reviews),
  };
}

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  out_of_stock: 'Out of stock',
  preorder: 'Pre-order',
};
