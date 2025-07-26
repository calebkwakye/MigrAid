// Privacy-First Storage Service for MigrAid
// Handles local storage with privacy and security considerations

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys - prefixed for organization
const STORAGE_KEYS = {
  // User preferences (non-sensitive)
  LANGUAGE: '@migraid:language',
  THEME: '@migraid:theme',
  ANONYMOUS_MODE: '@migraid:anonymousMode',
  ONBOARDING_COMPLETE: '@migraid:onboardingComplete',
  
  // App settings
  LOCATION_PERMISSIONS: '@migraid:locationPermissions',
  NOTIFICATION_SETTINGS: '@migraid:notificationSettings',
  
  // Cached data (temporary)
  CACHED_RESOURCES: '@migraid:cachedResources',
  LAST_CACHE_UPDATE: '@migraid:lastCacheUpdate',
  
  // Anonymous usage data (for app improvement)
  USAGE_ANALYTICS: '@migraid:usageAnalytics',
};

class StorageService {
  
  // Generic storage methods
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.warn('Storage setItem error:', error);
      return false;
    }
  }

  async getItem(key, defaultValue = null) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (error) {
      console.warn('Storage getItem error:', error);
      return defaultValue;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Storage removeItem error:', error);
      return false;
    }
  }

  async clearAll() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.warn('Storage clearAll error:', error);
      return false;
    }
  }

  // User Preferences
  async setLanguage(languageCode) {
    return this.setItem(STORAGE_KEYS.LANGUAGE, languageCode);
  }

  async getLanguage() {
    return this.getItem(STORAGE_KEYS.LANGUAGE, 'en');
  }

  async setAnonymousMode(enabled) {
    return this.setItem(STORAGE_KEYS.ANONYMOUS_MODE, enabled);
  }

  async getAnonymousMode() {
    return this.getItem(STORAGE_KEYS.ANONYMOUS_MODE, true); // Default to anonymous
  }

  async setOnboardingComplete(completed) {
    return this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, completed);
  }

  async getOnboardingComplete() {
    return this.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
  }

  async setTheme(theme) {
    return this.setItem(STORAGE_KEYS.THEME, theme);
  }

  async getTheme() {
    return this.getItem(STORAGE_KEYS.THEME, 'light');
  }

  // App Settings
  async setLocationPermissions(permissions) {
    return this.setItem(STORAGE_KEYS.LOCATION_PERMISSIONS, permissions);
  }

  async getLocationPermissions() {
    return this.getItem(STORAGE_KEYS.LOCATION_PERMISSIONS, {
      granted: false,
      timestamp: null
    });
  }

  async setNotificationSettings(settings) {
    return this.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, settings);
  }

  async getNotificationSettings() {
    return this.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, {
      iceAlerts: false,
      resourceUpdates: false,
      communityReports: false
    });
  }

  // Cached Data Management
  async cacheResources(resources) {
    const success = await this.setItem(STORAGE_KEYS.CACHED_RESOURCES, resources);
    if (success) {
      await this.setItem(STORAGE_KEYS.LAST_CACHE_UPDATE, Date.now());
    }
    return success;
  }

  async getCachedResources() {
    return this.getItem(STORAGE_KEYS.CACHED_RESOURCES, []);
  }

  async getLastCacheUpdate() {
    return this.getItem(STORAGE_KEYS.LAST_CACHE_UPDATE, 0);
  }

  async isCacheExpired(maxAgeHours = 24) {
    const lastUpdate = await this.getLastCacheUpdate();
    const maxAge = maxAgeHours * 60 * 60 * 1000; // Convert to milliseconds
    return (Date.now() - lastUpdate) > maxAge;
  }

  async clearCache() {
    await this.removeItem(STORAGE_KEYS.CACHED_RESOURCES);
    await this.removeItem(STORAGE_KEYS.LAST_CACHE_UPDATE);
  }

  // Anonymous Usage Analytics (Privacy-Safe)
  async updateUsageAnalytics(action) {
    if (await this.getAnonymousMode()) {
      // Only collect basic, anonymous usage patterns to improve app
      const analytics = await this.getItem(STORAGE_KEYS.USAGE_ANALYTICS, {
        resourceSearches: 0,
        mapViews: 0,
        reportViews: 0,
        languageChanges: 0,
        lastActive: null
      });

      switch (action) {
        case 'resource_search':
          analytics.resourceSearches++;
          break;
        case 'map_view':
          analytics.mapViews++;
          break;
        case 'report_view':
          analytics.reportViews++;
          break;
        case 'language_change':
          analytics.languageChanges++;
          break;
      }

      analytics.lastActive = Date.now();
      return this.setItem(STORAGE_KEYS.USAGE_ANALYTICS, analytics);
    }
    return false;
  }

  async getUsageAnalytics() {
    return this.getItem(STORAGE_KEYS.USAGE_ANALYTICS, null);
  }

  // Privacy and Security Methods
  async clearSensitiveData() {
    // Remove any potentially sensitive cached data
    await this.clearCache();
    
    // Keep language and theme preferences but remove usage data
    await this.removeItem(STORAGE_KEYS.USAGE_ANALYTICS);
    
    return true;
  }

  async exportUserData() {
    // Export all user data for transparency (GDPR-like)
    const userData = {};
    
    for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
      userData[key] = await this.getItem(storageKey);
    }
    
    return userData;
  }

  async deleteAllUserData() {
    // Complete data deletion for privacy
    for (const storageKey of Object.values(STORAGE_KEYS)) {
      await this.removeItem(storageKey);
    }
    return true;
  }

  // Utility Methods
  async getStorageSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const migraidKeys = keys.filter(key => key.startsWith('@migraid:'));
      
      let totalSize = 0;
      for (const key of migraidKeys) {
        const value = await AsyncStorage.getItem(key);
        totalSize += value ? value.length : 0;
      }
      
      return {
        keys: migraidKeys.length,
        sizeBytes: totalSize,
        sizeKB: (totalSize / 1024).toFixed(2)
      };
    } catch (error) {
      console.warn('Storage size calculation error:', error);
      return { keys: 0, sizeBytes: 0, sizeKB: '0.00' };
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
export default storageService; 