import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbOrders } from "../../../database";
import { IPayPalOrderStatusResponse } from "../../../interfaces";
import { Order } from "../../../models";

type Data = {
  message: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENTID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  try {
    const body = new URLSearchParams("grant_type=client_credentials");

    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-Type": `application/x-www-form-urlencoded`,
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { message } = error.response?.data as { message: string };
      console.log(message);
    } else {
      console.log(error);
    }

    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //!Falta validar la sesión dle usuario
  //!Falta validar mongo ID

  const paypalToken = await getPaypalBearerToken();

  if (!paypalToken) {
    return res.status(400).json({ message: "Paypal token not found" });
  }

  const { transactionId = "", orderId = "" } = req.body;

  const { data } = await axios.get<IPayPalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalToken}`,
      },
    }
  );

  if (data.status !== "COMPLETED") {
    return res.status(401).json({ message: "Unknown order" });
  }

  //*update order in mongo
  await db.connect();
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();
    return res.status(404).json({ message: "Unknown order in DB" });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res
      .status(404)
      .json({ message: "There is difference in orders total values" });
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  await dbOrder.save();
  await db.disconnect();

  return res.status(200).json({ message: "Order paid :)" });
};
