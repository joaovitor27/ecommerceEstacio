import {ImageSourcePropType} from 'react-native';

export interface ProducerData {
  id: number;
  name: string;
  image: ImageSourcePropType;
  distance: number;
  stars: number;
}
