import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.ts';
import {Text} from 'react-native';

interface ProfileProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Profile({navigation}: ProfileProps) {
  return (
    <>
      <Text>Perfil</Text>
    </>
  );
}
