import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { cartNotification, clearNotification, isCartOpen } from '../scripts/cartStore';

interface CartNotificationProps {
  labels?: {
    cartUpdate?: string;
    addedToCart?: string;
    closeNotification?: string;
    close?: string;
    viewCart?: string;
    checkout?: string;
  };
  paths?: {
    checkout?: string;
  };
}

const defaultLabels = {
  cartUpdate: 'Cart update',
  addedToCart: 'Added to cart',
  closeNotification: 'Close notification',
  close: 'Close',
  viewCart: 'View cart',
  checkout: 'Checkout',
};

export default function CartNotification({ labels, paths }: CartNotificationProps) {
  const copy = { ...defaultLabels, ...labels };
  const $notification = useStore(cartNotification);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!$notification) return;

    setIsVisible(true);
    const timer = window.setTimeout(() => {
      setIsVisible(false);
      window.setTimeout(clearNotification, 300);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [$notification]);

  if (!$notification) return null;

  function closeToast() {
    setIsVisible(false);
    window.setTimeout(clearNotification, 300);
  }

  function viewCart() {
    isCartOpen.set(true);
    clearNotification();
  }

  return (
    <aside className={`cart-toast ${isVisible ? 'is-visible' : ''}`} aria-live="polite" aria-label={copy.cartUpdate}>
      <header className="cart-toast-header">
        <span className="cart-toast-check" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <strong>{copy.addedToCart}</strong>
        <button type="button" onClick={closeToast} aria-label={copy.closeNotification}>{copy.close}</button>
      </header>
      <div className="cart-toast-body">
        <img src={$notification.thumb_src} alt={$notification.thumb_alt || $notification.title} loading="lazy" />
        <div>
          <h3>{$notification.title}</h3>
          <strong>€{$notification.price.toFixed(2)}</strong>
        </div>
      </div>
      <div className="cart-toast-actions">
        <button className="btn btn-secondary btn-sm" type="button" onClick={viewCart}>{copy.viewCart}</button>
        <a className="btn btn-primary btn-sm" href={paths?.checkout || '/checkout/'} onClick={clearNotification}>{copy.checkout}</a>
      </div>
    </aside>
  );
}