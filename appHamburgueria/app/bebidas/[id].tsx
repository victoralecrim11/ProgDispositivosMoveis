import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bebidas } from "../../data/arrayBebidas";

export default function BebidaDetalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const produto = bebidas.find((p) => p.id === Number(id));

  if (!produto) return <Text>Produto não encontrado</Text>;

  return (
    <View style={styles.container}>
      <Image source={produto.imagem} style={styles.imagem} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.nome}>{produto.titulo}</Text>
        <Text style={styles.preco}>{produto.preco}</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>

        <TouchableOpacity style={styles.botaoComprar}>
          <Text style={styles.botaoComprarText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.botaoVoltarText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imagem: {
    width: "100%",
    height: 300,
  },
  info: {
    flex: 1,
    padding: 16,
  },
  nome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  preco: {
    fontSize: 20,
    color: "#FF6B00",
    fontWeight: "600",
    marginBottom: 12,
  },
  descricao: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 24,
  },
  botaoComprar: {
    backgroundColor: "#FF6B00",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  botaoComprarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoVoltar: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  botaoVoltarText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});
