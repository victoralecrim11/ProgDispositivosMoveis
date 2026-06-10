# App Gerenciador de Bibliotecas

Trabalho da disciplina de Desenvolvimento de Aplicativos Mobile.

O app gerencia o acervo de uma biblioteca: cadastro de livros, autores, controle de empréstimos, favoritos e busca de livros via API externa.

## Como rodar

Instalar dependências:

```bash
npm install
```

Iniciar o app:

```bash
npx expo start
```

Abrir no celular com o Expo Go ou em um emulador Android/iOS.

## Tecnologias

- React Native com Expo
- TypeScript
- SQLite via expo-sqlite para dados locais
- React Navigation para navegação entre telas
- API Open Library para busca de livros externos

## Telas

- **Início** – painel com métricas do acervo
- **Livros** – lista com busca por título ou autor
- **Detalhes** – informações completas do livro com opção de favoritar
- **Autores** – autores cadastrados
- **Empréstimos** – controle de livros emprestados
- **Favoritos** – livros salvos pelo usuário
- **Busca** – pesquisa na API Open Library
- **Conta** – perfil do usuário
