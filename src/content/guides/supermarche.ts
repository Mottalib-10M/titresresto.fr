import { defineGuide } from '../../lib/page-types';
import { eur, day, U, PPL } from './_f';
import { peutPayer, type Produit } from '../../lib/engine/tr';

/* Courses : service-public F21059 (tout produit alimentaire jusqu'au 31/12/2026, liste propre à chaque enseigne, commerçant
   libre d'accepter) ; loi n° 2025-56 du 21 janvier 2025 ; texte AN n° 32 et texte de la commission n° 142 (art. 4 : 2027). */
const PROD: Array<[Produit, string, string]> = [
  ['pret', 'Sandwich, salade, plat cuisiné', 'Sandwich, salad, ready meal'],
  ['fruits', 'Fruits et légumes', 'Fruit and vegetables'],
  ['courses', 'Pâtes, riz, farine, viande crue', 'Pasta, rice, flour, raw meat'],
  ['alcool', 'Vin, bière', 'Wine, beer'],
  ['nonalim', 'Lessive, hygiène', 'Detergent, toiletries'],
];
const p = (produit: Produit, annee: 2026 | 2027, adoptee: boolean) => peutPayer({ annee, jour: 'semaine', travailleCeJour: true, autorise: true, produit, montant: 20, adoptee, version: 'senat' }).ok;
const rows = (l: 'fr' | 'en') => PROD.map(([k, fr, en]) => {
  const o = (b: boolean) => (b ? (l === 'fr' ? 'oui' : 'yes') : (l === 'fr' ? 'non' : 'no'));
  return [l === 'fr' ? fr : en, o(p(k, 2026, true)), o(p(k, 2027, true)), o(p(k, 2027, false))];
});

export default defineGuide({
  id: 'supermarche', group: 'usage', order: 5,
  tool: 'courses',
  related: ['plafond', 'reforme', 'dimanche', 'home'],
  sources: ['sp', 'texteAN', 'texteCommission', 'rapport'],
  fr: {
    slug: 'supermarche-courses',
    nav: 'Courses au supermarché', card: 'Quels produits passent en titres en 2026, et ce qui se passe au 1er janvier 2027 selon le vote',
    title: 'Titre-restaurant au supermarché 2026 : courses permises ?',
    description: 'Titre-restaurant au supermarché en 2026 : tout produit alimentaire jusqu\'au 31 décembre 2026, alcool exclu. Ce qui change en 2027 si la loi est votée, ou non.',
    h1: 'Titre-restaurant au supermarché : les courses en 2026 et en 2027',
    intro: 'Choisissez le produit et l\'année : le simulateur dit si votre titre-restaurant passe au supermarché pour ces courses, selon que la proposition de loi est votée ou non.',
    resume: `Au supermarché, le titre-restaurant paie aujourd'hui tout produit alimentaire, qu'il soit prêt à manger ou à cuisiner : pâtes, riz, farine, viande crue, œufs. Cette ouverture est une dérogation, prolongée par la loi du 21 janvier 2025 jusqu'au ${day(U.toutAlimentaireJusquau, 'fr')}. Sans nouveau texte, elle prend fin au 1er janvier 2027 : seuls resteraient payables les plats et produits directement consommables, comme les sandwichs, les salades ou les plats cuisinés, ainsi que les fruits et légumes. La proposition de loi en discussion prolonge la dérogation jusqu'au 31 décembre 2027 dans ses deux versions, celle de l'Assemblée nationale et celle de la commission du Sénat, puis la rend durable à partir de 2028. L'alcool et les produits non alimentaires restent exclus dans tous les cas, et le plafond de ${eur(U.plafondJour, 'fr')} par jour s'applique aussi en caisse. Chaque enseigne fixe sa propre liste de produits acceptés, et un commerçant n'est jamais obligé d'accepter les titres : un refus reste possible même quand la loi le permet.`,
    faqs: [
      { q: 'Puis-je acheter des pâtes ou de la farine en titres-restaurant ?', a: `Oui jusqu'au ${day(U.toutAlimentaireJusquau, 'fr')}, car tout produit alimentaire est permis jusqu'à cette date. En 2027, cela dépend du vote de la proposition de loi : si elle est adoptée, la dérogation est prolongée d'un an ; sinon, les produits à cuisiner ne passent plus, et seuls restent les plats prêts à consommer et les fruits et légumes.` },
      { q: 'Pourquoi la caisse refuse-t-elle une partie de mon panier ?', a: 'Parce que chaque enseigne définit la liste des produits qu\'elle accepte en titres-restaurant, et que la caisse sépare automatiquement les articles exclus. L\'alcool, la lessive, les produits d\'hygiène ou les aliments pour animaux ne passent jamais. Certaines enseignes sont plus restrictives que la loi : dans ce cas, aucun recours, il faut payer ces articles autrement.' },
      { q: 'Le plafond de 25 € s\'applique-t-il aussi aux courses ?', a: `Oui. Restaurant ou supermarché, vous ne pouvez pas dépasser ${eur(U.plafondJour, 'fr')} par jour en titres. Pour un panier de ${eur(60, 'fr')}, il faut donc compléter par carte bancaire ou en espèces. Si la version du Sénat est votée, le plafond sera plus bas pour les courses à cuisiner que pour les repas à partir de 2028, selon des montants fixés par décret.` },
      { q: 'Les courses en ligne se paient-elles en titres-restaurant ?', a: 'En pratique, certains sites acceptent déjà les cartes de titres, dans les mêmes limites : produits alimentaires seulement et plafond journalier. La proposition de loi encadre cet usage à distance. Le texte de l\'Assemblée en excluait les plateformes de livraison de repas ; la commission du Sénat a supprimé cette exclusion, qu\'elle jugeait inapplicable. Rien n\'est encore voté.' },
    ],
    body: (h) => `<h2>Les courses au supermarché en titre-restaurant, produit par produit</h2>
<p>Le tableau applique les règles produit par produit, pour un achat de ${h.eur(20)} un jour de semaine. La colonne 2026 suit la ${h.src('sp', 'fiche service-public.fr')}. Les colonnes 2027 montrent les deux issues possibles du vote : la prolongation prévue par l'article 4 du texte, identique dans le ${h.src('texteAN', 'texte de l\'Assemblée')} et dans le ${h.src('texteCommission', 'texte de la commission du Sénat')}, ou son rejet.</p>
${h.table(['Produit', '2026', '2027, loi votée', '2027, loi rejetée'], rows('fr'), 'Produits payables en titres-restaurant au supermarché', ['l', 'l', 'l', 'l'])}
<h2>Une dérogation reconduite d'année en année</h2>
<p>Le titre-restaurant est conçu pour le repas pris pendant la journée de travail. L'achat de tous les produits alimentaires a été ouvert en 2022 pour soutenir le pouvoir d'achat, à titre temporaire, puis prolongé à plusieurs reprises, la dernière fois jusqu'à fin 2026. Le ${h.src('rapport', 'rapport du Sénat')} propose de rendre ce régime durable tout en limitant davantage les dépenses de courses par un plafond plus bas.</p>
<h2>Avant de passer en caisse</h2>
<p>Séparez votre panier si vous dépassez ${h.eur(U.plafondJour)}, et gardez les articles non alimentaires à part. Le ${h.a('plafond', 'plafond journalier')} vaut pour l'ensemble de la journée ; le ${h.a('dimanche', 'dimanche')}, la carte est en général refusée si vous ne travaillez pas.</p>`,
  },
  en: {
    slug: 'supermarket-groceries',
    nav: 'Supermarket groceries', card: 'Which products you can buy with vouchers in 2026, and what happens on 1 January 2027 depending on the vote',
    title: 'Meal vouchers at the supermarket 2026: groceries allowed?',
    description: 'French meal vouchers at the supermarket in 2026: any food product until 31 December 2026, alcohol excluded. What changes in 2027 if the bill passes or fails.',
    h1: 'Meal vouchers at the supermarket: groceries in 2026 and 2027',
    intro: 'Pick the product and the year: the simulator tells you whether meal vouchers at the supermarket will cover those groceries, depending on whether the bill passes.',
    resume: `At the supermarket, a French meal voucher currently pays for any food product, whether ready to eat or to be cooked: pasta, rice, flour, raw meat, eggs. That opening is an exception, extended by the law of 21 January 2025 until ${day(U.toutAlimentaireJusquau, 'en')}. Without a new law it ends on 1 January 2027: only food that can be eaten as it is, such as sandwiches, salads or ready meals, plus fruit and vegetables, would remain payable. The bill under debate extends the exception until 31 December 2027 in both versions, the National Assembly text and the Senate committee text, then makes it permanent from 2028. Alcohol and non-food items stay excluded in every case, and the ${eur(U.plafondJour, 'en')} daily limit also applies at the till. Each chain sets its own list of accepted products, and no shop is ever obliged to take vouchers: a refusal is still possible even when the law allows the purchase.`,
    faqs: [
      { q: 'Can I buy pasta or flour with meal vouchers?', a: `Yes until ${day(U.toutAlimentaireJusquau, 'en')}, because any food product is allowed until then. In 2027 it depends on the bill: if it passes, the exception is extended by a year; if not, food that needs cooking no longer qualifies, and only ready-to-eat products and fruit and vegetables remain.` },
      { q: 'Why does the till reject part of my basket?', a: 'Because each chain defines the list of products it accepts with meal vouchers, and the till automatically separates excluded items. Alcohol, detergent, toiletries or pet food never qualify. Some chains are stricter than the law: in that case there is no appeal, and those items have to be paid another way.' },
      { q: 'Does the €25 limit apply to groceries too?', a: `Yes. Restaurant or supermarket, you cannot exceed ${eur(U.plafondJour, 'en')} a day in vouchers. For a ${eur(60, 'en')} basket you therefore top up by bank card or cash. If the Senate version passes, the limit for groceries to cook will be lower than for meals from 2028, with amounts set by decree.` },
      { q: 'Can online grocery orders be paid with meal vouchers?', a: 'In practice, some sites already accept voucher cards, within the same limits: food only and the daily cap. The bill sets a framework for this remote use. The Assembly text left meal delivery platforms out of it; the Senate committee removed that exclusion, which it considered unworkable. Nothing has been passed yet.' },
    ],
    body: (h) => `<h2>Meal vouchers at the supermarket, product by product</h2>
<p>The table applies the rules product by product, for a ${h.eur(20)} purchase on a weekday. The 2026 column follows the ${h.src('sp', 'service-public.fr guidance')}. The 2027 columns show both possible outcomes of the vote: the extension in article 4 of the bill, identical in the ${h.src('texteAN', 'Assembly text')} and the ${h.src('texteCommission', 'Senate committee text')}, or its rejection.</p>
${h.table(['Product', '2026', '2027, bill passed', '2027, bill rejected'], rows('en'), 'Products payable with meal vouchers at the supermarket', ['l', 'l', 'l', 'l'])}
<h2>An exception renewed year after year</h2>
<p>The meal voucher is designed for the meal taken during the working day. Buying any food product was opened up in 2022 to support purchasing power, on a temporary basis, then extended several times, most recently until the end of 2026. The ${h.src('rapport', 'Senate report')} proposes making this regime permanent while limiting grocery spending more tightly through a lower cap.</p>
<h2>Before you reach the till</h2>
<p>Split your basket if you go over ${h.eur(U.plafondJour)}, and keep non-food items apart. The ${h.a('plafond', 'daily limit')} covers the whole day; on a ${h.a('dimanche', 'Sunday')}, the card is usually refused if you are not working.</p>`,
  },
});
