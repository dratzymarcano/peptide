import { map } from 'nanostores';

export interface Product {
  id: string;
  title: string;
  price: number;
  thumb_src: string;
  thumb_alt: string;
  color?: string;
  size?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const cartItems = map<Record<string, CartItem>>({});

export function addCartItem(product: Product) {
  const existingEntry = cartItems.get()[product.id];
  if (existingEntry) {
    cartItems.setKey(product.id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(product.id, {
      ...product,
      quantity: 1,
    });
  }
  saveToLocalStorage();
}

export function removeCartItem(id: string) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry && existingEntry.quantity > 1) {
     cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity - 1,
    });
  } else {
     // If quantity is 1, remove it entirely? Or keep it? 
     // Usually removeCartItem implies removing one unit or the whole line item.
     // Let's make a separate delete function for full removal if needed, 
     // but for now let's assume this decrements and removes if 0.
     const newItems = { ...cartItems.get() };
     delete newItems[id];
     cartItems.set(newItems);
  }
  saveToLocalStorage();
}

export function deleteCartItem(id: string) {
    const newItems = { ...cartItems.get() };
    delete newItems[id];
    cartItems.set(newItems);
    saveToLocalStorage();
}

export function clearCart() {
  cartItems.set({});
  saveToLocalStorage();
}

const isBrowser = typeof window !== 'undefined';

function saveToLocalStorage() {
  if (isBrowser) {
    localStorage.setItem('astro-ecommerce-cart', JSON.stringify(cartItems.get()));
  }
}

// Initialize from local storage
if (isBrowser) {
  const saved = localStorage.getItem('astro-ecommerce-cart');
  if (saved) {
    cartItems.set(JSON.parse(saved));
  }
}
