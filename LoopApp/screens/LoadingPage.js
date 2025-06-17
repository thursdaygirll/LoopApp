import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function LoadingPage({ navigation }) {
  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace('Landing');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/appbg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.logo}>Loop</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 40, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
});