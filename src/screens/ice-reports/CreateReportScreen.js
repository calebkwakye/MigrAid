// Create Report Screen for MigrAid
// Anonymous ICE activity reporting form

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SafeButton from '../../components/common/SafeButton';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { getString } from '../../constants/strings';
import { REPORT_TYPES } from '../../data/mockIceReports';
import { storageService } from '../../services/storage';

const CreateReportScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [reportType, setReportType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const userLanguage = await storageService.getLanguage();
    setLanguage(userLanguage);
  };

  const reportTypes = [
    { key: REPORT_TYPES.ICE_ACTIVITY, title: 'ICE Activity', icon: 'shield-outline' },
    { key: REPORT_TYPES.CHECKPOINT, title: 'Checkpoint', icon: 'car-outline' },
    { key: REPORT_TYPES.SURVEILLANCE, title: 'Surveillance', icon: 'eye-outline' },
    { key: REPORT_TYPES.RAID, title: 'Raid', icon: 'warning-outline' },
    { key: REPORT_TYPES.ARREST, title: 'Arrest', icon: 'alert-circle-outline' },
  ];

  const handleSubmit = async () => {
    if (!reportType || !location || !description.trim()) {
      Alert.alert(
        'Incomplete Report',
        'Please fill in all required fields.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Report Submitted',
        'Your anonymous report has been submitted to the community. Thank you for helping keep everyone safe.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Submission Error',
        'There was an error submitting your report. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTypeButton = (type) => (
    <SafeButton
      key={type.key}
      title={type.title}
      onPress={() => setReportType(type.key)}
      variant={reportType === type.key ? 'primary' : 'outline'}
      icon={<Ionicons name={type.icon} size={20} color={
        reportType === type.key ? Colors.background : Colors.primary
      } />}
      style={styles.typeButton}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Report ICE Activity</Text>
          <Text style={styles.subtitle}>
            Your report will be completely anonymous and help keep the community safe.
          </Text>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Ionicons name="shield-checkmark" size={24} color={Colors.secure} />
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Your Privacy is Protected</Text>
            <Text style={styles.privacyText}>
              • No personal information collected{'\n'}
              • Location data is anonymized{'\n'}
              • Report is completely anonymous
            </Text>
          </View>
        </View>

        {/* Report Type Selection */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Type of Activity *</Text>
          <View style={styles.typeGrid}>
            {reportTypes.map(renderTypeButton)}
          </View>
        </View>

        {/* Location Input */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Location *</Text>
          <Text style={styles.fieldHint}>
            General area only (e.g., "Near Downtown Station", "Main Street area")
          </Text>
          <TextInput
            style={styles.textInput}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter general location..."
            placeholderTextColor={Colors.textLight}
            multiline={false}
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Description *</Text>
          <Text style={styles.fieldHint}>
            Describe what you observed. Include time of day, number of vehicles/agents, etc.
          </Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the activity you observed..."
            placeholderTextColor={Colors.textLight}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Guidelines */}
        <View style={styles.guidelines}>
          <Text style={styles.guidelinesTitle}>Reporting Guidelines</Text>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>•</Text>
            <Text style={styles.guidelineText}>Only report what you directly observed</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>•</Text>
            <Text style={styles.guidelineText}>Avoid specific addresses for privacy</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>•</Text>
            <Text style={styles.guidelineText}>Include approximate time and duration</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>•</Text>
            <Text style={styles.guidelineText}>Be factual and specific</Text>
          </View>
        </View>

        {/* Submit Button */}
        <SafeButton
          title={isSubmitting ? 'Submitting...' : 'Submit Anonymous Report'}
          onPress={handleSubmit}
          variant="secondary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={!reportType || !location || !description.trim()}
          style={styles.submitButton}
        />

        {/* Cancel Button */}
        <SafeButton
          title="Cancel"
          onPress={() => navigation.goBack()}
          variant="outline"
          fullWidth
          disabled={isSubmitting}
          style={styles.cancelButton}
        />
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
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  privacyNotice: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secure,
  },
  privacyContent: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  privacyTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.secure,
    marginBottom: Spacing.xs,
  },
  privacyText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.sm,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  fieldHint: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  typeButton: {
    marginBottom: Spacing.sm,
    minWidth: '45%',
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    fontSize: Typography.fontSize.base,
    color: Colors.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  guidelines: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.lg,
  },
  guidelinesTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  guidelineItem: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  guidelineBullet: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary,
    marginRight: Spacing.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  guidelineText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  submitButton: {
    marginBottom: Spacing.base,
  },
  cancelButton: {
    marginBottom: Spacing.lg,
  },
});

export default CreateReportScreen; 