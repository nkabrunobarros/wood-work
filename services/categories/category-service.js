import axios from 'axios';
import AbstractManager from '../../src/core/managers/abstract-manager';
const API_URL = 'http://localhost:3000/api/';
class CategoryService extends AbstractManager {
  async getAllCategories() {
    return await axios.get(API_URL + 'category').then((response) => {
      return response;
    });
  }

  async getCategoryById(id) {
    return await axios
      .post(API_URL + 'order/SingleCategory/', { id })
      .then((data) => {
        return data;
      });
  }
}
export default new CategoryService();
