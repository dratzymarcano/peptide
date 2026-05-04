import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const IS_DEV = Boolean(import.meta.env.DEV);

let cachedService: SupabaseClient | null = null;
let cachedServiceUrl = '';
let cachedServiceKey = '';

export interface SupabaseServiceEnv {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

function envValue(env: SupabaseServiceEnv | undefined, key: keyof SupabaseServiceEnv): string {
  return String(env?.[key] ?? import.meta.env[key as keyof ImportMetaEnv] ?? '').trim();
}

function serviceConfig(env?: SupabaseServiceEnv) {
  return {
    url: envValue(env, 'SUPABASE_URL'),
    serviceRoleKey: envValue(env, 'SUPABASE_SERVICE_ROLE_KEY'),
  };
}

export function isSupabaseServiceConfigured(env?: SupabaseServiceEnv): boolean {
  const config = serviceConfig(env);
  return Boolean(config.url && config.serviceRoleKey);
}

/** Service-role client. Server-only; bypasses RLS. Never expose to the browser. */
export function getSupabaseService(env?: SupabaseServiceEnv): SupabaseClient | null {
  const config = serviceConfig(env);
  if (!config.url || !config.serviceRoleKey) {
    if (!IS_DEV) throw new Error('supabase_service_not_configured');
    return null;
  }
  if (!cachedService || cachedServiceUrl !== config.url || cachedServiceKey !== config.serviceRoleKey) {
    cachedService = createClient(config.url, config.serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    cachedServiceUrl = config.url;
    cachedServiceKey = config.serviceRoleKey;
  }
  return cachedService;
}
