import { faker } from '@faker-js/faker';

export function gerarProduto({
  nome,
  preco,
  descricao,
  quantidade,
} = {}) {
  return {
    nome: nome ?? `Produto ${faker.string.alphanumeric(8)}`,
    preco: preco ?? faker.number.int({ min: 10, max: 5000 }),
    descricao:
      descricao ?? faker.commerce.productDescription(),
    quantidade:
      quantidade ?? faker.number.int({ min: 1, max: 100 }),
  };
}