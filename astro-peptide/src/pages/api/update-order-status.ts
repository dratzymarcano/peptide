import type { APIRoute } from 'astro';
import { sendOrderEmails } from '../../lib/email';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { orderId, newStatus, paymentConfirmed, orderData } = body;
    
    if (!orderId || !newStatus) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: orderId, newStatus'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get API key from environment
    const runtimeEnv = locals?.runtime?.env;
    const apiKey = import.meta.env.RESEND_API_KEY || runtimeEnv?.RESEND_API_KEY;
    
    // Handle status transitions
    switch (newStatus) {
      case 'processing':
        // Payment detected in mempool - order is being processed
        console.log(`Order ${orderId}: Payment detected, status -> processing`);
        break;
        
      case 'completed':
        // Payment confirmed - send confirmation email
        console.log(`Order ${orderId}: Payment confirmed, status -> completed`);
        
        if (orderData && apiKey) {
          try {
            // Send payment confirmation email
            await sendOrderEmails({
              orderId,
              customerEmail: orderData.customerEmail,
              customerName: orderData.customerName,
              items: orderData.items,
              subtotal: orderData.subtotal,
              shipping: orderData.shipping,
              discount: orderData.discount,
              total: orderData.total,
              paymentMethod: 'bitcoin',
              shippingAddress: orderData.shippingAddress,
              currency: orderData.currency,
              lang: orderData.lang || 'en'
            }, apiKey);
            
            console.log(`Confirmation email sent for order ${orderId}`);
          } catch (emailErr) {
            console.error('Failed to send confirmation email:', emailErr);
          }
        }
        break;
        
      case 'expired':
        // Payment not received in time - order cancelled
        console.log(`Order ${orderId}: Payment expired, status -> expired`);
        break;
        
      case 'cancelled':
        // Order manually cancelled
        console.log(`Order ${orderId}: Order cancelled`);
        break;
        
      default:
        console.log(`Order ${orderId}: Status updated to ${newStatus}`);
    }
    
    return new Response(JSON.stringify({
      success: true,
      orderId,
      status: newStatus,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error updating order status:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
