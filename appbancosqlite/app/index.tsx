import { SQLiteDatabase } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

import { getDB } from "../app/database";
import {
    adicionarAlunoDB,
    listarAlunos,
    removerAlunoDB,
} from "../src/repositories/AlunoRepository";

import { AlunoForm } from "../src/components/AlunoForm";
import { AlunoList } from "../src/components/AlunoList";
import { Aluno } from "../src/types/Aluno";

export default function HomeScreen() {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDB()
      .then((banco) => {
        setDb(banco);
        return listarAlunos(banco).then(setAlunos);
      })
      .finally(() => setLoading(false));
  }, []);

  async function carregarAlunos(banco: SQLiteDatabase) {
    const resultado = await listarAlunos(banco);
    setAlunos(resultado);
  }

  async function adicionarAluno() {
    if (!db) return;

    if (!nome || !email || !cpf || !telefone) {
      Alert.alert("Campos Vazios");
      return;
    }

    try {
      console.log("Iniciando adição de aluno");
      await adicionarAlunoDB(db, nome, email, cpf, telefone);
      setNome("");
      setEmail("");
      setCpf("");
      setTelefone("");
      await carregarAlunos(db);
      Alert.alert("Sucesso", "Aluno adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
      Alert.alert("Erro", `Erro ao adicionar aluno: ${error}`);
    }
  }

  async function removerAluno(id: number) {
    if (!db) return;
    await removerAlunoDB(db, id);
    await carregarAlunos(db);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando....</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Alunos</Text>
      <AlunoForm
        nome={nome}
        email={email}
        cpf={cpf}
        telefone={telefone}
        onChangeNome={setNome}
        onChangeEmail={setEmail}
        onChangeCpf={setCpf}
        onChangeTelefone={setTelefone}
        onSubmit={adicionarAluno}
      />
      <AlunoList alunos={alunos} onRemover={removerAluno} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
