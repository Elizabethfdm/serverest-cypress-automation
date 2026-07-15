import { endpoints } from '../config/endpoints';

const apiUrl = Cypress.env('apiUrl');

export function cadastrarProduto(produto, token) {
  return cy.request({
    method: 'POST',
    url: `${apiUrl}${endpoints.produtos}`,
    headers: {
      Authorization: token,
    },
    body: produto,
    failOnStatusCode: false,
  });
}

export function buscarProdutoPorId(produtoId) {
  return cy.request({
    method: 'GET',
    url: `${apiUrl}${endpoints.produtos}/${produtoId}`,
    failOnStatusCode: false,
  });
}

export function excluirProduto(produtoId, token) {
  return cy.request({
    method: 'DELETE',
    url: `${apiUrl}${endpoints.produtos}/${produtoId}`,
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  });
}