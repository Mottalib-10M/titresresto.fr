/** Toutes les pages prévues (id = nom du fichier de src/content/guides).
 *  Les tests acceptent un lien vers ces ids pendant la rédaction ; « chaque page prévue a son fichier » échoue tant qu'il en manque. */
export const PLANNED_GUIDES = [
  'exoneration', 'plafond', 'employeur', 'dimanche', 'supermarche', 'validite', 'teletravail', 'absences', 'reforme',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
