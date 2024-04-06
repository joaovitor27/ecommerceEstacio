import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router';
import Stars from '../../components/Stars.tsx';

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;
type ProductScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Product'>;

interface ProductProps {
  route: ProductScreenRouteProp;
  navigation: ProductScreenNavigationProp;
}

export default function Product({route, navigation}: ProductProps) {
  const {productData} = route.params;

  function getUnidatePrice() {
    return productData.unidade_price === 'KILO'? 'por kg' : 'unidade';
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{productData.name}</Text>
        <Text> {productData.description} </Text>
        <Text> Preço: {productData.price} {getUnidatePrice()}</Text>
        <Stars quantity={productData.stars}/>
        <Text>Distance: {productData.distance} m</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
