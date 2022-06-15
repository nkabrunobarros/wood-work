import { getProduct } from "../../../components/mock/Products";

export default async function getSingleProduct(req, res) {
  await getProduct(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
