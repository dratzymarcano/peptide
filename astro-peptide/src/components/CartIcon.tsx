import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { cartItems, isCartOpen } from '../scripts/cartStore';

interface CartIconProps {
  label?: string;
}

export default function CartIcon({ label = 'Open cart' }: CartIconProps) {
  const $cartItems = useStore(cartItems);
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = isMounted ? Object.values($cartItems).reduce((total, item) => total + item.quantity, 0) : 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <button className="header-icon-btn cart-icon-btn" type="button" onClick={() => isCartOpen.set(true)} aria-label={label}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 16h9.72a2 2 0 0 0 1.96-1.61L23 6H6" />
      </svg>
      <span className="cart-count-badge">{totalItems}</span>
    </button>
  );
}