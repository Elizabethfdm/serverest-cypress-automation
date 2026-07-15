import { endpoints } from '../config/endpoints';

const apiUrl = Cypress.env('apiUrl');

export function realizarLogin(usuario) {
  return cy.request({
    method: 'POST',
    url: `${apiUrl}${endpoints.login}`,
    body: {
      email: usuario.email,
      password: usuario.password,
    },
    failOnStatusCode: false,
  });
}