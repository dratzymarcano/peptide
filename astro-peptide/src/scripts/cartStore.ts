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
}

export interface CartItem extends Product {
  quantity: number;
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
  const existing = cartItems.get()[product.id];
  if (existing) {
    cartItems.setKey(product.id, { ...existing, quantity: existing.quantity + quantityToAdd });
  } else {
    cartItems.setKey(product.id, { ...product, quantity: quantityToAdd });
  }
  saveToLocalStorage();
  // Show notification
  cartNotification.set(product);
}

export function removeCartItem(id: string) {
  const newItems = { ...cartItems.get() };
  delete newItems[id];
  cartItems.set(newItems);
  saveToLocalStorage();
}

export function updateQuantity(id: string, quantity: number) {
  const existing = cartItems.get()[id];
  if (existing) {
    if (quantity <= 0) {
      removeCartItem(id);
    } else {
      cartItems.setKey(id, { ...existing, quantity });
      saveToLocalStorage();
    }
  }
}

export function deleteCartItem(id: string) {
  const newItems = { ...cartItems.get() };
  delete newItems[id];
  cartItems.set(newItems);
  saveToLocalStorage();
}

export function updateCartItemQuantity(id: string, quantity: number) {
  const existing = cartItems.get()[id];
  if (existing) {
    if (quantity <= 0) {
      deleteCartItem(id);
    } else {
      cartItems.setKey(id, { ...existing, quantity });
      saveToLocalStorage();
    }
  }
}

export function clearCart() {
  cartItems.set({});
  saveToLocalStorage();
}
