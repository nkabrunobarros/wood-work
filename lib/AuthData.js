import { parseCookies } from 'nookies';
import { bindActionCreators } from 'redux';
import * as appStatesActions from '../store/actions/appState';
import * as authActionsRedux from '../store/actions/auth';

const AuthData = async (dispatch) => {
  const { me, userPermissionsSet } = bindActionCreators(authActionsRedux, dispatch);
  const { setLastRefreshed } = bindActionCreators(appStatesActions, dispatch);

  const permissions = [
    { idPerfil: '123456789', subject: 'workers', action: 'READ' },
    { idPerfil: '123456789', subject: 'workers', action: 'WRITE' },
    { idPerfil: '123456789', subject: 'workers', action: 'DELETE' },
    { idPerfil: '123456789', subject: 'dashboards', action: 'READ' },
    { idPerfil: '123456789', subject: 'factoryLevel', action: 'READ' },
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
        newPerms: meRes.data.orionPermissions,
      });

      return { perms, me: meRes.data };
    }
  } catch (error) {
    console.error(error);
  }
};

export default AuthData;
