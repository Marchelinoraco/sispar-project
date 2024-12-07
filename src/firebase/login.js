import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Sesuaikan path Anda

const handleEmailLogin = async () => {
  try {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    Alert.alert("Sukses", `Selamat datang, ${userCredential.user.email}`);
    router.push("/gejala");
  } catch (error) {
    Alert.alert("Login Gagal", error.message);
  } finally {
    setLoading(false);
  }
};
