import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { User } from "../../../models";
import { isValidObjectId } from "mongoose";

type Data =
  | {
      message: string;
    }
  | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  {
    switch (req.method) {
      case "GET":
        return getUsers(req, res);

      case "PUT":
        return updateUser(req, res);

      default:
        res.status(400).json({ message: "Bad request" });
    }
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select("-password").lean();
  await db.disconnect();
  return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = "", role = "" } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid User Id" });
  }

  const validRoles = ["admin", "client", "super-user", "SEO"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid User role" });
  }

  await db.connect();
  const dbUser = await User.findById(userId);

  if (!dbUser) {
    await db.disconnect();
    return res.status(400).json({ message: "User not found" });
  }

  dbUser.role = role;
  await dbUser.save();
  await db.disconnect();
  return res.status(200).json({ message: "User update" });
};
