import {useEffect, useState} from 'react';
import {ProductData} from '../models/ProductData.tsx';
import ProductService from '../services/product.tsx';
import {Filter} from '@react-native-firebase/firestore';

export default function userProducts(productId: string): [string, ProductData[]] {
  const [title, setTitle] = useState<string>('');
  const [producers, setProducers] = useState<ProductData[]>([]);

  useEffect(() => {
    const productService = new ProductService()
    productService.findId(productId).then((result) => {
      setTitle('Produtos');
      setProducers(result);
    });

  }, []);

  return [title, producers];
}
