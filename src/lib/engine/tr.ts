/**
 * Règles des titres-restaurant, en fonctions pures. Chaque nombre vient de params-2026.json.
 * Sources : service-public.fr F21059, code du travail (L. 3262-1 et s., R. 3262-5, R. 3262-8, R. 3262-10),
 * rapport du Sénat n° 141 et textes n° 32 (Assemblée) et n° 142 (commission du Sénat) de la proposition de loi.
 */
import P from '../../data/params-2026.json';

export const PLAFOND_2026 = P.exoneration.plafond['2026'];
export const TAUX_MIN = P.exoneration.tauxMin;
export const TAUX_MAX = P.exoneration.tauxMax;
export const PLAFOND_JOUR = P.usage.plafondJour;

const r2 = (x: number) => Math.round(x * 100) / 100;

/** Part de l'employeur, part du salarié et partie exonérée de cotisations pour un titre.
 *  Deux conditions cumulatives (service-public F21059, rapport Sénat n° 141) : part employeur entre 50 % et 60 %
 *  de la valeur du titre, et exonération limitée au plafond (7,32 € pour les titres 2026). Hors de la fourchette,
 *  rien n'est exonéré ; au-delà du plafond, seule la fraction en trop est réintégrée dans l'assiette. */
export function partage(valeur: number, tauxPct: number, plafond = PLAFOND_2026) {
  const v = Math.max(0, valeur), t = Math.max(0, Math.min(100, tauxPct));
  const employeur = r2((v * t) / 100);
  const salarie = r2(v - employeur);
  const tauxOk = t >= TAUX_MIN && t <= TAUX_MAX;
  const exonere = tauxOk ? Math.min(employeur, plafond) : 0;
  const reintegre = r2(employeur - exonere);
  return { valeur: v, taux: t, employeur, salarie, tauxOk, exonere: r2(exonere), reintegre };
}

/** Valeurs faciales qui donnent l'exonération maximale : plafond ÷ 60 % à plafond ÷ 50 %
 *  (12,20 € à 14,64 € pour 2026, note 19 du rapport du Sénat n° 141). */
export function fourchetteOptimale(plafond = PLAFOND_2026) {
  return { min: r2(plafond / (TAUX_MAX / 100)), max: r2(plafond / (TAUX_MIN / 100)) };
}

/** Taux employeur qui exonère toute la part patronale pour une valeur donnée, s'il existe. */
export function tauxConseille(valeur: number, plafond = PLAFOND_2026): number | null {
  if (valeur <= 0) return null;
  const tMax = Math.min(TAUX_MAX, (plafond / valeur) * 100);
  return tMax >= TAUX_MIN ? Math.floor(tMax * 10) / 10 : null;
}

/** Un mois de titres : ce que paie l'employeur, ce qui est retenu sur la paie, la somme créditée. */
export function mois(nbTitres: number, valeur: number, tauxPct: number, plafond = PLAFOND_2026) {
  const n = Math.max(0, Math.floor(nbTitres));
  const p = partage(valeur, tauxPct, plafond);
  return {
    n, credite: r2(n * p.valeur), employeur: r2(n * p.employeur), retenue: r2(n * p.salarie),
    exonere: r2(n * p.exonere), reintegre: r2(n * p.reintegre), gainNet: r2(n * p.employeur),
  };
}

/** Titres d'un mois : un titre par jour de travail dont l'horaire comprend un repas (service-public F21059).
 *  Les jours d'absence (congés, arrêt, jours sans pause repas) sont retirés. */
export function titresDuMois(joursTravailles: number, joursSansRepas = 0, joursAbsence = 0): number {
  return Math.max(0, Math.floor(joursTravailles) - Math.floor(joursSansRepas) - Math.floor(joursAbsence));
}

/** Coût annuel pour l'employeur : contribution totale, partie exonérée, partie soumise aux cotisations. */
export function coutEmployeur(salaries: number, titresParMois: number, moisParAn: number, valeur: number, tauxPct: number, plafond = PLAFOND_2026) {
  const n = Math.max(0, Math.floor(salaries)) * Math.max(0, Math.floor(titresParMois)) * Math.max(0, Math.min(12, Math.floor(moisParAn)));
  const p = partage(valeur, tauxPct, plafond);
  return { titres: n, contribution: r2(n * p.employeur), exonere: r2(n * p.exonere), soumis: r2(n * p.reintegre), retenueSalaries: r2(n * p.salarie), tauxOk: p.tauxOk };
}

const finDeMois = (annee: number, mois1a12: number) => new Date(Date.UTC(annee, mois1a12, 0)).toISOString().slice(0, 10);
const plusJours = (iso: string, j: number) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + j); return d.toISOString().slice(0, 10); };

/** Validité d'un millésime (article R. 3262-5, rapport Sénat n° 141) : l'année du millésime, puis jusqu'à la fin
 *  février N+1 en carte ou application, fin janvier N+1 en papier ; quinze jours ensuite pour l'échanger. */
export function validite(millesime: number, support: 'carte' | 'papier') {
  const m = support === 'papier' ? P.validite.moisApresPapier : P.validite.moisApresDemat;
  const dernierJour = finDeMois(millesime + 1, m);
  return { premierJour: `${millesime - 1}-12-01`, dernierJour, finEchange: plusJours(dernierJour, P.validite.joursEchange) };
}

/** Jours entre deux dates ISO (positif si `b` est après `a`). */
export const joursEntre = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);

export type Jour = 'semaine' | 'samedi' | 'dimanche';
export type Produit = 'repas' | 'pret' | 'fruits' | 'courses' | 'alcool' | 'nonalim';
/** « adoptee » : la prolongation 2027 votée (article 4, identique dans les deux versions) ; « an » ou « senat » :
 *  la version du texte appliquée en 2028. Tant que la loi n'est pas promulguée, ce sont des hypothèses. */
export interface Achat { annee: 2026 | 2027 | 2028; jour: Jour; travailleCeJour: boolean; autorise: boolean; produit: Produit; montant: number; adoptee: boolean; version: 'an' | 'senat' }

export type Motif = 'ok' | 'dimanche' | 'produit' | 'courses' | 'alcool';
/** Puis-je payer cet achat en titres-restaurant ? Renvoie le verdict, la part payable et le reste à régler. */
export function peutPayer(a: Achat) {
  const montant = Math.max(0, a.montant);
  let motif: Motif = 'ok';
  // Jour : du lundi au samedi ; le dimanche ou un jour férié, seulement si l'on travaille ce jour-là et que
  // l'employeur l'a prévu (R. 3262-8). Version Assemblée, à partir de 2028 : tous les jours (L. 3262-5-2 du texte n° 32).
  const dimancheLibre = a.annee === 2028 && a.adoptee && a.version === 'an';
  if (a.jour === 'dimanche' && !dimancheLibre && !(a.travailleCeJour && a.autorise)) motif = 'dimanche';
  // Produit : repas, plats prêts à manger, fruits et légumes toujours ; courses alimentaires jusqu'au 31/12/2026,
  // puis en 2027 si l'article 4 est voté, puis pérennisées en 2028 dans les deux versions du texte.
  else if (a.produit === 'nonalim') motif = 'produit';
  else if (a.produit === 'alcool') motif = 'alcool';
  else if (a.produit === 'courses' && a.annee >= 2027 && !a.adoptee) motif = 'courses';
  const ok = motif === 'ok';
  const payable = ok ? Math.min(montant, PLAFOND_JOUR) : 0;
  return { ok, motif, payable: r2(payable), reste: r2(montant - payable), plafond: PLAFOND_JOUR };
}

/** Ce qui s'applique à une date selon la version du texte retenue (hypothèse tant que la loi n'est pas promulguée). */
export function regimeA(iso: string, adoptee: boolean, version: 'an' | 'senat') {
  const annee = Number(iso.slice(0, 4));
  const loi2028 = adoptee && annee >= 2028;
  return {
    courses: annee <= 2026 ? true : adoptee,
    dimancheTous: loi2028 && version === 'an',
    papier: !loi2028,
    validite3ans: loi2028 && version === 'an',
    doublePlafond: loi2028 && version === 'senat',
    remisesInterdites: adoptee && annee >= 2027 && version === 'senat',
  };
}

/** Une année de titres : jours travaillés avec repas par semaine × semaines travaillées (service-public F21059 :
 *  un titre par repas compris dans l'horaire de travail). */
export function annuel(joursSemaine: number, semaines: number, valeur: number, tauxPct: number, plafond = PLAFOND_2026) {
  const n = Math.max(0, Math.floor(Math.min(7, joursSemaine))) * Math.max(0, Math.floor(Math.min(52, semaines)));
  return { ...mois(n, valeur, tauxPct, plafond), parMois: r2(n / 12) };
}

/** Payer une addition en titres papier : le commerçant ne rend pas la monnaie, et la dépense du jour reste
 *  plafonnée (R. 3262-10). Deux façons : rester sous l'addition et compléter, ou arrondir au-dessus et perdre l'écart. */
export function papier(addition: number, valeur: number, plafondJour = PLAFOND_JOUR) {
  const a = Math.max(0, addition), v = Math.max(0.01, valeur);
  const plafondTitres = Math.floor((plafondJour + 1e-9) / v);
  const bas = Math.min(Math.floor((a + 1e-9) / v), plafondTitres);
  const complement = r2(a - bas * v);
  const haut = Math.ceil(a / v - 1e-9);
  const hautOk = haut <= plafondTitres;
  return { bas, complement, haut, hautOk, perte: hautOk ? r2(haut * v - a) : 0, plafondTitres, carteTitres: r2(Math.min(a, plafondJour)), carteReste: r2(Math.max(0, a - plafondJour)) };
}

/** Coût réel d'un déjeuner payé en titres : prix moins la part de l'employeur (une seule valeur de titre par repas). */
export function dejeuner(prix: number, valeur: number, tauxPct: number, repasMois: number) {
  const p = partage(valeur, tauxPct);
  const n = Math.max(0, Math.floor(repasMois));
  const enTitres = Math.min(Math.max(0, prix), p.valeur, PLAFOND_JOUR);
  const complement = r2(Math.max(0, prix) - enTitres);
  const coutReel = r2(Math.max(0, Math.max(0, prix) - p.employeur));
  return { enTitres: r2(enTitres), complement, coutReel, coutReelMois: r2(n * coutReel), employeurMois: r2(n * p.employeur), prixMois: r2(n * Math.max(0, prix)), couvert: prix > 0 ? Math.min(100, (p.employeur / prix) * 100) : 0 };
}

/** Écouler un solde : jours d'utilisation nécessaires, au rythme choisi puis au plafond journalier. */
export function ecouler(solde: number, depenseJour: number, joursSemaine: number) {
  const s = Math.max(0, solde), d = Math.max(0.01, Math.min(depenseJour, PLAFOND_JOUR)), j = Math.max(1, Math.min(7, Math.floor(joursSemaine)));
  const jours = Math.ceil(s / d - 1e-9);
  return { jours, semaines: Math.ceil(jours / j), joursAuPlafond: Math.ceil(s / PLAFOND_JOUR - 1e-9), rythme: r2(d) };
}

/** Ancien millésime : peut-on écouler le solde de l'année passée avant son dernier jour (fin février en carte) ?
 *  Les titres de l'année ne servent qu'après épuisement de ceux de l'année écoulée (service-public F21059). */
export function ancienSolde(solde: number, depuis: string, depenseJour: number, joursSemaine: number, millesime = 2026) {
  const v = validite(millesime, 'carte');
  const joursCal = Math.max(0, joursEntre(depuis, v.dernierJour) + 1);
  const j = Math.max(1, Math.min(7, Math.floor(joursSemaine)));
  const joursUsage = Math.floor((joursCal * j) / 7);
  const d = Math.max(0, Math.min(depenseJour, PLAFOND_JOUR));
  const capacite = r2(joursUsage * d);
  const s = Math.max(0, solde);
  return { dernierJour: v.dernierJour, finEchange: v.finEchange, joursCal, joursUsage, capacite, reste: r2(Math.max(0, s - capacite)), ok: capacite >= s, rythmeNecessaire: joursUsage ? r2(s / joursUsage) : s };
}

/** Plusieurs paiements le même jour : le plafond journalier se partage entre eux. */
export function cumulJour(dejaPaye: number, achat: number) {
  const reste = r2(Math.max(0, PLAFOND_JOUR - Math.max(0, dejaPaye)));
  const passe = r2(Math.min(Math.max(0, achat), reste));
  return { resteDuJour: reste, passe, complement: r2(Math.max(0, achat) - passe) };
}

/** Un mois en titres papier contre la carte : la monnaie non rendue sur chaque repas, si l'on arrondit au titre supérieur. */
export function carnet(addition: number, valeur: number, repasMois: number) {
  const p = papier(addition, valeur);
  const n = Math.max(0, Math.floor(repasMois));
  return { ...p, perteMois: r2(n * p.perte), complementMois: r2(n * p.complement), titresMois: n * (p.hautOk ? p.haut : p.bas) };
}

/** Coût d'acceptation pour un commerçant : commission en % du montant encaissé en titres, plus un fixe par paiement. */
export function commission(montantMois: number, tauxPct: number, fixe: number, paiementsMois: number) {
  const m = Math.max(0, montantMois), t = Math.max(0, Math.min(100, tauxPct));
  const mois_ = r2((m * t) / 100 + Math.max(0, fixe) * Math.max(0, Math.floor(paiementsMois)));
  return { mois: mois_, an: r2(mois_ * 12), net: r2(m - mois_), tauxEffectif: m > 0 ? (mois_ / m) * 100 : 0 };
}

/** Département du commerce par rapport au lieu de travail (service-public F21059). */
export type Zone = 'meme' | 'limitrophe' | 'autre';
/** Pourquoi une carte de titres est refusée : la première règle qui bloque, dans l'ordre où la caisse les teste. */
export function diagnostic(a: { jour: Jour; travailleCeJour: boolean; autorise: boolean; produit: Produit; montant: number; dejaPaye: number; solde: number; zone: Zone; deplacement: boolean }) {
  if (a.zone === 'autre' && !a.deplacement) return { ok: false, motif: 'zone' as const, passe: 0 };
  const base = peutPayer({ annee: 2026, jour: a.jour, travailleCeJour: a.travailleCeJour, autorise: a.autorise, produit: a.produit, montant: a.montant, adoptee: true, version: 'senat' });
  if (!base.ok) return { ok: false, motif: base.motif, passe: 0 };
  const c = cumulJour(a.dejaPaye, a.montant);
  if (c.resteDuJour <= 0) return { ok: false, motif: 'plafond' as const, passe: 0 };
  const passe = r2(Math.min(c.passe, Math.max(0, a.solde)));
  if (passe <= 0) return { ok: false, motif: 'solde' as const, passe: 0 };
  return { ok: true, motif: (passe < a.montant ? (passe < c.passe ? 'solde' : 'plafond') : 'ok') as 'ok' | 'solde' | 'plafond', passe };
}
