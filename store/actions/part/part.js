// Network
import { parseCookies } from 'nookies';
import { getApiURL } from '../../network/config';
import createAction from '../../network/create-action';
import endpoints from '../../network/endpoints';

export const PARTS_REQUEST = 'PARTS_REQUEST';
export const PARTS_FAIL = 'PARTS_FAIL';
export const PARTS_SUCCESS = 'PARTS_SUCCESS';

export const parts = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    data,
    request: {
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'GET',
      url: getApiURL(endpoints.PARTS),
    },
    types: [PARTS_REQUEST, PARTS_SUCCESS, PARTS_FAIL],
  });
};
