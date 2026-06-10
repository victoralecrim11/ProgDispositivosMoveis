import { Platform } from 'react-native';

export interface IBanco {
  execAsync(sql: string, parametros?: any[]): Promise<void>;
  getFirstAsync(sql: string, parametros?: any[]): Promise<any | null>;
  getAllAsync(sql: string, parametros?: any[]): Promise<any[]>;
  runAsync(sql: string, parametros?: any[]): Promise<any>;
}

const criarTabelas = `
CREATE TABLE IF NOT EXISTS livros (
  id TEXT PRIMARY KEY NOT NULL,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  categoria TEXT NOT NULL,
  editora TEXT NOT NULL,
  descricao TEXT NOT NULL,
  capa_url TEXT NOT NULL,
  ano INTEGER NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS favoritos (
  id TEXT PRIMARY KEY NOT NULL,
  livro_id TEXT NOT NULL
);
`;

const popularDados = `
INSERT OR IGNORE INTO livros (id, titulo, autor, categoria, editora, descricao, capa_url, ano, status) VALUES
  ('l1', 'Harry Potter e a Pedra Filosofal', 'J. K. Rowling', 'Fantasia', 'Rocco', 'Primeiro livro da saga do bruxo mais famoso da literatura jovem.', 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600', 1997, 'available'),
  ('l2', '1984', 'George Orwell', 'Distopia', 'Companhia das Letras', 'Clássico sobre vigilância, manipulação e controle social.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600', 1949, 'available'),
  ('l3', 'Dom Casmurro', 'Machado de Assis', 'Romance', 'Penguin', 'Obra central da literatura brasileira sobre memória e ciúme.', 'https://images.unsplash.com/photo-1455885666463-6f9240e8db58?w=600', 1899, 'available'),
  ('l4', 'A Hora da Estrela', 'Clarice Lispector', 'Romance', 'Rocco', 'Narrativa curta e intensa sobre a vida de Macabéa.', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600', 1977, 'available'),
  ('l5', 'A Revolução dos Bichos', 'George Orwell', 'Sátira', 'Companhia das Letras', 'Fábula política sobre poder e corrupção.', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600', 1945, 'available'),
  ('l6', 'Memórias Póstumas de Brás Cubas', 'Machado de Assis', 'Romance', 'Penguin', 'Narrativa inovadora com humor e crítica social.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600', 1881, 'available');

INSERT OR IGNORE INTO favoritos (id, livro_id) VALUES
  ('f1', 'l1'),
  ('f2', 'l3');
`;

let bancoDados: Promise<IBanco> | null = null;

// Banco para web: usa localStorage para manter os dados entre reloads
function criarBancoWeb(): IBanco {
  function carregarDados() {
    try {
      const salvo = localStorage.getItem('bib_db');
      if (salvo) return JSON.parse(salvo);
    } catch (e) {}
    return null;
  }

  function salvar(dados: any) {
    localStorage.setItem('bib_db', JSON.stringify(dados));
  }

  function popularBanco() {
    const livros = [
      { id: 'l1', titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J. K. Rowling', categoria: 'Fantasia', editora: 'Rocco', descricao: 'Primeiro livro da saga do bruxo mais famoso da literatura jovem.', capa_url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600', ano: 1997, status: 'available' },
      { id: 'l2', titulo: '1984', autor: 'George Orwell', categoria: 'Distopia', editora: 'Companhia das Letras', descricao: 'Clássico sobre vigilância, manipulação e controle social.', capa_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600', ano: 1949, status: 'available' },
      { id: 'l3', titulo: 'Dom Casmurro', autor: 'Machado de Assis', categoria: 'Romance', editora: 'Penguin', descricao: 'Obra central da literatura brasileira sobre memória e ciúme.', capa_url: 'https://images.unsplash.com/photo-1455885666463-6f9240e8db58?w=600', ano: 1899, status: 'available' },
      { id: 'l4', titulo: 'A Hora da Estrela', autor: 'Clarice Lispector', categoria: 'Romance', editora: 'Rocco', descricao: 'Narrativa curta e intensa sobre a vida de Macabéa.', capa_url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600', ano: 1977, status: 'available' },
      { id: 'l5', titulo: 'A Revolução dos Bichos', autor: 'George Orwell', categoria: 'Sátira', editora: 'Companhia das Letras', descricao: 'Fábula política sobre poder e corrupção.', capa_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600', ano: 1945, status: 'available' },
      { id: 'l6', titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', categoria: 'Romance', editora: 'Penguin', descricao: 'Narrativa inovadora com humor e crítica social.', capa_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600', ano: 1881, status: 'available' },
    ];
    const favoritos = [
      { id: 'f1', livro_id: 'l1' },
      { id: 'f2', livro_id: 'l3' },
    ];
    return { livros, favoritos };
  }

  let db = carregarDados();
  if (!db || !db.livros || db.livros.length === 0) {
    db = popularBanco();
    salvar(db);
  }

  function removerDuplicatasWeb() {
    const seen = new Set();
    const livrosUnicos: any[] = [];
    for (const l of db.livros) {
      const key = `${l.titulo}|${String(l.autor)}|${l.editora}`;
      if (!seen.has(key)) {
        seen.add(key);
        livrosUnicos.push(l);
      }
    }
    db.livros = livrosUnicos;
    const ids = new Set(db.livros.map((x: any) => x.id));
    db.favoritos = db.favoritos.filter((f: any) => ids.has(f.livro_id));
    salvar(db);
  }

  removerDuplicatasWeb();

  return {
    async execAsync() {},

    async getFirstAsync(sql: string, parametros: any[] = []): Promise<any | null> {
      const upper = sql.trim().toUpperCase();

      if (upper.includes('COUNT') && upper.includes('FROM LIVROS')) {
        return { total: db.livros.length } as any;
      }
      
      if (upper.includes('COUNT') && upper.includes('FROM FAVORITOS')) {
        return { total: db.favoritos.length } as any;
      }
      if (upper.includes('FROM LIVROS') && upper.includes('WHERE')) {
        const livro = db.livros.find((l: any) => l.id === parametros[0]);
        return (livro ?? null) as any;
      }
      
      if (upper.includes('FROM FAVORITOS') && upper.includes('WHERE')) {
        const fav = db.favoritos.find((f: any) => f.livro_id === parametros[0]);
        return (fav ?? null) as any;
      }

      return null;
    },

    async getAllAsync(sql: string, parametros: any[] = []): Promise<any[]> {
      const upper = sql.trim().toUpperCase();

      if (upper.includes('FROM LIVROS')) {
        if (parametros.length > 0) {
          const termo = String(parametros[0]).replace(/%/g, '').toLowerCase();
          const filtrados = db.livros.filter((l: any) => {
            return (
              l.titulo.toLowerCase().includes(termo) ||
              String(l.autor).toLowerCase().includes(termo)
            );
          });
          return filtrados.sort((a: any, b: any) => a.titulo.localeCompare(b.titulo)) as any;
        }
        return [...db.livros].sort((a: any, b: any) => a.titulo.localeCompare(b.titulo)) as any;
      }

      if (upper.includes('FROM FAVORITOS') && upper.includes('SELECT LIVRO_ID')) {
        return db.favoritos.map((f: any) => ({ livro_id: f.livro_id })) as any;
      }

      if (upper.includes('FROM FAVORITOS') && upper.includes('JOIN')) {
        const idsLivros = db.favoritos.map((f: any) => f.livro_id);
        const livrosFav = db.livros.filter((l: any) => idsLivros.includes(l.id));
        return [...livrosFav].sort((a: any, b: any) => a.titulo.localeCompare(b.titulo)) as any;
      }

      return [];
    },

    async runAsync(sql: string, parametros: any[] = []) {
      const upper = sql.trim().toUpperCase();

      if (upper.includes('INSERT') && upper.includes('LIVROS')) {
        const novoLivro = {
          id: parametros[0],
          titulo: parametros[1],
          autor: parametros[2],
          categoria: parametros[3],
          editora: parametros[4],
          descricao: parametros[5],
          capa_url: parametros[6],
          ano: parametros[7],
          status: 'available',
        };
        db.livros.push(novoLivro);
        salvar(db);
        return;
      }

      if (upper.includes('INSERT') && upper.includes('FAVORITOS')) {
        const novoFav = { id: parametros[0], livro_id: parametros[1] };
        db.favoritos.push(novoFav);
        salvar(db);
        return;
      }

      if (upper.includes('DELETE') && upper.includes('FAVORITOS')) {
        db.favoritos = db.favoritos.filter((f: any) => f.livro_id !== parametros[0]);
        salvar(db);
        return;
      }
      if (upper.includes('DELETE') && upper.includes('FROM LIVROS')) {
        const id = parametros[0];
        db.livros = db.livros.filter((l: any) => l.id !== id);
        // remover favoritos relacionados
        db.favoritos = db.favoritos.filter((f: any) => f.livro_id !== id);
        salvar(db);
        return;
      }
    },
  };
}

export function getBanco(): Promise<IBanco> {
  if (bancoDados) {
    return bancoDados;
  }

  if (Platform.OS === 'web') {
    bancoDados = Promise.resolve(criarBancoWeb());
    return bancoDados;
  }

  const SQLite = require('expo-sqlite');

  const promessaBanco = SQLite.openDatabaseAsync('biblioteca.db').then(async (db: IBanco) => {
    await db.execAsync(`${criarTabelas}\n${popularDados}`);
    try {
      await db.execAsync("DELETE FROM livros WHERE rowid NOT IN (SELECT MIN(rowid) FROM livros GROUP BY titulo, autor, editora);");
      await db.execAsync("DELETE FROM favoritos WHERE livro_id NOT IN (SELECT id FROM livros);");
    } catch (e) {
    }
    return db;
  });

  bancoDados = promessaBanco;
  return promessaBanco;
}
