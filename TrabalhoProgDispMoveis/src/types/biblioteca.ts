export type StatusLivro = 'available' | 'loaned';

export type Livro = {
  id: string;
  titulo: string;
  autor: string;
  categoria: string;
  editora: string;
  descricao: string;
  capaUrl: string;
  ano: number;
  status: StatusLivro;
};

export type Autor = {
  id: string;
  nome: string;
  bio: string;
  fotoUrl: string;
};

export type Favorito = {
  id: string;
  livroId: string;
};

export type PerfilUsuario = {
  nome: string;
  email: string;
  perfil: 'usuario';
};

export type ResumoAcervo = {
  totalLivros: number;
  totalAutores: number;
  totalFavoritos: number;
};

export type LivroExterno = {
  id: string;
  titulo: string;
  autor: string;
  capaUrl: string;
  ano: string;
};
