import React from "react";
import { useState } from "react";
import { View, Button, Text } from "react-native";

export default function Mensagem() {
  const [mostrarMsg, setMostrarMsg] = useState(false);

  return (
    <View>
      <Text>
        {mostrarMsg
          ? "Mostra essa msg quando o estado for true"
          : "Mostra essa msg quando o estado for false"}
      </Text>
      <Button
        title={mostrarMsg ? "Mostrar mais ❤" : "Mostrar menos 💔"}
        onPress={() => setMostrarMsg(!mostrarMsg)}
      ></Button>
    </View>
  );
}
