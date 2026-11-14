/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://titresresto.fr";
export const SITE_NAMES: Record<string, string> = {"fr": "Titres Resto", "en": "Titres Resto"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "Resto";
export const LANG_TAGS: Record<string, string> = {"fr": "fr-FR", "en": "en-FR"};
export const OG_LOCALES: Record<string, string> = {"fr": "fr_FR", "en": "en_GB"};
export const LOCALE_TAG = 'fr-FR';
export const CURRENCY = 'EUR';
/** Locale des nombres par langue de page (RECETTE §4) : virgule en français, point en anglais. */
export const NUM_TAGS: Record<string, string> = {"fr": "fr-FR", "en": "en-GB"};
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"fr": "Éditeur indépendant de calculateurs sur les titres-restaurant, établis sur le code du travail et les textes du Parlement", "en": "Independent publisher of meal-voucher (titre-restaurant) calculators built on the French Labour Code and the bills before Parliament"};
export const AUTHOR_DESC: Record<string, string> = {"fr": "Radif Partners lit le code du travail (articles L. 3262-1 et suivants, R. 3262-1 à R. 3262-11), la fiche service-public.fr et le dossier de la proposition de loi sur le titre-restaurant au Sénat, puis en tire des calculateurs : part de l'employeur exonérée, reste à charge du salarié, budget du mois, date limite d'un millésime, et ce qui change en 2027 et en 2028 selon la version du texte. Nous ne sommes ni un émetteur, ni un employeur, ni l'administration ; nous ne vendons rien et ne demandons aucune coordonnée.", "en": "Radif Partners reads the French Labour Code (articles L. 3262-1 onwards, R. 3262-1 to R. 3262-11), the service-public.fr guidance and the Senate file of the meal-voucher bill, and turns them into calculators: the employer share that is exempt, what the employee pays, the monthly budget, the expiry date of a vintage, and what changes in 2027 and 2028 under each version of the bill. We are not a voucher issuer, an employer or a public body; we sell nothing and ask for no contact details."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"fr": ["Exonération de la contribution patronale aux titres-restaurant", "Plafond journalier d'utilisation des titres-restaurant", "Validité et échange des titres-restaurant millésimés", "Usage des titres-restaurant le dimanche et les jours fériés", "Proposition de loi sur le titre-restaurant (2026-2027)"], "en": ["Social-security exemption of the employer contribution to meal vouchers", "Daily spending cap on French meal vouchers", "Validity and exchange of dated meal vouchers", "Using meal vouchers on Sundays and public holidays", "The 2026-2027 French meal-voucher bill"]};
export const CONTACT_EMAIL = "contact@titresresto.fr";
export const THEME_COLOR = '#A33A1C';
export const LOGO_SYMBOL = 'TR';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-CN7WQV74MY';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'zdgf18u0sr';
export const INDEXNOW_KEY = 'f8e59f04cfc435432963c658a739d695';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA",
  vatNumber: '',
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
