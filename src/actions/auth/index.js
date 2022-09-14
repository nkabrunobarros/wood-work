import axios from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import routes from "../../../navigation/routes";
import endpoints from '../../network/endpoints'
import jwt from 'jsonwebtoken';

export async function login(data) {
    return await axios.post(`${process.env.NEXT_PUBLIC_FRONT_API_URL}${endpoints.LOGIN}`, { username: data.email, password: data.password })
}
export async function me(data) {
    const { auth_token: token } = parseCookies();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const decoded = jwt.decode(data.token)
    return await axios.post(`${process.env.NEXT_PUBLIC_FRONT_API_URL}${endpoints.ME}`,{ id: decoded.id}, config)
}

export async function logout(data) {
    const { auth_token: token } = parseCookies();
    destroyCookie(null,'auth_token');

    Router.push(routes.public.signIn)
    console.log(token)
}

