import axios from 'axios';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { methods } from '../methods';

//  Get Budgets
export async function budgets () {
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
      type: 'Budget',
      limit: 100,
      q: 'aprovedDate==""',

    }

  };

  return await axios(config);
}

//  Get Budgets
export async function allBudgets () {
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
      type: 'Budget',
      limit: 1000
    }

  };

  return await axios(config);
}

//  Get a Budget
export async function budget (data) {
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

//  Get my Budgets
export async function myBudgets () {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,
    // `?q=belongsTo=="${jwt.decode(token).id}}"%26aprovedDate==""`,

    // `?q=belongsTo=="${jwt.decode(token).id}"&aprovedDate==""`,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      q: `belongsTo=="${jwt.decode(token).id}"&aprovedDate==""`,
      type: 'Budget',
      limit: 50
    }
  };

  return await axios(config);
}

//  Create Budget
export async function saveBudget (data) {
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

//  Update Budget
export async function updateBudget (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'post',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.UPDATE,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>; rel="http://www.w4.org/ns/json-ld#context"; type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    data,
    params: {
      options: 'replace'
    }
  };

  return await axios(config);
}

//  Delete Budget
export async function deleteBudget (data) {
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
