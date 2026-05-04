import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, cartTotal, clearCart } from '../scripts/cartStore';
import {
  addOrder,
  authError,
  currentUser,
  isAuthenticated,
  isAuthLoading,
  loginWithEmail,
  loginWithFacebook,
  loginWithGoogle,
  registerWithEmail,
} from '../store/authStore';
import type { Order } from '../store/authStore';

type Step = 'account' | 'shipping' | 'payment' | 'review';
type PaymentMethod = 'bank-transfer' | 'bitcoin';
type ShippingMethod = 'standard' | 'express';
type CheckoutMode = 'guest' | 'login' | 'register';

const SHIPPING_COSTS: Record<ShippingMethod, { price: number; labelKey: string; timeKey: string }> = {
  standard: { price: 9.90, labelKey: 'standardDelivery', timeKey: 'standardTime' },
  express: { price: 19.90, labelKey: 'expressDelivery', timeKey: 'expressTime' },
};

const MIN_ORDER_AMOUNT = 200;
const FREE_DELIVERY_THRESHOLD = 500;

const checkoutSteps: Step[] = ['account', 'shipping', 'payment', 'review'];

interface CheckoutProps {
  labels?: Record<string, string>;
  paths?: {
    shop?: string;
    dashboard?: string;
  };
  locale?: string;
}

const defaultLabels: Record<string, string> = {
  account: 'Account', shipping: 'Delivery', payment: 'Payment', review: 'Review', summary: 'Summary', subtotal: 'Subtotal', delivery: 'Delivery', free: 'Free', total: 'Total', bitcoinDiscount: 'Bitcoin discount', ruoRequired: 'RUO confirmation required.', ruoRequiredBody: 'These materials are supplied only for laboratory research use.', emptyCart: 'Your cart is empty', minimumRequired: 'Minimum order required', addProducts: 'Add research products before checkout.', minimumBody: 'A minimum order value of €{minimum} applies. Add further items to continue.', browseCatalogue: 'Browse catalogue', orderReceived: 'Order received', completeBitcoin: 'Complete Bitcoin payment', orderConfirmed: 'Order confirmed', orderId: 'Order ID:', sendExactly: 'Send exactly', to: 'to:', copyAddress: 'Copy address', bankInstructions: 'Bank transfer instructions will be sent to {email}.', orderTotal: 'Order total:', viewOrders: 'View orders', continueShopping: 'Continue shopping', chooseContinue: 'Choose how to continue', guestCheckout: 'Guest checkout', signIn: 'Sign in', createAccount: 'Create account', continueGuest: 'Continue as guest', firstName: 'First name', lastName: 'Last name', email: 'Email', password: 'Password', confirmPassword: 'Confirm password', pleaseWait: 'Please wait...', google: 'Google', facebook: 'Facebook', passwordsMismatch: 'Passwords do not match.', passwordLength: 'Password must be at least 8 characters.', shippingDetails: 'Shipping details', phone: 'Phone', address: 'Address', city: 'City', county: 'Region / state', postcode: 'Postal code', deliveryMethod: 'Delivery method', standardDelivery: 'Standard delivery', standardTime: '3-5 business days', expressDelivery: 'Express delivery', expressTime: '1-2 business days', continuePayment: 'Continue to payment', selectPayment: 'Select payment method', bankTransfer: 'Bank transfer', bankTransferHelp: 'Instructions are emailed after order confirmation.', bitcoin: 'Bitcoin', bitcoinHelp: 'Includes a 10% payment discount.', reviewOrder: 'Review order', back: 'Back', confirmOrder: 'Confirm research-use order', bitcoinInvoice: 'Bitcoin invoice', researchUseOnly: 'Research use only.', reviewRuo: 'By placing this order you confirm the products will be used only for in-vitro laboratory research.', placingOrder: 'Placing order...', placeOrder: 'Place order · €{total}'
};

export default function Checkout({ labels, paths, locale = 'en' }: CheckoutProps) {
  const copy = { ...defaultLabels, ...labels };
  const $cartItems = useStore(cartItems);
  const $cartTotal = useStore(cartTotal);
  const $currentUser = useStore(currentUser);
  const $isAuthenticated = useStore(isAuthenticated);
  const $isAuthLoading = useStore(isAuthLoading);
  const $authError = useStore(authError);

  const products = Object.values($cartItems);
  const [currentStep, setCurrentStep] = useState<Step>('account');
  const [checkoutMode, setCheckoutMode] = useState<CheckoutMode>('guest');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank-transfer');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [bitcoinInvoice, setBitcoinInvoice] = useState<{ address: string; amount: string } | null>(null);
  const [finalOrderTotal, setFinalOrderTotal] = useState(0);

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authFirstName, setAuthFirstName] = useState('');
  const [authLastName, setAuthLastName] = useState('');
  const [localAuthError, setLocalAuthError] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postcode: '',
    country: 'DE',
  });

  useEffect(() => {
    if ($isAuthenticated && $currentUser) {
      setShippingInfo((previous) => ({
        ...previous,
        firstName: $currentUser.firstName || previous.firstName,
        lastName: $currentUser.lastName || previous.lastName,
        email: $currentUser.email || previous.email,
        phone: $currentUser.phone || previous.phone,
      }));
      if (currentStep === 'account') setCurrentStep('shipping');
    }
  }, [$isAuthenticated, $currentUser, currentStep]);

  const qualifiesForFreeDelivery = $cartTotal >= FREE_DELIVERY_THRESHOLD;
  const shippingCost = qualifiesForFreeDelivery ? 0 : SHIPPING_COSTS[shippingMethod].price;
  const paymentDiscount = paymentMethod === 'bitcoin' ? ($cartTotal + shippingCost) * 0.1 : 0;
  const orderTotal = $cartTotal + shippingCost - paymentDiscount;
  const canCheckout = products.length > 0 && $cartTotal >= MIN_ORDER_AMOUNT;
  const authErrorText = $authError ? copy[$authError] || $authError : '';

  function generateOrderId() {
    return `PS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  }

  async function handleAuthSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLocalAuthError('');

    if (checkoutMode === 'register') {
      if (authPassword !== authConfirmPassword) {
        setLocalAuthError(copy.passwordsMismatch);
        return;
      }
      if (authPassword.length < 8) {
        setLocalAuthError(copy.passwordLength);
        return;
      }
      await registerWithEmail(authEmail, authPassword, authFirstName, authLastName);
      setShippingInfo((previous) => ({ ...previous, firstName: authFirstName, lastName: authLastName, email: authEmail }));
      setCurrentStep('shipping');
      return;
    }

    if (checkoutMode === 'login') {
      await loginWithEmail(authEmail, authPassword);
      setCurrentStep('shipping');
    }
  }

  async function handleSocialLogin(provider: 'google' | 'facebook') {
    if (provider === 'google') await loginWithGoogle();
    if (provider === 'facebook') await loginWithFacebook();
    setCurrentStep('shipping');
  }

  function handleShippingSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCurrentStep('payment');
  }

  function handlePaymentSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCurrentStep('review');
  }

  async function createBitcoinInvoice(invoiceOrderId: string) {
    const response = await fetch('/api/create-bitcoin-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: invoiceOrderId,
        amount: Number(orderTotal.toFixed(2)),
        currency: 'EUR',
        buyerEmail: shippingInfo.email || authEmail,
        description: `Peptide Shop order ${invoiceOrderId}`,
        locale,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.success || !data.invoice?.btcAddress || !data.invoice?.btcAmount) {
      throw new Error(data.code || 'bitcoin_invoice_create_failed');
    }
    return {
      address: data.invoice.btcAddress,
      amount: data.invoice.btcAmount,
    };
  }

  async function createServerOrder(serverOrderId: string) {
    const response = await fetch('/api/orders', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: serverOrderId,
        email: shippingInfo.email || authEmail,
        paymentMethod,
        subtotal: Number($cartTotal.toFixed(2)),
        shipping: Number(shippingCost.toFixed(2)),
        discount: Number(paymentDiscount.toFixed(2)),
        total: Number(orderTotal.toFixed(2)),
        currency: 'EUR',
        locale,
        shippingAddress: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          county: shippingInfo.county,
          postcode: shippingInfo.postcode,
          country: shippingInfo.country,
        },
        items: products.map((product) => ({
          id: product.id,
          productId: product.id,
          slug: product.id,
          title: product.title,
          variant: [product.size, product.color].filter(Boolean).join(' / ') || 'Standard',
          quantity: product.quantity,
          unitPrice: product.price,
        })),
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      throw new Error(data.code || 'order_create_failed');
    }
    return data.order;
  }

  async function handlePlaceOrder() {
    setIsProcessing(true);
    setOrderError('');
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    const orderData: Omit<Order, 'id' | 'date'> = {
      status: 'pending',
      paymentMethod,
      paymentStatus: 'pending',
      items: products.map((product) => ({
        id: product.id,
        title: product.title,
        quantity: product.quantity,
        price: product.price,
      })),
      subtotal: $cartTotal,
      shipping: shippingCost,
      discount: paymentDiscount,
      total: orderTotal,
      shippingAddress: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        county: shippingInfo.county,
        postcode: shippingInfo.postcode,
      },
    };

    try {
      let invoice: { address: string; amount: string } | null = null;
      if (paymentMethod === 'bitcoin') {
        invoice = await createBitcoinInvoice(newOrderId);
      }

      await createServerOrder(newOrderId);

      if (paymentMethod === 'bitcoin') setBitcoinInvoice(invoice);
      else clearCart();

      if ($isAuthenticated) addOrder(orderData);
      setFinalOrderTotal(orderTotal);
      setOrderComplete(true);
    } catch (error) {
      setOrderError(paymentMethod === 'bitcoin' ? copy.bitcoinInvoiceError : 'Order could not be placed. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  }

  function ProgressSteps() {
    const visibleSteps = $isAuthenticated ? checkoutSteps.filter((step) => step !== 'account') : checkoutSteps;
    const activeIndex = visibleSteps.indexOf(currentStep);

    return (
      <ol className="checkout-progress" aria-label="Checkout progress">
        {visibleSteps.map((step, index) => (
          <li key={step} className={index < activeIndex ? 'is-complete' : index === activeIndex ? 'is-active' : ''}>
            <span>{index + 1}</span>
            {copy[step]}
          </li>
        ))}
      </ol>
    );
  }

  function OrderSummary() {
    return (
      <aside className="order-summary card" aria-labelledby="checkout-summary-title">
        <h2 id="checkout-summary-title">{copy.summary}</h2>
        <div className="checkout-summary-items">
          {products.map((product) => (
            <div key={product.id}>
              <span>{product.title} × {product.quantity}</span>
              <strong>€{(product.price * product.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <dl>
          <div><dt>{copy.subtotal}</dt><dd>€{$cartTotal.toFixed(2)}</dd></div>
          <div><dt>{copy.delivery}</dt><dd>{shippingCost === 0 ? copy.free : `€${shippingCost.toFixed(2)}`}</dd></div>
          {paymentDiscount > 0 && <div><dt>{copy.bitcoinDiscount}</dt><dd>-€{paymentDiscount.toFixed(2)}</dd></div>}
          <div className="summary-total"><dt>{copy.total}</dt><dd>€{orderTotal.toFixed(2)}</dd></div>
        </dl>
        <div className="ruo-banner compact"><strong>{copy.ruoRequired}</strong><span>{copy.ruoRequiredBody}</span></div>
      </aside>
    );
  }

  if (!canCheckout && !orderComplete) {
    return (
      <div className="commerce-empty card">
        <h2>{products.length === 0 ? copy.emptyCart : copy.minimumRequired}</h2>
        <p>{products.length === 0 ? copy.addProducts : copy.minimumBody.replace('{minimum}', MIN_ORDER_AMOUNT.toFixed(2))}</p>
        <a className="btn btn-primary" href={paths?.shop || '/shop/'}>{copy.browseCatalogue}</a>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="checkout-complete card">
        <span className="eyebrow">{copy.orderReceived}</span>
        <h2>{paymentMethod === 'bitcoin' ? copy.completeBitcoin : copy.orderConfirmed}</h2>
        <p>{copy.orderId} <strong>{orderId}</strong></p>
        {paymentMethod === 'bitcoin' && bitcoinInvoice ? (
          <div className="payment-instructions">
            <p>{copy.sendExactly} <strong>{bitcoinInvoice.amount} BTC</strong> {copy.to}</p>
            <code>{bitcoinInvoice.address}</code>
            <button className="btn btn-secondary" type="button" onClick={() => navigator.clipboard.writeText(bitcoinInvoice.address)}>{copy.copyAddress}</button>
          </div>
        ) : (
          <div className="payment-instructions">
            <p>{copy.bankInstructions.replace('{email}', shippingInfo.email)}</p>
            <p>{copy.orderTotal} <strong>€{finalOrderTotal.toFixed(2)}</strong></p>
          </div>
        )}
        <div className="checkout-actions">
          {$isAuthenticated && <a className="btn btn-primary" href={paths?.dashboard || '/account/dashboard/'}>{copy.viewOrders}</a>}
          <a className="btn btn-secondary" href={paths?.shop || '/shop/'}>{copy.continueShopping}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-flow">
      <ProgressSteps />
      <div className="commerce-layout">
        <main className="checkout-main">
          {currentStep === 'account' && (
            <section className="card checkout-panel">
              <span className="eyebrow">{copy.account}</span>
              <h2>{copy.chooseContinue}</h2>
              <div className="checkout-mode-grid">
                <button className={checkoutMode === 'guest' ? 'is-selected' : ''} type="button" onClick={() => setCheckoutMode('guest')}>{copy.guestCheckout}</button>
                <button className={checkoutMode === 'login' ? 'is-selected' : ''} type="button" onClick={() => setCheckoutMode('login')}>{copy.signIn}</button>
                <button className={checkoutMode === 'register' ? 'is-selected' : ''} type="button" onClick={() => setCheckoutMode('register')}>{copy.createAccount}</button>
              </div>

              {checkoutMode === 'guest' ? (
                <div className="checkout-actions"><button className="btn btn-primary" type="button" onClick={() => setCurrentStep('shipping')}>{copy.continueGuest}</button></div>
              ) : (
                <form className="checkout-form" onSubmit={handleAuthSubmit}>
                  {checkoutMode === 'register' && (
                    <>
                      <label className="field"><span>{copy.firstName}</span><input className="input" required value={authFirstName} onChange={(event) => setAuthFirstName(event.target.value)} /></label>
                      <label className="field"><span>{copy.lastName}</span><input className="input" required value={authLastName} onChange={(event) => setAuthLastName(event.target.value)} /></label>
                    </>
                  )}
                  <label className="field"><span>{copy.email}</span><input className="input" type="email" required value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} /></label>
                  <label className="field"><span>{copy.password}</span><input className="input" type="password" required value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} /></label>
                  {checkoutMode === 'register' && <label className="field"><span>{copy.confirmPassword}</span><input className="input" type="password" required value={authConfirmPassword} onChange={(event) => setAuthConfirmPassword(event.target.value)} /></label>}
                  {(localAuthError || authErrorText) && <p className="form-error">{localAuthError || authErrorText}</p>}
                  <div className="checkout-actions">
                    <button className="btn btn-primary" type="submit" disabled={$isAuthLoading}>{$isAuthLoading ? copy.pleaseWait : checkoutMode === 'login' ? copy.signIn : copy.createAccount}</button>
                    <button className="btn btn-secondary" type="button" onClick={() => handleSocialLogin('google')}>{copy.google}</button>
                    <button className="btn btn-secondary" type="button" onClick={() => handleSocialLogin('facebook')}>{copy.facebook}</button>
                  </div>
                </form>
              )}
            </section>
          )}

          {currentStep === 'shipping' && (
            <section className="card checkout-panel">
              <span className="eyebrow">{copy.shipping}</span>
              <h2>{copy.shippingDetails}</h2>
              <form className="checkout-form" onSubmit={handleShippingSubmit}>
                {(['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'county', 'postcode'] as const).map((field) => {
                  const labelMap: Record<string, string> = {
                    firstName: copy.firstName,
                    lastName: copy.lastName,
                    email: copy.email,
                    phone: copy.phone,
                    address: copy.address,
                    city: copy.city,
                    county: copy.county,
                    postcode: copy.postcode,
                  };
                  return (
                  <label className={field === 'address' ? 'field checkout-form-wide' : 'field'} key={field}>
                    <span>{labelMap[field]}</span>
                    <input
                      className="input"
                      type={field === 'email' ? 'email' : 'text'}
                      required={field !== 'phone'}
                      value={shippingInfo[field]}
                      onChange={(event) => setShippingInfo({ ...shippingInfo, [field]: event.target.value })}
                    />
                  </label>
                  );
                })}
                <fieldset className="checkout-choice-group checkout-form-wide">
                  <legend>{copy.deliveryMethod}</legend>
                  {(Object.keys(SHIPPING_COSTS) as ShippingMethod[]).map((method) => (
                    <label className="choice-card" key={method}>
                      <input type="radio" name="shippingMethod" checked={shippingMethod === method} onChange={() => setShippingMethod(method)} />
                      <span><strong>{copy[SHIPPING_COSTS[method].labelKey]}</strong><small>{qualifiesForFreeDelivery ? copy.free : `€${SHIPPING_COSTS[method].price.toFixed(2)}`} · {copy[SHIPPING_COSTS[method].timeKey]}</small></span>
                    </label>
                  ))}
                </fieldset>
                <div className="checkout-actions checkout-form-wide"><button className="btn btn-primary" type="submit">{copy.continuePayment}</button></div>
              </form>
            </section>
          )}

          {currentStep === 'payment' && (
            <section className="card checkout-panel">
              <span className="eyebrow">{copy.payment}</span>
              <h2>{copy.selectPayment}</h2>
              <form className="checkout-stack" onSubmit={handlePaymentSubmit}>
                <label className="choice-card">
                  <input type="radio" name="payment" checked={paymentMethod === 'bank-transfer'} onChange={() => setPaymentMethod('bank-transfer')} />
                  <span><strong>{copy.bankTransfer}</strong><small>{copy.bankTransferHelp}</small></span>
                </label>
                <label className="choice-card">
                  <input type="radio" name="payment" checked={paymentMethod === 'bitcoin'} onChange={() => setPaymentMethod('bitcoin')} />
                  <span><strong>{copy.bitcoin}</strong><small>{copy.bitcoinHelp}</small></span>
                </label>
                <div className="checkout-actions"><button className="btn btn-primary" type="submit">{copy.reviewOrder}</button><button className="btn btn-ghost" type="button" onClick={() => setCurrentStep('shipping')}>{copy.back}</button></div>
              </form>
            </section>
          )}

          {currentStep === 'review' && (
            <section className="card checkout-panel">
              <span className="eyebrow">{copy.review}</span>
              <h2>{copy.confirmOrder}</h2>
              <div className="review-block">
                <h3>{copy.delivery}</h3>
                <p>{shippingInfo.firstName} {shippingInfo.lastName}<br />{shippingInfo.address}<br />{shippingInfo.city}, {shippingInfo.county} {shippingInfo.postcode}</p>
              </div>
              <div className="review-block">
                <h3>{copy.payment}</h3>
                <p>{paymentMethod === 'bitcoin' ? copy.bitcoinInvoice : copy.bankTransfer} · {copy[SHIPPING_COSTS[shippingMethod].labelKey]}</p>
              </div>
              <div className="ruo-banner compact"><strong>{copy.researchUseOnly}</strong><span>{copy.reviewRuo}</span></div>
              {orderError && <p className="form-error">{orderError}</p>}
              <div className="checkout-actions"><button className="btn btn-primary" type="button" disabled={isProcessing} onClick={handlePlaceOrder}>{isProcessing ? copy.placingOrder : copy.placeOrder.replace('{total}', orderTotal.toFixed(2))}</button><button className="btn btn-ghost" type="button" onClick={() => setCurrentStep('payment')}>{copy.back}</button></div>
            </section>
          )}
        </main>
        <OrderSummary />
      </div>
    </div>
  );
}
