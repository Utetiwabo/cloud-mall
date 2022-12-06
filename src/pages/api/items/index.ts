import { cleanObject } from "@lib/helpers";
import { Sort, SortDirection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const offset = Number(req.query?.offset?.toString());
  const limit = Number(req.query?.limit?.toString());
  const sort = req.query?.sort?.toString();
  const priceStr = req.query?.price?.toString();

  const price =
    priceStr &&
    JSON.parse(
      JSON.stringify({
        $gte: Number(priceStr.split("-")[0]),
        $lte: Number(priceStr.split("-")[1]),
      })
    );

  const query = cleanObject({ price }) || {};

  const sortObj: any = () => {
    switch (sort) {
      case "lowest-price": {
        return { price: 1 };
      }
      case "highest-price": {
        return { price: -1 };
      }
      case "rating": {
        return { rating: -1 };
      }
    }
  };

  if (sort) {
    res.status(200).json(
      await (
        await clientPromise
      )
        .db("the-mall")
        .collection("items")
        .find(query)
        .sort({ ...sortObj() })
        .skip(offset || 0)
        .limit(limit || 4)
        .toArray()
    );
  } else {
    res.status(200).json(
      await (
        await clientPromise
      )
        .db("the-mall")
        .collection("items")
        .find(query)
        .skip(offset || 0)
        .limit(limit || 4)
        .toArray()
    );
  }
}
