import useAxios from '../../hooks/useAxios/useAxios';

class UserService {
  async getAllUsers() {
    return await useAxios({
      method: 'get',
      url: '/user',
    });
  }

  async getUserById(id) {
    return await useAxios({
      method: 'post',
      url: `/user/SingleUser/`,
      body: JSON.stringify({
        id,
      }),
    });
  }
}
export default new UserService();
