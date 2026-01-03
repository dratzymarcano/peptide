import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen } from '../scripts/cartStore';

export default function EnquiryCartIcon() {
  const $cartItems = useStore(cartItems);
  const count = Object.values($cartItems).reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button 
      onClick={() => isCartOpen.set(true)}
      className="btn btn-link text-dark p-0 position-relative"
      aria-label="Open Enquiry Cart"
      style={{ textDecoration: 'none' }}
    >
      <i className="ti-shopping-cart" style={{ fontSize: '1.2rem' }}></i>
      {count > 0 && (
        <span className="badge badge-primary badge-pill position-absolute" style={{ top: '-5px', right: '-10px' }}>
          {count}
        </span>
      )}
    </button>
  );
}
