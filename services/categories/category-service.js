import useAxios from '../../hooks/useAxios/useAxios';
import AbstractManager from '../../src/core/managers/abstract-manager';

class CategoryService extends AbstractManager {
  async getAllCategories() {
    return await useAxios({
      method: 'get',
      url: '/category',
    });
  }

  async getCategoryById(id) {
    return await useAxios({
      method: 'post',
      url: `category/SingleCategory/`,
      body: JSON.stringify({
        id,
      }),
    });
  }
}
export default new CategoryService();
