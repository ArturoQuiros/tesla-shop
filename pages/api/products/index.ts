import type { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = "all" } = req.query;

  let condition = {};

  if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = { gender };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select("title images price inStock slug -_id")
    .lean()
    .sort({ createdAt: "ascending" });
  await db.disconnect();

  return res.status(200).json(products);
};

function postEntry(req: NextApiRequest, res: NextApiResponse<any>) {
  throw new Error("Function not implemented.");
}
