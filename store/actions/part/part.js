// Network
import { parseCookies } from 'nookies';
import { getApiURL } from '../../network/config';
import createAction from '../../network/create-action';
import endpoints from '../../network/endpoints';

export const PARTS_REQUEST = 'PARTS_REQUEST';
export const PARTS_FAIL = 'PARTS_FAIL';
export const PARTS_SUCCESS = 'PARTS_SUCCESS';
export const NEW_PART_REQUEST = 'NEW_PART_REQUEST';
export const NEW_PART_FAIL = 'NEW_PART_FAIL';
export const NEW_PART_SUCCESS = 'NEW_PART_SUCCESS';

export const parts = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.PARTS),
      params: {
        limit: 400
      }
    },
    types: [PARTS_REQUEST, PARTS_SUCCESS, PARTS_FAIL],
  });
};

export const projectParts = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.PARTS),
      params: {
        q: `belongsTo=="${data}"`,
      }
    },
    types: [PARTS_REQUEST, PARTS_SUCCESS, PARTS_FAIL],
  });
};

export const newPart = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'POST',
      url: getApiURL(endpoints.PARTS),
    },
    types: [NEW_PART_REQUEST, NEW_PART_SUCCESS, NEW_PART_FAIL],
  });
};
