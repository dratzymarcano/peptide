import { atom, computed } from 'nanostores';

// Bitcoin order state for tracking pending payments
export interface BitcoinOrder {
  orderId: string;
  invoiceId: string;
  btcAddress: string;
  btcAmount: string;
  fiatAmount: number;
  currency: string;
  status: 'pending' | 'confirming' | 'processing' | 'completed' | 'expired' | 'cancelled';
  paymentStatus: 'awaiting' | 'detected' | 'confirmed' | 'expired';
  createdAt: string;
  expiresAt: string;
  customerEmail: string;
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    county?: string;
    postcode: string;
    country?: string;
  };
  confirmations?: number;
  txHash?: string;
}

// Browser check
const isBrowser = typeof window !== 'undefined';

// Store for current Bitcoin order being monitored
export const currentBitcoinOrder = atom<BitcoinOrder | null>(null);

// All Bitcoin orders (persisted in localStorage)
export const bitcoinOrders = atom<BitcoinOrder[]>([]);

// Computed: Is payment being monitored
export const isMonitoringPayment = computed(currentBitcoinOrder, (order) => {
  return order !== null && ['pending', 'confirming'].includes(order.status);
});

// Computed: Time remaining until expiry
export const timeRemaining = atom<number>(0); // seconds

// Load orders from localStorage
export function loadBitcoinOrders() {
  if (!isBrowser) return;
  
  try {
    const stored = localStorage.getItem('peptide-bitcoin-orders');
    if (stored) {
      const orders = JSON.parse(stored);
      bitcoinOrders.set(orders);
    }
  } catch (e) {
    console.error('Failed to load Bitcoin orders:', e);
  }
}

// Save orders to localStorage
function saveBitcoinOrders() {
  if (!isBrowser) return;
  
  try {
    localStorage.setItem('peptide-bitcoin-orders', JSON.stringify(bitcoinOrders.get()));
  } catch (e) {
    console.error('Failed to save Bitcoin orders:', e);
  }
}

// Create a new Bitcoin order
export function createBitcoinOrder(order: Omit<BitcoinOrder, 'status' | 'paymentStatus' | 'createdAt'>): BitcoinOrder {
  const newOrder: BitcoinOrder = {
    ...order,
    status: 'pending',
    paymentStatus: 'awaiting',
    createdAt: new Date().toISOString(),
  };
  
  // Add to orders list
  const orders = bitcoinOrders.get();
  bitcoinOrders.set([newOrder, ...orders]);
  saveBitcoinOrders();
  
  // Set as current order being monitored
  currentBitcoinOrder.set(newOrder);
  
  // Calculate time remaining
  const expiryTime = new Date(newOrder.expiresAt).getTime();
  const now = Date.now();
  timeRemaining.set(Math.max(0, Math.floor((expiryTime - now) / 1000)));
  
  return newOrder;
}

// Update order status
export function updateBitcoinOrderStatus(
  orderId: string, 
  updates: Partial<Pick<BitcoinOrder, 'status' | 'paymentStatus' | 'confirmations' | 'txHash'>>
) {
  const orders = bitcoinOrders.get();
  const updatedOrders = orders.map(order => {
    if (order.orderId === orderId) {
      return { ...order, ...updates };
    }
    return order;
  });
  
  bitcoinOrders.set(updatedOrders);
  saveBitcoinOrders();
  
  // Update current order if it's the one being monitored
  const current = currentBitcoinOrder.get();
  if (current && current.orderId === orderId) {
    currentBitcoinOrder.set({ ...current, ...updates });
  }
}

// Mark order as expired
export function expireBitcoinOrder(orderId: string) {
  updateBitcoinOrderStatus(orderId, {
    status: 'expired',
    paymentStatus: 'expired'
  });
}

// Mark order as completed
export function completeBitcoinOrder(orderId: string, txHash?: string) {
  updateBitcoinOrderStatus(orderId, {
    status: 'completed',
    paymentStatus: 'confirmed',
    txHash
  });
}

// Clear current monitoring
export function clearCurrentBitcoinOrder() {
  currentBitcoinOrder.set(null);
  timeRemaining.set(0);
}

// Get order by ID
export function getBitcoinOrder(orderId: string): BitcoinOrder | undefined {
  return bitcoinOrders.get().find(o => o.orderId === orderId);
}

// Initialize on load
if (isBrowser) {
  loadBitcoinOrders();
}
