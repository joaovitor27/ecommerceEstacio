import {ImageSourcePropType} from 'react-native';

export interface ProductData {
  id: number;
  name: string;
  image: ImageSourcePropType;
  distance: number;
  stars: number;
  cnpj: string;
  description: string;
  products: any[];
}
