import { getClients } from "../../../components/mock/Clients";

export default async function getAllOrders(req, res) {
  await getClients().then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
