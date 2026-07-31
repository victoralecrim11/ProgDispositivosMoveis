import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Aluno } from "../types/Aluno";

type Props = { aluno: Aluno; onRemover: (id: number) => void };

export function AlunoItem({ aluno, onRemover }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.nome}>{aluno.nome}</Text>
        <Text style={styles.email}>{aluno.email}</Text>
        <Text style={styles.cpf}>CPF: {aluno.cpf}</Text>
        <Text style={styles.telefone}>Telefone: {aluno.telefone}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemover(aluno.id)}>
        <Text style={styles.remover}>Remover</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#aaaaaa",
  },
  nome: { fontSize: 16, fontWeight: "700" },
  email: { fontSize: 14, color: "#8b8b8b" },
  cpf: { fontSize: 12, color: "#8b8b8b" },
  telefone: { fontSize: 12, color: "#8b8b8b" },
  remover: { color: "#ff0000", fontWeight: "700" },
});
