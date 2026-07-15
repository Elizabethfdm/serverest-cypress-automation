class HomePage {
  elementos = {
    tituloPrincipal: () => cy.get('h1'),
    botaoLogout: () => cy.get('[data-testid="logout"]'),
  };

  validarPaginaInicial() {
    cy.url().should('include', '/home');
    this.elementos.tituloPrincipal().should('be.visible');
    this.elementos.botaoLogout().should('be.visible');
  }
}

export default new HomePage();