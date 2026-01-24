import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const SITE_EMAIL = 'peptideshop@zohomail.com';

interface EnquiryItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface EnquiryData {
  email: string;
  name?: string;
  institution?: string;
  message?: string;
  items: EnquiryItem[];
  researchConfirm: boolean;
}

// Send enquiry notification via Resend
async function sendEnquiryEmail(data: EnquiryData, apiKey: string, ownerEmail: string): Promise<boolean> {
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured');
    return false;
  }

  const itemsList = data.items.map(item => 
    `• ${item.title} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');

  const itemsHtml = data.items.map(item => 
    `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.title}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">£${item.price.toFixed(2)}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">£${(item.price * item.quantity).toFixed(2)}</td>
    </tr>`
  ).join('');

  const total = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Peptide Shop <noreply@peptide-shop.net>',
        to: ownerEmail,
        reply_to: data.email,
        subject: `[New Enquiry] Quote Request from ${data.name || data.email}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0077b6;">New Quote Request</h2>
            <p><strong>From:</strong> ${data.name || 'Not provided'}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.institution ? `<p><strong>Institution:</strong> ${data.institution}</p>` : ''}
            ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <h3 style="color: #1e293b;">Requested Items</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="padding: 10px 8px; text-align: left; border-bottom: 2px solid #e5e7eb;">Product</th>
                  <th style="padding: 10px 8px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
                  <th style="padding: 10px 8px; text-align: right; border-bottom: 2px solid #e5e7eb;">Unit Price</th>
                  <th style="padding: 10px 8px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr style="background: #f8fafc;">
                  <td colspan="3" style="padding: 10px 8px; text-align: right; font-weight: bold;">Total:</td>
                  <td style="padding: 10px 8px; text-align: right; font-weight: bold; color: #0077b6;">£${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            <p style="color: #6b7280; font-size: 14px;">✓ Customer confirmed products are for research purposes only.</p>
          </div>
        `,
        text: `New Quote Request\n\nFrom: ${data.name || 'Not provided'}\nEmail: ${data.email}\n${data.institution ? `Institution: ${data.institution}\n` : ''}${data.message ? `Message: ${data.message}\n` : ''}\n\nRequested Items:\n${itemsList}\n\nTotal: £${total.toFixed(2)}\n\n✓ Customer confirmed products are for research purposes only.`,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send enquiry email:', await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('Enquiry email error:', error);
    return false;
  }
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data: EnquiryData = await request.json();
    
    // Basic validation
    if (!data.email || !data.items || data.items.length === 0 || !data.researchConfirm) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    // Get API key from environment (support Cloudflare & Node)
    const runtimeEnv = locals?.runtime?.env;
    const resendApiKey = import.meta.env.RESEND_API_KEY || runtimeEnv?.RESEND_API_KEY;
    const ownerEmail = import.meta.env.OWNER_EMAIL || SITE_EMAIL;

    // Initialize Supabase (Environment variables needed)
    const supabaseUrl = import.meta.env.SUPABASE_URL;
    const supabaseKey = import.meta.env.SUPABASE_KEY;
    
    // Store in database if Supabase is configured
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase
        .from('enquiries')
        .insert([
          { 
            email: data.email,
            name: data.name,
            institution: data.institution,
            message: data.message,
            items: data.items,
            status: 'pending',
            payload: data 
          },
        ]);

      if (error) {
        console.error('Failed to store enquiry:', error);
        // Continue even if DB fails
      }
    }

    // Send email notification via Resend
    if (resendApiKey) {
      await sendEnquiryEmail(data, resendApiKey, ownerEmail);
    }

    return new Response(JSON.stringify({ success: true, message: 'Enquiry received' }), { status: 200 });

  } catch (error) {
    console.error('Enquiry error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
