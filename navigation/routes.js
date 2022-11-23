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
      stockId: '/internal/stock/',

      projectsSimilar: '/internal/projects-similar',
      projects: '/internal/projects',
      project: '/internal/project/',
      newProject: '/internal/new-project',
      editProject: '/internal/edit-project/',

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
    projects: '/projects',
    project: '/project/',
    profile: '/profile/',
    messages: '/messages',
    error: '/404',
  },
  public: {
    //  client
    signIn: '/',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    //  Internal
    signInInternal: '/signin',
    forgotPasswordInternal: '/forgotPassword',
    resetPasswordInternal: '/resetPassword',
  }
};

export default routes;
