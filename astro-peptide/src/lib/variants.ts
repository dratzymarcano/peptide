/**
 * Package-size variants for a catalogue product.
 *
 * A product used to be a single price attached to `package_sizes[0]`, which
 * meant one listing could only ever address one buyer: the 5 mg vial suited a
 * first trial and priced the site out of any repeat or bulk order. Competitors
 * list the same compound at 10/20/40 mg from one page.
 *
 * Everything that needs a price — the buy box, the cart, the product card, the
 * JSON-LD offer, and the server-side pricing authority that the invoice is
 * built from — resolves it through this module. That is the point: the browser
 * previously supplied prices and a crafted POST could book an order at any
 * figure, and adding variants multiplies that surface (ask for the 40 mg vial,
 * pay the 5 mg price). `resolveVariant` is the only sanctioned lookup, and it
 * rejects a size it does not recognise rather than falling back to a default.
 *
 * Products with no `variants` block keep exactly their previous behaviour: one
 * variant, derived from `price` + `package_sizes[0]`, no selector rendered.
 */

export interface VariantSource {
  id: string;
  price?: number;
  price_range?: string;
  package_sizes?: string[];
  promo?: { discount_pct?: number } | null;
  variants?: { size: string; price: number; compare_at_price?: number }[] | null;
}

export interface ProductVariant {
  /** Stable per-variant identifier; also the cart line key. */
  sku: string;
  /** Human label exactly as it should be shown, e.g. "1 × 10 mg vial". */
  size: string;
  /** Price actually charged, after any active promo. */
  price: number;
  /** Pre-promo price, when it differs — drives the struck-through figure. */
  compareAtPrice?: number;
}

/** Round to cents; float arithmetic otherwise leaks 0.1 + 0.2 artefacts. */
function money(value: number): number {
  return Math.round(value * 100) / 100;
}

/** "€115 per pack" → 115. */
function extractPrice(priceRange: string | undefined): number | null {
  const match = priceRange?.match(/[\d,]+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0].replace(',', ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function applyPromo(price: number, promo: VariantSource['promo']): number {
  const discount = promo?.discount_pct;
  if (typeof discount === 'number' && discount > 0 && discount <= 95) {
    return money((price * (100 - discount)) / 100);
  }
  return money(price);
}

/**
 * Deterministic per-variant SKU.
 *
 * Derived from the size label rather than an array index so reordering the
 * frontmatter cannot silently repoint a customer's saved cart line at a
 * different vial.
 */
export function variantSku(productId: string, size: string): string {
  const suffix = size
    .toLowerCase()
    .replace(/[×x]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return suffix ? `${productId}--${suffix}` : productId;
}

/** Every purchasable variant, cheapest first. Empty when nothing is priced. */
export function variantsFor(data: VariantSource): ProductVariant[] {
  const declared = data.variants ?? [];

  interface Row { size: string; base: number | null; compareAt?: number }
  const rows: Row[] = declared.length
    ? declared.map((variant) => ({
        size: variant.size,
        base: variant.price,
        compareAt: variant.compare_at_price,
      }))
    : [{
        size: data.package_sizes?.[0] ?? 'Standard',
        base: typeof data.price === 'number' ? data.price : extractPrice(data.price_range),
      }];

  return rows
    .filter((row): row is Row & { base: number } =>
      typeof row.base === 'number' && Number.isFinite(row.base) && row.base > 0)
    .map((row) => {
      const price = applyPromo(row.base, data.promo);
      // A promo already produces a strike-through reference; an explicit
      // compare_at_price only shows when it is genuinely higher.
      const compareAt = price < row.base
        ? row.base
        : (row.compareAt && row.compareAt > price ? row.compareAt : undefined);
      return {
        sku: variantSku(data.id, row.size),
        size: row.size,
        price,
        ...(compareAt ? { compareAtPrice: money(compareAt) } : {}),
      };
    })
    .sort((a, b) => a.price - b.price);
}

/**
 * Resolve the variant a request refers to.
 *
 * Accepts a variant SKU, a size label, or nothing (meaning "the default", the
 * cheapest variant). Returns `null` for a size that does not exist — callers
 * must treat that as a rejected order line, never as a reason to pick another
 * price.
 */
export function resolveVariant(
  data: VariantSource,
  requested: string | undefined | null,
): ProductVariant | null {
  const variants = variantsFor(data);
  if (variants.length === 0) return null;

  const key = String(requested ?? '').trim();
  // 'Standard' is what the checkout sends for a line with no size chosen; it
  // predates variants and must keep meaning "the default one".
  if (!key || key.toLowerCase() === 'standard') return variants[0];

  return (
    variants.find((variant) => variant.sku === key) ??
    variants.find((variant) => variant.size === key) ??
    variants.find((variant) => variant.size.toLowerCase() === key.toLowerCase()) ??
    null
  );
}

/** Cheapest and dearest variant price, for "from €X" and AggregateOffer. */
export function priceRangeFor(variants: ProductVariant[]): { low: number; high: number } | null {
  if (variants.length === 0) return null;
  return { low: variants[0].price, high: variants[variants.length - 1].price };
}
