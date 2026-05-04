import type { APIRoute } from 'astro';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { defaultLocale, isLocale } from '../../i18n/config';
import { markOrderExpired, markOrderFailed, markOrderPaid } from '../../lib/orders';

const BTCPAY_SERVER_URL = import.meta.env.BTCPAY_SERVER_URL ?? '';
const BTCPAY_STORE_ID = import.meta.env.BTCPAY_STORE_ID ?? '';
const BTCPAY_API_KEY = import.meta.env.BTCPAY_API_KEY ?? '';
const BTCPAY_WEBHOOK_SECRET = import.meta.env.BTCPAY_WEBHOOK_SECRET ?? '';
const SITE_URL = import.meta.env.SITE_URL ?? 'https://peptide-shop.net';
const IS_DEV = Boolean(import.meta.env.DEV);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

interface CreateInvoiceRequest {
  orderId: string;
  amount: number;
  currency: string;
  buyerEmail: string;
  description?: string;
  locale?: string;
}

interface BTCPayInvoice {
  id: string;
  checkoutLink: string;
  status: string;
  amount: string;
  currency: string;
  cryptoInfo?: {
    cryptoCode: string;
    paymentUrls: { BIP21: string };
    address: string;
    due: string;
    rate: number;
  }[];
}

function btcpayConfigured(): boolean {
  return Boolean(BTCPAY_SERVER_URL && BTCPAY_STORE_ID && BTCPAY_API_KEY);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: CreateInvoiceRequest = await request.json();
    const { orderId, amount, currency = 'EUR', buyerEmail, description } = body;
    const locale = isLocale(body.locale) ? body.locale : defaultLocale;

    if (!orderId || !amount || !buyerEmail) {
      return json(
        { success: false, code: 'missing_required_fields', fields: ['orderId', 'amount', 'buyerEmail'] },
        400,
      );
    }

    if (!btcpayConfigured()) {
      if (!IS_DEV) {
        console.error('[btcpay] missing BTCPAY_SERVER_URL/STORE_ID/API_KEY');
        return json({ success: false, code: 'btcpay_not_configured' }, 500);
      }
      return json({
        success: true,
        invoice: {
          id: 'DEV-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          checkoutLink: '/checkout/mock-bitcoin',
          status: 'New',
          amount: amount.toString(),
          currency,
          btcAddress: 'bc1qmockmockmockmockmockmockmockmockmockmockmock',
          btcAmount: (amount / 78000).toFixed(8),
          expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          mock: true,
        },
      });
    }

    const invoiceResponse = await fetch(
      `${BTCPAY_SERVER_URL}/api/v1/stores/${BTCPAY_STORE_ID}/invoices`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${BTCPAY_API_KEY}`,
        },
        body: JSON.stringify({
          amount: amount.toString(),
          currency,
          metadata: { orderId, buyerEmail, itemDesc: description || `Peptide Shop Order ${orderId}` },
          checkout: {
            speedPolicy: 'MediumSpeed',
            expirationMinutes: 15,
            monitoringMinutes: 60,
            paymentTolerance: 0,
            redirectURL: `${SITE_URL}/order-confirmation?orderId=${orderId}`,
            redirectAutomatically: true,
            defaultLanguage: locale,
          },
          receipt: { enabled: true, showQR: true },
        }),
      },
    );

    if (!invoiceResponse.ok) {
      const errorText = await invoiceResponse.text().catch(() => '');
      console.error('[btcpay] invoice create failed', invoiceResponse.status, errorText);
      return json({ success: false, code: 'bitcoin_invoice_create_failed' }, 502);
    }

    const invoice: BTCPayInvoice = await invoiceResponse.json();
    const btcInfo = invoice.cryptoInfo?.find((c) => c.cryptoCode === 'BTC');

    return json({
      success: true,
      invoice: {
        id: invoice.id,
        checkoutLink: invoice.checkoutLink,
        status: invoice.status,
        amount: invoice.amount,
        currency: invoice.currency,
        btcAddress: btcInfo?.address,
        btcAmount: btcInfo?.due,
        btcRate: btcInfo?.rate,
        paymentUrl: btcInfo?.paymentUrls?.BIP21,
      },
    });
  } catch (error) {
    console.error('[btcpay] error creating invoice', error);
    return json({ success: false, code: 'internal_server_error' }, 500);
  }
};

function verifyBTCPaySignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!BTCPAY_WEBHOOK_SECRET || !signatureHeader) return false;
  const provided = signatureHeader.startsWith('sha256=') ? signatureHeader.slice(7) : signatureHeader;
  const expected = createHmac('sha256', BTCPAY_WEBHOOK_SECRET).update(rawBody, 'utf8').digest('hex');
  if (provided.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(provided, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

async function handleWebhook(request: Request): Promise<Response> {
  const rawBody = await request.text();

  if (!IS_DEV || BTCPAY_WEBHOOK_SECRET) {
    const sig = request.headers.get('BTCPay-Sig') ?? request.headers.get('btcpay-sig');
    if (!verifyBTCPaySignature(rawBody, sig)) {
      console.warn('[btcpay] webhook signature mismatch');
      return json({ received: false, code: 'invalid_signature' }, 401);
    }
  }

  let payload: { type?: string; invoiceId?: string; storeId?: string; metadata?: Record<string, unknown> };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ received: false, code: 'invalid_json' }, 400);
  }

  const orderId = (payload?.metadata?.['orderId'] as string | undefined) ?? payload?.invoiceId;
  if (!orderId) {
    return json({ received: true, code: 'no_order_reference' });
  }

  try {
    switch (payload.type) {
      case 'InvoiceSettled':
        await markOrderPaid(orderId, { provider: 'btcpay', invoiceId: payload.invoiceId ?? null });
        break;
      case 'InvoiceExpired':
        await markOrderExpired(orderId);
        break;
      case 'InvoiceInvalid':
        await markOrderFailed(orderId);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error('[btcpay] order update failed', err);
    return json({ received: false, code: 'order_update_failed' }, 500);
  }

  return json({ received: true });
}

export const PUT: APIRoute = async ({ request }) => handleWebhook(request);
