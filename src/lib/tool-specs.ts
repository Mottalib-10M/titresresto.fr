/**
 * Simulateurs déclaratifs du site. Chaque chiffre vient de params-2026.json à travers les fonctions pures de
 * engine/tr.ts. Une spec liste ses champs (visibles d'abord, `adv` repliés) et une fonction `run` qui rend la
 * carte de résultat. Rien ne sort du navigateur.
 */
import type { ToolSpec, V, ToolOut } from './tool-types';
import { resolve } from './tool-types';
import { formatMoney, formatNumber, formatDecimal, displayDate, type Lang } from './format';
import * as E from './engine/tr';
import P from '../data/params-2026.json';

export type Args = Record<string, number | string>;
const T = (l: Lang, fr: string, en: string) => (l === 'fr' ? fr : en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
/** Montant cité : centimes seulement s'il y en a (7,32 €, mais 25 €). */
const eur = (x: number, l: Lang) => formatMoney(x, Math.abs(x - Math.round(x)) < 0.005 ? 0 : 2, l);
/** Montant calculé : à l'euro (RECETTE §4.1). */
const eur0 = (x: number, l: Lang) => formatMoney(Math.round(x), 0, l);
const pct = (x: number, l: Lang) => (l === 'fr' ? `${formatDecimal(x, 1, l)} %` : `${formatDecimal(x, 1, l)}%`);
const day = (iso: string, l: Lang) => displayDate(iso, l === 'fr' ? 'fr-FR' : 'en-GB');
const int = (x: number, l: Lang) => formatNumber(x, 0, l);
const yn = (l: Lang) => [{ value: 'oui', label: T(l, 'Oui', 'Yes') }, { value: 'non', label: T(l, 'Non', 'No') }];
const PL = E.PLAFOND_2026;
const A = (a: Args | undefined, k: string, d: number | string) => (a && a[k] !== undefined ? a[k] : d);

/* Champs communs : valeur du titre et part de l'employeur. */
const VALEUR = (l: Lang, def: number) => ({ id: 'valeur', label: T(l, 'Valeur d\'un titre', 'Value of one voucher'), def, unit: '€', decimals: 2, max: 100, help: T(l, 'Le montant écrit sur le titre ou crédité par repas sur la carte.', 'The amount printed on the voucher, or credited per meal on the card.') });
const TAUX = (l: Lang, def: number) => ({ id: 'taux', label: T(l, 'Part payée par l\'employeur', 'Share paid by the employer'), def, unit: '%', decimals: 1, max: 100, help: T(l, `La loi demande entre ${TAUX_TXT(l)} pour que la part soit exonérée.`, `The law asks for ${TAUX_TXT(l)} for the share to be exempt.`) });
const TAUX_TXT = (l: Lang) => T(l, `${E.TAUX_MIN} % et ${E.TAUX_MAX} %`, `between ${E.TAUX_MIN}% and ${E.TAUX_MAX}%`);
const ANNEE = (l: Lang, def: string) => ({ kind: 'select' as const, id: 'annee', label: T(l, 'Année de l\'achat', 'Year of the purchase'), def, options: [{ value: '2026', label: '2026' }, { value: '2027', label: '2027' }, { value: '2028', label: '2028' }] });
const ADOPTEE = (l: Lang) => ({ kind: 'choice' as const, id: 'adoptee', label: T(l, 'Si la loi en discussion est votée', 'If the bill now in Parliament passes'), def: 'oui', options: [{ value: 'oui', label: T(l, 'Votée', 'Passed') }, { value: 'non', label: T(l, 'Rejetée', 'Rejected') }], help: T(l, 'Le Sénat l\'examine le 19 novembre 2026 : rien n\'est encore voté.', 'The Senate debates it on 19 November 2026: nothing has been passed yet.'), when: (v: V) => s(v, 'annee') !== '2026' });
const VERSION = (l: Lang) => ({ kind: 'choice' as const, id: 'version', label: T(l, 'Version du texte en 2028', 'Version of the bill in 2028'), def: 'senat', options: [{ value: 'senat', label: T(l, 'Sénat', 'Senate') }, { value: 'an', label: T(l, 'Assemblée', 'Assembly') }], help: T(l, 'Assemblée : texte voté le 12 octobre. Sénat : texte de sa commission du 3 novembre.', 'Assembly: text passed on 12 October. Senate: its committee text of 3 November.'), when: (v: V) => s(v, 'annee') === '2028' && s(v, 'adoptee') !== 'non' });

const motifTxt = (m: E.Motif, l: Lang) => ({
  ok: '',
  dimanche: T(l, 'Le dimanche et les jours fériés, les titres ne servent qu\'aux salariés qui travaillent ce jour-là, si l\'employeur l\'a prévu.', 'On Sundays and public holidays, vouchers only work for staff who are working that day, if the employer allows it.'),
  produit: T(l, 'Un achat non alimentaire ne se paie jamais en titres-restaurant.', 'A non-food purchase can never be paid with meal vouchers.'),
  alcool: T(l, 'L\'alcool reste exclu, même quand les courses sont permises.', 'Alcohol stays excluded, even when groceries are allowed.'),
  courses: T(l, 'Sans le vote de la loi, les courses à cuisiner ne passent plus à partir du 1er janvier 2027 : seuls restent les repas, les plats prêts à manger et les fruits et légumes.', 'Without the bill, groceries to cook stop being accepted from 1 January 2027: only meals, ready-to-eat food and fruit and vegetables remain.'),
}[m]);

const produitOpts = (l: Lang) => [
  { value: 'repas', label: T(l, 'Repas au restaurant', 'Restaurant meal') },
  { value: 'pret', label: T(l, 'Sandwich, salade, plat prêt', 'Sandwich, salad, ready meal') },
  { value: 'fruits', label: T(l, 'Fruits et légumes', 'Fruit and vegetables') },
  { value: 'courses', label: T(l, 'Pâtes, riz, viande crue, farine', 'Pasta, rice, raw meat, flour') },
  { value: 'alcool', label: T(l, 'Vin, bière, alcool', 'Wine, beer, spirits') },
  { value: 'nonalim', label: T(l, 'Produit non alimentaire', 'Non-food item') },
];
const jourOpts = (l: Lang) => [{ value: 'semaine', label: T(l, 'Lun-ven', 'Mon-Fri') }, { value: 'samedi', label: T(l, 'Samedi', 'Saturday') }, { value: 'dimanche', label: T(l, 'Dim./férié', 'Sun./hol.') }];

function achat(v: V): E.Achat {
  return { annee: Number(s(v, 'annee') || 2026) as 2026 | 2027 | 2028, jour: (s(v, 'jour') || 'semaine') as E.Jour, travailleCeJour: s(v, 'travaille') === 'oui', autorise: s(v, 'autorise') === 'oui', produit: (s(v, 'produit') || 'repas') as E.Produit, montant: n(v, 'montant'), adoptee: s(v, 'adoptee') !== 'non', version: (s(v, 'version') || 'senat') as 'an' | 'senat' };
}

export const SPECS: Record<string, (l: Lang, a?: Args) => ToolSpec> = {
  /* Accueil : un mois de titres, part de l'employeur, retenue sur la paie. */
  partage: (l, a) => ({
    inputs: [
      VALEUR(l, Number(A(a, 'valeur', 10))), TAUX(l, Number(A(a, 'taux', 50))),
      { id: 'titres', label: T(l, 'Titres reçus dans le mois', 'Vouchers received this month'), def: Number(A(a, 'titres', 20)), max: 31, help: T(l, 'Un par jour travaillé avec une pause repas.', 'One per working day that includes a meal break.') },
    ],
    run: (v) => {
      const m = E.mois(n(v, 'titres'), n(v, 'valeur'), n(v, 'taux'));
      const p = E.partage(n(v, 'valeur'), n(v, 'taux'));
      return {
        label: T(l, 'Ce que l\'employeur vous verse en plus ce mois-ci', 'What your employer adds this month'),
        value: eur0(m.employeur, l),
        hyp: T(l, `Pour ${int(m.n, l)} titres de ${eur(p.valeur, l)}, payés à ${pct(p.taux, l)} par l'employeur.`, `For ${int(m.n, l)} vouchers of ${eur(p.valeur, l)}, ${pct(p.taux, l)} paid by the employer.`),
        sub: p.tauxOk
          ? (p.reintegre > 0 ? T(l, `Au-delà de ${eur(PL, l)} par titre, ${eur(p.reintegre, l)} par titre sont soumis aux cotisations.`, `Above ${eur(PL, l)} per voucher, ${eur(p.reintegre, l)} per voucher is subject to contributions.`) : T(l, 'Toute la part de l\'employeur est exonérée de cotisations et d\'impôt.', 'The whole employer share is free of contributions and income tax.'))
          : T(l, `Hors de la fourchette ${TAUX_TXT(l)}, la part de l'employeur n'est pas exonérée.`, `Outside ${TAUX_TXT(l)}, the employer share is not exempt.`),
        rows: [
          [T(l, 'Crédité sur la carte ou en titres', 'Credited on the card or in vouchers'), eur0(m.credite, l)],
          [T(l, 'Retenu sur votre salaire', 'Deducted from your pay'), eur0(m.retenue, l)],
          [T(l, 'Part exonérée (employeur)', 'Exempt share (employer)'), eur0(m.exonere, l)],
          [T(l, 'Part soumise aux cotisations', 'Share subject to contributions'), eur0(m.reintegre, l)],
        ],
        note: T(l, `Plafond d'exonération des titres 2026 : ${eur(PL, l)} par titre. Celui de 2027 n'est pas encore publié.`, `Exemption cap for 2026 vouchers: ${eur(PL, l)} per voucher. The 2027 cap is not yet published.`),
      };
    },
  }),
  /* Plafond d'exonération : un titre, sa part exonérée, la valeur qui optimise. */
  exoneration: (l, a) => ({
    inputs: [VALEUR(l, Number(A(a, 'valeur', 14))), TAUX(l, Number(A(a, 'taux', 60)))],
    run: (v) => {
      const p = E.partage(n(v, 'valeur'), n(v, 'taux'));
      const f = E.fourchetteOptimale();
      const tc = E.tauxConseille(p.valeur);
      return {
        label: T(l, 'Part de l\'employeur exonérée, par titre', 'Exempt employer share, per voucher'),
        value: eur(p.exonere, l),
        hyp: T(l, `Titre de ${eur(p.valeur, l)}, employeur à ${pct(p.taux, l)}, règles des titres 2026.`, `Voucher of ${eur(p.valeur, l)}, employer at ${pct(p.taux, l)}, rules for 2026 vouchers.`),
        sub: !p.tauxOk
          ? T(l, `Taux hors de la fourchette : rien n'est exonéré.\nIl faut entre ${TAUX_TXT(l)}.`, `Rate outside the range: nothing is exempt.\nIt must be ${TAUX_TXT(l)}.`)
          : p.reintegre > 0
            ? T(l, `${eur(p.reintegre, l)} par titre dépassent le plafond de ${eur(PL, l)}.\nIls entrent dans le salaire soumis aux cotisations.`, `${eur(p.reintegre, l)} per voucher goes over the ${eur(PL, l)} cap.\nIt is added to pay subject to contributions.`)
            : T(l, `Toute la part de ${eur(p.employeur, l)} est exonérée.`, `The whole ${eur(p.employeur, l)} share is exempt.`),
        rows: [
          [T(l, 'Part de l\'employeur', 'Employer share'), eur(p.employeur, l)],
          [T(l, 'Part du salarié', 'Employee share'), eur(p.salarie, l)],
          [T(l, 'Au-delà du plafond', 'Above the cap'), eur(p.reintegre, l)],
          [T(l, 'Valeurs qui exonèrent le plus', 'Values with the largest exemption'), T(l, `${eur(f.min, l)} à ${eur(f.max, l)}`, `${eur(f.min, l)} to ${eur(f.max, l)}`)],
          [T(l, 'Taux le plus haut sans dépasser, pour cette valeur', 'Highest rate within the cap, for this value'), tc === null ? T(l, 'aucun', 'none') : pct(tc, l)],
        ],
      };
    },
  }),
  /* Puis-je payer ça ? Jour, produit, montant, année. */
  achat: (l, a) => ({
    inputs: [
      { id: 'montant', label: T(l, 'Montant à payer', 'Amount to pay'), def: Number(A(a, 'montant', 32)), unit: '€', decimals: 2, max: 1000 },
      { kind: 'select', id: 'produit', label: T(l, 'Ce que vous achetez', 'What you are buying'), def: String(A(a, 'produit', 'repas')), options: produitOpts(l) },
      { kind: 'choice', id: 'jour', label: T(l, 'Jour', 'Day'), def: String(A(a, 'jour', 'semaine')), options: jourOpts(l) },
      ANNEE(l, String(A(a, 'annee', '2026'))),
      { kind: 'choice', id: 'travaille', label: T(l, 'Vous travaillez ce jour-là ?', 'Are you working that day?'), def: 'non', options: yn(l), when: (v) => s(v, 'jour') === 'dimanche' },
      { kind: 'choice', id: 'autorise', label: T(l, 'L\'employeur l\'a prévu ?', 'Has the employer allowed it?'), def: 'non', options: yn(l), when: (v) => s(v, 'jour') === 'dimanche' },
      { ...ADOPTEE(l), adv: true }, { ...VERSION(l), adv: true },
    ],
    run: (v) => {
      const r = E.peutPayer(achat(v));
      return {
        label: r.ok ? T(l, 'Payable en titres-restaurant', 'Payable with meal vouchers') : T(l, 'Refusé en titres-restaurant', 'Not payable with meal vouchers'),
        value: eur(r.payable, l),
        hyp: r.ok ? T(l, `Au plus ${eur(r.plafond, l)} par jour, tous titres confondus.`, `At most ${eur(r.plafond, l)} a day, all vouchers together.`) : motifTxt(r.motif, l),
        sub: r.reste > 0 ? T(l, `Reste à régler autrement : ${eur(r.reste, l)}.`, `Left to pay another way: ${eur(r.reste, l)}.`) : T(l, 'Rien à compléter.', 'Nothing left to pay.'),
        rows: [
          [T(l, 'Montant de l\'achat', 'Purchase amount'), eur(n(v, 'montant'), l)],
          [T(l, 'Plafond du jour', 'Daily limit'), eur(r.plafond, l)],
          [T(l, 'En titres', 'With vouchers'), eur(r.payable, l)],
          [T(l, 'Par carte bancaire ou espèces', 'By bank card or cash'), eur(r.reste, l)],
        ],
        note: T(l, 'Chaque enseigne fixe sa liste de produits acceptés : un refus en caisse reste possible même quand la loi le permet.', 'Each chain sets its own list of accepted products: a refusal at the till is still possible even when the law allows it.'),
      };
    },
  }),
  /* Le dimanche : qui peut payer, selon l'année et la version du texte. */
  dimanche: (l, a) => ({
    inputs: [
      { kind: 'choice', id: 'travaille', label: T(l, 'Vous travaillez ce dimanche ou ce jour férié ?', 'Are you working this Sunday or holiday?'), def: String(A(a, 'travaille', 'non')), options: yn(l) },
      { kind: 'choice', id: 'autorise', label: T(l, 'Votre employeur l\'a prévu ?', 'Has your employer allowed it?'), def: 'non', options: yn(l), help: T(l, 'Une mention sur les titres ou une règle de l\'entreprise.', 'A note on the vouchers or a company rule.') },
      ANNEE(l, String(A(a, 'annee', '2026'))), ADOPTEE(l), VERSION(l),
    ],
    run: (v) => {
      const r = E.peutPayer({ ...achat(v), jour: 'dimanche', produit: 'repas', montant: 20 });
      return {
        label: T(l, 'Titres-restaurant ce dimanche', 'Meal vouchers this Sunday'),
        value: r.ok ? T(l, 'Oui', 'Yes') : T(l, 'Non', 'No'),
        hyp: r.ok ? T(l, `Dans la limite de ${eur(E.PLAFOND_JOUR, l)} pour la journée.`, `Up to ${eur(E.PLAFOND_JOUR, l)} for the day.`) : motifTxt('dimanche', l),
        sub: s(v, 'annee') === '2028' && s(v, 'adoptee') !== 'non'
          ? (s(v, 'version') === 'an' ? T(l, 'Version Assemblée : tous les jours, pour tous les salariés.', 'Assembly version: every day, for every employee.') : T(l, 'Version Sénat : la règle actuelle reste en place.', 'Senate version: the current rule stays.'))
          : T(l, 'Règle actuelle : article R. 3262-8 du code du travail.', 'Current rule: article R. 3262-8 of the Labour Code.'),
        rows: [
          [T(l, 'Travail ce jour-là', 'Working that day'), s(v, 'travaille') === 'oui' ? T(l, 'oui', 'yes') : T(l, 'non', 'no')],
          [T(l, 'Accord de l\'employeur', 'Employer permission'), s(v, 'autorise') === 'oui' ? T(l, 'oui', 'yes') : T(l, 'non', 'no')],
          [T(l, 'Samedi', 'Saturday'), T(l, 'toujours possible', 'always possible')],
        ],
      };
    },
  }),
  /* Courses au supermarché : quels produits, quelle année. */
  courses: (l, a) => ({
    inputs: [
      { kind: 'select', id: 'produit', label: T(l, 'Produit', 'Product'), def: String(A(a, 'produit', 'courses')), options: produitOpts(l) },
      ANNEE(l, String(A(a, 'annee', '2027'))), ADOPTEE(l),
      { id: 'montant', label: T(l, 'Montant du panier', 'Basket total'), def: 40, unit: '€', decimals: 2, max: 1000, adv: true },
    ],
    run: (v) => {
      const r = E.peutPayer({ ...achat(v), jour: 'semaine' });
      return {
        label: T(l, 'Ce produit en titres-restaurant', 'This product with meal vouchers'),
        value: r.ok ? T(l, 'Accepté', 'Accepted') : T(l, 'Refusé', 'Refused'),
        hyp: r.ok ? T(l, `Sur un panier de ${eur(n(v, 'montant'), l)} : ${eur(r.payable, l)} en titres au plus ce jour-là.`, `On a ${eur(n(v, 'montant'), l)} basket: at most ${eur(r.payable, l)} in vouchers that day.`) : motifTxt(r.motif, l),
        sub: s(v, 'annee') === '2026' ? T(l, 'Tout produit alimentaire est permis jusqu\'au 31 décembre 2026.', 'Any food product is allowed until 31 December 2026.') : s(v, 'adoptee') === 'non' ? T(l, 'Hypothèse : la loi n\'est pas votée.', 'Assumption: the bill does not pass.') : T(l, 'Hypothèse : la loi est votée telle que les deux chambres l\'ont écrite.', 'Assumption: the bill passes as both chambers wrote it.'),
        rows: [
          [T(l, 'En titres', 'With vouchers'), eur(r.payable, l)],
          [T(l, 'Autrement', 'Another way'), eur(r.reste, l)],
        ],
        note: T(l, 'L\'enseigne décide de sa liste : vérifiez l\'étiquette ou demandez en caisse.', 'The shop decides its own list: check the label or ask at the till.'),
      };
    },
  }),
  /* Validité d'un millésime. */
  validite: (l, a) => ({
    exemple: true,
    inputs: [
      { kind: 'select', id: 'millesime', label: T(l, 'Année écrite sur le titre (millésime)', 'Year printed on the voucher'), def: String(A(a, 'millesime', '2026')), options: ['2025', '2026', '2027'].map((x) => ({ value: x, label: x })) },
      { kind: 'choice', id: 'support', label: T(l, 'Support', 'Format'), def: String(A(a, 'support', 'carte')), options: [{ value: 'carte', label: T(l, 'Carte ou appli', 'Card or app') }, { value: 'papier', label: T(l, 'Papier', 'Paper') }] },
    ],
    run: (v) => {
      const r = E.validite(Number(s(v, 'millesime')), s(v, 'support') === 'papier' ? 'papier' : 'carte');
      return {
        label: T(l, 'Dernier jour pour payer avec', 'Last day to spend them'),
        value: day(r.dernierJour, l),
        hyp: T(l, `Titres ${s(v, 'millesime')} sur ${s(v, 'support') === 'papier' ? 'papier' : 'carte ou application'}.`, `${s(v, 'millesime')} vouchers on ${s(v, 'support') === 'papier' ? 'paper' : 'a card or app'}.`),
        sub: T(l, `Échange possible jusqu'au ${day(r.finEchange, l)}.\nEnsuite, la valeur est perdue pour vous.`, `Exchange possible until ${day(r.finEchange, l)}.\nAfter that, the value is lost to you.`),
        rows: [
          [T(l, 'Fin d\'utilisation', 'Last use'), day(r.dernierJour, l)],
          [T(l, 'Fin de l\'échange', 'End of exchange'), day(r.finEchange, l)],
        ],
        note: T(l, 'La plupart des cartes reportent seules le solde sur le millésime suivant ; le papier doit être rendu à l\'employeur.', 'Most cards roll the balance over to the next year on their own; paper must be handed back to the employer.'),
      };
    },
  }),
  /* La réforme : ce qui s'applique à une date, selon la version. */
  reforme: (l, a) => ({
    exemple: true,
    inputs: [
      { kind: 'select', id: 'date', label: T(l, 'Date', 'Date'), def: String(A(a, 'date', '2027-01-01')), options: [{ value: '2026-12-01', label: T(l, 'Décembre 2026', 'December 2026') }, { value: '2027-01-01', label: T(l, 'Janvier 2027', 'January 2027') }, { value: '2028-01-01', label: T(l, 'Janvier 2028', 'January 2028') }] },
      { kind: 'choice', id: 'adoptee', label: T(l, 'Si la loi est', 'If the bill is'), def: 'oui', options: [{ value: 'oui', label: T(l, 'Votée', 'Passed') }, { value: 'non', label: T(l, 'Rejetée', 'Rejected') }] },
      { kind: 'choice', id: 'version', label: T(l, 'Version retenue', 'Version kept'), def: 'senat', options: [{ value: 'senat', label: T(l, 'Sénat', 'Senate') }, { value: 'an', label: T(l, 'Assemblée', 'Assembly') }], when: (v) => s(v, 'adoptee') === 'oui' },
    ],
    run: (v) => {
      const r = E.regimeA(s(v, 'date'), s(v, 'adoptee') === 'oui', s(v, 'version') === 'an' ? 'an' : 'senat');
      const o = (b: boolean) => (b ? T(l, 'oui', 'yes') : T(l, 'non', 'no'));
      return {
        label: T(l, 'Courses alimentaires en titres', 'Groceries with vouchers'),
        value: r.courses ? T(l, 'Permises', 'Allowed') : T(l, 'Interdites', 'Not allowed'),
        hyp: T(l, `Au ${day(s(v, 'date'), l)}, ${s(v, 'adoptee') === 'oui' ? T(l, 'si la loi est votée', 'if the bill passes') : T(l, 'si la loi est rejetée', 'if the bill fails')}.`, `On ${day(s(v, 'date'), l)}, ${s(v, 'adoptee') === 'oui' ? 'if the bill passes' : 'if the bill fails'}.`),
        sub: T(l, 'Hypothèse : le texte n\'est pas promulgué au 13 novembre 2026.', 'Assumption: the bill is not law as of 13 November 2026.'),
        rows: [
          [T(l, 'Dimanche pour tous', 'Sundays for everyone'), o(r.dimancheTous)],
          [T(l, 'Titres papier', 'Paper vouchers'), r.papier ? T(l, 'encore émis', 'still issued') : T(l, 'fin', 'ended')],
          [T(l, 'Validité de trois ans', 'Three-year validity'), o(r.validite3ans)],
          [T(l, 'Double plafond par jour', 'Two daily limits'), o(r.doublePlafond)],
          [T(l, 'Remises aux employeurs interdites', 'Discounts to employers banned'), o(r.remisesInterdites)],
          [T(l, 'Plafond journalier', 'Daily limit'), r.doublePlafond ? T(l, 'deux plafonds, fixés par décret', 'two limits, set by decree') : eur(E.PLAFOND_JOUR, l)],
        ],
      };
    },
  }),
  /* Télétravail et temps partiel : nombre de titres du mois. */
  mois: (l, a) => ({
    inputs: [
      { id: 'jours', label: T(l, 'Jours travaillés dans le mois', 'Days worked this month'), def: Number(A(a, 'jours', 20)), max: 31, help: T(l, 'Au bureau et en télétravail : les deux comptent.', 'At the office and working from home: both count.') },
      { id: 'sansRepas', label: T(l, 'Dont jours sans pause repas', 'Of which days with no meal break'), def: Number(A(a, 'sansRepas', 0)), max: 31, help: T(l, 'Par exemple une demi-journée le matin seulement.', 'For instance a morning-only half day.') },
      { ...VALEUR(l, Number(A(a, 'valeur', 9))), adv: true }, { ...TAUX(l, Number(A(a, 'taux', 50))), adv: true },
    ],
    run: (v) => {
      const t = E.titresDuMois(n(v, 'jours'), Math.min(n(v, 'sansRepas'), n(v, 'jours')));
      const m = E.mois(t, n(v, 'valeur'), n(v, 'taux'));
      return {
        label: T(l, 'Titres dus ce mois-ci', 'Vouchers due this month'),
        value: int(t, l),
        hyp: T(l, `Un titre par jour travaillé dont l'horaire comprend un repas.`, `One voucher per working day whose hours include a meal.`),
        sub: T(l, `Crédit du mois : ${eur0(m.credite, l)}.\nDont ${eur0(m.employeur, l)} payés par l'employeur.`, `Credit for the month: ${eur0(m.credite, l)}.\nOf which ${eur0(m.employeur, l)} paid by the employer.`),
        rows: [
          [T(l, 'Jours travaillés', 'Days worked'), int(n(v, 'jours'), l)],
          [T(l, 'Jours sans repas', 'Days with no meal'), int(Math.min(n(v, 'sansRepas'), n(v, 'jours')), l)],
          [T(l, 'Retenu sur la paie', 'Deducted from pay'), eur0(m.retenue, l)],
        ],
      };
    },
  }),
  /* Arrêt maladie, congés : titres perdus. */
  absence: (l, a) => ({
    inputs: [
      { id: 'jours', label: T(l, 'Jours de travail prévus dans le mois', 'Working days planned this month'), def: Number(A(a, 'jours', 21)), max: 31 },
      { id: 'absence', label: T(l, 'Jours d\'absence (arrêt, congés)', 'Days off (sick leave, holidays)'), def: Number(A(a, 'absence', 5)), max: 31 },
      { ...VALEUR(l, Number(A(a, 'valeur', 10))), adv: true }, { ...TAUX(l, Number(A(a, 'taux', 50))), adv: true },
    ],
    run: (v) => {
      const abs = Math.min(n(v, 'absence'), n(v, 'jours'));
      const t = E.titresDuMois(n(v, 'jours'), 0, abs);
      const perdu = E.mois(abs, n(v, 'valeur'), n(v, 'taux'));
      return {
        label: T(l, 'Part de l\'employeur en moins', 'Employer share you lose'),
        value: eur0(perdu.employeur, l),
        hyp: T(l, `${int(abs, l)} jours d'absence sur ${int(n(v, 'jours'), l)} : ${int(abs, l)} titres en moins.`, `${int(abs, l)} days off out of ${int(n(v, 'jours'), l)}: ${int(abs, l)} fewer vouchers.`),
        sub: T(l, `Il vous reste ${int(t, l)} titres ce mois-ci.\nLa retenue sur salaire baisse aussi de ${eur0(perdu.retenue, l)}.`, `You keep ${int(t, l)} vouchers this month.\nThe deduction from pay also falls by ${eur0(perdu.retenue, l)}.`),
        rows: [
          [T(l, 'Titres restants', 'Vouchers left'), int(t, l)],
          [T(l, 'Valeur des titres en moins', 'Value of vouchers lost'), eur0(perdu.credite, l)],
          [T(l, 'Retenue économisée', 'Deduction saved'), eur0(perdu.retenue, l)],
        ],
        note: T(l, 'Un accord d\'entreprise peut maintenir les titres pendant une absence ; ces titres-là ne sont alors pas exonérés.', 'A company agreement can keep vouchers going during an absence; those vouchers are then not exempt.'),
      };
    },
  }),
  /* Coût pour l'employeur sur un an. */
  cout: (l, a) => ({
    inputs: [
      { id: 'salaries', label: T(l, 'Salariés concernés', 'Employees covered'), def: Number(A(a, 'salaries', 10)), max: 100000 },
      { id: 'titres', label: T(l, 'Titres par salarié et par mois', 'Vouchers per employee per month'), def: 19, max: 31 },
      VALEUR(l, Number(A(a, 'valeur', 12))), TAUX(l, Number(A(a, 'taux', 60))),
      { id: 'moisAn', label: T(l, 'Mois servis dans l\'année', 'Months paid in the year'), def: 11, max: 12, adv: true, help: T(l, 'Souvent 11 : pas de titres le mois des congés d\'été.', 'Often 11: no vouchers in the summer-holiday month.') },
    ],
    run: (v) => {
      const c = E.coutEmployeur(n(v, 'salaries'), n(v, 'titres'), n(v, 'moisAn'), n(v, 'valeur'), n(v, 'taux'));
      return {
        label: T(l, 'Contribution de l\'employeur sur un an', 'Employer contribution over a year'),
        value: eur0(c.contribution, l),
        hyp: T(l, `${int(c.titres, l)} titres de ${eur(n(v, 'valeur'), l)} dans l'année.`, `${int(c.titres, l)} vouchers of ${eur(n(v, 'valeur'), l)} in the year.`),
        sub: c.tauxOk ? (c.soumis > 0 ? T(l, `Dont ${eur0(c.soumis, l)} au-delà du plafond, soumis aux cotisations.`, `Of which ${eur0(c.soumis, l)} above the cap, subject to contributions.`) : T(l, 'Tout est exonéré de cotisations.', 'All of it is free of contributions.')) : T(l, `Taux hors de ${TAUX_TXT(l)} : aucune exonération.`, `Rate outside ${TAUX_TXT(l)}: no exemption.`),
        rows: [
          [T(l, 'Exonéré', 'Exempt'), eur0(c.exonere, l)],
          [T(l, 'Soumis aux cotisations', 'Subject to contributions'), eur0(c.soumis, l)],
          [T(l, 'Payé par les salariés', 'Paid by employees'), eur0(c.retenueSalaries, l)],
        ],
        note: T(l, 'Hors frais de l\'émetteur, qui varient selon le contrat.', 'Issuer fees are not included; they depend on the contract.'),
      };
    },
  }),
  /* Ticket restaurant : une année de titres. */
  annuel: (l, a) => ({
    inputs: [
      { id: 'joursSemaine', label: T(l, 'Jours travaillés par semaine avec un repas', 'Working days a week that include a meal'), def: Number(A(a, 'joursSemaine', 5)), max: 7 },
      { id: 'semaines', label: T(l, 'Semaines travaillées dans l\'année', 'Weeks worked in the year'), def: Number(A(a, 'semaines', 47)), max: 52, help: T(l, '52 semaines moins les congés et les jours fériés.', '52 weeks minus leave and public holidays.') },
      VALEUR(l, Number(A(a, 'valeur', 10))), { ...TAUX(l, Number(A(a, 'taux', 50))), adv: true },
    ],
    run: (v) => {
      const r = E.annuel(n(v, 'joursSemaine'), n(v, 'semaines'), n(v, 'valeur'), n(v, 'taux'));
      return {
        label: T(l, 'Ce que l\'employeur vous verse sur un an', 'What your employer pays you over a year'),
        value: eur0(r.employeur, l),
        hyp: T(l, `${int(r.n, l)} titres de ${eur(n(v, 'valeur'), l)} dans l'année, employeur à ${pct(n(v, 'taux'), l)}.`, `${int(r.n, l)} vouchers of ${eur(n(v, 'valeur'), l)} in the year, employer at ${pct(n(v, 'taux'), l)}.`),
        sub: r.reintegre > 0 ? T(l, `Dont ${eur0(r.reintegre, l)} au-delà de ${eur(PL, l)} par titre, soumis aux cotisations.`, `Of which ${eur0(r.reintegre, l)} above ${eur(PL, l)} per voucher, subject to contributions.`) : r.exonere > 0 ? T(l, 'Sans cotisations ni impôt sur le revenu.', 'Free of contributions and income tax.') : T(l, `Taux hors de ${TAUX_TXT(l)} : aucune exonération.`, `Rate outside ${TAUX_TXT(l)}: no exemption.`),
        rows: [
          [T(l, 'Titres reçus dans l\'année', 'Vouchers received in the year'), int(r.n, l)],
          [T(l, 'Crédités au total', 'Credited in total'), eur0(r.credite, l)],
          [T(l, 'Retenus sur vos salaires', 'Deducted from your pay'), eur0(r.retenue, l)],
          [T(l, 'Moyenne par mois', 'Average per month'), T(l, `${formatDecimal(r.parMois, 1, l)} titres`, `${formatDecimal(r.parMois, 1, l)} vouchers`)],
        ],
      };
    },
  }),
  /* Chèque restaurant papier : combien de chèques donner, ce que l'on perd sans rendu de monnaie. */
  papier: (l, a) => ({
    inputs: [
      { id: 'addition', label: T(l, 'Montant de l\'addition', 'Bill amount'), def: Number(A(a, 'addition', 23.5)), unit: '€', decimals: 2, max: 500 },
      VALEUR(l, Number(A(a, 'valeur', 9))),
    ],
    run: (v) => {
      const r = E.papier(n(v, 'addition'), n(v, 'valeur'));
      return {
        label: T(l, 'Chèques à donner sans rien perdre', 'Vouchers to hand over without losing anything'),
        value: int(r.bas, l),
        hyp: T(l, `Addition de ${eur(n(v, 'addition'), l)}, chèques de ${eur(n(v, 'valeur'), l)}, jour de semaine.`, `A ${eur(n(v, 'addition'), l)} bill, ${eur(n(v, 'valeur'), l)} vouchers, on a weekday.`),
        sub: r.complement > 0 ? T(l, `Complément à payer autrement : ${eur(r.complement, l)}.`, `Top-up to pay another way: ${eur(r.complement, l)}.`) : T(l, 'Le compte est juste.', 'It adds up exactly.'),
        rows: [
          [T(l, 'Avec un chèque de plus', 'With one more voucher'), r.hautOk && r.perte > 0 ? T(l, `${int(r.haut, l)} chèques, ${eur(r.perte, l)} perdus`, `${int(r.haut, l)} vouchers, ${eur(r.perte, l)} lost`) : r.hautOk ? T(l, 'inutile', 'not needed') : T(l, `impossible : plafond de ${eur(E.PLAFOND_JOUR, l)}`, `not allowed: ${eur(E.PLAFOND_JOUR, l)} limit`)],
          [T(l, 'Chèques au plus ce jour-là', 'Most vouchers that day'), int(r.plafondTitres, l)],
          [T(l, 'Avec une carte : débité', 'With a card: debited'), eur(r.carteTitres, l)],
          [T(l, 'Avec une carte : reste à payer', 'With a card: left to pay'), eur(r.carteReste, l)],
        ],
        note: T(l, 'Sur papier, le commerçant ne rend pas la monnaie ; une carte débite le montant exact.', 'With paper, the shop gives no change; a card debits the exact amount.'),
      };
    },
  }),
  /* Ticket repas : coût réel du déjeuner une fois la part employeur déduite. */
  repas: (l, a) => ({
    inputs: [
      { id: 'prix', label: T(l, 'Prix de votre déjeuner', 'Price of your lunch'), def: Number(A(a, 'prix', 14)), unit: '€', decimals: 2, max: 200 },
      VALEUR(l, Number(A(a, 'valeur', 10))), TAUX(l, Number(A(a, 'taux', 50))),
      { id: 'repasMois', label: T(l, 'Déjeuners par mois', 'Lunches a month'), def: Number(A(a, 'repasMois', 20)), max: 31, adv: true },
    ],
    run: (v) => {
      const r = E.dejeuner(n(v, 'prix'), n(v, 'valeur'), n(v, 'taux'), n(v, 'repasMois'));
      return {
        label: T(l, 'Ce que vous coûte vraiment ce déjeuner', 'What this lunch really costs you'),
        value: eur(r.coutReel, l),
        hyp: T(l, `Déjeuner de ${eur(n(v, 'prix'), l)}, titre de ${eur(n(v, 'valeur'), l)} payé à ${pct(n(v, 'taux'), l)} par l'employeur.`, `A ${eur(n(v, 'prix'), l)} lunch, ${eur(n(v, 'valeur'), l)} voucher, ${pct(n(v, 'taux'), l)} paid by the employer.`),
        sub: T(l, `L'employeur paie ${formatDecimal(r.couvert, 0, l)} % du repas.\nSur un mois : ${eur0(r.coutReelMois, l)} de votre poche.`, `Your employer pays ${formatDecimal(r.couvert, 0, l)}% of the meal.\nOver a month: ${eur0(r.coutReelMois, l)} out of your pocket.`),
        rows: [
          [T(l, 'Payé avec le titre', 'Paid with the voucher'), eur(r.enTitres, l)],
          [T(l, 'Complément en caisse', 'Top-up at the till'), eur(r.complement, l)],
          [T(l, 'Part de l\'employeur sur le mois', 'Employer share over the month'), eur0(r.employeurMois, l)],
        ],
        note: T(l, 'Calcul avec un titre par déjeuner ; la part que vous payez vous-même est retenue sur la paie.', 'Worked out with one voucher per lunch; the part you pay yourself is deducted from your pay.'),
      };
    },
  }),
  /* Titres restaurant : en combien de jours écouler un solde. */
  solde: (l, a) => ({
    inputs: [
      { id: 'solde', label: T(l, 'Solde de votre carte', 'Your card balance'), def: Number(A(a, 'solde', 180)), unit: '€', decimals: 2, max: 5000 },
      { id: 'depense', label: T(l, 'Dépense par jour d\'utilisation', 'Spending per day of use'), def: Number(A(a, 'depense', 12)), unit: '€', decimals: 2, max: 100, help: T(l, `Au-delà de ${eur(E.PLAFOND_JOUR, l)}, le calcul garde le plafond.`, `Above ${eur(E.PLAFOND_JOUR, l)}, the calculation keeps the limit.`) },
      { id: 'joursSemaine', label: T(l, 'Jours d\'utilisation par semaine', 'Days of use a week'), def: Number(A(a, 'joursSemaine', 5)), max: 6, adv: true },
    ],
    run: (v) => {
      const r = E.ecouler(n(v, 'solde'), n(v, 'depense'), n(v, 'joursSemaine'));
      return {
        label: T(l, 'Jours d\'utilisation pour tout dépenser', 'Days of use to spend it all'),
        value: int(r.jours, l),
        hyp: T(l, `Solde de ${eur(n(v, 'solde'), l)}, ${eur(r.rythme, l)} par jour.`, `A ${eur(n(v, 'solde'), l)} balance, ${eur(r.rythme, l)} a day.`),
        sub: T(l, `Soit environ ${int(r.semaines, l)} semaines.\nAu plafond de ${eur(E.PLAFOND_JOUR, l)} : ${int(r.joursAuPlafond, l)} jours au moins.`, `About ${int(r.semaines, l)} weeks.\nAt the ${eur(E.PLAFOND_JOUR, l)} limit: ${int(r.joursAuPlafond, l)} days at least.`),
        rows: [
          [T(l, 'Rythme retenu', 'Pace used'), eur(r.rythme, l)],
          [T(l, 'Semaines nécessaires', 'Weeks needed'), int(r.semaines, l)],
          [T(l, 'Minimum au plafond', 'Minimum at the limit'), T(l, `${int(r.joursAuPlafond, l)} jours`, `${int(r.joursAuPlafond, l)} days`)],
        ],
        note: T(l, 'Le dimanche et les jours fériés ne comptent que si vous travaillez et que l\'employeur l\'a prévu.', 'Sundays and public holidays only count if you work and your employer allows it.'),
      };
    },
  }),
  /* Carte ticket restaurant refusée : la règle qui bloque. */
  refus: (l, a) => ({
    inputs: [
      { id: 'montant', label: T(l, 'Montant à payer', 'Amount to pay'), def: Number(A(a, 'montant', 18)), unit: '€', decimals: 2, max: 500 },
      { id: 'dejaPaye', label: T(l, 'Déjà payé en titres aujourd\'hui', 'Already paid with vouchers today'), def: Number(A(a, 'dejaPaye', 12)), unit: '€', decimals: 2, max: 100 },
      { kind: 'select', id: 'zone', label: T(l, 'Le commerce est situé', 'The shop is located'), def: String(A(a, 'zone', 'meme')), options: [{ value: 'meme', label: T(l, 'Mon département de travail', 'My work département') }, { value: 'limitrophe', label: T(l, 'Département voisin', 'Neighbouring one') }, { value: 'autre', label: T(l, 'Plus loin', 'Further away') }] },
      { kind: 'choice', id: 'jour', label: T(l, 'Jour', 'Day'), def: String(A(a, 'jour', 'semaine')), options: jourOpts(l) },
      { kind: 'choice', id: 'travaille', label: T(l, 'Vous travaillez ce jour-là ?', 'Are you working that day?'), def: 'non', options: yn(l), when: (v) => s(v, 'jour') === 'dimanche' },
      { kind: 'choice', id: 'autorise', label: T(l, 'L\'employeur l\'a prévu ?', 'Has the employer allowed it?'), def: 'non', options: yn(l), when: (v) => s(v, 'jour') === 'dimanche' },
      { kind: 'select', id: 'produit', label: T(l, 'Ce que vous achetez', 'What you are buying'), def: String(A(a, 'produit', 'repas')), options: produitOpts(l), adv: true },
      { id: 'solde', label: T(l, 'Solde de la carte', 'Card balance'), def: Number(A(a, 'solde', 60)), unit: '€', decimals: 2, max: 5000, adv: true },
      { kind: 'choice', id: 'deplacement', label: T(l, 'Titres prévus pour un déplacement ?', 'Vouchers set up for a business trip?'), def: 'non', options: yn(l), adv: true, when: (v) => s(v, 'zone') === 'autre' },
    ],
    run: (v) => {
      const r = E.diagnostic({ jour: (s(v, 'jour') || 'semaine') as E.Jour, travailleCeJour: s(v, 'travaille') === 'oui', autorise: s(v, 'autorise') === 'oui', produit: (s(v, 'produit') || 'repas') as E.Produit, montant: n(v, 'montant'), dejaPaye: n(v, 'dejaPaye'), solde: n(v, 'solde'), zone: (s(v, 'zone') || 'meme') as E.Zone, deplacement: s(v, 'deplacement') === 'oui' });
      const why: Record<string, string> = {
        ok: T(l, 'Aucune règle ne bloque ce paiement.', 'No rule blocks this payment.'),
        zone: T(l, 'Hors du département de travail et des départements voisins, la carte ne passe pas.', 'Outside your work département and the neighbouring ones, the card does not work.'),
        plafond: T(l, `Le plafond de ${eur(E.PLAFOND_JOUR, l)} par jour est atteint ou presque.`, `The ${eur(E.PLAFOND_JOUR, l)} daily limit is reached or nearly.`),
        solde: T(l, 'Le solde de la carte ne couvre pas tout.', 'The card balance does not cover it all.'),
        dimanche: motifTxt('dimanche', l), produit: motifTxt('produit', l), alcool: motifTxt('alcool', l), courses: motifTxt('courses', l),
      };
      return {
        label: r.ok ? T(l, 'Payable avec la carte', 'Payable with the card') : T(l, 'Paiement refusé', 'Payment refused'),
        value: eur(r.passe, l),
        hyp: why[r.motif],
        sub: T(l, `Reste à payer autrement : ${eur(Math.max(0, n(v, 'montant') - r.passe), l)}.`, `Left to pay another way: ${eur(Math.max(0, n(v, 'montant') - r.passe), l)}.`),
        rows: [
          [T(l, 'Encore permis aujourd\'hui', 'Still allowed today'), eur(E.cumulJour(n(v, 'dejaPaye'), 0).resteDuJour, l)],
          [T(l, 'Montant demandé', 'Amount asked'), eur(n(v, 'montant'), l)],
        ],
        note: T(l, 'Un commerçant peut aussi ne pas accepter les titres, ou limiter la liste des produits : c\'est son choix.', 'A shop may also not take vouchers at all, or limit the products: that is its choice.'),
      };
    },
  }),
  /* Carte Edenred : écouler l'ancien millésime avant fin février. */
  millesime: (l, a) => ({
    inputs: [
      { id: 'solde', label: T(l, 'Solde 2026 restant sur la carte', '2026 balance left on the card'), def: Number(A(a, 'solde', 140)), unit: '€', decimals: 2, max: 5000 },
      { kind: 'select', id: 'depuis', label: T(l, 'À partir du', 'Starting from'), def: String(A(a, 'depuis', '2027-01-04')), options: [{ value: '2026-12-01', label: T(l, '1er décembre 2026', '1 December 2026') }, { value: '2027-01-04', label: T(l, '4 janvier 2027', '4 January 2027') }, { value: '2027-02-01', label: T(l, '1er février 2027', '1 February 2027') }, { value: '2027-02-15', label: T(l, '15 février 2027', '15 February 2027') }] },
      { id: 'depense', label: T(l, 'Dépense par jour d\'utilisation', 'Spending per day of use'), def: Number(A(a, 'depense', 10)), unit: '€', decimals: 2, max: 100 },
      { id: 'joursSemaine', label: T(l, 'Jours d\'utilisation par semaine', 'Days of use a week'), def: 5, max: 6, adv: true },
    ],
    run: (v) => {
      const r = E.ancienSolde(n(v, 'solde'), s(v, 'depuis'), n(v, 'depense'), n(v, 'joursSemaine'));
      return {
        label: r.ok ? T(l, 'Solde écoulé à temps', 'Balance spent in time') : T(l, 'Reste au dernier jour', 'Left on the last day'),
        value: r.ok ? T(l, 'Oui', 'Yes') : eur(r.reste, l),
        hyp: T(l, `${int(r.joursUsage, l)} jours d'utilisation jusqu'au ${day(r.dernierJour, l)}, à ${eur(Math.min(n(v, 'depense'), E.PLAFOND_JOUR), l)} par jour.`, `${int(r.joursUsage, l)} days of use until ${day(r.dernierJour, l)}, at ${eur(Math.min(n(v, 'depense'), E.PLAFOND_JOUR), l)} a day.`),
        sub: r.ok ? T(l, 'Les titres 2027 ne servent qu\'une fois le solde 2026 épuisé.', '2027 vouchers are only used once the 2026 balance is gone.') : T(l, `Il faudrait ${eur(r.rythmeNecessaire, l)} par jour.\nSinon, échange possible jusqu'au ${day(r.finEchange, l)}.`, `You would need ${eur(r.rythmeNecessaire, l)} a day.\nOtherwise, exchange possible until ${day(r.finEchange, l)}.`),
        rows: [
          [T(l, 'Dernier jour des titres 2026 sur carte', 'Last day for 2026 card vouchers'), day(r.dernierJour, l)],
          [T(l, 'Capacité de dépense d\'ici là', 'Spending room until then'), eur(r.capacite, l)],
          [T(l, 'Fin de l\'échange', 'End of exchange'), day(r.finEchange, l)],
        ],
      };
    },
  }),
  /* Swile : plusieurs paiements le même jour. */
  cumul: (l, a) => ({
    inputs: [
      { id: 'dejaPaye', label: T(l, 'Déjà payé en titres aujourd\'hui', 'Already paid with vouchers today'), def: Number(A(a, 'dejaPaye', 9.5)), unit: '€', decimals: 2, max: 100 },
      { id: 'achat', label: T(l, 'Nouvel achat', 'New purchase'), def: Number(A(a, 'achat', 21)), unit: '€', decimals: 2, max: 500 },
    ],
    run: (v) => {
      const r = E.cumulJour(n(v, 'dejaPaye'), n(v, 'achat'));
      return {
        label: T(l, 'Ce qui passe encore en titres', 'What still goes on vouchers'),
        value: eur(r.passe, l),
        hyp: T(l, `${eur(Math.max(0, n(v, 'dejaPaye')), l)} déjà dépensés sur ${eur(E.PLAFOND_JOUR, l)} permis aujourd'hui.`, `${eur(Math.max(0, n(v, 'dejaPaye')), l)} already spent out of ${eur(E.PLAFOND_JOUR, l)} allowed today.`),
        sub: r.complement > 0 ? T(l, `À payer avec une autre carte : ${eur(r.complement, l)}.\nAnnoncez le montant en titres avant de payer.`, `To pay with another card: ${eur(r.complement, l)}.\nSay the voucher amount before paying.`) : T(l, 'Tout passe en titres.', 'All of it goes on vouchers.'),
        rows: [
          [T(l, 'Encore permis aujourd\'hui', 'Still allowed today'), eur(r.resteDuJour, l)],
          [T(l, 'Complément', 'Top-up'), eur(r.complement, l)],
        ],
        note: T(l, 'Le compteur repart de zéro le lendemain ; le plafond ne se reporte pas.', 'The counter resets the next day; the limit does not roll over.'),
      };
    },
  }),
  /* Up Déjeuner : un mois en papier contre la carte. */
  carnet: (l, a) => ({
    inputs: [
      { id: 'addition', label: T(l, 'Déjeuner habituel', 'Usual lunch'), def: Number(A(a, 'addition', 12.4)), unit: '€', decimals: 2, max: 200 },
      VALEUR(l, Number(A(a, 'valeur', 8))),
      { id: 'repasMois', label: T(l, 'Déjeuners par mois', 'Lunches a month'), def: Number(A(a, 'repasMois', 18)), max: 31 },
    ],
    run: (v) => {
      const r = E.carnet(n(v, 'addition'), n(v, 'valeur'), n(v, 'repasMois'));
      return {
        label: T(l, 'Monnaie perdue sur un mois en papier', 'Change lost over a month on paper'),
        value: eur0(r.perteMois, l),
        hyp: T(l, `${int(n(v, 'repasMois'), l)} déjeuners de ${eur(n(v, 'addition'), l)}, titres papier de ${eur(n(v, 'valeur'), l)} arrondis au titre supérieur.`, `${int(n(v, 'repasMois'), l)} lunches of ${eur(n(v, 'addition'), l)}, ${eur(n(v, 'valeur'), l)} paper vouchers rounded up.`),
        sub: T(l, `Avec la carte : 0 € perdu.\nSans arrondir : ${eur0(r.complementMois, l)} à compléter dans le mois.`, `With the card: nothing lost.\nWithout rounding up: ${eur0(r.complementMois, l)} to top up over the month.`),
        rows: [
          [T(l, 'Titres par déjeuner en arrondissant', 'Vouchers per lunch, rounding up'), r.hautOk ? int(r.haut, l) : T(l, 'au-delà du plafond', 'above the limit')],
          [T(l, 'Perte par déjeuner', 'Loss per lunch'), eur(r.perte, l)],
          [T(l, 'Complément par déjeuner sans arrondir', 'Top-up per lunch without rounding'), eur(r.complement, l)],
        ],
      };
    },
  }),
  /* Bimpli commerçant : ce que coûte l'acceptation des titres. */
  commission: (l, a) => ({
    inputs: [
      { id: 'montant', label: T(l, 'Encaissé en titres par mois', 'Taken in vouchers a month'), def: Number(A(a, 'montant', 3000)), unit: '€', max: 1000000 },
      { id: 'taux', label: T(l, 'Commission de l\'émetteur', 'Issuer commission'), def: Number(A(a, 'taux', P.marche.commissionAcceptationMoyenne)), unit: '%', decimals: 2, max: 20, help: T(l, `${pct(P.marche.commissionAcceptationMoyenne, l)} en moyenne selon le Sénat ; le vôtre est dans votre contrat.`, `${pct(P.marche.commissionAcceptationMoyenne, l)} on average according to the Senate; yours is in your contract.`) },
      { id: 'fixe', label: T(l, 'Frais fixes par paiement', 'Fixed fee per payment'), def: 0, unit: '€', decimals: 2, max: 5, adv: true },
      { id: 'paiements', label: T(l, 'Paiements en titres par mois', 'Voucher payments a month'), def: 250, max: 100000, adv: true },
    ],
    run: (v) => {
      const r = E.commission(n(v, 'montant'), n(v, 'taux'), n(v, 'fixe'), n(v, 'paiements'));
      return {
        label: T(l, 'Coût des titres pour le commerce, par mois', 'Cost of vouchers to the shop, per month'),
        value: eur0(r.mois, l),
        hyp: T(l, `${eur0(n(v, 'montant'), l)} encaissés en titres, commission de ${pct(n(v, 'taux'), l)}.`, `${eur0(n(v, 'montant'), l)} taken in vouchers, ${pct(n(v, 'taux'), l)} commission.`),
        sub: T(l, `Sur un an : ${eur0(r.an, l)}.\nTaux réel : ${pct(r.tauxEffectif, l)} du montant.`, `Over a year: ${eur0(r.an, l)}.\nActual rate: ${pct(r.tauxEffectif, l)} of the amount.`),
        rows: [
          [T(l, 'Reversé au commerce', 'Paid to the shop'), eur0(r.net, l)],
          [T(l, 'Coût annuel', 'Yearly cost'), eur0(r.an, l)],
        ],
        note: T(l, 'Chaque émetteur fixe ses conditions dans son contrat d\'affiliation ; ce calcul ne les remplace pas.', 'Each issuer sets its terms in its affiliation contract; this calculation does not replace them.'),
      };
    },
  }),
};

export const TOOL_KINDS = Object.keys(SPECS);
export function getTool(kind: string, l: Lang, a?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`simulateur inconnu : ${kind}`);
  return f(l, a);
}
/** Lance un simulateur avec ses valeurs par défaut (ou celles données) : sert aux pages et aux tests. */
export function runTool(kind: string, l: Lang, a?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, a);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export const resumenCampo = (_id: string, _v: V, _l: Lang): string | undefined => undefined;
export { formatNumber };
export const PARAMS = P;
