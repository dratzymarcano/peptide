import en from './dictionaries/en.json';
import de from './dictionaries/de.json';
import nl from './dictionaries/nl.json';
import fr from './dictionaries/fr.json';
import it from './dictionaries/it.json';
import es from './dictionaries/es.json';
import { sourceLocale, type Locale } from './config';

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
  // en.json is the source dictionary every other locale is checked against by
  // scripts/check-i18n-coverage.mjs, so it stays the fallback even though the
  // site now serves German at the root.
  const dictionary = dictionaries[locale] ?? dictionaries[sourceLocale];
  const fallback = dictionaries[sourceLocale];

  const lookup = (key: string) => getValue(dictionary, key) ?? getValue(fallback, key) ?? key;

  function t(key: string, vars: Record<string, Primitive> = {}) {
    return lookup(key).replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''));
  }

  /**
   * The template with its placeholders intact.
   *
   * Use this for any string handed to a client island that does its own
   * substitution. `t()` substitutes eagerly and replaces an unsupplied
   * placeholder with an empty string, so passing a template through it
   * destroys the token before the island ever sees it: the checkout's primary
   * button rendered "Place order · €" and its minimum-order notice read
   * "a minimum order value of €" — in all six languages — because
   * `t('checkout.placeOrder')` had already eaten `{total}`.
   */
  t.raw = (key: string) => lookup(key);

  return t;
}
