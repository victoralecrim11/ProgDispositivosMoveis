// components/produtoCard.tsx
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { prodType } from "../types/prodType";

type Props = { produto: prodType };

export default function ProdutoCard({ produto }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/Pizzas/${produto.id}`)}
    >
      <View style={styles.info}>
        <Text style={styles.titulo}>{produto.titulo}</Text>
        <Text style={styles.preco}>R$ {produto.preco}</Text>
      </View>

      <Image source={produto.imagem} style={styles.imagem} resizeMode="cover" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ca6009ca",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  info: {
    flex: 1,
    gap: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  preco: {
    fontSize: 16,
    color: "#e63946",
    fontWeight: "600",
  },
  imagem: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginLeft: 12,
  },
});
