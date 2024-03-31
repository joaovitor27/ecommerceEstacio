import auth from '@react-native-firebase/auth';

export const login = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
}

export const registerUser = (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
}

export const logout = () => {
  return auth().signOut();
}

export const getCurrentUser = () => {
  return auth().currentUser;
}

export const resetPassword = (email: string) => {
  return auth().sendPasswordResetEmail(email);
}

export const updateEmail = (email: string) => {
  return auth().currentUser?.updateEmail(email);
}

export const updatePassword = (password: string) => {
  return auth().currentUser?.updatePassword(password);
}

export const deleteUser = () => {
  return auth().currentUser?.delete();
}
