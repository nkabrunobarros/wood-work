import axios from "axios";
import { parseCookies } from "nookies";
import querys from "../../querys";

export async function folders(data) {
    const { auth_token: token } = parseCookies();

    const config = {
        headers: { Authorization: token && `Bearer ${token}` },
    };

    return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
        {
            query: querys.ORDER_FOLDERS,
            data
        },
        config
    );
}

export async function fol(data) {
    const { auth_token: token } = parseCookies();

    const config = {
        headers: { Authorization: token && `Bearer ${token}` },
    };

    return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
        {
            query: querys.ORDER_FOLDERS,
            data
        },
        config
    );
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
    );
}

export async function saveFolder(data) {
    const { auth_token: token } = parseCookies();

    const config = {
        headers: { Authorization: token && `Bearer ${token}` },
    };

    return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
        {
            query: querys.SAVE_FOLDER,
            data: { input: { ...data } }
        },
        config
    );
}

export async function saveOrderDetails(data) {
    const { auth_token: token } = parseCookies();

    const config = {
        headers: { Authorization: token && `Bearer ${token}` },
    };

    return await axios.post(process.env.NEXT_PUBLIC_FRONT_API_URL,
        {
            query: querys.SAVE_ORDER_DETAILS,
            data: { input: { ...data } }
        },
        config
    );
}
