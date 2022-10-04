import axios from 'axios';

const handler = async (req, res) => {
    const { method, headers, body } = req;

    if (method !== 'POST')  return res.status(400).json({ success: false, message: 'Only POST requests are allowed' })
    
    const data = JSON.stringify({
        query: body.query.query,
        variables: { ...body.data }
        
    });

    const config = {
        method,
        url: process.env.NEXT_PUBLIC_API_URL,
        headers: { 'Content-Type': headers['content-type'] || 'application/json', authorization: headers.authorization || null },
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
                        payload: result.data.data[body.query.return]
                    }
                )
            }
            
            else {
                return res.status(result.data.errors[0].statusCode).json({ success: false, message: result.data.errors[0].message });                   
                }
            })
            
        } catch (error) {
        // if (error.response.status === 403) return Router.push(routes.public.signIn)
        return res.status(error.response?.status || 500).json({ success: false, message: error.message });
    }
}

export default handler;

