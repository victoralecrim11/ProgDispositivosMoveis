import { View, StyleSheet, Text, Image } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.principal}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Meu App</Text>

        <View style={styles.nav}>
          <Link style={styles.link} href={"/criar_conta"}>
            Criar Conta
          </Link>
          <Link style={styles.link} href={"/produtos"}>
            Produtos
          </Link>
          <Link style={styles.link} href={"/sobre"}>
            Sobre
          </Link>
          <Link style={styles.link} href={"/contatos"}>
            Contatos
          </Link>
        </View>
      </View>

      <View style={styles.body}>
        <Image style={styles.img} source={require("../../assets/images/avatar-people-person-business-.jpg")} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.titulo}>copyright @2026</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  principal: {
    flex: 1,
  },

  header: {
    height: 60,
    backgroundColor: '#4c1d95',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1b2e',
  },

  footer: {
    height: 50,
    backgroundColor: '#4c1d95',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nav: {
    flexDirection: 'row',
    gap: 36,
    marginTop: 6,
  },

  titulo: {
    fontSize: 22,
    color: '#f1f1f1', 
  },

  link: {
    color: '#f1f1f1',
    fontSize: 16,
  },

  footerText: {
    color: '#10bcec',
    fontSize: 18,
  },

  img: {
    width: 400,
    height: 400,
    borderRadius: 20,
  },
});
