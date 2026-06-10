import { getBanco } from '../../app/database';
import { Livro, PerfilUsuario, ResumoAcervo, StatusLivro } from '../types/biblioteca';

const usuarioPadrao: PerfilUsuario = {
  nome: 'Aluno da Biblioteca',
  email: 'aluno@exemplo.com',
  perfil: 'usuario',
};

export async function obterUsuario(): Promise<PerfilUsuario> {
  return usuarioPadrao;
}

export async function obterResumo(): Promise<ResumoAcervo> {
  const db = await getBanco();

  const [livrosRaw, favoritosRaw] = await Promise.all([
    db.getFirstAsync('SELECT COUNT(*) AS total FROM livros'),
    db.getFirstAsync('SELECT COUNT(*) AS total FROM favoritos'),
  ]);

  const livros = livrosRaw as { total: number } | null;
  const favoritos = favoritosRaw as { total: number } | null;

  return {
    totalLivros: livros?.total ?? 0,
    totalAutores: 0,
    totalFavoritos: favoritos?.total ?? 0,
  };
}

export async function adicionarLivro(dados: {
  titulo: string;
  autor: string;
  categoria: string;
  editora: string;
  descricao: string;
  capaUrl: string;
  ano: number;
}): Promise<Livro> {
  const db = await getBanco();
  const id = `livro-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  await db.runAsync(
    `INSERT INTO livros (id, titulo, autor, categoria, editora, descricao, capa_url, ano, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'available')`,
    [id, dados.titulo, dados.autor, dados.categoria, dados.editora, dados.descricao, dados.capaUrl, dados.ano]
  );

  return {
    id,
    titulo: dados.titulo,
    autor: dados.autor,
    categoria: dados.categoria,
    editora: dados.editora,
    descricao: dados.descricao,
    capaUrl: dados.capaUrl,
    ano: dados.ano,
    status: 'available',
  };
}

export async function listarLivros(busca = ''): Promise<Livro[]> {
  const db = await getBanco();

  const termoBusca = busca.trim();

  if (termoBusca) {
    const parametroBusca = `%${termoBusca}%`;
    const linhas = await db.getAllAsync(
      `SELECT id, titulo, autor, categoria, editora,
              descricao, capa_url, ano, status
       FROM livros
       WHERE titulo LIKE ? OR autor LIKE ?
       ORDER BY titulo`,
      [parametroBusca, parametroBusca]
    );
    return linhas.map(converterLivro);
  }

  const linhas = await db.getAllAsync(
    `SELECT id, titulo, autor, categoria, editora,
            descricao, capa_url, ano, status
     FROM livros
     ORDER BY titulo`
  );
  return linhas.map(converterLivro);
}

export async function buscarLivro(livroId: string): Promise<Livro | null> {
  const db = await getBanco();

  const linha = await db.getFirstAsync(
    `SELECT id, titulo, autor, categoria, editora,
            descricao, capa_url, ano, status
     FROM livros WHERE id = ?`,
    [livroId]
  );

  if (!linha) return null;
  return converterLivro(linha);
}

export async function listarFavoritos(): Promise<Livro[]> {
  const db = await getBanco();

  const linhas = await db.getAllAsync(
    `SELECT l.id, l.titulo, l.autor, l.categoria, l.editora,
            l.descricao, l.capa_url, l.ano, l.status
     FROM favoritos f
     INNER JOIN livros l ON l.id = f.livro_id
     ORDER BY l.titulo`
  );

  return linhas.map(converterLivro);
}

export async function listarIdsFavoritos(): Promise<string[]> {
  const db = await getBanco();
  const linhas = await db.getAllAsync('SELECT livro_id FROM favoritos');
  return (linhas as { livro_id: string }[]).map((l) => l.livro_id);
}

export async function alternarFavorito(livroId: string): Promise<boolean> {
  const db = await getBanco();

  const existenteRaw = await db.getFirstAsync('SELECT id FROM favoritos WHERE livro_id = ?', [livroId]);
  const existente = existenteRaw as { id: string } | null;

  if (existente) {
    await db.runAsync('DELETE FROM favoritos WHERE livro_id = ?', [livroId]);
    return false;
  }

  await db.runAsync('INSERT INTO favoritos (id, livro_id) VALUES (?, ?)', [
    `fav-${livroId}`,
    livroId,
  ]);
  return true;
}

export async function removerLivro(livroId: string): Promise<void> {
  const db = await getBanco();
  await db.runAsync('DELETE FROM favoritos WHERE livro_id = ?', [livroId]);
  await db.runAsync('DELETE FROM livros WHERE id = ?', [livroId]);
}

function converterLivro(l: any): Livro {
  return {
    id: l.id,
    titulo: l.titulo,
    autor: l.autor ?? (l.autor_id ?? ''),
    categoria: l.categoria,
    editora: l.editora,
    descricao: l.descricao,
    capaUrl: l.capa_url,
    ano: l.ano,
    status: l.status as StatusLivro,
  };
}

