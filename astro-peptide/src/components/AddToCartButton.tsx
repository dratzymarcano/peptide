import { addCartItem } from '../scripts/cartStore';
import { useState } from 'react';

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
  thumb_src?: string;
  thumb_alt?: string;
  color?: string;
  size?: string;
  labels?: {
    addToCart?: string;
    addedToCart?: string;
  };
}

export default function AddToCartButton({ id, title, price, thumb_src = '/images/peptide-default.jpg', thumb_alt, color, size, labels }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const addToCartLabel = labels?.addToCart ?? 'Add to Cart';
  const addedToCartLabel = labels?.addedToCart ?? 'Added to Cart';

  const handleClick = () => {
    addCartItem({
      id,
      title,
      price,
      thumb_src,
      thumb_alt: thumb_alt || title,
      color,
      size
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${added ? 'btn-secondary' : 'btn-primary'} btn-sm btn-block`}
      disabled={added}
    >
      {added ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {addedToCartLabel}
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          {addToCartLabel}
        </>
      )}
    </button>
  );
}
