import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { registerUser } from "../firebase/signUp";
import { Link } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password harus diisi.");
      return;
    }
    try {
      const user = await registerUser(email, password);
      Alert.alert(
        "Sukses",
        "Registrasi berhasil. Selamat datang, " + user.email
      );
    } catch (error) {
      Alert.alert("Gagal", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Text className="text-lg font-bold mb-4">Registrasi Akun</Text>
      <TextInput
        className="border p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Daftar" onPress={handleRegister} />
      <View className="mt-4">
        <Link href="/login">
          <Text className="text-blue-500">Sudah punya akun? Login di sini</Text>
        </Link>
      </View>
    </View>
  );
}
