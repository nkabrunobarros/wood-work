import axios from 'axios';
import { parseCookies } from 'nookies';
import { methods } from '../methods';

//  Get all workers
export async function workers () {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      type: 'Worker'
    }
  };

  return await axios(config);
}

//  Get 1 worker
export async function worker (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      id: data.id
    }
  };

  return await axios(config);
}

//  Create Worker
export async function createWorker (data) {
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

//  Update Worker
export async function updateWorker (data) {
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

//  Delete Worker
export async function deleteWorker (data) {
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
