// SafeButton - Accessible, Privacy-First Button Component for MigrAid
// Includes proper touch targets and visual feedback

import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Accessibility } from '../../constants/theme';

const SafeButton = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, danger
  size = 'base', // sm, base, lg
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  accessibilityLabel,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyles = () => {
    const baseStyle = {
      minHeight: Accessibility.minTouchSize,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: BorderRadius.base,
      paddingHorizontal: Spacing.base,
      paddingVertical: Spacing.sm,
    };

    // Size variations
    if (size === 'sm') {
      baseStyle.paddingHorizontal = Spacing.sm;
      baseStyle.paddingVertical = Spacing.xs;
      baseStyle.minHeight = 36;
    } else if (size === 'lg') {
      baseStyle.paddingHorizontal = Spacing.lg;
      baseStyle.paddingVertical = Spacing.base;
      baseStyle.minHeight = 52;
    }

    // Variant styles
    let variantStyle = {};
    switch (variant) {
      case 'primary':
        variantStyle = {
          backgroundColor: disabled ? Colors.textLight : Colors.primary,
          borderWidth: 0,
        };
        break;
      case 'secondary':
        variantStyle = {
          backgroundColor: disabled ? Colors.surfaceVariant : Colors.secondary,
          borderWidth: 0,
        };
        break;
      case 'outline':
        variantStyle = {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? Colors.textLight : Colors.primary,
        };
        break;
      case 'danger':
        variantStyle = {
          backgroundColor: disabled ? Colors.textLight : Colors.error,
          borderWidth: 0,
        };
        break;
      default:
        variantStyle = {
          backgroundColor: disabled ? Colors.textLight : Colors.primary,
          borderWidth: 0,
        };
    }

    // Full width
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    return { ...baseStyle, ...variantStyle };
  };

  const getTextStyles = () => {
    const baseTextStyle = {
      fontSize: Typography.fontSize.base,
      fontWeight: Typography.fontWeight.medium,
      textAlign: 'center',
    };

    // Size variations
    if (size === 'sm') {
      baseTextStyle.fontSize = Typography.fontSize.sm;
    } else if (size === 'lg') {
      baseTextStyle.fontSize = Typography.fontSize.lg;
    }

    // Variant text colors
    let textColor = Colors.background; // Default white text
    if (variant === 'outline') {
      textColor = disabled ? Colors.textLight : Colors.primary;
    }

    return {
      ...baseTextStyle,
      color: textColor,
    };
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        getButtonStyles(),
        pressed && !disabled && { opacity: 0.8 },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? Colors.primary : Colors.background} 
        />
      ) : (
        <>
          {icon && (
            <Text style={[getTextStyles(), { marginRight: Spacing.xs }]}>
              {icon}
            </Text>
          )}
          <Text style={[getTextStyles(), textStyle]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Additional custom styles can be added here if needed
});

export default SafeButton; 