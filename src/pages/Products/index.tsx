import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.ts';
import {Text} from 'react-native';

interface ProductsProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Products({navigation}: ProductsProps) {
  return (
    <>
      <Text>Produtos</Text>
    </>
  );
}
