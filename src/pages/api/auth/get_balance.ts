import error_response from "@/lib/server/error_reponse";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

function middleWare(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin;
  console.log("origin ", origin);
}

export default async function get_balance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    middleWare(req, res);
    const id = req.query?.id;
    const user = await User.findOne({ where: { id } });
    res.status(200).json({ user, balance: user?.dataValues.balance });
  } catch (error) {
    return error_response(res, error);
  }
}
