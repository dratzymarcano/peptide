import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { t, getLocalizedPath, type SupportedLanguage, translatePackageSize, translateCategory } from '../i18n/translations';
import { toOptimizedImage } from '../utils/images';
import { currentCurrency, exchangeRate, formatPrice } from '../store/currencyStore';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  category?: string;
  purity?: string;
  rating?: number;
  reviewCount?: number;
  packageSize?: string;
  lang?: SupportedLanguage;
  labels?: {
    viewOptions?: string;
    off?: string;
    minQuantity?: string;
  };
}

// Global minimum order threshold - must match ProductOptions
const MIN_ORDER_THRESHOLD = 200;

// Variable discount based on unit price - must match ProductOptions
const getDiscountPercent = (unitPrice: number): number => {
  if (unitPrice >= 1000) return 15; // Premium products: 15% off
  if (unitPrice >= 500) return 12;  // High-value products: 12% off
  if (unitPrice >= 250) return 10;  // Standard products: 10% off
  if (unitPrice >= 200) return 8;   // Entry products: 8% off
  return 5; // Products below threshold: 5% off when bulk ordering
};

export default function ProductCard({ id, title, price, image, slug, category, rating = 4.5, reviewCount = 121, packageSize, lang = 'en', labels }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const currency = useStore(currentCurrency);
  useStore(exchangeRate);
  
  // Slug should already be clean (e.g., "buy-semaglutide"), just ensure no double slashes
  const productUrl = getLocalizedPath(`/peptides/${slug.replace(/^\//, '')}`, lang);
  
  // Check if product is already at or above threshold
  const isAboveThreshold = price >= MIN_ORDER_THRESHOLD;
  
  // Get variable discount percentage
  const discountPercent = getDiscountPercent(price);
  
  // Calculate minimum quantity needed to reach £200 threshold
  const minQuantity = isAboveThreshold ? 1 : Math.ceil(MIN_ORDER_THRESHOLD / price);
  const minOrderTotal = price * minQuantity;
  
  // Determine unit label based on package size
  const getUnitLabel = (plural: boolean = false) => {
    if (!packageSize) return plural ? t(lang, 'product.packs') : t(lang, 'product.pack');
    const sizeLower = packageSize.toLowerCase();
    if (sizeLower.includes('vial')) return plural ? t(lang, 'product.packs') : t(lang, 'product.pack');
    if (sizeLower.includes('cap')) return plural ? t(lang, 'product.bottles') : t(lang, 'product.bottle');
    if (sizeLower.includes('powder')) return plural ? t(lang, 'product.units') : t(lang, 'product.unit');
    if (sizeLower.includes('month')) return plural ? t(lang, 'product.units') : t(lang, 'product.unit');
    return plural ? t(lang, 'product.packs') : t(lang, 'product.pack');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  // Render star rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1">
            <defs>
              <linearGradient id={`half-${id}-${i}`}>
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={`url(#half-${id}-${i})`} />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      }
    }
    return stars;
  };

  const viewOptionsLabel = labels?.viewOptions ?? t(lang, 'product.viewOptions');
  const offLabel = labels?.off ?? t(lang, 'product.off');
  const minQuantityTemplate = labels?.minQuantity ?? t(lang, 'product.minQuantity');

  const optimizedImage = toOptimizedImage(image);

  return (
    <div className="shopcart-product-card">
      {/* Wishlist Button */}
      <button 
        className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
        onClick={handleWishlist}
        aria-label={wishlisted ? t(lang, 'product.wishlistRemove') : t(lang, 'product.wishlistAdd')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "#ef4444" : "none"} stroke={wishlisted ? "#ef4444" : "#6b7280"} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      {/* Product Image */}
      <a href={productUrl} className="product-image-link">
        <div className="product-image-wrapper">
          <img 
            src={optimizedImage} 
            alt={title}
            className="product-image"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/peptide-default.jpg';
            }}
          />
        </div>
      </a>

      {/* Product Info */}
      <div className="product-info">
        <a href={productUrl} className="product-title-link">
          <h3 className="product-title">{title}</h3>
        </a>
        
        {category && (
          <p className="product-category">{translateCategory(category, lang)}</p>
        )}

        {/* Price with Discount */}
        <div className="product-price-row">
          <span className="product-price">{formatPrice(price, currency)}</span>
          {isAboveThreshold ? (
            <span className="discount-badge">{discountPercent}% {offLabel}</span>
          ) : (
            <span className="discount-badge">{discountPercent}% {offLabel}</span>
          )}
        </div>
        
        {/* Min Order Info - Only show for products under £200 */}
        {!isAboveThreshold && (
          <div className="min-order-info">
            <span className="min-qty">{minQuantityTemplate.replace('{qty}', String(minQuantity))} {getUnitLabel(minQuantity > 1)}</span>
            <span className="min-total">= {formatPrice(minOrderTotal, currency)}+</span>
          </div>
        )}
        
        {/* Package Info - Show for products at £200+ */}
        {isAboveThreshold && packageSize && (
          <div className="package-info">
            <span className="package-size">{translatePackageSize(packageSize, lang)}</span>
          </div>
        )}

        {/* Rating */}
        <div className="product-rating">
          <div className="stars-wrapper">
            {renderStars()}
          </div>
          <span className="review-count">({reviewCount})</span>
        </div>

        {/* View Options Button - links to product page */}
        <a 
          href={productUrl}
          className="view-options-btn"
        >
          {viewOptionsLabel}
        </a>
      </div>

      <style>{`
        /* ===== MOBILE FIRST PRODUCT CARD ===== */
        .shopcart-product-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Touch-friendly - no transform on mobile */
        @media (min-width: 992px) {
          .shopcart-product-card:hover {
            border-color: #0077b6;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            transform: translateY(-4px);
          }
        }

        .wishlist-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .wishlist-btn:active {
          transform: scale(0.95);
        }

        .wishlist-btn.active {
          border-color: #ef4444;
          background: #fef2f2;
        }

        @media (min-width: 992px) {
          .wishlist-btn {
            top: 12px;
            right: 12px;
          }
          
          .wishlist-btn:hover {
            border-color: #ef4444;
            background: #fef2f2;
          }
        }

        .product-image-link {
          display: block;
          text-decoration: none;
        }

        .product-image-wrapper {
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        @media (min-width: 576px) {
          .product-image-wrapper {
            padding: 16px;
          }
        }

        @media (min-width: 992px) {
          .product-image-wrapper {
            padding: 20px;
          }
        }

        .product-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        @media (min-width: 992px) {
          .shopcart-product-card:hover .product-image {
            transform: scale(1.05);
          }
        }

        .product-info {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        @media (min-width: 576px) {
          .product-info {
            padding: 14px;
          }
        }

        @media (min-width: 992px) {
          .product-info {
            padding: 16px;
          }
        }

        .product-title-link {
          text-decoration: none;
        }

        .product-title {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (min-width: 576px) {
          .product-title {
            font-size: 15px;
          }
        }

        .product-title-link:hover .product-title {
          color: #0077b6;
        }

        .product-category {
          font-size: 11px;
          color: #6b7280;
          text-transform: capitalize;
          margin: 0 0 6px 0;
        }

        @media (min-width: 576px) {
          .product-category {
            font-size: 12px;
            margin: 0 0 8px 0;
          }
        }

        .product-price-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
          flex-wrap: wrap;
        }

        .product-price {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
        }

        @media (min-width: 576px) {
          .product-price {
            font-size: 18px;
          }
        }

        .discount-badge {
          font-size: 9px;
          font-weight: 700;
          color: white;
          background: #10b981;
          padding: 2px 5px;
          border-radius: 4px;
        }

        @media (min-width: 576px) {
          .discount-badge {
            font-size: 10px;
            padding: 2px 6px;
          }
        }

        .pack-label {
          font-size: 11px;
          color: #6b7280;
          font-weight: 500;
        }

        @media (min-width: 576px) {
          .pack-label {
            font-size: 12px;
          }
        }

        .package-info {
          margin-bottom: 6px;
        }

        @media (min-width: 576px) {
          .package-info {
            margin-bottom: 8px;
          }
        }

        .package-size {
          font-size: 11px;
          color: #0077b6;
          font-weight: 500;
          background: rgba(0, 119, 182, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
        }

        @media (min-width: 576px) {
          .package-size {
            font-size: 12px;
            padding: 3px 8px;
          }
        }

        .min-order-info {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
          font-size: 11px;
          flex-wrap: wrap;
        }

        @media (min-width: 576px) {
          .min-order-info {
            font-size: 12px;
            gap: 6px;
            margin-bottom: 8px;
          }
        }

        .min-qty {
          color: #0077b6;
          font-weight: 600;
        }

        .min-total {
          color: #6b7280;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 10px;
        }

        @media (min-width: 576px) {
          .product-rating {
            gap: 6px;
            margin-bottom: 12px;
          }
        }

        .stars-wrapper {
          display: flex;
          gap: 1px;
        }

        .stars-wrapper svg {
          width: 12px;
          height: 12px;
        }

        @media (min-width: 576px) {
          .stars-wrapper svg {
            width: 14px;
            height: 14px;
          }
        }

        .review-count {
          font-size: 11px;
          color: #6b7280;
        }

        @media (min-width: 576px) {
          .review-count {
            font-size: 12px;
          }
        }

        .view-options-btn {
          display: block;
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          background: #0077b6;
          color: white;
          font-size: 13px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s ease;
          margin-top: auto;
          -webkit-tap-highlight-color: transparent;
        }

        .view-options-btn:active {
          background: #023e8a;
        }

        @media (min-width: 576px) {
          .view-options-btn {
            padding: 10px 16px;
            font-size: 14px;
          }
        }

        @media (min-width: 992px) {
          .view-options-btn:hover {
            background: #023e8a;
            color: white;
          }
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid #1e293b;
          background: white;
          color: #1e293b;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: auto;
        }

        .add-to-cart-btn:hover {
          background: #0077b6;
          border-color: #0077b6;
          color: white;
        }

        .add-to-cart-btn.added {
          background: #0077b6;
          border-color: #0077b6;
          color: white;
        }
      `}</style>
    </div>
  );
}
