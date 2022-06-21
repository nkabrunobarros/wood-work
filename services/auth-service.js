import axios from 'axios';
import hasData from '../components/utils/hasData';
import jwt from 'jsonwebtoken';
import Decode from '../components/utils/Decode';

const API_URL = 'http://localhost:3000/api/';

class AuthService {
  async login(email, password) {
    return await axios
      .post(API_URL + 'login', {
        email,
      })
      .then((response) => {
        if (response.data.data) {
          const user = {
            id: response.data.data.id,
          };
          const token = jwt.sign(user, '123456', {
            expiresIn: 60 * 3, // expires in 3 hours
          });
          console.log(token);
          localStorage.setItem('token', JSON.stringify(token));
          sessionStorage.setItem('token', JSON.stringify(token));
          return response;
        }
        return response;
      });
  }

  logout() {
    localStorage.setItem('token', null);
    sessionStorage.setItem('token', null);
  }

  register(email, password) {
    return axios.post(API_URL + 'signup', {
      email,
      password,
    });
  }

  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem('token'));
  // }

  async getCurrentUser() {
    const decoded = Decode(localStorage.token)
    const id = decoded.payload.id;
    if (!hasData(decoded)) return false;
    return await axios.post(API_URL + 'user/SingleUser/', { id });
  }
}
export default new AuthService();
