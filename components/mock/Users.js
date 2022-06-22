import hasData from '../utils/hasData';

async function getUsers() {
  const users = [
    {
      id: 1,
      nome: 'Bruno Barros',
      password: '123456',
      email: 'bruno.barros@nka.pt',
      perfil: 'internal',
      status: 'Ativo',
      codigo: '+351',
      telefone: '258258258',
      phone: '258258258',
      morada: 'Rua do quintal, Nº 47',
      pais: 'Portugal',
    },
    {
      id: 2,
      nome: 'João Magalhães',
      email: 'joao.magalhaes@nka.pt',
      password: '123456',
      perfil: 'Client',
      status: 'Ativo',
      telefone: '939921227',
      codigo: '+351',
      phone: '258258258',
      morada: 'Rua do quintal, Nº 47',
      pais: 'Portugal',
    },
    {
      id: 3,
      nome: 'Im the captain now',
      email: 'admin@nka.pt',
      password: '123456',
      perfil: 'internal',
      status: 'Ativo',
      telefone: '939921227',
      codigo: '+351',
      phone: '258258258',
      morada: 'Rua do quintal, Nº 47',
      pais: 'Portugal',
    },
  ];
  return users;
}

async function getUser(email) {
  const users = await getUsers();
  const foundUser = users.find((element) => element.email === email);
  return foundUser;
}
async function signIn(email, password) {
  const users = await getUsers();
  const foundUser = users.find(
    (element) => (element.email === email && element.password === password)
  );
  return foundUser;
}
async function getUserById(id) {
  const users = await getUsers();
  if (hasData(id)) {
    const foundUser = users.find(
      (element) => element.id.toString() === id.toString()
    );
    return foundUser;
  }
}
export { getUsers, getUser, signIn, getUserById };
