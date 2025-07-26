// Resources Screen for MigrAid
// Browse and search immigrant resources by category

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
import { mockResources, RESOURCE_CATEGORIES, getResourcesByCategory } from '../../data/mockResources';
import { storageService } from '../../services/storage';

const ResourcesScreen = ({ navigation, route }) => {
  const [language, setLanguage] = useState('en');
  const [resources, setResources] = useState(mockResources);
  const [selectedCategory, setSelectedCategory] = useState(route.params?.category || null);

  useEffect(() => {
    loadLanguage();
    filterResources();
  }, [selectedCategory]);

  const loadLanguage = async () => {
    const userLanguage = await storageService.getLanguage();
    setLanguage(userLanguage);
  };

  const filterResources = () => {
    if (selectedCategory) {
      setResources(getResourcesByCategory(selectedCategory));
    } else {
      setResources(mockResources);
    }
  };

  const categories = [
    { key: null, title: 'All', icon: 'apps-outline' },
    { key: RESOURCE_CATEGORIES.LEGAL, title: getString('legal', language), icon: 'scale-outline' },
    { key: RESOURCE_CATEGORIES.HEALTHCARE, title: getString('healthcare', language), icon: 'medical-outline' },
    { key: RESOURCE_CATEGORIES.FOOD, title: getString('food', language), icon: 'restaurant-outline' },
    { key: RESOURCE_CATEGORIES.SHELTER, title: getString('shelter', language), icon: 'home-outline' },
  ];

  const handleResourcePress = (resource) => {
    navigation.navigate('ResourceDetail', { resource });
  };

  const renderResourceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resourceCard}
      onPress={() => handleResourcePress(item)}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.category} resource`}
    >
      <View style={styles.resourceHeader}>
        <Text style={styles.resourceName}>{item.name}</Text>
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.verified} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.resourceDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.resourceFooter}>
        <View style={styles.resourceInfo}>
          <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.resourceAddress} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        
        {item.phone && (
          <View style={styles.resourceInfo}>
            <Ionicons name="call-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.resourcePhone}>{item.phone}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCategoryFilter = ({ item }) => (
    <SafeButton
      title={item.title}
      onPress={() => setSelectedCategory(item.key)}
      variant={selectedCategory === item.key ? 'primary' : 'outline'}
      size="sm"
      icon={<Ionicons name={item.icon} size={16} color={
        selectedCategory === item.key ? Colors.background : Colors.primary
      } />}
      style={styles.categoryButton}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryFilter}
          keyExtractor={(item) => item.key || 'all'}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      {/* Resources List */}
      <FlatList
        data={resources}
        renderItem={renderResourceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resourcesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyStateText}>
              No resources found for this category
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filtersContainer: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filtersList: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  categoryButton: {
    marginRight: Spacing.sm,
  },
  resourcesList: {
    padding: Spacing.base,
  },
  resourceCard: {
    backgroundColor: Colors.background,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  resourceName: {
    flex: 1,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  verifiedText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.verified,
    marginLeft: 2,
  },
  resourceDescription: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
    marginBottom: Spacing.sm,
  },
  resourceFooter: {
    gap: Spacing.xs,
  },
  resourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceAddress: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
    flex: 1,
  },
  resourcePhone: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
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
});

export default ResourcesScreen; 