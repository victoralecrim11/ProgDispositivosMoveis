import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';
import { CartaoLivro } from '../components/CartaoLivro';
import { CartaoMetrica } from '../components/CartaoMetrica';
import { CabecalhoPagina } from '../components/CabecalhoPagina';
import { EstadoCarregamento } from '../components/EstadoCarregamento';
import { TituloSecao } from '../components/TituloSecao';
import {
  alternarFavorito,
  listarIdsFavoritos,
  listarLivros,
  obterResumo,
} from '../repositories/bibliotecaService';
import { buscarLivrosNaAPI } from '../repositories/apiLivrosAbertos';
import { Livro, ResumoAcervo, LivroExterno } from '../types/biblioteca';
import { cores, espacamento, raio } from '../theme/tema';


export function TelaInicial() {
  const navigate = useNavigate();
  const location = useLocation();

  const [resumo, setResumo] = useState<ResumoAcervo | null>(null);
  const [livros, setLivros] = useState<Livro[]>([]);
  
  const [idsFavoritos, setIdsFavoritos] = useState<string[]>([]);
  const [recomendados, setRecomendados] = useState<LivroExterno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && !carregando) {
      carregarDados();
    }
  }, [location.pathname]);

  async function carregarDados() {
    try {
      const [dadosResumo, todosLivros, favoritos, livrosApi] = await Promise.all([
        obterResumo(),
        listarLivros(),
        listarIdsFavoritos(),
        buscarLivrosNaAPI('tecnologia').catch(() => []),
      ]);

      setResumo(dadosResumo);
      setLivros(todosLivros.slice(0, 3));
      setIdsFavoritos(favoritos);
      setRecomendados(livrosApi.slice(0, 3));
    } catch (err) {
      setErro('Não foi possível carregar os dados.');
    } finally {
      setCarregando(false);
    }
  }
  async function handleFavorito(livroId: string) {
    const agora = await alternarFavorito(livroId);
    setIdsFavoritos((atual) =>
      agora ? [...atual, livroId] : atual.filter((id) => id !== livroId)
    );
    const novoResumo = await obterResumo();
    setResumo(novoResumo);
  }

  if (carregando) {
    return <EstadoCarregamento mensagem="Carregando painel..." />;
  }

  return (
    <ScrollView style={estilos.scroll} contentContainerStyle={estilos.conteudo}>
      <CabecalhoPagina
        icone="📚"
        titulo="Início"
        subtitulo="Visão geral do acervo."
      />

      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

      <View style={estilos.metricas}>
        <CartaoMetrica rotulo="Livros" valor={String(resumo?.totalLivros ?? 0)} />
        <CartaoMetrica rotulo="Autores" valor={String(resumo?.totalAutores ?? 0)} />
        <CartaoMetrica rotulo="Favoritos" valor={String(resumo?.totalFavoritos ?? 0)} />
      </View>

      <View style={estilos.acoes}>
        <Pressable onPress={() => navigate('/livros')} style={estilos.botao}>
          <Text style={estilos.textoBotao}>Ver livros</Text>
        </Pressable>
        <Pressable onPress={() => navigate('/busca')} style={estilos.botao}>
          <Text style={estilos.textoBotao}>Buscar na API</Text>
        </Pressable>
      </View>

      <TituloSecao>Livros em destaque:</TituloSecao>

      {livros.map((livro) => (
          <CartaoLivro
            key={livro.id}
            livro={livro}
            nomeAutor={(livro as any).autor ?? 'Autor desconhecido'}
            favorito={idsFavoritos.includes(livro.id)}
            aoAlternarFavorito={handleFavorito}
          />
      ))}

      {recomendados.length > 0 &&
        recomendados.map((item) => (
          <View key={item.id} style={estilos.cartaoExterno}>
            <Image source={{ uri: item.capaUrl }} style={estilos.capaExterna} />
            <View style={estilos.corpoExterno}>
              <Text style={estilos.tituloLivroExterno}>{item.titulo}</Text>
              <Text style={estilos.info}>{item.autor}</Text>
              <Text style={estilos.info}>Ano: {item.ano}</Text>
            </View>
          </View>
        ))
      }
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espacamento.xl,
    gap: espacamento.lg,
  },
  metricas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espacamento.md,
  },
  acoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espacamento.md,
  },
  botao: {
    borderRadius: raio.pill,
    backgroundColor: cores.primaria,
    paddingHorizontal: espacamento.lg,
    paddingVertical: espacamento.sm,
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: '700',
  },
  erro: {
    color: cores.erro,
    fontWeight: '600',
  },
  cartaoExterno: {
    flexDirection: 'row',
    gap: espacamento.md,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.lg,
    backgroundColor: cores.superficie,
    padding: espacamento.md,
  },
  capaExterna: {
    width: 64,
    height: 90,
    borderRadius: raio.md,
    backgroundColor: cores.superficieForte,
  },
  corpoExterno: {
    flex: 1,
    gap: 4,
  },
  tituloLivroExterno: {
    color: cores.texto,
    fontWeight: '700',
  },
  info: {
    color: cores.muted,
  },
});
