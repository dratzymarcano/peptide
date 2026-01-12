// Translation module index
// Individual language translation files for better maintainability

// Re-export types and constants
export * from './types';

// Import all language translations
import { en } from './en';
import { nl } from './nl';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
import { it } from './it';

// Export individual languages
export { en, nl, de, fr, es, it };

// Combined translations object
import type { SupportedLanguage, Translations } from './types';

export const translations: Record<SupportedLanguage, Translations> = {
  en,
  nl,
  de,
  fr,
  es,
  it,
};
