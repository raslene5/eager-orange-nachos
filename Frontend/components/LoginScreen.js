import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    // Your login logic here
    if (
      (email === 'projectmanager@example.com' && password === 'projectmanagerpassword') ||
      (email === 'odcmember@example.com' && password === 'odcmemberpassword') ||
      (email === 'itmember@example.com' && password === 'itmemberpassword')
    ) {
      setIsLoggedIn(true);
      // Navigate to dashboard on successful login
      navigation.navigate('Dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Let's Sign in</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title={isLoggedIn ? "Logged in" : "Sign In"} onPress={isLoggedIn ? null : handleLogin} disabled={isLoggedIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  header: {
    backgroundColor: '#FF5733',
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;