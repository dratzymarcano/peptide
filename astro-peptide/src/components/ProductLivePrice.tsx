import { useStore } from '@nanostores/react';
import { productOverrides } from '../scripts/productStore';
import type { Availability } from '../lib/product';
import { AVAILABILITY_LABELS } from '../lib/product';

interface Props {
  id: string;
  ssrPrice?: number;
  ssrPriceRange: string;
  ssrCompareAt?: number;
  ssrAvailability: Availability;
  labels?: Partial<Record<Availability, string>> & {
    availabilityPrefix?: string;
  };
}

function formatEuro(n: number) {
  return `€${n.toFixed(2)}`;
}

/**
 * Tiny client island that subscribes to runtime overrides for a single
 * product id and re-renders price + availability. SSR-rendered values
 * are passed in as props so the static markup is fully hydrated and
 * SEO-correct even when JS is disabled.
 */
export default function ProductLivePrice({
  id,
  ssrPrice,
  ssrPriceRange,
  ssrCompareAt,
  ssrAvailability,
  labels,
}: Props) {
  const all = useStore(productOverrides);
  const override = all[id];

  const price = override?.price ?? ssrPrice;
  const compareAt = override?.compareAtPrice ?? ssrCompareAt;
  const availability = override?.availability ?? ssrAvailability;
  const availabilityLabel = labels?.[availability] ?? AVAILABILITY_LABELS[availability];
  const availabilityPrefix = labels?.availabilityPrefix ?? 'Availability';

  return (
    <>
      <div className="price" aria-live="polite">
        {price != null ? (
          <>
            <span className="price-current">{formatEuro(price)}</span>
            {compareAt != null && compareAt > price && (
              <span className="price-compare">
                <s>{formatEuro(compareAt)}</s>
              </span>
            )}
          </>
        ) : (
          <span className="price-current">{ssrPriceRange}</span>
        )}
      </div>
      <span
        className={`availability availability-${availability.replace('_', '-')}`}
        aria-label={`${availabilityPrefix}: ${availabilityLabel}`}
      >
        <span className="availability-dot" aria-hidden="true" />
        {availabilityLabel}
      </span>
    </>
  );
}
