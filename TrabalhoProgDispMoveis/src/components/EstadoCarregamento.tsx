import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { cores, espacamento } from '../theme/tema';

type Props = {
  mensagem?: string;
};

export function EstadoCarregamento({ mensagem = 'Carregando...' }: Props) {
  return (
    <View style={estilos.container}>
      <ActivityIndicator color={cores.primaria} />
      <Text style={estilos.texto}>{mensagem}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: espacamento.xl * 2,
    gap: espacamento.sm,
  },
  texto: {
    color: cores.muted,
  },
});
