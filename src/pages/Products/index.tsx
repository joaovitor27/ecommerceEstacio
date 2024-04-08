import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.ts';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import userProducts from '../../hooks/userProducts.ts';
import ItemProduct from './Components/ItemProduct.tsx';

interface ProductsProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Products({navigation}: ProductsProps) {
  const [products] = userProducts();

  function topList() {
    return (
      <>
        <View style={styles.top}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.imagem}
          />
          <Text style={styles.welcome}>Produtos</Text>
          <Text style={styles.subtitle}>Encontre os melhores produtores</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <FlatList
        data={products}
        renderItem={({item}) => {
          return <ItemProduct navigation={navigation} productData={item}/>
        }}
        keyExtractor={item => String(item.image)}
        ListHeaderComponent={topList()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
  imagem: {
    width: 70,
    height: 28,
  },
  welcome: {
    marginTop: 24,
    fontSize: 26,
    lineHeight: 42,
    fontWeight: 'bold',
    color: '#464646',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 26,
    color: '#A3A3A3',
  },
});

