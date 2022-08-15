import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProducts(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  let { query = "" } = req.query;

  if (query.length === 0) {
    return res.status(400).json({ message: "Query not valid" });
  }

  query = query.toString().toLowerCase();

  await db.connect();

  const productInDB = await Product.find({
    $text: { $search: query },
  }).lean();

  await db.disconnect();

  if (!productInDB) {
    return res.status(400).json({ message: "No products found" });
  }

  return res.status(200).json(productInDB);
};
