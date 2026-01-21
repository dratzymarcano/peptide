import type { APIRoute } from 'astro';
import { sendWelcomeEmail } from '../../lib/email';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { email, name } = body;
    
    // Get API key from environment (support Cloudflare & Node)
    const runtimeEnv = locals?.runtime?.env;
    const apiKey = import.meta.env.RESEND_API_KEY || runtimeEnv?.RESEND_API_KEY;

    if (!email || !name) {
      return new Response(JSON.stringify({ error: 'Missing email or name' }), { status: 400 });
    }

    const sent = await sendWelcomeEmail(email, name, apiKey);

    return new Response(JSON.stringify({ success: sent }), { 
        status: sent ? 200 : 500,
        headers: {
            'Content-Type': 'application/json'
        }
    });
  } catch (err) {
    console.error('Failed to send welcome email', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
