import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyABoAT5WaEGEHz-sOct4JE0r8bQGtHnqH4",
  authDomain: "sispar-project.firebaseapp.com",
  projectId: "sispar-project",
  storageBucket: "sispar-project.firebasestorage.app",
  messagingSenderId: "464854721445",
  appId: "1:464854721445:web:c4bd311ed8bb55a833be4c",
  measurementId: "G-111W9KFB95",
};

const app = initializeApp(firebaseConfig);

// Inisialisasi Auth dengan persistensi
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
