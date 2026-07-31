import { prodType } from "../types/prodType";

export const pizzas: prodType[] = [
  {
    id: 0,
    titulo: "Margherita",
    descricao:
      "massa crocante, molho de tomate, mussarela fresca e manjericão.",
    preco: "R$35.90",
    imagem: require("../assets/images/pizza1.jpeg"),
  },
  {
    id: 1,
    titulo: "Pepperoni",
    descricao:
      "massa crocante, molho de tomate, mussarela e pepperoni temperado.",
    preco: "R$42.90",
    imagem: require("../assets/images/pizza2.jpg"),
  },
  {
    id: 2,
    titulo: "Quatro Queijos",
    descricao: "massa crocante, mussarela, gorgonzola, parmesão e brie.",
    preco: "R$48.90",
    imagem: require("../assets/images/pizza3.jpg"),
  },
  {
    id: 3,
    titulo: "Bacon e Cebola",
    descricao:
      "massa crocante, bacon crocante, cebola caramelizada e queijo derretido.",
    preco: "R$39.90",
    imagem: require("../assets/images/pizza4.jpg"),
  },
  {
    id: 4,
    titulo: "Frango com Catupiry",
    descricao: "massa crocante, frango desfiado, catupiry e milho verde.",
    preco: "R$44.90",
    imagem: require("../assets/images/pizza5.jpg"),
  },
  {
    id: 5,
    titulo: "Portuguesa",
    descricao: "massa crocante, presunto, ovos, cebola, pimentão e azeitonas.",
    preco: "R$40.90",
    imagem: require("../assets/images/pizza6.jpg"),
  },
  {
    id: 6,
    titulo: "Calabresa",
    descricao: "massa crocante, molho de tomate, calabresa fatiada e cebola.",
    preco: "R$38.90",
    imagem: require("../assets/images/pizza7.jpeg"),
  },
  {
    id: 7,
    titulo: "Rúcula com Tomate Seco",
    descricao: "massa crocante, mussarela, rúcula fresca e tomate seco.",
    preco: "R$45.90",
    imagem: require("../assets/images/pizza8.jpeg"),
  },
  {
    id: 8,
    titulo: "Moda da Casa",
    descricao: "massa crocante, lombo canadense, champignon, palmito e requeijão.",
    preco: "R$49.90",
    imagem: require("../assets/images/pizza9.jpeg"),
  },
  {
    id: 9,
    titulo: "Chocolate com Morango",
    descricao: "massa crocante doce, ganache de chocolate e fatias de morango fresco.",
    preco: "R$42.90",
    imagem: require("../assets/images/pizza10.jpeg"),
  },
];