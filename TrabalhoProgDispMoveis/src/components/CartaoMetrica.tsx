import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cores, espacamento, raio } from '../theme/tema';

type Props = {
  rotulo: string;
  valor: string;
  destaque?: string;
};

export function CartaoMetrica({ rotulo, valor, destaque = cores.primaria }: Props) {
  return (
    <View style={[estilos.cartao, { borderColor: destaque }]}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={[estilos.valor, { color: destaque }]}>{valor}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    minWidth: 130,
    borderWidth: 1,
    borderRadius: raio.lg,
    backgroundColor: cores.superficie,
    padding: espacamento.lg,
    shadowColor: cores.sombra,
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 2,
  },
  rotulo: {
    color: cores.muted,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  valor: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: espacamento.xs,
  },
});
