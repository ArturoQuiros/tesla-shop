import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: "Example" });
}

//!12
