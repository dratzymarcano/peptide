import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const IS_DEV = Boolean(import.meta.env.DEV);

let cachedService: SupabaseClient | null = null;

export function isSupabaseServiceConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
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
