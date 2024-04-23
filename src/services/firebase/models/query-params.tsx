import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type Operator = 'AND' | 'OR';

export interface QueryParams {
  fieldPath: string;
  opStr: FirebaseFirestoreTypes.WhereFilterOp;
  value: string | number | boolean | Date | undefined;
}

export interface QueryParamsGroup {
  operator: Operator;
  filters: QueryParams[];
}
