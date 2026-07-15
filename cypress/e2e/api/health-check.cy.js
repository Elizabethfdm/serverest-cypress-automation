describe('Validação inicial da API ServeRest', () => {
  it('deve consultar a lista de usuários', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');
    });
  });
});