import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const SITE_EMAIL = 'peptideshop@zohomail.com';

interface ContactFormData {
  user_name: string;
  user_email: string;
  subject?: string;
  user_message: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Get API key from environment (support Cloudflare & Node)
    const runtimeEnv = (locals as any)?.runtime?.env;
    
    const data: ContactFormData = await request.json();
    
    // Basic validation
    if (!data.user_email || !data.user_name || !data.user_message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Name, email, and message are required.' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.user_email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please provide a valid email address.' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Supabase for storing messages
    const supabaseUrl = import.meta.env.SUPABASE_URL;
    const supabaseKey = import.meta.env.SUPABASE_KEY;
    
    // Store in database if Supabase is configured
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([{
          name: data.user_name,
          email: data.user_email,
          subject: data.subject || 'General Inquiry',
          message: data.user_message,
          status: 'new',
          created_at: new Date().toISOString(),
        }]);

      if (dbError) {
        console.error('Failed to store contact message:', dbError);
        // Continue even if DB fails - we'll still try to send email
      }
    }

    // Send email notification via Resend if API key is configured
    const resendApiKey = import.meta.env.RESEND_API_KEY || runtimeEnv?.RESEND_API_KEY;
    const ownerEmail = import.meta.env.OWNER_EMAIL || runtimeEnv?.OWNER_EMAIL || SITE_EMAIL;
    
    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Peptide Shop <noreply@peptide-shop.net>',
            to: ownerEmail,
            reply_to: data.user_email,
            subject: `[Contact Form] ${data.subject || 'New Message'} from ${data.user_name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>From:</strong> ${data.user_name}</p>
              <p><strong>Email:</strong> ${data.user_email}</p>
              <p><strong>Subject:</strong> ${data.subject || 'General Inquiry'}</p>
              <hr />
              <h3>Message:</h3>
              <p>${data.user_message.replace(/\n/g, '<br />')}</p>
            `,
            text: `New Contact Form Submission\n\nFrom: ${data.user_name}\nEmail: ${data.user_email}\nSubject: ${data.subject || 'General Inquiry'}\n\nMessage:\n${data.user_message}`,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send email to owner:', await emailResponse.text());
        }

        // Send confirmation email to the customer
        const confirmationResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Peptide Shop <noreply@peptide-shop.net>',
            to: data.user_email,
            subject: 'Thank you for contacting Peptide Shop',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(90deg, #0077b6, #023e8a); padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">Peptide Shop</h1>
                </div>
                <div style="padding: 30px; background: #f8fafc;">
                  <h2 style="color: #1e293b; margin-top: 0;">Thank you for your message, ${data.user_name}!</h2>
                  <p style="color: #64748b; line-height: 1.6;">We have received your inquiry and will get back to you within 24 hours.</p>
                  
                  <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
                    <h3 style="color: #1e293b; margin-top: 0; font-size: 16px;">Your Message:</h3>
                    <p style="color: #64748b; margin: 0;"><strong>Subject:</strong> ${data.subject || 'General Inquiry'}</p>
                    <p style="color: #64748b; margin: 10px 0 0 0; white-space: pre-wrap;">${data.user_message}</p>
                  </div>
                  
                  <p style="color: #64748b; line-height: 1.6;">If you have any urgent questions, you can also reach us via:</p>
                  <ul style="color: #64748b; line-height: 1.8;">
                    <li>Email: <a href="mailto:peptideshop@zohomail.com" style="color: #0077b6;">peptideshop@zohomail.com</a></li>
                    <li>Telegram: <a href="https://t.me/Nebelzee" style="color: #0077b6;">@Nebelzee</a></li>
                  </ul>
                </div>
                <div style="background: #1e293b; padding: 20px; text-align: center;">
                  <p style="color: #94a3b8; margin: 0; font-size: 14px;">© 2026 Peptide Shop. All rights reserved.</p>
                </div>
              </div>
            `,
            text: `Thank you for your message, ${data.user_name}!\n\nWe have received your inquiry and will get back to you within 24 hours.\n\nYour Message:\nSubject: ${data.subject || 'General Inquiry'}\n${data.user_message}\n\nIf you have any urgent questions, you can also reach us via:\n- Email: peptideshop@zohomail.com\n- Telegram: @Nebelzee\n\n© 2026 Peptide Shop. All rights reserved.`,
          }),
        });

        if (!confirmationResponse.ok) {
          console.error('Failed to send confirmation email:', await confirmationResponse.text());
        }
      } catch (emailError) {
        console.error('Email send error:', emailError);
        // Continue - we've stored the message if DB was available
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Your message has been sent successfully.' 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
