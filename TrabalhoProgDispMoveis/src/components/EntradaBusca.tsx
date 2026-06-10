import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { cores, espacamento, raio } from '../theme/tema';

type Props = {
  valor: string;
  aoAlterar: (valor: string) => void;
  placeholder: string;
};

export function EntradaBusca({ valor, aoAlterar, placeholder }: Props) {
  return (
    <View style={estilos.wrapper}>
      <TextInput
        value={valor}
        onChangeText={aoAlterar}
        placeholder={placeholder}
        placeholderTextColor={cores.muted}
        style={estilos.input}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    backgroundColor: cores.superficie,
  },
  input: {
    paddingHorizontal: espacamento.lg,
    paddingVertical: espacamento.md,
    color: cores.texto,
  },
});
