import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProjectManagementScreen from './components/ProjectManagementScreen';
import CoworkingSpaceScreen from './components/CoworkingSpaceScreen';
import NotificationScreen from './components/NotificationScreen';
import ProfileScreen from './components/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Project Management') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Coworking Space') {
              iconName = focused ? 'ios-business' : 'ios-business-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Project Management" component={ProjectManagementScreen} />
        <Tab.Screen name="Coworking Space" component={CoworkingSpaceScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;