import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

// interface SubTituloProps {
//   texto: string;
//   style?: TextStyle;
// }

export const SubTitulo  = () => {
   return (
      <View>
        <Text style={styles.subTitulo}>Criar conta?</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  subTitulo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    marginVertical: 8,
  },
});

