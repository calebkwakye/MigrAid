// MigrAid Professional Theme System
// Privacy-first design focused on trust, safety, and accessibility

export const Colors = {
  // Primary brand colors - Trust and Safety
  primary: '#3B82F6', // Trust blue - reliable, trustworthy
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',
  primaryBackground: 'rgba(59, 130, 246, 0.1)',
  
  // Secondary colors - Hope and Growth
  secondary: '#10B981', // Hope green - safety, growth, positivity
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  secondaryBackground: 'rgba(16, 185, 129, 0.1)',
  
  // Critical Alert - ICE Activity
  danger: '#EF4444', // ICE alert red - urgent, warning
  dangerLight: '#F87171',
  dangerDark: '#DC2626',
  dangerBackground: 'rgba(239, 68, 68, 0.1)',
  
  // Status colors
  success: '#10B981', // Same as secondary for consistency
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',
  warningBackground: 'rgba(245, 158, 11, 0.1)',
  
  info: '#3B82F6', // Same as primary for consistency
  infoLight: '#60A5FA',
  infoDark: '#2563EB',
  infoBackground: 'rgba(59, 130, 246, 0.1)',
  
  // Neutral colors - Clean and accessible
  background: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceVariant: '#F1F5F9',
  surfaceHover: '#E2E8F0',
  
  // Text colors - High contrast for readability
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  textDisabled: '#CBD5E1',
  
  // Privacy/Security indicators
  secure: '#10B981', // Green for secure/anonymous
  verified: '#3B82F6', // Blue for verified resources
  anonymous: '#8B5CF6', // Purple for anonymous indicators
  
  // Border and divider colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderDark: '#CBD5E1',
  divider: '#F1F5F9',
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
};

export const Typography = {
  // Font families - Inter for professional, clean appearance
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium', 
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    // Fallbacks for system fonts if Inter not available
    fallback: 'System',
  },
  
  // Font sizes - Accessible and scalable
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Line heights - Optimized for readability
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
  },
};

export const Spacing = {
  xs: 4,    // 4px
  sm: 8,    // 8px
  base: 16, // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
  '5xl': 96,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
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
  xl: {
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Common UI Component Styles
export const CommonStyles = {
  // Card styles
  card: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadows.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  cardElevated: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.lg,
    borderWidth: 0,
  },
  
  cardFlat: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  
  // Button base styles
  buttonBase: {
    borderRadius: BorderRadius.base,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // Accessibility requirement
  },
  
  buttonPrimary: {
    backgroundColor: Colors.primary,
    ...Shadows.sm,
  },
  
  buttonSecondary: {
    backgroundColor: Colors.secondary,
    ...Shadows.sm,
  },
  
  buttonDanger: {
    backgroundColor: Colors.danger,
    ...Shadows.sm,
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  
  buttonGhost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  
  // Input styles
  inputBase: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.base,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.base,
    color: Colors.text,
    minHeight: 44, // Accessibility requirement
  },
  
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
    ...Shadows.sm,
  },
  
  inputError: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerBackground,
  },
  
  // Text styles
  heading1: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    lineHeight: Typography.lineHeight.tight,
  },
  
  heading2: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    lineHeight: Typography.lineHeight.tight,
  },
  
  heading3: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text,
    lineHeight: Typography.lineHeight.normal,
  },
  
  bodyLarge: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text,
    lineHeight: Typography.lineHeight.relaxed,
  },
  
  body: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text,
    lineHeight: Typography.lineHeight.normal,
  },
  
  bodySmall: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.normal,
  },
  
  caption: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.textLight,
    lineHeight: Typography.lineHeight.normal,
  },
  
  // Privacy/Security indicators
  privacyBadge: {
    backgroundColor: Colors.secondaryBackground,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  
  verifiedBadge: {
    backgroundColor: Colors.infoBackground,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  
  dangerBadge: {
    backgroundColor: Colors.dangerBackground,
    borderColor: Colors.danger,
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
};

// Accessibility configurations
export const Accessibility = {
  minTouchSize: 44, // Minimum touch target size (iOS HIG & Android Guidelines)
  iconSizes: {
    xs: 12,
    sm: 16,
    base: 24,
    lg: 32,
    xl: 48,
    '2xl': 64,
  },
  
  // Focus indicators
  focusRing: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.base,
  },
  
  // High contrast mode support
  highContrast: {
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
  },
};

// Animation configurations
export const Animations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  CommonStyles,
  Accessibility,
  Animations,
}; 