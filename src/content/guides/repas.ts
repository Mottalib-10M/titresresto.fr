import { defineGuide } from '../../lib/page-types';
import { eur, U, EX, PL, M } from './_f';
import { dejeuner } from '../../lib/engine/tr';

/* Ticket repas : un titre par repas compris dans l'horaire de travail, part employeur 50 à 60 %, 25 € par jour
   (service-public F21059) ; valeur moyenne d'un titre en 2024 (rapport du Sénat n° 141). */
const prix = [8, 12, 15, 20] as const;
const ex = dejeuner(14, 10, 50, 20);

export default defineGuide({
  id: 'repas', group: 'essentiel', order: 12,
  tool: 'repas',
  related: ['ticket', 'teletravail', 'home', 'plafond'],
  sources: ['sp', 'rapport'],
  fr: {
    slug: 'ticket-repas',
    nav: 'Ticket repas', card: 'Le coût réel de votre déjeuner une fois retirée la part payée par l\'employeur',
    title: 'Ticket repas 2026 : ce que vous coûte vraiment le déjeuner',
    description: 'Ticket repas en 2026 : l\'employeur paie 50 à 60 % du titre, vous payez le reste par retenue. Simulateur : le coût réel de votre déjeuner, par repas et par mois.',
    h1: 'Ticket repas 2026 : ce que vous coûte vraiment votre déjeuner',
    intro: 'Tapez le prix de votre déjeuner, la valeur de votre ticket repas et la part payée par l\'employeur : le simulateur donne ce que le repas vous coûte vraiment, une fois retirée la part de l\'employeur.',
    resume: `Le ticket repas est le titre-restaurant vu depuis la table du déjeuner : un titre par jour travaillé dont l'horaire comprend un repas. Une partie de sa valeur est payée par l'employeur, entre ${EX.tauxMin} % et ${EX.tauxMax} %, et le reste par vous, retenu sur la fiche de paie. Ce qui compte pour votre budget, c'est donc le prix du repas moins la part de l'employeur, pas la valeur du titre. Un déjeuner de ${eur(14, 'fr')} payé avec un titre de ${eur(10, 'fr')} financé à moitié vous coûte ${eur(ex.coutReel, 'fr')} : ${eur(5, 'fr')} retenus sur la paie et ${eur(ex.complement, 'fr')} en caisse. Sur vingt déjeuners, l'employeur prend ${eur(ex.employeurMois, 'fr')} à sa charge. La dépense reste limitée à ${eur(U.plafondJour, 'fr')} par jour, et la part de l'employeur est exonérée jusqu'à ${eur(PL, 'fr')} par titre en 2026.`,
    faqs: [
      { open: true, q: 'Le ticket repas me fait-il vraiment économiser ?', a: 'Oui, de la part payée par l\'employeur. La part que vous payez vous-même est retenue sur votre salaire : ce n\'est pas un cadeau, c\'est une avance que vous dépensez ensuite. Le gain net, sans cotisation ni impôt, est la contribution de l\'employeur, multipliée par le nombre de titres reçus.' },
      { q: 'Où voit-on la part du ticket repas payée par le salarié ?', a: `Sur la fiche de paie, en retenue : c'est la valeur du titre moins la part de l'employeur, multipliée par le nombre de titres du mois. Avec vingt titres de ${eur(10, 'fr')} financés à moitié, la retenue est de ${eur(100, 'fr')}. La part de l'employeur n'y apparaît comme salaire que si elle dépasse ${eur(PL, 'fr')} par titre ou sort de la fourchette légale.` },
      { q: 'Que se passe-t-il si mon déjeuner coûte moins que le ticket repas ?', a: 'Avec une carte, seul le prix exact est débité et le reste demeure sur votre solde pour un autre repas. Avec un titre papier, la monnaie n\'est pas rendue : un sandwich moins cher que le titre fait perdre la différence. Dans les deux cas, le plafond journalier de 25 € s\'applique à ce que vous dépensez.' },
    ],
    body: (h) => `<h2>Le coût réel d'un déjeuner avec un ticket repas</h2>
<p>Le simulateur part du prix que vous payez à table et retire la part de l'employeur sur un titre. Le tableau fait le calcul pour quatre déjeuners, avec un titre de ${h.eur(10)} payé à moitié par l'employeur. Plus le repas est cher, plus la part de l'employeur pèse peu dans l'addition : elle reste fixe, quel que soit le menu.</p>
${h.table(['Prix du déjeuner', 'Payé avec le titre', 'Complément en caisse', 'Coût réel pour vous'], prix.map((p) => { const r = dejeuner(p, 10, 50, 20); return [h.eur(p), h.eur(r.enTitres, 2), h.eur(r.complement, 2), h.eur(r.coutReel, 2)]; }), 'Titre de 10 €, employeur à 50 %, un titre par déjeuner', ['l', 'r', 'r', 'r'])}
<h2>Qui a droit au ticket repas</h2>
<p>La ${h.src('sp', 'fiche service-public.fr')} pose la règle : un titre par repas compris dans l'horaire de travail. Le temps partiel, le télétravail et l'intérim y ouvrent droit dans les mêmes conditions que les autres salariés, dès lors que l'employeur distribue des titres. Un jour sans pause repas, comme une demi-journée le matin, n'en donne pas. Le ${h.src('rapport', 'rapport du Sénat')} chiffre la valeur moyenne d'un titre à ${h.eur(M.valeurFacialeMoyenne2024, 2)} en 2024 : un déjeuner à ${h.eur(15)} laisse donc souvent plusieurs euros à compléter.</p>
<p>La page ${h.a('teletravail', 'télétravail et temps partiel')} calcule les titres dus dans le mois, et celle du ${h.a('ticket', 'ticket restaurant')} totalise une année entière.</p>`,
  },
  en: {
    slug: 'ticket-repas',
    nav: 'Ticket repas', card: 'The real cost of your lunch once the employer share is taken off',
    title: 'Ticket repas 2026: what your lunch in France really costs',
    description: 'Ticket repas in France for 2026: the employer pays 50 to 60% of the voucher, you pay the rest via payroll. Simulator: the real cost of lunch, per meal and month',
    h1: 'Ticket repas 2026: what your lunch really costs you',
    intro: 'Enter the price of your lunch, the value of your ticket repas and the share your employer pays: the simulator gives what the meal really costs you once the employer share is taken off.',
    resume: `The ticket repas is the French meal voucher seen from the lunch table: one voucher per working day whose hours include a meal. Part of its value is paid by the employer, between ${EX.tauxMin}% and ${EX.tauxMax}%, and the rest by you, deducted on your payslip. What matters for your budget is therefore the price of the meal minus the employer share, not the value of the voucher. A ${eur(14, 'en')} lunch paid with a ${eur(10, 'en')} voucher half funded by the employer costs you ${eur(ex.coutReel, 'en')}: ${eur(5, 'en')} deducted from pay and ${eur(ex.complement, 'en')} at the till. Over twenty lunches in a month, the employer covers ${eur(ex.employeurMois, 'en')}. Spending stays capped at ${eur(U.plafondJour, 'en')} a day, and the employer share is exempt up to ${eur(PL, 'en')} per voucher in 2026.`,
    faqs: [
      { open: true, q: 'Does the ticket repas really save me money?', a: 'Yes, by the share the employer pays. The part you pay yourself is deducted from your pay: it is not a gift, it is an advance that you spend later. The net gain, with no contributions or tax, is the employer contribution multiplied by the number of vouchers you receive.' },
      { q: 'Where does the employee share of a ticket repas show up?', a: `On your payslip, as a deduction: the voucher value minus the employer share, times the number of vouchers that month. With twenty ${eur(10, 'en')} vouchers half funded by the employer, the deduction is ${eur(100, 'en')}. The employer share only appears as pay if it exceeds ${eur(PL, 'en')} per voucher or falls outside the legal band.` },
      { q: 'What if my lunch costs less than the voucher?', a: 'With a card, only the exact price is debited and the rest stays on your balance for another meal. With a paper voucher, no change is given: a sandwich cheaper than the voucher loses the difference. Either way, the €25 daily limit applies to what you spend.' },
    ],
    body: (h) => `<h2>The real cost of a lunch with a ticket repas</h2>
<p>The simulator starts from the price you pay at the table and takes off the employer share of one voucher. The table works it out for four lunches, with a ${h.eur(10)} voucher half paid by the employer. The pricier the meal, the less the employer share weighs on the bill: it stays fixed, whatever the menu.</p>
${h.table(['Lunch price', 'Paid with the voucher', 'Top-up at the till', 'Real cost to you'], prix.map((p) => { const r = dejeuner(p, 10, 50, 20); return [h.eur(p), h.eur(r.enTitres, 2), h.eur(r.complement, 2), h.eur(r.coutReel, 2)]; }), '€10 voucher, employer at 50%, one voucher per lunch', ['l', 'r', 'r', 'r'])}
<h2>Who is entitled to a ticket repas</h2>
<p>The ${h.src('sp', 'service-public.fr guidance')} sets the rule: one voucher per meal that falls within working hours. Part-timers, remote workers and temps are entitled on the same terms as other staff, once the employer hands out vouchers. A day with no meal break, such as a morning-only half day, gives none. The ${h.src('rapport', 'Senate report')} puts the average voucher at ${h.eur(M.valeurFacialeMoyenne2024, 2)} in 2024: a ${h.eur(15)} lunch therefore often leaves several euros to top up.</p>
<p>The ${h.a('teletravail', 'remote and part-time work')} page works out the vouchers due in a month, and the ${h.a('ticket', 'ticket restaurant')} page adds up a whole year.</p>`,
  },
});
