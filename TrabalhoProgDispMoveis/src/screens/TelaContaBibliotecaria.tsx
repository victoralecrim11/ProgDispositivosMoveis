import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CabecalhoPagina } from '../components/CabecalhoPagina';
import { EstadoCarregamento } from '../components/EstadoCarregamento';
import { TituloSecao } from '../components/TituloSecao';
import { obterResumo, obterUsuario } from '../repositories/bibliotecaService';
import { PerfilUsuario, ResumoAcervo } from '../types/biblioteca';
import { cores, espacamento, raio } from '../theme/tema';

export function TelaContaBibliotecaria() {
  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const [resumo, setResumo] = useState<ResumoAcervo | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const [dadosUsuario, dadosResumo] = await Promise.all([obterUsuario(), obterResumo()]);
    setUsuario(dadosUsuario);
    setResumo(dadosResumo);
    setCarregando(false);
  }

  if (carregando) {
    return <EstadoCarregamento mensagem="Carregando conta..." />;
  }

  return (
    <ScrollView style={estilos.scroll} contentContainerStyle={estilos.conteudo}>
      <CabecalhoPagina
        icone="👤"
        titulo="Conta"
        subtitulo="Seu perfil e o estado do acervo."
      />

      <View style={estilos.cartao}>
        <Text style={estilos.nome}>{usuario?.nome}</Text>
        <Text style={estilos.info}>{usuario?.email}</Text>
        <Text style={estilos.info}>Perfil: {usuario?.perfil}</Text>
      </View>

      <TituloSecao>Resumo do acervo</TituloSecao>

      <View style={estilos.cartao}>
        <Text style={estilos.info}>Livros: {resumo?.totalLivros ?? 0}</Text>
        <Text style={estilos.info}>Autores: {resumo?.totalAutores ?? 0}</Text>
        <Text style={estilos.info}>Favoritos: {resumo?.totalFavoritos ?? 0}</Text>
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
  cartao: {
    borderRadius: raio.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
    padding: espacamento.md,
    gap: espacamento.sm,
  },
  nome: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    color: cores.muted,
  },
});
