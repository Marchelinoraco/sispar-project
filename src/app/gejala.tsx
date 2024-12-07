import React, { useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";

// Data gejala dan nilai CF
const gejalaData = [
  { id: 1, name: "Sakit Kepala", cf: 0.6 },
  { id: 2, name: "Jantung Berdebar", cf: 0.8 },
  { id: 3, name: "Sesak Napas", cf: 0.7 },
  { id: 4, name: "Mata Kabur", cf: 0.4 },
  { id: 5, name: "Kelelahan", cf: 0.5 },
];

function ForwardChaining() {
  const [gejalaList, setGejalaList] = useState(
    gejalaData.map((item) => ({ ...item, selected: false }))
  );

  const [hasil, setHasil] = useState<number | null>(null);

  // Handle pemilihan gejala
  const handleSelect = (id: number) => {
    setGejalaList((prevList) =>
      prevList.map((gejala) =>
        gejala.id === id ? { ...gejala, selected: !gejala.selected } : gejala
      )
    );
  };

  // Hitung CF combine
  const calculateCF = () => {
    const selectedGejala = gejalaList.filter((g) => g.selected);
    if (selectedGejala.length === 0) {
      setHasil(null);
      return;
    }

    // Perhitungan CF Combine
    let cfCombine = selectedGejala[0].cf;
    for (let i = 1; i < selectedGejala.length; i++) {
      const cf = selectedGejala[i].cf;
      cfCombine = cfCombine + cf * (1 - Math.abs(cfCombine));
    }

    setHasil(cfCombine);
  };

  return (
    <ImageBackground
      source={require("../../assets/bg-gejala.jpg")}
      className="flex-1 bg-gray-100  p-4"
    >
      <Text className="text-xl font-bold mb-4 mt-14 text-center">
        Pilih Gejala Anda
      </Text>
      <View className="space-y-4">
        {gejalaList.map((gejala) => (
          <TouchableOpacity
            key={gejala.id}
            onPress={() => handleSelect(gejala.id)}
            className={`flex-row items-center justify-between bg-white rounded-lg p-3 my-1 shadow ${
              gejala.selected
                ? "border-2 border-blue-500"
                : "border border-gray-200"
            }`}
          >
            <Text
              className={`text-base ${
                gejala.selected ? "font-bold text-blue-500" : "text-gray-800"
              }`}
            >
              {gejala.name}
            </Text>
            {gejala.selected && (
              <Text className="text-blue-500 font-bold">✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={calculateCF}
        className="bg-blue-500 rounded-lg p-4 mt-6"
      >
        <Text className="text-center text-white font-bold">Hitung Hasil</Text>
      </TouchableOpacity>

      {hasil !== null && (
        <View className="mt-6 bg-white p-4 rounded-lg shadow">
          <Text className="text-lg font-semibold">Hasil:</Text>
          <Text className="text-base mt-2">
            Anda memiliki kemungkinan sebesar{" "}
            <Text className="font-bold">{(hasil * 100).toFixed(2)}%</Text>{" "}
            mengidap hipertensi.
          </Text>
        </View>
      )}

      {hasil === null && (
        <Text className="mt-6 text-gray-500 text-center">
          Pilih gejala untuk melihat hasil.
        </Text>
      )}
    </ImageBackground>
  );
}

export default ForwardChaining;
