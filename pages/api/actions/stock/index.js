import axios from "axios";
import { parseCookies } from "nookies";
import querys from "../../querys";

export async function stocks(data) {
    const { auth_token: token } = parseCookies();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
 
    return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
      {
          query: querys.STOCKS,
          data
      },
      config
  )}

export async function stock(data) {
    const { auth_token: token } = parseCookies();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
 
    return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
      {
          query: querys.STOCK,
          data
      },
      config
  )}
