import axios from 'axios';
import { parseCookies } from 'nookies';
import querys from '../../querys';

export async function perfis (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token ? `Bearer ${token}` : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsMTZvOWNhZzAwMDB4M3RxcDhsYnNsY3IiLCJpYXQiOjE2NjkyMjQ1NTYsImV4cCI6MTY2OTI2MDU1Nn0.nieZgvK0LIxgOfEY3HK_yGlWpU_NZOHCkq-ixNVELKw' },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.PERFIS,
      data
    },
    config
  );
}
