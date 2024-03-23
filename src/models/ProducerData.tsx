import {ImageSourcePropType} from 'react-native';

export interface ProducerData {
  id: number;
  name: string;
  image: ImageSourcePropType;
  distance: string;
  stars: number;
}
