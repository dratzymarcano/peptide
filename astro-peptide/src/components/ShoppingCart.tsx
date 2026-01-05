import { useStore } from '@nanostores/react';
import { cartItems, deleteCartItem, updateCartItemQuantity, cartTotal } from '../scripts/cartStore';

// Free delivery threshold
const FREE_DELIVERY_THRESHOLD = 500;

export default function ShoppingCart() {
  const $cartItems = useStore(cartItems);
  const $cartTotal = useStore(cartTotal);
  const products = Object.values($cartItems);
  
  // Products can only be added to cart after meeting £200 threshold at product page
  // So if there are products in cart, user has already qualified
  const hasProducts = products.length > 0;
  const qualifiesForFreeDelivery = $cartTotal >= FREE_DELIVERY_THRESHOLD;

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
  };

  const productCardStyle: React.CSSProperties = {
    ...cardStyle,
    padding: '24px',
    marginBottom: '16px',
    transition: 'all 0.3s ease',
  };

  return (
    <div className="container">
      {/* Order Status Banner */}
      {hasProducts && (
        <div style={{ 
          ...cardStyle, 
          padding: '24px 32px', 
          marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
          border: '2px solid rgba(16, 185, 129, 0.3)',
        }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ marginRight: '12px' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div>
                <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '16px' }}>
                  ✓ Ready to checkout
                </div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>
                  {qualifiesForFreeDelivery ? 'FREE delivery included!' : `Add £${(FREE_DELIVERY_THRESHOLD - $cartTotal).toFixed(2)} more for FREE delivery`}
                </div>
              </div>
            </div>
            <div style={{ 
              background: '#10b981', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '14px'
            }}>
              £{$cartTotal.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {/* Cart Items Column */}
        <div className="col-12 col-lg-8">
          {products.length === 0 ? (
            <div style={{ ...cardStyle, padding: '80px 40px', textAlign: 'center' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px'
              }}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5">
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
              </div>
              <h3 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '12px', fontSize: '1.75rem' }}>
                Your cart is empty
              </h3>
              <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 32px' }}>
                Explore our premium research peptides with ≥99% purity and comprehensive COA documentation.
              </p>
              <a 
                href="/shop/" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Browse Peptides
              </a>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ color: '#1e293b', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                  Cart Items
                </h4>
                <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
                  {products.length} {products.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {products.map((product) => (
                <div 
                  key={product.id} 
                  style={productCardStyle}
                  className="cart-item-card"
                >
                  <div className="d-flex align-items-start">
                    {/* Product Image */}
                    <div style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '12px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src={product.thumb_src} 
                        alt={product.thumb_alt} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div style={{ flex: 1, marginLeft: '20px' }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 style={{ 
                            color: '#1e293b', 
                            fontWeight: '700', 
                            marginBottom: '6px',
                            fontSize: '1.1rem'
                          }}>
                            {product.title}
                          </h5>
                          {product.size && (
                            <span style={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: 'rgba(0, 119, 182, 0.1)',
                              color: '#0077b6',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              fontWeight: '600',
                              marginBottom: '8px'
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                              </svg>
                              {product.size}
                            </span>
                          )}
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            color: '#10b981',
                            fontSize: '13px',
                            fontWeight: '600',
                            marginTop: '8px'
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            In Stock • Fast UK Delivery
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            color: '#0077b6', 
                            fontWeight: '800', 
                            fontSize: '1.35rem'
                          }}>
                            £{(product.price * product.quantity).toFixed(2)}
                          </div>
                          {product.quantity > 1 && (
                            <div style={{ color: '#64748b', fontSize: '13px' }}>
                              £{product.price.toFixed(2)} each
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="d-flex align-items-center justify-content-between" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                        <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                          <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Quantity:</span>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            background: '#f8fafc',
                            borderRadius: '10px',
                            border: '2px solid #e2e8f0',
                            overflow: 'hidden'
                          }}>
                            <button
                              onClick={() => product.quantity > 1 && updateCartItemQuantity(product.id, product.quantity - 1)}
                              style={{
                                width: '36px',
                                height: '36px',
                                border: 'none',
                                background: 'transparent',
                                cursor: product.quantity > 1 ? 'pointer' : 'not-allowed',
                                color: product.quantity > 1 ? '#0077b6' : '#cbd5e1',
                                fontWeight: '700',
                                fontSize: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              disabled={product.quantity <= 1}
                            >
                              −
                            </button>
                            <span style={{ 
                              width: '48px', 
                              textAlign: 'center', 
                              fontWeight: '700',
                              color: '#1e293b',
                              fontSize: '15px'
                            }}>
                              {product.quantity}
                            </span>
                            <button
                              onClick={() => updateCartItemQuantity(product.id, product.quantity + 1)}
                              style={{
                                width: '36px',
                                height: '36px',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                color: '#0077b6',
                                fontWeight: '700',
                                fontSize: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteCartItem(product.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <a 
                href="/shop/" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#0077b6',
                  fontWeight: '600',
                  textDecoration: 'none',
                  marginTop: '16px',
                  padding: '12px 0'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                Continue Shopping
              </a>
            </>
          )}
        </div>
        
        {/* Order Summary Column */}
        {products.length > 0 && (
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <div style={{ position: 'sticky', top: '100px' }}>
              {/* Order Summary Card */}
              <div style={{ ...cardStyle, padding: '28px' }}>
                <h5 style={{ 
                  color: '#1e293b', 
                  fontWeight: '700', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '1.25rem'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                    <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z"></path>
                    <path d="M6 9.01V9"></path>
                    <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"></path>
                  </svg>
                  Order Summary
                </h5>
                
                <div style={{ marginBottom: '20px' }}>
                  <div className="d-flex justify-content-between" style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#64748b' }}>Subtotal ({products.length} {products.length === 1 ? 'item' : 'items'})</span>
                    <span style={{ color: '#1e293b', fontWeight: '600' }}>£{$cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between" style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#64748b' }}>Shipping</span>
                    {qualifiesForFreeDelivery ? (
                      <span style={{ color: '#10b981', fontWeight: '600' }}>FREE</span>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '14px' }}>Calculated at checkout</span>
                    )}
                  </div>

                  {/* Discounts already applied notice */}
                  <div className="d-flex justify-content-between" style={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    padding: '10px 12px', 
                    borderRadius: '8px',
                    marginTop: '12px'
                  }}>
                    <span style={{ color: '#059669', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Bulk Discounts Applied
                    </span>
                    <span style={{ color: '#059669', fontWeight: '700' }}>✓</span>
                  </div>
                </div>
                
                <div style={{ 
                  borderTop: '2px solid #f1f5f9', 
                  paddingTop: '20px', 
                  marginBottom: '24px' 
                }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ color: '#1e293b', fontWeight: '700', fontSize: '1.1rem' }}>Total</span>
                    <span style={{ 
                      color: '#0077b6', 
                      fontWeight: '800', 
                      fontSize: '1.5rem'
                    }}>
                      £{$cartTotal.toFixed(2)}
                    </span>
                  </div>
                  {qualifiesForFreeDelivery && (
                    <div style={{ textAlign: 'right', marginTop: '4px' }}>
                      <span style={{ 
                        color: '#10b981',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        + FREE Delivery
                      </span>
                    </div>
                  )}
                </div>
                
                <a 
                  href="/checkout/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                    color: 'white',
                    padding: '18px 24px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Proceed to Checkout
                </a>
                
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: '#64748b',
                  fontSize: '13px'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Secure SSL encrypted checkout
                </div>
              </div>

              {/* Delivery Info Card */}
              <div style={{ ...cardStyle, padding: '24px', marginTop: '16px' }}>
                <h6 style={{ 
                  color: '#1e293b', 
                  fontWeight: '700', 
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                    <path d="M15 18H9"></path>
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                    <circle cx="17" cy="18" r="2"></circle>
                    <circle cx="7" cy="18" r="2"></circle>
                  </svg>
                  UK Delivery Options
                </h6>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>Standard Delivery</div>
                    <div style={{ color: '#64748b', fontSize: '13px' }}>3-5 business days</div>
                  </div>
                  <div style={{ fontWeight: '700', color: '#0077b6' }}>£5.99</div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.05), rgba(0, 150, 199, 0.05))',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 119, 182, 0.15)'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Express Delivery
                      <span style={{ 
                        background: '#0077b6', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '10px',
                        fontSize: '10px',
                        fontWeight: '700'
                      }}>FAST</span>
                    </div>
                    <div style={{ color: '#64748b', fontSize: '13px' }}>1-2 business days</div>
                  </div>
                  <div style={{ fontWeight: '700', color: '#0077b6' }}>£12.99</div>
                </div>
                {/* Free delivery note */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: qualifiesForFreeDelivery 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))'
                    : '#f8fafc',
                  borderRadius: '8px',
                  marginTop: '10px',
                  border: qualifiesForFreeDelivery ? '1px solid rgba(16, 185, 129, 0.3)' : 'none'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: qualifiesForFreeDelivery ? '#059669' : '#64748b', fontSize: '14px' }}>
                      Orders over £{FREE_DELIVERY_THRESHOLD}
                    </div>
                  </div>
                  <div style={{ fontWeight: '700', color: '#10b981' }}>FREE</div>
                </div>
              </div>

              {/* Trust Badges */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '12px',
                marginTop: '16px'
              }}>
                <div style={{ 
                  ...cardStyle, 
                  padding: '16px 12px', 
                  textAlign: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" style={{ marginBottom: '8px' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <div style={{ color: '#1e293b', fontWeight: '600', fontSize: '11px' }}>Secure</div>
                </div>
                <div style={{ 
                  ...cardStyle, 
                  padding: '16px 12px', 
                  textAlign: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ marginBottom: '8px' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <div style={{ color: '#1e293b', fontWeight: '600', fontSize: '11px' }}>≥99% Pure</div>
                </div>
                <div style={{ 
                  ...cardStyle, 
                  padding: '16px 12px', 
                  textAlign: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" style={{ marginBottom: '8px' }}>
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                    <path d="M15 18H9"></path>
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                    <circle cx="17" cy="18" r="2"></circle>
                    <circle cx="7" cy="18" r="2"></circle>
                  </svg>
                  <div style={{ color: '#1e293b', fontWeight: '600', fontSize: '11px' }}>Fast UK</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        /* Mobile First Cart Styles */
        @media (max-width: 991px) {
          .cart-item-card .d-flex.align-items-start {
            flex-direction: column !important;
          }
          
          .cart-item-card .d-flex.align-items-start > div:first-child {
            width: 100% !important;
            height: 140px !important;
            margin-bottom: 16px;
          }
          
          .cart-item-card .d-flex.align-items-start > div:last-child {
            margin-left: 0 !important;
            width: 100%;
          }
          
          .cart-item-card .d-flex.justify-content-between.align-items-start {
            flex-direction: column;
          }
          
          .cart-item-card .d-flex.justify-content-between.align-items-start > div:last-child {
            margin-top: 12px;
            text-align: left !important;
          }
        }
        
        @media (max-width: 767px) {
          .container > .d-flex.align-items-center.justify-content-between.mb-3 {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px;
          }
          
          .cart-item-card .d-flex.align-items-center.justify-content-between {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
        
        @media (max-width: 575px) {
          .cart-item-card {
            padding: 16px !important;
          }
          
          .cart-item-card .d-flex.align-items-start > div:first-child {
            height: 120px !important;
          }
        }
      `}</style>
    </div>
  );
}
