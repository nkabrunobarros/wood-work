import axios from 'axios';
// import { parseCookies } from 'nookies';

export const handler = async (req, res) => {
  const { method, body, headers } = req;
  // const data = req.body;
  // const { userToken } = parseCookies();
  debugger;
  if (method !== 'POST') {
    return res.status(400).json({ success: false, message: 'Only POST requests are allowed' })
  }
  const data = JSON.stringify({
    query: `query login ($input: LoginInput!) {
      login (input: $input) {
          token
      }
  }`,
    variables: {
      input: { ...body }
    }
  });

  const config = {
    method,
    url: process.env.NEXT_PUBLIC_API_URL,
    headers,
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
            payload: result.data.data.login
          }
        )

      }
      else return res.status(200).json({ success: false, message: result.data.errors[0].message });
    })

  } catch (error) {return res.status(error.response.status).json({ success: false, message: error.message });}
}




// export default async function login(req, res) {
//   await signIn(req.body.email, req.body.password).then((data) => {
//     if (hasData(data)) res.status(200).json({ data });
//     else res.status(400).json({ data });
//   });
// }
