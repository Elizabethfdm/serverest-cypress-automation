import { faker } from '@faker-js/faker';

export function gerarUsuario({
  nome,
  email,
  password,
  administrador = 'false',
} = {}) {
  return {
    nome: nome ?? faker.person.fullName(),
    email: email ?? faker.internet.email().toLowerCase(),
    password: password ?? faker.internet.password({ length: 10 }),
    administrador,
  };
}
