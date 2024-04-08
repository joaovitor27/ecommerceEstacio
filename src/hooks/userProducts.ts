import {useEffect, useState} from 'react';
import {ProductData} from '../models/ProductData.tsx';
import ProductService from '../services/product.tsx';


export default function userProducts(): [ProductData[]] {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const productService = new ProductService()
    productService.findAll().then((result) => {
      setProducts(result);
    });

  }, []);

  return [products];
}
