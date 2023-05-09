const routes = {
  private: {
    internal: {
      clients: '/internal/clients',
      client: '/internal/client/',
      editClient: '/internal/edit-client/',
      newClient: '/internal/new-client',

      workers: '/internal/workers',
      worker: '/internal/worker/',
      newWorker: '/internal/new-worker',
      editWorker: '/internal/edit-worker/',

      stocks: '/internal/stocks',
      stock: '/internal/stock/',
      editStock: '/internal/edit-stock/',

      projectsSimilar: '/internal/projects-similar',
      projects: '/internal/projects',
      project: '/internal/project/',
      budget: '/internal/budget/',
      editBudget: '/internal/edit-budget/',
      newProject: '/internal/new-project',
      editProject: '/internal/edit-project/',

      messages: '/internal/messages',
      profile: '/internal/account',
      error: '/404',

      packing: '/internal/packing',

      leftovers: '/internal/leftovers',

      dashboards: '/internal/dashboards',

      factoryLevel: '/internal/factory',

      assemblys: '/internal/assemblys'
    },
    //  Pages shared
    terms: '/terms',
    privacy: '/privacy',
    tos: '/tos',
    projects: '/projects',
    project: '/project/',
    budget: '/budget/',
    profile: '/account',
    messages: '/messages',
    error: '/404',
  },
  public: {
    //  client
    signIn: '/',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    accountActivation: '/account-activation',
    //  Internal
    signInInternal: '/signin',
    forgotPasswordInternal: '/forgotPassword',
    resetPasswordInternal: '/resetPassword',
  }
};

export default routes;
