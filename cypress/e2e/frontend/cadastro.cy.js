import { gerarUsuario } from '../../factories/usuarioFactory';

import {
  buscarUsuarioPorId,
  excluirUsuario,
} from '../../services/usuarioService';

import cadastroPage from '../../pages/CadastroPage';
import homePage from '../../pages/HomePage';

describe('Cadastro de usuário pelo frontend', () => {
  let usuarioId;

  afterEach(() => {
    if (usuarioId) {
      excluirUsuario(usuarioId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });

      usuarioId = undefined;
    }
  });

  it('deve cadastrar um novo usuário com sucesso', () => {
    const usuario = gerarUsuario();

    cadastroPage.acessar();
    cadastroPage.cadastrarUsuario(usuario);

    homePage.validarPaginaInicial();

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      qs: {
        email: usuario.email,
      },
      failOnStatusCode: false,
    }).then((responseConsulta) => {
      expect(responseConsulta.status).to.eq(200);
      expect(responseConsulta.body.quantidade).to.eq(1);
      expect(responseConsulta.body.usuarios).to.have.length(1);

      const usuarioCadastrado = responseConsulta.body.usuarios[0];

      expect(usuarioCadastrado).to.deep.include({
        nome: usuario.nome,
        email: usuario.email,
        administrador: usuario.administrador,
      });

      expect(usuarioCadastrado._id).to.be.a('string').and.not.be.empty;

      usuarioId = usuarioCadastrado._id;

      buscarUsuarioPorId(usuarioId).then((responseUsuario) => {
        expect(responseUsuario.status).to.eq(200);

        expect(responseUsuario.body).to.deep.include({
          nome: usuario.nome,
          email: usuario.email,
          administrador: usuario.administrador,
          _id: usuarioId,
        });
      });
    });
  });
});
