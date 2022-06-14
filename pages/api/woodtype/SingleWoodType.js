import { getWoodType } from "../../../components/mock/WoodTypes";

export async function getSingleWoodType(req, res) {
  await getWoodType(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
