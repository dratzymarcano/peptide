import { addCartItem } from '../scripts/cartStore';

interface AddToCartButtonProps {
  id: string;
  title: string;
  priceRange: string;
  slug: string;
}

export default function AddToCartButton({ id, title, priceRange, slug }: AddToCartButtonProps) {
  return (
    <button 
      onClick={() => addCartItem({ id, title, quantity: 1, priceRange, slug })}
      className="btn btn-main w-100"
    >
      Add to Enquiry Cart
    </button>
  );
}
