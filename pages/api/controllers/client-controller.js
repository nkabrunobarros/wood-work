import clientService from '../../../services/clients/client-service';
module.exports = (app) => {
  // Get stores.
  app.get(
    'GET /clients',
    '/clients',
    //   authorize,   permission,
    async (context) => {
      const data = await clientService.getAllClients({
        where: { id: context.params.id },
      });
      
      context.body = { data };
    }
  );
};
