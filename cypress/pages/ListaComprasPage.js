class ListaComprasPage {
  elementos = {
    tituloPagina: () => cy.contains('h1', 'Lista de Compras'),
    botaoLimparLista: () => cy.get('[data-testid="limparLista"]'),
  };

  validarPagina() {
    cy.url().should('include', '/minhaListaDeProdutos');
    this.elementos.tituloPagina().should('be.visible');
  }

  validarProdutoNaLista(nomeProduto) {
    cy.contains(nomeProduto).should('be.visible');
  }

  limparLista() {
    this.elementos.botaoLimparLista().click();
  }
}

export default new ListaComprasPage();
