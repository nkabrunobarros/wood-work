import useAxios from '../../hooks/useAxios/useAxios';

class CountryService {
  async getAllCountries() {
    return await useAxios({
      method: 'get',
      url: '/country',
    });
  }

  async getCountryById(id) {
    return await useAxios({
      method: 'post',
      url: `country/SingleCountry/`,
      body: JSON.stringify({
        id,
      }),
    });
  }
}
export default new CountryService();
