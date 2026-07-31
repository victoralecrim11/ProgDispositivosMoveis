import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Contador() {
  const [contador, setContador] = useState(1000);

  function handleAumentar() {
    setContador(contador + 1000);
  }

  function handleDiminuir() {
    setContador(contador - 10);
  }

  function handleReiniciar() {
    setContador(0);
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        marginLeft: 120,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Contador
      </Text>
      <Text style={{ fontSize: 60, fontWeight: "bold", marginBottom: 30 }}>
        {contador}
      </Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
        <TouchableOpacity
          onPress={handleDiminuir}
          style={{
            backgroundColor: "#ff6b6b",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            -
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAumentar}
          style={{
            backgroundColor: "#51cf66",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleReiniciar}
        style={{
          backgroundColor: "#4dabf7",
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Reiniciar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
