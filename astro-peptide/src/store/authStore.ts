import { atom, computed } from 'nanostores';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  provider?: 'email' | 'google' | 'facebook';
  avatar?: string;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  county: string;
  postcode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'bank-transfer' | 'bitcoin';
  paymentStatus: 'pending' | 'paid' | 'failed';
  items: Array<{ id: string; title: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Omit<Address, 'id' | 'isDefault'>;
  trackingNumber?: string;
}

export const currentUser = atom<User | null>(null);
export const isAuthenticated = computed(currentUser, (user) => user !== null);
export const userOrders = atom<Order[]>([]);
export const userAddresses = atom<Address[]>([]);
export const isAuthLoading = atom<boolean>(false);
export const authError = atom<string | null>(null);

const isBrowser = typeof window !== 'undefined';
const ADDRESS_KEY = 'peptide-addresses';
const PROFILE_CACHE_KEY = 'peptide-user-cache';

function cacheProfile(user: User | null): void {
  if (!isBrowser) return;
  if (user) {
    try {
      localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(user));
    } catch {
      /* ignore quota */
    }
  } else {
    localStorage.removeItem(PROFILE_CACHE_KEY);
  }
}

function loadCachedProfile(): User | null {
  if (!isBrowser) return null;
  const raw = localStorage.getItem(PROFILE_CACHE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function loadAddresses(): Address[] {
  if (!isBrowser) return [];
  const raw = localStorage.getItem(ADDRESS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Address[]) : [];
  } catch {
    return [];
  }
}

function persistAddresses(items: Address[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(items));
  } catch {
    /* ignore quota */
  }
}

interface ApiOrder {
  id: string;
  email: string;
  status: string;
  paymentMethod: string;
  paymentReference: string | null;
  subtotal: number;
  total: number;
  currency: string;
  shippingAddress: Record<string, unknown> | null;
  items: Array<{ productId: string; title: string; quantity: number; unitPrice: number; variant: string }>;
  createdAt: string;
  paidAt: string | null;
}

function mapApiOrder(o: ApiOrder): Order {
  const status: Order['status'] =
    o.status === 'paid'
      ? 'confirmed'
      : o.status === 'pending'
        ? 'pending'
        : (['processing', 'shipped', 'delivered'].includes(o.status) ? (o.status as Order['status']) : 'pending');
  const paymentMethod: Order['paymentMethod'] =
    o.paymentMethod === 'bank' ? 'bank-transfer' : 'bitcoin';
  const paymentStatus: Order['paymentStatus'] =
    o.status === 'paid' ? 'paid' : o.status === 'failed' || o.status === 'expired' ? 'failed' : 'pending';
  const ship = (o.shippingAddress ?? {}) as Record<string, string>;
  return {
    id: o.id,
    date: o.createdAt,
    status,
    paymentMethod,
    paymentStatus,
    items: o.items.map((it) => ({ id: it.productId, title: it.title, quantity: it.quantity, price: it.unitPrice })),
    subtotal: o.subtotal,
    shipping: 0,
    discount: 0,
    total: o.total,
    shippingAddress: {
      firstName: String(ship.firstName ?? ''),
      lastName: String(ship.lastName ?? ''),
      address: String(ship.address ?? ''),
      city: String(ship.city ?? ''),
      county: String(ship.county ?? ''),
      postcode: String(ship.postcode ?? ''),
    },
  };
}

async function refreshOrders(): Promise<void> {
  if (!isBrowser) return;
  try {
    const res = await fetch('/api/orders', { credentials: 'include' });
    if (!res.ok) return;
    const data = (await res.json()) as { orders?: ApiOrder[] };
    userOrders.set((data.orders ?? []).map(mapApiOrder));
  } catch {
    /* offline / dev */
  }
}

export async function refreshSession(): Promise<User | null> {
  if (!isBrowser) return null;
  try {
    const res = await fetch('/api/auth/session', { credentials: 'include' });
    if (!res.ok) return null;
    const data = (await res.json()) as { user: User | null };
    currentUser.set(data.user);
    cacheProfile(data.user);
    if (data.user) await refreshOrders();
    return data.user;
  } catch {
    return null;
  }
}

if (isBrowser) {
  const cached = loadCachedProfile();
  if (cached) currentUser.set(cached);
  userAddresses.set(loadAddresses());
  void refreshSession();
}

async function postJson<T>(url: string, body: unknown): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  let data = {} as T;
  try {
    data = (await res.json()) as T;
  } catch {
    /* empty body */
  }
  return { ok: res.ok, status: res.status, data };
}

interface AuthResponse {
  success: boolean;
  code?: string;
  message?: string;
  user?: { id: string; email: string; firstName?: string; lastName?: string };
}

export async function registerWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<User> {
  isAuthLoading.set(true);
  authError.set(null);
  try {
    const { ok, data } = await postJson<AuthResponse>('/api/auth/signup', { email, password, firstName, lastName });
    if (!ok || !data.success) {
      const code = data.code ?? 'signup_failed';
      authError.set(code);
      throw new Error(code);
    }
    const user: User = {
      id: data.user?.id ?? '',
      email: data.user?.email ?? email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
      provider: 'email',
    };
    currentUser.set(user);
    cacheProfile(user);
    await refreshOrders();
    return user;
  } finally {
    isAuthLoading.set(false);
  }
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  isAuthLoading.set(true);
  authError.set(null);
  try {
    const { ok, data } = await postJson<AuthResponse>('/api/auth/signin', { email, password });
    if (!ok || !data.success || !data.user) {
      authError.set('invalid_credentials');
      throw new Error('invalid_credentials');
    }
    const user: User = {
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName ?? '',
      lastName: data.user.lastName ?? '',
      createdAt: new Date().toISOString(),
      provider: 'email',
    };
    currentUser.set(user);
    cacheProfile(user);
    await refreshOrders();
    return user;
  } finally {
    isAuthLoading.set(false);
  }
}

async function startOAuth(provider: 'google' | 'facebook'): Promise<User> {
  isAuthLoading.set(true);
  authError.set(null);
  try {
    const redirectTo = isBrowser ? `${window.location.origin}/account/dashboard/` : undefined;
    const { ok, data } = await postJson<{ success: boolean; url?: string; code?: string }>(
      `/api/auth/oauth/${provider}`,
      { redirectTo },
    );
    if (!ok || !data.success || !data.url) {
      const code = data.code ?? 'oauth_init_failed';
      authError.set(code);
      throw new Error(code);
    }
    if (isBrowser) window.location.assign(data.url);
    // Caller never reaches here in practice; return a placeholder for type-completeness.
    return {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      createdAt: new Date().toISOString(),
      provider,
    };
  } finally {
    // do not unset loading: navigation will replace the page
  }
}

export const loginWithGoogle = (): Promise<User> => startOAuth('google');
export const loginWithFacebook = (): Promise<User> => startOAuth('facebook');

export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/signout', { method: 'POST', credentials: 'include' });
  } catch {
    /* ignore */
  }
  currentUser.set(null);
  userOrders.set([]);
  cacheProfile(null);
}

export function addOrder(order: Omit<Order, 'id' | 'date'>): Order {
  const newOrder: Order = {
    ...order,
    id: 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    date: new Date().toISOString(),
  };
  userOrders.set([newOrder, ...userOrders.get()]);
  // Server-side persistence happens in the checkout API handler.
  return newOrder;
}

export function saveAddress(address: Omit<Address, 'id'>): Address {
  const newAddress: Address = {
    ...address,
    id: 'addr_' + Math.random().toString(36).substring(2, 8),
  };
  const list = userAddresses.get();
  if (address.isDefault) list.forEach((a) => (a.isDefault = false));
  const next = [...list, newAddress];
  userAddresses.set(next);
  persistAddresses(next);
  return newAddress;
}

export function updateProfile(updates: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>): User | null {
  const user = currentUser.get();
  if (!user) return null;
  const updated = { ...user, ...updates };
  currentUser.set(updated);
  cacheProfile(updated);
  return updated;
}
