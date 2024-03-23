import React from 'react';
import Producers from './components/Producers.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.ts';

interface HomeProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Home({navigation}: HomeProps) {
  return (
    <>
      <Producers navigation={navigation}/>
    </>
  );
}
