import { useStore } from '@nanostores/react';
import { cartItems, cartTotal, isCartOpen, removeCartItem, updateQuantity, addCartItem, cartLineKey } from '../scripts/cartStore';

const MIN_ORDER_AMOUNT = 200;

const CROSS_SELL_ITEMS = [
  {
    id: 'supply-bac-water-10ml',
    sku: 'supply-bac-water-10ml--10-10-ml-vials',
    title: 'Bacteriostatic Water (30 ml)',
    price: 22.00,
    size: '10 × 10 mL vials',
    thumb_src: '/images/products/bacteriostatic-water.svg',
    thumb_alt: 'Bacteriostatic Water 30 ml',
  },
];

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
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{copy.cart} ({items.length} {items.length === 1 ? copy.item : copy.items})</h2>
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
            <>
              <div className="cart-drawer-items">
                {items.map((item) => {
                  const itemKey = cartLineKey(item);
                  return (
                    <article className="cart-drawer-item" key={itemKey}>
                      <img src={item.thumb_src} alt={item.thumb_alt || item.title} loading="lazy" />
                      <div>
                        <h3>{item.title}</h3>
                        {item.size && <span className="badge badge-blue">{item.size}</span>}
                        <strong>€{(item.price * item.quantity).toFixed(2)}</strong>
                        <div className="cart-drawer-actions">
                          <div className="quantity-stepper" aria-label={copy.quantityFor.replace('{product}', item.title)}>
                            <button
                              type="button"
                              onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                              aria-label={copy.decreaseQuantity}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                              aria-label={copy.increaseQuantity}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="btn btn-ghost btn-sm"
                            type="button"
                            onClick={() => removeCartItem(itemKey)}
                          >
                            {copy.remove}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="cart-drawer-crosssell" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink-2)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Häufig zusammen bestellt
                </h4>
                <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
                  {CROSS_SELL_ITEMS.map((supply) => {
                    const inCart = !!$cartItems[supply.sku] || !!$cartItems[supply.id];
                    return (
                      <div
                        key={supply.sku}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          background: 'var(--color-surface-2)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          gap: '10px',
                        }}
                      >
                        <img
                          src={supply.thumb_src}
                          alt={supply.thumb_alt}
                          style={{ width: '38px', height: '38px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px', border: '1px solid var(--color-border)' }}
                          loading="lazy"
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {supply.title}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--color-ink-3)' }}>
                            €{supply.price.toFixed(2)} · {supply.size}
                          </div>
                        </div>
                        <button
                          type="button"
                          className={`btn ${inCart ? 'btn-ghost' : 'btn-secondary'} btn-sm`}
                          style={{ fontSize: '12px', padding: '4px 10px', height: 'auto', whiteSpace: 'nowrap' }}
                          onClick={() => addCartItem(supply)}
                        >
                          {inCart ? '+ Weiterer' : '+ Hinzufügen'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
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