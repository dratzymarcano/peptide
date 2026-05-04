import en from './dictionaries/en.json';
import de from './dictionaries/de.json';
import nl from './dictionaries/nl.json';
import fr from './dictionaries/fr.json';
import it from './dictionaries/it.json';
import es from './dictionaries/es.json';
import { defaultLocale, type Locale } from './config';

export const dictionaries = { en, de, nl, fr, it, es } as const;

type Dictionary = typeof en;
type Primitive = string | number;

function getValue(dictionary: Dictionary, key: string): string | undefined {
  return key.split('.').reduce<unknown>((current, segment) => {
    if (!current || typeof current !== 'object') return undefined;
    return (current as Record<string, unknown>)[segment];
  }, dictionary) as string | undefined;
}

export function useTranslations(locale: Locale) {
  const dictionary = dictionaries[locale] ?? dictionaries[defaultLocale];
  const fallback = dictionaries[defaultLocale];

  return function t(key: string, vars: Record<string, Primitive> = {}) {
    const value = getValue(dictionary, key) ?? getValue(fallback, key) ?? key;
    return value.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''));
  };
}
