import axios from 'axios';
import { parseCookies } from 'nookies';
import querys from '../../querys';
import { methods } from '../methods';

export async function users (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.USERS,
      data
    },
    config
  );
}

export async function userById (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.USER,
      data
    },
    config
  );
}

export async function saveUser (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.SAVE_USER,
      data: { input: data }
    },
    config
  );
}

//  Update Client
export async function updateClient (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'post',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.UPDATE,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/ld+json',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    data,
    params: {
      options: 'replace'
    }
  };

  return await axios(config);
}
