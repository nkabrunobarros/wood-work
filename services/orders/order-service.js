import axios from 'axios';
const API_URL = 'http://localhost:3000/api/';

class OrderService {
  async getAllOrders() {
        return await axios.get(API_URL + 'order').then((response) => {
      return response;
    });
  }
}
export default new OrderService();
