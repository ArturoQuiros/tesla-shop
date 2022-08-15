import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getProducts = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find()
    .select("title images price inStock slug")
    .lean()
    .sort({ createdAt: "ascending" });
  await db.disconnect();

  return res.status(200).json(products);
};

function postEntry(req: NextApiRequest, res: NextApiResponse<any>) {
  throw new Error("Function not implemented.");
}
