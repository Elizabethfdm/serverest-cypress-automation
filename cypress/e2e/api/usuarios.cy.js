import { gerarUsuario } from '../../factories/usuarioFactory';
import {
  buscarUsuarioPorId,
  cadastrarUsuario,
  excluirUsuario,
} from '../../services/usuarioService';

describe('API de usuários', () => {
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

    cadastrarUsuario(usuario).then((responseCadastro) => {
      expect(responseCadastro.status).to.eq(201);
      expect(responseCadastro.body.message).to.eq(
        'Cadastro realizado com sucesso',
      );
      expect(responseCadastro.body._id).to.be.a('string').and.not.be.empty;

      usuarioId = responseCadastro.body._id;

      buscarUsuarioPorId(usuarioId).then((responseConsulta) => {
        expect(responseConsulta.status).to.eq(200);
        expect(responseConsulta.body).to.deep.include({
          nome: usuario.nome,
          email: usuario.email,
          password: usuario.password,
          administrador: usuario.administrador,
          _id: usuarioId,
        });
      });
    });
  });
});