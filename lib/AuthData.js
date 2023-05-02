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
  const { auth_token: userToken } = parseCookies();

  try {
    if (userToken) {
      const meRes = await me();

      setLastRefreshed();

      const perms = await userPermissionsSet({
        description: meRes.data.role,
        type: meRes.data.role !== 'CUSTOMER' ? 'internal' : 'client',
        permissions_orion: meRes.data.orion_permissions,
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
