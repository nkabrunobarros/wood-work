import useAxios from '../../hooks/useAxios/useAxios';

class ClientService {
  async getAllClients() {
    return await useAxios({
      method: 'get',
      url: '/client',
    });
  }

  async getClientById(id) {
    return await useAxios({
      method: 'post',
      url: `/client/SingleClient/`,
      body: JSON.stringify({
        id,
      }),
    });
  }
}
export default new ClientService();
