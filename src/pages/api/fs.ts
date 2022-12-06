import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await (await clientPromise)
      .db("the-mall")
      .collection("fs")
      .insertOne(req.body);
    res.status(201).json({ status: "success" });
  }
}
