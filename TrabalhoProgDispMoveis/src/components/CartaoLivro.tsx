import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Livro } from '../types/biblioteca';
import { cores, espacamento, raio } from '../theme/tema';

type Props = {
  livro: Livro;
  nomeAutor: string;
  favorito?: boolean;
  aoAlternarFavorito?: (livroId: string) => void;
};

export function CartaoLivro({ livro, nomeAutor, favorito = false, aoAlternarFavorito }: Props) {
  const navigate = useNavigate();

  return (
    <View style={estilos.cartao}>
      <Pressable
        style={estilos.areaMain}
        onPress={() => navigate(`/livro/${livro.id}`)}
      >
        <Image source={{ uri: livro.capaUrl }} style={estilos.capa} />
        <View style={estilos.corpo}>
          <Text style={estilos.titulo}>{livro.titulo}</Text>
          <Text style={estilos.info}>{nomeAutor}</Text>
          <Text style={estilos.info}>
            {livro.categoria} · {livro.editora}
          </Text>
          <Text style={estilos.status}>
            {livro.status === 'available' ? 'Disponível' : 'Emprestado'}
          </Text>
        </View>
      </Pressable>

      {aoAlternarFavorito ? (
        <Pressable
          onPress={() => aoAlternarFavorito(livro.id)}
          style={[estilos.botaoFavorito, favorito && estilos.botaoFavoritoAtivo]}
        >
          <Text style={[estilos.textoFavorito, favorito && estilos.textoFavoritoAtivo]}>
            {favorito ? '★' : '☆'}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    gap: espacamento.md,
    borderRadius: raio.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
    padding: espacamento.md,
  },
  areaMain: {
    flex: 1,
    flexDirection: 'row',
    gap: espacamento.md,
  },
  capa: {
    width: 76,
    height: 104,
    borderRadius: raio.md,
    backgroundColor: cores.superficieForte,
  },
  corpo: {
    flex: 1,
    gap: 4,
  },
  titulo: {
    color: cores.texto,
    fontWeight: '700',
    fontSize: 16,
  },
  info: {
    color: cores.muted,
    fontSize: 13,
  },
  status: {
    marginTop: espacamento.xs,
    color: cores.primariaEscura,
    fontSize: 12,
    fontWeight: '700',
  },
  botaoFavorito: {
    alignSelf: 'flex-start',
    borderRadius: raio.pill,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.fundo,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoFavoritoAtivo: {
    borderColor: cores.primaria,
    backgroundColor: cores.superficieForte,
  },
  textoFavorito: {
    color: cores.muted,
    fontSize: 18,
    lineHeight: 18,
  },
  textoFavoritoAtivo: {
    color: cores.primaria,
  },
});
