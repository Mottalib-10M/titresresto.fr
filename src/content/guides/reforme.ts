import { defineGuide } from '../../lib/page-types';
import { day, PPL, M } from './_f';

/* Réforme : dossier législatif ppl26-032 (dates) ; texte AN n° 32 ; rapport n° 141 ; texte de la commission n° 142.
   Rien n'est promulgué au 13/11/2026 : chaque mesure est présentée par version. */
const rows = (l: 'fr' | 'en') => {
  const F = l === 'fr';
  const o = (b: boolean) => (b ? (F ? 'oui' : 'yes') : (F ? 'non' : 'no'));
  return [
    [F ? 'Courses alimentaires en 2027' : 'Groceries in 2027', o(true), o(true)],
    [F ? 'Courses alimentaires à partir de 2028' : 'Groceries from 2028', o(true), o(true)],
    [F ? 'Titre uniquement sur carte ou application en 2028' : 'Card or app only from 2028', o(true), o(true)],
    [F ? 'Dimanche et jours fériés pour tous' : 'Sundays and holidays for everyone', o(true), o(false)],
    [F ? 'Validité portée à trois ans' : 'Validity extended to three years', o(true), o(false)],
    [F ? 'Plafond journalier plus haut pour les repas' : 'Higher daily limit for meals', o(false), o(true)],
    [F ? 'Titres maintenus pendant les congés de naissance' : 'Vouchers kept during birth-related leave', o(true), o(false)],
    [F ? 'Remises aux employeurs interdites en 2027' : 'Discounts to employers banned in 2027', F ? 'non prévu à cette date' : 'not at that date', o(true)],
  ];
};

export default defineGuide({
  id: 'reforme', group: 'regles', order: 9,
  tool: 'reforme',
  related: ['supermarche', 'dimanche', 'validite', 'employeur'],
  sources: ['dossier', 'texteAN', 'texteCommission', 'rapport'],
  fr: {
    slug: 'reforme-2027-2028',
    nav: 'Réforme 2027-2028', card: 'Ce que changent les deux versions de la proposition de loi, mesure par mesure, et ce qui reste incertain',
    title: 'Réforme du titre-restaurant 2026 : ce qui change en 2027',
    description: 'Réforme du titre-restaurant en 2026 : courses prolongées en 2027, carte obligatoire en 2028, dimanche et validité retirés au Sénat. Les deux versions du texte.',
    h1: 'Réforme du titre-restaurant : ce qui changerait en 2027 et en 2028',
    intro: 'Choisissez une date et l\'issue du vote : le simulateur montre ce que la réforme du titre-restaurant changerait à cette date, dans la version de l\'Assemblée nationale ou dans celle du Sénat.',
    resume: `La réforme du titre-restaurant est une proposition de loi déposée à l'Assemblée nationale le ${day(PPL.depotAN, 'fr')} pour « moderniser et rééquilibrer » le dispositif. Les députés l'ont adoptée le ${day(PPL.adoptionAN, 'fr')}. Au Sénat, la commission des affaires sociales a établi son propre texte le ${day(PPL.commission, 'fr')}, et le Sénat a adopté le texte, modifié, le ${day(PPL.adoptionSenat, 'fr')} par ${PPL.voteSenat} voix contre 0 ; une commission mixte paritaire doit ensuite chercher un texte commun. Les deux versions s'accordent sur trois points : les courses alimentaires restent payables en 2027, elles le deviennent durablement à partir de 2028, et le titre devient uniquement dématérialisé à cette date, ce qui met fin au papier. Elles divergent sur le reste. L'Assemblée ouvrait les titres le dimanche et les jours fériés à tous les salariés, portait leur validité à trois ans et imposait leur maintien pendant les congés de naissance ; la commission du Sénat a supprimé ces trois mesures. Elle a en revanche ajouté un plafond journalier plus élevé pour les repas que pour les autres courses et avancé à 2027 l'interdiction des remises consenties aux employeurs. Tant que la loi n'est pas promulguée, aucune de ces règles ne s'applique.`,
    faqs: [
      { q: 'Quand la réforme du titre-restaurant entrera-t-elle en vigueur ?', a: `Si elle est votée, l'essentiel s'appliquerait au ${day(PPL.entreeVigueur, 'fr')}. Deux mesures sont plus rapides : la prolongation des courses alimentaires pour toute l'année 2027 et, dans la version du Sénat, l'interdiction des remises aux employeurs au ${day(PPL.interdictionRemises, 'fr')}. La date réelle dépend du vote final et de la promulgation, que nous ne pouvons pas prévoir.` },
      { q: 'Les titres papier vont-ils disparaître ?', a: `Dans les deux versions du texte, le titre-restaurant est défini comme un titre de paiement dématérialisé à partir de 2028. Le papier ne serait donc plus émis. Il représente déjà une part minoritaire : ${M.partDemat2024} % des titres étaient dématérialisés en 2024 selon les chiffres cités par le rapport du Sénat. Les règles actuelles du papier restent valables d'ici là.` },
      { q: 'Que se passe-t-il si le Sénat et l\'Assemblée ne s\'accordent pas ?', a: 'Le texte doit être adopté dans les mêmes termes par les deux chambres pour devenir une loi. Tant que ce n\'est pas le cas, il continue de circuler entre elles, et les règles actuelles s\'appliquent. Sans vote avant la fin de 2026, la dérogation sur les courses alimentaires prendrait fin au 1er janvier 2027.' },
      { q: 'Où suivre l\'avancement de la proposition de loi ?', a: 'Sur le dossier législatif du Sénat, qui recense les textes adoptés, les rapports, les amendements et les dates de séance. Nous le relisons à chaque étape et mettons à jour les simulateurs et ce tableau. La date de dernière lecture est indiquée en bas de chaque page du site.' },
    ],
    body: (h) => `<h2>La réforme du titre-restaurant, version par version</h2>
<p>Le tableau compare le ${h.src('texteAN', 'texte adopté par l\'Assemblée nationale')} et le ${h.src('texteCommission', 'texte de la commission du Sénat')}. Les dates viennent du ${h.src('dossier', 'dossier législatif')} ; les motifs des changements, du ${h.src('rapport', 'rapport de la commission')}. Aucune colonne n'est la loi : c'est la séance publique, puis l'accord entre les deux chambres, qui fixeront le texte final.</p>
${h.table(['Mesure', 'Assemblée nationale', 'Commission du Sénat'], rows('fr'), 'Proposition de loi sur le titre-restaurant, état au 13 novembre 2026', ['l', 'l', 'l'])}
<h2>Pourquoi le Sénat a resserré le texte</h2>
<p>La commission a voulu garder les mesures de pouvoir d'achat, comme les courses alimentaires, tout en évitant que le titre ne serve à des achats sans lien avec le repas de la journée de travail. Un tel usage pourrait, selon elle, conduire à remettre en cause son régime social et fiscal. D'où le plafond plus bas pour les courses à cuisiner, et le retrait du dimanche pour tous et de la validité de trois ans.</p>
<h2>Ce qui ne change pas d'ici là</h2>
<p>En 2026, rien ne bouge : ${h.a('supermarche', 'courses permises')} jusqu'au 31 décembre, ${h.a('dimanche', 'dimanche réservé')} aux salariés qui travaillent ce jour-là, ${h.a('validite', 'validité')} jusqu'à fin février 2027 sur carte, et ${h.a('employeur', 'part employeur')} exonérée dans les mêmes limites.</p>`,
  },
  en: {
    slug: 'reform-2027-2028',
    nav: 'Reform 2027-2028', card: 'What both versions of the bill change, measure by measure, and what is still uncertain',
    title: 'Meal voucher reform 2026: what changes in 2027 and 2028',
    description: 'French meal voucher reform in 2026: groceries extended into 2027, card or app only from 2028, Sundays and longer validity dropped by the Senate committee.',
    h1: 'Meal voucher reform: what would change in 2027 and 2028',
    intro: 'Pick a date and the outcome of the vote: the simulator shows what the meal voucher reform would change on that date, under the National Assembly version or the Senate version.',
    resume: `The French meal voucher reform is a bill tabled in the National Assembly on ${day(PPL.depotAN, 'en')} to "modernise and rebalance" the scheme. MPs passed it on ${day(PPL.adoptionAN, 'en')}. In the Senate, the Social Affairs Committee drew up its own text on ${day(PPL.commission, 'en')}, and the Senate passed the text, amended, on ${day(PPL.adoptionSenat, 'en')} by ${PPL.voteSenat} votes to 0; a joint committee must then seek a common text. Both versions agree on three points: groceries stay payable in 2027, become permanently payable from 2028, and vouchers become card or app only from that date, which ends paper. They differ on the rest. The Assembly opened vouchers to all employees on Sundays and public holidays, extended their validity to three years and required them to be kept during birth-related leave; the Senate committee removed all three measures. It added instead a higher daily limit for meals than for other groceries and brought forward to 2027 the ban on discounts given to employers. Until the law is enacted, none of these rules applies.`,
    faqs: [
      { q: 'When would the meal voucher reform take effect?', a: `If passed, most of it would apply from ${day(PPL.entreeVigueur, 'en')}. Two measures come sooner: groceries extended for the whole of 2027 and, in the Senate version, the ban on discounts to employers from ${day(PPL.interdictionRemises, 'en')}. The real date depends on the final vote and on enactment, which we cannot predict.` },
      { q: 'Will paper vouchers disappear?', a: `In both versions of the bill, the meal voucher is defined as a digital means of payment from 2028. Paper would therefore no longer be issued. It is already a minority: ${M.partDemat2024}% of vouchers were digital in 2024, according to figures quoted in the Senate report. The current paper rules remain valid until then.` },
      { q: 'What if the Senate and the Assembly do not agree?', a: 'A bill must be passed in the same terms by both chambers to become law. Until then it keeps moving between them, and the current rules apply. With no vote before the end of 2026, the grocery exception would end on 1 January 2027.' },
      { q: 'Where can I follow the progress of the bill?', a: 'On the Senate legislative file, which lists the texts adopted, the reports, the amendments and the debate dates. We re-read it at each stage and update the simulators and this table. The date of the last reading is shown at the bottom of every page of the site.' },
    ],
    body: (h) => `<h2>The meal voucher reform, version by version</h2>
<p>The table compares the ${h.src('texteAN', 'text passed by the National Assembly')} and the ${h.src('texteCommission', 'Senate committee text')}. Dates come from the ${h.src('dossier', 'legislative file')}; the reasons for the changes, from the ${h.src('rapport', 'committee report')}. Neither column is the law: the plenary debate, then agreement between both chambers, will settle the final text.</p>
${h.table(['Measure', 'National Assembly', 'Senate committee'], rows('en'), 'Meal voucher bill, as of 13 November 2026', ['l', 'l', 'l'])}
<h2>Why the Senate tightened the text</h2>
<p>The committee wanted to keep the purchasing-power measures, such as groceries, while preventing the voucher from being used for purchases unrelated to the meal of the working day. In its view, such use could lead to its social and tax treatment being called into question. Hence the lower limit for groceries to cook, and the removal of Sundays for all and of the three-year validity.</p>
<h2>What stays the same until then</h2>
<p>In 2026 nothing moves: ${h.a('supermarche', 'groceries allowed')} until 31 December, ${h.a('dimanche', 'Sundays reserved')} for staff working that day, ${h.a('validite', 'validity')} until the end of February 2027 on a card, and the ${h.a('employeur', 'employer share')} exempt within the same limits.</p>`,
  },
});
