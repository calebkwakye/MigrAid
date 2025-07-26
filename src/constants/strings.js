// MigrAid Multilingual Strings
// Supporting English, French, Hausa, and Akan

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'ak', name: 'Akan', nativeName: 'Akan' },
];

export const strings = {
  en: {
    // App name and tagline
    appName: 'MigrAid',
    tagline: 'Privacy-first resource navigator',
    
    // Onboarding
    welcome: 'Welcome to MigrAid',
    welcomeMessage: 'Find resources safely and anonymously',
    selectLanguage: 'Select your language',
    anonymousMode: 'Anonymous Mode',
    anonymousModeDesc: 'Browse without providing personal information',
    getStarted: 'Get Started',
    
    // Navigation
    home: 'Home',
    resources: 'Resources',
    iceReports: 'ICE Reports',
    advocate: 'Advocate',
    settings: 'Settings',
    
    // Home screen
    findResources: 'Find Resources',
    recentReports: 'Recent ICE Reports',
    safetyFirst: 'Your safety and privacy come first',
    
    // Resource categories
    legal: 'Legal Aid',
    healthcare: 'Healthcare',
    food: 'Food Support',
    shelter: 'Shelter',
    education: 'Education',
    employment: 'Employment',
    translation: 'Translation',
    
    // Resource details
    address: 'Address',
    phone: 'Phone',
    website: 'Website',
    hours: 'Hours',
    verified: 'Verified',
    getDirections: 'Get Directions',
    callNow: 'Call Now',
    
    // ICE Reports
    reportIceActivity: 'Report ICE Activity',
    viewReports: 'View Reports',
    location: 'Location',
    time: 'Time',
    description: 'Description',
    anonymous: 'Anonymous',
    submitReport: 'Submit Report',
    
    // Forms
    required: 'Required',
    optional: 'Optional',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    
    // Privacy and security
    yourPrivacy: 'Your Privacy',
    dataProtection: 'Your data is protected and anonymous',
    noLocationTracking: 'No location tracking',
    encryptedReports: 'Encrypted reports',
    
    // Common actions
    search: 'Search',
    filter: 'Filter',
    map: 'Map',
    list: 'List',
    refresh: 'Refresh',
    share: 'Share',
    
    // Error messages
    error: 'Error',
    networkError: 'Network error. Please try again.',
    locationError: 'Unable to get location',
    tryAgain: 'Try Again',
  },
  
  fr: {
    // App name and tagline
    appName: 'MigrAid',
    tagline: 'Navigateur de ressources privé',
    
    // Onboarding
    welcome: 'Bienvenue sur MigrAid',
    welcomeMessage: 'Trouvez des ressources en toute sécurité et anonymement',
    selectLanguage: 'Sélectionnez votre langue',
    anonymousMode: 'Mode Anonyme',
    anonymousModeDesc: 'Naviguez sans fournir d\'informations personnelles',
    getStarted: 'Commencer',
    
    // Navigation
    home: 'Accueil',
    resources: 'Ressources',
    iceReports: 'Rapports ICE',
    advocate: 'Avocat',
    settings: 'Paramètres',
    
    // Home screen
    findResources: 'Trouver des Ressources',
    recentReports: 'Rapports ICE Récents',
    safetyFirst: 'Votre sécurité et confidentialité d\'abord',
    
    // Resource categories
    legal: 'Aide Juridique',
    healthcare: 'Soins de Santé',
    food: 'Aide Alimentaire',
    shelter: 'Abri',
    education: 'Éducation',
    employment: 'Emploi',
    translation: 'Traduction',
    
    // Resource details
    address: 'Adresse',
    phone: 'Téléphone',
    website: 'Site Web',
    hours: 'Heures',
    verified: 'Vérifié',
    getDirections: 'Obtenir des Directions',
    callNow: 'Appeler Maintenant',
    
    // ICE Reports
    reportIceActivity: 'Signaler Activité ICE',
    viewReports: 'Voir Rapports',
    location: 'Emplacement',
    time: 'Heure',
    description: 'Description',
    anonymous: 'Anonyme',
    submitReport: 'Soumettre Rapport',
    
    // Privacy and security
    yourPrivacy: 'Votre Confidentialité',
    dataProtection: 'Vos données sont protégées et anonymes',
    noLocationTracking: 'Aucun suivi de localisation',
    encryptedReports: 'Rapports cryptés',
    
    // Common actions
    search: 'Rechercher',
    filter: 'Filtrer',
    map: 'Carte',
    list: 'Liste',
    refresh: 'Actualiser',
    share: 'Partager',
    
    // Error messages
    error: 'Erreur',
    networkError: 'Erreur réseau. Veuillez réessayer.',
    locationError: 'Impossible d\'obtenir l\'emplacement',
    tryAgain: 'Réessayer',
  },
  
  ha: {
    // App name and tagline
    appName: 'MigrAid',
    tagline: 'Mai neman albarkatu na sirri',
    
    // Onboarding
    welcome: 'Maraba da MigrAid',
    welcomeMessage: 'Nemo albarkatu cikin aminci da boye-boye',
    selectLanguage: 'Zabar yarenka',
    anonymousMode: 'Yanayin Boye',
    anonymousModeDesc: 'Yi amfani ba tare da bayar da bayanin sirri ba',
    getStarted: 'Fara',
    
    // Navigation
    home: 'Gida',
    resources: 'Albarkatu',
    iceReports: 'Rahotannin ICE',
    advocate: 'Lauya',
    settings: 'Saitunan',
    
    // Resource categories
    legal: 'Taimakon Doka',
    healthcare: 'Kiwon Lafiya',
    food: 'Taimakon Abinci',
    shelter: 'Mafaka',
    education: 'Ilimi',
    employment: 'Aiki',
    translation: 'Fassara',
  },
  
  ak: {
    // App name and tagline
    appName: 'MigrAid',
    tagline: 'Aboaboa a wɔ ahintasem mu',
    
    // Onboarding
    welcome: 'Akwaaba wo MigrAid',
    welcomeMessage: 'Hwehwɛ mmoa ahorow wɔ ahotɔso ne ahintasem mu',
    selectLanguage: 'Yi w\'ankasa kasa',
    anonymousMode: 'Ahintasem Kwan',
    anonymousModeDesc: 'Di dwuma a womma w\'ankasa nsɛm',
    getStarted: 'Fi Ase',
    
    // Navigation
    home: 'Fie',
    resources: 'Mmoa',
    iceReports: 'ICE Amanneɛbɔ',
    advocate: 'Ɔkanni',
    settings: 'Nhyehyɛe',
    
    // Resource categories
    legal: 'Mmara Mmoa',
    healthcare: 'Apɔmuden',
    food: 'Aduan Mmoa',
    shelter: 'Aguabae',
    education: 'Nhomasua',
    employment: 'Adwuma',
    translation: 'Nkyerɛase',
  }
};

export const getString = (key, language = 'en') => {
  return strings[language]?.[key] || strings.en[key] || key;
};

export default strings; 