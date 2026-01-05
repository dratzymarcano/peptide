import type { APIRoute } from 'astro';

// BTCPay Server Configuration
// Replace these with your actual BTCPay Server details
const BTCPAY_SERVER_URL = import.meta.env.BTCPAY_SERVER_URL || 'https://btcpay.peptide-shop.net';
const BTCPAY_STORE_ID = import.meta.env.BTCPAY_STORE_ID || 'YOUR_STORE_ID';
const BTCPAY_API_KEY = import.meta.env.BTCPAY_API_KEY || 'YOUR_API_KEY';

interface CreateInvoiceRequest {
  orderId: string;
  amount: number;
  currency: string;
  buyerEmail: string;
  description?: string;
}

interface BTCPayInvoice {
  id: string;
  checkoutLink: string;
  status: string;
  amount: string;
  currency: string;
  cryptoInfo?: {
    cryptoCode: string;
    paymentUrls: {
      BIP21: string;
    };
    address: string;
    due: string;
    rate: number;
  }[];
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: CreateInvoiceRequest = await request.json();
    const { orderId, amount, currency = 'GBP', buyerEmail, description } = body;

    if (!orderId || !amount || !buyerEmail) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: orderId, amount, buyerEmail' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create invoice via BTCPay Server API
    // Documentation: https://docs.btcpayserver.org/API/Greenfield/v1/
    const invoiceResponse = await fetch(
      `${BTCPAY_SERVER_URL}/api/v1/stores/${BTCPAY_STORE_ID}/invoices`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${BTCPAY_API_KEY}`
        },
        body: JSON.stringify({
          amount: amount.toString(),
          currency: currency,
          metadata: {
            orderId: orderId,
            buyerEmail: buyerEmail,
            itemDesc: description || `Peptide Shop Order ${orderId}`
          },
          checkout: {
            speedPolicy: 'MediumSpeed', // 1 confirmation
            expirationMinutes: 15,
            monitoringMinutes: 60,
            paymentTolerance: 0,
            redirectURL: `${import.meta.env.SITE_URL || 'https://peptide-shop.net'}/order-confirmation?orderId=${orderId}`,
            redirectAutomatically: true,
            defaultLanguage: 'en-GB'
          },
          receipt: {
            enabled: true,
            showQR: true
          }
        })
      }
    );

    if (!invoiceResponse.ok) {
      const errorText = await invoiceResponse.text();
      console.error('BTCPay Server error:', errorText);
      
      // Return mock invoice for development/demo
      if (import.meta.env.DEV) {
        return new Response(JSON.stringify({
          success: true,
          invoice: {
            id: 'DEV-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
            checkoutLink: `${BTCPAY_SERVER_URL}/i/demo`,
            status: 'New',
            amount: amount.toString(),
            currency: currency,
            btcAddress: 'bc1q' + Math.random().toString(36).substring(2, 34),
            btcAmount: (amount / 78000).toFixed(8), // Mock conversion
            expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
          }
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ 
        error: 'Failed to create Bitcoin invoice' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const invoice: BTCPayInvoice = await invoiceResponse.json();

    // Extract Bitcoin payment info
    const btcInfo = invoice.cryptoInfo?.find(c => c.cryptoCode === 'BTC');

    return new Response(JSON.stringify({
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
        paymentUrl: btcInfo?.paymentUrls?.BIP21
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating Bitcoin invoice:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Webhook endpoint for BTCPay Server payment notifications
export const PUT: APIRoute = async ({ request }) => {
  try {
    // BTCPay Server sends webhook notifications when payment status changes
    // IMPORTANT: In production, implement proper HMAC verification using:
    // - import.meta.env.BTCPAY_WEBHOOK_SECRET
    // - request.headers.get('BTCPay-Sig')
    
    const body = await request.json();
    const { type } = body;
    // Additional fields available: invoiceId, storeId

    // Handle different webhook events
    switch (type) {
      case 'InvoiceSettled':
        // Payment confirmed - fulfill the order
        // Implement: Update order status in database
        // Implement: Send confirmation email to customer
        break;
        
      case 'InvoiceExpired':
        // Payment not received in time
        // Implement: Mark order as payment expired
        break;
        
      case 'InvoiceInvalid':
        // Payment was invalid (double spend, etc)
        // Implement: Mark order as payment failed
        break;
        
      default:
        // Other webhook types (InvoiceCreated, InvoiceReceivedPayment, etc.)
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Log to server-side monitoring (not console in production)
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
