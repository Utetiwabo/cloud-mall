import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query: { customerId: string } = req.query?.query
    ? JSON.parse(req.query?.query?.toString())
    : {};

  if (req.method === "GET") {
    if (!query.customerId) {
      res.status(404).send({ error: "no user/id" });
    } else {
      const user = await (await clientPromise)
        .db("the-mall-users")
        .collection("customers")
        .findOne({ customerId: query.customerId });
      res.status(200).json(user);
    }
  } else if (req.method === "PATCH") {
    if (!req.body?.customerId) res.status(401).json("no-customerId");
    else
      (await clientPromise)
        .db("the-mall-users")
        .collection("customers")
        .updateOne(
          { customerId: req.body?.customerId },
          { $set: req.body?.data }
        )
        .then(async () => {
          const returnedData = await (await clientPromise)
            .db("the-mall-users")
            .collection("customers")
            .findOne({ uid: req.body?.uid });
          res.status(200).json(returnedData);
        });
  } else res.status(400).json("bad request");
}
