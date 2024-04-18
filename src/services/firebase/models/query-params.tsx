import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface QueryParams {
  fieldPath: string;
  opStr: FirebaseFirestoreTypes.WhereFilterOp;
  value: string | number | boolean | Date | undefined;
}
