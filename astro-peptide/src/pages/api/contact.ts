import type { APIRoute } from 'astro';
import { getSupabaseService, isSupabaseServiceConfigured } from '../../lib/supabase/server';
import type { SupabaseServiceEnv } from '../../lib/supabase/server';
import {
  sendContactAcknowledgement,
  sendContactNotification,
  type EmailEnv,
} from '../../lib/email/sender';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

interface ContactPayload {
  name?: string;
  email?: string;
  organisation?: string;
  topic?: string;
  message?: string;
  locale?: string;
  hp?: string; // honeypot
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

async function readPayload(request: Request): Promise<ContactPayload> {
  const ct = request.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    return (await request.json()) as ContactPayload;
  }
  const form = await request.formData();
  const obj: Record<string, string> = {};
  for (const [k, v] of form.entries()) obj[k] = typeof v === 'string' ? v : '';
  return obj as ContactPayload;
}

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const payload = await readPayload(request);

  // Honeypot — silent success for bots.
  if (payload.hp) {
    return wantsJson ? json({ success: true }) : redirect('/contact/?sent=1', 303);
  }

  const name = (payload.name ?? '').trim().slice(0, 200);
  const email = (payload.email ?? '').trim().slice(0, 200);
  const organisation = (payload.organisation ?? '').trim().slice(0, 200);
  const topic = (payload.topic ?? '').trim().slice(0, 200);
  const message = (payload.message ?? '').trim().slice(0, 5000);

  if (!name || !email || !message || !isEmail(email)) {
    return wantsJson
      ? json({ success: false, code: 'invalid_request' }, 400)
      : redirect('/contact/?error=invalid', 303);
  }

  const env = locals.runtime?.env as (EmailEnv & SupabaseServiceEnv) | undefined;

  if (isSupabaseServiceConfigured(env)) {
    const supa = getSupabaseService(env);
    if (supa) {
      const { error } = await supa.from('contact_messages').insert([
        { name, email, organisation, topic, message, locale: payload.locale ?? null },
      ]);
      if (error) {
        console.error('[contact] storage error', error);
      }
    }
  } else if (import.meta.env.DEV) {
    // Dev fallback: log and pretend success so the UI flow stays testable.
    // eslint-disable-next-line no-console
    console.log('[contact:dev]', { name, email, organisation, topic, message });
  }

  try {
    const contactMessage = { name, email, organisation, topic, message, locale: payload.locale ?? null };
    await sendContactNotification(contactMessage, { env });
    const acknowledgement = sendContactAcknowledgement(contactMessage, { env }).catch((error) => {
      console.error('[contact] acknowledgement email failed', error);
    });
    if (locals.runtime?.ctx) {
      locals.runtime.ctx.waitUntil(acknowledgement);
    } else {
      await acknowledgement;
    }
  } catch (error) {
    console.error('[contact] notification email failed', error);
    return wantsJson
      ? json({ success: false, code: 'email_error' }, 500)
      : redirect('/contact/?error=server', 303);
  }

  return wantsJson ? json({ success: true }) : redirect('/contact/?sent=1', 303);
};
