import Firestore from './firebase/Firestore.tsx';
import {ProducerData} from '../models/ProducerData.tsx';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import ProductService from './product.tsx';
import {randomNumberGenerator} from '../mocks/producer.tsx';
import {QueryParams} from './firebase/models/query-params.tsx';

export default class ProducerService extends Firestore<ProducerData> {

  constructor() {
    super('producer');
  }

  async findAll(filters?: QueryParams): Promise<ProducerData[]> {
    const results = await super.findAll(filters);
    const producers: ProducerData[] = [];

    for (const producerData of results) {
      if (!producerData.products) {
        continue;
      }
      const productRefs = producerData.products as unknown as FirebaseFirestoreTypes.DocumentReference[];
      const products = productRefs?.map(async ref => {
        const product = new ProductService()
        return await product.findId(ref.id);
      });
      producerData.products = await Promise.all(products);
      producerData.distance = randomNumberGenerator(1, 500)
      producerData.stars = randomNumberGenerator(1, 5)
      producers.push(producerData);
    }
    return producers;
  }

  async findId(id: string) {
    const result = await super.findId(id);
    if (!result) {
      return null;
    }
    if (!result.products) {
      return result;
    }
    const productRefs = result.products as unknown as FirebaseFirestoreTypes.DocumentReference[];
    const products = productRefs?.map(async ref => {
      const product = new ProductService()
      return await product.findId(ref.id);
    });
    result.products = await Promise.all(products);

    return result;
  }
}
