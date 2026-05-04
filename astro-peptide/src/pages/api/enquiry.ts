import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { sendEnquiryNotification, type EmailEnv } from '../../lib/email/sender';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, locals }) => {
  const data = await request.json();
  
  // Basic validation
  if (!data.email || !data.items || data.items.length === 0 || !data.researchConfirm) {
    return json({ success: false, code: 'invalid_request' }, 400);
  }

  // Initialize Supabase (Environment variables needed)
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_KEY;
  
  const env = locals.runtime?.env as EmailEnv | undefined;

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
          payload: data,
        },
      ]);

    if (error) {
      console.error('Enquiry storage error:', error);
    }
  } else if (import.meta.env.DEV) {
    console.log('[enquiry:dev]', data);
  }

  try {
    await sendEnquiryNotification(
      {
        email: String(data.email),
        name: typeof data.name === 'string' ? data.name : undefined,
        institution: typeof data.institution === 'string' ? data.institution : undefined,
        message: typeof data.message === 'string' ? data.message : undefined,
        items: Array.isArray(data.items) ? data.items : [],
      },
      { env },
    );
  } catch (error) {
    console.error('[enquiry] notification email failed', error);
    return json({ success: false, code: 'enquiry_email_failed' }, 500);
  }

  return json({ success: true, code: 'enquiry_received' });
};
