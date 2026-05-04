/**
 * Runtime overrides for product data — lets price / availability updates
 * propagate to every <ProductCard> instance on the page without a rebuild.
 *
 * Pages render the SSR (build-time) values from the content collection.
 * Any client (admin panel, inventory poll, websocket) can call
 * `setProductOverride(id, { price, availability })` and every
 * <ProductLivePrice id={id} /> mounted on the page will re-render.
 */
import { map } from 'nanostores';
import type { Availability } from '../lib/product';

export interface ProductOverride {
  price?: number;
  compareAtPrice?: number;
  availability?: Availability;
  promoLabel?: string;
}

export const productOverrides = map<Record<string, ProductOverride>>({});

export function setProductOverride(id: string, patch: ProductOverride) {
  productOverrides.setKey(id, { ...productOverrides.get()[id], ...patch });
}

export function clearProductOverride(id: string) {
  const next = { ...productOverrides.get() };
  delete next[id];
  productOverrides.set(next);
}

/** Optional: hydrate from a single fetch (e.g. /api/inventory). */
export async function refreshFromEndpoint(url: string) {
  if (typeof window === 'undefined') return;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return;
    const data = (await res.json()) as Record<string, ProductOverride>;
    productOverrides.set({ ...productOverrides.get(), ...data });
  } catch {
    /* network errors are non-fatal — SSR values remain visible */
  }
}
