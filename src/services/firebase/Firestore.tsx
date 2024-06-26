import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Item} from './models/item.tsx';
import {QueryParams, QueryParamsGroup} from './models/query-params.tsx';

export default class Firestore<T extends Item> {
  private readonly collectionRef: FirebaseFirestoreTypes.CollectionReference;

  constructor(collectionPath: string) {
    this.collectionRef = firestore().collection(collectionPath);
  }


  async findAll(filters?: QueryParams): Promise<T[] | object[]> {
    let results: any[] | FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;
    if (filters) {
      results = await this.collectionRef.where(filters.fieldPath, filters.opStr, filters.value).get();
    } else {
      results = await this.collectionRef.get();
    }
    const items: T[] = [];

    results.forEach(doc => {
      const item = doc.data() as T;
      item.id = doc.id;
      items.push(item);
    });
    return items;
  }


  async findId(id: string): Promise<T | null> {
    const docRef = this.collectionRef.doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return null;
    }

    const item = docSnapshot.data() as T;
    item.id = docSnapshot.id;
    return item;
  }

  async add(item: object) {
    await this.collectionRef.add(item);
  }

  async update(id: string, item: object): Promise<void> {
    const docRef = this.collectionRef.doc(id);
    await docRef.update(item);
  }

  async delete(id: string): Promise<void> {
    await this.collectionRef.doc(id).delete();
  }
}
