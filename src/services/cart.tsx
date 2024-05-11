import Firestore from './firebase/Firestore.tsx';
import {ItemCart, ItemCartBody} from '../models/ItemCart.tsx';
import ProductService from './product.tsx';
import {QueryParams} from './firebase/models/query-params.tsx';

export default class CartService extends Firestore<ItemCart> {

  constructor() {
    super('cart');
  }

  async findAll(filters?: QueryParams): Promise<ItemCart[]> {
    const results = await super.findAll(filters) as ItemCartBody[];
    const items: ItemCart[] = [];
    for (const item of results) {
      const product = new ProductService()
      const resultProduct = await product.findId(item.product);
      if (!resultProduct) {
        continue;
      }
      const productMap: ItemCart = {
        id: item.id,
        user: item.user,
        product: resultProduct,
        quantity: item.quantity,
      }
      items.push(productMap);
    }
    return items;
  }

  async findId(id: string) {
    return await super.findId(id);
  }

  async addItemCard(item: ItemCartBody) {
    await super.add(item);
  }

  async deleteAll(data: ItemCart[]) {
    for (const item of data) {
      await super.delete(item.id);
    }
  }
}
