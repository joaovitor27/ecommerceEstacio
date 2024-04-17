import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import {FlatList} from 'react-native';
import userProducts from '../../hooks/userProducts.tsx';
import ItemProduct from './Components/ItemProduct.tsx';
import Top from '../../Components/Top.tsx';

interface ProductsProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Products({navigation}: ProductsProps) {
  const [products] = userProducts();

  function topList() {
    return (
      <>
        <Top title={'Produtos'} subtitle={'Encontre os melhores produtos'}/>
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
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={topList()}
      />
    </>
  );
}
