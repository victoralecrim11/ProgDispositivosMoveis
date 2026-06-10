import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes, Route, useNavigate, useLocation } from 'react-router-native';

import { TelaInicial } from '../src/screens/TelaInicial';
import { TelaLivros } from '../src/screens/TelaLivros';
import { TelaDetalhesLivro } from '../src/screens/TelaDetalhesLivro';
import { TelaFavoritos } from '../src/screens/TelaFavoritos';
import { TelaBusca } from '../src/screens/TelaBusca';
import { TelaContaBibliotecaria } from '../src/screens/TelaContaBibliotecaria';
import { TelaCadastroLivro } from '../src/screens/TelaCadastroLivro';
import { cores } from '../src/theme/tema';

function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrent = (path: string) => location.pathname === path;

  const abas = [
    { nome: 'Início', rota: '/', icone: '🏠' },
    { nome: 'Livros', rota: '/livros', icone: '📖' },
    { nome: 'Favoritos', rota: '/favoritos', icone: '★' },
    { nome: 'Busca', rota: '/busca', icone: '🔎' },
    { nome: 'Conta', rota: '/conta', icone: '👤' },
  ];

  return (
    <View style={estilos.tabBar}>
      {abas.map((aba) => (
        <Pressable
          key={aba.rota}
          style={estilos.tabItem}
          onPress={() => navigate(aba.rota)}
        >
          <Text style={isCurrent(aba.rota) ? estilos.tabIconActive : estilos.tabIconInactive}>
            {aba.icone}
          </Text>
          <Text style={isCurrent(aba.rota) ? estilos.tabTextActive : estilos.tabTextInactive}>
            {aba.nome}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function Navegacao() {
  const location = useLocation();
  const hideTabBar =
    location.pathname.startsWith('/livro/') ||
    location.pathname === '/livros/novo';

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.content}>
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/livros" element={<TelaLivros />} />
          <Route path="/favoritos" element={<TelaFavoritos />} />
          <Route path="/busca" element={<TelaBusca />} />
          <Route path="/conta" element={<TelaContaBibliotecaria />} />
          <Route path="/livro/:id" element={<TelaDetalhesLivro />} />
          <Route path="/livros/novo" element={<TelaCadastroLivro />} />
        </Routes>
      </View>
      {!hideTabBar && <TabBar />}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: cores.superficie,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIconActive: {
    fontSize: 20,
    color: cores.primaria,
  },
  tabIconInactive: {
    fontSize: 20,
    color: cores.muted,
    opacity: 0.5,
  },
  tabTextActive: {
    fontSize: 10,
    color: cores.primaria,
    marginTop: 4,
    fontWeight: 'bold',
  },
  tabTextInactive: {
    fontSize: 10,
    color: cores.muted,
    marginTop: 4,
  },
});
