import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen, removeCartItem, updateCartItemQuantity, clearCart } from '../scripts/cartStore';

export default function EnquiryCart() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);
  const items = Object.values($cartItems);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    message: '',
    researchConfirm: false
  });

  if (!$isCartOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.researchConfirm) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map(i => ({ id: i.id, title: i.title, quantity: i.quantity }))
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        clearCart();
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enquiry Cart</h5>
            <button type="button" className="close" onClick={() => isCartOpen.set(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
             {submitStatus === 'success' ? (
                <div className="text-center py-5">
                    <div className="mb-4 text-success">
                        <i className="ti-check-box" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h3 className="mb-3">Enquiry Sent!</h3>
                    <p className="text-muted">We have received your request and will get back to you shortly with a quote.</p>
                    <button onClick={() => isCartOpen.set(false)} className="btn btn-primary mt-3">
                        Close
                    </button>
                </div>
             ) : items.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted">Your cart is empty.</p>
                    <button onClick={() => isCartOpen.set(false)} className="btn btn-link">
                        Browse Peptides
                    </button>
                </div>
             ) : (
                 <>
                    <ul className="list-group mb-4">
                        {items.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="my-0">{item.title}</h6>
                                    <small className="text-muted">{item.priceRange}</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input 
                                        type="number" 
                                        min="1" 
                                        value={item.quantity} 
                                        onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                                        className="form-control form-control-sm mr-2"
                                        style={{ width: '60px' }}
                                    />
                                    <button onClick={() => removeCartItem(item.id)} className="btn btn-sm btn-outline-danger">
                                        <i className="ti-trash"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                required 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                required 
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="institution">Institution / Lab Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="institution" 
                                value={formData.institution}
                                onChange={e => setFormData({...formData, institution: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Additional Notes</label>
                            <textarea 
                                className="form-control" 
                                id="message" 
                                rows={3}
                                value={formData.message}
                                onChange={e => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                        </div>
                        <div className="form-group form-check">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="research" 
                                required
                                checked={formData.researchConfirm}
                                onChange={e => setFormData({...formData, researchConfirm: e.target.checked})}
                            />
                            <label className="form-check-label" htmlFor="research">
                                <strong>Research Use Only</strong><br/>
                                <small className="text-muted">I confirm that these products are for laboratory research use only and not for human consumption.</small>
                            </label>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting || !formData.researchConfirm}
                        >
                            {isSubmitting ? 'Sending...' : 'Request Quote'}
                        </button>
                    </form>
                 </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
