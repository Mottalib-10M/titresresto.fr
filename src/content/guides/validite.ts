import { defineGuide } from '../../lib/page-types';
import { day, VA, M, PPL } from './_f';
import { validite } from '../../lib/engine/tr';

/* Validité : service-public F21059 (année civile + janvier et février) ; rapport du Sénat n° 141 (R. 3262-5 : deux mois en
   dématérialisé, un mois en papier, quinze jours d'échange, roulement automatique des cartes, 54,6 M€ périmés en 2024) ;
   texte AN n° 32 (trois ans) ; texte de la commission n° 142 (suppression). */
const millesimes = [2025, 2026, 2027];
const c26 = validite(2026, 'carte'), p26 = validite(2026, 'papier');

export default defineGuide({
  id: 'validite', group: 'usage', order: 6,
  tool: 'validite',
  related: ['reforme', 'absences', 'home', 'plafond'],
  sources: ['sp', 'rapport', 'texteAN', 'texteCommission'],
  fr: {
    slug: 'validite-date-limite',
    nav: 'Validité et date limite', card: 'Le dernier jour pour utiliser vos titres 2026, sur carte ou sur papier, et le délai pour les échanger',
    title: 'Validité des titres-restaurant 2026 : date limite, échange',
    description: 'Validité des titres-restaurant 2026 : jusqu\'au 28 février 2027 sur carte, 31 janvier 2027 sur papier, puis 15 jours d\'échange. Calcul pour chaque millésime.',
    h1: 'Validité des titres-restaurant : la date limite de vos titres 2026',
    intro: 'Choisissez l\'année imprimée sur vos titres et leur support : le simulateur donne la date limite de validité des titres-restaurant et le dernier jour pour les échanger.',
    resume: `La validité des titres-restaurant suit leur millésime, c'est-à-dire l'année pour laquelle ils ont été émis. Un titre se dépense pendant cette année civile, puis pendant un délai supplémentaire au début de l'année suivante : deux mois pour une carte ou une application, un mois pour le papier, selon l'article R. 3262-5 du code du travail. Les titres de 2026 sur carte restent donc valables jusqu'au ${day(c26.dernierJour, 'fr')}, ceux sur papier jusqu'au ${day(p26.dernierJour, 'fr')}. À l'échéance, le salarié dispose encore de ${VA.joursEchange} jours pour les échanger contre des titres du nouveau millésime, soit jusqu'au ${day(c26.finEchange, 'fr')} pour une carte. Après, la valeur est définitivement perdue pour lui. En pratique, la plupart des émetteurs de cartes font ce roulement automatiquement, et la règle de l'échange concerne surtout le papier. Les titres périmés représentaient ${M.contreValeurPerimes2024Millions.toLocaleString('fr-FR')} millions d'euros en 2024 selon le rapport du Sénat. La validité de trois ans votée par l'Assemblée nationale a été retirée par la commission du Sénat.`,
    faqs: [
      { q: 'Puis-je utiliser mes titres 2027 avant d\'avoir fini ceux de 2026 ?', a: 'Non. Les titres d\'une nouvelle année ne peuvent pas être utilisés tant que ceux de l\'année écoulée ne sont pas épuisés, selon service-public.fr. Avec une carte, vérifiez le solde de chaque millésime dans l\'application de l\'émetteur. Avec du papier, utilisez les carnets les plus anciens en premier pour ne rien perdre au moment de l\'échéance.' },
      { q: 'Comment échanger des titres papier périmés ?', a: `Rapportez-les à votre employeur dans les ${VA.joursEchange} jours qui suivent la date limite. Il les transmet à l'émetteur, qui les remplace par des titres du millésime en cours. Passé ce délai, l'échange n'est plus possible. Pensez à garder les carnets complets et lisibles : c'est l'employeur qui les rassemble pour l'émetteur.` },
      { q: 'Que deviennent les titres que personne n\'a utilisés ?', a: `Leur valeur est perdue pour le salarié. Le rapport du Sénat chiffre la contre-valeur des titres périmés à ${M.contreValeurPerimes2024Millions.toLocaleString('fr-FR')} millions d'euros pour 2024. La proposition de loi demande un rapport sur leur affectation et sécurise la possibilité de donner ses titres à une association d'aide alimentaire habilitée.` },
    ],
    body: (h) => `<h2>La validité des titres-restaurant, millésime par millésime</h2>
<p>Le calcul part de l'année du titre. On ajoute un an, puis deux mois pour la carte ou un mois pour le papier, et on s'arrête au dernier jour de ce mois. Les ${VA.joursEchange} jours d'échange courent ensuite. La ${h.src('sp', 'fiche service-public.fr')} donne la règle générale ; le ${h.src('rapport', 'rapport du Sénat')} distingue la carte et le papier et rappelle qu'un titre dématérialisé de 2026 vaut jusqu'au ${h.day(c26.dernierJour)}.</p>
${h.table(['Millésime', 'Carte : dernier jour', 'Papier : dernier jour', 'Carte : fin de l\'échange'], millesimes.map((m) => { const c = validite(m, 'carte'), p = validite(m, 'papier'); return [String(m), h.day(c.dernierJour), h.day(p.dernierJour), h.day(c.finEchange)]; }), 'Dates limites par millésime, règle actuelle', ['l', 'l', 'l', 'l'])}
<h2>Trois ans de validité : voté, puis retiré</h2>
<p>Le ${h.src('texteAN', 'texte de l\'Assemblée nationale')} portait la durée de validité à trois ans à partir du ${h.day(PPL.entreeVigueur)}. La ${h.src('texteCommission', 'commission du Sénat')} a supprimé cette mesure le ${h.day(PPL.commission)}, pour écarter tout risque de remise en cause du régime social et fiscal du titre. Le texte final reste à écrire.</p>
<h2>Ne rien perdre en fin d'année</h2>
<p>En décembre, comparez votre solde au nombre de jours travaillés qui restent. Un départ en congé ou un ${h.a('absences', 'arrêt maladie')} diminue le nombre de titres reçus, mais pas le solde déjà crédité : c'est souvent là que les titres s'accumulent.</p>`,
  },
  en: {
    slug: 'expiry-date',
    nav: 'Expiry date', card: 'The last day to use your 2026 vouchers, on a card or on paper, and the window to exchange them',
    title: 'Meal voucher expiry date 2026: last day and exchange window',
    description: 'French meal voucher expiry date for 2026 vouchers: 28 February 2027 on a card, 31 January 2027 on paper, then 15 days to exchange. Worked out for each year.',
    h1: 'Meal voucher expiry date: when your 2026 vouchers run out',
    intro: 'Choose the year printed on your vouchers and their format: the simulator gives the meal voucher expiry date and the last day to exchange them.',
    resume: `A French meal voucher's expiry date follows its vintage, meaning the year it was issued for. A voucher can be spent during that calendar year, then for an extra period at the start of the following year: two months for a card or app, one month for paper, under article R. 3262-5 of the Labour Code. 2026 vouchers on a card are therefore valid until ${day(c26.dernierJour, 'en')}, paper ones until ${day(p26.dernierJour, 'en')}. Once they expire, the employee still has ${VA.joursEchange} days to exchange them for vouchers of the new year, up to ${day(c26.finEchange, 'en')} for a card. After that the value is lost for good. In practice, most card issuers roll balances over automatically, so the exchange rule mainly matters for paper. Expired vouchers were worth ${M.contreValeurPerimes2024Millions.toLocaleString('en-GB')} million euros in 2024, according to the Senate report. The three-year validity passed by the National Assembly was removed by the Senate committee, so the current dates still apply.`,
    faqs: [
      { q: 'Can I use my 2027 vouchers before finishing the 2026 ones?', a: 'No. Vouchers for a new year cannot be used until those of the previous year are used up, according to service-public.fr. With a card, check the balance of each year in the issuer\'s app. With paper, use the oldest books first so that nothing is lost at the deadline.' },
      { q: 'How do I exchange expired paper vouchers?', a: `Take them back to your employer within ${VA.joursEchange} days of the deadline. The employer sends them to the issuer, which replaces them with vouchers of the current year. After that window, no exchange is possible. Keep the books whole and readable: the employer gathers them for the issuer.` },
      { q: 'What happens to vouchers nobody uses?', a: `Their value is lost to the employee. The Senate report puts the value of expired vouchers at ${M.contreValeurPerimes2024Millions.toLocaleString('en-GB')} million euros for 2024. The bill asks for a report on where that money goes and secures the option of giving your vouchers to an approved food aid charity.` },
    ],
    body: (h) => `<h2>Meal voucher expiry date, year by year</h2>
<p>The calculation starts from the voucher's year. Add one year, then two months for a card or one month for paper, and stop at the last day of that month. The ${VA.joursEchange} exchange days run after that. The ${h.src('sp', 'service-public.fr guidance')} gives the general rule; the ${h.src('rapport', 'Senate report')} separates card and paper and confirms that a 2026 digital voucher is valid until ${h.day(c26.dernierJour)}.</p>
${h.table(['Year', 'Card: last day', 'Paper: last day', 'Card: end of exchange'], millesimes.map((m) => { const c = validite(m, 'carte'), p = validite(m, 'papier'); return [String(m), h.day(c.dernierJour), h.day(p.dernierJour), h.day(c.finEchange)]; }), 'Deadlines by vintage, current rule', ['l', 'l', 'l', 'l'])}
<h2>Three-year validity: passed, then removed</h2>
<p>The ${h.src('texteAN', 'National Assembly text')} extended validity to three years from ${h.day(PPL.entreeVigueur)}. The ${h.src('texteCommission', 'Senate committee')} removed the measure on ${h.day(PPL.commission)}, to rule out any risk to the voucher's social and tax treatment. The final text is still to be written.</p>
<h2>Losing nothing at year end</h2>
<p>In December, compare your balance with the working days left. Holidays or ${h.a('absences', 'sick leave')} reduce the number of vouchers you receive, but not the balance already credited: that is often where vouchers pile up.</p>`,
  },
});
