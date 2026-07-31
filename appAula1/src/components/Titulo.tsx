import React from "react";
import { Text, StyleSheet, View } from "react-native";

// interface TituloProps {
//   texto: string;
//   style?: TextStyle;
// }

export const titulo = (props: { textoP: string; tamanho: number }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: props.tamanho }}>{props.textoP}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6012a4ff",
    marginVertical: 16,
    textAlign: "center",
  },

  container: {
    borderRadius: 5,
    borderWidth: 3,
  },
});
