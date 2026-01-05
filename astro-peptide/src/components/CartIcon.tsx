import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen } from '../scripts/cartStore';

export default function CartIcon() {
  const $cartItems = useStore(cartItems);
  const totalItems = Object.values($cartItems).reduce((acc, item) => acc + item.quantity, 0);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    isCartOpen.set(true);
  };

  return (
    <button 
      onClick={handleClick}
      className="cart-icon-btn"
      aria-label="Shopping Cart"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 12px',
        color: '#1e293b',
        background: 'none',
        border: 'none',
        borderRadius: '8px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span 
        style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          background: '#0077b6',
          color: 'white',
          fontSize: '10px',
          fontWeight: 700,
          minWidth: '18px',
          height: '18px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 4px',
        }}
      >
        {totalItems}
      </span>
    </button>
  );
}
