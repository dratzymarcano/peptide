import { useStore } from '@nanostores/react';
import { cartItems, cartTotal, deleteCartItem, updateCartItemQuantity } from '../scripts/cartStore';

const FREE_DELIVERY_THRESHOLD = 500;
const SHIPPING_COST = 5.99;
const MIN_ORDER_AMOUNT = 150;

interface ShoppingCartProps {
  labels?: {
    emptyTitle?: string;
    emptyPageBody?: string;
    browseCatalogue?: string;
    checkoutReady?: string;
    itemSelected?: string;
    itemsSelected?: string;
    freeDeliveryReached?: string;
    addForFreeDelivery?: string;
    ruoLine?: string;
    quantityFor?: string;
    decreaseQuantity?: string;
    increaseQuantity?: string;
    remove?: string;
    each?: string;
    orderSummary?: string;
    subtotal?: string;
    delivery?: string;
    free?: string;
    total?: string;
    ruoHeading?: string;
    ruoBody?: string;
    minimumRequired?: string;
    proceedCheckout?: string;
    minimumOrder?: string;
    continueShopping?: string;
  };
  paths?: {
    shop?: string;
    checkout?: string;
  };
}

const defaultLabels = {
  emptyTitle: 'Your cart is empty',
  emptyPageBody: 'Browse the catalogue to add research peptides with purity and COA information before checkout.',
  browseCatalogue: 'Browse catalogue',
  checkoutReady: 'Checkout ready',
  itemSelected: '{count} item selected',
  itemsSelected: '{count} items selected',
  freeDeliveryReached: 'Free delivery threshold reached.',
  addForFreeDelivery: 'Add €{amount} for free delivery.',
  ruoLine: 'RUO labelled · COA supplied where available',
  quantityFor: 'Quantity for {product}',
  decreaseQuantity: 'Decrease quantity',
  increaseQuantity: 'Increase quantity',
  remove: 'Remove',
  each: 'each',
  orderSummary: 'Order summary',
  subtotal: 'Subtotal',
  delivery: 'Delivery',
  free: 'Free',
  total: 'Total',
  ruoHeading: 'Research use only.',
  ruoBody: 'Not for human or veterinary diagnostic, therapeutic, cosmetic or consumption purposes.',
  minimumRequired: 'A minimum order value of €{minimum} is required. Add €{amount} to continue to checkout.',
  proceedCheckout: 'Proceed to checkout',
  minimumOrder: 'Minimum order €{minimum}',
  continueShopping: 'Continue shopping',
};

export default function ShoppingCart({ labels, paths }: ShoppingCartProps) {
  const copy = { ...defaultLabels, ...labels };
  const $cartItems = useStore(cartItems);
  const $cartTotal = useStore(cartTotal);
  const products = Object.values($cartItems);
  const hasProducts = products.length > 0;
  const qualifiesForFreeDelivery = $cartTotal >= FREE_DELIVERY_THRESHOLD;
  const shipping = hasProducts && !qualifiesForFreeDelivery ? SHIPPING_COST : 0;
  const orderTotal = $cartTotal + shipping;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - $cartTotal);
  const meetsMinimum = $cartTotal >= MIN_ORDER_AMOUNT;
  const remainingForMinimum = Math.max(0, MIN_ORDER_AMOUNT - $cartTotal);

  if (!hasProducts) {
    return (
      <div className="commerce-empty card">
        <div className="commerce-empty-icon" aria-hidden="true">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        <h2>{copy.emptyTitle}</h2>
        <p>{copy.emptyPageBody}</p>
        <a className="btn btn-primary" href={paths?.shop || '/shop/'}>{copy.browseCatalogue}</a>
      </div>
    );
  }

  return (
    <div className="commerce-layout">
      <section className="commerce-main" aria-labelledby="cart-items-title">
        <div className="commerce-status card">
          <div>
            <span className="eyebrow">{copy.checkoutReady}</span>
            <h2 id="cart-items-title">{(products.length === 1 ? copy.itemSelected : copy.itemsSelected).replace('{count}', String(products.length))}</h2>
          </div>
          <p>{qualifiesForFreeDelivery ? copy.freeDeliveryReached : copy.addForFreeDelivery.replace('{amount}', remainingForFreeDelivery.toFixed(2))}</p>
        </div>

        <div className="cart-items-list">
          {products.map((product) => (
            <article className="cart-line card" key={product.id}>
              <img src={product.thumb_src} alt={product.thumb_alt} loading="lazy" />
              <div className="cart-line-body">
                <div>
                  <h3>{product.title}</h3>
                  {product.size && <span className="badge badge-blue">{product.size}</span>}
                  <p className="cart-line-note">{copy.ruoLine}</p>
                </div>
                <div className="cart-line-actions">
                  <div className="quantity-stepper" aria-label={copy.quantityFor.replace('{product}', product.title)}>
                    <button type="button" onClick={() => updateCartItemQuantity(product.id, product.quantity - 1)} aria-label={copy.decreaseQuantity}>-</button>
                    <span>{product.quantity}</span>
                    <button type="button" onClick={() => updateCartItemQuantity(product.id, product.quantity + 1)} aria-label={copy.increaseQuantity}>+</button>
                  </div>
                  <button className="btn btn-ghost btn-sm" type="button" onClick={() => deleteCartItem(product.id)}>{copy.remove}</button>
                </div>
              </div>
              <div className="cart-line-price">
                <strong>€{(product.price * product.quantity).toFixed(2)}</strong>
                {product.quantity > 1 && <span>€{product.price.toFixed(2)} {copy.each}</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="order-summary card" aria-labelledby="order-summary-title">
        <h2 id="order-summary-title">{copy.orderSummary}</h2>
        <dl>
          <div><dt>{copy.subtotal}</dt><dd>€{$cartTotal.toFixed(2)}</dd></div>
          <div><dt>{copy.delivery}</dt><dd>{shipping === 0 ? copy.free : `€${shipping.toFixed(2)}`}</dd></div>
          <div className="summary-total"><dt>{copy.total}</dt><dd>€{orderTotal.toFixed(2)}</dd></div>
        </dl>
        <div className="ruo-banner compact">
          <strong>{copy.ruoHeading}</strong>
          <span>{copy.ruoBody}</span>
        </div>
        {!meetsMinimum && (
          <p className="minimum-note" role="status" style={{ margin: '0 0 var(--space-3)' }}>
            {copy.minimumRequired.replace('{minimum}', String(MIN_ORDER_AMOUNT)).replace('{amount}', remainingForMinimum.toFixed(2))}
          </p>
        )}
        <a
          className="btn btn-primary btn-block"
          href={meetsMinimum ? paths?.checkout || '/checkout/' : undefined}
          aria-disabled={!meetsMinimum}
          style={!meetsMinimum ? { pointerEvents: 'none', opacity: 0.55 } : undefined}
        >
          {meetsMinimum ? copy.proceedCheckout : copy.minimumOrder.replace('{minimum}', String(MIN_ORDER_AMOUNT))}
        </a>
        <a className="btn btn-secondary btn-block" href={paths?.shop || '/shop/'}>{copy.continueShopping}</a>
      </aside>
    </div>
  );
}
