import { getUserById } from "../../../components/mock/Users";

export async function getSingleUser(req, res) {
  console.log(req.body.id)
  await getUserById(req.body.id).then((data) => {
    if (data) res.status(200).json({ data });
    else res.status(400).json({ data });
  });
}
