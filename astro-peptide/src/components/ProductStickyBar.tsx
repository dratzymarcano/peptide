import React, { useState, useEffect } from 'react';
import { addCartItem } from '../scripts/cartStore';
import type { ProductVariant } from '../lib/variants';

interface ProductStickyBarProps {
  id: string;
  title: string;
  price: number;
  image: string;
  packageSize: string;
  variants?: ProductVariant[];
}

export default function ProductStickyBar({
  id,
  title,
  price,
  image,
  packageSize,
  variants = [],
}: ProductStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedSku, setSelectedSku] = useState(() => variants[0]?.sku ?? id);

  const selectedVariant = variants.find((v) => v.sku === selectedSku) ?? variants[0];
  const currentPrice = selectedVariant?.price ?? price;
  const currentSize = selectedVariant?.size ?? packageSize;

  useEffect(() => {
    const target = document.getElementById('pdp-buy-box');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the buy box has scrolled past the top of the viewport
        const rect = target.getBoundingClientRect();
        const hasPassedTop = rect.bottom < 80;
        setIsVisible(!entry.isIntersecting && hasPassedTop);
      },
      {
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px',
      }
    );

    observer.observe(target);

    const handleScroll = () => {
      const rect = target.getBoundingClientRect();
      setIsVisible(rect.bottom < 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAddToCart = () => {
    addCartItem({
      id,
      sku: selectedVariant?.sku ?? id,
      title,
      price: currentPrice,
      thumb_src: image,
      thumb_alt: title,
      size: currentSize,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const scrollToBuyBox = () => {
    const el = document.getElementById('pdp-buy-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      className={`pdp-sticky-bar ${isVisible ? 'is-visible' : ''}`}
      role="region"
      aria-label="Schnellkauf-Leiste"
    >
      <div className="pdp-sticky-bar__inner">
        <div className="pdp-sticky-bar__product">
          <img
            src={image}
            alt={title}
            width="46"
            height="46"
            className="pdp-sticky-bar__thumb"
            loading="lazy"
          />
          <div className="pdp-sticky-bar__meta">
            <span className="pdp-sticky-bar__title">{title}</span>
            <div className="pdp-sticky-bar__sub">
              {variants.length > 1 ? (
                <select
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="pdp-sticky-bar__select"
                  aria-label="Packungsgröße wählen"
                >
                  {variants.map((v) => (
                    <option key={v.sku} value={v.sku}>
                      {v.size} — €{v.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="pdp-sticky-bar__size">{currentSize}</span>
              )}
              <span className="pdp-sticky-bar__stock">● Auf Lager</span>
            </div>
          </div>
        </div>

        <div className="pdp-sticky-bar__action">
          <div className="pdp-sticky-bar__price-box">
            <span className="pdp-sticky-bar__price">€{currentPrice.toFixed(2)}</span>
            <span className="pdp-sticky-bar__vat">inkl. MwSt.</span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={added}
            className={`pdp-sticky-bar__btn ${added ? 'is-added' : ''}`}
            aria-label={`${title} in den Warenkorb legen`}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Im Warenkorb ✓</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>In den Warenkorb</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={scrollToBuyBox}
            className="pdp-sticky-bar__options-btn"
            title="Zu den Staffelpreisen & Optionen"
            aria-label="Staffelpreise ansehen"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
