import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router';
import Stars from '../../components/Stars.tsx';
import Products from '../Products';
import userProducts from '../../hooks/userProducts.ts';

type ProducerScreenRouteProp = RouteProp<RootStackParamList, 'Producer'>;
type ProducerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Producer'>;

interface ProducerProps {
  route: ProducerScreenRouteProp;
  navigation: ProducerScreenNavigationProp;
}

export default function Producer({route, navigation}: ProducerProps) {
  const {producerData} = route.params;
  const [title, products] = userProducts();

  function topList() {
    return (
      <View style={styles.container}>
        <Image source={producerData.image} style={styles.image}/>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{producerData.name}</Text>
          <Text> {producerData.description} </Text>
          <Text> CNPJ: {producerData.cnpj} </Text>
          <Stars
            quantity={producerData.stars}
          />
          <Text>Distance: {producerData.distance} m</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={producerData.products}
      renderItem={({item}) => {
        return <Products navigation={navigation} productData={item}/>
      }}
      keyExtractor={item => String(item.id)}
      ListHeaderComponent={topList}
    />
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
