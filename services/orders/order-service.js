import useAxios from '../../hooks/useAxios/useAxios';

class OrderService {
  async getAllOrders() {
    return await useAxios({
      method: 'get',
      url: '/order',
    });
  }

  async getOrderById(id) {
    return await useAxios({
      method: 'post',
      url: `/order/SingleOrder/`,
      body: JSON.stringify({
        id,
      }),
    });
  }
}

export default new OrderService();
