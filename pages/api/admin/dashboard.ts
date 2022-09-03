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
  //*number of items
  await db.connect();
  const numberOfOrders = await Order.count();
  const paidOrders = await Order.count({ isPaid: true });
  const notPaidOrders = numberOfOrders - paidOrders;
  const numberOfClients = await User.count({ role: "client" });
  const numberOfProducts = await Product.count();
  const noStockProducts = await Product.count({ inStock: 0 });
  const lowStockProducts = await Product.count({ inStock: 10 });
  await db.disconnect();

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients, //only clients
    numberOfProducts,
    noStockProducts,
    lowStockProducts: 0,
  });
};
