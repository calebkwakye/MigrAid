// Main App Navigator for MigrAid
// Privacy-first navigation with accessibility features

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens (will be created next)
import HomeScreen from '../screens/home/HomeScreen';
import ResourcesScreen from '../screens/resources/ResourcesScreen';
import ResourceDetailScreen from '../screens/resources/ResourceDetailScreen';
import IceReportsScreen from '../screens/ice-reports/IceReportsScreen';
import ReportDetailScreen from '../screens/ice-reports/ReportDetailScreen';
import CreateReportScreen from '../screens/ice-reports/CreateReportScreen';
import AdvocateScreen from '../screens/advocate/AdvocateScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

// Import theme
import { Colors } from '../constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{ 
          title: 'MigrAid',
          headerStyle: {
            backgroundColor: Colors.primary,
          }
        }}
      />
    </Stack.Navigator>
  );
};

const ResourcesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ResourcesList" 
        component={ResourcesScreen}
        options={{ title: 'Resources' }}
      />
      <Stack.Screen 
        name="ResourceDetail" 
        component={ResourceDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.resource?.name || 'Resource Details' 
        })}
      />
    </Stack.Navigator>
  );
};

const IceReportsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ReportsList" 
        component={IceReportsScreen}
        options={{ title: 'Community Reports' }}
      />
      <Stack.Screen 
        name="ReportDetail" 
        component={ReportDetailScreen}
        options={{ title: 'Report Details' }}
      />
      <Stack.Screen 
        name="CreateReport" 
        component={CreateReportScreen}
        options={{ 
          title: 'Report Activity',
          presentation: 'modal' // Make it feel like a modal
        }}
      />
    </Stack.Navigator>
  );
};

const AdvocateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="AdvocateMain" 
        component={AdvocateScreen}
        options={{ title: 'Advocate Dashboard' }}
      />
    </Stack.Navigator>
  );
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Resources') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'alert-circle' : 'alert-circle-outline';
          } else if (route.name === 'Advocate') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false, // We handle headers in individual stack navigators
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Home tab, find resources and view recent reports'
        }}
      />
      <Tab.Screen 
        name="Resources" 
        component={ResourcesStack}
        options={{
          tabBarLabel: 'Resources',
          tabBarAccessibilityLabel: 'Resources tab, browse legal aid, healthcare, and support services'
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={IceReportsStack}
        options={{
          tabBarLabel: 'Reports',
          tabBarAccessibilityLabel: 'Community reports tab, view and report ICE activity'
        }}
      />
      <Tab.Screen 
        name="Advocate" 
        component={AdvocateStack}
        options={{
          tabBarLabel: 'Advocate',
          tabBarAccessibilityLabel: 'Advocate dashboard for community workers'
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator with onboarding
const RootStack = createStackNavigator();

const AppNavigator = ({ isOnboardingComplete = false }) => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Disable swipe gestures for security
        }}
      >
        {!isOnboardingComplete ? (
          <RootStack.Screen 
            name="Onboarding" 
            component={OnboardingScreen}
            options={{
              animationTypeForReplace: 'pop', // Smooth transition
            }}
          />
        ) : (
          <RootStack.Screen 
            name="Main" 
            component={TabNavigator}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 