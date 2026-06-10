import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { CabecalhoPagina } from '../components/CabecalhoPagina';
import { EstadoCarregamento } from '../components/EstadoCarregamento';
import { TituloSecao } from '../components/TituloSecao';
import { adicionarLivro } from '../repositories/bibliotecaService';
import { cores, espacamento, raio } from '../theme/tema';

export function TelaCadastroLivro() {
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const salvandoRef = useRef(false);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [editora, setEditora] = useState('');
  const [descricao, setDescricao] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  const [ano, setAno] = useState(String(new Date().getFullYear()));

  useEffect(() => {
    setCarregando(false);
  }, []);

  async function handleSalvar() {
    if (salvandoRef.current) return;

    if (!titulo.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o título do livro.');
      return;
    }
    
    if (!categoria.trim()) {
      Alert.alert('Campo obrigatório', 'Informe a categoria.');
      return;
    }
    if (!editora.trim()) {
      Alert.alert('Campo obrigatório', 'Informe a editora.');
      return;
    }

    const anoNum = parseInt(ano, 10);
    if (isNaN(anoNum) || anoNum < 1000 || anoNum > new Date().getFullYear() + 1) {
      Alert.alert('Ano inválido', 'Informe um ano válido.');
      return;
    }

    salvandoRef.current = true;
    setSalvando(true);
    console.log('handleSalvar: iniciando salvamento', { titulo, autor, categoria, editora, ano: anoNum });
    try {
      await adicionarLivro({
        titulo: titulo.trim(),
        autor: autor.trim() || 'Autor desconhecido',
        categoria: categoria.trim(),
        editora: editora.trim(),
        descricao: descricao.trim(),
        capaUrl: capaUrl.trim() || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600',
        ano: anoNum,
      });
      console.log('handleSalvar: sucesso ao salvar livro', { titulo });
      
      if (Platform.OS === 'web') {
        try {
          window.alert('Livro cadastrado com sucesso.');
        } catch (e) {
          // fallback
        }
        navigate('/livros');
      } else {
        Alert.alert('Sucesso!', 'Livro cadastrado com sucesso.', [
          { text: 'OK', onPress: () => navigate('/livros') },
        ]);
      }
    } catch (err) {
      console.error('handleSalvar: erro ao salvar', err);
      Alert.alert('Erro', 'Não foi possível salvar o livro. Tente novamente.');
    } finally {
      salvandoRef.current = false;
      setSalvando(false);
    }
  }

  if (carregando) {
    return <EstadoCarregamento mensagem="Carregando formulário..." />;
  }

  return (
    <KeyboardAvoidingView
      style={estilos.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={estilos.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <CabecalhoPagina
          icone="➕"
          titulo="Novo Livro"
          subtitulo="Preencha os dados para cadastrar um livro."
        />

        {/* Título */}
        <TituloSecao>Título *</TituloSecao>
        <TextInput
          style={estilos.input}
          placeholder="Ex: O Senhor dos Anéis"
          placeholderTextColor={cores.muted}
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* Autor (campo de texto simples, opcional) */}
        <TituloSecao>Autor</TituloSecao>
        <TextInput
          style={estilos.input}
          placeholder="Nome do autor (opcional)"
          placeholderTextColor={cores.muted}
          value={autor}
          onChangeText={setAutor}
        />

        {/* Categoria */}
        <TituloSecao>Categoria *</TituloSecao>
        <TextInput
          style={estilos.input}
          placeholder="Ex: Fantasia, Romance, Distopia..."
          placeholderTextColor={cores.muted}
          value={categoria}
          onChangeText={setCategoria}
        />

        {/* Editora */}
        <TituloSecao>Editora *</TituloSecao>
        <TextInput
          style={estilos.input}
          placeholder="Ex: Rocco, Companhia das Letras..."
          placeholderTextColor={cores.muted}
          value={editora}
          onChangeText={setEditora}
        />

        {/* Ano */}
        <TituloSecao>Ano de publicação *</TituloSecao>
        <TextInput
          style={estilos.input}
          placeholder={String(new Date().getFullYear())}
          placeholderTextColor={cores.muted}
          value={ano}
          onChangeText={setAno}
          keyboardType="number-pad"
          maxLength={4}
        />

        {/* Descrição */}
        <TituloSecao>Descrição</TituloSecao>
        <TextInput
          style={[estilos.input, estilos.inputMultiline]}
          placeholder="Breve sinopse do livro..."
          placeholderTextColor={cores.muted}
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* URL da capa */}
        <TituloSecao>URL da capa (opcional)</TituloSecao>
        <TextInput
          style={estilos.input}
          placeholder="https://..."
          placeholderTextColor={cores.muted}
          value={capaUrl}
          onChangeText={setCapaUrl}
          keyboardType="url"
          autoCapitalize="none"
        />

        {/* Botões */}
        <View style={estilos.acoes}>
          <Pressable
            style={[estilos.botao, estilos.botaoCancelar]}
            onPress={() => navigate(-1)}
            disabled={salvando}
          >
            <Text style={estilos.textoCancelar}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={[estilos.botao, estilos.botaoSalvar, salvando && estilos.botaoDesabilitado]}
            onPress={handleSalvar}
            disabled={salvando}
          >
            <Text style={estilos.textoSalvar}>
              {salvando ? 'Salvando...' : 'Salvar livro'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  scroll: {
    flex: 1,
  },
  conteudo: {
    padding: espacamento.xl,
    gap: espacamento.md,
    paddingBottom: espacamento.xl * 2,
  },
  input: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.sm,
    color: cores.texto,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: espacamento.sm,
  },
  seletorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espacamento.sm,
  },
  chipAutor: {
    borderRadius: raio.pill,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.xs,
  },
  chipAtivo: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  chipTexto: {
    color: cores.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextoAtivo: {
    color: '#FFF',
  },
  acoes: {
    flexDirection: 'row',
    gap: espacamento.md,
    marginTop: espacamento.lg,
  },
  botao: {
    flex: 1,
    borderRadius: raio.pill,
    paddingVertical: espacamento.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCancelar: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  botaoSalvar: {
    backgroundColor: cores.primaria,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoCancelar: {
    color: cores.texto,
    fontWeight: '700',
  },
  textoSalvar: {
    color: '#FFF',
    fontWeight: '700',
  },
});
