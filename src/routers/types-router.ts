import {ProducerData} from '../models/ProducerData.tsx';

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Login: undefined;
  Register: undefined;
  Producer: { producerData: ProducerData };
  Profiler: { userId: string };
  Tab: undefined;
};
