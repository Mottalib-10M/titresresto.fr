import { defineGuide } from '../../lib/page-types';
import { eur, day, U, PPL } from './_f';
import { peutPayer } from '../../lib/engine/tr';

/* Dimanche et jours fériés : service-public F21059 (jours ouvrables, sauf travail ces jours-là) ; rapport du Sénat n° 141
   (R. 3262-8 ; environ 20 % des bénéficiaires d'un émetteur autorisés) ; texte AN n° 32 (L. 3262-5-2 : tous les jours) ;
   texte de la commission n° 142 (suppression). */
const ok = (annee: 2026 | 2028, travaille: boolean, autorise: boolean, version: 'an' | 'senat') =>
  peutPayer({ annee, jour: 'dimanche', travailleCeJour: travaille, autorise, produit: 'repas', montant: 15, adoptee: true, version }).ok;
const rows = (l: 'fr' | 'en') => {
  const o = (b: boolean) => (b ? (l === 'fr' ? 'oui' : 'yes') : (l === 'fr' ? 'non' : 'no'));
  return [
    [l === 'fr' ? 'Ne travaille pas ce dimanche' : 'Not working that Sunday', o(ok(2026, false, false, 'senat')), o(ok(2028, false, false, 'an')), o(ok(2028, false, false, 'senat'))],
    [l === 'fr' ? 'Travaille, sans accord de l\'employeur' : 'Working, without employer permission', o(ok(2026, true, false, 'senat')), o(ok(2028, true, false, 'an')), o(ok(2028, true, false, 'senat'))],
    [l === 'fr' ? 'Travaille, avec accord de l\'employeur' : 'Working, with employer permission', o(ok(2026, true, true, 'senat')), o(ok(2028, true, true, 'an')), o(ok(2028, true, true, 'senat'))],
  ];
};

export default defineGuide({
  id: 'dimanche', group: 'usage', order: 4,
  tool: 'dimanche',
  related: ['plafond', 'reforme', 'home', 'supermarche'],
  sources: ['sp', 'rapport', 'texteAN', 'texteCommission'],
  fr: {
    slug: 'dimanche-jours-feries',
    nav: 'Dimanche et jours fériés', card: 'Pourquoi la carte est refusée le dimanche, et ce que la réforme changerait en 2028',
    title: 'Ticket restaurant dimanche 2026 : qui peut payer avec ?',
    description: 'Titre-restaurant le dimanche et les jours fériés en 2026 : réservé aux salariés qui travaillent ce jour-là, si l\'employeur l\'a prévu. Et après la réforme.',
    h1: 'Ticket restaurant dimanche et jours fériés : la règle en 2026',
    intro: 'Dites si vous travaillez ce dimanche, si l\'employeur l\'a prévu et l\'année : le simulateur dit si votre titre-restaurant passe le dimanche ou un jour férié, selon la règle actuelle et les deux versions de la réforme.',
    resume: `Un titre-restaurant ne s'utilise en principe que les jours ouvrables, du lundi au samedi. Le dimanche et les jours fériés, il n'est accepté que pour les salariés qui travaillent ce jour-là, et seulement si l'employeur l'a décidé à leur profit : c'est la règle de l'article R. 3262-8 du code du travail, reprise par service-public.fr. Une carte refusée un dimanche midi n'est donc pas une panne, c'est l'application de cette règle par l'émetteur. Le samedi, en revanche, est un jour ouvrable comme les autres. Le rapport du Sénat cite un émetteur selon lequel environ 20 % de ses bénéficiaires ont été autorisés par leur employeur à une utilisation le dimanche. La proposition de loi adoptée par l'Assemblée nationale le ${day(PPL.adoptionAN, 'fr')} ouvrait les titres tous les jours de la semaine à partir de 2028. La commission des affaires sociales du Sénat a supprimé cette mesure le ${day(PPL.commission, 'fr')}. Rien n'est voté : en 2026 et en 2027, la règle actuelle s'applique.`,
    faqs: [
      { q: 'Pourquoi ma carte titre-restaurant est-elle refusée le dimanche ?', a: 'Parce que la réglementation réserve les titres aux jours ouvrables. L\'émetteur bloque la carte le dimanche et les jours fériés, sauf si votre employeur lui a signalé que vous travaillez ces jours-là. Si c\'est votre cas, demandez au service des ressources humaines d\'activer l\'usage dominical sur votre carte : la démarche passe par l\'employeur, pas par vous.' },
      { q: 'Le samedi compte-t-il comme le dimanche ?', a: `Non. Le samedi est un jour ouvrable : vos titres s'y utilisent comme en semaine, dans la limite de ${eur(U.plafondJour, 'fr')} par jour. Seuls le dimanche et les onze jours fériés légaux sont concernés par la restriction. Un jour férié tombant un mardi est traité comme un dimanche : pas d'usage, sauf si vous travaillez et que l'employeur l'a prévu.` },
      { q: 'Les titres le dimanche seront-ils autorisés pour tous en 2028 ?', a: `Seulement si la version de l'Assemblée nationale l'emporte. Le texte qu'elle a voté le ${day(PPL.adoptionAN, 'fr')} permettait l'usage tous les jours dès le ${day(PPL.entreeVigueur, 'fr')}. Le Sénat l'a retirée dans le texte qu'il a adopté le ${day(PPL.adoptionSenat, 'fr')}. Le texte final dépendra de l'accord entre les deux chambres, en commission mixte paritaire.` },
    ],
    body: (h) => `<h2>Le titre-restaurant le dimanche selon la règle actuelle</h2>
<p>Deux conditions cumulatives ouvrent l'usage le dimanche : travailler ce jour-là, et une décision de l'employeur en faveur des salariés concernés. L'une sans l'autre ne suffit pas. Un salarié du commerce qui travaille tous les dimanches mais dont l'employeur n'a rien prévu reste bloqué. La ${h.src('sp', 'fiche service-public.fr')} résume la règle ; le ${h.src('rapport', 'rapport du Sénat')} cite l'article R. 3262-8 et relève qu'elle semble imparfaitement respectée.</p>
${h.table(['Situation', '2026', '2028, version Assemblée', '2028, version Sénat'], rows('fr'), 'Usage le dimanche ou un jour férié, selon la version du texte', ['l', 'l', 'l', 'l'])}
<h2>Ce que disent les deux versions de la réforme</h2>
<p>Le ${h.src('texteAN', 'texte de l\'Assemblée nationale')} crée un article L. 3262-5-2 selon lequel les titres « peuvent être utilisés tous les jours de la semaine, y compris les dimanches et les jours fériés ». Le ${h.src('texteCommission', 'texte de la commission du Sénat')} réécrit cet article pour y placer le plafond journalier et ne reprend pas l'ouverture du dimanche. La commission explique vouloir éviter une remise en cause du régime social et fiscal du titre, conçu pour le repas pris pendant la journée de travail.</p>
<h2>En pratique, un dimanche travaillé</h2>
<p>Si vous travaillez le dimanche et que la carte est refusée, vérifiez d'abord avec l'employeur qu'il a bien demandé l'activation à l'émetteur. Le plafond reste de ${h.eur(U.plafondJour)} ce jour-là, comme les autres jours ; le ${h.a('plafond', 'plafond journalier')} et les ${h.a('supermarche', 'règles des courses')} s'appliquent de la même façon.</p>`,
  },
  en: {
    slug: 'sundays-holidays',
    nav: 'Sundays and public holidays', card: 'Why your card is refused on Sundays, and what the reform would change in 2028',
    title: 'Meal vouchers on Sundays 2026: who can use them, and when',
    description: 'French meal vouchers on Sundays and public holidays in 2026: only for staff working that day, with employer permission. What the reform would change next.',
    h1: 'Meal vouchers on Sundays and public holidays: the 2026 rule',
    intro: 'Say whether you work this Sunday, whether your employer allows it and which year: the simulator tells you whether meal vouchers on Sundays or public holidays will go through, under today\'s rule and both versions of the reform.',
    resume: `A French meal voucher can in principle only be used on working days, Monday to Saturday. On Sundays and public holidays it is only accepted for employees who are working that day, and only if the employer has decided so for them: that is the rule in article R. 3262-8 of the Labour Code, restated by service-public.fr. A card refused at Sunday lunchtime is therefore not a fault; it is the issuer applying that rule. Saturday, on the other hand, is a working day like any other. The Senate report quotes one issuer saying that about 20% of its users have been allowed Sunday use by their employer. The bill passed by the National Assembly on ${day(PPL.adoptionAN, 'en')} opened vouchers to every day of the week from 2028. The Senate Social Affairs Committee removed that measure on ${day(PPL.commission, 'en')}. Nothing has been passed: in 2026 and 2027, today's rule applies.`,
    faqs: [
      { q: 'Why is my meal voucher card refused on Sundays?', a: 'Because the regulations restrict vouchers to working days. The issuer blocks the card on Sundays and public holidays unless your employer has told it that you work those days. If that is your case, ask your HR department to enable Sunday use on your card: the request goes through the employer, not through you.' },
      { q: 'Does Saturday count like Sunday?', a: `No. Saturday is a working day: your vouchers work as on weekdays, up to ${eur(U.plafondJour, 'en')} a day. Only Sundays and the eleven statutory public holidays are restricted. A public holiday falling on a Tuesday is treated like a Sunday: no use, unless you are working and the employer has allowed it.` },
      { q: 'Will Sunday use be allowed for everyone in 2028?', a: `Only if the National Assembly version prevails. The text it passed on ${day(PPL.adoptionAN, 'en')} allowed use every day from ${day(PPL.entreeVigueur, 'en')}. The Senate removed it in the text it passed on ${day(PPL.adoptionSenat, 'en')}. The final text depends on agreement between both chambers in a joint committee.` },
    ],
    body: (h) => `<h2>Meal vouchers on Sundays under today's rule</h2>
<p>Two conditions together open Sunday use: working that day, and a decision by the employer for the staff concerned. One without the other is not enough. A retail employee who works every Sunday but whose employer has set nothing up stays blocked. The ${h.src('sp', 'service-public.fr guidance')} sums up the rule; the ${h.src('rapport', 'Senate report')} cites article R. 3262-8 and notes that it seems to be imperfectly applied.</p>
${h.table(['Situation', '2026', '2028, Assembly version', '2028, Senate version'], rows('en'), 'Use on a Sunday or public holiday, by version of the bill', ['l', 'l', 'l', 'l'])}
<h2>What the two versions of the reform say</h2>
<p>The ${h.src('texteAN', 'National Assembly text')} creates an article L. 3262-5-2 under which vouchers "can be used every day of the week, including Sundays and public holidays". The ${h.src('texteCommission', 'Senate committee text')} rewrites that article to hold the daily limit instead and drops the Sunday opening. The committee says it wants to avoid putting at risk the social and tax treatment of the voucher, which is designed for the meal taken during the working day.</p>
<h2>In practice, on a Sunday you work</h2>
<p>If you work on Sunday and the card is refused, first check with your employer that it has asked the issuer to enable it. The limit is still ${h.eur(U.plafondJour)} that day, as on other days; the ${h.a('plafond', 'daily limit')} and the ${h.a('supermarche', 'grocery rules')} apply in the same way.</p>`,
  },
});
