import React, { useState } from 'react';
import { addCartItem } from '../scripts/cartStore';

interface BundleItem {
  id: string;
  title: string;
  price: number;
  size: string;
  image: string;
}

interface Bundle {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  items: BundleItem[];
  regularPrice: number;
  bundlePrice: number;
  savePercent: number;
}

const RESEARCH_BUNDLES: Bundle[] = [
  {
    id: 'wolverine-protocol',
    title: 'Wolverine-Protokoll',
    subtitle: 'Zelluläre Regeneration & Gewebereparatur',
    description: 'Die am häufigsten untersuchte Kombination in der präklinischen Regenerationsforschung. Synergistische Effekte von BPC-157 auf die Angiogenese und TB-500 auf die Aktin-Regulation.',
    badge: 'Bestseller Bundle',
    items: [
      { id: 'bpc-157', title: 'BPC-157', price: 54.9, size: '5 mg', image: '/images/products/bpc-157.webp' },
      { id: 'tb-500', title: 'TB-500 (Thymosin Beta-4)', price: 59.9, size: '5 mg', image: '/images/products/tb-500.webp' },
      { id: 'bacteriostatic-water', title: 'Bakteriostatisches Wasser', price: 14.9, size: '30 ml', image: '/images/products/bacteriostatic-water.webp' },
    ],
    regularPrice: 129.7,
    bundlePrice: 109.0,
    savePercent: 16,
  },
  {
    id: 'metabolic-dual-research',
    title: 'Metabolische Dual-Forschung',
    subtitle: 'Inkretinglukagon- & Insulin-Signalwege',
    description: 'Für vergleichende in-vitro Bindungsstudien an GLP-1- und GIP-Rezeptoren. Beinhaltet zwei führende Peptid-Referenzstandards inklusive Rekonstitutionslösung.',
    badge: 'Hohe Nachfrage',
    items: [
      { id: 'semaglutide', title: 'Semaglutid', price: 79.9, size: '5 mg', image: '/images/products/semaglutide.webp' },
      { id: 'tirzepatide', title: 'Tirzepatid', price: 119.0, size: '10 mg', image: '/images/products/tirzepatide.webp' },
      { id: 'bacteriostatic-water', title: 'Bakteriostatisches Wasser', price: 14.9, size: '30 ml', image: '/images/products/bacteriostatic-water.webp' },
    ],
    regularPrice: 213.8,
    bundlePrice: 179.0,
    savePercent: 16,
  },
  {
    id: 'cellular-longevity-stack',
    title: 'Zelluläre Langlebigkeit & DNA-Integrität',
    subtitle: 'Telomerase- & Kollagenmatrixforschung',
    description: 'Kombinationspaket aus dem Telomerase-Aktivator Epitalon und dem Kupferpeptid GHK-Cu zur Erforschung zellulärer Seneszenz und Fibroblastenaktivität.',
    badge: 'Anti-Aging Forschung',
    items: [
      { id: 'epitalon', title: 'Epitalon', price: 64.9, size: '10 mg', image: '/images/products/epitalon.webp' },
      { id: 'ghk-cu', title: 'GHK-Cu (Kupferpeptid)', price: 49.9, size: '50 mg', image: '/images/products/ghk-cu.webp' },
      { id: 'bacteriostatic-water', title: 'Bakteriostatisches Wasser', price: 14.9, size: '30 ml', image: '/images/products/bacteriostatic-water.webp' },
    ],
    regularPrice: 129.7,
    bundlePrice: 109.0,
    savePercent: 16,
  },
  {
    id: 'gh-secretagogue-duo',
    title: 'Somatotrope Signalachse (GH-Duo)',
    subtitle: 'Hypophysäre Rezeptorstimulation',
    description: 'Gleichzeitige Erforschung von GHRH-Agonismus (CJC-1295 ohne DAC) und Ghrelin-Rezeptor-Selektivität (Ipamorelin) ohne Prolaktin-Ausschüttung.',
    badge: 'Synergie-Duo',
    items: [
      { id: 'cjc-1295-no-dac', title: 'CJC-1295 (ohne DAC)', price: 48.9, size: '5 mg', image: '/images/products/cjc-1295-no-dac.webp' },
      { id: 'ipamorelin', title: 'Ipamorelin', price: 46.9, size: '5 mg', image: '/images/products/ipamorelin.webp' },
      { id: 'bacteriostatic-water', title: 'Bakteriostatisches Wasser', price: 14.9, size: '30 ml', image: '/images/products/bacteriostatic-water.webp' },
    ],
    regularPrice: 110.7,
    bundlePrice: 94.0,
    savePercent: 15,
  },
];

export default function BundleCards() {
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);

  const handleAddBundle = (bundle: Bundle) => {
    // Add each item in the bundle with the proportional discount applied
    const discountFactor = bundle.bundlePrice / bundle.regularPrice;
    
    bundle.items.forEach((item) => {
      addCartItem({
        id: item.id,
        title: `${item.title} (${bundle.title} Set)`,
        price: parseFloat((item.price * discountFactor).toFixed(2)),
        thumb_src: item.image,
        thumb_alt: item.title,
        size: item.size,
        quantity: 1,
      });
    });

    setAddedBundleId(bundle.id);
    setTimeout(() => setAddedBundleId(null), 2500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
      {RESEARCH_BUNDLES.map((bundle) => {
        const isAdded = addedBundleId === bundle.id;
        const savedAmount = bundle.regularPrice - bundle.bundlePrice;

        return (
          <div
            key={bundle.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.75rem',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              background: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                  {bundle.badge}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-ink-2)', background: 'var(--color-surface-2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {bundle.savePercent} % Ersparnis
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.25rem', color: 'var(--color-ink)' }}>
                {bundle.title}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-2)', fontWeight: 500, marginBottom: '0.75rem' }}>
                {bundle.subtitle}
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-2)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {bundle.description}
              </p>

              <div style={{ background: 'var(--color-surface-2)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-ink-3)', display: 'block', marginBottom: '0.5rem' }}>
                  Enthaltene Reagenzien:
                </span>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--color-ink)' }}>
                  {bundle.items.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.3rem' }}>
                      <strong>{item.title}</strong> ({item.size})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>
                    €{bundle.bundlePrice.toFixed(2)}
                  </span>
                  <s style={{ marginLeft: '0.5rem', color: 'var(--color-ink-3)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>
                    €{bundle.regularPrice.toFixed(2)}
                  </s>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-ink-2)', fontWeight: 500 }}>
                  Ersparnis: €{savedAmount.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleAddBundle(bundle)}
                disabled={isAdded}
                className={`btn ${isAdded ? 'btn-secondary' : 'btn-primary'} btn-block`}
                style={{ fontWeight: 600, padding: '0.75rem' }}
              >
                {isAdded ? '✓ Im Warenkorb' : 'Set in den Warenkorb'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
