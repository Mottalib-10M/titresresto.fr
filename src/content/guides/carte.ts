import { defineGuide } from '../../lib/page-types';
import { eur, U, M, EM } from './_f';
import { diagnostic } from '../../lib/engine/tr';

/* Carte ticket restaurant refusée : règles de service-public F21059 (25 € par jour, jours ouvrables, département
   de travail et limitrophes, déplacements, commerces non tenus d'accepter, liste de produits de l'enseigne) ;
   part dématérialisée en 2024 (rapport du Sénat n° 141). */
type Cas = Parameters<typeof diagnostic>[0];
const base: Cas = { jour: 'semaine', travailleCeJour: false, autorise: false, produit: 'repas', montant: 18, dejaPaye: 0, solde: 60, zone: 'meme', deplacement: false };
const CAS: Array<[{ fr: string; en: string }, Partial<Cas>]> = [
  [{ fr: 'Déjeuner de 18 €, rien payé avant', en: '€18 lunch, nothing paid before' }, {}],
  [{ fr: 'Déjeuner de 18 € après un petit-déjeuner de 12 €', en: '€18 lunch after a €12 breakfast' }, { dejaPaye: 12 }],
  [{ fr: 'Dimanche, sans travail ce jour-là', en: 'Sunday, not working that day' }, { jour: 'dimanche' }],
  [{ fr: 'En vacances, trois départements plus loin', en: 'On holiday, three départements away' }, { zone: 'autre' }],
  [{ fr: 'Solde de 9 € sur la carte', en: '€9 left on the card' }, { solde: 9 }],
];
const motifs = { fr: { ok: 'rien, le paiement passe', plafond: 'plafond du jour', solde: 'solde insuffisant', zone: 'hors zone', dimanche: 'dimanche', produit: 'produit exclu', alcool: 'alcool', courses: 'courses' }, en: { ok: 'nothing, it goes through', plafond: 'daily limit', solde: 'low balance', zone: 'outside the area', dimanche: 'Sunday', produit: 'excluded item', alcool: 'alcohol', courses: 'groceries' } };
const rows = (l: 'fr' | 'en') => CAS.map(([t, c]) => { const r = diagnostic({ ...base, ...c }); return [t[l], eur(r.passe, l), motifs[l][r.motif]]; });

export default defineGuide({
  id: 'carte', group: 'cartes', order: 14,
  tool: 'refus',
  related: ['plafond', 'dimanche', 'emetteurs', 'supermarche'],
  sources: ['sp', 'rapport', 'cntrEmetteurs'],
  fr: {
    slug: 'carte-ticket-restaurant',
    nav: 'Carte ticket restaurant refusée', card: 'Les cinq raisons pour lesquelles une carte de titres ne passe pas en caisse',
    title: 'Carte ticket restaurant 2026 : pourquoi elle est refusée',
    description: 'Carte ticket restaurant refusée en 2026 : plafond de 25 € atteint, dimanche, hors zone, solde ou produit exclu. Simulateur : la règle qui bloque le paiement.',
    h1: 'Carte ticket restaurant refusée : la règle qui bloque, en 2026',
    intro: 'Tapez le montant, ce que vous avez déjà payé aujourd\'hui, le lieu et le jour : le simulateur dit pourquoi votre carte ticket restaurant est refusée et combien elle peut encore payer.',
    resume: `Une carte ticket restaurant refusée en caisse n'est presque jamais une panne. Le terminal applique des règles fixées par le code du travail, les mêmes pour tous les émetteurs. Première cause : le plafond de ${eur(U.plafondJour, 'fr')} par jour, qui additionne tous les paiements de la journée ; après un petit-déjeuner de ${eur(12, 'fr')}, un déjeuner de ${eur(18, 'fr')} ne passe que pour ${eur(13, 'fr')}. Deuxième cause : le dimanche et les jours fériés, la carte est bloquée sauf pour les salariés qui travaillent ce jour-là avec l'accord de l'employeur. Troisième cause : la zone, limitée au département de travail et aux départements limitrophes, sauf titres prévus pour un déplacement. Viennent ensuite le solde, les produits exclus comme l'alcool, et le commerçant, qui n'est pas tenu d'accepter les titres ni tous les émetteurs. Selon le rapport du Sénat, ${M.partDemat2024} % des titres étaient sur carte ou application en 2024.`,
    faqs: [
      { open: true, q: 'Pourquoi ma carte ticket restaurant est-elle refusée alors que j\'ai du solde ?', a: `Le solde n'est qu'une des conditions. Vérifiez d'abord ce que vous avez déjà payé dans la journée : au-delà de ${eur(U.plafondJour, 'fr')}, tout paiement est bloqué. Puis le jour, le département du commerce et le produit. Enfin, le commerçant peut ne pas être affilié chez l'émetteur de votre carte, même s'il accepte d'autres titres.` },
      { q: 'Faut-il annoncer le montant avant de payer avec la carte ?', a: `C'est le plus sûr quand l'addition dépasse ce qui reste permis dans la journée. Certains terminaux tentent le montant total et refusent tout. En annonçant au commerçant la somme à débiter sur la carte de titres, par exemple ${eur(13, 'fr')} sur une addition de ${eur(18, 'fr')}, vous payez le reste par carte bancaire sans incident.` },
      { q: 'Une carte de titres marche-t-elle en vacances dans une autre région ?', a: 'Pas en principe. Les titres servent dans le département où vous travaillez et dans ceux qui le touchent. Ailleurs, la carte est refusée, sauf si l\'employeur a prévu des titres valables pour un déplacement professionnel. Pour un séjour loin de chez vous, gardez un autre moyen de paiement.' },
    ],
    body: (h) => `<h2>Les causes d'un refus de la carte ticket restaurant</h2>
<p>Le simulateur teste les règles dans l'ordre où la caisse les rencontre : la zone, le jour, le produit, le plafond du jour, puis le solde. Toutes figurent dans la ${h.src('sp', 'fiche service-public.fr')}, qui rappelle aussi qu'un restaurant ou un commerce n'est pas obligé d'accepter les titres et que chaque enseigne fixe sa liste de produits. Le tableau montre cinq situations courantes pour un déjeuner de ${h.eur(18)}.</p>
${h.table(['Situation', 'Payable en titres', 'Ce qui bloque'], rows('fr'), 'Déjeuner de 18 €, règles de 2026, solde de 60 € sauf mention', ['l', 'r', 'l'])}
<h2>Quand ce n'est pas la règle mais le commerçant</h2>
<p>Chaque commerçant signe un contrat d'affiliation avec les émetteurs qu'il choisit. La ${h.src('cntrEmetteurs', 'liste de la CNTR')} compte ${EM.listeCntr.length} émetteurs : un commerce peut prendre les cartes de certains et refuser celles des autres. Si la carte est refusée sans raison visible, demandez quels émetteurs sont acceptés. Le ${h.src('rapport', 'rapport du Sénat')} rappelle que l'acceptation a un coût pour le commerçant, une commission prélevée sur chaque paiement.</p>
<p>Le détail de chaque règle a sa page : ${h.a('plafond', 'plafond de 25 € par jour')}, ${h.a('dimanche', 'dimanche et jours fériés')}, ${h.a('supermarche', 'courses au supermarché')}.</p>`,
  },
  en: {
    slug: 'carte-ticket-restaurant',
    nav: 'Carte ticket restaurant refused', card: 'The five reasons a meal voucher card is declined at the till',
    title: 'Carte ticket restaurant 2026: why your card is refused',
    description: 'Carte ticket restaurant refused in 2026: €25 daily limit reached, Sunday, outside the area, balance or excluded item. Simulator: the rule blocking your payment.',
    h1: 'Carte ticket restaurant refused: the rule that blocks it in 2026',
    intro: 'Enter the amount, what you have already paid today, the place and the day: the simulator says why your carte ticket restaurant is refused and how much it can still pay.',
    resume: `A carte ticket restaurant, the French meal voucher card, refused at the till is almost never a fault. The terminal applies rules set by the Labour Code, the same for every issuer. First cause: the ${eur(U.plafondJour, 'en')} daily limit, which adds up every payment of the day; after a ${eur(12, 'en')} breakfast, an ${eur(18, 'en')} lunch only goes through for ${eur(13, 'en')}. Second cause: on Sundays and public holidays the card is blocked, except for staff working that day with the employer's permission. Third cause: the area, limited to the département where you work and the bordering ones, unless vouchers are set up for a business trip. Then come the balance, excluded items such as alcohol, and the shop, which does not have to accept vouchers or every issuer. According to the Senate report, ${M.partDemat2024}% of vouchers were on a card or app in 2024.`,
    faqs: [
      { open: true, q: 'Why is my meal voucher card refused when I have a balance?', a: `The balance is only one of the conditions. First check what you have already paid that day: above ${eur(U.plafondJour, 'en')}, any payment is blocked. Then the day, the shop's département and the product. Finally, the shop may not be affiliated with your card's issuer, even if it takes other vouchers.` },
      { q: 'Should I say the amount before paying with the card?', a: `It is the safest way when the bill exceeds what is still allowed that day. Some terminals try the full amount and decline everything. By telling the shop how much to debit on the voucher card, for example ${eur(13, 'en')} on an ${eur(18, 'en')} bill, you pay the rest by bank card with no trouble.` },
      { q: 'Does a voucher card work on holiday in another region?', a: 'Not as a rule. Vouchers work in the département where you work and in those bordering it. Elsewhere the card is refused, unless your employer has set up vouchers valid for a business trip. For a stay far from home, keep another means of payment.' },
    ],
    body: (h) => `<h2>Why a carte ticket restaurant gets refused</h2>
<p>The simulator tests the rules in the order the till meets them: area, day, product, daily limit, then balance. All of them are in the ${h.src('sp', 'service-public.fr guidance')}, which also says that a restaurant or shop does not have to accept vouchers and that each chain sets its own list of products. The table shows five common situations for an ${h.eur(18)} lunch.</p>
${h.table(['Situation', 'Payable with vouchers', 'What blocks it'], rows('en'), '€18 lunch, 2026 rules, €60 balance unless stated', ['l', 'r', 'l'])}
<h2>When it is the shop, not the rule</h2>
<p>Each shop signs an affiliation contract with the issuers it chooses. The ${h.src('cntrEmetteurs', 'CNTR list')} counts ${EM.listeCntr.length} issuers: a shop can take some cards and turn down others. If the card is refused for no visible reason, ask which issuers are accepted. The ${h.src('rapport', 'Senate report')} recalls that acceptance has a cost for the shop, a commission taken on each payment.</p>
<p>Each rule has its own page: ${h.a('plafond', '€25 daily limit')}, ${h.a('dimanche', 'Sundays and public holidays')}, ${h.a('supermarche', 'supermarket groceries')}.</p>`,
  },
});
