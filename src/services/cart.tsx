import Firestore from './firebase/Firestore.tsx';
import {ItemCart, ItemCartBody} from '../models/ItemCart.tsx';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import ProductService from './product.tsx';
import {QueryParams} from './firebase/models/query-params.tsx';

export default class CartService extends Firestore<ItemCart> {

  constructor() {
    super('cart');
  }

  async findAll(filters?: QueryParams): Promise<ItemCart[]> {
    const results = await super.findAll(filters);
    const items: ItemCart[] = [];
    for (const item of results) {
      const product = new ProductService()
      const productPath = item.product as unknown as FirebaseFirestoreTypes.DocumentReference;
      item.product = await product.findId(productPath.id)
      items.push(item);
    }
    return items;
  }

  async findId(id: string) {
    return await super.findId(id);
  }

  async add(item: ItemCartBody) {
    await super.add(item);
  }
}
