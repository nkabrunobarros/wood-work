import useAxios from '../../hooks/useAxios/useAxios';

class ProductService {
  async getAllProducts() {
    return await useAxios({
      method: 'get',
      url: '/product',
    });
  }

  async getProductById(id) {
    return await useAxios({
      method: 'post',
      url: `/product/SingleProduct/`,
      body: JSON.stringify({
        id,
      }),
    });
  }
}
export default new ProductService();
