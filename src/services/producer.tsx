import Firestore from './firebase/Firestore.tsx';
import {ProducerData} from '../models/ProducerData.tsx';
import {randomNumberGenerator} from '../mocks/producer.tsx';

export default class ProducerService extends Firestore {

  constructor() {
    super('producer');
  }

  async findAll(): Promise<ProducerData[]> {
    return super.findAll().then((result) => {
      return result.map((producer) => ({
        id: producer.id,
        name: producer.name,
        image: producer.image,
        distance: randomNumberGenerator(1, 500),
        stars: randomNumberGenerator(1, 5),
        cnpj: producer.cnpj,
        description: producer.description,
        products: producer.products,
      }));
    });
  }

  async findId(id: string) {
    return super.findId(id);
  }
}
