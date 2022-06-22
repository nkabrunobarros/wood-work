// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { signIn } from '../../components/mock/Users';
import hasData from '../../components/utils/hasData';

export default async function login(req, res) {
  await signIn(req.body.email, req.body.password).then((data) => {
    if (hasData(data)) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
