// Node modules
import axios from 'axios';
// Network
import { destroyCookie, parseCookies } from 'nookies';
import { buildURL } from '../../../store/network/config';

export const CALL_API = Symbol('CALL_API');

const api = () => () => (next) => async (action) => {
  const { [CALL_API]: callAPI } = action;
  const { auth_token: userToken } = parseCookies();

  if (callAPI === undefined) {
    return next(action);
  }

  const { meta, request, types } = callAPI;
  const [REQUEST, SUCCESS, FAIL] = types;
  const headers = { ...(request.headers || {}), Authorization: userToken && `Bearer ${userToken}` };
  const requestOptions = { ...request, headers, url: buildURL(request.url) };
  const actionWith = (payload) => ({ ...action, ...payload });
  const requestAction = actionWith({ type: REQUEST, meta });

  next(requestAction);

  try {
    const response = await axios(requestOptions);
    const successAction = actionWith({ type: SUCCESS, meta, payload: response });

    next(successAction);

    return response;
  } catch (error) {
    const failAction = actionWith({ type: FAIL, meta, payload: error.response || error });

    if (error.response?.data?.detail === ('Invalid token header. No credentials provided.' || 'Authentication credentials were not provided.')) {
      destroyCookie(null, 'auth_token');

      return [
        {
          destination: '/signin', // Matched parameters can be used in the destination
          permanent: false,
        }];
    }

    next(failAction);

    throw error;
  }
};

export default api;
