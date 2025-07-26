// ICE Reports Screen for MigrAid
// Anonymous community safety reporting system

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SafeButton from '../../components/common/SafeButton';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { getString } from '../../constants/strings';
import { mockIceReports, getActiveReports, getRecentReports } from '../../data/mockIceReports';
import { storageService } from '../../services/storage';

const IceReportsScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [reports, setReports] = useState(mockIceReports);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadLanguage();
    filterReports();
  }, [activeFilter]);

  const loadLanguage = async () => {
    const userLanguage = await storageService.getLanguage();
    setLanguage(userLanguage);
  };

  const filterReports = () => {
    switch (activeFilter) {
      case 'active':
        setReports(getActiveReports());
        break;
      case 'recent':
        setReports(getRecentReports(24));
        break;
      default:
        setReports(mockIceReports);
    }
  };

  const handleReportPress = (report) => {
    navigation.navigate('ReportDetail', { report });
  };

  const handleCreateReport = () => {
    navigation.navigate('CreateReport');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return Colors.warning;
      case 'resolved':
        return Colors.success;
      case 'unverified':
        return Colors.textLight;
      default:
        return Colors.textSecondary;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than 1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  const renderReportItem = ({ item }) => (
    <TouchableOpacity
      style={styles.reportCard}
      onPress={() => handleReportPress(item)}
      accessibilityRole="button"
      accessibilityLabel={`ICE report: ${item.type}, ${item.status}`}
    >
      <View style={styles.reportHeader}>
        <View style={styles.reportTypeContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={styles.reportType}>{item.type.replace('_', ' ').toUpperCase()}</Text>
        </View>
        <Text style={styles.reportTime}>{getTimeAgo(item.timestamp)}</Text>
      </View>

      <Text style={styles.reportLocation}>
        📍 {item.location.address}
      </Text>

      <Text style={styles.reportDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.reportFooter}>
        <View style={styles.verificationContainer}>
          <Ionicons name="people-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.verificationText}>
            {item.verificationCount} verification{item.verificationCount !== 1 ? 's' : ''}
          </Text>
        </View>
        
        {item.isActive && (
          <View style={styles.activeIndicator}>
            <Text style={styles.activeText}>ACTIVE</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with filters */}
      <View style={styles.header}>
        <View style={styles.filterContainer}>
          <SafeButton
            title="All"
            onPress={() => setActiveFilter('all')}
            variant={activeFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            style={styles.filterButton}
          />
          <SafeButton
            title="Active"
            onPress={() => setActiveFilter('active')}
            variant={activeFilter === 'active' ? 'primary' : 'outline'}
            size="sm"
            style={styles.filterButton}
          />
          <SafeButton
            title="Recent"
            onPress={() => setActiveFilter('recent')}
            variant={activeFilter === 'recent' ? 'primary' : 'outline'}
            size="sm"
            style={styles.filterButton}
          />
        </View>

        <SafeButton
          title="+ Report Activity"
          onPress={handleCreateReport}
          variant="secondary"
          size="sm"
          style={styles.createButton}
        />
      </View>

      {/* Reports List */}
      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reportsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="shield-checkmark-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyStateText}>
              No reports found for this filter
            </Text>
          </View>
        }
      />

      {/* Safety Notice */}
      <View style={styles.safetyNotice}>
        <Ionicons name="shield-checkmark" size={16} color={Colors.secure} />
        <Text style={styles.safetyText}>
          All reports are anonymous and location data is protected
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  filterButton: {
    marginRight: Spacing.sm,
  },
  createButton: {
    alignSelf: 'flex-start',
  },
  reportsList: {
    padding: Spacing.base,
  },
  reportCard: {
    backgroundColor: Colors.background,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reportTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  reportType: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  reportTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  reportLocation: {
    fontSize: Typography.fontSize.base,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  reportDescription: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
    marginBottom: Spacing.sm,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  activeIndicator: {
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  activeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.background,
    fontWeight: Typography.fontWeight.bold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyStateText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.base,
  },
  safetyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  safetyText: {
    marginLeft: Spacing.xs,
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default IceReportsScreen; 