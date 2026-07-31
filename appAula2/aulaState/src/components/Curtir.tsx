import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Curtida() {
  const [curtidas, setCurtidas] = useState(0);
  const [curtiu, setCurtiu] = useState(false);

  function handleCurtir() {
    //Se curtiu for true (já curtiu), entra no bloco
    if (curtiu) {
      // Remove 1 curtida, muda para não curtida
      setCurtidas(curtidas - 1);
      setCurtiu(false);
    } else {
      //Adiciona 1 curtida, muda para curtido
      setCurtidas(curtidas + 1);
      setCurtiu(true);
    }
  }

  return (
    <View style={{ alignItems: "center", marginTop: 50 }}>
      <Text style={{ fontSize: 30 }}> @professormarceloTI</Text>
      <TouchableOpacity onPress={handleCurtir}>
        <Text style={{ fontSize: 80 }}>{curtiu ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>
      <Text>{curtidas} Curtir</Text>
    </View>
  );
}
