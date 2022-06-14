// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getProducts } from "../../../components/mock/Products";

export default async function getAllOrders(req, res) {
  await getProducts().then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
