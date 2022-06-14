import { getCountry } from "../../../components/mock/Countries";

export default async function getSingleCountry(req, res) {
  await getCountry(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
