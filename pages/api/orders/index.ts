import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { IOrder } from "../../../interfaces/order";
import { Order, Product } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  //*verificar usuario
  const session: any = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unathorized" });
  }

  //*arreglo de productos
  const productsIds = orderItems.map((p) => p._id);
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    //*calculamos el costos de la orden en el backend
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )?.price;

      if (!currentPrice) {
        throw new Error("Check the cart, no products exists");
      }

      return current.price * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const backendTotal = subTotal * (taxRate + 1);

    if (Math.round(total) !== Math.round(backendTotal)) {
      throw new Error(
        `Frontend and Backend values does not match ${total} !== ${Math.round(
          backendTotal
        )}`
      );
    }
    //*los montos SI coinciden
    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    //! Los montos no son compatibles
    await db.disconnect();
    console.log(error);
    return res
      .status(400)
      .json({ message: error.message || "Invalid request, check the log" });
  }
};
