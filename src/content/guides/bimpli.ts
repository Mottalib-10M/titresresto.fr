import { defineGuide } from '../../lib/page-types';
import { eur, U, M, EM } from './_f';
import { commission } from '../../lib/engine/tr';

/* Bimpli commerçant : CGA Swile et Bimpli mises à jour le 13/03/2026 (Bimpli = marque dont Swile est propriétaire ;
   paiement seulement si le solde quotidien est créditeur) ; CNTR : agrément du commerce, trois étapes, 40 jours ouvrés ;
   commission moyenne d'acceptation (rapport du Sénat n° 141) ; commerces non tenus d'accepter (service-public F21059).
   bimpli.com présentait un certificat invalide le 14/11/2026 : non lu. */
const T = M.commissionAcceptationMoyenne;
const CAS = [1000, 3000, 8000, 20000] as const;
const ex = commission(3000, T, 0, 0);

export default defineGuide({
  id: 'bimpli', group: 'cartes', order: 18,
  tool: 'commission',
  related: ['swile', 'emetteurs', 'carte', 'supermarche'],
  sources: ['swileCga', 'cntrAgrement', 'rapport', 'sp'],
  fr: {
    slug: 'bimpli-commercant',
    nav: 'Bimpli commerçant', card: 'Accepter les titres Bimpli et les autres : l\'agrément, le contrat et la commission',
    title: 'Bimpli commerçant 2026 : accepter les titres et leur coût',
    description: 'Bimpli commerçant en 2026 : agrément de la CNTR, contrat d\'affiliation avec l\'émetteur, commission sur chaque paiement. Simulateur : ce que coûtent les titres.',
    h1: 'Bimpli commerçant : accepter les titres-restaurant et ce que ça coûte',
    intro: 'Tapez ce que votre commerce encaisse en titres chaque mois et la commission de l\'émetteur : le simulateur donne ce que l\'acceptation coûte au commerçant, par mois et par an, pour Bimpli comme pour les autres.',
    resume: `Un commerçant qui veut accepter les titres Bimpli passe par deux étapes. D'abord l'agrément de la Commission nationale des titres-restaurant, commun à tous les émetteurs : la CNTR décrit une demande en trois temps, choix de l'activité, dossier, envoi par courrier, et annonce un délai de traitement de ${EM.delaiAgrementJoursOuvres} jours ouvrés. Ensuite un contrat d'affiliation avec chaque émetteur. Pour Bimpli, ce sont les conditions générales d'affiliation de Swile, qui précisent que Bimpli est une marque dont Swile est propriétaire. Chaque émetteur prélève une commission sur les paiements : le rapport du Sénat l'évalue à ${T} % en moyenne. Pour ${eur(3000, 'fr')} encaissés en titres par mois, cela représente ${eur(ex.mois, 'fr')} par mois et ${eur(ex.an, 'fr')} par an. Un commerce reste libre de refuser les titres. Ce site est indépendant et n'est affilié ni à Bimpli ni à Swile.`,
    faqs: [
      { open: true, q: 'Comment un commerçant accepte-t-il les titres Bimpli ?', a: `Il lui faut l'agrément de la CNTR, qui vaut pour tous les émetteurs, puis un contrat d'affiliation avec l'émetteur, ici les conditions générales d'affiliation de Swile pour la marque Bimpli. La CNTR annonce ${EM.delaiAgrementJoursOuvres} jours ouvrés de traitement. Le terminal doit ensuite être paramétré pour les cartes de titres ; votre banque ou votre fournisseur de terminal vous le confirmera.` },
      { q: 'Un commerce est-il obligé d\'accepter les titres-restaurant ?', a: 'Non. Selon service-public.fr, les restaurants et les commerces ne sont pas tenus d\'accepter les titres. Un commerçant peut aussi accepter certains émetteurs et pas d\'autres, ou limiter la liste des produits payables en titres. L\'afficher en caisse évite des refus au moment de payer.' },
      { q: 'Combien coûte l\'acceptation des titres-restaurant pour un commerçant ?', a: `Une commission prélevée par l'émetteur sur chaque paiement, parfois avec des frais fixes, selon le contrat. Le rapport du Sénat cite une commission moyenne de ${T} %. Le simulateur applique le taux que vous saisissez : reportez celui de votre contrat pour un chiffre exact.` },
    ],
    body: (h) => `<h2>Ce que coûtent les titres Bimpli au commerçant</h2>
<p>Le simulateur applique au montant encaissé en titres la commission de l'émetteur, et ajoute si besoin des frais fixes par paiement. Le taux proposé par défaut est la moyenne de ${T} % relevée par le ${h.src('rapport', 'rapport du Sénat')} ; votre contrat peut prévoir autre chose. Le tableau donne le coût annuel pour quatre niveaux d'encaissement mensuel.</p>
${h.table(['Encaissé en titres par mois', 'Commission par mois', 'Commission par an'], CAS.map((m) => { const r = commission(m, T, 0, 0); return [h.eur(m), h.eur(r.mois), h.eur(r.an)]; }), `Commission moyenne de ${T} %, sans frais fixes`, ['l', 'r', 'r'])}
<h2>Agrément de la CNTR et contrat d'affiliation Bimpli</h2>
<p>La ${h.src('cntrAgrement', 'page de demande d\'agrément de la CNTR')} décrit la procédure pour les commerces alimentaires. Les ${h.src('swileCga', 'conditions générales d\'affiliation de Swile et Bimpli')}, mises à jour le 13 mars 2026, encadrent ensuite la relation avec l'émetteur ; elles précisent notamment qu'un paiement par carte Bimpli n'est possible que si le solde quotidien du salarié est créditeur. Côté client, le plafond reste de ${h.eur(U.plafondJour)} par jour, comme le rappelle la ${h.src('sp', 'fiche service-public.fr')}.</p>
<p>Pour les salariés, voyez ${h.a('swile', 'Swile ticket restaurant')} et ${h.a('carte', 'la carte refusée en caisse')}.</p>`,
  },
  en: {
    slug: 'bimpli-commercant',
    nav: 'Bimpli commerçant', card: 'Accepting Bimpli and other vouchers: approval, contract and commission',
    title: 'Bimpli commerçant 2026: accepting meal vouchers and the cost',
    description: 'Bimpli commerçant in France for 2026: CNTR approval, an affiliation contract with the issuer, a commission on each payment. Simulator: what vouchers cost shops.',
    h1: 'Bimpli commerçant: accepting meal vouchers and what it costs',
    intro: 'Enter what your shop takes in meal vouchers each month and the issuer commission: the simulator gives what acceptance costs the Bimpli commerçant, per month and per year, as for any other issuer.',
    resume: `A French shop that wants to accept Bimpli vouchers goes through two steps. First, approval from the national meal voucher commission, common to all issuers: the CNTR describes a three-part application, choosing the activity, preparing the file and sending it by post, and announces a processing time of ${EM.delaiAgrementJoursOuvres} working days. Then an affiliation contract with each issuer. For Bimpli, these are Swile's general affiliation terms, which state that Bimpli is a brand owned by Swile. Each issuer takes a commission on payments: the Senate report puts it at ${T}% on average. For ${eur(3000, 'en')} taken in vouchers a month, that is ${eur(ex.mois, 'en')} a month and ${eur(ex.an, 'en')} a year. A shop remains free to refuse vouchers. This site is independent and affiliated with neither Bimpli nor Swile.`,
    faqs: [
      { open: true, q: 'How does a shop start accepting Bimpli vouchers?', a: `It needs CNTR approval, which covers every issuer, then an affiliation contract with the issuer, here Swile's general affiliation terms for the Bimpli brand. The CNTR announces ${EM.delaiAgrementJoursOuvres} working days of processing. The terminal must then be set up for voucher cards; your bank or terminal provider will confirm how.` },
      { q: 'Does a shop have to accept meal vouchers?', a: 'No. According to service-public.fr, restaurants and shops are not required to accept vouchers. A shop can also accept some issuers and not others, or limit the list of products payable with vouchers. Showing this at the till helps avoid refusals at the moment of payment.' },
      { q: 'How much does accepting meal vouchers cost a shop?', a: `A commission taken by the issuer on each payment, sometimes with fixed fees, depending on the contract. The Senate report quotes an average commission of ${T}%. The simulator applies the rate you enter: use the one in your contract for an exact figure.` },
    ],
    body: (h) => `<h2>What Bimpli vouchers cost the shop</h2>
<p>The simulator applies the issuer commission to the amount taken in vouchers, and adds fixed fees per payment if needed. The default rate is the ${T}% average found by the ${h.src('rapport', 'Senate report')}; your contract may say otherwise. The table gives the yearly cost for four levels of monthly takings.</p>
${h.table(['Taken in vouchers a month', 'Commission a month', 'Commission a year'], CAS.map((m) => { const r = commission(m, T, 0, 0); return [h.eur(m), h.eur(r.mois), h.eur(r.an)]; }), `Average commission of ${T}%, no fixed fees`, ['l', 'r', 'r'])}
<h2>CNTR approval and the Bimpli affiliation contract</h2>
<p>The ${h.src('cntrAgrement', 'CNTR approval page')} describes the procedure for food shops. The ${h.src('swileCga', 'Swile and Bimpli general affiliation terms')}, updated on 13 March 2026, then govern the relationship with the issuer; they state in particular that a Bimpli card payment only goes through if the employee's daily balance is in credit. On the customer side, the limit stays at ${h.eur(U.plafondJour)} a day, as the ${h.src('sp', 'service-public.fr guidance')} recalls.</p>
<p>For employees paying with these cards, see ${h.a('swile', 'Swile ticket restaurant')} and ${h.a('carte', 'the card refused at the till')}, which list the rules a till applies, one by one.</p>`,
  },
});
