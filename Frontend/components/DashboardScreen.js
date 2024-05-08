import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import ProjectManagementScreen from './ProjectManagementScreen';
import CoworkingSpaceScreen from './CoworkingSpaceScreen';

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          // Custom icons based on route name
          if (route.name === 'Project Management') {
            iconComponent = focused ? (
              <View style={[styles.customIcon, { backgroundColor: '#FF5733' }]}>
                <Text style={styles.iconText}>P</Text>
              </View>
            ) : (
              <View style={[styles.customIcon, { backgroundColor: '#333' }]}>
                <Text style={styles.iconText}>P</Text>
              </View>
            );
          } else if (route.name === 'Coworking Space') {
            iconComponent = focused ? (
              <View style={[styles.customIcon, { backgroundColor: '#FF5733' }]}>
                <Text style={styles.iconText}>C</Text>
              </View>
            ) : (
              <View style={[styles.customIcon, { backgroundColor: '#333' }]}>
                <Text style={styles.iconText}>C</Text>
              </View>
            );
          }

          return iconComponent;
        },
      })}
      tabBarOptions={{
        showLabel: false, // Hide labels
        style: {
          backgroundColor: '#FFFFFF',
          borderTopColor: 'transparent',
          elevation: 0,
          height: 60,
        },
      }}
    >
      <Tab.Screen name="Project Management" component={ProjectManagementScreen} />
      <Tab.Screen name="Coworking Space" component={CoworkingSpaceScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;