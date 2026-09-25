import { map, atom, computed } from 'nanostores';

export interface Product {
  id: string;
  title: string;
  price: number;
  priceRange?: string;
  thumb_src: string;
  thumb_alt: string;
  color?: string;
  size?: string;
  /**
   * Per-variant identifier from src/lib/variants.ts. Present once a product
   * offers more than one package size; absent lines fall back to `id`, which
   * keeps carts saved before variants existed working.
   */
  sku?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

/**
 * The key a line is stored under.
 *
 * Lines were keyed by product id alone, so adding the 10 mg vial of something
 * already in the cart as 5 mg merged the two into one line — at whichever
 * price got there first, and with only one size shown. The variant SKU is the
 * unit a customer actually buys, so it is the unit the cart stores.
 */
export function cartLineKey(product: Pick<Product, 'id' | 'sku'>): string {
  return product.sku || product.id;
}

export const cartItems = map<Record<string, CartItem>>({});
export const isCartOpen = atom<boolean>(false);

// Notification for when items are added
export const cartNotification = atom<Product | null>(null);

export function clearNotification() {
  cartNotification.set(null);
}

// Computed store for cart count (for badge display)
export const cartCount = computed(cartItems, items => {
  return Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
});

// Computed store for cart total
export const cartTotal = computed(cartItems, items => {
  return Object.values(items).reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

// Browser check for localStorage
const isBrowser = typeof window !== 'undefined';

function saveToLocalStorage() {
  if (isBrowser) {
    localStorage.setItem('peptide-cart', JSON.stringify(cartItems.get()));
  }
}

// Initialize from localStorage on browser load
if (isBrowser) {
  const saved = localStorage.getItem('peptide-cart');
  if (saved) {
    try {
      cartItems.set(JSON.parse(saved));
    } catch (e) {
      // If parse fails, start fresh
      cartItems.set({});
    }
  }
}

export function addCartItem(product: Product & { quantity?: number }) {
  const quantityToAdd = product.quantity || 1;
  const key = cartLineKey(product);
  const existing = cartItems.get()[key];
  if (existing) {
    cartItems.setKey(key, { ...existing, quantity: existing.quantity + quantityToAdd });
  } else {
    cartItems.setKey(key, { ...product, quantity: quantityToAdd });
  }
  saveToLocalStorage();
  // Show notification
  cartNotification.set(product);
}

function resolveItemKey(keyOrId: string): string {
  const current = cartItems.get();
  if (current[keyOrId]) return keyOrId;
  const found = Object.keys(current).find(
    (k) => k === keyOrId || current[k].sku === keyOrId || current[k].id === keyOrId
  );
  return found || keyOrId;
}

export function removeCartItem(keyOrId: string) {
  const newItems = { ...cartItems.get() };
  const key = resolveItemKey(keyOrId);
  delete newItems[key];
  cartItems.set(newItems);
  saveToLocalStorage();
}

export function updateQuantity(keyOrId: string, quantity: number) {
  const key = resolveItemKey(keyOrId);
  const existing = cartItems.get()[key];
  if (existing) {
    if (quantity <= 0) {
      removeCartItem(key);
    } else {
      cartItems.setKey(key, { ...existing, quantity });
      saveToLocalStorage();
    }
  }
}

export const deleteCartItem = removeCartItem;
export const updateCartItemQuantity = updateQuantity;

export function clearCart() {
  cartItems.set({});
  saveToLocalStorage();
}
