import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cores, espacamento } from '../theme/tema';

type Props = {
  titulo: string;
  mensagem: string;
};

export function EstadoVazio({ titulo, mensagem }: Props) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>
      <Text style={estilos.mensagem}>{mensagem}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: espacamento.xl * 2,
  },
  titulo: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: '700',
  },
  mensagem: {
    color: cores.muted,
    marginTop: espacamento.sm,
    textAlign: 'center',
    maxWidth: 320,
  },
});
