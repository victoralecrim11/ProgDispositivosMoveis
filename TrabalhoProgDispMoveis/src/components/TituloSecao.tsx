import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { cores } from '../theme/tema';

type Props = {
  children: string;
};

export function TituloSecao({ children }: Props) {
  return <Text style={estilos.titulo}>{children}</Text>;
}

const estilos = StyleSheet.create({
  titulo: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: '700',
  },
});
