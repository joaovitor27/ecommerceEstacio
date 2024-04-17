import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import {Text} from 'react-native';

interface ShoppingCartProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function ShoppingCart({navigation}: ShoppingCartProps) {
  return (
    <>
      <Text>Carrinho</Text>
    </>
  );
}
