import { useState } from 'react';
import { addCartItem } from '../scripts/cartStore';

interface ProductOptionsProps {
  id: string;
  title: string;
  basePrice: number;
  packageSizes: string[];
  moq: number;
  image: string;
  category: string;
}

// Global minimum order threshold
const MIN_ORDER_THRESHOLD = 200;
// Free delivery threshold
const FREE_DELIVERY_THRESHOLD = 500;

// Variable discount based on total order value
const getDiscountPercent = (orderTotal: number): number => {
  if (orderTotal >= 1000) return 15; // Large orders: 15% off
  if (orderTotal >= 500) return 12;  // Medium orders: 12% off
  if (orderTotal >= 300) return 10;  // Standard orders: 10% off
  if (orderTotal >= 200) return 8;   // Minimum orders: 8% off
  return 0; // Below threshold: no discount
};

// Pack options - 1 to 5 packs
const PACK_OPTIONS = [1, 2, 3, 4, 5];

// Determine unit label based on package size string
const getPackLabel = (packageSize: string): string => {
  const sizeLower = packageSize.toLowerCase();
  if (sizeLower.includes('vial')) return 'pack';
  if (sizeLower.includes('cap')) return 'bottle';
  if (sizeLower.includes('month')) return 'month';
  if (sizeLower.includes('powder')) return 'unit';
  return 'pack';
};

// Extract unit count from package size string (e.g., "10 × 5 mg vials" -> 10)
const getUnitCount = (packageSize: string): number | null => {
  const sizeLower = packageSize.toLowerCase();
  // Match patterns like "10 × 5 mg vials" or "10 x 5mg vials" or "30 caps"
  const match = sizeLower.match(/^(\d+)\s*[×x]?\s*/i);
  if (match) {
    const count = parseInt(match[1], 10);
    if (count > 1) return count;
  }
  return null;
};

// Get unit name from package size (vial, capsule, etc.)
const getUnitName = (packageSize: string): string => {
  const sizeLower = packageSize.toLowerCase();
  if (sizeLower.includes('vial')) return 'vial';
  if (sizeLower.includes('cap')) return 'capsule';
  if (sizeLower.includes('powder')) return 'unit';
  return 'unit';
};

export default function ProductOptions({ id, title, basePrice, packageSizes, image }: ProductOptionsProps) {
  // Pack quantity (1-5 packs)
  const [packQuantity, setPackQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  // The price per pack is the basePrice (what's shown on the card)
  const pricePerPack = basePrice;
  
  // Get the pack/unit description from packageSizes
  const packageDescription = packageSizes[0] || '1 pack';
  const packLabel = getPackLabel(packageDescription);
  
  // Calculate per-unit price if applicable (e.g., per vial)
  const unitCount = getUnitCount(packageDescription);
  const unitName = getUnitName(packageDescription);
  const pricePerUnit = unitCount ? pricePerPack / unitCount : null;
  
  // Calculate totals
  const subtotal = pricePerPack * packQuantity;
  
  // Check if meets minimum order threshold
  const meetsThreshold = subtotal >= MIN_ORDER_THRESHOLD;
  
  // Get discount based on order total
  const discountPercent = getDiscountPercent(subtotal);
  const discountAmount = meetsThreshold ? Math.round(subtotal * discountPercent) / 100 : 0;
  const totalPrice = subtotal - discountAmount;
  
  // Calculate discounted price per pack for display
  const discountedPricePerPack = meetsThreshold 
    ? Math.round((pricePerPack * (100 - discountPercent)) / 100 * 100) / 100
    : pricePerPack;
  
  // Free delivery eligibility
  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  
  // Calculate how many packs needed to meet £200 minimum
  const minPacksForThreshold = Math.ceil(MIN_ORDER_THRESHOLD / pricePerPack);
  const packsNeededForMinimum = Math.max(0, minPacksForThreshold - packQuantity);
  
  const handleAddToCart = () => {
    // Check minimum order threshold
    if (!meetsThreshold) {
      alert(`Minimum purchase of £${MIN_ORDER_THRESHOLD} required. Please add ${packsNeededForMinimum} more ${packLabel}(s).`);
      return;
    }
    
    addCartItem({
      id: `${id}-pack-${packQuantity}`,
      title: `${title} (${packQuantity}x ${packageDescription})`,
      price: discountedPricePerPack,
      thumb_src: image,
      thumb_alt: title,
      size: `${packQuantity}x ${packageDescription}`,
      quantity: packQuantity
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-options">
      {/* Price Display */}
      <div className="price-display mb-4 p-4 rounded" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd' }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">Price per {packLabel}:</span>
          <div className="text-right">
            {meetsThreshold && discountPercent > 0 && (
              <span className="text-muted text-decoration-line-through mr-2" style={{ fontSize: '0.9rem' }}>£{pricePerPack.toFixed(0)}</span>
            )}
            <span className="font-weight-bold text-primary" style={{ fontSize: '1.5rem' }}>
              £{meetsThreshold ? discountedPricePerPack.toFixed(0) : pricePerPack.toFixed(0)}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="small text-muted">
            {packageDescription}
          </span>
          {pricePerUnit && (
            <span className="small" style={{ color: '#64748b' }}>
              (£{pricePerUnit.toFixed(2)} per {unitName})
            </span>
          )}
        </div>
      </div>
      
      {/* Discount Banner */}
      <div className="discount-banner mb-4 p-3 rounded" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
        <div className="d-flex align-items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" x2="7.01" y1="7" y2="7"></line>
          </svg>
          <span className="font-weight-bold">
            Up to 15% OFF + FREE delivery on orders £{FREE_DELIVERY_THRESHOLD}+
          </span>
        </div>
      </div>

      {/* Pack Quantity Selector */}
      <div className="option-group mb-4">
        <label className="option-label font-weight-bold mb-3 d-block">
          Select Quantity:
        </label>
        <div className="pack-options d-flex flex-wrap" style={{ gap: '8px' }}>
          {PACK_OPTIONS.map((qty) => {
            const packTotal = pricePerPack * qty;
            const packDiscount = getDiscountPercent(packTotal);
            const packMeetsThreshold = packTotal >= MIN_ORDER_THRESHOLD;
            const packFinalPrice = packMeetsThreshold 
              ? Math.round(packTotal * (100 - packDiscount)) / 100
              : packTotal;
            
            return (
              <button
                key={qty}
                className={`pack-btn ${packQuantity === qty ? 'active' : ''}`}
                onClick={() => setPackQuantity(qty)}
                style={{
                  flex: '1 1 calc(20% - 8px)',
                  minWidth: '90px',
                  padding: '12px 8px',
                  border: packQuantity === qty ? '2px solid #0077b6' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  background: packQuantity === qty ? 'rgba(0, 119, 182, 0.1)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <div className="pack-qty font-weight-bold" style={{ fontSize: '1rem', color: '#1e293b' }}>
                  {qty} {packLabel}{qty > 1 ? 's' : ''}
                </div>
                <div className="pack-price" style={{ color: packMeetsThreshold ? '#0077b6' : '#64748b', fontWeight: '600' }}>
                  £{packFinalPrice.toFixed(0)}
                </div>
                {packMeetsThreshold && packDiscount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#10b981',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '10px'
                  }}>
                    {packDiscount}% OFF
                  </span>
                )}
                {!packMeetsThreshold && (
                  <div className="small text-danger mt-1" style={{ fontSize: '10px' }}>
                    Below £{MIN_ORDER_THRESHOLD} min
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="order-summary mb-4 p-4 rounded" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <h6 className="font-weight-bold mb-3" style={{ color: '#1e293b' }}>Order Summary</h6>
        
        {/* Subtotal */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">{packQuantity}x {packageDescription}</span>
          <span className={meetsThreshold && discountPercent > 0 ? 'text-muted text-decoration-line-through' : 'font-weight-bold'}>
            £{subtotal.toFixed(2)}
          </span>
        </div>
        
        {/* Discount */}
        {meetsThreshold && discountPercent > 0 && (
          <div className="d-flex justify-content-between align-items-center mb-2" style={{ color: '#10b981' }}>
            <span className="d-flex align-items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              </svg>
              {discountPercent}% Discount
            </span>
            <span className="font-weight-bold">-£{discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        {/* Free Delivery */}
        {qualifiesForFreeDelivery && (
          <div className="d-flex justify-content-between align-items-center mb-2" style={{ color: '#10b981' }}>
            <span className="d-flex align-items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              FREE Delivery
            </span>
            <span className="font-weight-bold">£0.00</span>
          </div>
        )}
        
        {/* Total */}
        <div className="d-flex justify-content-between align-items-center pt-3 mt-2" style={{ borderTop: '2px solid #e2e8f0' }}>
          <span className="font-weight-bold" style={{ fontSize: '1.1rem', color: '#1e293b' }}>Total</span>
          <span className="font-weight-bold text-primary" style={{ fontSize: '1.5rem' }}>
            £{totalPrice.toFixed(2)}
          </span>
        </div>
        
        {/* Savings Badge */}
        {meetsThreshold && discountAmount > 0 && (
          <div className="text-center mt-3">
            <span className="badge" style={{ background: '#10b981', color: 'white', padding: '8px 16px', fontSize: '0.85rem' }}>
              🎉 You save £{discountAmount.toFixed(2)}!
            </span>
            {qualifiesForFreeDelivery && (
              <span className="badge ml-2" style={{ background: '#3b82f6', color: 'white', padding: '8px 16px', fontSize: '0.85rem' }}>
                + FREE Delivery
              </span>
            )}
          </div>
        )}
        
        {/* Below Threshold Warning */}
        {!meetsThreshold && (
          <div className="mt-3 p-2 rounded text-center" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1" style={{ display: 'inline' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
            <span className="small font-weight-bold">
              Add {packsNeededForMinimum} more {packLabel}(s) to reach £{MIN_ORDER_THRESHOLD} minimum
            </span>
          </div>
        )}
      </div>
      
      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className={`btn ${added ? 'btn-success' : meetsThreshold ? 'btn-main' : 'btn-secondary'} w-100 d-flex align-items-center justify-content-center py-3`}
        disabled={added || !meetsThreshold}
        style={{
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '700',
          opacity: meetsThreshold ? 1 : 0.6
        }}
      >
        {added ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Added to Cart!
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {meetsThreshold ? 'Add to Cart' : `Minimum £${MIN_ORDER_THRESHOLD} Required`}
          </>
        )}
      </button>
      
      {/* Trust Badges */}
      <div className="trust-badges mt-4 p-3 rounded" style={{ background: '#f8fafc' }}>
        <div className="d-flex flex-wrap justify-content-center" style={{ gap: '12px' }}>
          <span className="d-flex align-items-center small" style={{ color: '#64748b' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="mr-1">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            ≥99% Purity
          </span>
          <span className="d-flex align-items-center small" style={{ color: '#64748b' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="mr-1">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            COA Included
          </span>
          <span className="d-flex align-items-center small" style={{ color: '#64748b' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="mr-1">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Fast UK Delivery
          </span>
        </div>
      </div>
      
      <style>{`
        .product-options {
          font-family: inherit;
        }
        
        .pack-btn:hover {
          border-color: #0077b6 !important;
          background: rgba(0, 119, 182, 0.05) !important;
        }
        
        .pack-btn.active {
          box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.2);
        }
        
        .text-decoration-line-through {
          text-decoration: line-through;
        }
        
        .btn-main {
          background: #0077b6;
          border: none;
          color: white;
        }
        
        .btn-main:hover:not(:disabled) {
          background: #023e8a;
          color: white;
        }
        
        @media (max-width: 576px) {
          .pack-btn {
            flex: 1 1 calc(50% - 8px) !important;
            min-width: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
