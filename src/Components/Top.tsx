import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface TopProps {
  title: string;
  subtitle: string;
}

export default function Top({title, subtitle}: TopProps) {
  return (
    <View style={styles.top}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo_tomato.png')}
          style={styles.imagem}
        />
        <Text style={styles.nameApp}>E-Agro!</Text>
      </View>
      <Text style={styles.welcome}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#008080',
    padding: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem: {
    width: 50,
    height: 50,
  },
  welcome: {
    marginTop: 24,
    fontSize: 26,
    lineHeight: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 26,
    color: '#d0cdcd',
  },
  nameApp: {
    fontSize: 20,
    lineHeight: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  }
});
