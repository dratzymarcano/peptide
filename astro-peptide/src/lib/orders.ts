// Order persistence layer (database-free).
// Orders live in a process-local Map. On Cloudflare Workers this state is per-isolate
// and not durable — BTCPay remains the source of truth for payments. The store-side
// record is best-effort and used to drive confirmation emails / order-confirmation page.

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
  memoryOrders.set(order.id, order);
  return order;
}

export async function getOrder(id: string): Promise<OrderRecord | null> {
  return memoryOrders.get(id) ?? null;
}

async function updateStatus(
  id: string,
  status: OrderStatus,
  patch: Partial<OrderRecord> = {},
): Promise<OrderRecord | null> {
  const existing = memoryOrders.get(id);
  if (!existing) return null;
  existing.status = status;
  existing.updatedAt = nowIso();
  if (status === 'paid') existing.paidAt = existing.updatedAt;
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
