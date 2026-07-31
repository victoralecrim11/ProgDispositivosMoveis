import { SQLiteDatabase } from "expo-sqlite";
import { Aluno } from "../types/Aluno";

export async function listarAlunos(db: SQLiteDatabase): Promise<Aluno[]> {
  return await db.getAllAsync<Aluno>("SELECT * FROM alunos");
}

export async function adicionarAlunoDB(
  db: SQLiteDatabase,
  nome: string,
  email: string,
  cpf: string,
  telefone: string,
): Promise<void> {
  try {
    console.log("Inserindo aluno:", { nome, email, cpf, telefone });
    const result = await db.runAsync(
      "INSERT INTO alunos(nome,email,cpf,telefone) VALUES (?,?,?,?)",
      [nome, email, cpf, telefone],
    );
    console.log("Aluno inserido com sucesso:", result);
  } catch (error) {
    console.error("Erro ao inserir aluno:", error);
    throw error;
  }
}

export async function removerAlunoDB(
  db: SQLiteDatabase,
  id: number,
): Promise<void> {
  await db.runAsync("DELETE FROM alunos WHERE id = ?", [id]);
}
