import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.ts';

interface InitialPageProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function InitialPage({navigation: navigate}: InitialPageProps) {
  const handleLogin = () => {
    navigate.navigate('Login');
  };

  const handleRegister = () => {
    navigate.navigate('Register');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={require('../../assets/logo_round.png')} style={styles.imagem}/>
        </View>
        <Text style={styles.title}>Bem-vindo ao E-Agro!</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  imagem: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#696969',
  },
  button: {
    width: '80%',
    backgroundColor: '#008080',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
