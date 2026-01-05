import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, removeCartItem, updateCartItemQuantity, clearCart } from '../scripts/cartStore';

export default function CartPageContent() {
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
          items: items.map(i => ({ id: i.id, title: i.title, quantity: i.quantity, price: i.price }))
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

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-5">
        <div className="mb-4 text-success">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="mb-3">Enquiry Sent Successfully!</h3>
        <p className="text-muted mb-4">We have received your request and will get back to you shortly with a quote.</p>
        <a href="/peptides/" className="btn btn-main">
          Browse More Peptides
        </a>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4 text-muted">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        </div>
        <h3 className="mb-3">Your cart is empty</h3>
        <p className="text-muted mb-4">Add peptides to your enquiry cart to request a quote.</p>
        <a href="/peptides/" className="btn btn-main">
          Browse Peptides
        </a>
      </div>
    );
  }

  return (
    <>
      <h4 className="mb-4">Selected Products ({items.length})</h4>
      
      <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <a href={`/cart`} className="text-dark font-weight-bold">
                    {item.title}
                  </a>
                </td>
                <td className="text-muted">${item.price?.toLocaleString() || 'N/A'}</td>
                <td>
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="form-control form-control-sm"
                    style={{ width: '70px' }}
                  />
                </td>
                <td>
                  <button 
                    onClick={() => removeCartItem(item.id)} 
                    className="btn btn-sm btn-outline-danger"
                    title="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-4" />

      <h4 className="mb-4">Request Quote</h4>

      {submitStatus === 'error' && (
        <div className="alert alert-danger mb-4">
          There was an error sending your request. Please try again or contact us directly.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
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
            placeholder="Any specific requirements, quantities, or questions..."
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input 
              type="checkbox" 
              className="custom-control-input" 
              id="research" 
              required
              checked={formData.researchConfirm}
              onChange={e => setFormData({...formData, researchConfirm: e.target.checked})}
            />
            <label className="custom-control-label" htmlFor="research">
              <strong>Research Use Only Confirmation *</strong><br/>
              <small className="text-muted">I confirm that these products are for laboratory research use only and not for human consumption.</small>
            </label>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-main btn-lg btn-block mt-4"
          disabled={isSubmitting || !formData.researchConfirm}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
              Sending Request...
            </>
          ) : (
            <span className="d-flex align-items-center justify-content-center">
              Request Quote 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          )}
        </button>
      </form>
    </>
  );
}
