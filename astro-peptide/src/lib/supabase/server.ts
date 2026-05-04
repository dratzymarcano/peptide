import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY ?? '';
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const IS_DEV = Boolean(import.meta.env.DEV);

let cachedAnon: SupabaseClient | null = null;
let cachedService: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function isSupabaseServiceConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

/** Anon-key client. Use for auth flows that act on behalf of the visitor. */
export function getSupabaseAnon(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    if (!IS_DEV) throw new Error('supabase_not_configured');
    return null;
  }
  if (!cachedAnon) {
    cachedAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cachedAnon;
}

/** Service-role client. Server-only; bypasses RLS. Never expose to the browser. */
export function getSupabaseService(): SupabaseClient | null {
  if (!isSupabaseServiceConfigured()) {
    if (!IS_DEV) throw new Error('supabase_service_not_configured');
    return null;
  }
  if (!cachedService) {
    cachedService = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cachedService;
}
