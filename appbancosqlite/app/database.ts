import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDB(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    console.log("Abrindo banco de dados...");
    db = await SQLite.openDatabaseAsync("alunos.db");

    // Cria a tabela com a nova estrutura
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS alunos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        cpf TEXT,
        telefone TEXT
      );
    `);

    // Tenta adicionar as colunas se não existirem
    try {
      await db.execAsync("ALTER TABLE alunos ADD COLUMN cpf TEXT;");
    } catch (e) {
      // Coluna já existe, ignora
    }

    try {
      await db.execAsync("ALTER TABLE alunos ADD COLUMN telefone TEXT;");
    } catch (e) {
      // Coluna já existe, ignora
    }

    console.log("Banco de dados pronto!");
  }
  return db;
}
