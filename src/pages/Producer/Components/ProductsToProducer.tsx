import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../routers/types-router.ts';
import {Text, TouchableOpacity} from 'react-native';
import {ProductData} from '../../../models/ProductData.tsx';
import ProductService from '../../../services/product.tsx';

interface ProductsToProducerProps {
  navigation: StackNavigationProp<RootStackParamList>;
  productData: ProductData;
}

export default function ProductsToProducer({navigation, productData}: ProductsToProducerProps) {
  const [product, setProduct] = useState<ProductData>();
  
  useEffect(() => {
    const productService = new ProductService()
    productService.findId(productData.id).then((result) => {
      setProduct(result);
    });
    
  }, []);
  
  return (
    <>
        <Text>{product?.name}</Text>
        <Text>{product?.description}</Text>
        <Text>{product?.price}</Text>
        <Text>{product?.producer}</Text>
        <Text>{product?.quantity}</Text>
        <Text>{product?.unidade_price}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Product', {productData: product})}>
          <Text>Ver detalhes</Text>
        </TouchableOpacity>

    </>
  );
}
