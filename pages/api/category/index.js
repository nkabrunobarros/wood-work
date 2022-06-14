// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCategories } from "../../../components/mock/Categories";

export default async function getAllCategories(req, res) {
  await getCategories().then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
