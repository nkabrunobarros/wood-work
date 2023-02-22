// Network
import { parseCookies } from 'nookies';
import { getApiURL } from '../../network/config';
import createAction from '../../network/create-action';
import endpoints from '../../network/endpoints';

export const PERMISSIONS_REQUEST = 'PERMISSIONS_REQUEST';
export const PERMISSIONS_FAIL = 'PERMISSIONS_FAIL';
export const PERMISSIONS_SUCCESS = 'PERMISSIONS_SUCCESS';

export const NEW_PERMISSION_REQUEST = 'NEW_PERMISSION_REQUEST';
export const NEW_PERMISSION_FAIL = 'NEW_PERMISSION_FAIL';
export const NEW_PERMISSION_SUCCESS = 'NEW_PERMISSION_SUCCESS';

export const RESOURCES_REQUEST = 'RESOURCES_REQUEST';
export const RESOURCES_FAIL = 'RESOURCES_FAIL';
export const RESOURCES_SUCCESS = 'RESOURCES_SUCCESS';

export const permissions = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.PERMISSIONSLIST),
    },
    types: [PERMISSIONS_REQUEST, PERMISSIONS_SUCCESS, PERMISSIONS_FAIL],
  });
};

export const resources = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.RESOURCES),
    },
    types: [RESOURCES_REQUEST, RESOURCES_SUCCESS, RESOURCES_FAIL],
  });
};

export const newPermission = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'POST',
      url: getApiURL(endpoints.PERMISSIONS),
    },
    types: [NEW_PERMISSION_REQUEST, NEW_PERMISSION_SUCCESS, NEW_PERMISSION_FAIL],
  });
};
