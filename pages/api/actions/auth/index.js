import axios from 'axios';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import routes from '../../../../navigation/routes';

import { methods } from '../methods';

export async function login (data) {
  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,

    headers: {
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      type: 'Worker',
    }
  };

  const res = await axios(config);
  const user = res.data.find(ele => ele.email?.value === data.email && ele.password?.value === data.password);

  if (user) {
    const toEncode = {
      id: user?.id,
      iat: 1516239022
    };

    const encoded = jwt.sign(toEncode, 'secret');

    return { data: { token: encoded, type: 'Worker' } };
  }

  return { response: { data: { success: false, message: 'credenciais-invalidas' }, type: 'Worker' }, status: 404 };
}

export async function loginTest (data) {
  const config = {
    method: 'post',
    url: process.env.NEXT_PUBLIC_FRONT_TOKEN_URL,
    headers: {
      'Content-Type': 'application/json',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE,
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/context/ww4zero.context.jsonld>; type="application/ld+json"',

    },
    data: {
      ...data,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      scope: 'read',
      grant_type: 'password',
    },
  };

  try {
    return await axios(config).then((res) => {
      setCookie(undefined, 'auth_token', res.data.access_token);

      const user = {
        id: 'urn:ngsi-ld:Owner:ConstreaLda40',
        type: 'Owner',
        name: {
          type: 'Property',
          value: 'ConstreaLda40'
        },
        legalName: {
          type: 'Property',
          value: 'ConstreaLda40'
        },
        givenName: {
          type: 'Property',
          value: 'ConstreaLda40'
        },
        familyName: {
          type: 'Property',
          value: 'ConstreaLda40'
        },
        taxId: {
          type: 'Property',
          value: '263851884'
        },
        address: {
          type: 'Property',
          value: 'Bairro do sol, n2 Bragança 5300-442'
        },
        email: {
          type: 'Property',
          value: 'ConstreaLda40@gmail.com'
        },
        password: {
          type: 'Property',
          value: 'ConstreaLda40123'
        },
        active: {
          type: 'Property',
          value: 'True'
        },
        telephone: {
          type: 'Property',
          value: '934401111'
        },
        tos: {
          type: 'Property',
          value: 'True'
        },
        obs: {
          type: 'Property',
          value: 'As portas não podem ouvir-se a mexer - dobradiças reforçadas de dentro'
        },
        belongsTo: {
          type: 'Relationship',
          object: 'urn:ngsi-ld:Project:MC_MUEBLETV_A'
        },
        ownerType: {
          type: 'Property',
          value: 'Owner'
        },
        hasPermission: {
          type: 'Relationship',
          object: 'urn:ngsi-ld:Permission:3:CR'
        },
      };

      user.profile = {};
      user.profile.type = 'Profile';

      user.profile.object = {
        description: Router.route === '/' ? 'client' : 'Admin',
        type: Router.route === '/' ? 'client' : 'internal',
        permissions: [
          { idPerfil: '123456789', subject: 'workers', action: 'READ' },
          { idPerfil: '123456789', subject: 'workers', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'workers', action: 'DELETE' },

          //  DashboardsScreen
          { idPerfil: '123456789', subject: 'dashboards', action: 'READ' },

          //  FactoryScreen
          { idPerfil: '123456789', subject: 'factoryLevel', action: 'READ' },

          //  leftoversScreen
          { idPerfil: '123456789', subject: 'leftovers', action: 'READ' },

          //  Ficheiros
          { idPerfil: '123456789', subject: 'ficheiros', action: 'READ' },
          { idPerfil: '123456789', subject: 'ficheiros', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'ficheiros', action: 'DELETE' },

          //  perfis
          { idPerfil: '123456789', subject: 'perfis', action: 'READ' },
          { idPerfil: '123456789', subject: 'perfis', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'perfis', action: 'DELETE' },

          //  Ficheiros
          { idPerfil: '123456789', subject: 'messages', action: 'READ' },
          { idPerfil: '123456789', subject: 'messages', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'messages', action: 'DELETE' },

          //  profiles
          { idPerfil: '123456789', subject: 'profiles', action: 'READ' },
          { idPerfil: '123456789', subject: 'profiles', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'profiles', action: 'DELETE' },

          //  Unidades
          { idPerfil: '123456789', subject: 'unidades', action: 'READ' },
          { idPerfil: '123456789', subject: 'unidades', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'unidades', action: 'DELETE' },

          //  ConversaoUnidades
          { idPerfil: '123456789', subject: 'conversaounidades', action: 'READ' },
          { idPerfil: '123456789', subject: 'conversaounidades', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'conversaounidades', action: 'DELETE' },

          //  Moedas
          { idPerfil: '123456789', subject: 'moedas', action: 'READ' },
          { idPerfil: '123456789', subject: 'moedas', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'moedas', action: 'DELETE' },

          //  projects
          { idPerfil: '123456789', subject: 'projects', action: 'READ' },
          { idPerfil: '123456789', subject: 'projects', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'projects', action: 'DELETE' },

          //  Clients
          { idPerfil: '123456789', subject: 'clients', action: 'READ' },
          { idPerfil: '123456789', subject: 'clients', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'clients', action: 'DELETE' },

          //  Stocks
          { idPerfil: '123456789', subject: 'stocks', action: 'READ' },
          { idPerfil: '123456789', subject: 'stocks', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'stocks', action: 'DELETE' },

          //  Products
          { idPerfil: '123456789', subject: 'products', action: 'READ' },
          { idPerfil: '123456789', subject: 'products', action: 'WRITE' },
          { idPerfil: '123456789', subject: 'products', action: 'DELETE' },

          //  Client
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'clients', action: 'READ' },

          //  profiles
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'profiles', action: 'READ' },

          //  Unidades
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'unidades', action: 'READ' },

          //  ConversaoUnidades
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'conversaounidades', action: 'READ' },

          //  Moedas
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'moedas', action: 'READ' },

          //  projects
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'projects', action: 'READ' },

          //  Clients
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'clients', action: 'READ' },

          //  Stocks
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'stocks', action: 'READ' },

          //  Products
          { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'products', action: 'READ' },
        ]

      };

      if (user.active.value === 'False') return { status: 200, response: { data: { error_description: 'User inactive' } } };

      if (user.type === 'Owner' && user.tos === undefined) user.tos = { type: 'Property', value: 'False' };

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
  } catch (err) {
    return err;
  }
}

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
