import { defineGuide } from '../../lib/page-types';
import { eur, day, U, EM } from './_f';
import { cumulJour, validite } from '../../lib/engine/tr';

/* Swile : page publique swile.co (titres-resto) lue le 14/11/2026 : carte Mastercard, en ligne, sans contact, Apple Pay,
   Google Pay, solde en temps réel, alertes, plus de 220 000 établissements, « plafond quotidien » sans montant ;
   liste CNTR (Swile, carte ; Swile produits Bimpli, papier et carte) ; 25 € par jour (service-public F21059). */
const v26 = validite(2026, 'carte');
const CAS = [[0, 14], [9.5, 21], [16, 12], [25, 6]] as const;
const ex = cumulJour(9.5, 21);

export default defineGuide({
  id: 'swile', group: 'cartes', order: 16,
  tool: 'cumul',
  related: ['emetteurs', 'plafond', 'carte', 'bimpli'],
  sources: ['swile', 'sp', 'cntrEmetteurs'],
  fr: {
    slug: 'swile-ticket-restaurant',
    nav: 'Swile ticket restaurant', card: 'Payer en titres avec Swile : le plafond du jour partagé entre plusieurs paiements',
    title: 'Swile ticket restaurant 2026 : plafond du jour et paiements',
    description: 'Swile ticket restaurant en 2026 : carte Mastercard, paiement mobile, 25 € par jour tous paiements confondus. Simulateur : ce qui passe encore aujourd\'hui.',
    h1: 'Swile ticket restaurant : le plafond du jour, paiement par paiement',
    intro: 'Tapez ce que vous avez déjà payé aujourd\'hui avec votre carte Swile ticket restaurant et le montant du nouvel achat : le simulateur dit ce qui passe encore en titres et ce qu\'il faut régler autrement.',
    resume: `Swile est un émetteur de titres-restaurant agréé, inscrit sur la liste de la CNTR pour sa carte et, sous la marque Bimpli, pour le papier et la carte. Sa page publique présente une carte Mastercard utilisable en magasin, en ligne et en paiement mobile, avec le solde suivi en temps réel et des alertes, chez plus de ${EM.swileReseau.toLocaleString('fr-FR')} établissements. Elle évoque un plafond quotidien sans en donner le montant : c'est celui de la loi, ${eur(U.plafondJour, 'fr')} par jour, tous paiements en titres confondus. Un café payé le matin réduit donc ce qui reste pour le déjeuner. Après ${eur(9.5, 'fr')} dépensés, un achat de ${eur(21, 'fr')} ne passe que pour ${eur(ex.passe, 'fr')} ; ${eur(ex.complement, 'fr')} restent à payer par un autre moyen. Les titres 2026 se dépensent jusqu'au ${day(v26.dernierJour, 'fr')}. Ce site est indépendant et n'est pas affilié à Swile.`,
    faqs: [
      { open: true, q: 'Pourquoi Swile refuse-t-il mon paiement alors que mon solde suffit ?', a: `Le plus souvent, parce que le plafond de ${eur(U.plafondJour, 'fr')} de la journée est déjà entamé par un paiement précédent. Le compteur additionne tous vos achats en titres depuis minuit. Viennent ensuite le dimanche, sauf travail ce jour-là avec l'accord de l'employeur, un commerce hors de votre zone ou un commerçant qui n'accepte pas cet émetteur.` },
      { q: 'Peut-on payer en ligne ou par téléphone avec des titres Swile ?', a: 'La page publique de l\'émetteur annonce le paiement en ligne grâce à sa carte Mastercard, et le paiement par téléphone, Apple Pay compris. Les règles de la loi restent les mêmes : plafond journalier, jours ouvrables et produits alimentaires seulement. Le site marchand doit lui aussi accepter les titres.' },
      { q: 'Le plafond de 25 € se reporte-t-il au lendemain sur Swile ?', a: `Non. Le plafond est journalier et ne se cumule pas : une journée sans dépense ne donne pas droit à ${eur(50, 'fr')} le lendemain. Votre solde, lui, reste sur la carte jusqu'à la fin de sa validité. Pour un repas plus cher, payez la part au-delà du plafond avec une autre carte.` },
    ],
    body: (h) => `<h2>Le plafond du jour sur une carte Swile ticket restaurant</h2>
<p>La ${h.src('sp', 'fiche service-public.fr')} limite à ${h.eur(U.plafondJour)} ce que l'on paie en titres en une journée. Sur une carte, ce plafond est un compteur : chaque paiement le réduit, et il repart de zéro le lendemain. La ${h.src('swile', 'page publique de Swile')} mentionne ce plafond quotidien et des notifications à chaque paiement, sans en écrire le montant. Le tableau montre quatre situations.</p>
${h.table(['Déjà payé aujourd\'hui', 'Nouvel achat', 'Passe en titres', 'Autre moyen'], CAS.map(([d, a]) => { const r = cumulJour(d, a); return [h.eur(d, 2), h.eur(a), h.eur(r.passe, 2), h.eur(r.complement, 2)]; }), 'Plafond de 25 € par jour, tous paiements en titres', ['l', 'r', 'r', 'r'])}
<h2>Swile, Bimpli et les autres émetteurs</h2>
<p>La ${h.src('cntrEmetteurs', 'liste de la CNTR')} mentionne Swile pour sa carte et « Swile produits Bimpli » pour le papier et la carte. Pour un salarié, les règles sont identiques d'un émetteur à l'autre ; seuls changent l'application et le réseau de commerçants affiliés. Ce site ne recommande aucun émetteur et ne gère aucun compte : pour une carte bloquée, adressez-vous au service client de l'émetteur ou à votre employeur.</p>
<p>Le côté commerçant de Bimpli a sa page, ${h.a('bimpli', 'Bimpli commerçant')}, comme la ${h.a('carte', 'carte refusée en caisse')}.</p>`,
  },
  en: {
    slug: 'swile-ticket-restaurant',
    nav: 'Swile ticket restaurant', card: 'Paying with Swile vouchers: the daily limit shared across several payments',
    title: 'Swile ticket restaurant 2026: daily limit and payments',
    description: 'Swile ticket restaurant in France for 2026: Mastercard card, mobile payment, €25 a day across all payments. Simulator: what can still go on vouchers today.',
    h1: 'Swile ticket restaurant: the daily limit, payment by payment',
    intro: 'Enter what you have already paid today with your Swile ticket restaurant card and the new purchase: the simulator says what still goes on vouchers and what you have to pay another way.',
    resume: `Swile is an approved French meal voucher issuer, on the CNTR list for its card and, under the Bimpli brand, for paper and card. Its public page presents a Mastercard card usable in shops, online and by mobile payment, with the balance tracked in real time and alerts, at more than ${EM.swileReseau.toLocaleString('en-GB')} venues. It mentions a daily limit without giving the amount: it is the legal one, ${eur(U.plafondJour, 'en')} a day across all voucher payments. A coffee paid in the morning therefore reduces what is left for lunch. After ${eur(9.5, 'en')} spent, a ${eur(21, 'en')} purchase only goes through for ${eur(ex.passe, 'en')}; ${eur(ex.complement, 'en')} is left to pay another way. 2026 vouchers can be spent until ${day(v26.dernierJour, 'en')}. This site is independent and not affiliated with Swile.`,
    faqs: [
      { open: true, q: 'Why does Swile decline my payment when my balance is enough?', a: `Most often because the ${eur(U.plafondJour, 'en')} limit for the day has already been dented by an earlier payment. The counter adds up all your voucher purchases since midnight. Next come Sundays, unless you work that day with your employer's permission, a shop outside your area, or a shop that does not accept this issuer.` },
      { q: 'Can I pay online or by phone with Swile vouchers?', a: 'The issuer\'s public page advertises online payment thanks to its Mastercard card, and payment by phone, Apple Pay included. The legal rules stay the same: daily limit, working days and food only. The online shop must also accept meal vouchers.' },
      { q: 'Does the €25 limit roll over to the next day on Swile?', a: `No. The limit is daily and does not build up: a day with no spending does not give you ${eur(50, 'en')} the next day. Your balance, though, stays on the card until it expires. For a pricier meal, pay the part above the limit with another card.` },
    ],
    body: (h) => `<h2>The daily limit on a Swile ticket restaurant card</h2>
<p>The ${h.src('sp', 'service-public.fr guidance')} caps what you pay with vouchers in one day at ${h.eur(U.plafondJour)}. On a card, that limit is a counter: each payment lowers it, and it resets the next day. The ${h.src('swile', 'Swile public page')} mentions this daily limit and notifications on each payment, without writing the amount. The table shows four situations.</p>
${h.table(['Already paid today', 'New purchase', 'Goes on vouchers', 'Another way'], CAS.map(([d, a]) => { const r = cumulJour(d, a); return [h.eur(d, 2), h.eur(a), h.eur(r.passe, 2), h.eur(r.complement, 2)]; }), '€25 daily limit, all voucher payments', ['l', 'r', 'r', 'r'])}
<h2>Swile, Bimpli and the other issuers</h2>
<p>The ${h.src('cntrEmetteurs', 'CNTR list')} names Swile for its card and "Swile produits Bimpli" for paper and card. For an employee, the rules are identical from one issuer to another; only the app, the customer service and the network of affiliated shops change from one card to the next. This site recommends no issuer and runs no account: for a blocked card, contact the issuer's customer service or your employer.</p>
<p>The shop side of Bimpli has its page, ${h.a('bimpli', 'Bimpli commerçant')}, as does the ${h.a('carte', 'card refused at the till')}.</p>`,
  },
});
