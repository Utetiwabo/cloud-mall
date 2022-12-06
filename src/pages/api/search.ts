import Fuse from "fuse.js";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hint = req.query?.hint && req.query?.hint.toString();
  const store = req.query?.store;

  const items = await (
    await clientPromise
  )
    .db("the-mall")
    .collection("items")
    .find({})
    // .limit(20)
    .toArray();

  const stores = await (
    await clientPromise
  )
    .db("the-mall")
    .collection("stores")
    .find({})
    // .limit(20)
    .toArray();

  // try {
  //   res.status(200).json({
  //     itemHits: items,
  //     storeHits: [],
  //     search: hint,
  //   });
  // } catch (err) {
  //   res.status(404).json({ response: err });
  // }

  try {
    const itemFuse = new Fuse(items, {
      keys: ["title", "brand", "description", "category"],
    });
    const storeFuse = new Fuse(stores, { keys: ["name"] });

    res.status(200).json({
      itemHits: itemFuse.search(hint).map((hit) => hit.item),
      storeHits: storeFuse.search(hint).map((hit) => hit.item),
      search: hint,
    });
  } catch (err) {
    res.status(404).json({ response: err });
  }
}
