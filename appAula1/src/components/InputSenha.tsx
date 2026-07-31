import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  Text,
} from "react-native";

interface InputSenhaProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
}

const InputLogin = (props: any) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={[styles.container]}>
      <TextInput
        style={styles.input}
        secureTextEntry={!mostrarSenha}
        placeholder="Digite sua senha"
        placeholderTextColor="#999"
        textContentType="password"
      />
      {/* <TouchableOpacity
        style={styles.botaoOlho}
        onPress={() => setMostrarSenha(!mostrarSenha)}
      >
        <Text style={styles.iconeOlho}>{mostrarSenha ? '👁️' : '👁️‍🗨️'}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    marginVertical: 10,
    // paddingRight: 10,
  },
  input: {
    width: 300,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#192a3bbd",
    color: "#333333",
  },
  botaoOlho: {
    padding: 8,
  },
  iconeOlho: {
    fontSize: 20,
  },
});

export default InputLogin;
