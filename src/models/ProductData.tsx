import {ImageSourcePropType} from 'react-native';

export interface ProductData {
  id: string;
  name: string;
  image: ImageSourcePropType;
  distance: number;
  stars: number;
  description: string;
  price: number;
  producer: string;
  quantity: number;
  unidade_price: string;
}
