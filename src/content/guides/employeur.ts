import { defineGuide } from '../../lib/page-types';
import { eur, EX, M, PL } from './_f';
import { coutEmployeur } from '../../lib/engine/tr';

/* Coût employeur : service-public F21059 (50-60 %, 7,32 €, paiement à la livraison) ; rapport du Sénat n° 141 (235 000 employeurs,
   6 millions de bénéficiaires, valeur moyenne 8,94 € en 2024) ; texte de la commission n° 142 (art. L. 3262-1-1 : remises interdites). */
const c10 = coutEmployeur(10, 19, 11, 12, 60);
const c10b = coutEmployeur(10, 19, 11, 14, 60);
const cas = [[9, 50], [12, 60], [13, 55], [14, 60], [16, 50]] as const;

export default defineGuide({
  id: 'employeur', group: 'argent', order: 3,
  tool: 'cout',
  related: ['exoneration', 'reforme', 'home', 'teletravail'],
  sources: ['sp', 'rapport', 'texteCommission'],
  fr: {
    slug: 'cout-employeur',
    nav: 'Coût pour l\'employeur', card: 'Pour les employeurs : budget annuel des titres pour une équipe, part exonérée et part soumise aux cotisations',
    title: 'Part employeur titre-restaurant 2026 : coût et exonération',
    description: 'Part employeur du titre-restaurant en 2026 : coût annuel pour une équipe, part exonérée jusqu\'à 7,32 € par titre et part soumise aux cotisations, en un calcul.',
    h1: 'Part employeur du titre-restaurant : le coût d\'une équipe en 2026',
    intro: 'Tapez le nombre de salariés, de titres par mois, la valeur du titre et la part de l\'employeur : le simulateur donne la part employeur du titre-restaurant sur un an, ce qui est exonéré et ce qui est soumis aux cotisations.',
    resume: `La part employeur du titre-restaurant est la fraction de la valeur faciale que l'entreprise finance, le salarié payant le reste par une retenue sur sa paie. Elle doit se situer entre ${EX.tauxMin} % et ${EX.tauxMax} % de la valeur du titre pour être exonérée de cotisations, dans la limite de ${eur(PL, 'fr')} par titre pour les titres de 2026. Pour une équipe de dix salariés recevant dix-neuf titres de ${eur(12, 'fr')} par mois sur onze mois, avec une part de ${EX.tauxMax} %, l'entreprise verse ${eur(c10.contribution, 'fr')} sur l'année, entièrement exonérés. Avec des titres de ${eur(14, 'fr')} au même taux, la contribution passe à ${eur(c10b.contribution, 'fr')}, dont ${eur(c10b.soumis, 'fr')} soumis aux cotisations. L'employeur règle la commande à l'émetteur au plus tard à la livraison, pour la valeur totale des titres, puis récupère la part du salarié sur la paie. S'y ajoutent les frais de l'émetteur, qui dépendent du contrat et ne sont pas publiés. Selon le rapport du Sénat, ${M.employeurs.toLocaleString('fr-FR')} employeurs distribuent des titres à ${M.beneficiairesMillions} millions de salariés.`,
    faqs: [
      { q: 'Une petite entreprise peut-elle mettre en place des titres-restaurant ?', a: 'Oui, quelle que soit sa taille, y compris avec un seul salarié. L\'employeur choisit un émetteur, fixe la valeur du titre et sa part entre 50 et 60 %, puis commande chaque mois le nombre de titres correspondant aux jours travaillés. Les titres s\'achètent uniquement auprès d\'une société spécialisée dans leur émission, payée au plus tard à la livraison.' },
      { q: 'Les frais de l\'émetteur sont-ils compris dans le simulateur ?', a: 'Non. Les frais de gestion, de livraison ou de carte varient selon l\'émetteur, le volume et la négociation, et ils ne sont publiés nulle part de façon officielle. Le simulateur calcule seulement la contribution patronale, sa part exonérée et la part retenue sur les salaires. Ajoutez les frais de votre contrat pour obtenir le coût complet.' },
      { q: 'Les remises des émetteurs aux employeurs vont-elles disparaître ?', a: 'C\'est ce que prévoit le texte de la commission du Sénat : à partir du 1er janvier 2027, un émetteur ne pourrait plus vendre ses titres à l\'employeur en dessous de leur valeur, que ce soit par une remise, un rabais ou une ristourne. La mesure n\'est pas votée. Si elle l\'est, les entreprises qui obtenaient une remise paieront leurs titres à la valeur faciale.' },
    ],
    body: (h) => `<h2>Calculer la part employeur du titre-restaurant</h2>
<p>Le calcul tient en trois multiplications : nombre de salariés, nombre de titres par mois, nombre de mois servis. On obtient le nombre de titres de l'année, que l'on multiplie par la part patronale d'un titre. La ${h.src('sp', 'fiche service-public.fr')} précise que l'employeur fixe librement la valeur des titres et leur nombre, dans la limite d'un titre par repas compris dans l'horaire de travail. Le tableau compare cinq choix courants pour un salarié qui reçoit dix-neuf titres par mois pendant onze mois.</p>
${h.table(['Valeur et taux', 'Part employeur sur un an', 'Dont soumis aux cotisations'], cas.map(([v, t]) => { const c = coutEmployeur(1, 19, 11, v, t); return [`${h.eur(v)} à ${t} %`, h.eur(c.contribution), h.eur(c.soumis)]; }), 'Un salarié, 19 titres par mois, 11 mois, plafond 2026', ['l', 'r', 'r'])}
<h2>Pourquoi le taux et la valeur se choisissent ensemble</h2>
<p>Un taux élevé sur une petite valeur et un taux bas sur une grande valeur peuvent coûter la même chose à l'entreprise tout en laissant au salarié des retenues très différentes. Le choix le plus efficace est celui qui met la part patronale au plus près de ${h.eur(PL, 2)} sans la dépasser : chaque euro versé est alors exonéré. Le ${h.src('rapport', 'rapport du Sénat')} relève une valeur faciale moyenne de ${h.eur(M.valeurFacialeMoyenne2024, 2)} en 2024, nettement sous la zone qui permet d'atteindre le plafond. Le détail des seuils est sur la page du ${h.a('exoneration', 'plafond d\'exonération')}.</p>
<h2>Ce que la réforme changerait pour les entreprises</h2>
<p>Le ${h.src('texteCommission', 'texte de la commission du Sénat')} interdit, dès le 1er janvier 2027, toute remise qui ferait payer les titres à l'employeur moins que leur valeur, et oblige les émetteurs à remettre chaque année aux commerçants le détail de leurs frais. Il prévoit aussi le passage au titre uniquement dématérialisé en 2028. Les deux versions du texte sont comparées sur la page de la ${h.a('reforme', 'réforme')}.</p>`,
  },
  en: {
    slug: 'employer-cost',
    nav: 'Cost to the employer', card: 'For employers: annual voucher budget for a team, the exempt part and the part subject to contributions',
    title: 'Employer meal voucher contribution 2026: cost and exemption',
    description: 'Employer contribution to French meal vouchers in 2026: annual cost for a team, the share exempt up to €7.32 per voucher and the part subject to contributions.',
    h1: 'Employer meal voucher contribution: what a team costs in 2026',
    intro: 'Enter the number of employees, vouchers per month, the voucher value and the employer share: the simulator gives the employer meal voucher contribution over a year, what is exempt and what is subject to contributions.',
    resume: `The employer contribution to a French meal voucher is the part of the face value the company pays, the employee paying the rest through a deduction from pay. It must be between ${EX.tauxMin}% and ${EX.tauxMax}% of the voucher's value to be exempt from contributions, up to ${eur(PL, 'en')} per voucher for 2026 vouchers. For a team of ten employees receiving nineteen ${eur(12, 'en')} vouchers a month for eleven months, with a ${EX.tauxMax}% share, the company pays ${eur(c10.contribution, 'en')} over the year, all of it exempt. With ${eur(14, 'en')} vouchers at the same rate, the contribution rises to ${eur(c10b.contribution, 'en')}, of which ${eur(c10b.soumis, 'en')} is subject to contributions. The employer pays the issuer on delivery at the latest, for the full value of the vouchers, then recovers the employee share through payroll. Issuer fees come on top; they depend on the contract and are not published. According to the Senate report, ${M.employeurs.toLocaleString('en-GB')} employers hand out vouchers to ${M.beneficiairesMillions} million employees.`,
    faqs: [
      { q: 'Can a small business offer meal vouchers?', a: 'Yes, whatever its size, even with a single employee. The employer chooses an issuer, sets the voucher value and its share between 50 and 60%, then orders each month the number of vouchers matching the days worked. Vouchers can only be bought from a company that specialises in issuing them, paid on delivery at the latest.' },
      { q: 'Are issuer fees included in the simulator?', a: 'No. Management, delivery or card fees vary with the issuer, the volume and the negotiation, and they are not officially published anywhere. The simulator only works out the employer contribution, its exempt part and the share deducted from pay. Add the fees in your contract to get the full cost.' },
      { q: 'Will issuer discounts to employers disappear?', a: 'That is what the Senate committee text provides: from 1 January 2027, an issuer could no longer sell vouchers to an employer below their value, whether through a discount, a rebate or a refund. The measure has not been passed. If it is, companies that obtained a discount will pay face value for their vouchers.' },
    ],
    body: (h) => `<h2>Working out the employer meal voucher contribution</h2>
<p>The calculation takes three multiplications: employees, vouchers per month, months served. That gives the number of vouchers in the year, multiplied by the employer share of one voucher. The ${h.src('sp', 'service-public.fr guidance')} states that the employer freely sets the voucher value and number, up to one voucher per meal within working hours. The table compares five common choices for an employee receiving nineteen vouchers a month for eleven months.</p>
${h.table(['Value and rate', 'Employer share over a year', 'Of which subject to contributions'], cas.map(([v, t]) => { const c = coutEmployeur(1, 19, 11, v, t); return [`${h.eur(v)} at ${t}%`, h.eur(c.contribution), h.eur(c.soumis)]; }), 'One employee, 19 vouchers a month, 11 months, 2026 cap', ['l', 'r', 'r'])}
<h2>Why rate and value are chosen together</h2>
<p>A high rate on a small voucher and a low rate on a large one can cost the company the same while leaving employees with very different deductions. The most efficient choice puts the employer share as close as possible to ${h.eur(PL, 2)} without exceeding it: every euro paid is then exempt. The ${h.src('rapport', 'Senate report')} gives an average face value of ${h.eur(M.valeurFacialeMoyenne2024, 2)} in 2024, well below the range where the cap can be reached. The thresholds are set out on the ${h.a('exoneration', 'exemption cap')} page.</p>
<h2>What the reform would change for companies</h2>
<p>The ${h.src('texteCommission', 'Senate committee text')} bans, from 1 January 2027, any discount that would let the employer pay less than the vouchers' value, and requires issuers to give retailers a yearly breakdown of their fees. It also moves to card or app only vouchers in 2028. Both versions of the bill are compared on the ${h.a('reforme', 'reform')} page.</p>`,
  },
});
