import type { Locale } from './routes';
import type { LibellesTrame } from '../lib/libelles-trame';
const fr = {
  updatedOn: 'Mis à jour le', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Préparé par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d\'Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions fréquentes', relatedCalculators: 'Pour continuer', sourcesTitle: 'Textes sur lesquels repose cette page', writtenBy: 'Préparé par',
  asOf: 'Situation', lastUpdated: 'chiffres relus le', footerValidated: 'Chiffres relus sur service-public.fr, le site de la CNTR et les textes du Sénat sur la proposition de loi',
  footerBrowser: 'Les simulateurs fonctionnent dans votre navigateur · rien de ce que vous tapez n\'est envoyé, et ce n\'est gardé que dans cet onglet · sans inscription',
  footerDisclaimer: 'Titres Resto est un site indépendant publié par Radif Partners : ce n\'est ni un émetteur de titres-restaurant, ni l\'administration, ni la CNTR. Estimation indicative : votre employeur, votre contrat et votre émetteur font foi. Contient des informations de service-public.fr (DILA), réutilisées sous Licence Ouverte 2.0, fiche F21059 vérifiée le 8 juillet 2026 par la DILA.',
  footerReuse: '',
  footerPopular: 'Simulateurs',
  notFound: 'Aucune page à cette adresse. L\'accueil calcule la part de vos titres-restaurant payée par l\'employeur et ce qui est retenu sur votre salaire.',
  readMore: 'Lire la suite',
  trama: {} as Partial<LibellesTrame>,
  privacyLine: 'Nous ne demandons ni nom, ni courriel : le calcul se fait dans votre navigateur et rien n\'est envoyé.',
  copyLink: 'Copier le lien', copied: 'Lien copié', print: 'Imprimer', howComputed: 'Comment c\'est calculé', openFull: 'Ouvrir le simulateur complet',
  independent: 'Site indépendant : ni émetteur de titres, ni administration',
};
const en: typeof fr = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Next steps', sourcesTitle: 'Texts this page is based on', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'figures re-read on', footerValidated: 'Figures re-read on service-public.fr, the CNTR site and the Senate texts on the bill',
  footerBrowser: 'The simulators run in your browser · nothing you type is sent anywhere, and it is only kept in this tab · no sign-up',
  footerDisclaimer: 'Titres Resto is an independent site published by Radif Partners: it is not a meal-voucher issuer, a public body or the CNTR. Indicative estimate only: your employer, your contract and your issuer have the final word. Contains information from service-public.fr (DILA), reused under the Licence Ouverte 2.0, page F21059 checked by DILA on 8 July 2026.',
  footerReuse: '',
  footerPopular: 'Simulators',
  notFound: 'Nothing lives at this address. The home page works out how much of your meal vouchers the employer pays and what is taken from your pay.',
  readMore: 'Read more',
  trama: {} as Partial<LibellesTrame>,
  privacyLine: 'We ask for no name or email: the calculation runs in your browser and nothing is sent.',
  copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is calculated', openFull: 'Open the full simulator',
  independent: 'Independent site: not a voucher issuer or a public body',
};
const ALL = { fr, en };
export function t(lang: Locale) { return ALL[lang] ?? fr; }
