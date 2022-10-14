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
            tos
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
           status
          client {
            id
            email
            giveName
            legalName
            address
            status
            taxId
            telephone
            organization {
              id
            }
            otherData
            buysTo
            obs
            postalCode
          }
        createdBy {
          id
          nome    
          }
          status
          createdAt
          endAt
          startAt
          }
        }
      }
    `
  },
  ORDERS_PRODUCTION: {
    return: 'ordersProduction',
    query: `query OrdersProduction {
      ordersProduction {
        count
        data {
          id
          amount
          completed
          status
          product {
            id
            code
            name
            description
            cost
            craftTime
            woodtype {
              id
              description
            }
            category {
              id
              name
              code
            }
          }
          order {
            id
            client {
              id
              email
              giveName
              legalName
            }
            createdBy {
              id
              nome
            }
            status
            createdAt
            endAt
            startAt
          }
        }
      }
    }`
  },
  ORDER: {
    return: 'orderDetails',
    query: `query order ($id: String!) {
      orderDetails(id: $id) {
        id
        completed
        status
        amount
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
          code
        }
      }
      status
       order {
            id
           client {
            id
            email
            giveName
            legalName
            address
            status
            taxId
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
            obs
          }
           createdBy {
          id
          nome
          email
          ativo
          ativo
          tos
          telemovel
          telefone
          morada
          idPerfil
          obs
          paisCodigo
        }
           status
           createdAt
           endAt
           startAt
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
                code
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
                    code
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
                description
                cost
                craftTime
                category {
                  id
                  name
                  code
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
                tos
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
            tos
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
          tos
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
          status
          createdAt
          endAt
          startAt
      } 
    }`
  },
  SAVE_ORDER_DETAILS: {
    return: 'saveOrderDetails',
    query: `mutation saveOrderDetails ($input: OrderDetailsInput!) {
      saveOrderDetails (saveOrderData: $input) {
        id
        product {id}
        order {id}
        status
      } 
    }`
  },
  SAVE_FILE: {
    return: 'saveFicheiro',
    query: `mutation saveFicheiro ($input: FicheiroInput!) {
      saveFicheiro(saveFicheiroData: $input ) {
          id
          descricao
          url
          data
          filesize
          filename
          dataCriacao
      }
    }`
  },
  REMOVE_FILE: {
    return: 'removeFicheiro',
    query: `mutation removeFile ($id: String!) {
      removeFicheiro (id: $id ) {
        id
        descricao
        url
        filename
        filesize
        dataCriacao
      }
    }`
  },
  FILES: {
    return: 'ficheiros',
    query: `query ficheiros ($id: String!) {
      ficheiros (where: {folderId: { contains: $id}}){
        count
        data {
          id
          descricao
          url
          data
          filename
          filesize
          dataCriacao
        }
      }
    }`
  },
  ORDER_FOLDERS: {
    return: 'folders',
    query: `query Folders ($id: String!) {
      folders (where: {orderDetailId: { contains: $id}}){
        count
        data {
          id
          name
          orderDetailId
          orderDetail { 
            id
            product {
              id
              code
            }
            status
            amount
            completed
          }
        }
      }
    }`
  },
  SAVE_FOLDER: {
    return: 'saveFolder',
    query: `mutation SaveFolder ($input: FolderInput!) {
      saveFolder ( saveFolderData: $input) {
        id
        name
        orderDetailId
        orderDetail {
          id
        }
      }
    }`
  },
}

export default querys;