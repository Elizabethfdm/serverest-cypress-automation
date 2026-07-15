describe('Validação inicial do frontend ServeRest', () => {
  it('deve acessar a página inicial', () => {
    cy.visit('/');

    cy.url().should('include', 'front.serverest.dev');
    cy.get('body').should('be.visible');
  });
});