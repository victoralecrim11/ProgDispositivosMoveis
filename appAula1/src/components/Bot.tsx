import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Bot= (props: any) => {
  return (
    <TouchableOpacity style={styles.bTao}>
      <Text style={styles.texto}>{props.textoProps}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bTao: {
    width: 300,
    backgroundColor: "#901a12ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
  },

  texto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Bot
