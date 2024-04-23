import React from 'react';
import Producers from './components/Producers.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import {getCurrentUser} from '../../services/firebase/Auth.tsx';

interface HomeProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Home({navigation}: HomeProps) {

  if (!getCurrentUser()) {
    navigation.navigate('Login');
  }
  
  return (
    <>
      <Producers navigation={navigation}/>
    </>
  );
}
