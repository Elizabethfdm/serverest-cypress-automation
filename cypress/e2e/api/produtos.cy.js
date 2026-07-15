import { gerarProduto } from '../../factories/produtoFactory';
import { gerarUsuario } from '../../factories/usuarioFactory';

import { realizarLogin } from '../../services/loginService';

import {
  cadastrarUsuario,
  excluirUsuario,
} from '../../services/usuarioService';

import {
  buscarProdutoPorId,
  cadastrarProduto,
  excluirProduto,
} from '../../services/produtoService';

describe('API de produtos', () => {
  let usuarioId;
  let produtoId;
  let token;

  afterEach(() => {
    if (produtoId && token) {
      excluirProduto(produtoId, token).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });

      produtoId = undefined;
    }

    if (usuarioId) {
      excluirUsuario(usuarioId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });

      usuarioId = undefined;
    }
  });

  it('deve cadastrar um novo produto com sucesso', () => {
    const usuarioAdministrador = gerarUsuario({
      administrador: 'true',
    });

    const produto = gerarProduto();

    cadastrarUsuario(usuarioAdministrador).then((responseCadastroUsuario) => {
      expect(responseCadastroUsuario.status).to.eq(201);

      usuarioId = responseCadastroUsuario.body._id;

      realizarLogin(usuarioAdministrador).then((responseLogin) => {
        expect(responseLogin.status).to.eq(200);
        expect(responseLogin.body.authorization).to.be.a('string').and.not.be
          .empty;

        token = responseLogin.body.authorization;

        cadastrarProduto(produto, token).then((responseCadastroProduto) => {
          expect(responseCadastroProduto.status).to.eq(201);
          expect(responseCadastroProduto.body.message).to.eq(
            'Cadastro realizado com sucesso',
          );

          expect(responseCadastroProduto.body._id).to.be.a('string').and.not.be
            .empty;

          produtoId = responseCadastroProduto.body._id;

          buscarProdutoPorId(produtoId).then((responseConsultaProduto) => {
            expect(responseConsultaProduto.status).to.eq(200);

            expect(responseConsultaProduto.body).to.deep.include({
              nome: produto.nome,
              preco: produto.preco,
              descricao: produto.descricao,
              quantidade: produto.quantidade,
              _id: produtoId,
            });
          });
        });
      });
    });
  });
});
