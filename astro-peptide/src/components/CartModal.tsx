import { useStore } from '@nanostores/react';
import { cartItems, cartTotal, isCartOpen, removeCartItem, updateQuantity } from '../scripts/cartStore';

const MIN_ORDER_AMOUNT = 200;

interface CartModalProps {
  labels?: {
    closeCart?: string;
    shoppingCart?: string;
    cart?: string;
    item?: string;
    items?: string;
    emptyTitle?: string;
    emptyModalBody?: string;
    browseCatalogue?: string;
    quantityFor?: string;
    decreaseQuantity?: string;
    increaseQuantity?: string;
    remove?: string;
    subtotal?: string;
    minimumOrder?: string;
    addToContinue?: string;
    checkout?: string;
    minimum?: string;
    viewCart?: string;
  };
  paths?: {
    catalogue?: string;
    checkout?: string;
    cart?: string;
  };
}

const defaultLabels = {
  closeCart: 'Close cart',
  shoppingCart: 'Shopping cart',
  cart: 'Cart',
  item: 'item',
  items: 'items',
  emptyTitle: 'Your cart is empty',
  emptyModalBody: 'Browse the catalogue to add research-use materials.',
  browseCatalogue: 'Browse catalogue',
  quantityFor: 'Quantity for {product}',
  decreaseQuantity: 'Decrease quantity',
  increaseQuantity: 'Increase quantity',
  remove: 'Remove',
  subtotal: 'Subtotal',
  minimumOrder: 'Minimum order',
  addToContinue: 'add €{amount} to continue.',
  checkout: 'Checkout',
  minimum: 'Minimum €{amount}',
  viewCart: 'View cart',
};

export default function CartModal({ labels, paths }: CartModalProps) {
  const copy = { ...defaultLabels, ...labels };
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);
  const $cartTotal = useStore(cartTotal);
  const items = Object.values($cartItems);
  const meetsMinimum = $cartTotal >= MIN_ORDER_AMOUNT;
  const remainingForMinimum = Math.max(0, MIN_ORDER_AMOUNT - $cartTotal);

  if (!$isCartOpen) return null;

  function closeCart() {
    isCartOpen.set(false);
  }

  return (
    <>
      <button className="cart-drawer-backdrop" type="button" aria-label={copy.closeCart} onClick={closeCart} />
      <aside className="cart-drawer-panel" aria-label={copy.shoppingCart} aria-modal="true" role="dialog">
        <header className="cart-drawer-header">
          <div>
            <span className="eyebrow">{copy.cart}</span>
            <h2>{items.length} {items.length === 1 ? copy.item : copy.items}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" type="button" onClick={closeCart} aria-label={copy.closeCart}>{copy.closeCart}</button>
        </header>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="commerce-empty compact">
              <h3>{copy.emptyTitle}</h3>
              <p>{copy.emptyModalBody}</p>
              <a className="btn btn-primary" href={paths?.catalogue || '/catalog/'} onClick={closeCart}>{copy.browseCatalogue}</a>
            </div>
          ) : (
            <div className="cart-drawer-items">
              {items.map((item) => (
                <article className="cart-drawer-item" key={item.id}>
                  <img src={item.thumb_src} alt={item.thumb_alt || item.title} loading="lazy" />
                  <div>
                    <h3>{item.title}</h3>
                    {item.size && <span className="badge badge-blue">{item.size}</span>}
                    <strong>€{(item.price * item.quantity).toFixed(2)}</strong>
                    <div className="cart-drawer-actions">
                      <div className="quantity-stepper" aria-label={copy.quantityFor.replace('{product}', item.title)}>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={copy.decreaseQuantity}>-</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={copy.increaseQuantity}>+</button>
                      </div>
                      <button className="btn btn-ghost btn-sm" type="button" onClick={() => removeCartItem(item.id)}>{copy.remove}</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="cart-drawer-footer">
            <dl>
              <div><dt>{copy.subtotal}</dt><dd>€{$cartTotal.toFixed(2)}</dd></div>
            </dl>
            {!meetsMinimum && (
              <p className="minimum-note" role="status" style={{ margin: '0 0 var(--space-2)', fontSize: '13px' }}>
                {copy.minimumOrder} <strong>€{MIN_ORDER_AMOUNT}</strong> · {copy.addToContinue.replace('{amount}', remainingForMinimum.toFixed(2))}
              </p>
            )}
            <a
              className="btn btn-primary btn-block"
              href={meetsMinimum ? paths?.checkout || '/checkout/' : undefined}
              onClick={meetsMinimum ? closeCart : (e) => e.preventDefault()}
              aria-disabled={!meetsMinimum}
              style={!meetsMinimum ? { pointerEvents: 'none', opacity: 0.55 } : undefined}
            >
              {meetsMinimum ? copy.checkout : copy.minimum.replace('{amount}', String(MIN_ORDER_AMOUNT))}
            </a>
            <a className="btn btn-secondary btn-block" href={paths?.cart || '/cart/'} onClick={closeCart}>{copy.viewCart}</a>
          </footer>
        )}
      </aside>
    </>
  );
}