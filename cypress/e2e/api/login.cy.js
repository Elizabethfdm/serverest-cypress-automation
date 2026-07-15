import { gerarUsuario } from '../../factories/usuarioFactory';
import {
  cadastrarUsuario,
  excluirUsuario,
} from '../../services/usuarioService';
import { realizarLogin } from '../../services/loginService';

describe('API de login', () => {
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

  it('deve realizar login com sucesso', () => {
    const usuario = gerarUsuario();

    cadastrarUsuario(usuario).then((responseCadastro) => {
      expect(responseCadastro.status).to.eq(201);

      usuarioId = responseCadastro.body._id;

      realizarLogin(usuario).then((responseLogin) => {
        expect(responseLogin.status).to.eq(200);
        expect(responseLogin.body.message).to.eq('Login realizado com sucesso');
        expect(responseLogin.body.authorization).to.be.a('string').and.not.be
          .empty;
      });
    });
  });
});
