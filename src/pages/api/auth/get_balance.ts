import Res from "@/lib/server/Res";
import User from "@/models/mongodb/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_balance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    User.create({});
    const user = await User.findById(req.query?.id);
    res.status(200).json({ user, balance: user?.balance });
  } catch (error) {
    return Res.err(res, error);
  }
}
