'use strict';

/**
 * Export test configuration.
 */

module.exports = {
  database: {
    connection: {
      database: 'test'
    }
  },
  email: {
    delay: 1
  },
  token: {
    session: {
      duration: {
        unit: 'seconds',
        value: 5
      }
    }
  },
  uploads: {
    accountName: 'devstoreaccount1',
    accessKey: 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==',
    connectionString:
      'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;',
    resourcesUrl: '127.0.0.1:10000'
  }
};
