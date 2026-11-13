/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const P = K.P, X = P.exoneration, U = P.usage, PPL = P.ppl, f = K.fourchetteOptimale();
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Simulators and guides on French meal vouchers (titres-restaurant) for 2026, in French and English. Figures re-read on ${P.retrieved_at} on service-public.fr (page F21059), the CNTR site and Senate report no. ${PPL.rapport}. Employer share must be ${X.tauxMin}-${X.tauxMax}% of face value to be exempt, up to ${X.plafond['2026']} EUR per 2026 voucher (face values ${f.min}-${f.max} EUR reach the cap exactly). Daily spending limit ${U.plafondJour} EUR. Any food product payable until ${U.toutAlimentaireJusquau}. Sundays and public holidays only for employees working that day with employer permission. 2026 card vouchers valid until 2027-02-28, paper until 2027-01-31, then 15 days to exchange. Bill no. ${PPL.numeroAN} passed by the National Assembly on ${PPL.adoptionAN}; Senate committee text no. ${PPL.texteCommission} of ${PPL.commission}; Senate plenary on ${PPL.seanceSenat}; not enacted. Both versions extend groceries to 2027 and make vouchers digital-only in 2028; the Assembly version also opens Sundays to all and three-year validity, removed by the Senate committee. The 2027 exemption cap was not published as of ${P.retrieved_at}. Browser-only tools, nothing sent or stored. Independent site published by Radif Partners: not an issuer, not a public body. Contains information from service-public.fr (DILA, Licence Ouverte 2.0). Last updated ${LAST_UPDATED}.`, '',
    `- [Simulateur titres-restaurant](${SITE_URL}${route('home', 'fr')})`, `- [Meal voucher simulator](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.fr}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.fr.nav}](${SITE_URL}${route(p.id, 'fr')}): ${p.fr.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
    ]), '']),
    '## About', `- [Méthode](${SITE_URL}${route('method', 'fr')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [À propos](${SITE_URL}${route('about', 'fr')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
