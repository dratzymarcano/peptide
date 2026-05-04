import type { APIRoute } from 'astro';
import { getUserFromCookies } from '../../lib/auth/session';
import { createOrder, listOrdersForUser, type PaymentMethod } from '../../lib/orders';
import {
  sendBankTransferInstructions,
  sendOrderConfirmation,
  sendOrderNotification,
  type EmailEnv,
} from '../../lib/email/sender';

const MIN_ORDER_AMOUNT = 200;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

interface CheckoutOrderItem {
  id?: string;
  productId?: string;
  slug?: string;
  title?: string;
  variant?: string;
  quantity?: number;
  price?: number;
  unitPrice?: number;
}

interface CheckoutOrderPayload {
  id?: string;
  email?: string;
  paymentMethod?: 'bank-transfer' | 'bitcoin';
  subtotal?: number;
  shipping?: number;
  discount?: number;
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

function normalizeItems(items: CheckoutOrderItem[] | undefined, currency: string) {
  return (items ?? []).map((item) => {
    const unitPrice = Number(item.unitPrice ?? item.price ?? 0);
    const productId = String(item.productId ?? item.id ?? item.slug ?? '').trim();
    const title = String(item.title ?? '').trim();
    const variant = String(item.variant ?? 'Standard').trim() || 'Standard';
    return {
      productId,
      slug: String(item.slug ?? productId).trim() || productId,
      title,
      variant,
      quantity: Math.max(1, Number(item.quantity ?? 1)),
      unitPrice,
      currency,
    };
  });
}

export const GET: APIRoute = async ({ cookies }) => {
  const user = await getUserFromCookies(cookies);
  if (!user) {
    return new Response(JSON.stringify({ orders: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const orders = await listOrdersForUser(user.id);
  return new Response(JSON.stringify({ orders }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let payload: CheckoutOrderPayload;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, code: 'invalid_json' }, 400);
  }

  const currency = String(payload.currency ?? 'EUR').toUpperCase();
  const email = String(payload.email ?? '').trim().slice(0, 200);
  const items = normalizeItems(payload.items, currency);
  const subtotal = Number(payload.subtotal ?? items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0));
  const total = Number(payload.total ?? subtotal);

  if (!email || !isEmail(email) || items.length === 0 || items.some((item) => !item.productId || !item.title || item.unitPrice <= 0)) {
    return json({ success: false, code: 'invalid_order' }, 400);
  }

  if (subtotal < MIN_ORDER_AMOUNT || total <= 0) {
    return json({ success: false, code: 'minimum_order_required' }, 400);
  }

  const user = await getUserFromCookies(cookies);
  const method = paymentMethod(payload.paymentMethod);
  const order = await createOrder({
    id: payload.id,
    userId: user?.id ?? null,
    email,
    paymentMethod: method,
    subtotal,
    total,
    currency,
    locale: payload.locale ?? 'en',
    shippingAddress: payload.shippingAddress ?? null,
    metadata: {
      shipping: Number(payload.shipping ?? 0),
      discount: Number(payload.discount ?? 0),
      source: 'checkout',
    },
    items,
  });

  const env = locals.runtime?.env as EmailEnv | undefined;
  try {
    await sendOrderConfirmation(order, { env });
    if (method === 'bank') await sendBankTransferInstructions(order, { env });
    await sendOrderNotification(order, { env });
  } catch (error) {
    console.error('[orders] email dispatch failed', error);
    return json({ success: false, code: 'order_email_failed', order }, 502);
  }

  return json({ success: true, order });
};
