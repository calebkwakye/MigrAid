// Home Screen for MigrAid
// Privacy-first design with quick access to resources and safety features

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import components and services
import SafeButton from '../../components/common/SafeButton';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { strings, getString } from '../../constants/strings';
import { storageService } from '../../services/storage';
import { mockResources, RESOURCE_CATEGORIES } from '../../data/mockResources';
import { getActiveReports } from '../../data/mockIceReports';

const HomeScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [activeReports, setActiveReports] = useState(0);
  const [nearbyResources, setNearbyResources] = useState(0);

  useEffect(() => {
    loadUserPreferences();
    loadDashboardData();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const userLanguage = await storageService.getLanguage();
      const isAnonymous = await storageService.getAnonymousMode();
      
      setLanguage(userLanguage);
      setAnonymousMode(isAnonymous);
    } catch (error) {
      console.warn('Error loading user preferences:', error);
    }
  };

  const loadDashboardData = () => {
    // Load active ICE reports count
    const reports = getActiveReports();
    setActiveReports(reports.length);
    
    // Load nearby resources count (mock data for now)
    setNearbyResources(mockResources.length);
  };

  const navigateToResources = (category = null) => {
    navigation.navigate('Resources', {
      screen: 'ResourcesList',
      params: { category }
    });
  };

  const navigateToReports = () => {
    navigation.navigate('Reports', {
      screen: 'ReportsList'
    });
  };

  const showPrivacyInfo = () => {
    Alert.alert(
      getString('yourPrivacy', language),
      getString('dataProtection', language),
      [
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
  };

  const resourceCategories = [
    {
      key: RESOURCE_CATEGORIES.LEGAL,
      title: getString('legal', language),
      icon: 'scale-outline',
      color: Colors.primary,
    },
    {
      key: RESOURCE_CATEGORIES.HEALTHCARE,
      title: getString('healthcare', language),
      icon: 'medical-outline',
      color: Colors.secondary,
    },
    {
      key: RESOURCE_CATEGORIES.FOOD,
      title: getString('food', language),
      icon: 'restaurant-outline',
      color: Colors.warning,
    },
    {
      key: RESOURCE_CATEGORIES.SHELTER,
      title: getString('shelter', language),
      icon: 'home-outline',
      color: Colors.info,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Privacy Banner */}
        {anonymousMode && (
          <View style={styles.privacyBanner}>
            <Ionicons name="shield-checkmark" size={20} color={Colors.secure} />
            <Text style={styles.privacyText}>
              {getString('anonymousMode', language)}
            </Text>
            <SafeButton
              title="?"
              onPress={showPrivacyInfo}
              variant="outline"
              size="sm"
              style={styles.privacyButton}
            />
          </View>
        )}

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            {getString('welcome', language)}
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {getString('safetyFirst', language)}
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{nearbyResources}</Text>
            <Text style={styles.statLabel}>
              {getString('resources', language)}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: Colors.warning }]}>
              {activeReports}
            </Text>
            <Text style={styles.statLabel}>
              {getString('recentReports', language)}
            </Text>
          </View>
        </View>

        {/* Resource Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getString('findResources', language)}
          </Text>
          
          <View style={styles.categoriesGrid}>
            {resourceCategories.map((category) => (
              <SafeButton
                key={category.key}
                title={category.title}
                onPress={() => navigateToResources(category.key)}
                variant="outline"
                style={[styles.categoryButton, { borderColor: category.color }]}
                textStyle={{ color: category.color }}
                icon={
                  <Ionicons 
                    name={category.icon} 
                    size={24} 
                    color={category.color} 
                  />
                }
              />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <SafeButton
            title={getString('viewReports', language)}
            onPress={navigateToReports}
            variant="secondary"
            fullWidth
            icon={<Ionicons name="alert-circle-outline" size={20} color={Colors.background} />}
            style={styles.actionButton}
          />
          
          <SafeButton
            title={"🗺️ " + getString('map', language)}
            onPress={() => navigateToResources()}
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
        </View>

        {/* Safety Reminder */}
        <View style={styles.safetyReminder}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.safetyText}>
            {getString('noLocationTracking', language)} • {getString('encryptedReports', language)}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
    ...Shadows.sm,
  },
  privacyText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  privacyButton: {
    minWidth: 32,
    minHeight: 32,
  },
  welcomeSection: {
    marginBottom: Spacing.lg,
  },
  welcomeTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    minWidth: 100,
    ...Shadows.sm,
  },
  statNumber: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    marginBottom: Spacing.sm,
    flexDirection: 'column',
    height: 80,
  },
  actionButton: {
    marginBottom: Spacing.sm,
  },
  safetyReminder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.base,
  },
  safetyText: {
    marginLeft: Spacing.xs,
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen; 