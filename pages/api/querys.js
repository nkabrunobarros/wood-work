const querys = {
  LOGIN: {
    return: 'login',
    query: `query login ($input: LoginInput!) {
            login (input: $input) {
                token
            }
        }
        `
  },
  ME: {
    return: 'utilizador',
    query: `query utilizador($id: String!) {
          utilizador (id: $id){
            id
            nome
            email
            ativo
            idPerfil
            telemovel
            telefone
            telefone
            morada
            paisCodigo
            pais {
              codigo
              descricao
            }
            perfil {
              id
              descricao
              permissoes {
                sujeito
                accao
              }
            }
          }
        }`
  },
  PERMISSIONS:
  {
    return: 'perfil',
    query: `query perfil($id: String!) {
            perfil (id: $id) {
               id
              descricao
              permissoes {sujeito accao}
            }
          }`
  },
  ORDERS: {
    return: 'orders',
    query: `query Orders {
            orders {
              count
              data {
                id
                product {
                  id
                  code
                  name
                  cost
                  craftTime
                  category {
                    id
                    name
                  }
                  woodtype {
                    id
                    description
                  }
                }
                status
                orderedBy
              }
            }
          }`
  },
  ORDER: {
    return: 'order',
    query: `query order ($id: String!) {
          order (id: $id) {
            id
            product {
              id
              code
              name
              cost
              craftTime
              woodtype {
                id
                description
              }
              category {
                id
                name
              }
              
            }
            status
            orderedBy
          }
        }`
  },
  CATEGORIES: {
    return: 'categories',
    query: `query Categories {
            categories {
              count
              data {
                id
                name
              }
            }
          }
        `
  },
  CLIENTS: {
    return: 'clients',
    query: `
        query Clients {
            clients {
              count
              data {
                id
                email
                giveName
                legalName
                address
                status
                contact
                postalCode
                taxId
                telephone
                organization {
                  id
                  legalName
                  taxId
                  ssnId
                  address
                  email
                  telephone
                }
                otherData
                obs
              }
            }
          }
        `
  },
  CLIENT: {
    return: 'client',
    query: `
        query Client($id: String!) {
          client (id: $id){
            id
            email
            giveName
            legalName
            address
            status
            taxId
            postalCode
            telephone
            contact
            organization {
              id
              legalName
              taxId
              ssnId
              address
              email
              telephone
            }
            otherData
            buysTo
            obs
          }
        }
        `
  },
  SAVE_CLIENT: {
    return: 'saveClient',
    query: `mutation saveClient ($input: ClientInput!) {
        saveClient (saveClientData: $input) {
           id
            email
            giveName
            legalName
            address
            status
            obs
            postalCode
            buysTo
            otherData
            contact
            organization {
              id
              legalName
              taxId
              ssnId
              address
              email
              telephone
            }
            telephone
            taxId
          }
    }`
  },
  STOCK: {
    return: 'stock',
    query: `query stock($id: String!) {
          stock (id: $id) {
            id
            supplier
            amount
            productId
            product {
              id
              code
              name
              cost
              craftTime
              woodtype {
                id
                description
              }
              category {
                id
                name
              }
              
            }
          }
        }`
  },
  STOCKS: {
    return: 'stocks',
    query: `query Stocks {
            stocks {
              count
              data {
                id
                productId
                product {
                  id
                  code
                  name
                  cost
                  craftTime
                  category {
                    id
                    name
                  }
                  woodtype {
                    id 
                    description
                  }
                }
                supplier
                amount
              }
            }
          }`
  },
  PRODUCTS: {
    return: 'products',
    query: `query Products {
            products {
              count
              data {
                     id
                code
                name
                cost
                craftTime
                category {
                  id
                  name
                }
                woodtype {
                  id
                    description
                }
              }
            }
          }`
  },
  COUNTRIES: {
    return: 'paises',
    query: `query paises {
          paises {
            count
            data {
              codigo
              descricao
            }
          }
        }`
  },
  WOODTYPES: {
    return: 'woodTypes',
    query: `query woodtypes {
          woodTypes {
            count
            data {
              id
              description
            }
          }
        }`
  },
  USERS: {
    return: 'utilizadores',
    query: `query utilizadores {
          utilizadores {
           count
            data {
                 id
                nome
                email
                ativo
                idPerfil
                telemovel
                telefone
                telefone
                morada
                obs
                paisCodigo
                pais {
                  codigo
                  descricao
                }
                perfil {
                  descricao
                  id
                  permissoes {
                    sujeito
                    accao
                  }
                }
            }
          }
        }`
  },
  SAVE_USER: {
    return: 'saveUtilizador',
    query: `mutation saveUtilizador ($input: UtilizadorInput!) {
        saveUtilizador (saveUtilizadorData: $input) {
            id		
            email
            ativo
            nome
            obs
            telemovel
            telefone
            morada
            paisCodigo
            idPerfil
        }
    }`
  },
  PERFIS: {
    return: 'perfis',
    query: `query perfis{
        perfis {
           count
          data {
            id
            descricao
          }
        }
      }`
  },
  USER: {
    return: 'utilizador',
    query: `query utilizador($id: String!) {
        utilizador (id: $id){
          id
          nome
          email
          ativo
          idPerfil
          telemovel
          telefone
          telefone
          morada
          paisCodigo
          obs
          pais {
            codigo
            descricao
          }
          perfil {
            id
            descricao
            permissoes {
              sujeito
              accao
            }
          }
        }
      }`
  },
  SAVE_ORDER: {
    return: 'saveOrder',
    query: `mutation saveOrder ($input: OrderInput!) {
        saveOrder (saveOrderData: $input) {
          id
          product {
            id
            code
            name
            cost
            craftTime
            woodtype {
              id
              description
            }
            category {
              id
              name
            }
          }
          status
          orderedBy
      } 
    }`
  }
}

export default querys;