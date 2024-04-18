import {ProductData} from './ProductData.tsx';
import {Item} from '../services/firebase/models/item.tsx';

export interface ProducerData extends Item {
  name: string;
  image: string;
  distance: number;
  stars: number;
  cnpj: string;
  description: string;
  products: (ProductData | null)[]
}
