import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const _id = req.query?.item.toString();

  if (_id && ObjectId.isValid(_id)) {
    res.status(200).json(
      await (
        await clientPromise
      )
        .db("the-mall")
        .collection("items")
        .findOne({ _id: new ObjectId(_id) })
    );
  } else res.status(404).json("yikes");
}
