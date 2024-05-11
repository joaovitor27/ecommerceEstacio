import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import Stars from '../../Components/Stars.tsx';
import ProducerService from '../../services/producer.tsx';
import {ProducerData} from '../../models/ProducerData.tsx';
import Producer from '../Home/components/Producer.tsx';

interface ProductProps {
  route: RouteProp<RootStackParamList, 'Product'>;
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}

export default function Product({route, navigation}: ProductProps) {
  const [producer, setProducer] = useState<ProducerData>({
    id: '',
    name: '',
    description: '',
    image: '',
    stars: 0,
    distance: 0, cnpj: '', products: []
  });
  const {productData} = route.params;

  productData.stars = 4;

  useEffect(() => {
    const producer = new ProducerService();
    producer.findId(productData.producer.replace('producer/', '')).then((result) => {
      result.distance = 100;
      result.stars = 4;
      setProducer(result);
    });
  }, []);

  function getImage() {
    return productData.image ? {uri: productData.image} : require('../../assets/profile.png');
  }

  function topList() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={getImage()} style={styles.image}/>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{productData.name}</Text>
            <Stars
              quantity={productData.stars}
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descrição:</Text>
          <Text style={styles.description}>{productData.description}</Text>
        </View>
        <View>
          <Text style={styles.productsTitle}>Produtor:</Text>
          <Producer navigation={navigation} producerData={producer}/>
        </View>
      </View>
    );
  }

  return topList();
}

const styles = StyleSheet.create({
  distance: {
    color: '#696969',
  },
  price: {
    color: '#696969',
  },
  containerMain: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#696969',
  },
  descriptionContainer: {
    backgroundColor: '#008080', // Cor de fundo destacada
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  distanceAndCnpj: {
    color: '#696969',
  },
  description: {
    fontSize: 16,
    color: '#fff',
  },
  productsContainer: {
    backgroundColor: '#f9f9f9', // Cor de fundo destacada para produtos
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#696969',
  },
});
