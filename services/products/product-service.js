import axios from "axios";
const API_URL = "http://localhost:3000/api/";

class ProductService {
  async getAllProducts() {
    return await axios.get(API_URL + "product").then((response) => {
      return response;
    });
  }

  async getProductById(id) {
    return await axios
      .post(API_URL + "product/SingleProduct/", { id })
      .then((data) => {
        return data;
      });
  }
}
export default new ProductService();
