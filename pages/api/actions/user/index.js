import axios from "axios";
import { parseCookies } from "nookies";
import querys from "../../querys";

export async function users(data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.USERS,
      data
    },
    config
  );
}

export async function userById(data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.USER,
      data
    },
    config
  );
}

export async function saveUser(data) {
  const { auth_token: token } = parseCookies();

  const config = {
    headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    {
      query: querys.SAVE_USER,
      data: { input: data }
    },
    config
  );
}
