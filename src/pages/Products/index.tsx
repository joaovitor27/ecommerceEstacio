import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.ts';
import {Text} from 'react-native';

interface ProductsProps {
  navigation: StackNavigationProp<RootStackParamList>;
  productData: any;
}

export default function Products({navigation, productData}: ProductsProps) {
  return (
    <>
      <Text>{productData}</Text>
    </>
  );
}
