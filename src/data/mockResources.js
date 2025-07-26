// Mock Resources Data for MigrAid
// Realistic data for immigrant resources across different categories

export const RESOURCE_CATEGORIES = {
  LEGAL: 'legal',
  HEALTHCARE: 'healthcare',
  FOOD: 'food',
  SHELTER: 'shelter',
  EDUCATION: 'education',
  EMPLOYMENT: 'employment',
  TRANSLATION: 'translation',
};

export const mockResources = [
  // Legal Aid Resources
  {
    id: 'legal-1',
    name: 'Immigration Legal Services Collaborative',
    category: RESOURCE_CATEGORIES.LEGAL,
    description: 'Free legal assistance for immigration cases, deportation defense, and family reunification.',
    address: '123 Main Street, Boston, MA 02108',
    phone: '(617) 123-4567',
    website: 'https://ilscenter.org',
    email: 'help@ilscenter.org',
    hours: 'Mon-Fri 9AM-5PM',
    languages: ['English', 'Spanish', 'French', 'Hausa'],
    verified: true,
    lastUpdated: '2024-01-15',
    coordinates: {
      latitude: 42.3601,
      longitude: -71.0589
    },
    services: [
      'Deportation defense',
      'Family reunification',
      'Asylum applications',
      'DACA renewals',
      'Citizenship applications'
    ],
    requirements: 'Free for low-income individuals',
    emergencyContact: '(617) 123-4567'
  },
  {
    id: 'legal-2',
    name: 'Central American Resource Center',
    category: RESOURCE_CATEGORIES.LEGAL,
    description: 'Comprehensive immigration services with focus on Central American communities.',
    address: '456 Oak Avenue, Cambridge, MA 02139',
    phone: '(617) 234-5678',
    website: 'https://carecenboston.org',
    hours: 'Mon-Thu 10AM-6PM, Fri 10AM-4PM',
    languages: ['Spanish', 'English', 'Q\'eqchi\'', 'Mam'],
    verified: true,
    lastUpdated: '2024-01-20',
    coordinates: {
      latitude: 42.3736,
      longitude: -71.1097
    },
    services: [
      'Legal representation',
      'Know your rights workshops',
      'Document preparation',
      'Translation services'
    ],
    requirements: 'Sliding scale fees based on income'
  },

  // Healthcare Resources
  {
    id: 'health-1',
    name: 'Community Health Center',
    category: RESOURCE_CATEGORIES.HEALTHCARE,
    description: 'Federally qualified health center providing comprehensive healthcare regardless of immigration status.',
    address: '789 Health Street, Somerville, MA 02143',
    phone: '(617) 345-6789',
    website: 'https://communityhealthcenter.org',
    hours: 'Mon-Fri 8AM-8PM, Sat 9AM-5PM',
    languages: ['English', 'Spanish', 'Portuguese', 'Haitian Creole'],
    verified: true,
    lastUpdated: '2024-01-18',
    coordinates: {
      latitude: 42.3875,
      longitude: -71.0995
    },
    services: [
      'Primary care',
      'Mental health services',
      'Dental care',
      'Pharmacy',
      'Health insurance enrollment'
    ],
    requirements: 'No insurance required, sliding scale fees',
    emergencyContact: '(617) 345-6789'
  },
  {
    id: 'health-2',
    name: 'Free Clinic Network',
    category: RESOURCE_CATEGORIES.HEALTHCARE,
    description: 'Network of volunteer-run free clinics serving uninsured immigrants.',
    address: '321 Care Lane, Boston, MA 02118',
    phone: '(617) 456-7890',
    hours: 'Tue, Thu 6PM-9PM, Sat 10AM-2PM',
    languages: ['English', 'Spanish', 'French', 'Arabic'],
    verified: true,
    lastUpdated: '2024-01-22',
    coordinates: {
      latitude: 42.3398,
      longitude: -71.0892
    },
    services: [
      'Basic medical care',
      'Prescription assistance',
      'Health screenings',
      'Vaccinations'
    ],
    requirements: 'Uninsured individuals only'
  },

  // Food Resources
  {
    id: 'food-1',
    name: 'Greater Boston Food Bank',
    category: RESOURCE_CATEGORIES.FOOD,
    description: 'Food pantry providing emergency food assistance to immigrant families.',
    address: '70 South Bay Avenue, Boston, MA 02118',
    phone: '(617) 427-5200',
    website: 'https://gbfb.org',
    hours: 'Mon-Fri 9AM-4PM',
    languages: ['English', 'Spanish', 'Vietnamese'],
    verified: true,
    lastUpdated: '2024-01-25',
    coordinates: {
      latitude: 42.3359,
      longitude: -71.0611
    },
    services: [
      'Emergency food boxes',
      'Fresh produce',
      'Baby food and formula',
      'Mobile food pantry'
    ],
    requirements: 'No documentation required'
  },
  {
    id: 'food-2',
    name: 'Community Meals Program',
    category: RESOURCE_CATEGORIES.FOOD,
    description: 'Free community meals served daily, no questions asked.',
    address: '555 Unity Street, Roxbury, MA 02119',
    phone: '(617) 567-8901',
    hours: 'Daily 11AM-1PM, 5PM-7PM',
    languages: ['English', 'Spanish', 'Haitian Creole'],
    verified: true,
    lastUpdated: '2024-01-28',
    coordinates: {
      latitude: 42.3317,
      longitude: -71.0851
    },
    services: [
      'Hot meals',
      'Take-home meals',
      'Children\'s meals',
      'Holiday meals'
    ],
    requirements: 'Open to all community members'
  },

  // Shelter Resources
  {
    id: 'shelter-1',
    name: 'Family Shelter Network',
    category: RESOURCE_CATEGORIES.SHELTER,
    description: 'Emergency shelter and transitional housing for immigrant families.',
    address: '888 Safe Haven Road, Boston, MA 02120',
    phone: '(617) 678-9012',
    website: 'https://familyshelternetwork.org',
    hours: '24/7 Emergency Hotline',
    languages: ['English', 'Spanish', 'French', 'Portuguese'],
    verified: true,
    lastUpdated: '2024-01-30',
    coordinates: {
      latitude: 42.3344,
      longitude: -71.0742
    },
    services: [
      'Emergency shelter',
      'Transitional housing',
      'Case management',
      'Housing search assistance'
    ],
    requirements: 'Families with children prioritized',
    emergencyContact: '(617) 678-9012'
  },

  // Education Resources
  {
    id: 'education-1',
    name: 'Adult Learning Center',
    category: RESOURCE_CATEGORIES.EDUCATION,
    description: 'English classes, GED preparation, and vocational training for immigrants.',
    address: '333 Learning Lane, Cambridge, MA 02140',
    phone: '(617) 789-0123',
    website: 'https://adultlearningcenter.org',
    hours: 'Mon-Thu 6PM-9PM, Sat 9AM-12PM',
    languages: ['English', 'Spanish', 'Mandarin', 'Arabic'],
    verified: true,
    lastUpdated: '2024-02-01',
    coordinates: {
      latitude: 42.3656,
      longitude: -71.1028
    },
    services: [
      'ESL classes',
      'GED preparation',
      'Computer skills',
      'Job training programs'
    ],
    requirements: 'Open enrollment, sliding scale fees'
  },

  // Employment Resources
  {
    id: 'employment-1',
    name: 'Immigrant Worker Center',
    category: RESOURCE_CATEGORIES.EMPLOYMENT,
    description: 'Job placement services and workers\' rights education for immigrants.',
    address: '444 Work Street, Somerville, MA 02144',
    phone: '(617) 890-1234',
    hours: 'Mon-Fri 9AM-5PM',
    languages: ['English', 'Spanish', 'Portuguese', 'Haitian Creole'],
    verified: true,
    lastUpdated: '2024-02-03',
    coordinates: {
      latitude: 42.3793,
      longitude: -71.0990
    },
    services: [
      'Job placement',
      'Resume assistance',
      'Workers\' rights education',
      'Wage theft assistance'
    ],
    requirements: 'No documentation required for services'
  }
];

// Helper functions
export const getResourcesByCategory = (category) => {
  return mockResources.filter(resource => resource.category === category);
};

export const getVerifiedResources = () => {
  return mockResources.filter(resource => resource.verified);
};

export const searchResources = (query) => {
  const lowerQuery = query.toLowerCase();
  return mockResources.filter(resource => 
    resource.name.toLowerCase().includes(lowerQuery) ||
    resource.description.toLowerCase().includes(lowerQuery) ||
    resource.services?.some(service => service.toLowerCase().includes(lowerQuery))
  );
};

export default mockResources; 