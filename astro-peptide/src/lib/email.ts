// Email service using Resend API (works with Cloudflare Workers)

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  county?: string;
  postcode: string;
  country?: string;
}

interface OrderEmailData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'bank-transfer' | 'bitcoin';
  shippingAddress: ShippingAddress;
  currency: string;
  lang: string;
}

const SITE_EMAIL = 'peptideshop@zohomail.com';
const OWNER_EMAIL = import.meta.env.OWNER_EMAIL || SITE_EMAIL;
const SITE_NAME = 'Peptide Shop';
// Default to the domain email since it is verified. Fallback to env var if set.
const SENDER_EMAIL = import.meta.env.SENDER_EMAIL || `Peptide Shop <noreply@peptide-shop.net>`;

// Send email using Resend API
async function sendEmail(
  to: string, 
  subject: string, 
  html: string, 
  text: string, // Plain text version for better deliverability
  apiKey: string,
  from?: string,
  replyTo?: string
): Promise<boolean> {
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured, emails will not be sent');
    return false;
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: from || SENDER_EMAIL,
        to: [to],
        subject,
        html,
        text, // Include text version
        reply_to: replyTo
      })
    });
    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send email:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    GBP: '£', EUR: '€', USD: '$'
  };
  return `${symbols[currency] || currency}${amount.toFixed(2)}`;
}

function generateItemsHtml(items: OrderItem[], currency: string): string {
  return items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${item.title}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formatCurrency(item.price, currency)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formatCurrency(item.price * item.quantity, currency)}</td>
    </tr>
  `).join('');
}

function generateCustomerEmailHtml(data: OrderEmailData): string {
  const isBankTransfer = data.paymentMethod === 'bank-transfer';
  
  const bankDetails = isBankTransfer ? `
    <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">⚠️ Payment Required</h3>
      <p style="color: #78350f; margin: 0 0 16px 0;">Please transfer the exact amount to our bank account:</p>
      <table style="width: 100%; font-size: 14px;">
        <tr><td style="padding: 4px 0; color: #78350f;"><strong>Bank:</strong></td><td style="color: #78350f;">Sparkasse</td></tr>
        <tr><td style="padding: 4px 0; color: #78350f;"><strong>Account Holder:</strong></td><td style="color: #78350f;">Tunay Skenderov</td></tr>
        <tr><td style="padding: 4px 0; color: #78350f;"><strong>IBAN:</strong></td><td style="color: #78350f;">DE88 3505 0000 1303 0684 39</td></tr>
        <tr><td style="padding: 4px 0; color: #78350f;"><strong>Account Type:</strong></td><td style="color: #78350f;">S-Giro comfort</td></tr>
        <tr><td style="padding: 4px 0; color: #78350f;"><strong>Reference:</strong></td><td style="color: #78350f;"><strong>${data.orderId}</strong></td></tr>
        <tr><td style="padding: 4px 0; color: #78350f;"><strong>Amount:</strong></td><td style="color: #78350f;"><strong>${formatCurrency(data.total, data.currency)}</strong></td></tr>
      </table>
      <div style="background: #fbbf24; border-radius: 6px; padding: 12px; margin-top: 16px;">
        <p style="color: #78350f; margin: 0; font-weight: 600;">📸 IMPORTANT: Please send a screenshot of your payment confirmation to peptideshop@zohomail.com to speed up order processing.</p>
      </div>
    </div>
  ` : `
    <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <h3 style="color: #065f46; margin: 0 0 8px 0; font-size: 16px;">₿ Bitcoin Payment</h3>
      <p style="color: #047857; margin: 0;">You selected Bitcoin payment. Please complete payment using the details shown on the checkout page. Your order will be processed once payment is confirmed.</p>
    </div>
  `;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0077b6, #023e8a); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Order Confirmed! ✓</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">Thank you for your order, ${data.customerName}</p>
  </div>
  
  <div style="background: white; border: 1px solid #e2e8f0; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
    <p style="background: #f0f9ff; padding: 16px; border-radius: 8px; text-align: center; font-size: 18px;">
      Order ID: <strong style="color: #0077b6;">${data.orderId}</strong>
    </p>
    
    ${bankDetails}
    
    <h3 style="color: #1e293b; border-bottom: 2px solid #0077b6; padding-bottom: 8px;">Order Summary</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f8fafc;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Item</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">Qty</th>
          <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e2e8f0;">Price</th>
          <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e2e8f0;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${generateItemsHtml(data.items, data.currency)}
      </tbody>
    </table>
    
    <div style="margin-top: 20px; text-align: right;">
      <p style="margin: 4px 0;">Subtotal: ${formatCurrency(data.subtotal, data.currency)}</p>
      <p style="margin: 4px 0;">Shipping: ${data.shipping === 0 ? 'FREE' : formatCurrency(data.shipping, data.currency)}</p>
      ${data.discount > 0 ? `<p style="margin: 4px 0; color: #10b981;">Discount: -${formatCurrency(data.discount, data.currency)}</p>` : ''}
      <p style="margin: 8px 0 0 0; font-size: 20px; font-weight: bold; color: #0077b6;">Total: ${formatCurrency(data.total, data.currency)}</p>
    </div>
    
    <h3 style="color: #1e293b; border-bottom: 2px solid #0077b6; padding-bottom: 8px; margin-top: 32px;">Shipping Address</h3>
    <p style="background: #f8fafc; padding: 16px; border-radius: 8px;">
      ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
      ${data.shippingAddress.address}<br>
      ${data.shippingAddress.city}${data.shippingAddress.county ? `, ${data.shippingAddress.county}` : ''}<br>
      ${data.shippingAddress.postcode}
    </p>
    
    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px;">
      <p>Questions? Reply to this email or contact us at peptideshop@zohomail.com</p>
      <p style="margin-top: 16px;">© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateOwnerEmailHtml(data: OrderEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #10b981; padding: 24px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 20px;">🛒 New Order Received!</h1>
  </div>
  
  <div style="background: white; border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
    <table style="width: 100%; margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0;"><strong>Order ID:</strong></td>
        <td style="color: #0077b6; font-weight: bold;">${data.orderId}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Customer:</strong></td>
        <td>${data.customerName} (${data.customerEmail})</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Payment:</strong></td>
        <td>${data.paymentMethod === 'bank-transfer' ? '🏦 Bank Transfer (Pending)' : '₿ Bitcoin'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Total:</strong></td>
        <td style="font-size: 18px; font-weight: bold; color: #10b981;">${formatCurrency(data.total, data.currency)}</td>
      </tr>
    </table>
    
    <h3 style="border-bottom: 2px solid #10b981; padding-bottom: 8px;">Items</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f8fafc;">
          <th style="padding: 8px; text-align: left;">Item</th>
          <th style="padding: 8px; text-align: center;">Qty</th>
          <th style="padding: 8px; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map(item => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.title}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formatCurrency(item.price * item.quantity, data.currency)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <h3 style="border-bottom: 2px solid #10b981; padding-bottom: 8px; margin-top: 24px;">Ship To</h3>
    <p style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 0;">
      ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
      ${data.shippingAddress.address}<br>
      ${data.shippingAddress.city}${data.shippingAddress.county ? `, ${data.shippingAddress.county}` : ''}<br>
      ${data.shippingAddress.postcode}
    </p>
  </div>
</body>
</html>
  `;
}

function generateOrderText(data: OrderEmailData): string {
  const itemsList = data.items.map(item => 
    `- ${item.title} x ${item.quantity} (${formatCurrency(item.price * item.quantity, data.currency)})`
  ).join('\n');

  const shippingAddr = `${data.shippingAddress.firstName} ${data.shippingAddress.lastName}
${data.shippingAddress.address}
${data.shippingAddress.city}, ${data.shippingAddress.county || ''} ${data.shippingAddress.postcode}`;

  return `ORDER CONFIRMED - ${data.orderId}

Thank you for your order, ${data.customerName}!

ORDER SUMMARY
=============
${itemsList}

Subtotal: ${formatCurrency(data.subtotal, data.currency)}
Shipping: ${data.shipping === 0 ? 'FREE' : formatCurrency(data.shipping, data.currency)}
${data.discount > 0 ? `Discount: -${formatCurrency(data.discount, data.currency)}\n` : ''}Total: ${formatCurrency(data.total, data.currency)}

SHIPPING DETAILS
================
${shippingAddr}

PAYMENT METHOD
==============
${data.paymentMethod === 'bank-transfer' ? 'Bank Transfer (Instructions in HTML email)' : 'Bitcoin'}

If you have any questions, please reply to this email.

${SITE_NAME}`;
}

// Generate simple Owner text
function generateOwnerText(data: OrderEmailData): string {
   return `NEW ORDER: ${data.orderId}
   
Customer: ${data.customerName} (${data.customerEmail})
Total: ${formatCurrency(data.total, data.currency)}
Payment: ${data.paymentMethod}

ITEMS
-----
${data.items.map(i => `${i.title} x ${i.quantity}`).join('\n')}

SHIP TO
-------
${data.shippingAddress.firstName} ${data.shippingAddress.lastName}
${data.shippingAddress.address}
${data.shippingAddress.city} ${data.shippingAddress.postcode}
`;
}

export async function sendWelcomeEmail(email: string, name: string, apiKey?: string): Promise<boolean> {
  const finalApiKey = apiKey || import.meta.env.RESEND_API_KEY;
  if (!finalApiKey) return false;

  const subject = `Welcome to ${SITE_NAME}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for creating an account with ${SITE_NAME}.</p>
      <p>You can now log in to track your orders and checkout faster.</p>
      <p><a href="${import.meta.env.SITE_URL || 'https://peptide-shop.net'}/account/login">Login to your account</a></p>
    </div>
  `;
  const text = `Welcome, ${name}!\n\nThank you for creating an account with ${SITE_NAME}.\nYou can now log in to track your orders and checkout faster at https://peptide-shop.net`;

  return sendEmail(email, subject, html, text, finalApiKey);
}

export async function sendOrderEmails(data: OrderEmailData, apiKey?: string): Promise<{ success: boolean; error?: string }> {
  const finalApiKey = apiKey || import.meta.env.RESEND_API_KEY;
  
  if (!finalApiKey) {
    console.warn('No RESEND_API_KEY found');
    return { success: false, error: 'Configuration error: No API Key' };
  }

  try {
    // Send to customer
    const customerSent = await sendEmail(
      data.customerEmail,
      `Order Confirmed - ${data.orderId} | ${SITE_NAME}`,
      generateCustomerEmailHtml(data),
      generateOrderText(data),
      finalApiKey,
      undefined,
      SITE_EMAIL // Reply-To: Shop email
    );

    // Send to owner
    const ownerSent = await sendEmail(
      OWNER_EMAIL,
      `🛒 New Order: ${data.orderId} - ${formatCurrency(data.total, data.currency)}`,
      generateOwnerEmailHtml(data),
      generateOwnerText(data),
      finalApiKey,
      undefined,
      data.customerEmail // Reply-To: Customer email
    );

    if (!customerSent && !ownerSent) {
      return { success: false, error: 'Email service failed to send both emails' };
    }

    console.log(`Order emails sent for ${data.orderId} (Customer: ${customerSent}, Owner: ${ownerSent})`);
    return { success: true };
  } catch (error) {
    console.error('Failed to send order emails:', error);
    return { success: false, error: String(error) };
  }
}
