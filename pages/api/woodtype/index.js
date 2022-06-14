// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getWoodTypes } from "../../../components/mock/WoodTypes";

export default async function getAllWoodTypes(req, res) {
  await getWoodTypes().then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
