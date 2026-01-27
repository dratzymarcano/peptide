import type { APIRoute } from 'astro';

// Bitcoin address to monitor
const BITCOIN_ADDRESS = 'bc1qev9qvwxennyypmth024jndwlqqh7ft9mzjnapr';

// Request timeout in milliseconds
const FETCH_TIMEOUT = 5000;

// Rate limiting - track last request time to avoid spamming APIs
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 3000; // 3 seconds between actual API calls

// Blockchain API endpoints for checking payment status
// Using multiple APIs for redundancy
const BLOCKCHAIN_APIS = {
  blockstream: `https://blockstream.info/api/address/${BITCOIN_ADDRESS}/txs`,
  mempool: `https://mempool.space/api/address/${BITCOIN_ADDRESS}/txs`,
};

interface TransactionInfo {
  txid: string;
  status: {
    confirmed: boolean;
    block_height?: number;
    block_time?: number;
  };
  vout: Array<{
    scriptpubkey_address: string;
    value: number; // in satoshis
  }>;
}

interface PaymentCheckResult {
  found: boolean;
  status: 'not_found' | 'mempool' | 'confirmed' | 'pending';
  txHash?: string;
  confirmations?: number;
  amountReceived?: number; // in BTC
  timestamp?: number;
  error?: string;
}

// Fetch with timeout
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Process transactions and find matching payment
function findMatchingPayment(
  transactions: TransactionInfo[],
  expectedAmountBTC: number,
  sinceTimestamp: number
): PaymentCheckResult {
  for (const tx of transactions) {
    // Find outputs to our address
    const relevantOutputs = tx.vout.filter(
      output => output.scriptpubkey_address === BITCOIN_ADDRESS
    );
    
    if (relevantOutputs.length === 0) continue;
    
    // Sum the amounts sent to our address in this tx
    const totalSatoshis = relevantOutputs.reduce((sum, out) => sum + out.value, 0);
    const totalBTC = totalSatoshis / 100000000;
    
    // Check if amount matches (with 5% tolerance for fees/rounding)
    const tolerance = expectedAmountBTC * 0.05;
    if (totalBTC >= expectedAmountBTC - tolerance) {
      // Check transaction time if confirmed
      if (tx.status.confirmed && tx.status.block_time) {
        // Transaction is confirmed
        if (tx.status.block_time * 1000 >= sinceTimestamp) {
          const confirmations = tx.status.block_height ? Math.max(1, 1) : 1;
          
          return {
            found: true,
            status: 'confirmed',
            txHash: tx.txid,
            confirmations,
            amountReceived: totalBTC,
            timestamp: tx.status.block_time * 1000
          };
        }
      } else {
        // Transaction is in mempool (unconfirmed)
        return {
          found: true,
          status: 'mempool',
          txHash: tx.txid,
          confirmations: 0,
          amountReceived: totalBTC
        };
      }
    }
  }
  
  return { found: false, status: 'not_found' };
}

// Check for payment to the Bitcoin address
async function checkForPayment(
  expectedAmountBTC: number,
  sinceTimestamp: number
): Promise<PaymentCheckResult> {
  // Rate limiting - don't spam the APIs
  const now = Date.now();
  if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
    // Return pending status instead of making another request
    return { found: false, status: 'pending' };
  }
  lastRequestTime = now;

  // Try blockstream first
  try {
    const response = await fetchWithTimeout(BLOCKCHAIN_APIS.blockstream, FETCH_TIMEOUT);
    
    if (response.ok) {
      const transactions: TransactionInfo[] = await response.json();
      return findMatchingPayment(transactions, expectedAmountBTC, sinceTimestamp);
    }
  } catch {
    // Silently handle timeout/network errors - will try fallback
  }
  
  // Try fallback API (mempool.space)
  try {
    const response = await fetchWithTimeout(BLOCKCHAIN_APIS.mempool, FETCH_TIMEOUT);
    
    if (response.ok) {
      const transactions: TransactionInfo[] = await response.json();
      return findMatchingPayment(transactions, expectedAmountBTC, sinceTimestamp);
    }
  } catch {
    // Silently handle timeout/network errors
  }
  
  // Both APIs failed - return pending status (will retry on next poll)
  return { found: false, status: 'pending', error: 'Network temporarily unavailable' };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { orderId, expectedAmount, orderCreatedAt } = body;
    
    if (!orderId || !expectedAmount || !orderCreatedAt) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: orderId, expectedAmount, orderCreatedAt'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Parse the expected amount (should be in BTC)
    const amountBTC = parseFloat(expectedAmount);
    const sinceTimestamp = new Date(orderCreatedAt).getTime();
    
    // Check for payment
    const result = await checkForPayment(amountBTC, sinceTimestamp);
    
    return new Response(JSON.stringify({
      success: true,
      orderId,
      payment: result
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in payment check endpoint:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// GET endpoint for simple status check
export const GET: APIRoute = async ({ url }) => {
  const orderId = url.searchParams.get('orderId');
  const expectedAmount = url.searchParams.get('expectedAmount');
  const orderCreatedAt = url.searchParams.get('orderCreatedAt');
  
  if (!orderId || !expectedAmount || !orderCreatedAt) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Missing query parameters'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const amountBTC = parseFloat(expectedAmount);
  const sinceTimestamp = new Date(orderCreatedAt).getTime();
  
  const result = await checkForPayment(amountBTC, sinceTimestamp);
  
  return new Response(JSON.stringify({
    success: true,
    orderId,
    payment: result
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
