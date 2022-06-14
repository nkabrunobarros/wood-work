// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUsers } from "../../../components/mock/Users";

export default async function getAllUsers(req, res) {
  await getUsers().then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
