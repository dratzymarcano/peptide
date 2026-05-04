import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dictDir = join(root, 'src/i18n/dictionaries');

const additions = {
  en: {
    catalogIndex: {
      schemaName: 'Research peptide catalogue',
      schemaDescription: 'Browse research-grade peptides by research area, including neuroscience, cardiovascular, diabetes and metabolism, hormones, immunology and more.',
      metaTitle: 'Research Peptide Catalogue | Browse by Research Area',
      metaDescription: 'Browse research-grade peptides by research area: neuroscience, cardiovascular, diabetes and metabolism, hormones, immunology, longevity and more. >=98% HPLC. RUO.',
      title: 'Browse research peptides by research area',
      lead: '{productCount} research-grade peptides organised across {areaCount} research areas. All compounds are sold for in-vitro and laboratory research only (RUO) and ship with an HPLC certificate of analysis.',
      browse: 'Browse ->',
      browseCatalogue: 'Browse catalogue',
      useCasesTitle: 'Browse by research use case',
      useCasesLead: 'Quick-access groupings for the most-requested research applications.',
    },
    catalogArea: {
      schemaName: '{area} research peptides',
      metaTitle: '{area} Research Peptides | Peptide Shop',
      metaDescription: '{description} >=98% HPLC purity, COA on every batch. Sold for in-vitro research only (RUO).',
      title: '{area} research peptides',
      noProducts: 'No products are currently mapped to this research area.',
      requestQuote: 'Request a custom quote',
      relatedSearches: 'Related searches',
      topicAria: 'Topic: {topic}',
    },
    useCasePage: {
      metaTitle: '{useCase} | Research Peptides | Peptide Shop',
      metaDescription: '{description} >=98% HPLC, batch COA. Research use only.',
      ruoDetail: 'These compounds are not approved for human or veterinary therapeutic use.',
      noProducts: 'No products currently grouped under this use case.',
    },
    searchPage: {
      metaTitle: 'Search | Peptide Shop',
      resultsMetaTitle: 'Search results for {query} | Peptide Shop',
      metaDescription: 'Search the Peptide Shop catalogue and research notes.',
      title: 'Search the catalogue',
      lead: 'Find peptides, COA guidance, storage notes and research-area content.',
      queryLabel: 'Search query',
      placeholder: 'Search by peptide, CAS, use case or research area',
      tooShort: 'Enter at least two characters to search.',
      noResults: 'No results found.',
      resultOne: '1 result for "{query}".',
      resultMany: '{count} results for "{query}".',
      products: 'Products',
      researchNotes: 'Research notes',
    },
    notFound: {
      metaTitle: 'Page not found | Peptide Shop',
      metaDescription: 'The requested page could not be found. Search the Peptide Shop catalogue or browse research peptide hubs.',
      eyebrow: 'Error 404',
      title: 'Page not found.',
      lead: 'The page may have moved as part of the catalogue rebuild. Search the catalogue or browse a research-area hub.',
      searchPlaceholder: 'Search BPC-157, GLP-1, CAS number...',
      topAreas: 'Top research areas',
    },
    taxonomy: {
      researchAreas: {
        neuroscience: {
          name: 'Neuroscience & CNS',
          short: 'CNS, neuroprotection, cognition',
          description: 'Reference peptides used in cognition, neuroprotection and CNS receptor studies, including nootropic candidates and sleep-related neuropeptides.',
          keywords: ['nootropic peptides', 'CNS research peptides', 'neuroprotective peptides'],
        },
        cardiovascular: {
          name: 'Cardiovascular & Vascular',
          short: 'Endothelial, vascular tone, repair',
          description: 'Peptides referenced in cardiovascular, endothelial-repair and vascular-tone research models.',
          keywords: ['cardiovascular research peptides', 'vascular repair peptides'],
        },
        diabetes: {
          name: 'Diabetes & Metabolism',
          short: 'Glucose, insulin, GLP-1 / GIP / GCG',
          description: 'GLP-1, GIP and dual/triple agonist reference compounds, plus insulin-sensitisation and adipocyte-metabolism candidates used in metabolic-disease research.',
          keywords: ['GLP-1 research peptides', 'metabolic research peptides', 'incretin research'],
        },
        'cancer-apoptosis': {
          name: 'Cancer & Apoptosis',
          short: 'Apoptosis, anti-proliferative pathways',
          description: 'Peptide reagents used in tumour-suppressor, apoptosis-induction and anti-proliferative cell-line work.',
          keywords: ['cancer research peptides', 'apoptosis assay peptides'],
        },
        'adhesion-ecm': {
          name: 'Adhesion & ECM',
          short: 'Cell adhesion, ECM and wound models',
          description: 'Peptides involved in cell-adhesion, extracellular-matrix and wound-repair research.',
          keywords: ['cell adhesion peptides', 'ECM research peptides', 'wound healing peptide research'],
        },
        'cell-tissue': {
          name: 'Cell & Tissue Repair',
          short: 'Regeneration, gastric, tendon repair',
          description: 'Reference peptides used in tendon, gastric and connective-tissue repair models.',
          keywords: ['tissue repair peptides', 'BPC-157 research', 'TB-500 research'],
        },
        immunology: {
          name: 'Immunology',
          short: 'Innate/adaptive immunity, cytokines',
          description: 'Immune-modulating reference peptides used in cytokine and innate/adaptive-immunity research.',
          keywords: ['immunomodulatory peptides', 'immunology research peptides'],
        },
        epigenetics: {
          name: 'Epigenetics & Longevity',
          short: 'Telomere, sirtuin and chronobiology',
          description: 'Reference compounds used in epigenetic-ageing, telomere and circadian-rhythm research.',
          keywords: ['epitalon research', 'longevity peptides', 'epigenetic research peptides'],
        },
        hormones: {
          name: 'Hormones & Growth Factors',
          short: 'GH, GHRH, ghrelin, melanocortin',
          description: 'Growth-hormone, GHRH-analog, ghrelin-mimetic and melanocortin reference peptides for endocrinology research.',
          keywords: ['GHRP research peptides', 'GHRH research peptides', 'melanocortin research'],
        },
        'cell-signaling': {
          name: 'Cell Signaling',
          short: 'GPCR, kinase and second-messenger probes',
          description: 'Peptide ligands and probes used to study receptor activation and downstream signalling pathways.',
          keywords: ['GPCR ligand peptides', 'signaling research peptides'],
        },
        'protein-analysis': {
          name: 'Protein Analysis & Standards',
          short: 'MS standards, controls, fragments',
          description: 'Reference fragments and standards for mass-spectrometry, ELISA-control and protein-quantitation workflows.',
          keywords: ['mass spec peptide standards', 'reference peptides'],
        },
        'cell-permeable': {
          name: 'Cell-Permeable & Cofactors',
          short: 'NAD+ precursors, cofactor analogs',
          description: 'Cell-permeable cofactors and NAD+-pathway research compounds used in mitochondrial and metabolic studies.',
          keywords: ['NAD+ research', 'cofactor research compounds'],
        },
      },
      useCases: {
        'weight-loss': {
          name: 'Weight-loss research',
          description: 'GLP-1, GIP, glucagon and amylin agonist reference peptides used in weight-loss and metabolic-disease research.',
        },
        'muscle-recovery': {
          name: 'Muscle & tissue recovery research',
          description: 'Reference peptides used in tendon, ligament and muscle-recovery research models.',
        },
        cognitive: {
          name: 'Cognitive research',
          description: 'Nootropic and CNS-active reference peptides used in cognition, neuroprotection and stress-response research.',
        },
        'anti-aging': {
          name: 'Longevity & anti-ageing research',
          description: 'Telomere-related, growth-factor and NAD+-pathway reference compounds used in longevity research.',
        },
        tanning: {
          name: 'Pigmentation research',
          description: 'Melanocortin-receptor reference peptides used in pigmentation and photoprotection research.',
        },
      },
    },
  },
  de: {
    catalogIndex: {
      schemaName: 'Forschungspetid-Katalog',
      schemaDescription: 'Durchsuchen Sie Forschungspeptide nach Forschungsgebiet, darunter Neurowissenschaften, Herz-Kreislauf, Diabetes und Stoffwechsel, Hormone, Immunologie und mehr.',
      metaTitle: 'Forschungspetid-Katalog | Nach Forschungsgebiet durchsuchen',
      metaDescription: 'Forschungspeptide nach Forschungsgebiet durchsuchen: Neurowissenschaften, Herz-Kreislauf, Diabetes und Stoffwechsel, Hormone, Immunologie, Langlebigkeit und mehr. >=98% HPLC. RUO.',
      title: 'Forschungspeptide nach Forschungsgebiet durchsuchen',
      lead: '{productCount} Forschungspeptide in {areaCount} Forschungsgebieten. Alle Verbindungen werden nur fuer In-vitro- und Laborforschung (RUO) verkauft und mit einem HPLC-Analysenzertifikat geliefert.',
      browse: 'Durchsuchen ->',
      browseCatalogue: 'Katalog durchsuchen',
      useCasesTitle: 'Nach Forschungsanwendung durchsuchen',
      useCasesLead: 'Schnellzugriff auf Gruppierungen fuer besonders haeufig angefragte Forschungsanwendungen.',
    },
    catalogArea: {
      schemaName: '{area} Forschungspeptide',
      metaTitle: '{area} Forschungspeptide | Peptide Shop',
      metaDescription: '{description} >=98% HPLC-Reinheit, COA fuer jede Charge. Nur fuer In-vitro-Forschung (RUO).',
      title: '{area} Forschungspeptide',
      noProducts: 'Diesem Forschungsgebiet sind derzeit keine Produkte zugeordnet.',
      requestQuote: 'Individuelles Angebot anfragen',
      relatedSearches: 'Verwandte Suchanfragen',
      topicAria: 'Thema: {topic}',
    },
    useCasePage: {
      metaTitle: '{useCase} | Forschungspeptide | Peptide Shop',
      metaDescription: '{description} >=98% HPLC, Chargen-COA. Nur fuer Forschungszwecke.',
      ruoDetail: 'Diese Verbindungen sind nicht fuer die therapeutische Anwendung bei Menschen oder Tieren zugelassen.',
      noProducts: 'Derzeit sind dieser Anwendung keine Produkte zugeordnet.',
    },
    searchPage: {
      metaTitle: 'Suche | Peptide Shop',
      resultsMetaTitle: 'Suchergebnisse fuer {query} | Peptide Shop',
      metaDescription: 'Durchsuchen Sie den Peptide-Shop-Katalog und Forschungsnotizen.',
      title: 'Katalog durchsuchen',
      lead: 'Finden Sie Peptide, COA-Hinweise, Lagerungsnotizen und Inhalte zu Forschungsgebieten.',
      queryLabel: 'Suchanfrage',
      placeholder: 'Nach Peptid, CAS, Anwendung oder Forschungsgebiet suchen',
      tooShort: 'Geben Sie mindestens zwei Zeichen ein.',
      noResults: 'Keine Ergebnisse gefunden.',
      resultOne: '1 Ergebnis fuer "{query}".',
      resultMany: '{count} Ergebnisse fuer "{query}".',
      products: 'Produkte',
      researchNotes: 'Forschungsnotizen',
    },
    notFound: {
      metaTitle: 'Seite nicht gefunden | Peptide Shop',
      metaDescription: 'Die angeforderte Seite wurde nicht gefunden. Durchsuchen Sie den Peptide-Shop-Katalog oder die Forschungs-Hubs.',
      eyebrow: 'Fehler 404',
      title: 'Seite nicht gefunden.',
      lead: 'Die Seite wurde moeglicherweise im Zuge des Katalogumbaus verschoben. Suchen Sie im Katalog oder oeffnen Sie einen Forschungs-Hub.',
      searchPlaceholder: 'BPC-157, GLP-1, CAS-Nummer suchen...',
      topAreas: 'Wichtige Forschungsgebiete',
    },
    taxonomy: {
      researchAreas: {
        neuroscience: { name: 'Neurowissenschaften & ZNS', short: 'ZNS, Neuroprotektion, Kognition', description: 'Referenzpeptide fuer Kognitions-, Neuroprotektions- und ZNS-Rezeptorstudien, einschliesslich nootroper Kandidaten und schlafbezogener Neuropeptide.', keywords: ['nootrope Peptide', 'ZNS-Forschungspeptide', 'neuroprotektive Peptide'] },
        cardiovascular: { name: 'Herz-Kreislauf & Gefaesse', short: 'Endothel, Gefaesstonus, Reparatur', description: 'Peptide, die in kardiovaskulaeren, endothelialen Reparatur- und Gefaesstonus-Forschungsmodellen referenziert werden.', keywords: ['kardiovaskulaere Forschungspeptide', 'Gefaessreparatur-Peptide'] },
        diabetes: { name: 'Diabetes & Stoffwechsel', short: 'Glukose, Insulin, GLP-1 / GIP / GCG', description: 'GLP-1-, GIP- und duale/triple Agonisten-Referenzverbindungen sowie Kandidaten fuer Insulinsensibilisierung und Adipozytenstoffwechsel in der Stoffwechselforschung.', keywords: ['GLP-1-Forschungspeptide', 'metabolische Forschungspeptide', 'Inkretin-Forschung'] },
        'cancer-apoptosis': { name: 'Krebs & Apoptose', short: 'Apoptose, antiproliferative Wege', description: 'Peptidreagenzien fuer Tumorsuppressor-, Apoptoseinduktions- und antiproliferative Zelllinienarbeit.', keywords: ['Krebsforschungspeptide', 'Peptide fuer Apoptose-Assays'] },
        'adhesion-ecm': { name: 'Adhaesion & ECM', short: 'Zelladhaesion, ECM und Wundmodelle', description: 'Peptide fuer Zelladhaesion, extrazellulaere Matrix und Wundreparaturforschung.', keywords: ['Zelladhaesionspeptide', 'ECM-Forschungspeptide', 'Wundheilungs-Peptidforschung'] },
        'cell-tissue': { name: 'Zell- & Gewebereparatur', short: 'Regeneration, Magen, Sehnenreparatur', description: 'Referenzpeptide fuer Sehnen-, Magen- und Bindegewebsreparaturmodelle.', keywords: ['Gewebereparatur-Peptide', 'BPC-157-Forschung', 'TB-500-Forschung'] },
        immunology: { name: 'Immunologie', short: 'Angeborene/adaptive Immunitaet, Zytokine', description: 'Immunmodulierende Referenzpeptide fuer Zytokin- und angeborene/adaptive Immunitaetsforschung.', keywords: ['immunmodulierende Peptide', 'Immunologie-Forschungspeptide'] },
        epigenetics: { name: 'Epigenetik & Langlebigkeit', short: 'Telomere, Sirtuin und Chronobiologie', description: 'Referenzverbindungen fuer epigenetisches Altern, Telomer- und circadiane Rhythmusforschung.', keywords: ['Epitalon-Forschung', 'Langlebigkeitspeptide', 'epigenetische Forschungspeptide'] },
        hormones: { name: 'Hormone & Wachstumsfaktoren', short: 'GH, GHRH, Ghrelin, Melanocortin', description: 'Wachstumshormon-, GHRH-Analog-, Ghrelin-Mimetikum- und Melanocortin-Referenzpeptide fuer die Endokrinologieforschung.', keywords: ['GHRP-Forschungspeptide', 'GHRH-Forschungspeptide', 'Melanocortin-Forschung'] },
        'cell-signaling': { name: 'Zellsignalisierung', short: 'GPCR-, Kinase- und Second-Messenger-Sonden', description: 'Peptidliganden und Sonden zur Untersuchung von Rezeptoraktivierung und nachgeschalteten Signalwegen.', keywords: ['GPCR-Ligandenpeptide', 'Signalisierungs-Forschungspeptide'] },
        'protein-analysis': { name: 'Proteinanalyse & Standards', short: 'MS-Standards, Kontrollen, Fragmente', description: 'Referenzfragmente und Standards fuer Massenspektrometrie-, ELISA-Kontroll- und Proteinquantifizierungs-Workflows.', keywords: ['Massenspektrometrie-Peptidstandards', 'Referenzpeptide'] },
        'cell-permeable': { name: 'Zellpermeable Stoffe & Cofaktoren', short: 'NAD+-Vorstufen, Cofaktor-Analoga', description: 'Zellpermeable Cofaktoren und NAD+-Signalweg-Verbindungen fuer mitochondriale und metabolische Studien.', keywords: ['NAD+-Forschung', 'Cofaktor-Forschungsverbindungen'] },
      },
      useCases: {
        'weight-loss': { name: 'Gewichtsverlust-Forschung', description: 'GLP-1-, GIP-, Glucagon- und Amylin-Agonisten-Referenzpeptide fuer Gewichtsverlust- und Stoffwechselforschung.' },
        'muscle-recovery': { name: 'Muskel- & Geweberegeneration', description: 'Referenzpeptide fuer Sehnen-, Band- und Muskelregenerationsmodelle.' },
        cognitive: { name: 'Kognitionsforschung', description: 'Nootrope und ZNS-aktive Referenzpeptide fuer Kognition, Neuroprotektion und Stressreaktionsforschung.' },
        'anti-aging': { name: 'Langlebigkeits- & Anti-Aging-Forschung', description: 'Telomerbezogene, Wachstumsfaktor- und NAD+-Signalweg-Referenzverbindungen fuer Langlebigkeitsforschung.' },
        tanning: { name: 'Pigmentierungsforschung', description: 'Melanocortin-Rezeptor-Referenzpeptide fuer Pigmentierungs- und Photoprotektionsforschung.' },
      },
    },
  },
  nl: {},
  fr: {},
  it: {},
  es: {},
};

additions.nl = {
  catalogIndex: {
    schemaName: 'Catalogus met onderzoekspeptiden',
    schemaDescription: 'Blader door onderzoekspeptiden per onderzoeksgebied, waaronder neurowetenschap, cardiovasculair onderzoek, diabetes en metabolisme, hormonen, immunologie en meer.',
    metaTitle: 'Catalogus met onderzoekspeptiden | Bladeren per onderzoeksgebied',
    metaDescription: 'Blader door onderzoekspeptiden per onderzoeksgebied: neurowetenschap, cardiovasculair, diabetes en metabolisme, hormonen, immunologie, levensduur en meer. >=98% HPLC. RUO.',
    title: 'Blader door onderzoekspeptiden per onderzoeksgebied',
    lead: '{productCount} onderzoekspeptiden georganiseerd over {areaCount} onderzoeksgebieden. Alle verbindingen worden uitsluitend verkocht voor in-vitro- en laboratoriumonderzoek (RUO) en worden geleverd met een HPLC-analysecertificaat.',
    browse: 'Bladeren ->',
    browseCatalogue: 'Catalogus bekijken',
    useCasesTitle: 'Bladeren per onderzoeksgebruik',
    useCasesLead: 'Snelle toegang tot groepen voor de meest gevraagde onderzoeksapplicaties.',
  },
  catalogArea: {
    schemaName: '{area} onderzoekspeptiden',
    metaTitle: '{area} onderzoekspeptiden | Peptide Shop',
    metaDescription: '{description} >=98% HPLC-zuiverheid, COA bij elke batch. Alleen voor in-vitro-onderzoek (RUO).',
    title: '{area} onderzoekspeptiden',
    noProducts: 'Er zijn momenteel geen producten aan dit onderzoeksgebied gekoppeld.',
    requestQuote: 'Vraag een offerte op maat aan',
    relatedSearches: 'Gerelateerde zoekopdrachten',
    topicAria: 'Onderwerp: {topic}',
  },
  useCasePage: {
    metaTitle: '{useCase} | Onderzoekspeptiden | Peptide Shop',
    metaDescription: '{description} >=98% HPLC, batch-COA. Alleen voor onderzoek.',
    ruoDetail: 'Deze verbindingen zijn niet goedgekeurd voor therapeutisch gebruik bij mens of dier.',
    noProducts: 'Er zijn momenteel geen producten onder dit gebruik gegroepeerd.',
  },
  searchPage: {
    metaTitle: 'Zoeken | Peptide Shop',
    resultsMetaTitle: 'Zoekresultaten voor {query} | Peptide Shop',
    metaDescription: 'Doorzoek de Peptide Shop-catalogus en onderzoeksnotities.',
    title: 'Catalogus doorzoeken',
    lead: 'Vind peptiden, COA-richtlijnen, opslagnotities en content per onderzoeksgebied.',
    queryLabel: 'Zoekopdracht',
    placeholder: 'Zoek op peptide, CAS, gebruik of onderzoeksgebied',
    tooShort: 'Voer minimaal twee tekens in om te zoeken.',
    noResults: 'Geen resultaten gevonden.',
    resultOne: '1 resultaat voor "{query}".',
    resultMany: '{count} resultaten voor "{query}".',
    products: 'Producten',
    researchNotes: 'Onderzoeksnotities',
  },
  notFound: {
    metaTitle: 'Pagina niet gevonden | Peptide Shop',
    metaDescription: 'De gevraagde pagina kon niet worden gevonden. Doorzoek de Peptide Shop-catalogus of blader door onderzoekshubs.',
    eyebrow: 'Fout 404',
    title: 'Pagina niet gevonden.',
    lead: 'De pagina is mogelijk verplaatst tijdens de herbouw van de catalogus. Zoek in de catalogus of blader door een onderzoeksgebied.',
    searchPlaceholder: 'Zoek BPC-157, GLP-1, CAS-nummer...',
    topAreas: 'Belangrijke onderzoeksgebieden',
  },
  taxonomy: {
    researchAreas: {
      neuroscience: { name: 'Neurowetenschap & CZS', short: 'CZS, neuroprotectie, cognitie', description: 'Referentiepeptiden voor cognitie-, neuroprotectie- en CZS-receptorstudies, inclusief nootropische kandidaten en slaapgerelateerde neuropeptiden.', keywords: ['nootropische peptiden', 'CZS-onderzoekspeptiden', 'neuroprotectieve peptiden'] },
      cardiovascular: { name: 'Cardiovasculair & vasculair', short: 'Endotheel, vaattonus, herstel', description: 'Peptiden die worden gebruikt in cardiovasculaire, endotheelherstel- en vaattonusmodellen.', keywords: ['cardiovasculaire onderzoekspeptiden', 'peptiden voor vaatherstel'] },
      diabetes: { name: 'Diabetes & metabolisme', short: 'Glucose, insuline, GLP-1 / GIP / GCG', description: 'GLP-1-, GIP- en duale/triple agonistische referentieverbindingen, plus kandidaten voor insulinesensitisatie en adipocytenmetabolisme in metabool onderzoek.', keywords: ['GLP-1-onderzoekspeptiden', 'metabole onderzoekspeptiden', 'incretine-onderzoek'] },
      'cancer-apoptosis': { name: 'Kanker & apoptose', short: 'Apoptose, antiproliferatieve routes', description: 'Peptidereagentia voor tumorsuppressor-, apoptose-inductie- en antiproliferatief celijnonderzoek.', keywords: ['kankeronderzoekspeptiden', 'peptiden voor apoptose-assays'] },
      'adhesion-ecm': { name: 'Adhesie & ECM', short: 'Celadhesie, ECM en wondmodellen', description: 'Peptiden betrokken bij celadhesie, extracellulaire matrix en wondherstelonderzoek.', keywords: ['celadhesiepeptiden', 'ECM-onderzoekspeptiden', 'peptideonderzoek naar wondgenezing'] },
      'cell-tissue': { name: 'Cel- & weefselherstel', short: 'Regeneratie, maag, peesherstel', description: 'Referentiepeptiden voor modellen van pees-, maag- en bindweefselherstel.', keywords: ['weefselherstelpeptiden', 'BPC-157-onderzoek', 'TB-500-onderzoek'] },
      immunology: { name: 'Immunologie', short: 'Aangeboren/adaptieve immuniteit, cytokinen', description: 'Immuunmodulerende referentiepeptiden voor cytokine- en aangeboren/adaptief immuniteitsonderzoek.', keywords: ['immunomodulerende peptiden', 'immunologische onderzoekspeptiden'] },
      epigenetics: { name: 'Epigenetica & levensduur', short: 'Telomeer, sirtuine en chronobiologie', description: 'Referentieverbindingen voor epigenetische veroudering, telomeer- en circadiaan ritme-onderzoek.', keywords: ['epitalon-onderzoek', 'levensduurpeptiden', 'epigenetische onderzoekspeptiden'] },
      hormones: { name: 'Hormonen & groeifactoren', short: 'GH, GHRH, ghreline, melanocortine', description: 'Groeihormoon-, GHRH-analoog-, ghreline-mimetische en melanocortine-referentiepeptiden voor endocrinologisch onderzoek.', keywords: ['GHRP-onderzoekspeptiden', 'GHRH-onderzoekspeptiden', 'melanocortine-onderzoek'] },
      'cell-signaling': { name: 'Celsignalering', short: 'GPCR-, kinase- en second-messenger-sondes', description: 'Peptideliganden en sondes voor onderzoek naar receptoractivatie en downstream signaalroutes.', keywords: ['GPCR-ligandpeptiden', 'signaleringsonderzoekspeptiden'] },
      'protein-analysis': { name: 'Proteineanalyse & standaarden', short: 'MS-standaarden, controles, fragmenten', description: 'Referentiefragmenten en standaarden voor massaspectrometrie, ELISA-controles en proteinekwantificatie.', keywords: ['massaspectrometrie-peptidestandaarden', 'referentiepeptiden'] },
      'cell-permeable': { name: 'Celpermeabel & cofactoren', short: 'NAD+-precursors, cofactoranalogen', description: 'Celpermeabele cofactoren en NAD+-routeverbindingen voor mitochondriale en metabole studies.', keywords: ['NAD+-onderzoek', 'cofactor-onderzoeksverbindingen'] },
    },
    useCases: {
      'weight-loss': { name: 'Gewichtsverliesonderzoek', description: 'GLP-1-, GIP-, glucagon- en amyline-agonistische referentiepeptiden voor gewichtsverlies- en metabool onderzoek.' },
      'muscle-recovery': { name: 'Spier- & weefselherstelonderzoek', description: 'Referentiepeptiden voor pees-, ligament- en spierherstelmodellen.' },
      cognitive: { name: 'Cognitief onderzoek', description: 'Nootropische en CZS-actieve referentiepeptiden voor cognitie, neuroprotectie en stressrespons.' },
      'anti-aging': { name: 'Levensduur- & anti-agingonderzoek', description: 'Telomeergerelateerde, groeifactor- en NAD+-routeverbindingen voor levensduuronderzoek.' },
      tanning: { name: 'Pigmentatieonderzoek', description: 'Melanocortinereceptor-referentiepeptiden voor pigmentatie- en fotoprotectieonderzoek.' },
    },
  },
};

const translatedCommon = {
  fr: {
    catalogIndex: {
      schemaName: 'Catalogue de peptides de recherche', schemaDescription: 'Parcourez les peptides de qualite recherche par domaine, notamment neurosciences, cardiovasculaire, diabete et metabolisme, hormones, immunologie et plus encore.', metaTitle: 'Catalogue de peptides de recherche | Parcourir par domaine', metaDescription: 'Parcourez les peptides de recherche par domaine : neurosciences, cardiovasculaire, diabete et metabolisme, hormones, immunologie, longevite et plus encore. >=98% HPLC. RUO.', title: 'Parcourir les peptides de recherche par domaine', lead: '{productCount} peptides de qualite recherche organises dans {areaCount} domaines. Tous les composes sont vendus uniquement pour la recherche in-vitro et en laboratoire (RUO) et livres avec un certificat d analyse HPLC.', browse: 'Parcourir ->', browseCatalogue: 'Parcourir le catalogue', useCasesTitle: 'Parcourir par usage de recherche', useCasesLead: 'Groupements d acces rapide pour les applications de recherche les plus demandees.' },
    catalogArea: { schemaName: 'Peptides de recherche {area}', metaTitle: 'Peptides de recherche {area} | Peptide Shop', metaDescription: '{description} Purete HPLC >=98%, COA pour chaque lot. Vendu uniquement pour la recherche in-vitro (RUO).', title: 'Peptides de recherche {area}', noProducts: 'Aucun produit n est actuellement associe a ce domaine de recherche.', requestQuote: 'Demander un devis sur mesure', relatedSearches: 'Recherches associees', topicAria: 'Sujet : {topic}' },
    useCasePage: { metaTitle: '{useCase} | Peptides de recherche | Peptide Shop', metaDescription: '{description} HPLC >=98%, COA de lot. Usage de recherche uniquement.', ruoDetail: 'Ces composes ne sont pas approuves pour un usage therapeutique humain ou veterinaire.', noProducts: 'Aucun produit n est actuellement groupe sous cet usage.' },
    searchPage: { metaTitle: 'Recherche | Peptide Shop', resultsMetaTitle: 'Resultats de recherche pour {query} | Peptide Shop', metaDescription: 'Recherchez dans le catalogue Peptide Shop et les notes de recherche.', title: 'Rechercher dans le catalogue', lead: 'Trouvez des peptides, des indications COA, des notes de stockage et du contenu par domaine de recherche.', queryLabel: 'Requete de recherche', placeholder: 'Rechercher par peptide, CAS, usage ou domaine', tooShort: 'Saisissez au moins deux caracteres pour rechercher.', noResults: 'Aucun resultat trouve.', resultOne: '1 resultat pour "{query}".', resultMany: '{count} resultats pour "{query}".', products: 'Produits', researchNotes: 'Notes de recherche' },
    notFound: { metaTitle: 'Page introuvable | Peptide Shop', metaDescription: 'La page demandee est introuvable. Recherchez dans le catalogue Peptide Shop ou parcourez les hubs de recherche.', eyebrow: 'Erreur 404', title: 'Page introuvable.', lead: 'La page a peut-etre ete deplacee pendant la refonte du catalogue. Recherchez dans le catalogue ou parcourez un hub de recherche.', searchPlaceholder: 'Rechercher BPC-157, GLP-1, numero CAS...', topAreas: 'Principaux domaines de recherche' },
  },
  it: {
    catalogIndex: { schemaName: 'Catalogo di peptidi per ricerca', schemaDescription: 'Sfoglia peptidi di grado ricerca per area, incluse neuroscienze, cardiovascolare, diabete e metabolismo, ormoni, immunologia e altro.', metaTitle: 'Catalogo di peptidi per ricerca | Sfoglia per area', metaDescription: 'Sfoglia peptidi per ricerca per area: neuroscienze, cardiovascolare, diabete e metabolismo, ormoni, immunologia, longevita e altro. >=98% HPLC. RUO.', title: 'Sfoglia peptidi per ricerca per area', lead: '{productCount} peptidi di grado ricerca organizzati in {areaCount} aree. Tutti i composti sono venduti solo per ricerca in-vitro e di laboratorio (RUO) e spediti con certificato di analisi HPLC.', browse: 'Sfoglia ->', browseCatalogue: 'Sfoglia catalogo', useCasesTitle: 'Sfoglia per uso di ricerca', useCasesLead: 'Raggruppamenti rapidi per le applicazioni di ricerca piu richieste.' },
    catalogArea: { schemaName: 'Peptidi per ricerca {area}', metaTitle: 'Peptidi per ricerca {area} | Peptide Shop', metaDescription: '{description} Purezza HPLC >=98%, COA per ogni lotto. Venduto solo per ricerca in-vitro (RUO).', title: 'Peptidi per ricerca {area}', noProducts: 'Nessun prodotto e attualmente associato a questa area di ricerca.', requestQuote: 'Richiedi un preventivo personalizzato', relatedSearches: 'Ricerche correlate', topicAria: 'Argomento: {topic}' },
    useCasePage: { metaTitle: '{useCase} | Peptidi per ricerca | Peptide Shop', metaDescription: '{description} HPLC >=98%, COA di lotto. Solo per uso di ricerca.', ruoDetail: 'Questi composti non sono approvati per uso terapeutico umano o veterinario.', noProducts: 'Nessun prodotto e attualmente raggruppato sotto questo uso.' },
    searchPage: { metaTitle: 'Cerca | Peptide Shop', resultsMetaTitle: 'Risultati per {query} | Peptide Shop', metaDescription: 'Cerca nel catalogo Peptide Shop e nelle note di ricerca.', title: 'Cerca nel catalogo', lead: 'Trova peptidi, indicazioni COA, note di conservazione e contenuti per area di ricerca.', queryLabel: 'Query di ricerca', placeholder: 'Cerca per peptide, CAS, uso o area di ricerca', tooShort: 'Inserisci almeno due caratteri per cercare.', noResults: 'Nessun risultato trovato.', resultOne: '1 risultato per "{query}".', resultMany: '{count} risultati per "{query}".', products: 'Prodotti', researchNotes: 'Note di ricerca' },
    notFound: { metaTitle: 'Pagina non trovata | Peptide Shop', metaDescription: 'La pagina richiesta non e stata trovata. Cerca nel catalogo Peptide Shop o sfoglia gli hub di ricerca.', eyebrow: 'Errore 404', title: 'Pagina non trovata.', lead: 'La pagina potrebbe essere stata spostata durante la ricostruzione del catalogo. Cerca nel catalogo o sfoglia un hub di ricerca.', searchPlaceholder: 'Cerca BPC-157, GLP-1, numero CAS...', topAreas: 'Principali aree di ricerca' },
  },
  es: {
    catalogIndex: { schemaName: 'Catalogo de peptidos de investigacion', schemaDescription: 'Explore peptidos de grado investigacion por area, incluidas neurociencia, cardiovascular, diabetes y metabolismo, hormonas, inmunologia y mas.', metaTitle: 'Catalogo de peptidos de investigacion | Explorar por area', metaDescription: 'Explore peptidos de investigacion por area: neurociencia, cardiovascular, diabetes y metabolismo, hormonas, inmunologia, longevidad y mas. >=98% HPLC. RUO.', title: 'Explore peptidos de investigacion por area', lead: '{productCount} peptidos de grado investigacion organizados en {areaCount} areas. Todos los compuestos se venden solo para investigacion in-vitro y de laboratorio (RUO) y se envian con certificado de analisis HPLC.', browse: 'Explorar ->', browseCatalogue: 'Explorar catalogo', useCasesTitle: 'Explorar por uso de investigacion', useCasesLead: 'Agrupaciones de acceso rapido para las aplicaciones de investigacion mas solicitadas.' },
    catalogArea: { schemaName: 'Peptidos de investigacion {area}', metaTitle: 'Peptidos de investigacion {area} | Peptide Shop', metaDescription: '{description} Pureza HPLC >=98%, COA en cada lote. Vendido solo para investigacion in-vitro (RUO).', title: 'Peptidos de investigacion {area}', noProducts: 'Actualmente no hay productos asignados a esta area de investigacion.', requestQuote: 'Solicitar presupuesto personalizado', relatedSearches: 'Busquedas relacionadas', topicAria: 'Tema: {topic}' },
    useCasePage: { metaTitle: '{useCase} | Peptidos de investigacion | Peptide Shop', metaDescription: '{description} HPLC >=98%, COA de lote. Solo para uso de investigacion.', ruoDetail: 'Estos compuestos no estan aprobados para uso terapeutico humano o veterinario.', noProducts: 'Actualmente no hay productos agrupados bajo este uso.' },
    searchPage: { metaTitle: 'Buscar | Peptide Shop', resultsMetaTitle: 'Resultados para {query} | Peptide Shop', metaDescription: 'Busque en el catalogo de Peptide Shop y en las notas de investigacion.', title: 'Buscar en el catalogo', lead: 'Encuentre peptidos, orientacion sobre COA, notas de almacenamiento y contenido por area de investigacion.', queryLabel: 'Consulta de busqueda', placeholder: 'Buscar por peptido, CAS, uso o area de investigacion', tooShort: 'Introduzca al menos dos caracteres para buscar.', noResults: 'No se encontraron resultados.', resultOne: '1 resultado para "{query}".', resultMany: '{count} resultados para "{query}".', products: 'Productos', researchNotes: 'Notas de investigacion' },
    notFound: { metaTitle: 'Pagina no encontrada | Peptide Shop', metaDescription: 'No se pudo encontrar la pagina solicitada. Busque en el catalogo de Peptide Shop o explore los hubs de investigacion.', eyebrow: 'Error 404', title: 'Pagina no encontrada.', lead: 'La pagina puede haberse movido durante la reconstruccion del catalogo. Busque en el catalogo o explore un hub de investigacion.', searchPlaceholder: 'Buscar BPC-157, GLP-1, numero CAS...', topAreas: 'Principales areas de investigacion' },
  },
};

for (const locale of ['fr', 'it', 'es']) {
  additions[locale] = {
    ...translatedCommon[locale],
    taxonomy: additions.en.taxonomy,
  };
}

for (const entries of Object.values(additions)) {
  for (const area of Object.values(entries.taxonomy.researchAreas)) {
    if (Array.isArray(area.keywords)) {
      area.keywords = Object.fromEntries(area.keywords.map((keyword, index) => [String(index), keyword]));
    }
  }
}

function mergeDeep(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = mergeDeep(target[key] && typeof target[key] === 'object' && !Array.isArray(target[key]) ? target[key] : {}, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

for (const [locale, entries] of Object.entries(additions)) {
  const file = join(dictDir, `${locale}.json`);
  const current = JSON.parse(readFileSync(file, 'utf8'));
  mergeDeep(current, entries);
  writeFileSync(file, `${JSON.stringify(current, null, 2)}\n`);
  console.log(`merged ${locale}`);
}
