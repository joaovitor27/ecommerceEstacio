import Firestore from './firebase/Firestore.tsx';
import {QueryParams} from './firebase/models/query-params.tsx';
import {Buy, BuyBody} from '../models/Buy.tsx';
import ProductService from './product.tsx';


export default class BuyService extends Firestore<Buy> {

  constructor() {
    super('buys');
  }

  async findAll(filters?: QueryParams): Promise<Buy[]> {
    const result = await super.findAll(filters) as Buy[];
    const items: Buy[] = [];
    for (const buy of result) {
      for (const itemCart of buy.products) {
        const productMap = new ProductService()
        const resultProduct = await productMap.findId(itemCart.product as unknown as string);
        if (!productMap) {
          continue;
        }
        itemCart.product = resultProduct;
      }
      items.push(buy);
    }
    return items;
  }

  async findId(id: string) {
    return await super.findId(id);
  }

  async addBuy(buy: BuyBody) {
    await super.add(buy);
  }

}
