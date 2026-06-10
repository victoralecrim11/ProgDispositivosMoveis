import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cores, espacamento } from '../theme/tema';

type Props = {
  icone: string;
  titulo: string;
  subtitulo: string;
};

export function CabecalhoPagina({ icone, titulo, subtitulo }: Props) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>
        {icone} {titulo}
      </Text>
      <Text style={estilos.subtitulo}>{subtitulo}</Text>
      <View style={estilos.divisor} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: espacamento.sm,
  },
  titulo: {
    color: cores.texto,
    fontFamily: 'serif',
    fontSize: 30,
    fontWeight: '700',
  },
  subtitulo: {
    color: cores.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  divisor: {
    height: 1,
    backgroundColor: cores.borda,
    marginTop: espacamento.sm,
  },
});
