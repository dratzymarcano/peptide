import type { APIRoute } from 'astro';
import { sendOrderEmails } from '../../lib/email';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    
    // Get API key from environment (support Cloudflare & Node)
    const runtimeEnv = locals?.runtime?.env;
    const apiKey = import.meta.env.RESEND_API_KEY || runtimeEnv?.RESEND_API_KEY;

    if (!apiKey) {
      console.error('CRITICAL: RESEND_API_KEY is missing');
    }

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
    }, apiKey);

    if (!result.success) {
      // Log error but don't fail the request - order is still valid
      console.error('Email sending failed:', result.error);
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
