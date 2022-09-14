import axios from 'axios';
import { parseCookies } from 'nookies';

const handler = async (req, res) => {
  const { method, headers, body } = req;
  const { auth_token: token } = parseCookies();
  if (method !== 'POST') {
    return res.status(400).json({ success: false, message: 'Only POST requests are allowed' })
  }
  const data = JSON.stringify({
    query: `query utilizador($id: String!) {
      utilizador (id: $id){
        id
        nome
        email
        telemovel
        telefone
        morada
        ativo
        paisCodigo
        idPerfil
      }
    }`,
    variables: {
      ...body
    }
  });
  const config = {
    method,
    url: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': headers['content-type'] , authorization: headers.authorization ? headers.authorization : token },
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
            payload: result.data.data.utilizador
          }
        )

      }
      else return res.status(200).json({ success: false, message: result.data.errors[0].message });
    })

  } catch (error) { 
    console.log(error)
    return res.status(error.response.status || 500).json({ success: false, message: error.message }); }
}
export default handler;

