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
              telemovel
              telefone
              morada
              ativo
              paisCodigo
              idPerfil
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
                categoryId
              }
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
                taxid
                telephone
                organization {
                  id
                  legalName
                  taxid
                  ssnid
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
}

export default querys;