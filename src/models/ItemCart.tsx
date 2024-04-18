import {ProductData} from './ProductData.tsx';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface ItemCart {
  id: string;
  user: string;
  product: ProductData | null;
  quantity: number;
}

export interface ItemCartBody {
  user: string | undefined;
  product: FirebaseFirestoreTypes.DocumentReference | undefined;
  quantity: number;
}
