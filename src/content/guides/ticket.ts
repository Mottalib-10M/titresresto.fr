import { defineGuide } from '../../lib/page-types';
import { eur, day, U, EX, PL, M } from './_f';
import { annuel } from '../../lib/engine/tr';

/* Ticket restaurant : nom courant du titre-restaurant ; « Ticket Restaurant® » est une marque d'Edenred (page publique
   edenred.fr lue le 14/11/2026). Règles : service-public F21059 (un titre par repas compris dans l'horaire, 50 à 60 %,
   7,32 € par titre en 2026) ; CNTR (7,32 € au 1er janvier 2026) ; rapport du Sénat n° 141 (valeur moyenne 2024). */
const cas = [[5, 47], [4, 47], [3, 47], [5, 45]] as const;
const ex = annuel(5, 47, 10, 50);

export default defineGuide({
  id: 'ticket', group: 'essentiel', order: 10,
  tool: 'annuel',
  related: ['home', 'exoneration', 'repas', 'cheque'],
  sources: ['sp', 'cntrPlafond', 'edenred', 'rapport'],
  fr: {
    slug: 'ticket-restaurant',
    nav: 'Ticket restaurant', card: 'Ce que valent vos tickets restaurant sur une année, part de l\'employeur comprise',
    title: 'Ticket restaurant 2026 : ce qu\'il vous rapporte sur un an',
    description: 'Ticket restaurant en 2026 : un titre par jour travaillé avec repas, employeur entre 50 et 60 %, 7,32 € exonérés. Simulateur : ce qu\'il vous rapporte sur un an.',
    h1: 'Ticket restaurant 2026 : ce que l\'employeur vous verse sur un an',
    intro: 'Tapez vos jours travaillés par semaine, vos semaines de travail et la valeur de votre ticket restaurant : le simulateur additionne une année entière et montre la part que l\'employeur paie pour vous.',
    resume: `« Ticket restaurant » est le nom que tout le monde donne au titre-restaurant, l'avantage repas que l'employeur finance en partie. Le mot vient d'une marque, Ticket Restaurant®, propriété de l'émetteur Edenred, mais la règle est la même pour toutes les cartes et tous les carnets. Vous recevez un titre par jour travaillé dont l'horaire comprend un repas. L'employeur en paie entre ${EX.tauxMin} % et ${EX.tauxMax} %, et cette part échappe aux cotisations et à l'impôt jusqu'à ${eur(PL, 'fr')} par titre en 2026. Le reste est retenu sur votre salaire. Sur une année de 47 semaines à cinq jours, avec des titres de ${eur(10, 'fr')} payés à moitié, cela fait ${ex.n} titres, ${eur(ex.credite, 'fr')} crédités et ${eur(ex.employeur, 'fr')} versés par l'employeur, sans un euro de cotisation. Vous dépensez ensuite jusqu'à ${eur(U.plafondJour, 'fr')} par jour au restaurant ou pour des produits alimentaires.`,
    faqs: [
      { open: true, q: 'Ticket restaurant et titre-restaurant, est-ce la même chose ?', a: 'Oui pour la règle, non pour le mot. Le code du travail parle de titre-restaurant. Ticket Restaurant est le nom commercial des titres d\'un émetteur, Edenred, devenu le mot de tous les jours, comme frigidaire pour réfrigérateur. Que votre carte vienne de cet émetteur ou d\'un autre, les plafonds, les jours d\'utilisation et la part de l\'employeur sont identiques.' },
      { q: 'Combien de tickets restaurant reçoit-on par an ?', a: `Autant que de jours travaillés avec une pause repas. À cinq jours par semaine et 47 semaines de travail, cela donne ${ex.n} titres. Les congés, les jours fériés chômés et les absences n'en donnent pas. Un salarié à quatre jours par semaine en reçoit un cinquième de moins, sans que la valeur unitaire change.` },
      { q: 'Le ticket restaurant compte-t-il dans mon salaire imposable ?', a: `Non, tant que la part de l'employeur reste entre ${EX.tauxMin} % et ${EX.tauxMax} % de la valeur et ne dépasse pas ${eur(PL, 'fr')} par titre. Elle n'apparaît alors ni dans le brut soumis aux cotisations ni dans le revenu déclaré. Seule la fraction au-delà du plafond, si l'employeur paie plus, est ajoutée au salaire.` },
    ],
    body: (h) => `<h2>Le ticket restaurant sur une année</h2>
<p>Le simulateur multiplie vos jours de travail avec repas par vos semaines travaillées, puis applique la ${h.src('sp', 'règle de service-public.fr')} : la part de l'employeur doit rester entre ${EX.tauxMin} et ${EX.tauxMax} % de la valeur, et elle est exonérée jusqu'à ${h.eur(PL, 2)} par titre, montant que la ${h.src('cntrPlafond', 'CNTR')} a confirmé pour 2026. Le tableau donne quatre rythmes de travail avec des titres de ${h.eur(10)} payés à moitié.</p>
${h.table(['Rythme', 'Titres par an', 'Part employeur par an', 'Retenue sur la paie'], cas.map(([j, s]) => { const r = annuel(j, s, 10, 50); return [`${j} j × ${s} sem.`, r.n, h.eur(r.employeur), h.eur(r.retenue)]; }), 'Titres de 10 €, employeur à 50 %, règles de 2026', ['l', 'r', 'r', 'r'])}
<h2>Une marque devenue un nom commun</h2>
<p>La ${h.src('edenred', 'page publique d\'Edenred')} présente sa carte Ticket Restaurant® en version physique ou digitale, avec le solde et les transactions dans l'application. D'autres émetteurs agréés proposent le même avantage sous d'autres noms : la ${h.a('emetteurs', 'liste des émetteurs')} les rassemble. Ce site n'est affilié à aucun d'eux. En 2024, un titre valait en moyenne ${h.eur(M.valeurFacialeMoyenne2024, 2)} selon le ${h.src('rapport', 'rapport du Sénat')}.</p>
<p>Pour savoir ce qu'il reste de votre poche à chaque déjeuner, voyez le ${h.a('repas', 'ticket repas')} ; pour un employeur qui veut chiffrer toute une équipe, le ${h.a('employeur', 'coût employeur')}. Les dates de validité, le ${day(U.toutAlimentaireJusquau, 'fr')} pour les courses, et le cas du dimanche ont aussi leur page.</p>`,
  },
  en: {
    slug: 'ticket-restaurant',
    nav: 'Ticket restaurant', card: 'What your meal vouchers are worth over a year, employer share included',
    title: 'Ticket restaurant in France 2026: what a year is worth',
    description: 'Ticket restaurant in France for 2026: one voucher per working day with a meal, employer pays 50 to 60%, €7.32 exempt. Simulator: what you get over a year.',
    h1: 'Ticket restaurant 2026: what your employer pays you over a year',
    intro: 'Enter your working days a week, the weeks you work and the value of your ticket restaurant: the simulator adds up a whole year and shows the share your employer pays for you.',
    resume: `"Ticket restaurant" is the name everyone in France gives to the titre-restaurant, the meal benefit an employer partly funds. The word comes from a brand, Ticket Restaurant®, owned by the issuer Edenred, but the rule is the same for every card and every booklet. You get one voucher per working day whose hours include a meal. The employer pays between ${EX.tauxMin}% and ${EX.tauxMax}% of it, and that share is free of contributions and income tax up to ${eur(PL, 'en')} per voucher in 2026. The rest is deducted from your pay. Over a year of 47 five-day weeks, with ${eur(10, 'en')} vouchers half paid by the employer, that means ${ex.n} vouchers, ${eur(ex.credite, 'en')} credited and ${eur(ex.employeur, 'en')} paid by the employer, with no contributions at all. You then spend up to ${eur(U.plafondJour, 'en')} a day at restaurants or on food.`,
    faqs: [
      { open: true, q: 'Are ticket restaurant and titre-restaurant the same thing?', a: 'Yes for the rule, no for the word. The Labour Code says titre-restaurant. Ticket Restaurant is the trade name of one issuer, Edenred, which became the everyday word, the way people say hoover for a vacuum cleaner. Whether your card comes from that issuer or another one, the limits, the days of use and the employer share are the same.' },
      { q: 'How many meal vouchers do you get in a year?', a: `As many as the working days that include a meal break. At five days a week and 47 working weeks, that gives ${ex.n} vouchers. Leave, public holidays off and absences give none. An employee working four days a week gets a fifth fewer, while the value of each voucher stays the same.` },
      { q: 'Does the ticket restaurant count as taxable pay?', a: `No, as long as the employer share stays between ${EX.tauxMin}% and ${EX.tauxMax}% of the value and does not exceed ${eur(PL, 'en')} per voucher. It then appears neither in gross pay subject to contributions nor in declared income. Only the part above the cap, if the employer pays more, is added to pay.` },
    ],
    body: (h) => `<h2>The ticket restaurant over a year</h2>
<p>The simulator multiplies your working days with a meal by the weeks you work, then applies the ${h.src('sp', 'service-public.fr rule')}: the employer share must stay between ${EX.tauxMin} and ${EX.tauxMax}% of the value, and it is exempt up to ${h.eur(PL, 2)} per voucher, the amount the ${h.src('cntrPlafond', 'CNTR')} confirmed for 2026. The table gives four work patterns with ${h.eur(10)} vouchers half paid by the employer.</p>
${h.table(['Pattern', 'Vouchers a year', 'Employer share a year', 'Deducted from pay'], cas.map(([j, s]) => { const r = annuel(j, s, 10, 50); return [`${j} d × ${s} wk`, r.n, h.eur(r.employeur), h.eur(r.retenue)]; }), '€10 vouchers, employer at 50%, 2026 rules', ['l', 'r', 'r', 'r'])}
<h2>A brand that became a common noun</h2>
<p>The ${h.src('edenred', 'Edenred public page')} presents its Ticket Restaurant® card in a physical or digital version, with the balance and transactions in the app. Other approved issuers offer the same benefit under other names: the ${h.a('emetteurs', 'list of issuers')} brings them together. This site is not affiliated with any of them. In 2024 the average voucher was worth ${h.eur(M.valeurFacialeMoyenne2024, 2)}, according to the ${h.src('rapport', 'Senate report')}.</p>
<p>To see what each lunch leaves you to pay, use the ${h.a('repas', 'ticket repas')} page; for an employer pricing a whole team, the ${h.a('employeur', 'employer cost')} page. Expiry dates, ${day(U.toutAlimentaireJusquau, 'en')} for groceries, and the Sunday case also have their own pages.</p>`,
  },
});
