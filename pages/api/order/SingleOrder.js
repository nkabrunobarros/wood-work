import { getOrder } from "../../../components/mock/Orders";

export default async function getSingleOrder(req, res) {
  await getOrder(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
