import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TelaPrincipal() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Hamburgueria MarceloTI 🍔</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("./lista")}
        >
          <Text style={styles.cardTitulo}>🍔 Hambúrgueres</Text>
          <Text style={styles.cardDescricao}>
            Deliciosos sanduíches preparados com ingredientes frescos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("./pizzas")}
        >
          <Text style={styles.cardTitulo}>🍕 Pizzas</Text>
          <Text style={styles.cardDescricao}>
            Pizzas assadas no forno com massa crocante
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("./bebidas")}
        >
          <Text style={styles.cardTitulo}>🥤 Bebidas</Text>
          <Text style={styles.cardDescricao}>
            Refrigerantes, sucos naturais e milkshakes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("./doces")}
        >
          <Text style={styles.cardTitulo}>🍰 Doces</Text>
          <Text style={styles.cardDescricao}>
            Sobremesas deliciosas: bolos, tortas, mousse e mais
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("./outros")}
        >
          <Text style={styles.cardTitulo}>🍟 Outros</Text>
          <Text style={styles.cardDescricao}>
            Acompanhamentos, saladas e molhos especiais
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6B00",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FF6B00",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  cardDescricao: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    lineHeight: 20,
  },
});
