/**
 * Kit d'écriture : tout chiffre écrit dans une page vient d'ici, jamais tapé à la main.
 *   K.P                       paramètres datés (params-2026.json)
 *   K.partage, K.validite …   règles pures (engine/tr.ts)
 *   K.tool(kind, lang, args, valeurs)  lance un simulateur de tool-specs.ts
 */
import P from '../data/params-2026.json';
import * as R from './engine/tr';
import { runTool } from './tool-specs';
import { LAST_UPDATED } from '../data/site-config';

export const KIT = { P, ...R, tool: runTool, LECTURE: LAST_UPDATED };
export type Kit = typeof KIT;
