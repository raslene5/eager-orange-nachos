import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CoworkingSpaceScreen = () => {
  const navigation = useNavigation();
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', date: '', duration: '' });
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleSpaceSelection = (space) => {
    setSelectedSpace(space);
    setShowBookingForm(false); // Reset booking form state when space is selected
  };

  const handleBooking = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.date || !bookingDetails.duration) {
      Alert.alert('Please fill in all fields');
      return;
    }
    
    // Logic to send booking details to backend or perform booking action
    
    // For demo purposes, just navigating to NotificationScreen with booking details
    navigation.navigate('NotificationScreen', { bookingDetails });
    
    setBookingDetails({ name: '', email: '', date: '', duration: '' });
    setShowBookingForm(false); // Hide booking form after successful booking
    Alert.alert('Booking Successful', 'Your booking has been confirmed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coworking Space Booking</Text>
      <ScrollView contentContainerStyle={styles.spacesContainer}>
        {renderSpaces(meetingRooms, 'Meeting Rooms', selectedSpace, handleSpaceSelection)}
        {renderSpaces(sharedDeskAreas, 'Shared Desk Areas', selectedSpace, handleSpaceSelection)}
        {renderSpaces(privateOffices, 'Private Offices', selectedSpace, handleSpaceSelection)}
      </ScrollView>
      {selectedSpace && !showBookingForm && ( // Render booking button only if space is selected and booking form is not shown
        <Button
          title={`Book ${selectedSpace.name}`}
          onPress={() => setShowBookingForm(true)}
          color="#FF5733"
        />
      )}
      {selectedSpace && showBookingForm && ( // Render booking form only if space is selected and booking form should be shown
        <ScrollView style={styles.bookingFormContainer} contentContainerStyle={styles.bookingForm} scrollToOverflowEnabled={true}>
          <Text style={styles.bookingFormTitle}>Book {selectedSpace.name}</Text>
          <TextInput
            style={styles.input}
            value={bookingDetails.name}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, name: text })}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={bookingDetails.email}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, email: text })}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={bookingDetails.date}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, date: text })}
            placeholder="Date (MM/DD/YYYY)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={bookingDetails.duration}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, duration: text })}
            placeholder="Duration (hours)"
            keyboardType="numeric"
          />
          <Button title="Book Now" onPress={handleBooking} />
        </ScrollView>
      )}
    </View>
  );
};

const renderSpaces = (spaces, title, selectedSpace, handleSpaceSelection) => (
  <>
    <Text style={styles.sectionTitle}>{title}</Text>
    {spaces.map((space) => (
      <TouchableOpacity
        key={space.id}
        style={[styles.spaceItem, selectedSpace && selectedSpace.id === space.id && styles.selectedSpace]}
        onPress={() => handleSpaceSelection(space)}
      >
        <Text style={styles.spaceName}>{space.name}</Text>
        <Text style={styles.spaceCapacity}>Capacity: {space.capacity} people</Text>
      </TouchableOpacity>
    ))}
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  spacesContainer: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spaceItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  selectedSpace: {
    borderColor: '#FF5733',
  },
  spaceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  spaceCapacity: {
    fontSize: 16,
  },
  bookingFormContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bookingForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 20,
  },
  bookingFormTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

// Sample data for coworking spaces
const meetingRooms = [
  { id: 1, name: 'Meeting Room 1', capacity: 6 },
  { id: 2, name: 'Meeting Room 2', capacity: 8 },
];
const sharedDeskAreas = [
  { id: 3, name: 'Shared Desk Area 1', capacity: 10 },
  { id: 4, name: 'Shared Desk Area 2', capacity: 12 },
];
const privateOffices = [
  { id: 5, name: 'Private Office 1', capacity: 4 },
  { id: 6, name: 'Private Office 2', capacity: 6 },
];

export default CoworkingSpaceScreen;