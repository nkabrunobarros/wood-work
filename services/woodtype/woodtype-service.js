import useAxios from '../../hooks/useAxios/useAxios';

class WoodTypeService {
  async getAllWoodTypes() {
    // return await axios.get(API_URL + 'woodtype').then((response) => {
    //   return response;
    // });
    return await useAxios({
      method: 'get',
      url: '/woodtype',
    });
  }

  async getWoodTypeById(id) {
    return await useAxios({
      method: 'post',
      url: 'woodtype/SingleWoodType/',
      body: JSON.stringify({
        id
      })
    });
    
    // return await axios
    //   .post(API_URL + 'woodtype/SingleWoodType/', { id })
    //   .then((data) => {
    //     return data;
    //   });
  }
}
export default new WoodTypeService();
