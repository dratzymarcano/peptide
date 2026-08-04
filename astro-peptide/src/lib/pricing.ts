/**
 * Server-side pricing authority for checkout.
 *
 * The browser previously supplied `unitPrice`, `subtotal` and `total` in the
 * order payload and the API stored them verbatim, so a crafted POST could book
 * an order at any price it liked while still clearing the €200 minimum. Prices
 * are now looked up from the product collection here and the client's figures
 * are used only to detect a mismatch.
 *
 * Keep the constants in sync with src/components/Checkout.tsx — that component
 * renders the same numbers, but this module is what the order is billed on.
 */
import { getCanonicalCollection } from './collections';

export const MIN_ORDER_AMOUNT = 200;
export const FREE_DELIVERY_THRESHOLD = 500;

export const SHIPPING_COSTS = {
  standard: 9.9,
  express: 19.9,
} as const;

export type ShippingMethod = keyof typeof SHIPPING_COSTS;

/** Hard ceiling per line. Guards against absurd or overflowing quantities. */
const MAX_QUANTITY_PER_ITEM = 999;

export interface RequestedItem {
  productId?: string;
  id?: string;
  slug?: string;
  variant?: string;
  quantity?: unknown;
}

export interface PricedItem {
  productId: string;
  slug: string;
  title: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  currency: string;
}

export interface PricingFailure {
  ok: false;
  code: string;
  detail?: string;
}

export interface PricingSuccess {
  ok: true;
  items: PricedItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export type PricingResult = PricingSuccess | PricingFailure;

/** Round to cents; float arithmetic otherwise leaks 0.1 + 0.2 artefacts. */
function money(value: number): number {
  return Math.round(value * 100) / 100;
}

/** "€115 per pack" → 115. Mirrors the product page's own fallback. */
function extractPrice(priceRange: string | undefined): number | null {
  const match = priceRange?.match(/[\d,]+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0].replace(',', ''));
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Authoritative unit price for a product, including any active promo — the
 * same derivation `toCardProduct` uses so the buy box and the invoice agree.
 */
function unitPriceFor(data: {
  price?: number;
  price_range?: string;
  promo?: { discount_pct?: number };
}): number | null {
  const base = typeof data.price === 'number' ? data.price : extractPrice(data.price_range);
  if (base === null || !Number.isFinite(base) || base <= 0) return null;
  const discount = data.promo?.discount_pct;
  if (typeof discount === 'number' && discount > 0 && discount <= 95) {
    return money(base * (100 - discount) / 100);
  }
  return money(base);
}

function positiveInteger(value: unknown): number | null {
  const parsed = Number(value ?? 1);
  if (!Number.isFinite(parsed)) return null;
  const rounded = Math.floor(parsed);
  if (rounded < 1 || rounded > MAX_QUANTITY_PER_ITEM) return null;
  return rounded;
}

export function shippingMethod(input: unknown): ShippingMethod {
  return input === 'express' ? 'express' : 'standard';
}

/**
 * Resolve a cart into priced line items using catalogue prices only.
 *
 * Unknown products are rejected rather than priced at zero: an order
 * referencing something not in the catalogue cannot be fulfilled anyway.
 */
export async function priceOrder(
  requested: RequestedItem[] | undefined,
  options: { currency?: string; shippingMethod?: unknown } = {},
): Promise<PricingResult> {
  const currency = (options.currency ?? 'EUR').toUpperCase();
  if (currency !== 'EUR') {
    return { ok: false, code: 'unsupported_currency', detail: currency };
  }
  if (!Array.isArray(requested) || requested.length === 0) {
    return { ok: false, code: 'empty_cart' };
  }

  const products = await getCanonicalCollection('products');
  // The cart keys items by the frontmatter `id` (e.g. "peptide-bpc-157");
  // accept the filename slug too so older carts still resolve.
  const byIdentifier = new Map<string, (typeof products)[number]>();
  for (const product of products) {
    byIdentifier.set(product.data.id, product);
    byIdentifier.set(product.id, product);
  }

  const items: PricedItem[] = [];
  for (const line of requested) {
    const identifier = String(line.productId ?? line.id ?? line.slug ?? '').trim();
    if (!identifier) return { ok: false, code: 'item_missing_identifier' };

    const product = byIdentifier.get(identifier);
    if (!product) return { ok: false, code: 'unknown_product', detail: identifier };

    const quantity = positiveInteger(line.quantity);
    if (quantity === null) return { ok: false, code: 'invalid_quantity', detail: identifier };

    const unitPrice = unitPriceFor(product.data);
    if (unitPrice === null) return { ok: false, code: 'product_not_purchasable', detail: identifier };

    items.push({
      productId: product.data.id,
      slug: product.id,
      title: product.data.title.split(' — ')[0].split(' | ')[0].trim(),
      variant: String(line.variant ?? 'Standard').trim().slice(0, 120) || 'Standard',
      quantity,
      unitPrice,
      currency,
    });
  }

  const subtotal = money(items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0));
  if (subtotal < MIN_ORDER_AMOUNT) {
    return { ok: false, code: 'minimum_order_required' };
  }

  const shipping = subtotal >= FREE_DELIVERY_THRESHOLD
    ? 0
    : SHIPPING_COSTS[shippingMethod(options.shippingMethod)];

  return { ok: true, items, subtotal, shipping, total: money(subtotal + shipping) };
}
