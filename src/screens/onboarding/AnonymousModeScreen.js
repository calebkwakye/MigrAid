// Anonymous Mode Screen for MigrAid Onboarding
// Second step in the onboarding process

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SafeButton from '../../components/common/SafeButton';
import { Colors, Typography, Spacing, BorderRadius, CommonStyles } from '../../constants/theme';
import { getString } from '../../constants/strings';
import { storageService } from '../../services/storage';

const AnonymousModeScreen = ({ navigation }) => {
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const userLanguage = await storageService.getLanguage();
    setLanguage(userLanguage);
  };

  const handleContinue = async () => {
    try {
      await storageService.setAnonymousMode(anonymousMode);
      navigation.navigate('Permissions');
    } catch (error) {
      console.warn('Error saving anonymous mode:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const privacyFeatures = [
    {
      icon: 'shield-checkmark-outline',
      title: 'No Personal Data',
      description: 'We never collect or store your personal information',
    },
    {
      icon: 'location-outline',
      title: 'Location Privacy',
      description: 'Your location is anonymized for safety',
    },
    {
      icon: 'eye-off-outline',
      title: 'Anonymous Reporting',
      description: 'Report ICE activity completely anonymously',
    },
    {
      icon: 'lock-closed-outline',
      title: 'Secure Storage',
      description: 'All data is encrypted and stored locally',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.progressStepComplete]} />
            <View style={[styles.progressStep, styles.progressStepActive]} />
            <View style={styles.progressStep} />
          </View>
          <Text style={styles.progressText}>Step 2 of 3</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="shield-checkmark" size={64} color={Colors.secondary} />
          </View>
          <Text style={styles.title}>
            {getString('yourPrivacy', language)}
          </Text>
          <Text style={styles.subtitle}>
            {getString('dataProtection', language)}
          </Text>
        </View>

        {/* Privacy Features */}
        <View style={styles.featuresSection}>
          {privacyFeatures.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Ionicons name={feature.icon} size={24} color={Colors.primary} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Anonymous Mode Toggle */}
        <View style={styles.toggleSection}>
          <Text style={styles.toggleTitle}>
            {getString('anonymousMode', language)}
          </Text>
          <Text style={styles.toggleDescription}>
            {getString('anonymousModeDesc', language)}
          </Text>
          
          <SafeButton
            title={anonymousMode ? '✓ Anonymous Mode ON (Recommended)' : 'Anonymous Mode OFF'}
            onPress={() => setAnonymousMode(!anonymousMode)}
            variant={anonymousMode ? 'secondary' : 'outline'}
            fullWidth
            style={[styles.toggleButton, anonymousMode && styles.toggleButtonActive]}
            icon={<Ionicons 
              name={anonymousMode ? 'shield-checkmark' : 'shield-outline'} 
              size={20} 
              color={anonymousMode ? Colors.background : Colors.secondary} 
            />}
          />
          
          {!anonymousMode && (
            <View style={styles.warningCard}>
              <Ionicons name="warning-outline" size={20} color={Colors.warning} />
              <Text style={styles.warningText}>
                Disabling anonymous mode may reduce your privacy protection
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <SafeButton
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="lg"
            fullWidth
            style={styles.continueButton}
          />
          
          <SafeButton
            title="Back"
            onPress={handleBack}
            variant="ghost"
            fullWidth
            style={styles.backButton}
          />
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
  featuresSection: {
    marginBottom: Spacing.xl,
    gap: Spacing.base,
  },
  featureCard: {
    flexDirection: 'row',
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    alignItems: 'flex-start',
  },
  featureContent: {
    flex: 1,
    marginLeft: Spacing.base,
  },
  featureTitle: {
    ...CommonStyles.bodyLarge,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    ...CommonStyles.bodySmall,
    color: Colors.textSecondary,
  },
  toggleSection: {
    marginBottom: Spacing.xl,
  },
  toggleTitle: {
    ...CommonStyles.heading3,
    marginBottom: Spacing.xs,
  },
  toggleDescription: {
    ...CommonStyles.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  toggleButton: {
    marginBottom: Spacing.base,
  },
  toggleButtonActive: {
    borderColor: Colors.secondary,
  },
  warningCard: {
    flexDirection: 'row',
    padding: Spacing.base,
    backgroundColor: Colors.warningBackground,
    borderRadius: BorderRadius.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
    alignItems: 'flex-start',
  },
  warningText: {
    ...CommonStyles.bodySmall,
    color: Colors.warningDark,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  actions: {
    marginTop: Spacing.lg,
  },
  continueButton: {
    marginBottom: Spacing.base,
  },
  backButton: {
    marginBottom: Spacing.base,
  },
});

export default AnonymousModeScreen; 