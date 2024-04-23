import Firestore from './firebase/Firestore.tsx';

import {ProductData} from '../models/ProductData.tsx';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {QueryParams} from './firebase/models/query-params.tsx';

export default class ProductService extends Firestore<ProductData> {

  constructor() {
    super('products');
  }

  async findAll(filters?: QueryParams) {
    const results = await super.findAll(filters) as ProductData[];
    const products: ProductData[] = [];
    for (const productData of results) {
      const producerRef = productData.producer as unknown as FirebaseFirestoreTypes.DocumentReference;
      productData.producer = producerRef?.path;
      products.push(productData);
    }
    return products;
  }

  async findId(id: string) {
    const result = await super.findId(id);
    if (!result) {
      return null;
    }
    const producerRef = result.producer as unknown as FirebaseFirestoreTypes.DocumentReference;
    result.producer = producerRef?.path;
    return result;
  }
}
