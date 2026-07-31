import React from 'react';
import { TextInput, StyleSheet, ViewStyle } from 'react-native';

interface InputLoginProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
}

const InputLogin = (props: any) => {
  return (
    <TextInput
      style={[styles.input]}
      placeholder= 'Digite seu Login'
      placeholderTextColor="#999"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#192a3bbd',
    color: '#FFFFFF',
  },
});

export default InputLogin;
