import axios from "axios";
import { parseCookies } from "nookies";
import querys from "../../querys";

export async function orders(data) {
  const { auth_token: token } = parseCookies();

  const config = {
      headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
      {
          query: querys.ORDERS,
          data
      },
      config
  ) 
}

export async function order(data) {
  const { auth_token: token } = parseCookies();

  const config = {
      headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
      {
          query: querys.ORDER,
          data
      },
      config
  ) 
}

export async function saveOrder(data) {
  const { auth_token: token } = parseCookies();

  const config = {
      headers: { Authorization: token && `Bearer ${token}` },
  };

  return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
      {
          query: querys.SAVE_ORDER,
          data: { input: { ...data }}
      },
      config
  ) 
}
