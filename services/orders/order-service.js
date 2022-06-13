import axios from "axios";
const API_URL = "http://localhost:3000/api/";

class OrderService {
  async getAllOrders() {
    return await axios.get(API_URL + "order").then((response) => {
      return response;
    });
  }

  async getOrderById(id) {
    return await axios
      .post(API_URL + "order/SingleOrder/", { id })
      .then((data) => {
        return data;
      });
  }
}
export default new OrderService();
