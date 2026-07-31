import { View, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

export default function Contatos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie seu contato</Text>
      <Link style={styles.voltar} href={"/"}>
        Voltar
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f80606",
  },
  titulo: {
    fontSize: 42,
    color: "#1c08f8",
  },
  voltar: { fontSize: 42, color: "#eeef5" },
});
