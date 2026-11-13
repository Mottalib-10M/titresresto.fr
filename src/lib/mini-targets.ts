/** Où mène le lien d'un simulateur : la page qui porte l'outil complet de ce type. */
import { ROUTES, route } from '../i18n/routes';
import { pageOfTool } from './pages';
import type { Lang } from './format';
/** Outils dont la version complète n'est pas en tête d'un guide. */
const EXTRA: Record<string, string> = { partage: 'home' };
export const miniHref = (kind: string, lang: Lang, fallback: string) => { const id = EXTRA[kind] ?? pageOfTool(kind); return id && ROUTES.some((r) => r.id === id) ? route(id, lang) : fallback; };
