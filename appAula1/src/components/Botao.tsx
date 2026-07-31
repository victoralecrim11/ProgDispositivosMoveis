import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// interface BotaoProps {
//   texto: string;
//   onPress: () => void;
// }

// const Botao: React.FC<BotaoProps> = ({ texto, onPress, ...props }) => {
//   return (
//     <TouchableOpacity style={styles.botao} onPress={onPress} {...props}>
//       <Text style={styles.texto}>{texto}</Text>
//     </TouchableOpacity>
//   );
// };

const Botao = (props: {label: string}) => {
  return (
    <TouchableOpacity style={styles.botao}>
      <Text style={styles.texto}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    width: 300,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  texto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Botao;
