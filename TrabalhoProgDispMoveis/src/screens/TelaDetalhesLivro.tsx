import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, Platform, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { useParams, useNavigate } from 'react-router-native';
import { CabecalhoPagina } from '../components/CabecalhoPagina';
import { EstadoCarregamento } from '../components/EstadoCarregamento';
import { TituloSecao } from '../components/TituloSecao';
import {
  alternarFavorito,
  buscarLivro,
  listarIdsFavoritos,
  removerLivro,
} from '../repositories/bibliotecaService';
import { Livro } from '../types/biblioteca';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cores, espacamento, raio } from '../theme/tema';

export function TelaDetalhesLivro() {
  const { id: livroId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [livro, setLivro] = useState<Livro | null>(null);
  
  const [idsFavoritos, setIdsFavoritos] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [removendo, setRemovendo] = useState(false);
  const removendoRef = useRef(false);

  useEffect(() => {
    carregarDetalhes();
  }, [livroId]);

  async function carregarDetalhes() {
    if (!livroId) return;
    try {
      const [dadosLivro, favoritos] = await Promise.all([
        buscarLivro(livroId),
        listarIdsFavoritos(),
      ]);

      setLivro(dadosLivro);
      setIdsFavoritos(favoritos);
    } catch (err) {
      setErro('Não foi possível carregar os detalhes.');
    } finally {
      setCarregando(false);
    }
  }

  async function handleFavorito() {
    if (!livro) return;

    const agora = await alternarFavorito(livro.id);
    setIdsFavoritos((atual) =>
      agora ? [...atual, livro.id] : atual.filter((id) => id !== livro.id)
    );
  }

  async function handleRemover() {
    if (!livro) return;

    if (Platform.OS === 'web') {
      try {
        const ok = window.confirm('Tem certeza que deseja remover este livro?');
        if (!ok) return;
      } catch (e) {
      }

      if (removendoRef.current) return;
      removendoRef.current = true;
      setRemovendo(true);
      try {
        await removerLivro(livro.id);
        try {
          window.alert('Livro removido com sucesso.');
        } catch (e) {
        }
        navigate('/livros');
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível remover o livro.');
      } finally {
        removendoRef.current = false;
        setRemovendo(false);
      }
      return;
    }

    Alert.alert('Remover livro', 'Tem certeza que deseja remover este livro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
          onPress: async () => {
          if (removendoRef.current) return;
          removendoRef.current = true;
          setRemovendo(true);
          try {
            await removerLivro(livro.id);
            Alert.alert('Sucesso!', 'Livro removido com sucesso.', [
              { text: 'OK', onPress: () => navigate('/livros') },
            ]);
          } catch (e) {
            Alert.alert('Erro', 'Não foi possível remover o livro.');
          } finally {
            removendoRef.current = false;
            setRemovendo(false);
          }
        },
      },
    ]);
  }

  if (carregando) {
    return <EstadoCarregamento mensagem="Carregando detalhes..." />;
  }

  if (!livro) {
    return (
      <View style={estilos.semLivro}>
        <CabecalhoPagina
          icone="❌"
          titulo="Livro não encontrado"
          subtitulo="Volte e escolha outro livro da lista."
        />
        <Pressable style={estilos.botaoVoltar} onPress={() => navigate(-1)}>
          <Text style={estilos.textoBotao}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const ehFavorito = idsFavoritos.includes(livro.id);

  return (
    <ScrollView style={estilos.scroll} contentContainerStyle={estilos.conteudo}>
      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

      <Pressable style={estilos.botaoVoltar} onPress={() => navigate(-1)}>
        <MaterialCommunityIcons name="book" size={18} color="#FFF" style={estilos.iconeVoltar} />
        <Text style={estilos.textoBotao}>Voltar</Text>
      </Pressable>

      <View style={estilos.destaque}>
        <Image source={{ uri: livro.capaUrl }} style={estilos.capa} />
        <View style={estilos.destaqueCorpo}>
          <Text style={estilos.titulo}>{livro.titulo}</Text>
          <Text style={estilos.info}>{livro.autor ?? 'Autor não encontrado'}</Text>
          <Text style={estilos.info}>
            {livro.categoria} · {livro.editora}
          </Text>
          <Text style={estilos.status}>
            {livro.status === 'available' ? 'Disponível' : 'Emprestado'}
          </Text>

          <Pressable
            onPress={handleFavorito}
            style={[estilos.botaoFavorito, ehFavorito && estilos.botaoFavoritoAtivo]}
          >
            <Text style={[estilos.textoFavorito, ehFavorito && estilos.textoFavoritoAtivo]}>
              {ehFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            </Text>
          </Pressable>
          <Pressable
            onPress={handleRemover}
            style={[estilos.botaoFavorito, estilos.botaoRemover, removendo && estilos.botaoDesabilitado]}
            disabled={removendo}
          >
            <Text style={estilos.textoRemover}>{removendo ? 'Removendo...' : 'Remover livro'}</Text>
          </Pressable>
        </View>
      </View>

      <TituloSecao>Descrição</TituloSecao>
      <Text style={estilos.descricao}>{livro.descricao}</Text>

      <TituloSecao>Informações</TituloSecao>
      <View style={estilos.infoBox}>
        <Text style={estilos.infoTexto}>Ano: {livro.ano}</Text>
        <Text style={estilos.infoTexto}>Editora: {livro.editora}</Text>
        <Text style={estilos.infoTexto}>Autor: {livro.autor}</Text>
      </View>
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
  semLivro: {
    padding: espacamento.xl,
    gap: espacamento.lg,
  },
  destaque: {
    flexDirection: 'row',
    gap: espacamento.md,
    borderRadius: raio.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
    padding: espacamento.md,
  },
  capa: {
    width: 112,
    height: 156,
    borderRadius: raio.md,
    backgroundColor: cores.superficieForte,
  },
  destaqueCorpo: {
    flex: 1,
    gap: 6,
  },
  titulo: {
    color: cores.texto,
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '700',
  },
  info: {
    color: cores.muted,
    fontSize: 14,
  },
  status: {
    marginTop: espacamento.xs,
    color: cores.primariaEscura,
    fontWeight: '700',
  },
  botaoFavorito: {
    alignSelf: 'flex-start',
    borderRadius: raio.pill,
    backgroundColor: cores.primaria,
    paddingHorizontal: espacamento.lg,
    paddingVertical: espacamento.sm,
    marginTop: espacamento.sm,
  },
  botaoRemover: {
    backgroundColor: '#c0392b',
    marginLeft: 8,
  },
  textoRemover: {
    color: '#FFF',
    fontWeight: '700',
  },
  botaoFavoritoAtivo: {
    backgroundColor: cores.superficieForte,
  },
  textoFavorito: {
    color: '#FFF',
    fontWeight: '700',
  },
  textoFavoritoAtivo: {
    color: cores.primariaEscura,
  },
  descricao: {
    color: cores.texto,
    lineHeight: 22,
  },
  infoBox: {
    borderRadius: raio.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
    padding: espacamento.md,
    gap: espacamento.sm,
  },
  infoTexto: {
    color: cores.texto,
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: raio.pill,
    backgroundColor: cores.primaria,
    paddingHorizontal: espacamento.lg,
    paddingVertical: espacamento.sm,
  },
  iconeVoltar: {
    marginRight: 8,
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: '700',
  },
  erro: {
    color: cores.erro,
    fontWeight: '600',
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
});
