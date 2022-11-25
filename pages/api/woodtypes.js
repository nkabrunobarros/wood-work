import axios from 'axios';
import { parseCookies } from 'nookies';

const handler = async (req, res) => {
    const { method, headers, body } = req;
    const { auth_token: token } = parseCookies();

    if (method !== 'POST') {
        return res.status(400).json({ success: false, message: 'Only POST requests are allowed' });
    }

    const data = JSON.stringify({
        query: `query WoodTypes {
            woodTypes {
              count
              data {
                    id
                    description
              }
            }
          }`,
        variables: {
            ...body
        }
    });

    const config = {
        method,
        url: process.env.NEXT_PUBLIC_API_URL,
        headers: { 'Content-Type': headers['content-type'] || 'application/json' , authorization: headers.authorization ? headers.authorization : token },
        data,
        timeout: process.env.NEXT_PUBLIC_REQUEST_TIMEOUT,
    };

    try {
        await axios(config).then((result) => {
            if (!result.data.errors) {
                return res.status(200).json(
                    {
                        success: true,
                        errors: false,
                        payload: result.data.data.woodTypes
                    }
                );

            }
            else return res.status(200).json({ success: false, message: result.data.errors[0].message });
        });

    } catch (error) { return res.status(error.response.status || 500).json({ success: false, message: error.message }); }
};

export default handler;

