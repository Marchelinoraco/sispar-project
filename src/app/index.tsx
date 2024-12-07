import { Link } from "expo-router";
import React from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  return (
    <View className="flex flex-1 ">
      {/* <Header /> */}
      <Content />
      <Footer />
    </View>
  );
}

function Content({}) {
  return (
    <ImageBackground
      source={require("../../assets/bg-hipertensi.jpeg")}
      style={styles.container}
    >
      <Text style={styles.title}>Save Heart</Text>

      <Link
        style={{ borderRadius: 10, backgroundColor: "white" }}
        className="py-[10px] px-[24px] bg-[#fff]"
        href={"/login"}
      >
        <Text className="text-[24px] font-bold text-red-600">Mulai</Text>
      </Link>
    </ImageBackground>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
        <Link className="font-bold flex-1 items-center justify-center" href="/">
          ACME
        </Link>
        <View className="flex flex-row gap-4 sm:gap-6">
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            About
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Product
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Pricing
          </Link>
        </View>
      </View>
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex shrink-0 bg-gray-100 native:hidden"
      style={{ paddingBottom: bottom }}
    >
      <View className="py-6 flex-1 items-start px-4 md:px-6 ">
        <Text className={"text-center text-gray-700"}>
          © {new Date().getFullYear()} Me
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent", // Untuk memastikan latar belakang transparan
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#ffff",
    borderRadius: 8, // Menentukan sudut bulat pada tombol
  },
  buttonText: {
    fontSize: 28,
    color: "red",
    fontWeight: "bold",
  },
});
