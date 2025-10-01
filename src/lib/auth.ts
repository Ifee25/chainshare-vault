import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
export async function logout() {
  return signOut(auth);
}

export async function register(email: string, password: string, displayName?: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
}

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
