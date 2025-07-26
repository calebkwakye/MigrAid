// MigrAid Theme Configuration
// Privacy-first design with accessibility and multilingual support

export const Colors = {
  // Primary brand colors - trust and safety
  primary: '#2563EB', // Blue - trustworthy, calm
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  
  // Secondary colors - hope and growth
  secondary: '#059669', // Green - hope, safety, growth
  secondaryLight: '#10B981',
  secondaryDark: '#047857',
  
  // Neutral colors
  background: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceVariant: '#F1F5F9',
  
  // Text colors
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  
  // Status colors
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  info: '#0EA5E9',
  
  // Privacy/Security indicators
  secure: '#059669', // Green for secure/anonymous
  verified: '#2563EB', // Blue for verified resources
  
  // Border and divider colors
  border: '#E2E8F0',
  divider: '#F1F5F9',
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

export const Typography = {
  // Font families - system fonts for better performance and multilingual support
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  // Font sizes - accessible and readable
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    bold: '700',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const BorderRadius = {
  sm: 4,
  base: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Accessibility configurations
export const Accessibility = {
  minTouchSize: 44, // Minimum touch target size (iOS HIG)
  iconSizes: {
    sm: 16,
    base: 24,
    lg: 32,
    xl: 48,
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Accessibility,
}; 