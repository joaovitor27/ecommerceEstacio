import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../routers/types-router.tsx';

interface AuthLoadingScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}


export function AuthLoadingScreen({navigation}: AuthLoadingScreenProps) {

  useEffect(() => {
    return auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Home'); // Redireciona para a tela principal se o usuário estiver logado
      } else {
        navigation.replace('InitialPage'); // Redireciona para a tela de login se o usuário não estiver logado
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
