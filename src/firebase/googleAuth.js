import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./firebase"; // Pastikan auth diinisialisasi di firebase.js

export const authenticateWithGoogle = async (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    return result.user;
  } catch (error) {
    throw new Error(error.message);
  }
};
