import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen, removeCartItem, updateQuantity, cartTotal } from '../scripts/cartStore';
import { getLocalizedPath, t, type SupportedLanguage } from '../i18n/translations';
import { currentCurrency, exchangeRate, formatPrice } from '../store/currencyStore';

interface CartModalProps {
  lang?: SupportedLanguage;
}

export default function CartModal({ lang = 'en' }: CartModalProps) {
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);
  const $cartTotal = useStore(cartTotal);
  const currency = useStore(currentCurrency);
  useStore(exchangeRate);
  
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10010]"
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10010 }}
      />
      
      {/* Modal - Mobile Bottom Sheet / Desktop Side Drawer */}
      <style>{`
          /* Mobile First - Bottom Sheet on mobile, Side Drawer on desktop */
          .cart-modal-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 90vh;
            max-height: 90vh;
            border-radius: 20px 20px 0 0;
            transform: translateY(0);
            animation: slideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1);
            box-shadow: 0 -10px 50px rgba(0,0,0,0.2);
          }
          
          /* Drag handle for mobile bottom sheet */
          .cart-modal-container::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background: #cbd5e1;
            border-radius: 2px;
          }
          
          .cart-header {
            padding: 24px 20px 16px;
          }
          
          .cart-items {
            padding: 12px 20px;
          }
          
          .cart-footer {
            padding: 20px;
            padding-bottom: max(20px, env(safe-area-inset-bottom));
          }
          
          @media (min-width: 768px) {
            .cart-modal-container {
              top: 0;
              right: 0;
              bottom: 0;
              left: auto;
              height: 100vh;
              max-height: 100vh;
              width: 100%;
              max-width: 420px;
              border-radius: 0;
              animation: slideLeft 0.35s cubic-bezier(0.22, 1, 0.36, 1);
              box-shadow: -10px 0 50px rgba(0,0,0,0.15);
            }
            
            .cart-modal-container::before {
              display: none;
            }
            
            .cart-header {
              padding: 20px 24px 16px;
            }
            
            .cart-items {
              padding: 16px 24px;
            }
            
            .cart-footer {
              padding: 24px;
            }
          }
          
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          
          @keyframes slideLeft {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          
          /* Touch-friendly quantity controls */
          .qty-btn {
            width: 36px;
            height: 36px;
            min-width: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 500;
            -webkit-tap-highlight-color: transparent;
          }
          
          .qty-btn:active {
            background: #f1f5f9;
          }
          
          @media (min-width: 768px) {
            .qty-btn {
              width: 32px;
              height: 32px;
              min-width: 32px;
            }
          }
        `}</style>
        
        <div className="cart-modal-container fixed z-[10011] bg-white flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-slate-800 m-0">
            {t(lang, 'cart.yourCartCount').replace('{count}', String(items.length))}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 -mr-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50"
            aria-label={t(lang, 'cart.closeCart')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {isEmpty ? (
            <div className="text-center py-10 text-slate-500">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" className="mx-auto mb-4" style={{display:'block', margin:'0 auto 16px'}}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p className="font-medium text-lg mb-2">{t(lang, 'cart.empty')}</p>
              <p className="text-sm mb-6">{t(lang, 'cart.addProductsToGetStarted')}</p>
              <a 
                href={getLocalizedPath('/peptides/', lang)}
                onClick={handleClose}
                className="inline-block py-3 px-6 bg-[#0077b6] text-white font-semibold rounded-lg hover:bg-[#023e8a] no-underline"
                style={{ backgroundColor: '#0077b6', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}
              >
                {t(lang, 'cart.browseProducts')}
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                  style={{ display: 'flex', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}
                >
                  <img 
                    src={item.thumb_src} 
                    alt={item.title}
                    className="w-[70px] h-[70px] object-cover rounded-lg bg-white"
                     style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/peptide-default.jpg';
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1" style={{ flex: 1 }}>
                    <div>
                        <div className="flex justify-between items-start gap-2">
                           <h4 className="m-0 text-sm font-bold text-slate-800 leading-tight" style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>
                                {item.title}
                           </h4>
                           <button 
                                onClick={() => removeCartItem(item.id)}
                                className="text-slate-400 hover:text-red-500 p-0"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                aria-label="Remove item"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mt-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '8px' }}>
                      <p className="m-0 font-bold text-[#0077b6]" style={{ color: '#0077b6', margin: 0 }}>
                        {formatPrice(item.price, currency)}
                      </p>
                      
                      <div className="flex items-center bg-white border border-slate-200 rounded-lg h-8" style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                          style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-slate-800" style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                          style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="p-4 border-t border-gray-100 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]" style={{ padding: '16px', borderTop: '1px solid #f1f5f9', paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
             {/* Subtotal */}
            <div className="flex justify-between items-end mb-1" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span className="text-slate-600 font-medium">{t(lang, 'cart.subtotal')}</span>
              <span className="text-xl font-bold text-slate-900">{formatPrice($cartTotal, currency)}</span>
            </div>
            
             {/* Shipping Note */}
            <div className="text-xs text-slate-400 mb-4 text-right" style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'right', marginBottom: '16px' }}>
              Shipping & taxes calculated at checkout
            </div>

            <div className="flex flex-col gap-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a 
                href={getLocalizedPath('/checkout/', lang)}
                onClick={handleClose}
                className="w-full py-3 bg-[#0077b6] text-white font-bold text-center rounded-xl hover:bg-[#023e8a] transition-all no-underline"
                style={{ display: 'block', width: '100%', padding: '14px', backgroundColor: '#0077b6', color: 'white', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}
                >
                {t(lang, 'cart.checkout')}
                </a>
                
                <button 
                onClick={handleClose}
                className="w-full py-2 text-slate-500 font-medium text-sm hover:text-slate-800"
                style={{ width: '100%', background: 'none', border: 'none', padding: '8px', color: '#64748b', cursor: 'pointer' }}
                >
                  Continue Shopping
                </button>
            </div>
          </div>
        )}
        </div>
    </>
  );
}
