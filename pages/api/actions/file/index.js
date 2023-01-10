import axios from 'axios';
import { parseCookies } from 'nookies';
import querys from '../../querys';

export async function files (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.FILES,
      data: data || { id: '' }
    },
    config
  );
}

export async function saveFile (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.SAVE_FILE,
      data: { input: data }
    },
    config
  );
}

export async function removeFile (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.REMOVE_FILE,
      data
    },
    config
  );
}
