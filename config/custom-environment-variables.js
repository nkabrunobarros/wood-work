'use strict';

/**
 * Export custom environment variables configuration.
 */

module.exports = {
  cors: {
    credentials: 'CORS_CREDENTIALS'
  },
  database: {
    connection: {
      database: 'DATABASE_NAME',
      host: 'DATABASE_HOST',
      password: 'DATABASE_PASSWORD',
      user: 'DATABASE_USER'
    }
  },
  email: {
    delay: 'EMAIL_DELAY',
    key: 'EMAIL_KEY',
    secret: 'EMAIL_SECRET',
    templates: {
      operationCompleted: {
        id: 'EMAIL_TEMPLATES_OPERATION_COMPLETED_ID'
      },
      taskApproved: {
        id: 'EMAIL_TEMPLATES_TASK_COMPLETED_ID'
      },
      taskReady: {
        id: 'EMAIL_TEMPLATES_TASK_READY_ID'
      },
      userResetPassword: {
        id: 'EMAIL_TEMPLATES_USER_RESET_PASSWORD_ID',
        path: 'EMAIL_TEMPLATES_USER_RESET_PASSWORD_PATH'
      },
      userResetPasswordSucceed: {
        id: 'EMAIL_TEMPLATES_USER_RESET_PASSWORD_SUCCEED_ID'
      },
      welcome: {
        id: 'EMAIL_TEMPLATES_WELCOME_ID'
      }
    }
  },
  server: {
    api: {
      listen: {
        hostname: 'SERVER_API_LISTEN_HOSTNAME',
        port: 'SERVER_API_LISTEN_PORT'
      }
    }
  },
  reset: {
    unit: 'RESET_UNIT',
    value: 'RESET_VALUE'
  },
  router: {
    cutoverBaseUrl: 'ROUTER_CUTOVER_BASE_URL'
  },
  token: {
    session: {
      secret: 'TOKEN_SESSION_SECRET'
    }
  },
  uploads: {
    connectionString: 'UPLOADS_CONNECTION_STRING',
    accessKey: 'UPLOADS_ACCESS_KEY',
    accountName: 'UPLOADS_ACCOUNT_NAME',
    containerName: 'UPLOADS_CONTAINER_NAME',
    maxFiles: 'UPLOADS_MAX_FILES',
    maxSize: 'UPLOADS_MAX_SIZE',
    resourcesUrl: 'UPLOADS_RESOURCES_URL',
    ssl: 'UPLOADS_SSL',
    timeout: 'UPLOADS_TIMEOUT'
  }
};
