import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { cartNotification, clearNotification, isCartOpen } from '../scripts/cartStore';

export default function CartNotification() {
  const $notification = useStore(cartNotification);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ($notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(clearNotification, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [$notification]);

  if (!$notification) return null;

  const handleViewCart = () => {
    isCartOpen.set(true);
    clearNotification();
  };

  const handleCheckout = () => {
    clearNotification();
    window.location.href = '/checkout';
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(clearNotification, 300);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '120px',
        right: '20px',
        width: '100%',
        maxWidth: '360px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        zIndex: 10005,
        overflow: 'hidden',
        transform: isVisible ? 'translateX(0)' : 'translateX(120%)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Success header */}
      <div style={{
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #0077b6, #023e8a)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Added to Cart!</span>
        <button
          onClick={handleClose}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
          }}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Product info */}
      <div style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <img 
          src={$notification.thumb_src} 
          alt={$notification.title}
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '8px',
            background: '#f8fafc',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/peptide-default.jpg';
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ 
            margin: '0 0 4px 0', 
            fontSize: '0.9rem', 
            fontWeight: 600, 
            color: '#1e293b',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {$notification.title}
          </h4>
          <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0077b6' }}>
            £{$notification.price.toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Action buttons */}
      <div style={{ 
        padding: '0 16px 16px 16px', 
        display: 'flex', 
        gap: '10px' 
      }}>
        <button
          onClick={handleViewCart}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: 'white',
            color: '#0077b6',
            border: '2px solid #0077b6',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          View Cart
        </button>
        <button
          onClick={handleCheckout}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #0077b6, #023e8a)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
