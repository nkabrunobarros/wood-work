import axios from "axios";
const API_URL = "http://localhost:3000/api/";

class WoodTypeService {
  async getAllWoodTypes() {
    return await axios.get(API_URL + "woodtype").then((response) => {
      return response;
    });
  }

     async getWoodTypeById(id) {
       return await axios
         .post(API_URL + "woodtype/SingleWoodType/", { id })
         .then((data) => {
           return data;
         });
     }
}
export default new WoodTypeService();
