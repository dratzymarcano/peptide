import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, cartTotal, clearCart, addCartItem } from '../scripts/cartStore';
import { COUNTRIES, countryName } from '../data/countries';

type Step = 'customer' | 'shipping' | 'payment';
type PaymentMethod = 'bank-transfer' | 'crypto';
type ShippingMethod = 'standard' | 'express';

const SHIPPING_COSTS: Record<ShippingMethod, { price: number; labelKey: string; timeKey: string; descKey: string }> = {
  standard: {
    price: 9.90,
    labelKey: 'standardDelivery',
    timeKey: 'standardTime',
    descKey: 'Intra-EU Standardversand diskret verpackt',
  },
  express: {
    price: 19.90,
    labelKey: 'expressDelivery',
    timeKey: 'expressTime',
    descKey: 'Prioritäre Laborabfertigung & Express-Kurier',
  },
};

const MIN_ORDER_AMOUNT = 200;
const FREE_DELIVERY_THRESHOLD = 500;

const checkoutSteps: Step[] = ['customer', 'shipping', 'payment'];

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  network: string;
  address: string;
  time: string;
  logo: string;
  qrCode: string;
}

const CRYPTO_ASSETS: CryptoAsset[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Native (SegWit)',
    address: 'bc1qw7kkuwpu4tlvcn29wdfflsckk0j5xenjlcnm2u',
    time: '10-30 Min.',
    logo: '/images/crypto/btc.svg',
    qrCode: '/images/crypto/qr-btc.png',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'ERC-20',
    address: '0x08CA715802e9B7Be5F21D8e3aB67Ab515eDde955',
    time: '1-5 Min.',
    logo: '/images/crypto/eth.svg',
    qrCode: '/images/crypto/qr-eth.png',
  },
  {
    id: 'usdt-trc20',
    name: 'Tether USD',
    symbol: 'USDT',
    network: 'Tron (TRC-20)',
    address: 'TGkyrQigqKChK4KSfEjTdSRBC2XZboKfAL',
    time: '1-3 Min.',
    logo: '/images/crypto/usdt.svg',
    qrCode: '/images/crypto/qr-usdt-trc20.png',
  },
  {
    id: 'usdt-erc20',
    name: 'Tether USD',
    symbol: 'USDT',
    network: 'Ethereum (ERC-20)',
    address: '0x08CA715802e9B7Be5F21D8e3aB67Ab515eDde955',
    time: '1-5 Min.',
    logo: '/images/crypto/usdt.svg',
    qrCode: '/images/crypto/qr-usdt-erc20.png',
  },
  {
    id: 'usdc-erc20',
    name: 'USD Coin',
    symbol: 'USDC',
    network: 'Ethereum (ERC-20)',
    address: '0x08CA715802e9B7Be5F21D8e3aB67Ab515eDde955',
    time: '1-5 Min.',
    logo: '/images/crypto/usdc.svg',
    qrCode: '/images/crypto/qr-usdc-erc20.png',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    network: 'Solana Native',
    address: 'HgxkDkaeg6anmdgQgxsAgbuKFmDLJEN5Bj3UT9B7LZj3',
    time: '< 1 Min.',
    logo: '/images/crypto/sol.svg',
    qrCode: '/images/crypto/qr-sol.png',
  },
];

const CROSS_SELL_ITEMS = [
  {
    id: 'supply-bac-water-10ml',
    sku: 'supply-bac-water-10ml--10-10-ml-vials',
    title: 'Bakteriostatisches Wasser (30 ml)',
    price: 22.00,
    size: '10 × 10 mL vials',
    thumb_src: '/images/products/bacteriostatic-water.svg',
    thumb_alt: 'Bakteriostatisches Wasser 30 ml',
  },
];

interface CheckoutProps {
  labels?: Record<string, string>;
  paths?: {
    shop?: string;
  };
  locale?: string;
}

const defaultLabels: Record<string, string> = {
  customer: 'Kundendaten',
  shipping: 'Versand & Lieferung',
  payment: 'Zahlung & Abschluss',
  review: 'Prüfung',
  summary: 'Zusammenfassung',
  subtotal: 'Zwischensumme',
  delivery: 'Lieferung',
  free: 'Kostenlos',
  total: 'Gesamt',
  ruoRequired: 'RUO-Bestätigung erforderlich.',
  ruoRequiredBody: 'Diese Materialien werden nur für Laborforschungszwecke geliefert.',
  emptyCart: 'Ihr Warenkorb ist leer',
  minimumRequired: 'Mindestbestellwert erforderlich',
  addProducts: 'Fügen Sie vor dem Checkout Forschungsprodukte hinzu.',
  minimumBody: 'Es gilt ein Mindestbestellwert von €{minimum}. Fügen Sie weitere Artikel hinzu, um fortzufahren.',
  browseCatalogue: 'Katalog durchsuchen',
  orderReceived: 'Bestellung erhalten',
  orderConfirmed: 'Bestellung bestätigt',
  orderId: 'Bestellnummer:',
  copyAddress: 'Adresse kopieren',
  bankInstructions: 'Banküberweisungsdaten werden an {email} gesendet.',
  orderTotal: 'Bestellsumme:',
  continueShopping: 'Weiter einkaufen',
  firstName: 'Vorname',
  lastName: 'Nachname',
  email: 'E-Mail',
  shippingDetails: 'Lieferdetails',
  phone: 'Telefon',
  address: 'Adresse',
  city: 'Stadt',
  county: 'Region / Bundesland',
  postcode: 'Postleitzahl',
  deliveryMethod: 'Liefermethode',
  standardDelivery: 'Standardlieferung',
  standardTime: '3-5 Werktage',
  expressDelivery: 'Expresslieferung',
  expressTime: '1-2 Werktage',
  continuePayment: 'Weiter zur Zahlung',
  selectPayment: 'Zahlungsmethode wählen',
  bankTransfer: 'Banküberweisung (SEPA)',
  bankTransferHelp: 'Anweisungen und Verwendungszweck werden nach Bestellabschluss bereitgestellt.',
  crypto: 'Kryptowährung (Instant)',
  cryptoHelp: 'Direkte Zahlung mit BTC, ETH, USDT, USDC oder SOL für sofortige Laborfreigabe.',
  reviewOrder: 'Bestellung prüfen',
  back: 'Zurück',
  confirmOrder: 'Forschungsbestellung bestätigen',
  researchUseOnly: 'Nur für Forschungszwecke (RUO).',
  reviewRuo: 'Mit dieser Bestellung bestätigen Sie, dass die Produkte ausschließlich für In-vitro-Laborforschung verwendet werden.',
  placingOrder: 'Bestellung wird übermittelt...',
  placeOrder: 'Bestellung verbindlich abschicken · €{total}',
};

export default function Checkout({ labels, paths, locale = 'de' }: CheckoutProps) {
  const copy = { ...defaultLabels, ...labels };
  const $cartItems = useStore(cartItems);
  const $cartTotal = useStore(cartTotal);

  const products = Object.values($cartItems);
  const [currentStep, setCurrentStep] = useState<Step>('customer');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank-transfer');
  const [selectedCryptoId, setSelectedCryptoId] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [finalOrderTotal, setFinalOrderTotal] = useState(0);
  const [copied, setCopied] = useState(false);

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

  const qualifiesForFreeDelivery = $cartTotal >= FREE_DELIVERY_THRESHOLD;
  const shippingCost = qualifiesForFreeDelivery ? 0 : SHIPPING_COSTS[shippingMethod].price;
  const orderTotal = $cartTotal + shippingCost;
  const canCheckout = products.length > 0 && $cartTotal >= MIN_ORDER_AMOUNT;

  function generateOrderId() {
    return `PS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  }

  function handleCopy(text: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function openLiveChat() {
    if (typeof window !== 'undefined') {
      const anyWindow = window as any;
      if (typeof anyWindow.openLiveChat === 'function') {
        anyWindow.openLiveChat();
        return;
      }
      try {
        if (anyWindow.$zoho?.salesiq?.chat?.start) {
          anyWindow.$zoho.salesiq.chat.start();
        } else if (anyWindow.$zoho?.salesiq?.floatwindow?.visible) {
          anyWindow.$zoho.salesiq.floatwindow.visible('show');
        } else {
          const widget = document.getElementById('zsiq_float') ||
                         document.getElementById('zsiq_agtpic') ||
                         document.getElementById('zsiq_mwt') ||
                         document.querySelector('.zsiq_float_chat') ||
                         document.querySelector('[id*="zsiq"]');
          if (widget) {
            (widget as HTMLElement).click();
          }
        }
      } catch (err) {
        console.error('LiveChat opening error:', err);
      }
    }
  }

  function handleCustomerSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCurrentStep('shipping');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleShippingSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCurrentStep('payment');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function createServerOrder(serverOrderId: string) {
    const response = await fetch('/api/orders/', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: serverOrderId,
        email: shippingInfo.email,
        paymentMethod: paymentMethod === 'crypto' ? 'crypto' : 'bank-transfer',
        cryptoAsset: paymentMethod === 'crypto' && selectedCryptoId ? selectedCryptoId : undefined,
        shippingMethod,
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
          productId: product.sku || product.id,
          variant: product.size || 'Standard',
          quantity: product.quantity,
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
    if (paymentMethod === 'crypto' && !selectedCryptoId) {
      setOrderError(locale === 'de' ? 'Bitte wählen Sie vor dem Absenden eine Kryptowährung für die Zahlung aus.' : 'Please select a cryptocurrency before completing your order.');
      return;
    }

    setIsProcessing(true);
    setOrderError('');
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    try {
      await createServerOrder(newOrderId);
      clearCart();
      setFinalOrderTotal(orderTotal);
      setOrderComplete(true);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      setOrderError(locale === 'de' ? 'Bestellung konnte nicht abgeschlossen werden. Bitte prüfen Sie Ihre Eingaben oder kontaktieren Sie unseren Support.' : 'Order could not be placed. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  }

  function ProgressSteps() {
    const activeIndex = checkoutSteps.indexOf(currentStep);

    return (
      <ol className="checkout-progress" aria-label="Checkout progress">
        {checkoutSteps.map((step, index) => {
          const stepLabels: Record<Step, string> = {
            customer: copy.customer || (locale === 'de' ? '1. Kundendaten' : '1. Customer Info'),
            shipping: copy.shipping || (locale === 'de' ? '2. Versand & Lieferung' : '2. Shipping & Delivery'),
            payment: copy.payment || (locale === 'de' ? '3. Zahlung & Abschluss' : '3. Payment & Complete'),
          };

          return (
            <li key={step} className={index < activeIndex ? 'is-complete' : index === activeIndex ? 'is-active' : ''}>
              <span>{index + 1}</span>
              {stepLabels[step]}
            </li>
          );
        })}
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
          <div className="summary-total"><dt>{copy.total}</dt><dd>€{orderTotal.toFixed(2)}</dd></div>
        </dl>
        <div className="ruo-banner compact">
          <strong>{copy.ruoRequired}</strong>
          <span>{copy.ruoRequiredBody}</span>
        </div>

        <div className="checkout-crosssell" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '8px' }}>
            {locale === 'de' ? 'Häufig zusammen bestellt:' : 'Frequently added supplies:'}
          </div>
          <div style={{ display: 'grid', gap: '8px' }}>
            {CROSS_SELL_ITEMS.map((item) => {
              const inCart = !!$cartItems[item.sku] || !!$cartItems[item.id];
              return (
                <div
                  key={item.sku}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    gap: '8px',
                  }}
                >
                  <img
                    src={item.thumb_src}
                    alt={item.thumb_alt}
                    style={{ width: '32px', height: '32px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px', border: '1px solid var(--color-border)' }}
                    loading="lazy"
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-ink-3)' }}>
                      €{item.price.toFixed(2)}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`btn ${inCart ? 'btn-ghost' : 'btn-secondary'} btn-sm`}
                    style={{ fontSize: '11px', padding: '3px 8px', height: 'auto', whiteSpace: 'nowrap' }}
                    onClick={() => addCartItem(item)}
                  >
                    {inCart ? '+ Weiter' : '+ Hinzufügen'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  if (!canCheckout && !orderComplete) {
    return (
      <div className="commerce-empty card">
        <h2>{products.length === 0 ? copy.emptyCart : copy.minimumRequired}</h2>
        <p>{products.length === 0 ? copy.addProducts : copy.minimumBody.replace('{minimum}', MIN_ORDER_AMOUNT.toFixed(2))}</p>
        <a className="btn btn-primary" href={paths?.shop || '/catalog/'}>{copy.browseCatalogue}</a>
      </div>
    );
  }

  if (orderComplete) {
    const activeCrypto = CRYPTO_ASSETS.find((c) => c.id === selectedCryptoId) || CRYPTO_ASSETS[0];

    return (
      <div className="checkout-complete card" style={{ maxWidth: '720px', margin: '0 auto', padding: 'var(--space-6)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '999px', background: 'var(--color-primary-50)', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
          {locale === 'de' ? 'Vielen Dank für Ihre Bestellung!' : copy.orderConfirmed}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--color-ink-2)', marginBottom: 'var(--space-4)' }}>
          {copy.orderId} <strong style={{ color: 'var(--color-primary)', fontFamily: 'monospace' }}>{orderId}</strong> · {copy.orderTotal} <strong>€{finalOrderTotal.toFixed(2)}</strong>
        </p>

        {paymentMethod === 'bank-transfer' ? (
          <div className="payment-instructions" style={{ margin: 'var(--space-4) 0', padding: 'var(--space-5)', background: '#FEF3C7', borderRadius: 'var(--radius-md)', border: '1px solid #F59E0B' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: 'var(--space-3)' }}>
              <div style={{ fontSize: '24px', lineHeight: 1 }}>💬</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#92400E', margin: '0 0 6px' }}>
                  {locale === 'de' ? 'Wichtiger Hinweis zur Banküberweisung:' : 'Important Bank Transfer Notice:'}
                </h3>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#78350F', margin: '0 0 10px', lineHeight: 1.45 }}>
                  {locale === 'de'
                    ? 'Bitte fordern Sie die Bankverbindung für eine schnellere Bearbeitung im Live-Chat beim Kundenservice an.'
                    : 'Please request the bank account details from customer support on live chat for faster processing.'}
                </p>
                <p style={{ fontSize: '13px', color: '#92400E', margin: '0 0 14px', lineHeight: 1.5 }}>
                  {locale === 'de'
                    ? `Nennen Sie unserem Support im Live-Chat einfach Ihre Bestellnummer ${orderId}. Unser Team übermittelt Ihnen umgehend die aktuellen Bankdaten (IBAN & BIC) für eine priorisierte Freigabe.`
                    : `Simply provide your order reference ${orderId} to customer support on live chat. Our team will immediately provide the active bank details for prioritized processing.`}
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ background: '#D97706', borderColor: '#B45309', color: '#fff', fontWeight: 600, padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  onClick={openLiveChat}
                >
                  <span>💬</span>
                  <span>{locale === 'de' ? 'Live-Chat öffnen (Bankverbindung anfordern)' : 'Open Live Chat to Request Bank Details'}</span>
                </button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(217, 119, 6, 0.3)', paddingTop: '12px', marginTop: '12px', fontSize: '12px', color: '#92400E' }}>
              {locale === 'de'
                ? `Eine Bestätigung mit allen Bestelldaten wurde zusätzlich an ${shippingInfo.email} gesendet.`
                : `A confirmation email with your order summary has also been sent to ${shippingInfo.email}.`}
            </div>
          </div>
        ) : (
          <div className="payment-instructions" style={{ margin: 'var(--space-4) 0', padding: 'var(--space-5)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={activeCrypto.logo} alt={activeCrypto.name} style={{ width: '28px', height: '28px' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>
                  {locale === 'de' ? `${activeCrypto.name}-Zahlung ausführen` : `Complete ${activeCrypto.name} Payment`}
                </h3>
              </div>
              <span className="badge badge-blue" style={{ fontSize: '12px', padding: '4px 8px' }}>{activeCrypto.network}</span>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--color-ink-2)', marginBottom: 'var(--space-4)' }}>
              {locale === 'de'
                ? `Bitte überweisen Sie den Betrag von €${finalOrderTotal.toFixed(2)} Gegenwert in ${activeCrypto.symbol} an folgende Wallet-Adresse:`
                : `Please send €${finalOrderTotal.toFixed(2)} equivalent in ${activeCrypto.symbol} to the wallet address below:`}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 'var(--space-4)', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '8px', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <img
                    src={activeCrypto.qrCode}
                    alt={`${activeCrypto.name} QR Code`}
                    style={{ width: '160px', height: '160px', display: 'block', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-ink-3)', marginTop: '6px' }}>
                  {locale === 'de' ? 'QR-Code mit Wallet scannen' : 'Scan QR code with wallet'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '4px' }}>
                  {activeCrypto.name} ({activeCrypto.symbol}) Wallet-Adresse:
                </div>
                <code style={{ display: 'block', fontSize: '12px', wordBreak: 'break-all', padding: '10px', background: 'var(--color-surface-2)', borderRadius: '6px', fontFamily: 'monospace', color: 'var(--color-ink)', marginBottom: '10px', border: '1px solid var(--color-border)' }}>
                  {activeCrypto.address}
                </code>
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={() => handleCopy(activeCrypto.address)}
                >
                  {copied ? (locale === 'de' ? 'Adresse kopiert! ✓' : 'Address Copied! ✓') : (locale === 'de' ? 'Wallet-Adresse kopieren' : 'Copy Wallet Address')}
                </button>
                <div style={{ fontSize: '11px', color: 'var(--color-ink-3)', marginTop: '8px' }}>
                  {locale === 'de' ? `Netzwerk-Bestätigungszeit: ~${activeCrypto.time}` : `Settlement time: ~${activeCrypto.time}`}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--color-ink-3)', lineHeight: 1.5 }}>
              <p style={{ margin: '0 0 6px' }}>
                <strong>Netzwerk-Prüfung:</strong> Bitte senden Sie ausschließlich über das Netzwerk <strong>{activeCrypto.network}</strong>.
              </p>
              <p style={{ margin: 0 }}>
                Nach Netzwerkbestätigung wird Ihre Laborbestellung für den Expressversand vorbereitet. Eine Bestätigung wurde an <strong>{shippingInfo.email}</strong> gesendet.
              </p>
            </div>
          </div>
        )}

        <div className="checkout-actions" style={{ marginTop: 'var(--space-5)' }}>
          <a className="btn btn-primary" href={paths?.shop || '/catalog/'}>{copy.continueShopping}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-flow">
      <ProgressSteps />
      <div className="commerce-layout">
        <main className="checkout-main">
          {/* STEP 1: CUSTOMER INFO */}
          {currentStep === 'customer' && (
            <section className="card checkout-panel">
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', fontWeight: 700 }}>Schritt 1 von 3</span>
                <h2 style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 700 }}>{copy.customer || 'Kundendaten'}</h2>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--color-ink-2)' }}>
                  {locale === 'de' ? 'Geben Sie Ihre Kontaktdaten und die gewünschte Lieferadresse ein.' : 'Please enter your contact details and shipping address.'}
                </p>
              </div>

              <form className="checkout-form" onSubmit={handleCustomerSubmit}>
                {(['firstName', 'lastName', 'email', 'phone', 'address', 'postcode', 'city', 'county'] as const).map((field) => {
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
                    <label className={field === 'address' || field === 'email' ? 'field checkout-form-wide' : 'field'} key={field}>
                      <span>{labelMap[field]} {field === 'phone' || field === 'county' ? (locale === 'de' ? '(Optional)' : '(Optional)') : '*'}</span>
                      <input
                        className="input"
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        required={field !== 'phone' && field !== 'county'}
                        placeholder={field === 'phone' ? '+49 151 ...' : field === 'address' ? 'Musterstraße 12, Labor 4B' : ''}
                        value={shippingInfo[field]}
                        onChange={(event) => setShippingInfo({ ...shippingInfo, [field]: event.target.value })}
                      />
                    </label>
                  );
                })}

                <label className="field checkout-form-wide">
                  <span>{copy.country ?? 'Land / Destination'} *</span>
                  <select
                    className="input"
                    required
                    value={shippingInfo.country}
                    onChange={(event) => setShippingInfo({ ...shippingInfo, country: event.target.value })}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </label>

                <div className="checkout-actions checkout-form-wide" style={{ marginTop: 'var(--space-3)' }}>
                  <button className="btn btn-primary" type="submit" style={{ padding: '12px 24px', fontSize: '15px' }}>
                    {locale === 'de' ? 'Weiter zu Schritt 2: Versand & Lieferung →' : 'Continue to Step 2: Delivery →'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 2: SHIPPING / DELIVERY */}
          {currentStep === 'shipping' && (
            <section className="card checkout-panel">
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', fontWeight: 700 }}>Schritt 2 von 3</span>
                <h2 style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 700 }}>{copy.shipping || 'Versand & Lieferung'}</h2>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--color-ink-2)' }}>
                  {locale === 'de' ? 'Überprüfen Sie Ihre Lieferadresse und wählen Sie die gewünschte Versandgeschwindigkeit.' : 'Review your delivery address and choose shipping speed.'}
                </p>
              </div>

              {/* Address Summary Card */}
              <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-ink-3)', fontWeight: 600 }}>Lieferadresse:</span>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-ink)', marginTop: '2px' }}>
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-ink-2)' }}>
                      {shippingInfo.address}, {shippingInfo.postcode} {shippingInfo.city} ({countryName(shippingInfo.country)})
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-ink-3)', marginTop: '2px' }}>
                      {shippingInfo.email} {shippingInfo.phone ? `· ${shippingInfo.phone}` : ''}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '12px', padding: '4px 8px' }}
                    onClick={() => setCurrentStep('customer')}
                  >
                    {locale === 'de' ? 'Adresse ändern' : 'Edit address'}
                  </button>
                </div>
              </div>

              <form className="checkout-stack" onSubmit={handleShippingSubmit}>
                <fieldset className="checkout-choice-group">
                  <legend style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{copy.deliveryMethod}</legend>
                  {(Object.keys(SHIPPING_COSTS) as ShippingMethod[]).map((method) => {
                    const costConfig = SHIPPING_COSTS[method];
                    return (
                      <label className="choice-card" key={method} style={{ cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === method}
                          onChange={() => setShippingMethod(method)}
                        />
                        <span>
                          <strong style={{ fontSize: '15px' }}>{copy[costConfig.labelKey]}</strong>
                          <span style={{ fontSize: '12px', color: 'var(--color-ink-2)', display: 'block', marginTop: '2px' }}>
                            {costConfig.descKey}
                          </span>
                          <small style={{ marginTop: '4px', display: 'inline-block' }}>
                            {qualifiesForFreeDelivery && method === 'standard' ? copy.free : `€${costConfig.price.toFixed(2)}`} · {copy[costConfig.timeKey]}
                          </small>
                        </span>
                      </label>
                    );
                  })}
                </fieldset>

                <div className="checkout-actions" style={{ marginTop: 'var(--space-4)' }}>
                  <button className="btn btn-primary" type="submit" style={{ padding: '12px 24px', fontSize: '15px' }}>
                    {locale === 'de' ? 'Weiter zu Schritt 3: Zahlung & Abschluss →' : 'Continue to Step 3: Payment →'}
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={() => setCurrentStep('customer')}>
                    {copy.back}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 3: PAYMENT & PLACE ORDER */}
          {currentStep === 'payment' && (
            <section className="card checkout-panel">
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', fontWeight: 700 }}>Schritt 3 von 3</span>
                <h2 style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 700 }}>{copy.payment || 'Zahlung & Abschluss'}</h2>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--color-ink-2)' }}>
                  {locale === 'de' ? 'Wählen Sie Ihre bevorzugte Zahlungsart und bestätigen Sie die Forschungsbestellung.' : 'Choose your payment method and confirm your order.'}
                </p>
              </div>

              {/* Delivery Recap */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 'var(--space-4)', fontSize: '13px' }}>
                <div>
                  <span style={{ color: 'var(--color-ink-3)' }}>Versandart: </span>
                  <strong>{copy[SHIPPING_COSTS[shippingMethod].labelKey]}</strong> ({shippingCost === 0 ? copy.free : `€${shippingCost.toFixed(2)}`})
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: '11px', padding: '2px 6px' }}
                  onClick={() => setCurrentStep('shipping')}
                >
                  Ändern
                </button>
              </div>

              <div className="checkout-stack">
                {/* Method 1: Bank Transfer */}
                <label className="choice-card" style={{ cursor: 'pointer', border: paymentMethod === 'bank-transfer' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank-transfer'}
                    onChange={() => {
                      setPaymentMethod('bank-transfer');
                      setOrderError('');
                    }}
                  />
                  <span>
                    <strong style={{ fontSize: '15px' }}>{copy.bankTransfer}</strong>
                    <small>{copy.bankTransferHelp}</small>
                  </span>
                </label>

                {/* Method 2: Crypto */}
                <label className="choice-card" style={{ cursor: 'pointer', border: paymentMethod === 'crypto' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'crypto'}
                    onChange={() => {
                      setPaymentMethod('crypto');
                      setOrderError('');
                    }}
                  />
                  <span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '15px' }}>{copy.crypto}</strong>
                      <span className="badge badge-blue" style={{ fontSize: '11px', padding: '2px 6px' }}>BTC · ETH · USDT · USDC · SOL</span>
                    </span>
                    <small>{copy.cryptoHelp}</small>
                  </span>
                </label>

                {/* Crypto Selection & Dynamic Wallet Box */}
                {paymentMethod === 'crypto' && (
                  <div className="crypto-selector" style={{ marginTop: 'var(--space-2)', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: 'var(--space-2)' }}>
                      {locale === 'de' ? '1. Wählen Sie Ihre Kryptowährung:' : '1. Select your cryptocurrency:'}
                    </div>

                    {/* Coins Grid with Official Logos */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '8px', marginBottom: 'var(--space-4)' }}>
                      {CRYPTO_ASSETS.map((asset) => {
                        const isSelected = selectedCryptoId === asset.id;
                        return (
                          <button
                            type="button"
                            key={asset.id}
                            onClick={() => {
                              setSelectedCryptoId(asset.id);
                              setOrderError('');
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              textAlign: 'left',
                              padding: '10px 12px',
                              borderRadius: 'var(--radius-sm)',
                              border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                              background: isSelected ? 'var(--color-primary-50)' : '#fff',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <img
                              src={asset.logo}
                              alt={asset.name}
                              style={{ width: '32px', height: '32px', flexShrink: 0 }}
                              loading="lazy"
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ fontSize: '14px', color: 'var(--color-ink)' }}>{asset.symbol}</strong>
                                <span style={{ fontSize: '11px', color: 'var(--color-ink-3)' }}>{asset.time}</span>
                              </div>
                              <div style={{ fontSize: '12px', color: 'var(--color-ink-2)' }}>{asset.name}</div>
                              <div style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600 }}>{asset.network}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Conditional: Address & QR Code ONLY shown after selecting a coin */}
                    {!selectedCryptoId ? (
                      <div style={{ padding: '14px', background: '#fff', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center', color: 'var(--color-ink-2)', fontSize: '13px' }}>
                        👉 <strong>Bitte wählen Sie oben eine Kryptowährung aus</strong>, um die Wallet-Adresse und den scanbaren QR-Code für Ihre Zahlung anzuzeigen.
                      </div>
                    ) : (
                      (() => {
                        const active = CRYPTO_ASSETS.find((a) => a.id === selectedCryptoId)!;
                        return (
                          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--color-border)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={active.logo} alt={active.name} style={{ width: '24px', height: '24px' }} />
                                <strong style={{ fontSize: '14px', color: 'var(--color-ink)' }}>{active.name} ({active.symbol})</strong>
                                <span className="badge badge-blue" style={{ fontSize: '11px' }}>{active.network}</span>
                              </div>
                              <span style={{ fontSize: '12px', color: 'var(--color-ink-3)' }}>
                                Bestätigung: ~{active.time}
                              </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', alignItems: 'center' }}>
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ display: 'inline-block', padding: '6px', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                                  <img
                                    src={active.qrCode}
                                    alt={`${active.name} QR Code`}
                                    style={{ width: '140px', height: '140px', display: 'block', objectFit: 'contain' }}
                                  />
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--color-ink-3)', marginTop: '4px' }}>
                                  Mit Wallet-App scannen
                                </div>
                              </div>

                              <div>
                                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '4px' }}>
                                  Wallet-Empfangsadresse:
                                </div>
                                <code style={{ display: 'block', fontSize: '12px', wordBreak: 'break-all', padding: '8px 10px', background: 'var(--color-surface-2)', borderRadius: '4px', fontFamily: 'monospace', color: 'var(--color-ink)', marginBottom: '8px', border: '1px solid var(--color-border)' }}>
                                  {active.address}
                                </code>
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-block"
                                  onClick={() => handleCopy(active.address)}
                                  style={{ padding: '8px 12px', fontSize: '13px' }}
                                >
                                  {copied ? 'Adresse kopiert! ✓' : 'Wallet-Adresse kopieren'}
                                </button>
                                <p style={{ margin: '8px 0 0', fontSize: '11px', color: 'var(--color-ink-3)', lineHeight: 1.4 }}>
                                  Senden Sie ausschließlich <strong>{active.symbol}</strong> über das <strong>{active.network}</strong> Netzwerk.
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                )}

                {/* RUO Confirmation */}
                <div className="ruo-banner compact" style={{ marginTop: 'var(--space-3)' }}>
                  <strong>{copy.researchUseOnly}</strong>
                  <span>{copy.reviewRuo}</span>
                </div>

                {orderError && (
                  <p className="form-error" style={{ margin: 'var(--space-2) 0', color: 'var(--color-danger, #DC2626)', fontSize: '13px' }}>
                    {orderError}
                  </p>
                )}

                <div className="checkout-actions" style={{ marginTop: 'var(--space-4)' }}>
                  <button
                    className="btn btn-primary"
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePlaceOrder}
                    style={{ padding: '12px 24px', fontSize: '15px' }}
                  >
                    {isProcessing ? copy.placingOrder : copy.placeOrder.replace('{total}', orderTotal.toFixed(2))}
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={() => setCurrentStep('shipping')}>
                    {copy.back}
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
        <OrderSummary />
      </div>
    </div>
  );
}
