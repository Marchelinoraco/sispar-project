import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Registrasi berhasil:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Registrasi gagal:", error.message);
    throw error;
  }
};

export { registerUser };
