import {ItemCart} from './ItemCart.tsx';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface Buy {
  id: string;
  user: string;
  products: ItemCart[];
  date: FirebaseFirestoreTypes.Timestamp;
  total: number;
}

export interface BuyBody {
  id?: string;
  user: string;
  products: ItemCart[];
  date: Date;
  total: number;
}
