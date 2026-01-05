import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen, removeCartItem, updateQuantity, cartTotal } from '../scripts/cartStore';

export default function CartModal() {
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);
  const $cartTotal = useStore(cartTotal);
  
  const items = Object.values($cartItems);
  const isEmpty = items.length === 0;

  if (!$isCartOpen) return null;

  const handleClose = () => {
    isCartOpen.set(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10010,
          backdropFilter: 'blur(4px)',
        }}
      />
      
      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          background: 'white',
          zIndex: 10011,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.15)',
          animation: 'slideIn 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
            Your Cart ({items.length})
          </h2>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: isEmpty ? '40px 24px' : '16px 24px',
        }}>
          {isEmpty ? (
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '8px' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.875rem' }}>Add some products to get started!</p>
              <a 
                href="/peptides/"
                onClick={handleClose}
                style={{
                  display: 'inline-block',
                  marginTop: '16px',
                  padding: '12px 24px',
                  background: '#0077b6',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Browse Products
              </a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    background: '#f8fafc',
                    borderRadius: '10px',
                  }}
                >
                  <img 
                    src={item.thumb_src} 
                    alt={item.title}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      background: 'white',
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
                      {item.title}
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 700, color: '#0077b6' }}>
                      £{item.price.toFixed(2)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        style={{
                          width: '28px',
                          height: '28px',
                          border: '1px solid #e5e7eb',
                          background: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          border: '1px solid #e5e7eb',
                          background: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeCartItem(item.id)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                        aria-label="Remove item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #e5e7eb',
            background: 'white',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <span style={{ fontSize: '1rem', color: '#64748b' }}>Subtotal</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                £{$cartTotal.toFixed(2)}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="/cart"
                onClick={handleClose}
                style={{
                  display: 'block',
                  padding: '14px 20px',
                  background: 'white',
                  color: '#0077b6',
                  border: '2px solid #0077b6',
                  borderRadius: '10px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'all 0.2s',
                }}
              >
                View Cart
              </a>
              <a
                href="/checkout"
                onClick={handleClose}
                style={{
                  display: 'block',
                  padding: '14px 20px',
                  background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                Checkout →
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
