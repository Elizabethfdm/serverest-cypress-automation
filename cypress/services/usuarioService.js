import { endpoints } from '../config/endpoints';

const apiUrl = Cypress.env('apiUrl');

export function cadastrarUsuario(usuario) {
  return cy.request({
    method: 'POST',
    url: `${apiUrl}${endpoints.usuarios}`,
    body: usuario,
    failOnStatusCode: false,
  });
}

export function buscarUsuarioPorId(usuarioId) {
  return cy.request({
    method: 'GET',
    url: `${apiUrl}${endpoints.usuarios}/${usuarioId}`,
    failOnStatusCode: false,
  });
}

export function excluirUsuario(usuarioId) {
  return cy.request({
    method: 'DELETE',
    url: `${apiUrl}${endpoints.usuarios}/${usuarioId}`,
    failOnStatusCode: false,
  });
}
