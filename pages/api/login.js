// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUser } from '../../components/mock/Users';

export default async function handler(req, res) {

  await getUser(req.body.email).then((data) => {
    console.log(req)
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
