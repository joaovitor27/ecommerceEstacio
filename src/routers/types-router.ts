import {ProducerData} from '../models/ProducerData.tsx';
import {ProductData} from '../models/ProductData.tsx';

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Login: undefined;
  Register: undefined;
  Producer: { producerData: ProducerData };
  Profiler: { userId: string };
  Tab: undefined;
  Products: undefined;
  Product: { productData: ProductData };
};
