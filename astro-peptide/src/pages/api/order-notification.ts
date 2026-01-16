import type { APIRoute } from 'astro';
import { sendOrderEmails } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    const {
      orderId,
      customerEmail,
      customerName,
      items,
      subtotal,
      shipping,
      discount,
      total,
      paymentMethod,
      shippingAddress,
      currency,
      lang
    } = body;

    // Validate required fields
    if (!orderId || !customerEmail || !items || !total || !shippingAddress) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send emails
    const result = await sendOrderEmails({
      orderId,
      customerEmail,
      customerName: customerName || `${shippingAddress.firstName} ${shippingAddress.lastName}`,
      items,
      subtotal: subtotal || 0,
      shipping: shipping || 0,
      discount: discount || 0,
      total,
      paymentMethod: paymentMethod || 'bank-transfer',
      shippingAddress,
      currency: currency || 'GBP',
      lang: lang || 'en'
    });

    if (!result.success) {
      // Log error but don't fail the request - order is still valid
      console.warn('Email sending failed:', result.error);
    }

    return new Response(JSON.stringify({
      success: true,
      emailSent: result.success,
      orderId
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Order notification error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process order notification'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
