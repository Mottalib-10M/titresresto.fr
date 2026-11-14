import { defineGuide } from '../../lib/page-types';
import { eur, day, U, VA, EM } from './_f';
import { ancienSolde, validite } from '../../lib/engine/tr';

/* Carte Edenred : page publique edenred.fr/ticket-restaurant lue le 14/11/2026 (carte physique ou digitale, solde et
   transactions dans l'application, paiement sans contact, 300 000 partenaires) ; liste CNTR (Edenred, papier et carte) ;
   règles : service-public F21059 (25 € par jour, validité, titres de l'année après épuisement de l'année écoulée). */
const v26 = validite(2026, 'carte');
const DEPUIS = ['2027-01-04', '2027-02-01', '2027-02-15'] as const;
const ex = ancienSolde(140, '2027-02-01', 10, 5);

export default defineGuide({
  id: 'edenred', group: 'cartes', order: 15,
  tool: 'millesime',
  related: ['emetteurs', 'validite', 'carte', 'ticket'],
  sources: ['edenred', 'sp', 'cntrEmetteurs', 'rapport'],
  fr: {
    slug: 'carte-edenred',
    nav: 'Carte Edenred', card: 'Solde, plafond et date limite de la carte Edenred, et le solde de l\'an dernier à écouler',
    title: 'Carte Edenred 2026 : solde, plafond de 25 € et date limite',
    description: 'Carte Edenred en 2026 : solde dans l\'application, 25 € par jour, titres 2026 jusqu\'au 28 février 2027. Simulateur : écouler à temps le solde de l\'an dernier.',
    h1: 'Carte Edenred : solde, plafond et date limite des titres 2026',
    intro: 'Tapez le solde 2026 restant sur votre carte Edenred, la date de départ et ce que vous dépensez par jour : le simulateur dit si vous l\'écoulerez avant le dernier jour de validité.',
    resume: `La carte Edenred est la carte de titres-restaurant de l'émetteur Edenred, connu pour sa marque Ticket Restaurant®. Sa page publique la présente en version physique ou digitale, avec le solde, les transactions et les règles d'utilisation dans l'application, et le paiement sans contact chez ${EM.edenredReseau.toLocaleString('fr-FR')} restaurants, commerces et plateformes partenaires. Les règles, elles, sont celles de la loi et valent pour tous les émetteurs : ${eur(U.plafondJour, 'fr')} par jour au plus, les jours ouvrables, dans le département de travail et les départements limitrophes. Les titres 2026 se dépensent jusqu'au ${day(v26.dernierJour, 'fr')}, et ceux de 2027 ne servent qu'une fois le solde 2026 épuisé. Avec ${eur(140, 'fr')} de solde 2026 au 1er février et ${eur(10, 'fr')} dépensés par jour ouvré, il reste ${eur(ex.reste, 'fr')} au dernier jour. Ce site est indépendant et n'est pas affilié à Edenred.`,
    faqs: [
      { open: true, q: 'Comment connaître le solde de sa carte Edenred ?', a: 'Selon la page publique de l\'émetteur, le solde, les transactions et les règles d\'utilisation sont consultables à tout moment dans l\'application. Le ticket de caisse ne l\'affiche pas toujours. Pour une carte perdue, bloquée ou un crédit manquant, c\'est le service client de l\'émetteur ou votre employeur qu\'il faut joindre : ce site n\'a accès à aucun compte.' },
      { q: 'La carte Edenred passe-t-elle le dimanche ?', a: `Comme toutes les cartes de titres, elle n'est utilisable le dimanche et les jours fériés que si vous travaillez ce jour-là et que votre employeur l'a prévu. Le samedi, elle fonctionne comme en semaine, jusqu'à ${eur(U.plafondJour, 'fr')}. La règle vient du code du travail et non de l'émetteur.` },
      { q: 'Que devient le solde Edenred non dépensé à la fin février ?', a: `Après le ${day(v26.dernierJour, 'fr')}, les titres 2026 ne servent plus en paiement. La réglementation prévoit ensuite ${VA.joursEchange} jours pour les échanger, jusqu'au ${day(v26.finEchange, 'fr')}. Vérifiez dans l'application si un report a lieu et, sinon, demandez l'échange à votre employeur avant cette date.` },
    ],
    body: (h) => `<h2>Écouler le solde de la carte Edenred avant la date limite</h2>
<p>La ${h.src('sp', 'fiche service-public.fr')} fixe deux règles qui jouent ensemble en début d'année : les titres de l'année écoulée restent valables en janvier et février, et les titres de l'année en cours ne servent qu'une fois les anciens épuisés. Le simulateur compte les jours ouvrés jusqu'au ${h.day(v26.dernierJour)} et les multiplie par votre dépense quotidienne, plafonnée à ${h.eur(U.plafondJour)}. Le tableau part d'un solde 2026 de ${h.eur(140)} dépensé à ${h.eur(10)} par jour, cinq jours par semaine.</p>
${h.table(['À partir du', 'Jours d\'utilisation', 'Capacité', 'Reste au dernier jour'], DEPUIS.map((d) => { const r = ancienSolde(140, d, 10, 5); return [h.day(d), r.joursUsage, h.eur(r.capacite), h.eur(r.reste)]; }), 'Solde 2026 de 140 €, 10 € par jour, carte', ['l', 'r', 'r', 'r'])}
<h2>Ce que dit Edenred, ce que dit la loi</h2>
<p>La ${h.src('edenred', 'page publique d\'Edenred')} décrit la carte, l'application et le réseau de partenaires. La ${h.src('cntrEmetteurs', 'liste de la CNTR')} range Edenred parmi les émetteurs qui proposent papier et carte. Les plafonds, les jours et la zone ne viennent pas de l'émetteur mais du code du travail ; un commerçant reste libre de ne pas accepter une carte donnée. Le ${h.src('rapport', 'rapport du Sénat')} décrit le marché et ses émetteurs sans en recommander aucun ; ce site non plus.</p>
<p>Les autres cartes ont leur page : ${h.a('swile', 'Swile')}, ${h.a('up', 'carte UpDéjeuner')}, et la ${h.a('emetteurs', 'liste complète des émetteurs')}.</p>`,
  },
  en: {
    slug: 'carte-edenred',
    nav: 'Carte Edenred', card: 'Balance, limit and expiry of the Edenred card, and last year\'s balance to spend',
    title: 'Carte Edenred 2026: balance, €25 daily limit and expiry date',
    description: 'Carte Edenred in France for 2026: balance in the app, €25 a day, 2026 vouchers until 28 February 2027. Simulator: spend last year\'s balance before it expires.',
    h1: 'Carte Edenred: balance, limit and expiry of 2026 vouchers',
    intro: 'Enter the 2026 balance left on your carte Edenred, the start date and what you spend a day: the simulator says whether you will use it up before the last day of validity.',
    resume: `The carte Edenred is the meal voucher card of the issuer Edenred, known for its Ticket Restaurant® brand. Its public page presents it in a physical or digital version, with the balance, transactions and rules of use in the app, and contactless payment at ${EM.edenredReseau.toLocaleString('en-GB')} partner restaurants, shops and platforms. The rules themselves come from the law and apply to every issuer: at most ${eur(U.plafondJour, 'en')} a day, on working days, in the département where you work and the bordering ones. 2026 vouchers can be spent until ${day(v26.dernierJour, 'en')}, and 2027 ones only work once the 2026 balance is gone. With ${eur(140, 'en')} of 2026 balance on 1 February and ${eur(10, 'en')} spent per working day, ${eur(ex.reste, 'en')} is left on the last day. This site is independent and not affiliated with Edenred.`,
    faqs: [
      { open: true, q: 'How do I check the balance of my Edenred card?', a: 'According to the issuer\'s public page, the balance, transactions and rules of use can be checked at any time in the app. The till receipt does not always show it. For a lost or blocked card or a missing credit, contact the issuer\'s customer service or your employer: this site has no access to any account.' },
      { q: 'Does the Edenred card work on Sundays?', a: `Like every voucher card, it can only be used on Sundays and public holidays if you are working that day and your employer allows it. On Saturdays it works as on weekdays, up to ${eur(U.plafondJour, 'en')}. The rule comes from the Labour Code, not from the issuer.` },
      { q: 'What happens to an unspent Edenred balance at the end of February?', a: `After ${day(v26.dernierJour, 'en')}, 2026 vouchers can no longer be used to pay. The regulations then allow ${VA.joursEchange} days to exchange them, until ${day(v26.finEchange, 'en')}. Check in the app whether a rollover happens and, if not, ask your employer for the exchange before that date.` },
    ],
    body: (h) => `<h2>Spending the carte Edenred balance before it expires</h2>
<p>The ${h.src('sp', 'service-public.fr guidance')} sets two rules that work together at the start of the year: last year's vouchers stay valid in January and February, and the current year's vouchers only work once the old ones are used up. The simulator counts the working days until ${h.day(v26.dernierJour)} and multiplies them by your daily spending, capped at ${h.eur(U.plafondJour)}. The table starts from a ${h.eur(140)} 2026 balance spent at ${h.eur(10)} a day, five days a week.</p>
${h.table(['Starting on', 'Days of use', 'Spending room', 'Left on the last day'], DEPUIS.map((d) => { const r = ancienSolde(140, d, 10, 5); return [h.day(d), r.joursUsage, h.eur(r.capacite), h.eur(r.reste)]; }), '€140 balance from 2026, €10 a day, card', ['l', 'r', 'r', 'r'])}
<h2>What Edenred says, what the law says</h2>
<p>The ${h.src('edenred', 'Edenred public page')} describes the card, the app and the partner network. The ${h.src('cntrEmetteurs', 'CNTR list')} places Edenred among issuers offering both paper and card. The limits, days and area do not come from the issuer but from the Labour Code; a shop is still free not to accept a given card. The ${h.src('rapport', 'Senate report')} describes the market and its issuers without recommending any; neither does this site.</p>
<p>Other cards have their own page: ${h.a('swile', 'Swile')}, ${h.a('up', 'UpDéjeuner card')}, and the ${h.a('emetteurs', 'full list of issuers')}.</p>`,
  },
});
