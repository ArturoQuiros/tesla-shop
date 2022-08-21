import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
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
    case "POST":
      return loginUser(req, res);

    default:
      res.status(400).json({ message: "Endpoint not valid" });
  }
}
const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let { email = "", password = "" } = req.body;

  if (email === "" || password === "") {
    return res.status(400).json({ message: "email/user not valid" });
  }

  //!email must be in lowercase
  email = email.toString().toLowerCase();

  await db.connect();
  const userInDB = await User.findOne({
    email,
  }).lean();
  await db.disconnect();

  if (!userInDB) {
    return res.status(400).json({ message: "email/user not valid" });
  }

  if (!bcrypt.compareSync(password, userInDB.password!)) {
    return res.status(400).json({ message: "email/user not valid" });
  }

  const { role, name, _id } = userInDB;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({ token: token, user: { role, name, email } });
};
