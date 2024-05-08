import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  // Sample notification data
  const notifications = [
    { id: 1, title: 'New Booking', message: 'You have a new booking for Meeting Room 1 on 04/15/2024.', timestamp: '12:30 PM' },
    { id: 2, title: 'Reminder', message: 'Don\'t forget about your upcoming meeting in Meeting Room 2 at 10:00 AM.', timestamp: '10:00 AM' },
    { id: 3, title: 'Feedback', message: 'Please provide feedback for your recent booking experience.', timestamp: 'Yesterday' },
  ];

  const handleNotificationPress = (notification) => {
    // Handle notification press
    console.log('Notification pressed:', notification);
  };

  const renderNotifications = () => {
    return notifications.map(notification => (
      <TouchableOpacity key={notification.id} onPress={() => handleNotificationPress(notification)}>
        <View style={styles.notificationItem}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
          </View>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#666" style={styles.icon} />
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profilePic}
          source={require('../assets/profile-pic.jpg')} // Change the path to your profile picture
        />
        <Text style={styles.title}>John Doe</Text>
        <Text style={styles.subtitle}>Project Manager</Text>
      </View>
      <ScrollView contentContainerStyle={styles.notificationsContainer}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {renderNotifications()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED', // Orange background color
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  notificationsContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF5733', // Orange section title color
  },
  notificationItem: {
    backgroundColor: '#FFECDC', // Light orange notification background color
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFCBB7', // Orange border color
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#FF5733', // Orange notification title color
  },
  notificationTimestamp: {
    fontSize: 14,
    color: '#666',
  },
  notificationMessage: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginLeft: 10,
  },
});

export default NotificationScreen;
