'use strict';

/**
 * Export default configuration.
 */

module.exports = {
  authorization: {
    password: {
      minLength: 6,
      saltLength: 8
    }
  },
  cors: {
    credentials: true
  },
  database: {
    client: 'postgres',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '123456',
      database: 'development',
      charset: 'utf8'
    }
  },
  email: {
    delay: 500,
    errorReportingEmail: 'friends@theopshub.com',
    key: 'foo',
    secret: 'bar',
    templates: {
      operationCompleted: {
        id: 1115209
      },
      taskCompleted: {
        id: 1115038
      },
      taskReady: {
        id: 1115039
      },
      userResetPassword: {
        id: 1803289,
        path: 'password/reset'
      },
      userResetPasswordSucceed: {
        id: 1803285
      },
      welcome: {
        id: 1113681
      }
    }
  },
  nock: {
    enabled: false
  },
  reset: {
    unit: 'month',
    value: 1
  },
  router: {
    cutoverBaseUrl: 'http://localhost:3000'
  },
  server: {
    api: {
      listen: {
        hostname: '0.0.0.0',
        port: 4001
      }
    }
  },
  token: {
    session: {
      duration: {
        unit: 'hour',
        value: 1
      },
      secret: 'foo'
    }
  },
  uploads: {
    containerName: 'cutover-files',
    filters: {
      document: ['application/pdf', 'application/vnd.ms-excel'],
      image: ['image/jpeg', 'image/png']
    },
    maxFiles: 5,
    maxSize: 12000000,
    resourcesUrl: 'blob.core.windows.net',
    ssl: false,
    timeout: 60 * 1000
  }
};
