import { getClient } from "../../../components/mock/Clients";

export default async function getSingleClient(req, res) {
  await getClient(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
