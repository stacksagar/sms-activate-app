import { NextApiRequest, NextApiResponse } from "next";

import Res from "@/lib/server/Res";
import User from "@/models/mongodb/User";

export default async function get_balance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await User.findById(req.query?.id);
    res.status(200).json({ user });
  } catch (error) {
    return Res.err(res, error);
  }
}
