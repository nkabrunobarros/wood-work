// Network
import { parseCookies } from 'nookies';
import { getApiURL } from '../../network/config';
import createAction from '../../network/create-action';
import endpoints from '../../network/endpoints';

export const WORKERS_REQUEST = 'WORKERS_REQUEST';
export const WORKERS_FAIL = 'WORKERS_FAIL';
export const WORKERS_SUCCESS = 'WORKERS_SUCCESS';

export const WORKER_REQUEST = 'WORKER_REQUEST';
export const WORKER_FAIL = 'WORKER_FAIL';
export const WORKER_SUCCESS = 'WORKER_SUCCESS';

export const ADD_WORKER_REQUEST = 'ADD_WORKER_REQUEST';
export const ADD_WORKER_SUCCESS = 'ADD_WORKER_SUCCESS';
export const ADD_WORKER_FAIL = 'ADD_WORKER_FAIL';

export const SET_DISPLAYED_WORKER = 'SET_DISPLAYED_WORKER';

export const workers = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.WORKERS),
    },
    types: [WORKERS_REQUEST, WORKERS_SUCCESS, WORKERS_FAIL],
  });
};

export const worker = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.WORKERS + data),
    },
    types: [WORKER_REQUEST, WORKER_SUCCESS, WORKER_FAIL],
  });
};

export const newWorker = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'POST',
      url: getApiURL(endpoints.DJANGOWORKERS),
    },
    types: [ADD_WORKER_REQUEST, ADD_WORKER_SUCCESS, ADD_WORKER_FAIL],
  });
};

export const setDisplayedWorker = (data) => {
  return {
    type: SET_DISPLAYED_WORKER,
    data,

  };
};