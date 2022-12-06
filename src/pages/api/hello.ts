import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const response = await (await clientPromise)
  //   .db("the-mall")
  //   .collection("stores")
  //   .updateMany(
  //     {},
  //     {
  //       $set: {},
  //     }
  //   );
  res.status(201).json({ response: "response" });
}
