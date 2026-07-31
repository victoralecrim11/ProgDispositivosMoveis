import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Index() {
  return (

    <FlatList
      // data: array contendo os itens que serão renderizados na lista
      // É a fonte de dados do FlatList
      data={frutas}
      
      // keyExtractor: função que extrai uma chave única para cada item
      // Recebe (item, index) e retorna um identificador único
      // É essencial para otimizar re-renderizações e mantém a identidade dos itens
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      
      // renderItem: função que renderiza cada item da lista
      // Recebe um objeto com { item, index } e retorna um componente React
      // item: o dado atual do array
      // index: a posição do item no array
      renderItem={({ item, index }) => (
        <View>
          <Text>{item.nome}</Text>
        </View>
      )}
      
    
    />


    // <View style={styles.container}>
    //   <Text>Seu texto aqui</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b7edaff",
  },
  text: {
    fontSize: 30,
    color: "#5f0d65ff",
  },
});
