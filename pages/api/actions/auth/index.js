import axios from 'axios';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import routes from '../../../../navigation/routes';

import { methods } from '../methods';

export async function loginClient (data) {
  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET, //  + `?type=Owner&q=email=="${data.email}"&q=password=="${data.password}"`

    headers: {
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      type: 'Owner',
    }
  };

  return await axios(config).then((res) => {
    const user = res.data.find(ele => ele.email?.value === data.email && ele.password?.value === data.password);

    const toEncode = {
      id: user.id,
      iat: 1516239022,
      exp: moment().unix()
    };

    const token = jwt.sign(toEncode, 'secret');

    if (user) return { data: { token, type: 'Owner' } };

    return { data: {}, success: false, message: 'User not found' };
  }).catch(() => {
    return { data: {}, success: false, message: 'User not found' };
  });
}

export async function me (data) {
  const { auth_token: token } = parseCookies();
  const decoded = jwt.decode(data.token);

  if (data?.type?.toLowerCase() === 'worker') {
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
        id: decoded.id
      }
    };

    const res = await axios(config);

    return res;
  }

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
      id: decoded.id
    }
  };

  return await axios(config);
}

export async function logout () {
  const userType = JSON.parse(localStorage.getItem('user'))?.type;

  destroyCookie(null, 'auth_token');

  // localStorage.removeItem('user');

  if (userType === 'Owner' || userType === undefined) Router.push(routes.public.signIn);
  else Router.push(routes.public.signInInternal);
}
