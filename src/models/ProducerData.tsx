import {ProductData} from './ProductData.tsx';

export interface ProducerData {
  id: number;
  name: string;
  image: string;
  distance: number;
  stars: number;
  cnpj: string;
  description: string;
  products: ProductData[];
}
