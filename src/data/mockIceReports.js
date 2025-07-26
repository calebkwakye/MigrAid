// Mock ICE Reports Data for MigrAid
// Anonymous reporting system for community safety

export const REPORT_TYPES = {
  ICE_ACTIVITY: 'ice_activity',
  CHECKPOINT: 'checkpoint',
  RAID: 'raid',
  SURVEILLANCE: 'surveillance',
  ARREST: 'arrest',
};

export const REPORT_STATUS = {
  ACTIVE: 'active',
  RESOLVED: 'resolved',
  UNVERIFIED: 'unverified',
};

export const mockIceReports = [
  {
    id: 'ice-1',
    type: REPORT_TYPES.ICE_ACTIVITY,
    status: REPORT_STATUS.ACTIVE,
    location: {
      address: 'Near Downtown Crossing T Station',
      coordinates: {
        latitude: 42.3559,
        longitude: -71.0624
      },
      approximate: true // For privacy
    },
    timestamp: '2024-01-30T08:30:00Z',
    description: 'Multiple unmarked vehicles observed near transit station. Individuals in tactical gear.',
    reportedBy: 'anonymous',
    verificationCount: 3,
    lastVerified: '2024-01-30T09:15:00Z',
    tags: ['transit', 'multiple_agents', 'morning'],
    isActive: true,
    communityNotes: [
      {
        id: 'note-1',
        timestamp: '2024-01-30T08:45:00Z',
        content: 'Confirmed - saw same vehicles',
        anonymous: true
      },
      {
        id: 'note-2',
        timestamp: '2024-01-30T09:00:00Z',
        content: 'Activity has moved towards South Station',
        anonymous: true
      }
    ]
  },
  {
    id: 'ice-2',
    type: REPORT_TYPES.CHECKPOINT,
    status: REPORT_STATUS.RESOLVED,
    location: {
      address: 'I-95 Northbound near Exit 12',
      coordinates: {
        latitude: 42.2352,
        longitude: -71.0275
      },
      approximate: true
    },
    timestamp: '2024-01-29T14:20:00Z',
    description: 'Traffic checkpoint with document checks reported by multiple drivers.',
    reportedBy: 'anonymous',
    verificationCount: 7,
    lastVerified: '2024-01-29T16:30:00Z',
    tags: ['highway', 'checkpoint', 'afternoon'],
    isActive: false,
    resolvedAt: '2024-01-29T17:00:00Z',
    communityNotes: [
      {
        id: 'note-3',
        timestamp: '2024-01-29T15:00:00Z',
        content: 'Checkpoint still active as of 3 PM',
        anonymous: true
      },
      {
        id: 'note-4',
        timestamp: '2024-01-29T17:15:00Z',
        content: 'Checkpoint has been cleared',
        anonymous: true
      }
    ]
  },
  {
    id: 'ice-3',
    type: REPORT_TYPES.SURVEILLANCE,
    status: REPORT_STATUS.ACTIVE,
    location: {
      address: 'Chelsea area near market district',
      coordinates: {
        latitude: 42.3917,
        longitude: -71.0328
      },
      approximate: true
    },
    timestamp: '2024-01-30T12:00:00Z',
    description: 'Increased surveillance vehicles in area known for immigrant-owned businesses.',
    reportedBy: 'anonymous',
    verificationCount: 2,
    lastVerified: '2024-01-30T13:30:00Z',
    tags: ['surveillance', 'business_district', 'midday'],
    isActive: true,
    communityNotes: [
      {
        id: 'note-5',
        timestamp: '2024-01-30T12:30:00Z',
        content: 'Vehicles parked for extended periods',
        anonymous: true
      }
    ]
  },
  {
    id: 'ice-4',
    type: REPORT_TYPES.RAID,
    status: REPORT_STATUS.UNVERIFIED,
    location: {
      address: 'East Boston residential area',
      coordinates: {
        latitude: 42.3647,
        longitude: -71.0203
      },
      approximate: true
    },
    timestamp: '2024-01-30T06:00:00Z',
    description: 'Early morning activity at residential building. Multiple agents reported.',
    reportedBy: 'anonymous',
    verificationCount: 1,
    lastVerified: '2024-01-30T06:30:00Z',
    tags: ['residential', 'early_morning', 'multiple_agents'],
    isActive: false,
    communityNotes: []
  },
  {
    id: 'ice-5',
    type: REPORT_TYPES.ICE_ACTIVITY,
    status: REPORT_STATUS.RESOLVED,
    location: {
      address: 'Near Suffolk County Court',
      coordinates: {
        latitude: 42.3553,
        longitude: -71.0640
      },
      approximate: true
    },
    timestamp: '2024-01-28T10:00:00Z',
    description: 'Agents observed outside courthouse during morning court sessions.',
    reportedBy: 'anonymous',
    verificationCount: 5,
    lastVerified: '2024-01-28T11:00:00Z',
    tags: ['courthouse', 'morning', 'multiple_sightings'],
    isActive: false,
    resolvedAt: '2024-01-28T15:00:00Z',
    communityNotes: [
      {
        id: 'note-6',
        timestamp: '2024-01-28T10:30:00Z',
        content: 'Multiple people turned away from courthouse',
        anonymous: true
      },
      {
        id: 'note-7',
        timestamp: '2024-01-28T11:30:00Z',
        content: 'Activity decreased after 11 AM',
        anonymous: true
      }
    ]
  }
];

// Safety and privacy utilities
export const anonymizeLocation = (coordinates) => {
  // Add slight randomization for privacy while maintaining general area accuracy
  const latOffset = (Math.random() - 0.5) * 0.01; // ~500m radius
  const lngOffset = (Math.random() - 0.5) * 0.01;
  
  return {
    latitude: coordinates.latitude + latOffset,
    longitude: coordinates.longitude + lngOffset,
    approximate: true
  };
};

export const getActiveReports = () => {
  return mockIceReports.filter(report => report.isActive);
};

export const getRecentReports = (hours = 24) => {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  return mockIceReports.filter(report => 
    new Date(report.timestamp) > cutoff
  );
};

export const getReportsByType = (type) => {
  return mockIceReports.filter(report => report.type === type);
};

export const getVerifiedReports = () => {
  return mockIceReports.filter(report => report.verificationCount >= 2);
};

// Report submission structure for new reports
export const createReportTemplate = () => ({
  id: null, // Will be generated
  type: '',
  status: REPORT_STATUS.UNVERIFIED,
  location: {
    address: '',
    coordinates: null,
    approximate: true
  },
  timestamp: new Date().toISOString(),
  description: '',
  reportedBy: 'anonymous',
  verificationCount: 0,
  lastVerified: null,
  tags: [],
  isActive: true,
  communityNotes: []
});

export default mockIceReports; 