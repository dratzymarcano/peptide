import type { SupportedLanguage } from './translations';

export type MarketConfig = {
  hreflang: string;
  geoRegion: string;
  geoPlacename: string;
  countryName: string;
  currency: string;
  currencySymbol: string;
  // Optional; if you don't want coordinates, keep undefined.
  icbm?: string;
  marketName: string;
  keywordHint: string;
  keywords: string[];
  // SEO/AEO/GEO optimized keywords from research
  primaryKeywords: string[];
  secondaryKeywords: string[];
  productKeywords: string[];
  longTailKeywords: string[];
};

export const marketByLang: Record<SupportedLanguage, MarketConfig> = {
  en: {
    hreflang: 'en-GB',
    geoRegion: 'GB',
    geoPlacename: 'United Kingdom',
    countryName: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    icbm: '51.5074, -0.1278',
    marketName: 'UK',
    keywordHint: 'buy peptides uk',
    keywords: [
      'buy peptides uk',
      'best place to buy peptides uk',
      'where to buy peptides uk',
      'buy retatrutide peptide uk',
      'peptides buy uk',
      'buy peptides online uk',
      'buy semaglutide peptide uk',
      'buy tirzepatide peptide uk',
      'buy bpc 157 peptide uk',
      'ghk cu peptide buy uk'
    ],
    primaryKeywords: [
      'buy peptides uk',
      'best place to buy peptides uk',
      'where to buy peptides uk',
      'peptides for sale uk'
    ],
    secondaryKeywords: [
      'buy retatrutide peptide uk',
      'retatrutide peptide buy online uk',
      'buy tirzepatide peptide uk',
      'buy semaglutide peptide uk',
      'buy peptides online uk'
    ],
    productKeywords: [
      'bpc 157 peptide uk buy',
      'ghk cu peptide buy uk',
      'buy tb 500 peptide uk',
      'buy collagen peptides uk',
      'tesamorelin peptide buy uk',
      'ipamorelin peptide uk'
    ],
    longTailKeywords: [
      'best place to buy peptides in uk',
      'buy high-purity research peptides uk',
      'where can i buy retatrutide peptides uk',
      'is it legal to buy peptides uk',
      'peptide dosage calculator',
      'peptide reconstitution calculator'
    ]
  },
  de: {
    hreflang: 'de-DE',
    geoRegion: 'DE',
    geoPlacename: 'Deutschland',
    countryName: 'Germany',
    currency: 'EUR',
    currencySymbol: '€',
    icbm: '52.5200, 13.4050',
    marketName: 'Deutschland',
    keywordHint: 'peptide kaufen deutschland',
    keywords: [
      'peptide kaufen',
      'peptiden kaufen',
      'bpc 157 peptide kaufen',
      'peptide kaufen deutschland',
      'peptide online kaufen',
      'ghk cu peptide kaufen',
      'kollagen peptide kaufen',
      'mt2 peptide kaufen',
      'peptide kaufen legal',
      'peptide bodybuilding kaufen'
    ],
    primaryKeywords: [
      'peptide kaufen',
      'peptiden kaufen',
      'peptide kaufen deutschland',
      'peptide online kaufen'
    ],
    secondaryKeywords: [
      'bpc 157 peptide kaufen',
      'retatrutide peptide kaufen',
      'ghk cu peptide kaufen',
      'peptide bodybuilding kaufen',
      'kollagen peptide kaufen'
    ],
    productKeywords: [
      'bpc 157 kaufen',
      'semaglutid kaufen',
      'tirzepatid kaufen',
      'mt2 peptide kaufen',
      'tesamorelin peptide kaufen',
      'ipamorelin kaufen'
    ],
    longTailKeywords: [
      'peptide kaufen legal deutschland',
      'wo kann ich peptide kaufen',
      'peptide kaufen erfahrungen',
      'beste peptide kaufen',
      'ozempic alternative deutschland',
      'abnehmspritze rezept'
    ]
  },
  fr: {
    hreflang: 'fr-FR',
    geoRegion: 'FR',
    geoPlacename: 'France',
    countryName: 'France',
    currency: 'EUR',
    currencySymbol: '€',
    icbm: '48.8566, 2.3522',
    marketName: 'France',
    keywordHint: 'acheter peptide en france',
    keywords: [
      'peptide achat',
      'acheter peptide',
      'peptides achat',
      'acheter peptides en france',
      'peptide musculation achat',
      'acheter peptide en ligne',
      'peptide tb 500 achat',
      'acheter peptide sciences',
      'tb 500 peptide achat',
      'achat peptides france'
    ],
    primaryKeywords: [
      'peptide achat',
      'acheter peptide',
      'peptides achat',
      'achat peptide'
    ],
    secondaryKeywords: [
      'peptide musculation achat',
      'acheter peptides en france',
      'acheter peptide en ligne',
      'peptide tb 500 achat',
      'tb 500 peptide achat'
    ],
    productKeywords: [
      'acheter peptide sciences',
      'acheter peptide tb 500',
      'acheter peptide ipamorelin',
      'acheter peptides de collagène',
      'acheter bpc 157',
      'acheter semaglutide'
    ],
    longTailKeywords: [
      'ou acheter des peptides',
      'acheter peptides france legal',
      'peptides sciences acheter en ligne',
      'acheter peptide de collagène',
      'ou acheter peptides en france'
    ]
  },
  es: {
    hreflang: 'es-ES',
    geoRegion: 'ES',
    geoPlacename: 'España',
    countryName: 'Spain',
    currency: 'EUR',
    currencySymbol: '€',
    icbm: '40.4168, -3.7038',
    marketName: 'España',
    keywordHint: 'comprar peptidos españa',
    keywords: [
      'peptidos donde comprar',
      'péptidos comprar',
      'comprar peptidos',
      'peptidos comprar',
      'péptidos comprar en linea',
      'comprar peptidos en españa',
      'comprar peptidos españa',
      'péptidos culturismo comprar',
      'comprar péptidos',
      'donde comprar peptidos'
    ],
    primaryKeywords: [
      'peptidos donde comprar',
      'péptidos comprar',
      'comprar peptidos',
      'comprar peptidos españa'
    ],
    secondaryKeywords: [
      'péptidos comprar en linea',
      'péptidos culturismo comprar',
      'comprar péptidos',
      'donde comprar peptidos',
      'peptidos culturismo comprar'
    ],
    productKeywords: [
      'comprar peptidos bpc 157',
      'comprar peptidos de colageno',
      'peptido bpc 157 comprar',
      'peptidos de colageno comprar',
      'comprar semaglutida',
      'comprar tirzepatida'
    ],
    longTailKeywords: [
      'donde comprar peptidos en españa',
      'como comprar peptidos',
      'peptidos inyectables comprar',
      'peptidos fitness comprar',
      'donde comprar péptidos online'
    ]
  },
  it: {
    hreflang: 'it-IT',
    geoRegion: 'IT',
    geoPlacename: 'Italia',
    countryName: 'Italy',
    currency: 'EUR',
    currencySymbol: '€',
    icbm: '41.9028, 12.4964',
    marketName: 'Italia',
    keywordHint: 'acquistare peptidi italia',
    keywords: [
      'peptidi acquisto',
      'acquistare peptidi',
      'acquistare peptide online',
      'peptidi dove acquistare',
      'dove acquistare peptidi',
      'acquistare peptidi online',
      'verisol bioactive collagen peptides',
      'peptidi epitide acquistare',
      'prodotti peptidici da acquistare',
      'peptidi di ricerca'
    ],
    primaryKeywords: [
      'peptidi acquisto',
      'acquistare peptidi',
      'acquistare peptide online',
      'peptidi dove acquistare'
    ],
    secondaryKeywords: [
      'dove acquistare peptidi',
      'acquistare peptidi online',
      'peptidi epitide acquistare',
      'prodotti peptidici da acquistare'
    ],
    productKeywords: [
      'acquistare bpc 157',
      'acquistare semaglutide',
      'verisol bioactive collagen peptides',
      'acquistare peptidi di sermorelina',
      'peptidi collagene acquisto'
    ],
    longTailKeywords: [
      'dove acquistare peptidi online',
      'acquistare peptidi italia legale',
      'migliori peptidi da acquistare',
      'peptidi per bodybuilding dove acquistare'
    ]
  },
  nl: {
    hreflang: 'nl-NL',
    geoRegion: 'NL',
    geoPlacename: 'Nederland',
    countryName: 'Netherlands',
    currency: 'EUR',
    currencySymbol: '€',
    icbm: '52.3676, 4.9041',
    marketName: 'Nederland',
    keywordHint: 'peptiden kopen nederland',
    keywords: [
      'peptides kopen',
      'peptides kopen nederland',
      'peptide kopen',
      'peptiden kopen',
      'retatrutide peptide kopen',
      'bpc 157 peptide kopen',
      'ghk cu peptide kopen',
      'tirzepatide peptide kopen',
      'peptides bodybuilding kopen',
      'collagen peptides kopen'
    ],
    primaryKeywords: [
      'peptides kopen',
      'peptides kopen nederland',
      'peptide kopen',
      'peptiden kopen'
    ],
    secondaryKeywords: [
      'retatrutide peptide kopen',
      'bpc 157 peptide kopen',
      'ghk cu peptide kopen',
      'tirzepatide peptide kopen',
      'peptides bodybuilding kopen'
    ],
    productKeywords: [
      'bpc 157 kopen',
      'melanotan 2 kopen',
      'semaglutide peptide kopen',
      'tesamorelin peptide kopen',
      'collagen peptides kopen',
      'sermorelin peptide kopen'
    ],
    longTailKeywords: [
      'waar peptides kopen nederland',
      'peptiden kopen in nederland',
      'peptiden online kopen',
      'peptide waar te koop',
      'beste serum peptide',
      'bpc 157 ervaringen'
    ]
  },
  ru: {
    hreflang: 'ru-RU',
    geoRegion: 'RU',
    geoPlacename: 'Россия',
    countryName: 'Russia',
    currency: 'EUR',
    currencySymbol: '€',
    icbm: '55.7558, 37.6173',
    marketName: 'Россия',
    keywordHint: 'купить пептиды',
    keywords: [
      'пептиды купить',
      'купить пептиды',
      'пептиды купить в аптеке',
      'крем с пептидами купить',
      'пептиды ghrp 2 купить',
      'пептиды где купить',
      'пептиды для косметики купить',
      'сыворотка с пептидами купить',
      'купить пептиды в россии',
      'пептиды хавинсона купить'
    ],
    primaryKeywords: [
      'пептиды купить',
      'купить пептиды',
      'пептиды где купить',
      'где купить пептиды'
    ],
    secondaryKeywords: [
      'пептиды купить в аптеке',
      'крем с пептидами купить',
      'пептиды ghrp 2 купить',
      'пептиды для косметики купить',
      'сыворотка с пептидами купить'
    ],
    productKeywords: [
      'bpc 157 купить',
      'семаглутид купить',
      'тирзепатид купить',
      'меланотан 2 купить',
      'пептиды для похудения купить',
      'пептиды хавинсона купить'
    ],
    longTailKeywords: [
      'где купить качественные пептиды',
      'купить оригинальные пептиды',
      'купить пептиды в москве',
      'купить пептиды спб',
      'пептиды для омоложения купить',
      'пептиды для сжигания жира купить'
    ]
  },
};

export function getMarket(lang: SupportedLanguage): MarketConfig {
  return marketByLang[lang];
}
