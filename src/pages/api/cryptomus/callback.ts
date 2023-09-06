import Res from "@/lib/server/Res";
import Deposit from "@/models/mongodb/Deposit";
import User from "@/models/mongodb/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body as DepositT & { additional_data: string };

    if (!body?.amount) return Res.err(res, "Something wrong!");

    const callbackData = {
      ...body,
      additional_data: JSON.parse(body.additional_data || "{}"),
    } as DepositT & { additional_data: object };

    const exist = await Deposit.findOne({ txid: callbackData.txid });
    if (exist?._id) return Res.msg(res, "txid already exist!");

    const user = await User.findById(callbackData.additional_data?.userId);
    if (!user) return Res.msg(res, "Payment successfull, But user not found!");

    user.balance = (user.balance || 0) + Number(callbackData.amount || "0");
    await user.save();

    const deposit = await Deposit.create({
      ...callbackData,
      user: callbackData.additional_data?.userId,
    });

    res.status(200).json({ message: "Deposit successfull!", deposit, user });
  } catch (error) {
    console.log("ERROR: ", error);
    return Res.err(res, error);
  }
}
