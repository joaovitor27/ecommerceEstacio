import Firestore from './firebase/Firestore.tsx';

import {randomNumberGenerator} from '../mocks/producer.tsx';
import {ProductData} from '../models/ProductData.tsx';

export default class ProductService extends Firestore {

  constructor() {
    super('products');
  }

  async findAll(): Promise<ProductData[]> {
    return super.findAll().then((result) => {
      return result.map((pruduct) => ({
        id: pruduct.id,
        name: pruduct.name,
        image: require('../../src/assets/profile.png'),
        distance: randomNumberGenerator(1, 500),
        stars: randomNumberGenerator(1, 5),
        cnpj: pruduct.cnpj,
        description: pruduct.description,
        products: pruduct.products,
      }));
    });
  }

  async findId(id: string) {
    return super.findId(id);
  }
}
