import axios from "axios";
import { parseCookies } from "nookies";
import endpoints from '../../network/endpoints'
export async function permission(data) {
    const { auth_token: token } = parseCookies();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }; 
    console.log(data)

    return await axios.post(`${process.env.NEXT_PUBLIC_FRONT_API_URL}${endpoints.PERMISSIONS}`, data ,config)
}
