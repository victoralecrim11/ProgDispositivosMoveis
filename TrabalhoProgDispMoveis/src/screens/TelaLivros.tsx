import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { CartaoLivro } from '../components/CartaoLivro';
import { CabecalhoPagina } from '../components/CabecalhoPagina';
import { EntradaBusca } from '../components/EntradaBusca';
import { EstadoCarregamento } from '../components/EstadoCarregamento';
import { EstadoVazio } from '../components/EstadoVazio';
import { TituloSecao } from '../components/TituloSecao';
import {
  alternarFavorito,
  listarIdsFavoritos,
  listarLivros,
} from '../repositories/bibliotecaService';
import { Livro } from '../types/biblioteca';
import { cores, espacamento, raio } from '../theme/tema';

export function TelaLivros() {
  const navigate = useNavigate();
  const [livros, setLivros] = useState<Livro[]>([]);
  
  const [idsFavoritos, setIdsFavoritos] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
      carregarDados();
    }, []);

  async function carregarDados() {
    try {
      const [dadosLivros, favoritos] = await Promise.all([
        listarLivros(),
        listarIdsFavoritos(),
      ]);

      setLivros(dadosLivros);
      setIdsFavoritos(favoritos);
    } catch (err) {
      setErro('Erro ao carregar livros.');
    } finally {
      setCarregando(false);
    }
  }

  const livrosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return livros;

    return livros.filter((livro) => {
      const nomeAutor = (livro as any).autor ?? '';
      return (
        livro.titulo.toLowerCase().includes(termo) ||
        nomeAutor.toLowerCase().includes(termo)
      );
    });
  }, [livros, busca]);

  async function handleFavorito(livroId: string) {
    const agora = await alternarFavorito(livroId);
    setIdsFavoritos((atual) =>
      agora ? [...atual, livroId] : atual.filter((id) => id !== livroId)
    );
    await carregarDados();
  }

  if (carregando) {
    return <EstadoCarregamento mensagem="Carregando livros..." />;
  }

  return (
    <View style={estilos.container}>
      <FlatList
        style={estilos.lista}
        data={livrosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.conteudo}
        ListHeaderComponent={
          <View style={estilos.cabecalho}>
            <CabecalhoPagina
              icone="📖"
              titulo="Livros"
              subtitulo="Use a busca para filtrar por título ou autor."
            />

            {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

            <TituloSecao>Buscar</TituloSecao>
            <EntradaBusca
              valor={busca}
              aoAlterar={setBusca}
              placeholder="Buscar por título ou autor"
            />

            {livrosFiltrados.length > 0 ? (
              <View style={estilos.placeholderTextoDetalhes}>
                <Text style={estilos.placeholderText}>Toque ou clique em um livro para ver os detalhes.</Text>
              </View>
            ) : null}

            <View style={estilos.barra}>
              <Text style={estilos.textoBarra}>
                {livrosFiltrados.length} {livrosFiltrados.length === 1 ? 'livro' : 'livros'}
              </Text>
              <Text style={estilos.textoBarra}>{idsFavoritos.length} favoritos</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <EstadoVazio titulo="Nenhum resultado" mensagem="Tente outro termo de busca." />
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

      {/* Botão flutuante para cadastrar novo livro */}
      <Pressable style={estilos.fab} onPress={() => navigate('/livros/novo')}>
        <Text style={estilos.fabTexto}>＋</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  lista: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espacamento.xl,
    gap: espacamento.lg,
    paddingBottom: 100,
  },
  cabecalho: {
    gap: espacamento.lg,
  },
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: espacamento.sm,
    paddingHorizontal: espacamento.md,
    borderRadius: raio.md,
    backgroundColor: cores.superficieForte,
  },
  textoBarra: {
    color: cores.primariaEscura,
    fontWeight: '700',
  },
  erro: {
    color: cores.erro,
    fontWeight: '600',
  },
  placeholderTextoDetalhes: {
    marginTop: espacamento.md,
    padding: espacamento.md,
    borderRadius: raio.sm,
    backgroundColor: cores.superficie,
  },
  placeholderText: {
    color: cores.primariaEscura,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: espacamento.xl,
    right: espacamento.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabTexto: {
    color: '#FFF',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '700',
  },
});
