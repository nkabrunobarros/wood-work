const routes = {
  private: {
    internal: {
      signIn: '/internal/signin/',

      clients: '/internal/clients',
      client: '/internal/client/',
      editClient: '/internal/edit-client/',
      newClient: '/internal/new-client',

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

      messages: '/internal/messages',
      profile: '/internal/profile/',
      error: '/404',

      leftovers: '/internal/leftovers',

      dashboards: '/internal/dashboards',

      factoryLevel: '/internal/factory'
    },
    //  Pages shared
    terms: '/terms',
    tos: '/tos',
    orders: '/orders',
    order: '/order/',
    profile: '/profile/',
    messages: '/messages',
    error: '/404',
  },
  public: {
    forgotPassword: '/forgot-password',
    signIn: '/',
    signInInternal: '/signin',
  }
};

export default routes;
