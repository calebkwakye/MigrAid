// Profile Screen for MigrAid
// Settings, privacy controls, and advocate access

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SafeButton from '../../components/common/SafeButton';
import { Colors, Typography, Spacing, BorderRadius, CommonStyles } from '../../constants/theme';
import { SUPPORTED_LANGUAGES, getString } from '../../constants/strings';
import { storageService } from '../../services/storage';

const ProfileScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [settings, setSettings] = useState({
    locationEnabled: false,
    notificationsEnabled: false,
  });

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const userLanguage = await storageService.getLanguage();
      const isAnonymous = await storageService.getAnonymousMode();
      const locationPerms = await storageService.getLocationPermissions();
      const notificationSettings = await storageService.getNotificationSettings();

      setLanguage(userLanguage);
      setAnonymousMode(isAnonymous);
      setSettings({
        locationEnabled: locationPerms.granted,
        notificationsEnabled: notificationSettings.iceAlerts,
      });
    } catch (error) {
      console.warn('Error loading settings:', error);
    }
  };

  const handleLanguageChange = async (newLanguage) => {
    try {
      await storageService.setLanguage(newLanguage);
      setLanguage(newLanguage);
      await storageService.updateUsageAnalytics('language_change');
    } catch (error) {
      console.warn('Error changing language:', error);
    }
  };

  const handleAnonymousModeToggle = async (value) => {
    try {
      await storageService.setAnonymousMode(value);
      setAnonymousMode(value);
      
      Alert.alert(
        value ? 'Anonymous Mode Enabled' : 'Anonymous Mode Disabled',
        value 
          ? 'Your privacy protection has been enhanced'
          : 'Some privacy features have been reduced',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.warn('Error toggling anonymous mode:', error);
    }
  };

  const handleAdvocateLogin = () => {
    Alert.alert(
      'Advocate Access',
      'This feature allows verified community advocates and NGO workers to access management tools. Contact your organization for access credentials.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Learn More', onPress: () => handleFeatureComingSoon('Advocate Portal') }
      ]
    );
  };

  const handleDataExport = async () => {
    try {
      const userData = await storageService.exportUserData();
      Alert.alert(
        'Data Export',
        `Your data export is ready. Total storage: ${Object.keys(userData).length} items`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.warn('Error exporting data:', error);
    }
  };

  const handleDataDeletion = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your settings and cached data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: confirmDataDeletion }
      ]
    );
  };

  const confirmDataDeletion = async () => {
    try {
      await storageService.deleteAllUserData();
      Alert.alert(
        'Data Deleted',
        'All your data has been permanently deleted. The app will restart with default settings.',
        [{ text: 'OK', onPress: () => {
          // Reset to onboarding
          storageService.setOnboardingComplete(false);
        }}]
      );
    } catch (error) {
      console.warn('Error deleting data:', error);
    }
  };

  const handleFeatureComingSoon = (feature) => {
    Alert.alert(
      'Coming Soon',
      `${feature} is being developed and will be available in a future update.`,
      [{ text: 'OK' }]
    );
  };

  const settingsGroups = [
    {
      title: 'Language & Privacy',
      items: [
        {
          id: 'language',
          title: 'Language',
          subtitle: SUPPORTED_LANGUAGES.find(l => l.code === language)?.nativeName || 'English',
          icon: 'language-outline',
          type: 'navigation',
          action: () => handleFeatureComingSoon('Language Selection'),
        },
        {
          id: 'anonymous',
          title: 'Anonymous Mode',
          subtitle: anonymousMode ? 'Enhanced privacy protection' : 'Standard privacy',
          icon: 'shield-checkmark-outline',
          type: 'toggle',
          value: anonymousMode,
          action: handleAnonymousModeToggle,
        },
      ],
    },
    {
      title: 'Permissions',
      items: [
        {
          id: 'location',
          title: 'Location Access',
          subtitle: settings.locationEnabled ? 'Enabled (Anonymized)' : 'Disabled',
          icon: 'location-outline',
          type: 'info',
          action: () => handleFeatureComingSoon('Location Settings'),
        },
        {
          id: 'notifications',
          title: 'Safety Notifications',
          subtitle: settings.notificationsEnabled ? 'Enabled' : 'Disabled',
          icon: 'notifications-outline',
          type: 'info',
          action: () => handleFeatureComingSoon('Notification Settings'),
        },
      ],
    },
    {
      title: 'Data & Privacy',
      items: [
        {
          id: 'export',
          title: 'Export My Data',
          subtitle: 'Download all your stored information',
          icon: 'download-outline',
          type: 'navigation',
          action: handleDataExport,
        },
        {
          id: 'delete',
          title: 'Delete All Data',
          subtitle: 'Permanently remove all stored data',
          icon: 'trash-outline',
          type: 'danger',
          action: handleDataDeletion,
        },
      ],
    },
  ];

  const renderSettingItem = (item) => (
    <View key={item.id} style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons 
          name={item.icon} 
          size={24} 
          color={item.type === 'danger' ? Colors.danger : Colors.primary} 
        />
      </View>
      
      <View style={styles.settingContent}>
        <Text style={[
          styles.settingTitle,
          item.type === 'danger' && { color: Colors.danger }
        ]}>
          {item.title}
        </Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      
      <View style={styles.settingAction}>
        {item.type === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={item.action}
            trackColor={{ false: Colors.border, true: Colors.secondaryLight }}
            thumbColor={item.value ? Colors.secondary : Colors.textLight}
          />
        ) : (
          <SafeButton
            title={item.type === 'danger' ? 'Delete' : 'View'}
            onPress={item.action}
            variant={item.type === 'danger' ? 'danger' : 'outline'}
            size="sm"
          />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile & Settings</Text>
          <Text style={styles.subtitle}>
            Manage your privacy, language, and app preferences
          </Text>
        </View>

        {/* Privacy Status */}
        <View style={styles.privacyStatus}>
          <View style={styles.privacyIcon}>
            <Ionicons 
              name={anonymousMode ? 'shield-checkmark' : 'shield-outline'} 
              size={32} 
              color={anonymousMode ? Colors.secondary : Colors.textSecondary} 
            />
          </View>
          <View style={styles.privacyInfo}>
            <Text style={styles.privacyTitle}>
              {anonymousMode ? 'Anonymous Mode Active' : 'Anonymous Mode Inactive'}
            </Text>
            <Text style={styles.privacyDescription}>
              {anonymousMode 
                ? 'Your privacy is protected with enhanced anonymization'
                : 'Consider enabling anonymous mode for better privacy'
              }
            </Text>
          </View>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, index) => (
          <View key={index} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupItems}>
              {group.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* Advocate Access */}
        <View style={styles.advocateSection}>
          <Text style={styles.groupTitle}>Community Advocates</Text>
          <View style={styles.advocateCard}>
            <Ionicons name="people-outline" size={32} color={Colors.info} />
            <View style={styles.advocateContent}>
              <Text style={styles.advocateTitle}>Advocate Access</Text>
              <Text style={styles.advocateDescription}>
                Access management tools if you're a verified community advocate or NGO worker
              </Text>
              <SafeButton
                title="Advocate Login"
                onPress={handleAdvocateLogin}
                variant="outline"
                size="sm"
                style={styles.advocateButton}
                icon={<Ionicons name="log-in-outline" size={16} color={Colors.info} />}
              />
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoTitle}>MigrAid v1.0.0</Text>
          <Text style={styles.appInfoText}>
            Privacy-first resource navigator for immigrant communities
          </Text>
          <Text style={styles.appInfoText}>
            Made with ❤️ for safety and dignity
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
    padding: Spacing.base,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...CommonStyles.heading2,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...CommonStyles.body,
    color: Colors.textSecondary,
  },
  privacyStatus: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  privacyIcon: {
    marginRight: Spacing.base,
  },
  privacyInfo: {
    flex: 1,
  },
  privacyTitle: {
    ...CommonStyles.bodyLarge,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.xs,
  },
  privacyDescription: {
    ...CommonStyles.bodySmall,
    color: Colors.textSecondary,
  },
  settingsGroup: {
    marginBottom: Spacing.lg,
  },
  groupTitle: {
    ...CommonStyles.heading3,
    marginBottom: Spacing.base,
  },
  groupItems: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingIcon: {
    marginRight: Spacing.base,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...CommonStyles.body,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 2,
  },
  settingSubtitle: {
    ...CommonStyles.bodySmall,
    color: Colors.textSecondary,
  },
  settingAction: {
    marginLeft: Spacing.base,
  },
  advocateSection: {
    marginBottom: Spacing.lg,
  },
  advocateCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.infoBackground,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.info,
  },
  advocateContent: {
    flex: 1,
    marginLeft: Spacing.base,
  },
  advocateTitle: {
    ...CommonStyles.bodyLarge,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.info,
    marginBottom: Spacing.xs,
  },
  advocateDescription: {
    ...CommonStyles.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  },
  advocateButton: {
    alignSelf: 'flex-start',
    borderColor: Colors.info,
  },
  appInfo: {
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.base,
  },
  appInfoTitle: {
    ...CommonStyles.bodyLarge,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  appInfoText: {
    ...CommonStyles.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default ProfileScreen; 