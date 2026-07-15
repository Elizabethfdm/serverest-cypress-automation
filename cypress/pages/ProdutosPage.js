class ProdutosPage {
  elementos = {
    campoPesquisa: () => cy.get('[data-testid="pesquisar"]'),
    botaoPesquisar: () => cy.get('[data-testid="botaoPesquisar"]'),
    cardsProdutos: () => cy.get('.card'),
    botaoAdicionarLista: () => cy.get('[data-testid="adicionarNaLista"]'),
  };

  pesquisarProduto(nomeProduto) {
    this.elementos.campoPesquisa().clear().type(nomeProduto);
    this.elementos.botaoPesquisar().click();
  }

  validarProdutoVisivel(nomeProduto) {
    cy.contains(nomeProduto).should('be.visible');
  }

  adicionarProdutoNaLista(nomeProduto) {
    cy.contains('.card', nomeProduto)
      .should('be.visible')
      .within(() => {
        this.elementos.botaoAdicionarLista().click();
      });
  }
}

export default new ProdutosPage();
