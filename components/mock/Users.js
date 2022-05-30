async function getUsers () {
  const users = [
    {
      id: 1,
      nome: 'Bruno Barros',
      password: '123456',
      email: 'bruno.barros@nka.pt',
      perfil: 'Administrador',
      status: 'Ativo',
      telemovel: '939921227',
      codigo: '+351',
      telefone: '258258258',
      morada: 'Rua do quintal, Nº 47',
      pais: 'Portugal'
    },
    {
      id: 2,
      nome: 'João Magalhães',
      email: 'joao.magalhaes@nka.pt',
      password: '123456',
      perfil: 'Client',
      status: 'Ativo',
      celltelefone: '939921227',
      codigo: '+351',
      phone: '258258258',
      morada: 'Rua do quintal, Nº 47',
      pais: 'Portugal'
    }
  ]
  return users
}
export { getUsers }
