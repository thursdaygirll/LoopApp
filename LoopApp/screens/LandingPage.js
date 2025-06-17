import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/blobs.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Make your{"\n"}days better{"\n"}with our{"\n"}habit helper
          </Text>
          <Text style={styles.subtitle}>Developed to help and better.</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
  style={styles.loginButton}
  onPress={() => navigation.navigate('Login')}
>
  <Text style={styles.loginText}>Login</Text>
</TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
  <Text style={styles.createAccount}>Create an account</Text>
</TouchableOpacity>
          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.or}>or</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity style={styles.googleButton}>
            <Image source={require('../assets/googleicon.png')} style={styles.googleIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  textContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 58,
    fontWeight: 'semibold',
    color: '#fff',
    textAlign: 'left',
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
    marginBottom: 18,
    lineHeight: 74,
    letterSpacing: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  subtitle: {
    color: '#f5f5f5',
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 0,
    opacity: 0.9,
    fontWeight: '400',
  },
  actionContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 70,
    paddingVertical: 18,
    borderRadius: 20,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  loginText: { color: '#222', fontWeight: 'bold', fontSize: 22 },
  createAccount: {
    color: '#222',
    textDecorationLine: 'underline',
    marginBottom: 32,
    fontSize: 16,
    opacity: 0.6,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    width: '80%',
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 8,
    opacity: 0.2,
  },
  or: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.7,
  },
  googleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  googleIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});