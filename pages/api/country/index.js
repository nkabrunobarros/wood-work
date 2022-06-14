// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCountries } from "../../../components/mock/Countries";

export default async function getAllCountries(req, res) {
  await getCountries().then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
