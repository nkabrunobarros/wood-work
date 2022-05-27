function getUsers () {
  const users = [
    {
      id: 1,
      name: 'Bruno Barros',
      password: '123456',
      email: 'bruno.barros@nka.pt',
      permission: 'Administrador',
      status: 'Ativo',
      cellphone: '939921227',
      phoneCode: '+351',
      phone: '258258258',
      address: 'Rua do quintal, Nº 47',
      country: 'Portugal'
    },
    {
      id: 2,
      name: 'João Magalhães',
      email: 'joao.magalhaes@nka.pt',
      password: '123456',
      permission: 'Client',
      status: 'Ativo',
      cellphone: '939921227',
      phoneCode: '+351',
      phone: '258258258',
      address: 'Rua do quintal, Nº 47',
      country: 'Portugal'
    }
  ]
  return users
}
export default getUsers
