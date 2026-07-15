class CadastroPage {
  elementos = {
    linkCadastrar: () => cy.get('[data-testid="cadastrar"]'),
    campoNome: () => cy.get('[data-testid="nome"]'),
    campoEmail: () => cy.get('[data-testid="email"]'),
    campoSenha: () => cy.get('[data-testid="password"]'),
    checkboxAdministrador: () => cy.get('[data-testid="checkbox"]'),
    botaoCadastrar: () => cy.get('[data-testid="cadastrar"]'),
  };

  acessar() {
    cy.visit('/login');
    this.elementos.linkCadastrar().click();
  }

  preencherNome(nome) {
    this.elementos.campoNome().clear().type(nome);
  }

  preencherEmail(email) {
    this.elementos.campoEmail().clear().type(email);
  }

  preencherSenha(senha) {
    this.elementos.campoSenha().clear().type(senha, {
      log: false,
    });
  }

  marcarAdministrador() {
    this.elementos.checkboxAdministrador().check({
      force: true,
    });
  }

  clicarCadastrar() {
    this.elementos.botaoCadastrar().click();
  }

  cadastrarUsuario(usuario) {
    this.preencherNome(usuario.nome);
    this.preencherEmail(usuario.email);
    this.preencherSenha(usuario.password);

    if (usuario.administrador === 'true') {
      this.marcarAdministrador();
    }

    this.clicarCadastrar();
  }
}

export default new CadastroPage();
