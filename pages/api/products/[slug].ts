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
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getProductBySlug(req, res);

    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  await db.connect();
  const productInDB = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!productInDB) {
    return res
      .status(400)
      .json({ message: "No hay productos con ese slug: " + slug });
  }

  return res.status(200).json(productInDB);
};

function updateEntry(req: NextApiRequest, res: NextApiResponse<any>) {
  throw new Error("Function not implemented.");
}

function deleteEntry(req: NextApiRequest, res: NextApiResponse<any>) {
  throw new Error("Function not implemented.");
}
