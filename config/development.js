'use strict';

/**
 * Export default configuration.
 */

module.exports = {
  nock: {
    enabled: true,
    whitelist: '(127.0.0.1|localhost)'
  },
  uploads: {
    accountName: 'devstoreaccount1',
    accessKey: 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==',
    connectionString:
      'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;',
    resourcesUrl: '127.0.0.1:10000'
  }
};
