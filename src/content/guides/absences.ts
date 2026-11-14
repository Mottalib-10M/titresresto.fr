import { defineGuide } from '../../lib/page-types';
import { eur, day, PPL } from './_f';
import { titresDuMois, mois } from '../../lib/engine/tr';

/* Absences : rapport du Sénat n° 141 (pas de titre les jours non travaillés : congés payés, arrêt maladie, AT-MP, congés de
   naissance ; maintien possible mais sans exonération ; titres déjà cumulés utilisables ; traitement identique) ;
   texte AN n° 32 (art. 2 bis) ; texte de la commission n° 142 (suppression). */
const perte = (abs: number) => mois(abs, 10, 50);
const cas: Array<[string, string, number, number]> = [
  ['Une semaine de congés payés', 'One week of paid leave', 21, 5],
  ['Trois jours d\'arrêt maladie', 'Three days of sick leave', 21, 3],
  ['Deux semaines d\'arrêt', 'Two weeks of sick leave', 21, 10],
  ['Un mois entier de congé de naissance', 'A full month of birth-related leave', 21, 21],
];
const c5 = perte(5);

export default defineGuide({
  id: 'absences', group: 'regles', order: 8,
  tool: 'absence',
  related: ['teletravail', 'validite', 'reforme', 'home'],
  sources: ['rapport', 'texteAN', 'texteCommission', 'sp'],
  fr: {
    slug: 'arret-maladie-conges',
    nav: 'Arrêt maladie et congés', card: 'Combien de titres en moins pendant un arrêt, des congés ou un congé de naissance, et ce que l\'on garde',
    title: 'Titre-restaurant en arrêt maladie 2026 : congés et absences',
    description: 'Titre-restaurant en arrêt maladie, en congés ou en congé de naissance en 2026 : pas de titre les jours non travaillés, sauf accord. Calcul des titres perdus.',
    h1: 'Titre-restaurant en arrêt maladie, congés et absences : la règle en 2026',
    intro: 'Tapez les jours de travail prévus et les jours d\'absence du mois : le simulateur calcule combien de titres-restaurant vous perdez en arrêt maladie ou en congés, et ce que cela change sur la paie.',
    resume: `En arrêt maladie, le titre-restaurant n'est en principe pas dû pour les jours non travaillés. Le titre finance le repas pris pendant la journée de travail : un jour sans travail ne donne pas de titre, quel qu'en soit le motif. Le rapport du Sénat cite les congés payés, l'arrêt maladie, l'accident du travail, le congé de maternité, de paternité ou d'adoption. Une semaine de congés sur un mois de vingt et un jours retire donc cinq titres ; avec des titres de ${eur(10, 'fr')} payés à moitié, c'est ${eur(c5.employeur, 'fr')} de part patronale en moins, mais aussi ${eur(c5.retenue, 'fr')} de retenue en moins sur la paie. Les titres déjà reçus restent utilisables pendant l'absence, dans les conditions habituelles. L'employeur peut décider de maintenir les titres pendant certaines absences, mais ces titres perdent alors l'exonération de cotisations, et il doit traiter de la même façon tous les salariés dans la même situation. L'Assemblée nationale avait voté le maintien obligatoire des titres pendant les congés liés à la naissance ; la commission du Sénat l'a supprimé le ${day(PPL.commission, 'fr')}.`,
    faqs: [
      { q: 'Puis-je utiliser mes titres pendant un arrêt maladie ?', a: 'Oui. Les titres déjà crédités ou remis restent à vous et s\'utilisent normalement pendant l\'arrêt, dans les limites habituelles de jour, de plafond et de lieu. Ce qui change, c\'est le nombre de titres reçus le mois suivant : les jours d\'arrêt n\'en donnent pas, et la retenue sur salaire baisse d\'autant.' },
      { q: 'Mon employeur peut-il continuer à me donner des titres pendant mon congé maternité ?', a: 'Il le peut, mais ce n\'est pas une obligation en l\'état du droit. S\'il le fait, ces titres ne bénéficient pas de l\'exonération de cotisations, et il doit les accorder à toutes les salariées dans la même situation. L\'obligation votée par l\'Assemblée nationale pour les congés de naissance a été retirée par la commission du Sénat.' },
      { q: 'Les jours de RTT (réduction du temps de travail) donnent-ils droit à un titre-restaurant ?', a: 'Non. Un jour de réduction du temps de travail est un jour non travaillé, comme un jour de congé : il ne comprend pas de repas dans l\'horaire de travail, donc pas de titre. Retirez-les du nombre de jours travaillés dans le simulateur pour connaître vos titres du mois.' },
    ],
    body: (h) => `<h2>Titre-restaurant en arrêt maladie ou en congés : le calcul</h2>
<p>On part des jours de travail prévus dans le mois et on retire les jours d'absence. Chaque jour retiré fait perdre un titre, donc la part de l'employeur, mais aussi votre retenue. Le tableau applique la règle à un mois de vingt et un jours, avec des titres de ${h.eur(10)} payés à moitié. Elle est exposée en détail dans le ${h.src('rapport', 'rapport du Sénat')}, qui rappelle que l'usage des titres déjà cumulés reste permis pendant l'absence.</p>
${h.table(['Absence', 'Titres du mois', 'Part employeur perdue'], cas.map(([fr, , j, a]) => [fr, String(titresDuMois(j, 0, a)), h.eur(perte(a).employeur)]), 'Mois de 21 jours, titres de 10 € à 50 %', ['l', 'r', 'r'])}
<h2>Le maintien pendant les congés de naissance, voté puis retiré</h2>
<p>L'article 2 bis du ${h.src('texteAN', 'texte de l\'Assemblée nationale')} obligeait l'employeur à maintenir les titres pendant les congés de maternité, de paternité et d'accueil de l'enfant, d'adoption et le congé supplémentaire de naissance. Le ${h.src('texteCommission', 'texte de la commission du Sénat')} ne le reprend pas, pour ne pas fragiliser le régime social et fiscal du titre. Rien n'est voté : aujourd'hui, le maintien reste un choix de l'employeur, sans exonération.</p>
<h2>Ce qu'il faut vérifier sur la fiche de paie</h2>
<p>Le mois qui suit une absence, la retenue doit baisser du même nombre de titres. Si elle reste identique alors que vous avez reçu moins de titres, demandez une régularisation. En ${h.a('teletravail', 'télétravail ou à temps partiel')}, la même logique s'applique jour par jour, et la ${h.a('validite', 'date limite')} des titres ne change pas avec l'absence.</p>`,
  },
  en: {
    slug: 'sick-leave-holidays',
    nav: 'Sick leave and holidays', card: 'How many fewer vouchers during sick leave, holidays or parental leave, and what you keep',
    title: 'Meal vouchers during sick leave 2026: holidays and absences',
    description: 'French meal vouchers during sick leave, holidays or parental leave in 2026: none for days not worked, unless the employer chooses. The vouchers you lose.',
    h1: 'Meal vouchers during sick leave, holidays and absences: the 2026 rule',
    intro: 'Enter the working days planned and the days off this month: the simulator works out how many meal vouchers you lose during sick leave or holidays, and what that changes on your payslip.',
    resume: `During sick leave, French meal vouchers are in principle not due for the days not worked. The voucher pays for the meal taken during the working day: a day without work gives no voucher, whatever the reason. The Senate report lists paid leave, sick leave, workplace accidents, and maternity, paternity or adoption leave. A week of holiday in a twenty-one-day month therefore removes five vouchers; with ${eur(10, 'en')} vouchers half paid by the employer, that is ${eur(c5.employeur, 'en')} less employer share, but also ${eur(c5.retenue, 'en')} less deducted from pay. Vouchers already received can still be used during the absence, on the usual terms. The employer may decide to keep vouchers going during some absences, but those vouchers then lose the exemption from contributions, and every employee in the same situation must be treated alike. The National Assembly had voted to make vouchers compulsory during birth-related leave; the Senate committee removed that on ${day(PPL.commission, 'en')}.`,
    faqs: [
      { q: 'Can I use my vouchers while on sick leave?', a: 'Yes. Vouchers already credited or handed over are yours and can be used as normal during the leave, within the usual rules on days, limit and place. What changes is the number of vouchers received the following month: days of sick leave give none, and the deduction from pay falls accordingly.' },
      { q: 'Can my employer keep giving me vouchers during maternity leave?', a: 'It can, but under current law it does not have to. If it does, those vouchers do not benefit from the exemption from contributions, and it must grant them to every employee in the same situation. The obligation voted by the National Assembly for birth-related leave was removed by the Senate committee.' },
      { q: 'Do RTT days off give a meal voucher?', a: 'No. A working-time reduction day off (RTT) is a day not worked, like a day of leave: it includes no meal within working hours, so no voucher. Take them out of the days worked in the simulator to see your vouchers for the month.' },
    ],
    body: (h) => `<h2>Meal vouchers during sick leave or holidays: the calculation</h2>
<p>Start from the working days planned in the month and take away the days of absence. Each day removed costs a voucher, and so the employer share, but also your deduction. The table applies the rule to a twenty-one-day month, with ${h.eur(10)} vouchers half paid by the employer. The rule is set out in detail in the ${h.src('rapport', 'Senate report')}, which confirms that vouchers already built up can still be used during the absence.</p>
${h.table(['Absence', 'Vouchers in the month', 'Employer share lost'], cas.map(([, en, j, a]) => [en, String(titresDuMois(j, 0, a)), h.eur(perte(a).employeur)]), '21-day month, €10 vouchers at 50%', ['l', 'r', 'r'])}
<h2>Vouchers during birth-related leave: voted, then removed</h2>
<p>Article 2 bis of the ${h.src('texteAN', 'National Assembly text')} required employers to keep vouchers going during maternity, paternity, adoption and additional birth leave. The ${h.src('texteCommission', 'Senate committee text')} drops it, so as not to weaken the voucher's social and tax treatment. Nothing has been passed: today, keeping vouchers going remains the employer's choice, without exemption.</p>
<h2>What to check on your payslip</h2>
<p>In the month after an absence, the deduction should fall by the same number of vouchers. If it stays the same while you received fewer vouchers, ask for a correction. When ${h.a('teletravail', 'working from home or part time')}, the same logic applies day by day, and the ${h.a('validite', 'expiry date')} of your vouchers does not change with the absence.</p>`,
  },
});
