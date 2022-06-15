import { getStock } from "../../../components/mock/Stock";

export default async function getSingleStock(req, res) {
  await getStock(req.body.id).then((data) => {
    console.log(data)

    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
