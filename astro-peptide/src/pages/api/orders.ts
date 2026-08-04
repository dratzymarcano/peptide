import type { APIRoute } from 'astro';
import { env as cfEnv } from 'cloudflare:workers';
import { createOrder, type OrderRecord, type PaymentMethod } from '../../lib/orders';
import { priceOrder } from '../../lib/pricing';
import {
  sendBankTransferInstructions,
  sendOrderConfirmation,
  sendOrderNotification,
  type EmailEnv,
} from '../../lib/email/sender';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

interface CheckoutOrderItem {
  id?: string;
  productId?: string;
  slug?: string;
  variant?: string;
  quantity?: number;
}

interface CheckoutOrderPayload {
  id?: string;
  email?: string;
  paymentMethod?: 'bank-transfer' | 'bitcoin';
  shippingMethod?: string;
  /** Client's own figure. Advisory only — compared, never billed on. */
  total?: number;
  currency?: string;
  locale?: string;
  shippingAddress?: Record<string, unknown>;
  items?: CheckoutOrderItem[];
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function paymentMethod(input?: string): PaymentMethod {
  return input === 'bitcoin' ? 'bitcoin' : 'bank';
}

export const POST: APIRoute = async ({ request, locals }) => {
  let payload: CheckoutOrderPayload;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, code: 'invalid_json' }, 400);
  }

  const currency = String(payload.currency ?? 'EUR').toUpperCase();
  const email = String(payload.email ?? '').trim().slice(0, 200);

  if (!email || !isEmail(email)) {
    return json({ success: false, code: 'invalid_order' }, 400);
  }

  // Prices, subtotal, shipping and total are derived from the catalogue. The
  // request body only says *what* and *how many* — never what it costs.
  const priced = await priceOrder(payload.items, {
    currency,
    shippingMethod: payload.shippingMethod,
  });
  if (!priced.ok) {
    return json({ success: false, code: priced.code, detail: priced.detail }, 400);
  }
  const { items, subtotal, shipping, total } = priced;

  // A mismatch means the cart was stale or tampered with. Either way the
  // customer must not be shown one total and charged another.
  const claimedTotal = Number(payload.total);
  if (Number.isFinite(claimedTotal) && Math.abs(claimedTotal - total) > 0.01) {
    console.warn(`[orders] client total ${claimedTotal} != server total ${total}`);
    return json({ success: false, code: 'total_mismatch', expected: total }, 409);
  }

  const method = paymentMethod(payload.paymentMethod);
  const env = cfEnv as unknown as EmailEnv | undefined;
  let order: OrderRecord;
  try {
    order = await createOrder({
      id: payload.id,
      email,
      paymentMethod: method,
      subtotal,
      total,
      currency,
      locale: payload.locale ?? 'en',
      shippingAddress: payload.shippingAddress ?? null,
      metadata: {
        shipping,
        discount: 0,
        source: 'checkout',
      },
      items,
    });
  } catch (error) {
    console.error('[orders] persistence failed', error);
    return json({ success: false, code: 'order_persistence_failed' }, 503);
  }

  const dispatchEmails = async () => {
    const tasks = [
      sendOrderConfirmation(order, { env }).catch((error) => {
        console.error('[orders] customer confirmation email failed', error);
      }),
      ...(method === 'bank'
        ? [sendBankTransferInstructions(order, { env }).catch((error) => {
            console.error('[orders] bank transfer email failed', error);
          })]
        : []),
      sendOrderNotification(order, { env }).catch((error) => {
        console.error('[orders] internal notification email failed', error);
      }),
    ];
    await Promise.all(tasks);
  };

  if (locals.cfContext) {
    locals.cfContext.waitUntil(dispatchEmails());
  } else {
    await dispatchEmails();
  }

  return json({
    success: true,
    order,
    emailStatus: locals.cfContext ? 'queued' : 'sent_or_logged',
  });
};
