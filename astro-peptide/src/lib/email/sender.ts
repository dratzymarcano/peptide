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
const FALLBACK_FROM = 'Peptide Shop <info@peptide-kaufen.net>';
const FALLBACK_TO = 'info@peptide-kaufen.net';
const FALLBACK_SITE_URL = 'https://peptide-kaufen.net';

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
  const cur = currency ? currency.toUpperCase() : 'EUR';
  try {
    return new Intl.NumberFormat('de-AT', { style: 'currency', currency: cur }).format(value);
  } catch {
    return `${value.toFixed(2)} ${cur}`;
  }
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
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(args.title)}</title>
  </head>
  <body style="margin:0;background:#EFF8FC;color:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(args.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#EFF8FC;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <!-- Logo bar -->
            <tr>
              <td style="padding:24px 28px 20px;background:#ffffff;">
                <a href="https://peptide-kaufen.net" style="text-decoration:none;display:inline-block;">
                  <img src="https://peptide-kaufen.net/brand/peptide-shop-logo.png" alt="Peptide Shop" width="170" height="42" style="display:block;height:auto;max-height:42px;width:170px;border:0;">
                </a>
              </td>
            </tr>
            <!-- Header band -->
            <tr>
              <td style="background:#0077B6;padding:24px 28px;color:#ffffff;">
                <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#BAE6FD;font-weight:700;">${escapeHtml(args.eyebrow)}</div>
                <div style="font-size:24px;line-height:1.25;font-weight:800;margin-top:6px;color:#ffffff;">${escapeHtml(args.title)}</div>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:28px 28px 32px;">
                <p style="margin:0 0 22px;font-size:16px;line-height:1.6;color:#334155;">${escapeHtml(args.intro)}</p>
                ${args.body}
                ${args.cta ? `<div style="margin:30px 0 0;"><a href="${escapeHtml(args.cta.href)}" style="display:inline-block;background:#0077B6;color:#ffffff;text-decoration:none;border-radius:8px;padding:14px 26px;font-weight:700;font-size:15px;box-shadow:0 2px 4px rgba(0,119,182,0.25);">${escapeHtml(args.cta.label)}</a></div>` : ''}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:22px 28px;background:#F8FAFC;border-top:1px solid #E2E8F0;color:#64748B;font-size:12px;line-height:1.65;">
                <strong style="color:#1E293B;display:block;font-size:13px;margin-bottom:4px;">Peptide Shop · Labor- &amp; Forschungsreagenzien</strong>
                Kärntner Ring 5–7, 1010 Wien, Österreich<br>
                Kundenservice: <a href="mailto:info@peptide-kaufen.net" style="color:#0077B6;text-decoration:none;font-weight:600;">info@peptide-kaufen.net</a> · Web: <a href="https://peptide-kaufen.net" style="color:#0077B6;text-decoration:none;font-weight:600;">peptide-kaufen.net</a>
                <br><br>
                <span style="color:#94A3B8;">${escapeHtml(args.footerNote ?? 'Rechtlicher Hinweis: Alle angebotenen Produkte sind ausnahmslos für In-vitro-Labor- und Forschungszwecke (Research Use Only · RUO) bestimmt. Nicht für diagnostische, therapeutische oder humanmedizinische Zwecke geeignet.')}</span>
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
  const isBank = order.paymentMethod === 'bank';
  const intro = isBank
    ? (locale === 'de'
        ? 'Vielen Dank für Ihre Laborbestellung. Bitte fordern Sie die Bankverbindung für eine schnellere Bearbeitung im Live-Chat beim Kundenservice an.'
        : 'Thank you for your research order. Please request the bank account details from customer support on live chat for faster processing.')
    : (locale === 'de'
        ? 'Vielen Dank für Ihre Laborbestellung. Wir haben Ihre Bestellung erhalten und bereiten sie nach Eingang der Zahlung für den Expressversand vor.'
        : 'Thank you for your research order. We have received your order and are preparing it for express dispatch once payment is received.');
  const address = addressLines(order.shippingAddress);
  const bankLiveChatNotice = isBank
    ? `<div style="margin:20px 0;padding:18px;background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;color:#92400E;font-size:14px;line-height:1.6;">
        <strong style="display:block;font-size:16px;color:#78350F;margin-bottom:8px;">${locale === 'de' ? 'Wichtiger Hinweis zur Banküberweisung:' : 'Important Bank Transfer Notice:'}</strong>
        <p style="margin:0 0 10px;font-size:15px;font-weight:700;color:#92400E;">
          ${locale === 'de' ? 'Bitte fordern Sie die Bankverbindung für eine schnellere Bearbeitung im Live-Chat beim Kundenservice an.' : 'Please request the bank account details from customer support on live chat for faster processing.'}
        </p>
        <p style="margin:0 0 14px;font-size:13px;color:#78350F;">
          ${locale === 'de' ? `Nennen Sie unserem Support im Live-Chat auf der Website einfach Ihre Bestellnummer <strong>${escapeHtml(order.id)}</strong>. Sie erhalten die Bankdaten umgehend für eine sofortige Freigabe.` : `Simply provide your order reference <strong>${escapeHtml(order.id)}</strong> to customer support on live chat to receive the bank details immediately.`}
        </p>
        <a href="${config.siteUrl}" style="display:inline-block;background:#D97706;color:#ffffff;text-decoration:none;border-radius:6px;padding:10px 18px;font-weight:700;font-size:14px;">
          ${locale === 'de' ? '💬 Live-Chat auf Website öffnen' : '💬 Open Live Chat on Website'}
        </a>
       </div>`
    : '';
  const body = `${rows([
    { label: 'Bestellnummer / Order ID', value: order.id },
    { label: 'Zahlungsart / Payment method', value: order.paymentMethod === 'bitcoin' || order.paymentMethod === 'crypto' ? 'Kryptowährung' : 'Banküberweisung (SEPA)' },
    { label: 'Gesamtbetrag / Total', value: formatMoney(order.total, order.currency) },
    { label: 'Lieferadresse / Delivery address', value: address.join(', ') },
  ])}${bankLiveChatNotice}${orderItemsTable(order)}<p style="margin:0;color:#314852;font-size:14px;line-height:1.65;">Diese Reagenzien werden ausschließlich für In-Vitro-Laborforschungszwecke (Research Use Only) geliefert.</p>`;
  const textBankNotice = isBank
    ? `\n\nWICHTIGER HINWEIS ZUR BANKÜBERWEISUNG:\n${locale === 'de' ? 'Bitte fordern Sie die Bankverbindung für eine schnellere Bearbeitung im Live-Chat beim Kundenservice an.' : 'Please request the bank account details from customer support on live chat for faster processing.'}\nWebsite / Live-Chat: ${config.siteUrl}\nBestellnummer: ${order.id}\n`
    : '';
  const text = `${subject}\n\n${intro}${textBankNotice}\n\nBestellnummer: ${order.id}\nZahlungsart: ${order.paymentMethod ?? 'Banküberweisung'}\nGesamtbetrag: ${formatMoney(order.total, order.currency)}\n\n${textOrderLines(order)}\n\n${orderUrl(config.siteUrl, order.id)}`;
  const html = baseEmail({
    preheader: `Bestellung ${order.id} erhalten.`,
    eyebrow: 'Bestelleingang',
    title: subject,
    intro,
    body,
    cta: { label: isBank ? (locale === 'de' ? 'Live-Chat auf Website öffnen' : 'Open Live Chat on Website') : 'Bestellung ansehen', href: isBank ? config.siteUrl : orderUrl(config.siteUrl, order.id) },
  });
  await send({ to: order.email, subject, html, text }, options);
}

export async function sendBankTransferInstructions(order: OrderSummary, options: SendOptions = {}): Promise<void> {
  const config = emailConfig(options.env);
  const locale = pickLocale(order.locale);
  const subject = locale === 'de'
    ? `Banküberweisung & Zahlungsdetails - Bestellung ${order.id}`
    : `Bank Transfer & Payment Details - Order ${order.id}`;
  const reference = order.id;
  const intro = locale === 'de'
    ? 'Bitte fordern Sie die Bankverbindung für eine schnellere Bearbeitung im Live-Chat beim Kundenservice an.'
    : 'Please request the bank account details from customer support on live chat for faster processing.';
  const body = `<div style="margin:0 0 20px;padding:18px;background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;color:#92400E;font-size:14px;line-height:1.6;">
        <strong style="display:block;font-size:16px;color:#78350F;margin-bottom:8px;">${locale === 'de' ? 'Banküberweisung (SEPA / Vorkasse)' : 'Bank Transfer (SEPA / Prepayment)'}</strong>
        <p style="margin:0 0 10px;font-size:15px;font-weight:700;color:#92400E;">
          ${locale === 'de' ? 'Bitte fordern Sie die Bankverbindung für eine schnellere Bearbeitung im Live-Chat beim Kundenservice an.' : 'Please request the bank account details from customer support on live chat for faster processing.'}
        </p>
        <p style="margin:0 0 14px;font-size:13px;color:#78350F;">
          ${locale === 'de' ? `Nennen Sie unserem Kundenservice im Live-Chat auf der Website (<a href="${config.siteUrl}" style="color:#B45309;font-weight:700;">${config.siteUrl}</a>) einfach Ihre Bestellnummer <strong>${escapeHtml(reference)}</strong>. Unser Support übermittelt Ihnen direkt die aktuellen Bankdaten für eine priorisierte Freigabe.` : `Simply provide your order reference <strong>${escapeHtml(reference)}</strong> to customer support on live chat at <a href="${config.siteUrl}" style="color:#B45309;font-weight:700;">${config.siteUrl}</a>. Our team will provide the current bank details immediately.`}
        </p>
        <a href="${config.siteUrl}" style="display:inline-block;background:#D97706;color:#ffffff;text-decoration:none;border-radius:6px;padding:10px 18px;font-weight:700;font-size:14px;">
          ${locale === 'de' ? '💬 Live-Chat auf Website öffnen' : '💬 Open Live Chat on Website'}
        </a>
      </div>
      ${rows([
        { label: locale === 'de' ? 'Bestellnummer / Verwendungszweck' : 'Order ID / Reference', value: reference },
        { label: locale === 'de' ? 'Zahlungsbetrag' : 'Total Amount', value: formatMoney(order.total, order.currency) },
        { label: 'Status', value: locale === 'de' ? 'Warten auf Zahlungsbestätigung' : 'Awaiting Payment' },
      ])}
      <p style="margin:16px 0 0;color:#314852;font-size:14px;line-height:1.65;">${locale === 'de' ? 'Nach Eingang der Überweisung oder Bestätigung im Live-Chat wird Ihre Laborbestellung noch am selben Werktag für den Expressversand freigegeben.' : 'Upon receipt of payment or confirmation in live chat, your research order will be released for express dispatch.'}</p>`;
  const text = `${subject}\n\nWICHTIGER HINWEIS ZUR BANKÜBERWEISUNG:\n${intro}\n\nWebsite / Live-Chat: ${config.siteUrl}\nBestellnummer / Verwendungszweck: ${reference}\nZahlungsbetrag: ${formatMoney(order.total, order.currency)}\n\nBitte halten Sie Ihre Bestellnummer bereit.`;
  const html = baseEmail({
    preheader: `Banküberweisung für Bestellung ${order.id}.`,
    eyebrow: locale === 'de' ? 'Zahlungsinformation' : 'Payment Information',
    title: subject,
    intro,
    body,
    cta: { label: locale === 'de' ? 'Live-Chat auf Website öffnen' : 'Open Live Chat on Website', href: config.siteUrl },
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
  const isDe = !message.locale || message.locale === 'de';
  const subject = isDe
    ? 'Ihre Anfrage an Peptide Shop ist eingegangen'
    : 'We received your Peptide Shop message';
  const intro = isDe
    ? `Hallo ${message.name}, vielen Dank für Ihre Kontaktaufnahme. Unser wissenschaftlicher Kundenservice in Wien hat Ihre Nachricht erhalten und wird sich in der Regel innerhalb eines Werktages bei Ihnen melden.`
    : `Thanks ${message.name}. Our support team in Vienna has received your message and will reply within one business day.`;
  const body = `${rows([
    { label: isDe ? 'Betreff / Thema' : 'Topic', value: message.topic || (isDe ? 'Allgemeine Anfrage' : 'General enquiry') },
    { label: isDe ? 'Antwortzeit' : 'Response target', value: isDe ? 'Innerhalb eines Werktages' : 'Within one business day' },
  ])}<p style="margin:0;color:#334155;font-size:14px;line-height:1.65;">${isDe ? 'Bei Fragen zu einer bestehenden Bestellung halten Sie bitte Ihre Bestellnummer bereit.' : 'For order-specific questions, please keep your order ID or batch reference ready.'}</p>`;
  const text = `${subject}\n\n${intro}\n\n${isDe ? 'Betreff' : 'Topic'}: ${message.topic || 'General enquiry'}`;
  const html = baseEmail({
    preheader: isDe ? 'Ihre Nachricht an Peptide Shop ist eingegangen.' : 'Your message has reached Peptide Shop support.',
    eyebrow: isDe ? 'Nachricht erhalten' : 'Message received',
    title: subject,
    intro,
    body,
  });
  await send({ to: message.email, subject, html, text }, options);
}

/**
 * Double opt-in confirmation. Sent to the address that was typed in, and it is
 * the only thing sent there until the recipient clicks through.
 *
 * §7 UWG and the DSGVO both require consent that the sender can evidence
 * before any marketing mail goes out, and a German-facing shop with a
 * single-step signup is a standard Abmahnung target. Nothing is recorded as a
 * subscriber until the link in this message is followed.
 */
export async function sendNewsletterConfirmation(
  recipient: { email: string; confirmUrl: string },
  options: SendOptions = {},
): Promise<void> {
  const subject = 'Confirm your Peptide Shop subscription';
  const body = `<p style="margin:0 0 16px;color:#314852;font-size:14px;line-height:1.65;">Click the button below to confirm this address. If you did not request this, ignore this message — nothing is stored and no further email will be sent.</p>
  <p style="margin:0;"><a href="${recipient.confirmUrl}" style="display:inline-block;padding:12px 20px;background:#0077B6;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">Confirm subscription</a></p>`;
  const text = `${subject}\n\nConfirm this address by opening:\n${recipient.confirmUrl}\n\nIf you did not request this, ignore this message — nothing is stored.`;
  const html = baseEmail({
    preheader: 'One click to confirm your Peptide Shop subscription.',
    eyebrow: 'Confirm subscription',
    title: 'Confirm your subscription',
    intro: 'You asked to receive product alerts, COA updates and research notes from Peptide Shop.',
    body,
  });
  await send({ to: recipient.email, subject, html, text }, options);
}

/** Tells the operator an address completed double opt-in. */
export async function sendNewsletterNotification(
  recipient: { email: string; locale?: string | null },
  options: SendOptions = {},
): Promise<void> {
  const config = emailConfig(options.env);
  const subject = `Newsletter opt-in confirmed — ${recipient.email}`;
  const body = rows([
    { label: 'Email', value: recipient.email },
    { label: 'Locale', value: recipient.locale ?? defaultLocale },
    { label: 'Consent', value: 'Double opt-in completed' },
  ]);
  const text = `${subject}\n\nEmail: ${recipient.email}\nLocale: ${recipient.locale ?? defaultLocale}\nConsent: double opt-in completed`;
  const html = baseEmail({
    preheader: 'A subscriber confirmed their address.',
    eyebrow: 'Newsletter',
    title: 'Opt-in confirmed',
    intro: 'Add this address to the mailing list.',
    body,
  });
  await send({ to: config.to, subject, html, text, replyTo: recipient.email }, options);
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