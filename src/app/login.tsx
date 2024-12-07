import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { authenticateWithGoogle } from "../firebase/googleAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Sesuaikan path Anda

const iosClientID =
  "288406706663-8k4726hv9grtu5oqc6i53m9etpk7h08p.apps.googleusercontent.com";
const androidClientID =
  "288406706663-06l2sfodd569bpgjomltl91mkrc6aocj.apps.googleusercontent.com";
const webClientID =
  "288406706663-b2pfq5egm337dubhkms1oslb37golb98.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const clientId =
    Platform.OS === "ios"
      ? iosClientID
      : Platform.OS === "android"
      ? androidClientID
      : webClientID;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      authenticateWithGoogle(id_token)
        .then((user) => {
          Alert.alert("Sukses", `Selamat datang, ${user.displayName}`);
          router.push("/gejala");
        })
        .catch((error) => {
          Alert.alert("Login Gagal", error.message);
        });
    }
  }, [response]);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password harus diisi.");
      return;
    }

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

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Login
      </Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login dengan Email" onPress={handleEmailLogin} />
      {loading && (
        <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
      )}
      <Button
        title={loading ? "Loading..." : "Login dengan Google"}
        onPress={() => !loading && promptAsync()}
        disabled={loading || !request}
      />
    </View>
  );
}
