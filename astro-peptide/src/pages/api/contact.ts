import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const SITE_EMAIL = 'peptideshop@zohomail.com';

interface ContactFormData {
  user_name: string;
  user_email: string;
  subject?: string;
  user_message: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
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
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    const ownerEmail = import.meta.env.OWNER_EMAIL || SITE_EMAIL;
    
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
          console.error('Failed to send email:', await emailResponse.text());
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
