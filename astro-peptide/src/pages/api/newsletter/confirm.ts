/**
 * Newsletter signup — step two of double opt-in.
 *
 * The link in the confirmation email lands here. The token carries the address
 * and an expiry and is HMAC-signed, so this endpoint can trust it without
 * having stored anything when the form was submitted.
 */
import type { APIRoute } from 'astro';
import { env as cfEnv } from 'cloudflare:workers';
import { sendNewsletterNotification, type EmailEnv } from '../../../lib/email/sender';
import { verifyToken, signingSecret } from '../../../lib/newsletterToken';
import { localizePath, defaultLocale } from '../../../i18n/config';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect, locals }) => {
  const locale = locals.locale ?? defaultLocale;
  // localizePath normalises trailing slashes, so the query is appended after
  // the path is localized — passing it through produced "/?newsletter=error/".
  const back = (status: string) => `${localizePath('/', locale)}?newsletter=${status}`;

  const env = cfEnv as unknown as (EmailEnv & { NEWSLETTER_SECRET?: string }) | undefined;
  const secret = signingSecret(env);
  if (!secret) return redirect(back('error'), 303);

  const email = await verifyToken(url.searchParams.get('token') ?? '', secret);
  // Covers forged, malformed and expired links alike — all of them mean the
  // same thing to the visitor: ask again.
  if (!email) return redirect(back('expired'), 303);

  try {
    await sendNewsletterNotification({ email, locale }, { env });
  } catch (error) {
    console.error('[newsletter] operator notification failed', error);
  }

  return redirect(back('confirmed'), 303);
};
