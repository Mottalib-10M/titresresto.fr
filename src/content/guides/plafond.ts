import { defineGuide } from '../../lib/page-types';
import { eur, day, U, PPL, M } from './_f';
import { peutPayer } from '../../lib/engine/tr';

/* Plafond journalier : service-public F21059 (25 €) ; rapport du Sénat n° 141 (R. 3262-10, décret n° 2022-1266, 19 € avant) ;
   texte de la commission n° 142 (double plafond fixé par décret à partir de 2028). */
const base = { annee: 2026 as const, jour: 'semaine' as const, travailleCeJour: true, autorise: true, adoptee: true, version: 'senat' as const };
const r32 = peutPayer({ ...base, produit: 'repas', montant: 32 });
const cas = [12, 25, 32, 48];

export default defineGuide({
  id: 'plafond', group: 'usage', order: 2,
  tool: 'achat',
  related: ['supermarche', 'dimanche', 'home', 'reforme'],
  sources: ['sp', 'rapport', 'texteCommission'],
  fr: {
    slug: 'plafond-25-euros',
    nav: 'Plafond de 25 € par jour', card: 'Combien payer en titres en une journée, et comment régler le reste quand l\'addition dépasse',
    title: 'Plafond journalier titre-restaurant 2026 : 25 € par jour',
    description: 'Plafond journalier du titre-restaurant en 2026 : 25 € par jour, tous titres confondus. Simulateur : ce qui passe en titres et ce qui reste à payer en caisse.',
    h1: 'Plafond journalier du titre-restaurant : 25 € par jour en 2026',
    intro: 'Tapez le montant de l\'addition, ce que vous achetez et le jour : le simulateur applique le plafond journalier du titre-restaurant et dit ce qui passe en titres et ce qui reste à régler autrement.',
    resume: `Le plafond journalier du titre-restaurant limite à ${eur(U.plafondJour, 'fr')} la somme que vous pouvez payer en titres sur une même journée, que vous utilisiez une carte, une application ou des titres papier. Ce plafond est fixé par l'article R. 3262-10 du code du travail ; il est passé de ${eur(U.plafondJourAvant2022, 'fr')} à ${eur(U.plafondJour, 'fr')} avec le décret du 29 septembre 2022. Il compte par jour et non par repas : un déjeuner de ${eur(18, 'fr')} et un en-cas de ${eur(10, 'fr')} le même jour dépassent la limite de ${eur(3, 'fr')}. Au-delà, le complément se règle par carte bancaire ou en espèces. Selon le terminal, une carte de titres peut refuser toute la transaction quand le montant dépasse ce qui reste autorisé ce jour-là : demandez alors au commerçant de séparer le paiement. Pour une addition de ${eur(32, 'fr')}, ${eur(r32.payable, 'fr')} passent en titres et ${eur(r32.reste, 'fr')} restent à payer. Si la proposition de loi est votée dans la version du Sénat, le plafond sera majoré pour les repas et les produits prêts à manger à partir de 2028, les montants étant fixés par décret.`,
    faqs: [
      { q: 'Le plafond de 25 € compte-t-il par repas ou par journée ?', a: `Par journée. Tous les paiements en titres d'une même date s'additionnent, quel que soit le nombre de commerçants. Un petit-déjeuner, un déjeuner et des courses du soir partagent les mêmes ${eur(U.plafondJour, 'fr')}. Le lendemain, le compteur repart de zéro, même si vous n'avez rien dépensé la veille : le solde non utilisé reste sur la carte, mais le plafond, lui, ne se reporte pas.` },
      { q: 'Peut-on payer 40 € en mélangeant titres et carte bancaire ?', a: 'Oui. Le commerçant encaisse jusqu\'à 25 € en titres et le reste par un autre moyen de paiement. Avec une carte de titres, annoncez le montant à débiter avant de la présenter : certains terminaux tentent le montant total et refusent la transaction. Avec des titres papier, payez le complément en espèces ou par carte, sans rendu de monnaie sur les titres.' },
      { q: 'Le plafond est-il le même au restaurant et au supermarché ?', a: `Oui, en 2026, le même plafond de ${eur(U.plafondJour, 'fr')} s'applique partout. Le texte de la commission du Sénat prévoit, à partir de 2028, un plafond majoré pour les repas, les produits directement consommables et les fruits et légumes, et un plafond de base pour les autres courses ; leurs montants, fixés par décret, ne sont pas connus. Le texte de l'Assemblée ne prévoyait pas cette distinction.` },
      { q: 'Un employeur peut-il fixer un plafond plus bas que 25 € ?', a: 'Le plafond de 25 € est une limite d\'utilisation fixée par la réglementation, pas un montant que l\'employeur choisit. L\'employeur fixe la valeur des titres et le nombre distribué. Votre émetteur peut toutefois appliquer ses propres limites techniques sur la carte : en cas de refus inexpliqué sous 25 €, vérifiez le solde et le département du commerçant.' },
    ],
    body: (h) => `<h2>Le plafond journalier du titre-restaurant au quotidien</h2>
<p>Le plafond porte sur ce que vous dépensez, pas sur ce que vous recevez. Un salarié qui reçoit des titres de ${h.eur(9)} peut en cumuler plusieurs pour un repas plus cher, tant que le total de la journée reste sous ${h.eur(U.plafondJour)}. La ${h.src('sp', 'fiche service-public.fr')} le rappelle avec les autres règles d'usage : jours ouvrables (du lundi au samedi, hors jours fériés), département du lieu de travail et départements limitrophes. Le tableau ci-dessous montre quatre additions, un jour de semaine, pour un repas au restaurant.</p>
${h.table(['Addition', 'Payé en titres', 'À régler autrement'], cas.map((m) => { const r = peutPayer({ ...base, produit: 'repas', montant: m }); return [h.eur(m), h.eur(r.payable), h.eur(r.reste)]; }), `Plafond de ${h.eur(U.plafondJour)} par jour, règles de 2026`, ['l', 'r', 'r'])}
<h2>Pourquoi 25 € et pas 19 €</h2>
<p>Jusqu'en 2022, la limite était de ${h.eur(U.plafondJourAvant2022)} par jour. Le décret du 29 septembre 2022 l'a portée à ${h.eur(U.plafondJour)}, en même temps que les titres s'ouvraient à tous les produits alimentaires. Le ${h.src('rapport', 'rapport du Sénat')} rappelle cette évolution. Il relève aussi qu'un titre valait en moyenne ${h.eur(M.valeurFacialeMoyenne2024, 2)} en 2024 : la limite journalière permet donc de cumuler près de trois titres moyens le même jour.</p>
<h2>Ce que prévoit la réforme pour 2028</h2>
<p>Le ${h.src('texteCommission', 'texte de la commission du Sénat')} du ${h.day(PPL.commission)} prévoit un plafond journalier majoré pour les repas, les produits directement consommables et les fruits et légumes, et un plafond de base pour les autres produits alimentaires. Aucun montant n'est écrit dans la loi : un décret les fixera. Tant que le décret n'existe pas, le simulateur garde ${h.eur(U.plafondJour)} et l'indique. Les ${h.a('supermarche', 'règles des courses')} et le ${h.a('dimanche', 'cas du dimanche')} ont leur page.</p>`,
  },
  en: {
    slug: 'daily-limit',
    nav: '€25 daily limit', card: 'How much you can pay with vouchers in one day, and how to settle the rest when the bill is higher',
    title: 'Meal voucher daily limit 2026: €25 a day, how it works',
    description: 'French meal voucher daily limit for 2026: €25 a day across all vouchers. Simulator: what goes on vouchers and what is left to pay, by product and day.',
    h1: 'Meal voucher daily limit: €25 a day in 2026',
    intro: 'Enter the bill, what you are buying and the day: the simulator applies the meal voucher daily limit and shows what goes on vouchers and what you still have to pay another way.',
    resume: `The French meal voucher daily limit caps at ${eur(U.plafondJour, 'en')} what you can pay with vouchers on a single day, whether you use a card, an app or paper vouchers. It is set by article R. 3262-10 of the Labour Code and rose from ${eur(U.plafondJourAvant2022, 'en')} to ${eur(U.plafondJour, 'en')} under the decree of 29 September 2022. It counts per day, not per meal: an ${eur(18, 'en')} lunch and a ${eur(10, 'en')} snack on the same day exceed the limit by ${eur(3, 'en')}. Anything above it is paid by bank card or cash. Depending on the terminal, a voucher card may reject the whole transaction when the amount exceeds what is still allowed that day: ask the shop to split the payment. On a ${eur(32, 'en')} bill, ${eur(r32.payable, 'en')} goes on vouchers and ${eur(r32.reste, 'en')} is left to pay. If the bill now in Parliament passes in the Senate version, the limit will be higher for meals and ready-to-eat food from 2028, with the amounts set by decree.`,
    faqs: [
      { q: 'Does the €25 limit count per meal or per day?', a: `Per day. All voucher payments on the same date add up, however many shops are involved. A breakfast, a lunch and evening groceries share the same ${eur(U.plafondJour, 'en')}. The next day the counter starts again from zero, even if you spent nothing the day before: the unused balance stays on the card, but the limit itself does not roll over.` },
      { q: 'Can I pay €40 by mixing vouchers and a bank card?', a: 'Yes. The shop takes up to €25 in vouchers and the rest by another means of payment. With a voucher card, say how much to debit before you present it: some terminals try the full amount and decline. With paper vouchers, pay the rest in cash or by card, knowing that no change is given on the vouchers.' },
      { q: 'Is the limit the same at restaurants and supermarkets?', a: `Yes. In 2026 the same ${eur(U.plafondJour, 'en')} limit applies everywhere. The Senate committee text provides, from 2028, a higher limit for meals, ready-to-eat food and fruit and vegetables, and a basic limit for other groceries; their amounts, to be set by decree, are not known. The Assembly text did not make that distinction.` },
      { q: 'Can an employer set a limit lower than €25?', a: 'The €25 limit is a spending rule set by regulation, not an amount the employer chooses. The employer sets the voucher value and how many are handed out. Your card issuer may still apply its own technical limits: if a payment under €25 is refused for no clear reason, check the balance and the shop\'s département.' },
    ],
    body: (h) => `<h2>The meal voucher daily limit in everyday use</h2>
<p>The limit applies to what you spend, not to what you receive. An employee with ${h.eur(9)} vouchers can combine several for a pricier meal, as long as the day's total stays under ${h.eur(U.plafondJour)}. The ${h.src('sp', 'service-public.fr guidance')} sets it out with the other rules of use: working days, the département where you work and the neighbouring ones. The table below shows four bills on a weekday, for a restaurant meal.</p>
${h.table(['Bill', 'Paid with vouchers', 'Paid another way'], cas.map((m) => { const r = peutPayer({ ...base, produit: 'repas', montant: m }); return [h.eur(m), h.eur(r.payable), h.eur(r.reste)]; }), `${h.eur(U.plafondJour)} daily limit, 2026 rules`, ['l', 'r', 'r'])}
<h2>Why €25 and not €19</h2>
<p>Until 2022 the limit was ${h.eur(U.plafondJourAvant2022)} a day. The decree of 29 September 2022 raised it to ${h.eur(U.plafondJour)}, at the same time as vouchers were opened to all food products. The ${h.src('rapport', 'Senate report')} recalls this change. It also notes that the average voucher was worth ${h.eur(M.valeurFacialeMoyenne2024, 2)} in 2024: the daily limit therefore allows close to three average vouchers on the same day.</p>
<h2>What the reform plans for 2028</h2>
<p>The ${h.src('texteCommission', 'Senate committee text')} of ${h.day(PPL.commission)} provides a higher daily limit for meals, ready-to-eat food and fruit and vegetables, and a basic limit for other food products. No amount is written into the law: a decree will set them. Until the decree exists, the simulator keeps ${h.eur(U.plafondJour)} and says so. The ${h.a('supermarche', 'grocery rules')} and the ${h.a('dimanche', 'Sunday case')} have their own pages.</p>`,
  },
});
