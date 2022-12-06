import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await (
      await clientPromise
    )
      .db("the-mall-users")
      .collection("customers")
      .insertOne({
        ...req.body,
        preferences: {
          newsLetters: true,
        },
      })
      .then(() => res.status(201).json({ status: "success" }))
      .catch((error) => res.status(403).send(error));
  }
}
