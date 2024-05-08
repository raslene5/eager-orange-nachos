import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  const handleLogout = () => {
    // Add logout logic here
    alert('Logout functionality goes here');
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>john.doe@example.com</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>+1234567890</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.value}>New York, USA</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <Text style={styles.value}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel leo lacus. Nullam
          dignissim purus id eros consectetur, a vehicula tortor vehicula.
        </Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 20,
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
    color: '#333', // Add color for better contrast
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Add color for better contrast
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333', // Add color for better contrast
  },
  value: {
    flex: 1,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

