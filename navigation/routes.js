const routes = {
  private: {
    internal: {
      signIn: '/internal/signin',
      clients: '/internal/clients',
      users: '/internal/users',
      stock: '/internal/stock',
      stockId: '/internal/stock/',
      ordersSimilar: '/internal/orders-similar',
      orders: '/internal/orders',
      order: '/internal/order/',
      messages: '/internal/messages',

    },
    //  Pages shared
    terms: '/terms',
    tos: '/tos',
    orders: '/orders',
    order: '/order/',
    profile: '/profile',
    messages: '/messages',
  },
  public: {
    internal: {
      signInClient: '/signin'
    },
    forgotPassword: '/forgot-password',
    signIn: '/',
  }
}

export default routes
