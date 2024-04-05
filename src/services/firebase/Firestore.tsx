import firestore from '@react-native-firebase/firestore';



export default class Firestore {

  private readonly _collectionPath: string;

  get collectionPath(): string {
    return this._collectionPath;
  }

  constructor(collectionPath: string) {
    this._collectionPath = collectionPath;
  }

  async findAll() {
    const results = await firestore().collection(this.collectionPath).get();
    return results.docs.map((doc) => doc.data());
  }

  async findId(id: string) {
    const producer = await firestore().collection(this.collectionPath).doc(id).get();
    return producer.data();
  }
}
