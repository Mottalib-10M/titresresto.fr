/** Mini-simulateurs de la trame (MiniSim, MiniSimAutonome). Ce site n'en a pas : chaque page porte un simulateur
 *  complet de tool-specs.ts en tête (brief du 2026-11-10, règle 3 : pas de mini répété). Le registre reste vide. */
import type { MiniSpec } from './mini-types';
export const MINI_SPECS: Record<string, (lang: string) => MiniSpec> = {};
export function getSpec(kind: string, lang = 'fr'): MiniSpec {
  const f = MINI_SPECS[kind];
  if (!f) throw new Error(`mini-simulateur inconnu : ${kind}`);
  return f(lang);
}
