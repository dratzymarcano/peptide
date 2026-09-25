/**
 * Signed, self-expiring confirmation tokens for newsletter double opt-in.
 *
 * There is no subscriber table, and deliberately so: until someone completes
 * the opt-in there is nothing worth storing, and storing it early is exactly
 * what the DSGVO's data-minimisation principle asks you not to do. The pending
 * subscription lives entirely inside the signed link in the confirmation
 * email — the address plus an expiry, HMAC'd so it cannot be forged into a
 * confirmation for someone else's address.
 */

const ENCODER = new TextEncoder();

/**
 * HMAC secret for confirmation links.
 *
 * In dev there is usually no secret configured, and `sender.ts` already logs
 * mail rather than sending it, so a fixed development key keeps the opt-in
 * flow exercisable end to end. It is never used outside `import.meta.env.DEV`:
 * in production a missing secret fails the request instead, because a link
 * signed with a publicly-known key confirms nothing.
 */
export function signingSecret(env?: { NEWSLETTER_SECRET?: string }): string | null {
  return env?.NEWSLETTER_SECRET ?? (import.meta.env.DEV ? 'dev-newsletter-secret' : null);
}

/** Tokens are valid for 48 hours; a stale link must be re-requested. */
export const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

function base64url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  // Allocated over a plain ArrayBuffer so the result satisfies BufferSource;
  // Uint8Array.from() widens to ArrayBufferLike, which SubtleCrypto rejects.
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function key(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', ENCODER.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

/** `<base64url(payload)>.<base64url(signature)>` */
export async function createToken(email: string, secret: string, now = Date.now()): Promise<string> {
  const payload = base64url(ENCODER.encode(JSON.stringify({ e: email.toLowerCase(), x: now + TOKEN_TTL_MS })));
  const signature = await crypto.subtle.sign('HMAC', await key(secret), ENCODER.encode(payload));
  return `${payload}.${base64url(signature)}`;
}

/** The email the token attests to, or `null` if forged, malformed or expired. */
export async function verifyToken(token: string, secret: string, now = Date.now()): Promise<string | null> {
  const [payload, signature] = String(token ?? '').split('.');
  if (!payload || !signature) return null;

  let valid = false;
  try {
    valid = await crypto.subtle.verify('HMAC', await key(secret), fromBase64url(signature), ENCODER.encode(payload));
  } catch {
    return null;
  }
  if (!valid) return null;

  try {
    const { e, x } = JSON.parse(new TextDecoder().decode(fromBase64url(payload)));
    if (typeof e !== 'string' || typeof x !== 'number' || x < now) return null;
    return e;
  } catch {
    return null;
  }
}
