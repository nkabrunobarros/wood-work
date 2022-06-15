// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAllStock } from "../../../components/mock/Stock";

export default async function getAllStocks(req, res) {
  await getAllStock().then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
