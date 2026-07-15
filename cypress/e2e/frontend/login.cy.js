import { gerarUsuario } from '../../factories/usuarioFactory';
import {
  cadastrarUsuario,
  excluirUsuario,
} from '../../services/usuarioService';

import loginPage from '../../pages/LoginPage';
import homePage from '../../pages/HomePage';

describe('Login pelo frontend', () => {
  let usuario;
  let usuarioId;

  beforeEach(() => {
    usuario = gerarUsuario();

    cadastrarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body._id).to.be.a('string').and.not.be.empty;

      usuarioId = response.body._id;
    });
  });

  afterEach(() => {
    if (usuarioId) {
      excluirUsuario(usuarioId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(
          'Registro excluído com sucesso',
        );
      });

      usuarioId = undefined;
    }
  });

  it('deve realizar login com sucesso', () => {
    loginPage.acessar();

    loginPage.realizarLogin(
      usuario.email,
      usuario.password,
    );

    homePage.validarPaginaInicial();
  });
});