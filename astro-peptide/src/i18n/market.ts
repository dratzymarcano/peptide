import type { SupportedLanguage } from './translations';

export type MarketConfig = {
  hreflang: string;
  geoRegion: string;
  geoPlacename: string;
  // Optional; if you don’t want coordinates, keep undefined.
  icbm?: string;
  marketName: string;
  keywordHint: string;
  keywords: string[];
};

export const marketByLang: Record<SupportedLanguage, MarketConfig> = {
  en: {
    hreflang: 'en-GB',
    geoRegion: 'GB',
    geoPlacename: 'United Kingdom',
    icbm: '51.5074, -0.1278',
    marketName: 'UK',
    keywordHint: 'buy peptides uk',
    keywords: [
      'peptides for sale uk',
      'buy peptides uk',
      'buy peptides',
      'best peptides for sale uk',
      'peptides for sale online',
      'bpc 157 peptide for sale uk',
      'peptide pens for sale uk',
      'tirzepatide peptide for sale uk',
      'semaglutide peptides uk',
      'research peptides uk'
    ]
  },
  de: {
    hreflang: 'de-DE',
    geoRegion: 'DE',
    geoPlacename: 'Germany',
    icbm: '52.5200, 13.4050',
    marketName: 'Germany',
    keywordHint: 'peptide kaufen deutschland',
    keywords: [
      'peptide kaufen deutschland',
      'peptide deutschland kaufen',
      'peptide kaufen',
      'bpc 157 peptide kaufen',
      'ghk-cu peptid kaufen',
      'collagen peptides kaufen',
      'peptide online kaufen',
      'forschung peptide kaufen',
      'peptide bodybuilding kaufen',
      'legale peptide kaufen'
    ]
  },
  fr: {
    hreflang: 'fr-FR',
    geoRegion: 'FR',
    geoPlacename: 'France',
    icbm: '48.8566, 2.3522',
    marketName: 'France',
    keywordHint: 'acheter peptide en france',
    keywords: [
      'acheter peptide',
      'acheter peptides en france',
      'acheter peptide en ligne',
      'acheter peptides collagène',
      'acheter peptide tb 500',
      'acheter peptide sciences',
      'peptides muscu achat',
      'bpc 157 achat',
      'tb 500 achat',
      'acheter peptids'
    ]
  },
  es: {
    hreflang: 'es-ES',
    geoRegion: 'ES',
    geoPlacename: 'Spain',
    icbm: '40.4168, -3.7038',
    marketName: 'Spain',
    keywordHint: 'comprar peptidos españa',
    keywords: [
      'comprar peptidos',
      'comprar peptidos españa',
      'peptidos donde comprar',
      'péptidos comprar en linea',
      'peptidos culturismo comprar',
      'comprar péptidos',
      'peptidos inyectables comprar',
      'bpc 157 comprar',
      'peptidos precios',
      'tienda peptidos'
    ]
  },
  it: {
    hreflang: 'it-IT',
    geoRegion: 'IT',
    geoPlacename: 'Italy',
    icbm: '41.9028, 12.4964',
    marketName: 'Italy',
    keywordHint: 'acquistare peptidi italia',
    keywords: [
      'acquistare peptidi',
      'acquistare peptidi online',
      'peptidi acquisto',
      'peptidi dove acquistare',
      'verisol peptidi',
      'acquistare peptide online',
      'peptidi per bodybuilding',
      'comprare peptidi italia',
      'vendita peptidi italia',
      'migliori peptidi'
    ]
  },
  nl: {
    hreflang: 'nl-NL',
    geoRegion: 'NL',
    geoPlacename: 'Netherlands',
    icbm: '52.3676, 4.9041',
    marketName: 'Netherlands',
    keywordHint: 'peptiden kopen nederland',
    keywords: [
      'peptiden kopen',
      'peptiden nederland',
      'peptiden kopen nederland',
      'peptiden bestellen',
      'bpc 157 kopen',
      'tirzepatide kopen',
      'semaglutide kopen',
      'peptide online kopen',
      'onderzoekspeptiden',
      'peptides nederland'
    ]
  },
};

export function getMarket(lang: SupportedLanguage): MarketConfig {
  return marketByLang[lang];
}
