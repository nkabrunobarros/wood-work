import { getProduct } from "../../../components/mock/Orders";

export async function getSingleProduct(req, res) {
  await getProduct(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
