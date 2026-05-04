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
  labels?: {
    price?: string;
    perVial?: string;
    defaultPackage?: string;
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

export default function ProductOptions({ id, title, basePrice, packageSizes, image, labels }: ProductOptionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const text = {
    price: labels?.price ?? 'Price',
    perVial: labels?.perVial ?? 'per vial',
    defaultPackage: labels?.defaultPackage ?? '1 vial',
    quantity: labels?.quantity ?? 'Quantity',
    selectQuantity: labels?.selectQuantity ?? 'Select quantity',
    decreaseQuantity: labels?.decreaseQuantity ?? 'Decrease quantity',
    increaseQuantity: labels?.increaseQuantity ?? 'Increase quantity',
    orderSummary: labels?.orderSummary ?? 'Order summary',
    subtotal: labels?.subtotal ?? 'Subtotal',
    delivery: labels?.delivery ?? 'Delivery',
    free: labels?.free ?? 'Free',
    calculatedAtCheckout: labels?.calculatedAtCheckout ?? 'Calculated at checkout',
    addToCart: labels?.addToCart ?? 'Add to cart',
    addedToCart: labels?.addedToCart ?? 'Added to cart',
    minimumNote: labels?.minimumNote ?? 'A minimum order value of €150 applies at checkout.',
    ruoNote: labels?.ruoNote ?? 'For research use only. Not for human or veterinary use.',
  };

  const packageDescription = packageSizes[0] || text.defaultPackage;
  const subtotal = basePrice * quantity;
  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;

  const handleAddToCart = () => {
    addCartItem({
      id,
      title,
      price: basePrice,
      thumb_src: image,
      thumb_alt: title,
      size: packageDescription,
      quantity,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(99, q + 1));

  return (
    <div className="product-options-clean">
      <div className="price-summary">
        <span className="muted-label">{text.price}</span>
        <strong>€{basePrice.toFixed(2)}</strong>
        <span className="muted-label">{text.perVial} · {packageDescription}</span>
      </div>

      <div className="field">
        <label htmlFor={`qty-${id}`}>{text.quantity}</label>
        <div className="quantity-stepper" role="group" aria-label={text.selectQuantity}>
          <button type="button" onClick={decrement} aria-label={text.decreaseQuantity}>−</button>
          <span id={`qty-${id}`}>{quantity}</span>
          <button type="button" onClick={increment} aria-label={text.increaseQuantity}>+</button>
        </div>
      </div>

      <div className="order-summary" aria-label={text.orderSummary}>
        <div><span>{text.subtotal}</span><strong>€{subtotal.toFixed(2)}</strong></div>
        <div><span>{text.delivery}</span><strong>{qualifiesForFreeDelivery ? text.free : text.calculatedAtCheckout}</strong></div>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        onClick={handleAddToCart}
        disabled={added}
      >
        {added ? text.addedToCart : text.addToCart}
      </button>

      <p className="minimum-note" role="note" style={{ marginTop: 'var(--space-2)', fontSize: '12px' }}>
        {text.minimumNote}
      </p>

      <p className="ruo-note">{text.ruoNote}</p>
    </div>
  );
}
