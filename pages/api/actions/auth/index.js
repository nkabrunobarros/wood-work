import axios from "axios";
import jwt from 'jsonwebtoken';
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import routes from "../../../../navigation/routes";

import querys from '../../querys';
import { methods } from "../methods";

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

    // await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
    //     {
        //         query: querys.USER,
        if (data.type === 'worker') {
        //         data: { id: decoded.id }
        //     },
        //     config
        // ).then((result) => {
        //     return result;
        // }).catch((error) => {

        //     return error;
        // });

        const { auth_token: token } = parseCookies();

        const config = {
            method: 'get',
            url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,
            headers: {
                Authorization: token && `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Link': '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
                'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
            },
            params: {
                id: 'urn:ngsi-ld:Worker:112'
                // id: decoded.id
            }
        };

        const res = await axios(config);

        debugger;

        return res;
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

