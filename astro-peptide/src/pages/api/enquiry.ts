import type { APIRoute } from 'astro';
import { env as cfEnv } from 'cloudflare:workers';
import { sendEnquiryNotification, type EmailEnv } from '../../lib/email/sender';
import { checkSpam } from '../../lib/antiSpam';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json().catch(() => ({}));

  // Anti-Spam check
  const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for');
  const spamCheck = checkSpam({
    email: typeof data.email === 'string' ? data.email : undefined,
    name: typeof data.name === 'string' ? data.name : undefined,
    message: typeof data.message === 'string' ? data.message : undefined,
    organisation: typeof data.institution === 'string' ? data.institution : undefined,
    hp: typeof data.hp === 'string' ? data.hp : undefined,
    website: typeof data.website === 'string' ? data.website : undefined,
    clientIp,
  });

  if (spamCheck.isSpam) {
    console.warn('[enquiry] spam detected:', spamCheck.reason);
    return json({ success: true, code: 'enquiry_received' });
  }

  if (!data.email || !data.items || data.items.length === 0 || !data.researchConfirm) {
    return json({ success: false, code: 'invalid_request' }, 400);
  }

  const env = cfEnv as unknown as EmailEnv | undefined;

  try {
    await sendEnquiryNotification(
      {
        email: String(data.email),
        name: typeof data.name === 'string' ? data.name : undefined,
        institution: typeof data.institution === 'string' ? data.institution : undefined,
        message: typeof data.message === 'string' ? data.message : undefined,
        items: Array.isArray(data.items) ? data.items : [],
      },
      { env },
    );
  } catch (error) {
    console.error('[enquiry] notification email failed', error);
    return json({ success: false, code: 'enquiry_email_failed' }, 500);
  }

  return json({ success: true, code: 'enquiry_received' });
};
