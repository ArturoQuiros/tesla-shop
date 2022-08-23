import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import { jwt } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return validateToken(req, res);

    default:
      res.status(400).json({ message: "Endpoint not valid" });
  }
}
const validateToken = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({ message: "Token not valid" });
  }

  await db.connect();

  const userInDB = await User.findById(userId).lean();

  await db.disconnect();

  if (!userInDB) {
    return res.status(400).json({ message: "User not valid" });
  }

  const { email, role, name, _id } = userInDB;

  return res
    .status(200)
    .json({ token: jwt.signToken(_id, email), user: { role, name, email } });
};
