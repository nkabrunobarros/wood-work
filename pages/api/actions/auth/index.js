import axios from "axios";
import jwt from 'jsonwebtoken';
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import routes from "../../../../navigation/routes";

import querys from '../../querys';

export async function login(
    data
) {
    // return {
    //     data: {
    //         payload: {
    //             token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsMTZvOWNhZzAwMDB4M3RxcDhsYnNsY3IiLCJpYXQiOjE2Njg2MTg3MDYsImV4cCI6MTY2ODY1NDcwNn0.Hssa0kKGvt-F9CzTEwZV9aDLWQ8XMd7pb1WeTeHqPTY',
    //             type: 'worker'
    //         }
    //     }
    // };
    return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
        {
            query: querys.LOGIN,
            data: {
                input: {
                    username: data.email,
                    password: data.password
                }
            }
        }
    );
}

export async function loginClient(data) {

    return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
        {
            query: querys.LOGIN,
            data: {
                input: {
                    username: data.email,
                    password: data.password
                }
            }
        }
    );
}

export async function me(data) {
    const { auth_token: token } = parseCookies();

const config = {
    headers: { Authorization: `Bearer ${token}` },
};

const decoded = jwt.decode(data.token);


if (data.type === 'worker') {
    const user = await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
        {
            query: querys.USER,
            data: { id: decoded.id }
        },
        config
    );

    return user;
}
else {
    const client = await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
        {
            query: querys.CLIENT,
            data: { id: decoded.id }
        },
        config
    );

    return client;
}

}

export async function logout() {
    destroyCookie(null, 'auth_token');
    localStorage.removeItem('user');
    Router.push(routes.public.signIn);
}

