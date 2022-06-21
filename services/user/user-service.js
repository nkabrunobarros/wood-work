import axios from 'axios';
import useAxios from '../../hooks/useAxios/useAxios';
const API_URL = 'http://localhost:3000/api/';

class UserService {
  async getAllUsers() {
    const response = await useAxios({
      method: 'post',
      url: '/user',
    });
    return response

    // return await axios.get(API_URL + 'user').then((response) => {
    //   return response;
    // });
  }

  async getUserById(id) {
    return await axios
      .post(API_URL + 'user/SingleUser/', { id })
      .then((data) => {
        return data;
      });
  }
}
export default new UserService();
