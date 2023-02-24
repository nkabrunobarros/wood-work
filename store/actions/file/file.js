// Network
import { parseCookies } from 'nookies';
import { getApiURL } from '../../network/config';
import createAction from '../../network/create-action';
import endpoints from '../../network/endpoints';

export const FILES_REQUEST = 'FILES_REQUEST';
export const FILES_FAIL = 'FILES_FAIL';
export const FILES_SUCCESS = 'FILES_SUCCESS';
export const FILE_REQUEST = 'FILE_REQUEST';
export const FILE_FAIL = 'FILE_FAIL';
export const FILE_SUCCESS = 'FILE_SUCCESS';

export const NEW_FILE_REQUEST = 'NEW_FILE_REQUEST';
export const NEW_FILE_FAIL = 'NEW_FILE_FAIL';
export const NEW_FILE_SUCCESS = 'NEW_FILE_SUCCESS';

export const UPDATE_FILE_REQUEST = 'UPDATE_FILE_REQUEST';
export const UPDATE_FILE_FAIL = 'UPDATE_FILE_FAIL';
export const UPDATE_FILE_SUCCESS = 'UPDATE_FILE_SUCCESS';

export const files = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.FILES),
      params: {
        options: 'sysAttrs',
      }
    },
    types: [FILES_REQUEST, FILES_SUCCESS, FILES_FAIL],
  });
};

export const file = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.FILES + data),
      params: {
        options: 'sysAttrs',
      }
    },
    types: [FILE_REQUEST, FILE_SUCCESS, FILE_FAIL],
  });
};

export const newFile = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'POST',
      url: getApiURL(endpoints.FILES),
    },
    types: [NEW_FILE_REQUEST, NEW_FILE_SUCCESS, NEW_FILE_FAIL],
  });
};

export const batchFiles = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'POST',
      url: getApiURL(endpoints.FILESBATCH),
    },
    types: [NEW_FILE_REQUEST, NEW_FILE_SUCCESS, NEW_FILE_FAIL],
  });
};

export const budgetFiles = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.FILES),
      params: {
        options: 'sysAttrs',
        q: `budget=="${data}"`,
      }
    },
    types: [FILES_REQUEST, FILES_SUCCESS, FILES_FAIL],
  });
};
