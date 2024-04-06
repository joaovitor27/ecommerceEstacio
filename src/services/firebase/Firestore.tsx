import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';


export default class Firestore {

  private readonly _collectionPath: string;

  get collectionPath(): string {
    return this._collectionPath;
  }

  constructor(collectionPath: string) {
    this._collectionPath = collectionPath;
  }

  async findAll(filters?: FirebaseFirestoreTypes.QueryFilterConstraint | FirebaseFirestoreTypes.QueryCompositeFilterConstraint): Promise<FirebaseFirestoreTypes.DocumentData[]> {
    if (!filters) {
      const results = await firestore().collection(this.collectionPath).get();
      return results.docs.map((doc) => doc.data());
    }
    const results = await firestore().collection(this.collectionPath).where(filters).get();
    return results.docs.map((doc) => doc.data());
  }

  async findId(id: string) {
    const producer = await firestore().collection(this.collectionPath).doc(id).get();
    return producer.data();
  }
}
