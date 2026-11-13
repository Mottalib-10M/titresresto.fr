/** Règles des titres-restaurant : cas tirés des textes (service-public F21059, rapport du Sénat n° 141, textes n° 32 et 142). */
import { describe, expect, it } from 'vitest';
import * as E from '../src/lib/engine/tr';
import { runTool, TOOL_KINDS } from '../src/lib/tool-specs';

describe('exonération', () => {
  it('plafond 2026 = 7,32 €, fourchette 50-60 %', () => { expect(E.PLAFOND_2026).toBe(7.32); expect([E.TAUX_MIN, E.TAUX_MAX]).toEqual([50, 60]); });
  it('fourchette optimale 12,20 € à 14,64 € (rapport n° 141, note 19)', () => expect(E.fourchetteOptimale()).toEqual({ min: 12.2, max: 14.64 }));
  it('14 € à 60 % : 8,40 € patronal, 1,08 € réintégré', () => { const p = E.partage(14, 60); expect(p.employeur).toBe(8.4); expect(p.exonere).toBe(7.32); expect(p.reintegre).toBe(1.08); });
  it('9 € à 50 % : tout exonéré', () => { const p = E.partage(9, 50); expect(p.exonere).toBe(4.5); expect(p.reintegre).toBe(0); });
  it('70 % : aucune exonération', () => { const p = E.partage(10, 70); expect(p.tauxOk).toBe(false); expect(p.exonere).toBe(0); expect(p.reintegre).toBe(7); });
  it('taux conseillé : 12,20 € → 60 %, 16 € → aucun, 8 € → 60 %', () => { expect(E.tauxConseille(12.2)).toBe(60); expect(E.tauxConseille(16)).toBeNull(); expect(E.tauxConseille(8)).toBe(60); });
});
describe('usage', () => {
  const base = { annee: 2026 as const, jour: 'semaine' as const, travailleCeJour: false, autorise: false, produit: 'repas' as const, montant: 32, adoptee: true, version: 'senat' as const };
  it('32 € coupés à 25 €', () => { const r = E.peutPayer(base); expect(r.payable).toBe(25); expect(r.reste).toBe(7); });
  it('dimanche sans travail : refusé ; avec travail et accord : accepté', () => {
    expect(E.peutPayer({ ...base, jour: 'dimanche' }).motif).toBe('dimanche');
    expect(E.peutPayer({ ...base, jour: 'dimanche', travailleCeJour: true }).ok).toBe(false);
    expect(E.peutPayer({ ...base, jour: 'dimanche', travailleCeJour: true, autorise: true }).ok).toBe(true);
  });
  it('dimanche en 2028 : libre dans la version AN seulement', () => {
    expect(E.peutPayer({ ...base, annee: 2028, jour: 'dimanche', version: 'an' }).ok).toBe(true);
    expect(E.peutPayer({ ...base, annee: 2028, jour: 'dimanche', version: 'senat' }).ok).toBe(false);
  });
  it('courses : 2026 oui, 2027 selon le vote, alcool jamais', () => {
    expect(E.peutPayer({ ...base, produit: 'courses' }).ok).toBe(true);
    expect(E.peutPayer({ ...base, produit: 'courses', annee: 2027 }).ok).toBe(true);
    expect(E.peutPayer({ ...base, produit: 'courses', annee: 2027, adoptee: false }).motif).toBe('courses');
    expect(E.peutPayer({ ...base, produit: 'fruits', annee: 2027, adoptee: false }).ok).toBe(true);
    expect(E.peutPayer({ ...base, produit: 'alcool' }).motif).toBe('alcool');
  });
});
describe('validité', () => {
  it('2026 carte : 28 février 2027, échange au 15 mars', () => expect(E.validite(2026, 'carte')).toMatchObject({ dernierJour: '2027-02-28', finEchange: '2027-03-15' }));
  it('2026 papier : 31 janvier 2027, échange au 15 février', () => expect(E.validite(2026, 'papier')).toMatchObject({ dernierJour: '2027-01-31', finEchange: '2027-02-15' }));
  it('2027 carte : 29 février 2028 (bissextile)', () => expect(E.validite(2027, 'carte').dernierJour).toBe('2028-02-29'));
});
describe('mois et coût', () => {
  it('20 titres de 10 € à 50 %', () => expect(E.mois(20, 10, 50)).toMatchObject({ credite: 200, employeur: 100, retenue: 100 }));
  it('jours sans repas et absences retirés', () => expect(E.titresDuMois(21, 2, 5)).toBe(14));
  it('10 salariés, 19 titres, 11 mois, 12 € à 60 %', () => expect(E.coutEmployeur(10, 19, 11, 12, 60)).toMatchObject({ titres: 2090, contribution: 15048, soumis: 0 }));
});
describe('régime à une date', () => {
  it('2027 sans loi : plus de courses', () => expect(E.regimeA('2027-01-01', false, 'senat').courses).toBe(false));
  it('2028 version Sénat : double plafond, papier fini, pas de dimanche', () => expect(E.regimeA('2028-01-01', true, 'senat')).toMatchObject({ doublePlafond: true, papier: false, dimancheTous: false, validite3ans: false }));
  it('2028 version AN : dimanche et trois ans', () => expect(E.regimeA('2028-01-01', true, 'an')).toMatchObject({ dimancheTous: true, validite3ans: true, doublePlafond: false }));
});
describe('simulateurs', () => {
  for (const k of TOOL_KINDS) for (const l of ['fr', 'en'] as const) it(`${k} (${l}) rend un résultat propre`, () => {
    const o = runTool(k, l);
    expect(JSON.stringify(o)).not.toMatch(/undefined|NaN|Infinity|null/);
    expect(o.value.length).toBeGreaterThan(0);
  });
});
