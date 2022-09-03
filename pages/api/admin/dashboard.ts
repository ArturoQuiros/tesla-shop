import { NumberSchemaDefinition } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Order, Product, User } from "../../../models";

type Data =
  | {
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number; //only clients
      numberOfProducts: number;
      noStockProducts: number;
      lowStockProducts: number; //menos de 10 unidades
    }
  | {
      message: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  {
    switch (req.method) {
      case "GET":
        return getStats(req, res);

      default:
        res.status(400).json({ message: "Bad request" });
    }
  }
}

const getStats = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients, //only clients
    numberOfProducts,
    noStockProducts,
    lowStockProducts,
  ] = await Promise.all([
    Order.count(),
    Order.count({ isPaid: true }),
    User.count({ role: "client" }),
    Product.count(),
    Product.count({ inStock: 0 }),
    Product.count({ inStock: { $lte: 10 } }),
  ]);

  await db.disconnect();

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients, //only clients
    numberOfProducts,
    noStockProducts,
    lowStockProducts,
  });
};
