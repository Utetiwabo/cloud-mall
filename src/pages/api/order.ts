import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const offset = parseInt(req.query?.offset?.toString());
  const limit = parseInt(req.query?.limit?.toString());
  const query: {} = req.query?.query
    ? JSON.parse(req.query?.query?.toString())
    : {};

  // const data: {} = req.body;

  if (req.method === "GET") {
    res
      .status(200)
      .json(
        await (await clientPromise)
          .db("the-mall")
          .collection("orders")
          .findOne(query)
      );
  }
}
