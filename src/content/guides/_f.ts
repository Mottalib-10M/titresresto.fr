/** Formats partagés par les fichiers de contenu (non chargé comme page : préfixe _). */
import P from '../../data/params-2026.json';
import { formatMoney, formatDecimal, displayDate } from '../../lib/format';
export type L = 'fr' | 'en';
/** Montant cité : centimes seulement s'il y en a. */
export const eur = (x: number, l: L) => formatMoney(x, Math.abs(x - Math.round(x)) < 0.005 ? 0 : 2, l);
export const dec = (x: number, l: L, d = 2) => formatDecimal(x, d, l);
export const day = (iso: string, l: L) => displayDate(iso, l === 'fr' ? 'fr-FR' : 'en-GB');
export const pc = (x: number, l: L) => (l === 'fr' ? `${formatDecimal(x, 1, l)} %` : `${formatDecimal(x, 1, l)}%`);
export { P };
export const EX = P.exoneration, U = P.usage, VA = P.validite, M = P.marche, PPL = P.ppl;
export const PL = EX.plafond['2026'];
