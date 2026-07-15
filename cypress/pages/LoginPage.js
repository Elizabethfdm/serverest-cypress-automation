class LoginPage {
  elementos = {
    campoEmail: () => cy.get('[data-testid="email"]'),
    campoSenha: () => cy.get('[data-testid="senha"]'),
    botaoEntrar: () => cy.get('[data-testid="entrar"]'),
  };

  acessar() {
    cy.visit('/login');
  }

  preencherEmail(email) {
    this.elementos.campoEmail().clear().type(email);
  }

  preencherSenha(senha) {
    this.elementos.campoSenha().clear().type(senha, {
      log: false,
    });
  }

  clicarEntrar() {
    this.elementos.botaoEntrar().click();
  }

  realizarLogin(email, senha) {
    this.preencherEmail(email);
    this.preencherSenha(senha);
    this.clicarEntrar();
  }
}

export default new LoginPage();