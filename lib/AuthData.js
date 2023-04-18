import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { bindActionCreators } from 'redux';
import routes from '../navigation/routes';
import * as appStatesActions from '../store/actions/appState';
import * as authActionsRedux from '../store/actions/auth';

// eslint-disable-next-line consistent-return
const AuthData = async (dispatch) => {
  const { me, userPermissionsSet } = bindActionCreators(authActionsRedux, dispatch);
  const { setLastRefreshed } = bindActionCreators(appStatesActions, dispatch);

  const permissions = [
    { idPerfil: '123456789', subject: 'workers', action: 'READ' },
    { idPerfil: '123456789', subject: 'workers', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'workers', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'dashboards', action: 'READ' },
    { idPerfil: '123456789', subject: 'factoryLevel', action: 'READ' },
    { idPerfil: '123456789', subject: 'assemblys', action: 'READ' },
    { idPerfil: '123456789', subject: 'leftovers', action: 'READ' },
    { idPerfil: '123456789', subject: 'ficheiros', action: 'READ' },
    { idPerfil: '123456789', subject: 'ficheiros', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'ficheiros', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'perfis', action: 'READ' },
    { idPerfil: '123456789', subject: 'perfis', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'perfis', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'messages', action: 'READ' },
    { idPerfil: '123456789', subject: 'messages', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'messages', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'profiles', action: 'READ' },
    { idPerfil: '123456789', subject: 'profiles', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'profiles', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'unidades', action: 'READ' },
    { idPerfil: '123456789', subject: 'unidades', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'unidades', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'conversaounidades', action: 'READ' },
    { idPerfil: '123456789', subject: 'conversaounidades', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'conversaounidades', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'moedas', action: 'READ' },
    { idPerfil: '123456789', subject: 'moedas', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'moedas', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'projects', action: 'READ' },
    { idPerfil: '123456789', subject: 'projects', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'projects', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'clients', action: 'READ' },
    { idPerfil: '123456789', subject: 'clients', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'clients', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'stocks', action: 'READ' },
    { idPerfil: '123456789', subject: 'stocks', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'stocks', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'products', action: 'READ' },
    { idPerfil: '123456789', subject: 'products', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'products', action: 'DELETE' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'clients', action: 'READ' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'profiles', action: 'READ' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'unidades', action: 'READ' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'conversaounidades', action: 'READ' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'moedas', action: 'READ' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'projects', action: 'READ' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'clients', action: 'READ' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'stocks', action: 'READ' },
    { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'products', action: 'READ' },
  ];

  const { auth_token: userToken } = parseCookies();

  try {
    if (userToken) {
      const meRes = await me();

      setLastRefreshed();

      const perms = await userPermissionsSet({
        description: window.location.pathname.includes('/internal/') || window.location.pathname.includes('/signin') ? 'Admin' : 'Client',
        type: window.location.pathname.includes('/internal/') || window.location.pathname.includes('/signin') ? 'internal' : 'client',
        permissions,
        permissions_orion: [
          {
            id: 'permissions_Xw9Jz3BbzBO4GlZ2',
            created: '2023-04-03T10:47:19.500780Z',
            modified: '2023-04-03T10:47:19.500817Z',
            name: 'add_assembly',
            codename: 'add_assembly'
          },
          {
            id: 'permissions_OjDZoKMJ9B9GQ5Ay',
            created: '2023-04-03T10:47:19.503070Z',
            modified: '2023-04-03T10:47:19.503089Z',
            name: 'view_assembly',
            codename: 'view_assembly'
          },
          {
            id: 'permissions_8Y5d0LMQZeRPXnjk',
            created: '2023-04-03T10:47:19.504008Z',
            modified: '2023-04-03T10:47:19.504024Z',
            name: 'change_assembly',
            codename: 'change_assembly'
          },
          {
            id: 'permissions_pAbaEjM8KBVzKdyw',
            created: '2023-04-03T10:47:19.504905Z',
            modified: '2023-04-03T10:47:19.504922Z',
            name: 'delete_assembly',
            codename: 'delete_assembly'
          },
          {
            id: 'permissions_ox6795ed5NdOrJbD',
            created: '2023-04-03T10:47:19.505799Z',
            modified: '2023-04-03T10:47:19.505815Z',
            name: 'add_budget',
            codename: 'add_budget'
          },
          {
            id: 'permissions_3zYLk4N4ABoJ1mWZ',
            created: '2023-04-03T10:47:19.506648Z',
            modified: '2023-04-03T10:47:19.506664Z',
            name: 'view_budget',
            codename: 'view_budget'
          },
          {
            id: 'permissions_wXjG6KMa2eAaL079',
            created: '2023-04-03T10:47:19.507508Z',
            modified: '2023-04-03T10:47:19.507524Z',
            name: 'change_budget',
            codename: 'change_budget'
          },
          {
            id: 'permissions_Q8ZPE7NjvNgzXDoq',
            created: '2023-04-03T10:47:19.508377Z',
            modified: '2023-04-03T10:47:19.508394Z',
            name: 'delete_budget',
            codename: 'delete_budget'
          },
          {
            id: 'permissions_RDX1Y9MwyNGAmqjo',
            created: '2023-04-03T10:47:19.509238Z',
            modified: '2023-04-03T10:47:19.509254Z',
            name: 'add_consumable',
            codename: 'add_consumable'
          },
          {
            id: 'permissions_RKkJVPeWvME0bwdj',
            created: '2023-04-03T10:47:19.510071Z',
            modified: '2023-04-03T10:47:19.510087Z',
            name: 'view_consumable',
            codename: 'view_consumable'
          },
          {
            id: 'permissions_E8QODqenVeKJ0bzY',
            created: '2023-04-03T10:47:19.510910Z',
            modified: '2023-04-03T10:47:19.510926Z',
            name: 'change_consumable',
            codename: 'change_consumable'
          },
          {
            id: 'permissions_1JAyKgMpEe3O8Xmz',
            created: '2023-04-03T10:47:19.511747Z',
            modified: '2023-04-03T10:47:19.511763Z',
            name: 'delete_consumable',
            codename: 'delete_consumable'
          },
          {
            id: 'permissions_1OkJDleljB8oyYnR',
            created: '2023-04-03T10:47:19.512623Z',
            modified: '2023-04-03T10:47:19.512639Z',
            name: 'add_expedition',
            codename: 'add_expedition'
          },
          {
            id: 'permissions_WQgp0aB1GeP4V8d9',
            created: '2023-04-03T10:47:19.513451Z',
            modified: '2023-04-03T10:47:19.513467Z',
            name: 'view_expedition',
            codename: 'view_expedition'
          },
          {
            id: 'permissions_4gjKGke6veq7J8vE',
            created: '2023-04-03T10:47:19.514290Z',
            modified: '2023-04-03T10:47:19.514306Z',
            name: 'change_expedition',
            codename: 'change_expedition'
          },
          {
            id: 'permissions_xa2nOmeAXMP9lXj8',
            created: '2023-04-03T10:47:19.515129Z',
            modified: '2023-04-03T10:47:19.515145Z',
            name: 'delete_expedition',
            codename: 'delete_expedition'
          },
          {
            id: 'permissions_DrGdyjNyrB3PxWaJ',
            created: '2023-04-03T10:47:19.515976Z',
            modified: '2023-04-03T10:47:19.515992Z',
            name: 'add_machine',
            codename: 'add_machine'
          },
          {
            id: 'permissions_j5128DeGxNnqdRPE',
            created: '2023-04-03T10:47:19.516832Z',
            modified: '2023-04-03T10:47:19.516848Z',
            name: 'view_machine',
            codename: 'view_machine'
          },
          {
            id: 'permissions_OaDKgqer0B2W1VXd',
            created: '2023-04-03T10:47:19.517653Z',
            modified: '2023-04-03T10:47:19.517668Z',
            name: 'change_machine',
            codename: 'change_machine'
          },
          {
            id: 'permissions_al7pxdNRYe1kEgbD',
            created: '2023-04-03T10:47:19.518464Z',
            modified: '2023-04-03T10:47:19.518480Z',
            name: 'delete_machine',
            codename: 'delete_machine'
          },
          {
            id: 'permissions_g5vWRQBV7Mmxn4yw',
            created: '2023-04-03T10:47:19.519295Z',
            modified: '2023-04-03T10:47:19.519311Z',
            name: 'add_organization',
            codename: 'add_organization'
          },
          {
            id: 'permissions_mjqZpDeODNGnJ4dV',
            created: '2023-04-03T10:47:19.520149Z',
            modified: '2023-04-03T10:47:19.520164Z',
            name: 'view_organization',
            codename: 'view_organization'
          },
          {
            id: 'permissions_KO9723N7aM8oLw4Z',
            created: '2023-04-03T10:47:19.521221Z',
            modified: '2023-04-03T10:47:19.521237Z',
            name: 'change_organization',
            codename: 'change_organization'
          },
          {
            id: 'permissions_PVDgzbMX5ewrJZpy',
            created: '2023-04-03T10:47:19.522071Z',
            modified: '2023-04-03T10:47:19.522086Z',
            name: 'delete_organization',
            codename: 'delete_organization'
          },
          {
            id: 'permissions_LxbGjDeDZBaK9PX1',
            created: '2023-04-03T10:47:19.522911Z',
            modified: '2023-04-03T10:47:19.522927Z',
            name: 'add_owner',
            codename: 'add_owner'
          },
          {
            id: 'permissions_dJpV27NxKejn3Dga',
            created: '2023-04-03T10:47:19.523747Z',
            modified: '2023-04-03T10:47:19.523763Z',
            name: 'view_owner',
            codename: 'view_owner'
          },
          {
            id: 'permissions_baA721MqaMJmx0QK',
            created: '2023-04-03T10:47:19.524615Z',
            modified: '2023-04-03T10:47:19.524630Z',
            name: 'change_owner',
            codename: 'change_owner'
          },
          {
            id: 'permissions_8An2GQNvaezp4goO',
            created: '2023-04-03T10:47:19.525444Z',
            modified: '2023-04-03T10:47:19.525460Z',
            name: 'delete_owner',
            codename: 'delete_owner'
          },
          {
            id: 'permissions_ZQX47WMgpedajJ6E',
            created: '2023-04-03T10:47:19.526268Z',
            modified: '2023-04-03T10:47:19.526295Z',
            name: 'add_part',
            codename: 'add_part'
          },
          {
            id: 'permissions_3GJoO1Bm2MDjAZwW',
            created: '2023-04-03T10:47:19.527112Z',
            modified: '2023-04-03T10:47:19.527128Z',
            name: 'view_part',
            codename: 'view_part'
          },
          {
            id: 'permissions_9rVQ1ON3zemG63kp',
            created: '2023-04-03T10:47:19.527959Z',
            modified: '2023-04-03T10:47:19.527975Z',
            name: 'change_part',
            codename: 'change_part'
          },
          {
            id: 'permissions_8m37lyBoqeYQ6GpK',
            created: '2023-04-03T10:47:19.528823Z',
            modified: '2023-04-03T10:47:19.528838Z',
            name: 'delete_part',
            codename: 'delete_part'
          },
          {
            id: 'permissions_0PqZXyNY1N7W9lbx',
            created: '2023-04-03T10:47:19.529662Z',
            modified: '2023-04-03T10:47:19.529678Z',
            name: 'add_project',
            codename: 'add_project'
          },
          {
            id: 'permissions_gPlnOGNPweq7b2Ej',
            created: '2023-04-03T10:47:19.530495Z',
            modified: '2023-04-03T10:47:19.530512Z',
            name: 'view_project',
            codename: 'view_project'
          },
          {
            id: 'permissions_LaXPJEMEDBw70KOx',
            created: '2023-04-03T10:47:19.531325Z',
            modified: '2023-04-03T10:47:19.531340Z',
            name: 'change_project',
            codename: 'change_project'
          },
          {
            id: 'permissions_0Y9ZkLBKEeK2E1gq',
            created: '2023-04-03T10:47:19.532167Z',
            modified: '2023-04-03T10:47:19.532183Z',
            name: 'delete_project',
            codename: 'delete_project'
          },
          {
            id: 'permissions_yr4jQEBzPeOw37Z0',
            created: '2023-04-03T10:47:19.533091Z',
            modified: '2023-04-03T10:47:19.533108Z',
            name: 'add_worker',
            codename: 'add_worker'
          },
          {
            id: 'permissions_am9gkLB9We7bQD4Z',
            created: '2023-04-03T10:47:19.533937Z',
            modified: '2023-04-03T10:47:19.533953Z',
            name: 'view_worker',
            codename: 'view_worker'
          },
          {
            id: 'permissions_E4lxPye2gNoJrbnA',
            created: '2023-04-03T10:47:19.534787Z',
            modified: '2023-04-03T10:47:19.534803Z',
            name: 'change_worker',
            codename: 'change_worker'
          },
          {
            id: 'permissions_W79oKrM04Mbl05ga',
            created: '2023-04-03T10:47:19.535716Z',
            modified: '2023-04-03T10:47:19.535732Z',
            name: 'delete_worker',
            codename: 'delete_worker'
          },
          {
            id: 'permissions_DaA0oON5vBw34xjz',
            created: '2023-04-06T08:29:22.853546Z',
            modified: '2023-04-06T08:29:22.853607Z',
            name: 'access_projects',
            codename: 'access_projects'
          },
          {
            id: 'permissions_a7xrm0NLrMVDLwqE',
            created: '2023-04-06T08:29:42.763947Z',
            modified: '2023-04-06T08:29:42.763976Z',
            name: 'access_projects_similar',
            codename: 'access_projects_similar'
          },
          {
            id: 'permissions_2OxJmANkLB5Dl3oL',
            created: '2023-04-06T08:29:56.408458Z',
            modified: '2023-04-06T08:29:56.408505Z',
            name: 'access_stocks',
            codename: 'access_stocks'
          },
          {
            id: 'permissions_o8jW0ZNZ2bNdQp1J',
            created: '2023-04-06T08:30:04.751791Z',
            modified: '2023-04-06T08:30:04.751825Z',
            name: 'access_factory',
            codename: 'access_factory'
          },
          {
            id: 'permissions_Xw9Jz3BbzzBO4GlZ',
            created: '2023-04-06T08:30:13.521895Z',
            modified: '2023-04-06T08:30:13.521928Z',
            name: 'access_assembly',
            codename: 'access_assembly'
          },
          {
            id: 'permissions_OjDZoKMJA9B9GQ5A',
            created: '2023-04-06T08:30:22.736838Z',
            modified: '2023-04-06T08:30:22.736872Z',
            name: 'access_leftovers',
            codename: 'access_leftovers'
          },
          {
            id: 'permissions_8Y5d0LMQGZNRPXnj',
            created: '2023-04-06T08:30:30.056192Z',
            modified: '2023-04-06T08:30:30.056232Z',
            name: 'access_clients',
            codename: 'access_clients'
          },
          {
            id: 'permissions_pAbaEjM8kKBVzKdy',
            created: '2023-04-06T08:30:36.598107Z',
            modified: '2023-04-06T08:30:36.598155Z',
            name: 'access_workers',
            codename: 'access_workers'
          },
          {
            id: 'permissions_ox6795ed75MdOrJb',
            created: '2023-04-06T08:57:13.967501Z',
            modified: '2023-04-06T08:57:13.967561Z',
            name: 'access_messages',
            codename: 'access_messages'
          }
        ],
        newPerms: meRes.data.orionPermissions,
      });

      return { perms, me: meRes.data };
    }
  } catch (error) {
    const isInternalPage = Object.values(routes.private.internal).includes(window.location.pathname);
    const isClientPage = Object.values(routes.private).includes(window.location.pathname);

    destroyCookie(null, 'auth_token');

    if (error.response?.data?.detail === 'Invalid token header. No credentials provided.') {
      false && isInternalPage && Router.push('/signin');
      false && isClientPage && Router.push('/');
    }

    return error;
  }
};

export default AuthData;
