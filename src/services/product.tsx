import Firestore from './firebase/Firestore.tsx';

import {randomNumberGenerator} from '../mocks/producer.tsx';
import {ProductData} from '../models/ProductData.tsx';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export default class ProductService extends Firestore {

  constructor() {
    super('products');
  }

  async findAll(filters?: FirebaseFirestoreTypes.QueryFilterConstraint | FirebaseFirestoreTypes.QueryCompositeFilterConstraint): Promise<ProductData[]> {
    return super.findAll(filters).then((result) => {
      return result.map((product) => ({
        id: product.id,
        name: product.name,
        image: require('../../src/assets/profile.png'),
        distance: randomNumberGenerator(1, 500),
        stars: randomNumberGenerator(1, 5),
        description: product.description,
        price: product.price,
        producer: product.producer,
        quantity: product.quantity,
        unidade_price: product.unidade_price,
      }));
    });
  }

  async findId(id: string): Promise<ProductData> {
    return super.findId(id).then((product) => {
      return ({
        id: product?.id,
        name: product?.name,
        image: require('../../src/assets/profile.png'),
        distance: randomNumberGenerator(1, 500),
        stars: randomNumberGenerator(1, 5),
        description: product?.description,
        price: product?.price,
        producer: product?.producer.path,
        quantity: product?.quantity,
        unidade_price: product?.unidade_price,
      });
    });
  }
}
