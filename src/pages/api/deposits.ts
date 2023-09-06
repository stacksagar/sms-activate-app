import Res from "@/lib/server/Res";
import Deposit from "@/models/mongodb/Deposit";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const deposits = await Deposit.find({ user: req.query.userId });
    res.status(200).json({ deposits });
  } catch (error) {
    return Res.err(res, error);
  }
}
