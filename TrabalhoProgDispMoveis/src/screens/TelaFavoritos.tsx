import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CartaoLivro } from '../components/CartaoLivro';
import { CabecalhoPagina } from '../components/CabecalhoPagina';
import { EstadoCarregamento } from '../components/EstadoCarregamento';
import { EstadoVazio } from '../components/EstadoVazio';
import {
  alternarFavorito,
  listarFavoritos,
  listarIdsFavoritos,
} from '../repositories/bibliotecaService';
import { Livro } from '../types/biblioteca';
import { cores, espacamento } from '../theme/tema';

export function TelaFavoritos() {
  const [livros, setLivros] = useState<Livro[]>([]);
  
  const [idsFavoritos, setIdsFavoritos] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
      carregarDados();
    }, []);

  async function carregarDados() {
    const [dadosFavoritos, ids] = await Promise.all([
      listarFavoritos(),
      listarIdsFavoritos(),
    ]);
    setLivros(dadosFavoritos);
    setIdsFavoritos(ids);
    setCarregando(false);
  }

  async function handleFavorito(livroId: string) {
    await alternarFavorito(livroId);
    await carregarDados();
  }

  if (carregando) {
    return <EstadoCarregamento mensagem="Carregando favoritos..." />;
  }

  return (
    <FlatList
      style={estilos.lista}
      data={livros}
      keyExtractor={(item) => item.id}
      contentContainerStyle={estilos.conteudo}
      ListHeaderComponent={
        <View style={estilos.cabecalho}>
          <CabecalhoPagina
            icone="★"
            titulo="Favoritos"
            subtitulo="Seus livros favoritos."
          />
        </View>
      }
      ListEmptyComponent={
        <EstadoVazio
          titulo="Nenhum favorito"
          mensagem="Marque livros como favoritos para vê-los aqui."
        />
      }
      renderItem={({ item }) => (
        <CartaoLivro
          livro={item}
          nomeAutor={(item as any).autor ?? 'Autor não encontrado'}
          favorito={idsFavoritos.includes(item.id)}
          aoAlternarFavorito={handleFavorito}
        />
      )}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espacamento.xl,
    gap: espacamento.lg,
  },
  cabecalho: {
    gap: espacamento.lg,
  },
});
