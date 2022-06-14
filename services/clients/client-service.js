import axios from "axios";
// import abstractManager from "../../src/core/managers/abstract-manager";
const API_URL = "http://localhost:3000/api/";



class ClientService {
  async getAllClients() {
    return await axios.get(API_URL + "client").then((response) => {
      return response;
    });
  }

 async getClientById(id) {
   return await axios
     .post(API_URL + "client/SingleClient/", { id })
     .then((data) => {
       return data;
     });
 }
}
export default new ClientService();
