import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("server is ok");
  res.status(200).json({ message: "ok" });
}
