import Res from "@/lib/server/Res";
import Setting from "@/models/mongodb/Setting";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("/callback is work: ", req.body);
    Setting.create({ public: { ...req.body } });
    res.status(200).json({ message: "ok" });
  } catch (error) {
    return Res.err(res, error);
  }
}
