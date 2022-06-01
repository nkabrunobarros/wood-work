import axios from 'axios';
const API_URL = 'http://localhost:3000/api/';
class AuthService {
  async login(email, password) {
    return await axios
      .post(API_URL + 'login', {
        email,
      })
      .then((response) => {
        if (response.data.data) {
          localStorage.setItem('user', JSON.stringify(response.data.data.email).substring(1, response.data.data.email.length - 1));
          sessionStorage.setItem('user', JSON.stringify(response.data.data.email).substring(1, response.data.data.email.length - 1));
          return response;
        }
        return response;
      });
  }

  logout() {
    localStorage.setItem('user', null);
    sessionStorage.setItem('user',null);
  }

  register(email, password) {
    return axios.post(API_URL + 'signup', {
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new AuthService();
