import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProdutoPizzas from "../components/produtoPizzas";
import { pizzas } from "../data/arrayPizzas";

export default function Pizzas() {
  return (
    <View style={styles.container}>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProdutoPizzas produto={item} />}
      />
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.push("/")}
      >
        <Text style={styles.botaoVoltarText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d1d1",
    paddingTop: 16,
  },
  botaoVoltar: {
    backgroundColor: "#FF6B00",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoVoltarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
