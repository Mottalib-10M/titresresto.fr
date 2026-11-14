import { defineGuide } from '../../lib/page-types';
import { eur, day, U, M, EM, PPL } from './_f';
import { ecouler, validite } from '../../lib/engine/tr';

/* Titres restaurant : liste des sociétés émettrices publiée par la CNTR (PDF du 29/08/2024, lu le 14/11/2026) ;
   règles communes (service-public F21059) ; marché, bénéficiaires et dématérialisation (rapport du Sénat n° 141). */
const v26 = validite(2026, 'carte');
const ex = ecouler(180, 12, 5);
const SUP: Record<string, { fr: string; en: string }> = {
  carte: { fr: 'carte', en: 'card' }, application: { fr: 'application', en: 'app' }, 'papier et carte': { fr: 'papier et carte', en: 'paper and card' },
};
const rows = (l: 'fr' | 'en') => EM.listeCntr.map((e) => [e.nom, SUP[e.support][l]]);

export default defineGuide({
  id: 'emetteurs', group: 'cartes', order: 13,
  tool: 'solde',
  related: ['carte', 'edenred', 'swile', 'up'],
  sources: ['cntrEmetteurs', 'sp', 'rapport', 'cntr'],
  fr: {
    slug: 'titres-restaurant',
    nav: 'Titres restaurant : les émetteurs', card: 'Les sociétés qui émettent des titres restaurant, et en combien de jours écouler un solde',
    title: 'Titres restaurant 2026 : émetteurs, cartes et solde restant',
    description: 'Titres restaurant en 2026 : les sociétés émettrices recensées par la CNTR, papier, carte ou application, mêmes règles pour tous. Simulateur : écouler un solde.',
    h1: 'Titres restaurant 2026 : les émetteurs, leurs cartes et votre solde',
    intro: 'Tapez le solde de vos titres restaurant et ce que vous dépensez par jour : le simulateur dit en combien de jours tout écouler, quel que soit l\'émetteur de votre carte.',
    resume: `Les titres restaurant ne sont pas émis par l'État mais par des sociétés que contrôle la Commission nationale des titres-restaurant, la CNTR. Sa liste publique en recense ${EM.listeCntr.length}, sur papier, sur carte ou dans une application. Votre employeur en choisit une ; vous ne choisissez pas votre carte. Les règles ne dépendent pas de l'émetteur : ${eur(U.plafondJour, 'fr')} de dépense au plus par jour, les jours ouvrables, dans le département de travail et les départements limitrophes, et les titres 2026 sur carte valables jusqu'au ${day(v26.dernierJour, 'fr')}. Ce qui change d'un émetteur à l'autre, c'est l'application, le réseau de commerçants affiliés et le service client. Selon le rapport du Sénat, environ ${M.beneficiairesMillions} millions de salariés reçoivent des titres et ${M.partDemat2024} % des titres étaient dématérialisés en 2024. Avec un solde de ${eur(180, 'fr')} dépensé à ${eur(12, 'fr')} par jour, il faut ${ex.jours} jours d'utilisation pour tout écouler.`,
    faqs: [
      { open: true, q: 'Qui émet les titres restaurant en France ?', a: `Des sociétés privées agréées et contrôlées par la Commission nationale des titres-restaurant. La CNTR publie leur liste avec leur support : papier et carte pour les plus anciens émetteurs, carte ou application pour les plus récents. Un commerçant affilié chez un émetteur n'accepte pas forcément les cartes des autres : c'est la raison la plus fréquente d'un refus inattendu.` },
      { q: 'Les règles changent-elles selon l\'émetteur des titres restaurant ?', a: `Non. Le plafond de ${eur(U.plafondJour, 'fr')} par jour, les jours d'utilisation, la zone géographique, les produits permis et les dates de validité viennent du code du travail et s'appliquent à tous. Un émetteur peut ajouter des fonctions, comme le paiement mobile ou des alertes de solde, mais il ne peut pas assouplir la loi.` },
      { q: 'Mon employeur change d\'émetteur : que devient mon solde ?', a: `Le solde de votre ancienne carte reste à vous et se dépense dans les mêmes conditions jusqu'à la fin de sa validité, le ${day(v26.dernierJour, 'fr')} pour les titres 2026. Écoulez-le en premier : les titres de l'année en cours ne servent qu'une fois ceux de l'année écoulée épuisés. Demandez à l'employeur la marche à suivre si votre carte est désactivée.` },
    ],
    body: (h) => `<h2>Les sociétés émettrices de titres restaurant</h2>
<p>La ${h.src('cntrEmetteurs', 'liste publiée par la CNTR')}, datée du ${h.day(EM.listeCntrDate)} et lue le ${h.day(EM.retrieved_at)}, donne les sociétés émettrices et leur support. Ce site n'est affilié à aucune d'elles ; les noms sont repris tels que la CNTR les écrit.</p>
${h.table(['Émetteur', 'Support'], rows('fr'), 'Sociétés émettrices de titres-restaurant selon la CNTR', ['l', 'l'])}
<h2>Écouler le solde de ses titres restaurant</h2>
<p>Le simulateur ne dépend pas de l'émetteur : il divise le solde par ce que vous dépensez chaque jour, sans dépasser ${h.eur(U.plafondJour)}, la limite rappelée par la ${h.src('sp', 'fiche service-public.fr')}. Le ${h.src('rapport', 'rapport du Sénat')} évalue à ${h.n(M.contreValeurPerimes2024Millions, 1)} millions d'euros la contre-valeur des titres périmés en 2024 : un solde qui dort finit par se perdre. La proposition de loi examinée au Sénat le ${h.day(PPL.seanceSenat)} ne change pas ces dates pour 2026 et 2027.</p>
<p>Chaque grande carte a sa page : ${h.a('edenred', 'carte Edenred')}, ${h.a('swile', 'Swile')}, ${h.a('up', 'carte UpDéjeuner')}, et ${h.a('bimpli', 'Bimpli côté commerçant')}. Une carte refusée en caisse ? Voyez ${h.a('carte', 'pourquoi la carte ticket restaurant ne passe pas')}.</p>`,
  },
  en: {
    slug: 'titres-restaurant',
    nav: 'Titres restaurant: the issuers', card: 'The companies that issue titres restaurant, and how many days to spend a balance',
    title: 'Titres restaurant 2026: issuers, cards and your balance left',
    description: 'Titres restaurant in France for 2026: the issuing companies listed by the CNTR, paper, card or app, same rules for all. Simulator: how long to use your balance.',
    h1: 'Titres restaurant 2026: the issuers, their cards and your balance',
    intro: 'Enter the balance of your titres restaurant and what you spend a day: the simulator says how many days it takes to use it all, whichever company issued your card.',
    resume: `French meal vouchers, titres restaurant, are not issued by the State but by companies supervised by the national meal voucher commission, the CNTR. Its public list names ${EM.listeCntr.length} of them, on paper, on a card or in an app. Your employer picks one; you do not choose your card. The rules do not depend on the issuer: at most ${eur(U.plafondJour, 'en')} of spending a day, on working days, in the département where you work and the bordering ones, and 2026 card vouchers valid until ${day(v26.dernierJour, 'en')}. What differs from one issuer to another is the app, the network of affiliated shops and customer service. According to the Senate report, about ${M.beneficiairesMillions} million employees receive vouchers and ${M.partDemat2024}% of vouchers were digital in 2024. With a ${eur(180, 'en')} balance spent at ${eur(12, 'en')} a day, it takes ${ex.jours} days of use to spend it all.`,
    faqs: [
      { open: true, q: 'Who issues meal vouchers in France?', a: 'Private companies approved and supervised by the national meal voucher commission. The CNTR publishes their list with their format: paper and card for the older issuers, card or app for the newer ones. A shop affiliated with one issuer does not necessarily accept the cards of the others: that is the most common reason for an unexpected refusal.' },
      { q: 'Do the rules change depending on who issues the titres restaurant?', a: `No. The ${eur(U.plafondJour, 'en')} daily limit, the days of use, the geographic area, the products allowed and the expiry dates come from the Labour Code and apply to all. An issuer can add features, such as mobile payment or balance alerts, but it cannot relax the law.` },
      { q: 'My employer is switching issuers: what happens to my balance?', a: `The balance on your old card is still yours and can be spent on the same terms until it expires, ${day(v26.dernierJour, 'en')} for 2026 vouchers. Use it first: the current year's vouchers only work once last year's are used up. Ask your employer what to do if your card is deactivated.` },
    ],
    body: (h) => `<h2>The companies issuing titres restaurant</h2>
<p>The ${h.src('cntrEmetteurs', 'list published by the CNTR')}, dated ${h.day(EM.listeCntrDate)} and read on ${h.day(EM.retrieved_at)}, gives the issuing companies and their format. This site is not affiliated with any of them; names are given as the CNTR writes them.</p>
${h.table(['Issuer', 'Format'], rows('en'), 'Meal voucher issuing companies according to the CNTR', ['l', 'l'])}
<h2>Spending the balance of your titres restaurant</h2>
<p>The simulator does not depend on the issuer: it divides the balance by what you spend each day, without going over ${h.eur(U.plafondJour)}, the limit set out in the ${h.src('sp', 'service-public.fr guidance')}. The ${h.src('rapport', 'Senate report')} puts the value of vouchers that expired in 2024 at ${h.n(M.contreValeurPerimes2024Millions, 1)} million euros: a balance left idle ends up lost. The bill debated in the Senate on ${h.day(PPL.seanceSenat)} does not change these dates for 2026 and 2027.</p>
<p>Each major card has its own page: ${h.a('edenred', 'Edenred card')}, ${h.a('swile', 'Swile')}, ${h.a('up', 'UpDéjeuner card')}, and ${h.a('bimpli', 'Bimpli for shops')}. Card refused at the till? See ${h.a('carte', 'why the ticket restaurant card is declined')}.</p>`,
  },
});
