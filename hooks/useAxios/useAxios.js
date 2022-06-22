// useAxios hook

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';

export default async function useAxios({
  url,
  method,
  body = null,
  headers = null,
}) {
  let response = null;
  let error = '';
  let loading = true;

  const token = JSON.parse(localStorage.getItem('token'));

  const fetchData = async () => {
    await axios[method](
      url,
      JSON.parse(body),
      JSON.stringify({ Authorization: 'Bearer ' + token })
    )
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        error = err;
      })
      .finally(() => {
        loading = false;
      });
  };

  await Promise.all([fetchData()]);
  return !loading ? response || error : null;
}
