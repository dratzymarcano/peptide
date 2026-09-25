import React, { useState } from 'react';
import { addCartItem } from '../scripts/cartStore';
import type { ProductVariant } from '../lib/variants';

interface ProductOptionsProps {
  id: string;
  title: string;
  basePrice: number;
  packageSizes: string[];
  variants: ProductVariant[];
  moq: number;
  image: string;
  category: string;
  labels?: {
    price?: string;
    perVial?: string;
    defaultPackage?: string;
    size?: string;
    selectSize?: string;
    saveVsSmallest?: string;
    quantity?: string;
    selectQuantity?: string;
    decreaseQuantity?: string;
    increaseQuantity?: string;
    orderSummary?: string;
    subtotal?: string;
    delivery?: string;
    free?: string;
    calculatedAtCheckout?: string;
    addToCart?: string;
    addedToCart?: string;
    minimumNote?: string;
    ruoNote?: string;
  };
}

const FREE_DELIVERY_THRESHOLD = 500;

export default function ProductOptions({
  id,
  title,
  basePrice,
  packageSizes,
  variants,
  image,
  labels,
}: ProductOptionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSku, setSelectedSku] = useState(() => variants[0]?.sku ?? id);

  const text = {
    price: labels?.price ?? 'Preis',
    perVial: labels?.perVial ?? 'pro Vial',
    defaultPackage: labels?.defaultPackage ?? '1 Vial',
    quantity: labels?.quantity ?? 'Menge',
    selectQuantity: labels?.selectQuantity ?? 'Menge auswählen',
    decreaseQuantity: labels?.decreaseQuantity ?? 'Menge verringern',
    increaseQuantity: labels?.increaseQuantity ?? 'Menge erhöhen',
    orderSummary: labels?.orderSummary ?? 'Bestellübersicht',
    subtotal: labels?.subtotal ?? 'Zwischensumme',
    delivery: labels?.delivery ?? 'Versand',
    free: labels?.free ?? 'Kostenlos',
    calculatedAtCheckout: labels?.calculatedAtCheckout ?? 'Im Checkout berechnet',
    addToCart: labels?.addToCart ?? 'In den Warenkorb',
    addedToCart: labels?.addedToCart ?? 'Im Warenkorb ✓',
    minimumNote: labels?.minimumNote ?? 'Mindestbestellwert von 150 € für Laborbestellungen.',
    ruoNote: labels?.ruoNote ?? 'Ausschließlich für In-vitro- und Laborforschungszwecke (RUO).',
    size: labels?.size ?? 'Packungsgröße',
    selectSize: labels?.selectSize ?? 'Größe wählen',
    saveVsSmallest: labels?.saveVsSmallest ?? '{percent} % Ersparnis',
  };

  const selected = variants.find((variant) => variant.sku === selectedSku) ?? variants[0];
  const unitPrice = selected?.price ?? basePrice;
  const packageDescription = selected?.size ?? packageSizes[0] ?? text.defaultPackage;

  // Volume discount tiers:
  // 1-2: 0% | 3-4: 5% | 5-9: 10% | 10+: 15%
  const volumeDiscountRate = quantity >= 10 ? 0.15 : quantity >= 5 ? 0.10 : quantity >= 3 ? 0.05 : 0;
  const effectiveUnitPrice = unitPrice * (1 - volumeDiscountRate);
  const subtotal = effectiveUnitPrice * quantity;
  const originalSubtotal = unitPrice * quantity;
  const totalSaved = originalSubtotal - subtotal;
  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleAddToCart = () => {
    addCartItem({
      id,
      sku: selected?.sku ?? id,
      title,
      price: effectiveUnitPrice,
      thumb_src: image,
      thumb_alt: title,
      size: packageDescription,
      quantity,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(99, q + 1));

  return (
    <div className="product-options-precision">
      {/* 1. PRICE HEADER & LIVE SAVINGS */}
      <div className="pdp-price-panel">
        <div className="pdp-price-main">
          <div className="pdp-price-amount">
            <span className="pdp-currency">€</span>
            <span className="pdp-value">{effectiveUnitPrice.toFixed(2)}</span>
          </div>
          {volumeDiscountRate > 0 && (
            <div className="pdp-price-compare">
              <span className="pdp-old-price">€{unitPrice.toFixed(2)}</span>
              <span className="pdp-save-badge">−{(volumeDiscountRate * 100)} % Rabatt</span>
            </div>
          )}
        </div>
        <div className="pdp-price-meta">
          <span className="pdp-unit-label">{text.perVial}</span>
          <span className="pdp-dot-sep">·</span>
          <span className="pdp-spec-pill">{packageDescription}</span>
        </div>
      </div>

      {/* 2. LABORATORY VOLUME DISCOUNT TIERS */}
      <div className="pdp-volume-tiers">
        <div className="pdp-tiers-header">
          <span className="pdp-tiers-title">Staffelpreise für Labore:</span>
          {volumeDiscountRate > 0 ? (
            <span className="pdp-tiers-active-savings">
              ✓ {(volumeDiscountRate * 100)} % Rabatt aktiv (Sie sparen €{totalSaved.toFixed(2)})
            </span>
          ) : (
            <span className="pdp-tiers-hint">Mengenrabatt ab 3 Stück</span>
          )}
        </div>
        <div className="pdp-tiers-grid">
          {[
            { count: 1, label: '1 Stk.', disc: 'Standard', rate: 0 },
            { count: 3, label: '3 Stk.', disc: '−5 %', rate: 0.05 },
            { count: 5, label: '5 Stk.', disc: '−10 %', rate: 0.10 },
            { count: 10, label: '10 Stk.', disc: '−15 %', rate: 0.15 },
          ].map((tier) => {
            const isActive =
              (tier.count === 10 && quantity >= 10) ||
              (tier.count === 5 && quantity >= 5 && quantity < 10) ||
              (tier.count === 3 && quantity >= 3 && quantity < 5) ||
              (tier.count === 1 && quantity < 3);

            return (
              <button
                key={tier.count}
                type="button"
                className={`pdp-tier-button ${isActive ? 'is-active' : ''}`}
                onClick={() => setQuantity(tier.count)}
                aria-pressed={isActive}
              >
                <span className="pdp-tier-count">{tier.label}</span>
                <span className={`pdp-tier-badge ${tier.rate > 0 ? 'pdp-tier-badge--green' : ''}`}>
                  {tier.disc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MULTI-VARIANT SELECTOR (IF MULTIPLE SIZES) */}
      {variants.length > 1 && (
        <div className="pdp-variants-field">
          <span className="pdp-field-label" id={`size-label-${id}`}>{text.size}:</span>
          <div className="pdp-variant-chips" role="radiogroup" aria-labelledby={`size-label-${id}`}>
            {variants.map((variant) => {
              const isSelected = variant.sku === selected?.sku;
              return (
                <button
                  key={variant.sku}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`pdp-variant-chip ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedSku(variant.sku)}
                >
                  <span className="pdp-variant-size">{variant.size}</span>
                  <span className="pdp-variant-price">€{variant.price.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. QUANTITY STEPPER */}
      <div className="pdp-qty-row">
        <label htmlFor={`qty-${id}`} className="pdp-qty-label">{text.quantity}:</label>
        <div className="pdp-stepper" role="group" aria-label={text.selectQuantity}>
          <button
            type="button"
            className="pdp-stepper-btn"
            onClick={decrement}
            disabled={quantity <= 1}
            aria-label={text.decreaseQuantity}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <input
            id={`qty-${id}`}
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1) setQuantity(Math.min(99, val));
            }}
            className="pdp-stepper-input"
            aria-label={text.quantity}
          />
          <button
            type="button"
            className="pdp-stepper-btn"
            onClick={increment}
            disabled={quantity >= 99}
            aria-label={text.increaseQuantity}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 5. ORDER SUMMARY & FREE DELIVERY BAR */}
      <div className="pdp-summary-card">
        <div className="pdp-summary-line">
          <span>{text.subtotal}</span>
          <span className="pdp-summary-val">€{subtotal.toFixed(2)}</span>
        </div>
        {totalSaved > 0 && (
          <div className="pdp-summary-line pdp-summary-saved">
            <span>Mengenrabatt ({(volumeDiscountRate * 100)} %)</span>
            <span className="pdp-summary-val">−€{totalSaved.toFixed(2)}</span>
          </div>
        )}
        <div className="pdp-summary-line">
          <span>{text.delivery}</span>
          <span className="pdp-summary-val">
            {qualifiesForFreeDelivery ? (
              <strong className="text-success">{text.free}</strong>
            ) : (
              text.calculatedAtCheckout
            )}
          </span>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="pdp-shipping-bar-wrap">
          <div className="pdp-shipping-bar-fill" style={{ width: `${freeDeliveryProgress}%` }} />
        </div>
        <div className="pdp-shipping-msg">
          {qualifiesForFreeDelivery ? (
            <span className="text-success">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }}><polyline points="20 6 9 17 4 12" /></svg>
              Kostenloser EU-Expressversand freigeschaltet!
            </span>
          ) : (
            <span>
              Noch <strong>€{remainingForFreeDelivery.toFixed(2)}</strong> bis zum kostenlosen EU-Expressversand.
            </span>
          )}
        </div>
      </div>

      {/* 6. PRIMARY CALL TO ACTION BUTTON */}
      <button
        type="button"
        className={`pdp-cta-btn ${added ? 'is-added' : ''}`}
        onClick={handleAddToCart}
        disabled={added}
      >
        {added ? (
          <span className="pdp-btn-content">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {text.addedToCart}
          </span>
        ) : (
          <span className="pdp-btn-content">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {text.addToCart} · €{subtotal.toFixed(2)}
          </span>
        )}
      </button>

      {/* 7. HIGH-TRUST REASSURANCE LIST */}
      <div className="pdp-micro-trust">
        <div className="pdp-trust-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span>Zertifizierte Reinheit (HPLC & MS chargenbezogen)</span>
        </div>
        <div className="pdp-trust-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0077B6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span>Diskreter EU-Expressversand in 24–48h mit Tracking</span>
        </div>
        <div className="pdp-trust-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span>Klimatisierte Schutzverpackung für thermische Stabilität</span>
        </div>
      </div>

      <div className="pdp-compliance-footnote">
        <span className="pdp-footnote-tag">RUO</span>
        <span>{text.ruoNote} {text.minimumNote}</span>
      </div>
    </div>
  );
}
