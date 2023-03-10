// Network
import { parseCookies } from 'nookies';
import { getApiURL } from '../../network/config';
import createAction from '../../network/create-action';
import endpoints from '../../network/endpoints';

export const CLIENTS_REQUEST = 'CLIENTS_REQUEST';
export const CLIENTS_FAIL = 'CLIENTS_FAIL';
export const CLIENTS_SUCCESS = 'CLIENTS_SUCCESS';

export const CLIENT_REQUEST = 'CLIENT_REQUEST';
export const CLIENT_FAIL = 'CLIENT_FAIL';
export const CLIENT_SUCCESS = 'CLIENT_SUCCESS';
export const UPDATE_CLIENT_REQUEST = 'UPDATE_CLIENT_REQUEST';
export const UPDATE_CLIENT_FAIL = 'UPDATE_CLIENT_FAIL';
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';

export const ADD_CLIENT_REQUEST = 'ADD_CLIENT_REQUEST';
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
export const ADD_CLIENT_FAIL = 'ADD_CLIENT_FAIL';

export const SET_DISPLAYED_CLIENT = 'SET_DISPLAYED_CLIENT';

export const clients = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.CLIENTS),
    },
    types: [CLIENTS_REQUEST, CLIENTS_SUCCESS, CLIENTS_FAIL],
  });
};

export const client = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.CLIENTS + data),
    },
    types: [CLIENT_REQUEST, CLIENT_SUCCESS, CLIENT_FAIL],
  });
};

export const updateClient = (data) => {
  const { auth_token: userToken } = parseCookies();
  const id = data?.id;

  delete data.id;

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'PATCH',
      url: getApiURL(endpoints.CUSTOMER + id),
    },
    types: [UPDATE_CLIENT_REQUEST, UPDATE_CLIENT_SUCCESS, UPDATE_CLIENT_FAIL],
  });
};

export const newClient = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'POST',
      url: getApiURL(endpoints.ADDCLIENT),
    },
    types: [ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, ADD_CLIENT_FAIL],
  });
};

export const setDisplayedClient = (data) => {
  return {
    type: SET_DISPLAYED_CLIENT,
    data,

  };
};
