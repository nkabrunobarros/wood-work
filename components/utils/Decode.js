import jwt from 'jsonwebtoken';

function Decode (token) {
  const decoded = jwt.decode(JSON.parse(token), {
    complete: true,
  });

  return decoded;
}

export default Decode;
