// Resource Detail Screen for MigrAid
// Detailed view of a specific resource with contact and navigation options

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SafeButton from '../../components/common/SafeButton';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { getString } from '../../constants/strings';
import { storageService } from '../../services/storage';

const ResourceDetailScreen = ({ route }) => {
  const { resource } = route.params;
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const userLanguage = await storageService.getLanguage();
    setLanguage(userLanguage);
  };

  const handleCall = () => {
    if (resource.phone) {
      Linking.openURL(`tel:${resource.phone}`);
    }
  };

  const handleWebsite = () => {
    if (resource.website) {
      Linking.openURL(resource.website);
    }
  };

  const handleDirections = () => {
    if (resource.coordinates) {
      const url = `https://maps.apple.com/?daddr=${resource.coordinates.latitude},${resource.coordinates.longitude}`;
      Linking.openURL(url);
    } else if (resource.address) {
      const encodedAddress = encodeURIComponent(resource.address);
      const url = `https://maps.apple.com/?daddr=${encodedAddress}`;
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.resourceName}>{resource.name}</Text>
          {resource.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.verified} />
              <Text style={styles.verifiedText}>
                {getString('verified', language)}
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>{resource.description}</Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          {resource.address && (
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  {getString('address', language)}
                </Text>
                <Text style={styles.infoValue}>{resource.address}</Text>
              </View>
            </View>
          )}

          {resource.phone && (
            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  {getString('phone', language)}
                </Text>
                <Text style={styles.infoValue}>{resource.phone}</Text>
              </View>
            </View>
          )}

          {resource.website && (
            <View style={styles.infoRow}>
              <Ionicons name="globe" size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  {getString('website', language)}
                </Text>
                <Text style={styles.infoValue}>{resource.website}</Text>
              </View>
            </View>
          )}

          {resource.hours && (
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  {getString('hours', language)}
                </Text>
                <Text style={styles.infoValue}>{resource.hours}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Services */}
        {resource.services && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services Offered</Text>
            {resource.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Ionicons name="checkmark-circle-outline" size={16} color={Colors.secondary} />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {resource.languages && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages Supported</Text>
            <View style={styles.languagesContainer}>
              {resource.languages.map((lang, index) => (
                <View key={index} style={styles.languageTag}>
                  <Text style={styles.languageText}>{lang}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Requirements */}
        {resource.requirements && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <View style={styles.requirementsBox}>
              <Ionicons name="information-circle" size={20} color={Colors.info} />
              <Text style={styles.requirementsText}>{resource.requirements}</Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          {resource.phone && (
            <SafeButton
              title={getString('callNow', language)}
              onPress={handleCall}
              variant="primary"
              fullWidth
              icon={<Ionicons name="call" size={20} color={Colors.background} />}
              style={styles.actionButton}
            />
          )}

          <SafeButton
            title={getString('getDirections', language)}
            onPress={handleDirections}
            variant="secondary"
            fullWidth
            icon={<Ionicons name="navigate" size={20} color={Colors.background} />}
            style={styles.actionButton}
          />

          {resource.website && (
            <SafeButton
              title="Visit Website"
              onPress={handleWebsite}
              variant="outline"
              fullWidth
              icon={<Ionicons name="globe-outline" size={20} color={Colors.primary} />}
              style={styles.actionButton}
            />
          )}
        </View>

        {/* Emergency Contact */}
        {resource.emergencyContact && (
          <View style={styles.emergencySection}>
            <Text style={styles.emergencyTitle}>Emergency Contact</Text>
            <Text style={styles.emergencyNumber}>{resource.emergencyContact}</Text>
          </View>
        )}
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
  resourceName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.base,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.verified,
    marginLeft: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  description: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: Spacing.base,
  },
  infoContent: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  infoLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.text,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  serviceText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text,
    marginLeft: Spacing.xs,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  languageTag: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.base,
  },
  languageText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
  },
  requirementsBox: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.info,
  },
  requirementsText: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  actionsSection: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    marginBottom: Spacing.sm,
  },
  emergencySection: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    borderWidth: 2,
    borderColor: Colors.error,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.error,
    marginBottom: Spacing.xs,
  },
  emergencyNumber: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.error,
  },
});

export default ResourceDetailScreen; 