import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  onChangeNome: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onChangeCpf: (v: string) => void;
  onChangeTelefone: (v: string) => void;
  onSubmit: () => void;
};

export function AlunoForm({
  nome,
  email,
  cpf,
  telefone,
  onChangeNome,
  onChangeEmail,
  onChangeCpf,
  onChangeTelefone,
  onSubmit,
}: Props) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={onChangeNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={onChangeCpf}
        keyboardType="number-pad"
        maxLength={14}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={onChangeTelefone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.botao} onPress={onSubmit}>
        <Text style={styles.botaoTexto}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#646363",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#490617",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoTexto: {
    color: "#ff0000",
    fontSize: 16,
    fontWeight: "700",
  },
});
