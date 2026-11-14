import { defineGuide } from '../../lib/page-types';
import { eur, day, U, VA, M } from './_f';
import { carnet, validite } from '../../lib/engine/tr';

/* Carte UpDéjeuner : la page publique up.coop répond 403 aux lectures automatisées le 14/11/2026 (non contournée) ;
   seules sources : liste CNTR (« Up Déjeuner, Up One », papier et carte, Gennevilliers), service-public F21059 (règles),
   rapport du Sénat n° 141 (R. 3262-5 : papier fin janvier, carte fin février ; part dématérialisée 2024). */
const vc = validite(2026, 'carte'), vp = validite(2026, 'papier');
const CAS = [[9.2, 8], [12.4, 8], [12.4, 9], [15.8, 9]] as const;
const ex = carnet(12.4, 8, 18);

export default defineGuide({
  id: 'up', group: 'cartes', order: 17,
  tool: 'carnet',
  related: ['emetteurs', 'cheque', 'validite', 'edenred'],
  sources: ['cntrEmetteurs', 'sp', 'rapport'],
  fr: {
    slug: 'carte-updejeuner',
    nav: 'Carte UpDéjeuner', card: 'Carte ou carnet UpDéjeuner : les règles, les dates et la monnaie perdue sur papier',
    title: 'Carte UpDéjeuner 2026 : plafond, dates et papier ou carte',
    description: 'Carte UpDéjeuner en 2026 : 25 € par jour, titres 2026 sur carte jusqu\'au 28 février 2027, papier au 31 janvier. Simulateur : la monnaie perdue en carnet.',
    h1: 'Carte UpDéjeuner : plafond, dates limites, et papier ou carte',
    intro: 'Tapez le prix de votre déjeuner habituel et la valeur de vos titres : le simulateur compare un mois en carnet papier et un mois avec la carte UpDéjeuner, monnaie perdue comprise.',
    resume: `La carte UpDéjeuner est la carte de titres-restaurant de l'émetteur Up, que la Commission nationale des titres-restaurant inscrit sur sa liste sous le nom « Up Déjeuner, Up One », pour le papier et pour la carte. Les règles d'usage ne viennent pas de l'émetteur mais du code du travail : ${eur(U.plafondJour, 'fr')} par jour au plus, les jours ouvrables, dans le département de travail et ceux qui le touchent. Les dates dépendent du support : les titres 2026 sur carte se dépensent jusqu'au ${day(vc.dernierJour, 'fr')}, sur papier jusqu'au ${day(vp.dernierJour, 'fr')}, puis ${VA.joursEchange} jours pour un échange. Le papier a un coût caché : la monnaie n'est pas rendue. Dix-huit déjeuners de ${eur(12.4, 'fr')} payés avec des titres de ${eur(8, 'fr')}, en arrondissant au titre supérieur, font perdre ${eur(ex.perteMois, 'fr')} par mois ; avec la carte, rien. Ce site est indépendant et n'est pas affilié à Up.`,
    faqs: [
      { open: true, q: 'Jusqu\'à quand utiliser la carte UpDéjeuner de 2026 ?', a: `Les titres de 2026 chargés sur une carte se dépensent jusqu'au ${day(vc.dernierJour, 'fr')}. Les titres papier du même millésime s'arrêtent un mois plus tôt, le ${day(vp.dernierJour, 'fr')}. Dans les deux cas, ${VA.joursEchange} jours restent ensuite pour demander un échange. Ces délais viennent du code du travail et valent pour tous les émetteurs.` },
      { q: 'Vaut-il mieux le carnet ou la carte UpDéjeuner ?', a: 'Ce choix revient à l\'employeur, qui commande les titres. Pour le salarié, la carte débite le montant exact et évite la monnaie perdue ; le papier reste accepté chez des commerçants qui n\'ont pas de terminal adapté. Si la loi en discussion est votée, le papier disparaîtra à partir de 2028.' },
      { q: 'Où trouver le solde et le réseau de la carte UpDéjeuner ?', a: 'Auprès de l\'émetteur, par son application ou son service client, et de votre employeur. Sa page publique n\'a pas pu être lue par nos outils le 14 novembre 2026 ; ce site ne cite donc aucun chiffre de l\'émetteur et s\'en tient à la liste de la CNTR et aux règles légales.' },
    ],
    body: (h) => `<h2>Carnet ou carte UpDéjeuner : la monnaie perdue</h2>
<p>Sur papier, un titre de ${h.eur(8)} donné pour un repas de ${h.eur(12.4, 2)} oblige à choisir : compléter ${h.eur(4.4, 2)} autrement ou donner un deuxième titre et perdre ${h.eur(3.6, 2)}. Le simulateur fait le compte sur un mois. La ${h.src('sp', 'fiche service-public.fr')} rappelle que la dépense reste limitée à ${h.eur(U.plafondJour)} par jour sur les deux supports. Le tableau compare quatre cas, pour dix-huit déjeuners.</p>
${h.table(['Déjeuner', 'Valeur du titre', 'Perdu par mois en arrondissant', 'À compléter sans arrondir'], CAS.map(([a, v]) => { const r = carnet(a, v, 18); return [h.eur(a, 2), h.eur(v), h.eur(r.perteMois, 2), h.eur(r.complementMois, 2)]; }), 'Dix-huit déjeuners par mois, titres papier', ['l', 'r', 'r', 'r'])}
<h2>Ce que l'on sait de l'émetteur Up</h2>
<p>La ${h.src('cntrEmetteurs', 'liste de la CNTR')} inscrit « Up Déjeuner, Up One » parmi les émetteurs qui proposent papier et carte, avec un siège à Gennevilliers. Le ${h.src('rapport', 'rapport du Sénat')} note que ${M.partDemat2024} % des titres étaient dématérialisés en 2024, tous émetteurs confondus. Le site public de l'émetteur a refusé nos lectures automatisées ; nous ne l'avons pas contourné et n'en reprenons aucun chiffre.</p>
<p>Les règles détaillées ont leur page : ${h.a('validite', 'validité des titres')}, ${h.a('cheque', 'chèque restaurant papier')}, et la ${h.a('emetteurs', 'liste des émetteurs')}.</p>`,
  },
  en: {
    slug: 'carte-updejeuner',
    nav: 'Carte UpDéjeuner', card: 'UpDéjeuner card or booklet: the rules, the dates and the change lost on paper',
    title: 'Carte UpDéjeuner 2026: daily limit, dates, paper or card',
    description: 'Carte UpDéjeuner in France for 2026: €25 a day, 2026 card vouchers until 28 February 2027, paper until 31 January. Simulator: change lost with paper booklets.',
    h1: 'Carte UpDéjeuner: daily limit, expiry dates, and paper or card',
    intro: 'Enter the price of your usual lunch and the value of your vouchers: the simulator compares a month with a paper booklet and a month with the carte UpDéjeuner, change lost included.',
    resume: `The carte UpDéjeuner is the meal voucher card of the issuer Up, which the French national meal voucher commission lists as "Up Déjeuner, Up One", for both paper and card. The rules of use do not come from the issuer but from the Labour Code: at most ${eur(U.plafondJour, 'en')} a day, on working days, in the département where you work and those bordering it. Dates depend on the format: 2026 card vouchers can be spent until ${day(vc.dernierJour, 'en')}, paper ones until ${day(vp.dernierJour, 'en')}, then ${VA.joursEchange} days for an exchange. Paper has a hidden cost: no change is given. Eighteen lunches of ${eur(12.4, 'en')} paid with ${eur(8, 'en')} vouchers, rounding up to the next voucher, lose ${eur(ex.perteMois, 'en')} a month; with the card, nothing. This site is independent and not affiliated with Up.`,
    faqs: [
      { open: true, q: 'Until when can I use my 2026 UpDéjeuner card?', a: `2026 vouchers loaded on a card can be spent until ${day(vc.dernierJour, 'en')}. Paper vouchers of the same year stop a month earlier, on ${day(vp.dernierJour, 'en')}. In both cases, ${VA.joursEchange} days then remain to ask for an exchange. These deadlines come from the Labour Code and apply to every issuer.` },
      { q: 'Is the UpDéjeuner booklet or card better?', a: 'The choice belongs to the employer, who orders the vouchers. For the employee, the card debits the exact amount and avoids lost change; paper is still accepted by shops without a suitable terminal. If the bill now in Parliament passes, paper will disappear from 2028.' },
      { q: 'Where can I find the balance and network of the UpDéjeuner card?', a: 'From the issuer, through its app or customer service, and from your employer. Its public page could not be read by our tools on 14 November 2026; this site therefore quotes no figure from the issuer and sticks to the CNTR list and the legal rules.' },
    ],
    body: (h) => `<h2>UpDéjeuner booklet or card: the lost change</h2>
<p>On paper, an ${h.eur(8)} voucher handed over for a ${h.eur(12.4, 2)} meal forces a choice: top up ${h.eur(4.4, 2)} another way or give a second voucher and lose ${h.eur(3.6, 2)}. The simulator does the sums over a month. The ${h.src('sp', 'service-public.fr guidance')} recalls that spending stays capped at ${h.eur(U.plafondJour)} a day on both formats. The table compares four cases, for eighteen lunches in a month, so you can see how quickly small losses add up.</p>
${h.table(['Lunch', 'Voucher value', 'Lost a month rounding up', 'To top up without rounding'], CAS.map(([a, v]) => { const r = carnet(a, v, 18); return [h.eur(a, 2), h.eur(v), h.eur(r.perteMois, 2), h.eur(r.complementMois, 2)]; }), 'Eighteen lunches a month, paper vouchers', ['l', 'r', 'r', 'r'])}
<h2>What is known about the issuer Up</h2>
<p>The ${h.src('cntrEmetteurs', 'CNTR list')} names "Up Déjeuner, Up One" among issuers offering both paper and card, with a head office in Gennevilliers. The ${h.src('rapport', 'Senate report')} notes that ${M.partDemat2024}% of vouchers were digital in 2024, across all issuers. The issuer's public site refused our automated reads; we did not work around that and quote no figure from it.</p>
<p>The detailed rules have their own pages: ${h.a('validite', 'voucher expiry')}, ${h.a('cheque', 'paper chèque restaurant')}, and the ${h.a('emetteurs', 'list of issuers')}.</p>`,
  },
});
