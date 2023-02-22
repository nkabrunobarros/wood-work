// Network
import { parseCookies } from 'nookies';
import { getApiURL } from '../../network/config';
import createAction from '../../network/create-action';
import endpoints from '../../network/endpoints';

export const EXPEDITIONS_REQUEST = 'EXPEDITIONS_REQUEST';
export const EXPEDITIONS_FAIL = 'EXPEDITIONS_FAIL';
export const EXPEDITIONS_SUCCESS = 'EXPEDITIONS_SUCCESS';
export const EXPEDITION_REQUEST = 'EXPEDITION_REQUEST';
export const EXPEDITION_FAIL = 'EXPEDITION_FAIL';
export const EXPEDITION_SUCCESS = 'EXPEDITION_SUCCESS';
export const NEW_EXPEDITION_REQUEST = 'NEW_EXPEDITION_REQUEST';
export const NEW_EXPEDITION_FAIL = 'NEW_EXPEDITION_FAIL';
export const NEW_EXPEDITION_SUCCESS = 'NEW_EXPEDITION_SUCCESS';

export const expeditions = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.EXPEDITIONS),
    },
    types: [EXPEDITIONS_REQUEST, EXPEDITIONS_SUCCESS, EXPEDITIONS_FAIL],
  });
};

export const expedition = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.EXPEDITIONS + data),
    },
    types: [EXPEDITION_REQUEST, EXPEDITION_SUCCESS, EXPEDITION_FAIL],
  });
};

export const newExpedition = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'POST',
      url: getApiURL(endpoints.EXPEDITIONS),
    },
    types: [NEW_EXPEDITION_REQUEST, NEW_EXPEDITION_SUCCESS, NEW_EXPEDITION_FAIL],
  });
};
