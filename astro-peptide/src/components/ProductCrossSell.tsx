import React, { useState } from 'react';
import { addCartItem } from '../scripts/cartStore';

interface ProductCrossSellProps {
  currentProductId: string;
  currentProductTitle: string;
  currentProductPrice: number;
  currentProductImage: string;
}

export default function ProductCrossSell({
  currentProductId,
}: ProductCrossSellProps) {
  // If the current product is already supplies/bac water, don't show the cross-sell
  if (currentProductId === 'supply-bac-water-10ml' || currentProductId === 'bacteriostatic-water') {
    return null;
  }

  const [added, setAdded] = useState(false);
  const bacPrice = 22.0;

  const handleAddBacWater = () => {
    addCartItem({
      id: 'supply-bac-water-10ml',
      sku: 'supply-bac-water-10ml--10-10-ml-vials',
      title: 'Bakteriostatisches Wasser (30 ml)',
      price: bacPrice,
      thumb_src: '/images/products/bacteriostatic-water.webp',
      thumb_alt: 'Bakteriostatisches Wasser 30ml für Peptidforschung',
      size: '10 × 10 mL vials',
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <aside className="pdp-cross-sell" aria-label="Empfohlenes Laborzubehör">
      <div className="pdp-cross-sell__card">
        <div className="pdp-cross-sell__visual">
          <img
            src="/images/products/bacteriostatic-water.webp"
            alt="Bakteriostatisches Wasser 30 ml für Laborrekonstitution"
            width="84"
            height="84"
            loading="lazy"
            className="pdp-cross-sell__thumb"
          />
          <span className="pdp-cross-sell__badge">USP Grade</span>
        </div>

        <div className="pdp-cross-sell__content">
          <div className="pdp-cross-sell__header">
            <span className="pdp-cross-sell__eyebrow">Essentieller Laborbedarf</span>
            <h4 className="pdp-cross-sell__title">Bakteriostatisches Wasser (30 ml)</h4>
          </div>
          <p className="pdp-cross-sell__desc">
            Steriles Lösungsmittel mit 0,9 % Benzylalkohol für kontaminationsfreie Peptid-Rekonstitution und maximale In-vitro-Stabilität.
          </p>
          <div className="pdp-cross-sell__meta">
            <a href="/peptid-rechner/" className="pdp-cross-sell__calc-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                <path d="M8.5 2h7" />
                <path d="M7 16h10" />
              </svg>
              <span>Mischverhältnis im Peptid-Rechner kalkulieren →</span>
            </a>
          </div>
        </div>

        <div className="pdp-cross-sell__action">
          <div className="pdp-cross-sell__price">
            <span className="pdp-cross-sell__amount">€{bacPrice.toFixed(2)}</span>
            <span className="pdp-cross-sell__unit">pro Einheit</span>
          </div>
          <button
            type="button"
            onClick={handleAddBacWater}
            disabled={added}
            className={`pdp-cross-sell__btn ${added ? 'is-added' : ''}`}
          >
            {added ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Hinzugefügt</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Hinzufügen</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
