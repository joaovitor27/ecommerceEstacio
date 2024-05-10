import {ProducerData} from '../models/ProducerData.tsx';
import {ProductData} from '../models/ProductData.tsx';

export type RootStackParamList = {
  InitialPage: undefined;
  Home: undefined;
  Profile: { userId: string };
  Login: undefined;
  Register: undefined;
  Producer: { producerData: ProducerData };
  Profiler: { userId: string };
  Tab: undefined;
  Products: undefined;
  Product: { productData: ProductData | null | undefined };
  Help: undefined;
  MyPurchases: undefined;
  Address: undefined;
  PaymentMethods: undefined;
  Payment: undefined;
};
