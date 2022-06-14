import { getStock } from "../../../components/mock/Stock";

export async function getSingleProduct(req, res) {
  await getStock(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
