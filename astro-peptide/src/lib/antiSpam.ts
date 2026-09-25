/**
 * High-precision Anti-Spam protection for storefront forms (Contact, Enquiries, Checkout).
 *
 * Implements a defense-in-depth shield:
 * 1. Multiple invisible honeypot trap fields.
 * 2. Time-velocity analysis (humans take >3s; bots submit instantly).
 * 3. Disposable/throwaway email detection.
 * 4. Link & keyword spam detection (SEO blasts, crypto/casino/pharma spam).
 * 5. Script & Cyrillic injection heuristics.
 *
 * If spam is identified, the caller can execute a silent drop (returning 200 OK
 * to the bot so it doesn't retry or adapt, while sending 0 emails to the team).
 */

const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  '10minutemail.net',
  '20minutemail.com',
  'burnermail.io',
  'crazymailing.com',
  'dispostable.com',
  'dropmail.me',
  'fakemailgenerator.com',
  'getairmail.com',
  'guerrillamail.biz',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'mailinator.com',
  'mohmal.com',
  'nada.ltd',
  'sharklasers.com',
  'temp-mail.org',
  'tempail.com',
  'tempmail.com',
  'tempmail.net',
  'throwawaymail.com',
  'trashmail.com',
  'trashmail.net',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'zippymail.info',
]);

const SPAM_KEYWORDS = [
  /\bguest\s*posts?\b/i,
  /\bbacklinks?\b/i,
  /\bseo\s*services?\b/i,
  /\brank\s*on\s*google\b/i,
  /\bcasino\b/i,
  /\bslot\s*games?\b/i,
  /\bviagra\b/i,
  /\bcialis\b/i,
  /\bcrypto\s*investment\b/i,
  /\bforex\s*trading\b/i,
  /\btelegram\s*:\s*@/i,
  /\bwhatsapp\s*:\s*\+/i,
  /\bbuy\s*traffic\b/i,
  /\bdating\s*site\b/i,
];

// Cyrillic script regex to catch Russian bot blasts
const CYRILLIC_REGEX = /[\u0400-\u04FF]/g;

// URL detector
const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9.-]+\.[a-z]{2,}\/[^\s]*)/gi;

export interface AntiSpamInput {
  name?: string;
  email?: string;
  message?: string;
  organisation?: string;
  topic?: string;
  // Honeypot fields
  hp?: string;
  website?: string;
  phone_number?: string;
  fax?: string;
  // Timestamp
  _ts?: string | number;
  // Client IP (from CF header cf-connecting-ip)
  clientIp?: string | null;
}

export interface AntiSpamResult {
  isSpam: boolean;
  reason?: string;
  score: number; // 0 (clean) to 100 (definitive spam)
}

/**
 * Evaluates whether an incoming submission is automated or unwanted spam.
 */
export function checkSpam(input: AntiSpamInput): AntiSpamResult {
  let score = 0;
  const reasons: string[] = [];

  // 1. Honeypots (Instant rejection if any filled)
  if (input.hp && String(input.hp).trim().length > 0) {
    return { isSpam: true, reason: 'honeypot_hp', score: 100 };
  }
  if (input.website && String(input.website).trim().length > 0) {
    return { isSpam: true, reason: 'honeypot_website', score: 100 };
  }
  if (input.phone_number && String(input.phone_number).trim().length > 0) {
    return { isSpam: true, reason: 'honeypot_phone', score: 100 };
  }
  if (input.fax && String(input.fax).trim().length > 0) {
    return { isSpam: true, reason: 'honeypot_fax', score: 100 };
  }

  // 2. Submission timing check
  if (input._ts) {
    const renderTime = Number(input._ts);
    if (!Number.isNaN(renderTime) && renderTime > 0) {
      const now = Date.now();
      const elapsedSeconds = (now - renderTime) / 1000;
      
      // If submitted faster than 2.5 seconds, it is virtually guaranteed to be a headless bot
      if (elapsedSeconds < 2.5) {
        score += 85;
        reasons.push(`submission_too_fast (${elapsedSeconds.toFixed(1)}s)`);
      }
      // If submitted older than 48 hours, likely a replay attack
      if (elapsedSeconds > 48 * 3600) {
        score += 40;
        reasons.push('token_expired');
      }
    }
  }

  // 3. Email domain verification
  if (input.email) {
    const domain = input.email.split('@')[1]?.toLowerCase().trim();
    if (domain && DISPOSABLE_DOMAINS.has(domain)) {
      score += 70;
      reasons.push(`disposable_email (${domain})`);
    }
  }

  // 4. Content analysis on message & subject
  const textToCheck = [input.name, input.organisation, input.topic, input.message]
    .filter(Boolean)
    .join(' ');

  // URL count check
  const urls = textToCheck.match(URL_REGEX) || [];
  if (urls.length >= 3) {
    score += 60;
    reasons.push(`excessive_links (${urls.length})`);
  } else if (urls.length >= 2) {
    score += 25;
  }

  // Cyrillic script blast detection in German/English storefront
  const cyrillicChars = (textToCheck.match(CYRILLIC_REGEX) || []).length;
  if (cyrillicChars > 15) {
    score += 80;
    reasons.push('cyrillic_blast');
  }

  // Keyword blacklist check
  for (const pattern of SPAM_KEYWORDS) {
    if (pattern.test(textToCheck)) {
      score += 55;
      reasons.push(`keyword_match (${pattern.source})`);
      break;
    }
  }

  // Suspicious repetitive characters (e.g. aaaaaaa, ???????)
  if (/(.)\1{9,}/.test(textToCheck)) {
    score += 40;
    reasons.push('character_repetition');
  }

  const isSpam = score >= 50;

  return {
    isSpam,
    reason: reasons.join(', ') || undefined,
    score,
  };
}
