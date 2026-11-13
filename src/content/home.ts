/** Accueil, français et anglais. Chiffres : params-2026.json à travers _f et le moteur, jamais tapés à la main. */
import type { FAQ } from '../lib/page-types';
import { eur, day, pc, P, EX, U, VA, M, PPL, PL } from './guides/_f';
import { fourchetteOptimale, mois, validite } from '../lib/engine/tr';

type L = 'fr' | 'en';
interface Fold { h: string; html: string }
interface HomeLang {
  title: string; description: string; h1: string; intro: string; resume: string; homeCard: string;
  chiffresTitle: string; chiffres: Array<[string, string]>; chiffresNote: string;
  questionsTitle: string; questions: Array<{ id: string; q: string; a: string }>;
  calendrierTitle: string; calendrierNote: string; calendrier: Array<{ iso: string; t: string }>;
  guidesTitle: string; foldTitle: string; folds: Fold[]; faqs: FAQ[];
}
const f = fourchetteOptimale();
const ex = mois(20, 10, 50);
const v26 = validite(2026, 'carte'), v26p = validite(2026, 'papier');

const fr: HomeLang = {
  title: 'Titres-restaurant 2026 : part employeur, plafond, simulateur',
  description: 'Simulateur titres-restaurant 2026 : part employeur exonérée jusqu\'à 7,32 €, plafond de 25 € par jour, courses, dimanche et réforme 2027 en cours au Sénat.',
  h1: 'Titres-restaurant 2026 : combien l\'employeur paie et ce qui change',
  homeCard: 'Votre mois de titres-restaurant : part payée par l\'employeur, retenue sur la paie et part exonérée',
  intro: 'Tapez la valeur de vos titres-restaurant, la part payée par l\'employeur et le nombre de titres du mois : le simulateur donne aussitôt ce que l\'employeur vous verse en plus, ce qui est retenu sur votre salaire et ce qui échappe aux cotisations.',
  resume: `Un titre-restaurant est payé en partie par l'employeur, en partie par le salarié, par une retenue sur la paie. Pour que la part de l'employeur échappe aux cotisations sociales et à l'impôt sur le revenu, elle doit représenter entre ${EX.tauxMin} % et ${EX.tauxMax} % de la valeur du titre et ne pas dépasser ${eur(PL, 'fr')} par titre pour les titres de 2026. Les valeurs qui tirent tout le parti de ce plafond vont de ${eur(f.min, 'fr')} à ${eur(f.max, 'fr')}. Côté dépense, vous pouvez payer jusqu'à ${eur(U.plafondJour, 'fr')} par jour, chez un restaurateur ou pour des produits alimentaires, ces derniers jusqu'au ${day(U.toutAlimentaireJusquau, 'fr')} en l'état du droit. Le dimanche et les jours fériés, les titres ne servent qu'à ceux qui travaillent ce jour-là, si l'employeur l'a prévu. Une proposition de loi, adoptée par l'Assemblée nationale le ${day(PPL.adoptionAN, 'fr')} et examinée au Sénat le ${day(PPL.seanceSenat, 'fr')}, prolongerait les courses en 2027 et changerait d'autres règles en 2028 : rien n'est encore voté.`,
  chiffresTitle: 'Les chiffres du titre-restaurant en 2026',
  chiffres: [
    ['Part de l\'employeur exonérée, par titre 2026', eur(PL, 'fr')],
    ['Part de l\'employeur dans la valeur du titre', `${EX.tauxMin} % à ${EX.tauxMax} %`],
    ['Dépense maximale par jour', eur(U.plafondJour, 'fr')],
    ['Courses alimentaires permises jusqu\'au', day(U.toutAlimentaireJusquau, 'fr')],
    ['Titres 2026 sur carte : dernier jour', day(v26.dernierJour, 'fr')],
    ['Titres 2026 sur papier : dernier jour', day(v26p.dernierJour, 'fr')],
  ],
  chiffresNote: `Relus le ${day(P.retrieved_at, 'fr')} sur service-public.fr, le site de la CNTR et le rapport du Sénat n° ${PPL.rapport}. Le plafond d'exonération des titres 2027 n'est pas encore publié.`,
  questionsTitle: 'Votre question sur les titres-restaurant',
  questions: [
    { id: 'exoneration', q: 'Mon employeur paie-t-il le maximum exonéré ?', a: `Au-delà de ${eur(PL, 'fr')} par titre, la part patronale devient du salaire soumis aux cotisations.` },
    { id: 'plafond', q: 'Combien puis-je dépenser en une journée ?', a: `${eur(U.plafondJour, 'fr')}, tous titres confondus ; le reste se paie autrement.` },
    { id: 'supermarche', q: 'Puis-je encore faire mes courses en titres ?', a: 'Jusqu\'à fin 2026, oui ; 2027 dépend du vote de la loi.' },
    { id: 'dimanche', q: 'Le dimanche, ma carte est refusée : est-ce normal ?', a: 'Oui, sauf si vous travaillez ce jour-là et que l\'employeur l\'a prévu.' },
    { id: 'validite', q: 'Jusqu\'à quand utiliser mes titres 2026 ?', a: `${day(v26.dernierJour, 'fr')} sur carte, puis quinze jours pour un échange.` },
    { id: 'reforme', q: 'Qu\'est-ce qui change en 2027 et en 2028 ?', a: 'Deux versions du texte : celle de l\'Assemblée et celle de la commission du Sénat.' },
  ],
  calendrierTitle: 'Calendrier de la proposition de loi',
  calendrierNote: 'Dates du dossier législatif du Sénat. Rien n\'est promulgué : les dates d\'effet ne valent que si le texte est voté.',
  calendrier: [
    { iso: PPL.depotAN, t: 'Dépôt de la proposition de loi à l\'Assemblée nationale' },
    { iso: PPL.adoptionAN, t: 'Adoption par l\'Assemblée nationale' },
    { iso: PPL.commission, t: 'Texte de la commission des affaires sociales du Sénat' },
    { iso: PPL.seanceSenat, t: 'Examen en séance publique au Sénat' },
    { iso: PPL.toutAlimentaire2027, t: 'Si le texte est voté : courses alimentaires prolongées pour 2027' },
    { iso: PPL.entreeVigueur, t: 'Si le texte est voté : titre uniquement dématérialisé et nouvelles règles' },
  ],
  guidesTitle: 'Chaque question, avec son simulateur',
  foldTitle: 'Le titre-restaurant expliqué pas à pas',
  folds: [
    { h: 'Qui reçoit des titres-restaurant, et combien par mois', html: `<p>Rien n'oblige un employeur à distribuer des titres-restaurant : c'est un avantage qu'il choisit, souvent à la place d'une cantine. Quand il le fait, tous les salariés y ont droit dans les mêmes conditions, qu'ils soient en contrat à durée indéterminée ou déterminée, à temps partiel, intérimaires, apprentis, stagiaires ou en télétravail. La règle de base tient en une ligne : un titre par repas compris dans l'horaire de travail de la journée. Un mois de vingt jours travaillés avec une pause déjeuner donne donc vingt titres. Les jours de congé, de maladie ou de formation sans repas ne comptent pas, sauf accord plus favorable dans l'entreprise. Avec des titres de ${eur(10, 'fr')} payés à moitié par l'employeur, vingt titres représentent ${eur(ex.credite, 'fr')} crédités, dont ${eur(ex.employeur, 'fr')} versés par l'employeur et ${eur(ex.retenue, 'fr')} retenus sur la fiche de paie.</p>` },
    { h: 'Pourquoi la fourchette de 50 à 60 % compte autant', html: `<p>La part patronale n'est exonérée que si elle reste entre ${EX.tauxMin} % et ${EX.tauxMax} % de la valeur faciale. Un employeur qui paierait 70 % d'un titre de ${eur(8, 'fr')} perdrait toute l'exonération, pas seulement le surplus : la contribution entière serait traitée comme du salaire. À l'inverse, à moins de ${EX.tauxMin} %, le titre ne remplit plus la condition légale. Dans la fourchette, une seconde limite s'ajoute : ${eur(PL, 'fr')} par titre pour les titres de 2026. Ce qui dépasse ce montant est réintégré dans le salaire soumis aux cotisations, et le reste demeure exonéré. C'est pourquoi les valeurs les plus courantes se situent entre ${eur(f.min, 'fr')} et ${eur(f.max, 'fr')} : à ${EX.tauxMax} % de ${eur(f.min, 'fr')} ou à ${EX.tauxMin} % de ${eur(f.max, 'fr')}, la part de l'employeur tombe pile sur le plafond.</p>` },
    { h: 'Où et comment payer avec ses titres', html: `<p>Les titres s'utilisent chez les restaurateurs, chez les commerçants qui vendent des plats prêts à consommer et, jusqu'au ${day(U.toutAlimentaireJusquau, 'fr')}, pour tout produit alimentaire, y compris ceux qu'il faut cuisiner. L'alcool et les produits non alimentaires restent exclus. La dépense est limitée à ${eur(U.plafondJour, 'fr')} par jour ; ce plafond était de ${eur(U.plafondJourAvant2022, 'fr')} avant le décret du 29 septembre 2022. Les titres servent dans le département du lieu de travail et dans les départements limitrophes. Sur papier, le commerçant ne rend pas la monnaie : un titre de ${eur(10, 'fr')} pour un sandwich de ${eur(7, 'fr')} fait perdre ${eur(3, 'fr')}. Avec une carte ou une application, le montant exact est débité, au centime près, ce qui explique que ${M.partDemat2024} % des titres étaient dématérialisés en 2024 selon les chiffres cités par le Sénat.</p>` },
    { h: 'Titres périmés et départ de l\'entreprise', html: `<p>Chaque titre porte une année, son millésime. Les titres de 2026 sur carte se dépensent jusqu'au ${day(v26.dernierJour, 'fr')}, ceux sur papier jusqu'au ${day(v26p.dernierJour, 'fr')} ; ensuite, un échange contre des titres neufs reste possible pendant ${VA.joursEchange} jours. Passé ce délai, la valeur est perdue pour le salarié : le rapport du Sénat chiffre à ${M.contreValeurPerimes2024Millions.toLocaleString('fr-FR')} millions d'euros la contre-valeur des titres périmés en 2024. Quand vous quittez l'entreprise, les titres non utilisés ne disparaissent pas : vous les remettez à l'employeur, qui vous rembourse la part que vous aviez payée.</p>` },
    { h: 'La proposition de loi en deux versions', html: `<p>Le texte adopté par l'Assemblée nationale le ${day(PPL.adoptionAN, 'fr')} ouvrait les titres le dimanche et les jours fériés à tous les salariés et portait leur validité à trois ans, à partir du ${day(PPL.entreeVigueur, 'fr')}. La commission des affaires sociales du Sénat a retiré ces deux mesures le ${day(PPL.commission, 'fr')}. Elle garde la prolongation des courses alimentaires pour 2027, la rend durable à partir de 2028 avec un plafond journalier plus élevé pour les repas et les produits prêts à manger que pour les autres courses, montants fixés par décret, et interdit les remises accordées aux employeurs par les émetteurs dès le ${day(PPL.interdictionRemises, 'fr')}. Dans les deux versions, le titre devient uniquement dématérialisé en 2028. La séance publique du ${day(PPL.seanceSenat, 'fr')} tranchera la version du Sénat ; le texte devra ensuite être adopté dans les mêmes termes par les deux chambres. Nos simulateurs montrent chaque hypothèse sans en présenter aucune comme acquise.</p>` },
  ],
  faqs: [
    { q: 'Ce site est-il un émetteur de titres-restaurant ou l\'administration ?', a: 'Non. Titres Resto est un site indépendant publié par Radif Partners. Il n\'émet pas de titres, ne gère aucune carte et ne représente ni l\'État, ni l\'Urssaf, ni la Commission nationale des titres-restaurant. Nous lisons les textes publics et en tirons des calculs. Pour un solde, une carte bloquée ou un remboursement, adressez-vous à votre employeur ou à l\'émetteur de votre carte.' },
    { q: 'Ce que je tape dans le simulateur est-il envoyé quelque part ?', a: 'Non. Les règles sont écrites dans la page elle-même et le calcul se fait dans votre navigateur. Il n\'y a ni compte, ni formulaire, ni base de données. Si vous copiez le lien de partage, les valeurs sont dans l\'adresse et seule la personne qui l\'ouvre les voit. Fermer l\'onglet suffit à tout effacer.' },
    { open: true, q: 'Mon employeur est-il obligé de me donner des titres-restaurant ?', a: 'Non. Aucune loi n\'impose les titres-restaurant. L\'employeur peut proposer une cantine, des titres ou une autre solution. Mais s\'il en distribue, il doit le faire pour tous les salariés dans les mêmes conditions, sans écarter un temps partiel ou un télétravailleur dont l\'horaire comprend un repas.' },
    { q: 'La part payée par l\'employeur apparaît-elle sur ma fiche de paie ?', a: `Votre fiche de paie montre surtout la retenue, c'est-à-dire la part que vous payez. La part de l'employeur n'y figure comme salaire que si elle dépasse ${eur(PL, 'fr')} par titre ou sort de la fourchette de ${EX.tauxMin} à ${EX.tauxMax} % : la fraction en trop est alors ajoutée au brut soumis aux cotisations. Dans les autres cas, elle n'entre ni dans les cotisations, ni dans le revenu imposable.` },
    { q: 'Le plafond d\'exonération de 2027 est-il connu ?', a: `Pas encore. Le montant de ${eur(PL, 'fr')} vaut pour les titres de 2026 ; celui des titres de 2027 n'était pas publié au 13 novembre 2026. Tant qu'il ne l'est pas, ce site n'affiche aucun chiffre pour 2027 et calcule avec le plafond en vigueur. Nous mettrons à jour les simulateurs le jour de la publication, après lecture de la source officielle.` },
    { q: 'Mes titres-restaurant marchent-ils partout en France ?', a: 'Pas forcément. Les titres s\'utilisent dans le département de votre lieu de travail et dans les départements qui le touchent. Une carte peut donc être refusée en vacances loin de chez vous. L\'employeur peut toutefois accorder des titres valables ailleurs pour des déplacements professionnels. La règle tient au lieu de travail, pas au domicile : un salarié qui vit dans un autre département peut quand même payer près de chez lui si ce département est limitrophe.' },
    { q: 'Que se passe-t-il si la loi n\'est pas votée avant la fin de 2026 ?', a: `Sans nouveau texte, les courses alimentaires cessent d'être payables en titres au ${day('2027-01-01', 'fr')} : seuls restent les repas, les plats prêts à manger et les fruits et légumes. Le reste ne change pas : ${eur(U.plafondJour, 'fr')} par jour, le dimanche réservé à ceux qui travaillent ce jour-là, et le papier toujours autorisé. Le simulateur des courses montre les deux issues.` },
  ],
};

const en: HomeLang = {
  title: 'Meal vouchers in France 2026: employer share and limits',
  description: 'French meal voucher (titre-restaurant) simulator for 2026: employer share exempt up to €7.32, €25 daily limit, groceries, Sundays and the 2027 reform bill.',
  h1: 'Meal vouchers in France 2026: what the employer pays and what is changing',
  homeCard: 'Your month of meal vouchers: employer share, deduction from pay and the exempt part',
  intro: 'Enter the value of your meal vouchers, the share your employer pays and how many you get this month: the simulator shows at once what the employer adds, what comes out of your pay and how much is free of contributions.',
  resume: `A French meal voucher (titre-restaurant) is paid partly by the employer and partly by the employee, through a deduction from pay. For the employer share to be free of social contributions and income tax, it must cover between ${EX.tauxMin}% and ${EX.tauxMax}% of the voucher's face value and stay within ${eur(PL, 'en')} per voucher for 2026 vouchers. The face values that make full use of that cap run from ${eur(f.min, 'en')} to ${eur(f.max, 'en')}. On the spending side, you can pay up to ${eur(U.plafondJour, 'en')} a day at restaurants or for food, the latter including groceries until ${day(U.toutAlimentaireJusquau, 'en')} under current law. On Sundays and public holidays, vouchers only work for people working that day, if the employer allows it. A bill passed by the National Assembly on ${day(PPL.adoptionAN, 'en')} and debated in the Senate on ${day(PPL.seanceSenat, 'en')} would extend groceries into 2027 and change other rules in 2028; nothing has been passed yet.`,
  chiffresTitle: 'Key meal voucher figures for 2026',
  chiffres: [
    ['Exempt employer share, per 2026 voucher', eur(PL, 'en')],
    ['Employer share of the face value', `${EX.tauxMin}% to ${EX.tauxMax}%`],
    ['Maximum spend per day', eur(U.plafondJour, 'en')],
    ['Groceries allowed until', day(U.toutAlimentaireJusquau, 'en')],
    ['2026 vouchers on a card: last day', day(v26.dernierJour, 'en')],
    ['2026 paper vouchers: last day', day(v26p.dernierJour, 'en')],
  ],
  chiffresNote: `Re-read on ${day(P.retrieved_at, 'en')} on service-public.fr, the CNTR site and Senate report no. ${PPL.rapport}. The exemption cap for 2027 vouchers has not been published yet.`,
  questionsTitle: 'Your meal voucher question',
  questions: [
    { id: 'exoneration', q: 'Does my employer pay the maximum exempt amount?', a: `Above ${eur(PL, 'en')} per voucher, the employer share becomes pay subject to contributions.` },
    { id: 'plafond', q: 'How much can I spend in one day?', a: `${eur(U.plafondJour, 'en')}, all vouchers together; the rest is paid another way.` },
    { id: 'supermarche', q: 'Can I still buy groceries with vouchers?', a: 'Until the end of 2026, yes; 2027 depends on the bill.' },
    { id: 'dimanche', q: 'My card is refused on Sundays: is that normal?', a: 'Yes, unless you work that day and the employer allows it.' },
    { id: 'validite', q: 'Until when can I use my 2026 vouchers?', a: `${day(v26.dernierJour, 'en')} on a card, then fifteen days to exchange them.` },
    { id: 'reforme', q: 'What changes in 2027 and 2028?', a: 'Two versions of the bill: the Assembly text and the Senate committee text.' },
  ],
  calendrierTitle: 'Timeline of the meal voucher bill',
  calendrierNote: 'Dates from the Senate legislative file. Nothing is law yet: the effective dates only apply if the bill passes.',
  calendrier: [
    { iso: PPL.depotAN, t: 'Bill tabled in the National Assembly' },
    { iso: PPL.adoptionAN, t: 'Passed by the National Assembly' },
    { iso: PPL.commission, t: 'Senate Social Affairs Committee text' },
    { iso: PPL.seanceSenat, t: 'Senate plenary debate' },
    { iso: PPL.toutAlimentaire2027, t: 'If passed: groceries extended through 2027' },
    { iso: PPL.entreeVigueur, t: 'If passed: card or app only, and new rules' },
  ],
  guidesTitle: 'Each question, with its own simulator',
  foldTitle: 'Meal vouchers explained step by step',
  folds: [
    { h: 'Who gets meal vouchers, and how many a month', html: `<p>No law forces an employer to hand out meal vouchers: it is a benefit the employer chooses, often instead of a staff canteen. Once it does, every employee is entitled on the same terms, whether on a permanent or fixed-term contract, part time, a temp, an apprentice, an intern or working from home. The basic rule fits in one line: one voucher per meal that falls within the working day. A month of twenty working days with a lunch break therefore gives twenty vouchers. Days of leave, sickness or training without a meal do not count, unless a company agreement is more generous. With ${eur(10, 'en')} vouchers half paid by the employer, twenty vouchers mean ${eur(ex.credite, 'en')} credited, of which ${eur(ex.employeur, 'en')} comes from the employer and ${eur(ex.retenue, 'en')} is deducted on the payslip.</p>` },
    { h: 'Why the 50 to 60% band matters so much', html: `<p>The employer share is only exempt if it stays between ${EX.tauxMin}% and ${EX.tauxMax}% of the face value. An employer paying 70% of an ${eur(8, 'en')} voucher would lose the whole exemption, not just the excess: the full contribution would be treated as pay. Below ${EX.tauxMin}%, the voucher no longer meets the legal condition. Within the band, a second limit applies: ${eur(PL, 'en')} per voucher for 2026 vouchers. Anything above that amount is added back to pay subject to contributions, and the rest stays exempt. That is why the most common values sit between ${eur(f.min, 'en')} and ${eur(f.max, 'en')}: at ${EX.tauxMax}% of ${eur(f.min, 'en')} or ${EX.tauxMin}% of ${eur(f.max, 'en')}, the employer share lands exactly on the cap.</p>` },
    { h: 'Where and how to pay with vouchers', html: `<p>Vouchers are accepted by restaurants, by shops selling ready-to-eat food and, until ${day(U.toutAlimentaireJusquau, 'en')}, for any food product, including things that need cooking. Alcohol and non-food items remain excluded. Spending is capped at ${eur(U.plafondJour, 'en')} a day; the limit was ${eur(U.plafondJourAvant2022, 'en')} before the decree of 29 September 2022. Vouchers work in the département where you work and the neighbouring ones. Paper vouchers give no change: a ${eur(10, 'en')} voucher for a ${eur(7, 'en')} sandwich loses ${eur(3, 'en')}. A card or app debits the exact amount to the cent, which helps explain why ${M.partDemat2024}% of vouchers were digital in 2024, according to figures quoted by the Senate.</p>` },
    { h: 'Expired vouchers and leaving your job', html: `<p>Each voucher carries a year, its vintage. 2026 vouchers on a card can be spent until ${day(v26.dernierJour, 'en')}, paper ones until ${day(v26p.dernierJour, 'en')}; after that, they can still be swapped for new ones for ${VA.joursEchange} days. Beyond that window the value is lost to the employee: the Senate report puts the value of vouchers that expired in 2024 at ${M.contreValeurPerimes2024Millions.toLocaleString('en-GB')} million euros. When you leave a company, unused vouchers do not vanish: you hand them back to the employer, who refunds the share you paid.</p>` },
    { h: 'The bill in two versions', html: `<p>The text passed by the National Assembly on ${day(PPL.adoptionAN, 'en')} opened vouchers to every employee on Sundays and public holidays and extended their validity to three years, from ${day(PPL.entreeVigueur, 'en')}. The Senate Social Affairs Committee removed both measures on ${day(PPL.commission, 'en')}. It keeps groceries for 2027, makes them permanent from 2028 with a higher daily limit for meals and ready-to-eat food than for other groceries, amounts set by decree, and bans issuers from giving discounts to employers from ${day(PPL.interdictionRemises, 'en')}. In both versions, vouchers become card or app only in 2028. The plenary debate on ${day(PPL.seanceSenat, 'en')} will settle the Senate version; both chambers will then have to pass the same wording. Our simulators show each scenario and present none of them as settled.</p>` },
  ],
  faqs: [
    { q: 'Is this site a meal voucher issuer or a public body?', a: 'No. Titres Resto is an independent site published by Radif Partners. It issues no vouchers, runs no cards and does not represent the State, Urssaf or the National Meal Voucher Commission. We read the public texts and turn them into calculations. For a balance, a blocked card or a refund, contact your employer or the company that issued your card.' },
    { q: 'Is anything I type into the simulator sent anywhere?', a: 'No. The rules are written into the page itself and the calculation runs in your browser. There is no account, no form and no database. If you copy the share link, the values sit in the address and only the person who opens it sees them. Closing the tab wipes everything.' },
    { open: true, q: 'Does my employer have to give me meal vouchers?', a: 'No. No law requires meal vouchers. An employer can offer a canteen, vouchers or another arrangement. But if it does hand them out, it must do so for all staff on the same terms, without leaving out a part-timer or a remote worker whose hours include a meal.' },
    { q: 'Does the employer share show on my payslip?', a: `Your payslip mainly shows the deduction, meaning the part you pay. The employer share only appears as pay if it exceeds ${eur(PL, 'en')} per voucher or falls outside the ${EX.tauxMin} to ${EX.tauxMax}% band: the excess is then added to gross pay subject to contributions. Otherwise it enters neither contributions nor taxable income.` },
    { q: 'Is the 2027 exemption cap known yet?', a: `Not yet. The ${eur(PL, 'en')} amount applies to 2026 vouchers; the figure for 2027 vouchers had not been published as of 13 November 2026. Until it is, this site shows no 2027 figure and calculates with the cap in force. We will update the simulators on the day it is published, after reading the official source.` },
    { q: 'Do my meal vouchers work anywhere in France?', a: 'Not necessarily. Vouchers can be used in the département where you work and in the départements that border it. A card can therefore be refused on holiday far from home. The employer can still grant vouchers valid elsewhere for business travel. The rule follows your workplace, not your home: an employee living in another département can still pay near home if that département borders the one where they work.' },
    { q: 'What happens if the bill is not passed before the end of 2026?', a: `Without a new law, groceries stop being payable with vouchers on ${day('2027-01-01', 'en')}: only meals, ready-to-eat food and fruit and vegetables remain. Nothing else changes: ${eur(U.plafondJour, 'en')} a day, Sundays only for people working that day, and paper still allowed. The groceries simulator shows both outcomes.` },
  ],
};

export const HOME = { fr, en, sources: ['sp', 'cntr', 'dossier', 'texteAN', 'texteCommission', 'rapport'] };
export const pc_ = pc;
