import type { CollectionEntry } from 'astro:content';
import { localizePath, type Locale } from './config';

type ProductEntry = CollectionEntry<'products'>;
type ProductData = ProductEntry['data'];

interface ProductLocaleCopy {
  overviewHeading: (name: string) => string;
  overviewLead: (name: string, purity: string) => string;
  researchUseHeading: string;
  researchUseItems: string[];
  analyticalHeading: string;
  analyticalIntro: (name: string) => string;
  handlingHeading: string;
  handlingBody: string;
  storageHeading: string;
  storageBody: (storage: string) => string;
  resourcesHeading: string;
  statementHeading: string;
  statementBody: (name: string) => string;
  shortDescription: (name: string, purity: string) => string;
  storage: (storage: string) => string;
  metaTitle: (name: string, purity: string) => string;
  metaDescription: (name: string, packageSize: string, purity: string) => string;
  faq: {
    researchUse: (name: string) => string;
    researchUseAnswer: (name: string) => string;
    storage: (name: string) => string;
    storageAnswer: (name: string, storage: string) => string;
    purity: (name: string) => string;
    purityAnswer: (name: string, purity: string) => string;
    coa: (name: string) => string;
    coaAnswer: (name: string) => string;
  };
  links: {
    related: string;
    coaPolicy: string;
    storageGuide: string;
  };
}

export interface LocalizedProductData {
  title: string;
  cleanTitle: string;
  shortDescription: string;
  storage: string;
  priceRange: string;
  meta: ProductData['meta'];
  faqs: NonNullable<ProductData['faqs']>;
  bodyHtml: string;
}

const copy: Record<Exclude<Locale, 'en'>, ProductLocaleCopy> = {
  de: {
    overviewHeading: (name) => `${name} Forschungsüberblick`,
    overviewLead: (name, purity) => `${name} ist ein Forschungspeptid für kontrollierte Laboranwendungen. Die Charge wird mit ${purity} Reinheit und chargenbezogener COA-Dokumentation bereitgestellt.`,
    researchUseHeading: 'Forschungsanwendung',
    researchUseItems: ['In-vitro- und analytische Assay-Modelle', 'Vergleichende Peptid- und Proteinuntersuchungen', 'Methodenentwicklung, Stabilitäts- und Handhabungsstudien'],
    analyticalHeading: 'Sequenz und analytische Daten',
    analyticalIntro: (name) => `Die technischen Kerndaten für ${name} bleiben unverändert, damit Labor-, Bestell- und COA-Dokumente konsistent bleiben.`,
    handlingHeading: 'Rekonstitution und Handhabung',
    handlingBody: 'Lassen Sie lyophilisiertes Material vor dem Öffnen temperaturangleichen, geben Sie validiertes Lösungsmittel langsam an der Vialwand entlang zu und vermeiden Sie kräftiges Schütteln. Dokumentieren Sie Endkonzentration, Lösungsmittel, Bediener und Zeitpunkt im Laborjournal oder LIMS.',
    storageHeading: 'Lagerung',
    storageBody: (storage) => `Ungeöffnetes Material gemäß Angabe lagern: ${storage}. Vials trocken, verschlossen und lichtgeschützt aufbewahren. Rekonstituierte Lösungen nur unter validierten Laborbedingungen lagern und nach internen SOPs entsorgen.`,
    resourcesHeading: 'Verwandte Ressourcen',
    statementHeading: 'Research-Use-Only-Hinweis',
    statementBody: (name) => `${name} wird von Peptide Shop ausschließlich für Forschungszwecke verkauft. Es ist kein Arzneimittel, Lebensmittel, Kosmetikum, Nahrungsergänzungsmittel oder Diagnostikum. Käufer sind für rechtmäßigen Erwerb, Lagerung, Handhabung und Entsorgung verantwortlich.`,
    shortDescription: (name, purity) => `${name} in Forschungsqualität mit ${purity} HPLC-Reinheit, chargenbezogener COA-Dokumentation und RUO-Kennzeichnung.`,
    storage: (storage) => `${storage}; trocken, verschlossen und lichtgeschützt lagern`,
    metaTitle: (name, purity) => `${name} kaufen – ${purity} HPLC, COA enthalten | Peptide Shop`,
    metaDescription: (name, packageSize, purity) => `${name} ${packageSize}, ${purity} HPLC-Reinheit und chargenbezogene COA-Dokumentation. Ausschließlich für Forschungszwecke.`,
    faq: {
      researchUse: (name) => `Wofür wird ${name} in der Forschung eingesetzt?`,
      researchUseAnswer: (name) => `${name} wird in kontrollierten Laborstudien eingesetzt, in denen Peptidaktivität, Stabilität, Identität oder assaybezogene Effekte untersucht werden.`,
      storage: (name) => `Wie sollte ${name} gelagert werden?`,
      storageAnswer: (_name, storage) => `Lagern Sie das lyophilisierte Material gemäß Angabe: ${storage}. Nach der Rekonstitution gelten validierte Laborbedingungen und interne SOPs.`,
      purity: (name) => `Welche Reinheit hat ${name}?`,
      purityAnswer: (name, purity) => `${name} wird mit ${purity} Reinheit angegeben. Jede verfügbare Charge wird mit Analysezertifikat und Identitätsdaten dokumentiert.`,
      coa: (name) => `Ist für ${name} ein COA verfügbar?`,
      coaAnswer: () => 'Ja. Verfügbare Chargendokumente können als HTML-Vorschau oder PDF abgerufen werden; der Umfang richtet sich nach der COA-Richtlinie.',
    },
    links: { related: 'Verwandte Forschungsmaterialien anzeigen', coaPolicy: 'COA-Richtlinie', storageGuide: 'Peptidlagerung und Handhabung' },
  },
  nl: {
    overviewHeading: (name) => `${name} onderzoeksoverzicht`,
    overviewLead: (name, purity) => `${name} is een onderzoekspeptide voor gecontroleerde laboratoriumtoepassingen. De batch wordt geleverd met ${purity} zuiverheid en lotspecifieke COA-documentatie.`,
    researchUseHeading: 'Onderzoeksgebruik',
    researchUseItems: ['In-vitro en analytische assaymodellen', 'Vergelijkend peptide- en eiwitonderzoek', 'Methodeontwikkeling, stabiliteits- en verwerkingsstudies'],
    analyticalHeading: 'Sequentie en analytische gegevens',
    analyticalIntro: (name) => `De technische kerngegevens voor ${name} blijven ongewijzigd zodat laboratorium-, bestel- en COA-documenten consistent blijven.`,
    handlingHeading: 'Reconstitutie en hantering',
    handlingBody: 'Laat gelyofiliseerd materiaal op temperatuur komen voordat u het opent, voeg gevalideerd oplosmiddel langzaam langs de vialwand toe en vermijd krachtig schudden. Leg eindconcentratie, oplosmiddel, operator en tijdstip vast in het laboratoriumlogboek of LIMS.',
    storageHeading: 'Opslag',
    storageBody: (storage) => `Bewaar ongeopend materiaal volgens de vermelde conditie: ${storage}. Houd vials droog, gesloten en beschermd tegen licht. Gereconstitueerde oplossingen moeten onder gevalideerde laboratoriumcondities worden bewaard en volgens interne SOP's worden afgevoerd.`,
    resourcesHeading: 'Gerelateerde bronnen',
    statementHeading: 'Research-use-only verklaring',
    statementBody: (name) => `${name} wordt door Peptide Shop uitsluitend verkocht voor onderzoeksgebruik. Het is geen geneesmiddel, voedingsmiddel, cosmetisch product, supplement of diagnostisch product. Kopers zijn verantwoordelijk voor rechtmatige aankoop, opslag, hantering en verwijdering.`,
    shortDescription: (name, purity) => `${name} van onderzoekskwaliteit met ${purity} HPLC-zuiverheid, lotspecifieke COA-documentatie en RUO-labeling.`,
    storage: (storage) => `${storage}; droog, gesloten en beschermd tegen licht bewaren`,
    metaTitle: (name, purity) => `${name} kopen - ${purity} HPLC, COA inbegrepen | Peptide Shop`,
    metaDescription: (name, packageSize, purity) => `${name} ${packageSize}, ${purity} HPLC-zuiverheid en lotspecifieke COA-documentatie. Alleen voor onderzoeksgebruik.`,
    faq: {
      researchUse: (name) => `Waarvoor wordt ${name} in onderzoek gebruikt?`,
      researchUseAnswer: (name) => `${name} wordt gebruikt in gecontroleerde laboratoriumstudies naar peptideactiviteit, stabiliteit, identiteit of assaygerelateerde effecten.`,
      storage: (name) => `Hoe moet ${name} worden opgeslagen?`,
      storageAnswer: (_name, storage) => `Bewaar het gelyofiliseerde materiaal volgens de vermelde conditie: ${storage}. Na reconstitutie gelden gevalideerde laboratoriumcondities en interne SOP's.`,
      purity: (name) => `Welke zuiverheid heeft ${name}?`,
      purityAnswer: (name, purity) => `${name} wordt vermeld met ${purity} zuiverheid. Elke beschikbare batch wordt ondersteund met een analysecertificaat en identiteitsgegevens.`,
      coa: (name) => `Is er een COA beschikbaar voor ${name}?`,
      coaAnswer: () => 'Ja. Beschikbare batchdocumenten kunnen als HTML-preview of PDF worden bekeken; de dekking volgt het COA-beleid.',
    },
    links: { related: 'Gerelateerde onderzoeksmaterialen bekijken', coaPolicy: 'COA-beleid', storageGuide: 'Peptideopslag en hantering' },
  },
  fr: {
    overviewHeading: (name) => `Aperçu de recherche ${name}`,
    overviewLead: (name, purity) => `${name} est un peptide de qualité recherche destiné aux applications de laboratoire contrôlées. Le lot est fourni avec une pureté ${purity} et une documentation COA au niveau du lot.`,
    researchUseHeading: 'Utilisation en recherche',
    researchUseItems: ['Modèles in vitro et dosages analytiques', 'Études comparatives de peptides et de protéines', 'Développement de méthodes, stabilité et manipulation'],
    analyticalHeading: 'Séquence et données analytiques',
    analyticalIntro: (name) => `Les données techniques essentielles de ${name} restent inchangées afin de conserver la cohérence entre les documents de laboratoire, de commande et de COA.`,
    handlingHeading: 'Reconstitution et manipulation',
    handlingBody: 'Laissez le matériau lyophilisé s’équilibrer avant ouverture, ajoutez lentement le solvant validé le long de la paroi du flacon et évitez toute agitation vigoureuse. Consignez la concentration finale, le solvant, l’opérateur et l’heure dans le cahier de laboratoire ou le LIMS.',
    storageHeading: 'Conservation',
    storageBody: (storage) => `Conservez le matériau non ouvert selon la condition indiquée : ${storage}. Gardez les flacons secs, fermés et protégés de la lumière. Les solutions reconstituées doivent être stockées selon des conditions de laboratoire validées et éliminées selon les SOP internes.`,
    resourcesHeading: 'Ressources connexes',
    statementHeading: 'Déclaration réservée à la recherche',
    statementBody: (name) => `${name} est vendu par Peptide Shop exclusivement pour un usage de recherche. Ce n’est pas un médicament, aliment, cosmétique, complément ou produit diagnostique. Les acheteurs sont responsables de l’achat, du stockage, de la manipulation et de l’élimination conformes.`,
    shortDescription: (name, purity) => `${name} de qualité recherche avec pureté HPLC ${purity}, documentation COA par lot et marquage RUO.`,
    storage: (storage) => `${storage}; conserver au sec, fermé et à l’abri de la lumière`,
    metaTitle: (name, purity) => `Acheter ${name} – ${purity} HPLC, COA inclus | Peptide Shop`,
    metaDescription: (name, packageSize, purity) => `${name} ${packageSize}, pureté HPLC ${purity} et documentation COA par lot. Réservé à la recherche.`,
    faq: {
      researchUse: (name) => `À quoi sert ${name} en recherche ?`,
      researchUseAnswer: (name) => `${name} est utilisé dans des études de laboratoire contrôlées portant sur l’activité, la stabilité, l’identité ou les effets liés aux dosages peptidiques.`,
      storage: (name) => `Comment conserver ${name} ?`,
      storageAnswer: (_name, storage) => `Conservez le matériau lyophilisé selon la condition indiquée : ${storage}. Après reconstitution, appliquez les conditions validées et les SOP internes.`,
      purity: (name) => `Quelle est la pureté de ${name} ?`,
      purityAnswer: (name, purity) => `${name} est indiqué avec une pureté ${purity}. Chaque lot disponible est accompagné d’un certificat d’analyse et de données d’identité.`,
      coa: (name) => `Un COA est-il disponible pour ${name} ?`,
      coaAnswer: () => 'Oui. Les documents de lot disponibles peuvent être consultés en aperçu HTML ou en PDF ; la couverture suit la politique COA.',
    },
    links: { related: 'Voir les matériaux de recherche associés', coaPolicy: 'Politique COA', storageGuide: 'Conservation et manipulation des peptides' },
  },
  it: {
    overviewHeading: (name) => `Panoramica di ricerca su ${name}`,
    overviewLead: (name, purity) => `${name} è un peptide di grado ricerca per applicazioni di laboratorio controllate. Il lotto è fornito con purezza ${purity} e documentazione COA specifica del lotto.`,
    researchUseHeading: 'Uso nella ricerca',
    researchUseItems: ['Modelli in vitro e saggi analitici', 'Studi comparativi su peptidi e proteine', 'Sviluppo metodo, stabilità e studi di manipolazione'],
    analyticalHeading: 'Sequenza e dati analitici',
    analyticalIntro: (name) => `I dati tecnici principali di ${name} rimangono invariati per mantenere coerenza tra documenti di laboratorio, ordine e COA.`,
    handlingHeading: 'Ricostituzione e manipolazione',
    handlingBody: 'Lasciare equilibrare il materiale liofilizzato prima dell’apertura, aggiungere lentamente il solvente validato lungo la parete del vial ed evitare agitazione vigorosa. Registrare concentrazione finale, solvente, operatore e ora nel quaderno di laboratorio o LIMS.',
    storageHeading: 'Conservazione',
    storageBody: (storage) => `Conservare il materiale non aperto secondo la condizione indicata: ${storage}. Tenere i vial asciutti, chiusi e protetti dalla luce. Le soluzioni ricostituite devono essere conservate in condizioni di laboratorio validate e smaltite secondo le SOP interne.`,
    resourcesHeading: 'Risorse correlate',
    statementHeading: 'Dichiarazione per solo uso di ricerca',
    statementBody: (name) => `${name} è venduto da Peptide Shop esclusivamente per uso di ricerca. Non è un medicinale, alimento, cosmetico, integratore o prodotto diagnostico. Gli acquirenti sono responsabili di acquisto, conservazione, manipolazione e smaltimento conformi.`,
    shortDescription: (name, purity) => `${name} di grado ricerca con purezza HPLC ${purity}, documentazione COA per lotto e marcatura RUO.`,
    storage: (storage) => `${storage}; conservare asciutto, chiuso e protetto dalla luce`,
    metaTitle: (name, purity) => `Acquista ${name} – ${purity} HPLC, COA incluso | Peptide Shop`,
    metaDescription: (name, packageSize, purity) => `${name} ${packageSize}, purezza HPLC ${purity} e documentazione COA specifica del lotto. Solo per uso di ricerca.`,
    faq: {
      researchUse: (name) => `Per cosa si usa ${name} nella ricerca?`,
      researchUseAnswer: (name) => `${name} viene usato in studi di laboratorio controllati su attività, stabilità, identità o effetti correlati ai saggi peptidici.`,
      storage: (name) => `Come deve essere conservato ${name}?`,
      storageAnswer: (_name, storage) => `Conservare il materiale liofilizzato secondo la condizione indicata: ${storage}. Dopo la ricostituzione si applicano condizioni validate e SOP interne.`,
      purity: (name) => `Qual è la purezza di ${name}?`,
      purityAnswer: (name, purity) => `${name} è indicato con purezza ${purity}. Ogni lotto disponibile è supportato da certificato di analisi e dati di identità.`,
      coa: (name) => `È disponibile un COA per ${name}?`,
      coaAnswer: () => 'Sì. I documenti di lotto disponibili possono essere consultati come anteprima HTML o PDF; la copertura segue la politica COA.',
    },
    links: { related: 'Visualizza materiali di ricerca correlati', coaPolicy: 'Politica COA', storageGuide: 'Conservazione e manipolazione dei peptidi' },
  },
  es: {
    overviewHeading: (name) => `Resumen de investigación de ${name}`,
    overviewLead: (name, purity) => `${name} es un péptido de grado investigación para aplicaciones de laboratorio controladas. El lote se suministra con pureza ${purity} y documentación COA específica del lote.`,
    researchUseHeading: 'Uso en investigación',
    researchUseItems: ['Modelos in vitro y ensayos analíticos', 'Estudios comparativos de péptidos y proteínas', 'Desarrollo de métodos, estabilidad y manipulación'],
    analyticalHeading: 'Secuencia y datos analíticos',
    analyticalIntro: (name) => `Los datos técnicos principales de ${name} permanecen sin cambios para mantener coherencia entre documentos de laboratorio, pedido y COA.`,
    handlingHeading: 'Reconstitución y manipulación',
    handlingBody: 'Permita que el material liofilizado se equilibre antes de abrirlo, añada lentamente el disolvente validado por la pared del vial y evite agitar con fuerza. Registre concentración final, disolvente, operador y hora en el cuaderno de laboratorio o LIMS.',
    storageHeading: 'Almacenamiento',
    storageBody: (storage) => `Almacene el material sin abrir según la condición indicada: ${storage}. Mantenga los viales secos, cerrados y protegidos de la luz. Las soluciones reconstituidas deben conservarse bajo condiciones de laboratorio validadas y desecharse según las SOP internas.`,
    resourcesHeading: 'Recursos relacionados',
    statementHeading: 'Declaración de uso exclusivo en investigación',
    statementBody: (name) => `${name} es vendido por Peptide Shop exclusivamente para uso de investigación. No es medicamento, alimento, cosmético, suplemento ni producto diagnóstico. Los compradores son responsables de la compra, almacenamiento, manipulación y eliminación conforme a la normativa.`,
    shortDescription: (name, purity) => `${name} de grado investigación con pureza HPLC ${purity}, documentación COA por lote y etiquetado RUO.`,
    storage: (storage) => `${storage}; conservar seco, cerrado y protegido de la luz`,
    metaTitle: (name, purity) => `Comprar ${name} – ${purity} HPLC, COA incluido | Peptide Shop`,
    metaDescription: (name, packageSize, purity) => `${name} ${packageSize}, pureza HPLC ${purity} y documentación COA específica del lote. Solo para uso de investigación.`,
    faq: {
      researchUse: (name) => `¿Para qué se usa ${name} en investigación?`,
      researchUseAnswer: (name) => `${name} se utiliza en estudios de laboratorio controlados sobre actividad, estabilidad, identidad o efectos relacionados con ensayos peptídicos.`,
      storage: (name) => `¿Cómo debe almacenarse ${name}?`,
      storageAnswer: (_name, storage) => `Almacene el material liofilizado según la condición indicada: ${storage}. Tras la reconstitución se aplican condiciones validadas y SOP internas.`,
      purity: (name) => `¿Qué pureza tiene ${name}?`,
      purityAnswer: (name, purity) => `${name} se indica con pureza ${purity}. Cada lote disponible está respaldado por certificado de análisis y datos de identidad.`,
      coa: (name) => `¿Hay un COA disponible para ${name}?`,
      coaAnswer: () => 'Sí. Los documentos de lote disponibles pueden consultarse como vista HTML o PDF; la cobertura sigue la política COA.',
    },
    links: { related: 'Ver materiales de investigación relacionados', coaPolicy: 'Política COA', storageGuide: 'Almacenamiento y manipulación de péptidos' },
  },
};

const tableLabels: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  de: { field: 'Feld', detail: 'Detail', productId: 'Produkt-ID', packageSize: 'Packungsgröße', cas: 'CAS', molecularWeight: 'Molekulargewicht', purity: 'Reinheit', storage: 'Lagerung' },
  nl: { field: 'Veld', detail: 'Detail', productId: 'Product-ID', packageSize: 'Verpakkingsgrootte', cas: 'CAS', molecularWeight: 'Molecuulgewicht', purity: 'Zuiverheid', storage: 'Opslag' },
  fr: { field: 'Champ', detail: 'Détail', productId: 'ID produit', packageSize: 'Format', cas: 'CAS', molecularWeight: 'Poids moléculaire', purity: 'Pureté', storage: 'Conservation' },
  it: { field: 'Campo', detail: 'Dettaglio', productId: 'ID prodotto', packageSize: 'Formato', cas: 'CAS', molecularWeight: 'Peso molecolare', purity: 'Purezza', storage: 'Conservazione' },
  es: { field: 'Campo', detail: 'Detalle', productId: 'ID de producto', packageSize: 'Tamaño de envase', cas: 'CAS', molecularWeight: 'Peso molecular', purity: 'Pureza', storage: 'Almacenamiento' },
};

function cleanProductTitle(title: string): string {
  return title.split('|')[0].trim().replace(/^Buy\s+/i, '').replace(/\s+UK$/i, '');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function localizedFaqs(product: ProductData, name: string, locale: Exclude<Locale, 'en'>) {
  const text = copy[locale];
  return [
    { question: text.faq.researchUse(name), answer: text.faq.researchUseAnswer(name) },
    { question: text.faq.storage(name), answer: text.faq.storageAnswer(name, product.storage) },
    { question: text.faq.purity(name), answer: text.faq.purityAnswer(name, product.purity) },
    { question: text.faq.coa(name), answer: text.faq.coaAnswer(name) },
  ];
}

function buildBodyHtml(product: ProductEntry, locale: Exclude<Locale, 'en'>, name: string): string {
  const data = product.data;
  const text = copy[locale];
  const labels = tableLabels[locale];
  const areaPath = data.researchArea ? localizePath(`/catalog/${data.researchArea}/`, locale) : localizePath('/catalog/', locale);
  const useCasePath = data.useCases?.[0] ? localizePath(`/use-case/${data.useCases[0]}/`, locale) : localizePath('/catalog/', locale);

  return `
    <h2>${escapeHtml(text.overviewHeading(name))}</h2>
    <p>${escapeHtml(text.overviewLead(name, data.purity))}</p>
    <p>${escapeHtml(text.shortDescription(name, data.purity))}</p>

    <h2>${escapeHtml(text.researchUseHeading)}</h2>
    <ul>${text.researchUseItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>

    <h2>${escapeHtml(text.analyticalHeading)}</h2>
    <p>${escapeHtml(text.analyticalIntro(name))}</p>
    <table>
      <thead><tr><th>${escapeHtml(labels.field)}</th><th>${escapeHtml(labels.detail)}</th></tr></thead>
      <tbody>
        <tr><td>${escapeHtml(labels.productId)}</td><td>${escapeHtml(data.id)}</td></tr>
        <tr><td>${escapeHtml(labels.packageSize)}</td><td>${escapeHtml(data.package_sizes.join(', '))}</td></tr>
        <tr><td>${escapeHtml(labels.cas)}</td><td>${escapeHtml(data.cas ?? 'N/A')}</td></tr>
        <tr><td>${escapeHtml(labels.molecularWeight)}</td><td>${escapeHtml(data.molecular_weight ?? 'N/A')}</td></tr>
        <tr><td>${escapeHtml(labels.purity)}</td><td>${escapeHtml(data.purity)}</td></tr>
        <tr><td>${escapeHtml(labels.storage)}</td><td>${escapeHtml(text.storage(data.storage))}</td></tr>
      </tbody>
    </table>

    <h2>${escapeHtml(text.handlingHeading)}</h2>
    <p>${escapeHtml(text.handlingBody)}</p>

    <h2>${escapeHtml(text.storageHeading)}</h2>
    <p>${escapeHtml(text.storageBody(data.storage))}</p>

    <h2>${escapeHtml(text.resourcesHeading)}</h2>
    <ul>
      <li><a href="${areaPath}">${escapeHtml(text.links.related)}</a></li>
      <li><a href="${useCasePath}">${escapeHtml(text.links.related)}</a></li>
      <li><a href="${localizePath('/coa-policy/', locale)}">${escapeHtml(text.links.coaPolicy)}</a></li>
      <li><a href="${localizePath('/blog/peptide-storage-handling-best-practices/', locale)}">${escapeHtml(text.links.storageGuide)}</a></li>
    </ul>

    <h2>${escapeHtml(text.statementHeading)}</h2>
    <p>${escapeHtml(text.statementBody(name))}</p>
  `;
}

export function getLocalizedProduct(product: ProductEntry, locale: Locale): LocalizedProductData {
  const data = product.data;
  const cleanTitle = cleanProductTitle(data.title);

  if (locale === 'en') {
    return {
      title: data.title,
      cleanTitle,
      shortDescription: data.short_description,
      storage: data.storage,
      priceRange: data.price_range,
      meta: data.meta,
      faqs: data.faqs ?? [],
      bodyHtml: '',
    };
  }

  const translatedLocale = locale as Exclude<Locale, 'en'>;
  const text = copy[translatedLocale];
  const packageSize = data.package_sizes[0] ?? '';

  return {
    title: `${cleanTitle} - ${data.purity} HPLC, COA`,
    cleanTitle,
    shortDescription: text.shortDescription(cleanTitle, data.purity),
    storage: text.storage(data.storage),
    priceRange: data.price_range,
    meta: {
      title: text.metaTitle(cleanTitle, data.purity),
      description: text.metaDescription(cleanTitle, packageSize, data.purity),
    },
    faqs: localizedFaqs(data, cleanTitle, translatedLocale),
    bodyHtml: buildBodyHtml(product, translatedLocale, cleanTitle),
  };
}
