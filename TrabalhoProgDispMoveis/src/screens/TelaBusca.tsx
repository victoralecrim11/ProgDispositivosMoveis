import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CabecalhoPagina } from '../components/CabecalhoPagina';
import { EstadoCarregamento } from '../components/EstadoCarregamento';
import { EstadoVazio } from '../components/EstadoVazio';
import { EntradaBusca } from '../components/EntradaBusca';
import { TituloSecao } from '../components/TituloSecao';
import { buscarLivrosNaAPI } from '../repositories/apiLivrosAbertos';
import { LivroExterno } from '../types/biblioteca';
import { cores, espacamento, raio } from '../theme/tema';

export function TelaBusca() {
  const [termoBusca, setTermoBusca] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [resultados, setResultados] = useState<LivroExterno[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  async function buscar() {
    setCarregando(true);
    setErro(null);

    try {
      const livros = await buscarLivrosNaAPI(termoBusca);
      setResultados(livros);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao buscar livros.');
      setResultados([]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <FlatList
      style={estilos.lista}
      data={resultados}
      keyExtractor={(item) => item.id}
      contentContainerStyle={estilos.conteudo}
      ListHeaderComponent={
        <View style={estilos.cabecalho}>
          <CabecalhoPagina
            icone="🔎"
            titulo="Buscar"
            subtitulo="Pesquise livros na Open Library."
          />

          <TituloSecao>Pesquisa externa</TituloSecao>

          <EntradaBusca
            valor={termoBusca}
            aoAlterar={setTermoBusca}
            placeholder="Digite um título para buscar"
          />

          <Pressable style={estilos.botao} onPress={buscar}>
            <Text style={estilos.textoBotao}>Buscar na API</Text>
          </Pressable>

          {carregando ? <EstadoCarregamento mensagem="Buscando livros..." /> : null}
          {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

          {!carregando && resultados.length === 0 && !erro ? (
            <EstadoVazio
              titulo="Nenhum resultado"
              mensagem="Digite um título acima e toque em buscar."
            />
          ) : null}
        </View>
      }
      renderItem={({ item }) => (
        <View style={estilos.cartao}>
          <Image source={{ uri: item.capaUrl }} style={estilos.capa} />
          <View style={estilos.corpo}>
            <Text style={estilos.tituloLivro}>{item.titulo}</Text>
            <Text style={estilos.info}>{item.autor}</Text>
            <Text style={estilos.info}>{item.ano}</Text>
          </View>
        </View>
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
  botao: {
    alignSelf: 'flex-start',
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
  cartao: {
    flexDirection: 'row',
    gap: espacamento.md,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.lg,
    backgroundColor: cores.superficie,
    padding: espacamento.md,
  },
  capa: {
    width: 64,
    height: 90,
    borderRadius: raio.md,
    backgroundColor: cores.superficieForte,
  },
  corpo: {
    flex: 1,
    gap: 4,
  },
  tituloLivro: {
    color: cores.texto,
    fontWeight: '700',
  },
  info: {
    color: cores.muted,
  },
});
