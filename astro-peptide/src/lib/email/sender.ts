// Transactional email sender. In production: uses Resend HTTP API.
// In dev (no RESEND_API_KEY): logs the message and returns success so flows are testable.
import { defaultLocale, isLocale, type Locale } from '../../i18n/config';

export interface EmailEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  RESEND_TO?: string;
  CONTACT_TO?: string;
  SITE_URL?: string;
  BANK_IBAN?: string;
  BANK_BIC?: string;
  BANK_BENEFICIARY?: string;
}

interface SendOptions {
  env?: EmailEnv;
}

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

interface OrderSummary {
  id: string;
  total: number;
  currency: string;
  items: { title: string; variant?: string; quantity: number; unitPrice?: number }[];
  email: string;
  locale?: string | null;
  paymentMethod?: 'bank' | 'bitcoin' | 'card' | string;
  shippingAddress?: Record<string, unknown> | null;
}

interface ContactMessage {
  name: string;
  email: string;
  organisation?: string;
  topic?: string;
  message: string;
  locale?: string | null;
}

interface EnquiryMessage {
  name?: string;
  email: string;
  institution?: string;
  message?: string;
  items?: unknown[];
}

const IS_DEV = Boolean(import.meta.env.DEV);
const FALLBACK_FROM = 'Peptide Shop <orders@peptide-shop.net>';
const FALLBACK_TO = 'info@peptide-shop.net';
const FALLBACK_SITE_URL = 'https://peptide-shop.net';

function envValue(env: EmailEnv | undefined, key: keyof EmailEnv, fallback = ''): string {
  const runtimeValue = env?.[key];
  const buildValue = import.meta.env[key as keyof ImportMetaEnv] as string | undefined;
  return String(runtimeValue ?? buildValue ?? fallback).trim();
}

function emailConfig(env?: EmailEnv) {
  return {
    apiKey: envValue(env, 'RESEND_API_KEY'),
    from: envValue(env, 'RESEND_FROM', FALLBACK_FROM),
    to: envValue(env, 'CONTACT_TO', envValue(env, 'RESEND_TO', FALLBACK_TO)),
    siteUrl: envValue(env, 'SITE_URL', FALLBACK_SITE_URL).replace(/\/$/, ''),
    bank: {
      iban: envValue(env, 'BANK_IBAN'),
      bic: envValue(env, 'BANK_BIC'),
      beneficiary: envValue(env, 'BANK_BENEFICIARY'),
    },
  };
}

function pickLocale(input?: string | null): Locale {
  return input && isLocale(input) ? input : defaultLocale;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMoney(value: number, currency: string): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(value);
}

function orderUrl(siteUrl: string, orderId: string): string {
  return `${siteUrl}/order-confirmation?orderId=${encodeURIComponent(orderId)}`;
}

function addressLines(address?: Record<string, unknown> | null): string[] {
  if (!address) return [];
  const name = [address.firstName, address.lastName].filter(Boolean).join(' ');
  return [
    name,
    address.address,
    [address.postcode, address.city].filter(Boolean).join(' '),
    address.county,
    address.country,
  ]
    .map((line) => String(line ?? '').trim())
    .filter(Boolean);
}

function baseEmail(args: {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  cta?: { label: string; href: string };
  footerNote?: string;
}): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(args.title)}</title>
  </head>
  <body style="margin:0;background:#f3f7f8;color:#14262f;font-family:Inter,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(args.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f7f8;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #dce8eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0b5f7c;padding:24px 28px;color:#ffffff;">
                <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#bde7f2;font-weight:700;">${escapeHtml(args.eyebrow)}</div>
                <div style="font-size:28px;line-height:1.2;font-weight:800;margin-top:8px;">${escapeHtml(args.title)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:#314852;">${escapeHtml(args.intro)}</p>
                ${args.body}
                ${args.cta ? `<p style="margin:28px 0 0;"><a href="${escapeHtml(args.cta.href)}" style="display:inline-block;background:#0b5f7c;color:#ffffff;text-decoration:none;border-radius:8px;padding:13px 18px;font-weight:700;">${escapeHtml(args.cta.label)}</a></p>` : ''}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#f8fbfc;border-top:1px solid #e2ecef;color:#5c7078;font-size:13px;line-height:1.6;">
                ${escapeHtml(args.footerNote ?? 'Peptide Shop supplies research-use materials only. Please keep this message for your records.')}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function rows(items: { label: string; value: unknown }[]): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px;">${items
    .filter((item) => String(item.value ?? '').trim())
    .map((item) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e7eef0;color:#60737b;font-size:14px;">${escapeHtml(item.label)}</td><td align="right" style="padding:10px 0;border-bottom:1px solid #e7eef0;color:#14262f;font-weight:700;font-size:14px;">${escapeHtml(item.value)}</td></tr>`)
    .join('')}</table>`;
}

function orderItemsTable(order: OrderSummary): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px;">
    <tr><th align="left" style="padding:10px 0;border-bottom:2px solid #d8e7eb;color:#60737b;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">Item</th><th align="center" style="padding:10px 0;border-bottom:2px solid #d8e7eb;color:#60737b;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">Qty</th><th align="right" style="padding:10px 0;border-bottom:2px solid #d8e7eb;color:#60737b;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">Price</th></tr>
    ${order.items.map((item) => `<tr><td style="padding:12px 0;border-bottom:1px solid #e7eef0;color:#14262f;font-size:14px;"><strong>${escapeHtml(item.title)}</strong>${item.variant ? `<br><span style="color:#60737b;">${escapeHtml(item.variant)}</span>` : ''}</td><td align="center" style="padding:12px 0;border-bottom:1px solid #e7eef0;color:#14262f;font-size:14px;">${item.quantity}</td><td align="right" style="padding:12px 0;border-bottom:1px solid #e7eef0;color:#14262f;font-size:14px;">${item.unitPrice !== undefined ? escapeHtml(formatMoney(item.unitPrice * item.quantity, order.currency)) : '-'}</td></tr>`).join('')}
  </table>`;
}

function textOrderLines(order: OrderSummary): string {
  return order.items
    .map((item) => `${item.quantity} x ${item.title}${item.variant ? ` (${item.variant})` : ''}${item.unitPrice !== undefined ? ` - ${formatMoney(item.unitPrice * item.quantity, order.currency)}` : ''}`)
    .join('\n');
}

async function send({ to, subject, html, text, replyTo }: SendArgs, options: SendOptions = {}): Promise<void> {
  const config = emailConfig(options.env);
  if (!config.apiKey) {
    if (!IS_DEV) {
      console.error('[email] RESEND_API_KEY missing in production');
      throw new Error('email_not_configured');
    }
    console.log(`[email:dev] To=${to} Subject=${subject}\n${text}`);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.from,
      to: [to],
      subject,
      html,
      text,
      reply_to: replyTo,
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error('[email] resend send failed', res.status, errText);
    throw new Error('email_send_failed');
  }
}

export async function sendOrderConfirmation(order: OrderSummary, options: SendOptions = {}): Promise<void> {
  const locale = pickLocale(order.locale);
  const config = emailConfig(options.env);
  const subject =
    locale === 'de' ? `Bestellung ${order.id} erhalten`
    : locale === 'nl' ? `Bestelling ${order.id} ontvangen`
    : locale === 'fr' ? `Commande ${order.id} recue`
    : locale === 'it' ? `Ordine ${order.id} ricevuto`
    : locale === 'es' ? `Pedido ${order.id} recibido`
    : `Order ${order.id} received`;
  const intro = 'Thank you. We have received your research-use order and will process it after compliance and payment checks are complete.';
  const address = addressLines(order.shippingAddress);
  const body = `${rows([
    { label: 'Order ID', value: order.id },
    { label: 'Payment method', value: order.paymentMethod === 'bitcoin' ? 'Bitcoin' : order.paymentMethod === 'bank' ? 'Bank transfer' : order.paymentMethod ?? 'Pending' },
    { label: 'Order total', value: formatMoney(order.total, order.currency) },
    { label: 'Delivery address', value: address.join(', ') },
  ])}${orderItemsTable(order)}<p style="margin:0;color:#314852;font-size:14px;line-height:1.65;">These materials are supplied strictly for in-vitro laboratory research use. Do not use for human or veterinary administration.</p>`;
  const text = `${subject}\n\n${intro}\n\nOrder ID: ${order.id}\nPayment method: ${order.paymentMethod ?? 'Pending'}\nTotal: ${formatMoney(order.total, order.currency)}\n\n${textOrderLines(order)}\n\n${orderUrl(config.siteUrl, order.id)}`;
  const html = baseEmail({
    preheader: `Order ${order.id} has been received.`,
    eyebrow: 'Order received',
    title: subject,
    intro,
    body,
    cta: { label: 'View order', href: orderUrl(config.siteUrl, order.id) },
  });
  await send({ to: order.email, subject, html, text }, options);
}

export async function sendBankTransferInstructions(order: OrderSummary, options: SendOptions = {}): Promise<void> {
  const config = emailConfig(options.env);
  const hasBankDetails = Boolean(config.bank.iban && config.bank.bic && config.bank.beneficiary);
  const subject = `Bank transfer instructions - order ${order.id}`;
  const reference = order.id;
  const intro = hasBankDetails
    ? 'Please use the payment details below and include the order reference exactly as shown.'
    : 'Your order is reserved. Our team will review the order and send bank payment details shortly.';
  const body = hasBankDetails
    ? `${rows([
        { label: 'Beneficiary', value: config.bank.beneficiary },
        { label: 'IBAN', value: config.bank.iban },
        { label: 'BIC / SWIFT', value: config.bank.bic },
        { label: 'Reference', value: reference },
        { label: 'Amount', value: formatMoney(order.total, order.currency) },
      ])}<p style="margin:0;color:#314852;font-size:14px;line-height:1.65;">Orders are released after payment reconciliation and compliance review.</p>`
    : `${rows([
        { label: 'Order ID', value: order.id },
        { label: 'Amount', value: formatMoney(order.total, order.currency) },
        { label: 'Status', value: 'Awaiting payment details' },
      ])}<p style="margin:0;color:#314852;font-size:14px;line-height:1.65;">You do not need to place the order again. We will contact you from our official support address.</p>`;
  const text = hasBankDetails
    ? `${subject}\n\nBeneficiary: ${config.bank.beneficiary}\nIBAN: ${config.bank.iban}\nBIC/SWIFT: ${config.bank.bic}\nReference: ${reference}\nAmount: ${formatMoney(order.total, order.currency)}`
    : `${subject}\n\nOrder ID: ${order.id}\nAmount: ${formatMoney(order.total, order.currency)}\n\nOur team will send bank payment details shortly.`;
  const html = baseEmail({
    preheader: hasBankDetails ? `Payment details for order ${order.id}.` : `We will send payment details for order ${order.id}.`,
    eyebrow: 'Payment instructions',
    title: subject,
    intro,
    body,
  });
  await send({ to: order.email, subject, html, text }, options);
}

export async function sendOrderNotification(order: OrderSummary, options: SendOptions = {}): Promise<void> {
  const config = emailConfig(options.env);
  const subject = `New order ${order.id} - ${formatMoney(order.total, order.currency)}`;
  const address = addressLines(order.shippingAddress);
  const body = `${rows([
    { label: 'Customer', value: order.email },
    { label: 'Payment method', value: order.paymentMethod ?? 'Pending' },
    { label: 'Total', value: formatMoney(order.total, order.currency) },
    { label: 'Locale', value: order.locale ?? defaultLocale },
    { label: 'Delivery address', value: address.join(', ') },
  ])}${orderItemsTable(order)}`;
  const text = `${subject}\n\nCustomer: ${order.email}\nPayment: ${order.paymentMethod ?? 'Pending'}\nTotal: ${formatMoney(order.total, order.currency)}\n\n${textOrderLines(order)}`;
  const html = baseEmail({
    preheader: `New checkout order ${order.id}.`,
    eyebrow: 'Internal notification',
    title: `New order ${order.id}`,
    intro: 'A customer placed a new research-use order.',
    body,
    cta: { label: 'Open storefront', href: config.siteUrl },
    footerNote: 'Internal notification from Peptide Shop checkout.',
  });
  await send({ to: config.to, subject, html, text, replyTo: order.email }, options);
}

export async function sendContactNotification(message: ContactMessage, options: SendOptions = {}): Promise<void> {
  const config = emailConfig(options.env);
  const subject = `Contact form: ${message.topic || 'General enquiry'} - ${message.name}`;
  const body = `${rows([
    { label: 'Name', value: message.name },
    { label: 'Email', value: message.email },
    { label: 'Organisation', value: message.organisation },
    { label: 'Topic', value: message.topic },
    { label: 'Locale', value: message.locale ?? defaultLocale },
  ])}<div style="background:#f8fbfc;border:1px solid #dfeaec;border-radius:8px;padding:16px;color:#14262f;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message.message)}</div>`;
  const text = `${subject}\n\nName: ${message.name}\nEmail: ${message.email}\nOrganisation: ${message.organisation ?? '-'}\nTopic: ${message.topic ?? '-'}\nLocale: ${message.locale ?? defaultLocale}\n\n${message.message}`;
  const html = baseEmail({
    preheader: `New contact message from ${message.name}.`,
    eyebrow: 'Contact request',
    title: 'New contact message',
    intro: 'A visitor submitted the storefront contact form.',
    body,
    footerNote: 'Reply directly to this email to contact the sender.',
  });
  await send({ to: config.to, subject, html, text, replyTo: message.email }, options);
}

export async function sendContactAcknowledgement(message: ContactMessage, options: SendOptions = {}): Promise<void> {
  const subject = 'We received your Peptide Shop message';
  const body = `${rows([
    { label: 'Topic', value: message.topic || 'General enquiry' },
    { label: 'Response target', value: 'Within one business day' },
  ])}<p style="margin:0;color:#314852;font-size:14px;line-height:1.65;">For order-specific questions, please keep your order ID or batch reference ready so our team can help quickly.</p>`;
  const text = `${subject}\n\nThanks ${message.name}, we received your message and will reply within one business day.\n\nTopic: ${message.topic || 'General enquiry'}`;
  const html = baseEmail({
    preheader: 'Your message has reached Peptide Shop support.',
    eyebrow: 'Message received',
    title: 'We received your message',
    intro: `Thanks ${message.name}. Our support team has your message and will reply as soon as possible.`,
    body,
  });
  await send({ to: message.email, subject, html, text }, options);
}

export async function sendEnquiryNotification(message: EnquiryMessage, options: SendOptions = {}): Promise<void> {
  const config = emailConfig(options.env);
  const subject = `Research supply enquiry - ${message.email}`;
  const body = `${rows([
    { label: 'Name', value: message.name },
    { label: 'Email', value: message.email },
    { label: 'Institution', value: message.institution },
    { label: 'Items', value: Array.isArray(message.items) ? `${message.items.length} requested` : '' },
  ])}<div style="background:#f8fbfc;border:1px solid #dfeaec;border-radius:8px;padding:16px;color:#14262f;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message.message || 'No message supplied.')}</div>`;
  const text = `${subject}\n\nName: ${message.name ?? '-'}\nEmail: ${message.email}\nInstitution: ${message.institution ?? '-'}\nItems: ${Array.isArray(message.items) ? message.items.length : 0}\n\n${message.message ?? ''}`;
  const html = baseEmail({
    preheader: `New research supply enquiry from ${message.email}.`,
    eyebrow: 'Supply enquiry',
    title: 'New research supply enquiry',
    intro: 'A visitor submitted a product or supply enquiry.',
    body,
    footerNote: 'Internal notification from Peptide Shop enquiry flow.',
  });
  await send({ to: config.to, subject, html, text, replyTo: message.email }, options);
}