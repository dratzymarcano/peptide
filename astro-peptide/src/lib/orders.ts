// Order persistence layer.
// In production: writes to Supabase tables `orders` + `order_items`.
// In dev (no Supabase configured): writes to a process-local Map so the checkout
// flow remains testable end-to-end without external services.
import { getSupabaseService, isSupabaseServiceConfigured } from './supabase/server';

export type OrderStatus = 'pending' | 'paid' | 'expired' | 'failed' | 'cancelled';
export type PaymentMethod = 'bitcoin' | 'bank' | 'card';

export interface OrderItem {
  productId: string;
  slug: string;
  title: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  currency: string;
}

export interface OrderRecord {
  id: string;
  userId: string | null;
  email: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentReference: string | null;
  subtotal: number;
  total: number;
  currency: string;
  locale: string;
  shippingAddress: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
}

export interface CreateOrderInput {
  id?: string;
  userId?: string | null;
  email: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string | null;
  subtotal: number;
  total: number;
  currency?: string;
  locale?: string;
  shippingAddress?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
  items: OrderItem[];
}

const memoryOrders = new Map<string, OrderRecord>();

function newId(): string {
  return 'ord_' + Math.random().toString(36).slice(2, 12);
}

function nowIso(): string {
  return new Date().toISOString();
}

export async function createOrder(input: CreateOrderInput): Promise<OrderRecord> {
  const order: OrderRecord = {
    id: input.id ?? newId(),
    userId: input.userId ?? null,
    email: input.email,
    status: 'pending',
    paymentMethod: input.paymentMethod,
    paymentReference: input.paymentReference ?? null,
    subtotal: input.subtotal,
    total: input.total,
    currency: input.currency ?? 'EUR',
    locale: input.locale ?? 'en',
    shippingAddress: input.shippingAddress ?? null,
    metadata: input.metadata ?? null,
    items: input.items,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    paidAt: null,
  };

  if (isSupabaseServiceConfigured()) {
    const supa = getSupabaseService();
    if (!supa) throw new Error('supabase_service_unavailable');
    const { error: orderErr } = await supa.from('orders').insert({
      id: order.id,
      user_id: order.userId,
      email: order.email,
      status: order.status,
      payment_method: order.paymentMethod,
      payment_reference: order.paymentReference,
      subtotal: order.subtotal,
      total: order.total,
      currency: order.currency,
      locale: order.locale,
      shipping_address: order.shippingAddress,
      metadata: order.metadata,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
    });
    if (orderErr) throw new Error(`order_insert_failed:${orderErr.message}`);
    if (order.items.length > 0) {
      const { error: itemsErr } = await supa.from('order_items').insert(
        order.items.map((item) => ({
          order_id: order.id,
          product_id: item.productId,
          slug: item.slug,
          title: item.title,
          variant: item.variant,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          currency: item.currency,
        })),
      );
      if (itemsErr) throw new Error(`order_items_insert_failed:${itemsErr.message}`);
    }
    return order;
  }

  memoryOrders.set(order.id, order);
  return order;
}

export async function getOrder(id: string): Promise<OrderRecord | null> {
  if (isSupabaseServiceConfigured()) {
    const supa = getSupabaseService();
    if (!supa) return null;
    const { data, error } = await supa
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return mapRow(data);
  }
  return memoryOrders.get(id) ?? null;
}

export async function listOrdersForUser(userId: string): Promise<OrderRecord[]> {
  if (isSupabaseServiceConfigured()) {
    const supa = getSupabaseService();
    if (!supa) return [];
    const { data, error } = await supa
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data.map(mapRow);
  }
  return Array.from(memoryOrders.values()).filter((o) => o.userId === userId);
}

async function updateStatus(
  id: string,
  status: OrderStatus,
  patch: Partial<OrderRecord> = {},
): Promise<OrderRecord | null> {
  const updatedAt = nowIso();
  if (isSupabaseServiceConfigured()) {
    const supa = getSupabaseService();
    if (!supa) return null;
    const { data, error } = await supa
      .from('orders')
      .update({
        status,
        updated_at: updatedAt,
        ...(status === 'paid' ? { paid_at: updatedAt } : {}),
        ...(patch.paymentReference !== undefined ? { payment_reference: patch.paymentReference } : {}),
      })
      .eq('id', id)
      .select('*, order_items(*)')
      .single();
    if (error || !data) return null;
    return mapRow(data);
  }
  const existing = memoryOrders.get(id);
  if (!existing) return null;
  existing.status = status;
  existing.updatedAt = updatedAt;
  if (status === 'paid') existing.paidAt = updatedAt;
  if (patch.paymentReference !== undefined) existing.paymentReference = patch.paymentReference;
  memoryOrders.set(id, existing);
  return existing;
}

export async function markOrderPaid(
  id: string,
  ref: { provider: string; invoiceId: string | null },
): Promise<OrderRecord | null> {
  return updateStatus(id, 'paid', {
    paymentReference: ref.invoiceId ? `${ref.provider}:${ref.invoiceId}` : ref.provider,
  });
}

export async function markOrderExpired(id: string): Promise<OrderRecord | null> {
  return updateStatus(id, 'expired');
}

export async function markOrderFailed(id: string): Promise<OrderRecord | null> {
  return updateStatus(id, 'failed');
}

function mapRow(row: Record<string, unknown>): OrderRecord {
  const items = Array.isArray(row.order_items)
    ? (row.order_items as Record<string, unknown>[]).map((it) => ({
        productId: String(it.product_id ?? ''),
        slug: String(it.slug ?? ''),
        title: String(it.title ?? ''),
        variant: String(it.variant ?? ''),
        quantity: Number(it.quantity ?? 0),
        unitPrice: Number(it.unit_price ?? 0),
        currency: String(it.currency ?? 'EUR'),
      }))
    : [];
  return {
    id: String(row.id),
    userId: (row.user_id as string | null) ?? null,
    email: String(row.email ?? ''),
    status: (row.status as OrderStatus) ?? 'pending',
    paymentMethod: (row.payment_method as PaymentMethod) ?? 'bitcoin',
    paymentReference: (row.payment_reference as string | null) ?? null,
    subtotal: Number(row.subtotal ?? 0),
    total: Number(row.total ?? 0),
    currency: String(row.currency ?? 'EUR'),
    locale: String(row.locale ?? 'en'),
    shippingAddress: (row.shipping_address as Record<string, unknown> | null) ?? null,
    metadata: (row.metadata as Record<string, unknown> | null) ?? null,
    items,
    createdAt: String(row.created_at ?? nowIso()),
    updatedAt: String(row.updated_at ?? nowIso()),
    paidAt: (row.paid_at as string | null) ?? null,
  };
}
