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
  Linking,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import components and services
import SafeButton from '../../components/common/SafeButton';
import CustomInput from '../../components/common/CustomInput';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { strings, getString } from '../../constants/strings';
import { storageService } from '../../services/storage';
import { mockResources, RESOURCE_CATEGORIES, getCategoryStats, getResourcesByCategory } from '../../data/mockResources';
import { getActiveReports, getRecentReports, getCriticalReports } from '../../data/mockIceReports';

const HomeScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [activeReports, setActiveReports] = useState(0);
  const [criticalReports, setCriticalReports] = useState(0);
  const [recentReports, setRecentReports] = useState(0);
  const [categoryStats, setCategoryStats] = useState({});
  const [recentResources, setRecentResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
    try {
      // Load ICE reports data
      const activeReportsData = getActiveReports() || [];
      const criticalReportsData = getCriticalReports() || [];
      const recentReportsData = getRecentReports(24) || [];
      
      setActiveReports(activeReportsData.length);
      setCriticalReports(criticalReportsData.length);
      setRecentReports(recentReportsData.length);
      
      // Load resource category statistics
      const stats = getCategoryStats();
      setCategoryStats(stats || {});
      
      // Load recent/featured resources (top 3 from each category)
      const legal = getResourcesByCategory(RESOURCE_CATEGORIES.LEGAL).filter(r => r && r.name).slice(0, 2);
      const healthcare = getResourcesByCategory(RESOURCE_CATEGORIES.HEALTHCARE).filter(r => r && r.name).slice(0, 2);
      setRecentResources([...legal, ...healthcare]);
    } catch (error) {
      console.warn('Error loading dashboard data:', error);
      // Set safe defaults
      setActiveReports(0);
      setCriticalReports(0);
      setRecentReports(0);
      setCategoryStats({});
      setRecentResources([]);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Resources', {
        screen: 'ResourcesList',
        params: { searchQuery: searchQuery.trim() }
      });
      storageService.updateUsageAnalytics('resource_search');
    }
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

  const makeEmergencyCall = (number) => {
    Alert.alert(
      getString('emergencyCall', language) || 'Emergency Call',
      `${getString('calling', language) || 'Calling'} ${number}`,
      [
        {
          text: getString('cancel', language) || 'Cancel',
          style: 'cancel',
        },
        {
          text: getString('call', language) || 'Call',
          onPress: () => Linking.openURL(`tel:${number}`),
          style: 'default',
        },
      ]
    );
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
      count: categoryStats[RESOURCE_CATEGORIES.LEGAL] || 0,
    },
    {
      key: RESOURCE_CATEGORIES.HEALTHCARE,
      title: getString('healthcare', language),
      icon: 'medical-outline',
      color: Colors.secondary,
      count: categoryStats[RESOURCE_CATEGORIES.HEALTHCARE] || 0,
    },
    {
      key: RESOURCE_CATEGORIES.FOOD,
      title: getString('food', language),
      icon: 'restaurant-outline',
      color: Colors.warning,
      count: categoryStats[RESOURCE_CATEGORIES.FOOD] || 0,
    },
    {
      key: RESOURCE_CATEGORIES.SHELTER,
      title: getString('shelter', language),
      icon: 'home-outline',
      color: Colors.info,
      count: categoryStats[RESOURCE_CATEGORIES.SHELTER] || 0,
    },
  ];

  const emergencyContacts = [
    {
      name: 'Legal Aid Hotline',
      number: '1-800-520-2356',
      icon: 'call-outline',
      description: '24/7 Immigration Legal Support'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      icon: 'chatbubble-outline',
      description: 'Mental Health Crisis Support'
    },
    {
      name: '911 Emergency',
      number: '911',
      icon: 'warning-outline',
      description: 'Life-threatening emergencies only'
    }
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

        {/* Quick Search Bar */}
        <View style={styles.searchSection}>
          <CustomInput
            placeholder={getString('search', language) + ' ' + getString('resources', language)}
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon="search-outline"
            rightIcon={searchQuery.trim() ? "arrow-forward-outline" : null}
            onRightIconPress={searchQuery.trim() ? handleSearch : null}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            style={styles.searchInput}
          />
        </View>

        {/* ICE Activity Alerts */}
        {(criticalReports > 0 || recentReports > 0) && (
          <TouchableOpacity 
            style={styles.alertBanner}
            onPress={navigateToReports}
            activeOpacity={0.7}
          >
            <View style={styles.alertHeader}>
              <Ionicons 
                name="warning" 
                size={24} 
                color={criticalReports > 0 ? Colors.danger : Colors.warning} 
              />
              <Text style={[
                styles.alertTitle,
                { color: criticalReports > 0 ? Colors.danger : Colors.warning }
              ]}>
                {criticalReports > 0 
                  ? `${criticalReports} Critical ICE Alert${criticalReports > 1 ? 's' : ''}`
                  : `${recentReports} Recent Report${recentReports > 1 ? 's' : ''}`
                }
              </Text>
            </View>
            <Text style={styles.alertSubtitle}>
              {criticalReports > 0 
                ? 'Active ICE activity in your area'
                : 'Recent ICE activity reported'
              }
            </Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{Object.values(categoryStats).reduce((sum, count) => sum + count, 0)}</Text>
            <Text style={styles.statLabel}>
              {getString('resources', language)}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: activeReports > 0 ? Colors.warning : Colors.secondary }]}>
              {activeReports}
            </Text>
            <Text style={styles.statLabel}>
              {getString('recentReports', language) || 'Active Reports'}
            </Text>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Emergency Contacts
          </Text>
          <View style={styles.emergencyGrid}>
            {emergencyContacts.filter(contact => contact && contact.name && contact.number).map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.emergencyCard}
                onPress={() => makeEmergencyCall(contact.number)}
                activeOpacity={0.7}
              >
                <View style={styles.emergencyHeader}>
                  <Ionicons name={contact.icon || 'call-outline'} size={20} color={Colors.danger} />
                  <Text style={styles.emergencyName}>{contact.name}</Text>
                </View>
                <Text style={styles.emergencyNumber}>{contact.number}</Text>
                <Text style={styles.emergencyDescription}>{contact.description || ''}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Resource Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getString('findResources', language)}
          </Text>
          
          <View style={styles.categoriesGrid}>
            {resourceCategories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[styles.categoryCard, { borderColor: category.color }]}
                onPress={() => navigateToResources(category.key)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryHeader}>
                  <Ionicons 
                    name={category.icon} 
                    size={28} 
                    color={category.color} 
                  />
                  <View style={[styles.countBadge, { backgroundColor: category.color }]}>
                    <Text style={styles.countText}>{category.count}</Text>
                  </View>
                </View>
                <Text style={[styles.categoryTitle, { color: category.color }]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Resources */}
        {recentResources.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>
                Quick Access
              </Text>
              <TouchableOpacity onPress={() => navigateToResources()}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.recentResourcesContainer}>
              {recentResources.filter(resource => resource && resource.id && resource.name).map((resource) => (
                <TouchableOpacity
                  key={resource.id}
                  style={styles.resourceCard}
                  onPress={() => navigation.navigate('Resources', {
                    screen: 'ResourceDetail',
                    params: { resource: resource }
                  })}
                  activeOpacity={0.7}
                >
                  <View style={styles.resourceHeader}>
                    <Text style={styles.resourceName} numberOfLines={1}>
                      {resource.name}
                    </Text>
                    {resource.verified && (
                      <Ionicons name="checkmark-circle" size={16} color={Colors.secondary} />
                    )}
                  </View>
                  <Text style={styles.resourceCategory}>
                    {getString(resource.category, language)}
                  </Text>
                  <Text style={styles.resourceDescription} numberOfLines={2}>
                    {resource.description || 'No description available'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

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
            onPress={() => navigation.navigate('Resources', {
              screen: 'ResourcesMap'
            })}
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
  searchSection: {
    marginBottom: Spacing.lg,
  },
  searchInput: {
    marginBottom: 0,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dangerBackground,
    borderColor: Colors.danger,
    borderWidth: 1,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginBottom: Spacing.lg,
    minHeight: 60,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  alertSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.lg + 24, // Icon width + margin
    flex: 1,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  viewAllText: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  emergencyGrid: {
    gap: Spacing.sm,
  },
  emergencyCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.danger,
    ...Shadows.sm,
    minHeight: 80,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  emergencyName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  emergencyNumber: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger,
    marginBottom: Spacing.xs,
  },
  emergencyDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    minHeight: 100,
    ...Shadows.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  countBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  countText: {
    color: Colors.background,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  categoryTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    textAlign: 'center',
  },
  recentResourcesContainer: {
    gap: Spacing.sm,
  },
  resourceCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    ...Shadows.sm,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  resourceName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text,
    flex: 1,
  },
  resourceCategory: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },
  resourceDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.sm,
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