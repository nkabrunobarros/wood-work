import axios from 'axios';
const API_URL = 'http://localhost:3000/api/';

class UserService {
  async getAllUsers() {
    return await axios.get(API_URL + 'user').then((response) => {
      return response;
    });
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
