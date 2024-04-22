import {ProductData} from './ProductData.tsx';

export interface ItemCart {
  id?: string;
  user: string;
  product: ProductData;
  quantity: number;
}

export interface ItemCartBody {
  id?: string;
  user: string;
  product: string;
  quantity: number;
}
