import { LivroExterno } from '../types/biblioteca';

const URL_BASE = 'https://openlibrary.org';
const CAPA_PADRAO = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600';

type RespostaAPI = {
  docs: Array<{
    key?: string;
    title?: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
  }>;
};

export async function buscarLivrosNaAPI(termo: string): Promise<LivroExterno[]> {
  const termoBusca = termo.trim();

  if (!termoBusca) {
    return [];
  }

  const resposta = await fetch(
    `${URL_BASE}/search.json?title=${encodeURIComponent(termoBusca)}&limit=12`
  );

  if (!resposta.ok) {
    throw new Error('Não foi possível buscar livros. Verifique sua conexão.');
  }

  const dados = (await resposta.json()) as RespostaAPI;

  return dados.docs.map((livro, indice) => ({
    id: livro.key ?? `${termoBusca}-${indice}`,
    titulo: livro.title ?? 'Sem título',
    autor: livro.author_name?.[0] ?? 'Autor desconhecido',
    capaUrl: livro.cover_i
      ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
      : CAPA_PADRAO,
    ano: livro.first_publish_year ? String(livro.first_publish_year) : 'Sem data',
  }));
}
