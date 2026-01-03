import { map, atom } from 'nanostores';

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  priceRange: string;
  slug: string;
}

export const cartItems = map<Record<string, CartItem>>({});
export const isCartOpen = atom<boolean>(false);

export function addCartItem(item: CartItem) {
  const existing = cartItems.get()[item.id];
  if (existing) {
    cartItems.setKey(item.id, { ...existing, quantity: existing.quantity + item.quantity });
  } else {
    cartItems.setKey(item.id, item);
  }
  isCartOpen.set(true);
}

export function removeCartItem(id: string) {
  const current = cartItems.get();
  const { [id]: removed, ...rest } = current;
  cartItems.set(rest);
}

export function updateCartItemQuantity(id: string, quantity: number) {
  const existing = cartItems.get()[id];
  if (existing) {
    if (quantity <= 0) {
      removeCartItem(id);
    } else {
      cartItems.setKey(id, { ...existing, quantity });
    }
  }
}

export function clearCart() {
  cartItems.set({});
}
