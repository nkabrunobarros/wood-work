import axios from 'axios';
const API_URL = 'http://localhost:3000/api/';

class CountryService {
  async getAllCountries() {
    return await axios.get(API_URL + 'country').then((response) => {
      return response;
    });
  }

  async getCountryById(id) {
    return await axios
      .post(API_URL + 'country/SingleCountry/', { id })
      .then((data) => {
        return data;
      });
  }
}
export default new CountryService();
