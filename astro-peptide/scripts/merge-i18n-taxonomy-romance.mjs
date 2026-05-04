import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dictDir = join(root, 'src/i18n/dictionaries');

const taxonomy = {
  fr: {
    researchAreas: {
      neuroscience: { name: 'Neurosciences & SNC', short: 'SNC, neuroprotection, cognition', description: 'Peptides de reference utilises dans les etudes de cognition, de neuroprotection et de recepteurs du SNC, y compris des candidats nootropes et des neuropeptides lies au sommeil.', keywords: ['peptides nootropes', 'peptides de recherche SNC', 'peptides neuroprotecteurs'] },
      cardiovascular: { name: 'Cardiovasculaire & vasculaire', short: 'Endothelium, tonus vasculaire, reparation', description: 'Peptides references dans les modeles de recherche cardiovasculaire, de reparation endotheli ale et de tonus vasculaire.', keywords: ['peptides de recherche cardiovasculaire', 'peptides de reparation vasculaire'] },
      diabetes: { name: 'Diabete & metabolisme', short: 'Glucose, insuline, GLP-1 / GIP / GCG', description: 'Composes de reference GLP-1, GIP et agonistes doubles/triples, ainsi que des candidats pour la sensibilisation a l insuline et le metabolisme adipocytaire en recherche metabolique.', keywords: ['peptides de recherche GLP-1', 'peptides de recherche metabolique', 'recherche sur les incretines'] },
      'cancer-apoptosis': { name: 'Cancer & apoptose', short: 'Apoptose, voies antiproliferatives', description: 'Reactifs peptidiques utilises dans les travaux sur suppresseurs de tumeurs, induction de l apoptose et lignes cellulaires antiproliferatives.', keywords: ['peptides de recherche sur le cancer', 'peptides pour essais d apoptose'] },
      'adhesion-ecm': { name: 'Adhesion & MEC', short: 'Adhesion cellulaire, MEC et modeles de plaie', description: 'Peptides impliques dans la recherche sur l adhesion cellulaire, la matrice extracellulaire et la reparation des plaies.', keywords: ['peptides d adhesion cellulaire', 'peptides de recherche MEC', 'recherche peptidique sur cicatrisation'] },
      'cell-tissue': { name: 'Reparation cellulaire & tissulaire', short: 'Regeneration, gastrique, reparation tendineuse', description: 'Peptides de reference utilises dans les modeles de reparation tendineuse, gastrique et du tissu conjonctif.', keywords: ['peptides de reparation tissulaire', 'recherche BPC-157', 'recherche TB-500'] },
      immunology: { name: 'Immunologie', short: 'Immunite innee/adaptative, cytokines', description: 'Peptides de reference immunomodulateurs utilises dans la recherche sur les cytokines et l immunite innee/adaptative.', keywords: ['peptides immunomodulateurs', 'peptides de recherche en immunologie'] },
      epigenetics: { name: 'Epigenetique & longevite', short: 'Telomeres, sirtuines et chronobiologie', description: 'Composes de reference utilises dans la recherche sur l age epigenetique, les telomeres et les rythmes circadiens.', keywords: ['recherche epitalon', 'peptides de longevite', 'peptides de recherche epigenetique'] },
      hormones: { name: 'Hormones & facteurs de croissance', short: 'GH, GHRH, ghreline, melanocortine', description: 'Peptides de reference pour hormone de croissance, analogues GHRH, mimetiques de la ghreline et melanocortines en recherche endocrinologique.', keywords: ['peptides de recherche GHRP', 'peptides de recherche GHRH', 'recherche melanocortine'] },
      'cell-signaling': { name: 'Signalisation cellulaire', short: 'GPCR, kinases et sondes second messager', description: 'Ligands peptidiques et sondes utilises pour etudier l activation des recepteurs et les voies de signalisation en aval.', keywords: ['peptides ligands GPCR', 'peptides de recherche en signalisation'] },
      'protein-analysis': { name: 'Analyse des proteines & standards', short: 'Standards MS, controles, fragments', description: 'Fragments et standards de reference pour la spectrometrie de masse, les controles ELISA et les workflows de quantification proteique.', keywords: ['standards peptidiques de spectrometrie de masse', 'peptides de reference'] },
      'cell-permeable': { name: 'Cell-permeables & cofacteurs', short: 'Precurseurs NAD+, analogues de cofacteurs', description: 'Cofacteurs cell-permeables et composes de la voie NAD+ utilises dans les etudes mitochondriales et metaboliques.', keywords: ['recherche NAD+', 'composes de recherche cofacteurs'] },
    },
    useCases: {
      'weight-loss': { name: 'Recherche sur la perte de poids', description: 'Peptides de reference agonistes GLP-1, GIP, glucagon et amyline utilises dans la recherche sur la perte de poids et les maladies metaboliques.' },
      'muscle-recovery': { name: 'Recherche sur recuperation musculaire et tissulaire', description: 'Peptides de reference utilises dans les modeles de recuperation des tendons, ligaments et muscles.' },
      cognitive: { name: 'Recherche cognitive', description: 'Peptides de reference nootropes et actifs sur le SNC utilises dans la cognition, la neuroprotection et la reponse au stress.' },
      'anti-aging': { name: 'Recherche longevite & anti-age', description: 'Composes de reference lies aux telomeres, aux facteurs de croissance et a la voie NAD+ utilises en recherche sur la longevite.' },
      tanning: { name: 'Recherche sur la pigmentation', description: 'Peptides de reference des recepteurs melanocortines utilises dans la recherche sur la pigmentation et la photoprotection.' },
    },
  },
  it: {
    researchAreas: {
      neuroscience: { name: 'Neuroscienze & SNC', short: 'SNC, neuroprotezione, cognizione', description: 'Peptidi di riferimento usati in studi su cognizione, neuroprotezione e recettori del SNC, inclusi candidati nootropi e neuropeptidi legati al sonno.', keywords: ['peptidi nootropi', 'peptidi di ricerca SNC', 'peptidi neuroprotettivi'] },
      cardiovascular: { name: 'Cardiovascolare & vascolare', short: 'Endotelio, tono vascolare, riparazione', description: 'Peptidi citati in modelli di ricerca cardiovascolare, riparazione endoteliale e tono vascolare.', keywords: ['peptidi di ricerca cardiovascolare', 'peptidi per riparazione vascolare'] },
      diabetes: { name: 'Diabete & metabolismo', short: 'Glucosio, insulina, GLP-1 / GIP / GCG', description: 'Composti di riferimento GLP-1, GIP e agonisti doppi/tripli, piu candidati per sensibilizzazione insulinica e metabolismo degli adipociti nella ricerca metabolica.', keywords: ['peptidi di ricerca GLP-1', 'peptidi di ricerca metabolica', 'ricerca sulle incretine'] },
      'cancer-apoptosis': { name: 'Cancro & apoptosi', short: 'Apoptosi, vie antiproliferative', description: 'Reagenti peptidici usati in lavori su soppressori tumorali, induzione dell apoptosi e linee cellulari antiproliferative.', keywords: ['peptidi per ricerca sul cancro', 'peptidi per saggi di apoptosi'] },
      'adhesion-ecm': { name: 'Adesione & ECM', short: 'Adesione cellulare, ECM e modelli di ferita', description: 'Peptidi coinvolti nella ricerca su adesione cellulare, matrice extracellulare e riparazione delle ferite.', keywords: ['peptidi di adesione cellulare', 'peptidi di ricerca ECM', 'ricerca peptidica sulla guarigione'] },
      'cell-tissue': { name: 'Riparazione cellulare & tissutale', short: 'Rigenerazione, gastrico, riparazione tendinea', description: 'Peptidi di riferimento usati in modelli di riparazione tendinea, gastrica e del tessuto connettivo.', keywords: ['peptidi per riparazione tissutale', 'ricerca BPC-157', 'ricerca TB-500'] },
      immunology: { name: 'Immunologia', short: 'Immunita innata/adattativa, citochine', description: 'Peptidi di riferimento immunomodulanti usati nella ricerca su citochine e immunita innata/adattativa.', keywords: ['peptidi immunomodulanti', 'peptidi di ricerca immunologica'] },
      epigenetics: { name: 'Epigenetica & longevita', short: 'Telomeri, sirtuine e cronobiologia', description: 'Composti di riferimento usati nella ricerca su invecchiamento epigenetico, telomeri e ritmi circadiani.', keywords: ['ricerca epitalon', 'peptidi della longevita', 'peptidi di ricerca epigenetica'] },
      hormones: { name: 'Ormoni & fattori di crescita', short: 'GH, GHRH, grelina, melanocortina', description: 'Peptidi di riferimento per ormone della crescita, analoghi GHRH, mimetici della grelina e melanocortine nella ricerca endocrinologica.', keywords: ['peptidi di ricerca GHRP', 'peptidi di ricerca GHRH', 'ricerca melanocortina'] },
      'cell-signaling': { name: 'Segnalazione cellulare', short: 'GPCR, chinasi e sonde second messenger', description: 'Ligandi peptidici e sonde usati per studiare l attivazione dei recettori e le vie di segnalazione a valle.', keywords: ['peptidi ligandi GPCR', 'peptidi di ricerca sulla segnalazione'] },
      'protein-analysis': { name: 'Analisi proteica & standard', short: 'Standard MS, controlli, frammenti', description: 'Frammenti e standard di riferimento per spettrometria di massa, controlli ELISA e workflow di quantificazione proteica.', keywords: ['standard peptidici per spettrometria di massa', 'peptidi di riferimento'] },
      'cell-permeable': { name: 'Cell-permeabili & cofattori', short: 'Precursori NAD+, analoghi di cofattori', description: 'Cofattori cell-permeabili e composti della via NAD+ usati in studi mitocondriali e metabolici.', keywords: ['ricerca NAD+', 'composti di ricerca sui cofattori'] },
    },
    useCases: {
      'weight-loss': { name: 'Ricerca sulla perdita di peso', description: 'Peptidi di riferimento agonisti GLP-1, GIP, glucagone e amilina usati nella ricerca su perdita di peso e malattie metaboliche.' },
      'muscle-recovery': { name: 'Ricerca su recupero muscolare e tissutale', description: 'Peptidi di riferimento usati in modelli di recupero di tendini, legamenti e muscoli.' },
      cognitive: { name: 'Ricerca cognitiva', description: 'Peptidi di riferimento nootropi e attivi sul SNC usati in cognizione, neuroprotezione e risposta allo stress.' },
      'anti-aging': { name: 'Ricerca su longevita & anti-aging', description: 'Composti di riferimento legati a telomeri, fattori di crescita e via NAD+ usati nella ricerca sulla longevita.' },
      tanning: { name: 'Ricerca sulla pigmentazione', description: 'Peptidi di riferimento dei recettori melanocortinici usati nella ricerca su pigmentazione e fotoprotezione.' },
    },
  },
  es: {
    researchAreas: {
      neuroscience: { name: 'Neurociencia & SNC', short: 'SNC, neuroproteccion, cognicion', description: 'Peptidos de referencia usados en estudios de cognicion, neuroproteccion y receptores del SNC, incluidos candidatos nootropicos y neuropeptidos relacionados con el sueno.', keywords: ['peptidos nootropicos', 'peptidos de investigacion SNC', 'peptidos neuroprotectores'] },
      cardiovascular: { name: 'Cardiovascular & vascular', short: 'Endotelio, tono vascular, reparacion', description: 'Peptidos referenciados en modelos de investigacion cardiovascular, reparacion endotelial y tono vascular.', keywords: ['peptidos de investigacion cardiovascular', 'peptidos de reparacion vascular'] },
      diabetes: { name: 'Diabetes & metabolismo', short: 'Glucosa, insulina, GLP-1 / GIP / GCG', description: 'Compuestos de referencia GLP-1, GIP y agonistas dobles/triples, mas candidatos para sensibilizacion a la insulina y metabolismo adipocitario en investigacion metabolica.', keywords: ['peptidos de investigacion GLP-1', 'peptidos de investigacion metabolica', 'investigacion de incretinas'] },
      'cancer-apoptosis': { name: 'Cancer & apoptosis', short: 'Apoptosis, vias antiproliferativas', description: 'Reactivos peptidicos usados en trabajos sobre supresores tumorales, induccion de apoptosis y lineas celulares antiproliferativas.', keywords: ['peptidos de investigacion del cancer', 'peptidos para ensayos de apoptosis'] },
      'adhesion-ecm': { name: 'Adhesion & MEC', short: 'Adhesion celular, MEC y modelos de herida', description: 'Peptidos implicados en investigacion de adhesion celular, matriz extracelular y reparacion de heridas.', keywords: ['peptidos de adhesion celular', 'peptidos de investigacion MEC', 'investigacion peptidica en cicatrizacion'] },
      'cell-tissue': { name: 'Reparacion celular & tisular', short: 'Regeneracion, gastrico, reparacion tendinosa', description: 'Peptidos de referencia usados en modelos de reparacion tendinosa, gastrica y de tejido conectivo.', keywords: ['peptidos de reparacion tisular', 'investigacion BPC-157', 'investigacion TB-500'] },
      immunology: { name: 'Inmunologia', short: 'Inmunidad innata/adaptativa, citocinas', description: 'Peptidos de referencia inmunomoduladores usados en investigacion de citocinas e inmunidad innata/adaptativa.', keywords: ['peptidos inmunomoduladores', 'peptidos de investigacion inmunologica'] },
      epigenetics: { name: 'Epigenetica & longevidad', short: 'Telomeros, sirtuinas y cronobiologia', description: 'Compuestos de referencia usados en investigacion de envejecimiento epigenetico, telomeros y ritmos circadianos.', keywords: ['investigacion epitalon', 'peptidos de longevidad', 'peptidos de investigacion epigenetica'] },
      hormones: { name: 'Hormonas & factores de crecimiento', short: 'GH, GHRH, grelina, melanocortina', description: 'Peptidos de referencia de hormona de crecimiento, analogos GHRH, mimeticos de grelina y melanocortina para investigacion endocrinologica.', keywords: ['peptidos de investigacion GHRP', 'peptidos de investigacion GHRH', 'investigacion melanocortina'] },
      'cell-signaling': { name: 'Senalizacion celular', short: 'GPCR, cinasas y sondas de segundo mensajero', description: 'Ligandos peptidicos y sondas usados para estudiar activacion de receptores y vias de senalizacion posteriores.', keywords: ['peptidos ligandos GPCR', 'peptidos de investigacion de senalizacion'] },
      'protein-analysis': { name: 'Analisis de proteinas & estandares', short: 'Estandares MS, controles, fragmentos', description: 'Fragmentos y estandares de referencia para espectrometria de masas, controles ELISA y flujos de cuantificacion proteica.', keywords: ['estandares peptidicos de espectrometria de masas', 'peptidos de referencia'] },
      'cell-permeable': { name: 'Permeables celulares & cofactores', short: 'Precursores NAD+, analogos de cofactores', description: 'Cofactores permeables celulares y compuestos de la via NAD+ usados en estudios mitocondriales y metabolicos.', keywords: ['investigacion NAD+', 'compuestos de investigacion de cofactores'] },
    },
    useCases: {
      'weight-loss': { name: 'Investigacion de perdida de peso', description: 'Peptidos de referencia agonistas GLP-1, GIP, glucagon y amilina usados en investigacion de perdida de peso y enfermedad metabolica.' },
      'muscle-recovery': { name: 'Investigacion de recuperacion muscular y tisular', description: 'Peptidos de referencia usados en modelos de recuperacion de tendones, ligamentos y musculos.' },
      cognitive: { name: 'Investigacion cognitiva', description: 'Peptidos de referencia nootropicos y activos en SNC usados en cognicion, neuroproteccion y respuesta al estres.' },
      'anti-aging': { name: 'Investigacion de longevidad & anti-aging', description: 'Compuestos de referencia relacionados con telomeros, factores de crecimiento y via NAD+ usados en investigacion de longevidad.' },
      tanning: { name: 'Investigacion de pigmentacion', description: 'Peptidos de referencia del receptor de melanocortina usados en investigacion de pigmentacion y fotoproteccion.' },
    },
  },
};

function keywordObject(keywords) {
  return Object.fromEntries(keywords.map((keyword, index) => [String(index), keyword]));
}

for (const [locale, localeTaxonomy] of Object.entries(taxonomy)) {
  const file = join(dictDir, `${locale}.json`);
  const dictionary = JSON.parse(readFileSync(file, 'utf8'));
  dictionary.taxonomy = localeTaxonomy;
  for (const area of Object.values(dictionary.taxonomy.researchAreas)) {
    area.keywords = keywordObject(area.keywords);
  }
  writeFileSync(file, `${JSON.stringify(dictionary, null, 2)}\n`);
  console.log(`merged ${locale} taxonomy`);
}
