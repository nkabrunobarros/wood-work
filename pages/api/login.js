import axios from 'axios';

const handler = async (req, res) => {
  const { method, body } = req;

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
    headers: { 'Content-Type': 'application/json' },
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

  } catch (error) { return res.status(error.response.status || 500).json({ success: false, message: error.message }); }
}

export default handler;
