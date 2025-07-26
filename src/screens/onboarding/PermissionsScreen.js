// Permissions Screen for MigrAid Onboarding
// Third and final step in the onboarding process

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SafeButton from '../../components/common/SafeButton';
import { Colors, Typography, Spacing, BorderRadius, CommonStyles } from '../../constants/theme';
import { getString } from '../../constants/strings';
import { storageService } from '../../services/storage';
import { locationService } from '../../services/location';

const PermissionsScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [locationPermission, setLocationPermission] = useState(false);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  useEffect(() => {
    loadLanguage();
    checkExistingPermissions();
  }, []);

  const loadLanguage = async () => {
    const userLanguage = await storageService.getLanguage();
    setLanguage(userLanguage);
  };

  const checkExistingPermissions = async () => {
    try {
      const permissions = await storageService.getLocationPermissions();
      setLocationPermission(permissions.granted);
    } catch (error) {
      console.warn('Error checking permissions:', error);
    }
  };

  const handleLocationPermission = async () => {
    setIsRequestingLocation(true);
    try {
      const result = await locationService.requestPermissions();
      setLocationPermission(result.granted);
      
      if (result.granted) {
        Alert.alert(
          'Location Access Granted',
          'Your location will be anonymized to protect your privacy while helping you find nearby resources.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Location Access Denied',
          'You can still use MigrAid without location access. You can enable it later in settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.warn('Error requesting location permission:', error);
    } finally {
      setIsRequestingLocation(false);
    }
  };

  const handleComplete = async () => {
    try {
      await storageService.setOnboardingComplete(true);
      // Navigation will be handled by App.js re-render
    } catch (error) {
      console.warn('Error completing onboarding:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const permissions = [
    {
      id: 'location',
      icon: 'location-outline',
      title: 'Location Access',
      description: 'Find nearby resources and services',
      privacy: 'Your location is anonymized for privacy',
      granted: locationPermission,
      required: false,
      action: handleLocationPermission,
      loading: isRequestingLocation,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.progressStepComplete]} />
            <View style={[styles.progressStep, styles.progressStepComplete]} />
            <View style={[styles.progressStep, styles.progressStepActive]} />
          </View>
          <Text style={styles.progressText}>Step 3 of 3</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="settings-outline" size={64} color={Colors.info} />
          </View>
          <Text style={styles.title}>Permission Setup</Text>
          <Text style={styles.subtitle}>
            Enable features to enhance your experience while maintaining privacy
          </Text>
        </View>

        {/* Permissions List */}
        <View style={styles.permissionsSection}>
          {permissions.map((permission) => (
            <View key={permission.id} style={styles.permissionCard}>
              <View style={styles.permissionHeader}>
                <View style={styles.permissionIcon}>
                  <Ionicons name={permission.icon} size={24} color={Colors.primary} />
                </View>
                <View style={styles.permissionInfo}>
                  <Text style={styles.permissionTitle}>{permission.title}</Text>
                  <Text style={styles.permissionDescription}>{permission.description}</Text>
                  <Text style={styles.permissionPrivacy}>{permission.privacy}</Text>
                </View>
                <View style={styles.permissionStatus}>
                  {permission.granted ? (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.secondary} />
                  ) : (
                    <Ionicons name="ellipse-outline" size={24} color={Colors.border} />
                  )}
                </View>
              </View>
              
              <SafeButton
                title={permission.granted ? 'Granted' : 'Enable'}
                onPress={permission.action}
                variant={permission.granted ? 'secondary' : 'outline'}
                size="sm"
                disabled={permission.granted}
                loading={permission.loading}
                style={styles.permissionButton}
              />
            </View>
          ))}
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Ionicons name="shield-checkmark" size={24} color={Colors.secure} />
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Privacy Protected</Text>
            <Text style={styles.privacyText}>
              • All permissions are optional{'\n'}
              • Your data stays on your device{'\n'}
              • Location data is anonymized{'\n'}
              • Change settings anytime
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <SafeButton
            title="Get Started"
            onPress={handleComplete}
            variant="primary"
            size="lg"
            fullWidth
            style={styles.completeButton}
          />
          
          <SafeButton
            title="Back"
            onPress={handleBack}
            variant="ghost"
            fullWidth
            style={styles.backButton}
          />
        </View>

        {/* Skip Notice */}
        <View style={styles.skipNotice}>
          <Text style={styles.skipText}>
            You can enable or change these permissions anytime in the Profile tab
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  progressBar: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  progressStep: {
    width: 60,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.sm,
  },
  progressStepActive: {
    backgroundColor: Colors.primary,
  },
  progressStepComplete: {
    backgroundColor: Colors.secondary,
  },
  progressText: {
    ...CommonStyles.caption,
    color: Colors.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...CommonStyles.heading1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...CommonStyles.bodyLarge,
    textAlign: 'center',
    color: Colors.textSecondary,
  },
  permissionsSection: {
    marginBottom: Spacing.xl,
    gap: Spacing.base,
  },
  permissionCard: {
    ...CommonStyles.card,
    padding: Spacing.lg,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.base,
  },
  permissionIcon: {
    marginRight: Spacing.base,
    marginTop: Spacing.xs,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionTitle: {
    ...CommonStyles.bodyLarge,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.xs,
  },
  permissionDescription: {
    ...CommonStyles.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  permissionPrivacy: {
    ...CommonStyles.bodySmall,
    color: Colors.secure,
    fontStyle: 'italic',
  },
  permissionStatus: {
    marginLeft: Spacing.sm,
    marginTop: Spacing.xs,
  },
  permissionButton: {
    alignSelf: 'flex-start',
  },
  privacyNotice: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.secondaryBackground,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
    marginBottom: Spacing.xl,
  },
  privacyContent: {
    flex: 1,
    marginLeft: Spacing.base,
  },
  privacyTitle: {
    ...CommonStyles.bodyLarge,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.secondary,
    marginBottom: Spacing.xs,
  },
  privacyText: {
    ...CommonStyles.bodySmall,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
  actions: {
    marginBottom: Spacing.lg,
  },
  completeButton: {
    marginBottom: Spacing.base,
  },
  backButton: {
    marginBottom: Spacing.base,
  },
  skipNotice: {
    alignItems: 'center',
    paddingTop: Spacing.base,
  },
  skipText: {
    ...CommonStyles.caption,
    textAlign: 'center',
    color: Colors.textLight,
  },
});

export default PermissionsScreen; 