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

//     const demoUser = { "id": "cl16o9cag0000x3tqp8lbslcr", "nome": "NKA - Geral", "email": "geral@nka.pt", "ativo": true, "idPerfil": "cl9obx38x0000uqfj7yko2h5y", "telemovel": "939921227", "telefone": "939921227", "morada": "rua de nao sei de onde barcelos", "paisCodigo": "PT", "pais": { "codigo": "PT", "descricao": "Portugal" }, "perfil": { "id": "cl9obx38x0000uqfj7yko2h5y", "descricao": "Administrador", "permissoes": [{ "sujeito": "workers", "accao": "READ" }, { "sujeito": "messages", "accao": "READ" }, { "sujeito": "workers", "accao": "DELETE" }, { "sujeito": "workers", "accao": "WRITE" }, { "sujeito": "factoryLevel", "accao": "READ" }, { "sujeito": "utilizadores", "accao": "READ" }, { "sujeito": "utilizadores", "accao": "WRITE" }, { "sujeito": "utilizadores", "accao": "DELETE" }, { "sujeito": "dashboards", "accao": "READ" }, { "sujeito": "ficheiros", "accao": "READ" }, { "sujeito": "ficheiros", "accao": "WRITE" }, { "sujeito": "ficheiros", "accao": "DELETE" }, { "sujeito": "perfis", "accao": "READ" }, { "sujeito": "perfis", "accao": "WRITE" }, { "sujeito": "perfis", "accao": "DELETE" }, { "sujeito": "unidades", "accao": "READ" }, { "sujeito": "unidades", "accao": "WRITE" }, { "sujeito": "unidades", "accao": "DELETE" }, { "sujeito": "conversaounidades", "accao": "READ" }, { "sujeito": "conversaounidades", "accao": "WRITE" }, { "sujeito": "conversaounidades", "accao": "DELETE" }, { "sujeito": "moedas", "accao": "READ" }, { "sujeito": "moedas", "accao": "WRITE" }, { "sujeito": "moedas", "accao": "DELETE" }, { "sujeito": "orders", "accao": "READ" }, { "sujeito": "orders", "accao": "WRITE" }, { "sujeito": "orders", "accao": "DELETE" }, { "sujeito": "clients", "accao": "READ" }, { "sujeito": "clients", "accao": "WRITE" }, { "sujeito": "clients", "accao": "DELETE" }, { "sujeito": "stocks", "accao": "READ" }, { "sujeito": "stocks", "accao": "WRITE" }, { "sujeito": "stocks", "accao": "DELETE" }, { "sujeito": "products", "accao": "READ" }, { "sujeito": "products", "accao": "WRITE" }, { "sujeito": "products", "accao": "DELETE" }] } }

// };


// return {
//     data: {
//         payload: {
//             ...demoUser
//         }
//     }
// };
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

