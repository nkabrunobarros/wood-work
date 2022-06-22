import useAxios from '../../hooks/useAxios/useAxios';

class StockService {
  async getAllStocks() {
    return await useAxios({
      method: 'get',
      url: '/stock',
    });
  }

  async getStockById(id) {
    return await useAxios({
      method: 'post',
      url: `/stock/SingleStock/`,
      body: JSON.stringify({
        id,
      }),
    });
  }
}
export default new StockService();
