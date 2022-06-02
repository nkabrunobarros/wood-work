function getClients() {
  const clients = [
    {
      id: 1,
      nome: 'Constrea, Lda.',
      pais: 'Portugal',
      email: 'Constrea@gmail.com',
      contactName: 'Rui Carvalho',
      telemovel: '939921227',
      address: 'Rua Engenheiro Arantes e Oliveira, Nº17 - ',
      postalCode: '4700-501',
      nif: '518479658',
      obs: 'no obs',
      otherData: 'Empresa de construção',
    },
    {
      id: 2,
      nome: 'Nka, Lda.',
      pais: 'Portugal',
      email: 'nka@nka.pt',
      contactName: 'João magalhaes',
      telemovel: '939921227',
      address: 'Rua Engenheiro Arantes e Oliveira, Nº17 - ',
      postalCode: '4700-501',
      nif: '518479658',
      obs: 'no obs',
      otherData: 'Empresa de sofware dev',
    },
  ];
  return clients;
}

function getClient(id) {
  const clients = getClients()
  const foundClient = clients.find(element => element.id.toString() === id.toString())

  return foundClient;
}
export { getClients, getClient };
