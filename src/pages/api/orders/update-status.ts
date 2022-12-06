import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const txRef = req.body?.txRef;
  const status = req.body?.status;
  if (req.method === "POST") {
    const updateOneResult = await (await clientPromise)
      .db("the-mall")
      .collection("orders")
      .updateOne({ txRef }, { $set: { status } });
    // console.log(updateOneResult);
    // TODO call functions to...
    const returnData = await (await clientPromise)
      .db("the-mall")
      .collection("orders")
      .findOne({ txRef });

    res.status(201).json(returnData);
  }
}
