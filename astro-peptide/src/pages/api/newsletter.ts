/**
 * Newsletter signup — step one of double opt-in.
 *
 * The footer has posted here from every page of the site since the footer was
 * written, and the route did not exist: every signup 404'd silently.
 *
 * Nothing is recorded here. A confirmation link is emailed to the address that
 * was typed in, and only following that link (see ./newsletter/confirm.ts)
 * registers anything — which is what §7 UWG and the DSGVO require of a
 * German-facing shop, and which also means a bot or a typo cannot subscribe
 * somebody else.
 */
import type { APIRoute } from 'astro';
import { env as cfEnv } from 'cloudflare:workers';
import { sendNewsletterConfirmation, type EmailEnv } from '../../lib/email/sender';
import { createToken, signingSecret } from '../../lib/newsletterToken';
import { localizePath, isLocale, defaultLocale } from '../../i18n/config';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);


interface NewsletterPayload {
  email?: string;
  locale?: string;
  hp?: string;
}

async function readPayload(request: Request): Promise<NewsletterPayload> {
  if ((request.headers.get('content-type') ?? '').includes('application/json')) {
    return (await request.json()) as NewsletterPayload;
  }
  const form = await request.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) out[k] = typeof v === 'string' ? v : '';
  return out as NewsletterPayload;
}

export const POST: APIRoute = async ({ request, redirect, locals, url }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const payload = await readPayload(request);
  const locale = isLocale(payload.locale) ? payload.locale : (locals.locale ?? defaultLocale);
  // localizePath normalises trailing slashes, so the query is appended after
  // the path is localized — passing it through produced "/?newsletter=error/".
  const back = (status: string) => `${localizePath('/', locale)}?newsletter=${status}`;

  // Honeypot — bots get the same answer a person does.
  if (payload.hp) {
    return wantsJson ? json({ success: true }) : redirect(back('pending'), 303);
  }

  const email = (payload.email ?? '').trim().slice(0, 200);
  if (!email || !isEmail(email)) {
    return wantsJson ? json({ success: false, code: 'invalid_email' }, 400) : redirect(back('invalid'), 303);
  }

  const env = cfEnv as unknown as (EmailEnv & { NEWSLETTER_SECRET?: string }) | undefined;
  const secret = signingSecret(env);
  if (!secret) {
    // Without a signing secret a confirmation link cannot be trusted, so the
    // request is refused rather than silently subscribing anyone.
    console.error('[newsletter] set NEWSLETTER_SECRET to enable newsletter signup');
    return wantsJson ? json({ success: false, code: 'not_configured' }, 503) : redirect(back('error'), 303);
  }

  try {
    const token = await createToken(email, secret);
    const confirmUrl = new URL(`/api/newsletter/confirm?token=${encodeURIComponent(token)}`, url.origin).toString();
    const delivery = sendNewsletterConfirmation({ email, confirmUrl }, { env });
    if (locals.cfContext) locals.cfContext.waitUntil(delivery);
    else await delivery;
  } catch (error) {
    console.error('[newsletter] confirmation email failed', error);
    return wantsJson ? json({ success: false, code: 'send_failed' }, 502) : redirect(back('error'), 303);
  }

  return wantsJson ? json({ success: true, status: 'pending' }) : redirect(back('pending'), 303);
};
