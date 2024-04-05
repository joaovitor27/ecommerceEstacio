import {useEffect, useState} from 'react';
import {ProductData} from '../models/ProductData.tsx';
import ProductService from '../services/product.tsx';

export default function userProducts(): [string, ProductData[]] {
  const [title, setTitle] = useState<string>('');
  const [producers, setProducers] = useState<ProductData[]>([]);

  useEffect(() => {
    const productService = new ProductService()
    productService.findAll().then((result) => {
      setTitle('Produtos');
      setProducers(result);
    });

  }, []);

  return [title, producers];
}
