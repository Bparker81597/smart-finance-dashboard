import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";

const googleProvider = new GoogleAuthProvider();

export const authService = {
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },
  signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  },
  signOut() {
    return signOut(auth);
  },
};
