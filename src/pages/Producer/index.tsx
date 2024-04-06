import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router';
import Stars from '../../components/Stars.tsx';
import ProductsToProducer from './Components/ProductsToProducer.tsx';

type ProducerScreenRouteProp = RouteProp<RootStackParamList, 'Producer'>;
type ProducerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Producer'>;

interface ProducerProps {
  route: ProducerScreenRouteProp;
  navigation: ProducerScreenNavigationProp;
}

export default function Producer({route, navigation}: ProducerProps) {
  const {producerData} = route.params;

  function formatCNPJ(cnpj: string) {
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12, 14)}`;
  }

  function topList() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={producerData.image} style={styles.image}/>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{producerData.name}</Text>
            <Text>Distance: {producerData.distance} m</Text>
            <Text>CNPJ: {formatCNPJ(producerData.cnpj)}</Text>
            <Stars
              quantity={producerData.stars}
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descrição:</Text>
          <Text style={styles.description}>{producerData.description}</Text>
        </View>
        <View>
          <Text style={styles.productsTitle}>Produtos:</Text>
          <FlatList
            data={producerData.products}
            renderItem={({item}) => {
              return <ProductsToProducer navigation={navigation} productData={item}/>
            }}
            keyExtractor={item => String(item.id)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.containerMain}>
      <FlatList
        ListHeaderComponent={topList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 40,
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
  },
  descriptionContainer: {
    backgroundColor: '#efeded', // Cor de fundo destacada
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
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
    marginBottom: 10,
  },
});
