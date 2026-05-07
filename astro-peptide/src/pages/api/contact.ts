import type { APIRoute } from 'astro';
import { env as cfEnv } from 'cloudflare:workers';
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

  const env = cfEnv as unknown as EmailEnv | undefined;

  try {
    const contactMessage = { name, email, organisation, topic, message, locale: payload.locale ?? null };
    await sendContactNotification(contactMessage, { env });
    const acknowledgement = sendContactAcknowledgement(contactMessage, { env }).catch((error) => {
      console.error('[contact] acknowledgement email failed', error);
    });
    if (locals.cfContext) {
      locals.cfContext.waitUntil(acknowledgement);
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
