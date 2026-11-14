import { defineGuide } from '../../lib/page-types';
import { eur, day, U, VA, M, PPL } from './_f';
import { papier, validite } from '../../lib/engine/tr';

/* Chèque restaurant : nom courant du titre-restaurant papier. Pas de rendu de monnaie, 25 € par jour (service-public
   F21059) ; papier valable jusqu'à fin janvier N+1 et échange quinze jours (rapport du Sénat n° 141, R. 3262-5) ;
   80 % de titres dématérialisés en 2024 (rapport n° 141) ; fin du papier en 2028 dans les deux versions du texte. */
const cas = [7.8, 13.5, 18, 26] as const;
const vp = validite(2026, 'papier');
const ex = papier(23.5, 9);

export default defineGuide({
  id: 'cheque', group: 'essentiel', order: 11,
  tool: 'papier',
  related: ['ticket', 'plafond', 'validite', 'reforme'],
  sources: ['sp', 'rapport', 'texteAN', 'texteCommission'],
  fr: {
    slug: 'cheque-restaurant',
    nav: 'Chèque restaurant', card: 'Combien de chèques donner pour une addition, et ce que coûte la monnaie non rendue',
    title: 'Chèque restaurant 2026 : combien en donner sans rien perdre',
    description: 'Chèque restaurant papier en 2026 : pas de monnaie rendue, 25 € par jour, valable jusqu\'à fin janvier 2027. Simulateur : combien de chèques donner sans perte.',
    h1: 'Chèque restaurant 2026 : combien en donner sans perdre de monnaie',
    intro: 'Tapez le montant de l\'addition et la valeur de vos chèques restaurant : le simulateur dit combien en donner sans rien perdre, le complément à payer et ce que la même addition coûterait avec une carte.',
    resume: `Le chèque restaurant est le nom courant du titre-restaurant sur papier, le carnet de coupons que l'employeur remet chaque mois. Il obéit aux mêmes règles que la carte : ${eur(U.plafondJour, 'fr')} de dépense au plus par jour, les jours ouvrables, dans le département de travail et ceux qui le touchent. Une différence pèse pourtant chaque midi : le commerçant ne rend pas la monnaie. Pour une addition de ${eur(23.5, 'fr')} avec des chèques de ${eur(9, 'fr')}, deux chèques laissent ${eur(ex.complement, 'fr')} à payer autrement ; un troisième chèque ferait perdre ${eur(ex.perte, 'fr')}. Les chèques 2026 sur papier se dépensent jusqu'au ${day(vp.dernierJour, 'fr')}, puis s'échangent pendant ${VA.joursEchange} jours. Selon le rapport du Sénat, ${M.partDemat2024} % des titres étaient déjà dématérialisés en 2024, et la proposition de loi en discussion supprimerait le papier à partir du ${day(PPL.entreeVigueur, 'fr')} si elle est votée.`,
    faqs: [
      { open: true, q: 'Le commerçant doit-il rendre la monnaie sur un chèque restaurant ?', a: 'Non. Sur un titre papier, la différence entre la valeur du chèque et le prix n\'est pas rendue. Pour ne rien perdre, donnez des chèques jusqu\'à un montant inférieur à l\'addition et payez le complément par carte bancaire ou en espèces. Avec une carte de titres, la question ne se pose pas : le montant exact est débité.' },
      { q: 'Peut-on donner quatre chèques de 9 € pour un repas à 34 € ?', a: `Non. Les chèques donnés le même jour ne peuvent pas dépasser ${eur(U.plafondJour, 'fr')} en tout. Avec des chèques de ${eur(9, 'fr')}, deux passent, soit ${eur(18, 'fr')} ; un troisième porterait le total à ${eur(27, 'fr')}, au-dessus de la limite. Le reste de l'addition se paie autrement, quel que soit le nombre de chèques que vous avez dans votre carnet.` },
      { q: 'Que faire des chèques restaurant de l\'an dernier ?', a: `Les chèques papier de 2026 restent valables jusqu'au ${day(vp.dernierJour, 'fr')}. Ensuite, rendez-les à votre employeur dans les ${VA.joursEchange} jours, jusqu'au ${day(vp.finEchange, 'fr')}, pour les échanger contre des titres neufs. Après cette date, leur valeur est perdue pour vous. Vérifiez l'année imprimée sur chaque coupon avant de partir en vacances.` },
    ],
    body: (h) => `<h2>Payer une addition en chèque restaurant</h2>
<p>Le simulateur cherche le nombre de chèques qui reste sous l'addition, pour que rien ne soit perdu, puis indique ce qu'un chèque de plus coûterait. Il tient compte du plafond journalier, rappelé par la ${h.src('sp', 'fiche service-public.fr')} : la somme des chèques d'une journée ne dépasse pas ${h.eur(U.plafondJour)}. Le tableau donne quatre additions payées avec des chèques de ${h.eur(9)}.</p>
${h.table(['Addition', 'Chèques sans perte', 'Complément', 'Un chèque de plus'], cas.map((a) => { const r = papier(a, 9); return [h.eur(a, 2), r.bas, h.eur(r.complement, 2), r.plusOk ? `${h.eur(r.pertePlus, 2)} perdus` : `impossible : plafond de ${h.eur(U.plafondJour)}`]; }), 'Chèques de 9 €, un jour de semaine, règles de 2026', ['l', 'r', 'r', 'l'])}
<h2>Pourquoi le papier recule</h2>
<p>La monnaie non rendue est l'une des raisons pour lesquelles les salariés passent à la carte : le ${h.src('rapport', 'rapport du Sénat')} relève que ${M.partDemat2024} % des titres étaient dématérialisés en 2024. Le ${h.src('texteAN', 'texte de l\'Assemblée nationale')} et le ${h.src('texteCommission', 'texte de la commission du Sénat')} prévoient tous deux un titre uniquement dématérialisé à partir de 2028. Tant que la loi n'est pas promulguée, le papier reste autorisé.</p>
<p>Les règles de date sont plus courtes pour le papier que pour la carte : un mois de moins après la fin de l'année. La page ${h.a('validite', 'validité des titres')} donne les dates de chaque millésime, et celle du ${h.a('plafond', 'plafond de 25 € par jour')} montre comment se répartit une addition plus élevée.</p>`,
  },
  en: {
    slug: 'cheque-restaurant',
    nav: 'Chèque restaurant', card: 'How many paper vouchers to hand over for a bill, and what the missing change costs',
    title: 'Chèque restaurant 2026: how many to use without losing',
    description: 'Paper chèque restaurant in France for 2026: no change given, €25 a day, valid until end of January 2027. Simulator: how many vouchers to hand over at no loss.',
    h1: 'Chèque restaurant 2026: how many to hand over without losing change',
    intro: 'Enter the bill and the value of your chèque restaurant vouchers: the simulator says how many to hand over without losing anything, the top-up to pay and what the same bill would cost with a card.',
    resume: `Chèque restaurant is the everyday French name for the paper titre-restaurant, the booklet of coupons the employer hands out each month. It follows the same rules as the card: at most ${eur(U.plafondJour, 'en')} of spending a day, on working days, in the département where you work and the ones bordering it. One difference matters every lunchtime, though: the shop gives no change. For a ${eur(23.5, 'en')} bill with ${eur(9, 'en')} vouchers, two vouchers leave ${eur(ex.complement, 'en')} to pay another way; a third one would lose ${eur(ex.perte, 'en')}. Paper vouchers from 2026 can be spent until ${day(vp.dernierJour, 'en')}, then exchanged for ${VA.joursEchange} days. According to the Senate report, ${M.partDemat2024}% of vouchers were already digital in 2024, and the bill now in Parliament would end paper from ${day(PPL.entreeVigueur, 'en')} if it passes.`,
    faqs: [
      { open: true, q: 'Does the shop have to give change on a paper meal voucher?', a: 'No. On a paper voucher, the difference between its value and the price is not given back. To lose nothing, hand over vouchers up to an amount below the bill and pay the rest by bank card or cash. With a voucher card the question does not arise: the exact amount is debited.' },
      { q: 'Can I hand over four €9 vouchers for a €34 meal?', a: `No. Vouchers used on the same day cannot exceed ${eur(U.plafondJour, 'en')} in total. With ${eur(9, 'en')} vouchers, two go through, ${eur(18, 'en')} in all; a third would bring the total to ${eur(27, 'en')}, above the limit. The rest of the bill is paid another way, however many vouchers you have in your booklet.` },
      { q: 'What should I do with last year\'s paper vouchers?', a: `Paper vouchers from 2026 stay valid until ${day(vp.dernierJour, 'en')}. After that, give them back to your employer within ${VA.joursEchange} days, by ${day(vp.finEchange, 'en')}, to swap them for new ones. After that date, their value is lost to you. Check the year printed on each coupon before you go on holiday.` },
    ],
    body: (h) => `<h2>Paying a bill with chèque restaurant vouchers</h2>
<p>The simulator looks for the number of vouchers that stays below the bill, so nothing is lost, then shows what one more voucher would cost. It takes the daily limit into account, as set out in the ${h.src('sp', 'service-public.fr guidance')}: the vouchers used in a day add up to no more than ${h.eur(U.plafondJour)}. The table gives four bills paid with ${h.eur(9)} vouchers.</p>
${h.table(['Bill', 'Vouchers at no loss', 'Top-up', 'One more voucher'], cas.map((a) => { const r = papier(a, 9); return [h.eur(a, 2), r.bas, h.eur(r.complement, 2), r.plusOk ? `${h.eur(r.pertePlus, 2)} lost` : `not allowed: ${h.eur(U.plafondJour)} limit`]; }), '€9 vouchers, on a weekday, 2026 rules', ['l', 'r', 'r', 'l'])}
<h2>Why paper is fading</h2>
<p>The missing change is one reason staff move to cards: the ${h.src('rapport', 'Senate report')} notes that ${M.partDemat2024}% of vouchers were digital in 2024. The ${h.src('texteAN', 'National Assembly text')} and the ${h.src('texteCommission', 'Senate committee text')} both provide for card-only vouchers from 2028. Until the law is enacted, paper remains allowed.</p>
<p>Date rules are shorter for paper than for cards: one month less after the end of the year. The ${h.a('validite', 'voucher expiry')} page gives the dates for each year, and the ${h.a('plafond', '€25 daily limit')} page shows how a higher bill is split.</p>`,
  },
});
