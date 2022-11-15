import axios from "axios";
import { parseCookies } from "nookies";
import querys from "../../querys";
import { methods } from '../methods';

export async function clients(data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Link': '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      type: 'Owner'
    }

  };

  return await axios(config);


}

export async function client(data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.CLIENT,
      data
    },
    config
  );
}

export async function saveClient(data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'post',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.POST,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/ld+json',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    data,
  };

  return await axios(config);
}

//  Update Cliente
export async function updateClient(data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'post',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.UPDATE,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    data,
    params: {
      options: 'replace'
    }
  };

  return await axios(config);
}

//  Delete Cliente
export async function deleteClient(data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'delete',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.DELETE + data.id,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/ld+json',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    data,
  };

  return await axios(config);
}