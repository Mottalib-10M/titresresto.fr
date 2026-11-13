import { defineGuide } from '../../lib/page-types';
import { eur, pc, EX, PL } from './_f';
import { partage, fourchetteOptimale, tauxConseille } from '../../lib/engine/tr';

/* Exonération de la contribution patronale : service-public F21059 ; rapport du Sénat n° 141 (note 19 : 12,20 à 14,64 €) ; CNTR (7,32 € au 01/01/2026). */
const f = fourchetteOptimale();
const a = partage(14, 60), b = partage(9, 50), c = partage(10, 70);
const vals = [8, 9, 10, 12.2, 13, 14.64, 16];

export default defineGuide({
  id: 'exoneration', group: 'argent', order: 1,
  tool: 'exoneration',
  related: ['employeur', 'home', 'plafond', 'reforme'],
  sources: ['sp', 'cntr', 'rapport'],
  fr: {
    slug: 'plafond-exoneration',
    nav: 'Plafond d\'exonération', card: 'Jusqu\'où la part de l\'employeur échappe aux cotisations, et la valeur de titre qui en tire le plus',
    title: 'Plafond d\'exonération titre-restaurant 2026 : 7,32 €',
    description: 'Plafond d\'exonération du titre-restaurant 2026 : 7,32 € de part employeur par titre, entre 50 et 60 % de la valeur. Calcul de la part soumise et valeur idéale.',
    h1: 'Plafond d\'exonération du titre-restaurant : 7,32 € par titre en 2026',
    intro: 'Tapez la valeur de votre titre-restaurant et la part payée par l\'employeur : le simulateur dit quelle partie reste sous le plafond d\'exonération et quelle partie devient du salaire soumis aux cotisations.',
    resume: `Le plafond d'exonération du titre-restaurant est le montant maximal de la part patronale qui échappe aux cotisations sociales et à l'impôt sur le revenu du salarié. Pour les titres de 2026, il vaut ${eur(PL, 'fr')} par titre. Deux conditions jouent ensemble. D'abord, l'employeur doit financer entre ${EX.tauxMin} % et ${EX.tauxMax} % de la valeur du titre ; hors de cette fourchette, aucune exonération ne s'applique, même pour un centime. Ensuite, dans la fourchette, seule la part qui dépasse ${eur(PL, 'fr')} est réintégrée dans le salaire. Un titre de ${eur(14, 'fr')} payé à ${EX.tauxMax} % donne ${eur(a.employeur, 'fr')} de part patronale, dont ${eur(a.reintegre, 'fr')} soumis aux cotisations. Les valeurs de ${eur(f.min, 'fr')} à ${eur(f.max, 'fr')} sont celles où l'employeur peut atteindre exactement le plafond, d'où leur succès dans les entreprises. Le plafond des titres de 2027 n'était pas publié au 13 novembre 2026.`,
    faqs: [
      { q: 'Que se passe-t-il si mon employeur paie 70 % du titre ?', a: `Toute l'exonération tombe. Avec ${pc(c.taux, 'fr')} d'un titre de ${eur(c.valeur, 'fr')}, la part patronale de ${eur(c.employeur, 'fr')} sort de la fourchette de ${EX.tauxMin} à ${EX.tauxMax} % : elle devient entièrement du salaire soumis aux cotisations, et pas seulement l'écart. Le simulateur le signale dès que le taux sort de la fourchette.` },
      { q: 'Le plafond de 7,32 € s\'applique-t-il par jour ou par titre ?', a: `Par titre. Un salarié qui reçoit vingt titres dans le mois bénéficie vingt fois du plafond, soit jusqu'à ${eur(PL * 20, 'fr')} de part patronale exonérée ce mois-là. Il ne faut pas le confondre avec le plafond de dépense de 25 € par jour, qui limite ce que vous payez en caisse et ne touche pas aux cotisations.` },
      { q: 'Pourquoi tant d\'entreprises choisissent des titres de 12 à 15 euros ?', a: `Parce que c'est la zone où l'employeur peut verser le plafond exonéré sans sortir de la fourchette. À ${EX.tauxMax} % d'un titre de ${eur(f.min, 'fr')} ou à ${EX.tauxMin} % d'un titre de ${eur(f.max, 'fr')}, la part patronale vaut exactement ${eur(PL, 'fr')}. En dessous, il ne peut pas atteindre le plafond ; au-dessus, il doit payer des cotisations sur l'excédent.` },
      { q: 'Qui vérifie le respect du plafond d\'exonération ?', a: 'L\'Urssaf, lors d\'un contrôle de l\'entreprise. Si la part patronale dépasse le plafond ou sort de la fourchette, elle réclame les cotisations sur les sommes concernées, avec des majorations. Le salarié n\'a aucune démarche à faire : c\'est à l\'employeur de régler la paie et la déclaration sociale, et à vous de vérifier la retenue sur votre bulletin.' },
    ],
    body: (h) => `<h2>Comment le plafond d'exonération du titre-restaurant s'applique</h2>
<p>Le calcul se fait titre par titre. On prend la part payée par l'employeur, on vérifie qu'elle représente entre ${EX.tauxMin} % et ${EX.tauxMax} % de la valeur faciale, puis on la compare à ${h.eur(PL, 2)}. Avec un titre de ${h.eur(b.valeur)} payé à moitié, la part patronale de ${h.eur(b.employeur, 2)} reste sous le plafond : tout est exonéré. Avec ${h.eur(a.valeur)} à ${EX.tauxMax} %, ${h.eur(a.exonere, 2)} sont exonérés et ${h.eur(a.reintegre, 2)} deviennent du salaire. Le montant pour 2026 vient de la ${h.src('cntr', 'Commission nationale des titres-restaurant')} et de la ${h.src('sp', 'fiche service-public.fr')}.</p>
${h.table(['Valeur du titre', 'Taux le plus haut sans dépasser', 'Part patronale à ce taux'], vals.map((v) => { const t = tauxConseille(v); return [h.eur(v, 2), t === null ? 'aucun dans la fourchette' : pc(t, 'fr'), t === null ? h.eur(partage(v, EX.tauxMax).employeur, 2) : h.eur(partage(v, t).employeur, 2)]; }), 'Taux maximal qui garde toute la part patronale exonérée, titres 2026', ['l', 'r', 'r'])}
<h2>La fourchette de 50 à 60 % en pratique</h2>
<p>Pour un titre de ${h.eur(8)}, même ${EX.tauxMax} % ne donnent que ${h.eur(partage(8, 60).employeur, 2)} : l'employeur ne peut pas atteindre le plafond, il paie simplement moins. Pour un titre de ${h.eur(16)}, même ${EX.tauxMin} % donnent ${h.eur(partage(16, 50).employeur, 2)}, au-dessus du plafond : la différence est soumise aux cotisations, quelle que soit la répartition choisie. La fourchette protège aussi le salarié : sa retenue ne peut pas dépasser la moitié de la valeur du titre. Le rapport du ${h.src('rapport', 'Sénat sur la proposition de loi')} rappelle ces deux conditions et la zone de ${h.eur(f.min, 2)} à ${h.eur(f.max, 2)}.</p>
<h2>Ce qui change si le plafond augmente en 2027</h2>
<p>Le plafond est fixé pour chaque année de titres. Tant que celui de 2027 n'est pas publié, les simulateurs calculent avec ${h.eur(PL, 2)}. S'il augmente, la zone idéale se décale vers le haut et un employeur peut relever la valeur de ses titres sans payer de cotisations. Les autres règles, et les deux versions de la ${h.a('reforme', 'réforme en discussion')}, sont détaillées sur leur page ; le ${h.a('employeur', 'coût total pour l\'entreprise')} a son propre simulateur.</p>`,
  },
  en: {
    slug: 'exemption-cap',
    nav: 'Exemption cap', card: 'How much of the employer share escapes contributions, and the voucher value that gets the most out of it',
    title: 'Meal voucher exemption cap 2026: €7.32 per voucher',
    description: 'French meal voucher exemption cap for 2026: €7.32 of employer share per voucher, between 50% and 60% of face value. Works out the taxed part and the best value.',
    h1: 'Meal voucher exemption cap: €7.32 per voucher in 2026',
    intro: 'Enter the value of your meal voucher and the share your employer pays: the simulator shows how much stays under the exemption cap and how much becomes pay subject to contributions.',
    resume: `The meal voucher exemption cap is the largest employer share that escapes French social contributions and the employee's income tax. For 2026 vouchers it is ${eur(PL, 'en')} per voucher. Two conditions work together. First, the employer must fund between ${EX.tauxMin}% and ${EX.tauxMax}% of the voucher's face value; outside that band, no exemption applies at all, not even for a cent. Second, within the band, only the share above ${eur(PL, 'en')} is added back to pay. A ${eur(14, 'en')} voucher paid at ${EX.tauxMax}% gives an employer share of ${eur(a.employeur, 'en')}, of which ${eur(a.reintegre, 'en')} is subject to contributions. Face values from ${eur(f.min, 'en')} to ${eur(f.max, 'en')} are the ones where the employer can hit the cap exactly, which explains why companies favour them. The cap for 2027 vouchers had not been published as of 13 November 2026, so every figure here uses the 2026 amount.`,
    faqs: [
      { q: 'What happens if my employer pays 70% of the voucher?', a: `The whole exemption is lost. At ${pc(c.taux, 'en')} of a ${eur(c.valeur, 'en')} voucher, the ${eur(c.employeur, 'en')} employer share falls outside the ${EX.tauxMin} to ${EX.tauxMax}% band: all of it becomes pay subject to contributions, not just the difference. The simulator flags it as soon as the rate leaves the band.` },
      { q: 'Does the €7.32 cap apply per day or per voucher?', a: `Per voucher. An employee receiving twenty vouchers in a month benefits from the cap twenty times, up to ${eur(PL * 20, 'en')} of exempt employer share that month. Do not confuse it with the €25 daily spending limit, which caps what you pay at the till and has nothing to do with contributions.` },
      { q: 'Why do so many companies pick vouchers worth 12 to 15 euros?', a: `Because that is where the employer can pay the full exempt amount without leaving the band. At ${EX.tauxMax}% of ${eur(f.min, 'en')} or ${EX.tauxMin}% of ${eur(f.max, 'en')}, the employer share is exactly ${eur(PL, 'en')}. Below that range the cap cannot be reached; above it, contributions are due on the excess.` },
      { q: 'Who checks that the exemption cap is respected?', a: 'Urssaf, the body that collects social contributions, during an audit of the company. If the employer share exceeds the cap or leaves the band, it claims the contributions due, with surcharges. The employee has nothing to do: the employer handles payroll and declarations, and you simply check the deduction on your payslip.' },
    ],
    body: (h) => `<h2>How the meal voucher exemption cap is applied</h2>
<p>The calculation is done voucher by voucher. Take the share the employer pays, check that it is between ${EX.tauxMin}% and ${EX.tauxMax}% of face value, then compare it with ${h.eur(PL, 2)}. With a ${h.eur(b.valeur)} voucher paid half and half, the ${h.eur(b.employeur, 2)} employer share stays below the cap: all of it is exempt. With ${h.eur(a.valeur)} at ${EX.tauxMax}%, ${h.eur(a.exonere, 2)} is exempt and ${h.eur(a.reintegre, 2)} becomes pay. The 2026 amount comes from the ${h.src('cntr', 'National Meal Voucher Commission')} and the ${h.src('sp', 'service-public.fr guidance')}.</p>
${h.table(['Voucher value', 'Highest rate within the cap', 'Employer share at that rate'], vals.map((v) => { const t = tauxConseille(v); return [h.eur(v, 2), t === null ? 'none in the band' : pc(t, 'en'), t === null ? h.eur(partage(v, EX.tauxMax).employeur, 2) : h.eur(partage(v, t).employeur, 2)]; }), 'Highest rate that keeps the whole employer share exempt, 2026 vouchers', ['l', 'r', 'r'])}
<h2>The 50 to 60% band in practice</h2>
<p>For an ${h.eur(8)} voucher, even ${EX.tauxMax}% only gives ${h.eur(partage(8, 60).employeur, 2)}: the employer cannot reach the cap and simply pays less. For a ${h.eur(16)} voucher, even ${EX.tauxMin}% gives ${h.eur(partage(16, 50).employeur, 2)}, above the cap: the difference is subject to contributions whatever split is chosen. The band also protects the employee, whose deduction can never exceed half the voucher's value. The ${h.src('rapport', 'Senate report on the bill')} restates both conditions and the ${h.eur(f.min, 2)} to ${h.eur(f.max, 2)} range.</p>
<h2>What changes if the cap rises in 2027</h2>
<p>The cap is set for each year of vouchers. Until the 2027 figure is out, the simulators use ${h.eur(PL, 2)}. If it rises, the ideal range moves up and an employer can raise its voucher value without paying contributions. The other rules, and both versions of the ${h.a('reforme', 'reform under debate')}, have their own page; the ${h.a('employeur', 'total cost to the company')} has its own simulator.</p>`,
  },
});
