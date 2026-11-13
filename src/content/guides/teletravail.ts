import { defineGuide } from '../../lib/page-types';
import { eur } from './_f';
import { titresDuMois, mois } from '../../lib/engine/tr';

/* Télétravail et temps partiel : service-public F21059 (CDI, CDD, temps plein ou partiel, intérimaire, apprenti, stagiaire,
   télétravailleur ; un titre par repas compris dans l'horaire de travail journalier ; l'employeur fixe le nombre de titres). */
const cas: Array<[string, string, number, number]> = [
  ['Temps plein, 5 jours sur site', 'Full time, 5 days on site', 21, 0],
  ['Temps plein, 3 jours de télétravail', 'Full time, 3 days from home', 21, 0],
  ['4 jours par semaine (80 %)', '4 days a week (80%)', 17, 0],
  ['Mi-temps le matin seulement', 'Half time, mornings only', 21, 21],
  ['Mi-temps sur 2,5 jours complets', 'Half time over 2.5 full days', 11, 0],
];
const m17 = mois(titresDuMois(17), 9, 50);

export default defineGuide({
  id: 'teletravail', group: 'regles', order: 7,
  tool: 'mois',
  related: ['absences', 'home', 'employeur', 'exoneration'],
  sources: ['sp', 'rapport'],
  fr: {
    slug: 'teletravail-temps-partiel',
    nav: 'Télétravail et temps partiel', card: 'Combien de titres par mois en télétravail, à 80 % ou à mi-temps, et pourquoi la pause repas compte',
    title: 'Titre-restaurant en télétravail 2026 : temps partiel inclus',
    description: 'Titre-restaurant en télétravail et à temps partiel en 2026 : mêmes droits qu\'au bureau, un titre par jour avec pause repas. Simulateur des titres du mois.',
    h1: 'Titre-restaurant en télétravail et à temps partiel : vos droits en 2026',
    intro: 'Tapez les jours travaillés du mois, au bureau comme à la maison, et les jours sans pause repas : le simulateur donne vos titres-restaurant du mois en télétravail ou à temps partiel, et ce qu\'ils représentent.',
    resume: `Le titre-restaurant en télétravail obéit à la même règle qu'au bureau : un titre par repas compris dans l'horaire de travail de la journée. Service-public.fr cite expressément le télétravailleur parmi les bénéficiaires, au même titre que les salariés en CDI ou en CDD, à temps plein ou à temps partiel, les intérimaires, les apprentis et les stagiaires. Un employeur qui distribue des titres ne peut donc pas en priver les jours de télétravail si l'horaire comprend une pause déjeuner. Le temps partiel suit la même logique : ce n'est pas le pourcentage du contrat qui compte, mais l'organisation de la journée. Un salarié à 80 % sur quatre jours complets reçoit un titre pour chacun de ces jours, soit ${m17.n} titres un mois de dix-sept jours travaillés. Un mi-temps effectué uniquement le matin, sans pause repas dans l'horaire, n'ouvre droit à aucun titre. Avec des titres de ${eur(9, 'fr')} payés à moitié, ${m17.n} titres font ${eur(m17.credite, 'fr')} crédités, dont ${eur(m17.employeur, 'fr')} payés par l'employeur. L'employeur reste libre de fixer le nombre de titres attribués, dans cette limite d'un par repas.`,
    faqs: [
      { q: 'Mon employeur peut-il supprimer les titres-restaurant les jours de télétravail ?', a: 'Non, si l\'horaire de ces journées comprend un repas. Le télétravailleur a les mêmes droits que le salarié présent dans les locaux, et service-public.fr le range explicitement parmi les bénéficiaires. Une note interne qui réserverait les titres aux jours sur site crée une différence de traitement contestable : signalez-la aux représentants du personnel ou aux ressources humaines.' },
      { q: 'J\'ai une demi-journée de travail : ai-je droit à un titre ?', a: 'Seulement si la pause repas tombe dans votre horaire de travail. Une matinée de 8 h à 12 h ne comprend pas de repas : pas de titre. Une journée de 10 h à 15 h avec une pause déjeuner en donne un. Le simulateur vous laisse retirer ces jours sans repas du total du mois.' },
      { q: 'Les stagiaires et les intérimaires reçoivent-ils aussi des titres ?', a: 'Oui, dans les mêmes conditions que les autres salariés de l\'entreprise. Service-public.fr les cite parmi les bénéficiaires, comme les apprentis. La règle du repas compris dans l\'horaire vaut pour eux aussi : une journée avec pause déjeuner donne un titre, une matinée seule n\'en donne pas.' },
    ],
    body: (h) => `<h2>Combien de titres-restaurant en télétravail ou à temps partiel</h2>
<p>Le nombre de titres dépend des journées, pas du lieu. Le tableau compte les titres d'un mois type selon cinq organisations courantes, avec des titres de ${h.eur(9)} payés à moitié par l'employeur. La règle vient de la ${h.src('sp', 'fiche service-public.fr')} : un titre par repas compris dans l'horaire de travail journalier.</p>
${h.table(['Organisation', 'Titres du mois', 'Part employeur'], cas.map(([fr, , j, s]) => { const t = titresDuMois(j, s); return [fr, String(t), h.eur(mois(t, 9, 50).employeur)]; }), 'Titres d\'un mois type, titres de 9 € à 50 %', ['l', 'r', 'r'])}
<h2>Ce qui fait perdre un titre</h2>
<p>Une journée sans pause repas, un jour de congé ou une absence ne donnent pas de titre. À l'inverse, un jour de télétravail avec une pause déjeuner en donne un, exactement comme un jour au bureau. Le ${h.src('rapport', 'rapport du Sénat')} rappelle que le titre finance le repas de la journée de travail : c'est ce lien qui justifie l'exonération. Les absences ont leur ${h.a('absences', 'page dédiée')}.</p>
<h2>Vérifier son compte de titres chaque mois</h2>
<p>Comparez le nombre de titres reçus au nombre de jours travaillés avec une pause repas, au bureau comme à la maison. Un écart régulier les jours de télétravail mérite une question au service des ressources humaines : la règle ne dépend pas du lieu. Si l'entreprise distribue des titres, elle doit le faire pour tous les salariés dans les mêmes conditions. Pour le coût côté entreprise, voyez la page du ${h.a('employeur', 'coût employeur')}.</p>`,
  },
  en: {
    slug: 'remote-part-time',
    nav: 'Remote work and part time', card: 'How many vouchers a month when working from home, at 80% or half time, and why the meal break matters',
    title: 'Meal vouchers when working from home 2026: rights, part time',
    description: 'French meal vouchers when working from home or part time in 2026: same rights as at the office, one voucher per day with a meal break. Monthly simulator.',
    h1: 'Meal vouchers when working from home or part time: your rights in 2026',
    intro: 'Enter the days worked this month, at the office or at home, and the days with no meal break: the simulator gives your meal vouchers when working from home or part time, and what they are worth.',
    resume: `French meal vouchers when working from home follow the same rule as at the office: one voucher per meal falling within the working day. Service-public.fr expressly lists remote workers among those entitled, alongside employees on permanent or fixed-term contracts, full or part time, temps, apprentices and interns. An employer that hands out vouchers therefore cannot withhold them on home-working days if the hours include a lunch break. Part time follows the same logic: what counts is not the contract percentage but how the day is organised. An employee at 80% working four full days receives a voucher for each of them, that is ${m17.n} vouchers in a month of seventeen working days. A half-time job worked only in the mornings, with no meal break in the hours, gives no vouchers. With ${eur(9, 'en')} vouchers paid half and half, ${m17.n} vouchers mean ${eur(m17.credite, 'en')} credited, of which ${eur(m17.employeur, 'en')} is paid by the employer. The employer remains free to set the number of vouchers, within that limit of one per meal.`,
    faqs: [
      { q: 'Can my employer stop meal vouchers on home-working days?', a: 'No, if the hours on those days include a meal. Remote workers have the same rights as staff on the premises, and service-public.fr lists them explicitly among those entitled. An internal note restricting vouchers to office days creates a difference in treatment that can be challenged: raise it with staff representatives or HR.' },
      { q: 'I work a half day: am I entitled to a voucher?', a: 'Only if the meal break falls within your working hours. A morning from 8 am to noon includes no meal: no voucher. A day from 10 am to 3 pm with a lunch break gives one. The simulator lets you take those days without a meal out of the monthly total.' },
      { q: 'Do interns and temps get vouchers too?', a: 'Yes, on the same terms as the company\'s other employees. Service-public.fr lists them among those entitled, as it does apprentices. The meal-in-working-hours rule applies to them too: a day with a lunch break gives a voucher, a morning alone does not.' },
    ],
    body: (h) => `<h2>How many meal vouchers when working from home or part time</h2>
<p>The number of vouchers depends on the days, not the place. The table counts the vouchers in a typical month for five common working patterns, with ${h.eur(9)} vouchers half paid by the employer. The rule comes from the ${h.src('sp', 'service-public.fr guidance')}: one voucher per meal within the daily working hours.</p>
${h.table(['Working pattern', 'Vouchers in the month', 'Employer share'], cas.map(([, en, j, s]) => { const t = titresDuMois(j, s); return [en, String(t), h.eur(mois(t, 9, 50).employeur)]; }), 'Vouchers in a typical month, €9 vouchers at 50%', ['l', 'r', 'r'])}
<h2>What costs you a voucher</h2>
<p>A day with no meal break, a day of leave or an absence gives no voucher. Conversely, a home-working day with a lunch break gives one, exactly like an office day. The ${h.src('rapport', 'Senate report')} recalls that the voucher pays for the meal of the working day: that link is what justifies the exemption. Absences have their ${h.a('absences', 'own page')}.</p>
<h2>Checking your voucher count each month</h2>
<p>Compare the number of vouchers received with the days worked that included a meal break, at the office or at home. A recurring gap on home-working days is worth raising with HR: the rule does not depend on where you work. If the company hands out vouchers, it must do so for all staff on the same terms. For the company side, see the ${h.a('employeur', 'employer cost')} page.</p>`,
  },
});
