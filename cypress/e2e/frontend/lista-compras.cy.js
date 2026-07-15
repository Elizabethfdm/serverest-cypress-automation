import { gerarProduto } from '../../factories/produtoFactory';
import { gerarUsuario } from '../../factories/usuarioFactory';

import loginPage from '../../pages/LoginPage';
import listaComprasPage from '../../pages/ListaComprasPage';
import produtosPage from '../../pages/ProdutosPage';

import { realizarLogin } from '../../services/loginService';

import {
  buscarProdutoPorId,
  cadastrarProduto,
  excluirProduto,
} from '../../services/produtoService';

import {
  cadastrarUsuario,
  excluirUsuario,
} from '../../services/usuarioService';

describe('Lista de compras pelo frontend', () => {
  let usuarioAdministradorId;
  let usuarioComumId;
  let produtoId;
  let tokenAdministrador;

  afterEach(() => {
    if (produtoId && tokenAdministrador) {
      excluirProduto(produtoId, tokenAdministrador).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });

      produtoId = undefined;
    }

    if (usuarioComumId) {
      excluirUsuario(usuarioComumId).then((response) => {
        expect(response.status).to.eq(200);
      });

      usuarioComumId = undefined;
    }

    if (usuarioAdministradorId) {
      excluirUsuario(usuarioAdministradorId).then((response) => {
        expect(response.status).to.eq(200);
      });

      usuarioAdministradorId = undefined;
    }
  });

  it('deve adicionar um produto à lista de compras', () => {
    const usuarioAdministrador = gerarUsuario({
      administrador: 'true',
    });

    const usuarioComum = gerarUsuario();
    const produto = gerarProduto();

    cadastrarUsuario(usuarioAdministrador).then((responseAdministrador) => {
      expect(responseAdministrador.status).to.eq(201);
      usuarioAdministradorId = responseAdministrador.body._id;

      realizarLogin(usuarioAdministrador).then((responseLogin) => {
        expect(responseLogin.status).to.eq(200);

        tokenAdministrador = responseLogin.body.authorization;

        cadastrarProduto(produto, tokenAdministrador).then(
          (responseProduto) => {
            expect(responseProduto.status).to.eq(201);

            produtoId = responseProduto.body._id;

            cadastrarUsuario(usuarioComum).then((responseUsuarioComum) => {
              expect(responseUsuarioComum.status).to.eq(201);

              usuarioComumId = responseUsuarioComum.body._id;

              loginPage.acessar();
              loginPage.realizarLogin(
                usuarioComum.email,
                usuarioComum.password,
              );

              produtosPage.pesquisarProduto(produto.nome);
              produtosPage.validarProdutoVisivel(produto.nome);
              produtosPage.adicionarProdutoNaLista(produto.nome);

              listaComprasPage.validarPagina();
              listaComprasPage.validarProdutoNaLista(produto.nome);

              buscarProdutoPorId(produtoId).then((responseConsultaProduto) => {
                expect(responseConsultaProduto.status).to.eq(200);

                expect(responseConsultaProduto.body.nome).to.eq(produto.nome);
              });
            });
          },
        );
      });
    });
  });
});
