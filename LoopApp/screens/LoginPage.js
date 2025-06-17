import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function LoginPage({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/lines.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={40}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Text style={styles.title}>Log in to Loop</Text>
            <Text style={styles.subtitle}>
              Welcome back! Sign in using Google or insert your information below.
            </Text>
            <TouchableOpacity style={styles.googleButton}>
              <Image source={require('../assets/googleicon.png')} style={styles.googleIcon} />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#b0b0b0" />
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#b0b0b0" keyboardType="email-address" />
              <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#b0b0b0" secureTextEntry />
            </View>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.switchText}>Don't have an account? Create one</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 90,
  },
  title: {
    fontSize: 32,
    fontWeight: 'semibold',
    color: '#4a90e2',
    marginBottom: 12,
    marginTop: 18,
    textAlign: 'center',
  },
  subtitle: {
    color: '#555',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  googleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  googleIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  
  },
  inputContainer: {
    width: '100%',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    marginTop: 8,
  },
  loginText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  switchText: {
    color: '#4a90e2',
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
}); 