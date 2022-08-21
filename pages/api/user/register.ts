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
      return registerUser(req, res);

    default:
      res.status(400).json({ message: "Endpoint not valid" });
  }
}
const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { email = "", password = "", name = "" } = req.body;

  if (email.trim() === "" || password.trim().lenth < 6 || name.trim() === "") {
    return res.status(400).json({ message: "email/user/password not valid" });
  }

  //!email must be in lowercase
  email = email.toString().toLowerCase();

  await db.connect();
  const userInDB = await User.findOne({
    email,
  }).lean();
  await db.disconnect();

  if (userInDB) {
    return res.status(400).json({ message: "email already in use" });
  }

  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password),
    role: "client",
  });

  try {
    await db.connect();
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({ token: token, user: { name, email, role } });
};
