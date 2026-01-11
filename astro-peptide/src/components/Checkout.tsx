import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, cartTotal, clearCart } from '../scripts/cartStore';
import { type SupportedLanguage, t } from '../i18n/translations';
import { currentCurrency, exchangeRate, formatPrice } from '../store/currencyStore';
import { 
  currentUser, 
  isAuthenticated, 
  addOrder,
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginWithFacebook,
  isAuthLoading,
  authError
} from '../store/authStore';
import type { Order } from '../store/authStore';

type Step = 'account' | 'shipping' | 'payment' | 'review';
type PaymentMethod = 'bank-transfer' | 'bitcoin';
type ShippingMethod = 'standard' | 'express';
type CheckoutMode = 'guest' | 'login' | 'register';

interface CheckoutProps {
  lang?: SupportedLanguage;
}

// Shipping costs
const SHIPPING_COSTS = {
  standard: { price: 5.99, name: 'Standard Delivery', time: '3-5 business days' },
  express: { price: 12.99, name: 'Express Delivery', time: '1-2 business days' }
};

const MIN_ORDER_AMOUNT = 200;
const FREE_DELIVERY_THRESHOLD = 500;

const DEFAULT_COUNTRY_BY_LANG: Record<SupportedLanguage, string> = {
  en: 'GB',
  nl: 'NL',
  de: 'DE',
  fr: 'FR',
  es: 'ES',
  it: 'IT',
};

const cardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  border: '1px solid rgba(0,0,0,0.06)',
  overflow: 'hidden',
};

const inputStyle: React.CSSProperties = {
  padding: '14px 16px',
  border: '2px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '15px',
  transition: 'all 0.2s ease',
  width: '100%',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#64748b',
  fontWeight: '600',
  marginBottom: '8px',
  fontSize: '14px',
};

export default function Checkout({ lang = 'en' }: CheckoutProps) {
  const $cartItems = useStore(cartItems);
  const currency = useStore(currentCurrency);
  useStore(exchangeRate);
  const $cartTotal = useStore(cartTotal);
  const $currentUser = useStore(currentUser);
  const $isAuthenticated = useStore(isAuthenticated);
  const $isAuthLoading = useStore(isAuthLoading);
  const $authError = useStore(authError);
  
  const products = Object.values($cartItems);
  const [currentStep, setCurrentStep] = useState<Step>('account');
  const [checkoutMode, setCheckoutMode] = useState<CheckoutMode>('guest');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank-transfer');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [bitcoinInvoice, setBitcoinInvoice] = useState<{id: string; address: string; amount: string; expiresAt: string} | null>(null);
  // Store final order total before cart is cleared
  const [finalOrderTotal, setFinalOrderTotal] = useState(0);
  
  // Auth form state
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authFirstName, setAuthFirstName] = useState('');
  const [authLastName, setAuthLastName] = useState('');
  const [localAuthError, setLocalAuthError] = useState('');
  
  // Skip account step if already authenticated
  useEffect(() => {
    if ($isAuthenticated && currentStep === 'account') {
      setCurrentStep('shipping');
      // Pre-fill shipping info if user is logged in
      if ($currentUser) {
        setShippingInfo(prev => ({
          ...prev,
          firstName: $currentUser.firstName || prev.firstName,
          lastName: $currentUser.lastName || prev.lastName,
          email: $currentUser.email || prev.email,
          phone: $currentUser.phone || prev.phone
        }));
      }
    }
  }, [$isAuthenticated, $currentUser]);
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postcode: '',
    country: DEFAULT_COUNTRY_BY_LANG[lang] ?? 'GB'
  });

  const subtotal = $cartTotal;
  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const baseShippingCost = SHIPPING_COSTS[shippingMethod].price;
  const shippingCost = qualifiesForFreeDelivery ? 0 : baseShippingCost;
  const total = subtotal + shippingCost;
  // Products can only be added to cart after meeting £200 threshold at product page
  // So if there are products in cart, user has already qualified
  const canCheckout = products.length > 0;

  const generateOrderId = () => {
    return 'PS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };

  const createBitcoinInvoice = async () => {
    return {
      id: 'INV-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      address: 'bc1q' + Math.random().toString(36).substring(2, 34),
      amount: (total / 78000).toFixed(8),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    };
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    
    // Create order object for user history
    const orderData: Omit<Order, 'id' | 'date'> = {
      status: 'pending',
      paymentMethod,
      paymentStatus: 'pending',
      items: products.map(p => ({
        id: p.id,
        title: p.title,
        quantity: p.quantity,
        price: p.price
      })),
      subtotal: $cartTotal,
      shipping: shippingCost,
      discount: paymentMethod === 'bitcoin' ? total * 0.1 : 0,
      total: paymentMethod === 'bitcoin' ? total * 0.9 : total,
      shippingAddress: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        county: shippingInfo.county,
        postcode: shippingInfo.postcode
      }
    };
    
    // Save order if user is authenticated
    if ($isAuthenticated) {
      addOrder(orderData);
    }
    
    if (paymentMethod === 'bitcoin') {
      const invoice = await createBitcoinInvoice();
      setBitcoinInvoice(invoice);
      // Store totals before clearing cart
      setFinalOrderTotal(total * 0.9); // Bitcoin gets 10% off
      setIsProcessing(false);
      setOrderComplete(true);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Store totals before clearing cart
      setFinalOrderTotal(total);
      clearCart();
      setOrderComplete(true);
      setIsProcessing(false);
    }
  };

  // Auth handlers
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalAuthError('');
    
    if (checkoutMode === 'register') {
      if (authPassword !== authConfirmPassword) {
        setLocalAuthError('Passwords do not match');
        return;
      }
      if (authPassword.length < 8) {
        setLocalAuthError('Password must be at least 8 characters');
        return;
      }
      try {
        await registerWithEmail(authEmail, authPassword, authFirstName, authLastName);
        setShippingInfo(prev => ({
          ...prev,
          firstName: authFirstName,
          lastName: authLastName,
          email: authEmail
        }));
        setCurrentStep('shipping');
      } catch (err) {}
    } else if (checkoutMode === 'login') {
      try {
        await loginWithEmail(authEmail, authPassword);
        setCurrentStep('shipping');
      } catch (err) {}
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setCurrentStep('shipping');
    } catch (err) {}
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      setCurrentStep('shipping');
    } catch (err) {}
  };

  const handleContinueAsGuest = () => {
    setCheckoutMode('guest');
    setCurrentStep('shipping');
  };

  // Progress Step Component
  const ProgressSteps = () => {
    // Don't show account step in progress if authenticated or guest
    const steps = currentStep === 'account' 
      ? ['account', 'shipping', 'payment', 'review']
      : ['shipping', 'payment', 'review'];
    const stepLabelsMap: Record<string, string> = {
      account: 'Account',
      shipping: 'Shipping',
      payment: 'Payment',
      review: 'Review'
    };
    
    const isStepCompleted = (step: string) => {
      const stepOrder = ['account', 'shipping', 'payment', 'review'];
      return stepOrder.indexOf(step) < stepOrder.indexOf(currentStep);
    };
    
    return (
      <div style={{ 
        ...cardStyle, 
        padding: '24px 32px', 
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {steps.map((step, index) => {
          const isActive = currentStep === step;
          const isCompleted = isStepCompleted(step);
          
          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isCompleted 
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : isActive 
                      ? 'linear-gradient(135deg, #0077b6, #023e8a)'
                      : '#f1f5f9',
                  color: isCompleted || isActive ? 'white' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '16px',
                  boxShadow: isActive ? '0 4px 12px rgba(0, 119, 182, 0.3)' : 'none'
                }}>
                  {isCompleted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    index + 1
                  )}
              </div>
              <span style={{ 
                fontWeight: isActive ? '700' : '600', 
                color: isActive ? '#0077b6' : isCompleted ? '#10b981' : '#94a3b8',
                fontSize: '15px'
              }}>
                {stepLabelsMap[step]}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div style={{ 
                width: '60px', 
                height: '3px', 
                background: isCompleted ? '#10b981' : '#e2e8f0',
                margin: '0 20px',
                borderRadius: '10px'
              }}></div>
            )}
          </div>
        );
      })}
    </div>
  );
  };

  // Minimum order warning
  if (!canCheckout && products.length > 0 && !orderComplete) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div style={{ ...cardStyle, padding: '60px 40px', textAlign: 'center' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 28px'
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '16px', fontSize: '1.75rem' }}>
                Minimum Order Required
              </h3>
              <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '1.1rem', maxWidth: '450px', margin: '0 auto 24px' }}>
                Our minimum order value is <strong style={{ color: '#1e293b' }}>{formatPrice(MIN_ORDER_AMOUNT, currency)}</strong>.<br />
                Your current cart total is <strong style={{ color: '#0077b6' }}>{formatPrice(subtotal, currency)}</strong>.
              </p>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
                padding: '16px 24px',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '32px'
              }}>
                <span style={{ color: '#92400e', fontWeight: '600' }}>
                  Add <strong>{formatPrice(MIN_ORDER_AMOUNT - subtotal, currency)}</strong> more to proceed
                </span>
              </div>
              <br />
              <a 
                href="/shop/" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  fontSize: '16px',
                  boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)'
                }}
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0 && !orderComplete) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div style={{ ...cardStyle, padding: '80px 40px', textAlign: 'center' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px'
              }}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5">
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
              </div>
              <h3 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '12px', fontSize: '1.75rem' }}>
                Your cart is empty
              </h3>
              <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1.1rem' }}>
                Add some products before checkout.
              </p>
              <a 
                href="/shop/" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  fontSize: '16px',
                  boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)'
                }}
              >
                Browse Peptides
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    if (paymentMethod === 'bitcoin' && bitcoinInvoice) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={{ ...cardStyle, padding: '48px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'linear-gradient(135deg, #f7931a, #e8821c)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 8px 24px rgba(247, 147, 26, 0.35)'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 32 32" fill="white">
                      <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm5.155-21.672c-.372-2.453-2.341-3.267-5.008-3.49V4h-2.064v2.76c-.543 0-1.098.012-1.65.024V4H10.37v2.838H6.646v1.846s1.527-.028 1.502 0c.84 0 1.11.487 1.19.906v3.842h.2l-.2.044v5.38c-.037.266-.193.69-.778.69.028.024-1.5 0-1.5 0l-.41 2.064h3.603v2.87h2.064v-2.82c.563.012 1.11.018 1.65.018v2.802h2.063v-2.838c3.484-.2 5.92-1.017 6.224-4.106.245-2.488-1.147-3.6-3.446-4.048 1.407-.547 2.28-1.594 2.016-3.391zm-2.678 5.883c0 2.434-4.166 2.157-5.497 2.157v-4.32c1.33 0 5.497-.38 5.497 2.163zm-.918-5.02c0 2.2-3.475 1.946-4.58 1.946v-3.9c1.104 0 4.58-.348 4.58 1.954z"/>
                    </svg>
                  </div>
                  <h3 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '8px', fontSize: '1.75rem' }}>
                    Complete Your Bitcoin Payment
                  </h3>
                  <p style={{ color: '#64748b' }}>Order ID: <strong style={{ color: '#0077b6' }}>{orderId}</strong></p>
                </div>
                
                <div style={{ 
                  background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                  borderRadius: '16px',
                  padding: '32px',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#92400e', fontWeight: '600', marginBottom: '8px' }}>Send exactly:</p>
                  <h2 style={{ color: '#78350f', fontWeight: '800', marginBottom: '24px', fontSize: '2rem' }}>{bitcoinInvoice.amount} BTC</h2>
                  <p style={{ color: '#92400e', fontWeight: '600', marginBottom: '12px' }}>To this address:</p>
                  <div style={{ 
                    background: 'white', 
                    padding: '16px', 
                    borderRadius: '12px',
                    border: '2px solid rgba(120, 53, 15, 0.2)',
                    wordBreak: 'break-all',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    color: '#1e293b'
                  }}>
                    {bitcoinInvoice.address}
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(bitcoinInvoice.address)}
                    style={{
                      marginTop: '16px',
                      background: '#78350f',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                    Copy Address
                  </button>
                </div>
                
                <div style={{ 
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '2px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <strong style={{ color: '#92400e' }}>Payment expires in 15 minutes.</strong>
                    <span style={{ color: '#a16207' }}> Please complete the payment before the timer expires.</span>
                  </div>
                </div>
                
                <p style={{ color: '#64748b', textAlign: 'center', fontSize: '14px', marginBottom: '24px' }}>
                  Once payment is confirmed on the blockchain, you will receive a confirmation email at <strong>{shippingInfo.email}</strong>
                </p>
                
                <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '24px', textAlign: 'center' }}>
                  <p style={{ color: '#64748b', marginBottom: '8px' }}>Order Summary</p>
                  <p style={{ color: '#0077b6', fontWeight: '800', fontSize: '1.5rem', margin: 0 }}>
                    {formatPrice(finalOrderTotal, currency)} <span style={{ color: '#64748b', fontWeight: '500', fontSize: '14px' }}>(≈ {bitcoinInvoice.amount} BTC)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Bank Transfer confirmation
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div style={{ ...cardStyle, padding: '48px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '8px', fontSize: '1.75rem' }}>
                  Order Confirmed!
                </h3>
                <p style={{ color: '#64748b', marginBottom: '4px' }}>Order ID: <strong style={{ color: '#0077b6' }}>{orderId}</strong></p>
                <p style={{ color: '#64748b' }}>A confirmation email has been sent to <strong>{shippingInfo.email}</strong></p>
              </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.05), rgba(0, 150, 199, 0.05))',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '24px'
              }}>
                <h5 style={{ 
                  color: '#1e293b', 
                  fontWeight: '700', 
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Payment Instructions Coming Soon
                </h5>
                <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: '1.7' }}>
                  Our bank transfer details and payment instructions will be sent to <strong style={{ color: '#0077b6' }}>{shippingInfo.email}</strong> shortly.
                </p>
                <div style={{ 
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                    </div>
                    <div>
                      <p style={{ color: '#1e293b', fontWeight: '600', marginBottom: '4px' }}>What happens next?</p>
                      <p style={{ color: '#64748b', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                        Check your inbox for an email with our bank details and the amount to transfer: <strong style={{ color: '#0077b6' }}>{formatPrice(finalOrderTotal, currency)}</strong>. 
                        Once we receive your payment, we'll send you a confirmation and dispatch your order.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.1)',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '32px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span style={{ color: '#059669' }}>
                  Don't see the email? Check your spam folder or contact us at <strong>support@ukpeptides.co.uk</strong>
                </span>
              </div>
              
              <div style={{ textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {$isAuthenticated ? (
                  <a 
                    href="/account/dashboard/" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                      color: 'white',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      fontSize: '16px',
                      boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    View My Orders
                  </a>
                ) : (
                  <a 
                    href="/shop/" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                      color: 'white',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      fontSize: '16px',
                      boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)'
                    }}
                  >
                    Continue Shopping
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Progress Steps */}
      <ProgressSteps />

      <div className="row">
        <div className="col-lg-8">
          {/* Account Step */}
          {currentStep === 'account' && (
            <div style={{ ...cardStyle, padding: '32px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 24px rgba(0, 119, 182, 0.3)'
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '10px', fontSize: '1.5rem' }}>
                  How would you like to checkout?
                </h3>
                <p style={{ color: '#64748b', marginBottom: '0' }}>
                  Create an account to track orders, or continue as guest
                </p>
              </div>

              {/* Checkout Options */}
              <div style={{ display: 'grid', gap: '16px', marginBottom: '28px' }}>
                {/* Guest Checkout */}
                <button
                  type="button"
                  onClick={handleContinueAsGuest}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    background: checkoutMode === 'guest' ? 'rgba(0, 119, 182, 0.05)' : 'white',
                    border: checkoutMode === 'guest' ? '2px solid #0077b6' : '2px solid #e2e8f0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.1), rgba(71, 85, 105, 0.1))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                      <path d="M3 6h18"></path>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>Continue as Guest</div>
                    <div style={{ color: '#64748b', fontSize: '14px' }}>Quick checkout without creating an account</div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>

                {/* Sign In */}
                <button
                  type="button"
                  onClick={() => setCheckoutMode('login')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    background: checkoutMode === 'login' ? 'rgba(0, 119, 182, 0.05)' : 'white',
                    border: checkoutMode === 'login' ? '2px solid #0077b6' : '2px solid #e2e8f0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" x2="3" y1="12" y2="12"></line>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>Sign In</div>
                    <div style={{ color: '#64748b', fontSize: '14px' }}>Already have an account? Sign in to continue</div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>

                {/* Create Account */}
                <button
                  type="button"
                  onClick={() => setCheckoutMode('register')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    background: checkoutMode === 'register' ? 'rgba(16, 185, 129, 0.05)' : 'white',
                    border: checkoutMode === 'register' ? '2px solid #10b981' : '2px solid #e2e8f0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <line x1="19" x2="19" y1="8" y2="14"></line>
                      <line x1="22" x2="16" y1="11" y2="11"></line>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '700', color: '#1e293b' }}>Create Account</span>
                      <span style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>RECOMMENDED</span>
                    </div>
                    <div style={{ color: '#64748b', fontSize: '14px' }}>Track orders, save addresses & faster checkout</div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </div>

              {/* Login/Register Form */}
              {(checkoutMode === 'login' || checkoutMode === 'register') && (
                <div style={{ 
                  background: '#f8fafc',
                  borderRadius: '16px',
                  padding: '28px'
                }}>
                  {/* Social Login Buttons */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={$isAuthLoading}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '14px',
                        background: 'white',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        color: '#1e293b',
                        fontSize: '14px'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={handleFacebookLogin}
                      disabled={$isAuthLoading}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '14px',
                        background: '#1877f2',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                  </div>

                  {/* Divider */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px', 
                    marginBottom: '24px' 
                  }}>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                    <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>or with email</span>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                  </div>

                  {/* Error Display */}
                  {(localAuthError || $authError) && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" x2="9" y1="9" y2="15"></line>
                        <line x1="9" x2="15" y1="9" y2="15"></line>
                      </svg>
                      <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>{localAuthError || $authError}</span>
                    </div>
                  )}

                  {/* Auth Form */}
                  <form onSubmit={handleAuthSubmit}>
                    {checkoutMode === 'register' && (
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label style={labelStyle}>First Name</label>
                          <input 
                            type="text" 
                            style={{ ...inputStyle, background: 'white' }}
                            value={authFirstName}
                            onChange={e => setAuthFirstName(e.target.value)}
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label style={labelStyle}>Last Name</label>
                          <input 
                            type="text" 
                            style={{ ...inputStyle, background: 'white' }}
                            value={authLastName}
                            onChange={e => setAuthLastName(e.target.value)}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div style={{ marginBottom: '16px' }}>
                      <label style={labelStyle}>Email Address</label>
                      <input 
                        type="email" 
                        style={{ ...inputStyle, background: 'white' }}
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div style={{ marginBottom: checkoutMode === 'register' ? '16px' : '24px' }}>
                      <label style={labelStyle}>Password</label>
                      <input 
                        type="password" 
                        style={{ ...inputStyle, background: 'white' }}
                        value={authPassword}
                        onChange={e => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    {checkoutMode === 'register' && (
                      <div style={{ marginBottom: '24px' }}>
                        <label style={labelStyle}>Confirm Password</label>
                        <input 
                          type="password" 
                          style={{ ...inputStyle, background: 'white' }}
                          value={authConfirmPassword}
                          onChange={e => setAuthConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={$isAuthLoading}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: $isAuthLoading ? '#94a3b8' : 'linear-gradient(135deg, #0077b6, #023e8a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: '700',
                        fontSize: '16px',
                        cursor: $isAuthLoading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                    >
                      {$isAuthLoading ? (
                        <>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid white',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }}></div>
                          {checkoutMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                        </>
                      ) : (
                        <>
                          {checkoutMode === 'login' ? 'Sign In & Continue' : 'Create Account & Continue'}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Toggle Mode */}
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                      {checkoutMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                      <button
                        type="button"
                        onClick={() => {
                          setCheckoutMode(checkoutMode === 'login' ? 'register' : 'login');
                          setLocalAuthError('');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0077b6',
                          fontWeight: '600',
                          cursor: 'pointer',
                          marginLeft: '6px'
                        }}
                      >
                        {checkoutMode === 'login' ? 'Create one' : 'Sign in'}
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shipping Form */}
          {currentStep === 'shipping' && (
            <div style={{ ...cardStyle, padding: '32px' }}>
              <h4 style={{ 
                color: '#1e293b', 
                fontWeight: '700', 
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Shipping Information
              </h4>
              <form onSubmit={handleShippingSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label style={labelStyle}>First Name *</label>
                    <input type="text" style={inputStyle} required value={shippingInfo.firstName} onChange={e => setShippingInfo({...shippingInfo, firstName: e.target.value})} placeholder="John" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label style={labelStyle}>Last Name *</label>
                    <input type="text" style={inputStyle} required value={shippingInfo.lastName} onChange={e => setShippingInfo({...shippingInfo, lastName: e.target.value})} placeholder="Doe" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label style={labelStyle}>Email *</label>
                    <input type="email" style={inputStyle} required value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} placeholder="john@example.com" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label style={labelStyle}>Phone (Optional)</label>
                    <input type="tel" style={inputStyle} value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} placeholder="+44 7123 456789" />
                  </div>
                </div>
                <div className="mb-3">
                  <label style={labelStyle}>Address *</label>
                  <input type="text" style={inputStyle} required value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} placeholder="123 Research Lane" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label style={labelStyle}>City *</label>
                    <input type="text" style={inputStyle} required value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} placeholder="London" />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label style={labelStyle}>County</label>
                    <input type="text" style={inputStyle} value={shippingInfo.county} onChange={e => setShippingInfo({...shippingInfo, county: e.target.value})} placeholder="Greater London" />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label style={labelStyle}>Postcode *</label>
                    <input type="text" style={inputStyle} required placeholder="SW1A 1AA" value={shippingInfo.postcode} onChange={e => setShippingInfo({...shippingInfo, postcode: e.target.value})} />
                  </div>
                </div>

                {/* Shipping Method Selection */}
                <h5 style={{ 
                  color: '#1e293b', 
                  fontWeight: '700', 
                  marginTop: '32px', 
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                    <path d="M15 18H9"></path>
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                    <circle cx="17" cy="18" r="2"></circle>
                    <circle cx="7" cy="18" r="2"></circle>
                  </svg>
                  Delivery Method
                </h5>
                <div 
                  onClick={() => setShippingMethod('standard')}
                  style={{ 
                    padding: '20px',
                    borderRadius: '12px',
                    border: shippingMethod === 'standard' ? '2px solid #0077b6' : '2px solid #e2e8f0',
                    background: shippingMethod === 'standard' ? 'rgba(0, 119, 182, 0.05)' : 'white',
                    cursor: 'pointer',
                    marginBottom: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: shippingMethod === 'standard' ? '6px solid #0077b6' : '2px solid #cbd5e1',
                      marginRight: '16px',
                      flexShrink: 0
                    }}></div>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{t(lang, 'checkout.shipping.standard')}</div>
                      <div style={{ color: '#64748b', fontSize: '14px' }}>3-5 business days</div>
                    </div>
                    <div style={{ fontWeight: '700', color: qualifiesForFreeDelivery ? '#10b981' : '#0077b6', fontSize: '1.1rem' }}>
                      {qualifiesForFreeDelivery ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.85rem' }}>{formatPrice(SHIPPING_COSTS.standard.price, currency)}</span>
                          {t(lang, 'common.free')}
                        </span>
                      ) : (
                        formatPrice(SHIPPING_COSTS.standard.price, currency)
                      )}
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setShippingMethod('express')}
                  style={{ 
                    padding: '20px',
                    borderRadius: '12px',
                    border: shippingMethod === 'express' ? '2px solid #0077b6' : '2px solid #e2e8f0',
                    background: shippingMethod === 'express' ? 'rgba(0, 119, 182, 0.05)' : 'white',
                    cursor: 'pointer',
                    marginBottom: '28px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: shippingMethod === 'express' ? '6px solid #0077b6' : '2px solid #cbd5e1',
                      marginRight: '16px',
                      flexShrink: 0
                    }}></div>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700', color: '#1e293b' }}>{t(lang, 'checkout.shipping.express')}</span>
                        <span style={{ 
                          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '10px',
                          fontWeight: '700'
                        }}>FAST</span>
                      </div>
                      <div style={{ color: '#64748b', fontSize: '14px' }}>1-2 business days</div>
                    </div>
                    <div style={{ fontWeight: '700', color: qualifiesForFreeDelivery ? '#10b981' : '#0077b6', fontSize: '1.1rem' }}>
                      {qualifiesForFreeDelivery ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.85rem' }}>{formatPrice(SHIPPING_COSTS.express.price, currency)}</span>
                          {t(lang, 'common.free')}
                        </span>
                      ) : (
                        formatPrice(SHIPPING_COSTS.express.price, currency)
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                    color: 'white',
                    padding: '18px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)'
                  }}
                >
                  {t(lang, 'checkout.actions.continue')}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </form>
            </div>
          )}

          {/* Payment Form */}
          {currentStep === 'payment' && (
            <div style={{ ...cardStyle, padding: '32px' }}>
              <h4 style={{ 
                color: '#1e293b', 
                fontWeight: '700', 
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                Select Payment Method
              </h4>
              <form onSubmit={handlePaymentSubmit}>
                
                {/* Bank Transfer Option */}
                <div 
                  onClick={() => setPaymentMethod('bank-transfer')}
                  style={{ 
                    padding: '24px',
                    borderRadius: '12px',
                    border: paymentMethod === 'bank-transfer' ? '2px solid #0077b6' : '2px solid #e2e8f0',
                    background: paymentMethod === 'bank-transfer' ? 'rgba(0, 119, 182, 0.05)' : 'white',
                    cursor: 'pointer',
                    marginBottom: '16px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: paymentMethod === 'bank-transfer' ? '6px solid #0077b6' : '2px solid #cbd5e1',
                      marginRight: '16px',
                      flexShrink: 0
                    }}></div>
                    <div style={{ 
                      width: '56px', 
                      height: '56px', 
                      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '20px'
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#0077b6">
                        <path d="M12.5 1.5l10 5v1H1.5v-1l10-5h1zM4.5 9h2v7h-2V9zm5 0h2v7h-2V9zm5 0h2v7h-2V9zm5 0h2v7h-2V9zM2.5 17.5h19v2h-19v-2z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px', fontSize: '1.1rem' }}>Bank Transfer</div>
                      <div style={{ color: '#64748b', fontSize: '14px' }}>Pay directly to our UK bank account</div>
                    </div>
                  </div>
                  {paymentMethod === 'bank-transfer' && (
                    <div style={{ 
                      marginTop: '16px', 
                      paddingTop: '16px', 
                      borderTop: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#64748b',
                      fontSize: '13px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" x2="12" y1="16" y2="12"></line>
                        <line x1="12" x2="12.01" y1="8" y2="8"></line>
                      </svg>
                      Orders processed within 24 hours of payment confirmation
                    </div>
                  )}
                </div>

                {/* Bitcoin Option */}
                <div 
                  onClick={() => setPaymentMethod('bitcoin')}
                  style={{ 
                    padding: '24px',
                    borderRadius: '12px',
                    border: paymentMethod === 'bitcoin' ? '2px solid #0077b6' : '2px solid #e2e8f0',
                    background: paymentMethod === 'bitcoin' ? 'rgba(0, 119, 182, 0.05)' : 'white',
                    cursor: 'pointer',
                    marginBottom: '28px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: paymentMethod === 'bitcoin' ? '6px solid #0077b6' : '2px solid #cbd5e1',
                      marginRight: '16px',
                      flexShrink: 0
                    }}></div>
                    <div style={{ 
                      width: '56px', 
                      height: '56px', 
                      background: 'linear-gradient(135deg, #f7931a, #e8821c)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '20px',
                      boxShadow: '0 4px 12px rgba(247, 147, 26, 0.3)'
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.5 8h4a2 2 0 1 1 0 4h-4v-4Z"></path>
                        <path d="M9.5 12h4.5a2 2 0 1 1 0 4H9.5v-4Z"></path>
                        <path d="M12 6v2"></path>
                        <path d="M12 16v2"></path>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '1.1rem' }}>Bitcoin (BTC)</span>
                        <span style={{ 
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>10% OFF</span>
                      </div>
                      <div style={{ color: '#64748b', fontSize: '14px' }}>Fast, secure & private payment</div>
                    </div>
                  </div>
                  {paymentMethod === 'bitcoin' && (
                    <div style={{ 
                      marginTop: '16px', 
                      paddingTop: '16px', 
                      borderTop: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#64748b',
                      fontSize: '13px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" x2="12" y1="16" y2="12"></line>
                        <line x1="12" x2="12.01" y1="8" y2="8"></line>
                      </svg>
                      You'll receive a unique Bitcoin address. Payment expires in 15 minutes.
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between">
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep('shipping')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'white',
                      color: '#64748b',
                      padding: '14px 24px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      fontWeight: '600',
                      fontSize: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    {t(lang, 'checkout.actions.back')}
                  </button>
                  <button 
                    type="submit" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                      color: 'white',
                      padding: '14px 32px',
                      borderRadius: '12px',
                      border: 'none',
                      fontWeight: '700',
                      fontSize: '16px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 119, 182, 0.4)'
                    }}
                  >
                    Review Order
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Review Order */}
          {currentStep === 'review' && (
            <div style={{ ...cardStyle, padding: '32px' }}>
              <h4 style={{ 
                color: '#1e293b', 
                fontWeight: '700', 
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                Review Your Order
              </h4>
              
              {/* Shipping Address */}
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '12px', 
                padding: '20px',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  marginBottom: '12px',
                  color: '#0077b6',
                  fontWeight: '600'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Shipping Address
                </div>
                <p style={{ color: '#1e293b', margin: 0, lineHeight: '1.6' }}>
                  <strong>{shippingInfo.firstName} {shippingInfo.lastName}</strong><br />
                  {shippingInfo.address}<br />
                  {shippingInfo.city}{shippingInfo.county ? `, ${shippingInfo.county}` : ''} {shippingInfo.postcode}<br />
                  United Kingdom
                </p>
              </div>

              {/* Payment Method */}
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '12px', 
                padding: '20px',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  marginBottom: '12px',
                  color: '#0077b6',
                  fontWeight: '600'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                  Payment Method
                </div>
                <p style={{ color: '#1e293b', margin: 0 }}>
                  {paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Bitcoin (BTC)'}
                  {paymentMethod === 'bitcoin' && (
                    <span style={{ color: '#10b981', fontWeight: '600', marginLeft: '8px' }}>• 10% discount applied</span>
                  )}
                </p>
              </div>

              {/* Items */}
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '12px', 
                padding: '20px',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  marginBottom: '16px',
                  color: '#0077b6',
                  fontWeight: '600'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <path d="M3 6h18"></path>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  Items ({products.length})
                </div>
                {products.map(product => (
                  <div key={product.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <span style={{ color: '#1e293b' }}>{product.title} × {product.quantity}</span>
                    <span style={{ fontWeight: '600', color: '#0077b6' }}>{formatPrice(product.price * product.quantity, currency)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery */}
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '12px', 
                padding: '20px',
                marginBottom: '28px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  marginBottom: '12px',
                  color: '#0077b6',
                  fontWeight: '600'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                    <path d="M15 18H9"></path>
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                    <circle cx="17" cy="18" r="2"></circle>
                    <circle cx="7" cy="18" r="2"></circle>
                  </svg>
                  Delivery
                </div>
                <p style={{ color: '#1e293b', margin: 0 }}>
                  {shippingMethod === 'express' ? 'Express Delivery (1-2 business days)' : 'Standard Delivery (3-5 business days)'} — 
                  {qualifiesForFreeDelivery ? (
                    <strong style={{ marginLeft: '4px', color: '#10b981' }}>FREE</strong>
                  ) : (
                    <strong style={{ marginLeft: '4px' }}>{formatPrice(SHIPPING_COSTS[shippingMethod].price, currency)}</strong>
                  )}
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep('payment')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    color: '#64748b',
                    padding: '14px 24px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    fontWeight: '600',
                    fontSize: '15px',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  {t(lang, 'checkout.actions.back')}
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: isProcessing ? '#94a3b8' : 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    boxShadow: isProcessing ? 'none' : '0 4px 14px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  {isProcessing ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid white',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      {t(lang, 'checkout.actions.placeOrder')} — {formatPrice((paymentMethod === 'bitcoin' ? total * 0.9 : total), currency)}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ ...cardStyle, padding: '28px' }}>
              <h5 style={{ 
                color: '#1e293b', 
                fontWeight: '700', 
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Order Summary
              </h5>
              
              {/* Items */}
              <div style={{ marginBottom: '20px' }}>
                {products.map(product => (
                  <div key={product.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div>
                      <div style={{ color: '#1e293b', fontWeight: '500' }}>{product.title}</div>
                      <div style={{ color: '#94a3b8', fontSize: '13px' }}>Qty: {product.quantity}</div>
                    </div>
                    <span style={{ fontWeight: '600', color: '#0077b6' }}>{formatPrice(product.price * product.quantity, currency)}</span>
                  </div>
                ))}
              </div>
              
              {/* Pricing Breakdown */}
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '10px', 
                padding: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#64748b' }}>Subtotal</span>
                  <span style={{ color: '#1e293b', fontWeight: '500' }}>{formatPrice($cartTotal, currency)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#64748b' }}>
                    {shippingMethod === 'express' ? 'Express' : 'Standard'} Shipping
                  </span>
                  {qualifiesForFreeDelivery ? (
                    <span style={{ color: '#10b981', fontWeight: '600' }}>FREE</span>
                  ) : (
                    <span style={{ color: '#1e293b', fontWeight: '500' }}>{formatPrice(SHIPPING_COSTS[shippingMethod].price, currency)}</span>
                  )}
                </div>

                {qualifiesForFreeDelivery && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 0',
                    marginBottom: '6px'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '500' }}>Free delivery on orders over {formatPrice(FREE_DELIVERY_THRESHOLD, currency)}</span>
                  </div>
                )}

                {paymentMethod === 'bitcoin' && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    marginTop: '10px',
                    borderTop: '1px dashed #cbd5e1'
                  }}>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>Bitcoin Discount (10%)</span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>-{formatPrice(total * 0.1, currency)}</span>
                  </div>
                )}
              </div>
              
              {/* Total */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderTop: '2px solid #e2e8f0'
              }}>
                <span style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: '700' }}>Total</span>
                <span style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {formatPrice((paymentMethod === 'bitcoin' ? total * 0.9 : total), currency)}
                </span>
              </div>

              {/* Security Badge */}
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '10px',
                padding: '14px',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#059669', fontWeight: '600', fontSize: '14px' }}>SSL Secure Checkout</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>256-bit encryption</div>
                </div>
              </div>
            </div>

            {/* Payment Methods Card */}
            <div style={{ ...cardStyle, padding: '24px', marginTop: '16px' }}>
              <h6 style={{ 
                color: '#1e293b', 
                fontWeight: '600', 
                marginBottom: '16px',
                fontSize: '14px'
              }}>We Accept</h6>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                  width: '64px', 
                  height: '44px', 
                  background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 119, 182, 0.3)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12.5 1.5l10 5v1H1.5v-1l10-5h1zM4.5 9h2v7h-2V9zm5 0h2v7h-2V9zm5 0h2v7h-2V9zm5 0h2v7h-2V9zM2.5 17.5h19v2h-19v-2z"/>
                  </svg>
                </div>
                <div style={{ 
                  width: '64px', 
                  height: '44px', 
                  background: 'linear-gradient(135deg, #f7931a, #e8821c)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(247, 147, 26, 0.3)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="white">
                    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm5.155-21.672c-.372-2.453-2.341-3.267-5.008-3.49V4h-2.064v2.76c-.543 0-1.098.012-1.65.024V4H10.37v2.838H6.646v1.846s1.527-.028 1.502 0c.84 0 1.11.487 1.19.906v3.842h.2l-.2.044v5.38c-.037.266-.193.69-.778.69.028.024-1.5 0-1.5 0l-.41 2.064h3.603v2.87h2.064v-2.82c.563.012 1.11.018 1.65.018v2.802h2.063v-2.838c3.484-.2 5.92-1.017 6.224-4.106.245-2.488-1.147-3.6-3.446-4.048 1.407-.547 2.28-1.594 2.016-3.391zm-2.678 5.883c0 2.434-4.166 2.157-5.497 2.157v-4.32c1.33 0 5.497-.38 5.497 2.163zm-.918-5.02c0 2.2-3.475 1.946-4.58 1.946v-3.9c1.104 0 4.58-.348 4.58 1.954z"/>
                  </svg>
                </div>
              </div>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '12px', marginBottom: 0, lineHeight: '1.5' }}>
                Bank Transfer & Bitcoin accepted. Order tracking included.
              </p>
            </div>

            {/* Trust & Reassurance Section */}
            <div style={{ ...cardStyle, padding: '24px', marginTop: '16px' }}>
              <h6 style={{ 
                color: '#1e293b', 
                fontWeight: '600', 
                marginBottom: '16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Why Order With Confidence
              </h6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>
                    <strong style={{ color: '#1e293b' }}>99%+ Purity Guaranteed</strong> — All products verified via HPLC testing
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>
                    <strong style={{ color: '#1e293b' }}>Discreet Packaging</strong> — Plain packaging with no product labels
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>
                    <strong style={{ color: '#1e293b' }}>Same-Day Dispatch</strong> — Orders before 2pm shipped same day
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>
                    <strong style={{ color: '#1e293b' }}>UK-Based Support</strong> — Real customer service, not bots
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>
                    <strong style={{ color: '#1e293b' }}>5000+ Orders Delivered</strong> — Trusted by UK researchers
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '12px',
              marginTop: '16px'
            }}>
              <div style={{ 
                background: 'white',
                borderRadius: '12px',
                padding: '16px 12px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" style={{ marginBottom: '8px' }}>
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <path d="M15 18H9"></path>
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
                <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '500' }}>UK Shipping</div>
              </div>
              <div style={{ 
                background: 'white',
                borderRadius: '12px',
                padding: '16px 12px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" style={{ marginBottom: '8px' }}>
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '500' }}>Lab Tested</div>
              </div>
              <div style={{ 
                background: 'white',
                borderRadius: '12px',
                padding: '16px 12px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" style={{ marginBottom: '8px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17,8 12,3 7,8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
                <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '500' }}>Fast Dispatch</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        /* Mobile First Checkout Styles */
        @media (max-width: 991px) {
          .checkout-container .col-lg-8,
          .checkout-container .col-lg-4 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          .checkout-container .col-lg-4 {
            margin-top: 24px;
          }
        }
        
        @media (max-width: 767px) {
          /* Make progress steps more compact */
          .checkout-container [style*="display: flex"][style*="gap: 12px"] {
            gap: 8px !important;
          }
          
          /* Stack social login buttons on mobile */
          .checkout-container [style*="display: grid"][style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          /* Improve touch targets */
          .checkout-container button,
          .checkout-container input,
          .checkout-container select {
            min-height: 48px;
          }
          
          /* Cart item in sidebar */
          .checkout-container .d-flex.align-items-center {
            flex-wrap: wrap;
          }
        }
        
        @media (max-width: 575px) {
          /* Form padding adjustments */
          .checkout-container [style*="padding: 32px"] {
            padding: 20px !important;
          }
          
          .checkout-container [style*="padding: 28px"] {
            padding: 16px !important;
          }
          
          /* Trust badges - 2 column on small screens */
          .checkout-container [style*="gridTemplateColumns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          /* Hide third badge on very small screens */
          .checkout-container [style*="gridTemplateColumns: repeat(3, 1fr)"] > div:nth-child(3) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
