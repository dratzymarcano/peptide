import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  
  // Basic validation
  if (!data.email || !data.items || data.items.length === 0 || !data.researchConfirm) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }

  // Initialize Supabase (Environment variables needed)
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    // Fallback for demo/dev without env vars - just log it
    console.log('Enquiry received (Supabase not configured):', data);
    return new Response(JSON.stringify({ success: true, message: 'Enquiry logged (dev mode)' }), { status: 200 });
  }

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
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
