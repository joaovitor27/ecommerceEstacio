import {Item} from '../services/firebase/models/item.tsx';

export interface ProductData extends Item {
  name: string;
  image: string;
  distance: number;
  stars: number;
  description: string;
  price: number;
  producer: string;
  quantity: number;
  unidade_price: string;
}
