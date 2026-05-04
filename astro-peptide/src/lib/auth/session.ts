// Cookie-based Supabase session glue. We keep this small: store the access+refresh
// tokens in a single httpOnly cookie, and provide helpers that the API routes call.
import type { AstroCookies } from 'astro';
import { getSupabaseAnon, isSupabaseConfigured } from '../supabase/server';

const COOKIE_NAME = 'ps_sess';
const COOKIE_OPTS = (maxAge: number) => ({
  path: '/',
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: !import.meta.env.DEV,
  maxAge,
});

interface SessionPayload {
  access_token: string;
  refresh_token: string;
}

export function setSessionCookie(cookies: AstroCookies, session: SessionPayload, expiresInSec = 60 * 60 * 24 * 7): void {
  cookies.set(COOKIE_NAME, JSON.stringify(session), COOKIE_OPTS(expiresInSec));
}

export function clearSessionCookie(cookies: AstroCookies): void {
  cookies.delete(COOKIE_NAME, { path: '/' });
}

export function readSessionCookie(cookies: AstroCookies): SessionPayload | null {
  const raw = cookies.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.access_token === 'string') return parsed as SessionPayload;
    return null;
  } catch {
    return null;
  }
}

export interface PublicUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  provider: 'email' | 'google' | 'facebook';
  avatar?: string;
}

export async function getUserFromCookies(cookies: AstroCookies): Promise<PublicUser | null> {
  if (!isSupabaseConfigured()) return null;
  const session = readSessionCookie(cookies);
  if (!session) return null;
  const supa = getSupabaseAnon();
  if (!supa) return null;
  const { data, error } = await supa.auth.getUser(session.access_token);
  if (error || !data.user) return null;
  const u = data.user;
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  return {
    id: u.id,
    email: u.email ?? '',
    firstName: String(meta.firstName ?? meta.first_name ?? ''),
    lastName: String(meta.lastName ?? meta.last_name ?? ''),
    phone: typeof meta.phone === 'string' ? meta.phone : undefined,
    createdAt: u.created_at ?? new Date().toISOString(),
    provider: (typeof meta.provider === 'string' ? meta.provider : (u.app_metadata?.provider as string | undefined)) === 'google'
      ? 'google'
      : (u.app_metadata?.provider as string | undefined) === 'facebook'
        ? 'facebook'
        : 'email',
    avatar: typeof meta.avatar_url === 'string' ? meta.avatar_url : (typeof meta.avatar === 'string' ? meta.avatar : undefined),
  };
}
