// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getOrders } from "../../../components/mock/Orders";

export default async function getAllOrders(req, res) {
  await getOrders().then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
