/* eslint-disable eqeqeq */
// Node modules
import axios from 'axios';
// Network
import { buildURL } from '../network/config';
import { parseCookies } from 'nookies';

export const CALL_API = Symbol('CALL_API');

const api = (env) => () => (next) => async (action) => {
  const callAPI = action[CALL_API];

  if (callAPI === undefined) {
    return next(action);
  }

  const { meta, request, types } = callAPI;
  const [REQUEST, SUCCESS, FAIL] = types;

  request.url = buildURL(env, request.url);
  next({ meta, type: REQUEST });

  const { userToken } = parseCookies();

  try {
    const result = await axios({
      ...request,
      headers: { ...request.headers, Authorization: request.headers.Authorization ? request.headers.Authorization : `Bearer ${userToken}` },
      validateStatus: (status) => status < 400,
      timeout: process.env.NEXT_PUBLIC_REQUEST_TIMEOUT
    });

    return next({
      meta,
      payload: result,
    });
  } catch (error) {
    next({
      meta,
      payload: error.response ? error.response : error,
    });

    throw error;
  }
};

export default api;
