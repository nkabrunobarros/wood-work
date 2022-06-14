import { getCategory } from "../../../components/mock/Categories";

export default async function getSingleOrder(req, res) {
  await getCategory(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
