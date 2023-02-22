// Network
import { parseCookies } from 'nookies';
import { getApiURL } from '../../network/config';
import createAction from '../../network/create-action';
import endpoints from '../../network/endpoints';

export const EMAIL_REQUEST = 'EMAIL_REQUEST';
export const EMAIL_FAIL = 'EMAIL_FAIL';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';

export const resetPassword = (data) => {
  const { auth_token: userToken } = parseCookies();

  return createAction({
    meta: null,
    request: {
      data,
      headers: { 'content-type': 'application/json', Authorization: userToken ? `Bearer ${userToken}` : '' },
      method: 'POST',
      url: getApiURL(endpoints.EMAILS),
    },
    types: [EMAIL_REQUEST, EMAIL_SUCCESS, EMAIL_FAIL],
  });
};
