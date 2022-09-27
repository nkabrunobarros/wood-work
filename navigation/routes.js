const routes = {
  private: {
    internal: {
      signIn: '/internal/signin/',

      clients: '/internal/clients',
      client: '/internal/client/',
      editClient: '/internal/edit-client/',
      newClient: '/internal/new-client/',

      users: '/internal/users',
      user: '/internal/user/',
      newUser: '/internal/new-user',
      editUser: '/internal/edit-user/',

      stocks: '/internal/stocks',
      stockId: '/internal/stock/',

      ordersSimilar: '/internal/orders-similar',
      orders: '/internal/orders',
      order: '/internal/order/',
      newOrder: '/internal/new-order',
      editOrder: '/internal/edit-order/',
      
      messages: '/internal/messages/',
      profile: '/profile/',
    },
    //  Pages shared
    terms: '/terms',
    tos: '/tos',
    orders: '/orders',
    order: '/order/',
    profile: '/profile/',
    messages: '/messages',
  },
  public: {
    forgotPassword: '/forgot-password',
    signIn: '/',
  }
}

export default routes
